import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { askMaadhav } from "@/lib/maadhav/orchestrator";
import type { MaadhavRequest } from "@/lib/maadhav/types";

const RECENT_MESSAGE_LIMIT = 12;

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // ---------------------------------------------------------
    // 1. Verify authenticated user
    // ---------------------------------------------------------
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ---------------------------------------------------------
    // 2. Read multipart/form-data request
    // ---------------------------------------------------------
    const formData = await request.formData();

    const rawMessage = formData.get("message");
    const rawConversationId =
      formData.get("conversationId");
    const rawImage = formData.get("image");

    const message =
      typeof rawMessage === "string"
        ? rawMessage.trim()
        : "";

    const conversationId =
      typeof rawConversationId === "string" &&
      rawConversationId.trim()
        ? rawConversationId.trim()
        : undefined;

    const image =
      rawImage instanceof File
        ? rawImage
        : null;

    // ---------------------------------------------------------
    // 3. Validate message / image
    // ---------------------------------------------------------
    if (!message && !image) {
      return NextResponse.json(
        {
          error:
            "Message or image is required.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // 4. Validate image
    // ---------------------------------------------------------
    if (image) {
      if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
        return NextResponse.json(
          {
            error:
              "Unsupported image format. Please use JPG, PNG, WEBP, or GIF.",
          },
          { status: 400 }
        );
      }

      if (image.size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          {
            error:
              "Image is too large. Please upload an image smaller than 10 MB.",
          },
          { status: 400 }
        );
      }
    }

    // ---------------------------------------------------------
    // 5. Convert image to data URL
    // ---------------------------------------------------------
    let imageDataUrl: string | null = null;

    if (image) {
      const buffer = Buffer.from(
        await image.arrayBuffer()
      );

      imageDataUrl = `data:${image.type};base64,${buffer.toString(
        "base64"
      )}`;
    }

    // ---------------------------------------------------------
    // 6. Get or create conversation
    // ---------------------------------------------------------
    let activeConversationId =
      conversationId;

    if (activeConversationId) {
      const {
        data: conversation,
        error: conversationError,
      } = await supabase
        .from("maadhav_conversations")
        .select("id, user_id")
        .eq("id", activeConversationId)
        .eq("user_id", user.id)
        .single();

      if (
        conversationError ||
        !conversation
      ) {
        return NextResponse.json(
          {
            error:
              "Conversation not found.",
          },
          { status: 404 }
        );
      }
    } else {
      /*
       * If the user sends an image without text,
       * create a meaningful conversation title.
       */
      const conversationTitle =
        message ||
        "Image question";

      const {
        data: conversation,
        error: createError,
      } = await supabase
        .from("maadhav_conversations")
        .insert({
          user_id: user.id,
          title: conversationTitle.slice(
            0,
            60
          ),
        })
        .select("id")
        .single();

      if (
        createError ||
        !conversation
      ) {
        console.error(
          "Maadhav conversation creation error:",
          createError
        );

        return NextResponse.json(
          {
            error:
              "Could not create Maadhav conversation.",
          },
          { status: 500 }
        );
      }

      activeConversationId =
        conversation.id;
    }

    // ---------------------------------------------------------
    // 7. Load recent conversation history
    // ---------------------------------------------------------
    const {
      data: history,
      error: historyError,
    } = await supabase
      .from("maadhav_messages")
      .select(
        "role, content, created_at"
      )
      .eq(
        "conversation_id",
        activeConversationId
      )
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      })
      .limit(RECENT_MESSAGE_LIMIT);

    if (historyError) {
      console.error(
        "Maadhav history error:",
        historyError
      );

      return NextResponse.json(
        {
          error:
            "Could not load Maadhav history.",
        },
        { status: 500 }
      );
    }

    const conversationHistory =
      (history ?? [])
        .reverse()
        .map((item) => ({
          role: item.role as
            | "user"
            | "assistant",
          content: item.content,
        }));

    // ---------------------------------------------------------
    // 8. Save user's message
    // ---------------------------------------------------------
    const messageToSave =
      message ||
      "Please analyze the attached image.";

    const {
      error: userMessageError,
    } = await supabase
      .from("maadhav_messages")
      .insert({
        conversation_id:
          activeConversationId,
        user_id: user.id,
        role: "user",
        content: messageToSave,
      });

    if (userMessageError) {
      console.error(
        "Maadhav user message error:",
        userMessageError
      );

      return NextResponse.json(
        {
          error:
            "Could not save your message.",
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------
    // 9. Ask Maadhav
    // ---------------------------------------------------------
    /*
     * Keep the existing Maadhav request structure,
     * while additionally passing image information.
     *
     * The orchestrator must support imageDataUrl
     * for the image to actually be sent to the
     * vision-capable model.
     */
    const maadhavRequest =
      {
        message: messageToSave,
        conversation:
          conversationHistory,
        ...(imageDataUrl
          ? {
              imageDataUrl,
            }
          : {}),
      } as MaadhavRequest & {
        imageDataUrl?: string;
      };

    const response =
      await askMaadhav(
        maadhavRequest
      );

    // ---------------------------------------------------------
    // 10. Save Maadhav's response
    // ---------------------------------------------------------
    const {
      error: assistantMessageError,
    } = await supabase
      .from("maadhav_messages")
      .insert({
        conversation_id:
          activeConversationId,
        user_id: user.id,
        role: "assistant",
        content: response.content,
      });

    if (assistantMessageError) {
      console.error(
        "Maadhav assistant message error:",
        assistantMessageError
      );

      return NextResponse.json(
        {
          error:
            "Maadhav responded, but the response could not be saved.",
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------
    // 11. Update conversation timestamp
    // ---------------------------------------------------------
    const {
      error: updateError,
    } = await supabase
      .from("maadhav_conversations")
      .update({
        updated_at:
          new Date().toISOString(),
      })
      .eq(
        "id",
        activeConversationId
      )
      .eq("user_id", user.id);

    if (updateError) {
      console.error(
        "Maadhav conversation update error:",
        updateError
      );
    }

    // ---------------------------------------------------------
    // 12. Return response
    // ---------------------------------------------------------
    return NextResponse.json({
      ...response,
      conversationId:
        activeConversationId,
    });
  } catch (error) {
    console.error(
      "Maadhav API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Maadhav could not process the request.",
      },
      { status: 500 }
    );
  }
}
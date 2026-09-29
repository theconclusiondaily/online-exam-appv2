import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

import { askMaadhav } from "@/lib/maadhav/orchestrator";
import type {
  MaadhavImage,
  MaadhavMessage,
} from "@/lib/maadhav/types";

export async function POST(
  request: NextRequest
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    const conversationId =
      typeof body?.conversationId === "string"
        ? body.conversationId
        : null;

    /*
     * Optional image sent by the frontend.
     *
     * Expected structure:
     *
     * {
     *   dataUrl: "data:image/png;base64,...",
     *   mimeType: "image/png",
     *   name: "question.png"
     * }
     */
    const image: MaadhavImage | undefined =
      body?.image &&
      typeof body.image.dataUrl === "string" &&
      typeof body.image.mimeType === "string"
        ? {
            dataUrl: body.image.dataUrl,
            mimeType: body.image.mimeType,
            name:
              typeof body.image.name === "string"
                ? body.image.name
                : undefined,
          }
        : undefined;

    if (!message && !image) {
      return NextResponse.json(
        {
          error:
            "Please provide a message or image.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Make sure the conversation belongs
     * to the authenticated student.
     */
    let activeConversationId =
      conversationId;

    if (activeConversationId) {
      const { data: conversation, error } =
        await supabase
          .from("maadhav_conversations")
          .select("id")
          .eq("id", activeConversationId)
          .eq("user_id", user.id)
          .maybeSingle();

      if (error) {
        console.error(
          "Maadhav conversation lookup error:",
          error
        );

        return NextResponse.json(
          {
            error:
              "Could not verify the conversation.",
          },
          {
            status: 500,
          }
        );
      }

      if (!conversation) {
        return NextResponse.json(
          {
            error:
              "Conversation not found.",
          },
          {
            status: 404,
          }
        );
      }
    }

    /*
     * Create a new conversation when
     * this is the first message.
     */
    if (!activeConversationId) {
      const titleSource =
        message ||
        "Image question";

      const title =
        titleSource.length > 60
          ? `${titleSource.slice(0, 57)}...`
          : titleSource;

      const { data: conversation, error } =
        await supabase
          .from("maadhav_conversations")
          .insert({
            user_id: user.id,
            title,
          })
          .select("id")
          .single();

      if (error || !conversation) {
        console.error(
          "Maadhav conversation creation error:",
          error
        );

        return NextResponse.json(
          {
            error:
              "Could not create the conversation.",
          },
          {
            status: 500,
          }
        );
      }

      activeConversationId =
        conversation.id;
    }

    /*
     * Load previous messages so Maadhav
     * retains conversation context.
     */
    const {
      data: previousMessages,
      error: messagesError,
    } = await supabase
      .from("maadhav_messages")
      .select(
        "id, role, content, created_at"
      )
      .eq(
        "conversation_id",
        activeConversationId
      )
      .order("created_at", {
        ascending: true,
      });

    if (messagesError) {
      console.error(
        "Maadhav message loading error:",
        messagesError
      );

      return NextResponse.json(
        {
          error:
            "Could not load conversation history.",
        },
        {
          status: 500,
        }
      );
    }

    const conversation: MaadhavMessage[] =
      (previousMessages ?? [])
        .filter(
          (
            item
          ): item is {
            id: string;
            role: "user" | "assistant";
            content: string;
            created_at: string;
          } =>
            item.role === "user" ||
            item.role === "assistant"
        )
        .map((item) => ({
          role: item.role,
          content: item.content,
        }));

    /*
     * Ask Maadhav.
     *
     * The optional image is passed only
     * with the current user message.
     */
    const result = await askMaadhav({
      message,
      conversation,
      image,
    });

    /*
     * Save the user's message.
     *
     * We currently save the text content.
     * The image itself is sent to the model
     * but is not stored permanently in the
     * conversation database yet.
     */
    const { error: userMessageError } =
      await supabase
        .from("maadhav_messages")
        .insert({
          conversation_id:
            activeConversationId,
          role: "user",
          content:
            message ||
            "[Image attached]",
        });

    if (userMessageError) {
      console.error(
        "Maadhav user message save error:",
        userMessageError
      );
    }

    /*
     * Save Maadhav's response.
     */
    const { error: assistantMessageError } =
      await supabase
        .from("maadhav_messages")
        .insert({
          conversation_id:
            activeConversationId,
          role: "assistant",
          content: result.content,
        });

    if (assistantMessageError) {
      console.error(
        "Maadhav assistant message save error:",
        assistantMessageError
      );
    }

    /*
     * Update conversation timestamp.
     */
    await supabase
      .from("maadhav_conversations")
      .update({
        updated_at: new Date().toISOString(),
      })
      .eq(
        "id",
        activeConversationId
      )
      .eq(
        "user_id",
        user.id
      );

    return NextResponse.json({
      content: result.content,
      conversationId:
        activeConversationId,
      provider: result.provider,
      model: result.model,
    });
  } catch (error) {
    console.error(
      "Maadhav API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Maadhav could not process your request.",
      },
      {
        status: 500,
      }
    );
  }
}
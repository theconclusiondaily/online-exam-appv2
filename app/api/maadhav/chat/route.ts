import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { askMaadhav } from "@/lib/maadhav/orchestrator";
import type { MaadhavRequest } from "@/lib/maadhav/types";

const RECENT_MESSAGE_LIMIT = 12;

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
    // 2. Validate request
    // ---------------------------------------------------------
    const body = (await request.json()) as MaadhavRequest & {
      conversationId?: string;
    };

    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // 3. Get or create conversation
    // ---------------------------------------------------------
    let conversationId = body.conversationId;

    if (conversationId) {
      const { data: conversation, error: conversationError } =
        await supabase
          .from("maadhav_conversations")
          .select("id, user_id")
          .eq("id", conversationId)
          .eq("user_id", user.id)
          .single();

      if (conversationError || !conversation) {
        return NextResponse.json(
          { error: "Conversation not found." },
          { status: 404 }
        );
      }
    } else {
      const { data: conversation, error: createError } =
        await supabase
          .from("maadhav_conversations")
          .insert({
            user_id: user.id,
            title: message.slice(0, 60),
          })
          .select("id")
          .single();

      if (createError || !conversation) {
        console.error(
          "Maadhav conversation creation error:",
          createError
        );

        return NextResponse.json(
          { error: "Could not create Maadhav conversation." },
          { status: 500 }
        );
      }

      conversationId = conversation.id;
    }

    // ---------------------------------------------------------
    // 4. Load recent conversation history
    // ---------------------------------------------------------
    const { data: history, error: historyError } = await supabase
      .from("maadhav_messages")
      .select("role, content, created_at")
      .eq("conversation_id", conversationId)
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
        { error: "Could not load Maadhav history." },
        { status: 500 }
      );
    }

    const conversationHistory = (history ?? [])
      .reverse()
      .map((item) => ({
        role: item.role as "user" | "assistant",
        content: item.content,
      }));

    // ---------------------------------------------------------
    // 5. Save user's message
    // ---------------------------------------------------------
    const { error: userMessageError } = await supabase
      .from("maadhav_messages")
      .insert({
        conversation_id: conversationId,
        user_id: user.id,
        role: "user",
        content: message,
      });

    if (userMessageError) {
      console.error(
        "Maadhav user message error:",
        userMessageError
      );

      return NextResponse.json(
        { error: "Could not save your message." },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------
    // 6. Ask Maadhav
    // ---------------------------------------------------------
    const response = await askMaadhav({
      message,
      conversation: conversationHistory,
    });

    // ---------------------------------------------------------
    // 7. Save Maadhav's response
    // ---------------------------------------------------------
    const { error: assistantMessageError } = await supabase
      .from("maadhav_messages")
      .insert({
        conversation_id: conversationId,
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
        { error: "Maadhav responded, but the response could not be saved." },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------
    // 8. Update conversation timestamp
    // ---------------------------------------------------------
    const { error: updateError } = await supabase
      .from("maadhav_conversations")
      .update({
        updated_at: new Date().toISOString(),
      })
      .eq("id", conversationId)
      .eq("user_id", user.id);

    if (updateError) {
      console.error(
        "Maadhav conversation update error:",
        updateError
      );
    }

    // ---------------------------------------------------------
    // 9. Return response
    // ---------------------------------------------------------
    return NextResponse.json({
      ...response,
      conversationId,
    });
  } catch (error) {
    console.error("Maadhav API error:", error);

    return NextResponse.json(
      { error: "Maadhav could not process the request." },
      { status: 500 }
    );
  }
}
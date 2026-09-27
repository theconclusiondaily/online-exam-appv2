import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Conversation ID is required." },
        { status: 400 }
      );
    }

    const { data: conversation, error: conversationError } =
      await supabase
        .from("maadhav_conversations")
        .select("id, title, created_at, updated_at")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

    if (conversationError || !conversation) {
      return NextResponse.json(
        { error: "Conversation not found." },
        { status: 404 }
      );
    }

    const { data: messages, error: messagesError } =
      await supabase
        .from("maadhav_messages")
        .select("id, role, content, created_at")
        .eq("conversation_id", id)
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: true,
        });

    if (messagesError) {
      console.error(
        "Maadhav messages error:",
        messagesError
      );

      return NextResponse.json(
        { error: "Could not load conversation messages." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      conversation,
      messages: messages ?? [],
    });
  } catch (error) {
    console.error(
      "Maadhav conversation API error:",
      error
    );

    return NextResponse.json(
      { error: "Could not load conversation." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Conversation ID is required." },
        { status: 400 }
      );
    }

    // Verify that this conversation belongs
    // to the currently authenticated student.
    const { data: conversation, error: conversationError } =
      await supabase
        .from("maadhav_conversations")
        .select("id")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

    if (conversationError || !conversation) {
      return NextResponse.json(
        { error: "Conversation not found." },
        { status: 404 }
      );
    }

    // Delete messages first.
    const { error: messagesError } = await supabase
      .from("maadhav_messages")
      .delete()
      .eq("conversation_id", id)
      .eq("user_id", user.id);

    if (messagesError) {
      console.error(
        "Maadhav messages delete error:",
        messagesError
      );

      return NextResponse.json(
        {
          error:
            "Could not delete conversation messages.",
        },
        { status: 500 }
      );
    }

    // Delete the conversation itself.
    const { error: deleteError } = await supabase
      .from("maadhav_conversations")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deleteError) {
      console.error(
        "Maadhav conversation delete error:",
        deleteError
      );

      return NextResponse.json(
        {
          error:
            "Could not delete the conversation.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      conversationId: id,
    });
  } catch (error) {
    console.error(
      "Maadhav conversation DELETE API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Could not delete conversation.",
      },
      { status: 500 }
    );
  }
}
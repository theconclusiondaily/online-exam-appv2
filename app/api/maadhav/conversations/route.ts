import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
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

    const { data, error } = await supabase
      .from("maadhav_conversations")
      .select("id, title, created_at, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Maadhav conversations error:",
        error
      );

      return NextResponse.json(
        { error: "Could not load conversations." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      conversations: data ?? [],
    });
  } catch (error) {
    console.error(
      "Maadhav conversations API error:",
      error
    );

    return NextResponse.json(
      { error: "Could not load conversations." },
      { status: 500 }
    );
  }
}
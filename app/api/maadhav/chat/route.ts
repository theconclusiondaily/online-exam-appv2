import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { askMaadhav } from "@/lib/maadhav/orchestrator";
import type { MaadhavRequest } from "@/lib/maadhav/types";

export async function POST(request: Request) {
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

    const body = (await request.json()) as MaadhavRequest;

    if (!body.message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await askMaadhav({
      message: body.message.trim(),
      conversation: body.conversation,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Maadhav API error:", error);

    return NextResponse.json(
      { error: "Maadhav could not process the request." },
      { status: 500 }
    );
  }
}
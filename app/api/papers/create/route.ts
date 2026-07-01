import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const body = await request.json();

    const {
      title,
      description,
      subject,
      class: className,
      duration,
      difficulty,
      language,
    } = body;

    const { data: auth } = await supabase.auth.getUser();

    const user = auth.user;

    const { data, error } = await supabase
      .from("question_papers")
      .insert({
        title,
        description,
        subject,
        class: className,
        duration,
        difficulty,
        language,

        total_questions: 0,
        total_marks: 0,
        status: "Draft",

        created_by: user?.id ?? null,
      })
      .select("id")
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      id: data.id,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create paper.",
      },
      {
        status: 500,
      }
    );
  }
}
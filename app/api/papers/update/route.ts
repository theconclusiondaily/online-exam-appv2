import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();

    const body = await request.json();

    const {
      id,
      title,
      description,
      subject,
      class: className,
      chapter,
      difficulty,
      duration,
      total_questions,
      total_marks,
      negative_marks,
      language,
      status,
    } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Paper ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { error } = await supabase
      .from("question_papers")
      .update({
        title,
        description,
        subject,
        class: className,
        chapter,
        difficulty,
        duration,
        total_questions,
        total_marks,
        negative_marks,
        language,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Paper updated successfully.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update paper.",
      },
      {
        status: 500,
      }
    );
  }
}
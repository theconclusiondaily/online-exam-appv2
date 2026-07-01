import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const { paperId, questionIds } = await req.json();

    // Validation
    if (!paperId) {
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

    if (
      !Array.isArray(questionIds) ||
      questionIds.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "At least one question is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Delete existing questions
    const { error: deleteError } = await supabase
      .from("paper_questions")
      .delete()
      .eq("paper_id", paperId);

    if (deleteError) throw deleteError;

    // Insert questions in the selected order
    const rows = questionIds.map(
      (questionId: string, index: number) => ({
        paper_id: paperId,
        question_id: questionId,
        question_order: index + 1,
      })
    );

    const { error: insertError } = await supabase
      .from("paper_questions")
      .insert(rows);

    if (insertError) throw insertError;

    // Update paper statistics
    const { error: updateError } = await supabase
      .from("question_papers")
      .update({
        total_questions: questionIds.length,
        updated_at: new Date().toISOString(),
      })
      .eq("id", paperId);

    if (updateError) throw updateError;

    return NextResponse.json({
      success: true,
      message: "Paper saved successfully.",
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save paper.",
      },
      {
        status: 500,
      }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { id } = await request.json();

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

    // Fetch original paper
    const { data: paper, error: paperError } =
      await supabase
        .from("question_papers")
        .select("*")
        .eq("id", id)
        .single();

    if (paperError) throw paperError;

    // Fetch linked questions
    const {
      data: paperQuestions,
      error: pqError,
    } = await supabase
      .from("paper_questions")
      .select("*")
      .eq("paper_id", id);

    if (pqError) throw pqError;

    // Create duplicate paper
    const { data: newPaper, error: insertError } =
      await supabase
        .from("question_papers")
        .insert({
          title: `Copy of ${paper.title}`,
          description: paper.description,
          subject: paper.subject,
          class: paper.class,
          duration: paper.duration,
          total_questions: paper.total_questions,
          total_marks: paper.total_marks,
          negative_marks: paper.negative_marks,
          language: paper.language,
          difficulty: paper.difficulty,
          chapter: paper.chapter,
          status: "Draft",
        })
        .select()
        .single();

    if (insertError) throw insertError;

    // Copy linked questions
    if (paperQuestions.length > 0) {
      const rows = paperQuestions.map((q) => ({
        paper_id: newPaper.id,
        question_id: q.question_id,
        question_order: q.question_order,
      }));

      const { error: copyError } =
        await supabase
          .from("paper_questions")
          .insert(rows);

      if (copyError) throw copyError;
    }

    return NextResponse.json({
      success: true,
      paper: newPaper,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to duplicate paper.",
      },
      {
        status: 500,
      }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Paper ID required",
        },
        {
          status: 400,
        }
      );
    }

    const { data: paper, error: paperError } =
      await supabase
        .from("question_papers")
        .select("*")
        .eq("id", id)
        .single();

    if (paperError) throw paperError;

    const { data: questions, error: questionError } =
      await supabase
        .from("paper_questions")
        .select(`
          question_order,
          questions(*)
        `)
        .eq("paper_id", id)
        .order("question_order");

    if (questionError) throw questionError;

    return NextResponse.json({
      success: true,
      paper,
      questions,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load paper",
      },
      {
        status: 500,
      }
    );
  }
}
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const {
      id,
      examId,
      paperId,
      instituteId,

      metadata,

      questionEn,
      questionHi,

      optionsEn,
      optionsHi,

      explanationEn,
      explanationHi,

      correctAnswer,
    } = body;

    const row = {
      exam_id: examId,
      paper_id: paperId,

      subject: metadata.subject,
      chapter: metadata.chapter,
      topic: metadata.topic,

      difficulty: metadata.difficulty,

      marks: metadata.marks,
      negative_marks: metadata.negativeMarks,

      language: metadata.language,
      question_type: metadata.questionType,

      question: questionEn,
      question_text_hi: questionHi,

      option_a: optionsEn[0],
      option_b: optionsEn[1],
      option_c: optionsEn[2],
      option_d: optionsEn[3],

      option_a_hi: optionsHi[0],
      option_b_hi: optionsHi[1],
      option_c_hi: optionsHi[2],
      option_d_hi: optionsHi[3],

      explanation: explanationEn,
      explanation_hi: explanationHi,

      correct_answer: correctAnswer,

      institute_id: instituteId,
    };

    // UPDATE
    if (id) {
      const { error } = await supabase
        .from("questions")
        .update(row)
        .eq("id", id);

      if (error) throw error;

      return NextResponse.json({
        success: true,
        id,
      });
    }

    // INSERT
    const { data, error } = await supabase
      .from("questions")
      .insert(row)
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
        error: "Failed to save question",
      },
      {
        status: 500,
      }
    );

  }
}
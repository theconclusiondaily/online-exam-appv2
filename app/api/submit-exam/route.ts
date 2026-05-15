import { NextResponse }
from "next/server";

import { createClient }
from "@supabase/supabase-js";

const supabase =
  createClient(

    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .SUPABASE_SERVICE_ROLE_KEY!
  );

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      examId,
      userId,
      answers,
    } = body;

    // FETCH QUESTIONS

    const {
      data: questions,
      error:
        questionsError,
    } = await supabase
      .from("questions")
      .select("*")
      .eq(
        "exam_id",
        examId
      );

    if (
      questionsError ||
      !questions
    ) {

      return NextResponse.json(
        {
          error:
            "Questions not found",
        },
        { status: 400 }
      );
    }

    // CALCULATE SCORE

    let correct = 0;

    questions.forEach(
      (q) => {

        if (
          answers[q.id] ===
          q.correct_answer
        ) {

          correct++;
        }
      }
    );

    const percentage =
      Number(
        (
          (
            correct /
            questions.length
          ) * 100
        ).toFixed(2)
      );

    // UPDATE ATTEMPT

    await supabase
      .from("exam_attempts")
      .update({

        score: correct,

        percentage,

        status:
          "submitted",

      })
      .eq(
        "user_id",
        userId
      )
      .eq(
        "exam_id",
        examId
      );

    // UPDATE LEADERBOARD

    await supabase
      .from("leaderboard")
      .upsert({

        user_id:
          userId,

        exam_id:
          examId,

        score:
          correct,

        correct_answers:
          correct,

        percentile:
          percentage,

      });

    return NextResponse.json({
      success: true,

      score: correct,

      percentage,
    });

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Something went wrong",
      },
      { status: 500 }
    );
  }
}
import { supabase }
from "@/lib/supabase/client";

export const SCORING = {
  CORRECT: 3,
  WRONG: -1,
};

export async function
saveExamResult({

  exam_id,

  user_id,

  score,

  answers,

  total_questions,

}: any) {

  try {

    const attemptedQuestions =
      Object.keys(
        answers || {}
      ).length;

    const correct_count =
      Math.max(
        0,
        Math.floor(
          (
            score -
            (
              attemptedQuestions *
              SCORING.WRONG
            )
          ) /
          (
            SCORING.CORRECT -
            SCORING.WRONG
          )
        )
      );

    const wrong_count =
      Math.max(
        0,
        attemptedQuestions -
        correct_count
      );

    const unattempted_count =
      Math.max(
        0,
        total_questions -
        attemptedQuestions
      );

    const accuracy =

      attemptedQuestions > 0

        ? Math.round(
            (
              correct_count /
              attemptedQuestions
            ) * 100
          )

        : 0;

    const percentage =

      total_questions > 0

        ? Math.round(
            (
              correct_count /
              total_questions
            ) * 100
          )

        : 0;

    const {
      data,
      error,
    } = await supabase

      .from(
        "exam_attempts"
      )

      .upsert(

        {

          exam_id,

          user_id,

          score,

          answers,

          total_questions,

          correct_count,

          wrong_count,

          accuracy,

          percentage,

          status:
            "submitted",

          submitted_at:
            new Date()
              .toISOString(),

        },

        {

          onConflict:
            "exam_id,user_id",

        }

      )

      .select();

    if (error) {

      console.error(
        "SAVE RESULT ERROR:",
        error
      );

      return {

        success: false,

        error,

      };
    }

    return {

      success: true,

      data,

      analytics: {

        attemptedQuestions,

        correct_count,

        wrong_count,

        unattempted_count,

        accuracy,

        percentage,

      },

    };

  } catch (error) {

    console.error(
      "SAVE RESULT ERROR:",
      error
    );

    return {

      success: false,

      error,

    };
  }
}
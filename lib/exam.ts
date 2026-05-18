import { supabase }
from "@/lib/supabase/client";

export async function
saveExamResult({

  exam_id,

  user_id,

  score,

  answers,

  total_questions,

}: any) {

  try {

    // ANALYTICS

    const correct_count =
      score;

    const wrong_count =
      total_questions -
      score;

    const accuracy =
      total_questions > 0

        ? Math.round(

            (
              correct_count /

              total_questions
            ) * 100
          )

        : 0;

    const percentage =
      accuracy;

    // SAVE RESULT

    const {
      data,

      error,

    } = await supabase

      .from(
        "exam_attempts"
      )

      .upsert({

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

      })

      .select();

    if (error) {

      console.log(
        "FULL ERROR:",
        error
      );

      console.log(
        "ERROR MESSAGE:",
        error?.message
      );

      console.log(
        "ERROR DETAILS:",
        error?.details
      );

      console.log(
        "ERROR HINT:",
        error?.hint
      );

      alert(

        error?.message ||

        "Unknown Supabase error"
      );

      return {

        success: false,

        error,
      };
    }

    return {

      success: true,

      data,
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
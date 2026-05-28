import { supabase }
from "@/lib/supabase/client";

// FETCH QUESTIONS

export async function
fetchQuestions(
  examId?: string
) {

  if (!examId) {

    return {
      data: null,
      error: null,
    };
  }

  const {
    data: mappings,
    error,
  } = await supabase

    .from("exam_questions")

    .select(`
      question_id,
      questions (
        id,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        question_number
      )
    `)

    .eq(
      "exam_id",
      examId
    );

  if (
    error ||
    !mappings
  ) {

    return {
      data: null,
      error,
    };
  }

  const questions =
    mappings
      .map(
        (m: any) =>
          m.questions
      )
      .filter(Boolean)
      .sort(
        (
          a: any,
          b: any
        ) =>
          a.question_number -
          b.question_number
      );

  return {
    data: questions,
    error: null,
  };
}

// FETCH EXAM

export async function
fetchExam(
  examId?: string
) {

  if (!examId) {

    return {
      data: null,
      error: null,
    };
  }

  return await supabase

    .from("exams")

    .select("*")

    .eq(
      "id",
      examId
    )

    .maybeSingle();
}

// FETCH ATTEMPT

export async function
fetchAttempt({
  userId,
  examId,
}: {
  userId: string;
  examId?: string;
}) {

  if (!examId) {

    return {
      data: null,
      error: null,
    };
  }

  return await supabase

    .from("exam_attempts")

    .select("*")

    .eq(
      "user_id",
      userId
    )

    .eq(
      "exam_id",
      examId
    )

    .maybeSingle();
}
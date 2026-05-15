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
  return await supabase
    .from("questions")
    .select("*")
    .eq(
      "exam_id",
      examId
    );
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
    .single();
}

// FETCH ATTEMPT

export async function
fetchAttempt({
  userId,
  examId,
}: {
  userId: string;

  examId?: string
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
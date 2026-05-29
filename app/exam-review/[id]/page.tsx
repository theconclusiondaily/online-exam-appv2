"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";


type ReviewQuestion = {
  question_id: string;
  selected_option: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  subject?: string;
  chapter?: string;
};

export default function ExamReviewPage() {
  const params = useParams();
  const router = useRouter();

  const attemptId =
  Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [loading, setLoading] =
    useState(true);

  const [locked, setLocked] =
    useState(true);

  const [reviewAvailableAt,
    setReviewAvailableAt] =
    useState("");

  const [questions,
    setQuestions] =
    useState<ReviewQuestion[]>([]);
const [examId, setExamId] =
  useState<string>("");
  useEffect(() => {
    async function loadReview() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        // Load attempt first

const {
  data: attemptRecord,
  error: attemptRecordError,
} = await supabase
  .from("exam_attempts")
  .select(`
    exam_id,
    answers
  `)
  .eq("id", attemptId)
  .eq("user_id", user.id)
  .single();

if (
  attemptRecordError ||
  !attemptRecord
) {
  console.error(
    "Attempt Error:",
    attemptRecordError
  );

  setLoading(false);
  return;
}

const loadedExamId =
  attemptRecord.exam_id;

setExamId(
  loadedExamId
);

// Load exam

const {
  data: exam,
  error: examError,
} = await supabase
  .from("exams")
  .select(`
    end_time,
    review_delay_minutes
  `)
  .eq("id", loadedExamId)
  .single();

if (
  examError ||
  !exam
) {
  console.error(
    "Exam Error:",
    examError
  );

  setLoading(false);
  return;
}
        // Unlock time
        const unlockTime =
          new Date(
            exam.end_time
          );

        unlockTime.setMinutes(
          unlockTime.getMinutes() +
          (
            exam.review_delay_minutes ||
            30
          )
        );

        setReviewAvailableAt(
          unlockTime.toLocaleString(
            "en-IN",
            {
              timeZone:
                "Asia/Kolkata",
            }
          )
        );

        const isLocked =
          Date.now() <
          unlockTime.getTime();

        setLocked(
          isLocked
        );

        if (isLocked) {
          setLoading(false);
          return;
        }

        // Student answers
        // Latest attempt for current user

const answers =
  attemptRecord.answers || {};

const {
  data: mappings,
  error: mappingError,
} = await supabase

  .from("exam_questions")

  .select(`
    question_id
  `)

  .eq(
  "exam_id",
  loadedExamId
)

if (
  mappingError ||
  !mappings
) {

  console.error(
    mappingError
  );

  setLoading(false);

  return;
}

const questionIds =
  mappings.map(
    (item) =>
      item.question_id
  );

const {
  data: questionData,
  error: questionsError,
} = await supabase

  .from("questions")

  .select(`
    id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
    subject,
    chapter
  `)

  .in(
    "id",
    questionIds
  );

if (
  questionsError
) {

  console.error(
    questionsError
  );

  setLoading(false);

  return;
}

const reviewData =
  questionData?.map(
    (q) => ({

      question_id:
        q.id,

      question:
        q.question,

      option_a:
        q.option_a,

      option_b:
        q.option_b,

      option_c:
        q.option_c,

      option_d:
        q.option_d,

      selected_option:
  answers[q.id] ||
  "Not Attempted",
  subject:
  q.subject,

chapter:
  q.chapter,

      correct_answer:
        q.correct_answer,

    })
  ) || [];

setQuestions(
  reviewData
);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (attemptId) {
  loadReview();
}
  }, [attemptId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Review...
      </div>
    );
  }

  if (locked) {
    return (
      <main className="min-h-screen flex items-center justify-center p-5">
        <div className="bg-white p-6 rounded-3xl shadow-sm border text-center max-w-xl">
          <h1 className="text-2xl font-bold mb-4">
            🔒 Review Locked
          </h1>

          <p className="text-gray-600">
            Answer review will be
            available after the
            review release time.
          </p>

          <p className="mt-4 font-semibold">
            Available At:
            <br />
            {reviewAvailableAt}
          </p>
          <div className="mt-6">

  <button
    onClick={() =>
      router.push("/dashboard")
    }
    className="
      px-6
      py-3

      bg-tcd-blue
      hover:bg-[#3F5D94]

      text-white

      rounded-xl

      font-semibold

      transition-all
    "
  >
    ← Back to Dashboard
  </button>

</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold mb-4">
          Exam Review
        </h1>

        {questions.length === 0 && (
          <div className="bg-white rounded-3xl border p-6 text-center">
            <h2 className="text-2xl font-bold mb-3">
              No Review Data Found
            </h2>

            <p className="text-gray-500">
              No answers were found
              for this exam.
            </p>
          </div>
        )}
<div className="flex gap-3 mb-3">

  <button
  onClick={() =>
    router.push(
      `/exam-result/${examId}`
    )
  }
  className="
    px-4
    py-2
    bg-tcd-blue
hover:bg-tcd-blue-light
    text-white
    rounded-xl
    font-semibold
  "
>
  ← Back to Result
</button>

  <button
    onClick={() =>
      router.push("/dashboard")
    }
    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold"
  >
    Dashboard
  </button>

</div>
        <div className="space-y-6">

          {questions.map(
            (
              question,
              index
            ) => {

              const options = [
                question.option_a,
                question.option_b,
                question.option_c,
                question.option_d,
              ];

              return (
                <div
                  key={
                    question.question_id
                  }
                  className="bg-white rounded-3xl border p-6"
                >

                  <h2 className="font-bold text-lg mb-3">
                    Q{index + 1}.{" "}
                    {question.question}
                  </h2>

                  <div className="space-y-3">

                    {options.map(
                      (
                        option,
                        optionIndex
                      ) => {

                        const isCorrect =
                          option ===
                          question.correct_answer;

                        const isSelected =
                          option ===
                          question.selected_option;

                        return (
                          <div
                            key={
                              optionIndex
                            }
                            className={`p-3 rounded-xl border ${
                              isCorrect
                                ? "bg-green-50 border-green-500"
                                : isSelected
                                ? "bg-red-50 border-red-500"
                                : ""
                            }`}
                          >
                            {option}
                          </div>
                        );
                      }
                    )}

                  </div>

                  <div className="mt-6">

                    <p>
                      Your Answer:{" "}
                      <span
                        className={
                          question.selected_option ===
                          question.correct_answer
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {
                          question.selected_option
                        }
                      </span>
                    </p>

                    <p className="mt-2">
                      Correct Answer:{" "}
                      <span className="text-green-600 font-semibold">
                        {
                          question.correct_answer
                        }
                      </span>
                    </p>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>
    </main>
  );
}
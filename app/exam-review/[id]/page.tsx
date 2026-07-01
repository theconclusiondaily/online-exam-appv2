"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import TCDLoader from "@/components/common/TCDLoader";
import { MathJax } from "better-react-mathjax";

type ReviewQuestion = {
  question_id: string;

  question: string;
  question_text_hi?: string;

  option_a: string;
  option_a_hi?: string;

  option_b: string;
  option_b_hi?: string;

  option_c: string;
  option_c_hi?: string;

  option_d: string;
  option_d_hi?: string;

  explanation?: string;
  explanation_hi?: string;

  selected_option: string;
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

const [language, setLanguage] =
  useState<"en" | "hi">("en");

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
  question_text_hi,
  option_a,
  option_a_hi,
  option_b,
  option_b_hi,
  option_c,
  option_c_hi,
  option_d,
  option_d_hi,
  correct_answer,
  explanation,
  explanation_hi,
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
  questionData?.map((q) => ({

    question_id: q.id,

    question: q.question,
    question_text_hi: q.question_text_hi,

    option_a: q.option_a,
    option_a_hi: q.option_a_hi,

    option_b: q.option_b,
    option_b_hi: q.option_b_hi,

    option_c: q.option_c,
    option_c_hi: q.option_c_hi,

    option_d: q.option_d,
    option_d_hi: q.option_d_hi,

    explanation: q.explanation,
    explanation_hi: q.explanation_hi,

    selected_option:
      answers[q.id] || "Not Attempted",

    subject: q.subject,

    chapter: q.chapter,

    correct_answer: q.correct_answer,

  })) || [];
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
  return <TCDLoader text="Loading Review" />;
}

  if (locked) {
    return (
      <main className="min-h-screen flex items-center justify-center p-5">
        <div className="bg-white p-6 rounded-3xl shadow-sm border text-center max-w-xl">
          <h1 className="text-2xl font-bold mb-4">
            🔒 Review Locked
          </h1>

          <p className="text-brand">
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
<div className="bg-white rounded-2xl border p-5 mb-6 flex justify-between items-center">

  <div>

    <p className="text-gray-500">
      Total Questions
    </p>

    <h2 className="text-3xl font-bold">
      {questions.length}
    </h2>

  </div>

  <div className="text-right">

    <p className="text-sm text-gray-500">
      Review Mode
    </p>

    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">

      Read Only

    </span>

  </div>

</div>
<div className="flex gap-2 mb-6">

  <button
    onClick={() => setLanguage("en")}
    className={`px-4 py-2 rounded-xl transition ${
      language === "en"
        ? "bg-tcd-blue text-white"
        : "bg-gray-200 hover:bg-gray-300"
    }`}
  >
    English
  </button>

  <button
    onClick={() => setLanguage("hi")}
    className={`px-4 py-2 rounded-xl transition ${
      language === "hi"
        ? "bg-tcd-blue text-white"
        : "bg-gray-200 hover:bg-gray-300"
    }`}
  >
    हिन्दी
  </button>

</div>
        {questions.length === 0 && (
          <div className="bg-white rounded-3xl border p-6 text-center">
            <h2 className="text-2xl font-bold mb-3">
              No Review Data Found
            </h2>

            <p className="text-tcd-primary">
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
<div className="flex justify-end mb-2">

  {question.selected_option === question.correct_answer ? (

    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">

      ✓ Correct

    </span>

  ) : (

    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">

      ✗ Incorrect

    </span>

  )}

</div>
                  <div className="flex items-center justify-between mb-4">

  <h2 className="font-bold text-lg">

    Question {index + 1}

  </h2>

  <div className="text-sm text-gray-500">

    {question.subject}

    {question.chapter && (
      <> • {question.chapter}</>
    )}

  </div>

</div>
  <div className="text-xl leading-9 text-[#243B6B] font-medium mb-6">

  <MathJax dynamic>
    {
      language === "hi"
        ? question.question_text_hi || question.question
        : question.question
    }
  </MathJax>

</div>



                  <div className="space-y-3">

                    {options.map(
                      (
                        option,
                        optionIndex
                      ) => {

                        const optionLetter = String.fromCharCode(65 + optionIndex);

const isCorrect =
  optionLetter === question.correct_answer;

const isSelected =
  optionLetter === question.selected_option;

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
                           <div className="flex items-start gap-3">

  <span className="font-bold text-lg min-w-[24px]">
    {String.fromCharCode(65 + optionIndex)}.
  </span>

  <div className="flex-1">
    <MathJax dynamic>
      {
        language === "hi"
          ? (
              optionIndex === 0
                ? question.option_a_hi || question.option_a
                : optionIndex === 1
                ? question.option_b_hi || question.option_b
                : optionIndex === 2
                ? question.option_c_hi || question.option_c
                : question.option_d_hi || question.option_d
            )
          : option
      }
    </MathJax>
  </div>

</div>
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
  (() => {
    switch (question.selected_option) {
      case "A":
        return language === "hi"
          ? question.option_a_hi || question.option_a
          : question.option_a;

      case "B":
        return language === "hi"
          ? question.option_b_hi || question.option_b
          : question.option_b;

      case "C":
        return language === "hi"
          ? question.option_c_hi || question.option_c
          : question.option_c;

      case "D":
        return language === "hi"
          ? question.option_d_hi || question.option_d
          : question.option_d;

      default:
        return "Not Attempted";
    }
  })()
}
                      </span>
                    </p>

                    <p className="mt-2">
                      Correct Answer:{" "}
                      <span className="text-green-600 font-semibold">
                       {
  (() => {
    switch (question.correct_answer) {
      case "A":
        return language === "hi"
          ? question.option_a_hi || question.option_a
          : question.option_a;

      case "B":
        return language === "hi"
          ? question.option_b_hi || question.option_b
          : question.option_b;

      case "C":
        return language === "hi"
          ? question.option_c_hi || question.option_c
          : question.option_c;

      case "D":
        return language === "hi"
          ? question.option_d_hi || question.option_d
          : question.option_d;

      default:
        return question.correct_answer;
    }
  })()
}
                      </span>
                    </p>

                  </div>
{question.explanation && (

  <div className="
mt-8
rounded-3xl
border
border-blue-200
bg-gradient-to-r
from-blue-50
to-indigo-50
p-6
shadow-sm
">

    <h3 className="text-lg font-bold text-blue-700 mb-4">

💡 Explanation

</h3>

    <div className="text-lg leading-8 text-gray-700">

  <MathJax dynamic>
    {
      language === "hi"
        ? question.explanation_hi || question.explanation
        : question.explanation
    }
  </MathJax>

</div>

  </div>

)}
                </div>
              );
            }
          )}

        </div>

      </div>
    </main>
  );
}
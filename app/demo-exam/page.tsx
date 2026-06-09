"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import QuestionPalette
from "@/components/exam/QuestionPalette";

import ExamTopStats
from "@/components/exam/ExamTopStats";

import {
  demoQuestions,
  DEMO_EXAM_CONFIG,
} from "@/lib/demo/demoQuestions";

export default function DemoExamPage() {

  const router =
    useRouter();

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [
    answers,
    setAnswers,
  ] = useState<
    Record<string, string>
  >({});

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  const [
    score,
    setScore,
  ] = useState(0);

  const [
    markedQuestions,
    setMarkedQuestions,
  ] = useState<number[]>([]);

  const [
    visitedQuestions,
    setVisitedQuestions,
  ] = useState<number[]>([0]);

  const [
    answeredQuestions,
    setAnsweredQuestions,
  ] = useState<number[]>([]);

  useEffect(() => {

    setVisitedQuestions(
      (prev) =>

        prev.includes(
          currentQuestion
        )
          ? prev
          : [
              ...prev,
              currentQuestion,
            ]
    );

  }, [currentQuestion]);

  const question =
    demoQuestions[
      currentQuestion
    ];

  function selectAnswer(
    questionId: string,
    answer: string
  ) {

    setAnswers(
      (prev) => ({
        ...prev,
        [questionId]:
          answer,
      })
    );

    setAnsweredQuestions(
      (prev) =>
        prev.includes(
          currentQuestion
        )
          ? prev
          : [
              ...prev,
              currentQuestion,
            ]
    );
  }

  function submitExam() {

    let total = 0;

    demoQuestions.forEach(
      (q) => {

        if (
          answers[q.id] ===
          q.correct_answer
        ) {

          total++;
        }
      }
    );

    setScore(total);

    setSubmitted(true);
  }

  if (submitted) {

    const percentage =
      Math.round(
        (score /
          demoQuestions.length) *
          100
      );

    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="bg-white rounded-3xl shadow-sm border p-10 max-w-2xl w-full">

          <div className="text-center">

            <h1 className="text-4xl font-black text-tcd-blue mb-4">
              Demo Completed 🎉
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              You experienced the
              complete TCD exam
              platform.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">

              <div className="border rounded-2xl p-4">
                <p className="text-gray-500">
                  Score
                </p>

                <p className="text-3xl font-bold">
                  {score}/
                  {
                    demoQuestions.length
                  }
                </p>
              </div>

              <div className="border rounded-2xl p-4">
                <p className="text-gray-500">
                  Percentage
                </p>

                <p className="text-3xl font-bold">
                  {percentage}%
                </p>
              </div>

            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8 text-left">

              <h3 className="font-bold mb-3">
                What you'll unlock
                after signup:
              </h3>

              <ul className="space-y-2">

                <li>
                  ✅ Real Arena Exams
                </li>

                <li>
                  ✅ Leaderboards
                </li>

                <li>
                  ✅ Scholarships
                </li>

                <li>
                  ✅ XP & Levels
                </li>

                <li>
                  ✅ TCD Rewards
                </li>

                <li>
                  ✅ Certificates
                </li>

              </ul>

            </div>

            <button
  onClick={() => {

    localStorage.removeItem(
      "tcd_demo"
    );

    router.push(
      "/signup"
    );

  }}
              className="w-full bg-tcd-blue hover:bg-tcd-blue-light text-white py-4 rounded-2xl font-bold text-lg"
            >
              Create Free Account
            </button>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-5">

      <div className="max-w-7xl mx-auto">

        <div className="mb-6">

          <h1 className="text-3xl font-black">
            {
              DEMO_EXAM_CONFIG.title
            }
          </h1>

          <p className="text-gray-600">
            {
              DEMO_EXAM_CONFIG.description
            }
          </p>

        </div>

        <ExamTopStats
          durationMinutes={
            DEMO_EXAM_CONFIG.duration
          }
          liveStudents={0}
          violations={0}
          onTimeUp={submitExam}
        />

        <div className="mt-6 mb-6 overflow-x-auto">

          <QuestionPalette
            questions={demoQuestions}
            answers={answers}
            currentQuestion={
              currentQuestion
            }
            setCurrentQuestion={
              setCurrentQuestion
            }
            visitedQuestions={
              visitedQuestions
            }
            answeredQuestions={
              answeredQuestions
            }
            markedQuestions={
              markedQuestions
            }
          />

        </div>

        <div className="bg-white rounded-3xl border shadow-sm p-8">

          <h2 className="text-2xl font-bold mb-4">
            Question{" "}
            {currentQuestion + 1}
          </h2>

          <p className="text-xl mb-8">
            {question.question}
          </p>

          <div className="space-y-4">

            {[
              question.option_a,
              question.option_b,
              question.option_c,
              question.option_d,
            ].map(
              (option) => (

                <button
                  key={option}
                  onClick={() =>
                    selectAnswer(
                      question.id,
                      option
                    )
                  }
                  className={`w-full text-left p-4 rounded-2xl border transition

                  ${
                    answers[
                      question.id
                    ] === option
                      ? "bg-tcd-blue text-white border-tcd-blue"
                      : "bg-white hover:border-blue-400"
                  }
                `}
                >
                  {option}
                </button>
              )
            )}

          </div>

        </div>

        <div className="flex justify-between mt-6">

          <button
            onClick={() =>
              setCurrentQuestion(
                Math.max(
                  currentQuestion - 1,
                  0
                )
              )
            }
            disabled={
              currentQuestion === 0
            }
            className="px-8 py-3 rounded-2xl border bg-white disabled:opacity-50"
          >
            Previous
          </button>

          {currentQuestion <
          demoQuestions.length - 1 ? (

            <button
              onClick={() =>
                setCurrentQuestion(
                  currentQuestion +
                    1
                )
              }
              className="px-8 py-3 rounded-2xl bg-tcd-blue text-white"
            >
              Next
            </button>

          ) : (

            <button
              onClick={() => {

                toast.success(
                  "Demo Exam Submitted"
                );

                submitExam();
              }}
              className="px-8 py-3 rounded-2xl bg-green-600 text-white"
            >
              Submit Demo Exam
            </button>

          )}

        </div>

      </div>

    </main>
  );
}
"use client";

import { memo } from "react";

type Props = {

  question: any;

  currentQuestion: number;

  totalQuestions: number;

  selectedAnswer: string;

  selectAnswer: (
    questionId: string,
    answer: string
  ) => void;
};

function QuestionCard({

  question,

  currentQuestion,

  totalQuestions,

  selectedAnswer,

  selectAnswer,

}: Props) {

  return (

    <div className="max-w-5xl mx-auto pb-44">

      <div className="border p-5 rounded-3xl bg-white shadow-sm">

        <div className="flex items-center justify-between mb-3">

          <h2 className="font-bold text-2xl">

            Question
            {" "}
            {currentQuestion + 1}

          </h2>

          <div className="text-tcd-primary">

            {currentQuestion + 1}
            {" / "}
            {totalQuestions}

          </div>

        </div>

        <h2 className="font-semibold mb-4 text-xl leading-relaxed">

          {question.question}

        </h2>

        <div className="space-y-4">

        {[
  {
    key: "A",
    text: question.option_a,
  },
  {
    key: "B",
    text: question.option_b,
  },
  {
    key: "C",
    text: question.option_c,
  },
  {
    key: "D",
    text: question.option_d,
  },
].map((option) => (

       <button
  key={option.key}

  onClick={() =>
    selectAnswer(
      question.id,
      option.key
    )
  }

  className={`block w-full text-left border p-5 rounded-2xl transition-colors text-lg

    ${
      selectedAnswer ===
      option.key

        ? "bg-blue-500 text-white border-blue-500"

        : "bg-white hover:border-blue-400"
    }
  `}
>

              <>
  <span className="font-bold mr-2">
    {option.key}.
  </span>

  {option.text}
</>

            </button>

          ))}

        </div>

      </div>

    </div>
  );
}

export default memo(
  QuestionCard
);
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

          <div className="text-gray-500">

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
            question.option_a,
            question.option_b,
            question.option_c,
            question.option_d,
          ].map((
  option,
  index
) => (

            <button
  key={`${option}-${index}`}

  onClick={() =>
    selectAnswer(
      question.id,
      option
    )
  }

  className={`block w-full text-left border p-5 rounded-2xl transition-colors text-lg

    ${
      selectedAnswer ===
      option

        ? "bg-blue-500 text-white border-blue-500"

        : "bg-white hover:border-blue-400"
    }
  `}
>

              {option}

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
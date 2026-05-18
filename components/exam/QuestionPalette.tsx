"use client";

import React from "react";

type Props = {

  questions: any[];

  answers: Record<
    string,
    string
  >;

  currentQuestion: number;

  setCurrentQuestion: (
    index: number
  ) => void;
};

function QuestionPalette({

  questions,

  answers,

  currentQuestion,

  setCurrentQuestion,

}: Props) {

  return (

    <div className="flex gap-3 min-w-max">

      {questions.map(
        (
          question,
          index
        ) => {

          const answered =
            answers[
              question.id
            ];

          return (

            <button
              key={
                question.id
              }

              onClick={() =>
                setCurrentQuestion(
                  index
                )
              }

              className={`w-12 h-12 rounded-2xl font-bold transition-colors shrink-0

                ${
                  currentQuestion ===
                  index

                    ? "bg-blue-600 text-white shadow-lg"

                    : answered

                    ? "bg-green-500 text-white"

                    : "bg-gray-200 text-black hover:bg-gray-300"
                }
              `}
            >

              {index + 1}

            </button>
          );
        }
      )}

    </div>
  );
}

export default React.memo(
  QuestionPalette
);
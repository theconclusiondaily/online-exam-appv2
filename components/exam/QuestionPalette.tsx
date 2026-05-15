"use client";

import { memo } from "react";

type Props = {

  questions: any[];

  answers: any;

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

    <div className="
      hidden md:block
      fixed right-4 top-1/2
      -translate-y-1/2
      bg-white rounded-3xl
      shadow-2xl p-4
      w-24 z-40
    ">

      <div className="grid grid-cols-2 gap-3">

        {questions.map(
          (_, index) => (

            <button
              key={index}

              onClick={() =>
                setCurrentQuestion(
                  index
                )
              }

              className={`
                h-10 rounded-xl
                font-bold transition-all

                ${
                  currentQuestion ===
                  index

                    ? "bg-blue-600 text-white"

                    : answers[
                        questions[
                          index
                        ]?.id
                      ]

                    ? "bg-green-500 text-white"

                    : "bg-gray-200"
                }
              `}
            >

              {index + 1}

            </button>

          )
        )}

      </div>

    </div>
  );
}

export default memo(
  QuestionPalette
);
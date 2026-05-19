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

  visitedQuestions: number[];
};

function QuestionPalette({

  questions,

  answers,

  currentQuestion,

  setCurrentQuestion,

  visitedQuestions,

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
            id={`question-${index}`}
              key={
                question.id
              }

              onClick={() =>
                setCurrentQuestion(
                  index
                )
              }

              className={`

  w-14
  h-14

  rounded-2xl

  font-bold

  transition

  flex
  items-center
  justify-center

  ${
    currentQuestion === index

      ? "bg-blue-600 text-white"

      : answers[
          questions[index]?.id
        ]

      ? "bg-green-500 text-white"

      : visitedQuestions.includes(
          index
        )

      ? "bg-purple-500 text-white"

      : "bg-gray-200 text-black"
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
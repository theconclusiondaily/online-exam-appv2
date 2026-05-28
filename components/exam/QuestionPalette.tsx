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

  answeredQuestions:
  number[];
  visitedQuestions: number[];
};

function QuestionPalette({

  questions,

  answers,

  currentQuestion,

  setCurrentQuestion,

  visitedQuestions,

  answeredQuestions,

}: Props) {

  return (

    <div className="flex gap-3 min-w-max">

      {questions.map(
        (
          question,
          index
        ) => {

          const answered =
  answeredQuestions.includes(
    index
  );

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
  answered

    ? "bg-green-500 text-white"

    : currentQuestion === index

    ? "bg-blue-500 text-white"

    : visitedQuestions.includes(
        index
      )

    ? "bg-yellow-500 text-white"

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
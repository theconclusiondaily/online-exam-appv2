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

  visitedQuestions:
    number[];

  markedQuestions:
    number[];
};

function QuestionPalette({

  questions,

  answers,

  currentQuestion,

  setCurrentQuestion,

  visitedQuestions,

  answeredQuestions,

  markedQuestions,

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
const marked =
  markedQuestions.includes(
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
  currentQuestion === index

    ? "bg-blue-600 text-white ring-4 ring-blue-200"

    : marked && answered

    ? "bg-purple-600 text-white"

    : marked

    ? "bg-yellow-500 text-brand"

    : answered

    ? "bg-green-600 text-white"

    : visitedQuestions.includes(index)

    ? "bg-gray-400 text-white"

    : "bg-gray-200 text-brand"
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
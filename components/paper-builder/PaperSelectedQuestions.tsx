"use client";

import SortableQuestionList from "./SortableQuestionList";

interface Props {
  questions: any[];

  totalQuestions: number;

  totalMarks: number;

  moveQuestion: (
    activeId: string,
    overId: string
  ) => void;

  removeQuestion: (
    id: string
  ) => void;
}

export default function PaperSelectedQuestions({

  questions,

  totalQuestions,

  totalMarks,

  moveQuestion,

  removeQuestion,

}: Props) {
  

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-black text-tcd-blue">
            Selected Questions
          </h2>

          <p className="text-brand mt-1">
            Arrange your question paper
          </p>

        </div>

        <div className="bg-tcd-gold/10 text-tcd-gold px-4 py-2 rounded-xl font-bold">

          {totalQuestions}Selected

        </div>

      </div>

      {totalQuestions === 0 ? (

        <div className="text-center py-20">

          <div className="text-6xl mb-4">

            📄

          </div>

          <h3 className="text-xl font-bold text-tcd-blue">

            No Questions Added

          </h3>

          <p className="text-brand mt-2">

            Select questions from the Question Bank.

          </p>

        </div>

      ) : (

        <SortableQuestionList
    questions={questions}
    moveQuestion={moveQuestion}
    removeQuestion={removeQuestion}
/>

      )}

      <div className="border-t mt-8 pt-6">

        <div className="grid grid-cols-2 gap-6">

          <div className="bg-blue-50 rounded-2xl p-5">

            <div className="text-brand">

              Total Questions

            </div>

            <div className="text-3xl font-black text-tcd-blue">

              {totalQuestions}

            </div>

          </div>

          <div className="bg-yellow-50 rounded-2xl p-5">

            <div className="text-brand">

              Total Marks

            </div>

            <div className="text-3xl font-black text-tcd-gold">

              {totalMarks}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
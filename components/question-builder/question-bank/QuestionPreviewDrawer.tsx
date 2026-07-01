"use client";

import { X } from "lucide-react";
import { Question } from "./types";

interface Props {
  open: boolean;
  question: Question | null;
  onClose: () => void;
}

export default function QuestionPreviewDrawer({
  open,
  question,
  onClose,
}: Props) {
  if (!open || !question) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[700px] bg-white shadow-2xl z-50 overflow-y-auto">

        <div className="sticky top-0 bg-white border-b px-6 py-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-[#0F3D91]">
            Question Preview
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X />
          </button>

        </div>

        <div className="p-6 space-y-8">

          <section>

            <h3 className="font-semibold text-slate-500 mb-2">
              Question
            </h3>

            <div
              dangerouslySetInnerHTML={{
                __html: question.question,
              }}
            />

          </section>

          <section>

            <h3 className="font-semibold text-slate-500 mb-3">
              Options
            </h3>

            <div className="space-y-3">

              {[
                question.option_a,
                question.option_b,
                question.option_c,
                question.option_d,
              ].map((option, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4"
                >
                  {option}
                </div>
              ))}

            </div>

          </section>

          <section>

            <h3 className="font-semibold text-slate-500 mb-2">
              Correct Answer
            </h3>

            <div className="text-green-600 font-bold text-lg">
              {question.correct_answer}
            </div>

          </section>

          <section>

            <h3 className="font-semibold text-slate-500 mb-2">
              Explanation
            </h3>

            <div
              dangerouslySetInnerHTML={{
                __html: question.explanation ?? "",
              }}
            />

          </section>

          <section>

            <h3 className="font-semibold text-slate-500 mb-2">
              Metadata
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <div>Subject: {question.subject}</div>
              <div>Chapter: {question.chapter}</div>
              <div>Topic: {question.topic}</div>
              <div>Difficulty: {question.difficulty}</div>
              <div>Marks: {question.marks}</div>
              <div>Language: {question.language}</div>

            </div>

          </section>

        </div>

      </div>
    </>
  );
}
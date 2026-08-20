"use client";

import React, { memo } from "react";
import { MathJax } from "better-react-mathjax";
import MathText from "@/components/common/MathText";

type QuestionData = {
  id: string;

  question?: string;
  question_text_hi?: string;

  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;

  option_a_hi?: string;
  option_b_hi?: string;
  option_c_hi?: string;
  option_d_hi?: string;

  shuffledOptions?: string[];
};

type Props = {
  question: QuestionData | null;

  language: "en" | "hi";

  selectedAnswer: string | null;

  onSelectAnswer: (
    questionId: string,
    optionKey: string
  ) => void;
};

function ExamQuestionPanel({
  question,
  language,
  selectedAnswer,
  onSelectAnswer,
}: Props) {

  if (!question) {
    return null;
  }

  const options =
    question.shuffledOptions ??
    [
      question.option_a,
      question.option_b,
      question.option_c,
      question.option_d,
    ].filter(Boolean) as string[];

  return (
    <>
      <div className="text-2xl leading-loose font-medium text-[#243B6B] mb-10">

        <MathJax dynamic>
          {language === "hi"
            ? question.question_text_hi ||
              question.question
            : question.question}
        </MathJax>

      </div>

      <div className="space-y-4">

        {options.map(
          (
            option: string,
            index: number
          ) => {

            const optionKey =
              option === question.option_a
                ? "A"
                : option === question.option_b
                ? "B"
                : option === question.option_c
                ? "C"
                : "D";

            const displayLabel =
              ["A", "B", "C", "D"][index];

            const optionText =
              language === "hi"
                ? (
                    optionKey === "A"
                      ? question.option_a_hi ||
                        question.option_a
                      : optionKey === "B"
                      ? question.option_b_hi ||
                        question.option_b
                      : optionKey === "C"
                      ? question.option_c_hi ||
                        question.option_c
                      : question.option_d_hi ||
                        question.option_d
                  )
                : option;

            return (
              <button
                key={`${question.id}-${optionKey}`}
                onClick={() =>
                  onSelectAnswer(
                    question.id,
                    optionKey
                  )
                }
                className={`w-full text-left p-3 rounded-xl border text-lg font-medium transition-colors ${
                  selectedAnswer === optionKey
                    ? "bg-[#243B6B] text-white border-[#243B6B] shadow-lg"
                    : "bg-white text-[#243B6B] border-gray-200 hover:border-[#243B6B] hover:bg-[#243B6B]/5"
                }`}
              >

                <span className="font-bold mr-2">
                  {displayLabel}.
                </span>

                <MathText
                  text={optionText || ""}
                />

              </button>
            );
          }
        )}

      </div>
    </>
  );
}

export default memo(
  ExamQuestionPanel
);
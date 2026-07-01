"use client";

import { useMemo, useState } from "react";
import { DEFAULT_QUESTION } from "../constants";
import { QuestionState } from "../types";

export function useQuestionBuilder() {
  const [question, setQuestion] =
    useState<QuestionState>(DEFAULT_QUESTION);
const [questionId, setQuestionId] =
useState<string>();
  // ----------------------------
  // Metadata
  // ----------------------------

  function updateMetadata(
    key: keyof QuestionState["metadata"],
    value: string | number
  ) {
    setQuestion((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [key]: value,
      },
    }));
  }

  // ----------------------------
  // Question
  // ----------------------------

  function updateQuestionEn(value: string) {
    setQuestion((prev) => ({
      ...prev,
      questionEn: value,
    }));
  }

  function updateQuestionHi(value: string) {
    setQuestion((prev) => ({
      ...prev,
      questionHi: value,
    }));
  }

  // ----------------------------
  // Options
  // ----------------------------

  function updateOptionEn(
  index: number,
  value: string
) {
  setQuestion((prev) => {
    const options = [...prev.optionsEn];
    options[index] = value;

    return {
      ...prev,
      optionsEn: options,
    };
  });
}
  function updateOptionHi(
  index: number,
  value: string
) {
  setQuestion((prev) => {
    const options = [...prev.optionsHi];
    options[index] = value;

    return {
      ...prev,
      optionsHi: options,
    };
  });
}

  // ----------------------------
  // Correct Answer
  // ----------------------------

  function setCorrectAnswer(answer: string) {
    setQuestion((prev) => ({
      ...prev,
      correctAnswer: answer,
    }));
  }

  // ----------------------------
  // Explanation
  // ----------------------------

  function updateExplanationEn(value: string) {
    setQuestion((prev) => ({
      ...prev,
      explanationEn: value,
    }));
  }

  function updateExplanationHi(value: string) {
    setQuestion((prev) => ({
      ...prev,
      explanationHi: value,
    }));
  }
function loadQuestion(data: any) {
  setQuestionId(data.id);

  setQuestion((prev) => ({
    ...prev,

    metadata: {
      ...prev.metadata,

      subject: data.subject ?? "",
      chapter: data.chapter ?? "",
      topic: data.topic ?? "",

      difficulty: data.difficulty ?? "",

      marks: data.marks ?? 4,

      negativeMarks:
        Number(data.negative_marks ?? 1),

      language:
        data.language ?? "English",

      questionType:
        data.question_type ?? "MCQ",
    },

    questionEn: data.question ?? "",
    questionHi: data.question_text_hi ?? "",

    optionsEn: [
      data.option_a ?? "",
      data.option_b ?? "",
      data.option_c ?? "",
      data.option_d ?? "",
    ],

    optionsHi: [
      data.option_a_hi ?? "",
      data.option_b_hi ?? "",
      data.option_c_hi ?? "",
      data.option_d_hi ?? "",
    ],

    explanationEn:
      data.explanation ?? "",

    explanationHi:
      data.explanation_hi ?? "",

    correctAnswer:
      data.correct_answer ?? "A",

    images:
      data.images ?? [],
  }));
}
  // ----------------------------
  // Images
  // ----------------------------

  function addImage(url: string) {
    setQuestion((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
  }

  function removeImage(index: number) {
    setQuestion((prev) => ({
      ...prev,
      images: prev.images.filter(
        (_, i) => i !== index
      ),
    }));
  }

  // ----------------------------
  // Validation
  // ----------------------------

  const completion = useMemo(() => {
    const checks = [
      question.questionEn.trim() !== "",
      question.questionHi.trim() !== "",
      question.optionsEn.every((x) => x.trim()),
      question.optionsHi.every((x) => x.trim()),
      question.correctAnswer !== "",
      question.explanationEn.trim() !== "",
      question.explanationHi.trim() !== "",
    ];

    const completed = checks.filter(Boolean).length;

    return Math.round(
      (completed / checks.length) * 100
    );
  }, [question]);

 return {
  question,
questionId,

setQuestionId,
  updateMetadata,

  updateQuestionEn,
  updateQuestionHi,

  updateOptionEn,
  updateOptionHi,

  setCorrectAnswer,

  updateExplanationEn,
  updateExplanationHi,

  addImage,
  removeImage,
loadQuestion,
  

  completion,
};
}

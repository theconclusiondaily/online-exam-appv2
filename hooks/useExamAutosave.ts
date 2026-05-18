"use client";

import { useEffect } from "react";

type Props = {

  answers: any;

  examStarted: boolean;

  userId: string;

  examId: string | undefined;

  questionsLength: number;
};

export default function
useExamAutosave({

  answers,

  examStarted,

  userId,

  examId,

  questionsLength,

}: Props) {

  useEffect(() => {

    if (
      !examStarted
    ) {

      return;
    }

    localStorage.setItem(

      `exam-answers-${examId}`,

      JSON.stringify(
        answers
      )
    );

  }, [

    answers,

    examStarted,

    examId,

    userId,

    questionsLength,
  ]);
}
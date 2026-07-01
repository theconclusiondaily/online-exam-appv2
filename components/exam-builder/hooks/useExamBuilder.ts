"use client";

import { useState } from "react";
import { ExamForm } from "../types";

export function useExamBuilder() {

  const [exam, setExam] =
    useState<ExamForm>({

      title: "",

      description: "",

      paper_id: "",

      start_time: "",

      end_time: "",

      duration: 60,

      reward_pool: 0,

      scholarship_enabled: false,

      scholarship_pool: 0,

      rank_1_amount: 0,

      rank_2_amount: 0,

      rank_3_amount: 0,

      tcd_enabled: false,

      tcd_reward_pool: 0,

      review_delay_minutes: 30,

      exam_scope: "PUBLIC",

      challenge_type: "Daily",

      published: false,

    });

  function updateField(
    field: keyof ExamForm,
    value: any
  ) {

    setExam(prev => ({

      ...prev,

      [field]: value,

    }));

  }
function loadExam(examData: ExamForm) {
  setExam(examData);
}
 const [step, setStep] = useState(1);

function nextStep() {
  setStep((prev) => Math.min(prev + 1, 6));
}

function previousStep() {
  setStep((prev) => Math.max(prev - 1, 1));
}

return {

  exam,

  updateField,

  loadExam,

  step,

  setStep,

  nextStep,

  previousStep,

};
  

}

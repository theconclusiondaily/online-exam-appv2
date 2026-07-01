"use client";

import { useEffect } from "react";
import { getExam } from "../services/getExam";

export function useLoadExam(
  examId: string | undefined,
  loadExam: (exam: any) => void
) {
  useEffect(() => {
    if (!examId) return;

    // Create a local variable that is definitely a string
    const id = examId;

    async function load() {
      try {
        const exam = await getExam(id);
        loadExam(exam);
      } catch (error) {
        console.error("Failed to load exam:", error);
      }
    }

    load();
  }, [examId, loadExam]);
}
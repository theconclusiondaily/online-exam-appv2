"use client";

import { useEffect, useMemo, useState } from "react";
import { getQuestions } from "@/components/question-builder/services/questionService";

export function usePaperBuilder() {
  // ----------------------------
  // State
  // ----------------------------

  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters

  const [search, setSearch] = useState("");

  const [subject, setSubject] = useState("");

  const [difficulty, setDifficulty] = useState("");

  const [language, setLanguage] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // ----------------------------
  // Load Question Bank
  // ----------------------------

  useEffect(() => {
    async function load() {
      try {
        const data = await getQuestions();

        setQuestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // ----------------------------
  // Filtered Questions
  // ----------------------------

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        q.question
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesSubject =
        !subject || q.subject === subject;

      const matchesDifficulty =
        !difficulty ||
        q.difficulty === difficulty;

      const matchesLanguage =
        !language ||
        q.language === language;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesDifficulty &&
        matchesLanguage
      );
    });
  }, [
    questions,
    search,
    subject,
    difficulty,
    language,
  ]);

  // ----------------------------
  // Add Question
  // ----------------------------

  function addQuestion(question: any) {
    setSelectedQuestions((prev) => {
      if (prev.some((q) => q.id === question.id)) {
        return prev;
      }

      return [...prev, question];
    });
  }

  // ----------------------------
  // Remove Question
  // ----------------------------

  function removeQuestion(id: string) {
    setSelectedQuestions((prev) =>
      prev.filter((q) => q.id !== id)
    );
  }
function toggleSelection(id: string) {
  setSelectedIds((prev) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
  );
}

function addSelectedQuestions() {
  const questionsToAdd = questions.filter((q) =>
    selectedIds.includes(q.id)
  );

  setSelectedQuestions((prev) => {
    const existing = new Set(prev.map((q) => q.id));

    const newQuestions = questionsToAdd.filter(
      (q) => !existing.has(q.id)
    );

    return [...prev, ...newQuestions];
  });

  setSelectedIds([]);
}
  // ----------------------------
  // Load Existing Paper
  // ----------------------------

  function loadPaper(
    paper: any,
    paperQuestions: any[]
  ) {
    const loadedQuestions = paperQuestions.map(
      (item: any) => {
        if (item.questions) {
          return item.questions;
        }

        return item;
      }
    );

    setSelectedQuestions(loadedQuestions);
  }

  // ----------------------------
  // Clear Paper
  // ----------------------------

  function clearPaper() {
    setSelectedQuestions([]);
  }

  // ----------------------------
  // Statistics
  // ----------------------------

  const totalQuestions =
    selectedQuestions.length;

  const totalMarks =
    selectedQuestions.reduce(
      (sum, q) => sum + (q.marks ?? 0),
      0
    );
function moveQuestion(
  activeId: string,
  overId: string
) {

  const oldIndex =
    selectedQuestions.findIndex(
      q => q.id === activeId
    );

  const newIndex =
    selectedQuestions.findIndex(
      q => q.id === overId
    );

  if (
    oldIndex === -1 ||
    newIndex === -1
  )
    return;

  const updated = [...selectedQuestions];

  const [removed] =
    updated.splice(oldIndex, 1);

  updated.splice(
    newIndex,
    0,
    removed
  );

  setSelectedQuestions(updated);

}
  // ----------------------------
  // Return
  // ----------------------------

  return {
    loading,

    questions: filteredQuestions,

    selectedQuestions,

    totalQuestions,

    totalMarks,

    search,
    setSearch,

    subject,
    setSubject,

    difficulty,
    setDifficulty,

    language,
    setLanguage,

    addQuestion,

    removeQuestion,

    loadPaper,

    clearPaper,

    selectedIds,
toggleSelection,
addSelectedQuestions,

moveQuestion,
  };
}
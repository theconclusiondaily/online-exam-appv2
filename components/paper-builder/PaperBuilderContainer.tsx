"use client";

import { useParams } from "next/navigation";

import PaperHeader from "./PaperHeader";

import { usePaperBuilder } from "./hooks/usePaperBuilder";
import { useLoadPaper } from "./hooks/useLoadPaper";

import { savePaperQuestions } from "./services/savePaperQuestions";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import PaperSelectedQuestions from "./PaperSelectedQuestions";
import SortableQuestion from "./SortableQuestion";
import PaperSavePanel from "./PaperSavePanel";
import PaperQuestionBank from "./PaperQuestionBank";
export default function PaperBuilderContainer() {
  const params = useParams();

  const paperId = params.id as string;

  const paper = usePaperBuilder();

  useLoadPaper(
    paperId,
    paper.loadPaper
  );

  async function handleSave() {
    try {
      await savePaperQuestions(
        paperId,
        paper.selectedQuestions.map((q) => q.id)
      );

      alert("Paper saved successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to save paper.");
    }
  }

  return (
    <div className="p-8 space-y-8">

      <PaperHeader
        onSave={handleSave}
      />

      <div className="grid grid-cols-2 gap-8">
<div className="mt-8">

  <PaperSavePanel
    totalQuestions={paper.totalQuestions}
    totalMarks={paper.totalMarks}
    onSave={handleSave}
  />

</div>
        {/* LEFT PANEL */}

<PaperQuestionBank
  loading={paper.loading}
  questions={paper.questions}

  search={paper.search}
  setSearch={paper.setSearch}

  subject={paper.subject}
  setSubject={paper.setSubject}

  difficulty={paper.difficulty}
  setDifficulty={paper.setDifficulty}

  language={paper.language}
  setLanguage={paper.setLanguage}

  selectedIds={paper.selectedIds}

  toggleSelection={paper.toggleSelection}

  addSelectedQuestions={paper.addSelectedQuestions}
/>

        {/* ================= RIGHT PANEL ================= */}

        {/* RIGHT PANEL */}

  <PaperSelectedQuestions
    questions={paper.selectedQuestions}

    totalQuestions={paper.totalQuestions}

    totalMarks={paper.totalMarks}

    moveQuestion={paper.moveQuestion}

    removeQuestion={paper.removeQuestion}
/>

</div>

      </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Paper {
  id: string;
  title: string;
}

interface Props {
  open: boolean;
  selectedIds: string[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddToPaperDialog({
  open,
  selectedIds,
  onClose,
  onSuccess,
}: Props) {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [paperId, setPaperId] = useState("");

  useEffect(() => {
    if (!open) return;

    async function loadPapers() {
      const { data } = await supabase
        .from("papers")
        .select("id,title")
        .eq("status", "Published")
        .order("title");

      setPapers(data || []);
    }

    loadPapers();
  }, [open]);

  if (!open) return null;
async function handleAdd() {

  if (!paperId) {
    alert("Please select a paper.");
    return;
  }

  try {

    // Load existing questions

    const {
      data: existingRows,
      error: existingError,
    } = await supabase
      .from("paper_questions")
      .select("question_id, question_order")
      .eq("paper_id", paperId);

    if (existingError) throw existingError;

    const existingQuestionIds =
      new Set(
        (existingRows || []).map(
          (q) => q.question_id
        )
      );

    const maxOrder =
      Math.max(
        0,
        ...(existingRows || []).map(
          (q) => q.question_order ?? 0
        )
      );

    // Only keep new questions

    const newQuestionIds =
      selectedIds.filter(
        (id) => !existingQuestionIds.has(id)
      );

    if (newQuestionIds.length === 0) {

      alert(
        "All selected questions already exist in this paper."
      );

      return;

    }

    const rows =
      newQuestionIds.map(
        (questionId, index) => ({
          paper_id: paperId,
          question_id: questionId,
          question_order:
            maxOrder + index + 1,
        })
      );

    const { error: insertError } =
      await supabase
        .from("paper_questions")
        .insert(rows);

    if (insertError) throw insertError;

    // Update paper statistics

    const totalQuestions =
      maxOrder + newQuestionIds.length;

    const { error: updateError } =
      await supabase
        .from("question_papers")
        .update({
          total_questions: totalQuestions,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", paperId);

    if (updateError) throw updateError;

    alert(
      `${newQuestionIds.length} questions added successfully.`
    );

    onSuccess();

    onClose();

  } catch (err) {

    console.error(err);

    alert(
      "Failed to add questions."
    );

  }

}
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-[500px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Add Questions to Paper
        </h2>

        <p className="mb-4">
          Selected Questions: {selectedIds.length}
        </p>

        <select
          className="w-full border rounded-xl p-3"
          value={paperId}
          onChange={(e) => setPaperId(e.target.value)}
        >
          <option value="">Select Paper</option>

          {papers.map((paper) => (
            <option key={paper.id} value={paper.id}>
              {paper.title}
            </option>
          ))}

        </select>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="border rounded-xl px-5 py-2"
          >
            Cancel
          </button>

          <button
  onClick={handleAdd}
  className="bg-[#0F3D91] text-white rounded-xl px-5 py-2"
>
  Add Questions
</button>

        </div>

      </div>

    </div>
  );
}
"use client";
import { ExamForm } from "./types";
import { QuestionPaper } from "./types";

interface Props {
  papers: QuestionPaper[];
  loading: boolean;
  paperId: ExamForm["paper_id"];
  onSelect: (id: string) => void;
}

export default function PaperSelector({
  papers,
  loading,
  paperId,
  onSelect,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-8 mt-8">

      <h2 className="text-2xl font-black text-tcd-blue mb-6">
        Select Question Paper
      </h2>

      {loading ? (
        <p>Loading papers...</p>
      ) : (
        <select
          value={paperId}
          onChange={(e) =>
            onSelect(e.target.value)
          }
          className="w-full border rounded-2xl p-4"
        >
          <option value="">
            Select Published Paper
          </option>

          {papers.map((paper) => (
            <option
              key={paper.id}
              value={paper.id}
            >
              {paper.title} • {paper.subject} •{" "}
              {paper.total_questions} Questions
            </option>
          ))}
        </select>
      )}

    </div>
  );
}
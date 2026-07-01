"use client";

import {
  Trash2,
  CheckCircle2,
  Archive,
  FilePlus2,
  ClipboardList,
  X,
} from "lucide-react";

interface Props {
  selectedCount: number;

  onClear: () => void;
  onDelete: () => void;
  onPublish: () => void;
  onArchive: () => void;
  onAddToPaper: () => void;
  onAddToExam: () => void;
}

export default function BulkToolbar({
  selectedCount,
  onClear,
  onDelete,
  onPublish,
  onArchive,
  onAddToPaper,
  onAddToExam,
}: Props) {

  if (selectedCount === 0) return null;

  return (

    <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div className="font-semibold text-[#0F3D91]">

          {selectedCount} Question(s) Selected

        </div>

        <div className="flex flex-wrap gap-2">

          <button
            onClick={onPublish}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white"
          >
            <CheckCircle2 size={18} />
            Publish
          </button>

          <button
            onClick={onArchive}
            className="flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-white"
          >
            <Archive size={18} />
            Archive
          </button>

          <button
            onClick={onAddToPaper}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white"
          >
            <FilePlus2 size={18} />
            Add to Paper
          </button>

          <button
            onClick={onAddToExam}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-white"
          >
            <ClipboardList size={18} />
            Add to Exam
          </button>

          <button
            onClick={onDelete}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white"
          >
            <Trash2 size={18} />
            Delete
          </button>

          <button
            onClick={onClear}
            className="flex items-center gap-2 rounded-xl border px-4 py-2"
          >
            <X size={18} />
            Clear
          </button>

        </div>

      </div>

    </div>

  );
}
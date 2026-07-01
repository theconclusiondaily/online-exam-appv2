"use client";

import { ExamForm } from "./types";

interface Props {
  exam: ExamForm;
  onSave: () => void;
  onPublish: () => void;
  publishing?: boolean;
}

export default function PublishPanel({
  exam,
  onSave,
  onPublish,
  publishing = false,
}: Props) {
  const canPublish =
    exam.title.trim() !== "" &&
    exam.paper_id !== "" &&
    exam.start_time !== "" &&
    exam.end_time !== "";

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <h2 className="text-2xl font-black text-tcd-blue mb-6">
        Publish Exam
      </h2>

      <div className="space-y-4">

        <Status
          label="Exam Title"
          ok={exam.title.trim() !== ""}
        />

        <Status
          label="Question Paper Selected"
          ok={exam.paper_id !== ""}
        />

        <Status
          label="Schedule Configured"
          ok={
            exam.start_time !== "" &&
            exam.end_time !== ""
          }
        />

      </div>

      <div className="border-t mt-8 pt-6 flex gap-4">

        <button
          onClick={onSave}
          className="
            flex-1
            bg-gray-200
            hover:bg-gray-300
            rounded-2xl
            py-4
            font-bold
          "
        >
          Save Draft
        </button>

        <button
          disabled={!canPublish || publishing}
          onClick={onPublish}
          className={`
            flex-1
            rounded-2xl
            py-4
            font-bold
            text-white

            ${
              canPublish
                ? "bg-tcd-blue hover:bg-[#35548C]"
                : "bg-gray-400 cursor-not-allowed"
            }
          `}
        >
          {publishing
            ? "Publishing..."
            : "Publish Exam"}
        </button>

      </div>

    </div>
  );
}

function Status({
  label,
  ok,
}: {
  label: string;
  ok: boolean;
}) {
  return (
    <div className="flex justify-between items-center">

      <span>{label}</span>

      <span
        className={
          ok
            ? "text-green-600 font-bold"
            : "text-red-500 font-bold"
        }
      >
        {ok ? "✓ Ready" : "✗ Missing"}
      </span>

    </div>
  );
}
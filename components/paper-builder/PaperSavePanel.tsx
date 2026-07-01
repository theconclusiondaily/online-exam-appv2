"use client";

interface Props {
  totalQuestions: number;
  totalMarks: number;
  onSave: () => void;
  onPublish?: () => void;
  saving?: boolean;
}

export default function PaperSavePanel({
  totalQuestions,
  totalMarks,
  onSave,
  onPublish,
  saving = false,
}: Props) {

  const ready = totalQuestions > 0;

  return (

    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <h2 className="text-2xl font-black text-tcd-blue mb-6">

        Paper Summary

      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">

          <span className="text-brand">

            Total Questions

          </span>

          <span className="font-black text-xl text-tcd-blue">

            {totalQuestions}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-brand">

            Total Marks

          </span>

          <span className="font-black text-xl text-green-600">

            {totalMarks}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-brand">

            Status

          </span>

          <span
            className={
              ready
                ? "text-green-600 font-bold"
                : "text-red-500 font-bold"
            }
          >
            {ready ? "Ready" : "Incomplete"}
          </span>

        </div>

      </div>

      <div className="border-t mt-8 pt-6 flex gap-4">

        <button
          onClick={onSave}
          disabled={saving}
          className="
            flex-1
            bg-tcd-blue
            hover:bg-[#35548C]
            text-white
            rounded-2xl
            py-4
            font-bold
            disabled:opacity-50
          "
        >
          {saving ? "Saving..." : "Save Paper"}
        </button>

        {onPublish && (

          <button
            onClick={onPublish}
            disabled={!ready}
            className="
              flex-1
              bg-tcd-gold
              hover:opacity-90
              text-white
              rounded-2xl
              py-4
              font-bold
              disabled:opacity-40
            "
          >
            Publish Paper
          </button>

        )}

      </div>

    </div>

  );

}
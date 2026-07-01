"use client";

interface Props {
  hasQuestion: boolean;
  hasAnswer: boolean;
  hasExplanation: boolean;
  saving?: boolean;

  onSave: () => void;
  onPreview?: () => void;
}

export default function QuestionSavePanel({

  hasQuestion,

  hasAnswer,

  hasExplanation,

  saving = false,

  onSave,

  onPreview,

}: Props) {

  const ready =
    hasQuestion &&
    hasAnswer &&
    hasExplanation;

  return (

    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <h2 className="text-2xl font-black text-tcd-blue mb-8">

        Question Status

      </h2>

      <div className="space-y-5">

        <Status
          label="Question"
          ok={hasQuestion}
        />

        <Status
          label="Correct Answer"
          ok={hasAnswer}
        />

        <Status
          label="Explanation"
          ok={hasExplanation}
        />

      </div>

      <div className="border-t mt-8 pt-8 flex gap-4">

        {onPreview && (

          <button
            onClick={onPreview}
            className="
              flex-1

              border

              rounded-2xl

              py-4

              font-bold
            "
          >
            Preview
          </button>

        )}

        <button

          onClick={onSave}

          disabled={!ready || saving}

          className={`
            flex-1

            rounded-2xl

            py-4

            font-bold

            text-white

            ${
              ready
                ? "bg-tcd-blue hover:bg-[#35548C]"
                : "bg-gray-400"
            }
          `}

        >

          {saving

            ? "Saving..."

            : "Save Question"}

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

    <div className="flex justify-between">

      <span>

        {label}

      </span>

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
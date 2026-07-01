"use client";

interface Props {
  onSave: () => void;
  onPublish: () => void;
}

export default function ExamHeader({
  onSave,
  onPublish,
}: Props)  {
  return (
    <div className="flex items-center justify-between mb-8">

      <div>

        <h1 className="text-4xl font-black text-tcd-blue">
          Exam Builder
        </h1>

        <p className="text-tcd-primary mt-2">
          Create and configure a new examination.
        </p>

      </div>
<div className="flex gap-4">

  <button
    onClick={onSave}
    className="bg-gray-200 hover:bg-gray-300 rounded-2xl px-6 py-3 font-bold"
  >
    Save Draft
  </button>

  <button
    onClick={onPublish}
    className="bg-tcd-blue hover:bg-[#35548C] text-white rounded-2xl px-8 py-3 font-bold"
  >
    Publish
  </button>

</div>

    </div>
  );
}
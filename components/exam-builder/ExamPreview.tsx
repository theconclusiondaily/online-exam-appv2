"use client";

import { ExamForm } from "./types";

interface Props {
  exam: ExamForm;
  paperTitle?: string;
}

export default function ExamPreview({
  exam,
  paperTitle,
}: Props) {
  const totalPrize =
    Number(exam.rank_1_amount) +
    Number(exam.rank_2_amount) +
    Number(exam.rank_3_amount);

  const totalDistribution =
    totalPrize +
    Number(exam.scholarship_enabled ? exam.scholarship_pool : 0) +
    Number(exam.tcd_enabled ? exam.tcd_reward_pool : 0);

  const valid =
    totalDistribution <= Number(exam.reward_pool);

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <h2 className="text-2xl font-black text-tcd-blue mb-8">
        Exam Preview
      </h2>

      <div className="space-y-4">

        <PreviewItem
          title="Exam"
          value={exam.title || "-"}
        />

        <PreviewItem
          title="Question Paper"
          value={paperTitle || "-"}
        />

        <PreviewItem
          title="Duration"
          value={`${exam.duration} Minutes`}
        />

        <PreviewItem
          title="Challenge"
          value={exam.challenge_type}
        />

        <PreviewItem
          title="Scope"
          value={exam.exam_scope}
        />

        <PreviewItem
          title="Reward Pool"
          value={`₹ ${exam.reward_pool}`}
        />

        <PreviewItem
          title="Prize Distribution"
          value={`₹ ${totalDistribution}`}
        />

      </div>

      <div className="mt-8">

        {valid ? (

          <div className="rounded-2xl bg-green-100 text-green-700 p-4 font-bold">

            ✓ Reward distribution is valid

          </div>

        ) : (

          <div className="rounded-2xl bg-red-100 text-red-700 p-4 font-bold">

            Reward distribution exceeds Reward Pool

          </div>

        )}

      </div>

    </div>
  );
}

function PreviewItem({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="flex justify-between border-b pb-3">

      <span className="text-brand">

        {title}

      </span>

      <span className="font-bold">

        {value}

      </span>

    </div>
  );
}
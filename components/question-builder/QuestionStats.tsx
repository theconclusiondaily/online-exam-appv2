"use client";

interface Props {
  total: number;
  physics: number;
  chemistry: number;
  biology: number;
}

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-[#0F3D91] mt-3">
        {value}
      </h2>

    </div>
  );
}

export default function QuestionStats({
  total,
  physics,
  chemistry,
  biology,
}: Props) {

  return (

    <div className="grid grid-cols-4 gap-6 mb-8">

      <Card
        title="Total Questions"
        value={total}
      />

      <Card
        title="Physics"
        value={physics}
      />

      <Card
        title="Chemistry"
        value={chemistry}
      />

      <Card
        title="Biology / Math"
        value={biology}
      />

    </div>

  );
}
"use client";

interface Props {
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctAnswer: string;
}

export default function ValidationPanel({
  questionEn,
  questionHi,
  optionsEn,
  optionsHi,
  correctAnswer,
}: Props) {

  const checks = [

    {
      label: "English Question",
      ok: questionEn.trim().length > 0,
    },

    {
      label: "Hindi Question",
      ok: questionHi.trim().length > 0,
    },

    {
      label: "English Options",
      ok: optionsEn.every(o => o.trim()),
    },

    {
      label: "Hindi Options",
      ok: optionsHi.every(o => o.trim()),
    },

    {
      label: "Correct Answer",
      ok: correctAnswer !== "",
    },

  ];

  const completed = checks.filter(c => c.ok).length;

  const percent = Math.round(
    completed * 100 / checks.length
  );

  return (

<div className="bg-white rounded-3xl border shadow-sm p-6 sticky top-6">

<h2 className="text-xl font-bold text-[#0F3D91] mb-6">

Validation

</h2>

<div className="space-y-4">

{checks.map((check)=>(

<div
key={check.label}
className="flex justify-between"
>

<span>

{check.label}

</span>

<span>

{check.ok ? "✅" : "⚠️"}

</span>

</div>

))}

</div>

<div className="mt-8">

<div className="flex justify-between mb-2">

<span>Completion</span>

<strong>

{percent}%

</strong>

</div>

<div className="h-3 rounded-full bg-slate-200">

<div
className="h-3 rounded-full bg-[#0F3D91]"
style={{
width:`${percent}%`
}}
/>

</div>

</div>

</div>

);

}
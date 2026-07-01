"use client";

interface Props {
  difficulty: string;
}

export default function DifficultyBadge({
  difficulty,
}: Props) {

  const map: Record<string, string> = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        map[difficulty] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {difficulty}
    </span>
  );
}
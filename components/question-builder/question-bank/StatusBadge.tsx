"use client";

interface Props {
  status?: string;
}

export default function StatusBadge({
  status = "Draft",
}: Props) {

  const map: Record<string, string> = {
    Draft: "bg-orange-100 text-orange-700",
    Published: "bg-green-100 text-green-700",
    Archived: "bg-slate-200 text-slate-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        map[status] ??
        map.Draft
      }`}
    >
      {status}
    </span>
  );
}
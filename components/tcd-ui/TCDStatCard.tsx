"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: "blue" | "green" | "gold" | "red";
}

export default function TCDStatCard({
  title,
  value,
  icon,
  color = "blue",
}: Props) {

  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    gold: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        {icon && (
          <div className={`p-4 rounded-2xl ${colors[color]}`}>
            {icon}
          </div>
        )}

      </div>

    </div>
  );
}
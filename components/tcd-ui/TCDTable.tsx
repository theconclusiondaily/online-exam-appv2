"use client";

import { ReactNode } from "react";

interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  children: ReactNode;
}

export default function TCDTable({
  columns,
  children,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            {columns.map((col) => (

              <th
                key={col.key}
                className="text-left px-6 py-4 font-semibold text-slate-700"
              >
                {col.label}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {children}

        </tbody>

      </table>

    </div>
  );
}
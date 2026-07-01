"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function TCDToolbar({
  children,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-4">
      {children}
    </div>
  );
}
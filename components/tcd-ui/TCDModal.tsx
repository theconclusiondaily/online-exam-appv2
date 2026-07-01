"use client";

import { ReactNode } from "react";

interface Props {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function TCDModal({
  open,
  title,
  children,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl">

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-bold text-[#0F3D91]">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-600"
          >
            ✕
          </button>

        </div>

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}
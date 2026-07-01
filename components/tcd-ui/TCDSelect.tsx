"use client";

import { SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export default function TCDSelect({
  label,
  children,
  className = "",
  ...props
}: Props) {
  return (
    <div className="space-y-2">

      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <select
        {...props}
        className={`
          w-full
          rounded-2xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-[#0F3D91]
          focus:border-[#0F3D91]
          ${className}
        `}
      >
        {children}
      </select>

    </div>
  );
}
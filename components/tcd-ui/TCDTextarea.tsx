"use client";

import { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
}

export default function TCDTextarea({
  label,
  helperText,
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

      <textarea
        {...props}
        className={`
          w-full
          rounded-2xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          resize-none
          transition
          focus:outline-none
          focus:ring-2
          focus:ring-[#0F3D91]
          focus:border-[#0F3D91]
          ${className}
        `}
      />

      {helperText && (
        <p className="text-xs text-slate-500">
          {helperText}
        </p>
      )}

    </div>
  );
}
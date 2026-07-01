"use client";

import { ReactNode } from "react";

interface Props {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function TCDCard({
  title,
  subtitle,
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        p-6
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-5">
          {title && (
            <h2 className="text-2xl font-bold text-[#0F3D91]">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="text-gray-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
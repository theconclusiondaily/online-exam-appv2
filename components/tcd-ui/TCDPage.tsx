"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function TCDPage({
  title,
  subtitle,
  actions,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-[1700px] mx-auto p-6">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-4xl font-bold text-[#0F3D91]">
              {title}
            </h1>

            {subtitle && (
              <p className="text-slate-500 mt-2">
                {subtitle}
              </p>
            )}

          </div>

          {actions && (
            <div className="flex gap-3">
              {actions}
            </div>
          )}

        </div>

        {children}

      </div>

    </div>
  );
}
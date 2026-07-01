"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function PageContainer({
  title,
  subtitle,
  children,
  actions,
}: Props) {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            {title}
          </h1>

          {subtitle && (
            <p className="text-slate-500 mt-1">
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
  );
}
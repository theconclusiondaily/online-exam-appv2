import { ReactNode } from "react";
import clsx from "clsx";
import GlassCard from "./GlassCard";

interface MetricCardProps {
  value: string;

  label: string;

  description?: string;

  icon?: ReactNode;

  trend?: string;

  align?: "left" | "center";

  variant?: "glass" | "solid" | "dark";

  className?: string;
}

export default function MetricCard({
  value,
  label,
  description,
  icon,
  trend,
  align = "center",
  variant = "glass",
  className,
}: MetricCardProps) {
  const centered = align === "center";

  return (
    <GlassCard
      variant={variant}
      className={clsx(
        centered ? "text-center" : "text-left",
        className
      )}
    >
      {icon && (
        <div
          className={clsx(
            "mb-6 flex",
            centered
              ? "justify-center"
              : "justify-start"
          )}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            {icon}
          </div>
        </div>
      )}

      <h3 className="text-4xl font-black text-brand lg:text-5xl">
        {value}
      </h3>

      <p className="mt-3 text-lg font-semibold text-brand">
        {label}
      </p>

      {description && (
        <p className="mt-3 text-sm leading-6 text-brand-muted">
          {description}
        </p>
      )}

      {trend && (
        <span className="mt-5 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {trend}
        </span>
      )}
    </GlassCard>
  );
}
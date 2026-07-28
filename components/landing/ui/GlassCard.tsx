import { ReactNode } from "react";
import clsx from "clsx";

interface GlassCardProps {
  children: ReactNode;

  className?: string;

  variant?: "glass" | "solid" | "dark";

  padding?: "sm" | "md" | "lg";

  hover?: boolean;
}

const variantClasses = {
  glass:
    "border border-white/40 bg-white/70 backdrop-blur-xl",

  solid:
    "border border-slate-200 bg-white",

  dark:
    "border border-white/10 bg-slate-900 text-white",
};

const paddingClasses = {
  sm: "p-6",
  md: "p-8",
  lg: "p-10",
};

export default function GlassCard({
  children,
  className,
  variant = "glass",
  padding = "md",
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        "rounded-[32px]",
        "shadow-xl",

        variantClasses[variant],

        paddingClasses[padding],

        hover && [
          "transition-all",
          "duration-500",
          "hover:-translate-y-2",
          "hover:shadow-2xl",
          "hover:border-brand/40",
        ],

        className
      )}
    >
      {children}
    </div>
  );
}
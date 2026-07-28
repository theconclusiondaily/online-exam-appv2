import { ReactNode } from "react";
import clsx from "clsx";

interface FloatingBadgeProps {
  children: ReactNode;

  className?: string;

  variant?: "brand" | "white" | "dark" | "success";

  size?: "sm" | "md" | "lg";

  icon?: ReactNode;
}

const variantClasses = {
  brand:
    "border border-brand/20 bg-brand/10 text-brand",

  white:
    "border border-gray-200 bg-white text-slate-800 shadow-lg",

  dark:
    "border border-white/10 bg-slate-900 text-white",

  success:
    "border border-green-200 bg-green-50 text-green-700",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",

  md: "px-4 py-2 text-sm",

  lg: "px-5 py-2.5 text-base",
};

export default function FloatingBadge({
  children,
  className,
  variant = "brand",
  size = "md",
  icon,
}: FloatingBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {icon && (
        <span className="flex h-4 w-4 items-center justify-center">
          {icon}
        </span>
      )}

      {children}
    </span>
  );
}
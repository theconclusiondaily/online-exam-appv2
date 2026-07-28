"use client";

import Link from "next/link";
import clsx from "clsx";
import { ReactNode } from "react";

interface GradientButtonProps {
  href: string;

  children: ReactNode;

  className?: string;

  size?: "sm" | "md" | "lg";

  fullWidth?: boolean;

  disabled?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;
}

const sizeClasses = {
  sm: "px-5 py-2.5 text-sm",

  md: "px-7 py-3.5 text-base",

  lg: "px-9 py-4.5 text-lg",
};

export default function GradientButton({
  href,
  children,
  className,
  size = "md",
  fullWidth = false,
  disabled = false,
  leftIcon,
  rightIcon,
}: GradientButtonProps) {
  return (
    <Link
      href={disabled ? "#" : href}
      aria-disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2",
        "rounded-2xl",
        "font-semibold",
        "transition-all duration-300",
        "bg-brand text-white",
        "shadow-lg shadow-brand/20",
        "hover:-translate-y-0.5",
        "hover:shadow-2xl hover:shadow-brand/30",
        "focus:outline-none focus:ring-4 focus:ring-brand/20",
        disabled && [
          "pointer-events-none",
          "opacity-50",
          "shadow-none",
        ],
        fullWidth && "w-full",
        sizeClasses[size],
        className
      )}
    >
      {leftIcon}

      <span>{children}</span>

      {rightIcon}
    </Link>
  );
}
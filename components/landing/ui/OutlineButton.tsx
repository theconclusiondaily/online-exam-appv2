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

  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
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
  target,
  rel,
}: GradientButtonProps) {
  return (
    <Link
  href={disabled ? "#" : href}
  target={target}
  rel={rel}
  aria-disabled={disabled}
  className={clsx(
        "inline-flex items-center justify-center gap-2",
"rounded-xl",
"border border-white/20",
"bg-white/[0.04]",
"font-semibold text-white/80",
"backdrop-blur-sm",
"transition-all duration-300",
"hover:-translate-y-0.5",
"hover:border-white/30",
"hover:bg-white/[0.08]",
"hover:text-white",
"focus:outline-none",
"focus:ring-4",
"focus:ring-white/10",

        disabled && [
          "pointer-events-none",
          "opacity-50",
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
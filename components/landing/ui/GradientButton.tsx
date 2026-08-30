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
}: GradientButtonProps){
  return (
    <Link
  href={disabled ? "#" : href}
  target={target}
  rel={rel}
  aria-disabled={disabled}
  className={clsx(
        "rounded-xl",
"border border-brand-gold/30",
"font-bold",
"transition-all duration-300",
"bg-brand-gold text-brand",
"shadow-lg shadow-brand-gold/10",
"hover:-translate-y-0.5",
"hover:bg-brand-gold/90",
"hover:shadow-xl hover:shadow-brand-gold/20",
"focus:outline-none focus:ring-4 focus:ring-brand-gold/20",
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
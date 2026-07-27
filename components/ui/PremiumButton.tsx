"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";


interface PremiumButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "glass" | "gold";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  external?: boolean;
  icon?: boolean;
  className?: string;
}

const variantClasses = {
  primary:
    "bg-brand text-white hover:bg-brand-light shadow-xl hover:shadow-2xl hover:-translate-y-1",

  secondary:
    "bg-brand-gold text-brand hover:brightness-105 shadow-xl hover:-translate-y-1",

  outline:
    "border-2 border-brand text-brand bg-white hover:bg-brand hover:text-white",

  glass:
    "bg-white/15 backdrop-blur-xl border border-white/30 text-white hover:bg-white/25",

  gold:
    "bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-black shadow-xl hover:shadow-yellow-400/40 hover:-translate-y-1",
};

const sizeClasses = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export default function PremiumButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  external = false,
  icon = false,
  className = "",
}: PremiumButtonProps) {
 const classes = [
  "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300",
  "focus:outline-none focus:ring-4 focus:ring-brand/20",
  "disabled:pointer-events-none disabled:opacity-60",
  variantClasses[variant],
  sizeClasses[size],
  fullWidth ? "w-full" : "",
  className,
]
  .filter(Boolean)
  .join(" ");

  const content = (
    <>
      {loading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Loading...
        </>
      ) : (
        <>
          {children}
          {icon && <ArrowRight size={18} />}
        </>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
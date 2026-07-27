"use client";

import { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
}

export default function GlassCard({
  children,
  hover = true,
  glow = false,
  gradient = false,
  className = "",
  ...props
}: GlassCardProps) {
  const classes = [
    "relative overflow-hidden rounded-3xl",
    "border border-white/20",
    "backdrop-blur-xl",
    "bg-white/70",
    "shadow-xl",
    "transition-all duration-300",

    hover
      ? "hover:-translate-y-2 hover:shadow-2xl"
      : "",

    glow
      ? "hover:shadow-[0_0_40px_rgba(212,175,55,0.20)]"
      : "",

    gradient
      ? "bg-gradient-to-br from-white via-white to-blue-50"
      : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}

      {/* Decorative Gradient */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          hover:opacity-100
        "
      >
        <div
          className="
            absolute
            -right-16
            -top-16
            h-48
            w-48
            rounded-full
            bg-brand-gold/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-20
            -left-20
            h-56
            w-56
            rounded-full
            bg-brand/10
            blur-3xl
          "
        />
      </div>
    </div>
  );
}
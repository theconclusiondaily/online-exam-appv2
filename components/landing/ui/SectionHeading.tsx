"use client";

import TCDMotion from "../../ui/TCDMotion";
import clsx from "clsx";

interface SectionHeadingProps {
  eyebrow?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  maxWidth?: "md" | "lg" | "xl";
  className?: string;
  dark?: boolean;
}

const widths = {
  md: "max-w-2xl",
  lg: "max-w-3xl",
  xl: "max-w-4xl",
};

export default function SectionHeading({
  eyebrow,
  badge,
  title,
  subtitle,
  align = "left",
  maxWidth = "lg",
  className,
  dark = false,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <TCDMotion>
      <div
        className={clsx(
          widths[maxWidth],
          centered && "mx-auto text-center",
          className
        )}
      >

        {/* Badge */}
        {badge && (
          <span
            className={clsx(
              "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide",
              dark
                ? "border-brand-gold/30 bg-brand-gold/10 text-brand-gold"
                : "border-brand/20 bg-brand/10 text-brand"
            )}
          >
            {badge}
          </span>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <p
            className={clsx(
              "mb-4 text-sm font-semibold uppercase tracking-[0.25em]",
              dark ? "text-brand-gold" : "text-brand-gold"
            )}
          >
            {eyebrow}
          </p>
        )}

        {/* Title */}
        <h2
          className={clsx(
            "mt-4 font-black tracking-tight",
            "text-3xl leading-tight",
            "lg:text-4xl",
            dark ? "text-white" : "text-brand"
          )}
        >
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={clsx(
              "mt-4 text-base leading-7",
              dark ? "text-white/60" : "text-brand-muted"
            )}
          >
            {subtitle}
          </p>
        )}

      </div>
    </TCDMotion>
  );
}
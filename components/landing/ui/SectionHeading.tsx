
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
        {badge && (
          <span
            className={clsx(
              "inline-flex items-center rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-sm font-semibold tracking-wide text-brand"
            )}
          >
            {badge}
          </span>
        )}
{eyebrow && (
  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold">
    {eyebrow}
  </p>
)}
        <h2
          className={clsx(
            "mt-6 font-black tracking-tight",
            "text-4xl leading-tight",
            "lg:text-5xl",
            "text-brand"
          )}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className={clsx(
              "mt-6 text-lg leading-8 text-brand-muted"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </TCDMotion>
  );
}
"use client";

import TCDMotion from "@/components/ui/TCDMotion";

interface Props {
  badge?: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
}: Props) {
  return (
    <TCDMotion>
      <div
      className={align === "center" ? "mx-auto max-w-3xl text-center" : ""}
    >
        {badge && (
          <span className="tcd-badge bg-brand/10 text-brand border border-brand/20">
            {badge}
          </span>
        )}

        <h2 className="mt-6 text-4xl lg:text-5xl font-black leading-tight text-brand">
          {title}
        </h2>

        <p className="mt-6 text-lg leading-8 text-brand-muted">
          {subtitle}
        </p>
      </div>
    </TCDMotion>
  );
}
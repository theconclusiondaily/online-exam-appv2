"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

function formatSegment(segment: string) {
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function FinanceBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean);

  const financeIndex = segments.indexOf("finance");

  const financeSegments =
    financeIndex >= 0
      ? segments.slice(financeIndex)
      : [];

  return (
    <nav
      aria-label="Finance breadcrumb"
      className="mb-6"
    >
      <div className="flex items-center gap-2 text-sm">

        <Link
          href="/admin/finance"
          className="
            font-semibold
            text-tcd-primary
            hover:text-tcd-blue
            transition-colors
          "
        >
          Finance
        </Link>

        {financeSegments
          .slice(1)
          .map((segment, index) => {
            const href =
              "/" +
              segments
                .slice(
                  0,
                  financeIndex + 2 + index
                )
                .join("/");

            const isLast =
              index ===
              financeSegments.length - 2;

            return (
              <div
                key={`${segment}-${index}`}
                className="flex items-center gap-2"
              >
                <ChevronRight
                  size={15}
                  className="text-gray-400"
                />

                {isLast ? (
                  <span
                    className="
                      font-bold
                      text-tcd-blue
                    "
                  >
                    {formatSegment(segment)}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="
                      text-tcd-primary
                      hover:text-tcd-blue
                      transition-colors
                    "
                  >
                    {formatSegment(segment)}
                  </Link>
                )}
              </div>
            );
          })}

      </div>
    </nav>
  );
}
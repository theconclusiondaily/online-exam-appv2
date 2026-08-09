"use client";

import { Bell, RefreshCw } from "lucide-react";

interface FinanceHeaderProps {
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export default function FinanceHeader({
  title,
  subtitle,
  onRefresh,
  refreshing = false,
}: FinanceHeaderProps) {
  return (
    <header className="mb-4">
      <div className="flex items-start justify-between gap-4">
        {/* LEFT */}

        <div className="min-w-0">
          <h1
            className="
              text-3xl
              md:text-4xl
              font-black
              text-tcd-blue
              tracking-tight
            "
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="
                mt-2
                text-sm
                md:text-base
                text-tcd-primary
                max-w-3xl
              "
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2 shrink-0">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={refreshing}
              aria-label="Refresh finance data"
              title="Refresh"
              className="
                h-11
                w-11
                rounded-2xl
                bg-white
                border
                border-gray-200
                shadow-sm
                flex
                items-center
                justify-center
                text-tcd-blue
                hover:bg-gray-50
                hover:shadow-md
                transition-all
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              <RefreshCw
                size={19}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />
            </button>
          )}

          <button
            type="button"
            aria-label="Finance notifications"
            title="Notifications"
            className="
              relative
              h-11
              w-11
              rounded-2xl
              bg-white
              border
              border-gray-200
              shadow-sm
              flex
              items-center
              justify-center
              text-tcd-blue
              hover:bg-gray-50
              hover:shadow-md
              transition-all
            "
          >
            <Bell size={19} />

            <span
              className="
                absolute
                top-2
                right-2
                h-2
                w-2
                rounded-full
                bg-tcd-gold
                ring-2
                ring-white
              "
            />
          </button>
        </div>
      </div>
    </header>
  );
}
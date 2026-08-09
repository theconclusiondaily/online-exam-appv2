"use client";

import {
  Activity,
  ArrowUpRight,
  Bell,
  Radio,
  ShieldCheck,
  Trophy,
} from "lucide-react";

const operations = [
  {
    title: "Live Dashboard",
    description: "Monitor all active exams",
    icon: Radio,
    href: "/admin/live",
    tone: "live",
    status: "ACTIVE",
  },
  {
    title: "Proctoring",
    description: "Monitor live students",
    icon: ShieldCheck,
    href: "/admin/proctoring",
    tone: "blue",
    status: "MONITOR",
  },
  {
    title: "Leaderboards",
    description: "View exam rankings",
    icon: Trophy,
    href: "/admin/leaderboards",
    tone: "gold",
    status: "RANKINGS",
  },
  {
    title: "Notifications",
    description: "Platform notifications",
    icon: Bell,
    href: "/admin/notifications",
    tone: "neutral",
    status: "SOON",
  },
] as const;

export default function LiveOperations() {
  return (
    <section className="overflow-hidden rounded-[28px] border border-[#DCE4F2] bg-white shadow-[0_12px_40px_rgba(27,55,95,0.06)]">
      {/* HEADER */}
      <div className="relative overflow-hidden border-b border-[#E9EEF5] px-5 py-5 md:px-7">
        <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#294D86]/5 blur-3xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D8A63C]" />

              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8]">
                Live Operations
              </p>
            </div>

            <h2 className="mt-1 text-xl font-black tracking-[-0.025em] text-[#294D86]">
              Real-time control
            </h2>

            <p className="mt-1 max-w-md text-xs font-medium leading-5 text-[#94A3B8]">
              Monitor examinations, maintain integrity and manage live
              platform activity.
            </p>
          </div>

          {/* LIVE INDICATOR */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-600">
              Live System
            </span>
          </div>
        </div>
      </div>

      {/* OPERATIONS */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {operations.map((item) => {
            const Icon = item.icon;

            const isLive = item.tone === "live";
            const isGold = item.tone === "gold";
            const isNeutral = item.tone === "neutral";

            const iconClass = isLive
              ? "bg-emerald-50 text-emerald-600"
              : isGold
                ? "bg-[#FFF8E8] text-[#C99426]"
                : isNeutral
                  ? "bg-[#F3F5F8] text-[#7B8798]"
                  : "bg-[#EEF3FB] text-[#294D86]";

            const statusClass = isLive
              ? "bg-emerald-50 text-emerald-600"
              : isGold
                ? "bg-[#FFF8E8] text-[#B98218]"
                : isNeutral
                  ? "bg-[#F3F5F8] text-[#94A3B8]"
                  : "bg-[#EEF3FB] text-[#294D86]";

            return (
              <a
                key={item.title}
                href={item.href}
                className={`
                  group relative overflow-hidden rounded-[20px]
                  border border-[#E3E9F2] bg-white p-4
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:shadow-[0_14px_30px_rgba(27,55,95,0.08)]
                  ${
                    isLive
                      ? "hover:border-emerald-200"
                      : isGold
                        ? "hover:border-[#E8B94F]/50"
                        : "hover:border-[#294D86]/20"
                  }
                `}
              >
                {/* subtle hover glow */}
                <div
                  className={`
                    pointer-events-none absolute -right-8 -top-8 h-20 w-20
                    rounded-full blur-2xl opacity-0 transition-opacity duration-200
                    group-hover:opacity-100
                    ${
                      isLive
                        ? "bg-emerald-400/10"
                        : isGold
                          ? "bg-[#E8B94F]/10"
                          : "bg-[#294D86]/8"
                    }
                  `}
                />

                <div className="relative flex items-start gap-3.5">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconClass}`}
                  >
                    <Icon size={20} strokeWidth={2.1} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate text-sm font-extrabold text-[#294D86]">
                        {item.title}
                      </h3>

                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-[#B4BECC] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#294D86]"
                      />
                    </div>

                    <p className="mt-1 text-[11px] font-medium leading-5 text-[#94A3B8]">
                      {item.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2 py-1 text-[8px] font-extrabold uppercase tracking-[0.12em] ${statusClass}`}
                      >
                        {isLive && (
                          <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        )}

                        {item.status}
                      </span>

                      <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#B0BAC8] transition-colors group-hover:text-[#294D86]">
                        Open
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* BOTTOM STATUS STRIP */}
        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[#E9EEF5] bg-[#F8FAFD] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Activity
              size={15}
              className="text-[#294D86]"
            />

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#64748B]">
                Operations Center
              </p>

              <p className="text-[10px] font-medium text-[#A0AEC0]">
                Live monitoring and examination controls
              </p>
            </div>
          </div>

          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#B0BAC8]">
            TCD • CONTROL
          </span>
        </div>
      </div>
    </section>
  );
}
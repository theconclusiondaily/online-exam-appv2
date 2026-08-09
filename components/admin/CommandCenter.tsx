"use client";

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Radio,
  ShieldCheck,
  Users,
} from "lucide-react";

interface CommandCenterProps {
  liveExams: number;
  totalAttempts: number;
  totalUsers: number;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value || 0);
}

const operations = [
  {
    title: "Live Operations",
    subtitle: "Monitor active examinations",
    icon: Radio,
    href: "/admin/proctoring",
    tone: "live",
  },
  {
    title: "Exam Analytics",
    subtitle: "Review performance and activity",
    icon: BarChart3,
    href: "/admin/analytics",
    tone: "blue",
  },
  {
    title: "User Management",
    subtitle: "Manage the TCD ecosystem",
    icon: Users,
    href: "/admin/users",
    tone: "gold",
  },
  {
    title: "Security & Proctoring",
    subtitle: "Monitor examination integrity",
    icon: ShieldCheck,
    href: "/admin/proctoring",
    tone: "blue",
  },
] as const;

export default function CommandCenter({
  liveExams,
  totalAttempts,
  totalUsers,
}: CommandCenterProps) {
  return (
    <section className="mb-8 overflow-hidden rounded-[28px] border border-[#DCE4F2] bg-white shadow-[0_12px_40px_rgba(27,55,95,0.06)]">
      {/* HEADER */}
      <div className="relative overflow-hidden border-b border-[#E9EEF5] px-5 py-5 md:px-7">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#294D86]/5 blur-3xl" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D8A63C]" />

              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8]">
                Command Center
              </p>
            </div>

            <h2 className="mt-1 text-xl font-black tracking-[-0.025em] text-[#294D86] md:text-2xl">
              Platform Operations
            </h2>

            <p className="mt-1 text-xs font-medium text-[#94A3B8]">
              Monitor the most important activity across TCD.
            </p>
          </div>

          {/* LIVE STATUS */}
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
              <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-600">
                System Status
              </p>

              <p className="text-sm font-black text-emerald-700">
                Operational
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SNAPSHOT */}
      <div className="grid grid-cols-1 divide-y divide-[#E9EEF5] md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className="flex items-center justify-between px-5 py-5 md:px-7">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF3FB] text-[#294D86]">
              <Radio size={18} />
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#94A3B8]">
                Live Exams
              </p>

              <p className="mt-0.5 text-xs font-medium text-[#A0AEC0]">
                Currently active
              </p>
            </div>
          </div>

          <span className="text-2xl font-black tracking-[-0.04em] text-[#294D86]">
            {formatNumber(liveExams)}
          </span>
        </div>

        <div className="flex items-center justify-between px-5 py-5 md:px-7">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF8E8] text-[#C99426]">
              <Activity size={18} />
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#94A3B8]">
                Attempts
              </p>

              <p className="mt-0.5 text-xs font-medium text-[#A0AEC0]">
                Platform submissions
              </p>
            </div>
          </div>

          <span className="text-2xl font-black tracking-[-0.04em] text-[#294D86]">
            {formatNumber(totalAttempts)}
          </span>
        </div>

        <div className="flex items-center justify-between px-5 py-5 md:px-7">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF3FB] text-[#294D86]">
              <Users size={18} />
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#94A3B8]">
                Users
              </p>

              <p className="mt-0.5 text-xs font-medium text-[#A0AEC0]">
                Registered ecosystem
              </p>
            </div>
          </div>

          <span className="text-2xl font-black tracking-[-0.04em] text-[#294D86]">
            {formatNumber(totalUsers)}
          </span>
        </div>
      </div>

      {/* OPERATIONS */}
      <div className="border-t border-[#E9EEF5] bg-[#FAFBFD] p-5 md:p-7">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-[#294D86]">
              Operations
            </p>

            <p className="mt-0.5 text-[11px] font-medium text-[#94A3B8]">
              Quick access to critical admin areas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {operations.map((item) => {
            const Icon = item.icon;

            const iconClass =
              item.tone === "gold"
                ? "bg-[#FFF8E8] text-[#C99426]"
                : item.tone === "live"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-[#EEF3FB] text-[#294D86]";

            return (
              <a
                key={item.title}
                href={item.href}
                className="group flex items-center gap-3 rounded-2xl border border-[#E3E9F2] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#294D86]/20 hover:shadow-[0_12px_28px_rgba(27,55,95,0.08)]"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
                >
                  <Icon size={18} strokeWidth={2} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-extrabold text-[#294D86]">
                    {item.title}
                  </p>

                  <p className="mt-0.5 truncate text-[10px] font-medium text-[#94A3B8]">
                    {item.subtitle}
                  </p>
                </div>

                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-[#B0BAC8] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#294D86]"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
"use client";

import {
  Activity,
  BookOpen,
  Building2,
  FileText,
  GraduationCap,
  HelpCircle,
  Radio,
  Users,
} from "lucide-react";

interface DashboardStatsProps {
  totalUsers: number;
  totalTeachers: number;
  totalInstitutes: number;
  totalQuestions: number;
  totalPapers: number;
  totalExams: number;
  liveExams: number;
  totalAttempts: number;
  loading?: boolean;
}

const primaryStats = [
  {
    key: "totalUsers",
    title: "Total Users",
    description: "Registered learners",
    icon: Users,
    href: "/admin/users",
    accent: "blue",
  },
  {
    key: "totalExams",
    title: "Total Exams",
    description: "Exams created",
    icon: GraduationCap,
    href: "/admin/exams",
    accent: "gold",
  },
  {
    key: "totalQuestions",
    title: "Question Bank",
    description: "Questions available",
    icon: HelpCircle,
    href: "/admin/questions",
    accent: "blue",
  },
  {
    key: "totalAttempts",
    title: "Exam Attempts",
    description: "Total submissions",
    icon: Activity,
    href: "/admin/analytics",
    accent: "gold",
  },
  {
    key: "liveExams",
    title: "Live Exams",
    description: "Currently active",
    icon: Radio,
    href: "/admin/proctoring",
    accent: "live",
  },
] as const;

const secondaryStats = [
  {
    key: "totalTeachers",
    title: "Teachers",
    icon: GraduationCap,
    href: "/admin/teachers",
  },
  {
    key: "totalInstitutes",
    title: "Institutes",
    icon: Building2,
    href: "/admin/institutes",
  },
  {
    key: "totalPapers",
    title: "Question Papers",
    icon: FileText,
    href: "/admin/papers",
  },
] as const;

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value || 0);
}

function SkeletonBox() {
  return (
    <div className="h-9 w-20 animate-pulse rounded-lg bg-[#E9EEF6]" />
  );
}

export default function DashboardStats({
  totalUsers,
  totalTeachers,
  totalInstitutes,
  totalQuestions,
  totalPapers,
  totalExams,
  liveExams,
  totalAttempts,
  loading = false,
}: DashboardStatsProps) {
  const values = {
    totalUsers,
    totalTeachers,
    totalInstitutes,
    totalQuestions,
    totalPapers,
    totalExams,
    liveExams,
    totalAttempts,
  };

  return (
    <section className="space-y-4">
      {/* SECTION HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D8A63C]" />

            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8]">
              Platform Overview
            </p>
          </div>

          <h2 className="mt-1 text-xl font-black tracking-[-0.02em] text-[#294D86] md:text-2xl">
            Ecosystem at a glance
          </h2>
        </div>

        <p className="text-xs font-medium text-[#94A3B8]">
          Live platform metrics
        </p>
      </div>

      {/* PRIMARY METRICS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {primaryStats.map((stat) => {
          const Icon = stat.icon;
          const value = values[stat.key];

          const isLive = stat.accent === "live";
          const isGold = stat.accent === "gold";

          return (
            <a
              key={stat.key}
              href={stat.href}
              className={`
                group relative overflow-hidden rounded-[22px]
                border bg-white p-5
                transition-all duration-200
                hover:-translate-y-1
                ${
                  isLive
                    ? "border-emerald-200 hover:border-emerald-300 hover:shadow-[0_18px_35px_rgba(16,185,129,0.10)]"
                    : isGold
                      ? "border-[#E8B94F]/25 hover:border-[#E8B94F]/55 hover:shadow-[0_18px_35px_rgba(180,130,30,0.10)]"
                      : "border-[#DCE4F2] hover:border-[#294D86]/20 hover:shadow-[0_18px_35px_rgba(27,55,95,0.09)]"
                }
              `}
            >
              {/* Decorative glow */}
              <div
                className={`
                  pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl
                  ${
                    isLive
                      ? "bg-emerald-400/10"
                      : isGold
                        ? "bg-[#E8B94F]/10"
                        : "bg-[#294D86]/8"
                  }
                `}
              />

              <div className="relative flex items-start justify-between">
                <div
                  className={`
                    flex h-11 w-11 items-center justify-center rounded-2xl
                    ${
                      isLive
                        ? "bg-emerald-50 text-emerald-600"
                        : isGold
                          ? "bg-[#FFF8E8] text-[#C99426]"
                          : "bg-[#EEF3FB] text-[#294D86]"
                    }
                  `}
                >
                  <Icon size={20} strokeWidth={2.1} />
                </div>

                {isLive && (
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-emerald-600">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Live
                  </span>
                )}
              </div>

              <div className="relative mt-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">
                  {stat.title}
                </p>

                <div className="mt-1 flex min-h-[44px] items-center">
                  {loading ? (
                    <SkeletonBox />
                  ) : (
                    <p className="text-[30px] font-black tracking-[-0.04em] text-[#294D86]">
                      {formatNumber(value)}
                    </p>
                  )}
                </div>

                <p className="mt-1 text-xs font-medium text-[#94A3B8]">
                  {stat.description}
                </p>
              </div>

              <div className="relative mt-5 flex items-center justify-between border-t border-[#EEF1F6] pt-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#A0AEC0]">
                  View details
                </span>

                <span className="text-sm font-bold text-[#294D86] transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {/* SECONDARY METRICS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {secondaryStats.map((stat) => {
          const Icon = stat.icon;
          const value = values[stat.key];

          return (
            <a
              key={stat.key}
              href={stat.href}
              className="group flex items-center justify-between rounded-2xl border border-[#DCE4F2] bg-white px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#294D86]/20 hover:shadow-[0_12px_28px_rgba(27,55,95,0.07)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F7FB] text-[#294D86]">
                  <Icon size={18} strokeWidth={2} />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#64748B]">
                    {stat.title}
                  </p>

                  <p className="mt-0.5 text-[10px] font-medium text-[#A0AEC0]">
                    Platform resource
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="h-7 w-14 animate-pulse rounded-lg bg-[#E9EEF6]" />
              ) : (
                <span className="text-xl font-black tracking-[-0.03em] text-[#294D86]">
                  {formatNumber(value)}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}
"use client";

import {
  Activity,
  ArrowUpRight,
  Building2,
  GraduationCap,
  Users,
} from "lucide-react";

const platformItems = [
  {
    title: "Students",
    description: "Manage student accounts",
    icon: Users,
    href: "/admin/users",
    tone: "blue",
  },
  {
    title: "Teachers",
    description: "Manage teachers",
    icon: GraduationCap,
    href: "/admin/teachers",
    tone: "gold",
  },
  {
    title: "Institutes",
    description: "Manage institutes",
    icon: Building2,
    href: "/admin/institutes",
    tone: "blue",
  },
  {
    title: "Analytics",
    description: "Platform insights",
    icon: Activity,
    href: "/admin/analytics",
    tone: "gold",
  },
] as const;

export default function PlatformManagement() {
  return (
    <section className="overflow-hidden rounded-[28px] border border-[#DCE4F2] bg-white shadow-[0_12px_40px_rgba(27,55,95,0.06)]">
      {/* HEADER */}
      <div className="relative overflow-hidden border-b border-[#E9EEF5] px-5 py-5 md:px-7">
        <div className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-[#294D86]/5 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D8A63C]" />

            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8]">
              Platform Administration
            </p>
          </div>

          <h2 className="mt-1 text-xl font-black tracking-[-0.025em] text-[#294D86]">
            Platform Management
          </h2>

          <p className="mt-1 max-w-md text-xs font-medium leading-5 text-[#94A3B8]">
            Manage the people, institutions and operational insights behind
            TCD.
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {platformItems.map((item) => {
            const Icon = item.icon;
            const isGold = item.tone === "gold";

            return (
              <a
                key={item.title}
                href={item.href}
                className={`
                  group relative overflow-hidden rounded-[20px]
                  border bg-white p-4
                  transition-all duration-200
                  hover:-translate-y-0.5
                  ${
                    isGold
                      ? "border-[#E8B94F]/20 hover:border-[#E8B94F]/50 hover:shadow-[0_14px_32px_rgba(180,130,30,0.09)]"
                      : "border-[#E3E9F2] hover:border-[#294D86]/20 hover:shadow-[0_14px_32px_rgba(27,55,95,0.08)]"
                  }
                `}
              >
                <div
                  className={`
                    pointer-events-none absolute -right-10 -top-10 h-24 w-24
                    rounded-full blur-2xl opacity-0 transition-opacity
                    duration-200 group-hover:opacity-100
                    ${
                      isGold
                        ? "bg-[#E8B94F]/10"
                        : "bg-[#294D86]/8"
                    }
                  `}
                />

                <div className="relative flex items-start gap-3.5">
                  <div
                    className={`
                      flex h-11 w-11 shrink-0 items-center justify-center
                      rounded-2xl
                      ${
                        isGold
                          ? "bg-[#FFF8E8] text-[#C99426]"
                          : "bg-[#EEF3FB] text-[#294D86]"
                      }
                    `}
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
                        className={`
                          rounded-full px-2 py-1 text-[8px]
                          font-extrabold uppercase tracking-[0.12em]
                          ${
                            isGold
                              ? "bg-[#FFF8E8] text-[#B98218]"
                              : "bg-[#EEF3FB] text-[#294D86]"
                          }
                        `}
                      >
                        Manage
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

        {/* FOOTER */}
        <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-[#E9EEF5] bg-[#F8FAFD] px-4 py-3">
          <Activity
            size={15}
            className="text-[#294D86]"
          />

          <p className="text-[10px] font-medium text-[#94A3B8]">
            People, institutions and platform intelligence — managed from one
            place.
          </p>
        </div>
      </div>
    </section>
  );
}
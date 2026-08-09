"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CircleDollarSign,
  LogOut,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface AdminHeroProps {
  onLogout: () => void;
}

export default function AdminHero({
  onLogout,
}: AdminHeroProps) {
  return (
    <section className="relative mb-8 overflow-hidden rounded-[28px] border border-[#DCE4F2] bg-white shadow-[0_18px_55px_rgba(27,55,95,0.08)]">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#E8B94F]/10 blur-3xl" />
        <div className="absolute -left-24 bottom-[-140px] h-80 w-80 rounded-full bg-[#294D86]/10 blur-3xl" />

        <div className="absolute right-10 top-8 h-32 w-32 rounded-full border border-[#E8B94F]/15" />
        <div className="absolute right-16 top-14 h-20 w-20 rounded-full border border-[#294D86]/10" />
      </div>

      <div className="relative px-6 py-7 md:px-8 md:py-8 lg:px-10 lg:py-9">
        <div className="flex flex-col gap-8">
          {/* TOP ROW */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              {/* Brand eyebrow */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8B94F]/25 bg-[#FFF9EC] px-3.5 py-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8B94F] opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#D8A63C]" />
                </span>

                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#294D86]">
                  TCD Administration
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-[-0.035em] text-[#294D86] md:text-4xl lg:text-[44px] lg:leading-[1.05]">
                Admin Command Center
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B] md:text-base">
                Control the entire THE CONCLUSION DAILY ecosystem from one
                powerful operations center.
              </p>
            </div>

            {/* SYSTEM STATUS */}
            <div className="flex items-center gap-3 self-start rounded-2xl border border-[#DCE4F2] bg-[#F8FAFD] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#294D86] text-white shadow-sm">
                <ShieldCheck size={20} strokeWidth={2.2} />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#94A3B8]">
                  System Status
                </p>

                <div className="mt-0.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-extrabold text-[#294D86]">
                    All Systems Operational
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/create-exam"
              className="group flex items-center justify-between rounded-2xl bg-[#294D86] px-4 py-3.5 text-white shadow-[0_10px_25px_rgba(41,77,134,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(41,77,134,0.24)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <Plus size={18} />
                </span>

                <div>
                  <p className="text-sm font-extrabold">
                    Create Exam
                  </p>
                  <p className="text-[11px] text-white/65">
                    Start a new exam
                  </p>
                </div>
              </div>

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/admin/questions"
              className="group flex items-center justify-between rounded-2xl border border-[#DCE4F2] bg-white px-4 py-3.5 text-[#294D86] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E8B94F]/50 hover:shadow-[0_12px_28px_rgba(27,55,95,0.08)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF8E8] text-[#C99426]">
                  <BookOpen size={18} />
                </span>

                <div>
                  <p className="text-sm font-extrabold">
                    Question Bank
                  </p>
                  <p className="text-[11px] text-[#94A3B8]">
                    Manage questions
                  </p>
                </div>
              </div>

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/admin/finance"
              className="group flex items-center justify-between rounded-2xl border border-[#E8B94F]/30 bg-[#FFF9EC] px-4 py-3.5 text-[#294D86] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E8B94F]/70 hover:shadow-[0_12px_28px_rgba(180,130,30,0.10)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8B94F] text-white">
                  <CircleDollarSign size={18} />
                </span>

                <div>
                  <p className="text-sm font-extrabold">
                    Finance
                  </p>
                  <p className="text-[11px] text-[#8A6A2B]">
                    Wallets & payouts
                  </p>
                </div>
              </div>

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <button
              type="button"
              onClick={onLogout}
              className="group flex items-center justify-between rounded-2xl border border-[#DCE4F2] bg-[#F8FAFD] px-4 py-3.5 text-[#294D86] transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#64748B] shadow-sm group-hover:text-red-500">
                  <LogOut size={18} />
                </span>

                <div className="text-left">
                  <p className="text-sm font-extrabold">
                    Sign Out
                  </p>
                  <p className="text-[11px] text-[#94A3B8]">
                    End admin session
                  </p>
                </div>
              </div>

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* FOOTER STRIP */}
          <div className="flex flex-col gap-3 border-t border-[#EDF1F7] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Sparkles
                size={15}
                className="text-[#D8A63C]"
              />

              <p className="text-xs font-semibold text-[#64748B]">
                One command center for content, operations, platform and
                finance.
              </p>
            </div>

            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#A0AEC0]">
              THE CONCLUSION DAILY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
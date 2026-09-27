"use client";

import { TCDIcons } from "@/components/ui/tcd-icons";
import MaadhavChat from "@/components/maadhav/MaadhavChat";

export default function MaadhavPage() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="relative shrink-0 overflow-hidden border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#274472]/[0.035] via-transparent to-[#E6C06E]/[0.06]" />

        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#274472]/[0.07]">
              <div className="h-6 w-6">
                {TCDIcons.mastery}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-[#274472]">
                  Maadhav
                </h1>

                <span className="rounded-full bg-[#E6C06E]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8a6b18]">
                  AI
                </span>
              </div>

              <p className="text-[11px] text-slate-400">
                Your TCD learning companion
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-slate-400">
              Ready to help
            </span>
          </div>
        </div>
      </header>

      <div className="min-h-0 flex-1">
        <MaadhavChat />
      </div>
    </div>
  );
}
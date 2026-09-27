
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TCDLogo from "@/components/brand/TCDLogo";

export default function MaadhavFloatingButton() {
  const router = useRouter();
  const [showLabel, setShowLabel] = useState(false);

  function openMaadhav() {
    router.push("/dashboard/maadhav");
  }

  return (
    <div
  className="fixed bottom-20 right-5 z-50 sm:bottom-7 sm:right-7"
  onMouseEnter={() => setShowLabel(true)}
  onMouseLeave={() => setShowLabel(false)}
>
      {/* Desktop label */}
      <div
        className={`
          absolute bottom-1/2 right-full mr-3 hidden -translate-y-1/2
          whitespace-nowrap rounded-xl border border-slate-200/80
          bg-white px-4 py-2.5
          shadow-[0_10px_30px_rgba(39,68,114,0.12)]
          transition-all duration-200 sm:block
          ${
            showLabel
              ? "translate-x-0 opacity-100"
              : "pointer-events-none translate-x-2 opacity-0"
          }
        `}
      >
        <p className="text-sm font-semibold text-[#274472]">
          Ask Maadhav
        </p>

        <p className="mt-0.5 text-[10px] text-slate-400">
          Your TCD AI learning companion
        </p>
      </div>

      {/* Launcher */}
      <button
        type="button"
        onClick={openMaadhav}
        aria-label="Open Maadhav AI learning companion"
        className="
          group relative flex h-14 w-14 items-center justify-center
          rounded-full border border-white/80
          bg-white
          shadow-[0_10px_35px_rgba(39,68,114,0.18)]
          transition-all duration-200
          hover:-translate-y-1
          hover:shadow-[0_14px_40px_rgba(39,68,114,0.24)]
          active:translate-y-0
          sm:h-16 sm:w-16
        "
      >
        {/* Subtle brand glow */}
        <span
          className="
            pointer-events-none absolute inset-[-5px]
            rounded-full border border-[#E6C06E]/25
            opacity-0 transition-opacity duration-200
            group-hover:opacity-100
          "
        />

        {/* Logo */}
        <div className="relative flex items-center justify-center">
          <TCDLogo size={36} />
        </div>

        {/* Online indicator */}
        <span
          className="
            absolute right-0.5 top-0.5
            h-3.5 w-3.5 rounded-full
            border-2 border-white
            bg-emerald-500
            shadow-sm
          "
        />
      </button>
    </div>
  );
}

"use client";

import { ReactNode } from "react";
import { Globe, Lock, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface BrowserFrameProps {
  children: ReactNode;
  className?: string;
  url?: string;
}

export default function BrowserFrame({
  children,
  className = "",
  url = "theconclusiondaily.com",
}: BrowserFrameProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        transition: {
          duration: 0.3,
        },
      }}
      className={`
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/40
        bg-white/80
        backdrop-blur-2xl
        shadow-[0_25px_80px_rgba(0,0,0,0.15)]
        ${className}
      `}
    >
      {/* Browser Top Bar */}

      <div className="flex items-center justify-between border-b border-gray-200/70 bg-white/90 px-5 py-3">

        {/* Left */}

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-full bg-red-400" />

          <span className="h-3 w-3 rounded-full bg-yellow-400" />

          <span className="h-3 w-3 rounded-full bg-green-400" />

        </div>

        {/* Address Bar */}

        <div
          className="
            mx-6
            flex
            flex-1
            items-center
            justify-center
          "
        >
          <div
            className="
              flex
              w-full
              max-w-md
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-gray-200
              bg-gray-50
              px-4
              py-2
            "
          >
            <Lock size={14} className="text-green-600" />

            <Globe size={14} className="text-gray-400" />

            <span className="truncate text-sm font-medium text-gray-600">
              {url}
            </span>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <RefreshCw
            size={16}
            className="text-gray-400"
          />

        </div>

      </div>

      {/* Browser Content */}

      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-slate-50
          via-white
          to-blue-50
          p-8
          lg:p-10
        "
      >
        {children}
      </div>

      {/* Decorative Glow */}

      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-brand/10 blur-[90px]" />

      <div className="pointer-events-none absolute -right-24 bottom-10 h-56 w-56 rounded-full bg-brand-gold/10 blur-[90px]" />

      {/* Shine Effect */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/30
          via-transparent
          to-transparent
        "
      />
    </motion.div>
  );
}
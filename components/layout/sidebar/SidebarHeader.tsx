"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  collapsed?: boolean;
}

export default function SidebarHeader({
  collapsed = false,
}: Props) {
  return (
    <div className="relative overflow-hidden border-b border-white/10">

      {/* Background Glow */}

      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      <motion.div
        layout
        transition={{
          duration: 0.3,
        }}
        className={`
          relative
          flex
          ${collapsed ? "justify-center" : "flex-col items-center"}
          px-4
          py-8
        `}
      >

        {/* Logo */}

        <motion.div
          whileHover={{
            rotate: 5,
            scale: 1.05,
          }}
        >

          <Image
            src="/logo.png"
            alt="TCD"
            width={collapsed ? 48 : 72}
            height={collapsed ? 48 : 72}
            priority
            className="object-contain"
          />

        </motion.div>

        {!collapsed && (

          <>

            <motion.h1
              layout
              className="mt-5 text-center text-lg font-bold tracking-wide"
            >

              THE CONCLUSION DAILY

            </motion.h1>

            <motion.p
              layout
              className="mt-2 text-xs uppercase tracking-[0.35em] text-blue-200"
            >

              Hope & Faith

            </motion.p>

          </>

        )}

      </motion.div>

    </div>
  );
}
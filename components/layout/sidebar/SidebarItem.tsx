"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
}

export default function SidebarItem({
  href,
  label,
  icon,
  active = false,
  collapsed = false,
}: Props) {
  return (
    <Link href={href}>

      <motion.div
        whileHover={{
          x: 4,
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className={`
          relative
          flex
          items-center
          ${collapsed ? "justify-center" : ""}
          gap-4
          px-4
          py-3
          rounded-2xl
          transition-all
          duration-200
          cursor-pointer

          ${
            active
              ? "bg-white text-[#0F3D91] shadow-lg"
              : "text-white hover:bg-white/10"
          }
        `}
      >
        {active && (
          <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#F4C542]" />
        )}

        <div className="flex-shrink-0">
          {icon}
        </div>

        {!collapsed && (
          <span className="font-medium">
            {label}
          </span>
        )}
      </motion.div>

    </Link>
  );
}
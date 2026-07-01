"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";

interface Props {
  collapsed?: boolean;
  name?: string;
  role?: string;
  avatar?: string;
}

export default function SidebarFooter({
  collapsed = false,
  name = "Administrator",
  role = "Admin",
  avatar = "/images/avatar.png",
}: Props) {
  return (
    <div className="border-t border-white/10 p-4">

      <div
        className={`flex ${
          collapsed ? "justify-center" : "items-center gap-3"
        }`}
      >
        <Image
          src={avatar}
          alt={name}
          width={44}
          height={44}
          className="rounded-full border-2 border-white/20"
        />

        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">
              {name}
            </p>

            <p className="text-xs text-blue-200 truncate">
              {role}
            </p>
          </div>
        )}
      </div>

      {!collapsed && (
        <>
          <div className="mt-5 flex items-center justify-between">

            <span className="text-xs text-blue-200">
              TCD v2.0.0
            </span>

            <button
              className="p-2 rounded-lg hover:bg-white/10 transition"
              title="Logout"
            >
              <LogOut size={18} />
            </button>

          </div>

          <p className="mt-3 text-[11px] text-blue-300 text-center tracking-wider uppercase">
            Hope &amp; Faith
          </p>
        </>
      )}
    </div>
  );
}
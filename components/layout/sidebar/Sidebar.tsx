"use client";

import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";

interface SidebarProps {
  collapsed?: boolean;
}

export default function Sidebar({
  collapsed = false,
}: SidebarProps) {
  return (
    <aside
      className={`
        relative
        h-screen
        bg-[#0F3D91]
        text-white
        flex
        flex-col
        transition-all
        duration-300
        ease-in-out
        border-r
        border-white/10
        shadow-2xl
        ${collapsed ? "w-20" : "w-72"}
      `}
    >
      {/* Brand */}

      <SidebarHeader collapsed={collapsed} />

      {/* Navigation */}

      <div className="flex-1 overflow-hidden">

        <SidebarMenu collapsed={collapsed} />

      </div>

      {/* Footer */}

      <SidebarFooter
        collapsed={collapsed}
        name="Rahul Kumawat"
        role="Administrator"
      />

    </aside>
  );
}
"use client";

import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { SIDEBAR_MENU } from "./sidebar-menu";

interface Props {
  collapsed?: boolean;
}

export default function SidebarMenu({
  collapsed = false,
}: Props) {
  const pathname = usePathname();

  return (
    <div className="flex-1 overflow-y-auto py-4 px-3">

      {SIDEBAR_MENU.map((section) => (

        <div
          key={section.section}
          className="mb-8"
        >

          {!collapsed && (

            <p className="text-xs uppercase tracking-widest text-blue-200 px-4 mb-3">

              {section.section}

            </p>

          )}

          <div className="space-y-2">

            {section.items.map((item) => {

              const Icon = item.icon;

              const active =
                pathname === item.href ||
                (item.href !== "/admin" &&
                  pathname.startsWith(item.href));

              return (

                <SidebarItem
                  key={item.href}
                  href={item.href}
                  label={item.title}
                  collapsed={collapsed}
                  active={active}
                  icon={<Icon size={20} />}
                />

              );

            })}

          </div>

        </div>

      ))}

    </div>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Users,
  Trophy,
  Wallet,
  BarChart3,
  Settings,
} from "lucide-react";

interface Props {
  collapsed?: boolean;
}

const menu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Question Bank",
    href: "/admin/questions",
    icon: BookOpen,
  },
  {
    title: "Exam Manager",
    href: "/admin/exams",
    icon: ClipboardList,
  },
  {
    title: "Institutes",
    href: "/admin/institutes",
    icon: GraduationCap,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Leaderboard",
    href: "/admin/leaderboards",
    icon: Trophy,
  },
  {
    title: "Wallet",
    href: "/admin/wallet",
    icon: Wallet,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  collapsed = false,
}: Props) {
  const pathname = usePathname();

  return (
    <aside className="h-screen bg-[#0F3D91] text-white flex flex-col">

      {/* Logo */}

      <div className="h-20 border-b border-white/10 flex items-center justify-center">

        {collapsed ? (
          <img
            src="/logo.png"
            alt="TCD"
            className="h-10 w-10 object-contain"
          />
        ) : (
          <img
            src="/logo.png"
            alt="TCD"
            className="h-12 object-contain"
          />
        )}

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">

        {menu.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/admin" &&
              pathname.startsWith(item.href));

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                items-center
                ${collapsed ? "justify-center" : "justify-start"}
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all
                duration-200

                ${
                  active
                    ? "bg-white text-[#0F3D91] shadow"
                    : "text-white hover:bg-white/10"
                }
              `}
            >

              <Icon
                size={20}
                className="flex-shrink-0"
              />

              {!collapsed && (
                <span className="font-medium">
                  {item.title}
                </span>
              )}

            </Link>

          );

        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-white/10 p-4">

        {!collapsed ? (
          <div>

            <p className="text-sm font-semibold">
              THE CONCLUSION DAILY
            </p>

            <p className="text-xs text-blue-200 mt-1">
              Admin Portal
            </p>

          </div>
        ) : (
          <div className="flex justify-center">

            <Settings size={20} />

          </div>
        )}

      </div>

    </aside>
  );
}
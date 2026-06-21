"use client";

import Link from "next/link";
import { usePathname }
from "next/navigation";
import { TCDIcons } from "@/components/ui/tcd-icons";
export default function MobileBottomNav() {

  const pathname =
    usePathname();

 const items = [

  {
    label: "Home",
    href: "/dashboard",
    icon: TCDIcons.dashboard,
  },

  {
    label: "Exams",
    href: "/student",
    icon: TCDIcons.journey,
  },

  {
    label: "Ranks",
    href: "/dashboard/leaderboard",
    icon: TCDIcons.leaderboard,
  },

  {
    label: "Awards",
    href: "/dashboard/achievements",
    icon: TCDIcons.achievement,
  },

  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: TCDIcons.mastery,
  },

];

  return (

    <div
      className="
fixed
bottom-0
left-0
right-0

md:hidden

bg-white/95
backdrop-blur-md

border-t
border-gray-200

shadow-[0_-4px_20px_rgba(0,0,0,0.08)]

z-50

flex
justify-around

pb-safe
py-2
"
    >

     {items.map((item) => (

  <Link
    key={item.href}
    href={item.href}
    className={`
      flex
      flex-col
      items-center
      justify-center

      flex-1

      py-2

      transition-all

      ${
        pathname.startsWith(item.href)
          ? "text-tcd-blue"
          : "text-tcd-primary"
      }
    `}
  >

    <div
  className={`
    w-6
    h-6
    mb-1

    transition-all

    ${
      pathname.startsWith(item.href)
        ? "scale-110"
        : ""
    }
  `}
>

      {item.icon}

    </div>

    <span
      className="
        text-[11px]
        font-semibold
      "
    >
      {item.label}
    </span>

  </Link>

))}
    </div>
  );
}
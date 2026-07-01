"use client";

import Link from "next/link";
import { TCDIcons } from "@/components/ui/tcd-icons";

const actions = [
  {
    title: "Question Builder",
    subtitle: "Create & manage questions",
    href: "/admin/questions",
    icon: TCDIcons.target,
  },
  {
    title: "Question Papers",
    subtitle: "Build reusable papers",
    href: "/admin/papers",
    icon: TCDIcons.mastery,
  },
  {
    title: "Exam Builder",
    subtitle: "Create & publish exams",
    href: "/admin/create-exam",
    icon: TCDIcons.achievement,
  },
  {
    title: "Live Proctoring",
    subtitle: "Monitor live students",
    href: "/admin/proctoring",
    icon: TCDIcons.journey,
  },
  {
    title: "Leaderboards",
    subtitle: "View rankings",
    href: "/admin/leaderboards",
    icon: TCDIcons.rank,
  },
  {
    title: "Analytics",
    subtitle: "Platform insights",
    href: "/admin/analytics",
    icon: TCDIcons.fire,
  },
];

export default function QuickActions() {
  return (
    <div className="mb-10">

      <div className="flex items-center gap-3 mb-6">

        <div className="text-tcd-gold">
          {TCDIcons.achievement}
        </div>

        <h2 className="text-3xl font-black text-tcd-blue">
          Quick Actions
        </h2>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {actions.map((action) => (

          <Link
            key={action.title}
            href={action.href}
            className="
              group
              bg-white
              rounded-[30px]
              border
              border-tcd-gold/10
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
              p-7
            "
          >

            <div className="mb-6 text-tcd-blue group-hover:scale-110 transition-transform">
              {action.icon}
            </div>

            <h3 className="text-2xl font-black text-tcd-blue">
              {action.title}
            </h3>

            <p className="text-brand mt-2">
              {action.subtitle}
            </p>

          </Link>

        ))}

      </div>

    </div>
  );
}
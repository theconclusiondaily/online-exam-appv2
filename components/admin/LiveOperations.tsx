"use client";

import Link from "next/link";
import { TCDIcons } from "@/components/ui/tcd-icons";

const items = [
  {
    title: "Live Dashboard",
    description: "Monitor all active exams",
    href: "#command-center",
    icon: TCDIcons.achievement,
  },
  {
    title: "Proctoring",
    description: "Monitor live students",
    href: "/admin/proctoring",
    icon: TCDIcons.target,
  },
  {
    title: "Leaderboards",
    description: "View exam rankings",
    href: "/admin/leaderboards",
    icon: TCDIcons.rank,
  },
  {
    title: "Notifications",
    description: "Coming Soon",
    href: "#",
    icon: TCDIcons.achievement,
    disabled: true,
  },
];

export default function LiveOperations() {
  return (
    <section className="mb-10">

      <div className="flex items-center gap-3 mb-6">

        <div className="text-tcd-gold">
          {TCDIcons.mastery}
        </div>

        <h2 className="text-3xl font-black text-tcd-blue">
          Live Operations
        </h2>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="
              bg-white
              border
              border-tcd-gold/10
              rounded-3xl
              shadow-md
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              p-6
            "
          >
            <div className="text-tcd-blue mb-5">
              {item.icon}
            </div>

            <h3 className="text-xl font-black text-tcd-blue">
              {item.title}
            </h3>

            <p className="text-brand mt-2">
              {item.description}
            </p>
          </Link>
        ))}
      </div>

    </section>
  );
}
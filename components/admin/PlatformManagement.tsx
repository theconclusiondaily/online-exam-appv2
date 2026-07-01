"use client";

import Link from "next/link";
import { TCDIcons } from "@/components/ui/tcd-icons";

const items = [
  {
    title: "Students",
    description: "Manage student accounts",
    href: "/admin/users",
    icon: TCDIcons.journey,
  },
  {
    title: "Teachers",
    description: "Manage teachers",
    href: "/admin/teachers",
    icon: TCDIcons.rank,
  },
  {
    title: "Institutes",
    description: "Manage institutes",
    href: "/admin/institutes",
    icon: TCDIcons.mastery,
  },
  {
    title: "Analytics",
    description: "Platform insights",
    href: "/admin/analytics",
    icon: TCDIcons.target,
  },
];

export default function PlatformManagement() {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-tcd-gold">
          {TCDIcons.rank}
        </div>

        <h2 className="text-3xl font-black text-tcd-blue">
          Platform Management
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="bg-white rounded-3xl border border-tcd-gold/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-6"
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
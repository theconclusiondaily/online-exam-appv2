"use client";

import Link from "next/link";
import { TCDIcons } from "@/components/ui/tcd-icons";

const items = [
  {
    title: "Question Builder",
    description: "Create new questions",
    href: "/admin/questions",
    icon: TCDIcons.target,
  },
  {
  title: "Question Bank",
  description: "Manage all questions",
  href: "/admin/questions/bank",
  icon: TCDIcons.mastery,
},
  {
    title: "Question Papers",
    description: "Build papers",
    href: "/admin/papers",
    icon: TCDIcons.achievement,
  },
  {
    title: "Exam Builder",
    description: "Create exams",
    href: "/admin/create-exam",
    icon: TCDIcons.target,
  },
];

export default function ContentManagement() {
  return (
    <section className="mb-10">

      <div className="flex items-center gap-3 mb-6">

        <div className="text-tcd-gold">

          {TCDIcons.mastery}

        </div>

        <h2 className="text-3xl font-black text-tcd-blue">

          Content Management

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
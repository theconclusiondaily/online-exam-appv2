"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Star,
  TrendingUp,
} from "lucide-react";

import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import ProductShowcase from "./showcase/ProductShowcase";

const highlights = [
  {
    icon: Trophy,
    title: "National Rankings",
    description:
      "Compare your performance with students across India.",
  },
  {
    icon: Medal,
    title: "Institute Leaderboards",
    description:
      "Compete within your school or coaching institute.",
  },
  {
    icon: TrendingUp,
    title: "XP Progression",
    description:
      "Earn experience points as you practice and improve.",
  },
  {
    icon: Star,
    title: "Achievements",
    description:
      "Unlock badges by reaching important learning milestones.",
  },
];

export default function CompetitionExperience() {
  return (
    <Section>

      <div className="grid items-center gap-20 lg:grid-cols-2">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="Competition"
            title="Compete. Improve. Get Recognized."
            subtitle="Learning becomes more engaging when every test contributes to your growth through rankings, XP, and achievements."
          />

          <div className="mt-10 space-y-5">

            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-brand">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-brand-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ProductShowcase mode="leaderboard" />
        </motion.div>

      </div>

    </Section>
  );
}
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
    <Section className="relative overflow-hidden bg-[#050B1A]">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            -left-40
            top-1/3
            h-96
            w-96
            rounded-full
            bg-brand-gold/5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-40
            top-1/4
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-blue-500/5
            blur-3xl
          "
        />

      </div>

      {/* Main Content */}
      <div
        className="
          relative
          z-10
          grid
          items-center
          gap-12
          lg:grid-cols-[0.9fr_1.1fr]
          lg:gap-16
        "
      >

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <SectionHeading
            badge="COMPETITION"
            title="Compete. Improve. Get Recognized."
            subtitle="Learning becomes more engaging when every test contributes to your growth through rankings, XP, and achievements."
            dark
          />

          {/* Highlights */}
          <div className="mt-8 space-y-3">

            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="
                    group
                    flex
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-4
                    transition-all
                    duration-300
                    hover:border-brand-gold/20
                    hover:bg-white/[0.05]
                  "
                >

                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-brand-gold/20
                      bg-brand-gold/10
                      text-brand-gold
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0">

                    <h3 className="font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-white/50">
                      {item.description}
                    </p>

                  </div>

                </motion.div>
              );
            })}

          </div>

        </motion.div>

        {/* RIGHT — Leaderboard */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          className="relative"
        >

          {/* Leaderboard Glow */}
          <div
            className="
              pointer-events-none
              absolute
              -inset-8
              rounded-[40px]
              bg-brand-gold/5
              blur-3xl
            "
          />

          {/* Showcase */}
          <div className="relative">
            <ProductShowcase mode="leaderboard" />
          </div>

        </motion.div>

      </div>

    </Section>
  );
}
"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Trophy,
  Wallet,
  BarChart3,
  School,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

import Section from "./ui/Section";

const items = [
  {
    icon: Brain,
    number: "01",
    title: "AI-Powered Exams",
    description:
      "A modern computer-based testing experience with intelligent monitoring features.",
  },
  {
    icon: Trophy,
    number: "02",
    title: "Competitive Learning",
    description:
      "Rankings, XP, and achievements encourage consistent improvement.",
  },
  {
    icon: Wallet,
    number: "03",
    title: "Integrated Wallet",
    description:
      "Track rewards, transactions, and account activity in one place.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Actionable Analytics",
    description:
      "Performance insights help students and educators identify strengths and areas for improvement.",
  },
  {
    icon: School,
    number: "05",
    title: "Institute Ready",
    description:
      "Designed for schools, coaching institutes, and independent educators.",
  },
  {
    icon: ShieldCheck,
    number: "06",
    title: "Built for Trust",
    description:
      "Security-focused design supports reliable online examinations.",
  },
];

export default function WhyChooseTCD() {
  return (
    <Section
      className="
        relative
        overflow-hidden
        bg-[#050B1A]
        py-20
        lg:py-28
      "
    >
      {/* ---------------------------------------------------------------- */}
      {/* Background                                                        */}
      {/* ---------------------------------------------------------------- */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            -left-40
            top-0
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-brand/5
            blur-[110px]
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-[-10rem]
            h-[34rem]
            w-[34rem]
            rounded-full
            bg-brand-gold/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-brand/15
            to-transparent
          "
        />
      </div>

      <div className="relative z-10">
        {/* ---------------------------------------------------------------- */}
        {/* Heading                                                           */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-brand/20
              bg-white/70
              px-4
              py-2
              shadow-sm
              backdrop-blur-xl
            "
          >
            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-brand
              "
            >
              Why The Conclusion Daily
            </span>
          </div>

          <h2
            className="
              mt-6
              max-w-4xl
              text-4xl
              font-black
              leading-[1.05]
              tracking-tight
              text-brand
              md:text-5xl
              lg:text-[3.6rem]
            "
          >
            Built for Better{" "}
            <span className="text-brand-gold">
              Learning Experiences
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-3xl
              text-base
              leading-7
              text-white
              md:text-lg
              md:leading-8
            "
          >
            A unified platform for students, educators, and institutes with a
            focus on performance, transparency, and growth.
          </p>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Feature Grid                                                      */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                whileHover={{ y: -5 }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[1.5rem]
                  border
                  border-brand/10
                  bg-white/90
                  p-6
                  shadow-[0_12px_40px_rgba(25,52,96,0.06)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-brand-gold/30
                  hover:bg-white
                  hover:shadow-[0_20px_55px_rgba(25,52,96,0.11)]
                  lg:p-7
                "
              >
                {/* Gold hover accent */}
                <div
                  className="
                    absolute
                    inset-x-0
                    top-0
                    h-[2px]
                    origin-left
                    scale-x-0
                    bg-brand-gold
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                  "
                />

                {/* Soft card glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-32
                    w-32
                    rounded-full
                    bg-brand-gold/5
                    blur-2xl
                    transition-opacity
                    duration-300
                    group-hover:bg-brand-gold/10
                  "
                />

                <div className="relative">
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-brand/15
                        bg-brand/[0.06]
                        text-brand
                        transition-all
                        duration-300
                        group-hover:border-brand-gold/30
                        group-hover:bg-brand-gold/10
                        group-hover:text-brand-gold
                      "
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className="
                          text-[11px]
                          font-bold
                          tracking-[0.14em]
                          text-brand/30
                        "
                      >
                        {item.number}
                      </span>

                      <ArrowUpRight
                        className="
                          h-4
                          w-4
                          text-brand/20
                          transition-all
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:text-brand-gold
                        "
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-8">
                    <h3
                      className="
                        text-xl
                        font-extrabold
                        tracking-tight
                        text-brand
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-brand-muted
                      "
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom indicator */}
                  <div className="mt-7 flex items-center gap-2">
                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-brand-gold
                      "
                    />

                    <span
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-brand/35
                        transition-colors
                        duration-300
                        group-hover:text-brand/55
                      "
                    >
                      TCD Platform
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

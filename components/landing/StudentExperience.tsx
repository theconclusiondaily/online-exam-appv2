"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Trophy,
} from "lucide-react";

import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

const features = [
  {
    icon: CheckCircle2,
    title: "Practice Without Limits",
    description:
      "Take realistic online tests and keep improving with every attempt.",
  },
  {
    icon: Trophy,
    title: "Compete & Climb",
    description:
      "Compare your performance on national leaderboards and see where you stand.",
  },
  {
    icon: Banknote,
    title: "Compete for Cash Rewards",
    description:
      "Eligible competitions give top-performing students an opportunity to earn cash rewards.",
  },
  {
    icon: ArrowRight,
    title: "Know Exactly Where You Stand",
    description:
      "Get instant performance insights, track your progress, and identify where you can improve.",
  },
];

export default function StudentExperience() {
  return (
    <Section className="relative overflow-hidden bg-[#050B1A]">
      {/* ================================================================
          BACKGROUND
      ================================================================ */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-40
            top-1/4
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
            right-0
            top-1/2
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-brand-gold/5
            blur-3xl
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
            via-brand-gold/20
            to-transparent
          "
        />
      </div>

      {/* ================================================================
          MAIN CONTENT
      ================================================================ */}

      <div
        className="
          relative
          z-10
          grid
          items-center
          gap-12
          lg:grid-cols-[1fr_0.9fr]
          lg:gap-20
        "
      >
        {/* ================================================================
            LEFT — STUDENT EXPERIENCE
        ================================================================ */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="THE STUDENT EXPERIENCE"
            title="Practice. Compete. Improve. Earn."
            subtitle="TCD turns exam preparation into a competitive learning experience where students can measure their performance, compete with others, and earn cash rewards through eligible competitions."
            dark
          />

          {/* ============================================================
              JOURNEY
          ============================================================ */}

          <div className="mt-8">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-brand-gold/20
                bg-brand-gold/[0.06]
                px-4
                py-2
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />

              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-brand-gold
                "
              >
                Your Competitive Journey
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                "Take Exams",
                "Compete",
                "Get Ranked",
                "Earn Rewards",
              ].map((step, index) => (
                <div
                  key={step}
                  className="
                    relative
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-3
                    py-3
                    text-center
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-lg
                      bg-brand-gold/10
                      text-xs
                      font-black
                      text-brand-gold
                    "
                  >
                    {index + 1}
                  </div>

                  <p className="mt-2 text-xs font-semibold text-white/70">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================
              FEATURES
          ============================================================ */}

          <div className="mt-8 space-y-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                  }}
                  whileHover={{ x: 4 }}
                  className="
                    group
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-4
                    py-4
                    transition-all
                    duration-300
                    hover:border-brand-gold/20
                    hover:bg-white/[0.05]
                  "
                >
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
                      transition-all
                      duration-300
                      group-hover:bg-brand-gold/15
                    "
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">
                      {feature.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/45 sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ============================================================
              REWARD NOTE
          ============================================================ */}

          <div
            className="
              mt-6
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-brand-gold/15
              bg-brand-gold/[0.04]
              px-4
              py-3
            "
          >
            <Banknote className="h-4 w-4 shrink-0 text-brand-gold" />

            <p className="text-xs leading-5 text-white/45">
              Your knowledge can be more than a score. In eligible
              competitions, strong performance can also mean{" "}
              <span className="font-semibold text-brand-gold">
                real cash rewards.
              </span>
            </p>
          </div>
        </motion.div>

        {/* ================================================================
            RIGHT — PREMIUM VISUAL
        ================================================================ */}

        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="
            relative
            flex
            min-h-[400px]
            items-center
            justify-center
            lg:min-h-[500px]
          "
        >
          {/* Outer glow */}

          <div
            className="
              pointer-events-none
              absolute
              h-[280px]
              w-[280px]
              rounded-full
              bg-brand-gold/10
              blur-[90px]
              sm:h-[360px]
              sm:w-[360px]
            "
          />

          {/* Rotating ring */}

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              h-[280px]
              w-[280px]
              rounded-full
              border
              border-brand-gold/10
              sm:h-[380px]
              sm:w-[380px]
              lg:h-[440px]
              lg:w-[440px]
            "
          />

          {/* Secondary ring */}

          <div
            className="
              absolute
              h-[220px]
              w-[220px]
              rounded-full
              border
              border-white/5
              sm:h-[300px]
              sm:w-[300px]
              lg:h-[360px]
              lg:w-[360px]
            "
          />

          {/* ============================================================
              REWARD ORBIT CARDS
          ============================================================ */}

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              right-[3%]
              top-[10%]
              z-20
              hidden
              rounded-2xl
              border
              border-brand-gold/20
              bg-[#0A1225]/90
              px-4
              py-3
              shadow-2xl
              backdrop-blur-xl
              sm:block
              lg:right-[2%]
              lg:top-[14%]
            "
          >
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-brand-gold" />

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                  Leaderboard
                </p>

                <p className="mt-0.5 text-xs font-bold text-white">
                  Climb the ranks
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              bottom-[12%]
              left-[2%]
              z-20
              hidden
              rounded-2xl
              border
              border-brand-gold/20
              bg-[#0A1225]/90
              px-4
              py-3
              shadow-2xl
              backdrop-blur-xl
              sm:block
              lg:left-[0%]
              lg:bottom-[16%]
            "
          >
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-brand-gold" />

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                  Rewards
                </p>

                <p className="mt-0.5 text-xs font-bold text-white">
                  Earn through competition
                </p>
              </div>
            </div>
          </motion.div>

          {/* ============================================================
              LOGO CONTAINER
          ============================================================ */}

          <motion.div
            whileHover={{
              scale: 1.04,
              y: -5,
            }}
            transition={{ duration: 0.3 }}
            className="
              relative
              flex
              h-[220px]
              w-[220px]
              items-center
              justify-center
              rounded-[3rem]
              border
              border-white/10
              bg-white/[0.04]
              shadow-2xl
              shadow-black/30
              backdrop-blur-xl
              sm:h-[290px]
              sm:w-[290px]
              lg:h-[350px]
              lg:w-[350px]
            "
          >
            <div
              className="
                absolute
                inset-4
                rounded-[2.5rem]
                border
                border-brand-gold/10
              "
            />

            <Image
              src="/logo.png"
              alt="The Conclusion Daily"
              width={350}
              height={350}
              priority
              className="
                relative
                z-10
                h-[150px]
                w-[150px]
                object-contain
                drop-shadow-[0_0_35px_rgba(234,179,8,0.18)]
                sm:h-[200px]
                sm:w-[200px]
                lg:h-[240px]
                lg:w-[240px]
              "
            />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
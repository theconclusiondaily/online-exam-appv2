"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Banknote,
  ShieldCheck,
  Trophy,
} from "lucide-react";

import ProductShowcase from "./showcase/ProductShowcase";

import GradientButton from "./ui/GradientButton";
import OutlineButton from "./ui/OutlineButton";
import Section from "./ui/Section";

import { COMPANY } from "@/lib/landing/constants";
import type { HeroData } from "@/lib/landing/types";

interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: HeroProps) {
  return (
    <Section
      className="
        relative
        min-h-screen
        flex
        items-center
        overflow-hidden
        bg-[#050B1A]
        pt-28
        pb-20
        lg:pt-32
        lg:pb-24
      "
    >
      {/* ================================================================
          PREMIUM BACKGROUND
      ================================================================ */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-32
            top-20
            h-96
            w-96
            rounded-full
            bg-brand-gold/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-0
            top-1/3
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-blue-400/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-brand-gold/40
            to-transparent
          "
        />

        {/* Subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          grid
          items-center
          gap-12
          lg:grid-cols-[0.85fr_1.15fr]
          lg:gap-10
        "
      >
        {/* ================================================================
            LEFT
        ================================================================ */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-w-0"
        >
          {/* Brand badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-brand-gold/25
              bg-brand-gold/10
              px-3.5
              py-1.5
              backdrop-blur-xl
            "
          >
            <Award className="h-4 w-4 text-brand-gold" />

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.12em]
                text-brand-gold
              "
            >
              India's Competitive Learning Ecosystem
            </span>
          </div>

          {/* ============================================================
              MAIN HEADING
          ============================================================ */}

          <h1
            className="
              mt-7
              max-w-2xl
              text-5xl
              font-black
              leading-[1.02]
              tracking-[-0.045em]
              text-white
              md:text-6xl
              xl:text-[4.5rem]
            "
          >
            Learn.
            <span className="text-brand-gold"> Compete.</span>
            <br />
            Perform.
            <span className="text-brand-gold"> Earn.</span>
          </h1>

          {/* Supporting heading */}

          <p
            className="
              mt-5
              max-w-xl
              text-xl
              font-semibold
              leading-8
              text-white/90
              md:text-2xl
            "
          >
            Turn your knowledge into opportunity.
          </p>

          {/* Description */}

          <p
            className="
              mt-4
              max-w-xl
              text-base
              leading-7
              text-white/55
              md:text-lg
              md:leading-8
            "
          >
            {COMPANY.heroDescription}
          </p>

          {/* ============================================================
              REWARD HIGHLIGHT
          ============================================================ */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="
              mt-7
              max-w-xl
              rounded-2xl
              border
              border-brand-gold/20
              bg-gradient-to-r
              from-brand-gold/[0.10]
              via-white/[0.035]
              to-transparent
              p-4
              backdrop-blur-xl
            "
          >
            <div className="flex items-start gap-3.5">
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
                  border-brand-gold/30
                  bg-brand-gold/10
                  text-brand-gold
                "
              >
                <Banknote className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-white">
                  Compete for Cash Rewards
                </p>

                <p className="mt-1 text-xs leading-5 text-white/45 sm:text-sm">
                  Take competitive exams, perform at your best, climb the
                  leaderboard, and earn rewards through eligible competitions.
                </p>
              </div>

              <Trophy className="ml-auto mt-1 hidden h-5 w-5 shrink-0 text-brand-gold/70 sm:block" />
            </div>
          </motion.div>

          {/* ============================================================
              CTA
          ============================================================ */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <GradientButton
              size="md"
              className="shrink-0 whitespace-nowrap"
              href="https://exam.theconclusiondaily.com/signup"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Exams
              <ArrowRight className="ml-2 h-5 w-5" />
            </GradientButton>

            <OutlineButton
              size="md"
              className="shrink-0 whitespace-nowrap"
              href="rewards"
            >
              How Rewards Work
            </OutlineButton>
          </div>

          {/* ============================================================
              STATS
          ============================================================ */}

          <div
            className="
              mt-9
              grid
              grid-cols-2
              gap-x-6
              gap-y-5
              border-y
              border-white/10
              py-6
              sm:grid-cols-4
            "
          >
            <div>
              <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                {data.stats.exams}
              </p>

              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
                Live Exams
              </p>
            </div>

            <div>
              <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                {data.stats.students}
              </p>

              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
                Students
              </p>
            </div>

            <div>
              <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                {data.stats.institutes}
              </p>

              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
                Institutes
              </p>
            </div>

            <div>
              <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                {data.stats.questions}
              </p>

              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
                Questions
              </p>
            </div>
          </div>

          {/* ============================================================
              TRUST / REWARD HIGHLIGHTS
          ============================================================ */}

          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-brand-gold/30
                  bg-brand-gold/10
                  text-brand-gold
                "
              >
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="font-semibold text-white">
                  Secure Exams
                </p>

                <p className="text-sm text-white/45">
                  AI Proctoring
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-brand-gold/30
                  bg-brand-gold/10
                  text-brand-gold
                "
              >
                <Trophy size={20} />
              </div>

              <div>
                <p className="font-semibold text-white">
                  Cash Rewards
                </p>

                <p className="text-sm text-white/45">
                  Scholarships & Cash
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================================================================
            RIGHT — PRODUCT / FEATURED EXAM
        ================================================================ */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="relative min-w-0"
        >
          {/* Featured exam */}

          {data.featuredExam && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="
                mb-5
                rounded-2xl
                border
                border-brand-gold/20
                bg-white/[0.045]
                p-5
                shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                backdrop-blur-xl
              "
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-brand-gold
                    "
                  >
                    Featured Competition
                  </p>

                  <h3
                    className="
                      mt-2
                      text-lg
                      font-bold
                      tracking-tight
                      text-white
                      sm:text-xl
                    "
                  >
                    {data.featuredExam.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-brand-gold" />

                    <p className="text-sm font-semibold text-white/65">
                      Prize Pool:{" "}
                      <span className="text-brand-gold">
                        {data.featuredExam.rewardPool}
                      </span>
                    </p>
                  </div>
                </div>

                <span
                  className="
                    shrink-0
                    rounded-full
                    border
                    border-brand-gold/20
                    bg-brand-gold/10
                    px-3
                    py-1.5
                    text-xs
                    font-bold
                    text-brand-gold
                  "
                >
                  {data.featuredExam.status}
                </span>
              </div>
            </motion.div>
          )}

          {/* Product showcase */}

          <div className="relative">
            <div
              className="
                absolute
                -inset-6
                rounded-[40px]
                bg-brand-gold/5
                blur-3xl
              "
            />

            <div className="relative">
              <ProductShowcase mode="dashboard" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================================================================
          SCROLL INDICATOR
      ================================================================ */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="
          absolute
          bottom-7
          left-1/2
          -translate-x-1/2
        "
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
          }}
          className="
            flex
            h-14
            w-8
            justify-center
            rounded-full
            border-2
            border-white/20
            pt-2
          "
        >
          <div className="h-3 w-3 rounded-full bg-brand-gold" />
        </motion.div>
      </motion.div>
    </Section>
  );
}
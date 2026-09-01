"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  Trophy,
  CreditCard,
  History,
  ShieldCheck,
  Banknote,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Section from "./ui/Section";
import ProductShowcase from "./showcase/ProductShowcase";

const rewards = [
  {
    icon: Trophy,
    title: "Compete & Earn",
    description:
      "Take part in eligible competitions, perform at your best, and compete for cash rewards through your rank.",
  },
  {
    icon: Wallet,
    title: "Secure Rewards Wallet",
    description:
      "Keep track of your available rewards, winnings, and wallet balance in one convenient place.",
  },
  {
    icon: CreditCard,
    title: "Simple Withdrawals",
    description:
      "Manage eligible withdrawals through a simple and transparent process.",
  },
  {
    icon: History,
    title: "Complete Transaction History",
    description:
      "Keep track of deposits, prizes, refunds, withdrawals, and other wallet activity.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    description:
      "Wallet activity is securely recorded so your reward and transaction history remains clear and accountable.",
  },
];

export default function RewardsExperience() {
  return (
    <Section
      id="rewards"
      className="
        relative
        overflow-hidden
        bg-[#020817]
        py-20
        lg:py-28
      "
    >
      {/* ================================================================
          BACKGROUND
      ================================================================ */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-48
            top-1/3
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-brand-gold/[0.035]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-48
            bottom-[-12rem]
            h-[36rem]
            w-[36rem]
            rounded-full
            bg-blue-500/[0.025]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-white/[0.06]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-px
            bg-white/[0.06]
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
          gap-14
          lg:grid-cols-2
          lg:gap-16
        "
      >
        {/* ============================================================
            LEFT — WALLET PREVIEW
        ============================================================ */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="relative order-2 lg:order-1"
        >
          {/* Soft glow */}

          <div
            className="
              pointer-events-none
              absolute
              -inset-10
              rounded-[4rem]
              bg-brand-gold/[0.035]
              blur-3xl
            "
          />

          <div className="relative">
            <ProductShowcase mode="wallet" />
          </div>

          {/* Floating reward card */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.35,
            }}
            animate={{
              y: [0, -6, 0],
            }}
            className="
              absolute
              -bottom-4
              right-2
              z-20
              hidden
              rounded-2xl
              border
              border-brand-gold/20
              bg-[#081126]/95
              px-4
              py-3
              shadow-2xl
              backdrop-blur-xl
              sm:block
              lg:right-[-1.5rem]
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-brand-gold/10
                  text-brand-gold
                "
              >
                <Banknote className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                  Performance
                </p>

                <p className="mt-0.5 text-xs font-bold text-white">
                  Cash Rewards
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ============================================================
            RIGHT — REWARDS CONTENT
        ============================================================ */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="order-1 lg:order-2"
        >
          {/* ==========================================================
              BADGE
          ========================================================== */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-brand-gold/30
              bg-brand-gold/[0.05]
              px-4
              py-2
            "
          >
            <Banknote className="h-3.5 w-3.5 text-brand-gold" />

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-brand-gold
              "
            >
              Cash Rewards
            </span>
          </div>

          {/* ==========================================================
              HEADING
          ========================================================== */}

          <h2
            className="
              mt-7
              max-w-2xl
              text-4xl
              font-black
              leading-[1.05]
              tracking-tight
              text-white
              md:text-5xl
              xl:text-[3.5rem]
            "
          >
            Your Performance
            <br className="hidden sm:block" />
            Can Earn You{" "}
            <span className="text-brand-gold">
              Real Rewards
            </span>
          </h2>

          {/* ==========================================================
              DESCRIPTION
          ========================================================== */}

          <p
            className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              text-white/60
            "
          >
            TCD makes competitive learning more rewarding. Take eligible
            exams, compete with other students, climb the leaderboard, and
            earn cash rewards when your performance qualifies.
          </p>

          {/* ==========================================================
              HOW IT WORKS
          ========================================================== */}

          <div
            className="
              mt-7
              rounded-2xl
              border
              border-brand-gold/15
              bg-brand-gold/[0.035]
              p-5
            "
          >
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-brand-gold" />

              <p className="text-sm font-bold text-white">
                How the reward journey works
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                "Take an Exam",
                "Compete",
                "Get Ranked",
                "Earn",
              ].map((step, index) => (
                <div
                  key={step}
                  className="
                    relative
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
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

                  <p className="mt-2 text-xs font-semibold text-white/65">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ==========================================================
              REWARD FEATURES
          ========================================================== */}

          <div className="mt-8 space-y-3">
            {rewards.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                  }}
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    group
                    flex
                    items-center
                    gap-5
                    rounded-2xl
                    border
                    border-white/[0.10]
                    bg-white/[0.025]
                    px-5
                    py-4
                    transition-all
                    duration-300
                    hover:border-brand-gold/30
                    hover:bg-white/[0.045]
                  "
                >
                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-brand-gold/30
                      bg-brand-gold/[0.04]
                      text-brand-gold
                      transition-all
                      duration-300
                      group-hover:bg-brand-gold/[0.10]
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Text */}

                  <div className="min-w-0">
                    <h3
                      className="
                        text-base
                        font-bold
                        tracking-tight
                        text-white
                        md:text-lg
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-6
                        text-white/50
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ==========================================================
              TRUST MESSAGE
          ========================================================== */}

          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.02]
              px-4
              py-3.5
            "
          >
            <CheckCircle2
              className="
                mt-0.5
                h-4
                w-4
                shrink-0
                text-brand-gold
              "
            />

            <p className="text-xs leading-5 text-white/45">
              Rewards are associated with eligible competitions and are
              subject to the applicable competition rules and reward
              conditions.
            </p>
          </div>

          {/* ==========================================================
              CTA
          ========================================================== */}

          <motion.a
            href="#exams"
            whileHover={{ x: 3 }}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-brand-gold
              transition-colors
              hover:text-brand-gold/80
            "
          >
            Explore competitions
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </Section>
  );
}
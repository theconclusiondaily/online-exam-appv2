"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  Trophy,
  CreditCard,
  History,
  ShieldCheck,
} from "lucide-react";

import Section from "./ui/Section";
import ProductShowcase from "./showcase/ProductShowcase";

const rewards = [
  {
    icon: Wallet,
    title: "Secure Wallet",
    description:
      "Track your available balance, rewards, and winnings in one place.",
  },
  {
    icon: Trophy,
    title: "Performance Rewards",
    description:
      "Outstanding performance can earn prizes in eligible competitions.",
  },
  {
    icon: CreditCard,
    title: "Easy Withdrawals",
    description:
      "Manage withdrawals through a simple and transparent process.",
  },
  {
    icon: History,
    title: "Complete History",
    description:
      "View deposits, prizes, refunds, and withdrawals with full transparency.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Transactions",
    description:
      "Every wallet activity is securely recorded for accountability.",
  },
];

export default function RewardsExperience() {
  return (
    <Section
      className="
        relative
        overflow-hidden
        bg-[#020817]
        py-20
        lg:py-28
      "
    >
      {/* ================================================================ */}
      {/* BACKGROUND                                                       */}
      {/* ================================================================ */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle gold glow */}
        <div
          className="
            absolute
            -left-48
            top-1/3
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-brand-gold/[0.025]
            blur-3xl
          "
        />

        {/* Very subtle blue glow */}
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

        {/* Top separator */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-white/[0.06]
          "
        />

        {/* Bottom separator */}
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

      {/* ================================================================ */}
      {/* MAIN CONTENT                                                     */}
      {/* ================================================================ */}

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
        {/* ============================================================ */}
        {/* LEFT — WALLET PREVIEW                                        */}
        {/* ============================================================ */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="relative"
        >
          {/* Soft glow behind wallet */}
          <div
            className="
              pointer-events-none
              absolute
              -inset-10
              rounded-[4rem]
              bg-brand-gold/[0.025]
              blur-3xl
            "
          />

          <div className="relative">
            <ProductShowcase mode="wallet" />
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* RIGHT — REWARDS CONTENT                                      */}
        {/* ============================================================ */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          {/* ========================================================== */}
          {/* BADGE                                                      */}
          {/* ========================================================== */}

          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-brand-gold/30
              bg-brand-gold/[0.03]
              px-4
              py-2
            "
          >
            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-brand-gold
              "
            >
              Rewards
            </span>
          </div>

          {/* ========================================================== */}
          {/* HEADING                                                    */}
          {/* ========================================================== */}

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
            Turn Performance{" "}
            <br className="hidden sm:block" />
            Into{" "}
            <span className="text-brand-gold">
              Achievement
            </span>
          </h2>

          {/* ========================================================== */}
          {/* DESCRIPTION                                                */}
          {/* ========================================================== */}

          <p
            className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              text-white/60
            "
          >
            Your wallet keeps track of rewards, transactions, and
            progress, making every competition meaningful.
          </p>

          {/* ========================================================== */}
          {/* REWARD FEATURES                                            */}
          {/* ========================================================== */}

          <div className="mt-10 space-y-4">
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
                    px-6
                    py-5
                    transition-all
                    duration-300
                    hover:border-brand-gold/30
                    hover:bg-white/[0.045]
                  "
                >
                  {/* ================================================= */}
                  {/* ICON                                               */}
                  {/* ================================================= */}

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-brand-gold/40
                      bg-brand-gold/[0.025]
                      text-brand-gold
                      transition-all
                      duration-300
                      group-hover:bg-brand-gold/[0.08]
                    "
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* ================================================= */}
                  {/* TEXT                                               */}
                  {/* ================================================= */}

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
        </motion.div>
      </div>
    </Section>
  );
}
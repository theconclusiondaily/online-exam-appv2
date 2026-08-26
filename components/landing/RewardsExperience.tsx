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
import SectionHeading from "./ui/SectionHeading";
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
    <Section>

      <div className="grid items-center gap-12 lg:grid-cols-2">

        {/* Wallet Preview */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ProductShowcase mode="wallet" />
        </motion.div>

        {/* Content */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="Rewards"
            title="Turn Performance Into Achievement"
            subtitle="Your wallet keeps track of rewards, transactions, and progress, making every competition meaningful."
          />

          <div className="mt-8 space-y-3">

            {rewards.map((item) => {
              const Icon = item.icon;

              return (
                <div
  key={item.title}
  className="
    flex
    gap-3
    rounded-2xl
    border
    border-gray-200/80
    bg-white
    p-4
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:shadow-md
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
      bg-brand/10
      text-brand
    "
  >
    <Icon className="h-5 w-5" />
  </div>

  <div className="min-w-0">
    <h3 className="font-semibold text-brand">
      {item.title}
    </h3>

    <p className="mt-1 text-xs leading-5 text-brand-muted">
      {item.description}
    </p>
  </div>
</div>
              );
            })}

          </div>

        </motion.div>

      </div>

    </Section>
  );
}
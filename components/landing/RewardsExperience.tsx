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

      <div className="grid items-center gap-20 lg:grid-cols-2">

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

          <div className="mt-10 space-y-5">

            {rewards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    flex
                    gap-4
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                    transition-all
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
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

      </div>

    </Section>
  );
}
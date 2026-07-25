"use client";

import { AnimatePresence, motion } from "framer-motion";

import BrowserFrame from "./BrowserFrame";

import DashboardPreview from "./previews/DashboardPreview";
import ExamPreview from "./previews/ExamPreview";
import WalletPreview from "./previews/WalletPreview";
import LeaderboardPreview from "./previews/LeaderboardPreview";
import AnalyticsPreview from "./previews/AnalyticsPreview";

export type ProductShowcaseMode =
  | "dashboard"
  | "exam"
  | "wallet"
  | "leaderboard"
  | "analytics";

interface ProductShowcaseProps {
  mode: ProductShowcaseMode;
  className?: string;
}

export default function ProductShowcase({
  mode,
  className = "",
}: ProductShowcaseProps) {
  return (
    <motion.div
      layout
      className={`relative w-full ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.6,
        ease: "easeOut" as const,
      }}
    >
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10 rounded-full bg-brand/10 blur-[120px]" />

      <BrowserFrame>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            transition={{
              duration: 0.45,
            }}
          >
            {mode === "dashboard" && <DashboardPreview />}

            {mode === "exam" && <ExamPreview />}

            {mode === "wallet" && <WalletPreview />}

            {mode === "leaderboard" && <LeaderboardPreview />}

            {mode === "analytics" && <AnalyticsPreview />}
          </motion.div>
        </AnimatePresence>
      </BrowserFrame>
    </motion.div>
  );
}
"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Wallet,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  Clock3,
} from "lucide-react";

const floating = {
  animate: {
    y: [0, -10, 0],
    transition: {
      repeat: Infinity,
      duration: 5,
      ease: "easeInOut" as const,
    },
  },
};

function DashboardCard({
  className = "",
  icon,
  title,
  value,
  subtitle,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
   <motion.div
  animate={{
    y: [0, -10, 0],
  }}
  transition={{
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
     <div
  className="
    flex
    items-center
    gap-3
    rounded-2xl
    border
    border-white/60
    bg-white/95
    p-4
    shadow-lg
    backdrop-blur-xl
  "
>

        <div
  className="
    flex
    h-11
    w-11
    shrink-0
    items-center
    justify-center
    rounded-xl
    bg-brand
    text-white
  "
>
          {icon}
        </div>

        <div>
          <p className="text-xs font-medium text-brand-muted">
            {title}
          </p>

          <h3 className="mt-1 text-xl font-bold text-brand">
            {value}
          </h3>

          <p className="mt-1 text-xs text-brand-muted">
            {subtitle}
          </p>
        </div>

      </div>
    </motion.div>
  );
}

export default function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">

      {/* Background Glow */}

      <div className="absolute inset-0 rounded-full bg-brand/10 blur-[130px]" />

   <div className="relative grid grid-cols-2 gap-4">

        <DashboardCard
          icon={<Wallet size={22} />}
          title="Wallet"
          value="763.5 Credits"
          subtitle="Available Balance"
        />

        <DashboardCard
          icon={<Trophy size={22} />}
          title="Leaderboard"
          value="#18"
          subtitle="National Rank"
          className="mt-8"
        />

        <DashboardCard
          icon={<GraduationCap size={22} />}
          title="Live Exam"
          value="NEET Physics"
          subtitle="2,481 Students Live"
        />

        <DashboardCard
          icon={<TrendingUp size={22} />}
          title="Experience"
          value="Level 14"
          subtitle="+420 XP Today"
          className="mt-8"
        />

        <DashboardCard
          icon={<ShieldCheck size={22} />}
          title="Security"
          value="Protected"
          subtitle="AI Proctoring Enabled"
        />

        <DashboardCard
          icon={<Clock3 size={22} />}
          title="Upcoming"
          value="08:00 PM"
          subtitle="National Scholarship Test"
          className="mt-8"
        />

      </div>

    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  ArrowUp,
  Medal,
  Trophy,
  Crown,
  TrendingUp,
  Star,
} from "lucide-react";

type MedalType = "gold" | "silver" | "bronze";

interface LeaderboardItem {
  rank: number;
  name: string;
  score: string;
  xp: string;
  medal: MedalType;
}

const leaderboard: LeaderboardItem[] = [
  {
    rank: 1,
    name: "Priya Sharma",
    score: "99.2%",
    xp: "18,420 XP",
    medal: "gold",
  },
  {
    rank: 2,
    name: "Rahul Kumar",
    score: "98.7%",
    xp: "18,180 XP",
    medal: "silver",
  },
  {
    rank: 3,
    name: "Arjun Patel",
    score: "98.1%",
    xp: "17,940 XP",
    medal: "bronze",
  },
];

export default function LeaderboardPreview() {
  return (
    <div className="space-y-4 bg-[#07101F] p-4 sm:p-5">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.035]
          p-5
          shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        "
      >
        <div className="flex items-center justify-between gap-4">

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold">
              National Competition
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Live Leaderboard
            </h2>

            <p className="mt-1 text-xs text-white/40">
              See where you stand among top performers.
            </p>
          </div>

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-brand-gold/30
              bg-brand-gold/10
              text-brand-gold
            "
          >
            <Trophy className="h-6 w-6" />
          </div>

        </div>
      </motion.div>

      {/* Top 3 */}
      <div className="grid gap-3 md:grid-cols-3">

        {leaderboard.map((student, index) => (
          <LeaderboardCard
            key={student.rank}
            {...student}
            index={index}
          />
        ))}

      </div>

      {/* Current User */}
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="
          rounded-2xl
          border
          border-brand-gold/35
          bg-gradient-to-r
          from-brand-gold/[0.08]
          via-white/[0.035]
          to-brand-gold/[0.04]
          p-4
          shadow-[0_0_35px_rgba(234,179,8,0.05)]
        "
      >
        <div className="flex items-center justify-between gap-4">

          {/* User rank */}
          <div className="flex min-w-0 items-center gap-3">

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
                bg-brand-gold/10
                text-lg
                font-black
                text-brand-gold
              "
            >
              18
            </div>

            <div className="min-w-0">

              <h3 className="font-bold text-white">
                You
              </h3>

              <p className="mt-0.5 text-xs text-white/45">
                96.8% Accuracy
              </p>

            </div>

          </div>

          {/* XP */}
          <div className="text-right">

            <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-emerald-400">

              <ArrowUp className="h-3.5 w-3.5" />

              <span>
                +24 Positions
              </span>

            </div>

            <p className="mt-1 text-lg font-black tracking-tight text-white sm:text-xl">
              14,820 XP
            </p>

          </div>

        </div>
      </motion.div>

      {/* Statistics */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">

        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          title="XP Earned"
          value="14,820"
        />

        <StatCard
          icon={<Star className="h-4 w-4" />}
          title="Achievements"
          value="18"
        />

        <StatCard
          icon={<Medal className="h-4 w-4" />}
          title="Institute Rank"
          value="#1"
        />

        <StatCard
          icon={<Trophy className="h-4 w-4" />}
          title="National Rank"
          value="#18"
        />

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */

function LeaderboardCard({
  rank,
  name,
  score,
  xp,
  medal,
  index,
}: {
  rank: number;
  name: string;
  score: string;
  xp: string;
  medal: MedalType;
  index: number;
}) {
  const medalStyles = {
    gold: {
      wrapper:
        "border-brand-gold/35 bg-brand-gold/10 text-brand-gold",
      crown: "text-brand-gold",
    },

    silver: {
      wrapper:
        "border-white/15 bg-white/[0.06] text-white/65",
      crown: "text-white/60",
    },

    bronze: {
      wrapper:
        "border-orange-400/25 bg-orange-400/10 text-orange-300",
      crown: "text-orange-300",
    },
  };

  const style = medalStyles[medal];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
      }}
      whileHover={{ y: -4 }}
      className="
        group
        rounded-2xl
        border
        border-white/10
        bg-white/[0.035]
        p-4
        transition-colors
        duration-300
        hover:border-brand-gold/20
        hover:bg-white/[0.055]
      "
    >

      {/* Rank */}
      <div className="flex items-center justify-between gap-3">

        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            ${style.wrapper}
          `}
        >
          <Crown
            className={`h-5 w-5 ${style.crown}`}
          />
        </div>

        <span className="text-2xl font-black tracking-tight text-white">
          #{rank}
        </span>

      </div>

      {/* Student */}
      <h3 className="mt-5 text-base font-bold leading-tight text-white sm:text-lg">
        {name}
      </h3>

      {/* Score */}
      <p className="mt-1.5 text-xs text-white/45">
        {score} Accuracy
      </p>

      {/* XP */}
      <div className="mt-4">

        <span
          className="
            inline-flex
            rounded-full
            border
            border-brand-gold/20
            bg-brand-gold/[0.07]
            px-3
            py-1.5
            text-xs
            font-bold
            text-brand-gold
          "
        >
          {xp}
        </span>

      </div>

    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function StatCard({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-3
        transition-colors
        hover:border-brand-gold/20
        hover:bg-white/[0.05]
      "
    >

      <div className="flex items-center justify-between gap-2">

        <div className="min-w-0">

          <p className="truncate text-[10px] font-bold uppercase tracking-wider text-white/35">
            {title}
          </p>

          <h3 className="mt-1 text-base font-black tracking-tight text-white">
            {value}
          </h3>

        </div>

        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-brand-gold/20
            bg-brand-gold/10
            text-brand-gold
          "
        >
          {icon}
        </div>

      </div>

    </motion.div>
  );
}
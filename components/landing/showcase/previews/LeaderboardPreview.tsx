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
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              National Competition
            </p>

            <h2 className="mt-1 text-3xl font-black text-brand">
              Live Leaderboard
            </h2>

          </div>

          <div className="rounded-2xl bg-brand p-4 text-white">
            <Trophy className="h-8 w-8" />
          </div>

        </div>

      </div>

      {/* Top 3 */}

      <div className="grid gap-5 md:grid-cols-3">

        {leaderboard.map((student) => (
          <LeaderboardCard
            key={student.rank}
            {...student}
          />
        ))}

      </div>

      {/* Current User */}

      <motion.div
        whileHover={{ y: -4 }}
        className="
          rounded-3xl
          border-2
          border-brand
          bg-gradient-to-r
          from-brand/5
          to-brand-gold/5
          p-6
          shadow-md
        "
      >

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-2xl font-black text-white">
              18
            </div>

            <div>

              <h3 className="text-xl font-bold text-brand">
                You
              </h3>

              <p className="text-gray-500">
                96.8% Accuracy
              </p>

            </div>

          </div>

          <div className="text-right">

            <div className="flex items-center justify-end gap-2 text-green-600">

              <ArrowUp size={18} />

              <span className="font-semibold">
                +24 Positions
              </span>

            </div>

            <p className="mt-2 text-2xl font-black text-brand">
              14,820 XP
            </p>

          </div>

        </div>

      </motion.div>

      {/* Statistics */}

      <div className="grid gap-5 md:grid-cols-4">

        <StatCard
          icon={<TrendingUp />}
          title="XP Earned"
          value="14,820"
        />

        <StatCard
          icon={<Star />}
          title="Achievements"
          value="18"
        />

        <StatCard
          icon={<Medal />}
          title="Institute Rank"
          value="#1"
        />

        <StatCard
          icon={<Trophy />}
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
}: {
  rank: number;
  name: string;
  score: string;
  xp: string;
  medal: "gold" | "silver" | "bronze";
}) {
  const medalStyles = {
    gold: "bg-yellow-100 text-yellow-600",
    silver: "bg-gray-100 text-gray-600",
    bronze: "bg-orange-100 text-orange-600",
  };

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
    >

      <div className="flex items-center justify-between">

        <div
          className={`rounded-2xl p-3 ${medalStyles[medal]}`}
        >
          <Crown className="h-6 w-6" />
        </div>

        <span className="text-3xl font-black text-brand">
          #{rank}
        </span>

      </div>

      <h3 className="mt-6 text-xl font-bold text-brand">
        {name}
      </h3>

      <p className="mt-2 text-gray-500">
        {score}
      </p>

      <div className="mt-6 flex items-center justify-between">

        <span className="rounded-full bg-brand/10 px-3 py-2 text-sm font-semibold text-brand">
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
      whileHover={{
        y: -4,
      }}
      className="
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-black text-brand">
            {value}
          </h3>

        </div>

        <div className="rounded-2xl bg-brand/10 p-3 text-brand">
          {icon}
        </div>

      </div>

    </motion.div>
  );
}
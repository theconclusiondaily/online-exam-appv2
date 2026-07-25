"use client";

import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronRight,
  Medal,
  Target,
  Trophy,
  Wallet,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-500">
            Welcome back 👋
          </p>

          <h2 className="mt-1 text-3xl font-black text-brand">
            Rahul
          </h2>
        </div>

        <div className="flex items-center gap-3">

          <button className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
            <Bell className="h-5 w-5 text-brand" />
          </button>

          <div className="h-12 w-12 rounded-2xl bg-brand text-white flex items-center justify-center font-bold">
            R
          </div>

        </div>

      </div>

      {/* Top Metrics */}

      <div className="grid gap-5 md:grid-cols-3">

        <MetricCard
          icon={<Wallet className="h-6 w-6" />}
          title="Wallet"
          value="763.5 Credits"
          color="bg-brand"
        />

        <MetricCard
          icon={<Target className="h-6 w-6" />}
          title="XP"
          value="14,820 XP"
          color="bg-green-600"
        />

        <MetricCard
          icon={<Medal className="h-6 w-6" />}
          title="National Rank"
          value="#18"
          color="bg-brand-gold"
        />

      </div>

      {/* Main Grid */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Upcoming Exam */}

        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Upcoming Exam
              </p>

              <h3 className="mt-2 text-2xl font-bold text-brand">
                NEET Physics Grand Test
              </h3>

            </div>

            <BookOpen className="h-10 w-10 text-brand" />

          </div>

          <div className="mt-8 flex items-center gap-8">

            <Info
              icon={<Calendar className="h-5 w-5" />}
              title="Today"
              value="8:00 PM"
            />

            <Info
              icon={<Trophy className="h-5 w-5" />}
              title="Prize Pool"
              value="₹50,000"
            />

          </div>

          <button className="mt-8 flex items-center gap-2 rounded-2xl bg-brand px-6 py-3 font-semibold text-white transition hover:scale-105">
            Enter Exam
            <ChevronRight className="h-5 w-5" />
          </button>

        </motion.div>

        {/* Achievement */}

        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl bg-gradient-to-br from-brand to-brand-light p-6 text-white shadow-lg"
        >

          <p className="text-sm opacity-80">
            Latest Achievement
          </p>

          <h3 className="mt-3 text-2xl font-black">
            Physics Master
          </h3>

          <div className="mt-10 flex items-center gap-4">

            <div className="rounded-2xl bg-white/20 p-3">
              <Trophy className="h-8 w-8" />
            </div>

            <div>

              <p className="text-sm opacity-80">
                Reward
              </p>

              <h4 className="text-xl font-bold">
                +500 XP
              </h4>

            </div>

          </div>

        </motion.div>

      </div>

      {/* Progress */}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Level Progress
            </p>

            <h3 className="mt-2 text-2xl font-bold text-brand">
              Level 14
            </h3>

          </div>

          <span className="rounded-full bg-brand/10 px-4 py-2 text-sm font-semibold text-brand">
            82%
          </span>

        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "82%" }}
            transition={{
              duration: 1.5,
            }}
            className="h-full rounded-full bg-brand"
          />

        </div>

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */

function MetricCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
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

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white ${color}`}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="rounded-xl bg-brand/10 p-3 text-brand">
        {icon}
      </div>

      <div>

        <p className="text-xs text-gray-500">
          {title}
        </p>

        <p className="font-semibold text-brand">
          {value}
        </p>

      </div>

    </div>
  );
}
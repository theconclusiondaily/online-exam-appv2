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
    <div
  className="
    relative
    overflow-hidden
    rounded-[28px]
    border
    border-white/10
    bg-[#0B1730]
    p-5
    shadow-2xl
    sm:p-6
  "
>

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/45">
           Sample User
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Maadhav
          </h2>
        </div>

        <div className="flex items-center gap-3">

          <button
  className="
    rounded-xl
    border
    border-white/10
    bg-white/[0.05]
    p-2.5
    transition
    hover:bg-white/10
  "
>
           <Bell className="h-5 w-5 text-white/70" />
          </button>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-gold/10 font-bold text-brand-gold">
            M
          </div>

        </div>

      </div>

      {/* Top Metrics */}

 <div className="grid gap-3 md:grid-cols-3">

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

      <div className="grid gap-4 lg:grid-cols-3">

        {/* Upcoming Exam */}

        <motion.div
          whileHover={{ y: -5 }}
          className="
  rounded-2xl
  border
  border-white/10
  bg-white/[0.04]
  p-5
  shadow-none
  lg:col-span-2
"
        >
          <div className="flex items-center justify-between">

            <div>

            <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                Upcoming Exam
              </p>

              <h3 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                NEET Physics Grand Test
              </h3>

            </div>

            <BookOpen className="h-8 w-8 text-brand-gold" />

          </div>

         <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">

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

          <button className="
  mt-6
  flex
  items-center
  gap-2
  rounded-xl
  border
  border-brand-gold/30
  bg-brand-gold
  px-5
  py-2.5
  text-sm
  font-bold
  text-brand
  transition
  hover:scale-[1.02]
">
            Enter Exam
            <ChevronRight className="h-5 w-5" />
          </button>

        </motion.div>

        {/* Achievement */}

        <motion.div
          whileHover={{ y: -5 }}
          className="
  rounded-2xl
  border
  border-brand-gold/20
  bg-gradient-to-br
  from-brand-gold/15
  via-white/[0.04]
  to-white/[0.02]
  p-5
  text-white
"
        >

          <p className="text-sm opacity-80">
            Latest Achievement
          </p>

          <h3 className="mt-3 text-2xl font-black">
            Physics Master
          </h3>

         <div className="mt-8 flex items-center gap-3">

            <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/10 p-2.5">
              <Trophy className="h-7 w-7 text-brand-gold" />
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

      <div
  className="
    rounded-2xl
    border
    border-white/10
    bg-white/[0.04]
    p-5
  "
>

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs font-medium uppercase tracking-wider text-white/45">
              Level Progress
            </p>

            <h3 className="mt-1 text-xl font-black tracking-tight text-white">
              Level 14
            </h3>

          </div>

          <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 text-sm font-bold text-brand-gold">
            82%
          </span>

        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "82%" }}
            transition={{
              duration: 1.5,
            }}
            className="h-full rounded-full bg-brand-gold"
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
      whileHover={{ y: -2 }}
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        p-4
        transition-colors
        hover:border-brand-gold/20
        hover:bg-white/[0.06]
      "
    >
      <div className="flex items-center gap-3">

        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-brand-gold/20
            bg-brand-gold/10
            text-brand-gold
          `}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-white/45">
            {title}
          </p>

          <h3 className="mt-1 truncate text-lg font-black tracking-tight text-white sm:text-xl">
            {value}
          </h3>
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

      <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/10 p-2.5 text-brand-gold">
        {icon}
      </div>

      <div>

        <p className="text-xs text-white/40">
          {title}
        </p>

        <p className="font-semibold text-white">
          {value}
        </p>

      </div>

    </div>
  );
}
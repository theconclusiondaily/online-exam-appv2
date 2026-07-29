"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  Trophy,
  Gift,
  Coins,
  Medal,
  CalendarDays,
  Users,
  Star,
  Award,
  BadgeDollarSign,
  Target,
  Sparkles,
} from "lucide-react";

const rewards = [
  {
    icon: Wallet,
    title: "TCD Wallet",
    description:
      "Keep all your TCD Credits, rewards, winnings, and bonus balance in one secure wallet.",
  },
  {
    icon: Trophy,
    title: "Competition Rewards",
    description:
      "Win exciting rewards by securing top ranks in live competitive exams.",
  },
  {
    icon: Award,
    title: "Achievement Rewards",
    description:
      "Unlock achievements as you learn and earn bonus TCD Credits.",
  },
  {
    icon: CalendarDays,
    title: "Daily Login Rewards",
    description:
      "Maintain your learning streak and claim rewards every day.",
  },
  {
    icon: Users,
    title: "Referral Program",
    description:
      "Invite friends to TCD and earn bonus credits when they join.",
  },
  {
    icon: Medal,
    title: "Leaderboard Rewards",
    description:
      "Climb the rankings and compete with students from across the country.",
  },
  {
    icon: Coins,
    title: "Bonus Credits",
    description:
      "Receive bonus credits through campaigns, special events, and promotions.",
  },
  {
    icon: Gift,
    title: "Special Events",
    description:
      "Participate in festivals and special competitions to unlock exclusive rewards.",
  },
  {
    icon: BadgeDollarSign,
    title: "Prize Distribution",
    description:
      "Eligible competition prizes are distributed securely through the TCD Wallet.",
  },
  {
    icon: Target,
    title: "Learning Milestones",
    description:
      "Earn rewards for completing important learning milestones and goals.",
  },
  {
    icon: Star,
    title: "Recognition System",
    description:
      "Showcase your achievements, badges, and accomplishments on your profile.",
  },
  {
    icon: Sparkles,
    title: "Growing Ecosystem",
    description:
      "New reward opportunities and engagement programs will continue to be added.",
  },
];

export function RewardsFeatures() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-24 top-24 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute right-24 bottom-24 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            Rewards Ecosystem
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            Learn. Compete. Earn.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Every step of your learning journey can unlock achievements,
            recognition, and TCD Credits designed to keep you motivated.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;

            return (
              <motion.div
                key={reward.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/10"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-yellow-500/10 p-4 text-yellow-400 transition group-hover:bg-yellow-500 group-hover:text-slate-950">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {reward.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {reward.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-slate-900 to-blue-900/20 p-10 text-center"
        >
          <Wallet className="mx-auto mb-6 h-14 w-14 text-yellow-400" />

          <h3 className="text-3xl font-bold text-white">
            Rewarding Consistent Learning
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            TCD Rewards are designed to encourage continuous learning,
            participation, and healthy competition. Whether you're solving
            practice questions, participating in live exams, or achieving new
            milestones, your efforts are recognized throughout your journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
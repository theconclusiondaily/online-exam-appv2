"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Trophy,
  Wallet,
  BarChart3,
  Award,
  Clock3,
  Target,
  FileCheck,
  Medal,
  Smartphone,
  Brain,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Unlimited Practice Tests",
    description:
      "Prepare with topic-wise and full-length practice exams anytime.",
  },
  {
    icon: Trophy,
    title: "Live Competitive Exams",
    description:
      "Compete with students nationwide in real-time examinations.",
  },
  {
    icon: Medal,
    title: "Real-Time Leaderboards",
    description:
      "Track your national, institute, and exam rankings instantly.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Analyze strengths, weaknesses, accuracy, and speed after every exam.",
  },
  {
    icon: Brain,
    title: "Smart Learning",
    description:
      "Improve continuously through personalized insights and detailed reports.",
  },
  {
    icon: Award,
    title: "Achievements & Badges",
    description:
      "Unlock achievements and showcase your learning milestones.",
  },
  {
    icon: Wallet,
    title: "TCD Wallet",
    description:
      "Earn TCD Credits through competitions, referrals, and achievements.",
  },
  {
    icon: Clock3,
    title: "Study Streaks",
    description:
      "Maintain daily learning streaks and earn consistent rewards.",
  },
  {
    icon: FileCheck,
    title: "Instant Results",
    description:
      "Receive your score, rank, and detailed report immediately after exams.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Visualize your improvement across subjects and exams.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description:
      "Attempt exams seamlessly on desktop, tablet, or mobile devices.",
  },
  {
    icon: Target,
    title: "Goal-Based Preparation",
    description:
      "Stay focused with structured practice and measurable milestones.",
  },
];

export function StudentFeatures() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            Student Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            Everything a Student Needs to Succeed
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Learn smarter, compete fairly, monitor your progress, and earn
            rewards—all within one powerful platform.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                viewport={{ once: true }}
                className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/20"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-blue-600/10 p-4 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
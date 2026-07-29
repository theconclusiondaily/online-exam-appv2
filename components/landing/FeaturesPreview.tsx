"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Trophy,
  Shield,
  Wallet,
  BarChart3,
  Building2,
  Brain,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Smart Learning",
    description: "Unlimited practice exams and mock tests.",
  },
  {
    icon: Trophy,
    title: "Live Competitions",
    description: "Compete with students across India.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Track performance with insightful reports.",
  },
  {
    icon: Shield,
    title: "AI Security",
    description: "Advanced proctoring and anti-cheating.",
  },
  {
    icon: Wallet,
    title: "TCD Wallet",
    description: "Rewards, prizes and bonus credits.",
  },
  {
    icon: Brain,
    title: "Achievements",
    description: "Unlock badges and learning milestones.",
  },
  {
    icon: Building2,
    title: "Institute Platform",
    description: "Complete solution for schools & coaching.",
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description: "Real-time rankings after every exam.",
  },
];

export default function FeaturesPreview() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            Platform Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            Everything You Need To Learn,
            <span className="block text-blue-400">
              Compete & Grow
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Built for students, teachers and institutes with
            secure online exams, intelligent analytics and
            rewarding learning experiences.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                }}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-blue-600/10 p-4 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 text-slate-400 leading-7">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}

        </div>

        <div className="mt-16 flex justify-center">

          <Link
            href="/features"
            className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
          >
            Explore All Features

            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>

      </div>

    </section>
  );
}
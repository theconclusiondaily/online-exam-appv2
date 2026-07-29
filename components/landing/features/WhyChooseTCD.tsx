"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Globe,
  BarChart3,
  Users,
  Award,
  Sparkles,
  Rocket,
} from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with modern technologies to deliver a smooth and responsive experience across all devices.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description:
      "Advanced proctoring, secure authentication, and multiple integrity features help create trustworthy examinations.",
  },
  {
    icon: Globe,
    title: "Accessible Anywhere",
    description:
      "Students, teachers, and institutions can access TCD anytime from desktop, tablet, or mobile.",
  },
  {
    icon: BarChart3,
    title: "Actionable Analytics",
    description:
      "Powerful reports and insights help students improve and educators make informed decisions.",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    description:
      "Whether you're an individual learner, coaching institute, school, or college, TCD adapts to your needs.",
  },
  {
    icon: Award,
    title: "Reward-Driven Learning",
    description:
      "Achievements, leaderboards, wallet rewards, and competitions keep learning engaging and motivating.",
  },
];

export function WhyChooseTCD() {
  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            Why Choose TCD?
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            More Than Just an Exam Platform
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            The Conclusion Daily combines learning, competition, analytics,
            rewards, and security into one unified educational ecosystem.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                className="group rounded-3xl border border-slate-800 bg-slate-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/20"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-blue-600/10 p-4 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {reason.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 p-12 text-center"
        >
          <Sparkles className="mx-auto mb-6 h-14 w-14 text-yellow-400" />

          <h3 className="text-3xl font-bold text-white lg:text-4xl">
            The Future of Digital Learning Starts Here
          </h3>

          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            From secure online examinations and intelligent analytics to
            rewarding student engagement, TCD empowers learners and educators
            with everything needed to succeed in a modern digital education
            environment.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-8 py-4 font-semibold text-white">
              <Rocket className="h-5 w-5" />
              Built for the Next Generation of Education
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
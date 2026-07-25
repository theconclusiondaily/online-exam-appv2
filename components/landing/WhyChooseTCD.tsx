"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Trophy,
  Wallet,
  BarChart3,
  School,
  ShieldCheck,
} from "lucide-react";

import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

const items = [
  {
    icon: Brain,
    title: "AI-Powered Exams",
    description:
      "A modern computer-based testing experience with intelligent monitoring features.",
  },
  {
    icon: Trophy,
    title: "Competitive Learning",
    description:
      "Rankings, XP, and achievements encourage consistent improvement.",
  },
  {
    icon: Wallet,
    title: "Integrated Wallet",
    description:
      "Track rewards, transactions, and account activity in one place.",
  },
  {
    icon: BarChart3,
    title: "Actionable Analytics",
    description:
      "Performance insights help students and educators identify strengths and areas for improvement.",
  },
  {
    icon: School,
    title: "Institute Ready",
    description:
      "Designed for schools, coaching institutes, and independent educators.",
  },
  {
    icon: ShieldCheck,
    title: "Built for Trust",
    description:
      "Security-focused design supports reliable online examinations.",
  },
];

export default function WhyChooseTCD() {
  return (
    <Section>
      <SectionHeading
        badge="Why TCD"
        title="Built for Better Learning Experiences"
        subtitle="A unified platform for students, educators, and institutes with a focus on performance, transparency, and growth."
      />

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -6,
              }}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-6 inline-flex rounded-2xl bg-brand/10 p-4 text-brand">
                <Icon className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-bold text-brand">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-brand-muted">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
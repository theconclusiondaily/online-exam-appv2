"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Camera,
  Monitor,
  Save,
  Eye,
  Lock,
} from "lucide-react";

import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "AI Proctoring",
    description:
      "Monitor examinations with intelligent proctoring features.",
  },
  {
    icon: Camera,
    title: "Camera Verification",
    description:
      "Support camera-based identity verification during exams.",
  },
  {
    icon: Monitor,
    title: "Fullscreen Mode",
    description:
      "Designed to encourage distraction-free testing.",
  },
  {
    icon: Eye,
    title: "Activity Monitoring",
    description:
      "Track important exam events for review and analysis.",
  },
  {
    icon: Save,
    title: "Auto Save",
    description:
      "Responses are saved continuously throughout the exam.",
  },
  {
    icon: Lock,
    title: "Secure Platform",
    description:
      "Built with modern authentication and data protection practices.",
  },
];

export default function AISecurity() {
  return (
    <Section className="relative overflow-hidden bg-slate-950 text-white">

      {/* Background Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1d4ed855,transparent_65%)]" />

      <div className="relative">

        <SectionHeading
          align="center"
          badge="Trust & Security"
          title="Enterprise-Grade Exam Security"
          subtitle="Designed to support reliable online examinations with intelligent monitoring, secure authentication, and resilient exam delivery."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-brand/20 p-3 text-brand-gold">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>

    </Section>
  );
}
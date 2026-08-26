"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Camera,
  Monitor,
  Clock3,
  LayoutGrid,
  Save,
} from "lucide-react";

import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import ProductShowcase from "./showcase/ProductShowcase";

const features = [
  {
    icon: ShieldCheck,
    title: "AI Proctoring",
    description:
      "Built-in monitoring helps maintain exam integrity.",
  },
  {
    icon: Camera,
    title: "Camera Monitoring",
    description:
      "Supports live camera verification during examinations.",
  },
  {
    icon: Monitor,
    title: "Fullscreen Protection",
    description:
      "Designed for distraction-free computer-based testing.",
  },
  {
    icon: Clock3,
    title: "Smart Timer",
    description:
      "Accurate countdown with automatic submission.",
  },
  {
    icon: LayoutGrid,
    title: "Question Palette",
    description:
      "Quick navigation across questions during the exam.",
  },
  {
    icon: Save,
    title: "Auto Save",
    description:
      "Responses are continuously saved during the test.",
  },
];

export default function ExamExperience() {
  return (
    <Section>

    <div className="grid items-center gap-12 lg:grid-cols-2">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ProductShowcase mode="exam" />
        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="Exam Experience"
            title="Built for Secure Computer-Based Testing"
            subtitle="A professional exam environment with intelligent monitoring, smooth navigation, and reliable performance."
          />

          <div className="mt-8 grid gap-3">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
               <div
  key={feature.title}
  className="
    flex
    gap-3
    rounded-2xl
    border
    border-gray-200/80
    bg-white
    p-4
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:shadow-md
  "
>
  <div
    className="
      flex
      h-10
      w-10
      shrink-0
      items-center
      justify-center
      rounded-xl
      bg-brand/10
      text-brand
    "
  >
    <Icon className="h-5 w-5" />
  </div>

  <div className="min-w-0">
    <h3 className="font-semibold text-brand">
      {feature.title}
    </h3>

    <p className="mt-1 text-xs leading-5 text-brand-muted">
      {feature.description}
    </p>
  </div>
</div>
              );
            })}

          </div>

        </motion.div>

      </div>

    </Section>
  );
}
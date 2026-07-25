"use client";

import { motion } from "framer-motion";
import {
  Building2,
  FileSpreadsheet,
  MonitorSmartphone,
  BarChart3,
  Users,
  Cloud,
} from "lucide-react";

import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import ProductShowcase from "./showcase/ProductShowcase";

const features = [
  {
    icon: FileSpreadsheet,
    title: "Powerful Exam Builder",
    description:
      "Create objective exams with configurable settings, scheduling, and scoring.",
  },
  {
    icon: MonitorSmartphone,
    title: "Live Monitoring",
    description:
      "Track ongoing exams, attendance, and student progress in real time.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Understand individual, batch, and institute-level performance through detailed reports.",
  },
  {
    icon: Users,
    title: "Student Management",
    description:
      "Manage students, teachers, institutes, and permissions from one platform.",
  },
  {
    icon: Cloud,
    title: "Cloud Platform",
    description:
      "Access exams securely from anywhere without managing local infrastructure.",
  },
];
export default function InstituteExperience() {
  return (
    <Section>

      <div className="grid items-center gap-20 lg:grid-cols-2">

        {/* Content */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <SectionHeading
            badge="For Institutes"
            title="Everything an Institute Needs"
            subtitle="A complete platform for schools and coaching institutes to create exams, monitor students, and analyze performance."
          />

          <div className="mt-10 space-y-5">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
                    flex
                    gap-4
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                    transition-all
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>

                    <h3 className="font-bold text-brand">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-brand-muted">
                      {feature.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </motion.div>

        {/* Dashboard */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <ProductShowcase mode="analytics" />

        </motion.div>

      </div>

    </Section>
  );
}
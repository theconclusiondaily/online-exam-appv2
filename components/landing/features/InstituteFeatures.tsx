"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  GraduationCap,
  CalendarClock,
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  School,
  ClipboardList,
  Trophy,
  Database,
  FileSpreadsheet,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Institute Management",
    description:
      "Manage your entire institute from a centralized dashboard.",
  },
  {
    icon: Users,
    title: "Teacher Management",
    description:
      "Invite and manage multiple teachers with role-based access.",
  },
  {
    icon: GraduationCap,
    title: "Student Enrollment",
    description:
      "Enroll students and organize them into batches effortlessly.",
  },
  {
    icon: CalendarClock,
    title: "Exam Scheduling",
    description:
      "Schedule institute exams with complete control over timing.",
  },
  {
    icon: ClipboardList,
    title: "Exam Management",
    description:
      "Create, publish, monitor, and evaluate exams from one place.",
  },
  {
    icon: LayoutDashboard,
    title: "Administrative Dashboard",
    description:
      "View institute performance, student activity, and key statistics.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Gain valuable insights into student performance and exam outcomes.",
  },
  {
    icon: Database,
    title: "Centralized Question Bank",
    description:
      "Maintain a secure repository of reusable questions.",
  },
  {
    icon: Trophy,
    title: "Institute Leaderboards",
    description:
      "Encourage healthy competition with institute-wide rankings.",
  },
  {
    icon: FileSpreadsheet,
    title: "Reports & Exports",
    description:
      "Generate detailed reports for teachers, students, and administrators.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Examination",
    description:
      "Protect exams with advanced proctoring and anti-cheating features.",
  },
  {
    icon: School,
    title: "Scalable Platform",
    description:
      "Designed for coaching institutes, schools, colleges, and universities.",
  },
];

export function InstituteFeatures() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            Institute Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            Built for Educational Institutions
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Whether you're a coaching institute, school, college, or
            university, TCD provides everything needed to conduct secure,
            scalable, and data-driven online examinations.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/10"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-yellow-500/10 p-4 text-yellow-400 transition group-hover:bg-yellow-500 group-hover:text-slate-950">
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
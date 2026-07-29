"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  FileText,
  BookOpen,
  Users,
  CalendarDays,
  BarChart3,
  Monitor,
  Shield,
  Brain,
  CheckCircle,
  PieChart,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    icon: ClipboardCheck,
    title: "Create Exams",
    description:
      "Build objective exams with flexible settings, timing, and scoring.",
  },
  {
    icon: FileText,
    title: "Question Bank",
    description:
      "Maintain an organized repository of reusable questions.",
  },
  {
    icon: BookOpen,
    title: "Subject-wise Management",
    description:
      "Organize exams and questions by subject and chapter.",
  },
  {
    icon: CalendarDays,
    title: "Exam Scheduling",
    description:
      "Schedule exams with start time, end time, and duration.",
  },
  {
    icon: Monitor,
    title: "Live Monitoring",
    description:
      "Monitor students during live examinations in real time.",
  },
  {
    icon: Shield,
    title: "Anti-Cheating Tools",
    description:
      "Track fullscreen exits, tab switches, and other violations.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Analyze exam performance with comprehensive reports.",
  },
  {
    icon: PieChart,
    title: "Performance Reports",
    description:
      "Compare student performance across exams and subjects.",
  },
  {
    icon: Brain,
    title: "Question Insights",
    description:
      "Identify difficult questions and improve assessment quality.",
  },
  {
    icon: Users,
    title: "Student Management",
    description:
      "Manage students, batches, and institute-level participation.",
  },
  {
    icon: CheckCircle,
    title: "Instant Evaluation",
    description:
      "Automatically calculate scores, rankings, and results.",
  },
  {
    icon: LayoutDashboard,
    title: "Teacher Dashboard",
    description:
      "Access all exams, reports, and analytics from one place.",
  },
];

export function TeacherFeatures() {
  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            Teacher Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white">
            Powerful Tools for Every Educator
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Create exams, monitor students, analyze performance, and
            manage your entire assessment workflow with ease.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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
                className="group rounded-3xl border border-slate-800 bg-slate-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
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
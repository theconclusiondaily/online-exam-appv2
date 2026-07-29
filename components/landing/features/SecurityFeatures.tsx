"use client";

import { motion } from "framer-motion";
import {
  Shield,
  ScanFace,
  Eye,
  MonitorSmartphone,
  Keyboard,
  CopyX,
  Lock,
  BellRing,
  Activity,
  Camera,
  FileWarning,
  CheckCircle2,
} from "lucide-react";

const securityFeatures = [
  {
    icon: ScanFace,
    title: "Face Detection",
    description:
      "Detect multiple faces and ensure the right student is taking the exam.",
  },
  {
    icon: Camera,
    title: "Live Camera Monitoring",
    description:
      "Continuous webcam monitoring throughout the examination.",
  },
  {
    icon: Eye,
    title: "Real-Time Proctoring",
    description:
      "Teachers can monitor student activity during live examinations.",
  },
  {
    icon: MonitorSmartphone,
    title: "Fullscreen Monitoring",
    description:
      "Detect and record fullscreen exits during examinations.",
  },
  {
    icon: Keyboard,
    title: "Keyboard Monitoring",
    description:
      "Monitor restricted keyboard usage to reduce unfair practices.",
  },
  {
    icon: CopyX,
    title: "Copy & Paste Protection",
    description:
      "Prevent copying and pasting while attempting secure exams.",
  },
  {
    icon: BellRing,
    title: "Instant Violation Alerts",
    description:
      "Warn students immediately whenever suspicious activity is detected.",
  },
  {
    icon: Activity,
    title: "Violation Tracking",
    description:
      "Maintain detailed logs of exam violations for administrators.",
  },
  {
    icon: FileWarning,
    title: "Automatic Submission",
    description:
      "Automatically submit exams after repeated rule violations.",
  },
  {
    icon: Lock,
    title: "Secure Exam Environment",
    description:
      "Designed to reduce opportunities for unfair practices during exams.",
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description:
      "Multiple security layers help maintain fairness and exam integrity.",
  },
  {
    icon: CheckCircle2,
    title: "Transparent Evaluation",
    description:
      "All monitoring events are recorded to support fair assessments.",
  },
];

export function SecurityFeatures() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400">
            Security & Proctoring
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            Secure Online Examinations
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            TCD helps institutions conduct fair and secure online examinations
            using multiple monitoring and integrity features.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {securityFeatures.map((feature, index) => {
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
                className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-2xl hover:shadow-red-900/20"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-red-500/10 p-4 text-red-400 transition group-hover:bg-red-500 group-hover:text-white">
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-900/30 to-slate-900 p-10 text-center"
        >
          <Shield className="mx-auto mb-6 h-14 w-14 text-blue-400" />

          <h3 className="text-3xl font-bold text-white">
            Fair Exams. Trusted Results.
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Every examination on The Conclusion Daily is designed with fairness,
            transparency, and academic integrity in mind. Our monitoring tools
            help institutions create a reliable assessment experience while
            maintaining trust for students and educators.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
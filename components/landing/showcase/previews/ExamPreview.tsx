"use client";

import { motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  Clock3,
  Expand,
  Flag,
  ShieldCheck,
} from "lucide-react";

const options = [
  "The acceleration remains constant.",
  "The velocity continuously increases.",
  "The acceleration becomes zero.",
  "The velocity decreases uniformly.",
];

export default function ExamPreview() {
  return (
    <div className="space-y-6">

      {/* Top Bar */}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

        <div>

          <p className="text-sm text-gray-500">
            Live Examination
          </p>

          <h2 className="mt-1 text-2xl font-black text-brand">
            NEET Physics Grand Test
          </h2>

        </div>

        <div className="flex flex-wrap items-center gap-3">

          <StatusBadge
            icon={<Clock3 size={16} />}
            label="24:18 Remaining"
            color="bg-red-50 text-red-600"
          />

          <StatusBadge
            icon={<Camera size={16} />}
            label="Camera Active"
            color="bg-green-50 text-green-600"
          />

          <StatusBadge
            icon={<Expand size={16} />}
            label="Fullscreen"
            color="bg-blue-50 text-blue-600"
          />

        </div>

      </div>

      {/* Main Layout */}

      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">

        {/* Question */}

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <div className="flex items-center justify-between">

            <span className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
              Question 14 of 45
            </span>

            <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-brand hover:bg-gray-50">
              <Flag size={16} />
              Mark for Review
            </button>

          </div>

          <h3 className="mt-8 text-2xl font-bold leading-9 text-brand">

            A particle moves along a straight line with constant
            acceleration. Which statement is always true?

          </h3>

          <div className="mt-10 space-y-4">

            {options.map((option, index) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition ${
                  index === 1
                    ? "border-brand bg-brand/5"
                    : "border-gray-200 bg-white hover:border-brand/40"
                }`}
              >
                <div
                  className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full font-bold ${
                    index === 1
                      ? "bg-brand text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>

                <span className="font-medium text-gray-700">
                  {option}
                </span>
              </motion.button>
            ))}

          </div>

          {/* Bottom Buttons */}

          <div className="mt-10 flex flex-wrap justify-between gap-4">

            <button className="rounded-2xl border border-gray-200 px-6 py-3 font-semibold text-brand hover:bg-gray-50">
              Previous
            </button>

            <div className="flex gap-3">

              <button className="rounded-2xl border border-brand px-6 py-3 font-semibold text-brand hover:bg-brand/5">
                Save & Next
              </button>

              <button className="rounded-2xl bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-light">
                Submit Exam
              </button>

            </div>

          </div>

        </div>

        {/* Sidebar */}

        <div className="space-y-5">

          {/* Security */}

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <ShieldCheck className="h-8 w-8 text-green-600" />

              <div>

                <p className="text-sm text-gray-500">
                  AI Proctoring
                </p>

                <h4 className="font-bold text-green-600">
                  Secure
                </h4>

              </div>

            </div>

            <div className="mt-5 space-y-3">

              <SecurityItem text="Face Detected" />

              <SecurityItem text="Camera Active" />

              <SecurityItem text="Fullscreen Enabled" />

              <SecurityItem text="No Violations" />

            </div>

          </div>

          {/* Question Palette */}

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

            <h4 className="font-bold text-brand">
              Question Palette
            </h4>

            <div className="mt-5 grid grid-cols-5 gap-3">

              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
                    i === 13
                      ? "bg-brand text-white"
                      : i < 10
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {i + 1}
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */

function StatusBadge({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${color}`}
    >
      {icon}
      {label}
    </div>
  );
}

function SecurityItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2
        size={18}
        className="text-green-600"
      />

      <span className="text-sm font-medium text-gray-700">
        {text}
      </span>

    </div>
  );
}
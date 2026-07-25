"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  BookOpen,
  CalendarDays,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";

const performanceData = [
  { subject: "Physics", value: 92 },
  { subject: "Chemistry", value: 78 },
  { subject: "Mathematics", value: 86 },
  { subject: "Biology", value: 95 },
];

export default function AnalyticsPreview() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            Institute Dashboard
          </p>

          <h2 className="mt-2 text-3xl font-black text-brand">
            Performance Analytics
          </h2>

        </div>

        <div className="rounded-3xl bg-brand p-4 text-white">
          <BarChart3 className="h-8 w-8" />
        </div>

      </div>

      {/* KPI Cards */}

      <div className="grid gap-5 md:grid-cols-4">

        <MetricCard
          icon={<Users className="h-6 w-6" />}
          title="Students"
          value="8,420"
        />

        <MetricCard
          icon={<BookOpen className="h-6 w-6" />}
          title="Exams"
          value="186"
        />

        <MetricCard
          icon={<GraduationCap className="h-6 w-6" />}
          title="Average Score"
          value="82%"
        />

        <MetricCard
          icon={<TrendingUp className="h-6 w-6" />}
          title="Growth"
          value="+18%"
        />

      </div>

      {/* Charts */}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">

        {/* Performance */}

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
        >

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-bold text-brand">
              Subject Performance
            </h3>

            <Activity className="text-brand" />

          </div>

          <div className="mt-8 space-y-6">

            {performanceData.map((item) => (

              <div key={item.subject}>

                <div className="mb-2 flex items-center justify-between">

                  <span className="font-medium text-gray-700">
                    {item.subject}
                  </span>

                  <span className="font-bold text-brand">
                    {item.value}%
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-200">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${item.value}%`,
                    }}
                    transition={{
                      duration: 1.2,
                    }}
                    className="h-full rounded-full bg-brand"
                  />

                </div>

              </div>

            ))}

          </div>

        </motion.div>

        {/* Activity */}

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
        >

          <h3 className="text-xl font-bold text-brand">
            Live Overview
          </h3>

          <div className="mt-8 space-y-5">

            <OverviewRow
              label="Live Exams"
              value="12"
            />

            <OverviewRow
              label="Students Online"
              value="2,481"
            />

            <OverviewRow
              label="Teachers Active"
              value="38"
            />

            <OverviewRow
              label="Certificates Issued"
              value="18,240"
            />

            <OverviewRow
              label="Question Bank"
              value="52,000+"
            />

          </div>

        </motion.div>

      </div>

      {/* Recent Activity */}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Recent Updates
            </p>

            <h3 className="mt-1 text-2xl font-black text-brand">
              Institute Activity
            </h3>

          </div>

          <CalendarDays className="text-brand" />

        </div>

        <div className="mt-6 space-y-4">

          <ActivityItem
            title="National Scholarship Test Published"
            time="5 minutes ago"
          />

          <ActivityItem
            title="420 Students Completed Physics Exam"
            time="18 minutes ago"
          />

          <ActivityItem
            title="Results Generated Successfully"
            time="32 minutes ago"
          />

          <ActivityItem
            title="Certificates Released"
            time="1 hour ago"
          />

        </div>

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */

function MetricCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-black text-brand">
            {value}
          </h3>

        </div>

        <div className="rounded-2xl bg-brand/10 p-3 text-brand">
          {icon}
        </div>

      </div>

    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function OverviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">

      <span className="font-medium text-gray-600">
        {label}
      </span>

      <span className="font-bold text-brand">
        {value}
      </span>

    </div>
  );
}

/* -------------------------------------------------------------------------- */

function ActivityItem({
  title,
  time,
}: {
  title: string;
  time: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
    >

      <div>

        <h4 className="font-semibold text-brand">
          {title}
        </h4>

        <p className="mt-1 text-sm text-gray-500">
          {time}
        </p>

      </div>

      <span className="h-3 w-3 rounded-full bg-green-500" />

    </motion.div>
  );
}
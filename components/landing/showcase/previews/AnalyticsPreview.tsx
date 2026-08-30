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
  { subject: "Physics", value: 82 },
  { subject: "Chemistry", value: 78 },
  { subject: "Mathematics", value: 88 },
  { subject: "Biology", value: 95 },
];

const activityItems = [
  {
    title: "National Scholarship Test Published",
    time: "5 minutes ago",
  },
  {
    title: "420 students completed Physics Exam",
    time: "18 minutes ago",
  },
  {
    title: "Results Generated Successfully",
    time: "32 minutes ago",
  },
  {
    title: "Certificates Released",
    time: "1 hour ago",
  },
];

export default function AnalyticsPreview() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#071126] via-[#0a1833] to-[#0b1d3d] p-5 text-white sm:p-6">
      {/* Premium TCD background atmosphere */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      <div className="relative z-10">

      {/* Dashboard Header */}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-medium text-white/45">
            Institute Dashboard
          </p>

          <h2 className="mt-1 text-[20px] font-extrabold tracking-[-0.035em] text-brand-gold">
            Performance Analytics
          </h2>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gold text-[#071126] shadow-[0_8px_24px_rgba(218,174,45,0.22)]">
          <BarChart3 className="h-4 w-4" />
        </div>
      </div>

      {/* KPI Cards */}

      <div className="mt-4 grid grid-cols-4 gap-2">
        <MetricCard
          icon={<Users className="h-3.5 w-3.5" />}
          title="Students"
          value="8,420"
        />

        <MetricCard
          icon={<BookOpen className="h-3.5 w-3.5" />}
          title="Exams"
          value="186"
        />

        <MetricCard
          icon={<GraduationCap className="h-3.5 w-3.5" />}
          title="Average Score"
          value="82%"
        />

        <MetricCard
          icon={<TrendingUp className="h-3.5 w-3.5" />}
          title="Growth"
          value="+18%"
        />
      </div>

      {/* Main Analytics */}

      <div className="mt-3 grid grid-cols-[1.45fr_1fr] gap-3">
        {/* Subject Performance */}

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="rounded-[15px] border border-white/10 bg-white/[0.045] p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[8px] font-medium text-white/45">
                Academic Overview
              </p>

              <h3 className="mt-0.5 text-[11px] font-bold text-white">
                Subject Performance
              </h3>
            </div>

            <Activity className="h-3.5 w-3.5 text-brand-gold" />
          </div>

          <div className="mt-4 space-y-3.5">
            {performanceData.map((item) => (
              <div key={item.subject}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[8px] font-medium text-white/55">
                    {item.subject}
                  </span>

                  <span className="text-[8px] font-bold text-brand-gold">
                    {item.value}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-gold/70 to-brand-gold"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live Overview */}

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="rounded-[15px] border border-white/10 bg-white/[0.045] p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[8px] font-medium text-white/45">
                Real-time
              </p>

              <h3 className="mt-0.5 text-[11px] font-bold text-white">
                Live Overview
              </h3>
            </div>

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>

          <div className="mt-3 space-y-1.5">
            <OverviewRow label="Live Exams" value="12" />
            <OverviewRow label="Students Online" value="2,481" />
            <OverviewRow label="Teachers Active" value="38" />
            <OverviewRow label="Certificates" value="18,240" />
            <OverviewRow label="Question Bank" value="52,000+" />
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="mt-3 rounded-[15px] border border-white/10 bg-white/[0.045] p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] font-medium text-white/45">
              Recent Updates
            </p>

            <h3 className="mt-0.5 text-[11px] font-bold text-white">
              Institute Activity
            </h3>
          </div>

          <CalendarDays className="h-3.5 w-3.5 text-brand-gold" />
        </div>

        <div className="mt-3 space-y-1.5">
          {activityItems.map((item) => (
            <ActivityItem
              key={item.title}
              title={item.title}
              time={item.time}
            />
          ))}
        </div>
      </motion.div>
      </div>
    </div>
  );
}

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
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="rounded-[12px] border border-white/10 bg-white/[0.045] px-2.5 py-2.5 shadow-[0_8px_22px_rgba(0,0,0,0.14)]"
    >
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0">
          <p className="truncate text-[7px] font-medium text-white/45">
            {title}
          </p>

          <p className="mt-1 text-[14px] font-extrabold leading-none tracking-[-0.03em] text-white">
            {value}
          </p>
        </div>

        <div className="shrink-0 rounded-lg bg-brand-gold/10 p-1.5 text-brand-gold">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

function OverviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/[0.045] px-2.5 py-2">
      <span className="truncate text-[7.5px] font-medium text-white/55">
        {label}
      </span>

      <span className="ml-2 text-[8px] font-bold text-brand-gold">
        {value}
      </span>
    </div>
  );
}

function ActivityItem({
  title,
  time,
}: {
  title: string;
  time: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ duration: 0.15 }}
      className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.045] px-2.5 py-2"
    >
      <div className="min-w-0">
        <h4 className="truncate text-[7.5px] font-semibold text-white">
          {title}
        </h4>

        <p className="mt-0.5 text-[6.5px] text-white/45">{time}</p>
      </div>

      <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
    </motion.div>
  );
}

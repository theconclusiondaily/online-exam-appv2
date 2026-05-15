"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  FileText,
  Trophy,
  BarChart3,
  ClipboardList,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#0f172a] text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-12">
        Exam SaaS
      </h1>

      <nav className="space-y-3">

        <Link
          href="/teacher"
          className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition"
        >
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link
          href="/teacher/create-exam"
          className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition"
        >
          <ClipboardList size={22} />
          Create Exam
        </Link>

        <Link
          href="/teacher/questions"
          className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition"
        >
          <FileText size={22} />
          Questions
        </Link>

        <Link
          href="/teacher/leaderboards"
          className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition"
        >
          <Trophy size={22} />
          Leaderboards
        </Link>

        <Link
          href="/teacher/analytics"
          className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition"
        >
          <BarChart3 size={22} />
          Analytics
        </Link>

      </nav>
    </aside>
  );
}
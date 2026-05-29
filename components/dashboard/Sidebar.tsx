"use client";

import { useState } from "react";

import Link from "next/link";

import {
  LayoutDashboard,
  FileText,
  Trophy,
  BarChart3,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {

  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <>
      {/* MOBILE MENU BUTTON */}

      <button
        onClick={() =>
          setIsOpen(true)
        }
        className="
          md:hidden

          fixed
          top-4
          left-4

          z-[60]

          bg-[#0f172a]
          text-white

          p-3

          rounded-xl

          shadow-lg
        "
      >
        <Menu size={22} />
      </button>

      {/* OVERLAY */}

      {isOpen && (
        <div
          onClick={() =>
            setIsOpen(false)
          }
          className="
            fixed
            inset-0

            bg-black/50

            z-40

            md:hidden
          "
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          top-0
          left-0

          w-72
          h-screen

          bg-[#0f172a]
          text-white

          p-6

          z-50

          transition-transform
          duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        {/* MOBILE CLOSE */}

        <button
          onClick={() =>
            setIsOpen(false)
          }
          className="
            md:hidden

            absolute
            top-4
            right-4

            text-white
          "
        >
          <X size={24} />
        </button>

        {/* LOGO */}

        <h1
          className="
            text-2xl
            font-bold

            mb-8

            text-center
          "
        >
          Exam SaaS
        </h1>

        {/* NAVIGATION */}

        <nav className="space-y-3">

          <Link
            href="/teacher"
            onClick={() =>
              setIsOpen(false)
            }
            className="
              flex
              items-center
              gap-3

              p-4

              rounded-2xl

              hover:bg-white/10

              transition
            "
          >
            <LayoutDashboard size={22} />
            Dashboard
          </Link>

          <Link
            href="/teacher/create-exam"
            onClick={() =>
              setIsOpen(false)
            }
            className="
              flex
              items-center
              gap-3

              p-4

              rounded-2xl

              hover:bg-white/10

              transition
            "
          >
            <ClipboardList size={22} />
            Create Exam
          </Link>

          <Link
            href="/teacher/questions"
            onClick={() =>
              setIsOpen(false)
            }
            className="
              flex
              items-center
              gap-3

              p-4

              rounded-2xl

              hover:bg-white/10

              transition
            "
          >
            <FileText size={22} />
            Questions
          </Link>

          <Link
            href="/teacher/leaderboards"
            onClick={() =>
              setIsOpen(false)
            }
            className="
              flex
              items-center
              gap-3

              p-4

              rounded-2xl

              hover:bg-white/10

              transition
            "
          >
            <Trophy size={22} />
            Leaderboards
          </Link>

          <Link
            href="/teacher/analytics"
            onClick={() =>
              setIsOpen(false)
            }
            className="
              flex
              items-center
              gap-3

              p-4

              rounded-2xl

              hover:bg-white/10

              transition
            "
          >
            <BarChart3 size={22} />
            Analytics
          </Link>

        </nav>

      </aside>
    </>
  );
}
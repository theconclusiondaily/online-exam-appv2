"use client";

import { Menu, Search, Bell } from "lucide-react";

interface TopbarProps {
  onToggleSidebar: () => void;
}

export default function Topbar({
  onToggleSidebar,
}: TopbarProps) {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">

      {/* Left Section */}

      <div className="flex items-center gap-5">

        <button
          onClick={onToggleSidebar}
          className="w-11 h-11 rounded-xl hover:bg-slate-100 transition flex items-center justify-center"
        >
          <Menu size={22} />
        </button>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search questions, exams, students..."
            className="w-96 rounded-2xl border border-slate-300 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F3D91]"
          />

        </div>

      </div>

      {/* Right Section */}

      <div className="flex items-center gap-5">

        <button className="relative w-11 h-11 rounded-xl hover:bg-slate-100 transition flex items-center justify-center">

          <Bell size={21} />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3">

          <div className="text-right">

            <p className="font-semibold text-slate-800">
              Rahul Kumawat
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

          {/* Replace with your profile image */}

          <img
            src="/images/avatar.png"
            alt="Profile"
            className="w-11 h-11 rounded-full object-cover border"
          />

        </div>

      </div>

    </header>
  );
}
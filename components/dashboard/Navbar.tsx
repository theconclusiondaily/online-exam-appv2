"use client";

import { Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-bold">
          Teacher Panel
        </h1>

        <p className="text-tcd-primary text-sm">
          Welcome back
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative">
          <Bell className="w-6 h-6 text-tcd-primary" />

          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"></span>
        </button>

        <div className="w-11 h-11 rounded-full bg-tcd-blue flex items-center justify-center text-white font-bold">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
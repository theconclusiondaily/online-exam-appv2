"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/sidebar/Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: Props) {

  const [collapsed, setCollapsed] =
    useState(false);

  return (

    <div className="flex min-h-screen bg-slate-100">

      <Sidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col">

        <Topbar
          onToggleSidebar={() =>
            setCollapsed(!collapsed)
          }
        />

        <main className="flex-1 p-6 overflow-auto">

          {children}

        </main>

      </div>

    </div>

  );
}
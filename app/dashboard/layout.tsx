"use client";


import { useState } from "react";
import { Menu, X } from "lucide-react";
import SessionGuard
from "@/components/auth/SessionGuard";
import StudentSidebar
from "@/components/layout/StudentSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const [sidebarOpen, setSidebarOpen] =
  useState(false);
  return (

    <div
      className="
        flex
        min-h-screen
        bg-gradient-to-br
        from-[#EEF3FF]
        via-white
        to-[#FFF8EA]
      "
    >

      <StudentSidebar />
{sidebarOpen && (

  <>

    <div
      className="
        fixed
        inset-0

        bg-black/40

        z-50
      "
      onClick={() =>
        setSidebarOpen(false)
      }
    />

    <div
      className="
        fixed

        top-0
        left-0

        w-72
        h-full

        z-50

        bg-white

        shadow-2xl
      "
    >

      <button
        className="
          absolute
          top-4
          right-4
        "
        onClick={() =>
          setSidebarOpen(false)
        }
      >
        <X size={22} />
      </button>

      <StudentSidebar />

    </div>

  </>

)}

<div
  className="
    lg:hidden

    fixed
    top-0
    left-0
    right-0

    h-16

    bg-white

    border-b

    z-50

    flex
    items-center

    px-4
  "
>

  <button
    onClick={() =>
      setSidebarOpen(true)
    }
  >
    <Menu size={24} />
  </button>

</div>
      <main
  
  className="
    flex-1
    min-w-0
    overflow-y-auto

    pt-16
    lg:pt-0
  "
>


        <SessionGuard>

  {children}

</SessionGuard>

      </main>

    </div>

  );
}
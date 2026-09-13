"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import useInactivityLogout from "@/hooks/useInactivityLogout";
import SessionTimeoutModal from "@/components/session/SessionTimeoutModal";
import SessionGuard from "@/components/auth/SessionGuard";
import StudentSidebar from "@/components/layout/StudentSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Stable callback (important)
  const shouldIgnore = useCallback((pathname: string) => {
    return (
      pathname.startsWith("/exam/") ||
      pathname.startsWith("/admin/") ||
      pathname.startsWith("/teacher/")
    );
  }, []);

  const {
    showWarning,
    resetTimer,
    logout,
  } = useInactivityLogout({
    shouldIgnore,
  });

    return (
   <div
  className="
    flex
    min-h-screen
    overflow-hidden
    bg-gradient-to-br
    from-[#EEF3FF]
    via-white
    to-[#FFF8EA]
  "
>
      {/* Desktop Sidebar */}
      <StudentSidebar />

      {/* Mobile Sidebar */}
{sidebarOpen && (
  <>
    {/* Mobile backdrop */}
    <div
      className="
        fixed
        inset-0
        bg-black/40
        z-40
        lg:hidden
      "
      onClick={() => setSidebarOpen(false)}
    />

    {/* Mobile drawer */}
    <aside
      className="
        fixed
        top-0
        left-0
        bottom-0
        w-72
        max-w-[85vw]
        bg-white
        z-50
        shadow-2xl
        flex
        flex-col
        overflow-hidden
        lg:hidden
      "
      style={{
        height: "100dvh",
      }}
    >
      {/* Drawer header */}
      <div
        className="
          flex-shrink-0
          h-16
          flex
          items-center
          justify-end
          px-4
          border-b
          border-gray-200
        "
      >
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="p-2"
        >
          <X size={22} />
        </button>
      </div>

      {/* Sidebar scroll area */}
      <div
        className="
          flex-1
          min-h-0
          overflow-y-scroll
          overflow-x-hidden
          overscroll-contain
        "
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
      >
        <div className="pb-8">
          <StudentSidebar mobile />
        </div>
      </div>
    </aside>
  </>
)}

      {/* Mobile Header */}
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
          border-gray-200
          z-40
          flex
          items-center
          px-4
        "
      >
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>

        <div className="absolute left-1/2 -translate-x-1/2">
          <img
            src="/logo.png"
            alt="The Conclusion Daily"
            className="h-11 w-11 object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <main
        className="
          flex-1
          min-w-0
          overflow-y-auto
          pt-16
          pb-24
          lg:pt-0
          lg:pb-0
        "
      >
        <SessionGuard>
          {children}
        </SessionGuard>

        <SessionTimeoutModal
          open={showWarning}
          countdownMinutes={5}
          onStayLoggedIn={resetTimer}
          onLogout={logout}
        />
      </main>
    </div>
  );
}
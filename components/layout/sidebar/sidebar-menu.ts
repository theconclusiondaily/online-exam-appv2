import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Users,
  Shield,
  Trophy,
  Wallet,
  BarChart3,
  Settings,
} from "lucide-react";

export const SIDEBAR_MENU = [
  {
    section: "MAIN",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    section: "ACADEMICS",
    items: [
      {
        title: "Question Bank",
        href: "/admin/questions",
        icon: BookOpen,
      },
      {
        title: "Exam Manager",
        href: "/admin/exams",
        icon: ClipboardList,
      },
      {
        title: "Institutes",
        href: "/admin/institutes",
        icon: GraduationCap,
      },
      {
        title: "Teachers",
        href: "/admin/teachers",
        icon: Users,
      },
      {
        title: "Students",
        href: "/admin/students",
        icon: Users,
      },
    ],
  },

  {
    section: "MONITORING",
    items: [
      {
        title: "Live Proctoring",
        href: "/admin/proctoring",
        icon: Shield,
      },
      {
        title: "Leaderboards",
        href: "/admin/leaderboards",
        icon: Trophy,
      },
      {
        title: "Wallet",
        href: "/admin/wallet",
        icon: Wallet,
      },
      {
        title: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
      },
    ],
  },

  {
    section: "SYSTEM",
    items: [
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];
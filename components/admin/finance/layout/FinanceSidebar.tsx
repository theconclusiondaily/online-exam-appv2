"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Clock3,
  History,
  BarChart3,
  FileText,
  ShieldCheck,
} from "lucide-react";

const financeNavigation = [
  {
    label: "Overview",
    href: "/admin/finance",
    icon: LayoutDashboard,
  },
  {
    label: "Wallets",
    href: "/admin/finance/wallets",
    icon: Wallet,
  },
  {
    label: "Transactions",
    href: "/admin/finance/transactions",
    icon: ArrowLeftRight,
  },
  {
    label: "Withdrawals",
    href: "/admin/finance/withdrawals",
    icon: Clock3,
  },
  {
    label: "Withdrawal History",
    href: "/admin/finance/withdrawals/history",
    icon: History,
  },
  {
    label: "Revenue",
    href: "/admin/finance/revenue",
    icon: BarChart3,
  },
  {
    label: "Razorpay",
    href: "/admin/finance/razorpay",
    icon: Wallet,
  },
  {
    label: "Reports",
    href: "/admin/finance/reports",
    icon: FileText,
  },
  {
    label: "Audit",
    href: "/admin/finance/audit",
    icon: ShieldCheck,
  },
];

export default function FinanceSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-40
        h-screen
        w-72
        border-r
        border-gray-100
        bg-white
        shadow-sm
      "
    >
      {/* BRAND */}

      <div
        className="
          flex
          h-20
          items-center
          border-b
          border-gray-100
          px-6
        "
      >
        <div>
          <p className="text-xl font-black text-tcd-blue">
            TCD
          </p>

          <p className="text-xs font-semibold text-tcd-primary">
            Finance Center
          </p>
        </div>
      </div>

      {/* NAVIGATION */}

      <nav className="p-4">
        <p
          className="
            mb-3
            px-3
            text-[11px]
            font-black
            uppercase
            tracking-wider
            text-gray-400
          "
        >
          Finance Management
        </p>

        <div className="space-y-1">
          {financeNavigation.map(
            (item) => {
              const Icon = item.icon;

              const isActive =
                item.href ===
                  "/admin/finance"
                  ? pathname ===
                    item.href
                  : pathname ===
                      item.href ||
                    pathname.startsWith(
                      `${item.href}/`
                    );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    font-bold
                    transition-all
                    ${
                      isActive
                        ? "bg-tcd-blue text-white shadow-sm"
                        : "text-tcd-primary hover:bg-gray-50 hover:text-tcd-blue"
                    }
                  `}
                >
                  <Icon
                    size={19}
                    strokeWidth={
                      isActive
                        ? 2.5
                        : 2
                    }
                  />

                  <span>
                    {item.label}
                  </span>
                </Link>
              );
            }
          )}
        </div>
      </nav>

      {/* FOOTER */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          border-t
          border-gray-100
          p-4
        "
      >
        <div
          className="
            rounded-2xl
            bg-[#FFF8EA]
            px-4
            py-3
          "
        >
          <p className="text-xs font-black text-tcd-blue">
            TCD Finance
          </p>

          <p className="mt-1 text-[11px] leading-4 text-tcd-primary">
            Wallet, transactions and payout management.
          </p>
        </div>
      </div>
    </aside>
  );
}
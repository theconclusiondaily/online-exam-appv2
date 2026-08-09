"use client";

import Link from "next/link";
import {
  Wallet,
  ArrowLeftRight,
  Landmark,
  TrendingUp,
  CreditCard,
  FileText,
} from "lucide-react";

const actions = [
  {
    title: "Manage Wallets",
    description: "View and manage user wallet balances.",
    href: "/admin/finance/wallets",
    icon: Wallet,
  },
  {
    title: "Transactions",
    description: "View the complete financial ledger.",
    href: "/admin/finance/transactions",
    icon: ArrowLeftRight,
  },
  {
    title: "Withdrawals",
    description: "Review and process withdrawal requests.",
    href: "/admin/finance/withdrawals",
    icon: Landmark,
  },
  {
    title: "Revenue",
    description: "Monitor collections, prizes and revenue.",
    href: "/admin/finance/revenue",
    icon: TrendingUp,
  },
  {
    title: "Razorpay",
    description: "Monitor payments and settlements.",
    href: "/admin/finance/razorpay",
    icon: CreditCard,
  },
  {
    title: "Reports",
    description: "Generate financial reports and exports.",
    href: "/admin/finance/reports",
    icon: FileText,
  },
];

export default function FinanceQuickActions() {
  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-2xl font-black text-tcd-blue">
          Finance Operations
        </h2>

        <p className="mt-1 text-sm text-tcd-primary">
          Quickly access the major areas of the TCD Finance Center.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="
                group
                bg-white
                rounded-3xl
                border
                border-gray-100
                p-6
                shadow-sm
                hover:shadow-md
                hover:-translate-y-0.5
                transition-all
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    h-12
                    w-12
                    shrink-0
                    rounded-2xl
                    bg-[#FFF8EA]
                    text-tcd-blue
                    flex
                    items-center
                    justify-center
                    group-hover:scale-105
                    transition-transform
                  "
                >
                  <Icon size={23} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-black text-tcd-blue">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-sm text-tcd-primary leading-6">
                    {action.description}
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-5
                  text-sm
                  font-bold
                  text-tcd-blue
                  opacity-70
                  group-hover:opacity-100
                  transition-opacity
                "
              >
                Open →
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
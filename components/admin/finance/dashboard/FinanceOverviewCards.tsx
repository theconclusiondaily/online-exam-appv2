"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";
import { formatRupees } from "@/lib/finance/formatter";

interface FinanceStats {
  total_wallet_balance: number;
  total_locked_balance: number;
  total_bonus_balance: number;
  pending_withdrawals: number;
  completed_withdrawals: number;
  total_transactions: number;
}

export default function FinanceOverviewCards() {
  const [stats, setStats] =
    useState<FinanceStats | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const { data, error } =
      await supabase.rpc(
        "get_finance_dashboard"
      );

    if (error) {
      console.error(error);
    } else {
      setStats(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-36 rounded-3xl bg-white animate-pulse"
          />
        ))}

      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-3xl bg-red-50 p-8 text-red-600">
        Unable to load finance dashboard.
      </div>
    );
  }

  const cards = [
    {
      title: "Wallet Balance",
      value: formatRupees(
        stats.total_wallet_balance
      ),
    },
    {
      title: "Locked Balance",
      value: formatRupees(
        stats.total_locked_balance
      ),
    },
    {
      title: "Bonus Balance",
      value: formatRupees(
        stats.total_bonus_balance
      ),
    },
    {
      title: "Pending Withdrawals",
      value:
        stats.pending_withdrawals.toLocaleString(
          "en-IN"
        ),
    },
    {
      title: "Completed Withdrawals",
      value:
        stats.completed_withdrawals.toLocaleString(
          "en-IN"
        ),
    },
    {
      title: "Transactions",
      value:
        stats.total_transactions.toLocaleString(
          "en-IN"
        ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className="
            bg-white
            rounded-3xl
            border
            border-gray-100
            shadow-sm
            p-6
          "
        >
          <p className="text-sm text-tcd-primary">
            {card.title}
          </p>

          <h2 className="mt-4 text-3xl font-black text-tcd-blue">
            {card.value}
          </h2>
        </div>
      ))}

    </div>
  );
}
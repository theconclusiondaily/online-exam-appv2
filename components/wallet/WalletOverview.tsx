"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

import { formatRupees } from "@/lib/finance/formatter";

interface FinanceDashboard {
  total_wallet_balance: number;
  total_locked_balance: number;
  total_bonus_balance: number;
  pending_withdrawals: number;
  completed_withdrawals: number;
  total_transactions: number;
}

export default function WalletOverview() {
  const [stats, setStats] =
    useState<FinanceDashboard | null>(null);

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
      return;
    }

    setStats(data);
  }

  if (!stats)
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        Loading...
      </div>
    );

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
        stats.pending_withdrawals.toString(),
    },
    {
      title: "Completed Withdrawals",
      value:
        stats.completed_withdrawals.toString(),
    },
    {
      title: "Transactions",
      value:
        stats.total_transactions.toString(),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm"
        >
          <p className="text-sm text-tcd-primary">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-black text-tcd-blue">
            {card.value}
          </h2>
        </div>
      ))}

    </div>
  );
}
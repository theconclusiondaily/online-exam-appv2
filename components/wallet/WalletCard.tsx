"use client";

import { useEffect, useState } from "react";

import TCDIcon from "@/components/brand/TCDIcon";

import { supabase } from "@/lib/supabase/client";
import { getWallet } from "@/services/wallet.service";
import { formatCredits, formatRupees } from "@/lib/finance/formatter";
import type { Wallet } from "@/services/finance.types";

export default function WalletCard() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWallet() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data, error } = await getWallet(user.id);

        if (error) {
          console.error(error);
          return;
        }

        setWallet(data);
      } catch (err) {
        console.error("Failed to load wallet", err);
      } finally {
        setLoading(false);
      }
    }

    loadWallet();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        Loading wallet...
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        Wallet not found.
      </div>
    );
  }

  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-7
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        border
        border-gray-100
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-[#FFF8EA]
            flex
            items-center
            justify-center
            border
            border-[#E6C06E]/30
          "
        >
          <TCDIcon
            src="/icons/tcd-coin.svg"
            alt="TCD Wallet"
            size={42}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-tcd-blue">
            TCD Wallet
          </h2>

          <p className="text-sm text-tcd-primary">
            Your Credits Wallet
          </p>
        </div>
      </div>

      {/* Main Balance */}

      <div className="mb-6">
        <div className="text-4xl font-black text-tcd-blue">
          {formatCredits(wallet.available_balance)}
        </div>

        <div className="text-sm text-gray-500 mt-2">
          {formatRupees(wallet.available_balance)}
        </div>
      </div>

      {/* Wallet Stats */}

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Bonus
          </p>

          <p className="mt-2 text-lg font-bold text-yellow-600">
            {formatCredits(wallet.bonus_balance)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Locked
          </p>

          <p className="mt-2 text-lg font-bold text-red-600">
            {formatCredits(wallet.locked_balance)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Lifetime Won
          </p>

          <p className="mt-2 text-lg font-bold text-green-600">
            {formatCredits(wallet.lifetime_won)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Lifetime Added
          </p>

          <p className="mt-2 text-lg font-bold text-blue-600">
            {formatCredits(wallet.lifetime_added)}
          </p>
        </div>

      </div>

      {/* Footer */}

      <div
        className="
          mt-6
          bg-gradient-to-r
          from-[#FFF8EA]
          to-[#EEF3FF]
          rounded-2xl
          p-4
          text-center
        "
      >
        <p className="font-semibold text-tcd-blue">
          The Conclusion Daily Digital Wallet
        </p>

        <p className="text-sm text-gray-600 mt-1">
          Secure • Fast • Transparent
        </p>
      </div>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-3 mt-6">

        <button
          className="
            rounded-xl
            bg-tcd-blue
            text-white
            py-3
            font-semibold
            hover:opacity-90
            transition
          "
        >
          Add Money
        </button>

        <button
          className="
            rounded-xl
            border
            border-tcd-blue
            text-tcd-blue
            py-3
            font-semibold
            hover:bg-gray-50
            transition
          "
        >
          Withdraw
        </button>

      </div>
    </div>
  );
}
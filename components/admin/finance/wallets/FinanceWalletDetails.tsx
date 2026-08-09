"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { ArrowLeft, RefreshCw } from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import { formatRupees } from "@/lib/finance/formatter";
import FinanceWalletActions from "@/components/admin/finance/wallets/FinanceWalletActions";
import FinanceTransactionHistory from "@/components/admin/finance/wallets/FinanceTransactionHistory";


interface Wallet {
  user_id: string;

  available_balance: number;
  locked_balance: number;
  bonus_balance: number;

  lifetime_added: number;
  lifetime_won: number;
  lifetime_spent: number;
  lifetime_withdrawn: number;
  lifetime_refunded: number;

  currency: string | null;
  status: string | null;
  created_at: string | null;
}

interface FinanceWalletDetailsProps {
  userId: string;
}

export default function FinanceWalletDetails({
  userId,
}: FinanceWalletDetailsProps) {
  const [wallet, setWallet] =
    useState<Wallet | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadWallet = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      const { data, error } =
        await supabase
          .from("tcd_wallets")
          .select(`
            user_id,
            available_balance,
            locked_balance,
            bonus_balance,
            lifetime_added,
            lifetime_won,
            lifetime_spent,
            lifetime_withdrawn,
            lifetime_refunded,
            currency,
            status,
            created_at
          `)
          .eq("user_id", userId)
          .maybeSingle();

      if (error) {
        console.error(
          "Finance wallet details error:",
          error
        );

        setError(
          "Unable to load wallet details."
        );

        setWallet(null);
      } else {
        setWallet(
          data as Wallet | null
        );
      }

      setLoading(false);
    },
    [userId]
  );

  useEffect(() => {
    loadWallet();
  }, [loadWallet]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 w-40 rounded-2xl bg-white animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map(
            (_, index) => (
              <div
                key={index}
                className="
                  h-32
                  rounded-3xl
                  bg-white
                  animate-pulse
                "
              />
            )
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-red-50 border border-red-100 p-8">
        <p className="font-bold text-red-700">
          {error}
        </p>

        <button
          type="button"
          onClick={loadWallet}
          className="
            mt-4
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-tcd-blue
            px-4
            py-2
            text-sm
            font-bold
            text-white
          "
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-8">
        <p className="text-lg font-black text-tcd-blue">
          Wallet Not Found
        </p>

        <p className="mt-2 text-sm text-tcd-primary">
          No wallet exists for this user.
        </p>

        <Link
          href="/admin/finance/wallets"
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-tcd-blue
            px-4
            py-2
            text-sm
            font-bold
            text-white
          "
        >
          <ArrowLeft size={16} />
          Back to Wallets
        </Link>
      </div>
    );
  }

  const totalWalletValue =
    Number(wallet.available_balance || 0) +
    Number(wallet.locked_balance || 0) +
    Number(wallet.bonus_balance || 0);

  return (
    <div className="space-y-6">
      {/* BACK + REFRESH */}

      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/finance/wallets"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-white
            border
            border-gray-200
            px-4
            py-2
            text-sm
            font-bold
            text-tcd-blue
            hover:bg-gray-50
            transition
          "
        >
          <ArrowLeft size={16} />
          All Wallets
        </Link>

        <button
          type="button"
          onClick={loadWallet}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-white
            border
            border-gray-200
            px-4
            py-2
            text-sm
            font-bold
            text-tcd-blue
            hover:bg-gray-50
            transition
          "
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* USER / WALLET IDENTITY */}

      <section
        className="
          bg-white
          rounded-3xl
          border
          border-gray-100
          shadow-sm
          p-6
        "
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-gray-400">
              User ID
            </p>

            <p className="mt-2 break-all font-bold text-tcd-blue">
              {wallet.user_id}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge
              status={wallet.status}
            />

            <span className="rounded-full bg-[#FFF8EA] px-3 py-1 text-xs font-bold text-tcd-blue">
              {wallet.currency || "INR"}
            </span>
          </div>
        </div>
      </section>

      {/* CURRENT BALANCE */}

      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-black text-tcd-blue">
            Current Balance
          </h2>

          <p className="mt-1 text-sm text-tcd-primary">
            Current funds held in this TCD wallet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <BalanceCard
            title="Available Balance"
            value={formatRupees(
              wallet.available_balance
            )}
            featured
          />

          <BalanceCard
            title="Locked Balance"
            value={formatRupees(
              wallet.locked_balance
            )}
          />

          <BalanceCard
            title="Bonus Balance"
            value={formatRupees(
              wallet.bonus_balance
            )}
          />
        </div>

        <div className="mt-5">
          <BalanceCard
            title="Total Wallet Value"
            value={formatRupees(
              totalWalletValue
            )}
          />
        </div>
      </section>

      {/* LIFETIME ACTIVITY */}

      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-black text-tcd-blue">
            Lifetime Financial Activity
          </h2>

          <p className="mt-1 text-sm text-tcd-primary">
            Historical financial totals associated with this wallet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <InfoCard
            title="Lifetime Added"
            value={formatRupees(
              wallet.lifetime_added
            )}
          />

          <InfoCard
            title="Lifetime Won"
            value={formatRupees(
              wallet.lifetime_won
            )}
          />

          <InfoCard
            title="Lifetime Spent"
            value={formatRupees(
              wallet.lifetime_spent
            )}
          />

          <InfoCard
            title="Lifetime Withdrawn"
            value={formatRupees(
              wallet.lifetime_withdrawn
            )}
          />

          <InfoCard
            title="Lifetime Refunded"
            value={formatRupees(
              wallet.lifetime_refunded
            )}
          />

          <InfoCard
            title="Wallet Created"
            value={
              wallet.created_at
                ? new Date(
                    wallet.created_at
                  ).toLocaleString("en-IN")
                : "-"
            }
          />
        </div>
      </section>

    <FinanceWalletActions
  userId={wallet.user_id}
  availableBalance={wallet.available_balance}
  onSuccess={loadWallet}
/>

<FinanceTransactionHistory
  userId={wallet.user_id}
/>
    </div>
  );
}

function BalanceCard({
  title,
  value,
  featured = false,
}: {
  title: string;
  value: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`
        rounded-3xl
        border
        p-6
        shadow-sm
        ${
          featured
            ? "bg-tcd-blue border-tcd-blue"
            : "bg-white border-gray-100"
        }
      `}
    >
      <p
        className={
          featured
            ? "text-sm text-white/70"
            : "text-sm text-tcd-primary"
        }
      >
        {title}
      </p>

      <p
        className={`
          mt-3
          text-3xl
          font-black
          ${
            featured
              ? "text-white"
              : "text-tcd-blue"
          }
        `}
      >
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
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
        {title}
      </p>

      <p className="mt-3 text-2xl font-black text-tcd-blue break-words">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string | null;
}) {
  const normalized =
    (status || "ACTIVE").toUpperCase();

  const active =
    normalized === "ACTIVE";

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-black
        ${
          active
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-700"
        }
      `}
    >
      {normalized}
    </span>
  );
}
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  Clock3,
  LockKeyhole,
  RefreshCw,
  Wallet,
  Gift,
  CheckCircle2,
} from "lucide-react";

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

const EMPTY_DATA: FinanceDashboard = {
  total_wallet_balance: 0,
  total_locked_balance: 0,
  total_bonus_balance: 0,
  pending_withdrawals: 0,
  completed_withdrawals: 0,
  total_transactions: 0,
};

export default function FinancePage() {
  const [data, setData] =
    useState<FinanceDashboard>(
      EMPTY_DATA
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadDashboard = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      try {
        const {
          data: dashboard,
          error: rpcError,
        } = await supabase.rpc(
          "get_finance_dashboard"
        );

        if (rpcError) {
          console.error(
            "FINANCE DASHBOARD ERROR:",
            rpcError
          );

          throw new Error(
            rpcError.message ||
              "Unable to load finance dashboard."
          );
        }

        setData({
          total_wallet_balance:
            Number(
              dashboard?.total_wallet_balance ??
                0
            ),

          total_locked_balance:
            Number(
              dashboard?.total_locked_balance ??
                0
            ),

          total_bonus_balance:
            Number(
              dashboard?.total_bonus_balance ??
                0
            ),

          pending_withdrawals:
            Number(
              dashboard?.pending_withdrawals ??
                0
            ),

          completed_withdrawals:
            Number(
              dashboard?.completed_withdrawals ??
                0
            ),

          total_transactions:
            Number(
              dashboard?.total_transactions ??
                0
            ),
        });
      } catch (err) {
        console.error(
          "FINANCE DASHBOARD LOAD ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load finance dashboard."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.18em]
              text-tcd-primary
            "
          >
            TCD Finance
          </p>

          <h1
            className="
              mt-2
              text-3xl
              font-black
              text-tcd-blue
            "
          >
            Finance Overview
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-tcd-primary
            "
          >
            Monitor wallet balances, transactions,
            withdrawals and the overall financial
            activity of TCD.
          </p>
        </div>

        <button
          type="button"
          onClick={loadDashboard}
          disabled={loading}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-5
            py-3
            text-sm
            font-bold
            text-tcd-blue
            shadow-sm
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <RefreshCw
            size={17}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>
      </div>

      {/* ERROR */}

      {error && (
        <div
          className="
            mb-6
            rounded-3xl
            border
            border-red-100
            bg-red-50
            p-5
          "
        >
          <p className="font-bold text-red-700">
            Finance dashboard could not be loaded.
          </p>

          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={loadDashboard}
            className="
              mt-4
              rounded-xl
              bg-tcd-blue
              px-4
              py-2
              text-sm
              font-bold
              text-white
            "
          >
            Try Again
          </button>
        </div>
      )}

      {/* PRIMARY FINANCE STATS */}

      <section
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <FinanceStatCard
          title="Total Available Wallet"
          value={formatRupees(
            data.total_wallet_balance
          )}
          subtitle="Spendable balance across wallets"
          icon={Wallet}
          loading={loading}
        />

        <FinanceStatCard
          title="Locked Balance"
          value={formatRupees(
            data.total_locked_balance
          )}
          subtitle="Funds currently locked"
          icon={LockKeyhole}
          loading={loading}
        />

        <FinanceStatCard
          title="Bonus Balance"
          value={formatRupees(
            data.total_bonus_balance
          )}
          subtitle="Promotional wallet balance"
          icon={Gift}
          loading={loading}
        />

        <FinanceStatCard
          title="Transactions"
          value={data.total_transactions.toLocaleString(
            "en-IN"
          )}
          subtitle="Total ledger transactions"
          icon={ArrowLeftRight}
          loading={loading}
        />
      </section>

      {/* WITHDRAWAL SUMMARY */}

      <section className="mt-6">
        <div className="mb-4">
          <h2 className="text-xl font-black text-tcd-blue">
            Withdrawal Operations
          </h2>

          <p className="mt-1 text-sm text-tcd-primary">
            Monitor pending and completed withdrawal activity.
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >
          <WithdrawalCard
            title="Pending Withdrawals"
            value={data.pending_withdrawals}
            description="Requests waiting for admin review"
            icon={Clock3}
            href="/admin/finance/withdrawals"
            action="Review Withdrawals"
            loading={loading}
          />

          <WithdrawalCard
            title="Completed Withdrawals"
            value={data.completed_withdrawals}
            description="Withdrawals successfully completed"
            icon={CheckCircle2}
            href="/admin/finance/withdrawals/history"
            action="View History"
            loading={loading}
          />
        </div>
      </section>

      {/* QUICK ACTIONS */}

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-black text-tcd-blue">
            Finance Management
          </h2>

          <p className="mt-1 text-sm text-tcd-primary">
            Open the individual finance management areas.
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <QuickAction
            href="/admin/finance/wallets"
            icon={Wallet}
            title="Wallets"
            description="View and manage user wallet balances."
          />

          <QuickAction
            href="/admin/finance/transactions"
            icon={ArrowLeftRight}
            title="Transactions"
            description="Inspect the complete financial ledger."
          />

          <QuickAction
            href="/admin/finance/withdrawals"
            icon={ArrowDownToLine}
            title="Withdrawals"
            description="Review pending withdrawal requests."
          />

          <QuickAction
            href="/admin/finance/withdrawals/history"
            icon={Clock3}
            title="Withdrawal History"
            description="View completed and historical withdrawals."
          />
        </div>
      </section>

      {/* FINANCIAL MODEL NOTICE */}

      <section className="mt-8">
        <div
          className="
            rounded-3xl
            border
            border-[#F3E4C2]
            bg-[#FFF8EA]
            p-6
          "
        >
          <div className="flex gap-4">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-white
                text-tcd-blue
                shadow-sm
              "
            >
              <Wallet size={20} />
            </div>

            <div>
              <h3 className="font-black text-tcd-blue">
                TCD Financial Ledger
              </h3>

              <p
                className="
                  mt-1
                  max-w-3xl
                  text-sm
                  leading-6
                  text-tcd-primary
                "
              >
                Financial values are maintained in paise
                by the wallet engine. The admin interface
                displays those values as Indian Rupees.
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  font-semibold
                  text-gray-500
                "
              >
                100 paise = ₹1 · 10 TCD Credits = ₹1
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =====================================================
   FINANCE STAT CARD
===================================================== */

function FinanceStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  loading,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  loading: boolean;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-gray-100
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex items-start justify-between">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-[#FFF8EA]
            text-tcd-blue
          "
        >
          <Icon size={20} />
        </div>
      </div>

      <p
        className="
          mt-5
          text-sm
          font-semibold
          text-tcd-primary
        "
      >
        {title}
      </p>

      {loading ? (
        <div className="mt-2 h-9 w-32 animate-pulse rounded-lg bg-gray-100" />
      ) : (
        <p
          className="
            mt-2
            text-3xl
            font-black
            text-tcd-blue
          "
        >
          {value}
        </p>
      )}

      <p className="mt-2 text-xs text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}

/* =====================================================
   WITHDRAWAL CARD
===================================================== */

function WithdrawalCard({
  title,
  value,
  description,
  icon: Icon,
  href,
  action,
  loading,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  href: string;
  action: string;
  loading: boolean;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-gray-100
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex items-start justify-between">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-[#FFF8EA]
            text-tcd-blue
          "
        >
          <Icon size={20} />
        </div>

        {loading ? (
          <div className="h-8 w-10 animate-pulse rounded-lg bg-gray-100" />
        ) : (
          <span
            className="
              text-3xl
              font-black
              text-tcd-blue
            "
          >
            {value.toLocaleString(
              "en-IN"
            )}
          </span>
        )}
      </div>

      <h3
        className="
          mt-5
          text-lg
          font-black
          text-tcd-blue
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1
          text-sm
          text-tcd-primary
        "
      >
        {description}
      </p>

      <Link
        href={href}
        className="
          mt-5
          inline-flex
          rounded-xl
          bg-tcd-blue
          px-4
          py-2.5
          text-sm
          font-bold
          text-white
          transition
          hover:opacity-90
        "
      >
        {action}
      </Link>
    </div>
  );
}

/* =====================================================
   QUICK ACTION
===================================================== */

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        rounded-3xl
        border
        border-gray-100
        bg-white
        p-5
        shadow-sm
        transition-all
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-[#FFF8EA]
          text-tcd-blue
          transition
          group-hover:bg-tcd-blue
          group-hover:text-white
        "
      >
        <Icon size={20} />
      </div>

      <h3
        className="
          mt-4
          font-black
          text-tcd-blue
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1
          text-sm
          leading-5
          text-tcd-primary
        "
      >
        {description}
      </p>
    </Link>
  );
}
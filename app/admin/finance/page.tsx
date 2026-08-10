"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRight,
  Clock3,
  ExternalLink,
  Gift,
  LockKeyhole,
  RefreshCw,
  Wallet,
  CheckCircle2,
  IndianRupee,
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
    useState<FinanceDashboard>(EMPTY_DATA);

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
              dashboard?.total_wallet_balance ?? 0
            ),

          total_locked_balance:
            Number(
              dashboard?.total_locked_balance ?? 0
            ),

          total_bonus_balance:
            Number(
              dashboard?.total_bonus_balance ?? 0
            ),

          pending_withdrawals:
            Number(
              dashboard?.pending_withdrawals ?? 0
            ),

          completed_withdrawals:
            Number(
              dashboard?.completed_withdrawals ?? 0
            ),

          total_transactions:
            Number(
              dashboard?.total_transactions ?? 0
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
    <div className="min-h-screen bg-[#F5F7FB]">
      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">

        {/* =====================================================
            PREMIUM HEADER
        ===================================================== */}

        <section className="relative mb-8 overflow-hidden rounded-[30px] border border-[#DCE4F2] bg-white shadow-[0_18px_55px_rgba(27,55,95,0.08)]">

          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-28 -top-32 h-80 w-80 rounded-full bg-[#E8B94F]/10 blur-3xl" />

            <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#294D86]/8 blur-3xl" />

            <div className="absolute right-12 top-10 h-36 w-36 rounded-full border border-[#E8B94F]/15" />

            <div className="absolute right-20 top-18 h-24 w-24 rounded-full border border-[#294D86]/10" />
          </div>

          <div className="relative p-6 md:p-8 lg:p-10">

            {/* Brand */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

              <div className="flex items-start gap-4">

                {/* LOGO */}

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#E8B94F]/20 bg-white p-2 shadow-[0_8px_25px_rgba(27,55,95,0.08)] sm:h-20 sm:w-20">
                  <Image
                    src="/logo.png"
                    alt="THE CONCLUSION DAILY"
                    width={72}
                    height={72}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>

                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8B94F]/25 bg-[#FFF9EC] px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#D8A63C]" />

                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#294D86]">
                      THE CONCLUSION DAILY
                    </span>
                  </div>

                  <h1 className="text-3xl font-black tracking-[-0.04em] text-[#294D86] md:text-4xl lg:text-[44px]">
                    Finance Management
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B] md:text-base">
                    Financial command center for wallets,
                    transactions, withdrawals and payout
                    operations across THE CONCLUSION DAILY.
                  </p>
                </div>
              </div>

              {/* REFRESH */}

              <button
                type="button"
                onClick={loadDashboard}
                disabled={loading}
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-[#DCE4F2]
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-extrabold
                  text-[#294D86]
                  shadow-sm
                  transition-all
                  hover:-translate-y-0.5
                  hover:border-[#294D86]/20
                  hover:shadow-md
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

            {/* STATUS STRIP */}

            <div className="mt-8 flex flex-col gap-4 border-t border-[#EEF1F6] pt-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#94A3B8]">
                    Finance System
                  </p>

                  <p className="text-xs font-bold text-emerald-600">
                    Operational
                  </p>
                </div>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#A0AEC0]">
                SECURE FINANCIAL OPERATIONS
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mb-8 rounded-3xl border border-red-100 bg-red-50 p-5">
            <p className="font-black text-red-700">
              Finance dashboard could not be loaded.
            </p>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={loadDashboard}
              className="mt-4 rounded-xl bg-[#294D86] px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
            >
              Try Again
            </button>
          </div>
        )}

        {/* =====================================================
            FINANCIAL OVERVIEW
        ===================================================== */}

        <section className="mb-8">

          <SectionHeading
            eyebrow="Financial Overview"
            title="Money at a glance"
            description="Real-time financial indicators across the THE CONCLUSION DAILY wallet ecosystem."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <FinanceStatCard
              title="Total Available Wallet"
              value={formatRupees(
                data.total_wallet_balance
              )}
              subtitle="Spendable balance across wallets"
              icon={Wallet}
              loading={loading}
              featured
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
              gold
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
          </div>
        </section>

        {/* =====================================================
            WITHDRAWAL OPERATIONS
        ===================================================== */}

        <section className="mb-8">

          <SectionHeading
            eyebrow="Withdrawal Operations"
            title="Payout activity"
            description="Monitor pending requests and completed withdrawal activity."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <WithdrawalCard
              title="Pending Withdrawals"
              value={data.pending_withdrawals}
              description="Requests waiting for admin review"
              icon={Clock3}
              href="/admin/finance/withdrawals"
              action="Review Withdrawals"
              loading={loading}
              warning
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

        {/* =====================================================
            FINANCE OPERATIONS
        ===================================================== */}

        <section className="mb-8">

          <SectionHeading
            eyebrow="Finance Operations"
            title="Manage the financial ecosystem"
            description="Open the dedicated management areas for THE CONCLUSION DAILY."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

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
              gold
            />

            <QuickAction
              href="/admin/finance/payouts"
              icon={IndianRupee}
              title="Payouts"
              description="Manage payout processing and settlement."
            />

          </div>

          {/* RAZORPAY */}

          <Link
            href="/admin/finance/razorpay"
            className="
              group
              mt-4
              flex
              flex-col
              gap-4
              rounded-[24px]
              border
              border-[#DCE4F2]
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-[#294D86]/20
              hover:shadow-[0_16px_35px_rgba(27,55,95,0.08)]
              sm:flex-row
              sm:items-center
              sm:justify-between
              md:p-6
            "
          >
            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF3FB] text-[#294D86]">
                <IndianRupee
                  size={21}
                  strokeWidth={2.1}
                />
              </div>

              <div>
                <p className="text-sm font-black text-[#294D86]">
                  Razorpay
                </p>

                <p className="mt-1 text-xs font-medium text-[#94A3B8]">
                  Payment gateway operations, orders and
                  financial infrastructure.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-[#294D86]">
              Open Razorpay
              <ExternalLink
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </Link>
        </section>

        {/* =====================================================
            FINANCIAL MODEL
        ===================================================== */}

        <section>
          <div className="relative overflow-hidden rounded-[28px] border border-[#F0DEB5] bg-[#FFF9EC] p-6 md:p-7">

            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E8B94F]/10 blur-3xl" />

            <div className="relative flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#294D86] shadow-sm">
                <Wallet size={21} />
              </div>

              <div>
                <h3 className="font-black text-[#294D86]">
                  THE CONCLUSION DAILY Financial Ledger
                </h3>

                <p className="mt-1 max-w-3xl text-sm leading-6 text-[#64748B]">
                  Financial values are maintained in paise
                  by the wallet engine. The admin interface
                  displays those values as Indian Rupees.
                </p>

                <p className="mt-3 text-xs font-extrabold text-[#8A6A2B]">
                  100 paise = ₹1 · 10 TCD credits = ₹1
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

/* =====================================================
   SECTION HEADING
===================================================== */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#D8A63C]" />

        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#94A3B8]">
          {eyebrow}
        </p>
      </div>

      <h2 className="text-xl font-black tracking-[-0.025em] text-[#294D86] md:text-2xl">
        {title}
      </h2>

      <p className="text-xs font-medium text-[#94A3B8]">
        {description}
      </p>
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
  featured = false,
  gold = false,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  loading: boolean;
  featured?: boolean;
  gold?: boolean;
}) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_16px_35px_rgba(27,55,95,0.08)]
        ${
          featured
            ? "border-[#294D86]/20"
            : gold
              ? "border-[#E8B94F]/25"
              : "border-[#DCE4F2]"
        }
      `}
    >
      <div
        className={`
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-24
          w-24
          rounded-full
          blur-2xl
          ${
            gold
              ? "bg-[#E8B94F]/10"
              : "bg-[#294D86]/7"
          }
        `}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            ${
              gold
                ? "bg-[#FFF8E8] text-[#C99426]"
                : "bg-[#EEF3FB] text-[#294D86]"
            }
          `}
        >
          <Icon size={20} />
        </div>
      </div>

      <p className="relative mt-5 text-[10px] font-black uppercase tracking-[0.12em] text-[#94A3B8]">
        {title}
      </p>

      {loading ? (
        <div className="relative mt-2 h-9 w-36 animate-pulse rounded-lg bg-[#E9EEF6]" />
      ) : (
        <p className="relative mt-2 text-2xl font-black tracking-[-0.035em] text-[#294D86] md:text-3xl">
          {value}
        </p>
      )}

      <p className="relative mt-2 text-xs font-medium text-[#94A3B8]">
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
  warning = false,
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
  warning?: boolean;
}) {
  return (
    <div
      className={`
        rounded-[24px]
        border
        bg-white
        p-5
        shadow-sm
        transition-all
        hover:-translate-y-0.5
        hover:shadow-[0_16px_35px_rgba(27,55,95,0.08)]
        ${
          warning
            ? "border-[#E8B94F]/30"
            : "border-[#DCE4F2]"
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">

        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            ${
              warning
                ? "bg-[#FFF8E8] text-[#C99426]"
                : "bg-[#EEF3FB] text-[#294D86]"
            }
          `}
        >
          <Icon size={20} />
        </div>

        {loading ? (
          <div className="h-9 w-12 animate-pulse rounded-lg bg-[#E9EEF6]" />
        ) : (
          <span className="text-3xl font-black tracking-[-0.04em] text-[#294D86]">
            {value.toLocaleString("en-IN")}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-lg font-black text-[#294D86]">
        {title}
      </h3>

      <p className="mt-1 text-sm text-[#64748B]">
        {description}
      </p>

      <Link
        href={href}
        className="
          mt-5
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-[#294D86]
          px-4
          py-2.5
          text-sm
          font-extrabold
          text-white
          transition
          hover:-translate-y-0.5
          hover:shadow-md
        "
      >
        {action}

        <ArrowRight size={15} />
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
  gold = false,
}: {
  href: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  title: string;
  description: string;
  gold?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        group
        rounded-[22px]
        border
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_14px_30px_rgba(27,55,95,0.08)]
        ${
          gold
            ? "border-[#E8B94F]/25 hover:border-[#E8B94F]/55"
            : "border-[#DCE4F2] hover:border-[#294D86]/20"
        }
      `}
    >
      <div
        className={`
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          transition
          ${
            gold
              ? "bg-[#FFF8E8] text-[#C99426] group-hover:bg-[#E8B94F] group-hover:text-white"
              : "bg-[#EEF3FB] text-[#294D86] group-hover:bg-[#294D86] group-hover:text-white"
          }
        `}
      >
        <Icon size={20} />
      </div>

      <h3 className="mt-4 font-black text-[#294D86]">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-5 text-[#64748B]">
        {description}
      </p>

      <div className="mt-4 flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#A0AEC0] transition-colors group-hover:text-[#294D86]">
        Open
        <ArrowRight
          size={13}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
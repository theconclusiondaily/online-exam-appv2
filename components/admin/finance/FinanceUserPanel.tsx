"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronDown,
  X,
  Wallet,
  LockKeyhole,
  Gift,
  TrendingUp,
} from "lucide-react";

import { useState } from "react";

import type { FinanceUser } from "@/lib/finance/adminUsers";

import { formatRupees } from "@/lib/finance/formatter";
import { supabase } from "@/lib/supabase/client";
interface FinanceUserPanelProps {
  user: FinanceUser | null;
  onClose: () => void;
  onSuccess?: () => void;
}

type ActionType = "credit" | "debit";

export default function FinanceUserPanel({
  user,
  onClose,
  onSuccess,
}: FinanceUserPanelProps) {
  const [action, setAction] =
    useState<ActionType>("credit");

  const [amount, setAmount] =
    useState("");

  const [reason, setReason] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  if (!user) {
    return null;
  }

  const numericAmount = Number(amount);

  const isValidAmount =
    Number.isFinite(numericAmount) &&
    numericAmount > 0;

  const handleSubmit = async (
  event: React.FormEvent
) => {
  event.preventDefault();

  setError(null);
  setSuccess(null);

  if (!isValidAmount) {
    setError(
      "Enter a valid amount greater than ₹0."
    );
    return;
  }

  if (!reason.trim()) {
    setError(
      "A reason is required for every finance adjustment."
    );
    return;
  }

  if (!user.user_id) {
    setError("Invalid user selected.");
    return;
  }

  setLoading(true);

  try {
    // ======================================================
    // GET CURRENT ADMIN SESSION
    // ======================================================

    const {
      data: {
        user: adminUser,
      },
      error: sessionError,
    } = await supabase.auth.getUser();

    if (sessionError) {
      throw new Error(
        sessionError.message
      );
    }

    if (!adminUser?.id) {
      throw new Error(
        "Your admin session has expired. Please log in again."
      );
    }

    // ======================================================
    // RUPEES → PAISE
    // ======================================================

    const amountInPaise = Math.round(
      numericAmount * 100
    );

    if (amountInPaise <= 0) {
      throw new Error(
        "The amount must be greater than ₹0."
      );
    }

    // ======================================================
    // CALL EXISTING WALLET ENGINE
    // ======================================================

    if (action === "credit") {
      const {
        error: creditError,
      } = await supabase.rpc(
        "admin_credit_wallet",
        {
          p_user_id: user.user_id,
          p_amount: amountInPaise,
          p_reason: reason.trim(),
          p_admin_user_id: adminUser.id,
        }
      );

      if (creditError) {
        console.error(
          "ADMIN CREDIT WALLET ERROR:",
          creditError
        );

        throw new Error(
          creditError.message ||
            "Unable to credit wallet."
        );
      }

      setSuccess(
        `${formatRupees(
          amountInPaise
        )} credited successfully.`
      );
    } else {
      const {
        error: debitError,
      } = await supabase.rpc(
        "admin_debit_wallet",
        {
          p_user_id: user.user_id,
          p_amount: amountInPaise,
          p_reason: reason.trim(),
          p_admin_user_id: adminUser.id,
        }
      );

      if (debitError) {
        console.error(
          "ADMIN DEBIT WALLET ERROR:",
          debitError
        );

        throw new Error(
          debitError.message ||
            "Unable to debit wallet."
        );
      }

      setSuccess(
        `${formatRupees(
          amountInPaise
        )} debited successfully.`
      );
    }

    // ======================================================
    // RESET FORM
    // ======================================================

    setAmount("");
    setReason("");

    onSuccess?.();

  } catch (err) {
    console.error(
      "FINANCE USER ACTION ERROR:",
      err
    );

    setError(
      err instanceof Error
        ? err.message
        : "Unable to process the wallet adjustment."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#14233B]/45
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          max-h-[92vh]
          w-full
          max-w-3xl
          overflow-y-auto
          rounded-[30px]
          border
          border-[#DCE4F2]
          bg-white
          shadow-[0_30px_80px_rgba(15,35,65,0.22)]
        "
      >
        {/* HEADER */}

        <div className="relative overflow-hidden border-b border-[#E9EEF5] px-5 py-5 md:px-7">
          <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#E8B94F]/10 blur-3xl" />

          <div className="relative flex items-start justify-between gap-4">

            <div className="flex items-center gap-3.5">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF3FB] text-sm font-black text-[#294D86]">
                {user.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#94A3B8]">
                  User Financial Profile
                </p>

                <h2 className="mt-0.5 truncate text-lg font-black text-[#294D86]">
                  {user.name}
                </h2>

                <p className="truncate text-xs font-medium text-[#94A3B8]">
                  {user.email}
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[#E3E9F2]
                text-[#64748B]
                transition
                hover:bg-[#F8FAFD]
                hover:text-[#294D86]
              "
              aria-label="Close"
            >
              <X size={17} />
            </button>

          </div>
        </div>

        {/* BALANCE OVERVIEW */}

        <div className="grid grid-cols-1 gap-3 border-b border-[#E9EEF5] bg-[#FAFBFD] p-5 sm:grid-cols-3 md:p-6">

          <BalanceCard
            title="Available"
            value={user.available_balance}
            icon={Wallet}
            primary
          />

          <BalanceCard
            title="Locked"
            value={user.locked_balance}
            icon={LockKeyhole}
          />

          <BalanceCard
            title="Bonus"
            value={user.bonus_balance}
            icon={Gift}
            gold
          />

        </div>

        {/* LIFETIME SUMMARY */}

        <div className="border-b border-[#E9EEF5] px-5 py-5 md:px-7">

          <p className="mb-3 text-[9px] font-black uppercase tracking-[0.16em] text-[#94A3B8]">
            Lifetime Activity
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

            <LifetimeItem
              label="Added"
              value={user.lifetime_added}
            />

            <LifetimeItem
              label="Won"
              value={user.lifetime_won}
            />

            <LifetimeItem
              label="Spent"
              value={user.lifetime_spent}
            />

            <LifetimeItem
              label="Withdrawn"
              value={user.lifetime_withdrawn}
            />

          </div>
        </div>

        {/* CREDIT / DEBIT */}

        <div className="p-5 md:p-7">

          <div className="mb-5">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#94A3B8]">
              Wallet Adjustment
            </p>

            <h3 className="mt-1 text-xl font-black text-[#294D86]">
              Credit or Debit Wallet
            </h3>

            <p className="mt-1 text-xs leading-5 text-[#94A3B8]">
              Every adjustment must have a documented
              reason for the financial audit trail.
            </p>
          </div>

          {/* ACTION SELECTOR */}

          <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-[#F3F5F8] p-1.5">

            <button
              type="button"
              onClick={() => {
                setAction("credit");
                setError(null);
                setSuccess(null);
              }}
              className={`
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                px-4
                py-3
                text-xs
                font-black
                transition
                ${
                  action === "credit"
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "text-[#94A3B8]"
                }
              `}
            >
              <ArrowUpCircle size={16} />
              Credit Wallet
            </button>

            <button
              type="button"
              onClick={() => {
                setAction("debit");
                setError(null);
                setSuccess(null);
              }}
              className={`
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                px-4
                py-3
                text-xs
                font-black
                transition
                ${
                  action === "debit"
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-[#94A3B8]"
                }
              `}
            >
              <ArrowDownCircle size={16} />
              Debit Wallet
            </button>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div>
              <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.12em] text-[#64748B]">
                Amount (₹)
              </label>

              <input
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(event) =>
                  setAmount(event.target.value)
                }
                placeholder="Enter amount"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[#DCE4F2]
                  bg-[#F8FAFD]
                  px-4
                  text-sm
                  font-bold
                  text-[#294D86]
                  outline-none
                  transition
                  focus:border-[#294D86]/30
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#294D86]/5
                "
              />

              <p className="mt-1.5 text-[10px] font-medium text-[#A0AEC0]">
                Stored internally in paise.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.12em] text-[#64748B]">
                Reason
              </label>

              <textarea
                value={reason}
                onChange={(event) =>
                  setReason(event.target.value)
                }
                rows={3}
                placeholder={
                  action === "credit"
                    ? "Why is this amount being credited?"
                    : "Why is this amount being debited?"
                }
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[#DCE4F2]
                  bg-[#F8FAFD]
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-[#294D86]
                  outline-none
                  transition
                  placeholder:text-[#A0AEC0]
                  focus:border-[#294D86]/30
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#294D86]/5
                "
              />
            </div>

            {/* PREVIEW */}

            {isValidAmount && (
              <div
                className={`
                  rounded-2xl
                  border
                  p-4
                  ${
                    action === "credit"
                      ? "border-emerald-100 bg-emerald-50/60"
                      : "border-red-100 bg-red-50/60"
                  }
                `}
              >
                <div className="flex items-center justify-between gap-4">

                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#94A3B8]">
                      {action === "credit"
                        ? "New Available Balance"
                        : "Estimated Available Balance"}
                    </p>

                    <p className="mt-1 text-lg font-black text-[#294D86]">
                      {formatRupees(
                        action === "credit"
                          ? user.available_balance +
                              numericAmount * 100
                          : Math.max(
                              0,
                              user.available_balance -
                                numericAmount * 100
                            )
                      )}
                    </p>
                  </div>

                  <TrendingUp
                    size={20}
                    className={
                      action === "credit"
                        ? "text-emerald-500"
                        : "text-red-500"
                    }
                  />

                </div>
              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                <p className="text-xs font-bold text-red-700">
                  {error}
                </p>
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                <p className="text-xs font-bold text-emerald-700">
                  {success}
                </p>
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className={`
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                text-sm
                font-black
                text-white
                transition
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${
                  action === "credit"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-600 hover:bg-red-700"
                }
              `}
            >
              {loading
                ? "Processing..."
                : action === "credit"
                  ? "Credit Wallet"
                  : "Debit Wallet"}
            </button>

          </form>

          <div className="mt-4 flex items-center justify-center gap-2">
            <ChevronDown
              size={13}
              className="text-[#CBD5E1]"
            />

            <p className="text-[9px] font-medium text-[#A0AEC0]">
              Financial adjustments are recorded in the
              wallet transaction ledger.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

/* =====================================================
   BALANCE CARD
===================================================== */

function BalanceCard({
  title,
  value,
  icon: Icon,
  primary = false,
  gold = false,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  primary?: boolean;
  gold?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#E3E9F2] bg-white p-4">

      <div className="flex items-center justify-between">

        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            ${
              gold
                ? "bg-[#FFF8E8] text-[#C99426]"
                : "bg-[#EEF3FB] text-[#294D86]"
            }
          `}
        >
          <Icon size={17} />
        </div>

        <p className="text-[9px] font-black uppercase tracking-[0.1em] text-[#94A3B8]">
          {title}
        </p>

      </div>

      <p
        className={`
          mt-4
          font-black
          tracking-[-0.03em]
          ${
            primary
              ? "text-2xl text-[#294D86]"
              : "text-xl text-[#294D86]"
          }
        `}
      >
        {formatRupees(value)}
      </p>

    </div>
  );
}

/* =====================================================
   LIFETIME ITEM
===================================================== */

function LifetimeItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-[#F8FAFD] px-3 py-3">
      <p className="text-[8px] font-black uppercase tracking-[0.1em] text-[#A0AEC0]">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-[#294D86]">
        {formatRupees(value)}
      </p>
    </div>
  );
}
"use client";

import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import { formatRupees } from "@/lib/finance/formatter";

interface FinanceWalletActionsProps {
  userId: string;
  availableBalance: number;
  onSuccess?: () => void;
}

type ActionType = "CREDIT" | "DEBIT";

export default function FinanceWalletActions({
  userId,
  availableBalance,
  onSuccess,
}: FinanceWalletActionsProps) {
  const [action, setAction] =
    useState<ActionType>("CREDIT");

  const [amount, setAmount] =
    useState("");

  const [reason, setReason] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage(null);
    setError(null);

    const rupees = Number(amount);

    if (!Number.isFinite(rupees) || rupees <= 0) {
      setError("Enter a valid amount greater than ₹0.");
      return;
    }

    if (!reason.trim()) {
      setError("Please enter a reason.");
      return;
    }

    const paise = Math.round(rupees * 100);

    if (
      action === "DEBIT" &&
      paise > Number(availableBalance)
    ) {
      setError(
        `Insufficient available balance. Current balance is ${formatRupees(
          availableBalance
        )}.`
      );
      return;
    }

    const confirmed = window.confirm(
      `Confirm ${action === "CREDIT" ? "credit" : "debit"} of ${formatRupees(
        paise
      )}?\n\nReason: ${reason.trim()}`
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const functionName =
        action === "CREDIT"
          ? "admin_credit_wallet"
          : "admin_debit_wallet";

     const {
  data: adminUser,
  error: adminUserError,
} = await supabase.auth.getUser();

if (adminUserError) {
  throw adminUserError;
}

if (!adminUser.user) {
  throw new Error(
    "Admin session could not be verified."
  );
}

const { error: rpcError } =
  await supabase.rpc(functionName, {
    p_user_id: userId,
    p_amount: paise,
    p_reason: reason.trim(),
    p_admin_user_id: adminUser.user.id,
  });

if (rpcError) {
  throw rpcError;
}

      

     setMessage(
  `${action === "CREDIT" ? "Credit" : "Debit"} completed successfully.`
);

setAmount("");
setReason("");

onSuccess?.();
    } catch (err) {
      console.error(
        "Finance wallet operation error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to complete wallet operation."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
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
      <div className="mb-6">
        <h2 className="text-2xl font-black text-tcd-blue">
          Wallet Operations
        </h2>

        <p className="mt-1 text-sm text-tcd-primary">
          Add or remove funds using the protected finance functions.
        </p>
      </div>

      {/* ACTION SELECTOR */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => {
            setAction("CREDIT");
            setError(null);
            setMessage(null);
          }}
          className={`
            rounded-2xl
            border
            p-4
            text-left
            transition-all
            ${
              action === "CREDIT"
                ? "border-tcd-blue bg-[#FFF8EA]"
                : "border-gray-200 hover:bg-gray-50"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <ArrowDownCircle
              size={22}
              className="text-tcd-blue"
            />

            <div>
              <p className="font-black text-tcd-blue">
                Credit Wallet
              </p>

              <p className="text-xs text-tcd-primary mt-1">
                Add funds to available balance.
              </p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setAction("DEBIT");
            setError(null);
            setMessage(null);
          }}
          className={`
            rounded-2xl
            border
            p-4
            text-left
            transition-all
            ${
              action === "DEBIT"
                ? "border-tcd-blue bg-[#FFF8EA]"
                : "border-gray-200 hover:bg-gray-50"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <ArrowUpCircle
              size={22}
              className="text-tcd-blue"
            />

            <div>
              <p className="font-black text-tcd-blue">
                Debit Wallet
              </p>

              <p className="text-xs text-tcd-primary mt-1">
                Remove funds from available balance.
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="finance-wallet-amount"
            className="
              block
              mb-2
              text-sm
              font-bold
              text-tcd-blue
            "
          >
            Amount
          </label>

          <div className="relative">
            <span
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                font-bold
                text-gray-500
              "
            >
              ₹
            </span>

            <input
              id="finance-wallet-amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              placeholder="0.00"
              disabled={loading}
              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                pl-9
                pr-4
                py-3
                outline-none
                focus:border-tcd-blue
                focus:ring-2
                focus:ring-tcd-blue/10
                disabled:bg-gray-50
              "
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Stored internally in paise. No floating-point
            wallet arithmetic is performed.
          </p>
        </div>

        <div>
          <label
            htmlFor="finance-wallet-reason"
            className="
              block
              mb-2
              text-sm
              font-bold
              text-tcd-blue
            "
          >
            Reason
          </label>

          <textarea
            id="finance-wallet-reason"
            value={reason}
            onChange={(event) =>
              setReason(event.target.value)
            }
            placeholder="Enter the reason for this financial adjustment..."
            rows={4}
            disabled={loading}
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              px-4
              py-3
              outline-none
              resize-none
              focus:border-tcd-blue
              focus:ring-2
              focus:ring-tcd-blue/10
              disabled:bg-gray-50
            "
          />
        </div>

        {/* CURRENT BALANCE */}

        <div
          className="
            rounded-2xl
            bg-gray-50
            border
            border-gray-100
            p-4
          "
        >
          <div className="flex justify-between gap-4">
            <span className="text-sm text-tcd-primary">
              Current available balance
            </span>

            <span className="font-black text-tcd-blue">
              {formatRupees(
                availableBalance
              )}
            </span>
          </div>

          {Number(amount) > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between gap-4">
              <span className="text-sm text-tcd-primary">
                Balance after operation
              </span>

              <span className="font-black text-tcd-blue">
                {formatRupees(
                  action === "CREDIT"
                    ? Number(availableBalance) +
                        Math.round(
                          Number(amount) * 100
                        )
                    : Math.max(
                        0,
                        Number(availableBalance) -
                          Math.round(
                            Number(amount) * 100
                          )
                      )
                )}
              </span>
            </div>
          )}
        </div>

        {/* MESSAGES */}

        {error && (
          <div
            className="
              rounded-2xl
              bg-red-50
              border
              border-red-100
              px-4
              py-3
              text-sm
              font-semibold
              text-red-700
            "
          >
            {error}
          </div>
        )}

        {message && (
          <div
            className="
              rounded-2xl
              bg-green-50
              border
              border-green-100
              px-4
              py-3
              text-sm
              font-semibold
              text-green-700
            "
          >
            {message}
          </div>
        )}

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            rounded-2xl
            bg-tcd-blue
            px-5
            py-3.5
            text-sm
            font-black
            text-white
            hover:opacity-90
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading
            ? "Processing..."
            : action === "CREDIT"
              ? "Credit Wallet"
              : "Debit Wallet"}
        </button>
      </form>
    </section>
  );
}
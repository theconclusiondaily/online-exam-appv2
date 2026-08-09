"use client";

import { useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  X,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import { formatRupees } from "@/lib/finance/formatter";

interface PayoutProcessingProps {
  withdrawal: {
    withdraw_request_id: string;
    user_id: string;
    amount: number;
    reference_number: string | null;
    status: string;
    created_at: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export default function PayoutProcessing({
  withdrawal,
  onClose,
  onSuccess,
}: PayoutProcessingProps) {
  const [method, setMethod] =
    useState<"MANUAL" | "RAZORPAY">("MANUAL");

  const [payoutReference, setPayoutReference] =
    useState("");

  const [payoutMethod, setPayoutMethod] =
    useState<"UPI" | "BANK">("UPI");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  async function handleManualPayout() {
    setError(null);
    setSuccess(null);

    if (!payoutReference.trim()) {
      setError(
        "Enter the actual payout reference number."
      );
      return;
    }

    const confirmed = window.confirm(
      `Confirm manual payout of ${formatRupees(
        withdrawal.amount
      )}?\n\nPayout reference: ${payoutReference.trim()}\nMethod: ${payoutMethod}`
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const { error: rpcError } =
        await supabase.rpc(
          "complete_manual_payout",
          {
            p_withdraw_request_id:
              withdrawal.withdraw_request_id,

            p_payout_reference:
              payoutReference.trim(),

            p_payout_method:
              payoutMethod,
          }
        );

      if (rpcError) {
        throw rpcError;
      }

      setSuccess(
        "Manual payout completed successfully."
      );

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 700);
    } catch (err) {
      console.error(
        "Manual payout error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to complete manual payout."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-gray-100
            px-6
            py-5
          "
        >
          <div>
            <h2 className="text-2xl font-black text-tcd-blue">
              Process Payout
            </h2>

            <p className="mt-1 text-sm text-tcd-primary">
              Complete the approved withdrawal.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              h-10
              w-10
              rounded-xl
              border
              border-gray-200
              flex
              items-center
              justify-center
              text-gray-500
              hover:bg-gray-50
              transition
            "
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* AMOUNT */}

          <div
            className="
              rounded-3xl
              bg-[#FFF8EA]
              border
              border-[#F3E4C2]
              p-6
            "
          >
            <p className="text-sm text-tcd-primary">
              Payout Amount
            </p>

            <p className="mt-2 text-4xl font-black text-tcd-blue">
              {formatRupees(
                withdrawal.amount
              )}
            </p>
          </div>

          {/* REQUEST DETAILS */}

          <div
            className="
              rounded-3xl
              bg-gray-50
              border
              border-gray-100
              p-5
              space-y-4
            "
          >
            <DetailRow
              label="Withdrawal ID"
              value={
                withdrawal.withdraw_request_id
              }
            />

            <DetailRow
              label="User ID"
              value={withdrawal.user_id}
            />

            <DetailRow
              label="Request Reference"
              value={
                withdrawal.reference_number ||
                "-"
              }
            />

            <DetailRow
              label="Status"
              value={withdrawal.status}
            />
          </div>

          {/* PAYOUT METHOD */}

          <div>
            <p className="mb-3 text-sm font-black text-tcd-blue">
              Payout Processing Method
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setMethod("MANUAL")
                }
                disabled={loading}
                className={`
                  rounded-2xl
                  border
                  p-4
                  text-left
                  transition
                  ${
                    method === "MANUAL"
                      ? "border-tcd-blue bg-[#FFF8EA]"
                      : "border-gray-200 hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex gap-3">
                  <CreditCard
                    size={20}
                    className="text-tcd-blue"
                  />

                  <div>
                    <p className="font-black text-tcd-blue">
                      Manual Payout
                    </p>

                    <p className="mt-1 text-xs text-tcd-primary">
                      UPI or bank transfer completed outside TCD.
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setMethod("RAZORPAY")
                }
                disabled={loading}
                className={`
                  rounded-2xl
                  border
                  p-4
                  text-left
                  transition
                  ${
                    method === "RAZORPAY"
                      ? "border-tcd-blue bg-[#FFF8EA]"
                      : "border-gray-200 hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex gap-3">
                  <CreditCard
                    size={20}
                    className="text-tcd-blue"
                  />

                  <div>
                    <p className="font-black text-tcd-blue">
                      Razorpay Payout
                    </p>

                    <p className="mt-1 text-xs text-tcd-primary">
                      Process through the configured Razorpay payout system.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* MANUAL PAYOUT */}

          {method === "MANUAL" && (
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="payout-method"
                  className="
                    block
                    mb-2
                    text-sm
                    font-bold
                    text-tcd-blue
                  "
                >
                  Payout Method
                </label>

                <select
                  id="payout-method"
                  value={payoutMethod}
                  onChange={(event) =>
                    setPayoutMethod(
                      event.target.value as
                        | "UPI"
                        | "BANK"
                    )
                  }
                  disabled={loading}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-tcd-blue
                    outline-none
                    focus:border-tcd-blue
                  "
                >
                  <option value="UPI">
                    UPI
                  </option>

                  <option value="BANK">
                    BANK
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="payout-reference"
                  className="
                    block
                    mb-2
                    text-sm
                    font-bold
                    text-tcd-blue
                  "
                >
                  Actual Payout Reference
                </label>

                <input
                  id="payout-reference"
                  type="text"
                  value={payoutReference}
                  onChange={(event) =>
                    setPayoutReference(
                      event.target.value
                    )
                  }
                  disabled={loading}
                  placeholder="Enter UTR / transaction reference"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-tcd-blue
                    focus:ring-2
                    focus:ring-tcd-blue/10
                    disabled:bg-gray-50
                  "
                />
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-yellow-100
                  bg-yellow-50
                  p-4
                "
              >
                <p className="text-sm font-bold text-yellow-800">
                  Important
                </p>

                <p className="mt-1 text-xs leading-5 text-yellow-700">
                  Only mark the withdrawal complete after
                  the actual UPI or bank payment has been
                  successfully made.
                </p>
              </div>

              {error && (
                <Message
                  type="error"
                  message={error}
                />
              )}

              {success && (
                <Message
                  type="success"
                  message={success}
                />
              )}

              <button
                type="button"
                onClick={handleManualPayout}
                disabled={loading}
                className="
                  w-full
                  inline-flex
                  items-center
                  justify-center
                  gap-2
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
                {loading && (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                )}

                {loading
                  ? "Processing..."
                  : "Complete Manual Payout"}
              </button>
            </div>
          )}

          {/* RAZORPAY */}

          {method === "RAZORPAY" && (
            <div
              className="
                rounded-3xl
                border
                border-blue-100
                bg-blue-50
                p-5
              "
            >
              <div className="flex gap-3">
                <ShieldIcon />

                <div>
                  <p className="font-black text-tcd-blue">
                    Razorpay Payout Integration
                  </p>

                  <p className="mt-2 text-sm leading-6 text-tcd-primary">
                    The Razorpay payout must be created by
                    the secure server-side payout workflow.
                    This screen will not accept or invent
                    Razorpay payout IDs.
                  </p>

                  <p className="mt-3 text-xs font-semibold text-gray-500">
                    Razorpay payout processing will be
                    connected after the server-side payout
                    API route is verified.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              px-5
              py-3
              text-sm
              font-bold
              text-gray-700
              hover:bg-gray-50
              transition
              disabled:opacity-50
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="sm:max-w-[65%] break-all text-sm font-bold text-tcd-blue sm:text-right">
        {value}
      </span>
    </div>
  );
}

function Message({
  type,
  message,
}: {
  type: "error" | "success";
  message: string;
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        p-4
        text-sm
        font-semibold
        ${
          type === "error"
            ? "border-red-100 bg-red-50 text-red-700"
            : "border-green-100 bg-green-50 text-green-700"
        }
      `}
    >
      {message}
    </div>
  );
}

function ShieldIcon() {
  return (
    <CheckCircle2
      size={21}
      className="shrink-0 text-tcd-blue"
    />
  );
}
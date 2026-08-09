"use client";

import { useState } from "react";
import { CheckCircle2, X, ShieldCheck } from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import { formatRupees } from "@/lib/finance/formatter";
import PayoutProcessing from "@/components/admin/finance/withdrawals/PayoutProcessing";

interface WithdrawalReviewProps {
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
  onApproved: (withdrawal: {
    withdraw_request_id: string;
    user_id: string;
    amount: number;
    reference_number: string | null;
    status: string;
    created_at: string;
  }) => void;
}

export default function WithdrawalReview({
  withdrawal,
  onClose,
  onSuccess,
  onApproved,
}: WithdrawalReviewProps) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  async function approveWithdrawal() {
    setError(null);
    setSuccess(null);

    const confirmed = window.confirm(
      `Approve withdrawal of ${formatRupees(
        withdrawal.amount
      )}?\n\nReference: ${
        withdrawal.reference_number || "-"
      }`
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const {
        data: authData,
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error(
          "Admin session could not be verified."
        );
      }

      const { error: rpcError } =
        await supabase.rpc(
          "approve_withdrawal",
          {
            p_withdraw_request_id:
              withdrawal.withdraw_request_id,
            p_admin_user_id:
              authData.user.id,
          }
        );

      if (rpcError) {
        throw rpcError;
      }

      setSuccess(
  "Withdrawal approved successfully."
);

setTimeout(() => {
  onApproved({
    ...withdrawal,
    status: "APPROVED",
  });

  onSuccess();
  onClose();
}, 700);
    } catch (err) {
      console.error(
        "Approve withdrawal error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to approve withdrawal."
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
              Withdrawal Review
            </h2>

            <p className="mt-1 text-sm text-tcd-primary">
              Review the request before approving it.
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

        {/* CONTENT */}

        <div className="p-6 space-y-5">
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
              Withdrawal Amount
            </p>

            <p className="mt-2 text-4xl font-black text-tcd-blue">
              {formatRupees(
                withdrawal.amount
              )}
            </p>
          </div>

          {/* DETAILS */}

          <div
            className="
              rounded-3xl
              border
              border-gray-100
              bg-gray-50
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
              label="Reference"
              value={
                withdrawal.reference_number ||
                "-"
              }
            />

            <DetailRow
              label="Status"
              value={withdrawal.status}
            />

            <DetailRow
              label="Requested"
              value={new Date(
                withdrawal.created_at
              ).toLocaleString("en-IN")}
            />
          </div>

          {/* SECURITY NOTICE */}

          <div
            className="
              rounded-2xl
              border
              border-blue-100
              bg-blue-50
              p-4
            "
          >
            <div className="flex gap-3">
              <ShieldCheck
                size={20}
                className="shrink-0 text-tcd-blue"
              />

              <div>
                <p className="font-bold text-tcd-blue">
                  Financial security check
                </p>

                <p className="mt-1 text-sm text-tcd-primary leading-6">
                  Approval only changes the withdrawal
                  request to APPROVED. The actual payout
                  must be processed through the configured
                  payout workflow.
                </p>
              </div>
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div
              className="
                rounded-2xl
                border
                border-red-100
                bg-red-50
                p-4
                text-sm
                font-semibold
                text-red-700
              "
            >
              {error}
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div
              className="
                rounded-2xl
                border
                border-green-100
                bg-green-50
                p-4
                text-sm
                font-semibold
                text-green-700
              "
            >
              {success}
            </div>
          )}

          {/* ACTION */}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                flex-1
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
              Cancel
            </button>

            <button
              type="button"
              onClick={approveWithdrawal}
              disabled={
                loading ||
                withdrawal.status !==
                  "PENDING"
              }
              className="
                flex-1
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-tcd-blue
                px-5
                py-3
                text-sm
                font-black
                text-white
                hover:opacity-90
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              <CheckCircle2 size={18} />

              {loading
                ? "Approving..."
                : "Approve Withdrawal"}
            </button>
          </div>
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

      <span
        className="
          sm:max-w-[65%]
          break-all
          text-sm
          font-bold
          text-tcd-blue
          sm:text-right
        "
      >
        {value}
      </span>
    </div>
  );
}
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";
import TCDLoader from "@/components/common/TCDLoader";
import {
  formatRupees,
} from "@/lib/finance/formatter";

interface PayoutAccount {
  id: string;
  account_type: "UPI" | "BANK";
  account_holder_name: string;
  upi_id: string | null;
  bank_account_number: string | null;
  ifsc_code: string | null;
  is_verified: boolean;
}
interface PendingPayoutAccount
  extends PayoutAccount {
  user_id: string;
  created_at: string;

  student: {
    id: string;
    name: string | null;
    email: string | null;
    mobile: string | null;
  } | null;
}
interface Withdrawal {
  id: string;
  amount: number;
  status:
    | "PENDING"
    | "APPROVED"
    | "PROCESSING"
    | "COMPLETED"
    | "REJECTED"
    | "FAILED"
    | "CANCELLED";

  reference_number: string | null;
  payout_reference: string | null;
  payout_method: string | null;
  remarks: string | null;
  created_at: string;

  student: {
    id: string;
    name: string | null;
    email: string | null;
    mobile: string | null;
  } | null;

  payout_account:
    | PayoutAccount
    | null;
}

export default function AdminWithdrawalsPage() {
  const [
    withdrawals,
    setWithdrawals,
  ] = useState<Withdrawal[]>([]);
const [
  pendingPayoutAccounts,
  setPendingPayoutAccounts,
] = useState<
  PendingPayoutAccount[]
>([]);
  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    actionLoading,
    setActionLoading,
  ] = useState<string | null>(
    null
  );

  const [
    payoutReference,
    setPayoutReference,
  ] = useState<
    Record<string, string>
  >({});

  const loadWithdrawals =
    useCallback(
      async () => {
        try {
          const response =
            await fetch(
              "/api/admin/withdrawals",
              {
                cache: "no-store",
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data.error ||
                "Unable to load withdrawals."
            );
          }

          setWithdrawals(
            data.withdrawals ?? []
          );
          setPendingPayoutAccounts(
  data.pendingPayoutAccounts ?? []
);
        } catch (error) {
          console.error(
            "WITHDRAWALS LOAD ERROR:",
            error
          );

          toast.error(
            error instanceof Error
              ? error.message
              : "Unable to load withdrawals."
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );

  useEffect(() => {
    loadWithdrawals();
  }, [loadWithdrawals]);

  async function runAction(
    body: Record<
      string,
      unknown
    >,
    loadingKey: string
  ) {
    try {
      setActionLoading(
        loadingKey
      );

      const response =
        await fetch(
          "/api/admin/withdrawals",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                body
              ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Action failed."
        );
      }

      toast.success(
        "Action completed successfully."
      );

      await loadWithdrawals();

    } catch (error) {
      console.error(
        "WITHDRAWAL ACTION ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Action failed."
      );

    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <TCDLoader
        text="Loading Withdrawals"
      />
    );
  }

  return (
    <AdminGuard>

    <main className="min-h-screen bg-gray-50 p-6 md:p-5">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

  <AdminPageHeader
    title="Withdrawal Management"
    description="Review and process student withdrawal requests"
  />

  <Link
    href="/admin"
    className="
      inline-flex
      items-center
      justify-center
      bg-black
      text-white
      px-5
      py-2.5
      rounded-xl
      font-semibold
      hover:opacity-90
      transition
    "
  >
    Dashboard
  </Link>

</div>
{/* PENDING PAYOUT ACCOUNT VERIFICATION */}

{pendingPayoutAccounts.length > 0 && (
  <section className="mb-8">

    <div className="flex items-center justify-between gap-4 mb-4">

      <div>
        <h2 className="text-2xl font-black text-tcd-blue">
          Payout Account Verification
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Review student payout details before enabling withdrawals.
        </p>
      </div>

      <span
        className="
          rounded-full
          bg-amber-100
          text-amber-700
          px-3
          py-1
          text-sm
          font-bold
        "
      >
        {pendingPayoutAccounts.length} Pending
      </span>

    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

      {pendingPayoutAccounts.map(
        (account) => {

          const busy =
            actionLoading ===
            `${account.id}-verify-account`;

          return (
            <div
              key={account.id}
              className="
                bg-white
                rounded-3xl
                border
                border-tcd-gold/10
                shadow-sm
                p-6
              "
            >

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                  gap-4
                "
              >

                <div>

                  <p className="text-xs uppercase font-bold text-gray-400">
                    Student
                  </p>

                  <h3 className="text-xl font-black text-tcd-blue mt-1">
                    {account.student?.name || "Unknown Student"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {account.student?.email}
                  </p>

                  <p className="text-sm text-gray-500">
                    {account.student?.mobile}
                  </p>

                </div>

                <span
                  className="
                    rounded-full
                    bg-amber-100
                    text-amber-700
                    px-3
                    py-1
                    text-xs
                    font-bold
                    self-start
                  "
                >
                  Verification Pending
                </span>

              </div>

              <div
                className="
                  bg-[#F7F9FC]
                  rounded-2xl
                  p-4
                  mt-5
                "
              >

                <p className="text-xs uppercase font-bold text-gray-400">
                  {account.account_type} Account
                </p>

                <p className="font-bold mt-2">
                  {account.account_holder_name}
                </p>

                {account.account_type === "UPI" ? (

                  <p className="text-sm text-gray-600 mt-1">
                    UPI ID: {account.upi_id}
                  </p>

                ) : (

                  <>
                    <p className="text-sm text-gray-600 mt-1">
                      Account: {account.bank_account_number}
                    </p>

                    <p className="text-sm text-gray-600">
                      IFSC: {account.ifsc_code}
                    </p>
                  </>

                )}

              </div>

              <button
                disabled={busy}
                onClick={() =>
                  runAction(
                    {
                      action:
                        "VERIFY_PAYOUT_ACCOUNT",

                      payoutAccountId:
                        account.id,
                    },

                    `${account.id}-verify-account`
                  )
                }
                className="
                  mt-5
                  w-full
                  rounded-xl
                  bg-tcd-blue
                  text-white
                  py-3
                  font-bold
                  hover:opacity-90
                  transition
                  disabled:opacity-50
                "
              >
                {busy
                  ? "Verifying..."
                  : "Verify Payout Account"}
              </button>

            </div>
          );
        }
      )}

    </div>

  </section>
)}
          {withdrawals.length === 0 ? (

            <div
              className="
                bg-white
                rounded-3xl
                p-12
                text-center
                shadow-sm
              "
            >
              <h2
                className="
                  text-xl
                  font-bold
                  text-tcd-blue
                "
              >
                No Withdrawal Requests
              </h2>
            </div>

          ) : (

            <div className="space-y-5">

              {withdrawals.map(
                (withdrawal) => {

                  const account =
                    withdrawal
                      .payout_account;

                  const busy =
                    actionLoading?.startsWith(
                      withdrawal.id
                    );

                  return (
                    <div
                      key={
                        withdrawal.id
                      }
                      className="
                        bg-white
                        rounded-3xl
                        border
                        border-gray-100
                        shadow-sm
                        p-5
                        md:p-6
                      "
                    >
                      <div
                        className="
                          flex
                          flex-col
                          lg:flex-row
                          lg:items-start
                          lg:justify-between
                          gap-6
                        "
                      >
                        {/* STUDENT */}

                        <div>

                          <p
                            className="
                              text-xs
                              uppercase
                              text-gray-400
                              font-bold
                            "
                          >
                            Student
                          </p>

                          <h2
                            className="
                              text-xl
                              font-black
                              text-tcd-blue
                              mt-1
                            "
                          >
                            {
                              withdrawal
                                .student
                                ?.name ||
                              "Unknown Student"
                            }
                          </h2>

                          <p className="text-sm text-gray-500">
                            {
                              withdrawal
                                .student
                                ?.email
                            }
                          </p>

                          <p className="text-sm text-gray-500">
                            {
                              withdrawal
                                .student
                                ?.mobile
                            }
                          </p>

                        </div>

                        {/* AMOUNT */}

                        <div>

                          <p
                            className="
                              text-xs
                              uppercase
                              text-gray-400
                              font-bold
                            "
                          >
                            Amount
                          </p>

                          <p
                            className="
                              text-3xl
                              font-black
                              text-tcd-blue
                            "
                          >
                            {formatRupees(
                              withdrawal.amount
                            )}
                          </p>

                          <span
                            className="
                              inline-block
                              mt-2
                              rounded-full
                              bg-[#EEF3FF]
                              px-3
                              py-1
                              text-xs
                              font-bold
                              text-tcd-blue
                            "
                          >
                            {
                              withdrawal.status
                            }
                          </span>

                        </div>
                      </div>

                      {/* PAYOUT ACCOUNT */}

                      <div
                        className="
                          mt-6
                          bg-[#F7F9FC]
                          rounded-2xl
                          p-4
                        "
                      >
                        <p
                          className="
                            text-xs
                            uppercase
                            text-gray-400
                            font-bold
                          "
                        >
                          Payout Account
                        </p>

                        {!account ? (

                          <p
                            className="
                              mt-2
                              text-red-600
                              font-semibold
                            "
                          >
                            No payout account
                            found.
                          </p>

                        ) : (

                          <div
                            className="
                              mt-2
                              flex
                              flex-col
                              md:flex-row
                              md:items-center
                              md:justify-between
                              gap-4
                            "
                          >
                            <div>

                              <p className="font-bold">
                                {
                                  account
                                    .account_holder_name
                                }
                              </p>

                              <p
                                className="
                                  text-sm
                                  text-gray-600
                                "
                              >
                                {account.account_type ===
                                "UPI"
                                  ? account.upi_id
                                  : `${account.bank_account_number} • ${account.ifsc_code}`}
                              </p>

                            </div>

                            {account.is_verified ? (

                              <span
                                className="
                                  text-green-600
                                  font-bold
                                "
                              >
                                Verified
                              </span>

                            ) : (

                              <button
                                disabled={
                                  busy
                                }
                                onClick={() =>
                                  runAction(
                                    {
                                      action:
                                        "VERIFY_PAYOUT_ACCOUNT",

                                      payoutAccountId:
                                        account.id,
                                    },

                                    `${withdrawal.id}-verify`
                                  )
                                }
                                className="
                                  rounded-xl
                                  bg-tcd-blue
                                  text-white
                                  px-4
                                  py-2
                                  font-bold
                                  disabled:opacity-50
                                "
                              >
                                Verify Account
                              </button>

                            )}
                          </div>

                        )}
                      </div>

                      {/* ACTIONS */}

                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          gap-3
                        "
                      >

                        {withdrawal.status ===
                          "PENDING" && (
                          <>
                            <button
                              disabled={
                                busy ||
                                !account
                                  ?.is_verified
                              }
                              onClick={() =>
                                runAction(
                                  {
                                    action:
                                      "APPROVE",

                                    withdrawalId:
                                      withdrawal.id,
                                  },

                                  `${withdrawal.id}-approve`
                                )
                              }
                              className="
                                rounded-xl
                                bg-green-600
                                text-white
                                px-5
                                py-2.5
                                font-bold
                                disabled:opacity-40
                              "
                            >
                              Approve
                            </button>

                            <button
                              disabled={busy}
                              onClick={() => {
                                const remarks =
                                  window.prompt(
                                    "Reason for rejection:"
                                  );

                                if (
                                  remarks ===
                                  null
                                ) {
                                  return;
                                }

                                runAction(
                                  {
                                    action:
                                      "REJECT",

                                    withdrawalId:
                                      withdrawal.id,

                                    remarks,
                                  },

                                  `${withdrawal.id}-reject`
                                );
                              }}
                              className="
                                rounded-xl
                                border
                                border-red-500
                                text-red-600
                                px-5
                                py-2.5
                                font-bold
                                disabled:opacity-40
                              "
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {withdrawal.status ===
                          "APPROVED" && (

                          <button
                            disabled={busy}
                            onClick={() =>
                              runAction(
                                {
                                  action:
                                    "START_PAYOUT",

                                  withdrawalId:
                                    withdrawal.id,
                                },

                                `${withdrawal.id}-start`
                              )
                            }
                            className="
                              rounded-xl
                              bg-tcd-blue
                              text-white
                              px-5
                              py-2.5
                              font-bold
                              disabled:opacity-50
                            "
                          >
                            Start Manual Payout
                          </button>

                        )}

                      </div>

                      {/* COMPLETE PAYOUT */}

                      {withdrawal.status ===
                        "PROCESSING" && (

                        <div
                          className="
                            mt-5
                            border-t
                            pt-5
                          "
                        >
                          <p
                            className="
                              font-bold
                              text-tcd-blue
                            "
                          >
                            Complete Payout
                          </p>

                          <p
                            className="
                              text-sm
                              text-gray-500
                              mt-1
                            "
                          >
                            Send the money first,
                            then enter the actual
                            UTR or transaction
                            reference.
                          </p>

                          <div
                            className="
                              mt-4
                              flex
                              flex-col
                              md:flex-row
                              gap-3
                            "
                          >
                            <input
                              value={
                                payoutReference[
                                  withdrawal.id
                                ] || ""
                              }
                              onChange={(
                                event
                              ) =>
                                setPayoutReference(
                                  (
                                    current
                                  ) => ({
                                    ...current,

                                    [withdrawal.id]:
                                      event
                                        .target
                                        .value,
                                  })
                                )
                              }
                              placeholder="UTR / transaction reference"
                              className="
                                flex-1
                                border
                                rounded-xl
                                px-4
                                py-3
                              "
                            />

                            <button
                              disabled={
                                busy ||
                                !payoutReference[
                                  withdrawal.id
                                ]?.trim()
                              }
                              onClick={() =>
                                runAction(
                                  {
                                    action:
                                      "COMPLETE_PAYOUT",

                                    withdrawalId:
                                      withdrawal.id,

                                    payoutReference:
                                      payoutReference[
                                        withdrawal.id
                                      ],

                                    payoutMethod:
                                      account
                                        ?.account_type,
                                  },

                                  `${withdrawal.id}-complete`
                                )
                              }
                              className="
                                rounded-xl
                                bg-green-600
                                text-white
                                px-5
                                py-3
                                font-bold
                                disabled:opacity-40
                              "
                            >
                              Mark Completed
                            </button>
                          </div>
                        </div>

                      )}

                      {/* COMPLETED REFERENCE */}

                      {withdrawal.status ===
                        "COMPLETED" &&
                        withdrawal
                          .payout_reference && (

                        <div
                          className="
                            mt-5
                            text-sm
                            text-gray-600
                          "
                        >
                          Payout reference:{" "}
                          <span className="font-bold">
                            {
                              withdrawal
                                .payout_reference
                            }
                          </span>
                        </div>

                      )}

                    </div>
                  );
                }
              )}

            </div>

          )}

        </div>
      </main>

    </AdminGuard>
  );
}
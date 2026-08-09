"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import { formatRupees } from "@/lib/finance/formatter";

interface Transaction {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  balance_before: number | null;
  balance_after: number | null;
  transaction_status: string | null;
  reference_number: string | null;
  payment_order_id: string | null;
  gateway_payment_id: string | null;
  balance_source: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

interface FinanceTransactionHistoryProps {
  userId: string;
}

export default function FinanceTransactionHistory({
  userId,
}: FinanceTransactionHistoryProps) {
  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadTransactions = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      const { data, error } =
        await supabase.rpc(
          "get_user_financial_history",
          {
            p_user_id: userId,
            p_limit: 100,
            p_offset: 0,
          }
        );

      if (error) {
        console.error(
          "Finance transaction history error:",
          error
        );

        setError(
          "Unable to load transaction history."
        );

        setTransactions([]);
      } else {
        setTransactions(
          (data ?? []) as Transaction[]
        );
      }

      setLoading(false);
    },
    [userId]
  );

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <section
      className="
        bg-white
        rounded-3xl
        border
        border-gray-100
        shadow-sm
        overflow-hidden
      "
    >
      {/* HEADER */}

      <div
        className="
          p-6
          border-b
          border-gray-100
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h2 className="text-2xl font-black text-tcd-blue">
            Transaction History
          </h2>

          <p className="mt-1 text-sm text-tcd-primary">
            Financial transactions associated with this wallet.
          </p>
        </div>

        <button
          type="button"
          onClick={loadTransactions}
          disabled={loading}
          aria-label="Refresh transaction history"
          className="
            h-10
            w-10
            shrink-0
            rounded-xl
            border
            border-gray-200
            bg-white
            flex
            items-center
            justify-center
            text-tcd-blue
            hover:bg-gray-50
            transition
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
        </button>
      </div>

      {/* CONTENT */}

      {loading ? (
        <div className="p-8 text-center">
          <p className="text-sm text-tcd-primary">
            Loading transactions...
          </p>
        </div>
      ) : error ? (
        <div className="p-8">
          <div className="rounded-2xl bg-red-50 border border-red-100 p-4">
            <p className="text-sm font-semibold text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={loadTransactions}
              className="
                mt-3
                text-sm
                font-bold
                text-tcd-blue
              "
            >
              Try Again
            </button>
          </div>
        </div>
      ) : transactions.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-lg font-black text-tcd-blue">
            No Transactions
          </p>

          <p className="mt-2 text-sm text-tcd-primary">
            This wallet does not have any recorded transactions.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                  Date
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                  Type
                </th>

                <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                  Amount
                </th>

                <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                  Balance Before
                </th>

                <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                  Balance After
                </th>

                <th className="px-5 py-4 text-center text-xs font-black uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                  Reference
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(
                (transaction) => {
                  const isCredit =
                    isCreditTransaction(
                      transaction.type
                    );

                  return (
                    <tr
                      key={transaction.id}
                      className="
                        border-b
                        border-gray-100
                        last:border-b-0
                        hover:bg-gray-50
                        transition-colors
                      "
                    >
                      <td className="px-5 py-4">
                        <div className="text-sm font-semibold text-tcd-blue">
                          {new Date(
                            transaction.created_at
                          ).toLocaleDateString(
                            "en-IN"
                          )}
                        </div>

                        <div className="mt-1 text-xs text-gray-500">
                          {new Date(
                            transaction.created_at
                          ).toLocaleTimeString(
                            "en-IN"
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <TransactionType
                          type={
                            transaction.type
                          }
                        />
                      </td>

                      <td className="px-5 py-4 text-right">
                        <span
                          className={`
                            font-black
                            ${
                              isCredit
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          `}
                        >
                          {isCredit
                            ? "+"
                            : "-"}
                          {formatRupees(
                            transaction.amount
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right text-sm">
                        {transaction.balance_before !==
                        null
                          ? formatRupees(
                              transaction.balance_before
                            )
                          : "-"}
                      </td>

                      <td className="px-5 py-4 text-right text-sm font-bold text-tcd-blue">
                        {transaction.balance_after !==
                        null
                          ? formatRupees(
                              transaction.balance_after
                            )
                          : "-"}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <StatusBadge
                          status={
                            transaction.transaction_status
                          }
                        />
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className="
                            block
                            max-w-[240px]
                            truncate
                            text-xs
                            font-mono
                            text-gray-500
                          "
                          title={
                            transaction.reference_number ||
                            ""
                          }
                        >
                          {transaction.reference_number ||
                            "-"}
                        </span>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* FOOTER */}

      {!loading &&
        !error &&
        transactions.length > 0 && (
          <div
            className="
              border-t
              border-gray-100
              px-6
              py-4
              text-sm
              text-tcd-primary
            "
          >
            Showing{" "}
            <span className="font-bold text-tcd-blue">
              {transactions.length.toLocaleString(
                "en-IN"
              )}
            </span>{" "}
            transactions
          </div>
        )}
    </section>
  );
}

function isCreditTransaction(
  type: string
) {
  const normalized =
    type.toUpperCase();

  return [
    "ADD_MONEY",
    "PRIZE",
    "REFUND",
    "BONUS",
    "REFERRAL",
    "ADMIN_CREDIT",
    "WITHDRAW_REJECTED",
  ].includes(normalized);
}

function TransactionType({
  type,
}: {
  type: string;
}) {
  const normalized =
    type.toUpperCase();

  const label = normalized
    .replace(/_/g, " ");

  return (
    <span
      className="
        inline-flex
        rounded-full
        bg-[#FFF8EA]
        px-3
        py-1
        text-xs
        font-black
        text-tcd-blue
        whitespace-nowrap
      "
    >
      {label}
    </span>
  );
}

function StatusBadge({
  status,
}: {
  status: string | null;
}) {
  const normalized =
    (status || "UNKNOWN").toUpperCase();

  const successful =
    normalized === "SUCCESS" ||
    normalized === "COMPLETED";

  const pending =
    normalized === "PENDING" ||
    normalized === "PROCESSING";

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-black
        whitespace-nowrap
        ${
          successful
            ? "bg-green-50 text-green-700"
            : pending
              ? "bg-yellow-50 text-yellow-700"
              : "bg-red-50 text-red-700"
        }
      `}
    >
      {normalized}
    </span>
  );
}
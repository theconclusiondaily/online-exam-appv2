"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import FinanceHeader from "@/components/admin/finance/layout/FinanceHeader";
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
  withdraw_request_id: string | null;
  balance_source: string | null;
  created_at: string;
}

const TRANSACTION_TYPES = [
  "ALL",
  "ADD_MONEY",
  "ENTRY_FEE",
  "PRIZE",
  "REFUND",
  "WITHDRAW_REQUEST",
  "WITHDRAW_SUCCESS",
  "WITHDRAW_REJECTED",
  "BONUS",
  "REFERRAL",
  "ADMIN_CREDIT",
  "ADMIN_DEBIT",
];

export default function FinanceTransactionsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("ALL");

  const loadTransactions = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      /*
       * We intentionally read the transaction ledger
       * through the database layer.
       *
       * No wallet balance is modified here.
       */

      const { data, error: queryError } =
        await supabase
          .from("tcd_transactions")
          .select(`
            id,
            user_id,
            type,
            amount,
            balance_before,
            balance_after,
            transaction_status,
            reference_number,
            payment_order_id,
            gateway_payment_id,
            withdraw_request_id,
            balance_source,
            created_at
          `)
          .order("created_at", {
            ascending: false,
          })
          .limit(500);

      if (queryError) {
        console.error(
          "Finance transactions error:",
          queryError
        );

        setError(
          "Unable to load the transaction ledger."
        );

        setTransactions([]);
      } else {
        setTransactions(
          (data ?? []) as Transaction[]
        );
      }

      setLoading(false);
    },
    []
  );

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const filteredTransactions =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return transactions.filter(
        (transaction) => {
          const matchesType =
            typeFilter === "ALL" ||
            transaction.type ===
              typeFilter;

          if (!matchesType) {
            return false;
          }

          if (!query) {
            return true;
          }

          return [
            transaction.user_id,
            transaction.id,
            transaction.type,
            transaction.reference_number,
            transaction.payment_order_id,
            transaction.gateway_payment_id,
          ]
            .filter(Boolean)
            .some((value) =>
              String(value)
                .toLowerCase()
                .includes(query)
            );
        }
      );
    }, [
      transactions,
      search,
      typeFilter,
    ]);

  const totalAmount =
    filteredTransactions.reduce(
      (total, transaction) =>
        total +
        Number(transaction.amount || 0),
      0
    );

  return (
    <>
      <FinanceHeader
        title="Transactions"
        subtitle="Complete financial transaction ledger across TCD."
        onRefresh={loadTransactions}
        refreshing={loading}
      />

      {/* FILTERS */}

      <section
        className="
          bg-white
          rounded-3xl
          border
          border-gray-100
          shadow-sm
          p-5
          mb-6
        "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1fr_240px]
            gap-4
          "
        >
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search user ID, transaction ID, reference or payment ID..."
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
            "
          />

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value
              )
            }
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
            {TRANSACTION_TYPES.map(
              (type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type === "ALL"
                    ? "All Transaction Types"
                    : type.replace(
                        /_/g,
                        " "
                      )}
                </option>
              )
            )}
          </select>
        </div>
      </section>

      {/* SUMMARY */}

      <section
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
          mb-6
        "
      >
        <SummaryCard
          title="Transactions Loaded"
          value={transactions.length.toLocaleString(
            "en-IN"
          )}
        />

        <SummaryCard
          title="Transactions Shown"
          value={filteredTransactions.length.toLocaleString(
            "en-IN"
          )}
        />

        <SummaryCard
          title="Transaction Value"
          value={formatRupees(
            totalAmount
          )}
        />
      </section>

      {/* LEDGER */}

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
        {loading ? (
          <div className="p-10 text-center">
            <p className="text-sm text-tcd-primary">
              Loading transaction ledger...
            </p>
          </div>
        ) : error ? (
          <div className="p-8">
            <div className="rounded-2xl bg-red-50 border border-red-100 p-5">
              <p className="font-semibold text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={
                  loadTransactions
                }
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
                <RefreshCw size={15} />
                Try Again
              </button>
            </div>
          </div>
        ) : filteredTransactions.length ===
          0 ? (
          <div className="p-10 text-center">
            <p className="text-lg font-black text-tcd-blue">
              No Transactions Found
            </p>

            <p className="mt-2 text-sm text-tcd-primary">
              No transactions match the current filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1350px] w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                    User
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                    Type
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                    Amount
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
                {filteredTransactions.map(
                  (transaction) => {
                    const credit =
                      isCreditTransaction(
                        transaction.type
                      );

                    return (
                      <tr
                        key={
                          transaction.id
                        }
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
                          <span
                            className="
                              block
                              max-w-[220px]
                              truncate
                              text-xs
                              font-mono
                              text-gray-600
                            "
                            title={
                              transaction.user_id
                            }
                          >
                            {
                              transaction.user_id
                            }
                          </span>
                        </td>

                        <td className="px-5 py-4">
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
                            {transaction.type.replace(
                              /_/g,
                              " "
                            )}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <span
                            className={`
                              font-black
                              ${
                                credit
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            `}
                          >
                            {credit
                              ? "+"
                              : "-"}
                            {formatRupees(
                              transaction.amount
                            )}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right font-bold text-tcd-blue">
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
                              max-w-[260px]
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
      </section>

      {!loading &&
        !error &&
        filteredTransactions.length > 0 && (
          <div className="mt-4 text-sm text-tcd-primary">
            Showing{" "}
            <span className="font-bold text-tcd-blue">
              {filteredTransactions.length.toLocaleString(
                "en-IN"
              )}
            </span>{" "}
            transactions
          </div>
        )}
    </>
  );
}

function SummaryCard({
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

      <p className="mt-3 text-2xl font-black text-tcd-blue">
        {value}
      </p>
    </div>
  );
}

function isCreditTransaction(
  type: string
) {
  return [
    "ADD_MONEY",
    "PRIZE",
    "REFUND",
    "BONUS",
    "REFERRAL",
    "ADMIN_CREDIT",
    "WITHDRAW_REJECTED",
  ].includes(type.toUpperCase());
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
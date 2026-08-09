"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import FinanceHeader from "@/components/admin/finance/layout/FinanceHeader";
import { supabase } from "@/lib/supabase/client";
import { formatRupees } from "@/lib/finance/formatter";

interface Withdrawal {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  reference_number: string | null;
  created_at: string;
  updated_at: string | null;
}

const STATUS_FILTERS = [
  "ALL",
  "APPROVED",
  "PROCESSING",
  "COMPLETED",
  "FAILED",
  "REJECTED",
  "CANCELLED",
];

export default function WithdrawalHistoryPage() {
  const [withdrawals, setWithdrawals] =
    useState<Withdrawal[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const loadHistory = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      const { data, error: queryError } =
        await supabase
          .from("withdraw_requests")
          .select(`
            id,
            user_id,
            amount,
            status,
            reference_number,
            created_at,
            updated_at
          `)
          .in("status", [
            "APPROVED",
            "PROCESSING",
            "COMPLETED",
            "FAILED",
            "REJECTED",
            "CANCELLED",
          ])
          .order("created_at", {
            ascending: false,
          })
          .limit(500);

      if (queryError) {
        console.error(
          "Withdrawal history error:",
          queryError
        );

        setError(
          "Unable to load withdrawal history."
        );

        setWithdrawals([]);
      } else {
        setWithdrawals(
          (data ?? []) as Withdrawal[]
        );
      }

      setLoading(false);
    },
    []
  );

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const filteredWithdrawals =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return withdrawals.filter(
        (withdrawal) => {
          const matchesStatus =
            statusFilter === "ALL" ||
            withdrawal.status ===
              statusFilter;

          if (!matchesStatus) {
            return false;
          }

          if (!query) {
            return true;
          }

          return [
            withdrawal.id,
            withdrawal.user_id,
            withdrawal.reference_number,
            withdrawal.status,
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
      withdrawals,
      search,
      statusFilter,
    ]);

  const totalAmount =
    filteredWithdrawals.reduce(
      (total, withdrawal) =>
        total +
        Number(withdrawal.amount || 0),
      0
    );

  return (
    <>
      <FinanceHeader
        title="Withdrawal History"
        subtitle="Historical withdrawal requests and payout status."
        onRefresh={loadHistory}
        refreshing={loading}
      />

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
          title="Withdrawals Loaded"
          value={withdrawals.length.toLocaleString(
            "en-IN"
          )}
        />

        <SummaryCard
          title="Withdrawals Shown"
          value={filteredWithdrawals.length.toLocaleString(
            "en-IN"
          )}
        />

        <SummaryCard
          title="Withdrawal Value"
          value={formatRupees(
            totalAmount
          )}
        />
      </section>

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
            placeholder="Search withdrawal ID, user ID or reference..."
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
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
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
            {STATUS_FILTERS.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status === "ALL"
                    ? "All Statuses"
                    : status}
                </option>
              )
            )}
          </select>
        </div>
      </section>

      {/* TABLE */}

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
              Loading withdrawal history...
            </p>
          </div>
        ) : error ? (
          <div className="p-8">
            <div
              className="
                rounded-2xl
                border
                border-red-100
                bg-red-50
                p-5
              "
            >
              <p className="font-semibold text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={loadHistory}
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
        ) : filteredWithdrawals.length ===
          0 ? (
          <div className="p-10 text-center">
            <p className="text-lg font-black text-tcd-blue">
              No Withdrawal History
            </p>

            <p className="mt-2 text-sm text-tcd-primary">
              No withdrawals match the current filters.
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
                    Withdrawal ID
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                    User
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                    Amount
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
                {filteredWithdrawals.map(
                  (withdrawal) => (
                    <tr
                      key={withdrawal.id}
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
                            withdrawal.created_at
                          ).toLocaleDateString(
                            "en-IN"
                          )}
                        </div>

                        <div className="mt-1 text-xs text-gray-500">
                          {new Date(
                            withdrawal.created_at
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
                          title={withdrawal.id}
                        >
                          {withdrawal.id}
                        </span>
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
                            withdrawal.user_id
                          }
                        >
                          {withdrawal.user_id}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <span className="font-black text-tcd-blue">
                          {formatRupees(
                            withdrawal.amount
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <StatusBadge
                          status={
                            withdrawal.status
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
                            withdrawal.reference_number ||
                            ""
                          }
                        >
                          {withdrawal.reference_number ||
                            "-"}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {!loading &&
        !error &&
        filteredWithdrawals.length > 0 && (
          <div className="mt-4 text-sm text-tcd-primary">
            Showing{" "}
            <span className="font-bold text-tcd-blue">
              {filteredWithdrawals.length.toLocaleString(
                "en-IN"
              )}
            </span>{" "}
            withdrawals
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

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalized =
    status.toUpperCase();

  const successful =
    normalized === "COMPLETED";

  const processing =
    normalized === "PROCESSING" ||
    normalized === "APPROVED";

  const failed =
    normalized === "FAILED" ||
    normalized === "REJECTED" ||
    normalized === "CANCELLED";

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
            : processing
              ? "bg-yellow-50 text-yellow-700"
              : failed
                ? "bg-red-50 text-red-700"
                : "bg-gray-100 text-gray-700"
        }
      `}
    >
      {normalized}
    </span>
  );
}
"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import FinanceHeader from "@/components/admin/finance/layout/FinanceHeader";
import { supabase } from "@/lib/supabase/client";
import { formatRupees } from "@/lib/finance/formatter";
import WithdrawalReview from "@/components/admin/finance/withdrawals/WithdrawalReview";
import PayoutProcessing from "@/components/admin/finance/withdrawals/PayoutProcessing";


interface Withdrawal {
  withdraw_request_id: string;
  user_id: string;
  amount: number;
  reference_number: string | null;
  status: string;
  created_at: string;
}

export default function FinanceWithdrawalsPage() {
  const [withdrawals, setWithdrawals] =
    useState<Withdrawal[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState("");
const [selectedWithdrawal, setSelectedWithdrawal] =
  useState<Withdrawal | null>(null);

  const [approvedWithdrawal, setApprovedWithdrawal] =
  useState<Withdrawal | null>(null);

  const loadWithdrawals = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      const { data, error: rpcError } =
        await supabase.rpc(
          "get_pending_withdrawals"
        );

      if (rpcError) {
        console.error(
          "Pending withdrawals error:",
          rpcError
        );

        setError(
          "Unable to load pending withdrawals."
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
    loadWithdrawals();
  }, [loadWithdrawals]);

  const filteredWithdrawals =
    withdrawals.filter((withdrawal) => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return true;
      }

      return [
        withdrawal.user_id,
        withdrawal.withdraw_request_id,
        withdrawal.reference_number,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(query)
        );
    });

  const totalPendingAmount =
    filteredWithdrawals.reduce(
      (total, withdrawal) =>
        total +
        Number(withdrawal.amount || 0),
      0
    );

  return (
    <>
      <FinanceHeader
        title="Withdrawals"
        subtitle="Review pending withdrawal requests and manage payout operations."
        onRefresh={loadWithdrawals}
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
          title="Pending Requests"
          value={withdrawals.length.toLocaleString(
            "en-IN"
          )}
        />

        <SummaryCard
          title="Requests Shown"
          value={filteredWithdrawals.length.toLocaleString(
            "en-IN"
          )}
        />

        <SummaryCard
          title="Pending Amount"
          value={formatRupees(
            totalPendingAmount
          )}
        />
      </section>

      {/* SEARCH */}

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
        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search user ID, withdrawal ID or reference number..."
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
      </section>

      {/* WITHDRAWALS */}

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
              Loading withdrawal requests...
            </p>
          </div>
        ) : error ? (
          <div className="p-8">
            <div
              className="
                rounded-2xl
                bg-red-50
                border
                border-red-100
                p-5
              "
            >
              <p className="font-semibold text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={
                  loadWithdrawals
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
        ) : filteredWithdrawals.length ===
          0 ? (
          <div className="p-10 text-center">
            <p className="text-lg font-black text-tcd-blue">
              No Pending Withdrawals
            </p>

            <p className="mt-2 text-sm text-tcd-primary">
              There are currently no pending withdrawal requests.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1050px] w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                    Requested
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                    User
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                    Reference
                  </th>

                  <th className="px-5 py-4 text-center text-xs font-black uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-center text-xs font-black uppercase tracking-wide text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredWithdrawals.map(
                  (withdrawal) => (
                    <tr
                      key={
                        withdrawal.withdraw_request_id
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
                            max-w-[230px]
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

                      <td className="px-5 py-4">
                        <span
                          className="
                            block
                            max-w-[250px]
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

                      <td className="px-5 py-4 text-center">
                        <StatusBadge
                          status={
                            withdrawal.status
                          }
                        />
                      </td>

                      <td className="px-5 py-4 text-center">
                        <button
  type="button"
  onClick={() =>
    setSelectedWithdrawal(withdrawal)
  }
  className="
    rounded-xl
    bg-tcd-blue
    px-4
    py-2
    text-sm
    font-bold
    text-white
    hover:opacity-90
    transition
  "
>
  Review
</button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
     {selectedWithdrawal && (
  <WithdrawalReview
    withdrawal={selectedWithdrawal}
    onClose={() =>
      setSelectedWithdrawal(null)
    }
    onSuccess={loadWithdrawals}
    onApproved={(withdrawal) =>
      setApprovedWithdrawal(withdrawal)
    }
  />
)}
{approvedWithdrawal && (
  <PayoutProcessing
    withdrawal={approvedWithdrawal}
    onClose={() =>
      setApprovedWithdrawal(null)
    }
    onSuccess={() => {
      setApprovedWithdrawal(null);
      loadWithdrawals();
    }}
  />
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

  return (
    <span
      className="
        inline-flex
        rounded-full
        bg-yellow-50
        px-3
        py-1
        text-xs
        font-black
        text-yellow-700
      "
    >
      {normalized}
    </span>
    
  );
  
}
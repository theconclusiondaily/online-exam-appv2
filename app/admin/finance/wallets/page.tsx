"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import FinanceHeader from "@/components/admin/finance/layout/FinanceHeader";
import { supabase } from "@/lib/supabase/client";
import { formatRupees } from "@/lib/finance/formatter";

interface Wallet {
  user_id: string;
  available_balance: number;
  locked_balance: number;
  bonus_balance: number;
  lifetime_added: number;
  lifetime_won: number;
  lifetime_spent: number;
  lifetime_withdrawn: number;
  lifetime_refunded: number;
  status: string | null;
  currency: string | null;
  created_at: string | null;
}

export default function FinanceWalletsPage() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadWallets();
  }, []);

  async function loadWallets() {
    setLoading(true);

    const { data, error } = await supabase
      .from("tcd_wallets")
      .select(`
        user_id,
        available_balance,
        locked_balance,
        bonus_balance,
        lifetime_added,
        lifetime_won,
        lifetime_spent,
        lifetime_withdrawn,
        lifetime_refunded,
        status,
        currency,
        created_at
      `)
      .order("available_balance", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Finance wallets error:",
        error
      );

      setWallets([]);
    } else {
      setWallets(
        (data ?? []) as Wallet[]
      );
    }

    setLoading(false);
  }

  const filteredWallets = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return wallets;
    }

    return wallets.filter((wallet) =>
      wallet.user_id
        .toLowerCase()
        .includes(query)
    );
  }, [wallets, search]);

  return (
    <>
      <FinanceHeader
        title="User Wallets"
        subtitle="View wallet balances and financial activity across TCD."
        onRefresh={loadWallets}
        refreshing={loading}
      />

      {/* SEARCH */}

      <section className="mb-6">
        <div
          className="
            bg-white
            rounded-3xl
            border
            border-gray-100
            shadow-sm
            p-5
          "
        >
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by user ID..."
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
        </div>
      </section>

      {/* SUMMARY */}

      <section
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
          mb-6
        "
      >
        <SummaryCard
          title="Total Wallets"
          value={wallets.length.toLocaleString("en-IN")}
        />

        <SummaryCard
          title="Total Available"
          value={formatRupees(
            wallets.reduce(
              (total, wallet) =>
                total +
                Number(
                  wallet.available_balance || 0
                ),
              0
            )
          )}
        />

        <SummaryCard
          title="Total Locked"
          value={formatRupees(
            wallets.reduce(
              (total, wallet) =>
                total +
                Number(
                  wallet.locked_balance || 0
                ),
              0
            )
          )}
        />
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
              Loading wallets...
            </p>
          </div>
        ) : filteredWallets.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-lg font-bold text-tcd-blue">
              No wallets found
            </p>

            <p className="mt-2 text-sm text-tcd-primary">
              Try changing your search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1000px] w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                    User ID
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                    Available
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                    Locked
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                    Bonus
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                    Lifetime Won
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
                {filteredWallets.map(
                  (wallet) => (
                    <tr
                      key={wallet.user_id}
                      className="
                        border-b
                        border-gray-100
                        last:border-b-0
                        hover:bg-gray-50
                        transition-colors
                      "
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-tcd-blue">
                          {wallet.user_id}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-right font-bold text-tcd-blue">
                        {formatRupees(
                          wallet.available_balance
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        {formatRupees(
                          wallet.locked_balance
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        {formatRupees(
                          wallet.bonus_balance
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        {formatRupees(
                          wallet.lifetime_won
                        )}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <StatusBadge
                          status={
                            wallet.status
                          }
                        />
                      </td>

                      <td className="px-5 py-4 text-center">
                        <Link
                          href={`/admin/finance/wallets/${wallet.user_id}`}
                          className="
                            inline-flex
                            items-center
                            justify-center
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
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="mt-4 text-sm text-tcd-primary">
        Showing{" "}
        <span className="font-bold text-tcd-blue">
          {filteredWallets.length.toLocaleString(
            "en-IN"
          )}
        </span>{" "}
        of{" "}
        <span className="font-bold text-tcd-blue">
          {wallets.length.toLocaleString(
            "en-IN"
          )}
        </span>{" "}
        wallets
      </div>
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
  status: string | null;
}) {
  const normalized =
    (status ?? "ACTIVE").toUpperCase();

  const isActive =
    normalized === "ACTIVE";

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-bold
        ${
          isActive
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-700"
        }
      `}
    >
      {normalized}
    </span>
  );
}
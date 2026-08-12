"use client";

import {
  Search,
  RefreshCw,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronRight,
} from "lucide-react";

import { useCallback, useEffect, useState } from "react";

import {
  getFinanceUsers,
  type FinanceUser,
} from "@/lib/finance/adminUsers";

import { formatRupees } from "@/lib/finance/formatter";

interface FinanceUsersProps {
  onSelectUser?: (user: FinanceUser) => void;
  refreshTrigger?: number;
}

export default function FinanceUsers({
  onSelectUser,
  refreshTrigger = 0,
}: FinanceUsersProps) {

  const [users, setUsers] =
    useState<FinanceUser[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadUsers = useCallback(
    
    async (searchValue = search) => {
      setLoading(true);
      setError(null);

      try {
        const result =
          await getFinanceUsers({
            search: searchValue,
            limit: 50,
            offset: 0,
          });

        setUsers(result);
      } catch (err) {
        console.error(
          "FINANCE USERS LOAD ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load users."
        );
      } finally {
        setLoading(false);
      }
    },
    [search]
  );

 useEffect(() => {
  loadUsers(search);
}, [loadUsers, refreshTrigger]);

  const handleSearch = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    loadUsers(search);
  };

  return (
    <section className="overflow-hidden rounded-[28px] border border-[#DCE4F2] bg-white shadow-[0_12px_40px_rgba(27,55,95,0.06)]">

      {/* HEADER */}

      <div className="border-b border-[#E9EEF5] px-5 py-5 md:px-7">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D8A63C]" />

              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#94A3B8]">
                Wallet Administration
              </p>
            </div>

            <h2 className="mt-1 text-xl font-black text-[#294D86]">
              User Financial Management
            </h2>

            <p className="mt-1 text-xs font-medium text-[#94A3B8]">
              Select a user to manage their wallet.
            </p>
          </div>

          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-md gap-2"
          >
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search name, email or user ID"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#DCE4F2]
                  bg-[#F8FAFD]
                  pl-9
                  pr-3
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

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                h-11
                items-center
                justify-center
                rounded-xl
                bg-[#294D86]
                px-4
                text-xs
                font-black
                text-white
                transition
                hover:bg-[#213F6F]
                disabled:opacity-50
              "
            >
              Search
            </button>

            <button
              type="button"
              onClick={() => loadUsers(search)}
              disabled={loading}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-[#DCE4F2]
                bg-white
                text-[#294D86]
                transition
                hover:bg-[#F8FAFD]
                disabled:opacity-50
              "
              aria-label="Refresh users"
            >
              <RefreshCw
                size={16}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
            </button>
          </form>
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className="border-b border-red-100 bg-red-50 px-5 py-4 md:px-7">
          <p className="text-sm font-bold text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[850px]">

          <thead>
            <tr className="border-b border-[#E9EEF5] bg-[#F8FAFD]">

              <th className="px-5 py-3 text-left text-[9px] font-black uppercase tracking-[0.12em] text-[#94A3B8] md:px-7">
                User
              </th>

              <th className="px-4 py-3 text-right text-[9px] font-black uppercase tracking-[0.12em] text-[#94A3B8]">
                Available
              </th>

              <th className="px-4 py-3 text-right text-[9px] font-black uppercase tracking-[0.12em] text-[#94A3B8]">
                Locked
              </th>

              <th className="px-4 py-3 text-right text-[9px] font-black uppercase tracking-[0.12em] text-[#94A3B8]">
                Bonus
              </th>

              <th className="px-4 py-3 text-center text-[9px] font-black uppercase tracking-[0.12em] text-[#94A3B8]">
                Status
              </th>

              <th className="px-5 py-3 text-right text-[9px] font-black uppercase tracking-[0.12em] text-[#94A3B8] md:px-7">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {loading ? (
              Array.from({ length: 6 }).map(
                (_, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#EEF1F6]"
                  >
                    <td
                      colSpan={6}
                      className="px-5 py-5 md:px-7"
                    >
                      <div className="h-10 animate-pulse rounded-xl bg-[#F1F4F8]" />
                    </td>
                  </tr>
                )
              )
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-16 text-center md:px-7"
                >
                  <Wallet
                    size={28}
                    className="mx-auto text-[#CBD5E1]"
                  />

                  <p className="mt-3 text-sm font-black text-[#64748B]">
                    No users found
                  </p>

                  <p className="mt-1 text-xs text-[#A0AEC0]">
                    Try another name, email or user ID.
                  </p>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.user_id}
                  className="
                    group
                    border-b
                    border-[#EEF1F6]
                    transition
                    hover:bg-[#FAFBFD]
                  "
                >

                  {/* USER */}

                  <td className="px-5 py-4 md:px-7">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF3FB] text-xs font-black text-[#294D86]">
                        {user.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-black text-[#294D86]">
                          {user.name}
                        </p>

                        <p className="truncate text-[10px] font-medium text-[#94A3B8]">
                          {user.email}
                        </p>

                      </div>
                    </div>
                  </td>

                  {/* AVAILABLE */}

                  <td className="px-4 py-4 text-right">
                    <p className="text-sm font-black text-[#294D86]">
                      {formatRupees(
                        user.available_balance
                      )}
                    </p>
                  </td>

                  {/* LOCKED */}

                  <td className="px-4 py-4 text-right">
                    <p className="text-sm font-bold text-[#64748B]">
                      {formatRupees(
                        user.locked_balance
                      )}
                    </p>
                  </td>

                  {/* BONUS */}

                  <td className="px-4 py-4 text-right">
                    <p className="text-sm font-bold text-[#C99426]">
                      {formatRupees(
                        user.bonus_balance
                      )}
                    </p>
                  </td>

                  {/* STATUS */}

                  <td className="px-4 py-4 text-center">

                    <span
                      className={`
                        inline-flex
                        items-center
                        rounded-full
                        px-2.5
                        py-1
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.1em]
                        ${
                          user.wallet_status ===
                          "NO_WALLET"
                            ? "bg-slate-100 text-slate-500"
                            : "bg-emerald-50 text-emerald-600"
                        }
                      `}
                    >
                      {user.wallet_status}
                    </span>

                  </td>

                  {/* ACTION */}

                  <td className="px-5 py-4 text-right md:px-7">

                    <button
                      type="button"
                      onClick={() =>
                        onSelectUser?.(user)
                      }
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-xl
                        border
                        border-[#DCE4F2]
                        bg-white
                        px-3
                        py-2
                        text-[10px]
                        font-black
                        text-[#294D86]
                        transition
                        hover:border-[#294D86]/20
                        hover:bg-[#EEF3FB]
                      "
                    >
                      Manage

                      <ChevronRight
                        size={13}
                      />
                    </button>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>
      </div>

      {/* FOOTER */}

      {!loading && users.length > 0 && (
        <div className="flex flex-col gap-2 bg-[#F8FAFD] px-5 py-3 sm:flex-row sm:items-center sm:justify-between md:px-7">

          <p className="text-[10px] font-medium text-[#94A3B8]">
            Showing {users.length} users
          </p>

          <p className="text-[10px] font-bold text-[#B0BAC8]">
            Balances shown in Indian Rupees
          </p>

        </div>
      )}

    </section>
  );
}
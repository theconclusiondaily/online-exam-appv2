"use client";

import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Gift,
  Plus,
  Wallet,
} from "lucide-react";

const transactions = [
  {
    title: "NEET Physics Prize",
    amount: "+500 Credits",
    time: "2 min ago",
    type: "credit",
  },
  {
    title: "Exam Entry Fee",
    amount: "-50 Credits",
    time: "Today",
    type: "debit",
  },
  {
    title: "Referral Bonus",
    amount: "+100 Credits",
    time: "Yesterday",
    type: "bonus",
  },
  {
    title: "Wallet Recharge",
    amount: "+1000 Credits",
    time: "Yesterday",
    type: "add",
  },
];

export default function WalletPreview() {
  return (
    <div className="space-y-4">
      {/* ================================================================ */}
      {/* WALLET CARD                                                      */}
      {/* ================================================================ */}

      <motion.div
        whileHover={{ y: -2 }}
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-white/10
          bg-gradient-to-br
          from-[#334a7d]
          via-[#243a69]
          to-[#172747]
          p-6
          text-white
          shadow-2xl
        "
      >
        {/* Wallet Header */}

        <div className="flex items-start justify-between">
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-brand-gold
              "
            >
              TCD Wallet
            </p>

            <h2
              className="
                mt-2
                text-4xl
                font-black
                tracking-tight
                text-white
                sm:text-5xl
              "
            >
              763.5
            </h2>

            <p className="mt-1 text-sm font-medium text-white/65">
              Available Credits
            </p>
          </div>

          {/* Wallet Icon */}

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-brand-gold/50
              bg-white/[0.08]
              text-brand-gold
              sm:h-16
              sm:w-16
            "
          >
            <Wallet className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
        </div>

        {/* Balance Cards */}

        <div className="mt-6 grid grid-cols-3 gap-3">
          <BalanceCard
            label="Available"
            value="763.5"
          />

          <BalanceCard
            label="Locked"
            value="120"
          />

          <BalanceCard
            label="Bonus"
            value="85"
          />
        </div>
      </motion.div>

      {/* ================================================================ */}
      {/* WALLET ACTIONS                                                   */}
      {/* ================================================================ */}

      <div className="grid grid-cols-3 gap-3">
        <ActionButton
          icon={<Plus className="h-5 w-5" />}
          label="Add Money"
        />

        <ActionButton
          icon={<ArrowUpRight className="h-5 w-5" />}
          label="Withdraw"
        />

        <ActionButton
          icon={<Gift className="h-5 w-5" />}
          label="Rewards"
        />
      </div>

      {/* ================================================================ */}
      {/* RECENT TRANSACTIONS                                              */}
      {/* ================================================================ */}

      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-white/10
          bg-[#0b1426]
          p-5
          shadow-xl
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-brand-gold
              "
            >
              Recent Activity
            </p>

            <h3
              className="
                mt-1
                text-2xl
                font-black
                tracking-tight
                text-white
              "
            >
              Transactions
            </h3>
          </div>

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-brand-gold/50
              bg-brand-gold/[0.04]
              text-brand-gold
            "
          >
            <CreditCard className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {transactions.map((item) => (
            <TransactionRow
              key={item.title + item.time}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* BALANCE CARD                                                             */
/* ========================================================================= */

function BalanceCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.08]
        px-3
        py-3
        backdrop-blur-xl
      "
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50 sm:text-xs">
        {label}
      </p>

      <h3 className="mt-1 text-lg font-black text-white sm:text-xl">
        {value}
      </h3>
    </div>
  );
}

/* ========================================================================= */
/* ACTION BUTTON                                                            */
/* ========================================================================= */

function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.button
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="
        flex
        min-w-0
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        border-white/10
        bg-[#0b1426]
        px-2
        py-4
        text-sm
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:border-brand-gold/30
        hover:bg-[#101b31]
        sm:gap-3
      "
    >
      <span className="shrink-0 text-brand-gold">
        {icon}
      </span>

      <span className="truncate">
        {label}
      </span>
    </motion.button>
  );
}

/* ========================================================================= */
/* TRANSACTION ROW                                                          */
/* ========================================================================= */

function TransactionRow({
  title,
  amount,
  time,
  type,
}: {
  title: string;
  amount: string;
  time: string;
  type: string;
}) {
  const positive =
    type === "credit" ||
    type === "bonus" ||
    type === "add";

  return (
    <motion.div
      whileHover={{
        x: 3,
      }}
      className="
        flex
        items-center
        justify-between
        gap-3
        rounded-2xl
        border
        border-white/[0.06]
        bg-white/[0.025]
        px-3
        py-3
        transition-colors
        hover:bg-white/[0.05]
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        {/* Transaction Icon */}

        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            ${
              positive
                ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-400"
                : "border-red-400/25 bg-red-400/10 text-red-400"
            }
          `}
        >
          {positive ? (
            <ArrowDownLeft className="h-4 w-4" />
          ) : (
            <ArrowUpRight className="h-4 w-4" />
          )}
        </div>

        {/* Transaction Details */}

        <div className="min-w-0">
          <h4 className="truncate text-xs font-semibold text-white sm:text-sm">
            {title}
          </h4>

          <p className="mt-0.5 text-[10px] text-white/40 sm:text-xs">
            {time}
          </p>
        </div>
      </div>

      {/* Amount */}

      <span
        className={`
          shrink-0
          text-xs
          font-bold
          sm:text-sm
          ${
            positive
              ? "text-emerald-400"
              : "text-red-400"
          }
        `}
      >
        {amount}
      </span>
    </motion.div>
  );
}
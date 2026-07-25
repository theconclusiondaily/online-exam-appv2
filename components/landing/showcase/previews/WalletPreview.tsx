"use client";

import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Gift,
  Plus,
  Wallet,
  Lock,
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
    <div className="space-y-6">

      {/* Wallet Header */}

      <motion.div
        whileHover={{ y: -4 }}
        className="
          overflow-hidden
          rounded-[32px]
          bg-gradient-to-br
          from-brand
          via-brand-light
          to-brand
          p-8
          text-white
          shadow-xl
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm opacity-80">
              TCD Wallet
            </p>

            <h2 className="mt-3 text-5xl font-black">
              763.5
            </h2>

            <p className="mt-2 opacity-80">
              Available Credits
            </p>

          </div>

          <div className="rounded-3xl bg-white/20 p-5 backdrop-blur-xl">
            <Wallet className="h-10 w-10" />
          </div>

        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">

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

      {/* Actions */}

      <div className="grid gap-4 md:grid-cols-3">

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

      {/* Recent Transactions */}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Recent Activity
            </p>

            <h3 className="mt-1 text-2xl font-black text-brand">
              Transactions
            </h3>

          </div>

          <CreditCard className="h-8 w-8 text-brand" />

        </div>

        <div className="mt-6 space-y-4">

          {transactions.map((item) => (
            <TransactionRow
              key={item.title + item.time}
              {...item}
            />
          ))}

        </div>

      </div>

      {/* Wallet Summary */}

      <div className="grid gap-5 md:grid-cols-3">

        <SummaryCard
          icon={<Wallet />}
          title="Lifetime Won"
          value="8,250 Credits"
        />

        <SummaryCard
          icon={<Gift />}
          title="Bonuses"
          value="1,420 Credits"
        />

        <SummaryCard
          icon={<Lock />}
          title="Locked Balance"
          value="120 Credits"
        />

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */

function BalanceCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-lg">

      <p className="text-sm opacity-80">
        {label}
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        {value}
      </h3>

    </div>
  );
}

/* -------------------------------------------------------------------------- */

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
        y: -4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="
        flex
        items-center
        justify-center
        gap-3
        rounded-3xl
        border
        border-gray-200
        bg-white
        py-5
        font-semibold
        text-brand
        shadow-sm
      "
    >
      {icon}
      {label}
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */

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
        x: 4,
      }}
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-gray-100
        p-4
      "
    >

      <div className="flex items-center gap-4">

        <div
          className={`rounded-xl p-3 ${
            positive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {positive ? (
            <ArrowDownLeft className="h-5 w-5" />
          ) : (
            <ArrowUpRight className="h-5 w-5" />
          )}
        </div>

        <div>

          <h4 className="font-semibold text-brand">
            {title}
          </h4>

          <p className="text-sm text-gray-500">
            {time}
          </p>

        </div>

      </div>

      <span
        className={`font-bold ${
          positive
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {amount}
      </span>

    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function SummaryCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-black text-brand">
            {value}
          </h3>

        </div>

        <div className="rounded-2xl bg-brand/10 p-3 text-brand">
          {icon}
        </div>

      </div>

    </motion.div>
  );
}
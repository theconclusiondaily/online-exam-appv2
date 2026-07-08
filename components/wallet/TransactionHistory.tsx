"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";
import { getTransactions } from "@/services/wallet.service";
import { formatRupees } from "@/lib/finance/formatter";

interface Transaction {
  id: string;
  transaction_type: string;
  amount: number;
  transaction_status: string;
  created_at: string;
  reference_number: string | null;
}

export default function TransactionHistory() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadTransactions() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await getTransactions(user.id);

      setTransactions(data ?? []);
      setLoading(false);

    }

    loadTransactions();

  }, []);

  if (loading) {

    return (

      <div className="bg-white rounded-3xl shadow-xl p-6 mt-6">

        <p className="text-gray-500">
          Loading transactions...
        </p>

      </div>

    );

  }

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 mt-6">

      <h2 className="text-2xl font-bold mb-5">
        Transaction History
      </h2>

      {transactions.length === 0 ? (

        <p className="text-gray-500">
          No transactions found.
        </p>

      ) : (

        <div className="space-y-4">

          {transactions.map((tx) => (

            <div
              key={tx.id}
              className="flex justify-between items-center border-b pb-3"
            >

              <div>

                <p className="font-semibold capitalize">
                  {tx.transaction_type.replaceAll("_", " ")}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(tx.created_at).toLocaleString()}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold">

                  {formatRupees(tx.amount)}

                </p>

                <p className="text-sm text-green-600">

                  {tx.transaction_status}

                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}
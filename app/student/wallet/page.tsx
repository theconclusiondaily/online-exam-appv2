"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleGuard from "@/components/auth/RoleGuard";

import WalletCard from "@/components/wallet/WalletCard";
import TransactionHistory from "@/components/wallet/TransactionHistory";

export default function StudentWalletPage() {

  return (

    <ProtectedRoute>

      <RoleGuard allowedRole="student">

        <div className="min-h-screen bg-gray-100 p-6">

          <div className="max-w-6xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">

              My Wallet

            </h1>

            <WalletCard />

            <TransactionHistory />

          </div>

        </div>

      </RoleGuard>

    </ProtectedRoute>

  );

}
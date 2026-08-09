import type { ReactNode } from "react";

import FinanceHeader from "@/components/admin/finance/layout/FinanceHeader";
import FinanceWalletDetails from "@/components/admin/finance/wallets/FinanceWalletDetails";

interface WalletDetailsPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function WalletDetailsPage({
  params,
}: WalletDetailsPageProps) {
  const { userId } = await params;

  return (
    <>
      <FinanceHeader
        title="Wallet Details"
        subtitle="View the complete financial profile of this TCD wallet."
      />

      <FinanceWalletDetails userId={userId} />
    </>
  );
}
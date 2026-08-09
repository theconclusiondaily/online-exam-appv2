import type { ReactNode } from "react";

import FinanceSidebar from "@/components/admin/finance/layout/FinanceSidebar";
import FinanceBreadcrumb from "@/components/admin/finance/layout/FinanceBreadcrumb";

interface FinanceLayoutProps {
  children: ReactNode;
}

export default function FinanceLayout({
  children,
}: FinanceLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <FinanceSidebar />

      <main
        className="
          min-h-screen
          ml-72
          p-6
          md:p-8
          overflow-x-hidden
        "
      >
        <FinanceBreadcrumb />

        {children}
      </main>
    </div>
  );
}
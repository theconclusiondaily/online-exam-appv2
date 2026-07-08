import { supabase } from "@/lib/supabase/client";
export async function adminCredit({
  userId,
  amount,
  reason,
  adminUserId,
}: {
  userId: string;
  amount: number;
  reason: string;
  adminUserId: string;
}) {
  return await supabase.rpc(
    "admin_credit_wallet",
    {
      p_user_id: userId,
      p_amount: amount,
      p_reason: reason,
      p_admin_user_id: adminUserId,
    }
  );
}
export async function adminDebit({
  userId,
  amount,
  reason,
  adminUserId,
}: {
  userId: string;
  amount: number;
  reason: string;
  adminUserId: string;
}) {
  return await supabase.rpc(
    "admin_debit_wallet",
    {
      p_user_id: userId,
      p_amount: amount,
      p_reason: reason,
      p_admin_user_id: adminUserId,
    }
  );
}
export async function getPendingWithdrawals() {
  return await supabase.rpc(
    "get_pending_withdrawals"
  );
}
export async function getFinanceDashboard() {
  return await supabase.rpc(
    "get_finance_dashboard"
  );
}

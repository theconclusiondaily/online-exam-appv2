import { supabase } from "@/lib/supabase/client";
export async function getWalletSummary(
  userId: string
) {
  return await supabase.rpc(
    "get_wallet_summary",
    {
      p_user_id: userId,
    }
  );
}
export async function getWalletHistory(
  userId: string,
  limit = 100,
  offset = 0
) {
  return await supabase.rpc(
    "get_user_financial_history",
    {
      p_user_id: userId,
      p_limit: limit,
      p_offset: offset,
    }
  );
}
export async function getDashboardSummary() {
  return await supabase.rpc(
    "get_finance_dashboard"
  );
}

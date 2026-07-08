import { supabase } from "@/lib/supabase/client";
export async function getWallet(userId: string) {
  if (!userId) {
    return {
      data: null,
      error: "User ID is required",
    };
  }

  return await supabase
    .rpc("get_wallet_summary", {
      p_user_id: userId,
    });
}
export async function getTransactions(
  userId: string,
  limit = 100,
  offset = 0
) {
  if (!userId) {
    return {
      data: null,
      error: "User ID is required",
    };
  }

  return await supabase.rpc(
    "get_user_financial_history",
    {
      p_user_id: userId,
      p_limit: limit,
      p_offset: offset,
    }
  );
}
export async function creditWallet({
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
export async function debitWallet({
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

import { supabase } from "@/lib/supabase/client";
export async function requestWithdrawal({
  userId,
  amount,
}: {
  userId: string;
  amount: number;
}) {
  return await supabase.rpc(
    "request_withdrawal",
    {
      p_user_id: userId,
      p_amount: amount,
    }
  );
}
export async function approveWithdrawal({
  withdrawRequestId,
  adminUserId,
}: {
  withdrawRequestId: string;
  adminUserId: string;
}) {
  return await supabase.rpc(
    "approve_withdrawal",
    {
      p_withdraw_request_id: withdrawRequestId,
      p_admin_user_id: adminUserId,
    }
  );
}
export async function startPayout({
  withdrawRequestId,
}: {
  withdrawRequestId: string;
}) {
  return await supabase.rpc(
    "start_payout",
    {
      p_withdraw_request_id: withdrawRequestId,
    }
  );
}
export async function completePayout({
  payoutId,
  razorpayPayoutId,
}: {
  payoutId: string;
  razorpayPayoutId: string;
}) {
  return await supabase.rpc(
    "complete_payout",
    {
      p_payout_id: payoutId,
      p_gateway_payout_id: razorpayPayoutId,
    }
  );
}
export async function failPayout({
  payoutId,
  reason,
}: {
  payoutId: string;
  reason: string;
}) {
  return await supabase.rpc(
    "fail_payout",
    {
      p_payout_id: payoutId,
      p_failure_reason: reason,
    }
  );
}
export async function getWithdrawals(
  userId: string
) {
  return await supabase
    .from("withdraw_requests")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });
}
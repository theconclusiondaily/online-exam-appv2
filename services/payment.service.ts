import { supabase } from "@/lib/supabase/client";
export async function createPaymentOrder({
  amount,
}: {
  amount: number;
}) {
  return await supabase.rpc(
    "create_payment_order",
    {
      p_amount: amount,
    }
  );
}
export async function verifyPayment({
  paymentOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: {
  paymentOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  return await supabase.rpc(
    "verify_payment",
    {
      p_payment_order_id: paymentOrderId,
      p_gateway_payment_id: razorpayPaymentId,
      p_signature: razorpaySignature,
    }
  );
}
export async function getPaymentOrder(
  orderId: string
) {
  return await supabase
    .from("payment_orders")
    .select("*")
    .eq("id", orderId)
    .maybeSingle();
}
export async function getPaymentHistory(
  userId: string
) {
  return await supabase
    .from("payment_orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });
}

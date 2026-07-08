import { supabase } from "@/lib/supabase/client";
export async function distributePrize({
  userId,
  examId,
  amount,
  referenceNumber,
  adminUserId,
  metadata = {},
}: {
  userId: string;
  examId: string;
  amount: number;
  referenceNumber: string;
  adminUserId?: string;
  metadata?: Record<string, any>;
}) {
  return await supabase.rpc(
    "distribute_prize",
    {
      p_user_id: userId,
      p_exam_id: examId,
      p_amount: amount,
      p_reference_number: referenceNumber,
      p_created_by: adminUserId ?? null,
      p_metadata: metadata,
    }
  );
}
export function generatePrizeReference(
  examId: string,
  userId: string
) {
  return `PRIZE-${examId}-${userId}`;
}

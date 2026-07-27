// lib/landing/getRecentWinners.ts

import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface RecentWinner {
  userId: string;
  name: string;
  avatarUrl: string | null;
  examTitle: string;
  prizePaise: number;
  wonAt: string;
}

export const getRecentWinners = unstable_cache(
  async (): Promise<RecentWinner[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("tcd_transactions")
      .select(`
        amount,
        created_at,
        users (
          id,
          full_name,
          avatar_url
        ),
        exams (
          title
        )
      `)
      .eq("transaction_type", "PRIZE")
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      console.error("getRecentWinners:", error);
      return [];
    }

    return (
      data?.map((winner: any) => ({
        userId: winner.users?.id,
        name: winner.users?.full_name ?? "Student",
        avatarUrl: winner.users?.avatar_url,
        examTitle: winner.exams?.title ?? "Competition",
        prizePaise: Math.abs(winner.amount ?? 0),
        wonAt: winner.created_at,
      })) ?? []
    );
  },
  ["landing-winners"],
  {
    revalidate: 60,
    tags: ["landing"],
  }
);
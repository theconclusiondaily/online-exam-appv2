// lib/landing/getLeaderboardPreview.ts

import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface LeaderboardPreviewItem {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  xp: number;
  score: number | null;
  badge: string | null;
}

export const getLeaderboardPreview = unstable_cache(
  async (): Promise<LeaderboardPreviewItem[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("leaderboard_view")
      .select(`
        rank,
        user_id,
        full_name,
        avatar_url,
        xp,
        score,
        badge
      `)
      .order("rank", { ascending: true })
      .limit(5);

    if (error) {
      console.error("getLeaderboardPreview:", error);
      return [];
    }

    return (
      data?.map((student) => ({
        rank: student.rank,
        userId: student.user_id,
        name: student.full_name,
        avatarUrl: student.avatar_url,
        xp: student.xp ?? 0,
        score: student.score,
        badge: student.badge,
      })) ?? []
    );
  },
  ["landing-leaderboard"],
  {
    revalidate: 60,
    tags: ["landing"],
  }
);
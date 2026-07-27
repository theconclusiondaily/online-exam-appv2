import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface FeaturedExam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  startTime: string;
  participants: number;
  prizePoolPaise: number;
  difficulty: string;
  status: string;
}

export const getFeaturedExams = unstable_cache(
  async (): Promise<FeaturedExam[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("exams")
      .select(`
        id,
        title,
        subject,
        duration,
        start_time,
        difficulty,
        status,
        prize_pool,
        participants_count
      `)
      .in("status", ["LIVE", "UPCOMING"])
      .order("start_time", { ascending: true })
      .limit(4);

    if (error) {
      console.error("getFeaturedExams:", error);
      return [];
    }

    return (
      data?.map((exam) => ({
        id: exam.id,
        title: exam.title,
        subject: exam.subject,
        duration: exam.duration,
        startTime: exam.start_time,
        participants: exam.participants_count ?? 0,
        prizePoolPaise: exam.prize_pool ?? 0,
        difficulty: exam.difficulty,
        status: exam.status,
      })) ?? []
    );
  },
  ["featured-exams"],
  {
    revalidate: 60,
    tags: ["landing"],
  }
);
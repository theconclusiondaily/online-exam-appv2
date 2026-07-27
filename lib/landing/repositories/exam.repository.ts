import { BaseRepository } from "./base.repository";

import { TABLES } from "@/lib/database/tables";
import { EXAM_COLUMNS } from "@/lib/database/columns";
import { EXAM_STATUS } from "@/lib/database/enums";

export interface ExamRepositoryData {
  live_exam: {
    id: string;
    title: string | null;
    description: string | null;
    start_time: string | null;
    end_time: string | null;
    duration: number | null;
    total_questions: number | null;
    reward_pool: number;
    entry_fee: number;
    status: string | null;
    published: boolean | null;
    max_participants: number | null;
  } | null;

  upcoming_exams: {
    id: string;
    title: string | null;
    description: string | null;
    start_time: string | null;
    end_time: string | null;
    duration: number | null;
    total_questions: number | null;
    reward_pool: number;
    entry_fee: number;
    status: string | null;
    published: boolean | null;
    max_participants: number | null;
  }[];

  published_exam_count: number;
}

class ExamRepository extends BaseRepository {
  private readonly repository = "ExamRepository";

  async getData(): Promise<ExamRepositoryData> {
    const db = await this.db();

    const [
      liveExamResult,
      upcomingExamsResult,
      publishedExamCountResult,
    ] = await Promise.all([
      db
        .from(TABLES.EXAMS)
        .select(EXAM_COLUMNS.CARD)
        .eq("published", true)
        .eq("cancelled", false)
        .eq("status", EXAM_STATUS.LIVE)
        .order("start_time", {
          ascending: true,
        })
        .limit(1)
        .maybeSingle(),

      db
        .from(TABLES.EXAMS)
        .select(EXAM_COLUMNS.CARD)
        .eq("published", true)
        .eq("cancelled", false)
        .eq("status", EXAM_STATUS.UPCOMING)
        .order("start_time", {
          ascending: true,
        })
        .limit(6),

      db
        .from(TABLES.EXAMS)
        .select("*", {
          head: true,
          count: "exact",
        })
        .eq("published", true)
        .eq("cancelled", false),
    ]);

    return {
      live_exam: this.ensure(
        this.repository,
        liveExamResult,
        "Failed to load live exam."
      ),

      upcoming_exams: this.ensure(
        this.repository,
        upcomingExamsResult,
        "Failed to load upcoming exams."
      ),

      published_exam_count: this.count(
        this.repository,
        publishedExamCountResult,
        "Failed to count published exams."
      ),
    };
  }
}

export const examRepository = new ExamRepository();
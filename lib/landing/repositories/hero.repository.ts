import { BaseRepository } from "./base.repository";

import { TABLES } from "@/lib/database/tables";
import { EXAM_COLUMNS } from "@/lib/database/columns";
import { USER_ROLE, EXAM_STATUS } from "@/lib/database/enums";

export interface HeroRepositoryData {
  featuredExam: {
    id: string;
    title: string | null;
    status: string | null;
    start_time: string | null;
    reward_pool: number;
    entry_fee: number;
  } | null;

  studentCount: number;

  instituteCount: number;

  questionCount: number;

  publishedExamCount: number;
}

class HeroRepository extends BaseRepository {
  private readonly repository = "HeroRepository";

  async getData(): Promise<HeroRepositoryData> {
    const db = await this.db();

    const [
      featuredExamResult,
      studentCountResult,
      instituteCountResult,
      questionCountResult,
      publishedExamCountResult,
    ] = await Promise.all([
      db
        .from(TABLES.EXAMS)
        .select(EXAM_COLUMNS.HERO)
        .eq("published", true)
        .eq("cancelled", false)
        .in("status", [
          EXAM_STATUS.LIVE,
          EXAM_STATUS.UPCOMING,
        ])
        .order("start_time", {
          ascending: true,
        })
        .limit(1)
        .maybeSingle(),

      db
        .from(TABLES.USERS)
        .select("*", {
          head: true,
          count: "exact",
        })
        .eq("role", USER_ROLE.STUDENT)
        .eq("disabled", false),

      db
        .from(TABLES.INSTITUTES)
        .select("*", {
          head: true,
          count: "exact",
        }),

      db
        .from(TABLES.QUESTIONS)
        .select("*", {
          head: true,
          count: "exact",
        }),

      db
        .from(TABLES.EXAMS)
        .select("*", {
          head: true,
          count: "exact",
        })
        .eq("published", true)
        .eq("cancelled", false),
    ]);

    const featuredExam = this.ensure(
      this.repository,
      featuredExamResult,
      "Failed to load featured exam."
    );

       return {
      featuredExam,

      studentCount: this.count(
        this.repository,
        studentCountResult,
        "Failed to count students."
      ),

      instituteCount: this.count(
        this.repository,
        instituteCountResult,
        "Failed to count institutes."
      ),

      questionCount: this.count(
        this.repository,
        questionCountResult,
        "Failed to count questions."
      ),

      publishedExamCount: this.count(
        this.repository,
        publishedExamCountResult,
        "Failed to count published exams."
      ),
    };
  }
}

export const heroRepository = new HeroRepository();
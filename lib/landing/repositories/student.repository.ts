import { BaseRepository } from "./base.repository";

import { TABLES } from "@/lib/database/tables";
import {
  USER_COLUMNS,
  WALLET_COLUMNS,
  ATTEMPT_COLUMNS,
  EXAM_COLUMNS,
} from "@/lib/database/columns";
import { USER_ROLE, EXAM_STATUS } from "@/lib/database/enums";

export interface StudentRepositoryData {
  user: {
    id: string;
    name: string | null;
    avatar_url: string | null;
    xp: number;
    level: number;
    streak: number;
    achievement_score: number;
    prestige_level: string | null;
  };

  wallet: {
    available_balance: number;
    locked_balance: number;
    bonus_balance: number;
    lifetime_added: number;
    lifetime_won: number;
    lifetime_spent: number;
    lifetime_withdrawn: number;
    lifetime_refunded: number;
    currency: string;
    status: string;
  };

  exam_attempts: {
    percentage: number | null;
    accuracy: number | null;
  }[];

  unlocked_achievement_count: number;

  total_achievement_count: number;

  upcoming_exam: {
    id: string;
    title: string | null;
    start_time: string | null;
    reward_pool: number;
    entry_fee: number;
  } | null;
}

class StudentRepository extends BaseRepository {
  private readonly repository = "StudentRepository";

  async getData(userId: string): Promise<StudentRepositoryData> {
    const db = await this.db();

    const [
      userResult,
      walletResult,
      attemptsResult,
      unlockedAchievementsResult,
      totalAchievementsResult,
      upcomingExamResult,
    ] = await Promise.all([
      db
        .from(TABLES.USERS)
        .select(USER_COLUMNS.PROFILE)
        .eq("id", userId)
        .eq("role", USER_ROLE.STUDENT)
        .single(),

      db
        .from(TABLES.TCD_WALLETS)
        .select(WALLET_COLUMNS.BALANCE)
        .eq("user_id", userId)
        .single(),

      db
        .from(TABLES.EXAM_ATTEMPTS)
        .select(ATTEMPT_COLUMNS.STATS)
        .eq("user_id", userId)
        .eq("status", "submitted"),

      db
        .from(TABLES.USER_ACHIEVEMENTS)
        .select("*", {
          head: true,
          count: "exact",
        })
        .eq("user_id", userId),

      db
        .from(TABLES.ACHIEVEMENTS)
        .select("*", {
          head: true,
          count: "exact",
        })
        .eq("active", true),

      db
        .from(TABLES.EXAMS)
        .select(EXAM_COLUMNS.PREVIEW)
        .eq("published", true)
        .eq("cancelled", false)
        .eq("status", EXAM_STATUS.UPCOMING)
        .order("start_time", {
          ascending: true,
        })
        .limit(1)
        .maybeSingle(),
    ]);

    return {
      user: this.ensure(
        this.repository,
        userResult,
        "Failed to load user."
      ),

      wallet: this.ensure(
        this.repository,
        walletResult,
        "Failed to load wallet."
      ),

      exam_attempts: this.ensure(
        this.repository,
        attemptsResult,
        "Failed to load exam attempts."
      ),

      unlocked_achievement_count: this.count(
        this.repository,
        unlockedAchievementsResult,
        "Failed to count unlocked achievements."
      ),

      total_achievement_count: this.count(
        this.repository,
        totalAchievementsResult,
        "Failed to count achievements."
      ),

      upcoming_exam: this.ensure(
        this.repository,
        upcomingExamResult,
        "Failed to load upcoming exam."
      ),
    };
  }
}

export const studentRepository = new StudentRepository();
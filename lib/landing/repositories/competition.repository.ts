import { BaseRepository } from "./base.repository";

import { VIEWS } from "@/lib/database/views";
import { LEADERBOARD_COLUMNS } from "@/lib/database/columns";

export interface CompetitionRepositoryData {
  leaderboard: {
    id: string;
    name: string;
    xp: number;
    level: number;
    achievement_score: number;
    prestige_level: string;
    tcd_credits: number;
    exams_attempted: number;
    avg_score: number | null;
    average_percentage: number | null;
  }[];

  total_students: number;
}

class CompetitionRepository extends BaseRepository {
  private readonly repository = "CompetitionRepository";

  async getData(): Promise<CompetitionRepositoryData> {
    const db = await this.db();

    const [
      leaderboardResult,
      leaderboardCountResult,
    ] = await Promise.all([
      db
        .from(VIEWS.LEADERBOARD)
        .select(LEADERBOARD_COLUMNS.CARD)
        .order("xp", { ascending: false })
        .limit(10),

      db
        .from(VIEWS.LEADERBOARD)
        .select("*", {
          head: true,
          count: "exact",
        }),
    ]);

    return {
      leaderboard: this.ensure(
        this.repository,
        leaderboardResult,
        "Failed to load leaderboard."
      ),

      total_students: this.count(
        this.repository,
        leaderboardCountResult,
        "Failed to count leaderboard."
      ),
    };
  }
}

export const competitionRepository =
  new CompetitionRepository();
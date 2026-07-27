import { competitionRepository } from "../repositories/competition.repository";

import type {
  CompetitionData,
  LeaderboardUser,
} from "../types";

import {
  formatCompactNumber,
  formatPercentage,
} from "@/lib/finance/formatter";

class CompetitionService {
  async getData(): Promise<CompetitionData> {
    const data = await competitionRepository.getData();

    const leaderboard: LeaderboardUser[] =
      data.leaderboard.map((user, index) => ({
        rank: index + 1,

        name: user.name,

        score: user.xp,

        avatarUrl: null,
      }));

    return {
      leaderboard,

      competitions: [],
    };
  }
}

export const competitionService = new CompetitionService();
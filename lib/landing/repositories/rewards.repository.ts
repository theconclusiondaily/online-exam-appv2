import { BaseRepository } from "./base.repository";

import { VIEWS } from "@/lib/database/views";

export interface RewardsRepositoryData {
  wallet_stats: {
    total_wallets: number;
    total_available_balance: number;
    total_locked_balance: number;
    total_bonus_balance: number;
    total_lifetime_added: number;
    total_lifetime_won: number;
    total_lifetime_spent: number;
    total_lifetime_withdrawn: number;
    total_lifetime_refunded: number;
  };

  reward_stats: {
    published_exam_count: number;
    total_reward_pool: number;
    total_tcd_reward_pool: number;
    total_scholarship_pool: number;
    total_entry_fee: number;
  };
}

class RewardsRepository extends BaseRepository {
  private readonly repository = "RewardsRepository";

  async getData(): Promise<RewardsRepositoryData> {
    const db = await this.db();

    const [walletResult, rewardResult] = await Promise.all([
      db.from(VIEWS.LANDING_REWARDS).select("*").single(),

      db.from(VIEWS.LANDING_EXAM_REWARDS).select("*").single(),
    ]);

    const wallet = this.ensure(
      this.repository,
      walletResult,
      "Failed to load landing wallet statistics."
    );

    const rewards = this.ensure(
      this.repository,
      rewardResult,
      "Failed to load landing reward statistics."
    );

    return {
      wallet_stats: wallet,
      reward_stats: rewards,
    };
  }
}

export const rewardsRepository = new RewardsRepository();
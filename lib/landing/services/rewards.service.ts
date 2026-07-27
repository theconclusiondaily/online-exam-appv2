import { rewardsRepository } from "../repositories/rewards.repository";

import type { RewardsData } from "../types";

import {
  formatCredits,
  formatRupees,
  formatCompactNumber,
} from "@/lib/finance/formatter";

class RewardsService {
  async getData(): Promise<RewardsData> {
    const data = await rewardsRepository.getData();

    return {
     

      wallet: {
        totalWallets: formatCompactNumber(
          data.wallet_stats.total_wallets
        ),

        availableBalance: formatCredits(
          data.wallet_stats.total_available_balance
        ),

        lockedBalance: formatCredits(
          data.wallet_stats.total_locked_balance
        ),

        bonusBalance: formatCredits(
          data.wallet_stats.total_bonus_balance
        ),

        lifetimeAdded: formatRupees(
          data.wallet_stats.total_lifetime_added
        ),

        lifetimeWon: formatRupees(
          data.wallet_stats.total_lifetime_won
        ),

        lifetimeSpent: formatRupees(
          data.wallet_stats.total_lifetime_spent
        ),

        lifetimeWithdrawn: formatRupees(
          data.wallet_stats.total_lifetime_withdrawn
        ),

        lifetimeRefunded: formatRupees(
          data.wallet_stats.total_lifetime_refunded
        ),
      },

      rewards: {
        publishedExams: formatCompactNumber(
          data.reward_stats.published_exam_count
        ),

        rewardPool: formatRupees(
          data.reward_stats.total_reward_pool
        ),

        tcdRewardPool: formatRupees(
          data.reward_stats.total_tcd_reward_pool
        ),

        scholarshipPool: formatRupees(
          data.reward_stats.total_scholarship_pool
        ),

        totalEntryFee: formatRupees(
          data.reward_stats.total_entry_fee
        ),
      },
    };
  }
}

export const rewardsService = new RewardsService();
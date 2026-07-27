import { studentRepository } from "../repositories/student.repository";
import type { StudentDashboardData } from "../types";

import {
  formatCompactNumber,
  formatCredits,
  formatPercentage,
  formatRupees,
} from "@/lib/finance/formatter";

class StudentService {
  async getData(userId: string): Promise<StudentDashboardData> {
    const data = await studentRepository.getData(userId);

    const wallet = data.wallet;

    const upcomingExam = data.upcoming_exam
      ? {
          id: data.upcoming_exam.id,
          title: data.upcoming_exam.title,
          entryFee: formatRupees(data.upcoming_exam.entry_fee),
          rewardPool: formatRupees(data.upcoming_exam.reward_pool),
          startTime: data.upcoming_exam.start_time,
        }
      : null;

    return {
      profile: {
        id: data.user.id,
        name: data.user.name,
        avatarUrl: data.user.avatar_url,

        xp: formatCompactNumber(data.user.xp),

        level: data.user.level,

        streak: data.user.streak,

        prestigeLevel: data.user.prestige_level,

        achievementScore: formatCompactNumber(
          data.user.achievement_score
        ),
      },

      wallet: {
        available: formatCredits(wallet.available_balance),

        locked: formatCredits(wallet.locked_balance),

        bonus: formatCredits(wallet.bonus_balance),

        lifetimeWon: formatRupees(wallet.lifetime_won),

        lifetimeAdded: formatRupees(wallet.lifetime_added),

        lifetimeWithdrawn: formatRupees(
          wallet.lifetime_withdrawn
        ),
      },

      achievements: {
        unlocked: data.unlocked_achievement_count,

        total: data.total_achievement_count,
      },

     statistics: {
  examsAttempted: data.exam_attempts.length,

  averageAccuracy: (() => {
    const valid = data.exam_attempts.filter(
      exam => exam.accuracy !== null
    );

    return valid.length === 0
      ? "0%"
      : formatPercentage(
          valid.reduce(
            (sum, exam) => sum + exam.accuracy!,
            0
          ) / valid.length
        );
  })(),

  averagePercentage: (() => {
    const valid = data.exam_attempts.filter(
      exam => exam.percentage !== null
    );

    return valid.length === 0
      ? "0%"
      : formatPercentage(
          valid.reduce(
            (sum, exam) => sum + exam.percentage!,
            0
          ) / valid.length
        );
  })(),
},

      upcomingExam,
    };
  }
}

export const studentService = new StudentService();
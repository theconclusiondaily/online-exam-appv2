import { heroRepository } from "../repositories/hero.repository";
import type { HeroData, ExamStatus } from "../types";

import {
  formatCompactNumber,
  formatRelativeTime,
  formatRupees,
} from "@/lib/finance/formatter";

class HeroService {
  async getData(): Promise<HeroData> {
    const data = await heroRepository.getData();

  return {
  featuredExam: data.featuredExam
    ? {
        id: data.featuredExam.id,
        title: data.featuredExam.title ?? "",
        status: (data.featuredExam.status ?? "UPCOMING") as ExamStatus,
        rewardPool: formatRupees(data.featuredExam.reward_pool),
        entryFee: formatRupees(data.featuredExam.entry_fee),
        startsAt: data.featuredExam.start_time,
        startsIn: data.featuredExam.start_time
          ? formatRelativeTime(data.featuredExam.start_time)
          : "",
      }
    : null,

  stats: {
    students: formatCompactNumber(data.studentCount),
    institutes: formatCompactNumber(data.instituteCount),
    exams: formatCompactNumber(data.publishedExamCount),
    questions: formatCompactNumber(data.questionCount),
  },

    };
  }
}

export const heroService = new HeroService();
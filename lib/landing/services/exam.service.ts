import { examRepository } from "../repositories/exam.repository";

import type {
  ExamCard,
  ExamExperienceData,
  ExamStatus,
} from "../types";

import {
  formatCompactNumber,
  formatRupees,
} from "@/lib/finance/formatter";

class ExamService {
  private mapExam(
    exam: {
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
    }
  ): ExamCard {
    return {
      id: exam.id,

      title: exam.title ?? "",

      description: exam.description,

      startTime: exam.start_time,

      endTime: exam.end_time,

      duration: exam.duration,

      totalQuestions: exam.total_questions,

      rewardPool: formatRupees(exam.reward_pool),

      entryFee: formatRupees(exam.entry_fee),

      status: (exam.status ?? "UPCOMING") as ExamStatus,

      published: exam.published ?? false,

      maxParticipants: exam.max_participants,
    };
  }

  async getData(): Promise<ExamExperienceData> {
    const data = await examRepository.getData();

    return {
      liveExam: data.live_exam
        ? this.mapExam(data.live_exam)
        : null,

      upcomingExams: data.upcoming_exams.map((exam) =>
        this.mapExam(exam)
      ),

      publishedExamCount: formatCompactNumber(
        data.published_exam_count
      ),
    };
  }
}

export const examService = new ExamService();
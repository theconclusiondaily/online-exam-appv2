import { instituteRepository } from "../repositories/institute.repository";

import type { InstituteAnalytics } from "../types";

import { formatCompactNumber } from "@/lib/finance/formatter";

class InstituteService {
  async getData(): Promise<InstituteAnalytics> {
    const data = await instituteRepository.getData();

    return {
      totalInstitutes: formatCompactNumber(
        data.institute_count
      ),

      totalTeachers: formatCompactNumber(
        data.teacher_count
      ),

      totalStudents: formatCompactNumber(
        data.student_count
      ),

      publishedExams: formatCompactNumber(
        data.published_exam_count
      ),
    };
  }
}

export const instituteService = new InstituteService();
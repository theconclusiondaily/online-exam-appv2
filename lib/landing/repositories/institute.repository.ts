import { BaseRepository } from "./base.repository";

import { VIEWS } from "@/lib/database/views";

export interface InstituteRepositoryData {
  institute_count: number;
  teacher_count: number;
  student_count: number;
  published_exam_count: number;
}

class InstituteRepository extends BaseRepository {
  private readonly repository = "InstituteRepository";

  async getData(): Promise<InstituteRepositoryData> {
    const db = await this.db();

    const result = await db
      .from(VIEWS.LANDING_INSTITUTE)
      .select("*")
      .single();

    return this.ensure(
      this.repository,
      result,
      "Failed to load institute statistics."
    );
  }
}

export const instituteRepository = new InstituteRepository();
import { BaseRepository } from "./base.repository";
import { VIEWS } from "@/lib/database/views";

export interface AIRepositoryData {
  total_events: number;
  monitored_attempts: number;
  monitored_students: number;
  tab_switch_events: number;
  face_missing_events: number;
  multiple_face_events: number;
  fullscreen_exit_events: number;
}

class AIRepository extends BaseRepository {
  private readonly repository = "AIRepository";

  async getData(): Promise<AIRepositoryData> {
    const db = await this.db();

    const result = await db
      .from(VIEWS.LANDING_AI)
      .select("*")
      .single();

    return this.ensure(
      this.repository,
      result,
      "Failed to load AI statistics."
    );
  }
}

export const aiRepository = new AIRepository();
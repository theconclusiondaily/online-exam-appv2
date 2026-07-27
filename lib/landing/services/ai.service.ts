import { aiRepository } from "../repositories/ai.repository";

import type { AISecurityData } from "../types";

import { formatCompactNumber } from "@/lib/finance/formatter";

class AIService {
  async getData(): Promise<AISecurityData> {
    const data = await aiRepository.getData();

    return {
      totalEvents: formatCompactNumber(
        data.total_events
      ),

      monitoredAttempts: formatCompactNumber(
        data.monitored_attempts
      ),

      monitoredStudents: formatCompactNumber(
        data.monitored_students
      ),

      tabSwitchEvents: formatCompactNumber(
        data.tab_switch_events
      ),

      faceMissingEvents: formatCompactNumber(
        data.face_missing_events
      ),

      multipleFaceEvents: formatCompactNumber(
        data.multiple_face_events
      ),

      fullscreenExitEvents: formatCompactNumber(
        data.fullscreen_exit_events
      ),
    };
  }
}

export const aiService = new AIService();
"use client";

import { useEffect } from "react";

import { supabase }
from "@/lib/supabase/client";

export default function useExamAutosave({

  answers,
  timeLeft,
  examStarted,
  userId,
  examId,
  liveScore,
  questionsLength,

}: {
  answers: any;

  timeLeft: number;

  examStarted: boolean;

  userId: string;

  examId?: string;

  liveScore: number;

  questionsLength: number;
}) {

  useEffect(() => {

    async function autoSave() {

      if (
        !examStarted ||
        !userId ||
        !examId
      ) {

        return;
      }

      // SAVE ATTEMPT

      await supabase
        .from("exam_attempts")
        .upsert(
          {

            user_id:
              userId,

            exam_id:
              examId,

            answers,

            remaining_time:
              timeLeft,

            last_saved_at:
              new Date(),

            score:
              liveScore,

            percentage:
              questionsLength > 0

                ? Number(
                    (
                      (
                        liveScore /
                        questionsLength
                      ) * 100
                    ).toFixed(2)
                  )

                : 0,

            status:
              "in_progress",

          },

          {

            onConflict:
              "user_id,exam_id",
          }
        );

      // UPDATE LEADERBOARD

      await supabase
        .from("leaderboard")
        .upsert({

          user_id:
            userId,

          exam_id:
            examId,

          score:
            liveScore,

          correct_answers:
            liveScore,

          percentile:
            questionsLength > 0

              ? Number(
                  (
                    (
                      liveScore /
                      questionsLength
                    ) * 100
                  ).toFixed(2)
                )

              : 0,

        });
    }

    const interval =
      setInterval(
        autoSave,
        5000
      );

    return () =>
      clearInterval(interval);

  }, [
    answers,
    timeLeft,
    examStarted,
    userId,
    examId,
    liveScore,
    questionsLength,
  ]);
}
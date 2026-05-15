"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

export default function useLiveRank({
  examId,
  userId,
}: {
  examId?: string;

  userId: string;
}) {

  const [liveRank,
    setLiveRank] =
    useState<number | null>(
      null
    );

  const [previousRank,
    setPreviousRank] =
    useState<number | null>(
      null
    );

  const [topScore,
    setTopScore] =
    useState(0);

  useEffect(() => {

    async function fetchLiveRank() {

      if (
        !userId ||
        !examId
      ) {

        return;
      }

      const {
        data,
        error,
      } = await supabase
        .from("leaderboard")
        .select("*")
        .eq(
          "exam_id",
          examId
        )
        .order("score", {
          ascending: false,
        });

      if (error || !data) {
        return;
      }

      const rank =
        data.findIndex(
          (entry) =>
            entry.user_id ===
            userId
        ) + 1;

      setPreviousRank(
        liveRank
      );

      setLiveRank(rank);

      if (data.length > 0) {

        setTopScore(
          data[0].score
        );
      }
    }

    fetchLiveRank();

    const interval =
      setInterval(
        fetchLiveRank,
        10000
      );

    return () =>
      clearInterval(interval);

  }, [
    examId,
    userId,
    liveRank,
  ]);

  return {
    liveRank,
    previousRank,
    topScore,
  };
}
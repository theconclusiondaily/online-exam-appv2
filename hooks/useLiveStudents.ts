"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";

export default function useLiveStudents(
  examId?: string
) {

  const [liveStudents,
    setLiveStudents] =
    useState(0);

  useEffect(() => {

    async function fetchLiveStudents() {

      if (!examId) {
        return;
      }

      const {
        data,
        error,
      } = await supabase
        .from("exam_attempts")
        .select("*")
        .eq(
          "exam_id",
          examId
        )
        
        .eq(
          "status",
          "in_progress"
        )
        
        .eq("submitted", false);

      if (error || !data) {
        return;
      }

      setLiveStudents(
        data.length
      );
    }

    fetchLiveStudents();

    const interval =
      setInterval(
        fetchLiveStudents,
        10000
      );

    return () =>
      clearInterval(interval);

  }, [examId]);

  return liveStudents;
}
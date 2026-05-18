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

        .from(
          "exam_live_status"
        )

        .select("*")

        .eq(
          "exam_id",
          examId
        )

        .eq(
          "submitted",
          false
        )

        .gte(

          "updated_at",

          new Date(
            Date.now() - 15000
          ).toISOString()
        );

      console.log(
        "LIVE STUDENTS:",
        data
      );

      console.log(
        "LIVE ERROR:",
        error
      );

      if (
        error ||
        !data
      ) {

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

        5000
      );

    return () =>
      clearInterval(
        interval
      );

  }, [examId]);

  return liveStudents;
}
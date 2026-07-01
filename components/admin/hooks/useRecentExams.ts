"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function useRecentExams() {
  const [loading, setLoading] = useState(true);

  const [recentExams, setRecentExams] =
    useState<any[]>([]);

  useEffect(() => {
    loadRecentExams();
  }, []);

  async function loadRecentExams() {
    try {
      setLoading(true);

      const {
        data,
        error,
      } = await supabase

        .from("exams")

        .select(`
          *,
          institutes(
            name
          )
        `)

        .order(
          "start_time",
          {
            ascending: true,
          }
        );

      if (error) throw error;

      setRecentExams(
        data || []
      );

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  }

  return {
    loading,
    recentExams,
    reload: loadRecentExams,
  };
}
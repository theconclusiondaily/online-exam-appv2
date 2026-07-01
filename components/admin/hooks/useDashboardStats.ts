"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export interface DashboardStatsData {
  totalUsers: number;
  totalTeachers: number;
  totalInstitutes: number;
  totalQuestions: number;
  totalPapers: number;
  totalExams: number;
  liveExams: number;
  totalAttempts: number;
  loading: boolean;
}

export function useDashboardStats(): DashboardStatsData {
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalInstitutes, setTotalInstitutes] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalPapers, setTotalPapers] = useState(0);
  const [totalExams, setTotalExams] = useState(0);
  const [liveExams, setLiveExams] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      setLoading(true);

      const [
        users,
        teachers,
        institutes,
        questions,
        papers,
        exams,
        live,
        attempts,
      ] = await Promise.all([
        supabase
          .from("users")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .eq("role", "teacher"),

        supabase
          .from("institutes")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("questions")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("question_papers")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("exams")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("exams")
          .select("*", { count: "exact", head: true })
          .eq("status", "Live"),

        supabase
          .from("exam_attempts")
          .select("*", { count: "exact", head: true }),
      ]);

      setTotalUsers(users.count || 0);
      setTotalTeachers(teachers.count || 0);
      setTotalInstitutes(institutes.count || 0);
      setTotalQuestions(questions.count || 0);
      setTotalPapers(papers.count || 0);
      setTotalExams(exams.count || 0);
      setLiveExams(live.count || 0);
      setTotalAttempts(attempts.count || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,

    totalUsers,
    totalTeachers,
    totalInstitutes,
    totalQuestions,
    totalPapers,
    totalExams,
    liveExams,
    totalAttempts,
  };
}
// lib/landing/getInstituteStats.ts

import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface InstituteStats {
  totalInstitutes: number;
  activeInstitutes: number;
  totalTeachers: number;
  totalStudents: number;
  examsConducted: number;
  averageScore: number;
}

export const getInstituteStats = unstable_cache(
  async (): Promise<InstituteStats> => {
    const supabase = await createClient();

    const [
      institutes,
      activeInstitutes,
      teachers,
      students,
      exams,
      averageScore,
    ] = await Promise.all([
      supabase
        .from("institutes")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("institutes")
        .select("*", { count: "exact", head: true })
        .eq("status", "ACTIVE"),

      supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("role", "teacher"),

      supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("role", "student"),

      supabase
        .from("exams")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("exam_attempts")
        .select("percentage"),
    ]);

    if (
      institutes.error ||
      activeInstitutes.error ||
      teachers.error ||
      students.error ||
      exams.error ||
      averageScore.error
    ) {
      console.error("getInstituteStats", {
        institutes: institutes.error,
        activeInstitutes: activeInstitutes.error,
        teachers: teachers.error,
        students: students.error,
        exams: exams.error,
        averageScore: averageScore.error,
      });

      return {
        totalInstitutes: 0,
        activeInstitutes: 0,
        totalTeachers: 0,
        totalStudents: 0,
        examsConducted: 0,
        averageScore: 0,
      };
    }

    const avg =
      averageScore.data && averageScore.data.length > 0
        ? averageScore.data.reduce(
            (sum, row) => sum + (row.percentage ?? 0),
            0
          ) / averageScore.data.length
        : 0;

    return {
      totalInstitutes: institutes.count ?? 0,
      activeInstitutes: activeInstitutes.count ?? 0,
      totalTeachers: teachers.count ?? 0,
      totalStudents: students.count ?? 0,
      examsConducted: exams.count ?? 0,
      averageScore: Number(avg.toFixed(1)),
    };
  },
  ["landing-institute-stats"],
  {
    revalidate: 60,
    tags: ["landing"],
  }
);
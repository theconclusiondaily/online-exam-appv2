// lib/landing/getLandingStats.ts

import { createClient } from "@/lib/supabase/server";

export interface LandingStats {
  activeExams: number;
  registeredStudents: number;
  registeredInstitutes: number;
  totalQuestions: number;
  rewardsDistributedPaise: number;
  certificatesIssued: number;
}

export async function getLandingStats(): Promise<LandingStats> {
  const supabase = await createClient();

  const [
    examsResult,
    studentsResult,
    institutesResult,
    questionsResult,
    rewardsResult,
    certificatesResult,
  ] = await Promise.all([
    supabase
      .from("exams")
      .select("*", { count: "exact", head: true })
      .eq("status", "LIVE"),

    supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "student"),

    supabase
      .from("institutes")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("questions")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("tcd_transactions")
      .select("amount")
      .eq("transaction_type", "PRIZE"),

    supabase
      .from("certificates")
      .select("*", { count: "exact", head: true }),
  ]);

  const rewardsDistributedPaise =
    rewardsResult.data?.reduce(
      (sum, row) => sum + Math.abs(row.amount ?? 0),
      0
    ) ?? 0;

  return {
    activeExams: examsResult.count ?? 0,
    registeredStudents: studentsResult.count ?? 0,
    registeredInstitutes: institutesResult.count ?? 0,
    totalQuestions: questionsResult.count ?? 0,
    rewardsDistributedPaise,
    certificatesIssued: certificatesResult.count ?? 0,
  };
}
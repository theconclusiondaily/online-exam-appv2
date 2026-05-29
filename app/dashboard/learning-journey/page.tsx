"use client";

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import StudentInsights
from "@/components/dashboard/StudentInsights"
import PerformanceAnalytics
from "@/components/dashboard/PerformanceAnalytics";
import ExamHistoryTable
from "@/components/dashboard/ExamHistoryTable";
import MasteryRankCard
from "@/components/dashboard/MasteryRankCard";
import XPLevelCard
from "@/components/dashboard/XPLevelCard";
import SmartInsights
from "@/components/dashboard/SmartInsights";
import TCDMotion
from "@/components/ui/TCDMotion";

export default function LearningJourneyPage() {

  const [loading,
    setLoading] =
    useState(true);

  const [attempts,
    setAttempts] =
    useState<any[]>([]);

  const [ranks,
    setRanks] =
    useState<any>({});
const [
  streak,
  setStreak
] = useState<any>(null);
  const [examTitles,
    setExamTitles] =
    useState<any>({});
const unlockedCount =
  Object.keys(
    ranks || {}
  ).length;
  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    try {

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        return;
      }

      // FETCH ATTEMPTS

      const {
        data: attemptsData,
        error: attemptsError,
      } = await supabase

        .from("exam_attempts")

        .select(`
          *
        `)

        .eq(
          "user_id",
          user.id
        )

        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (
        attemptsError
      ) {

        console.error(
          attemptsError
        );

        return;
      }

      setAttempts(
        attemptsData || []
      );
const {
  data: streakData
} = await supabase
  .from("study_streaks")
  .select("*")
  .single();

setStreak(
  streakData
);

      // EXAM IDS

      const examIds = [
        ...new Set(
          (
            attemptsData || []
          ).map(
            (attempt) =>
              attempt.exam_id
          )
        ),
      ];

      if (
        examIds.length === 0
      ) {

        setLoading(false);

        return;
      }

      // FETCH EXAMS

      const {
        data: examsData,
      } = await supabase

        .from("exams")

        .select(`
          id,
          title
        `)

        .in(
          "id",
          examIds
        );

      if (examsData) {

        const examMap =
          Object.fromEntries(
            examsData.map(
              (exam) => [
                exam.id,
                exam,
              ]
            )
          );

        setExamTitles(
          examMap
        );
      }

      // FETCH RANKS

 const rankMap: any = {};

await Promise.all(

  (attemptsData || []).map(
    async (attempt) => {

      const {
        count,
        error,
      } = await supabase

        .from(
          "exam_attempts"
        )

        .select(
          "id",
          {
            count: "exact",
            head: true,
          }
        )

        .eq(
          "exam_id",
          attempt.exam_id
        )

        .gt(
          "percentage",
          Number(
            attempt.percentage
          )
        );

      if (error) {

        console.error(
          error
        );

        rankMap[
          attempt.id
        ] = 1;

        return;
      }

      rankMap[
        attempt.id
      ] =
        (count || 0) + 1;
    }
  )
);

console.log(
  "RANK MAP:",
  rankMap
);

setRanks(rankMap);

    } catch (error) {

      console.error(
        error
      );

    } finally {

      setLoading(false);

    }
  }

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >
        Loading...
      </div>
    );
  }

  return (

    <main
      className="
        min-h-screen
        bg-[#F7F9FC]
        p-6
      "
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-4">
<div className="mb-4">

  <Link
    href="/dashboard"
    className="
      inline-flex
      items-center
      gap-3

      px-4
      py-3

      bg-white/90

      border
      border-tcd-gold/10

      rounded-2xl

      shadow-sm

      hover:shadow-lg
      hover:-translate-y-1

      transition-all
    "
  >

    ← Back To Dashboard

  </Link>

</div>
          <h1
            className="
  tcd-page-title
"
          >
            Learning Journey
          </h1>

          <p className="text-gray-500 text-base">

            Track your exam
            history, performance,
            reviews and rankings.

          </p>

        </div>
        <div className="grid gap-5">

  {/* TOP */}

  <div
    className="
      grid
      xl:grid-cols-2

      gap-5
    "
  >

    <TCDMotion delay={0.1}>
  <XPLevelCard />
</TCDMotion>

<TCDMotion delay={0.2}>
  <MasteryRankCard
      attempts={attempts}
      achievements={
        unlockedCount
      }
      streak={streak}
    />
</TCDMotion>
    
    <TCDMotion delay={0.3}>
      <SmartInsights
  attempts={attempts}
  ranks={ranks}
/>
    </TCDMotion>

  </div>

  {/* INSIGHTS */}

  <StudentInsights
    attempts={attempts}
    ranks={ranks}
  />

  {/* ANALYTICS */}

  <PerformanceAnalytics
    attempts={attempts}
    ranks={ranks}
  />

  {/* HISTORY */}

  <ExamHistoryTable
    attempts={attempts}
    ranks={ranks}
    examTitles={examTitles}
  />

</div>

      </div>

    </main>
  );
}
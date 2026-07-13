"use client";

import {
  useEffect,
  useState,
} from "react";
import AdminHero from "@/components/admin/AdminHero";
import {
  useRouter,
} from "next/navigation";

import Link from "next/link";
import { useDashboardStats } from "@/components/admin/hooks/useDashboardStats";
import { supabase }
from "@/lib/supabase/client";
import { TCDIcons }
from "@/components/ui/tcd-icons";
import TCDLoader from "@/components/common/TCDLoader";
import QuickActions from "@/components/admin/QuickActions";
import CommandCenter from "@/components/admin/CommandCenter";
import DashboardStats from "@/components/admin/DashboardStats";
import { useAdminAuth } from "@/components/admin/hooks/useAdminAuth";
import {
  useRecentExams,
} from "@/components/admin/hooks/useRecentExams";
import RecentExams from "@/components/admin/RecentExams";
import { useRecentPapers } from "@/components/admin/hooks/useRecentPapers";
import RecentPapers from "@/components/admin/RecentPapers";
import ContentManagement from "@/components/admin/ContentManagement";
import LiveOperations from "@/components/admin/LiveOperations";
import PlatformManagement from "@/components/admin/PlatformManagement";
import { useActivityFeed } from "@/components/admin/hooks/useActivityFeed";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
export default function AdminPage() {

  const router = useRouter();
  const auth = useAdminAuth();
const stats = useDashboardStats();
const papers = useRecentPapers();
const activity = useActivityFeed();
const exams =
  useRecentExams();
  const [loading,
    setLoading] =
    useState(true);

  const [totalUsers,
    setTotalUsers] =
    useState(0);

  const [totalExams,
    setTotalExams] =
    useState(0);

  const [totalQuestions,
    setTotalQuestions] =
    useState(0);

  const [totalAttempts,
    setTotalAttempts] =
    useState(0);

  const [liveExams,
    setLiveExams] =
    useState(0);

  
  useEffect(() => {

    async function initializeAdmin() {

         // TOTAL USERS

      const {
        count: usersCount,
      } = await supabase
        .from("users")
        .select("*", {
          count: "exact",
          head: true,
        });

      setTotalUsers(
        usersCount || 0
      );

      // TOTAL EXAMS

      const {
        count: examsCount,
      } = await supabase
        .from("exams")
        .select("*", {
          count: "exact",
          head: true,
        });

      setTotalExams(
        examsCount || 0
      );

      // TOTAL QUESTIONS

      const {
        count: questionsCount,
      } = await supabase
        .from("questions")
        .select("*", {
          count: "exact",
          head: true,
        });

      setTotalQuestions(
        questionsCount || 0
      );

      // TOTAL ATTEMPTS

      const {
        count: attemptsCount,
      } = await supabase
        .from("exam_attempts")
        .select("*", {
          count: "exact",
          head: true,
        });

      setTotalAttempts(
        attemptsCount || 0
      );

   // LIVE EXAMS

const {
  data: liveExamData,
  error: liveExamError,
} = await supabase
  .from("exams")
  .select("id")
  .eq("published", true)
  .eq("cancelled", false)
  .eq("status", "live");

if (liveExamError) {
  throw liveExamError;
}

setLiveExams(liveExamData?.length ?? 0);



      setLoading(false);
    }

    initializeAdmin();

  }, [router]);

  async function logout() {

    await supabase.auth.signOut();

    window.location.href = "/login";
  }

 if (auth.loading) {
  return <TCDLoader text="Loading Admin Panel" />;
}

  return (

    <main className="min-h-screen p-4 md:p-5 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AdminHero
  onLogout={logout}
/>
{/* STATS */}

      <DashboardStats {...stats} />



  <CommandCenter
    liveExams={stats.liveExams}
    totalAttempts={stats.totalAttempts}
    totalUsers={stats.totalUsers}
  />

  
        {/* NAVIGATION */}

        
<div className="grid xl:grid-cols-2 gap-6 mb-8">

  <ContentManagement />

  <LiveOperations />

</div>
        <div className="grid xl:grid-cols-2 gap-6 mb-8">

  <PlatformManagement />

  <RecentPapers
    papers={papers.papers}
  />

</div>
<div className="grid xl:grid-cols-2 gap-6">

    <RecentExams
        exams={exams.recentExams}
    />

    <ActivityFeed
        activities={activity.activities}
        setActivities={activity.setActivities}
    />

</div>
      </div>

    </main>
  );
}
"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import LeaderboardTable from "@/components/dashboard/LeaderboardTable";
import {
  Users,
  FileText,
  Trophy,
} from "lucide-react";
import {
  useRouter,
} from "next/navigation";

import { supabase }
from "@/lib/supabase/client";
import {
  updateExamStatuses,
} from "@/lib/examStatus";
export default function TeacherDashboard() {

  const router =
    useRouter();

  const [loading,
    setLoading] =
    useState(true);

  const [profile,
    setProfile] =
    useState<any>(null);

  const [studentsCount,
    setStudentsCount] =
    useState(0);

  const [examsCount,
    setExamsCount] =
    useState(0);

  const [attemptsCount,
    setAttemptsCount] =
    useState(0);

  const [recentExams,
    setRecentExams] =
    useState<any[]>([]);
    const [liveExams,
  setLiveExams] =
  useState<any[]>([]);

  useEffect(() => {

    async function loadTeacherDashboard() {
await updateExamStatuses();
      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      if (!user) {

        router.push(
          "/login"
        );

        return;
      }

      // PROFILE

      const {
        data: profileData,
      } = await supabase
        .from("users")
        .select(`
          *,
          institutes (
            name
          )
        `)
        .eq(
          "email",
          user.email
        )
        .single();

      console.log(profileData);

      if (
        profileData?.role !==
          "teacher" &&
        profileData?.role !==
          "admin"
      ) {

        router.push(
          "/dashboard"
        );

        return;
      }

      setProfile(
        profileData
      );

      const instituteId =
        profileData
          ?.institute_id;

      // STUDENTS

      const {
        data: students,
      } = await supabase
        .from("users")
        .select("*")
        .eq(
          "institute_id",
          instituteId
        )
        .eq(
          "role",
          "student"
        );

      setStudentsCount(
        students?.length || 0
      );

      // EXAMS

     const {
  data: exams,
  error: examsError,
} = await supabase

  .from("exams")

  .select("*")

  .eq(
    "institute_id",
    instituteId
  )

  .order(
    "start_time",
    {
      ascending: true,
    }
  );

console.log(exams);

console.log(examsError);

setExamsCount(
  exams?.length || 0
);

setRecentExams(
  exams || []
);
const now =
  new Date()
    .toISOString();

const {
  data: liveExamsData,
  error: liveExamsError,
} = await supabase

  .from("exams")

  .select("*")

  .eq(
    "institute_id",
    instituteId
  )

  .lte(
    "start_time",
    now
  )

  .gte(
    "end_time",
    now
  )

  .order(
    "start_time",
    {
      ascending: true,
    }
  );

console.log(
  liveExamsData
);

console.log(
  liveExamsError
);

setLiveExams(
  liveExamsData || []
);
      // ATTEMPTS

      const examIds =
        exams?.map(
          (exam) =>
            exam.id
        ) || [];

      if (
        examIds.length > 0
      ) {

        const {
          data: attempts,
        } = await supabase
          .from(
            "exam_attempts"
          )
          .select("*")
          .in(
            "exam_id",
            examIds
          );

        setAttemptsCount(
          attempts?.length || 0
        );
      }

      setLoading(false);
    }

    loadTeacherDashboard();

  }, [router]);

  async function logout() {

    await supabase
      .auth
      .signOut();

    router.push(
      "/login"
    );
  }

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="text-2xl font-bold">

          Loading Teacher Dashboard...

        </div>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <h1 className="text-4xl font-bold mb-2">

              Teacher Dashboard

            </h1>

            <p className="text-gray-600">

              {profile?.institutes?.name}

            </p>

          </div>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold"
          >

            Logout

          </button>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

  <StatCard
    title="Students"
    value={studentsCount}
    icon={<Users size={28} />}
    color="bg-gradient-to-br from-blue-500 to-blue-700"
  />

  <StatCard
    title="Exams"
    value={examsCount}
    icon={<FileText size={28} />}
    color="bg-gradient-to-br from-violet-500 to-purple-700"
  />

  <StatCard
    title="Attempts"
    value={attemptsCount}
    icon={<Trophy size={28} />}
    color="bg-gradient-to-br from-emerald-500 to-green-700"
  />

</div>
<div className="mb-10">
  <AnalyticsChart />
</div>
<div className="mb-10">
  <LeaderboardTable />
</div>
        {/* ACTIONS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <Link
            href="/teacher/create-exam"
            className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition"
          >

            <h2 className="text-2xl font-bold mb-2">

              Create Exam

            </h2>

            <p className="text-gray-600">

              Schedule new institute exams

            </p>

          </Link>
<Link
  href="/dashboard/teacher-monitor"
>

  <div className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all cursor-pointer">

    <h2 className="text-2xl font-bold mb-3">

      Live Monitoring Dashboard

    </h2>

    <p className="text-gray-600 mb-4">

      Monitor students live during exams

    </p>

    <div className="text-blue-600 font-bold">

      Open Dashboard →

    </div>

  </div>

</Link>
          <Link
            href="/teacher/questions"
            className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition"
          >

            <h2 className="text-2xl font-bold mb-2">

              Upload Questions

            </h2>

            <p className="text-gray-600">

              Manage question banks

            </p>

          </Link>

          <Link
            href="/teacher/leaderboards"
            className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition"
          >

            <h2 className="text-2xl font-bold mb-2">

              Leaderboards

            </h2>

            <p className="text-gray-600">

              View student rankings

            </p>

          </Link>

          <Link
            href="/teacher/analytics"
            className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition"
          >

            <h2 className="text-2xl font-bold mb-2">

              Analytics

            </h2>

            <p className="text-gray-600">

              Institute performance insights

            </p>

          </Link>

        </div>
{/* LIVE EXAMS */}

<div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl mb-10">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-3xl font-bold">

      Live Exams

    </h2>

    <div className="bg-green-100 text-green-700 border border-green-300 px-4 py-2 rounded-2xl font-bold">

      {liveExams.length} Live

    </div>

  </div>

  <div className="space-y-5">

    {liveExams.map(
      (exam) => (

        <div
          key={exam.id}
          className="border rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >

          <div>

           <h3 className="text-2xl font-bold mb-2">

  {exam.title}

</h3>

<div
  className={`
    inline-block px-4 py-2 rounded-xl font-bold text-sm mb-3

    ${
      exam.status === "live"
        ? "bg-green-100 text-green-700"

        : exam.status === "scheduled"

        ? "bg-blue-100 text-blue-700"

        : exam.status === "completed"

        ? "bg-gray-200 text-gray-700"

        : "bg-yellow-100 text-yellow-700"
    }
  `}
>

  {exam.status?.toUpperCase()}

</div>

<p className="text-gray-600">

  Reward:

              Reward:
              {" "}
              ₹
              {exam.reward_pool || 0}

            </p>

          </div>

          <div className="text-green-600 font-bold">

            LIVE NOW

          </div>

        </div>

      )
    )}

    {liveExams.length === 0 && (

      <div className="text-center text-gray-500 py-10">

        No live exams right now

      </div>

    )}
    

  </div>

</div>
{/* RECENT EXAMS */}

<div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl">

  <h2 className="text-3xl font-bold mb-6">

    Recent Exams

  </h2>

  <div className="space-y-5">

    {recentExams.map(
      (exam) => (

        <div
          key={exam.id}
          className="border rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >

          <div>

            <h3 className="text-2xl font-bold mb-2">

              {exam.title}

            </h3>

            <div
              className={`
                inline-block px-4 py-2 rounded-xl font-bold text-sm mb-3

                ${
                  exam.status === "live"
                    ? "bg-green-100 text-green-700"

                    : exam.status === "scheduled"

                    ? "bg-blue-100 text-blue-700"

                    : exam.status === "completed"

                    ? "bg-gray-200 text-gray-700"

                    : "bg-yellow-100 text-yellow-700"
                }
              `}
            >

              {exam.status?.toUpperCase()}

            </div>

            <p className="text-gray-600">

              Reward:
              {" "}
              ₹
              {exam.reward_pool || 0}

            </p>

          </div>

          <div className="flex flex-col items-end gap-3">

            <div className="text-gray-600">

              {new Date(
                exam.start_time
              ).toLocaleString(
                "en-IN",
                {
                  timeZone:
                    "Asia/Kolkata",
                }
              )}

            </div>

            {!exam.published && (

              <button

                onClick={async () => {

                  await supabase

                    .from("exams")

                    .update({

                      published: true,

                      status:
                        "scheduled",

                    })

                    .eq(
                      "id",
                      exam.id
                    );

                  window.location.reload();
                }}

                className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold"
              >

                Publish

              </button>

            )}

          </div>

        </div>

      )
    )}

    {recentExams.length === 0 && (

      <div className="text-center text-gray-500 py-10">

        No exams created yet

      </div>

    )}

  </div>

</div>

      </div>

    </main>
  );
}
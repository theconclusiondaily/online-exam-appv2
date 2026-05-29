"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Link from "next/link";

import { supabase }
from "@/lib/supabase/client";

export default function AdminPage() {

  const router = useRouter();

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

  const [recentExams,
    setRecentExams] =
    useState<any[]>([]);

  useEffect(() => {

    async function initializeAdmin() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        router.push("/login");

        return;
      }

      // GET USER PROFILE

     const {
  data: profile,
  error,
} = await supabase
  .from("users")
  .select("*")
  .eq("email", user.email)
  .single();


  
// PROFILE NOT FOUND

if (!profile) {

  alert("Profile not found");

  return;
}

// BLOCK NON ADMINS

if (
  profile.role !== "admin"
) {

  alert("Access Denied");

  router.push("/teacher");

  return;
}

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

      const now =
        new Date()
          .toISOString();

      const {
        data: liveExamData,
      } = await supabase
        .from("exams")
        .select("*")
        .lte("start_time", now)
        .gte("end_time", now);

      setLiveExams(
        liveExamData?.length || 0
      );

 // RECENT EXAMS

const {
  data: recentExamData,
  error: recentExamError,
} = await supabase

  .from("exams")

  .select(`
    *,
    institutes (
      name
    )
  `)

  .order(
    "start_time",
    {
      ascending: true,
    }
  )

  .limit(10);

console.log(
  recentExamData
);

console.log(
  recentExamError
);

if (
  recentExamData
) {

  setRecentExams(
    recentExamData
  );
}

      setLoading(false);
    }

    initializeAdmin();

  }, [router]);

  async function logout() {

    await supabase.auth.signOut();

    router.push("/login");
  }

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        <div className="text-2xl font-bold">

          Loading Admin Dashboard...

        </div>

      </main>
    );
  }

  return (

    <main className="min-h-screen p-4 md:p-5 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">

          <h1 className="text-2xl font-bold">

            Admin Dashboard

          </h1>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
          >

            Logout

          </button>

        </div>

        {/* NAVIGATION */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">

          <Link
            href="/admin/questions"
            className="border rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition"
          >

            <h2 className="text-2xl font-bold mb-2">

              Question Builder

            </h2>

            <p className="text-gray-600">

              Create and manage exam questions

            </p>

          </Link>

          <Link
            href="/admin/institutes"
            className="border rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition"
          >

            <h2 className="text-2xl font-bold mb-2">

              Institutes

            </h2>

            <p className="text-gray-600">

              Manage campuses and institutes

            </p>

          </Link>

          <Link
            href="/admin/analytics"
            className="border rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition"
          >

            <h2 className="text-2xl font-bold mb-2">

              Analytics

            </h2>

            <p className="text-gray-600">

              Institute performance analytics

            </p>

          </Link>

          <Link
            href="/admin/users"
            className="border rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition"
          >

            <h2 className="text-2xl font-bold mb-2">

              Users

            </h2>

            <p className="text-gray-600">

              Manage students and institutes

            </p>

          </Link>
          <Link
  href="/admin/teachers"
  className="border rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition"
>

  <h2 className="text-2xl font-bold mb-2">

    Teachers

  </h2>

  <p className="text-gray-600">

    Manage institute teachers

  </p>

</Link>
            <Link
  href="/admin/create-exam"
  className="border rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition"
>

  <h2 className="text-2xl font-bold mb-2">

    Create Exam

  </h2>

  <p className="text-gray-600">

    Create and manage exams

  </p>

</Link>

<Link
  href="/admin/leaderboards"
  className="border rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition"
>

  <h2 className="text-2xl font-bold mb-2">

    Leaderboards

  </h2>

  <p className="text-gray-600">

    View rankings and performance

  </p>

</Link>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">

          <div className="bg-white rounded-2xl shadow-sm p-6 border">

            <p className="text-gray-500 text-sm mb-2">

              Total Users

            </p>

            <h2 className="text-2xl font-bold">

              {totalUsers}

            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border">

            <p className="text-gray-500 text-sm mb-2">

              Total Exams

            </p>

            <h2 className="text-2xl font-bold">

              {totalExams}

            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border">

            <p className="text-gray-500 text-sm mb-2">

              Total Questions

            </p>

            <h2 className="text-2xl font-bold">

              {totalQuestions}

            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border">

            <p className="text-gray-500 text-sm mb-2">

             Learning Journeys

            </p>

            <h2 className="text-2xl font-bold">

              {totalAttempts}

            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border">

            <p className="text-gray-500 text-sm mb-2">

              Live Exams

            </p>

            <h2 className="text-2xl font-bold text-green-600">

              {liveExams}

            </h2>

          </div>

        </div>
{/* RECENT EXAMS */}

<div className="bg-white rounded-3xl shadow-sm border p-6">

  <div className="flex items-center justify-between mb-4">

    <h2 className="text-3xl font-bold">

      Exam Management

    </h2>

    <div className="bg-gray-100 px-4 py-2 rounded-xl font-bold">

      {recentExams.length} Exams

    </div>

  </div>

  <div className="space-y-5">

    {recentExams.map(
      (exam) => (

        <div
          key={exam.id}
          className="border rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3"
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

                    ? "bg-tcd-gold/20 text-tcd-blue"

                    : exam.status === "completed"

                    ? "bg-gray-200 text-gray-700"

                    : exam.status === "cancelled"

                    ? "bg-red-100 text-red-700"

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

            <p className="text-sm text-gray-500 mt-2">

              Institute:
              {" "}
              {exam.institutes?.name || "Unknown"}

            </p>

          </div>

          <div className="flex flex-col items-end gap-2">

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

            <div className="flex flex-wrap gap-3">

{!exam.published && (

  <button
    onClick={() =>
      router.push(
        `/admin/create-exam?id=${exam.id}`
      )
    }
    className="
      bg-yellow-500
      hover:bg-yellow-600
      text-white
      px-4
      py-2
      rounded-xl
      font-semibold
      mr-2
    "
  >
    Edit
  </button>

)}
              {!exam.published && 
            
              (

                <button

                  onClick={async () => {

  const result = await supabase
    .from("exams")
    .update({
      published: true,
      status: "scheduled",
    })
    .eq("id", exam.id)
    .select();

  console.log(
    "PUBLISH RESULT:",
    result
  );

  if (result.error) {

    console.error(
      "PUBLISH ERROR:",
      result.error
    );

    alert(
      result.error.message
    );

    return;
  }

  alert(
    "Published successfully"
  );

  window.location.reload();
}}

                  className="bg-tcd-blue hover:bg-tcd-blue-light text-white px-4 py-2 rounded-xl font-bold"
                >

                  Publish

                </button>

              )}

              <button

                onClick={async () => {

                  await supabase

                    .from("exams")

                    .update({

                      status:
                        "cancelled",

                    })

                    .eq(
                      "id",
                      exam.id
                    );

                  window.location.reload();
                }}

                className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold"
              >

                Cancel

              </button>

            </div>

          </div>

        </div>

      )
    )}

    {recentExams.length === 0 && (

      <div className="text-center text-gray-500 py-10">

        No exams found

      </div>

    )}

  </div>

</div>
      </div>

    </main>
  );
}
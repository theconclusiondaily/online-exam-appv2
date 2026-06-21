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
import { TCDIcons }
from "@/components/ui/tcd-icons";
import TCDLoader from "@/components/common/TCDLoader";
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

    window.location.href = "/login";
  }

 if (loading) {
  return <TCDLoader text="Loading Admin Panel" />;
}

  return (

    <main className="min-h-screen p-4 md:p-5 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">

          <div
  className="
    relative
    overflow-hidden

    bg-gradient-to-br
    from-tcd-blue
    via-[#35548C]
    to-[#203B63]

    rounded-[32px]

    p-8

    mb-6

    text-white

    shadow-2xl
  "
>

  <img
    src="/logo.png"
    alt="TCD"
    className="
      absolute
      right-[-40px]
      top-[-40px]

      w-72
      h-72

      opacity-10
    "
  />

  <div
    className="
      flex
      items-center
      justify-between
      relative
      z-10
    "
  >

    <div>

      <p
        className="
          text-tcd-gold
          font-bold
          uppercase
          tracking-wider
          mb-2
        "
      >
        The Conclusion Daily
      </p>

      <h1
        className="
          text-4xl
          font-black
        "
      >
        Admin Command Center
      </h1>

      <p className="text-white/80 mt-2">

        Manage exams, institutes,
        teachers and platform growth.

      </p>

    </div>

    

  </div>

</div>
<button
      onClick={logout}
      className="
        bg-red-500
        hover:bg-red-600

        text-white

        px-5
        py-3

        rounded-2xl

        font-bold
      "
    >
      Logout
    </button>
         

        </div>

        {/* NAVIGATION */}

        <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-4

    gap-4

    mb-10
  "
>

  {/* Question Builder */}

  <Link
    href="/admin/questions"
    className="
      bg-white
      rounded-[28px]

      border
      border-tcd-gold/10

      shadow-lg

      hover:shadow-2xl
      hover:-translate-y-2

      transition-all
      duration-300

      p-6
    "
  >

    <div className="mb-4">

      {TCDIcons.target}

    </div>

    <h2
      className="
        text-2xl
        font-black

        text-tcd-blue

        mb-2
      "
    >
      Question Builder
    </h2>

    <p className="text-brand">

      Create and manage exam questions

    </p>

  </Link>

  {/* Institutes */}

  <Link
    href="/admin/institutes"
    className="
      bg-white
      rounded-[28px]
      border
      border-tcd-gold/10
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      p-6
    "
  >

    <div className="mb-4">

      {TCDIcons.journey}

    </div>

    <h2
      className="
        text-2xl
        font-black
        text-tcd-blue
        mb-2
      "
    >
      Institutes
    </h2>

    <p className="text-brand">

      Manage campuses and institutes

    </p>

  </Link>

  {/* Analytics */}

  <Link
    href="/admin/analytics"
    className="
      bg-white
      rounded-[28px]
      border
      border-tcd-gold/10
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      p-6
    "
  >

    <div className="mb-4">

      {TCDIcons.mastery}

    </div>

    <h2
      className="
        text-2xl
        font-black
        text-tcd-blue
        mb-2
      "
    >
      Analytics
    </h2>

    <p className="text-brand">

      Institute performance analytics

    </p>

  </Link>

  {/* Users */}

  <Link
    href="/admin/users"
    className="
      bg-white
      rounded-[28px]
      border
      border-tcd-gold/10
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      p-6
    "
  >

    <div className="mb-4">

      {TCDIcons.coin}

    </div>

    <h2
      className="
        text-2xl
        font-black
        text-tcd-blue
        mb-2
      "
    >
      Users
    </h2>

    <p className="text-brand">

      Manage students and institutes

    </p>

  </Link>

  {/* Teachers */}

  <Link
    href="/admin/teachers"
    className="
      bg-white
      rounded-[28px]
      border
      border-tcd-gold/10
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      p-6
    "
  >

    <div className="mb-4">

      {TCDIcons.rank}

    </div>

    <h2
      className="
        text-2xl
        font-black
        text-tcd-blue
        mb-2
      "
    >
      Teachers
    </h2>

    <p className="text-brand">

      Manage institute teachers

    </p>

  </Link>

  {/* Create Exam */}

  <Link
    href="/admin/create-exam"
    className="
      bg-white
      rounded-[28px]
      border
      border-tcd-gold/10
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      p-6
    "
  >

    <div className="mb-4">

      {TCDIcons.achievement}

    </div>

    <h2
      className="
        text-2xl
        font-black
        text-tcd-blue
        mb-2
      "
    >
      Create Exam
    </h2>

    <p className="text-brand">

      Create and manage exams

    </p>

  </Link>

  {/* Leaderboards */}

  <Link
    href="/admin/leaderboards"
    className="
      bg-white
      rounded-[28px]
      border
      border-tcd-gold/10
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      p-6
    "
  >

    <div className="mb-4">

      {TCDIcons.wallet}

    </div>

    <h2
      className="
        text-2xl
        font-black
        text-tcd-blue
        mb-2
      "
    >
      Leaderboards
    </h2>

    <p className="text-brand">

      View rankings and performance

    </p>

  </Link>

</div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">

          <div className="bg-white

rounded-[24px]

border
border-tcd-gold/10

shadow-lg

hover:shadow-xl
hover:-translate-y-1

transition-all

p-6">

           <div className="flex items-center gap-3 mb-3">

  <div className="w-6 h-6 text-tcd-blue">

    {TCDIcons.fire}

  </div>

  <p className="text-tcd-primary text-sm font-semibold">

    Total Students

  </p>

</div>

            <h2 className="text-2xl font-bold">

              {totalUsers}

            </h2>

          </div>

          <div className="bg-white

rounded-[24px]

border
border-tcd-gold/10

shadow-lg

hover:shadow-xl
hover:-translate-y-1

transition-all

p-6">

            <div className="flex items-center gap-3 mb-3">

  <div className="w-6 h-6 text-tcd-gold">

    {TCDIcons.achievement}

  </div>

  <p className="text-tcd-primary text-sm font-semibold">

    Total Exams

  </p>

</div>

            <h2 className="text-2xl font-bold">

              {totalExams}

            </h2>

          </div>

          <div className="bg-white

rounded-[24px]

border
border-tcd-gold/10

shadow-lg

hover:shadow-xl
hover:-translate-y-1

transition-all

p-6">

           <div className="flex items-center gap-3 mb-3">

  <div className="w-6 h-6 text-tcd-blue">

    {TCDIcons.target}

  </div>

  <p className="text-tcd-primary text-sm font-semibold">

    Question Bank

  </p>

</div>

            <h2 className="text-2xl font-bold">

              {totalQuestions}

            </h2>

          </div>

          <div className="bg-white

rounded-[24px]

border
border-tcd-gold/10

shadow-lg

hover:shadow-xl
hover:-translate-y-1

transition-all

p-6">

            <div className="flex items-center gap-3 mb-3">

  <div className="w-6 h-6 text-tcd-gold">

    {TCDIcons.journey}

  </div>

  <p className="text-tcd-primary text-sm font-semibold">

    Learning Journeys

  </p>

</div>

            <h2 className="text-2xl font-bold">

              {totalAttempts}

            </h2>

          </div>

          <div className="bg-white

rounded-[24px]

border
border-tcd-gold/10

shadow-lg

hover:shadow-xl
hover:-translate-y-1

transition-all

p-6">

            <div className="flex items-center gap-3 mb-3">

  <div className="w-6 h-6 text-green-600">

    {TCDIcons.mastery}

  </div>

  <p className="text-tcd-primary text-sm font-semibold">

    Live Exams

  </p>

</div>

            <h2 className="text-2xl font-bold text-green-600">

              {liveExams}

            </h2>

          </div>

        </div>
{/* RECENT EXAMS */}

<div className="bg-white rounded-3xl shadow-sm border p-6">

 <div
  className="
    flex
    items-center
    justify-between

    mb-6
  "
>

  <div>

    <div
      className="
        inline-flex
        items-center
        gap-3

        px-4
        py-2

        rounded-full

        bg-tcd-gold/10

        text-tcd-gold

        border
        border-tcd-gold/20

        mb-3
      "
    >

      {TCDIcons.achievement}

      Exam Command Center

    </div>

    <h2
      className="
        text-3xl
        font-black

        text-tcd-blue
      "
    >
      Exam Management
    </h2>

  </div>

  <div
    className="
      bg-gradient-to-r
      from-tcd-blue
      to-[#35548C]

      text-white

      px-5
      py-3

      rounded-2xl

      font-black
    "
  >
    {recentExams.length} Exams
  </div>

</div>

  <div className="space-y-5">

    {recentExams.map(
      (exam) => (

        <div
          key={exam.id}
          className="
  bg-white

  rounded-[28px]

  border
  border-tcd-gold/10

  shadow-md

  hover:shadow-2xl
  hover:-translate-y-1

  transition-all

  p-6
"   >

          <div>

            <h3 className="text-2xl
font-black
text-tcd-blue">

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

                    ? "bg-gray-200 text-tcd-primary"

                    : exam.status === "cancelled"

                    ? "bg-red-100 text-red-700"

                    : "bg-yellow-100 text-yellow-700"
                }
              `}
            >

              {exam.status?.toUpperCase()}

            </div>

            <div
  className="
    inline-flex

    px-4
    py-2

    rounded-full

    bg-tcd-gold/10

    text-tcd-gold

    font-bold

    mt-2
  "
>
  ₹ {exam.reward_pool || 0}
</div>

            <p className="text-sm text-tcd-primary mt-2">

              Institute:
              {" "}
              {exam.institutes?.name || "Unknown"}

            </p>

          </div>

          <div className="flex flex-col items-end gap-2">

            <div className="text-brand">

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

{!exam.published &&
 exam.status !== "cancelled" &&
 exam.status !== "completed" && (

  <button
    onClick={() =>
      router.push(
        `/admin/create-exam?id=${exam.id}`
      )
    }
    className="
     bg-[#F59E0B]
hover:bg-[#D97706]
rounded-2xl
shadow-md
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
 exam.status !== "cancelled" &&
 exam.status !== "completed" && 
            
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

                  className="bg-tcd-blue
hover:bg-[#35548C] rounded-2xl
shadow-mdtext-white px-4 py-2 rounded-xl font-bold"
                >

                  Publish

                </button>

              )}

              {exam.status !== "cancelled" &&
 exam.status !== "completed" && (

  <button

    onClick={async () => {

      const now =
        new Date();

      const isCompleted =
        new Date(
          exam.end_time
        ) < now;

      if (isCompleted) {

        alert(
          "Completed exams cannot be cancelled."
        );

        return;
      }

      await supabase

        .from("exams")

        .update({
          status: "cancelled",
        })

        .eq(
          "id",
          exam.id
        );

      window.location.reload();

    }}

    className="
      bg-red-500
      hover:bg-red-600

      text-white

      px-4
      py-2

      rounded-2xl

      font-bold

      shadow-md
    "
  >

    Cancel

  </button>

)}

            </div>

          </div>

        </div>

      )
    )}

    {recentExams.length === 0 && (

      <div className="text-center text-tcd-primary py-10">

        No exams found

      </div>

    )}

  </div>

</div>
      </div>

    </main>
  );
}
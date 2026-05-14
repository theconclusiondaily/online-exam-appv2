"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

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

  useEffect(() => {

    async function loadTeacherDashboard() {

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
      } = await supabase
        .from("exams")
        .select("*")
        .eq(
          "institute_id",
          instituteId
        )
        .order("created_at", {
          ascending: false,
        });

      setExamsCount(
        exams?.length || 0
      );

      setRecentExams(
        exams || []
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

    <main className="min-h-screen bg-gray-50 p-6 md:p-8">

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white border rounded-3xl p-6 shadow-sm">

            <p className="text-gray-500 mb-2">

              Students

            </p>

            <h2 className="text-5xl font-bold">

              {studentsCount}

            </h2>

          </div>

          <div className="bg-white border rounded-3xl p-6 shadow-sm">

            <p className="text-gray-500 mb-2">

              Exams

            </p>

            <h2 className="text-5xl font-bold text-blue-600">

              {examsCount}

            </h2>

          </div>

          <div className="bg-white border rounded-3xl p-6 shadow-sm">

            <p className="text-gray-500 mb-2">

              Attempts

            </p>

            <h2 className="text-5xl font-bold text-green-600">

              {attemptsCount}

            </h2>

          </div>

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

        {/* RECENT EXAMS */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm">

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

                    <p className="text-gray-600">

                      Reward:
                      {" "}
                      ₹
                      {exam.reward_pool || 0}

                    </p>

                  </div>

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
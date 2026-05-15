"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default function DashboardPage() {

  const router =
    useRouter();

  const [loading,
    setLoading] =
    useState(true);

  const [user,
    setUser] =
    useState<any>(null);

  const [attempts,
    setAttempts] =
    useState<any[]>([]);

  const [upcomingExams,
    setUpcomingExams] =
    useState<any[]>([]);

  const [liveExams,
    setLiveExams] =
    useState<any[]>([]);

  const [ranks,
    setRanks] =
    useState<any>({});

  const [stats,
    setStats] =
    useState({
      totalAttempts: 0,
      averageScore: 0,
      highestScore: 0,
    });

  // LOGOUT

  async function handleLogout() {

    await supabase
      .auth
      .signOut();

    router.push(
      "/login"
    );
  }

  // LOAD DASHBOARD

  useEffect(() => {

    async function loadDashboard() {

      setLoading(true);

      const {
  data: sessionData,
} = await supabase
  .auth
  .getSession();

const user =
  sessionData?.session?.user;

      // NOT LOGGED IN

      if (!user) {

        router.push(
          "/login"
        );

        return;
      }

      setUser(user);

      // FETCH PROFILE

      const {
        data: profile,
      } = await supabase
        .from("users")
        .select(`
          institute_id,
          role
        `)
        .eq(
          "email",
          user.email
        )
        .single();

      console.log(profile);

      // FETCH ATTEMPTS

      const {
        data: attemptsData,
        error: attemptsError,
      } = await supabase
        .from("exam_attempts")
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .order("created_at", {
          ascending: false,
        });

      console.log(
        "ATTEMPTS:",
        attemptsData
      );

      console.log(
        "ATTEMPTS ERROR:",
        attemptsError
      );

      if (attemptsData) {

        setAttempts(
          attemptsData
        );

        // STATS

        const totalAttempts =
          attemptsData.length;

        const totalScore =
          attemptsData.reduce(
            (
              acc,
              item
            ) =>
              acc +
              (item.score || 0),
            0
          );

        const highestScore =
          Math.max(
            ...attemptsData.map(
              (item) =>
                item.score || 0
            ),
            0
          );

        setStats({
          totalAttempts,

          averageScore:
            totalAttempts > 0
              ? Math.round(
                  totalScore /
                    totalAttempts
                )
              : 0,

          highestScore,
        });

        // LIVE RANK CALCULATION

        const rankMap: any = {};

        for (const attempt of attemptsData) {

          const {
            data: leaderboardData,
          } = await supabase
            .from("exam_attempts")
            .select("*")
            .eq(
              "exam_id",
              attempt.exam_id
            )
            .order("score", {
              ascending: false,
            });

          if (leaderboardData) {

            const rank =
              leaderboardData.findIndex(
                (item) =>
                  item.user_id ===
                  user.id
              ) + 1;

            rankMap[
              attempt.exam_id
            ] = rank;
          }
        }

        setRanks(rankMap);
      }

      // CURRENT TIME

      const now =
        new Date()
          .toISOString();

      // LIVE EXAMS

      const {
        data: liveData,
      } = await supabase
        .from("exams")
        .select("*")
        .eq(
          "institute_id",
          profile?.institute_id
        )
        .lte(
          "start_time",
          now
        )
        .gte(
          "end_time",
          now
        )
        .order("start_time", {
          ascending: true,
        });

      if (liveData) {

        setLiveExams(
          liveData
        );
      }

      // UPCOMING EXAMS

      const {
        data: upcomingData,
      } = await supabase
        .from("exams")
        .select("*")
        .eq(
          "institute_id",
          profile?.institute_id
        )
        .gt(
          "start_time",
          now
        )
        .order("start_time", {
          ascending: true,
        });

      if (upcomingData) {

        setUpcomingExams(
          upcomingData
        );
      }

      setLoading(false);
    }

    loadDashboard();

  }, [router]);

  // LOADING

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="text-2xl font-bold">

          Loading Dashboard...

        </div>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-gray-50 p-6 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>

            <h1 className="text-4xl font-bold mb-2">

              Student Dashboard

            </h1>

            <p className="text-gray-600">

              Welcome back {" "}
              {user?.email}

            </p>

          </div>

          <button
            onClick={
              handleLogout
            }
            className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-600 transition"
          >

            Logout

          </button>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white border rounded-3xl p-6 shadow-sm">

            <p className="text-gray-500 mb-2">

              Total Attempts

            </p>

            <h2 className="text-5xl font-bold">

              {stats.totalAttempts}

            </h2>

          </div>

          <div className="bg-white border rounded-3xl p-6 shadow-sm">

            <p className="text-gray-500 mb-2">

              Average Score

            </p>

            <h2 className="text-5xl font-bold text-blue-600">

              {stats.averageScore}

            </h2>

          </div>

          <div className="bg-white border rounded-3xl p-6 shadow-sm">

            <p className="text-gray-500 mb-2">

              Highest Score

            </p>

            <h2 className="text-5xl font-bold text-green-600">

              {stats.highestScore}

            </h2>

          </div>

        </div>

        {/* LIVE EXAMS */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm mb-10">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-bold">

              Live Exams

            </h2>

            <div className="bg-green-100 text-green-700 border border-green-300 px-4 py-2 rounded-2xl font-bold">

              {liveExams.length}
              {" "}
              Live

            </div>

          </div>

          <div className="space-y-5">

            {liveExams.map((exam) => (

              <div
                key={exam.id}
                className="border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                <div>

                  <h3 className="text-2xl font-bold mb-2">

                    {exam.title}

                  </h3>

                  <p className="text-gray-600">

                    Ends:
                    {" "}

                    {new Date(
                      exam.end_time
                    ).toLocaleString(
                      "en-IN",
                      {
                        timeZone:
                          "Asia/Kolkata",
                      }
                    )}

                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <div className="text-green-600 font-bold text-xl">

                    ₹
                    {exam.reward_pool || 0}

                  </div>

                  <Link
                    href={`/exam/${exam.id}`}
                    className="bg-black text-white px-6 py-3 rounded-2xl font-bold"
                  >

                    Start Exam

                  </Link>

                </div>

              </div>

            ))}

            {liveExams.length === 0 && (

              <div className="text-center text-gray-500 py-8">

                No live exams right now

              </div>

            )}

          </div>

        </div>

        {/* ATTEMPT HISTORY */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm">

          <h2 className="text-3xl font-bold mb-6">

            My Exam History

          </h2>

          <div className="space-y-5">

            {attempts.map((attempt) => (

              <div
                key={attempt.id}
                className="border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                <div>

                  <h3 className="text-2xl font-bold mb-2">

                    Exam Attempt

                  </h3>

                  <p className="text-gray-600">

                    Attempted on:
                    {" "}

                    {new Date(
                      attempt.created_at
                    ).toLocaleString(
                      "en-IN",
                      {
                        timeZone:
                          "Asia/Kolkata",
                      }
                    )}

                  </p>

                  <p className="text-sm text-gray-500 mt-2">

                    Rank:
                    {" "}
                    #

                    {
                      ranks[
                        attempt.exam_id
                      ] || "-"
                    }

                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <div className="text-4xl font-bold text-blue-600">

                    {attempt.score}

                  </div>

                  <Link
                    href={`/leaderboard/${attempt.exam_id}`}
                    className="bg-gray-100 border px-5 py-3 rounded-2xl font-bold"
                  >

                    View Rank

                  </Link>

                </div>

              </div>

            ))}

            {attempts.length === 0 && (

              <div className="text-center text-gray-500 py-8">

                No attempts yet

              </div>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}
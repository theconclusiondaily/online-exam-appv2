"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";
import {
  useRouter,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function AdminLeaderboardsPage() {

  const router = useRouter();

  const [exams,
    setExams] =
    useState<any[]>([]);

  const [selectedExam,
    setSelectedExam] =
    useState("");

  const [attempts,
    setAttempts] =
    useState<any[]>([]);

  const [participantCount,
    setParticipantCount] =
    useState(0);

  const [averageScore,
    setAverageScore] =
    useState(0);

  // ADMIN CHECK + FETCH EXAMS

  useEffect(() => {

    async function initializePage() {

      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      if (!user) {

        router.push("/");

        return;
      }

     const {
  data: profile,
} = await supabase
  .from("users")
  .select("role")
  .eq(
    "id",
    user.id
  )
  .single();

console.log(profile);

if (
  profile?.role !== "admin" &&
  profile?.role !== "teacher"
) {

  alert(
    "Access Denied"
  );

  router.push(
    "/dashboard"
  );

  return;
}

      // FETCH EXAMS

      const {
        data,
        error,
      } = await supabase
        .from("exams")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      console.log(data);
      console.log(error);

      if (data) {
        setExams(data);
      }
    }

    initializePage();

  }, []);

  // FETCH LEADERBOARD

  useEffect(() => {

    async function fetchLeaderboard() {

      if (!selectedExam) return;

      const {
        data,
        error,
      } = await supabase
        .from("exam_attempts")
        .select("*")
        .eq(
          "exam_id",
          selectedExam
        )
        .order("score", {
          ascending: false,
        });

      console.log(data);
      console.log(error);

      if (data) {

        const sorted =
          [...data].sort(
            (a, b) =>
              b.score - a.score
          );

        setAttempts(sorted);

        setParticipantCount(
          sorted.length
        );

        // AVERAGE SCORE

        const total =
          sorted.reduce(
            (sum, item) =>
              sum + item.score,
            0
          );

        const avg =
          sorted.length > 0

            ? total / sorted.length

            : 0;

        setAverageScore(
          Number(
            avg.toFixed(2)
          )
        );
      }
    }

    fetchLeaderboard();

  }, [selectedExam]);

  return (

  <AdminGuard>

    <main className="min-h-screen p-4 md:p-8 bg-gray-50">

      <div className="max-w-7xl mx-auto">

        {/* NAVIGATION */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <h1 className="text-4xl font-bold">
            Admin Leaderboards
          </h1>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/admin"
              className="bg-white border px-4 py-2 rounded-xl"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/questions"
              className="bg-white border px-4 py-2 rounded-xl"
            >
              Questions
            </Link>

            <Link
              href="/admin/users"
              className="bg-white border px-4 py-2 rounded-xl"
            >
              Users
            </Link>

            <Link
              href="/admin/leaderboards"
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              Leaderboards
            </Link>

            <Link
              href="/admin/papers"
              className="bg-white border px-4 py-2 rounded-xl"
            >
              Question Papers
            </Link>

          </div>

        </div>

        {/* SELECT EXAM */}

        <div className="bg-white border rounded-2xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Select Exam
          </h2>

          <select
            value={selectedExam}
            onChange={(e) =>
              setSelectedExam(
                e.target.value
              )
            }
            className="border p-3 rounded-xl w-full"
          >

            <option value="">
              Select Exam
            </option>

            {exams.map((exam) => (

              <option
                key={exam.id}
                value={exam.id}
              >
                {exam.title}
              </option>

            ))}

          </select>

        </div>

        {/* ANALYTICS */}

        {selectedExam && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

            <div className="bg-white border rounded-2xl p-6">

              <p className="text-gray-500 text-sm mb-2">
                Participants
              </p>

              <h2 className="text-4xl font-bold">
                {participantCount}
              </h2>

            </div>

            <div className="bg-white border rounded-2xl p-6">

              <p className="text-gray-500 text-sm mb-2">
                Average Score
              </p>

              <h2 className="text-4xl font-bold text-green-600">
                {averageScore}
              </h2>

            </div>

          </div>

        )}

        {/* LEADERBOARD */}

        {selectedExam && (

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Leaderboard
            </h2>

            <div className="space-y-4">

              {attempts.map(
                (attempt, index) => (

                  <div
                    key={attempt.id}
                    className={`border rounded-2xl p-5 shadow-sm ${
                      index === 0

                        ? "bg-yellow-100"

                        : index === 1

                        ? "bg-gray-100"

                        : index === 2

                        ? "bg-orange-100"

                        : "bg-white"
                    }`}
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <h2 className="text-2xl font-bold">

                          #{index + 1}

                        </h2>

                        <p className="text-gray-600 mt-1">

                          User ID:
                          {" "}
                          {attempt.user_id.slice(
                            0,
                            8
                          )}

                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-4xl font-bold text-green-600">
                          {attempt.score}
                        </p>

                        <p className="text-sm text-gray-500">
                          Score
                        </p>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}

      </div>

    </main>

</AdminGuard>
);
}
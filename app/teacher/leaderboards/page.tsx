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

export default function TeacherLeaderboardsPage() {

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

  const [profile,
    setProfile] =
    useState<any>(null);

  // LOAD PAGE

  useEffect(() => {

    async function initializePage() {

      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      if (!user) {

        router.push("/login");

        return;
      }

      // GET PROFILE

      const {
        data: profileData,
      } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (
        profileData?.role !==
        "teacher"
      ) {

        router.push("/dashboard");

        return;
      }

      setProfile(profileData);

      // FETCH ONLY TEACHER INSTITUTE EXAMS

      const {
        data,
      } = await supabase
        .from("exams")
        .select("*")
        .eq(
          "institute_id",
          profileData.institute_id
        )
        .order("created_at", {
          ascending: false,
        });

      if (data) {

        setExams(data);
      }
    }

    initializePage();

  }, [router]);

  // FETCH LEADERBOARD

  useEffect(() => {

    async function fetchLeaderboard() {

      if (!selectedExam) return;

      const {
        data,
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

      if (data) {

        setAttempts(data);

        setParticipantCount(
          data.length
        );

        const total =
          data.reduce(
            (sum, item) =>
              sum + item.score,
            0
          );

        const avg =
          data.length > 0

            ? total / data.length

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

    <main className="min-h-screen p-4 md:p-8 bg-gray-50">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">

            Teacher Leaderboards

          </h1>

          <Link
            href="/teacher"
            className="bg-black text-white px-5 py-2 rounded-xl"
          >

            Dashboard

          </Link>

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
                    className="bg-white border rounded-2xl p-5"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <h2 className="text-2xl font-bold">

                          #{index + 1}

                        </h2>

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
  );
}
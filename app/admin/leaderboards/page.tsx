"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminGuard from "@/components/AdminGuard";

import { supabase }
from "@/lib/supabase/client";

export default function AdminLeaderboardsPage() {

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

  // FETCH EXAMS

  useEffect(() => {

    async function fetchExams() {

      const {
        data,
        error,
      } = await supabase
        .from("exams")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      console.log(
        "EXAMS:",
        data
      );

      console.log(
        "EXAMS ERROR:",
        error
      );

      if (data) {

        setExams(data);
      }
    }

    fetchExams();

  }, []);

  // FETCH LEADERBOARD

  useEffect(() => {

   async function fetchLeaderboard() {

  if (!selectedExam) {

    setAttempts([]);

    setParticipantCount(0);

    setAverageScore(0);

    return;
  }

  const {
    data,
    error,
  } = await supabase
    .from("exam_attempts")
    .select("*")
    .eq(
      "exam_id",
      selectedExam
    );

  if (error) {

    alert(
      error.message
    );

    return;
  }

  if (data) {

    // SORT BY SCORE

    const sortedData =
      data.sort(
        (a, b) => {

          // HIGHER SCORE FIRST

          if (
            b.score !==
            a.score
          ) {

            return (
              b.score -
              a.score
            );
          }

          // EARLIER SUBMISSION WINS

          return (
            new Date(
              a.created_at
            ).getTime() -

            new Date(
              b.created_at
            ).getTime()
          );
        }
      );

    setAttempts(
      [...sortedData]
    );

    setParticipantCount(
      sortedData.length
    );

    const totalScore =
      sortedData.reduce(
        (
          sum,
          item
        ) =>
          sum +
          (item.score || 0),
        0
      );

    const avg =
      sortedData.length > 0

        ? totalScore /
          sortedData.length

        : 0;

    setAverageScore(
      Number(
        avg.toFixed(2)
      )
    );
  }
}

    fetchLeaderboard();

  const interval =
    setInterval(() => {

      fetchLeaderboard();

    }, 5000);

  return () =>
    clearInterval(
      interval
    );

}, [selectedExam]);

  return (

    <AdminGuard>

      <main className="min-h-screen bg-gray-50 p-6 md:p-5">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}

          <div className="flex justify-between items-center mb-10">

            <h1 className="text-2xl font-bold">

              Leaderboards

            </h1>

            <a
              href="/admin"
              className="bg-black text-white px-4 py-2 rounded-xl"
            >

              Dashboard

            </a>

          </div>

          {/* SELECT EXAM */}

          <div className="bg-white border rounded-3xl p-6 shadow-sm mb-10">

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
              className="w-full border rounded-2xl p-4"
            >

              <option value="">
                Select Exam
              </option>

              {exams.map(
                (exam) => (

                  <option
                    key={exam.id}
                    value={exam.id}
                  >

                    {exam.title}

                  </option>

                )
              )}

            </select>

          </div>

          {/* ANALYTICS */}

          {selectedExam && (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">

              <div className="bg-white border rounded-3xl p-6 shadow-sm">

                <p className="text-gray-500 mb-2">

                  Participants

                </p>

                <h2 className="text-3xl font-bold">

                  {participantCount}

                </h2>

              </div>

              <div className="bg-white border rounded-3xl p-6 shadow-sm">

                <p className="text-gray-500 mb-2">

                  Average Score

                </p>

                <h2 className="text-3xl font-bold text-green-600">

                  {averageScore}

                </h2>

              </div>

            </div>

          )}

          {/* LEADERBOARD */}

          {selectedExam && (

            <div>

              <div className="flex items-center justify-between mb-3">

                <h2 className="text-3xl font-bold">

                  Leaderboard

                </h2>

               <div className="bg-tcd-gold/20 text-tcd-blue border border-tcd-gold px-4 py-2 rounded-2xl font-bold">

                  Learning Journeys:
                  {" "}
                  {attempts.length}

                </div>

              </div>

              <div className="space-y-4">

                {attempts.map(
                  (
                    attempt,
                    index
                  ) => (

                    <div
                      key={attempt.id}
                      className={`border rounded-3xl p-6 shadow-sm ${
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

                          <h2 className="text-3xl font-bold mb-2">

                            Rank
                            {" "}
                            #{index + 1}

                          </h2>

                          <p className="text-gray-600">

                            User:
                            {" "}

                            {attempt.user_id.slice(
                              0,
                              8
                            )}

                          </p>

                        </div>

                        <div className="text-right">

                          <h2 className="text-3xl font-bold text-green-600">

                            {attempt.score}

                          </h2>

                          <p className="text-gray-500 mt-1">

                            Score

                          </p>

                        </div>

                      </div>

                    </div>

                  )
                )}

                {attempts.length === 0 && (

                  <div className="bg-white border rounded-3xl p-6 text-center text-gray-500 shadow-sm">

                    No learning journeys recorded yet

                  </div>

                )}

              </div>

            </div>

          )}

        </div>

      </main>

    </AdminGuard>
  );
}
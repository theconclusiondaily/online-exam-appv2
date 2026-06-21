"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import { supabase }
from "@/lib/supabase/client";
import { TCDIcons } from "@/components/ui/tcd-icons";
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

  .select(`
    *,
    users (
      name,
      prestige_level
    )
  `)

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

          <div
  className="
    relative
    overflow-hidden

    bg-gradient-to-br
    from-tcd-blue
    via-[#35548C]
    to-[#203B63]

    rounded-[30px]

    p-8

    text-white

    mb-6

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

  <div className="relative z-10 flex justify-between items-center">

    <div>

      <div
        className="
          inline-flex
          items-center
          gap-3

          px-4
          py-2

          rounded-full

          bg-tcd-gold/15

          border
          border-tcd-gold/20

          text-tcd-gold

          mb-3
        "
      >
<div className="w-5 h-5">

    {TCDIcons.achievement}

  </div> Leaderboard Command Center

      </div>

      <h1
        className="
          text-4xl
          font-black
        "
      >
        Exam Leaderboards
      </h1>

      <p className="text-white/80 mt-2">

        Monitor rankings, scores and
        performance across all exams.

      </p>

    </div>

    <Link
      href="/admin"
      className="
        bg-white/10
        backdrop-blur-md

        px-5
        py-3

        rounded-2xl

        border
        border-white/20

        font-bold
      "
    >
      Dashboard
    </Link>

  </div>

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

              <div className="bg-white

rounded-[28px]

border
border-tcd-gold/10

shadow-lg

hover:shadow-xl
hover:-translate-y-1

transition-all

p-6">

                <p className="text-tcd-primary mb-2">
<div className="mb-3">

  {TCDIcons.coin}

</div>
                  Participants

                </p>

                <h2 className="text-3xl font-bold">

                  {participantCount}

                </h2>

              </div>

              <div className="bg-white

rounded-[28px]

border
border-tcd-gold/10

shadow-lg

hover:shadow-xl
hover:-translate-y-1

transition-all

p-6">

                <p className="text-tcd-primary mb-2">
<div className="mb-3">

  {TCDIcons.mastery}

</div>
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
  ? "bg-gradient-to-r from-[#FFF4C7] to-[#FFE082] border-[#D4AF37]"

  : index === 1
  ? "bg-gradient-to-r from-[#F5F5F5] to-[#E5E7EB]"

  : index === 2
  ? "bg-gradient-to-r from-[#FFE0B2] to-[#FFCC80]"

  : "bg-white"
                      }`}
                    >

                      <div className="flex justify-between items-center">

                        <div>

                          <h2 className="text-3xl font-bold mb-2">

                            <div
  className="
    flex
    items-center
    gap-3
  "
>

  <div className="w-7 h-7">

    {TCDIcons.achievement}

  </div>

  <h2
    className="
      text-3xl
      font-black
    "
  >

    Rank #{index + 1}

  </h2>

</div>

                          </h2>

                         <div className="space-y-1">

  <p
    className="
      text-xl
      font-bold
      text-tcd-blue
    "
  >

    {attempt.users?.name ||
      "Student"}

  </p>

  <p className="text-brand">

    Prestige:
    {" "}

    {attempt.users
      ?.prestige_level ||
      "Scholar"}

  </p>

</div>

                        </div>

                        <div
  className="
    flex
    items-center
    gap-2

    bg-tcd-gold/10

    text-tcd-blue

    px-4
    py-2

    rounded-2xl
  "
>

  {TCDIcons.mastery}

  <span
    className="
      font-black
      text-2xl
    "
  >
    {attempt.score}
  </span>

</div>

                      </div>

                    </div>

                  )
                )}

                {attempts.length === 0 && (

                  <div className="bg-white border rounded-3xl p-6 text-center text-tcd-primary shadow-sm">

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
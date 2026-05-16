"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
} from "next/navigation";

import { supabase }
from "@/lib/supabase/client";

export default function LeaderboardPage() {

  const params =
    useParams();

  const examId =
    Array.isArray(
      params.id
    )
      ? params.id[0]
      : params.id;

  const [attempts,
    setAttempts] =
    useState<any[]>([]);

  const [currentUserId,
    setCurrentUserId] =
    useState("");

  // FETCH LEADERBOARD

  async function fetchLeaderboard() {

    if (!examId) {
      return;
    }

    // CURRENT USER

    const {
      data: { user },
    } = await supabase
      .auth
      .getUser();

    if (user) {

      setCurrentUserId(
        user.id
      );
    }

    // FETCH ATTEMPTS

    const {
      data,
      error,
    } = await supabase
      .from("exam_attempts")
      .select("*")
      .eq(
        "exam_id",
        examId
      );

    if (error) {

      console.log(error);

      return;
    }

    if (data) {

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
    }
  }

  // POLLING

  useEffect(() => {

    fetchLeaderboard();

    const interval =
      setInterval(() => {

        fetchLeaderboard();

      }, 5000);

    return () =>
      clearInterval(
        interval
      );

  }, [examId]);

  return (

    <main className="min-h-screen bg-gray-50 p-4 md:p-8">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-4xl font-bold mb-2">

              Leaderboard

            </h1>

            <p className="text-gray-600">

              Total Participants:
              {" "}
              {attempts.length}

            </p>

          </div>

          <Link
            href="/dashboard"
            className="bg-black text-white px-5 py-3 rounded-2xl font-bold w-fit"
          >

            Back to Dashboard

          </Link>

        </div>

        {/* LEADERBOARD */}

        <div className="space-y-4">

          {attempts.map(
            (
              attempt,
              index
            ) => (

              <div
                key={attempt.id}
                className={`border rounded-2xl p-5 shadow-sm transition-all ${
                  attempt.user_id ===
                  currentUserId

                    ? "border-blue-500 bg-blue-50"

                    : index === 0

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

                    <h2 className="text-3xl font-bold">

                      #{index + 1}

                    </h2>

                    <p className="text-gray-600 mt-2">

                      User:
                      {" "}

                      {attempt.user_id.slice(
                        0,
                        8
                      )}

                    </p>

                    {attempt.user_id ===
                      currentUserId && (

                      <p className="text-blue-600 font-bold mt-3">

                        You

                      </p>

                    )}

                  </div>

                  <div className="text-right">

                    <p className="text-5xl font-bold text-green-600">

                      {attempt.score}

                    </p>

                    <p className="text-sm text-gray-500 mt-1">

                      Score

                    </p>

                  </div>

                </div>

              </div>

            )
          )}

          {attempts.length === 0 && (

            <div className="bg-white border rounded-2xl p-10 text-center text-gray-500">

              No participants yet

            </div>

          )}

        </div>

      </div>

    </main>
  );
}
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
const [liveUpdate,
  setLiveUpdate] =
  useState(false);
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
    [...data].sort(
      (a, b) => {

        // 1. HIGHER SCORE FIRST

        if (
          Number(b.score || 0) !==
          Number(a.score || 0)
        ) {

          return (
            Number(b.score || 0)
            -
            Number(a.score || 0)
          );
        }

        // 2. HIGHER ACCURACY FIRST

        if (
          Number(
            b.accuracy || 0
          ) !==
          Number(
            a.accuracy || 0
          )
        ) {

          return (
            Number(
              b.accuracy || 0
            )
            -
            Number(
              a.accuracy || 0
            )
          );
        }

        // 3. LESS TIME TAKEN WINS

        if (
          Number(
            a.time_taken || 0
          ) !==
          Number(
            b.time_taken || 0
          )
        ) {

          return (
            Number(
              a.time_taken || 0
            )
            -
            Number(
              b.time_taken || 0
            )
          );
        }
      
        // 4. EARLIER SUBMISSION WINS

        return (
          new Date(
            a.submitted_at ||
            a.created_at
          ).getTime()

          -

          new Date(
            b.submitted_at ||
            b.created_at
          ).getTime()
        );
      }
    );

  setAttempts(
    sortedData
  );
 }
  }
  // POLLING

  useEffect(() => {

  fetchLeaderboard();

  // REALTIME SUBSCRIPTION

  const channel =
    supabase

      .channel(
        `leaderboard-${examId}`
      )

      .on(
        "postgres_changes",

        {

          event: "*",

          schema: "public",

          table:
            "exam_attempts",

          filter:
            `exam_id=eq.${examId}`,
        },

        () => {

          setLiveUpdate(true);

          fetchLeaderboard();

          setTimeout(() => {

            setLiveUpdate(
              false
            );

          }, 1500);
        }
      )

      .subscribe();

  return () => {

    supabase.removeChannel(
      channel
    );
  };

}, [examId]);

  const sortedAttempts =
  [...attempts].sort(
    (a, b) => {

      // 1. Score DESC

      if (
        Number(b.score || 0) !==
        Number(a.score || 0)
      ) {

        return (
          Number(b.score || 0)
          -
          Number(a.score || 0)
        );
      }

      // 2. Accuracy DESC

      if (
        Number(
          b.accuracy || 0
        ) !==
        Number(
          a.accuracy || 0
        )
      ) {

        return (
          Number(
            b.accuracy || 0
          )
          -
          Number(
            a.accuracy || 0
          )
        );
      }

      // 3. Time Taken ASC

      if (
        Number(
          a.time_taken || 0
        ) !==
        Number(
          b.time_taken || 0
        )
      ) {

        return (
          Number(
            a.time_taken || 0
          )
          -
          Number(
            b.time_taken || 0
          )
        );
      }

      // 4. Earlier Submission ASC

      return (
        new Date(
          a.created_at
        ).getTime()
        -
        new Date(
          b.created_at
        ).getTime()
      );
    }
  );
  
  return (

    <main className="min-h-screen bg-gray-50 p-4 md:p-5">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">

          <div>

            <h1 className="text-4xl font-bold mb-2">

              Leaderboard

            </h1>

          <div className="mt-3">

  <div className="flex items-center gap-3 flex-wrap">

    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

    <p className="text-green-600 font-bold">

      LIVE LEADERBOARD

    </p>

    {liveUpdate && (

      <div className="bg-tcd-gold/20 text-tcd-blue px-3 py-1 rounded-xl text-sm font-bold animate-pulse">

        Updating...

      </div>

    )}

  </div>

  <p className="text-gray-600 mt-2">

    Total Participants:
    {" "}
    {attempts.length}

  </p>

</div>
</div>

          <Link
            href="/dashboard"
            className="bg-black text-white px-4 py-3 rounded-2xl font-bold w-fit"
          >

            Back to Dashboard

          </Link>

        </div>

        {/* LEADERBOARD */}

        <div className="space-y-4">

         {sortedAttempts.map(
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

                    <h2 className="text-3xl font-bold flex items-center gap-3">

  {index === 0 && "🥇"}

  {index === 1 && "🥈"}

  {index === 2 && "🥉"}

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

                    <p className="text-3xl font-bold text-green-600">

                      {attempt.score}

                    </p>

                    <div className="mt-4">

  <p className="text-sm text-gray-500">

    Score

  </p>

  <div className="flex flex-wrap justify-end gap-2 mt-3">

       <div className="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-sm font-bold">

      Percentage:
      {" "}

      {attempt.percentage || 0}%

    </div>
<div className="mt-2 text-sm text-gray-600">

  🎯 Accuracy:
  {" "}
  {attempt.accuracy || 0}%

</div>

<div className="text-sm text-gray-600">

  ⏱️ Time:
  {" "}
  {Math.floor(
    (attempt.time_taken || 0) / 60
  )}
  m
  {" "}
  {(attempt.time_taken || 0) % 60}
  s

</div>
  </div>

</div>

                  </div>

                </div>

              </div>

            )
          )}

          {attempts.length === 0 && (

            <div className="bg-white border rounded-2xl p-6 text-center text-gray-500">

              No participants yet

            </div>

          )}

        </div>

      </div>

    </main>
  );
}
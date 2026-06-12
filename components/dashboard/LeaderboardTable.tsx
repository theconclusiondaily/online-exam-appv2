"use client";

import {
  useEffect,
  useState,
} from "react";

import { Trophy } from "lucide-react";

import { supabase }
from "@/lib/supabase/client";
import { motion } from "framer-motion";

export default function LeaderboardTable() {

  const [leaders, setLeaders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [liveExam, setLiveExam] =
    useState<any>(null);
const [lastUpdated, setLastUpdated] =
  useState("");
  useEffect(() => {

    async function loadLeaderboard() {

      // FIND LIVE EXAM

const now =
  new Date()
    .toISOString();

const {
  data: currentLiveExam,
  error: liveExamError,
} = await supabase

  .from("exams")

  .select("*")

  .lte(
    "start_time",
    now
  )

  .gte(
    "end_time",
    now
  )

  .order(
    "start_time",
    {
      ascending: true,
    }
  )

  .limit(1)

  .maybeSingle();

console.log(
  currentLiveExam
);
setLiveExam(
  currentLiveExam
);
console.log(
  liveExamError
);

      // FETCH ONLY LIVE EXAM LEADERBOARD

     const {
  data,
  error,
} = await supabase
  .from("leaderboard_view")
  .select("*")
  .eq("exam_id", currentLiveExam.id)
  .order("score", {
    ascending: false,
  })
  .limit(10);

      if (error) {
        console.log(error);
        return;
      }
      console.log(
  "LIVE EXAM:",
  currentLiveExam
);
console.log(
  "LEADERBOARD DATA:",
  data
);
      setLeaders(data || []);

      setLoading(false);
      setLastUpdated(
  new Date().toLocaleTimeString(
    "en-IN"
  )
);
    }

    loadLeaderboard();
console.log(
  "LEADERBOARD FUNCTION STARTED"
);
    const interval =
      setInterval(() => {
        loadLeaderboard();
      }, 30000);

    return () =>
      clearInterval(interval);

  }, []);
console.log(
  "FETCHING LEADERBOARD..."
);
  if (loading) {

    return (
      <div className="bg-white rounded-3xl p-6 shadow-xl">
        Loading Leaderboard...
      </div>
    );
  }

  if (!liveExam) {

    return (

      <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl text-center">

        <h2 className="text-3xl font-bold mb-3">
          No Live Exam
        </h2>

        <p className="text-gray-500">
          Leaderboard will appear when an exam goes live.
        </p>

      </div>

    );
  }

  return (

    <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl">

      {/* HEADER */}

      <div className="flex items-center gap-3 mb-3">

        <Trophy className="text-yellow-500" />

       <div>

  <h2 className="text-3xl font-bold">
    {liveExam.title}
  </h2>

  <div className="flex items-center gap-3 mt-1">

    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>

    <p className="text-gray-500">
      Live Exam Leaderboard
    </p>

  </div>

  <p className="text-sm text-gray-300 mt-2">
    Updated:
    {" "}
    {lastUpdated}
  </p>

</div>

      </div>

      {/* TOP STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">

        <div className="bg-blue-50 rounded-2xl p-4">

          <h3 className="text-sm text-gray-500 mb-1">
            Total Players
          </h3>

          <p className="text-3xl font-bold">
            {leaders.length}
          </p>

        </div>

        <div className="bg-green-50 rounded-2xl p-4">

          <h3 className="text-sm text-gray-700 mb-1">
            Highest Score
          </h3>

          <p className="text-3xl font-bold">
            {leaders[0]?.score || 0}
          </p>

        </div>

        <div className="bg-yellow-50 rounded-2xl p-4">

          <h3 className="text-sm text-gray-500 mb-1">
            Top Rank
          </h3>

          <p className="text-3xl font-bold">
            🥇
          </p>

        </div>

      </div>

      {/* LEADERBOARD */}

      <div className="space-y-4">

        {leaders.map(
          (leader, index) => (

            <motion.div
  key={leader.id}

  initial={{
    opacity: 0,
    y: 20,
  }}

  animate={{
    opacity: 1,
    y: 0,
  }}

  transition={{
    duration: 0.3,
  }}

  className={`
    flex items-center justify-between
    rounded-2xl p-3 border transition-all
    hover:scale-[1.02]

    ${
      index === 0
        ? "bg-yellow-50 border-yellow-300 shadow-lg"
        : index === 1
        ? "bg-gray-100 border-gray-300"
        : index === 2
        ? "bg-orange-50 border-orange-300"
        : "bg-white"
    }
  `}
>
              

              <div className="flex items-center gap-2">

               <div
  className={`
    w-12 h-12 rounded-full text-white
    flex items-center justify-center font-bold

    ${
      index === 0
        ? "bg-yellow-500"
        : "bg-blue-600"
    }
  `}
>

                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : `#${index + 1}`}

                </div>

                <div>

                  <h3 className="font-bold text-lg">

                    {leader.name || "Student"}

                  </h3>

                  <div className="flex gap-2 text-sm text-gray-500">

                    <p>
                      Correct:
                      {" "}
                      {leader.correct_answers}
                    </p>

                    <p>
                      Percentile:
                      {" "}
                      {leader.percentile || 0}%
                    </p>

                  </div>

                </div>

              </div>

              <div className="text-right">

                <h2 className="text-2xl font-bold text-blue-600">

                  {leader.score}

                </h2>

                <p className="text-gray-500 text-sm">

                  Score

                </p>

              </div>

            </motion.div>

          )
        )}

      </div>

    </div>
  );
}
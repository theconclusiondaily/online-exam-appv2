"use client";

import { memo } from "react";

import ExamTimer
from "./ExamTimer";

type Props = {

  timeLeft: number;

  formatTime: (
    seconds: number
  ) => string;

  liveScore: number;

  liveRank:
    number | null;

  previousRank:
    number | null;

  topScore: number;

  liveStudents: number;

  violations: number;
};

function ExamTopStats({

  timeLeft,

  formatTime,

  liveScore,

  liveRank,

  previousRank,

  topScore,

  liveStudents,

  violations,

}: Props) {

  return (

    <div className="flex gap-3 flex-wrap items-stretch">

      {/* TIMER */}

      <ExamTimer
        timeLeft={timeLeft}
        formatTime={formatTime}
      />

      {/* LIVE SCORE */}

      <div className="bg-blue-500/20 border border-blue-500/30 px-5 py-3 rounded-2xl">

        <p className="text-sm text-blue-700">

          Live Score

        </p>

        <h2 className="text-2xl font-bold text-blue-900">

          {liveScore}

        </h2>

      </div>

      {/* LIVE RANK */}

      <div className="bg-yellow-500/20 border border-yellow-500/30 px-5 py-3 rounded-2xl">

        <p className="text-sm text-yellow-700">

          Current Rank

        </p>

        <h2 className="text-2xl font-bold text-yellow-900">

          #{liveRank || "--"}

        </h2>

        {previousRank &&
          liveRank && (

          <p
            className={`text-sm font-bold mt-1

              ${
                liveRank <
                previousRank

                  ? "text-green-600"

                  : liveRank >
                    previousRank

                  ? "text-red-600"

                  : "text-gray-500"
              }
            `}
          >

            {
              liveRank <
              previousRank

                ? `↑ ${
                    previousRank -
                    liveRank
                  }`

                : liveRank >
                  previousRank

                ? `↓ ${
                    liveRank -
                    previousRank
                  }`

                : "No Change"
            }

          </p>

        )}

      </div>

      {/* TOP SCORE */}

      <div className="bg-purple-500/20 border border-purple-500/30 px-5 py-3 rounded-2xl">

        <p className="text-sm text-purple-700">

          Top Score

        </p>

        <h2 className="text-2xl font-bold text-purple-900">

          {topScore}

        </h2>

      </div>

      {/* LIVE STUDENTS */}

      <div className="bg-green-500/20 border border-green-500/30 px-5 py-3 rounded-2xl">

        <p className="text-sm text-green-700">

          Students Live

        </p>

        <h2 className="text-2xl font-bold text-green-900">

          {liveStudents}

        </h2>

      </div>

      {/* VIOLATIONS */}

      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-2xl font-bold">

        Violations:
        {" "}
        {violations}/2

      </div>

    </div>
  );
}

export default memo(
  ExamTopStats
);
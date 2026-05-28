"use client";

import React from "react";

import ExamTimer
from "./ExamTimer";

type Props = {

  liveStudents: number;

  violations: number;

  onTimeUp: () => void;
};

function ExamTopStats({

  liveStudents,

  violations,

  onTimeUp,

}: Props) {

  return (

    <div className="flex gap-3 flex-wrap items-stretch">

      {/* TIMER */}

      <ExamTimer
        initialTime={1800}
        onTimeUp={
          onTimeUp
        }
      />

      {/* LIVE STUDENTS */}

      <div className="bg-green-500/20 border border-green-500/30 px-4 py-3 rounded-2xl">

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

export default React.memo(
  ExamTopStats
);
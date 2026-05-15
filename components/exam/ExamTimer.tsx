"use client";

import { Clock3 }
from "lucide-react";

import { memo }
from "react";

type ExamTimerProps = {

  timeLeft: number;

  formatTime: (
    seconds: number
  ) => string;
};

function ExamTimer({
  timeLeft,
  formatTime,
}: ExamTimerProps) {

  return (

    <div className="bg-red-500/20 border border-red-500/30 px-5 py-3 rounded-2xl flex items-center gap-3">

      <Clock3 className="text-red-400" />

      <span className="text-2xl font-bold text-red-300">

        {formatTime(timeLeft)}

      </span>

    </div>
  );
}

export default memo(
  ExamTimer
);
"use client";

import React, {
  useEffect,
  useState,
} from "react";

type Props = {

  initialTime: number;

  onTimeUp: () => void;
};

function ExamTimer({

  initialTime,

  onTimeUp,

}: Props) {

  const [timeLeft,
    setTimeLeft] =
    useState(initialTime);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setTimeLeft(
          (prev) => {

            if (prev <= 1) {

              clearInterval(
                interval
              );

              onTimeUp();

              return 0;
            }

            return prev - 1;
          }
        );

      }, 1000);

    return () =>
      clearInterval(
        interval
      );

  }, [onTimeUp]);

  function formatTime(
    seconds: number
  ) {

    const mins =
      Math.floor(
        seconds / 60
      );

    const secs =
      seconds % 60;

    return `${mins}:${secs
      .toString()
      .padStart(
        2,
        "0"
      )}`;
  }

  return (

    <div className="bg-red-500/20 border border-red-500/30 px-4 py-3 rounded-2xl">

      <p className="text-sm text-red-700">

        Time Left

      </p>

      <h2 className="text-2xl font-bold text-red-900">

        {formatTime(timeLeft)}

      </h2>

    </div>
  );
}

export default React.memo(
  ExamTimer
);
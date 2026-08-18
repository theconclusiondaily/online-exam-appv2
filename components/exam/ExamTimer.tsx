"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  initialTime: number;
  examStartTime: number | null;
  onTimeUp: () => void;
};

function ExamTimer({
  initialTime,
  examStartTime,
  onTimeUp,
}: Props) {

  const [timeLeft, setTimeLeft] =
  useState(() => {
    if (!examStartTime) {
      return initialTime;
    }

    const elapsedSeconds =
      Math.floor(
        (Date.now() - examStartTime) /
          1000
      );

    return Math.max(
      initialTime - elapsedSeconds,
      0
    );
  });
const onTimeUpRef = useRef(onTimeUp);
useEffect(() => {
  onTimeUpRef.current = onTimeUp;
}, [onTimeUp]);
const timeUpCalledRef =
  useRef(false);

useEffect(() => {
  timeUpCalledRef.current =
    false;
}, [examStartTime]);
useEffect(() => {
  if (!examStartTime) {
    return;
  }

  const calculateTimeLeft = () => {
    const elapsedSeconds =
      Math.floor(
        (Date.now() - examStartTime) /
          1000
      );

    const remaining =
      Math.max(
        initialTime - elapsedSeconds,
        0
      );

    setTimeLeft(
      remaining
    );

    if (
      remaining <= 0 &&
      !timeUpCalledRef.current
    ) {
      timeUpCalledRef.current =
        true;

      onTimeUpRef.current();
    }
  };

  calculateTimeLeft();

  const interval =
    window.setInterval(
      calculateTimeLeft,
      1000
    );

  return () => {
    window.clearInterval(
      interval
    );
  };
}, [
  examStartTime,
  initialTime,
]);

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
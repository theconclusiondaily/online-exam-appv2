"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { formatRupees } from "@/lib/finance/formatter";

import { TCDIcons } from "@/components/ui/tcd-icons";

interface UpcomingExamCardProps {
  exam: any | null;
}

export default function UpcomingExamCard({
  exam,
}: UpcomingExamCardProps) {
const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isLive: false,
  startingSoon: false,
});

useEffect(() => {
  if (!exam) return;

  const updateCountdown = () => {
    const now = new Date().getTime();

    const start = new Date(
      exam.start_time
    ).getTime();

    const end = new Date(
      exam.end_time
    ).getTime();

    if (
      now >= start &&
      now <= end
    ) {
      setTimeLeft((prev) => ({
        ...prev,
        isLive: true,
        startingSoon: false,
      }));

      return;
    }

    const diff = start - now;

    if (diff <= 0) {
      return;
    }

    setTimeLeft({
      days: Math.floor(
        diff / (1000 * 60 * 60 * 24)
      ),

      hours: Math.floor(
        (diff / (1000 * 60 * 60)) % 24
      ),

      minutes: Math.floor(
        (diff / (1000 * 60)) % 60
      ),

      seconds: Math.floor(
        (diff / 1000) % 60
      ),

      isLive: false,

      startingSoon:
        diff <=
        15 * 60 * 1000,
    });
  };

  updateCountdown();

  const timer =
    setInterval(
      updateCountdown,
      1000
    );

  return () =>
    clearInterval(timer);

}, [exam]);
  if (!exam) {

  return (
  <div
    className={`
bg-white
rounded-[30px]
border
shadow-sm
p-8
mb-8
transition-all
duration-500

${
  timeLeft.startingSoon
    ? "border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.35)]"
    : "border-gray-100"
}
`}
  >

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className="w-14 h-14">

          {TCDIcons.target}

        </div>

        <div>

          <p className="text-sm text-tcd-primary">

            Next Exam

          </p>

          <h2 className="text-3xl font-black text-tcd-blue">

            {exam.title}

          </h2>

        </div>

      </div>

      <span
        className={`
          px-4
          py-2
          rounded-full
          font-bold
          text-sm

          ${
            timeLeft.isLive
              ? "bg-green-100 text-green-700"

              : timeLeft.startingSoon
              ? "bg-yellow-100 text-yellow-700"

              : exam.exam_scope === "public"

              ? "bg-blue-100 text-blue-700"

              : "bg-tcd-gold/20 text-tcd-blue"
          }
        `}
      >

        {timeLeft.isLive
          ? <div className="flex items-center gap-2">

<div
className="
w-3
h-3

rounded-full

bg-green-500

animate-pulse
"
/>

LIVE NOW

</div>

          : timeLeft.startingSoon
          ? "STARTING SOON"

          : exam.exam_scope?.toLowerCase() ===
            "public"

          ? "PUBLIC"

          : "INSTITUTE"}

      </span>
{exam.reward_pool >= 100000 && (

<div
className="
mt-3
text-right
"
>

<span
className="
inline-flex
items-center

px-3
py-1

rounded-full

bg-[#D4AF37]

text-white

text-xs

font-bold
"
>

🏆 HIGH REWARD

</span>

</div>

)}
    </div>
    {/* INFO GRID */}

<div
  className="
    grid
    grid-cols-2
lg:grid-cols-3
xl:grid-cols-7
    gap-5
    mt-8
  "
>

  <div
    className="
      bg-[#F7F9FC]
      rounded-2xl
      p-4
      text-center
    "
  >

    <div className="w-10 h-10 mx-auto mb-3">

      {TCDIcons.calendar}

    </div>

    <p className="text-xs text-tcd-primary">

      Date

    </p>

    <p
      className="
        font-bold
        text-tcd-blue
        mt-1
      "
    >

      {
        new Date(
          exam.start_time
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      }

    </p>

  </div>

  <div
    className="
      bg-[#F7F9FC]
      rounded-2xl
      p-4
      text-center
    "
  >

    <div className="w-10 h-10 mx-auto mb-3">

      {TCDIcons.clock}

    </div>

    <p className="text-xs text-tcd-primary">

      Time

    </p>

    <p
      className="
        font-bold
        text-tcd-blue
        mt-1
      "
    >

      {
        new Date(
          exam.start_time
        ).toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )
      }

    </p>

  </div>

  <div
    className="
      bg-[#F7F9FC]
      rounded-2xl
      p-4
      text-center
    "
  >

    <div className="w-10 h-10 mx-auto mb-3">

      {TCDIcons.reward}

    </div>

    <p className="text-xs text-tcd-primary">

      Reward Pool

    </p>

    <p
      className="
        font-bold
        text-tcd-blue
        mt-1
      "
    >

      {formatRupees(
        exam.reward_pool
      )}

    </p>

  </div>
<div
  className="
    bg-[#F7F9FC]
    rounded-2xl
    p-4
    text-center
  "
>

  <div className="w-10 h-10 mx-auto mb-3">

    {TCDIcons.wallet}

  </div>

  <p className="text-xs text-tcd-primary">

    Entry Fee

  </p>

  <p
    className="
      font-bold
      text-tcd-blue
      mt-1
    "
  >

    {formatRupees(exam.entry_fee)}

  </p>

</div>
  <div
    className="
      bg-[#F7F9FC]
      rounded-2xl
      p-4
      text-center
    "
  >

    <div className="w-10 h-10 mx-auto mb-3">

      {TCDIcons.exam}

    </div>

    <p className="text-xs text-tcd-primary">

      Questions

    </p>

    <p
      className="
        font-bold
        text-tcd-blue
        mt-1
      "
    >

      {exam.total_questions}

    </p>

  </div>
<div
  className="
    bg-[#F7F9FC]
    rounded-2xl
    p-4
    text-center
  "
>

  <div className="w-10 h-10 mx-auto mb-3">

    {TCDIcons.timer}

  </div>

  <p className="text-xs text-tcd-primary">

    Duration

  </p>

  <p
    className="
      font-bold
      text-tcd-blue
      mt-1
    "
  >

    {exam.duration} mins

  </p>

</div>
<div
  className="
    bg-[#F7F9FC]
    rounded-2xl
    p-4
    text-center
  "
>

  <div className="w-10 h-10 mx-auto mb-3">

    {TCDIcons.mastery}

  </div>

  <p className="text-xs text-tcd-primary">

    XP Reward

  </p>

  <p
    className="
      font-bold
      text-green-600
      mt-1
    "
  >

    +{10 + Math.floor((exam.total_questions || 0) / 2)} XP

  </p>

</div>
</div>
<div
  className="
    mt-10

    rounded-[28px]

    bg-gradient-to-r
    from-[#274472]
    to-[#355C8C]

    p-6

    text-white
  "
>

  <p
    className="
      text-center

      text-lg

      font-bold

      text-[#F2D27A]
    "
  >

    {timeLeft.isLive
      ? "Exam is Live"

      : "Starts In"}

  </p>

  {
    !timeLeft.isLive && (

      <div
        className="
          grid
          grid-cols-4

          gap-4

          mt-6

          text-center
        "
      >

        {[
          {
            value:
              timeLeft.days,

            label:
              "Days",
          },

          {
            value:
              timeLeft.hours,

            label:
              "Hours",
          },

          {
            value:
              timeLeft.minutes,

            label:
              "Minutes",
          },

          {
            value:
              timeLeft.seconds,

            label:
              "Seconds",
          },
        ].map(
          (
            item
          ) => (

            <div
              key={
                item.label
              }
            >

              <div
                className="
                  text-4xl

                  font-black

                  text-[#F2D27A]
                "
              >

                {
                  String(
                    item.value
                  ).padStart(
                    2,
                    "0"
                  )
                }

              </div>

              <div
                className="
                  mt-2

                  text-sm

                  text-white/70
                "
              >

                {
                  item.label
                }

              </div>

            </div>

          )
        )}

      </div>

    )
  }

</div>
<div className="mt-8">

  <div className="flex justify-between text-sm text-tcd-primary mb-2">

    <span>Time Remaining</span>

    <span>
      {timeLeft.days}d {timeLeft.hours}h
    </span>

  </div>

  <div className="h-3 rounded-full bg-gray-200 overflow-hidden">

    <div
      className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27A]"
      style={{
        width: `${Math.min(
          100,
          Math.max(
            5,
            (
              (1 -
                (new Date(exam.start_time).getTime() - Date.now()) /
                (7 * 24 * 60 * 60 * 1000)
              ) * 100
            )
          )
        )}%`,
      }}
    />

  </div>

</div>
<div
  className="
    mt-8

    flex

    flex-col

    lg:flex-row

    gap-4
  "
>

  <Link
    href={`/exam/${exam.id}/intro`}
    className="
      flex-1

      text-center

      py-4

      rounded-2xl

      border-2

      border-tcd-blue

      text-tcd-blue

      font-bold

      hover:bg-tcd-blue

      hover:text-white

      transition-all
    "
  >

    View Details

  </Link>

  <Link
    href={`/exam/${exam.id}/intro`}
    className="
      flex-1

      text-center

      py-4

      rounded-2xl

      bg-gradient-to-r

      from-[#D4AF37]

      to-[#F2D27A]

      text-tcd-blue

      font-black

      shadow-lg

      hover:scale-[1.02]

      transition-all
    "
  >

    {
      timeLeft.isLive
        ? "Start Exam"

        : "View Exam"
    }

  </Link>
<div
className="
mt-8

grid
grid-cols-2
lg:grid-cols-4

gap-4
"
>

<div className="flex items-center gap-2">

{TCDIcons.wallet}

<span className="text-sm">

Cash Prize

</span>

</div>

<div className="flex items-center gap-2">

{TCDIcons.achievement}

<span className="text-sm">

Certificate

</span>

</div>

<div className="flex items-center gap-2">

{TCDIcons.mastery}

<span className="text-sm">

XP Rewards

</span>

</div>

<div className="flex items-center gap-2">

{TCDIcons.target}

<span className="text-sm">

Instant Result

</span>

</div>

</div>
</div>

</div>
  )
}

}
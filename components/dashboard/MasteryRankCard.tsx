"use client";
import { TCDIcons }
from "@/components/ui/tcd-icons";
export default function MasteryRankCard({
  attempts,
  achievements,
  streak,
}: any) {

  const totalExams =
    attempts?.length || 0;

  const unlockedAchievements =
    achievements || 0;

  const streakValue =
    streak?.current_streak || 0;

  const masteryScore =
    (
      totalExams * 10
    ) +
    (
      unlockedAchievements * 20
    ) +
    (
      streakValue * 5
    );

  const ranks = [
    {
      title: "Explorer",
      min: 0,
      icon: "🌱",
    },
    {
      title: "Scholar",
      min: 100,
      icon: "📘",
    },
    {
      title: "Strategist",
      min: 250,
      icon: "🧠",
    },
    {
      title: "Mastermind",
      min: 500,
      icon: "🏆",
    },
    {
      title: "Elite",
      min: 900,
      icon: "👑",
    },
    {
      title: "Legend",
      min: 1400,
      icon: "🔥",
    },
  ];

  let currentRank =
    ranks[0];

  let nextRank =
    ranks[1];

  for (
    let i = 0;
    i < ranks.length;
    i++
  ) {

    if (
      masteryScore >=
      ranks[i].min
    ) {

      currentRank =
        ranks[i];

      nextRank =
        ranks[
          i + 1
        ] || ranks[i];
    }
  }

  const currentMin =
    currentRank.min;

  const nextMin =
    nextRank.min;

  const progress =
    currentRank.title ===
    nextRank.title

      ? 100

      : Math.min(
          (
            (
              masteryScore -
              currentMin
            ) /

            (
              nextMin -
              currentMin
            )
          ) * 100,
          100
        );

  return (

    <div
      className="
        bg-gradient-to-br
        from-tcd-blue
        via-[#35548C]
        to-[#203B63]

        text-white

        rounded-[30px]

        p-6

        shadow-2xl

        mb-4

        relative
        overflow-hidden
      "
    >

      {/* Watermark */}

      <img
        src="/logo.png"
        alt="TCD"
        className="
          absolute
          right-[-50px]
          top-[-50px]

          w-72
          h-72

          opacity-10
        "
      />

      <div
        className="
          inline-flex
          items-center
          gap-2

          px-4
          py-2

          rounded-full

          bg-tcd-gold/20

          text-tcd-gold

          mb-3
        "
      >
        🏆 Mastery Progression
      </div>

      <div className="flex items-center gap-3 mb-3">

        <div>

  {TCDIcons.rank}

</div>

        <div>

          <p className="text-gray-700 mb-2">

            Current Rank

          </p>

          <h2
            className="
              text-3xl
              font-black
            "
          >
            {currentRank.title}
          </h2>

        </div>

      </div>

      <div className="mb-3">

        <div className="flex justify-between mb-3">

          <span className="font-semibold">

            Progress To {nextRank.title}

          </span>

          <span className="font-bold">

            {Math.round(progress)}%

          </span>

        </div>

        <div
          className="
            h-5
            bg-white/10
            rounded-full
            overflow-hidden
          "
        >

          <div
            className="
              h-full

              bg-gradient-to-r
              from-[#D4AF37]
              to-[#F2D27A]

              rounded-full
            "
            style={{
              width:
                `${progress}%`,
            }}
          />

        </div>

      </div>

      <div
  className="
    flex
    flex-wrap
    gap-2
  "
>

        <div
          className="
            bg-white/10
            backdrop-blur-md

            rounded-2xl

px-4
py-3

min-w-[180px]

flex-1
          "
        >

          <p className="text-gray-700 mb-2">

            Mastery Score

          </p>

          <h3
            className="
              text-2xl
              font-black
            "
          >
            {masteryScore}
          </h3>

        </div>

        <div
          className="
            bg-white/10
            backdrop-blur-md

            rounded-2xl

px-4
py-3

min-w-[180px]

flex-1
          "
        >

          <p className="text-gray-700 mb-2">

            Exams Completed

          </p>

          <h3
            className="
              text-2xl
              font-black
            "
          >
            {totalExams}
          </h3>

        </div>

        <div
          className="
            bg-white/10
            backdrop-blur-md

            rounded-2xl

px-4
py-3

min-w-[180px]

flex-1
          "
        >

          <p className="text-gray-700 mb-2">

            Achievements

          </p>

          <h3
            className="
              text-2xl
              font-black
            "
          >
            {unlockedAchievements}
          </h3>

        </div>

      </div>

    </div>
  );
}
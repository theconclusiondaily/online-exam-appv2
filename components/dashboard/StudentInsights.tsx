"use client";

import { TCDIcons }
from "@/components/ui/tcd-icons";

interface Props {
  attempts: any[];
  ranks: Record<string, number>;
}

export default function StudentInsights({
  attempts,
  ranks,
}: Props) {

  const totalAttempts =
    attempts.length;

  const highestScore =
    Math.max(
      ...attempts.map(
        (a) =>
          a.score || 0
      ),
      0
    );

  const averageAccuracy =
    totalAttempts > 0

      ? Math.round(

          attempts.reduce(
            (
              sum,
              attempt
            ) =>
              sum +
              (
                attempt.accuracy ||
                0
              ),
            0
          ) / totalAttempts
        )

      : 0;

  const bestRank =
    Object.values(
      ranks || {}
    ).length > 0

      ? Math.min(
          ...Object.values(
            ranks
          )
        )

      : "-";

  const improvement =
    attempts.length >= 2

      ? (
          (
            attempts[0]
              ?.percentage || 0
          ) -

          (
            attempts[1]
              ?.percentage || 0
          )
        )

      : 0;

  const cards = [

    {
      title:
        "Exams Attempted",

      value:
        totalAttempts,

      icon:
        TCDIcons.journey,

      gradient:
        "from-[#EEF4FF] to-[#F8FBFF]",

      valueColor:
        "text-tcd-blue",

      pill:
        "Learning",
    },

    {
      title:
        "Highest Score",

      value:
        highestScore,

      icon:
        TCDIcons.mastery,

      gradient:
        "from-[#F4FFF2] to-[#F9FFF8]",

      valueColor:
        "text-green-600",

      pill:
        "Peak",
    },

    {
      title:
        "Average Accuracy",

      value:
        `${averageAccuracy}%`,

      icon:
        TCDIcons.target,

      gradient:
        "from-[#FFF9EC] to-[#FFFCF5]",

      valueColor:
        "text-tcd-gold",

      pill:
        "Precision",
    },

    {
      title:
        "Best Rank",

      value:
        `#${bestRank}`,

      icon:
        TCDIcons.achievement,

      gradient:
        "from-[#F7F2FF] to-[#FCFAFF]",

      valueColor:
        "text-purple-600",

      pill:
        "Competitive",
    },

    {
      title:
        "Improvement",

      value:
        `${improvement > 0 ? "+" : ""}${improvement}%`,

      icon:
        TCDIcons.wallet,

      gradient:
        improvement >= 0
          ? "from-[#F2FFF6] to-[#FAFFFC]"
          : "from-[#FFF4F4] to-[#FFF9F9]",

      valueColor:
        improvement >= 0
          ? "text-green-600"
          : "text-red-500",

      pill:
        improvement >= 0
          ? "Growing"
          : "Dropping",
    },

    {
      title:
        "Consistency",

      value:
        totalAttempts >= 5
          ? "Strong"
          : "Growing",

      icon:
        TCDIcons.rank,

      gradient:
        "from-[#F3F7FF] to-[#FBFCFF]",

      valueColor:
        "text-orange-500",

      pill:
        "Momentum",
    },
  ];

  return (

    <div className="mb-6">

      {/* HEADER */}

      <div className="mb-4">

        <div
          className="
            h-1
            w-20

            bg-tcd-gold

            rounded-full

            mb-2
          "
        />

        <h2
          className="
            text-2xl
            font-black

            text-tcd-blue

            mb-1
          "
        >

          Performance Snapshot

        </h2>

        <p className="text-gray-700 text-sm">

          Compact overview of
          your competitive
          learning performance.

        </p>

      </div>

      {/* GRID */}

      <div
        className="
          grid

          sm:grid-cols-2
          xl:grid-cols-3

          gap-4
        "
      >

        {cards.map(
          (
            card,
            index
          ) => (

            <div
              key={index}
              className={`
                relative
                overflow-hidden

                bg-gradient-to-br
                ${card.gradient}

                rounded-[26px]

                px-5
                py-5

                border
                border-white

                shadow-sm

                hover:shadow-lg
                hover:-translate-y-1

                transition-all
                duration-300
              `}
            >

              {/* WATERMARK */}

              <div
                className="
                  absolute
                  right-[-10px]
                  bottom-[-10px]

                  opacity-[0.04]

                  scale-[2.2]
                "
              >

                {card.icon}

              </div>

              {/* TOP */}

              <div
                className="
                  flex
                  items-start
                  justify-between

                  mb-4
                "
              >

                <div>

                  {card.icon}

                </div>

                <div
                  className="
                    text-xs
                    font-semibold

                    px-3
                    py-1

                    rounded-full

                    bg-white/70

                    text-gray-600
                  "
                >

                  {card.pill}

                </div>

              </div>

              {/* CONTENT */}

              <p
                className="
                  text-gray-700
                  text-sm

                  mb-1
                "
              >

                {card.title}

              </p>

              <h3
                className={`
                  text-2xl
                  font-black

                  ${card.valueColor}
                `}
              >

                {card.value}

              </h3>

            </div>
          )
        )}

      </div>

    </div>
  );
}
"use client";

import { TCDIcons }
from "@/components/ui/tcd-icons";

export default function SmartInsights({
  attempts,
  ranks,
}: any) {

  const latest =
    attempts?.[0];

  const previous =
    attempts?.[1];

  if (!latest) {

    return null;
  }

  const latestAccuracy =
    latest?.accuracy || 0;

  const previousAccuracy =
    previous?.accuracy || 0;

  const accuracyDiff =
    latestAccuracy -
    previousAccuracy;

  const latestRank =
    ranks?.[
      latest.id
    ] || 1;

  const insights = [

    accuracyDiff > 0

      ? {
          text:
            `Accuracy improved by ${accuracyDiff}%`,
          icon:
            TCDIcons.target,
          bg:
            "bg-green-50",
          color:
            "text-green-700",
        }

      : {
          text:
            `Accuracy dropped by ${Math.abs(
              accuracyDiff
            )}%`,
          icon:
            TCDIcons.target,
          bg:
            "bg-red-50",
          color:
            "text-red-600",
        },

    {
      text:
        `Current competitive rank: #${latestRank}`,
      icon:
        TCDIcons.achievement,
      bg:
        "bg-yellow-50",
      color:
        "text-yellow-700",
    },

    {
      text:
        `${attempts.length} exams attempted so far`,
      icon:
        TCDIcons.journey,
      bg:
        "bg-blue-50",
      color:
        "text-blue-700",
    },
  ];

  return (

    <div className="mb-5">

      <div
        className="
          flex
          flex-wrap

          gap-3
        "
      >

        {insights.map(
          (
            insight,
            index
          ) => (

            <div
              key={index}
              className={`
                ${insight.bg}

                flex
                items-center
                gap-3

                px-4
                py-3

                rounded-2xl

                border
                border-white

                shadow-sm

                text-sm
                font-semibold

                ${insight.color}
              `}
            >

              <div className="w-5 h-5">

                {insight.icon}

              </div>

              {insight.text}

            </div>
          )
        )}

      </div>

    </div>
  );
}
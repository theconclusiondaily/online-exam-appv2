"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import { TCDIcons }
from "@/components/ui/tcd-icons";

interface Props {
  attempts: any[];
  ranks: Record<string, number>;
}

export default function PerformanceAnalytics({
  attempts,
  ranks,
}: Props) {

  const chartData =

    attempts
      ?.slice()
      ?.reverse()
      ?.map(
        (
          attempt,
          index
        ) => ({

          exam:
            `#${index + 1}`,

          percentage:
            attempt.percentage || 0,

          accuracy:
            attempt.accuracy || 0,

          rank:
            ranks?.[
              attempt.id
            ] || 1,
        })
      );

  const latest =
    attempts?.[0];

  const previous =
    attempts?.[1];

  const percentageDiff =

    latest &&
    previous

      ? (
          latest.percentage -
          previous.percentage
        )

      : 0;

  const avgAccuracy =

    attempts.length > 0

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
          ) / attempts.length
        )

      : 0;

  const analytics = [

    {
      title:
        "Performance Trend",

      subtitle:
        "Score progression across exams",

      value:
        `${latest?.percentage || 0}%`,

      pill:
        percentageDiff >= 0
          ? `↑ +${percentageDiff}%`
          : `↓ ${percentageDiff}%`,

      pillColor:
        percentageDiff >= 0
          ? "text-green-600 bg-green-50"
          : "text-red-500 bg-red-50",

      icon:
        TCDIcons.mastery,

      gradient:
        "from-[#EEF4FF] to-[#FAFCFF]",

      chart: (

        <ResponsiveContainer
          width="100%"
          height={180}
        >

          <AreaChart
            data={chartData}
          >

            <defs>

              <linearGradient
                id="colorScore"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#2F4F88"
                  stopOpacity={0.5}
                />

                <stop
                  offset="95%"
                  stopColor="#2F4F88"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.08}
            />

            <XAxis
              dataKey="exam"
              tick={{
                fontSize: 11,
              }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="percentage"
              stroke="#2F4F88"
              fillOpacity={1}
              fill="url(#colorScore)"
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>
      ),
    },

    {
      title:
        "Accuracy Analytics",

      subtitle:
        "Consistency & precision tracking",

      value:
        `${avgAccuracy}%`,

      pill:
        avgAccuracy >= 70
          ? "Strong"
          : "Growing",

      pillColor:
        avgAccuracy >= 70
          ? "text-green-600 bg-green-50"
          : "text-yellow-700 bg-yellow-50",

      icon:
        TCDIcons.target,

      gradient:
        "from-[#FFF9EC] to-[#FFFCF5]",

      chart: (

        <ResponsiveContainer
          width="100%"
          height={180}
        >

          <BarChart
            data={chartData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.08}
            />

            <XAxis
              dataKey="exam"
              tick={{
                fontSize: 11,
              }}
            />

            <Tooltip />

            <Bar
              dataKey="accuracy"
              fill="#D4AF37"
              radius={[
                8,
                8,
                0,
                0,
              ]}
            />

          </BarChart>

        </ResponsiveContainer>
      ),
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

          Performance Intelligence

        </h2>

        <p className="text-gray-500 text-sm">

          Advanced analytics for
          your competitive growth.

        </p>

      </div>

      {/* GRID */}

      <div
        className="
          grid
          xl:grid-cols-2

          gap-4
        "
      >

        {analytics.map(
          (
            item,
            index
          ) => (

            <div
              key={index}
              className={`
                relative
                overflow-hidden

                bg-gradient-to-br
                ${item.gradient}

                rounded-[28px]

                p-5

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

                  scale-[2]
                "
              >

                {item.icon}

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

                  <div className="mb-2">

                    {item.icon}

                  </div>

                  <h3
                    className="
                      text-xl
                      font-black

                      text-tcd-blue
                    "
                  >

                    {item.title}

                  </h3>

                  <p
                    className="
                      text-gray-500
                      text-sm

                      mt-1
                    "
                  >

                    {item.subtitle}

                  </p>

                </div>

                <div
                  className={`
                    text-xs
                    font-semibold

                    px-3
                    py-1

                    rounded-full

                    ${item.pillColor}
                  `}
                >

                  {item.pill}

                </div>

              </div>

              {/* VALUE */}

              <div className="mb-3">

                <h2
                  className="
                    text-4xl
                    font-black

                    text-tcd-blue
                  "
                >

                  {item.value}

                </h2>

              </div>

              {/* CHART */}

              <div
                className="
                  bg-white/60
                  backdrop-blur-md

                  rounded-2xl

                  p-3
                "
              >

                {item.chart}

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}
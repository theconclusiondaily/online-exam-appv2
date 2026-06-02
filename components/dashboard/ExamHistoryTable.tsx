"use client";

import Link from "next/link";

import { TCDIcons }
from "@/components/ui/tcd-icons";

interface Props {
  attempts: any[];
  ranks: Record<string, number>;
  examTitles: Record<string, any>;
}

export default function ExamHistoryTable({
  attempts,
  ranks,
  examTitles,
}: Props) {

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

          Knowledge Review

        </h2>

        <p className="text-gray-500 text-sm">

          Review your exam
          performance, rankings
          and competitive growth.

        </p>

      </div>

      {/* EMPTY */}

      {attempts.length === 0 ? (

        <div
          className="
            bg-white

            rounded-[28px]

            p-8

            border
            border-gray-100

            shadow-sm

            text-center
          "
        >

          <div className="mb-4">

            {TCDIcons.journey}

          </div>

          <h3
            className="
              text-2xl
              font-black

              text-tcd-blue

              mb-2
            "
          >

            No Learning Journey Yet

          </h3>

          <p className="text-gray-500">

            Attempt your first
            exam to begin building
            your performance
            profile.

          </p>

        </div>

      ) : (

        <div
          className="
            flex
            flex-col

            gap-3
          "
        >

          {attempts.map(
            (attempt) => {

              const exam =
                examTitles[
                  attempt.exam_id
                ];

              const rank =
                ranks?.[
                  attempt.id
                ] || 1;

              return (

                <div
                  key={attempt.id}
                  className="
                    relative
                    overflow-hidden

                    bg-white/90
                    backdrop-blur-xl

                    rounded-[26px]

                    px-5
                    py-4

                    border
                    border-gray-100

                    shadow-sm

                    hover:shadow-lg
                    hover:-translate-y-1

                    transition-all
                    duration-300
                  "
                >

                  {/* WATERMARK */}

                  <div
                    className="
                      absolute
                      right-[-15px]
                      bottom-[-15px]

                      opacity-[0.04]

                      scale-[2.2]
                    "
                  >

                    {TCDIcons.mastery}

                  </div>

                  <div
                    className="
                      flex
                      flex-col
                      xl:flex-row

                      xl:items-center
                      xl:justify-between

                      gap-4
                    "
                  >

                    {/* LEFT */}

                    <div className="flex-1">

                      {/* TITLE */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between

                          gap-3

                          mb-3
                        "
                      >

                        <div>

                          <h3
                            className="
                              text-lg
                              font-black

                              text-tcd-blue

                              mb-1
                            "
                          >

                            {
                              exam?.title ||
                              "Exam"
                            }

                          </h3>

                          <p
                            className="
                              text-gray-500
                              text-sm
                            "
                          >

                            {new Date(
                              attempt.created_at
                            ).toLocaleDateString(
                              "en-IN"
                            )}

                          </p>

                        </div>

                        {/* RANK */}

                        <div
  className={`
    inline-flex
    items-center
    gap-2

    px-4
    py-2

    rounded-full

    text-sm
    font-black

    shadow-sm

    ${
      rank <= 3

        ? `
          bg-gradient-to-r
          from-[#FFF4CC]
          to-[#FFE89A]

          text-[#7A5B00]
        `

        : rank <= 10

        ? `
          bg-gradient-to-r
          from-[#EEF4FF]
          to-[#DCE8FF]

          text-tcd-blue
        `

        : `
          bg-gray-100
          text-gray-700
        `
    }
  `}
>

  <div className="w-4 h-4">

    {rank <= 3

      ? TCDIcons.achievement

      : rank <= 10

      ? TCDIcons.rank

      : TCDIcons.target}

  </div>

  Rank #{rank}

</div>

                      </div>

                      {/* STATS */}

                      <div
                        className="
                          flex
                          flex-wrap

                          gap-2
                        "
                      >

                        {/* SCORE */}

                        <div
                          className="
                            bg-gradient-to-r
                            from-[#EEF4FF]
                            to-[#F8FBFF]

                            px-4
                            py-2

                            rounded-2xl
                          "
                        >

                          <p
                            className="
                              text-xs
                              text-gray-500

                              mb-1
                            "
                          >

                            Score

                          </p>

                          <h4
                            className="
                              text-lg
                              font-black

                              text-tcd-blue
                            "
                          >

                            {attempt.score || 0}

                          </h4>

                        </div>

                        {/* ACCURACY */}

                        <div
                          className="
                            bg-gradient-to-r
                            from-[#F4FFF2]
                            to-[#FAFFF8]

                            px-4
                            py-2

                            rounded-2xl
                          "
                        >

                          <p
                            className="
                              text-xs
                              text-gray-500

                              mb-1
                            "
                          >

                            Accuracy

                          </p>

                          <h4
                            className="
                              text-lg
                              font-black

                              text-green-600
                            "
                          >

                            {
                              attempt.accuracy || 0
                            }%

                          </h4>

                        </div>

                        {/* PERCENTAGE */}

                        <div
                          className="
                            bg-gradient-to-r
                            from-[#FFF9EC]
                            to-[#FFFCF5]

                            px-4
                            py-2

                            rounded-2xl
                          "
                        >

                          <p
                            className="
                              text-xs
                              text-gray-500

                              mb-1
                            "
                          >

                            Percentage

                          </p>

                          <h4
                            className="
                              text-lg
                              font-black

                              text-tcd-gold
                            "
                          >

                            {
                              attempt.percentage || 0
                            }%

                          </h4>

                        </div>

                      </div>

                    </div>

                    {/* ACTIONS */}

<div
  className="
    flex
    flex-col
    sm:flex-row

    gap-2
  "
>

  {/* RESULT */}

  <Link
    href={`/exam-result/${attempt.id}`}
    className="
      inline-flex
      items-center
      justify-center
      gap-2

      bg-tcd-gold
      hover:bg-[#D6A72B]

      text-tcd-blue

      px-5
      py-3

      rounded-2xl

      font-semibold
      text-sm

      shadow-sm
      hover:shadow-md

      transition-all
    "
  >

    <span>

      {TCDIcons.rank}

    </span>

    View Result

  </Link>

  {/* REVIEW */}

  <Link
    href={`/exam-review/${attempt.id}`}
    className="
      inline-flex
      items-center
      justify-center
      gap-2

      bg-tcd-blue
      hover:bg-tcd-blue-light

      text-white

      px-5
      py-3

      rounded-2xl

      font-semibold
      text-sm

      shadow-sm
      hover:shadow-md

      transition-all
    "
  >

    <span>

      {TCDIcons.target}

    </span>

    Review Answers

  </Link>

</div>

                  </div>

                </div>
              );
            }
          )}

        </div>

      )}

    </div>
  );
}
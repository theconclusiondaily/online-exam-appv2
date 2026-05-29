"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { supabase }
from "@/lib/supabase/client";

import { TCDIcons }
from "@/components/ui/tcd-icons";

import TCDMotion
from "@/components/ui/TCDMotion";

import {
  getExamStatus
} from "@/lib/getExamStatus";
export default function LeaderboardPage() {

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    leaders,
    setLeaders
  ] = useState<any[]>([]);

  useEffect(() => {

    loadLeaderboard();

  }, []);

  async function loadLeaderboard() {

    try {

      const {
        data,
        error
      } = await supabase

        .from(
          "leaderboard_view"
        )

        .select("*")

        .order(
          "xp",
          {
            ascending: false,
          }
        )

        .limit(50);

      if (error) {

        console.error(
          error
        );

        return;
      }

      setLeaders(
        data || []
      );

    } catch (error) {

      console.error(
        error
      );

    } finally {

      setLoading(false);

    }
  }

  if (loading) {

    return (

      <div
        className="
          min-h-screen

          flex
          items-center
          justify-center

          bg-[#F7F9FC]
        "
      >

        <div
          className="
            text-2xl
            font-black

            text-tcd-blue
          "
        >

          Loading Leaderboard...

        </div>

      </div>
    );
  }

  const topThree =
    leaders.slice(0, 3);

  const others =
    leaders.slice(3);

  return (

    <main
      className="
        min-h-screen

        bg-[#F7F9FC]

        p-6
      "
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BACK */}

        <div className="mb-6">

          <Link
            href="/dashboard"
            className="
              inline-flex
              items-center
              gap-2

              px-4
              py-3

              bg-white

              rounded-2xl

              border
              border-gray-100

              shadow-sm

              hover:shadow-md

              transition-all
            "
          >

            ← Back To Dashboard

          </Link>

        </div>

        {/* HERO */}

        <TCDMotion>

          <div
            className="
              relative
              overflow-hidden

              bg-gradient-to-r
              from-tcd-blue
              via-[#35548C]
              to-[#203B63]

              text-white

              rounded-[30px]

              p-6

              shadow-xl

              mb-6
            "
          >

            {/* WATERMARK */}

            <img
              src="/logo.png"
              alt="TCD"
              className="
                absolute

                left-1/2
                top-1/2

                -translate-x-1/2
                -translate-y-1/2

                w-72
                h-72

                opacity-[0.05]
              "
            />

            <div className="relative z-10">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  px-4
                  py-2

                  rounded-full

                  bg-tcd-gold/15

                  text-tcd-gold

                  border
                  border-tcd-gold/20

                  mb-4
                "
              >

                {TCDIcons.achievement}

                Competitive Ecosystem

              </div>

              <h1
                className="
                  text-2xl
                  font-black

                  mb-2
                "
              >

                Global Leaderboard

              </h1>

              <p className="text-white/80">

                Compete globally
                through XP,
                mastery and TCD
                progression.

              </p>

            </div>

          </div>

        </TCDMotion>

        {/* TOP 3 */}

        <div
          className="
            grid
            md:grid-cols-3

            gap-4

            mb-6
          "
        >

          {topThree.map(
            (
              user,
              index
            ) => (

              <TCDMotion
                key={user.user_id}
                delay={
                  index * 0.1
                }
              >

                <div
                  className={`
                    relative
                    overflow-hidden

                    rounded-[28px]

                    p-5

                    shadow-lg

                    ${
                      index === 0

                        ? `
                          bg-gradient-to-br
                          from-[#FFF4CC]
                          to-[#FFE89A]
                        `

                        : index === 1

                        ? `
                          bg-gradient-to-br
                          from-[#EEF4FF]
                          to-[#DCE8FF]
                        `

                        : `
                          bg-gradient-to-br
                          from-[#FFF5EE]
                          to-[#FFE4D1]
                        `
                    }
                  `}
                >

                  {/* RANK */}

                  <div
                    className="
                      absolute
                      top-4
                      right-4

                      text-3xl
                      font-black

                      opacity-10
                    "
                  >

                    #{index + 1}

                  </div>

                  <div className="mb-4">

                    {index === 0

                      ? TCDIcons.achievement

                      : TCDIcons.rank}

                  </div>

                  <h2
                    className="
                      text-xl
                      font-black

                      text-tcd-blue

                      mb-1
                    "
                  >

                    {
                      user.email
                        ?.split("@")[0]
                    }

                  </h2>

                  <p
                    className="
                      text-sm
                      text-gray-600

                      mb-4
                    "
                  >

                    Level {user.level}

                  </p>

                  <div
                    className="
                      flex
                      flex-wrap

                      gap-2
                    "
                  >

                    <div
                      className="
                        bg-white/70

                        px-3
                        py-2

                        rounded-xl
                      "
                    >

                      <p
                        className="
                          text-xs
                          text-gray-500
                        "
                      >

                        XP

                      </p>

                      <h3
                        className="
                          font-black
                          text-tcd-blue
                        "
                      >

                        {user.xp}

                      </h3>

                    </div>

                    <div
                      className="
                        bg-white/70

                        px-3
                        py-2

                        rounded-xl
                      "
                    >

                      <p
                        className="
                          text-xs
                          text-gray-500
                        "
                      >

                        TCD

                      </p>

                      <h3
                        className="
                          font-black
                          text-tcd-blue
                        "
                      >

                        {
                          user.tcd_credits
                        }

                      </h3>

                    </div>

                  </div>

                </div>

              </TCDMotion>
            )
          )}

        </div>

        {/* RANK LIST */}

        <div
          className="
            flex
            flex-col

            gap-3
          "
        >

          {others.map(
            (
              user,
              index
            ) => (

              <TCDMotion
                key={user.user_id}
                delay={
                  index * 0.03
                }
              >

                <div
                  className="
                    bg-white/90
                    backdrop-blur-xl

                    rounded-[24px]

                    px-5
                    py-4

                    border
                    border-gray-100

                    shadow-sm

                    hover:shadow-md

                    transition-all
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      md:flex-row

                      md:items-center
                      md:justify-between

                      gap-4
                    "
                  >

                    {/* LEFT */}

                    <div
                      className="
                        flex
                        items-center

                        gap-4
                      "
                    >

                      <div
                        className="
                          w-12
                          h-12

                          rounded-2xl

                          bg-[#EEF4FF]

                          flex
                          items-center
                          justify-center

                          font-black
                          text-tcd-blue
                        "
                      >

                        #{index + 4}

                      </div>

                      <div>

                        <h3
                          className="
                            font-black
                            text-tcd-blue
                          "
                        >

                          {
                            user.email
                              ?.split("@")[0]
                          }

                        </h3>

                        <p
                          className="
                            text-sm
                            text-gray-500
                          "
                        >

                          Level {user.level}

                        </p>

                      </div>

                    </div>

                    {/* RIGHT */}

                    <div
                      className="
                        flex
                        flex-wrap

                        gap-2
                      "
                    >

                      <div
                        className="
                          bg-[#EEF4FF]

                          px-4
                          py-2

                          rounded-xl
                        "
                      >

                        <p
                          className="
                            text-xs
                            text-gray-500
                          "
                        >

                          XP

                        </p>

                        <h4
                          className="
                            font-black
                            text-tcd-blue
                          "
                        >

                          {user.xp}

                        </h4>

                      </div>

                      <div
                        className="
                          bg-[#FFF9EC]

                          px-4
                          py-2

                          rounded-xl
                        "
                      >

                        <p
                          className="
                            text-xs
                            text-gray-500
                          "
                        >

                          Accuracy

                        </p>

                        <h4
                          className="
                            font-black
                            text-tcd-gold
                          "
                        >

                          {
                            user.average_percentage
                          }%

                        </h4>

                      </div>

                    </div>

                  </div>

                </div>

              </TCDMotion>
            )
          )}

        </div>

      </div>

    </main>
  );
}
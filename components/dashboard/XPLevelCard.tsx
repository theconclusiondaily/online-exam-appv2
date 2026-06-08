"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";

import { TCDIcons }
from "@/components/ui/tcd-icons";
import Link from "next/link";
export default function XPLevelCard() {

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    xp,
    setXP
  ] = useState(0);

  const [
    level,
    setLevel
  ] = useState(1);

  useEffect(() => {

    loadXP();

  }, []);

  async function loadXP() {

    try {

      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      if (!user) return;

      const {
        data
      } = await supabase

        .from(
          "user_levels"
        )

        .select("*")

        .eq(
          "user_id",
          user.id
        )

        .single();

      if (data) {

        setXP(
          data.xp || 0
        );

        setLevel(
          data.level || 1
        );
      }

    } catch (error) {

      console.error(
        error
      );

    } finally {

      setLoading(false);

    }
  }

  if (loading) {

    return null;
  }

  const currentLevelXP =
    Math.pow(
      level - 1,
      2
    ) * 100;

  const nextLevelXP =
    Math.pow(
      level,
      2
    ) * 100;

  const progress =
    Math.min(
      (
        (
          xp -
          currentLevelXP
        ) /

        (
          nextLevelXP -
          currentLevelXP
        )
      ) * 100,
      100
    );

  const remainingXP =
    nextLevelXP - xp;

  const levelTitles = [

    "Explorer",

    "Scholar",

    "Strategist",

    "Mastermind",

    "Elite",

    "Legend",
  ];

  const title =
    levelTitles[
      Math.min(
        level - 1,
        levelTitles.length - 1
      )
    ];

  return (

    <div
      className="
        relative
        overflow-hidden

        bg-gradient-to-r
        from-tcd-blue
        via-[#35548C]
        to-[#203B63]

        text-white

        rounded-2xl

        p-6

        shadow-xl

        border
        border-tcd-gold/20

        mb-4
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

    w-32
    h-32

    md:w-40
    md:h-40

    opacity-[0.04]

    pointer-events-none
  "
/>
      <div
        className="
          flex
          flex-col
          xl:flex-row

          xl:items-center
          xl:justify-between

          gap-3
        "
      >

        {/* LEFT */}

        <div>

          <div
            className="
              inline-flex
              items-center
              gap-2

              px-4
              py-2

              rounded-full

              bg-tcd-gold/15

              border
              border-tcd-gold/20

              text-tcd-gold

              mb-4
            "
          >

            <div className="w-4 h-4">

              {TCDIcons.mastery}

            </div>

            XP Progression

          </div>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div>

              {TCDIcons.rank}

            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-black
                "
              >

                Level {level}

              </h2>

              <p
                className="
                  text-tcd-gold
                  text-lg
                  font-bold
                "
              >

                {title}

              </p>

            </div>

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
<Link
  href="/dashboard/leaderboard"
  className="
    bg-white/10
    backdrop-blur-md

    rounded-2xl

    px-5
    py-4

    min-w-[170px]

    hover:bg-white/15

    transition-all
  "
>

  <p className="text-gray-500 text-sm mb-1">

    Competitive Hub

  </p>

  <h3
    className="
      text-2xl
      font-black
    "
  >

    Leaderboard

  </h3>

</Link>
          {/* XP */}

          <div
            className="
              bg-white/10
              backdrop-blur-md

              rounded-2xl

              px-4
              py-3

              min-w-[170px]
            "
          >

            <p className="text-gray-500 text-sm mb-1">

              Total XP

            </p>

            <h3
              className="
                text-2xl
                font-black
              "
            >

              {xp}

            </h3>

          </div>

          {/* NEXT */}

          <div
            className="
              bg-white/10
              backdrop-blur-md

              rounded-2xl

              px-4
              py-3

              min-w-[170px]
            "
          >

            <p className="text-gray-500 text-sm mb-1">

              Next Level

            </p>

            <h3
              className="
                text-2xl
                font-black

                text-tcd-gold
              "
            >

              {remainingXP} XP

            </h3>

          </div>

        </div>

      </div>

      {/* PROGRESS */}

      <div className="mt-6">

        <div
          className="
            flex
            justify-between

            text-sm

            mb-2
          "
        >

          <span>

            Progress To Level {level + 1}

          </span>

          <span className="font-bold">

            {Math.round(progress)}%

          </span>

        </div>

        <div
          className="
            h-4

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

              transition-all
              duration-700
            "
            style={{
              width:
                `${progress}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}
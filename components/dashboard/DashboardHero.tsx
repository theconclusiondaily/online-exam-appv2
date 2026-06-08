"use client";

import TCDLogo from "@/components/brand/TCDLogo";
import TCDIcon from "@/components/brand/TCDIcon";
import {
  getXPProgress
} from "@/lib/xpLevels";


interface DashboardHeroProps {

  name: string;

  balance: number;

  studyStreak: number;

  loginStreak: number;

  level: number;

  levelTitle: string;

  xp: number;

}

export default function DashboardHero({

  name,

  balance,

  studyStreak,

  loginStreak,

  level,

  levelTitle,

  xp,

}: DashboardHeroProps) {
const xpProgress =

  getXPProgress(

    xp,

    level

  );
  return (

    <div
      className="
        relative
        overflow-hidden

        rounded-[36px]

        p-4

        mb-3

        shadow-2xl

        bg-gradient-to-r
        from-tcd-blue
        via-[#3D5B8E]
        to-[#5578B5]
      "
    >

      {/* WATERMARK */}

      <div
        className="
          absolute

          right-10
          top-2

          opacity-10

          pointer-events-none
        "
      >

        <TCDLogo size={180} />

      </div>

      {/* TOP CONTENT */}

      <div className="relative z-10">

        {/* TITLE */}

        <h1
          className="
            text-3xl
            md:text-2xl

            font-black

            text-white

            tracking-tight
          "
        >

          Welcome Back 👋

        </h1>

        {/* EMAIL */}

        <p
          className="
            mt-3

            text-lg

            text-white/80
          "
        >

          {name}

        </p>

        {/* MOTTO */}

        <p
          className="
            mt-2

            text-tcd-gold

            font-semibold

            tracking-wide
          "
        >

          Hope • Faith • Excellence

        </p>

        {/* LEVEL BLOCK */}

        <div
          className="
            inline-flex
            items-center

            gap-3

            mt-3

            px-5
            py-3

            rounded-2xl

            bg-white/10

            border
            border-white/10

            backdrop-blur-md
          "
        >
<div className="mt-4">

  <div
    className="
      flex
      items-center
      justify-between

      text-sm

      text-gray-200

      mb-2
    "
  >

    <span>

      {xp} XP

    </span>

    <span>

      {xpProgress.nextLevelXP} XP

    </span>

  </div>

  <div
    className="
      h-3

      rounded-full

      bg-white/10

      overflow-hidden
    "
  >

    <div
      className="
        h-full

        rounded-full

        bg-gradient-to-r
        from-tcd-gold
        to-yellow-300

        transition-all
        duration-500
      "

      style={{

        width:
          `${xpProgress.progress}%`

      }}
    />

  </div>

  <p
    className="
      mt-2

      text-sm

      text-gray-200
    "
  >

    {xpProgress.remaining}
    XP to next level

  </p>

</div>
          {/* LEVEL */}

          <div>

            <p
              className="
                text-xs

                text-white/60

                uppercase

                tracking-wider
              "
            >

              Current Level

            </p>

            <h2
              className="
                text-2xl

                font-black

                text-white

                leading-none

                mt-1
              "
            >

              Lv.{level}

            </h2>

          </div>

          {/* DIVIDER */}

          <div
            className="
              w-px
              h-12

              bg-white/10
            "
          />

          {/* TITLE */}

          <div>

            <p
              className="
                text-xs

                text-white/60

                uppercase

                tracking-wider
              "
            >

              Rank Title

            </p>

            <h3
              className="
                text-2xl

                font-black

                text-tcd-gold

                mt-1
              "
            >

              {levelTitle}

            </h3>

          </div>

        </div>

      </div>

      {/* HERO METRICS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3

          gap-3

          mt-3

          relative
          z-10
        "
      >

        <HeroMetric
          title="TCD Vault"
          value={balance}
          icon="/icons/coin.svg"
        />

        <HeroMetric
          title="Growth Streak"
          value={studyStreak}
          icon="/icons/banyan-tree.svg"
        />

        <HeroMetric
          title="Journey Streak"
          value={loginStreak}
          icon="/icons/mount-kilimanjaro.svg"
        />

      </div>

    </div>
  );
}

function HeroMetric({

  title,

  value,

  icon,

}: {

  title: string;

  value: number;

  icon: string;

}) {

  return (

    <div
      className="
        bg-white/10

        backdrop-blur-md

        border
        border-white/10

        rounded-2xl

        p-2

        flex
        items-center

        gap-2

        hover:bg-white/15
        hover:scale-[1.02]

        transition-all
        duration-300
      "
    >

      {/* ICON */}

      <div
        className="
          w-14
          h-14

          rounded-2xl

          bg-white/10

          flex
          items-center
          justify-center

          border
          border-white/10
        "
      >

        <TCDIcon
          src={icon}
          alt={title}
          size={42}
        />

      </div>

      {/* CONTENT */}

      <div>

        <p
          className="
            text-gray-200

            text-sm

            font-medium
          "
        >

          {title}

        </p>

        <h2
          className="
            text-2xl

            font-black

            text-tcd-gold

            tracking-tight
          "
        >

          {value}

        </h2>

      </div>

    </div>
  );
}
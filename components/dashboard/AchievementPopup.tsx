"use client";

import {
  getAchievementRarity
} from "@/lib/getAchievementRarity";

interface Props {

  achievement: any;

  onClose: () => void;

}

export default function AchievementPopup({

  achievement,

  onClose,

}: Props) {

  if (!achievement) {
    return null;
  }

  const rarity =
    getAchievementRarity(
      achievement?.rarity ||
      "common"
    );

  return (

    <div
      className="
        fixed
        inset-0

        bg-black/50

        flex
        items-center
        justify-center

        z-[100]
      "
    >

      <div
        className={`
          relative

          overflow-hidden

          rounded-2xl

          border

          p-8

          w-full
          max-w-md

          shadow-2xl

          animate-in
          zoom-in-95
          duration-300

          ${rarity.bg}

          ${rarity.border}
        `}
      >

        {/* GLOW */}

        <div
          className="
            absolute

            right-[-40px]
            top-[-40px]

            w-40
            h-40

            rounded-full

            bg-white/10
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative
            z-10

            text-center
          "
        >

          <div className="text-6xl mb-4">

            🏆

          </div>

          <p
            className={`
              text-sm

              font-black

              uppercase

              tracking-[3px]

              ${rarity.text}
            `}
          >

            Achievement Unlocked

          </p>

          <h2
            className={`
              text-4xl

              font-black

              mt-3

              ${rarity.text}
            `}
          >

            {achievement.title}

          </h2>

       <p
  className={`
    mt-3

    text-lg

    ${
      rarity.label ===
      "Common"

        ? "text-gray-700"

        : "text-white/90"
    }
  `}
>

  {rarity.label} Achievement

</p>

<div
  className={`
    mt-6

    inline-flex
    items-center

    gap-2

    px-5
    py-3

    rounded-2xl

    font-black

    ${
      rarity.label ===
      "Common"

        ? "bg-white text-tcd-blue"

        : "bg-white/15 text-white"
    }
  `}
>

  +{achievement.reward_tcd} TCD

</div>

          <button
            onClick={onClose}

            className="
              mt-6

              w-full

              bg-white

              text-black

              py-3

              rounded-2xl

              font-black

              hover:scale-[1.02]

              transition-all
            "
          >

            Continue Journey

          </button>

        </div>

      </div>

    </div>
    
  );
}

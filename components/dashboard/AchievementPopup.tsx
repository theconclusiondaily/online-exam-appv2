"use client";

import Image from "next/image";

import {
  getAchievementRarity,
} from "@/lib/getAchievementRarity";

interface Props {
  achievement: any;
  onClose: () => void;
}

export default function AchievementPopup({
  achievement,
  onClose,
}: Props) {
  if (!achievement) return null;

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
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-[100]
        p-4
      "
    >
      <div
        className={`
          relative
          overflow-hidden

          w-full
          max-w-lg

          max-h-[85vh]
          overflow-y-auto

          rounded-3xl

          border

          shadow-[0_25px_80px_rgba(0,0,0,0.4)]

          p-8

          ${rarity.bg}
          ${rarity.border}
        `}
      >
        {/* Glow Effects */}

        <div
          className="
            absolute
            top-[-60px]
            right-[-60px]
            h-48
            w-48
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            absolute
            bottom-[-40px]
            left-[-40px]
            h-32
            w-32
            rounded-full
            bg-white/5
          "
        />

        {/* Content */}

        <div className="relative z-10 text-center">

          {/* Brand Achievement Icon */}

          <div className="flex justify-center mb-6">

            <div
              className="
                h-24
                w-24

                rounded-full

                bg-white/15

                flex
                items-center
                justify-center

                border
                border-white/20
              "
            >
              <Image
                src="/icons/achievement-medal.svg"
                alt="Achievement"
                width={60}
                height={60}
              />
            </div>

          </div>

          <p
            className={`
              text-xs
              font-black
              tracking-[4px]
              uppercase

              ${rarity.text}
            `}
          >
            Achievement Unlocked
          </p>

          <h2
            className={`
              mt-4
              text-3xl
              font-black

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

          {/* Rewards */}

          <div
            className="
              mt-8

              grid
              grid-cols-2

              gap-4
            "
          >
            <div
              className="
                rounded-2xl

                bg-white/15

                p-4

                flex
                flex-col
                items-center
              "
            >
              <Image
                src="/icons/coin.svg"
                alt="TCD"
                width={28}
                height={28}
              />

              <p className="mt-2 text-sm text-white/80">
                TCD Credits
              </p>

              <p className="font-black text-xl text-white">
                +{achievement.reward_tcd}
              </p>
            </div>

            <div
              className="
                rounded-2xl

                bg-white/15

                p-4

                flex
                flex-col
                items-center
              "
            >
              <Image
                src="/icons/mastery-star.svg"
                alt="Mastery"
                width={28}
                height={28}
              />

              <p className="mt-2 text-sm text-white/80">
                Achievement
              </p>

              <p className="font-black text-xl text-white">
                Unlocked
              </p>
            </div>
          </div>

          {/* Continue */}

          <button
            onClick={onClose}
            className="
              mt-8

              w-full

              rounded-2xl

              bg-white

              text-black

              py-4

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
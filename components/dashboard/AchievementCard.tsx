import TCDIcon from "@/components/brand/TCDIcon";

import {
  getAchievementRarity
} from "@/lib/getAchievementRarity";

interface AchievementCardProps {

  achievements: any[];

}

export default function AchievementCard({

  achievements,

}: AchievementCardProps) {

  const previewAchievements =
    achievements.slice(0, 3);

  return (

    <div
      className="
        bg-white

        rounded-2xl

        p-3

        shadow-md

        hover:shadow-xl
        hover:-translate-y-1

        transition-all
        duration-300

        border
        border-gray-100
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          items-center

          gap-3

          mb-4
        "
      >

        <div
          className="
            w-14
            h-14

            rounded-2xl

            bg-[#FFF8EA]

            flex
            items-center
            justify-center

            border
            border-[#E6C06E]/30
          "
        >

          <TCDIcon
            src="/icons/achievement-medal.svg"
            alt="Achievements"
            size={42}
          />

        </div>

        <div>

          <h2
            className="
              text-2xl
              font-black

              text-tcd-blue
            "
          >

            Achievements

          </h2>

          <p
            className="
              text-sm
              text-gray-700
            "
          >

            Prestige milestones unlocked

          </p>

        </div>

      </div>

      {/* TOTAL */}

      <div className="mb-5">

        <div
          className="
            text-3xl
            font-black

            tracking-tight

            text-[#D4A017]
          "
        >

          {achievements.length}

        </div>

        <div
          className="
            mt-1

            text-gray-700
            text-sm
          "
        >

          Total Achievements

        </div>

      </div>

      {/* PREVIEW */}

      <div
        className="
          space-y-3
        "
      >

        {
          previewAchievements.length === 0 ? (

            <div
              className="
                rounded-2xl

                bg-gray-50

                p-3

                text-center
              "
            >

              <p
                className="
                  text-gray-700
                  text-sm
                "
              >

                No achievements unlocked yet

              </p>

            </div>

          ) : (

            previewAchievements.map(
              (
                achievement,
                index
              ) => {

                const rarity =
                  getAchievementRarity(

                    achievement
                      ?.achievements
                      ?.rarity ||

                    "common"
                  );

                return (

                  <div
                    key={index}

                    className={`
                      relative

                      overflow-hidden

                      rounded-2xl

                      border

                      p-3

                      shadow-lg

                      transition-all
                      duration-300

                      hover:scale-[1.02]

                      ${rarity.bg}

                      ${rarity.border}

                      ${rarity.glow}
                    `}
                  >

                    {/* AMBIENT GLOW */}

                    <div
                      className="
                        absolute

                        right-[-20px]
                        top-[-20px]

                        w-24
                        h-24

                        rounded-full

                        bg-white/10
                      "
                    />

                    {/* CONTENT */}

                    <div
                      className="
                        relative
                        z-10

                        flex
                        items-center
                        justify-between
                      "
                    >

                      <div>

                        <p
                          className={`
                            text-sm

                            font-black

                            ${rarity.text}
                          `}
                        >

                          {
                            achievement
                              ?.achievements
                              ?.title
                          }

                        </p>

                        <p
  className={`
    text-xs

    mt-1

    ${
      rarity.label ===
      "Common"

        ? "text-gray-700"

        : "text-white/80"
    }
  `}
>

                          {rarity.label}

                        </p>

                      </div>

                      <div
                        className="
                          text-2xl
                        "
                      >

                        🏆

                      </div>

                    </div>

                  </div>
                );
              }
            )
          )
        }

      </div>

      {/* FOOTER */}

      <div
        className="
          mt-5

          bg-gradient-to-r
          from-[#FFF8EA]
          to-[#EEF3FF]

          rounded-2xl

          p-3

          text-center
        "
      >

        <p
          className="
            text-sm

            font-semibold

            text-tcd-blue
          "
        >

          Every achievement reflects your pursuit of excellence

        </p>

      </div>

    </div>
  );
}
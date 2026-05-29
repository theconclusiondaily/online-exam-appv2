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

export default function AchievementsPage() {

  const [
    achievements,
    setAchievements
  ] = useState<any[]>([]);

  const [
    unlocked,
    setUnlocked
  ] = useState<any[]>([]);

  const [streak,
    setStreak] =
    useState<any>(null);

  const [
    loginStreak,
    setLoginStreak
  ] = useState<any>(null);

  const [
  stats,
  setStats
] = useState({
  exams: 0,
  perfect: 0,
  high: 0,
  accuracy: 0,
});

  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    const {
      data: authData
    } =
      await supabase
        .auth
        .getUser();

    const user =
      authData.user;

    if (!user) return;

    await supabase.rpc(
      "update_login_streak",
      {
        p_user_id:
          user.id,
      }
    );

    await supabase.rpc(
      "award_exam_achievements",
      {
        p_user_id:
          user.id,
      }
    );

    const {
      data:
        achievementData
    } = await supabase

      .from(
  "achievements"
)

      .select("*")

      .eq(
        "active",
        true
      )

      .order(
        "milestone",
        {
          ascending: true,
        }
      );

    const {
      data: unlockedData
    } = await supabase

      .from(
        "user_achievements"
      )

      .select(`
        achievement_id,
        unlocked_at
      `)

      .eq(
        "user_id",
        user.id
      );

    const {
      data: attempts
    } = await supabase

      .from(
        "exam_attempts"
      )

      .select(`
        percentage
      `)

      .eq(
        "user_id",
        user.id
      );

    const {
      data: streakData
    } = await supabase

      .from(
        "study_streaks"
      )

      .select("*")
      .single();

    setStreak(
      streakData
    );

    const {
      data: loginData
    } = await supabase

      .from(
        "login_streaks"
      )

      .select("*")
      .single();

    setLoginStreak(
      loginData
    );

    const totalExams =
      attempts?.length || 0;

    const perfectScores =
      attempts?.filter(
        (a) =>
          a.percentage ===
          100
      ).length || 0;

    const highScores =
      attempts?.filter(
        (a) =>
          a.percentage >=
          90
      ).length || 0;

   const avgAccuracy =
  attempts?.length
    ? Math.round(
        attempts.reduce(
          (sum, a) =>
            sum + (a.percentage || 0),
          0
        ) / attempts.length
      )
    : 0;

setStats({
  exams: totalExams,
  perfect: perfectScores,
  high: highScores,
  accuracy: avgAccuracy,
});

    setAchievements(
      achievementData ||
      []
    );

    setUnlocked(
      unlockedData ||
      []
    );
  }

  const uniqueUnlockedIds =
    Array.from(
      new Set(
        unlocked.map(
          (u) =>
            String(
              u.achievement_id
            )
        )
      )
    );

  function isUnlocked(
    achievementId:
      string
  ) {

    return uniqueUnlockedIds.includes(
      String(
        achievementId
      )
    );
  }

  const unlockedCount =
    uniqueUnlockedIds.length;

  const completionPercent =
    achievements.length ===
    0

      ? 0

      : Math.round(
          (
            unlockedCount /
            achievements.length
          ) * 100
        );

  function renderSection(
    title: string,
    icon: any,
    category: string,
    progress: number
  ) {

    const items =
      achievements.filter(
        (a) =>
          a.category ===
          category
      );

    return (

      <div className="mb-14">

        <div
          className="
            h-1
            w-24

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

            mb-2

            flex
            items-center
            gap-2
          "
        >

          <div className="w-12 h-12">

            {icon}

          </div>

          <span>
            {title}
          </span>

        </h2>

        <p
          className="
            text-gray-500
            text-lg
            mb-4
          "
        >

          Unlock milestones and
          grow your TCD journey.

        </p>

        <div
          className="
            flex
            gap-3

            overflow-x-auto
            scroll-smooth

            pb-5

            snap-x
            snap-mandatory

            scrollbar-hide
          "
        >

          {items.map(
            (
              achievement
            ) => {

              const unlockedNow =
                isUnlocked(
                  achievement.id
                );

              let currentProgress =
                0;

              if (
                achievement.category ===
                "EXAMS"
              ) {

                currentProgress =
                  stats.exams;

              } else if (
                achievement.category ===
                "PERFECT"
              ) {

                currentProgress =
                  stats.perfect;

              } else if (
                achievement.category ===
                "HIGH_SCORE"
              ) {

                currentProgress =
                  stats.high;

              } else if (
                achievement.category ===
                "STREAK"
              ) {

                currentProgress =
                  streak
                    ?.current_streak || 0;

              } else if (
                achievement.category ===
                "LOGIN_STREAK"
              ) {

                currentProgress =
                  loginStreak
                    ?.current_streak || 0;
              }
else if (
  achievement.category ===
  "ACCURACY"
) {

  currentProgress =
    stats.accuracy;

}
              const percent =
                Math.min(
                  (
                    currentProgress /
                    achievement.milestone
                  ) * 100,
                  100
                );

              return (

                <div
                  key={
                    achievement.id
                  }
                  className={`
  relative
  overflow-hidden

  min-w-[280px]
  max-w-[280px]

  md:min-w-[320px]
  md:max-w-[320px]

                    rounded-[36px]

                    border

                    p-7

                    backdrop-blur-xl

                    snap-start

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:shadow-2xl

                    ${
                      unlockedNow

                        ? `
                          bg-gradient-to-br
                          from-tcd-gold/10
                          to-white

                          border-tcd-gold/30
                        `

                        : `
                          bg-white/90

                          border-tcd-gold/10
                        `
                    }
                  `}
                >

                  <div
                    className="
                      absolute
                      top-0
                      right-0

                      w-32
                      h-32

                      bg-tcd-gold/10

                      rounded-full

                      blur-3xl
                    "
                  />

                  <div
                    className="
                      relative
                      z-10
                    "
                  >

                    <div
                      className="
                        flex
                        justify-between
                        items-start

                        mb-2
                      "
                    >

                      <h3
                        className="
                          text-2xl md:text-3xl font-black

                          text-tcd-blue

                          leading-tight
                        "
                      >
                        {
                          achievement.title
                        }
                      </h3>

                      <div className="w-10 h-10">

                        {
                          unlockedNow

                            ? TCDIcons.achievement

                            : TCDIcons.mastery
                        }

                      </div>

                    </div>

                    <p
                      className="
                        text-gray-500
                        mb-3
                      "
                    >

                      {
                        achievement.description
                      }

                    </p>

                    <div
                      className="
                        w-full
                        h-3

                        bg-gray-200

                        rounded-full

                        overflow-hidden

                        mb-4
                      "
                    >

                      <div
                        className="
                          h-full

                          bg-gradient-to-r
                          from-tcd-blue
                          to-tcd-gold

                          rounded-full
                        "
                        style={{
                          width:
                            `${percent}%`,
                        }}
                      />

                    </div>

                    <div
                      className="
                        flex
                        justify-between

                        text-sm

                        mb-2
                      "
                    >

                      <span
                        className="
                          font-semibold
                          text-gray-600
                        "
                      >

                        {
                          currentProgress
                        }
                        /
                        {
                          achievement.milestone
                        }

                      </span>

                      <span
                        className="
                          font-bold
                          text-tcd-blue
                        "
                      >

                        {
                          Math.round(
                            percent
                          )
                        }
                        %

                      </span>

                    </div>

                    <div
                      className="
                        flex
                        justify-between
                        items-center
                      "
                    >

                      <div
                        className="
                          bg-tcd-gold/20

                          text-tcd-blue

                          px-4
                          py-2

                          rounded-2xl

                          font-bold
                        "
                      >

                        +
                        {
                          achievement.reward_tcd
                        }
                        {" "}
                        TCD

                      </div>

                      <div
                        className={`
                          font-bold

                          ${
                            unlockedNow

                              ? "text-green-600"

                              : "text-gray-500"
                          }
                        `}
                      >

                        {
                          unlockedNow

                            ? "Unlocked"

                            : "Locked"
                        }

                      </div>

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>
    );
  }

  return (

    <main
      className="
        min-h-screen

        bg-[#F8F9FB]

        p-6
        md:p-5
      "
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BACK */}

        <div className="mb-4">

          <Link
            href="/dashboard"
            className="
              inline-flex
              items-center
              gap-3

              px-4
              py-3

              bg-white/90

              border
              border-tcd-gold/10

              rounded-2xl

              shadow-sm

              hover:shadow-lg

              transition-all
            "
          >

            ← Back To Dashboard

          </Link>

        </div>

        {/* HERO */}

        <div
          className="
            relative
            overflow-hidden

            bg-gradient-to-br
            from-tcd-blue
            via-[#35548C]
            to-[#203B63]

            text-white

            rounded-[30px]

            p-6

            shadow-2xl

            border
            border-tcd-gold/20

            mb-4
          "
        >

          <img
            src="/logo.png"
            alt="TCD"
            className="
              absolute
              right-[-40px]
              top-[-40px]

              w-72
              h-72

              opacity-10
            "
          />

          <div
            className="
              inline-flex
              items-center
              gap-3

              px-4
              py-3

              rounded-full

              bg-tcd-gold/15

              border
              border-tcd-gold/20

              text-tcd-gold

              mb-4
            "
          >

            <div className="w-5 h-5">

              {
                TCDIcons.achievement
              }

            </div>

            Achievement Progress

          </div>

          <h1
            className="
              text-2xl
              font-black

              mb-2
            "
          >

            Achievement Center

          </h1>

          <p
            className="
              text-white/80
              text-xl

              max-w-2xl
            "
          >

            Celebrate growth,
            mastery, consistency
            and excellence across
            your TCD journey.

          </p>

        </div>

        {/* OVERVIEW */}

        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-4
"
        >

          {/* UNLOCKED */}

          <div
            className="
              bg-white/90
              backdrop-blur-xl

              rounded-2xl

              border
              border-tcd-gold/10

              p-5

              shadow-lg
            "
          >

            <div className="mb-2">

              {
                TCDIcons.achievement
              }

            </div>

            <p className="text-gray-500">

              Unlocked

            </p>

            <h2
              className="
                text-2xl
                font-black

                text-green-600

                mt-3
              "
            >

              {
                unlockedCount
              }

            </h2>

          </div>

          {/* TOTAL */}

          <div
            className="
              bg-white/90
              backdrop-blur-xl

              rounded-2xl

              border
              border-tcd-gold/10

              p-5

              shadow-lg
            "
          >

            <div className="mb-2">

              {
                TCDIcons.journey
              }

            </div>

            <p className="text-gray-500">

              Total Achievements

            </p>

            <h2
              className="
                text-2xl
                font-black

                text-tcd-blue

                mt-3
              "
            >

              {
                achievements.length
              }

            </h2>

          </div>

          {/* COMPLETION */}

          <div
            className="
              bg-white/90
              backdrop-blur-xl

              rounded-2xl

              border
              border-tcd-gold/10

              p-5

              shadow-lg
            "
          >

            <div className="mb-2">

              {
                TCDIcons.mastery
              }

            </div>

            <p className="text-gray-500">

              Completion

            </p>

            <h2
              className="
                text-2xl
                font-black

                text-tcd-gold

                mt-3
              "
            >

              {
                completionPercent
              }
              %

            </h2>

          </div>

        </div>

        {/* SECTIONS */}

        {renderSection(
          "Exam Completion",
          TCDIcons.journey,
          "EXAMS",
          stats.exams
        )}

        {renderSection(
          "Growth Streak",
          TCDIcons.streak,
          "STREAK",
          streak?.current_streak || 0
        )}

        {renderSection(
          "Perfect Scores",
          TCDIcons.target,
          "PERFECT",
          stats.perfect
        )}

        {renderSection(
          "High Scores (90%+)",
          TCDIcons.mastery,
          "HIGH_SCORE",
          stats.high
        )}

        {renderSection(
          "Login Journey",
          TCDIcons.achievement,
          "LOGIN_STREAK",
          0
        )}
{renderSection(
  "Accuracy Mastery",
  TCDIcons.target,
  "ACCURACY",
  0
)}

{renderSection(
  "Clean Exams",
  TCDIcons.shield,
  "CLEAN_EXAMS",
  0
)}

{renderSection(
  "TCD Earnings",
  TCDIcons.coin,
  "TCD_EARNINGS",
  0
)}

{renderSection(
  "XP Progression",
  TCDIcons.mastery,
  "XP",
  0
)}

{renderSection(
  "Speed Achievements",
  TCDIcons.timer,
  "SPEED",
  0
)}

{renderSection(
  "Leaderboard Prestige",
  TCDIcons.leaderboard,
  "LEADERBOARD",
  0
)}

{renderSection(
  "Endurance",
  TCDIcons.fire,
  "ENDURANCE",
  0
)}

{renderSection(
  "Special Prestige",
  TCDIcons.achievement,
  "SPECIAL",
  0
)}
      </div>

    </main>
  );
}
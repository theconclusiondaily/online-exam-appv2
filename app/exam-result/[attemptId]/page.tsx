"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import TCDLoader from "@/components/common/TCDLoader";
export default function ExamResultPage() {
  const params = useParams();
  const router = useRouter();

 const attemptId =
  Array.isArray(params.attemptId)
    ? params.attemptId[0]
    : params.attemptId;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
const [rank, setRank] =
  useState<number | null>(
    null
  );

const [percentile,
  setPercentile] =
  useState<number>(0);

const [timeTaken,
  setTimeTaken] =
  useState("");

const [reviewLocked,
  setReviewLocked] =
  useState(true);

const [reviewAvailableAt,
  setReviewAvailableAt] =
  useState("");

const [reviewCountdown,
  setReviewCountdown] =
  useState("");

  const [unlockTime,
  setUnlockTime] =
  useState<Date | null>(
    null
  );
const [topperData,
  setTopperData] =
  useState<any>(null);

const [
  unlockedAchievements,
  setUnlockedAchievements
] = useState<any[]>([]);
const [
  achievementCount,
  setAchievementCount
] = useState(0);

const [
  achievementReward,
  setAchievementReward
] = useState(0);


  useEffect(() => {
    async function loadResult() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.replace("/login");
          return;
        }

        const {
  data: attempt,
  error,
} = await supabase

  .from("exam_attempts")

  .select("*")

  .eq(
    "id",
    attemptId
  )

  .single();

if (!attempt) {
  setLoading(false);
  return;
}

setResult(attempt);

const examId =
  attempt.exam_id;
const savedCount =
  Number(
    sessionStorage.getItem(
      `achievement-count-${attemptId}`
    ) || 0
  );

const savedReward =
  Number(
    sessionStorage.getItem(
      `achievement-reward-${attemptId}`
    ) || 0
  );

setAchievementCount(
  savedCount
);

setAchievementReward(
  savedReward
);

console.log(
  "SESSION ACHIEVEMENTS:",
  {
    savedCount,
    savedReward,
  }
);
if (error) {
  console.error(error);
}

console.log(
  "RESULT FOUND:",
  attempt
);

        if (error) {
          console.error(error);
        }

        setResult(attempt);
const {
  data: achievements,
} = await supabase

  .from("user_achievements")

  .select(`
    id,
    achievement_id,
    achievements (
      title,
      description,
      reward_tcd
    )
  `)

  .eq(
    "user_id",
    user.id
  )

  .eq(
    "seen",
    false
  );

if (
  achievements &&
  achievements.length > 0
) {

  const formattedAchievements =
    achievements.map(
      (item: any) => ({

        id: item.id,

        title:
          item.achievements?.title,

        description:
          item.achievements?.description,

        reward_tcd:
          item.achievements?.reward_tcd,

      })
    );

  setUnlockedAchievements(
    formattedAchievements
  );

  // Mark as seen so they don't show again

  await supabase

    .from("user_achievements")

    .update({
      seen: true,
    })

    .eq(
      "user_id",
      user.id
    )

    .eq(
      "seen",
      false
    );

}

        const {
  data: exam,
} = await supabase

  .from("exams")

  .select(`
    end_time,
    review_delay_minutes
  `)

  .eq(
    "id",
    examId
  )

  .single();

if (
  exam?.end_time
) {

  const unlockTime =
    new Date(
      exam.end_time
    );

  unlockTime.setMinutes(
    unlockTime.getMinutes() +
    (
      exam
        .review_delay_minutes ||
      30
    )
  );

  setUnlockTime(
  unlockTime
);

setReviewAvailableAt(
  unlockTime
    .toLocaleString(
      "en-IN",
      {
        timeZone:
          "Asia/Kolkata",
      }
    )
);

setReviewLocked(
  new Date() <
    unlockTime
);
}
if (
  attempt?.started_at &&
  attempt?.submitted_at
) {

  const diff =
    new Date(
      attempt.submitted_at
    ).getTime()
    -
    new Date(
      attempt.started_at
    ).getTime();

  const minutes =
    Math.floor(
      diff / 60000
    );

  const seconds =
    Math.floor(
      (
        diff % 60000
      ) / 1000
    );

  setTimeTaken(
    `${minutes}m ${seconds}s`
  );
}

        if (attempt) {

  const {
    data: leaderboard,
  } = await supabase

    .from(
      "exam_attempts"
    )

    .select(`
      user_id,
      score
    `)

    .eq(
      "exam_id",
      examId
    )

    .order(
      "score",
      {
        ascending:
          false,
      }
    );

  if (leaderboard) {

  const currentUser =
    leaderboard.find(
      (entry) =>
        entry.user_id ===
        user.id
    );
console.log(
  "USER ID:",
  user.id
);

console.log(
  "LEADERBOARD:",
  leaderboard
);

console.log(
  "CURRENT USER:",
  currentUser
);
  if (!currentUser) {

  setRank(null);

} else {

  const userScore =
    Number(
      currentUser.score || 0
    );

  const position =
    leaderboard.filter(
      (entry) =>
        Number(
          entry.score || 0
        ) > userScore
    ).length + 1;

  setRank(position);

  const studentsBelowOrEqual =
    leaderboard.filter(
      (entry) =>
        Number(
          entry.score || 0
        ) <= userScore
    ).length;

  const percentileValue =
    (
      studentsBelowOrEqual /
      leaderboard.length
    ) * 100;

  setPercentile(
    Number(
      percentileValue.toFixed(2)
    )
  );
}
const {
  data: topper,
} = await supabase

  .from("exam_attempts")

  .select(`
    score,
    accuracy,
    started_at,
    submitted_at
  `)

  .eq(
    "exam_id",
    examId
  )

  .order(
    "score",
    {
      ascending: false,
    }
  )

  .limit(1)

  .maybeSingle();

setTopperData(
  topper
);
  }
}
      } catch (error) {
        console.error(error);
      } finally {

  console.log(
    "FINALLY EXECUTED"
  );

  setLoading(false);
}
    }

    if (attemptId) {
  loadResult();
}
  }, [attemptId, router]);
useEffect(() => {

  if (
    !unlockTime ||
    !reviewLocked
  ) {
    return;
  }

  const timer =
    setInterval(() => {

      const now =
        new Date();

      const diff =
        unlockTime.getTime()
        -
        now.getTime();

      if (
        diff <= 0
      ) {

        setReviewCountdown(
          "Available Now"
        );

        setReviewLocked(
          false
        );

        clearInterval(
          timer
        );

        return;
      }

      const days =
        Math.floor(
          diff /
          (
            1000 *
            60 *
            60 *
            24
          )
        );

      const hours =
        Math.floor(
          (
            diff %
            (
              1000 *
              60 *
              60 *
              24
            )
          ) /
          (
            1000 *
            60 *
            60
          )
        );

      const minutes =
        Math.floor(
          (
            diff %
            (
              1000 *
              60 *
              60
            )
          ) /
          (
            1000 *
            60
          )
        );

      const seconds =
        Math.floor(
          (
            diff %
            (
              1000 *
              60
            )
          ) /
          1000
        );

      setReviewCountdown(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );

    }, 1000);

  return () =>
    clearInterval(
      timer
    );

}, [
  unlockTime,
  reviewLocked,
]);
  if (loading) {
  return (
    <TCDLoader text="Calculating Results" />
  );
}

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">
          Result Not Found
        </h1>

        <button
          onClick={() =>
            router.push("/dashboard")
          }
          className="px-6 py-3 bg-black text-white rounded-xl"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
let topperTime = 0;
let myTime = 0;

if (
  topperData?.started_at &&
  topperData?.submitted_at
) {

  topperTime =
    Math.floor(
      (
        new Date(
          topperData.submitted_at
        ).getTime()
        -
        new Date(
          topperData.started_at
        ).getTime()
      ) / 1000
    );
}

if (
  result?.started_at &&
  result?.submitted_at
) {

  myTime =
    Math.floor(
      (
        new Date(
          result.submitted_at
        ).getTime()
        -
        new Date(
          result.started_at
        ).getTime()
      ) / 1000
    );
}

const formatTime =
  (
    seconds: number
  ) => {

    const mins =
      Math.floor(
        seconds / 60
      );

    const secs =
      seconds % 60;

    return `${mins}m ${secs}s`;
  };

const scoreGap =
  Math.max(
    0,
    (
      topperData?.score || 0
    )
    -
    (
      result?.score || 0
    )
  );

const isTopper =
  scoreGap === 0;

console.log(
  "RENDER VALUES:",
  {
    achievementCount,
    achievementReward,
  }
);

 return (
  <main className="min-h-screen bg-gray-50 p-5">
    <div className="max-w-5xl mx-auto">


    {/* Header */}

      <div className="text-center mb-10">

        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mb-4">
          🎉 Exam Submitted Successfully
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Exam Result
        </h1>

        <p className="text-tcd-primary text-lg">
          Your performance summary
        </p>

      </div>

      {/* Score Card */}

      <div
  className="
    bg-tcd-blue
    text-white
    rounded-2xl
    p-6
    mb-4
    shadow-xl
    border
    border-tcd-gold/20
    relative
    overflow-hidden
  "
>


        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
<div
  className="
    inline-flex
    items-center
    gap-2

    bg-tcd-gold/20

    text-tcd-gold

    px-4
    py-2

    rounded-full

    mb-3
  "
>
  🏆 Result Generated
</div>
          <div>

            <p className="text-blue-100">
              Final Score
            </p>

            <h2 className="text-2xl font-bold">
              {result.score ?? 0}
            </h2>

          </div>

          <div className="text-center">

            <p className="text-blue-100">
              Percentage
            </p>

            <h2 className="text-3xl font-bold">
              {result.percentage ?? 0}%
            </h2>

          </div>

        </div>
        

      </div>
<div
  className="
    bg-white

    rounded-2xl

    border
    border-gray-100

    p-5

    shadow-sm

    mb-4
  "
>

  <h2
    className="
      text-2xl
      font-bold

      text-tcd-blue

      mb-3
    "
  >
    TCD Rewards
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

    <div className="text-center">

      <img
        src="/icons/tcd-coin.svg"
        className="w-16 h-16 mx-auto mb-3"
      />

      <h3 className="text-2xl font-bold text-tcd-blue">
        {achievementReward}
      </h3>

      <p className="text-tcd-primary">
        Credits Earned
      </p>

    </div>

    <div className="text-center">

      <img
        src="/icons/achievement-medal.svg"
        className="w-16 h-16 mx-auto mb-3"
      />

      <h3 className="text-2xl font-bold text-tcd-blue">
        {achievementCount}
      </h3>

      <p className="text-tcd-primary">
        Achievements
      </p>

    </div>

    <div className="text-center">

      <img
        src="/icons/mastery-star.svg"
        className="w-16 h-16 mx-auto mb-3"
      />

      <h3 className="text-2xl font-bold text-tcd-blue">
        {rank || "-"}
      </h3>

      <p className="text-tcd-primary">
        Current Rank
      </p>

    </div>

  </div>

</div>
<div
  className="
    bg-white

    rounded-[28px]

    p-6

    border

    mb-4
  "
>

  <h2
    className="
      text-xl
      font-bold

      text-tcd-blue
    "
  >
    Performance Insight
  </h2>

  <p className="text-brand mt-3">

    {result.accuracy >= 90
      ? "Outstanding performance. You demonstrated excellent accuracy and consistency."
      : result.accuracy >= 75
      ? "Strong performance. Focus on a few weak areas to move into the top ranks."
      : "Good effort. Reviewing mistakes and attempting more exams will rapidly improve your results."}

  </p>

</div>
      {/* Performance Grid */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">

        <div className="bg-green-50 rounded-2xl p-6 text-center shadow-sm">

          <p className="text-tcd-primary">
            Correct
          </p>

          <h3 className="text-2xl font-bold text-green-600">
            {result.correct_count ?? 0}
          </h3>

        </div>

        <div className="bg-red-50 rounded-2xl p-6 text-center shadow-sm">

          <p className="text-tcd-primary">
            Wrong
          </p>

          <h3 className="text-2xl font-bold text-red-600">
            {result.wrong_count ?? 0}
          </h3>

        </div>

        <div className="bg-yellow-50 rounded-2xl p-6 text-center shadow-sm">

          <p className="text-tcd-primary">
            Accuracy
          </p>

          <h3 className="text-2xl font-bold text-yellow-600">
            {result.accuracy ?? 0}%
          </h3>

        </div>

        <div className="bg-purple-50 rounded-2xl p-6 text-center shadow-sm">

          <p className="text-tcd-primary">
            Violations
          </p>

          <h3 className="text-2xl font-bold text-purple-600">
            {result.violations ?? 0}
          </h3>

        </div>

      </div>
<div className="bg-tcd-gold/10
rounded-2xl
p-4">

  <h2 className="text-2xl font-bold mb-3">

    Ranking

  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

    <div className="text-center">

      <p className="text-tcd-primary mb-2">

        Current Rank

      </p>

      <h3 className="text-2xl font-bold text-tcd-blue">

        #{rank || "-"}

      </h3>

    </div>

    <div className="text-center">

      <p className="text-tcd-primary mb-2">

        Percentile

      </p>

      <h3 className="text-2xl font-bold text-green-600">

        {percentile}%

      </h3>

    </div>

  </div>

</div>


<div className="bg-white rounded-3xl border shadow-sm p-5 mb-4">

  <h2 className="text-2xl font-bold mb-3">

    📈 Compare With Topper

  </h2>

  {isTopper ? (

    <div className="text-center">

      <h3 className="text-2xl font-bold text-green-600 mb-2">

        🏆 You Are The Topper

      </h3>

      <p className="text-tcd-primary">

        Congratulations! You currently hold the highest score in this exam.

      </p>

    </div>

  ) : (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

      <div className="text-center">

        <p className="text-tcd-primary">

          Score Gap

        </p>

        <h3 className="text-2xl font-bold text-blue-600">

          {scoreGap}

        </h3>

        <p className="text-sm text-tcd-primary">

          marks behind topper

        </p>

      </div>

      <div className="text-center">

        <p className="text-tcd-primary">

          Topper Accuracy

        </p>

        <h3 className="text-2xl font-bold text-green-600">

          {topperData?.accuracy || 0}%

        </h3>

      </div>

      <div className="text-center">

        <p className="text-tcd-primary">

          Time Difference

        </p>

        <h3 className="text-3xl font-bold text-purple-600">

          {
            formatTime(
              Math.abs(
                myTime -
                topperTime
              )
            )
          }

        </h3>

      </div>

    </div>

  )}

</div>
      {/* Exam Summary */}

 <div className="bg-white rounded-3xl border shadow-sm p-5 mb-4">

  <h2 className="text-2xl font-bold mb-3">
    Exam Summary
  </h2>

  <div className="space-y-4">

    <div className="flex justify-between border-b pb-3">

      <span className="text-tcd-primary">
        Total Questions
      </span>

      <span className="font-semibold">
        {result.total_questions ?? 0}
      </span>

    </div>

    <div className="flex justify-between border-b pb-3">

      <span className="text-tcd-primary">
        Submitted At
      </span>

      <span className="font-semibold">
        {result.submitted_at
          ? new Date(
              result.submitted_at
            ).toLocaleString("en-IN")
          : "-"}
      </span>

    </div>

    <div className="flex justify-between border-b pb-3">

      <span className="text-tcd-primary">
        Time Taken
      </span>

      <span className="font-semibold">
        {timeTaken}
      </span>

    </div>

    <div className="flex justify-between">

      <span className="text-tcd-primary">
        Status
      </span>

      <span className="font-semibold text-green-600">
        Submitted
      </span>

    </div>

  </div>

</div>
<div className="bg-white rounded-3xl border shadow-sm p-5 mb-4">

  <h2 className="text-2xl font-bold mb-4">

    Answer Review

  </h2>

  {reviewLocked ? (

    <div>

      <p className="text-orange-600 font-semibold mb-3">

        🔒 Review Locked

      </p>

      <p className="text-brand">

        Answer key and
        detailed review
        will be available
        after the exam closes.

      </p>

     <div className="mt-4">

  <p className="font-semibold text-orange-600">

    ⏳ Available In:
    {" "}
    {reviewCountdown}

  </p>

  <p className="mt-2 font-semibold">

    Available At:
    {" "}
    {reviewAvailableAt}

  </p>

</div>

    </div>

  ) : (

    <div>

      <p className="text-green-600 font-semibold mb-4">

        ✅ Review Available

      </p>

      <button

        onClick={() =>
          router.push(
            `/exam-review/${result.id}`
          )
        }

        className="px-6 py-3 bg-green-600 text-white rounded-xl"

      >

        Review Answers

      </button>

    </div>

  )}

</div>
{
  unlockedAchievements.length > 0 && (

    <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm mt-6">

      <div className="flex items-center gap-3 mb-5">

  <img
    src="/icons/achievement-medal.svg"
    alt="Achievements"
    className="w-10 h-10"
  />

  <h2 className="text-2xl font-black text-tcd-blue">
    New Achievements Unlocked
  </h2>

</div>

      <div className="space-y-4">

        {unlockedAchievements.map((achievement) => (

          <div
            key={achievement.id}
            className="
              flex
              items-center
              gap-4

              p-5

              rounded-2xl

              border
              border-tcd-gold/20

              bg-gradient-to-r
              from-[#FFFDF5]
              to-white

              shadow-sm
            "
          >

            <img
              src="/icons/achievement-medal.svg"
              alt="Achievement"
              className="w-14 h-14"
            />

            <div className="flex-1">

              <h3 className="text-xl font-black text-tcd-blue">

                {achievement.title}

              </h3>

              <p className="text-brand mt-1">

                {achievement.description}

              </p>

              <div className="flex flex-wrap gap-2 mt-3">

                <span
                  className="
                    px-3
                    py-1

                    rounded-full

                    bg-green-100
                    text-green-700

                    text-sm
                    font-bold
                  "
                >
                  Unlocked
                </span>

                {achievement.reward_tcd > 0 && (

                  <span
                    className="
                      px-3
                      py-1

                      rounded-full

                      bg-tcd-gold/10
                      text-tcd-gold

                      text-sm
                      font-bold
                    "
                  >
                    +{achievement.reward_tcd} TCD Credits
                  </span>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}
      {/* Action Buttons */}

      <div className="flex flex-wrap gap-2 justify-center">

        <button
          onClick={() =>
            router.push(
              "/dashboard"
            )
          }
          className="
  px-8
  py-3

  bg-tcd-gold
  hover:bg-tcd-gold-dark

  text-tcd-blue

  rounded-2xl

  font-bold

  transition-all
"
        >
          Dashboard
        </button>

        <button
          onClick={() =>
            router.push(
              `/leaderboard/${result?.exam_id}`
            )
          }
          className="
  px-8
  py-3

  bg-tcd-blue
  hover:bg-tcd-blue-light

  text-white

  rounded-2xl

  font-bold

  transition-all
"
        >
          View Leaderboard
        </button>

      </div>

    </div>
  </main>
);
}
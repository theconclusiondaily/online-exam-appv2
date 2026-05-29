"use client";

import {
  useEffect,
  useState,
  useRef
} from "react";

import {
  useRouter,
} from "next/navigation";

import Link from "next/link";
import { TCDIcons }
from "@/components/ui/tcd-icons";
import { supabase }
from "@/lib/supabase/client";
import {
  updateExamStatuses,
} from "@/lib/examStatus";
import DashboardHero
from "@/components/dashboard/DashboardHero";
import WalletCard from "@/components/dashboard/WalletCard";
import DailyRewardCard from "@/components/dashboard/DailyRewardCard";
import AchievementCard from "@/components/dashboard/AchievementCard";
import StudyStreakCard from "@/components/dashboard/StudyStreakCard";
import LoginStreakCard from "@/components/dashboard/LoginStreakCard";
import StatsGrid
from "@/components/dashboard/StatsGrid";
import LiveExamsSection
from "@/components/dashboard/LiveExamsSection";
import ExamHistoryTable
from "@/components/dashboard/ExamHistoryTable";
import ActivityFeed
from "@/components/dashboard/ActivityFeed";
import {
  getLeague
} from "@/lib/getLeague";
import {
  getLeagueProgress
} from "@/lib/getLeagueProgress";
import {
  getLevelTitle
} from "@/lib/getLevelTitle";
import AchievementPopup
from "@/components/dashboard/AchievementPopup";
import {
  getExamStatus
} from "@/lib/getExamStatus";
export default function DashboardPage() {

  const router =
    useRouter();

  const [loading,
    setLoading] =
    useState(true);

  const [user,
    setUser] =
    useState<any>(null);
const [
  profile,
  setProfile
] = useState<any>(null);
  const [attempts,
    setAttempts] =
    useState<any[]>([]);

  const [upcomingExams,
    setUpcomingExams] =
    useState<any[]>([]);

  const [liveExams,
    setLiveExams] =
    useState<any[]>([]);

  const [ranks,
    setRanks] =
    useState<any>({});
    const [percentiles,
  setPercentiles] =
  useState<any>({});
  const [reviewStatus,
  setReviewStatus] =
  useState<any>({});
const [examTitles,
  setExamTitles] =
  useState<Record<string, any>>(
    {}
  );
  
const [
  topLeader,
  setTopLeader
] = useState<any>(null);
  const [lastEarned,
  setLastEarned] =
  useState<any>(null);
  const [streak, setStreak] =
  useState<any>(null);

const streakMilestones = [
  3,
  7,
  15,
  30,
  60,
  90,
  120,
  150,
  180,
  210,
  240,
  270,
  300,
  330,
  365,
];


const [
  loginStreak,
  setLoginStreak
] = useState<any>(null);
const [
  activities,
  setActivities
] = useState<any[]>([]);
const [
  achievements,
  setAchievements
] = useState<any[]>([]);

const nextMilestone =
  streakMilestones.find(
    m =>
      m >
      (streak?.current_streak || 0)
  ) || null;
  const progressPercent =
  nextMilestone
    ? Math.min(
        (
          (streak?.current_streak || 0) /
          nextMilestone
        ) * 100,
        100
      )
    : 100;

    
  const [stats,
  setStats] =
  useState({

    totalAttempts: 0,

    averageScore: 0,

    highestScore: 0,

    averageAccuracy: 0,

    averagePercentage: 0,

    totalCorrect: 0,

    totalWrong: 0,

  });
  const [wallet,
  setWallet] =
  useState({

    current_balance: 0,
    last_exam_credits: 0,
    lifetime_earned: 0,

  });
const [
  dailyReward,
  setDailyReward
] = useState(0);

const [
  rewardClaimed,
  setRewardClaimed
] = useState(false);
const [
  unlockedPopup,
  setUnlockedPopup
] = useState<any>(null);
const [
  showRewardPopup,
  setShowRewardPopup
] = useState(false);
const [
  userXP,
  setUserXP
] = useState(0);
const [
  userLevel,
  setUserLevel
] = useState(0);
const [
  rewardAmount,
  setRewardAmount
] = useState(0);
const league =
  getLeague(
    userXP
  );

  const leagueProgress =
  getLeagueProgress(
    userXP
  );
const levelTitle =
  getLevelTitle(
    userLevel
  );

  // LOGOUT

  async function handleLogout() {

    await supabase
      .auth
      .signOut();

    router.push(
      "/login"
    );
  }

  // LOAD DASHBOARD

 

    async function loadDashboard() 
    { await updateExamStatuses();



    const {
  data: { user },
} = await supabase.auth.getUser();

      // NOT LOGGED IN

      if (!user) {

        router.push(
          "/login"
        );

        return;
      }

await supabase.rpc(
  "award_exam_achievements",
  {
    p_user_id: user.id,
  }
);
const {
  data: unlockedAchievements,
} = await supabase

  .from(
    "user_achievements"
  )

  .select(`
    *,
    achievements (
      title,
      rarity,
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
      setUser(user);


if (
  unlockedAchievements?.length
) {

  const firstAchievement =

    unlockedAchievements[0]
      ?.achievements;

  setUnlockedPopup(
    firstAchievement
  );

  const achievementIds =

    unlockedAchievements.map(
      (
        a: any
      ) => a.id
    );

  await supabase

    .from(
      "user_achievements"
    )

    .update({
      seen: true,
    })

    .in(
      "id",
      achievementIds
    );

}
let {
  data: walletData,
} = await supabase

  .from(
    "tcd_wallets"
  )

  .select("*")

  .eq(
    "user_id",
    user.id
  )

  .maybeSingle();

if (!walletData) {

  await supabase

    .from(
      "tcd_wallets"
    )

    .insert({

      user_id:
        user.id,

      current_balance:
        0,

      lifetime_earned:
        0,

    });
    const {
  data: activityData
} = await supabase

  .from("activity_feed")

  .select("*")

  .order(
    "created_at",
    {
      ascending: false,
    }
  )

  .limit(10);

setActivities(
  activityData || []
);
const {
  data: leaderboardData
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

  .limit(1);

if (
  leaderboardData?.length
) {

  setTopLeader(
    leaderboardData[0]
  );
}const {
  data: levelData
} = await supabase

  .from("user_levels")

  .select("xp, level")

  .eq(
    "user_id",
    user.id
  )

  .single();

setUserXP(
  levelData?.xp || 0
);

setUserLevel(
  levelData?.level || 0
);

  const {
    data: newWallet,
  } = await supabase

    .from(
      "tcd_wallets"
    )

    .select("*")

    .eq(
      "user_id",
      user.id
    )

    .single();

  walletData =
    newWallet;
}

if (walletData) {

  setWallet(
    walletData
  );
}
const {
  data: lastTxn,
} = await supabase

  .from(
    "tcd_transactions"
  )

  .select(`
    credits,
    description
  `)

  .eq(
    "user_id",
    user.id
  )

  .order(
    "created_at",
    {
      ascending: false,
    }
  )

  .limit(1)

  .maybeSingle();

  setLastEarned(
  lastTxn
);
const {
  data: achievementsData,
} = await supabase

  .from(
    "user_achievements"
  )

  .select("*")

  .eq(
    "user_id",
    user.id
  );

setAchievements(
  achievementsData || []
);
const {
  data: streakData,
  error: streakError,
} = await supabase

  .from(
    "study_streaks"
  )

  .select("*")

  .eq(
    "user_id",
    user.id
  )

  .maybeSingle();


setStreak(
  streakData
);


const {
  data: loginStreakData,
  error: loginQueryError,
} = await supabase

  .from(
    "login_streaks"
  )

  .select("*")

  .eq(
    "user_id",
    user.id
  )

  .maybeSingle();



setLoginStreak(
  loginStreakData
);

const {
  data: rewardData,
} = await supabase

  .from(
    "daily_login_rewards"
  )

  .select(
    "last_claim_date"
  )

  .eq(
    "user_id",
    user.id
  )

  .maybeSingle();

if (
  rewardData?.last_claim_date ===
  new Date()
    .toISOString()
    .split("T")[0]
) {

  setRewardClaimed(
    true
  );
}
      // FETCH PROFILE

    const {
  data: profileData,
} = await supabase
        .from("users")
        .select(`
  institute_id,
  role,
  name
`)

        .eq(
          "email",
          user.email
        )
        
        .single();

      setProfile(
  profileData
);
      // FETCH ATTEMPTS

      const {
  data: attemptsData,
  error: attemptsError,
} = await supabase
  .from("exam_attempts")
  .select(`
    *,
    exams (
      id,
      title
    )
  `)
  .eq(
    "user_id",
    user.id
  )
  .order("created_at", {
    ascending: false,
  });

     
        if (attemptsData) {
const examIds = [
  ...new Set(
    attemptsData.map(
      (attempt) =>
        attempt.exam_id
    )
  ),
];

const {
  data: examsData,
  error: examsError,
} = await supabase
  .from("exams")
  .select(`
  id,
  title,
  duration,
  reward_pool,
  end_time,
  review_delay_minutes
`)
  .in("id", examIds);

if (
  !examsError &&
  examsData
) {

 const examMap =
  Object.fromEntries(
    examsData.map(
      (exam) => [
        exam.id,
        exam
      ]
    )
  );

setExamTitles(
  examMap
);
const reviewMap: any = {};

for (const attempt of attemptsData) {

  const exam =
    examMap[
      attempt.exam_id
    ];

  if (
    !exam?.end_time
  ) {
    continue;
  }

  const unlockTime =
    new Date(
      exam.end_time
    );

  unlockTime.setMinutes(
    unlockTime.getMinutes() +
    (
      exam.review_delay_minutes ||
      30
    )
  );

  reviewMap[
    attempt.id
  ] =
    new Date() >=
    unlockTime;
}

setReviewStatus(
  reviewMap
);
}

        setAttempts(
          attemptsData
        );

        // STATS

        const totalAttempts =
          attemptsData.length;

        const totalScore =
          attemptsData.reduce(
            (
              acc,
              item
            ) =>
              acc +
              (item.score || 0),
            0
          );

        const highestScore =
          Math.max(
            ...attemptsData.map(
              (item) =>
                item.score || 0
            ),
            0
          );
const totalCorrect =
  attemptsData.reduce(
    (
      acc,
      item
    ) =>

      acc +

      (
        item.correct_count ||
        0
      ),

    0
  );

const totalWrong =
  attemptsData.reduce(
    (
      acc,
      item
    ) =>

      acc +

      (
        item.wrong_count ||
        0
      ),

    0
  );

const averageAccuracy =
  totalAttempts > 0

    ? Math.round(

        attemptsData.reduce(
          (
            acc,
            item
          ) =>

            acc +

            (
              item.accuracy ||
              0
            ),

          0
        )

        /

        totalAttempts
      )

    : 0;
    

const averagePercentage =
  totalAttempts > 0

    ? Math.round(

        attemptsData.reduce(
          (
            acc,
            item
          ) =>

            acc +

            (
              item.percentage ||
              0
            ),

          0
        )

        /

        totalAttempts
      )

    : 0;
        setStats({

  totalAttempts,

  averageScore:
    totalAttempts > 0

      ? Math.round(
          totalScore /
          totalAttempts
        )

      : 0,

  highestScore,

  averageAccuracy,

  averagePercentage,

  totalCorrect,

  totalWrong,

});

        // LIVE RANK CALCULATION


// KEEP ONLY LATEST ATTEMPT
// FOR EACH EXAM

const latestAttemptsMap: any = {};

attemptsData.forEach(
  (attempt) => {

    if (
      !latestAttemptsMap[
        attempt.exam_id
      ]
    ) {

      latestAttemptsMap[
        attempt.exam_id
      ] = attempt;

      return;
    }

    const existing =
      latestAttemptsMap[
        attempt.exam_id
      ];

    if (

      new Date(
        attempt.created_at
      ).getTime()

      >

      new Date(
        existing.created_at
      ).getTime()

    ) {

      latestAttemptsMap[
        attempt.exam_id
      ] = attempt;
    }
  }
);

const latestAttempts =
  Object.values(
    latestAttemptsMap
  ) as any[];

// SORT NEWEST FIRST

latestAttempts.sort(
  (a: any, b: any) =>

    new Date(
      b.created_at
    ).getTime()

    -

    new Date(
      a.created_at
    ).getTime()
);

// UPDATE ATTEMPTS

setAttempts(
  latestAttempts
);

// LIVE RANKS

const rankMap: any = {};
const percentileMap: any = {};

for (const attempt of latestAttempts) {

  const {
    data: leaderboardData,
  } = await supabase
    .from("exam_attempts")
    .select("*")
    .eq(
      "exam_id",
      attempt.exam_id
    );

  if (!leaderboardData) {
    continue;
  }

const sorted =
  [...leaderboardData].sort(
    (a, b) => {

      // 1. Higher Score First

      if (
        Number(b.score || 0) !==
        Number(a.score || 0)
      ) {

        return (
          Number(b.score || 0)
          -
          Number(a.score || 0)
        );
      }

      // 2. Higher Accuracy First

      if (
        Number(
          b.accuracy || 0
        ) !==
        Number(
          a.accuracy || 0
        )
      ) {

        return (
          Number(
            b.accuracy || 0
          )
          -
          Number(
            a.accuracy || 0
          )
        );
      }

      // 3. Less Time Taken Wins

      if (
        Number(
          a.time_taken || 0
        ) !==
        Number(
          b.time_taken || 0
        )
      ) {

        return (
          Number(
            a.time_taken || 0
          )
          -
          Number(
            b.time_taken || 0
          )
        );
      }

      // 4. Earlier Submission Wins

      return (
        new Date(
          a.submitted_at ||
          a.created_at
        ).getTime()

        -

        new Date(
          b.submitted_at ||
          b.created_at
        ).getTime()
      );
    }
  );

  const rank =
  sorted.findIndex(
    (item) =>
      item.user_id ===
      user.id
  ) + 1;

rankMap[
  attempt.exam_id
] = rank;

  const currentUser =
    sorted.find(
      (item) =>
        item.user_id ===
        user.id
    );

  if (currentUser) {

    const studentsBelowOrEqual =
      sorted.filter(
        (item) =>
          Number(
            item.score || 0
          ) <=
          Number(
            currentUser.score || 0
          )
      ).length;

    percentileMap[
      attempt.exam_id
    ] = Number(
      (
        (
          studentsBelowOrEqual /
          sorted.length
        ) * 100
      ).toFixed(2)
    );
  }
}

setRanks(rankMap);
setPercentiles(
  percentileMap
);

setRanks(rankMap);


      }


      if (!profileData?.institute_id) {

  setLiveExams([]);
  setUpcomingExams([]);

} else {
      // CURRENT TIME

    

      // LIVE EXAMS

      const now =
  new Date()
    .toISOString();

const {
  data: liveData,
} = await supabase

  .from("exams")

  .select("*")

  .eq(
    "institute_id",
    profileData?.institute_id
  )

  .eq(
    "published",
    true
  )

  .lte(
    "start_time",
    now
  )

  .gte(
    "end_time",
    now
  )

  .order(
    "start_time",
    {
      ascending: true,
    }
  );


      if (liveData) {

        setLiveExams(
          liveData
        );
      }

      // UPCOMING EXAMS

      const {
        data: upcomingData,
      } = await supabase
        .from("exams")
        .select("*")
        .eq(
          "institute_id",
          profileData?.institute_id
        )
        .gt(
          "start_time",
          now
        )
        .order("start_time", {
          ascending: true,
        });

      if (upcomingData) {

        setUpcomingExams(
          upcomingData
        );
      }
    }
      setLoading(false);
    }
 useEffect(() => {

  async function init() {

    const {
      data: {
        session,
      },
    } =
      await supabase.auth.getSession();

    if (
      session?.user
    ) {

      await supabase.rpc(
        "update_login_streak",
        {
          p_user_id:
            session.user.id,
        }
      );
    }

    await loadDashboard();
  }

  init();

  const interval =
    setInterval(() => {

      loadDashboard();

    }, 30000);

  return () =>
    clearInterval(
      interval
    );

}, [router]);
const handleClaimReward =
  async () => {

    const {
      data,
      error,
    } =
      await supabase.rpc(
        "claim_daily_login_reward",
        {
          p_user_id:
            user.id,
        }
      );

    if (error) {
      console.error(error);
      return;
    }

    if (data > 0) {

      setDailyReward(
        data
      );

      setRewardClaimed(
        true
      );

      setRewardAmount(
        data
      );

      setShowRewardPopup(
        true
      );

      loadDashboard();
    }
  };

  const milestones = [
  3,
  7,
  15,
  30,
  45,
  60,
  90,
  120,
  180,
  365,
];
    

  // LOADING

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="text-2xl font-bold">

          Loading Dashboard...

        </div>

      </main>
    );
  }

  return (
  <main className="min-h-screen bg-gray-50 p-3 md:p-4">

    {/* REWARD POPUP */}

    {showRewardPopup && (
      <div
        className="
          fixed inset-0
          bg-black/50
          flex items-center justify-center
          z-50
        "
      >
        <div
          className="
            bg-white
            rounded-3xl
            p-5
            shadow-xl
            max-w-md
            w-full
            text-center
          "
        >
          <div className="text-2xl mb-4">
            🎁
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Daily Reward Claimed
          </h2>

          <div className="text-3xl font-bold text-green-600 mb-3">
            +{rewardAmount} TCD
          </div>

          <button
            onClick={() =>
              setShowRewardPopup(false)
            }
            className="
              bg-tcd-blue
              text-white
              px-8
              py-3
              rounded-xl
              font-bold
            "
          >
            Awesome!
          </button>
        </div>
      </div>
    )}
{
  unlockedPopup && (

    <AchievementPopup

      achievement={
        unlockedPopup
      }

      onClose={() =>
        setUnlockedPopup(
          null
        )
      }

    />
  )
}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* HERO */}

     <DashboardHero
  name={
  profile?.name ||
  "Student"
}
  balance={
    wallet?.current_balance || 0
  }
  studyStreak={
    streak?.current_streak || 0
  }
  loginStreak={
    loginStreak?.current_streak || 0
  }
  level={userLevel}
  levelTitle={levelTitle}

  xp={userXP}
/>

{/* TOP CARDS */}

<div
  className="
    grid
    xl:grid-cols-12

    gap-3

    mb-4
  "
>

  {/* LEADERBOARD HUB */}

  <div className="xl:col-span-5">

    <Link
      href="/dashboard/leaderboard"
      className="
        relative
        overflow-hidden

        bg-gradient-to-br
        from-tcd-blue
        via-[#35548C]
        to-[#203B63]

        rounded-[28px]

        p-4

        shadow-lg

        text-white

        hover:shadow-2xl
        hover:-translate-y-1

        transition-all
        duration-300

        flex
        flex-col

        gap-4
      "
    >

      {/* WATERMARK */}

      <img
        src="/logo.png"
        alt="TCD"
        className="
          absolute

          right-[-60px]
          bottom-[-60px]

          w-48
          h-48

          opacity-[0.04]
        "
      />

      {/* TOP */}

      <div className="relative z-10">

        <div
          className="
            inline-flex
            items-center
            gap-2

            px-3
            py-1.5

            rounded-full

            bg-white/10

            border
            border-white/10

            text-tcd-gold

            text-sm

            mb-3
          "
        >

          {TCDIcons.leaderboard}

          Competitive Hub

        </div>
<div
  className={`
    inline-flex
    items-center

    gap-2

    px-4
    py-1

    rounded-full

    border

    text-sm
    font-bold

    mb-3

    ${league.bg}

    ${league.color}

    ${league.border}
  `}
>

  {TCDIcons.rank}

  {league.name} League

</div>
<div
  className="
    mt-3

    w-full
    max-w-sm
  "
>

  <div
    className="
      flex
      items-center
      justify-between

      text-xs

      text-white/70

      mb-2
    "
  >

    <span>

      {league.name}

    </span>

    <span>

      {
        leagueProgress.nextLeague
      }

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

        bg-tcd-gold

        rounded-full

        transition-all
        duration-700
      "

      style={{

        width:
          `${leagueProgress.progress}%`

      }}
    />

  </div>

  <p
    className="
      text-xs

      text-white/60

      mt-2
    "
  >

    {
      leagueProgress.remaining
    } XP to {" "}
    {
      leagueProgress.nextLeague
    }

  </p>

</div>
        <h2
          className="
            text-2xl
            font-black

            leading-tight

            mb-1
          "
        >

          Global Leaderboard

        </h2>

        <p
          className="
            text-white/70

            text-sm
          "
        >

          Compete with top
          performers globally.

        </p>

      </div>

      {/* PREVIEW */}

      <div
        className="
          relative
          z-10

          bg-white/10

          rounded-2xl

          px-4
          py-3
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div
            className="
              flex
              items-center

              gap-3
            "
          >

            <div
              className="
                w-11
                h-11

                rounded-xl

                bg-tcd-gold/20

                flex
                items-center
                justify-center

                text-lg
                font-black
              "
            >

              #1

            </div>

            <div>

              <p
                className="
                  font-bold

                  leading-none

                  mb-1
                "
              >

                {
                  topLeader?.email
                    ?.split("@")[0] ||

                  "Top Performer"
                }

              </p>

              <p
                className="
                  text-xs
                  text-white/60
                "
              >

                {
                  topLeader?.xp || 0
                } XP

              </p>

            </div>

          </div>

          <div
            className="
              scale-90
            "
          >

            {TCDIcons.rank}

          </div>

        </div>

      </div>

      {/* CTA */}

      <div
        className="
          relative
          z-10
        "
      >

        <div
          className="
            inline-flex
            items-center
            gap-2

            bg-tcd-gold

            text-tcd-blue

            px-4
            py-2

            rounded-2xl

            text-sm
            font-black

            shadow-md
          "
        >

          Open Leaderboard

          {TCDIcons.target}

        </div>

      </div>

    </Link>
<div
  className="
    relative

    flex
    items-center
    justify-center

    flex-1

    min-h-[320px]

    overflow-hidden
  "
>

  {/* AMBIENT GLOW */}

  <div
    className="
      absolute

      w-[420px]
      h-[420px]

      rounded-full

      bg-tcd-blue/[0.03]

      blur-3xl
    "
  />

  {/* WATERMARK LOGO */}

  <img
    src="/logo.png"
    alt="TCD"

    className="
      relative
      z-10

      w-[480px]
      h-[480px]

      object-contain

      opacity-[0.50]

      select-none
      pointer-events-none
    "
  />

</div>
  </div>

  {/* RIGHT STACK */}

  <div
    className="
      xl:col-span-7

      flex
      flex-col

      gap-3
    "
  >

    <WalletCard
      balance={
        wallet?.current_balance || 0
      }
      lifetime={
        wallet?.lifetime_earned || 0
      }
      lastEarned={
        lastEarned?.credits || 0
      }
    />

    <div
      className="
        grid
        md:grid-cols-2

        gap-3
      "
    >

      <DailyRewardCard
        rewardClaimed={
          rewardClaimed
        }
        onClaim={
          handleClaimReward
        }
      />

      <AchievementCard
        achievements={
          achievements
        }
      />

    </div>

  </div>

</div>

      {/* STREAK CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">

        <StudyStreakCard
          current={
            streak?.current_streak || 0
          }
          longest={
            streak?.longest_streak || 0
          }
          nextMilestone={
            nextMilestone
          }
          progressPercent={
            progressPercent
          }
        />

        <LoginStreakCard
          current={
            loginStreak?.current_streak || 0
          }
          longest={
            loginStreak?.longest_streak || 0
          }
        />

      </div>
{/* LIVE ACTIVITY */}

<ActivityFeed
  activities={activities}
  setActivities={
    setActivities
  }
/>
      {/* PERFORMANCE */}

      <StatsGrid
        stats={stats}
      />

      {/* LIVE EXAMS */}

      <LiveExamsSection
        liveExams={liveExams}
      />

      {/* HISTORY */}

      <ExamHistoryTable
        attempts={attempts}
        ranks={ranks}
        examTitles={examTitles}
      />

    </div>

  </main>
);
}
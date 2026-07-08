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
import WalletCard from "@/components/wallet/WalletCard";
import DailyRewardCard from "@/components/dashboard/DailyRewardCard";
import AchievementCard from "@/components/dashboard/AchievementCard";
import StudyStreakCard from "@/components/dashboard/StudyStreakCard";
import LoginStreakCard from "@/components/dashboard/LoginStreakCard";
import useInactivityLogout
from "@/hooks/useInactivityLogout";
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
import TCDLoader from "@/components/common/TCDLoader";
import {
  getExamStatus
} from "@/lib/getExamStatus";
import {
  demoDashboard,
  demoAchievements,
  demoActivities,
  demoAttempts,
} from "@/lib/demo/demoDashboard";
export default function DashboardPage() {
useInactivityLogout();
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
const [
  institutes,
  setInstitutes
] = useState<any[]>([]);
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
const [
  achievementScore,
  setAchievementScore
] = useState(0);

const [
  prestigeLevel,
  setPrestigeLevel
] = useState("Bronze");

const [
  achievementCount,
  setAchievementCount
] = useState(0);
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
const [userXP, setUserXP] = useState(0);
const [userLevel, setUserLevel] = useState(0);
const [
  rewardAmount,
  setRewardAmount
] = useState(0);
const league =
  getLeague(userXP ?? 0);

const leagueProgress =
  getLeagueProgress(
    userXP ?? 0
  );
  useEffect(() => {
  console.log("USER XP =", userXP);

const debugLeague =
  getLeague(userXP);

const debugProgress =
  getLeagueProgress(userXP);

console.log(
  "LEAGUE =",
  debugLeague
);

console.log(
  "PROGRESS =",
  debugProgress
);
}, [userXP]);
const levelTitle =
  getLevelTitle(
    userLevel
  );

  // LOGOUT

  async function handleLogout() {

    await supabase
      .auth
      .signOut();

    window.location.href = "/login";
    
  }

  // LOAD DASHBOARD

 

    async function loadDashboard() 
    { await updateExamStatuses();



   const {
  data: { user },
} = await supabase.auth.getUser();



const isDemo =
  !user &&
  localStorage.getItem(
    "tcd_demo"
  ) === "true";

if (!user && !isDemo) {

  router.push("/login");

  return;
}


if (isDemo) {

  setProfile({
    name: demoDashboard.user.name,
  });

  setWallet(
    demoDashboard.wallet
  );

  setUserLevel(
    demoDashboard.level
  );

  setUserXP(
    demoDashboard.xp
  );

  setStreak(
    demoDashboard.streak
  );

  setLoginStreak(
    demoDashboard.loginStreak
  );

  setAchievementCount(
    demoDashboard.achievements
  );

  setStats(
    demoDashboard.stats
  );

  setAchievementScore(185);

  setPrestigeLevel(
    demoDashboard.prestige
  );

  setTopLeader({
    name: "Aarav Sharma",
    xp: 12450,
  });

  setInstitutes([
    {
      institute_id: "demo",
      institutes: {
        name: "TCD Demo Institute",
        city: "Hyderabad",
      },
    },
  ]);

  setAchievements(
    demoAchievements
  );

  setActivities(
    demoActivities
  );

  setAttempts(
    demoAttempts
  );

  setExamTitles({
    "demo-exam": {
      title:
        "TCD Demo Practice Test",
    },
  });

  setRanks({
    "demo-exam": 124,
  });

 setLiveExams([
  {
    id: "demo-exam",

    title: "TCD Demo Practice Test",

    description:
      "Experience the complete TCD exam platform before creating your account.",

    duration: 30,

    reward_pool: 500,

    exam_scope: "PUBLIC",

    challenge_type: "DAILY",

    end_time:
      new Date(
        Date.now() + 86400000
      ).toISOString(),
  },
]);

  setLoading(false);

  return;
}

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

    .maybeSingle();

  walletData =
    newWallet;
}
if (walletData) {
  setWallet(walletData);
}
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
    const {
  data: activityData,
} = await supabase
  .from("activity_feed")
  .select("*")
  .order("created_at", {
    ascending: false,
  })
  .limit(100);

const uniqueActivities =
  (activityData || []).filter(
    (activity, index, self) =>
      index ===
      self.findIndex(
        (a) =>
          a.user_id === activity.user_id &&
          a.activity_type ===
            activity.activity_type
      )
  );

setActivities(
  uniqueActivities.slice(0, 10)
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
}

const {
  data: fetchedLevelData,
  error: levelError,
} = await supabase
  .from("user_levels")
  .select("xp, level")
  .eq("user_id", user.id)
  .maybeSingle();

let levelData = fetchedLevelData;

if (!levelData) {

  const {
    error: insertError,
  } = await supabase
    .from("user_levels")
    .insert({

      user_id: user.id,

      xp: 0,

      level: 0,

      updated_at: new Date().toISOString(),

    });

  console.log(
    "LEVEL INSERT ERROR:",
    insertError
  );

  levelData = {
    xp: 0,
    level: 0,
  };
}

setUserXP(
  Math.max(
    0,
    levelData.xp
  )
);

setUserLevel(
  levelData.level
);




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
  .from("user_achievements")
  .select(`
    *,
    achievements (
      title,
      description,
      rarity,
      reward_tcd
    )
  `)
  .eq("user_id", user.id);

setAchievements(
  achievementsData || []
);
setAchievementCount(
  achievementsData?.length || 0
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
      // FETCH PROFILE

    const {
  data: profileData,
} = await supabase
  .from("users")
  .select(`
    institute_id,
    role,
    name,
    achievement_score,
    prestige_level
  `)

        .eq(
          "email",
          user.email
        )
        
        .single();

      setProfile(
  profileData
);
const {
  data: memberships,
} = await supabase
  .from("user_institutes")
  .select(`
    institute_id,
    institutes (
      id,
      name,
      city
    )
  `)
  .eq(
    "user_id",
    user.id
  );

setInstitutes(
  memberships || []
);

const instituteIds =
  memberships?.map(
    (m) => m.institute_id
  ) || [];
setAchievementScore(
  profileData?.achievement_score || 0
);

setPrestigeLevel(
  profileData?.prestige_level || "Bronze"
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
    // CURRENT TIME

const now = new Date().toISOString();

// LIVE EXAMS

const {
  data: allLiveExams,
} = await supabase
  .from("exams")
  .select("*")
  .eq("published", true)
  .lte("start_time", now)
  .gte("end_time", now)
  .order("start_time", {
    ascending: true,
  });
console.log("NOW:", now);
console.log("ALL LIVE EXAMS:", allLiveExams);
const filteredLiveExams =
  (allLiveExams || []).filter(
    (exam) =>
      exam.exam_scope === "PUBLIC" ||
      instituteIds.includes(exam.institute_id)
  );
console.log("FILTERED LIVE EXAMS:", filteredLiveExams);
setLiveExams(filteredLiveExams);
console.log("SETTING LIVE EXAMS:", filteredLiveExams.length);
// UPCOMING EXAMS

const {
  data: allUpcomingExams,
} = await supabase
  .from("exams")
  .select("*")
  .eq("published", true)
  .gt("start_time", now)
  .order("start_time", {
    ascending: true,
  });

const filteredUpcomingExams =
  (allUpcomingExams || []).filter(
    (exam) =>
      exam.exam_scope === "PUBLIC" ||
      instituteIds.includes(exam.institute_id)
  );

setUpcomingExams(filteredUpcomingExams);

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
  return <TCDLoader />;
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
          bottom-[-40px]

          w-48
          h-48

          opacity-[0.08]
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

          <div className="w-5 h-5 flex-shrink-0">
  {TCDIcons.leaderboard}
</div>

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

{userXP === null
  ? "Loading..."
  : league.name}League

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

     {userXP === null
  ? "Loading..."
  : league.name}

    </span>

    <span>

     {userXP === null
  ? "..."
  : leagueProgress.nextLeague}

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

    {userXP === null
  ? "..."
  : leagueProgress.remaining}XP to {" "}
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
          
            className="text-white/70"

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

                
                  {topLeader?.name || "Student"}

                 

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

<div
  className="
    relative

    flex
    items-center
    justify-center

    min-h-[280px]

    overflow-hidden
  "
>

  <img
    src="/logo.png"
    alt="TCD"

    className="
      w-96
      h-96

      md:w-80
      md:h-80

      object-contain

      opacity-90

      select-none
      pointer-events-none
    "
  />

</div>

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
{/* PRESTIGE CARD */}


      
<div
  className="
    bg-white
    rounded-3xl
    p-6
    shadow-sm
    border
    border-gray-200
    mb-4
  "
>

  <div className="flex items-center gap-2 mb-5">

    <div className="w-6 h-6">
      {TCDIcons.mastery}
    </div>

    <h2 className="text-xl font-bold">
      Your TCD Journey
    </h2>

  </div>

  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

    {/* PRESTIGE */}

    <div>
      <p className="text-xs text-tcd-primary mb-1">
        Prestige
      </p>

      <div className="flex items-center gap-2">

        <div className="w-5 h-5">
          {TCDIcons.rank}
        </div>

        <p className="font-bold text-lg">
          {prestigeLevel}
        </p>

      </div>
    </div>

    {/* SCORE */}

    <div>
      <p className="text-xs text-tcd-primary mb-1">
        Achievement Score
      </p>

      <div className="flex items-center gap-2">

        <div className="w-5 h-5">
          {TCDIcons.achievement}
        </div>

        <p className="font-bold text-lg">
          {achievementScore}
        </p>

      </div>
    </div>

    {/* ACHIEVEMENTS */}

    <div>
      <p className="text-xs text-tcd-primary mb-1">
        Achievements
      </p>

      <div className="flex items-center gap-2">

        <div className="w-5 h-5">
          {TCDIcons.mastery}
        </div>

        <p className="font-bold text-lg">
          {achievementCount}
        </p>

      </div>
    </div>

    {/* STREAK */}

    <div>
      <p className="text-xs text-tcd-primary mb-1">
        Study Streak
      </p>

      <div className="flex items-center gap-2">

        <div className="w-5 h-5">
          {TCDIcons.fire}
        </div>

        <p className="font-bold text-lg">
          {streak?.current_streak || 0}
        </p>

      </div>
    </div>

    {/* TCD */}

    <div>
      <p className="text-xs text-tcd-primary mb-1">
        TCD Credits
      </p>

      <div className="flex items-center gap-2">

        <div className="w-5 h-5">
          {TCDIcons.coin}
        </div>

        <p className="font-bold text-lg">
          {wallet?.current_balance || 0}
        </p>

      </div>
    </div>

  </div>

</div>
  <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 mb-6">

  <div className="flex items-center gap-3 mb-5">

    <img
      src="/icons/banyan-tree.svg"
      alt="Institutes"
      className="w-10 h-10"
    />

    <h2 className="text-2xl font-black text-tcd-blue">
      My Institutes
    </h2>

  </div>

  <div className="space-y-3">

    {institutes.map(
      (membership: any) => (

        <div
          key={
            membership.institute_id
          }
          className="
            flex
            items-center
            justify-between
            bg-gray-50
            rounded-2xl
            px-4
            py-3
          "
        >

          <div>

            <p className="font-bold text-tcd-blue">

              {
                membership
                  ?.institutes
                  ?.name
              }

            </p>

            <p className="text-sm text-tcd-primary">

              {
                membership
                  ?.institutes
                  ?.city
              }

            </p>

          </div>

        </div>

      )
    )}

  </div>

</div>
{
  profile?.institute_id ===
  "da8cf1d6-9415-42f0-8336-c8586885cd6a" && (

    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-100
        shadow-lg
        p-6
        mb-4
      "
    >
      <div className="flex items-start gap-4">

        <img
          src="/icons/banyan-tree.svg"
          alt="Institute"
          className="w-14 h-14"
        />

        <div className="flex-1">

          <h3
            className="
              text-lg
              font-black
              text-tcd-blue
            "
          >
            Join Institute
          </h3>

          <p
            className="
              text-sm
              text-tcd-primary
              mt-2
            "
          >
            Unlock institute-specific
            mock tests, assessments
            and coaching exams.
          </p>

          <button
            onClick={() =>
              router.push(
                "/dashboard/join-institute"
              )
            }
            className="
              mt-4
              px-5
              py-2
              rounded-xl
              bg-gradient-to-r
              from-[#D4AF37]
              to-[#F2D27A]
              text-tcd-blue
              font-bold
              shadow-md
              hover:scale-[1.02]
              transition-all
            "
          >
            Join Now
          </button>

          <p
            className="
              text-xs
              text-tcd-muted
              mt-3
            "
          >
            Your XP, Prestige,
            Achievements and Rankings
            remain with your TCD profile.
          </p>

        </div>

      </div>
    </div>

  )
}
{/* LIVE EXAMS */}

<LiveExamsSection
  liveExams={liveExams}
/>

{/* PERFORMANCE */}

      <StatsGrid
        stats={stats}
      />
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

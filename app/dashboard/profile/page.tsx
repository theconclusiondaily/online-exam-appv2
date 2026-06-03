"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function ProfilePage() {

  const [profile, setProfile] =
    useState<any>(null);

  const [stats, setStats] =
    useState({
      exams: 0,
      highest: 0,
      accuracy: 0,
      lifetimeTcd: 0,
      currentStreak: 0,
      longestStreak: 0,
      achievements: 0,
    });
    const [achievements, setAchievements] =
  useState<any[]>([]);
const [bestRank, setBestRank] =
  useState<any>(null);

  const [certificates, setCertificates] =
  useState<any[]>([]);
  






  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

    const {
      data: authData,
    } =
      await supabase.auth.getUser();

    const user =
      authData.user;

    if (!user) return;

    // PROFILE

    const {
      data: profileData,
    } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(profileData);

    // EXAMS

    const {
      data: attempts,
    } = await supabase
      .from("exam_attempts")
      .select(`
        percentage,
        score
      `)
      .eq(
        "user_id",
        user.id
      );

    const exams =
      attempts?.length || 0;

    const highest =
      Math.max(
        ...(attempts?.map(
          (a) =>
            a.score || 0
        ) || [0])
      );

    const accuracy =
      exams > 0
        ? Math.round(
            (attempts || []).reduce(
              (
                sum,
                a
              ) =>
                sum +
                (
                  a.percentage ||
                  0
                ),
              0
            ) / exams
          )
        : 0;

    // WALLET

    const {
      data: wallet,
    } = await supabase
      .from("tcd_wallets")
      .select(`
        lifetime_earned
      `)
      .eq(
        "user_id",
        user.id
      )
      .single();

    // STREAK

    const {
      data: streak,
    } = await supabase
      .from("study_streaks")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .single();

      

    // ACHIEVEMENTS

   const { data: achievementsData } =
  await supabase
    .from("user_achievements")
    .select(`
      *,
      achievements(
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

// CERTIFICATES

const { data: certificatesData } =
  await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", user.id)
    .order(
      "issued_at",
      { ascending: false }
    );

setCertificates(
  certificatesData || []
);

// RANKING

const { data: rankData } =
  await supabase
    .from("leaderboard")
    .select(`
      score,
      percentile
    `)
    .eq("user_id", user.id)
    .order(
      "percentile",
      {
        ascending: false
      }
    )
    .limit(1)
    .single();

setBestRank(rankData);

setStats({
  exams,
  highest,
  accuracy,
  lifetimeTcd:
    wallet?.lifetime_earned || 0,

  currentStreak:
    streak?.current_streak || 0,

  longestStreak:
    streak?.longest_streak || 0,

  achievements:
    achievementsData?.length || 0,
});
  }

  return (
    <main className="min-h-screen bg-[#F8F9FB] p-6 md:p-5">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BACK BUTTON */}

        <div className="mb-4">

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

        <div
          className="
            bg-tcd-blue
            text-white

            rounded-2xl

            p-6

            shadow-xl

            border
            border-tcd-gold/20

            relative
            overflow-hidden

            mb-10
          "
        >

          <div className="absolute right-6 top-6 opacity-10">

            <img
              src="/logo.png"
              alt="TCD"
              className="w-36 h-36 object-contain"
            />

          </div>

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
            👤 Student Profile
          </div>

          <h1 className="text-3xl font-black mb-4">

            My Profile

          </h1>

          <p className="text-white/80 text-lg">

            Track your learning journey,
            achievements and growth.

          </p>

        </div>

        {/* PROFILE */}

        <div className="grid lg:grid-cols-3 gap-3 mb-10">

          {/* LEFT */}

          <div
            className="
              bg-white

              rounded-[28px]

              border
              border-gray-100

              p-5

              shadow-sm

              text-center
            "
          >

            <div
              className="
                w-28
                h-28

                rounded-full

                bg-tcd-gold

                text-tcd-blue

                flex
                items-center
                justify-center

                text-3xl
                font-black

                mx-auto

                mb-3
              "
            >
              {
  profile?.name
    ?.charAt(0)
    ?.toUpperCase() ||
  "S"
}
            </div>

            <h2 className="text-3xl font-black text-tcd-blue">

             {
  profile?.name ||
  "Student"
}

            </h2>

            <p className="text-gray-500 mt-2">

              Conclusion Daily Learner

            </p>

          </div>

          {/* RIGHT */}

          <div className="lg:col-span-2">

            <div
              className="
                bg-white

                rounded-[28px]

                border
                border-gray-100

                p-5

                shadow-sm
              "
            >

              <h2
                className="
                  text-2xl
                  font-black

                  text-tcd-blue

                  mb-3
                "
              >
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                <div>
                  <p className="text-gray-500">
                    Full Name
                  </p>
                  <p className="font-semibold">
                    {
  profile?.name ||
  "-"
}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Email
                  </p>
                  <p className="font-semibold">
                    {
  profile?.email ||
  "-"
}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Mobile
                  </p>
                  <p className="font-semibold">
                   {
  profile?.mobile ||
  "-"
}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Date of Birth
                  </p>
                  <p className="font-semibold">
                    {
  profile?.dob ||
  "-"
}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-3"><img
  src="/icons/learning-journey.svg"
  alt="Exams"
  className="w-10 h-10 mb-3"
/></div>
            <p className="text-gray-500">
              Exams Attempted
            </p>
            <h3 className="text-2xl font-black text-tcd-blue mt-3">
              {
  stats.exams
}
            </h3>
          </div>

          <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-3"><img
  src="/icons/precision-target.svg"
  alt="Accuracy"
  className="w-10 h-10 mb-3"
/></div>
            <p className="text-gray-500">
              Accuracy
            </p>
            <h3 className="text-2xl font-black text-tcd-gold mt-3">
             {stats.accuracy}%
            </h3>
          </div>

          <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-3"><img
  src="/icons/mastery-star.svg"
  alt="Highest Score"
  className="w-10 h-10 mb-3"
/></div>
            <p className="text-gray-500">
              Highest Score
            </p>
            <h3 className="text-2xl font-black text-green-600 mt-3">
              {
  stats.highest
}
            </h3>
          </div>

          <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-3"><img
  src="/icons/coin.svg"
  alt="TCD Credits"
  className="w-10 h-10 mb-3"
/></div>
            <p className="text-gray-500">
              Lifetime TCD
            </p>
            <h3 className="text-2xl font-black text-tcd-blue mt-3">
            {
  stats.lifetimeTcd
}
            </h3>
          </div>

        </div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">

  <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm">

    <div className="text-2xl mb-3">
      <img
  src="/icons/fire.svg"
  alt="Current Streak"
  className="w-10 h-10 mb-3"
/>
    </div>

    <p className="text-gray-500">
      Current Streak
    </p>

    <h3 className="text-2xl font-black text-orange-500 mt-3">
      {
        stats.currentStreak
      }
    </h3>

  </div>

  <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm">

    <div className="text-2xl mb-3">
      <img
  src="/icons/mount-kilimanjaro.svg"
  alt="Longest Streak"
  className="w-10 h-10 mb-3"
/>
    </div>

    <p className="text-gray-500">
      Longest Streak
    </p>

    <h3 className="text-2xl font-black text-tcd-blue mt-3">
      {
        stats.longestStreak
      }
    </h3>

  </div>

  <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm">

    <div className="text-2xl mb-3">
      <img
  src="/icons/achievement-medal.svg"
  alt="Achievements"
  className="w-10 h-10 mb-3"
/>
    </div>

    <p className="text-gray-500">
      Achievements
    </p>

    <h3 className="text-2xl font-black text-green-600 mt-3">
      {
        stats.achievements
      }
    </h3>

  </div>

</div>

  <div className="mt-10">

  <h2 className="text-2xl font-black text-tcd-blue mb-4">
    Achievements
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

    {achievements.map((item) => (

      <div
        key={item.id}
        className="
          bg-white
          rounded-[28px]
          border
          border-gray-100
          shadow-sm
          p-5
          hover:shadow-md
          transition-all
        "
      >

        <div className="flex items-center gap-3 mb-4">

          <img
            src="/icons/achievement-medal.svg"
            alt="Achievement"
            className="w-12 h-12"
          />

          <div>

            <h3 className="font-black text-lg text-tcd-blue">
              {item.achievements?.title}
            </h3>

            <span
              className="
                text-xs
                px-2
                py-1
                rounded-full
                bg-tcd-gold/10
                text-tcd-gold
              "
            >
              <div>
  <h4 className="font-bold">
    {item.achievements?.title || "Achievement"}
  </h4>

  <p className="text-xs text-gray-500">
    {item.achievements?.rarity || "Common"}
  </p>
</div>
            </span>

          </div>

        </div>

        <p className="text-gray-500 text-sm mb-4">
          {item.achievements?.description}
        </p>

        <div className="flex items-center gap-2">

          <img
            src="/icons/coin.svg"
            alt="TCD"
            className="w-5 h-5"
          />

          <span className="font-semibold">
            {item.achievements?.reward_tcd} TCD
          </span>

        </div>

      </div>

    ))}

  </div>

</div>

 
<div className="mt-8">

  <h2 className="text-2xl font-black text-tcd-blue mb-4">
    Ranking
  </h2>

  <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm max-w-sm">

    <img
      src="/icons/rank.svg"
      alt="Rank"
      className="w-10 h-10 mb-3"
    />

    <p className="text-gray-500">
      Best Rank
    </p>

    <h3 className="text-2xl font-black text-purple-600 mt-3">
      {bestRank}
    </h3>

  </div>

</div>
<div className="mt-10">

  <h2 className="text-2xl font-black text-tcd-blue mb-4">
    Certificates
  </h2>

  <div className="bg-white rounded-[28px] p-5">

    {certificates.length === 0 ? (
      <p>No certificates earned yet.</p>
    ) : (
      certificates.map((cert) => (
        <div
          key={cert.id}
          className="border-b py-3"
        >
          <div>
            {cert.certificate_type}
          </div>

          <div className="text-sm text-gray-500">
            {cert.certificate_number}
          </div>
        </div>
      ))
    )}

  </div>

</div>
      </div>
 
    </main>
  
  );
}
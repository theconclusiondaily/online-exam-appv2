"use client";

import { useState } from "react";
import Link from "next/link";
import TCDIcon from "@/components/brand/TCDIcon";

interface Props {
  liveExams: any[];
  upcomingExams: any[];
}

export default function LiveExamsSection({
  liveExams,
  upcomingExams,
}: Props) {
  const safeLiveExams = (liveExams ?? []).filter(Boolean);

  const [arenaFilter, setArenaFilter] = useState("ALL");

  const now = new Date();

  /*
   * ============================================================
   * NORMALIZE VALUES
   * ============================================================
   */

  const normalizeScope = (value?: string | null) =>
    (value || "").trim().toUpperCase();

  const normalizeChallengeType = (
    value?: string | null
  ) =>
    (value || "")
      .trim()
      .toUpperCase();

  /*
   * ============================================================
   * ARENA EXAMS
   * ============================================================
   */

  const arenaExams = safeLiveExams.filter(
    (exam) =>
      normalizeScope(exam.exam_scope) === "PUBLIC"
  );

  /*
   * Daily includes:
   * - empty challenge_type
   * - NONE
   * - DAILY
   */

  const dailyChallenges = arenaExams.filter(
    (exam) => {
      const type = normalizeChallengeType(
        exam.challenge_type
      );

      return (
        type === "" ||
        type === "NONE" ||
        type === "DAILY"
      );
    }
  );

  const weeklyChallenges = arenaExams.filter(
    (exam) =>
      normalizeChallengeType(
        exam.challenge_type
      ) === "WEEKLY"
  );

  const monthlyChallenges = arenaExams.filter(
    (exam) =>
      normalizeChallengeType(
        exam.challenge_type
      ) === "MONTHLY"
  );

  const currentAffairsChallenges =
    arenaExams.filter(
      (exam) =>
        normalizeChallengeType(
          exam.challenge_type
        ) === "CURRENT_AFFAIRS"
    );

  const scholarshipChallenges =
    arenaExams.filter(
      (exam) =>
        normalizeChallengeType(
          exam.challenge_type
        ) === "SCHOLARSHIP"
    );

  /*
   * Catch PUBLIC exams with a future/unrecognized
   * challenge type so they never disappear.
   */

  const otherArenaChallenges =
    arenaExams.filter((exam) => {
      const type = normalizeChallengeType(
        exam.challenge_type
      );

      return (
        type !== "" &&
        type !== "NONE" &&
        type !== "DAILY" &&
        type !== "WEEKLY" &&
        type !== "MONTHLY" &&
        type !== "CURRENT_AFFAIRS" &&
        type !== "SCHOLARSHIP"
      );
    });

  /*
   * ============================================================
   * INSTITUTE EXAMS
   * ============================================================
   */

  const instituteExams = safeLiveExams.filter(
    (exam) =>
      normalizeScope(exam.exam_scope) ===
      "INSTITUTE"
  );

  /*
   * ============================================================
   * OVERALL COUNTERS
   * ============================================================
   */

  const activeExams = safeLiveExams.filter(
    (exam) =>
      (!exam.start_time ||
        new Date(exam.start_time) <= now) &&
      (!exam.end_time ||
        new Date(exam.end_time) >= now)
  );

  const completedExams = safeLiveExams.filter(
    (exam) =>
      exam.end_time &&
      new Date(exam.end_time) < now
  );

  /*
   * ============================================================
   * HELPERS
   * ============================================================
   */

  const getQuestionCount = (exam: any) =>
    exam.total_questions ??
    exam.exam_questions?.length ??
    0;

  const formatReward = (rewardPool: number) =>
    `₹ ${((rewardPool || 0) / 100).toLocaleString(
      "en-IN"
    )}`;

  const getChallengeLabel = (exam: any) => {
    const type = normalizeChallengeType(
      exam.challenge_type
    );

    switch (type) {
      case "WEEKLY":
        return "WEEKLY CHALLENGE";

      case "MONTHLY":
        return "MONTHLY CHALLENGE";

      case "CURRENT_AFFAIRS":
        return "CURRENT AFFAIRS";

      case "SCHOLARSHIP":
        return "SCHOLARSHIP CHALLENGE";

      case "DAILY":
      case "":
      case "NONE":
        return "DAILY CHALLENGE";

      default:
        return "TCD CHALLENGE";
    }
  };

  const getChallengeIcon = (exam: any) => {
    const type = normalizeChallengeType(
      exam.challenge_type
    );

    switch (type) {
      case "WEEKLY":
        return "/icons/mastery-star.svg";

      case "MONTHLY":
        return "/icons/achievement-medal.svg";

      case "CURRENT_AFFAIRS":
        return "/icons/learning-journey.svg";

      case "SCHOLARSHIP":
        return "/icons/rank.svg";

      default:
        return "/icons/precision-target.svg";
    }
  };

  /*
   * ============================================================
   * ARENA CARD
   * ============================================================
   */

  const ArenaCard = ({
    exam,
  }: {
    exam: any;
  }) => {
    const isLive =
      !exam.start_time ||
      new Date(exam.start_time) <= now;

    const questionCount =
      getQuestionCount(exam);

    return (
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-indigo-100
          bg-white
          shadow-[0_10px_35px_rgba(30,64,175,0.10)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-indigo-200
          hover:shadow-[0_18px_45px_rgba(30,64,175,0.18)]
        "
      >
        {/* ==================================================
            CARD TOP ACCENT
            ================================================== */}

        <div
          className="
            h-1.5
            w-full
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-purple-600
          "
        />

        <div className="p-5">
          {/* ==================================================
              TOP BADGES
              ================================================== */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-3
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-indigo-50
                px-3
                py-1.5
                text-[10px]
                font-black
                tracking-wide
                text-indigo-700
              "
            >
              <TCDIcon
                src={getChallengeIcon(exam)}
                alt=""
                size={15}
              />

              {getChallengeLabel(exam)}
            </span>

            <span
              className="
                inline-flex
                shrink-0
                items-center
                gap-1.5
                rounded-full
                bg-emerald-50
                px-3
                py-1.5
                text-[10px]
                font-black
                text-emerald-700
              "
            >
              <span
                className="
                  h-2
                  w-2
                  animate-pulse
                  rounded-full
                  bg-emerald-500
                "
              />

              {isLive
                ? "LIVE NOW"
                : "UPCOMING"}
            </span>
          </div>

          {/* ==================================================
              TITLE + ICON
              ================================================== */}

          <div
            className="
              mt-5
              flex
              items-start
              justify-between
              gap-4
            "
          >
            <div className="min-w-0">
              <h3
                className="
                  text-xl
                  font-black
                  leading-tight
                  text-slate-900
                  transition-colors
                  group-hover:text-indigo-700
                "
              >
                {exam?.title ??
                  "Untitled Challenge"}
              </h3>

              <p
                className="
                  mt-2
                  line-clamp-2
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                {exam.description ||
                  "Compete with learners across TCD and prove your skills."}
              </p>
            </div>

            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-indigo-50
                ring-1
                ring-indigo-100
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <TCDIcon
                src={getChallengeIcon(exam)}
                alt=""
                size={32}
              />
            </div>
          </div>

          {/* ==================================================
              REWARD POOL
              ================================================== */}

          <div
            className="
              mt-5
              rounded-2xl
              bg-gradient-to-r
              from-slate-50
              via-indigo-50
              to-purple-50
              p-4
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Reward Pool
                </p>

                <p
                  className="
                    mt-1
                    text-lg
                    font-black
                    text-indigo-700
                  "
                >
                  {formatReward(
                    exam.reward_pool
                  )}
                </p>
              </div>

              <div className="text-right">
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Competition
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    font-black
                    text-slate-700
                  "
                >
                  TCD Global
                </p>
              </div>
            </div>
          </div>

          {/* ==================================================
              EXAM STATS
              ================================================== */}

          <div
            className="
              mt-4
              grid
              grid-cols-3
              gap-2
            "
          >
            <div
              className="
                rounded-xl
                bg-slate-50
                p-3
              "
            >
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Questions
              </p>

              <p
                className="
                  mt-1
                  font-black
                  text-slate-800
                "
              >
                {questionCount}
              </p>
            </div>

            <div
              className="
                rounded-xl
                bg-slate-50
                p-3
              "
            >
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Duration
              </p>

              <p
                className="
                  mt-1
                  font-black
                  text-slate-800
                "
              >
                {exam.duration || 0}m
              </p>
            </div>

            <div
              className="
                rounded-xl
                bg-slate-50
                p-3
              "
            >
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Status
              </p>

              <p
                className="
                  mt-1
                  font-black
                  text-emerald-600
                "
              >
                {isLive
                  ? "LIVE"
                  : "SOON"}
              </p>
            </div>
          </div>

          {/* ==================================================
              CTA
              ================================================== */}

          <Link
            href={
              exam.id === "demo-exam"
                ? "/demo-exam"
                : `/exam/${exam.id}/intro`
            }
            className="
              mt-5
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-purple-600
              px-5
              py-3.5
              text-sm
              font-black
              text-white
              shadow-lg
              shadow-indigo-200
              transition-all
              duration-300
              hover:shadow-xl
              hover:shadow-indigo-300
              active:scale-[0.98]
            "
          >
            Take Challenge

            <span className="text-lg">
              →
            </span>
          </Link>
        </div>
      </div>
    );
  };

  /*
   * ============================================================
   * ARENA CATEGORY
   * ============================================================
   */

  const renderArenaCategory = (
    title: string,
    subtitle: string,
    icon: string,
    exams: any[]
  ) => {
    if (exams.length === 0) {
      return null;
    }

    return (
      <div className="mt-8">
        {/* Category heading */}

        <div
          className="
            mb-4
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-white
              shadow-sm
              ring-1
              ring-indigo-100
            "
          >
            <TCDIcon
              src={icon}
              alt=""
              size={25}
            />
          </div>

          <div>
            <h3
              className="
                text-xl
                font-black
                text-slate-900
              "
            >
              {title}
            </h3>

            <p
              className="
                text-xs
                font-medium
                text-slate-500
              "
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Cards */}

        <div
          className="
            grid
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {exams.map((exam) => (
            <ArenaCard
              key={exam.id}
              exam={exam}
            />
          ))}
        </div>
      </div>
    );
  };

  /*
   * ============================================================
   * ARENA FILTER BUTTONS
   * ============================================================
   */

  const arenaFilters = [
    {
      value: "ALL",
      label: "All Challenges",
      icon: "/icons/achievement-medal.svg",
    },
    {
      value: "DAILY",
      label: "Daily",
      icon: "/icons/precision-target.svg",
    },
    {
      value: "WEEKLY",
      label: "Weekly",
      icon: "/icons/mastery-star.svg",
    },
    {
      value: "MONTHLY",
      label: "Monthly",
      icon: "/icons/achievement-medal.svg",
    },
    {
      value: "CURRENT_AFFAIRS",
      label: "Current Affairs",
      icon: "/icons/learning-journey.svg",
    },
    {
      value: "SCHOLARSHIP",
      label: "Scholarship",
      icon: "/icons/rank.svg",
    },
  ];

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div className="mb-8">
      {/* ======================================================
          ARENA HERO
          ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          bg-gradient-to-br
          from-[#071A49]
          via-[#123B8F]
          to-[#4C1D95]
          text-white
          shadow-[0_20px_60px_rgba(37,67,160,0.22)]
        "
      >
        {/* Background decoration */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-purple-400/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            left-1/3
            h-72
            w-72
            rounded-full
            bg-blue-400/20
            blur-3xl
          "
        />

        {/* Hero content */}

        <div
          className="
            relative
            p-6
            md:p-8
          "
        >
          <div
            className="
              flex
              flex-col
              gap-8
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* Left */}

            <div className="max-w-2xl">
              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/10
                    ring-1
                    ring-white/20
                    backdrop-blur
                  "
                >
                  <TCDIcon
                    src="/icons/achievement-medal.svg"
                    alt="TCD Arena"
                    size={40}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.25em]
                      text-blue-200
                    "
                  >
                    The Conclusion Daily
                  </p>

                  <h2
                    className="
                      mt-1
                      text-3xl
                      font-black
                      tracking-tight
                      md:text-4xl
                    "
                  >
                    TCD ARENA
                  </h2>
                </div>
              </div>

              <h3
                className="
                  mt-6
                  text-2xl
                  font-black
                  md:text-3xl
                "
              >
                Compete. Improve. Be the Best.
              </h3>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-6
                  text-blue-100
                  md:text-base
                "
              >
                Join live challenges with learners
                across TCD. Test your skills, climb
                the leaderboard, and compete for
                rewards.
              </p>
            </div>

            {/* Right benefits */}

            <div
              className="
                grid
                grid-cols-2
                gap-3
                lg:w-[380px]
              "
            >
              {/* Global Competition */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/10
                  p-4
                  backdrop-blur
                "
              >
                <TCDIcon
                  src="/icons/mastery-star.svg"
                  alt="Global competition"
                  size={28}
                />

                <p
                  className="
                    mt-3
                    text-sm
                    font-black
                  "
                >
                  Global
                </p>

                <p
                  className="
                    text-xs
                    text-blue-200
                  "
                >
                  Competition
                </p>
              </div>

              {/* Leaderboard */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/10
                  p-4
                  backdrop-blur
                "
              >
                <TCDIcon
                  src="/icons/rank.svg"
                  alt="Leaderboard"
                  size={28}
                />

                <p
                  className="
                    mt-3
                    text-sm
                    font-black
                  "
                >
                  Live
                </p>

                <p
                  className="
                    text-xs
                    text-blue-200
                  "
                >
                  Leaderboard
                </p>
              </div>

              {/* Rewards */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/10
                  p-4
                  backdrop-blur
                "
              >
                <TCDIcon
                  src="/icons/achievement-medal.svg"
                  alt="Rewards"
                  size={28}
                />

                <p
                  className="
                    mt-3
                    text-sm
                    font-black
                  "
                >
                  Exciting
                </p>

                <p
                  className="
                    text-xs
                    text-blue-200
                  "
                >
                  Rewards
                </p>
              </div>

              {/* Mastery */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/10
                  p-4
                  backdrop-blur
                "
              >
                <TCDIcon
                  src="/icons/precision-target.svg"
                  alt="Build your rank"
                  size={28}
                />

                <p
                  className="
                    mt-3
                    text-sm
                    font-black
                  "
                >
                  Build
                </p>

                <p
                  className="
                    text-xs
                    text-blue-200
                  "
                >
                  Your Rank
                </p>
              </div>
            </div>
          </div>

          {/* ==================================================
              ARENA FILTERS
              ================================================== */}

          <div
            className="
              relative
              mt-8
              flex
              gap-2
              overflow-x-auto
              pb-1
            "
          >
            {arenaFilters.map(
              (filter) => {
                const active =
                  arenaFilter ===
                  filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() =>
                      setArenaFilter(
                        filter.value
                      )
                    }
                    className={`
                      flex
                      shrink-0
                      items-center
                      gap-2
                      rounded-full
                      px-4
                      py-2.5
                      text-sm
                      font-bold
                      transition-all
                      duration-200
                      ${
                        active
                          ? "bg-white text-indigo-700 shadow-lg"
                          : "bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/20"
                      }
                    `}
                  >
                    <TCDIcon
                      src={filter.icon}
                      alt=""
                      size={17}
                    />

                    {filter.label}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          ARENA CHALLENGES
          ====================================================== */}

      {arenaExams.length > 0 ? (
        <section
          className="
            rounded-b-[2rem]
            border-x
            border-b
            border-indigo-100
            bg-gradient-to-b
            from-indigo-50/60
            to-white
            px-5
            pb-8
            pt-2
            md:px-8
          "
        >
          {/* ALL */}

          {arenaFilter === "ALL" && (
            <>
              {renderArenaCategory(
                "Daily Challenges",
                "Quick challenges to keep your skills sharp.",
                "/icons/precision-target.svg",
                dailyChallenges
              )}

              {renderArenaCategory(
                "Weekly Challenges",
                "Compete harder and climb the weekly rankings.",
                "/icons/mastery-star.svg",
                weeklyChallenges
              )}

              {renderArenaCategory(
                "Monthly Challenges",
                "Longer competitions for serious aspirants.",
                "/icons/achievement-medal.svg",
                monthlyChallenges
              )}

              {renderArenaCategory(
                "Current Affairs",
                "Stay updated and prove your awareness.",
                "/icons/learning-journey.svg",
                currentAffairsChallenges
              )}

              {renderArenaCategory(
                "Scholarship Challenges",
                "Compete for exclusive scholarship opportunities.",
                "/icons/rank.svg",
                scholarshipChallenges
              )}

              {renderArenaCategory(
                "Other TCD Challenges",
                "More public competitions from TCD.",
                "/icons/mastery-star.svg",
                otherArenaChallenges
              )}
            </>
          )}

          {/* DAILY */}

          {arenaFilter === "DAILY" &&
            renderArenaCategory(
              "Daily Challenges",
              "Quick challenges to keep your skills sharp.",
              "/icons/precision-target.svg",
              dailyChallenges
            )}

          {/* WEEKLY */}

          {arenaFilter === "WEEKLY" &&
            renderArenaCategory(
              "Weekly Challenges",
              "Compete harder and climb the weekly rankings.",
              "/icons/mastery-star.svg",
              weeklyChallenges
            )}

          {/* MONTHLY */}

          {arenaFilter === "MONTHLY" &&
            renderArenaCategory(
              "Monthly Challenges",
              "Longer competitions for serious aspirants.",
              "/icons/achievement-medal.svg",
              monthlyChallenges
            )}

          {/* CURRENT AFFAIRS */}

          {arenaFilter ===
            "CURRENT_AFFAIRS" &&
            renderArenaCategory(
              "Current Affairs",
              "Stay updated and prove your awareness.",
              "/icons/learning-journey.svg",
              currentAffairsChallenges
            )}

          {/* SCHOLARSHIP */}

          {arenaFilter ===
            "SCHOLARSHIP" &&
            renderArenaCategory(
              "Scholarship Challenges",
              "Compete for exclusive scholarship opportunities.",
              "/icons/rank.svg",
              scholarshipChallenges
            )}

          {/* Filter has no results */}

          {arenaFilter !== "ALL" &&
            (
              arenaFilter === "DAILY"
                ? dailyChallenges
                : arenaFilter === "WEEKLY"
                ? weeklyChallenges
                : arenaFilter === "MONTHLY"
                ? monthlyChallenges
                : arenaFilter ===
                  "CURRENT_AFFAIRS"
                ? currentAffairsChallenges
                : scholarshipChallenges
            ).length === 0 && (
              <div
                className="
                  mt-6
                  rounded-3xl
                  border
                  border-dashed
                  border-indigo-200
                  bg-white
                  p-10
                  text-center
                "
              >
                <div className="flex justify-center">
                  <TCDIcon
                    src="/icons/learning-journey.svg"
                    alt="No challenges"
                    size={56}
                  />
                </div>

                <h3
                  className="
                    mt-4
                    text-xl
                    font-black
                    text-slate-900
                  "
                >
                  No Challenges Available
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                  "
                >
                  New challenges will appear
                  here when they go live.
                </p>
              </div>
            )}
        </section>
      ) : (
        /* ====================================================
           NO ARENA CHALLENGES
           ==================================================== */

        <section
          className="
            rounded-b-[2rem]
            border-x
            border-b
            border-indigo-100
            bg-indigo-50/40
            p-10
            text-center
          "
        >
          <div className="flex justify-center">
            <TCDIcon
              src="/icons/learning-journey.svg"
              alt="No active challenges"
              size={64}
            />
          </div>

          <h3
            className="
              mt-4
              text-xl
              font-black
              text-slate-900
            "
          >
            No Active Arena Challenges
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            New TCD Arena challenges will
            appear here when they go live.
          </p>
        </section>
      )}

      {/* ======================================================
          INSTITUTE LIVE EXAMS
          ====================================================== */}

      {instituteExams.length > 0 && (
        <section className="mt-10">
          <div
            className="
              rounded-[2rem]
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              md:p-8
            "
          >
            {/* Institute header */}

            <div
              className="
                flex
                flex-col
                gap-5
                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-amber-50
                    ring-1
                    ring-amber-100
                  "
                >
                  <TCDIcon
                    src="/icons/banyan-tree.svg"
                    alt="Institute"
                    size={32}
                  />
                </div>

                <div>
                  <h2
                    className="
                      text-2xl
                      font-black
                      text-slate-900
                    "
                  >
                    Institute Live Exams
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    Exams conducted through
                    your institute membership.
                  </p>
                </div>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-slate-50
                  px-5
                  py-3
                  text-sm
                  text-slate-600
                "
              >
                <span
                  className="
                    font-black
                    text-slate-900
                  "
                >
                  {instituteExams.length}
                </span>{" "}
                active institute exam
                {instituteExams.length !== 1
                  ? "s"
                  : ""}
              </div>
            </div>

            {/* Institute cards */}

            <div
              className="
                mt-7
                grid
                gap-5
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {instituteExams.map(
                (exam) => {
                  const isLive =
                    !exam.start_time ||
                    new Date(
                      exam.start_time
                    ) <= now;

                  const questionCount =
                    getQuestionCount(exam);

                  return (
                    <div
                      key={exam.id}
                      className="
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-5
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-lg
                      "
                    >
                      {/* Badges */}

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-2
                        "
                      >
                        <span
                          className={`
                            rounded-full
                            px-3
                            py-1.5
                            text-[10px]
                            font-black
                            ${
                              isLive
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }
                          `}
                        >
                          {isLive
                            ? "LIVE NOW"
                            : "UPCOMING"}
                        </span>

                        <span
                          className="
                            flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-amber-50
                            px-3
                            py-1.5
                            text-[10px]
                            font-black
                            text-slate-700
                          "
                        >
                          <TCDIcon
                            src="/icons/banyan-tree.svg"
                            alt=""
                            size={14}
                          />

                          INSTITUTE
                        </span>
                      </div>

                      {/* Title */}

                      <h3
                        className="
                          mt-5
                          text-xl
                          font-black
                          leading-tight
                          text-slate-900
                        "
                      >
                        {exam?.title ??
                          "Untitled Exam"}
                      </h3>

                      {/* Description */}

                      <p
                        className="
                          mt-2
                          line-clamp-2
                          text-sm
                          leading-6
                          text-slate-500
                        "
                      >
                        {exam.description ||
                          "Complete your institute examination."}
                      </p>

                      {/* Stats */}

                      <div
                        className="
                          mt-5
                          grid
                          grid-cols-2
                          gap-3
                        "
                      >
                        <div
                          className="
                            rounded-xl
                            bg-slate-50
                            p-3
                          "
                        >
                          <p
                            className="
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-wide
                              text-slate-400
                            "
                          >
                            Questions
                          </p>

                          <p
                            className="
                              mt-1
                              font-black
                              text-slate-800
                            "
                          >
                            {questionCount}
                          </p>
                        </div>

                        <div
                          className="
                            rounded-xl
                            bg-slate-50
                            p-3
                          "
                        >
                          <p
                            className="
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-wide
                              text-slate-400
                            "
                          >
                            Duration
                          </p>

                          <p
                            className="
                              mt-1
                              font-black
                              text-slate-800
                            "
                          >
                            {exam.duration ||
                              0}{" "}
                            mins
                          </p>
                        </div>
                      </div>

                      {/* CTA */}

                      <Link
                        href={
                          exam.id ===
                          "demo-exam"
                            ? "/demo-exam"
                            : `/exam/${exam.id}/intro`
                        }
                        className="
                          mt-5
                          block
                          w-full
                          rounded-2xl
                          bg-slate-900
                          px-5
                          py-3.5
                          text-center
                          text-sm
                          font-black
                          text-white
                          transition-all
                          hover:bg-slate-700
                          active:scale-[0.98]
                        "
                      >
                        Start Exam →
                      </Link>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          NOTE:
          upcomingExams is intentionally preserved in the
          component API because the dashboard already supplies
          it and the Arena counters use it.
          ====================================================== */}
    </div>
  );
}
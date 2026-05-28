"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { supabase }
from "@/lib/supabase/client";

import LiveExamsSection
from "@/components/dashboard/LiveExamsSection";

import { TCDIcons }
from "@/components/ui/tcd-icons";

import {
  getExamStatus
} from "@/lib/getExamStatus";
export default function ActiveOpportunitiesPage() {

  const [loading,
    setLoading] =
    useState(true);

  const [liveExams,
    setLiveExams] =
    useState<any[]>([]);

  useEffect(() => {

    loadExams();

  }, []);

  async function loadExams() {

    try {

      const now =
        new Date()
          .toISOString();

      const {
        data,
        error,
      } = await supabase

        .from("exams")

        .select(`
          *
        `)

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

      if (error) {

        console.error(
          error
        );

        return;
      }

      setLiveExams(
        data || []
      );

    } catch (error) {

      console.error(
        error
      );

    } finally {

      setLoading(false);

    }
  }

  if (loading) {

    return (

      <div
        className="
          min-h-screen

          flex
          items-center
          justify-center

          bg-[#F7F9FC]
        "
      >

        <div
          className="
            bg-white/90
            backdrop-blur-xl

            px-10
            py-6

            rounded-2xl

            border
            border-tcd-gold/10

            shadow-xl

            flex
            items-center
            gap-2
          "
        >

          <div className="animate-pulse">

            {TCDIcons.mastery}

          </div>

          <div>

            <h2
              className="
                text-2xl
                font-black
                text-tcd-blue
              "
            >

              Loading Opportunities

            </h2>

            <p className="text-gray-500">

              Preparing live exams...

            </p>

          </div>

        </div>

      </div>
    );
  }

  return (

    <main
      className="
        min-h-screen

        bg-[#F7F9FC]

        p-6
        md:p-5
      "
    >

      <div className="max-w-7xl mx-auto">

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
              hover:-translate-y-1

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

          {/* WATERMARK */}

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

          {/* BADGE */}

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

              {TCDIcons.journey}

            </div>

            Active Competitive Arena

          </div>

          {/* TITLE */}

          <h1
            className="
              text-4xl
              font-black

              mb-2
            "
          >

            Active Opportunities

          </h1>

          <p
            className="
              text-white/80
              text-xl

              max-w-3xl
            "
          >

            Discover live and
            upcoming competitive
            exams, unlock mastery
            milestones and grow
            your TCD journey.

          </p>

          {/* STATS */}

          <div
            className="
              grid
              md:grid-cols-3

              gap-3

              mt-5
            "
          >

            {/* LIVE */}

            <div
              className="
                bg-white/10
                backdrop-blur-md

                rounded-3xl

                p-6
              "
            >

              <div className="mb-4">

                {TCDIcons.mastery}

              </div>

              <p className="text-white/70">

                Live Opportunities

              </p>

              <h2
                className="
                  text-3xl
                  font-black

                  mt-3
                "
              >

                {liveExams.length}

              </h2>

            </div>

            {/* ACTIVE */}

            <div
              className="
                bg-white/10
                backdrop-blur-md

                rounded-3xl

                p-6
              "
            >

              <div className="mb-4">

                {TCDIcons.target}

              </div>

              <p className="text-white/70">

                Competitive Growth

              </p>

              <h2
                className="
                  text-3xl
                  font-black

                  mt-3
                "
              >

                Active

              </h2>

            </div>

            {/* TCD */}

            <div
              className="
                bg-white/10
                backdrop-blur-md

                rounded-3xl

                p-6
              "
            >

              <div className="mb-4">

                {TCDIcons.wallet}

              </div>

              <p className="text-white/70">

                Reward Ecosystem

              </p>

              <h2
                className="
                  text-3xl
                  font-black

                  mt-3
                "
              >

                TCD

              </h2>

            </div>

          </div>

        </div>

        {/* LIVE EXAMS */}

        <div
          className="
            bg-white/90
            backdrop-blur-xl

            rounded-[30px]

            border
            border-tcd-gold/10

            shadow-xl

            p-5
          "
        >

          <div className="mb-4">

            <div
              className="
                inline-flex
                items-center
                gap-3

                px-4
                py-3

                rounded-full

                bg-tcd-gold/10

                text-tcd-gold

                border
                border-tcd-gold/20

                mb-2
              "
            >

              <div className="w-5 h-5">

                {TCDIcons.achievement}

              </div>

              Live Exam Opportunities

            </div>

            <h2
              className="
                text-4xl
                font-black

                text-tcd-blue

                mb-3
              "
            >

              Competitive Arena

            </h2>

            <p className="text-gray-500 text-lg">

              Participate in live
              exams, challenge
              rankings and unlock
              achievement rewards.

            </p>

          </div>

          <LiveExamsSection
            liveExams={liveExams}
          />

        </div>

      </div>

    </main>
  );
}
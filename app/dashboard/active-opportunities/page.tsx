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
import TCDLoader from "@/components/common/TCDLoader";
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

    // GET LOGGED IN USER

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      setLiveExams([]);
      return;
    }

    // GET USER PROFILE

    const {
      data: profile,
      error: profileError,
    } = await supabase

      .from("users")

      .select("institute_id")

      .eq("id", user.id)

      .single();

    console.log(
      "PROFILE ERROR:",
      profileError
    );

    console.log(
      "PROFILE:",
      profile
    );

    // BLOCK USERS WITHOUT INSTITUTE

    if (!profile?.institute_id) {

      console.log(
        "NO INSTITUTE ASSIGNED"
      );

      setLiveExams([]);
      return;
    }

    // FETCH ONLY SAME INSTITUTE EXAMS

    const {
      data,
      error,
    } = await supabase

      .from("exams")

      .select(`
        *
      `)

      .eq(
        "published",
        true
      )

      .eq(
        "institute_id",
        profile.institute_id
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
  return <TCDLoader text="Loading Opportunities" />;
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
              text-2xl
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

              <p className="text-tcd-primary">

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

              <p className="text-tcd-primary">

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

              <p className="text-tcd-primary">

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
                text-2xl
                font-black

                text-tcd-blue

                mb-3
              "
            >

              Competitive Arena

            </h2>

            <p className="text-tcd-primary text-lg">

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
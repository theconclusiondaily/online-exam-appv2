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
import TCDLoader from "@/components/common/TCDLoader";
export default function TCDWalletPage() {

  const [wallet,
    setWallet] =
    useState<any>(null);

  const [
    transactions,
    setTransactions,
  ] = useState<any[]>([]);

  const [
    achievements,
    setAchievements,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    const {
      data: authData,
    } =
      await supabase.auth.getUser();

    const user =
      authData.user;

    if (!user) {

      setLoading(false);

      return;
    }

    const {
      data: walletData,
    } = await supabase

      .from("tcd_wallets")

      .select("*")

      .eq(
        "user_id",
        user.id
      )

      .single();

    const {
      data: transactionData,
    } = await supabase

      .from(
        "tcd_transactions"
      )

      .select("*")

      .eq(
        "user_id",
        user.id
      )

      .order(
        "created_at",
        {
          ascending:
            false,
        }
      )

      .limit(50);

    const {
      data: achievementData,
    } = await supabase

      .from(
        "user_achievements"
      )

      .select(`
        unlocked_at,
        achievements (
          title,
          reward_tcd
        )
      `)

      .eq(
        "user_id",
        user.id
      )

      .order(
        "unlocked_at",
        {
          ascending:
            false,
        }
      )

      .limit(10);

    setWallet(walletData);

    setTransactions(
      transactionData || []
    );

    setAchievements(
      achievementData || []
    );

    setLoading(false);
  }

  if (loading) {
  return <TCDLoader text="Loading Wallet" />;
}

  return (

    <main
      className="
        min-h-screen

        bg-[#F7F9FC]

        p-4
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
              gap-2

              bg-white

              px-4
              py-2

              rounded-2xl

              shadow-sm

              border
              border-gray-100

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
            relative
            overflow-hidden

            rounded-[30px]

            bg-gradient-to-br
            from-tcd-blue
            via-[#35548C]
            to-[#203B63]

            p-5

            text-white

            shadow-xl

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

              w-64
              h-64

              opacity-[0.05]
            "
          />

          <div className="relative z-10">

            <div
              className="
                inline-flex
                items-center
                gap-2

                px-4
                py-2

                rounded-full

                bg-white/10

                border
                border-white/10

                text-tcd-gold

                text-sm

                mb-3
              "
            >

              {TCDIcons.coin}

              TCD Credits Ecosystem

            </div>

            <h1
              className="
                text-2xl
                font-black

                mb-2
              "
            >

              TCD Vault

            </h1>

            <p
              className="
                text-gray-700

                max-w-2xl
              "
            >

              Your personal knowledge economy.
              Earn rewards through consistency,
              achievements and performance.

            </p>

          </div>

        </div>

        {/* TOP STATS */}

        <div
          className="
            grid
            md:grid-cols-3

            gap-3

            mb-4
          "
        >

          {/* BALANCE */}

          <div
            className="
              bg-white

              rounded-[28px]

              border
              border-gray-100

              p-4

              shadow-sm

              hover:shadow-lg

              transition-all
            "
          >

            <div
              className="
                flex
                items-center

                gap-3

                mb-3
              "
            >

              <div
                className="
                  w-14
                  h-14

                  rounded-2xl

                  bg-tcd-gold/10

                  flex
                  items-center
                  justify-center
                "
              >

                {TCDIcons.coin}

              </div>

              <div>

                <h3
                  className="
                    text-2xl
                    font-black

                    text-tcd-blue
                  "
                >

                  {
                    wallet?.current_balance || 0
                  }

                </h3>

                <p className="text-gray-700 text-sm">

                  Current Balance

                </p>

              </div>

            </div>

            <div
              className="
                bg-[#F7F9FC]

                rounded-2xl

                px-4
                py-3

                text-sm
                text-gray-600
              "
            >

              Available TCD Credits

            </div>

          </div>

          {/* LIFETIME */}

          <div
            className="
              bg-white

              rounded-[28px]

              border
              border-gray-100

              p-4

              shadow-sm

              hover:shadow-lg

              transition-all
            "
          >

            <div
              className="
                flex
                items-center

                gap-3

                mb-3
              "
            >

              <div
                className="
                  w-14
                  h-14

                  rounded-2xl

                  bg-tcd-gold/10

                  flex
                  items-center
                  justify-center
                "
              >

                {TCDIcons.rank}

              </div>

              <div>

                <h3
                  className="
                    text-2xl
                    font-black

                    text-tcd-gold
                  "
                >

                  {
                    wallet?.lifetime_earned || 0
                  }

                </h3>

                <p className="text-gray-700 text-sm">

                  Lifetime Earned

                </p>

              </div>

            </div>

            <div
              className="
                bg-[#F7F9FC]

                rounded-2xl

                px-4
                py-3

                text-sm
                text-gray-600
              "
            >

              Total TCD Credits Earned

            </div>

          </div>

          {/* ACHIEVEMENTS */}

          <div
            className="
              bg-white

              rounded-[28px]

              border
              border-gray-100

              p-4

              shadow-sm

              hover:shadow-lg

              transition-all
            "
          >

            <div
              className="
                flex
                items-center

                gap-3

                mb-3
              "
            >

              <div
                className="
                  w-14
                  h-14

                  rounded-2xl

                  bg-tcd-gold/10

                  flex
                  items-center
                  justify-center
                "
              >

                {TCDIcons.achievement}

              </div>

              <div>

                <h3
                  className="
                    text-2xl
                    font-black

                    text-green-600
                  "
                >

                  {
                    achievements.length
                  }

                </h3>

                <p className="text-gray-700 text-sm">

                  Achievements

                </p>

              </div>

            </div>

            <div
              className="
                bg-[#F7F9FC]

                rounded-2xl

                px-4
                py-3

                text-sm
                text-gray-600
              "
            >

              Badges Unlocked

            </div>

          </div>

        </div>

        {/* CONTENT GRID */}

        <div
          className="
            grid
            xl:grid-cols-12

            gap-4
          "
        >

          {/* ACHIEVEMENTS */}

          <div className="xl:col-span-5">

            <div
              className="
                bg-white

                rounded-[30px]

                border
                border-gray-100

                p-4

                shadow-sm

                h-full
              "
            >

              <div className="mb-4">

                <div
                  className="
                    h-1
                    w-20

                    bg-tcd-gold

                    rounded-full

                    mb-3
                  "
                />

                <h2
                  className="
                    text-2xl
                    font-black

                    text-tcd-blue
                  "
                >

                  Recent Achievements

                </h2>

              </div>

              {
                achievements.length === 0 ? (

                  <div
                    className="
                      text-center

                      py-10
                    "
                  >

                    <div
                      className="
                        flex
                        justify-center

                        mb-4
                      "
                    >

                      {TCDIcons.achievement}

                    </div>

                    <h3
                      className="
                        text-xl
                        font-bold
                      "
                    >

                      No Achievements Yet

                    </h3>

                    <p
                      className="
                        text-gray-700

                        mt-2
                      "
                    >

                      Start attempting exams
                      to unlock achievements.

                    </p>

                  </div>

                ) : (

                  <div className="space-y-3">

                    {
                      achievements.map(
                        (
                          achievement: any,
                          index
                        ) => (

                          <div
                            key={index}
                            className="
                              flex
                              items-center
                              justify-between

                              bg-[#F7F9FC]

                              rounded-2xl

                              p-3
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
                                  w-12
                                  h-12

                                  rounded-2xl

                                  bg-tcd-gold/10

                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                {TCDIcons.achievement}

                              </div>

                              <div>

                                <h3
                                  className="
                                    font-bold
                                  "
                                >

                                  {
                                    achievement
                                      ?.achievements
                                      ?.title
                                  }

                                </h3>

                                <p
                                  className="
                                    text-xs
                                    text-gray-700
                                  "
                                >

                                  {new Date(
                                    achievement.unlocked_at
                                  ).toLocaleDateString(
                                    "en-IN"
                                  )}

                                </p>

                              </div>

                            </div>

                            <div
                              className="
                                bg-green-100

                                text-green-700

                                px-3
                                py-1.5

                                rounded-xl

                                text-sm
                                font-bold
                              "
                            >

                              +
                              {
                                achievement
                                  ?.achievements
                                  ?.reward_tcd
                              } TCD

                            </div>

                          </div>
                        )
                      )
                    }

                  </div>
                )
              }

            </div>

          </div>

          {/* TRANSACTIONS */}

          <div className="xl:col-span-7">

            <div
              className="
                bg-white

                rounded-[30px]

                border
                border-gray-100

                p-4

                shadow-sm

                h-full
              "
            >

              <div className="mb-4">

                <div
                  className="
                    h-1
                    w-20

                    bg-tcd-gold

                    rounded-full

                    mb-3
                  "
                />

                <h2
                  className="
                    text-2xl
                    font-black

                    text-tcd-blue
                  "
                >

                  Transaction History

                </h2>

              </div>

              {
                transactions.length === 0 ? (

                  <div
                    className="
                      text-center

                      py-12
                    "
                  >

                    <div
                      className="
                        flex
                        justify-center

                        mb-4
                      "
                    >

                      {TCDIcons.wallet}

                    </div>

                    <h3
                      className="
                        text-xl
                        font-bold
                      "
                    >

                      No Transactions Yet

                    </h3>

                  </div>

                ) : (

                  <div className="space-y-3">

                    {
                      transactions.map(
                        (
                          tx,
                          index
                        ) => (

                          <div
                            key={index}
                            className="
                              flex
                              flex-col
                              md:flex-row

                              md:items-center
                              md:justify-between

                              gap-2

                              bg-[#F7F9FC]

                              rounded-2xl

                              p-3
                            "
                          >

                            <div>

                              <h3
                                className="
                                  font-bold
                                "
                              >

                                {
                                  tx.description
                                }

                              </h3>

                              <p
                                className="
                                  text-xs
                                  text-gray-700

                                  mt-1
                                "
                              >

                                {
                                  tx.transaction_type
                                }

                              </p>

                            </div>

                            <div className="text-right">

                              <div
                                className="
                                  text-xl
                                  font-black

                                  text-green-600
                                "
                              >

                                +{tx.credits}

                              </div>

                              <p
                                className="
                                  text-xs
                                  text-gray-700
                                "
                              >

                                {new Date(
                                  tx.created_at
                                ).toLocaleString(
                                  "en-IN"
                                )}

                              </p>

                            </div>

                          </div>
                        )
                      )
                    }

                  </div>
                )
              }

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { supabase }
from "@/lib/supabase/client";

export default function ReferralClient() {

  const [loading, setLoading] =
    useState(true);

  const [code, setCode] =
    useState("");

  const [stats, setStats] =
    useState({
      referrals: 0,
      rewards: 0,
    });

  const [rewards, setRewards] =
    useState<any[]>([]);
const [
  recentReferrals,
  setRecentReferrals,
] = useState<any[]>([]);

const [rank, setRank] =
  useState<number | null>(null);
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

    if (!user) return;
const {
  data: leaderboard,
} = await supabase
  .from(
    "referral_leaderboard"
  )
  .select("*");
const userRank =
  leaderboard?.findIndex(
    (row: any) =>
      row.user_id === user.id
  );

setRank(
  userRank !== undefined
    ? userRank + 1
    : null
);
    const {
      data: referralCode,
    } = await supabase
      .from("referral_codes")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .single();

    if (referralCode) {

      setCode(
        referralCode.referral_code
      );

      setStats({

        referrals:
          referralCode.total_referrals || 0,

        rewards:
          referralCode.total_rewards || 0,

      });
      

    }

    const {
      data: rewardHistory,
    } = await supabase
      .from("referral_rewards")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    setRewards(
      rewardHistory || []
    );
const {
  data: referralsData,
} = await supabase
  .from("referrals")
  .select("*")
  .eq(
    "referrer_id",
    user.id
  )
  .order(
    "created_at",
    {
      ascending: false,
    }
  );

setRecentReferrals(
  referralsData || []
);
    setLoading(false);
  }

  function copyCode() {

    navigator.clipboard.writeText(
      code
    );

    alert(
      "Referral code copied."
    );
  }

  function copyLink() {

    navigator.clipboard.writeText(
      `https://www.theconclusiondaily.com/signup?ref=${code}`
    );

    alert(
      "Referral link copied."
    );
  }
function shareWhatsApp() {

  const link =
`https://www.theconclusiondaily.com/signup?ref=${code}`;

  window.open(
`https://wa.me/?text=Join The Conclusion Daily and earn rewards! ${link}`,
"_blank"
  );
}

function shareTelegram() {

  const link =
`https://www.theconclusiondaily.com/signup?ref=${code}`;

  window.open(
`https://t.me/share/url?url=${link}`,
"_blank"
  );
}
  if (loading) {

    return (
      <main className="p-6">
        Loading...
      </main>
    );
  }

  return (

    <main className="p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <h1
          className="
            text-3xl
            font-black
            text-tcd-blue
            mb-6
          "
        >
          Referral Center
        </h1>

        {/* HERO */}

        <div
          className="
            bg-white

            rounded-[32px]

            p-8

            border
            border-gray-100

            shadow-sm

            mb-6
          "
        >

          <p
            className="
              text-sm
              text-gray-700
            "
          >
            Your Referral Code
          </p>

          <h2
            className="
              text-4xl
              font-black
              text-tcd-blue

              mt-2
            "
          >
            {code}
          </h2>

          <div
            className="
              flex
              gap-3
              mt-5
            "
          >

            <button
              onClick={copyCode}
              className="
                px-5
                py-3

                rounded-2xl

                bg-tcd-blue
                text-white

                font-semibold
              "
            >
              Copy Code
            </button>

            <button
              onClick={copyLink}
              className="
                px-5
                py-3

                rounded-2xl

                bg-tcd-gold
                text-tcd-blue

                font-semibold
              "
            >
              Copy Invite Link
            </button>
<button
  onClick={shareWhatsApp}
  className="
    px-5
    py-3
    rounded-2xl
    bg-green-500
    text-white
    font-semibold
  "
>
  WhatsApp
</button>

<button
  onClick={shareTelegram}
  className="
    px-5
    py-3
    rounded-2xl
    bg-sky-500
    text-white
    font-semibold
  "
>
  Telegram
</button>
          </div>

        </div>

        {/* STATS */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-4
            mb-6
          "
        >

          <div
            className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
            "
          >

            <p className="text-gray-700">
              Total Referrals
            </p>

            <h3
              className="
                text-3xl
                font-black
                text-tcd-blue
              "
            >
              {stats.referrals}
            </h3>

          </div>

          <div
            className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
            "
          >

            <p className="text-gray-700">
              Credits Earned
            </p>

            <h3
              className="
                text-3xl
                font-black
                text-tcd-gold
              "
            >
              {stats.rewards}
            </h3>
<div
  className="
    bg-white
    rounded-[28px]
    p-6
    shadow-sm
  "
>

  <p className="text-gray-700">
    Referral Rank
  </p>

  <h3
    className="
      text-3xl
      font-black
      text-tcd-blue
    "
  >
    #{rank || "-"}
  </h3>

</div>
          </div>

        </div>
<div
  className="
    bg-white
    rounded-[32px]
    p-6
    border
    border-gray-100
    shadow-sm
    mb-6
  "
>

  <h3
    className="
      text-xl
      font-bold
      text-tcd-blue
      mb-4
    "
  >
    Recent Referrals
  </h3>

  {recentReferrals.length === 0 ? (

    <p className="text-gray-700">
      No referrals yet.
    </p>

  ) : (

    <div className="space-y-3">

      {recentReferrals.map(
        (referral) => (

          <div
            key={referral.id}
            className="
              flex
              justify-between

              bg-[#F8F9FB]

              rounded-2xl

              p-4
            "
          >

            <span>
              Referral Joined
            </span>

            <span>
              +{referral.reward_credits}
            </span>

          </div>

        )
      )}

    </div>

  )}

</div>
        {/* REWARD HISTORY */}

        <div
          className="
            bg-white

            rounded-[32px]

            p-6

            border
            border-gray-100

            shadow-sm
          "
        >

          <h3
            className="
              text-xl
              font-bold
              text-tcd-blue
              mb-4
            "
          >
            Reward History
          </h3>

          {rewards.length === 0 ? (

            <p
              className="
                text-gray-700
              "
            >
              No rewards yet.
            </p>

          ) : (

            <div className="space-y-3">

              {rewards.map(
                (reward) => (

                  <div
                    key={reward.id}
                    className="
                      flex
                      justify-between

                      bg-[#F8F9FB]

                      rounded-2xl

                      p-4
                    "
                  >

                    <div>

                      <p
                        className="
                          font-semibold
                        "
                      >
                        Referral Reward
                      </p>

                      <p
                        className="
                          text-sm
                          text-gray-700
                        "
                      >
                        {
                          new Date(
                            reward.created_at
                          ).toLocaleDateString()
                        }
                      </p>

                    </div>

                    <div
                      className="
                        font-black
                        text-tcd-gold
                      "
                    >
                      +{reward.credits}
                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </main>
  );
}
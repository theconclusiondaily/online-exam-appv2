import { supabase } from "@/lib/supabase/client";

export async function processReferral(
  userId: string,
  signupReferralCode?: string
) {
  try {

    if (!signupReferralCode) {
      return;
    }

    // -----------------------------------
    // CURRENT USER
    // -----------------------------------

    const {
      data: user,
      error: userError,
    } = await supabase
      .from("users")
      .select(`
        id,
        referral_code,
        referred_by
      `)
      .eq("id", userId)
      .single();

    if (userError || !user) {
      return;
    }

    // Already processed

    if (user.referred_by) {
      return;
    }

    // -----------------------------------
    // FIND REFERRER
    // -----------------------------------

    const {
      data: referrer,
      error: referrerError,
    } = await supabase
      .from("users")
      .select(`
        id,
        referral_code
      `)
      .eq(
        "referral_code",
        signupReferralCode
      )
      .single();

    if (
      referrerError ||
      !referrer
    ) {
      return;
    }

    // Prevent self referral

    if (
      referrer.id === user.id
    ) {
      return;
    }

    // -----------------------------------
    // DUPLICATE CHECK
    // -----------------------------------

    const {
      data: existingReferral,
    } = await supabase
      .from("referrals")
      .select("id")
      .eq(
        "referred_user_id",
        user.id
      )
      .maybeSingle();

    if (existingReferral) {
      return;
      
    }

    // -----------------------------------
    // CREATE REFERRAL
    // -----------------------------------

    const {
      data: referral,
      error: referralError,
    } = await supabase
      .from("referrals")
      .insert({
        referrer_id:
          referrer.id,

        referred_user_id:
          user.id,

        referral_code:
          signupReferralCode,

        reward_credits: 50,
      })
      .select()
      .single();

    if (
      referralError ||
      !referral
    ) {

      console.error(
        referralError
      );

      return;
    }

    // -----------------------------------
    // REFERRAL REWARDS
    // -----------------------------------

    await supabase
      .from("referral_rewards")
      .insert([
        {
          user_id:
            referrer.id,

          referral_id:
            referral.id,

          credits: 50,
        },

        {
          user_id:
            user.id,

          referral_id:
            referral.id,

          credits: 25,
        },
      ]);

    // -----------------------------------
// REFERRER WALLET REWARD
// 50 TCD Credits = 500 paise
// -----------------------------------

const {
  error: referrerRewardError,
} = await supabase.rpc(
  "credit_wallet",
  {
    p_user_id: referrer.id,
    p_amount: 500,
    p_transaction_type: "REFERRAL",
    p_bonus_amount: 500,
    p_reference_number:
      `REFERRAL-REFERRER-${referral.id}`,
    p_metadata: {
      referral_id: referral.id,
      referred_user_id: user.id,
      reward_credits: 50,
      source: "referral_reward",
    },
  }
);

if (referrerRewardError) {
  throw referrerRewardError;
}

// -----------------------------------
// NEW USER REFERRAL REWARD
// 25 TCD Credits = 250 paise
// -----------------------------------

const {
  error: newUserRewardError,
} = await supabase.rpc(
  "credit_wallet",
  {
    p_user_id: user.id,
    p_amount: 250,
    p_transaction_type: "REFERRAL",
    p_bonus_amount: 250,
    p_reference_number:
      `REFERRAL-NEWUSER-${referral.id}`,
    p_metadata: {
      referral_id: referral.id,
      referrer_user_id: referrer.id,
      reward_credits: 25,
      source: "referral_reward",
    },
  }
);

if (newUserRewardError) {
  throw newUserRewardError;
}

 
    // -----------------------------------
    // NOTIFICATIONS
    // -----------------------------------

    await supabase
      .from("notifications")
      .insert([
        {
          user_id:
            referrer.id,

          title:
            "Referral Successful",

         message:
  "You earned 50 TCD Credits.",

          type:
            "reward",
        },

        {
          user_id:
            user.id,

          title:
            "Welcome Bonus",

          message:
  "You earned 25 TCD Credits.",

          type:
            "reward",
        },
      ]);

    // -----------------------------------
    // UPDATE REFERRAL COUNTS
    // -----------------------------------

    const {
      count: totalReferrals,
    } = await supabase
      .from("referrals")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq(
        "referrer_id",
        referrer.id
      );

    const {
      data: rewards,
    } = await supabase
      .from("referral_rewards")
      .select("credits")
      .eq(
        "user_id",
        referrer.id
      );

    const totalRewards =
      rewards?.reduce(
        (sum, reward) =>
          sum +
          (reward.credits || 0),
        0
      ) || 0;

    await supabase
      .from("referral_codes")
      .update({

        total_referrals:
          totalReferrals || 0,

        total_rewards:
          totalRewards,

      })
      .eq(
        "user_id",
        referrer.id
      );

    // -----------------------------------
    // MARK USER
    // -----------------------------------

    await supabase
      .from("users")
      .update({
        referred_by:
          referrer.id,
      })
      .eq(
        "id",
        user.id
      );

  } catch (err) {

    console.error(
      "Referral Error:",
      err
    );
  }
}
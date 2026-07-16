CREATE OR REPLACE FUNCTION public.claim_daily_login_reward(
  p_user_id uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  -- TCD daily reset follows India calendar date
  v_today date :=
    (now() AT TIME ZONE 'Asia/Kolkata')::date;

  v_reward_credits integer;
  v_reward_paise bigint;

  v_streak integer;
  v_last_claim date;

BEGIN

  -- Lock this user's reward row to prevent
  -- simultaneous double claims
  SELECT
    streak_day,
    last_claim_date
  INTO
    v_streak,
    v_last_claim
  FROM daily_login_rewards
  WHERE user_id = p_user_id
  FOR UPDATE;

  -- ==========================================
  -- FIRST CLAIM
  -- ==========================================

  IF NOT FOUND THEN

    v_streak := 1;

    INSERT INTO daily_login_rewards (
      user_id,
      streak_day,
      last_claim_date
    )
    VALUES (
      p_user_id,
      v_streak,
      v_today
    );

  ELSE

    -- ========================================
    -- ALREADY CLAIMED TODAY
    -- ========================================

    IF v_last_claim = v_today THEN
      RETURN 0;
    END IF;

    -- ========================================
    -- CONTINUE OR RESET STREAK
    -- ========================================

    IF v_last_claim = v_today - 1 THEN

      v_streak :=
        LEAST(
          COALESCE(v_streak, 0) + 1,
          7
        );

    ELSE

      -- Handles old rows containing:
      -- streak_day = 0
      -- last_claim_date = NULL
      -- missed streaks
      v_streak := 1;

    END IF;

    UPDATE daily_login_rewards
    SET
      streak_day = v_streak,
      last_claim_date = v_today,
      updated_at = now()
    WHERE user_id = p_user_id;

  END IF;

  -- ==========================================
  -- REWARD IN TCD CREDITS
  -- ==========================================

  v_reward_credits :=
    CASE v_streak
      WHEN 1 THEN 5
      WHEN 2 THEN 10
      WHEN 3 THEN 15
      WHEN 4 THEN 20
      WHEN 5 THEN 25
      WHEN 6 THEN 30
      WHEN 7 THEN 50
      ELSE 5
    END;

  -- 1 TCD Credit = 10 paise
  v_reward_paise :=
    v_reward_credits::bigint * 10;

  -- ==========================================
  -- CREDIT WALLET
  -- ==========================================

  PERFORM credit_wallet(
    p_user_id,
    v_reward_paise,
    'BONUS',
    0,
    'DAILY-' || v_today::text,
    NULL,
    NULL,
    NULL,
    NULL,
    jsonb_build_object(
      'reward_type', 'daily_login',
      'streak_day', v_streak,
      'reward_credits', v_reward_credits,
      'reward_paise', v_reward_paise
    )
  );

  -- Frontend expects TCD Credits, not paise
  RETURN v_reward_credits;

END;
$function$;
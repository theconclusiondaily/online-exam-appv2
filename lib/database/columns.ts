/**
 * ============================================================================
 * Users
 * ============================================================================
 */

export const USER_COLUMNS = {
  PROFILE: `
    id,
    name,
    avatar_url,
    xp,
    level,
    streak,
    achievement_score,
    prestige_level
  `,
} as const;

/**
 * ============================================================================
 * Wallet
 * ============================================================================
 */

export const WALLET_COLUMNS = {
  BALANCE: `
    available_balance,
    locked_balance,
    bonus_balance,
    lifetime_added,
    lifetime_won,
    lifetime_spent,
    lifetime_withdrawn,
    lifetime_refunded,
    currency,
    status
  `,
} as const;

/**
 * ============================================================================
 * Exams
 * ============================================================================
 */

export const EXAM_COLUMNS = {
  HERO: `
    id,
    title,
    status,
    start_time,
    reward_pool,
    entry_fee
  `,

  CARD: `
    id,
    title,
    description,
    start_time,
    end_time,
    duration,
    total_questions,
    reward_pool,
    entry_fee,
    status,
    published,
    max_participants
  `,

  PREVIEW: `
    id,
    title,
    start_time,
    reward_pool,
    entry_fee
  `,
} as const;

/**
 * ============================================================================
 * Exam Attempts
 * ============================================================================
 */

export const ATTEMPT_COLUMNS = {
  STATS: `
    percentage,
    accuracy
  `,

  RESULT: `
    score,
    percentage,
    correct_count,
    wrong_count,
    accuracy,
    time_taken
  `,
} as const;

/**
 * ============================================================================
 * Achievements
 * ============================================================================
 */

export const ACHIEVEMENT_COLUMNS = {
  BASIC: `
    id,
    title,
    category,
    rarity,
    reward_tcd
  `,
} as const;

/**
 * ============================================================================
 * Leaderboard
 * ============================================================================
 */

export const LEADERBOARD_COLUMNS = {
  CARD: `
    id,
    name,
    xp,
    level,
    achievement_score,
    prestige_level,
    tcd_credits,
    exams_attempted,
    avg_score,
    average_percentage
  `,
} as const;
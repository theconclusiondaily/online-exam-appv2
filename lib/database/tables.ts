/* ============================================================================
   Database Tables
   Single Source of Truth
   ============================================================================ */

export const TABLES = {
  USERS: "users",

  INSTITUTES: "institutes",

  EXAMS: "exams",

  QUESTIONS: "questions",

  EXAM_QUESTIONS: "exam_questions",

  EXAM_SESSIONS: "exam_sessions",

  EXAM_ATTEMPTS: "exam_attempts",

  EXAM_ANSWERS: "exam_answers",

  EXAM_LIVE_STATUS: "exam_live_status",

  LEADERBOARD: "leaderboard",

  LEADERBOARD_VIEW: "leaderboard_view",

  TCD_WALLETS: "tcd_wallets",

  TCD_TRANSACTIONS: "tcd_transactions",

  ACHIEVEMENTS: "achievements",

  USER_ACHIEVEMENTS: "user_achievements",

  PROCTORING_EVENTS: "proctoring_events",

  TESTIMONIALS: "testimonials",

  LANDING_FAQS: "landing_faqs",

  FAQS: "faqs",
} as const;

export type TableName =
  (typeof TABLES)[keyof typeof TABLES];
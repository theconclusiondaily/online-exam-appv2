/* ============================================================================
   Roles
   ============================================================================ */

export const USER_ROLE = {
  ADMIN: "admin",

  TEACHER: "teacher",

  STUDENT: "student",
} as const;



/* ============================================================================
   Exam Status
   ============================================================================ */

export const EXAM_STATUS = {
  DRAFT: "DRAFT",

  UPCOMING: "UPCOMING",

  LIVE: "LIVE",

  COMPLETED: "COMPLETED",

  CANCELLED: "CANCELLED",
} as const;



/* ============================================================================
   Competition Status
   ============================================================================ */

export const COMPETITION_STATUS = {
  LIVE: "LIVE",

  UPCOMING: "UPCOMING",

  ENDED: "ENDED",
} as const;



/* ============================================================================
   Wallet Transaction Types
   ============================================================================ */

export const TRANSACTION_TYPE = {
  ADD_MONEY: "ADD_MONEY",

  ENTRY_FEE: "ENTRY_FEE",

  PRIZE: "PRIZE",

  REFUND: "REFUND",

  WITHDRAW_REQUEST: "WITHDRAW_REQUEST",

  WITHDRAW_SUCCESS: "WITHDRAW_SUCCESS",

  WITHDRAW_REJECTED: "WITHDRAW_REJECTED",

  BONUS: "BONUS",

  REFERRAL: "REFERRAL",

  ADMIN_CREDIT: "ADMIN_CREDIT",

  ADMIN_DEBIT: "ADMIN_DEBIT",
} as const;
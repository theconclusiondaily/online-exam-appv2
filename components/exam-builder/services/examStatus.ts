export const EXAM_STATUS = {

  DRAFT: "draft",

  SCHEDULED: "scheduled",

  LIVE: "live",

  COMPLETED: "completed",

  CANCELLED: "cancelled",

} as const;

export type ExamStatus =
  typeof EXAM_STATUS[keyof typeof EXAM_STATUS];
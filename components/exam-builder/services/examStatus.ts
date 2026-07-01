export const EXAM_STATUS = {

  DRAFT: "Draft",

  PUBLISHED: "Published",

  SCHEDULED: "Scheduled",

  LIVE: "Live",

  COMPLETED: "Completed",

  CANCELLED: "Cancelled",

  ARCHIVED: "Archived",

} as const;

export type ExamStatus =
  typeof EXAM_STATUS[keyof typeof EXAM_STATUS];
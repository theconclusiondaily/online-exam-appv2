import { EXAM_STATUS } from "@/components/exam-builder/services/examStatus";

export function getExamStatus(
  startTime: string,
  endTime: string,
  cancelled: boolean
) {

  if (cancelled) {
    return EXAM_STATUS.CANCELLED;
  }

  const now = new Date();

  const start = new Date(startTime);

  const end = new Date(endTime);

  if (now < start) {
    return EXAM_STATUS.SCHEDULED;
  }

  if (now >= start && now <= end) {
    return EXAM_STATUS.LIVE;
  }

  return EXAM_STATUS.COMPLETED;
}
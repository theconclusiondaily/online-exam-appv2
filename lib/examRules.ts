import { EXAM_STATUS } from "@/components/exam-builder/services/examStatus";

export function canPublish(exam: any) {

  if (exam.cancelled) {
    return {
      allowed: false,
      message: "Cancelled exams cannot be published.",
    };
  }

  if (exam.results_finalized) {
    return {
      allowed: false,
      message: "Finalized exams cannot be published.",
    };
  }

  return {
    allowed: true,
  };

}

export function canCancel(exam: any) {

  if (exam.cancelled) {
    return {
      allowed: false,
      message: "Exam is already cancelled.",
    };
  }

  if (exam.results_finalized) {
    return {
      allowed: false,
      message: "Finalized exams cannot be cancelled.",
    };
  }

  return {
    allowed: true,
  };

}

export function canEdit(exam: any) {

  if (exam.cancelled)
    return {
      allowed: false,
      message: "Cancelled exams cannot be edited.",
    };

  if (exam.results_finalized)
    return {
      allowed: false,
      message: "Finalized exams cannot be edited.",
    };

  if (
    exam.status === EXAM_STATUS.LIVE ||
    exam.status === EXAM_STATUS.COMPLETED
  ) {
    return {
      allowed: false,
      message: "Live or completed exams cannot be edited.",
    };
  }

  return {
    allowed: true,
  };

}

export function canDelete(
  attemptCount: number
) {

  if (attemptCount > 0) {
    return {
      allowed: false,
      message:
        "Cannot delete an exam that has participants.",
    };
  }

  return {
    allowed: true,
  };

}
import {
  cancelExam as cancel
} from "@/components/exam-builder/services/cancelExam";

export async function cancelExam(id: string) {
  return cancel(id);
}
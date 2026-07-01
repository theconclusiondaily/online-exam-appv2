import {
  publishExam as publish
} from "@/components/exam-builder/services/publishExam";

export async function publishExam(id: string) {
  return publish(id);
}
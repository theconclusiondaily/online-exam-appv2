import {
  deleteExam as remove
} from "@/components/exam-builder/services/deleteExam";

export async function deleteExam(id: string) {
  return remove(id);
}
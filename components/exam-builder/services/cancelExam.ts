import { examRepository } from "../repository/examRepository";

export async function cancelExam(id: string) {
  return await examRepository.cancel(id);
}
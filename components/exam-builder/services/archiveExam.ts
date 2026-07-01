import { examRepository } from "../repository/examRepository";

export async function archiveExam(id: string) {
  return await examRepository.archive(id);
}
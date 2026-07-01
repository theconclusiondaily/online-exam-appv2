import { examRepository } from "../repository/examRepository";

export async function deleteExam(id: string) {
  return await examRepository.delete(id);
}
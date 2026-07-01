import { examRepository } from "../repository/examRepository";

export async function getExam(id: string) {
  return await examRepository.getById(id);
}
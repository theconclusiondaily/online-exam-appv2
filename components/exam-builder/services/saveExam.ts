import { examRepository } from "../repository/examRepository";

export async function saveExam(exam: any) {
  return await examRepository.create(exam);
}
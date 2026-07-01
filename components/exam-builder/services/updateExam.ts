import { examRepository } from "../repository/examRepository";

export async function updateExam(
  id: string,
  exam: any
) {
  return await examRepository.update(id, exam);
}
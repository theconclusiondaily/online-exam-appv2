import { examRepository } from "../repository/examRepository";

export async function getExams() {
  return await examRepository.getAll();
}
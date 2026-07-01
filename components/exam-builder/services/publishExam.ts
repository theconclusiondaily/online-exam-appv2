import { examRepository } from "../repository/examRepository";

export async function publishExam(id: string) {
  return await examRepository.publish(id);
}
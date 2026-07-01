import { QuestionState } from "../types";

export interface SaveQuestionPayload extends QuestionState {
  id?: string;
  examId?: string | null;
  paperId?: string | null;
  instituteId?: string | null;
}

export async function saveQuestion(
  payload: SaveQuestionPayload
): Promise<string> {

  const response = await fetch("/api/questions/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to save question.");
  }

  return result.id;
}
export async function getQuestions() {

  const response = await fetch("/api/questions/list");

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error("Failed to load questions.");
  }

  return result.questions;
}
export async function getQuestion(id: string) {

  const response = await fetch(
    `/api/questions/get?id=${id}`
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error);
  }

  return result.question;
}
export async function deleteQuestion(id: string) {

  const response = await fetch("/api/questions/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error);
  }
}
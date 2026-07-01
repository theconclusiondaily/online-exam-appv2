export async function savePaperQuestions(
  paperId: string,
  questionIds: string[]
) {
  const response = await fetch("/api/papers/save-questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paperId,
      questionIds,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error);
  }

  return result;
}
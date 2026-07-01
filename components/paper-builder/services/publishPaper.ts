export async function publishPaper(id: string) {
  const response = await fetch("/api/papers/publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error);
  }

  return result;
}
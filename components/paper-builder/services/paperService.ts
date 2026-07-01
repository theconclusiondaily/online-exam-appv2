export async function getPapers() {

  const response =
    await fetch("/api/papers/list");

  const result =
    await response.json();

  if (
    !response.ok ||
    !result.success
  ) {
    throw new Error(
      "Failed to load papers."
    );
  }

  return result.papers;

}
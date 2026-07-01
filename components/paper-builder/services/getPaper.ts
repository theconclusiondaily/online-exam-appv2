export async function getPaper(id: string) {

  const response =
    await fetch(
      `/api/papers/get?id=${id}`
    );

  const result =
    await response.json();

  if (
    !response.ok ||
    !result.success
  ) {
    throw new Error(result.error);
  }

  return result;
}
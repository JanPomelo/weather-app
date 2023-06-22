export async function request<TResponse>(
  url: string,
  config: RequestInit
): Promise<TResponse> {
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error("HTTP Status Code: " + response.status);
    }
    return await response.json();
  } catch (err) {
    console.log("Can't get the data.", err);
  }
}

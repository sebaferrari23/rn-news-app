const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? '';

interface ApiClientConfig extends RequestInit {}

export async function apiClient<T>(
  endpoint: string,
  config?: ApiClientConfig,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
    },
    ...config,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

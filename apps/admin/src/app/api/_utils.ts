import { stringify } from "qs";

export async function makeSystemApiFetch(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) {
  try {
    const response = await fetch(input, {
      ...init,
      headers: {
        Authorization: `Bearer ${process.env.SYSTEM_AUTHENTICATION_KEY}`,
        ...init?.headers,
      },
    });

    if (!response.ok) {
      console.error("[systemApiFetch] Request failed", {
        url: input.toString(),
        status: response.status,
        statusText: response.statusText,
      });
    }

    return response;
  } catch (error) {
    console.error("[systemApiFetch] Fetch error", error);
    throw error;
  }
}

export function getSystemApiUrl(
  path: string,
  params?: Record<string, unknown>,
) {
  const baseUrl = `${process.env.NEXT_PUBLIC_URL}/api/system/${path}`;

  if (params) {
    return `${baseUrl}?${stringify(params)}`;
  }

  return baseUrl;
}

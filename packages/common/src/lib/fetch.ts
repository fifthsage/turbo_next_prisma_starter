import { APIResponse } from "../../types";

const DEFAULT_HEADER = {
  "Content-Type": "application/json",
};

function getUrl(value: string) {
  return value.startsWith("http")
    ? value
    : `${process.env.NEXT_PUBLIC_URL}/api/${value}`;
}

export function getDataFromResponse<T>({
  data,
  message,
  status,
}: APIResponse<T>) {
  if (status === "FAIL") {
    throw new Error(message || "API 오류");
  }

  return data || ({} as T);
}

export async function _fetch(
  input: RequestInfo | URL,
  init?: RequestInit | null,
  defaultHeaders?: boolean,
) {
  const headers: HeadersInit = {
    ...(defaultHeaders && DEFAULT_HEADER),
    ...init?.headers,
  };

  const url = getUrl(input.toString());
  return await fetch(url, {
    ...init,
    headers,
  });
}

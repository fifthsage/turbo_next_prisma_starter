const DEFAULT_HEADER = {
    "Content-Type": "application/json",
};
function getUrl(value) {
    return value.startsWith("http")
        ? value
        : `${process.env.NEXT_PUBLIC_URL}/api/${value}`;
}
export function getDataFromResponse({ data, message, status, }) {
    if (status === "FAIL") {
        throw new Error(message || "API 오류");
    }
    return data || {};
}
export async function _fetch(input, init, defaultHeaders) {
    const headers = {
        ...(defaultHeaders && DEFAULT_HEADER),
        ...init?.headers,
    };
    const url = getUrl(input.toString());
    return await fetch(url, {
        ...init,
        headers,
    });
}

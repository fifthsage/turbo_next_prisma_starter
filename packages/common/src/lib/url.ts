// 모든 환경(브라우저, Edge Runtime)에서 사용할 수 있는 querystring 구현
export interface ParsedUrlQueryInput {
  [key: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>
    | null
    | undefined;
}

export interface StringifyOptions {
  encodeURIComponent?: (str: string) => string;
}

export function queryStringify(
  obj?: ParsedUrlQueryInput,
  sep: string = "&",
  eq: string = "=",
  options?: StringifyOptions,
): string {
  if (!obj) return "";

  const encode = options?.encodeURIComponent || encodeURIComponent;

  return Object.entries(obj)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .map((v) => `${encode(key)}${eq}${encode(String(v))}`)
          .join(sep);
      }
      return `${encode(key)}${eq}${encode(String(value))}`;
    })
    .join(sep);
}

export default {
  queryStringify,
};

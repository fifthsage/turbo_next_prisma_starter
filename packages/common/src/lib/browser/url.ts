import { ParsedUrlQueryInput, stringify, StringifyOptions } from "querystring";

export function queryStringify(
  obj?: ParsedUrlQueryInput,
  sep?: string,
  eq?: string,
  options?: StringifyOptions,
) {
  return stringify(obj, sep, eq, options);
}

export default {
  queryStringify,
};

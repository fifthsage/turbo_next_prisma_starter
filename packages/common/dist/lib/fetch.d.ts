import { APIResponse } from "../../types";
export declare function getDataFromResponse<T>({ data, message, status, }: APIResponse<T>): T;
export declare function _fetch(input: RequestInfo | URL, init?: RequestInit | null, defaultHeaders?: boolean): Promise<Response>;
//# sourceMappingURL=fetch.d.ts.map
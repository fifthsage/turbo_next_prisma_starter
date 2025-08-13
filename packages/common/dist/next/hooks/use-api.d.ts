import { NextFetchRequestInit } from "../../../types";
interface UseApiProps {
    defaultHeaders?: boolean;
}
export default function useApi(props?: UseApiProps): <T>(input: RequestInfo | URL, init?: NextFetchRequestInit | null) => Promise<T>;
export {};
//# sourceMappingURL=use-api.d.ts.map
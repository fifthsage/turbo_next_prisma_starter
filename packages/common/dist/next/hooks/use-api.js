"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { SINGIN_URL } from "../../lib/constants";
import { ApiError, UnauthenticatedError } from "../../lib/error";
import { _fetch, getDataFromResponse } from "../../lib/fetch";
export default function useApi(props) {
    const router = useRouter();
    return useCallback(async (input, init) => {
        try {
            const response = await _fetch(input, init, props?.defaultHeaders);
            const body = (await response.json());
            if (response.status !== 200) {
                const errorMessage = body.message || "http 응답 오류";
                switch (response.status) {
                    case 401: {
                        throw new UnauthenticatedError(errorMessage);
                    }
                    default: {
                        throw new ApiError(response.status, errorMessage);
                    }
                }
            }
            return getDataFromResponse(body);
        }
        catch (error) {
            if (error instanceof UnauthenticatedError) {
                router.replace(SINGIN_URL);
                throw error;
            }
            else {
                throw error;
            }
        }
    }, [props?.defaultHeaders, router]);
}

export declare class UnauthenticatedError extends Error {
    error: unknown;
    constructor(message?: string);
}
export declare class ApiError extends Error {
    error: unknown;
    status: number;
    constructor(status?: number, message?: string);
}
export declare function getErrorMessage(error: unknown): string;
//# sourceMappingURL=error.d.ts.map
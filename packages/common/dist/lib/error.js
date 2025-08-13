export class UnauthenticatedError extends Error {
    error;
    constructor(message) {
        super();
        this.message = message || "unauthenticated";
    }
}
export class ApiError extends Error {
    error;
    status;
    constructor(status = 200, message) {
        super();
        this.status = status;
        this.message = message || "api error";
    }
}
export function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}

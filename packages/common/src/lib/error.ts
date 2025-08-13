export class UnauthenticatedError extends Error {
  error: unknown;

  constructor(message?: string) {
    super();
    this.message = message || "unauthenticated";
  }
}

export class ApiError extends Error {
  error: unknown;
  status: number;

  constructor(status: number = 200, message?: string) {
    super();
    this.status = status;
    this.message = message || "api error";
  }
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

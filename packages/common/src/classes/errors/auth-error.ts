class AuthError extends Error {
  error: unknown;

  constructor(message?: string) {
    super();
    this.message = message || "unauthenticated";
  }
}

export default AuthError;

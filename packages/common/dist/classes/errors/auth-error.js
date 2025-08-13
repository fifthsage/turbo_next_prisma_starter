class AuthError extends Error {
    error;
    constructor(message) {
        super();
        this.message = message || "unauthenticated";
    }
}
export default AuthError;

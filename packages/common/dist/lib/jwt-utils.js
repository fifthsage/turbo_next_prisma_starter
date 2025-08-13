import { SignJWT, jwtVerify } from "jose";
const secret = process.env.JWT_SECRET;
const nanoid = import("nanoid");
async function sign(id) {
    return await new SignJWT({ id })
        .setProtectedHeader({ alg: "HS256" })
        .setJti((await nanoid).nanoid())
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(new TextEncoder().encode(secret));
}
async function verify(token) {
    const decoded = await jwtVerify(token, new TextEncoder().encode(secret));
    return decoded.payload.id;
}
async function refresh(id) {
    return await new SignJWT({ id })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(new TextEncoder().encode(secret));
}
async function refreshVerify(token) {
    try {
        const decoded = await jwtVerify(token, new TextEncoder().encode(secret));
        return decoded.payload.id;
    }
    catch (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    error) {
        return false;
    }
}
export { sign, verify, refresh, refreshVerify };

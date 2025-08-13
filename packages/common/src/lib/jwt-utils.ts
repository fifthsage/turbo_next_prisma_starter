import { SignJWT, jwtVerify } from "jose";

const secret = process.env.JWT_SECRET!;

const nanoid = import("nanoid");

async function sign(id: string) {
  return await new SignJWT({ id })
    .setProtectedHeader({ alg: "HS256" })
    .setJti((await nanoid).nanoid())
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(new TextEncoder().encode(secret));
}

async function verify(token: string) {
  const decoded = await jwtVerify(token, new TextEncoder().encode(secret));

  return (decoded.payload as { id: string }).id;
}

async function refresh(id: string) {
  return await new SignJWT({ id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(secret));
}

async function refreshVerify(token: string) {
  try {
    const decoded = await jwtVerify(token, new TextEncoder().encode(secret));

    return (decoded.payload as { id: string }).id;
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    error
  ) {
    return false;
  }
}

export { sign, verify, refresh, refreshVerify };

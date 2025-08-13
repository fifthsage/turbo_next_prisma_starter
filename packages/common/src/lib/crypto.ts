import { createHash } from "crypto";

export function getBasicAuthFromSecret(
  secret: string | undefined | null,
  method: BufferEncoding = "base64",
) {
  return "Basic " + Buffer.from((secret || "") + ":").toString(method);
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

export function generateUniqueIdFromText(input: string, length = 12): string {
  const hash = createHash("sha256").update(input).digest("hex");
  return hash
    .slice(0, length * 2) // 2자리씩 읽어서 범위 확보
    .match(/.{1,2}/g)!
    .map((hex) => {
      const index = parseInt(hex, 16) % alphabet.length;
      return alphabet[index];
    })
    .join("");
}

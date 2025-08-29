export function getBasicAuthFromSecret(
  secret: string | undefined | null,
  method: BufferEncoding = "base64",
) {
  return "Basic " + Buffer.from((secret || "") + ":").toString(method);
}

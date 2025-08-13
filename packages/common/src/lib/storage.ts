export const KV_PREFIX = "ev";

export function generateKVhashKey(...args: string[]): string {
  return [KV_PREFIX, ...args].join(":");
}

export default {
  generateKVhashKey,
};

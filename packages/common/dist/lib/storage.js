export const KV_PREFIX = "ev";
export function generateKVhashKey(...args) {
    return [KV_PREFIX, ...args].join(":");
}
export default {
    generateKVhashKey,
};

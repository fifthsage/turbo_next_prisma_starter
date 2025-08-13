import getRedisClient from "../../redis";

export async function getFirstKey(key: string): Promise<string | null> {
  const redis = await getRedisClient();
  let firstKey: string | null = null;

  for await (const keys of redis.scanIterator({
    MATCH: key,
    COUNT: 1,
  })) {
    if (keys.length > 0 && keys[0]) {
      firstKey = keys[0];
      break;
    }
  }

  return firstKey;
}

export async function getKeys(
  key: string,
  count: number = 100,
): Promise<string[]> {
  const redis = await getRedisClient();
  const restult: string[] = [];

  for await (const keys of redis.scanIterator({
    MATCH: key,
    COUNT: count,
  })) {
    if (keys.length > 0) {
      restult.push(...keys);
      break;
    }
  }

  return restult;
}

export async function exists(key: string): Promise<boolean> {
  const redis = await getRedisClient();
  let isKeyExists = false;

  for await (const keys of redis.scanIterator({
    MATCH: key,
    COUNT: 1,
  })) {
    isKeyExists = keys.length > 0;
    break;
  }

  return isKeyExists;
}

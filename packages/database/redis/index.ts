import { createClient, RedisClientType } from "redis";

let client: RedisClientType | null = null;

const getRedisClient = async (): Promise<RedisClientType> => {
  if (client && client.isOpen) {
    return client;
  }

  client = createClient({
    url: process.env.REDIS_URL,
  });

  client.on("error", (err) => {
    console.error("❌ Redis Client Error", err);
  });

  await client.connect();

  return client;
};

export default getRedisClient;

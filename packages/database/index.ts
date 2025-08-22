import { PrismaClient } from "./.generated/client";

/**
 * Database client factory
 * - `prisma`        : default pooled connection (6543, DATABASE_URL)
 * - `prismaDirect`  : direct connection (5432, DIRECT_URL)
 *
 * Usage guide:
 *  - Edge/API(짧은 쿼리)  → `prisma` 사용 (DATABASE_URL: 6543 + pgbouncer=true)
 *  - 배치/긴 트랜잭션     → `prismaDirect` 사용 (DIRECT_URL: 5432)
 */

declare global {
  // These must be `var` for hot-reload safety in dev
  var prisma: PrismaClient | undefined;
  var prismaDirect: PrismaClient | undefined;
}

function createPrismaFromEnv(
  urlEnvKey: "DATABASE_URL" | "DIRECT_URL",
  options = {},
) {
  const datasourceUrl = process.env[urlEnvKey];

  if (!datasourceUrl) {
    return new PrismaClient();
  }

  return new PrismaClient({ ...options, datasourceUrl });
}

let prisma: PrismaClient;
let prismaDirect: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // Prod: fresh instances per process
  prisma = createPrismaFromEnv("DATABASE_URL");
  prismaDirect = createPrismaFromEnv("DIRECT_URL");
} else {
  // Dev: reuse globals to avoid exhausting connections during HMR
  const options = {
    log: ["query", "info", "warn", "error"],
  };

  if (!global.prisma) {
    global.prisma = createPrismaFromEnv("DATABASE_URL", options);
  }
  if (!global.prismaDirect) {
    global.prismaDirect = createPrismaFromEnv("DIRECT_URL", options);
  }

  prisma = global.prisma;
  prismaDirect = global.prismaDirect;
}

export * from "./src/schema";
export * from "./.generated/client";

export { prismaDirect };
export default prisma;

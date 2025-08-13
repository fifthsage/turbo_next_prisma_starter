import { PrismaClient } from "./.generated/client";

declare global {
  var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }
  prisma = global.prisma;
}

export * from "./src/schema";
export * from "./.generated/client";

export default prisma;

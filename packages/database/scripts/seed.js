/* eslint-disable no-undef */
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { PrismaClient } from "../.generated/client/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

const loadJson = async (relativePath) => {
  const fullPath = resolve(__dirname, relativePath);
  const data = await readFile(fullPath, "utf-8");
  return JSON.parse(data);
};

const erpUserData = await loadJson("../json/seed/erp-users.json");
const managerUserData = await loadJson("../json/seed/manager-users.json");

async function seedErpUsers() {
  const results = await Promise.allSettled(
    erpUserData.map((item) =>
      prisma.erpUser.upsert({
        where: { email: item.email },
        update: {
          name: item.name,
          contact: item.contact,
          role: item.role,
        },
        create: {
          email: item.email,
          name: item.name,
          contact: item.contact,
          role: item.role,
        },
      }),
    ),
  );

  const success = results.filter((r) => r.status === "fulfilled").length;
  const fail = results.length - success;

  console.log(`🎉 ERP 사용자 시딩 완료: ${success} 성공 / ${fail} 실패`);
}

async function seedManagerUsers() {
  const results = await Promise.allSettled(
    managerUserData.map((item) =>
      prisma.managerUser.upsert({
        where: { email: item.email },
        update: {
          name: item.name,
          contact: item.contact,
        },
        create: {
          email: item.email,
          name: item.name,
          contact: item.contact,
        },
      }),
    ),
  );

  const success = results.filter((r) => r.status === "fulfilled").length;
  const fail = results.length - success;

  console.log(`🎉 MANAGER 사용자 시딩 완료: ${success} 성공 / ${fail} 실패`);
}

async function main() {
  await seedErpUsers();
  await seedManagerUsers();
}

main()
  .catch((err) => {
    console.error("❌ 시딩 중 오류 발생:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

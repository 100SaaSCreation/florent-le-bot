import path from "node:path";
import { config } from "dotenv";
config({ path: path.resolve(process.cwd(), ".env") });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });

async function run() {
  const n = await prisma.admin.count();
  console.log("Nombre d'admins sur Neon:", n);
  await prisma.$disconnect();
}
run();

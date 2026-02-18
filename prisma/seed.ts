/**
 * Seed sécurisé — Admin Solo (V2.3)
 * Variables : DATABASE_URL, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD
 */
import path from "node:path";
import { config } from "dotenv";

// Chargement explicite de .env au tout début (cwd = racine du projet)
config({ path: path.resolve(process.cwd(), ".env") });

import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL manquant dans .env");

const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "SEED_ADMIN_EMAIL et SEED_ADMIN_PASSWORD doivent être définis dans .env"
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.admin.upsert({
    where: { email },
    update: { passwordHash, name: "Admin Solo" },
    create: {
      email,
      passwordHash,
      name: "Admin Solo",
    },
  });
  console.log("Admin seed OK:", admin.email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

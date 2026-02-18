/**
 * Prisma client singleton (W-3) — Prisma 7 + adapter pg, 100 % gratuit.
 * Utilisé côté serveur uniquement (Server Components, Server Actions).
 */
import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL manquant");

const adapter = new PrismaPg({ connectionString: url });
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

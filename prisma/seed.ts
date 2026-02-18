/**
 * Seed sécurisé — Admin Solo + 4 projets portfolio (V2.5)
 * Variables : DATABASE_URL, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD
 */
import path from "node:path";
import { config } from "dotenv";

config({ path: path.resolve(process.cwd(), ".env") });

import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL manquant dans .env");

const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });

const PROJECTS_SEED = [
  {
    title: "SaaS Analytics",
    description:
      "Tableau de bord temps réel pour équipes produit. Métriques, funnel et alertes. Stack : Next.js, TypeScript, Prisma, Postgres.",
    url: "https://example.com/saas-analytics",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    order: 0,
  },
  {
    title: "Design System",
    description:
      "Bibliothèque de composants et tokens de design pour cohérence produit. Storybook, Tailwind, design tokens. Stack : React, TypeScript, Figma.",
    url: "https://example.com/design-system",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    order: 1,
  },
  {
    title: "API Gateway",
    description:
      "Passerelle unifiée pour microservices : auth, rate limiting, cache. Stack : Node.js, Redis, JWT, OpenAPI.",
    url: "https://example.com/api-gateway",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    order: 2,
  },
  {
    title: "E-commerce Headless",
    description:
      "Vitrine et panier headless, paiement Stripe, stock temps réel. Stack : Next.js, Stripe, Prisma, Neon.",
    url: "https://example.com/ecommerce-headless",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    order: 3,
  },
];

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

  const titles = PROJECTS_SEED.map((p) => p.title);
  await prisma.project.deleteMany({ where: { title: { in: titles } } });
  await prisma.project.createMany({ data: PROJECTS_SEED });
  console.log("Projets seed OK:", PROJECTS_SEED.length, "projets injectés.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

/**
 * Seed V3.0 — Admin + 6 projets (KPIs) + 3 témoignages + parcours pro + stack
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

const PROJECTS = [
  {
    title: "SaaS Analytics",
    description: "Tableau de bord temps réel pour équipes produit. Métriques, funnel et alertes. Next.js, TypeScript, Prisma, Postgres.",
    kpis: "Réduction de 40% du temps de chargement, +25% d’engagement utilisateur.",
    url: "https://example.com/saas-analytics",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    order: 0,
  },
  {
    title: "Design System",
    description: "Bibliothèque de composants et tokens pour cohérence produit. Storybook, Tailwind, Figma.",
    kpis: "−60% de dette UI, livraison de features 2× plus rapide.",
    url: "https://example.com/design-system",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    order: 1,
  },
  {
    title: "API Gateway",
    description: "Passerelle unifiée microservices : auth, rate limiting, cache. Node.js, Redis, JWT, OpenAPI.",
    kpis: "99,9% uptime, latence p95 < 80 ms.",
    url: "https://example.com/api-gateway",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    order: 2,
  },
  {
    title: "E-commerce Headless",
    description: "Vitrine et panier headless, Stripe, stock temps réel. Next.js, Prisma, Neon.",
    kpis: "Lighthouse 100, conversion panier +18%.",
    url: "https://example.com/ecommerce-headless",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    order: 3,
  },
  {
    title: "MVP Startup Health",
    description: "Application santé B2B : suivi patients, tableaux de bord cliniques. React, Node, Postgres.",
    kpis: "MVP livré en 4 semaines, passage en prod sous 48 h.",
    url: "https://example.com/mvp-health",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    order: 4,
  },
  {
    title: "Audit Performance Fintech",
    description: "Audit et refonte des temps de réponse d’une app de paiement. Identification des goulots, optimisations DB et cache.",
    kpis: "Temps de réponse moyen −55%, Core Web Vitals au vert.",
    url: "https://example.com/audit-fintech",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    order: 5,
  },
];

const TESTIMONIALS = [
  { nom: "Marie Dupont", role: "CEO, ScaleUp", texte: "Livraison au doigt et à l’œil, code propre et maintenable. On a repris le MVP en interne sans douleur.", order: 0 },
  { nom: "Thomas Leroy", role: "CTO, Fintech", texte: "L’audit performance a mis en lumière des problèmes qu’on ne voyait plus. Résultats mesurables en quelques semaines.", order: 1 },
  { nom: "Sophie Martin", role: "Product Lead, SaaS B2B", texte: "Design system livré à temps, documentation claire. L’équipe front a gagné en vélocité tout de suite.", order: 2 },
];

const EXPERIENCES = [
  { boite: "Freelance", poste: "Lead Developer & Architect", duree: "2021 — aujourd’hui", order: 0 },
  { boite: "Startup HealthTech", poste: "Développeur Full-Stack", duree: "2019 — 2021", order: 1 },
  { boite: "ESN", poste: "Ingénieur Logiciel", duree: "2016 — 2019", order: 2 },
];

const STACK_ITEMS = [
  { nom: "Next.js", categorie: "Frontend", icone: "▲", order: 0 },
  { nom: "React", categorie: "Frontend", icone: "⚛", order: 1 },
  { nom: "TypeScript", categorie: "Langage", icone: "TS", order: 2 },
  { nom: "Node.js", categorie: "Backend", icone: "⬢", order: 3 },
  { nom: "Prisma", categorie: "Backend", icone: "◉", order: 4 },
  { nom: "PostgreSQL", categorie: "Data", icone: "🐘", order: 5 },
  { nom: "Tailwind", categorie: "Frontend", icone: "◇", order: 6 },
  { nom: "Vercel", categorie: "Tools", icone: "▲", order: 7 },
];

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password) throw new Error("SEED_ADMIN_EMAIL et SEED_ADMIN_PASSWORD requis");

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash, name: "Admin Solo" },
    create: { email, passwordHash, name: "Admin Solo" },
  });
  console.log("Admin seed OK:", email);

  const titles = PROJECTS.map((p) => p.title);
  await prisma.project.deleteMany({ where: { title: { in: titles } } });
  await prisma.project.createMany({ data: PROJECTS });
  console.log("Projets:", PROJECTS.length);

  await prisma.testimonial.deleteMany({});
  await prisma.testimonial.createMany({ data: TESTIMONIALS });
  console.log("Témoignages:", TESTIMONIALS.length);

  await prisma.experience.deleteMany({});
  await prisma.experience.createMany({ data: EXPERIENCES });
  console.log("Expériences:", EXPERIENCES.length);

  await prisma.stack.deleteMany({});
  await prisma.stack.createMany({ data: STACK_ITEMS });
  console.log("Stack:", STACK_ITEMS.length);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

/**
 * Seed V4.0 — Admin + Catégories + 8 projets + 5 leads + 6 témoignages (note/avatar) + 10 FAQ + Métriques + parcours + stack
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

const CATEGORIES = [
  { name: "SaaS", slug: "saas", order: 0 },
  { name: "Design", slug: "design", order: 1 },
  { name: "Backend", slug: "backend", order: 2 },
  { name: "E-commerce", slug: "ecommerce", order: 3 },
  { name: "Santé", slug: "sante", order: 4 },
  { name: "Audit", slug: "audit", order: 5 },
];

const PROJECTS = [
  { title: "SaaS Analytics", description: "Tableau de bord temps réel. Next.js, TypeScript, Prisma.", kpis: "−40% temps chargement, +25% engagement.", url: "https://example.com/saas-analytics", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", order: 0, slug: "saas" },
  { title: "Design System", description: "Composants et tokens. Storybook, Tailwind, Figma.", kpis: "−60% dette UI, 2× vélocité.", url: "https://example.com/design-system", imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", order: 1, slug: "design" },
  { title: "API Gateway", description: "Passerelle microservices. Node.js, Redis, JWT.", kpis: "99,9% uptime, p95 < 80 ms.", url: "https://example.com/api-gateway", imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", order: 2, slug: "backend" },
  { title: "E-commerce Headless", description: "Vitrine + Stripe. Next.js, Prisma, Neon.", kpis: "Lighthouse 100, conversion +18%.", url: "https://example.com/ecommerce", imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", order: 3, slug: "ecommerce" },
  { title: "MVP Startup Health", description: "App santé B2B. React, Node, Postgres.", kpis: "MVP 4 semaines, prod 48 h.", url: "https://example.com/mvp-health", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", order: 4, slug: "sante" },
  { title: "Audit Performance Fintech", description: "Audit et refonte temps de réponse.", kpis: "−55% réponse, CWV au vert.", url: "https://example.com/audit-fintech", imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80", order: 5, slug: "audit" },
  { title: "Dashboard BI", description: "Visualisation données métier. React, D3.", kpis: "Temps de décision −30%.", url: "https://example.com/bi", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", order: 6, slug: "saas" },
  { title: "Portail Client", description: "Espace client sécurisé. Next.js, Auth.", kpis: "NPS +12 points.", url: "https://example.com/portail", imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", order: 7, slug: "saas" },
];

const LEADS = [
  { email: "lead1@example.com", name: "Alice Martin", message: "Bonjour, nous cherchons un MVP pour une app de réservation. Budget 15k, délai 6 semaines.", category: "projet", status: "NEW" as const },
  { email: "lead2@example.com", name: "Bruno Leroy", message: "Demande d'audit performance sur notre app React (LCP 4s).", category: "audit", status: "NEW" as const },
  { email: "lead3@example.com", name: "Claire Dupont", message: "Refonte design system existant. Combien de sprints pour un premier livrable ?", category: "projet", status: "NEW" as const },
  { email: "lead4@example.com", name: "David Bernard", message: "Intéressé par un accompagnement technique long terme (3–6 mois).", category: "autre", status: "NEW" as const },
  { email: "lead5@example.com", name: "Emma Petit", message: "Nous avons un backend Node à faire évoluer. Estimation pour un discovery ?", category: "projet", status: "NEW" as const },
];

const TESTIMONIALS = [
  { nom: "Marie Dupont", role: "CEO, ScaleUp", texte: "Livraison au doigt et à l’œil, code propre. On a repris le MVP en interne sans douleur.", note: 5, avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie", order: 0 },
  { nom: "Thomas Leroy", role: "CTO, Fintech", texte: "L’audit performance a mis en lumière des problèmes qu’on ne voyait plus. Résultats en quelques semaines.", note: 5, avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas", order: 1 },
  { nom: "Sophie Martin", role: "Product Lead, SaaS B2B", texte: "Design system livré à temps, documentation claire. Vélocité front en hausse.", note: 5, avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie", order: 2 },
  { nom: "Lucas Moreau", role: "Founder, HealthTech", texte: "MVP livré en 4 semaines comme promis. Équipe réactive et pro.", note: 5, avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas", order: 3 },
  { nom: "Julie Faure", role: "Tech Lead", texte: "Accompagnement structurant. On a gagné en qualité et en délais.", note: 4, avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Julie", order: 4 },
  { nom: "Nicolas Roux", role: "CPO", texte: "Recommandé sans hésiter. Clair, rapide, livrable.", note: 5, avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nicolas", order: 5 },
];

const FAQ_ITEMS = [
  { question: "Combien de temps pour un MVP ?", reponse: "Un MVP livrable en 4 à 6 semaines pour un périmètre bien cadré. On fixe ensemble les priorités.", theme: "Délais", order: 0 },
  { question: "Vous travaillez en remote ?", reponse: "Oui. Collaboration asynchrone, points sync courts si besoin.", theme: "Délais", order: 1 },
  { question: "Audit performance : livrables ?", reponse: "Rapport détaillé (goulots, métriques avant/après), recommandations priorisées, mise en œuvre possible.", theme: "Audit", order: 2 },
  { question: "Stack imposée ou sur-mesure ?", reponse: "Sur-mesure. Next.js, React, Node, Prisma sont des choix fréquents ; on s’adapte à votre existant.", theme: "Technique", order: 3 },
  { question: "Quels tarifs pour un MVP ?", reponse: "Forfait ou T&M selon la phase. Discovery puis proposition détaillée.", theme: "Tarifs", order: 4 },
  { question: "Facturation et modalités ?", reponse: "Facturation en fin de mois ou par milestone. Acompte possible pour les gros projets.", theme: "Tarifs", order: 5 },
  { question: "SLA et support après livraison ?", reponse: "Inclus : 30 jours de correctifs. Au-delà, forfait support ou T&M.", theme: "Support", order: 6 },
  { question: "Confidentialité et NDA ?", reponse: "NDA possible. Code et données restent votre propriété.", theme: "Juridique", order: 7 },
  { question: "Travaillez-vous avec des agences ?", reponse: "Oui, en sous-traitance technique ou renfort sur des sprints.", theme: "Projet", order: 8 },
  { question: "Délai pour démarrer ?", reponse: "Sous 1 à 2 semaines après accord, selon charge en cours.", theme: "Délais", order: 9 },
];

const METRICS = [
  { label: "Conversion rate", value: "12", unit: "%", order: 0 },
  { label: "Total Leads", value: "24", unit: "", order: 1 },
  { label: "Projets livrés", value: "8", unit: "", order: 2 },
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
  console.log("Admin OK");

  await prisma.category.deleteMany({});
  const cats = await Promise.all(CATEGORIES.map((c) => prisma.category.create({ data: c })));
  const slugToId = Object.fromEntries(cats.map((c) => [c.slug, c.id]));
  console.log("Catégories:", cats.length);

  await prisma.project.deleteMany({});
  for (const p of PROJECTS) {
    const { slug, ...rest } = p;
    await prisma.project.create({
      data: { ...rest, categoryId: slugToId[slug] ?? null },
    });
  }
  console.log("Projets:", PROJECTS.length);

  await prisma.lead.deleteMany({});
  await prisma.lead.createMany({ data: LEADS });
  console.log("Leads:", LEADS.length);

  await prisma.testimonial.deleteMany({});
  await prisma.testimonial.createMany({ data: TESTIMONIALS });
  console.log("Témoignages:", TESTIMONIALS.length);

  await prisma.faq.deleteMany({});
  await prisma.faq.createMany({ data: FAQ_ITEMS });
  console.log("FAQ:", FAQ_ITEMS.length);

  await prisma.metric.deleteMany({});
  await prisma.metric.createMany({ data: METRICS });
  console.log("Métriques:", METRICS.length);

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

# STATE.md — Registre d'état technique (V2.6)

**Dernière mise à jour :** 2025-02-18  
**Projet :** florent-le-bot  
**Branche :** main

---

## 1. État du dépôt

| Élément        | Statut |
|----------------|--------|
| Git            | OK — dépôt initialisé, branch `main` |
| Remote origin  | `https://github.com/100SaaSCreation/florent-le-bot.git` — **push OK** |
| Production     | **https://florent-le-bot.vercel.app** (Vercel) |
| Dernier commit | `feat(V2.6): Cadre légal, SEO, 404, Expertise, Phase 7` |
| Déploiement Phase 5 | ✅ **Déployé en prod** (vercel deploy --prod) |
| Déploiement Phase 6 | ✅ **Push + vercel --prod** — V2.5 en ligne (grille, bio, base peuplée) |
| Phase 7         | 🟢 **Ouverte — Vitrine Pro & Conformité** (légal, SEO, 404, Expertise) |

---

## 2. Stack & dépendances

- **Runtime :** Next.js 16.1.6, React 19.2.3
- **Styles :** Tailwind CSS 4
- **Base de données :** Prisma 7.4.0 — client généré dans `src/generated/prisma`
- **Config Prisma :** `prisma.config.ts` (DATABASE_URL via `.env`)
- **Tests :** Vitest 4, Playwright 1.58 — scripts `test`, `test:run`, `test:e2e`, `test:e2e:ui`
- **Sécurité :** Snyk — script `security`
- **DB :** scripts `db:generate`, `db:migrate`, `db:studio`. **Neon :** neonctl + dotenv installés ; `.env.example` pour DATABASE_URL.

---

## 3. Schéma de données (Prisma)

**Fichier :** `prisma/schema.prisma`

- **Admin** : id, email (unique), passwordHash, name, createdAt, updatedAt — table `admin`
- **Session** : id, adminId, token (unique), expiresAt, createdAt — table `session`, FK Admin, index sur adminId, token, expiresAt
- **Project** : id, title, description, url, imageUrl, order — table `project` (portfolio)

- **Provider :** PostgreSQL
- **Migrations :** `prisma/migrations`
- **Neon :** Projet **florent-le-bot** (ID `snowy-glade-71111421`), région `aws-eu-central-1`. Migration `init_admin_solo` appliquée. DATABASE_URL dans `.env` et sur Vercel (production + preview).

---

## 4. Arbre de décision (W-Force)

| Zone        | Composants / Fichiers | W-Force |
|-------------|------------------------|---------|
| Noyau       | Prisma, API Dashboard, Middleware Admin | W-3 |
| Module      | Logique métier, formulaires, Hooks     | W-2 |
| Unité       | Composants UI (Cards, Typo), utilitaires| W-1 |

---

## 5. Mémoire récursive (/docs/system/)

| Fichier   | Rôle |
|-----------|------|
| STATE.md  | Registre d'état (ce fichier) |
| AUDIT.md  | Journal de sécurité |

---

## 6. Métadonnées JSON (scores / état)

```json
{
  "phase": 7,
  "phase5_validated": true,
  "phase6": "Esthétique & Contenu",
  "phase4_complete": true,
  "phase5": "Optimisation & Livraison",
  "phase3_complete": true,
  "security_layer": "Middleware Active",
  "target": "Lighthouse 100",
  "production_url": "https://florent-le-bot.vercel.app",
  "neon_project_id": "snowy-glade-71111421",
  "prisma": "schema_admin_solo_+_project",
  "admin_crud": "createProject, updateProject, deleteProject (Server Actions)",
  "image_formats": "webp, avif (next.config)",
  "seo": "metadataBase, openGraph, twitter (layout)",
  "design": "V2.5 — Grille cartes portfolio pro, bio « Artisan du web… », Geist, grain papier, WCAG AAA, images Unsplash (next.config remotePatterns)",
  "admin_visibility": "aucun lien public vers /admin (accès direct uniquement)",
  "home_page_html_kb": "~10",
  "docs_system": "state_audit",
  "github": "100SaaSCreation/florent-le-bot",
  "github_push": "ok",
  "snyk": "installed",
  "audit": "pnpm_audit_clean_after_overrides",
  "vitest": "installed",
  "playwright": "installed",
  "scripts": "test, test:run, test:e2e, test:e2e:ui, security, db:generate, db:migrate, db:studio, db:seed",
  "phase3_validated": true,
  "neonctl": "installed",
  "vercel_linked": true,
  "db_migrate": "init_admin_solo_+_add_project",
  "coffre_fort": "SECRETS.md (gitignored)",
  "deployment_phase5": "done",
  "last_deploy": "vercel --prod (aliased florent-le-bot.vercel.app)",
  "lighthouse_performance": 0.99,
  "lighthouse_accessibility": 1,
  "constraints": "poids < 120 Ko, contraste WCAG AAA conservé",
  "phase6_push": "done (commit fd851b6)",
  "phase6_deploy": "done (vercel --prod, design V2.4 vérifié en prod)",
  "phase6_status": "Active — Base peuplée & Design Pro",
  "seed_projects": "4 projets (SaaS Analytics, Design System, API Gateway, E-commerce Headless), images Unsplash",
  "admin_credentials": "SECRETS.md (gitignored), synchroniser avec .env pour db:seed",
  "phase7": "Vitrine Pro & Conformité",
  "legal_routes": "/mentions-legales, /confidentialite (W-1, contenu type : éditeur, Vercel, Neon, RGPD)",
  "seo_pro": "robots.ts (disallow /admin, /login), sitemap.ts dynamique, favicon icon.tsx (F sur fond crème)",
  "ux_v2_6": "not-found.tsx design Carnet + retour accueil, section Expertise (SaaS, Audit, Design System), footer Mentions légales · Confidentialité"
}
```

---

## 7. Prochaines actions (INDEXEUR)

**Phase 3 (Prisma Implementation) :** ✅ **Terminée** — Neon provisionné, migration appliquée, Vercel déployé.

**Phase 4 :** ✅ **Complétée** — Middleware, login, session, portfolio vitrine, SECRETS.md gitignored, admin CRUD projets (Server Actions).

**Phase 5 :** ✅ **Validée** — Déploiement final, Lighthouse 99/100 Perf, 100/100 Accessibilité.

**Phase 6 :** 🟢 **Active — Base peuplée & Design Pro** — Seed 4 projets fictifs, grille cartes, bio, admin optimisé.

**Phase 7 :** 🟢 **Ouverte — Vitrine Pro & Conformité** — Cadre légal : /mentions-legales (éditeur, hébergeur Vercel, données Neon), /confidentialite (données, cookies, RGPD). SEO : robots.txt (disallow /admin, /login), sitemap.xml dynamique, favicon « F » sur fond crème (icon.tsx). UX : 404 personnalisée design Carnet + bouton retour accueil ; section Expertise (Développement SaaS, Audit performance, Design System) ; footer Mentions légales · Confidentialité.

1. Lancer un audit Lighthouse après déploiement pour confirmer 100/100.
2. Relancer `pnpm security` (Snyk) après `snyk auth` si besoin.
3. `pnpm test:run` et `pnpm test:e2e` — consigner dans COVERAGE.md si créé.

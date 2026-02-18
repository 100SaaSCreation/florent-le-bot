# STATE.md — Registre d'état technique (V2.4)

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
| Dernier commit | `feat: Design V2.4 - Geist, grain SVG, fade-in, empty state, smooth scroll` |
| Déploiement Phase 5 | ✅ **Déployé en prod** (vercel deploy --prod) |
| Déploiement Phase 6 | ✅ **Push GitHub + vercel --prod** — design V2.4 en ligne |

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
  "phase": 6,
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
  "design": "V2.4 — Geist, hiérarchie suisse, letter-spacing titres, grain papier 0.02, fade-in sections, hover cartes, smooth scroll, empty state inspirant",
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
  "phase6_deploy": "done (vercel --prod, design V2.4 vérifié en prod)"
}
```

---

## 7. Prochaines actions (INDEXEUR)

**Phase 3 (Prisma Implementation) :** ✅ **Terminée** — Neon provisionné, migration appliquée, Vercel déployé.

**Phase 4 :** ✅ **Complétée** — Middleware, login, session, portfolio vitrine, SECRETS.md gitignored, admin CRUD projets (Server Actions).

**Phase 5 :** ✅ **Validée** — Déploiement final, Lighthouse 99/100 Perf, 100/100 Accessibilité.

**Phase 6 :** ✅ **Push & déploiement effectués** — Commit `fd851b6` poussé sur GitHub, `vercel --prod` exécuté. **https://florent-le-bot.vercel.app** affiche le design V2.4 (Bienvenue, empty state « La page blanche attend l'encre », Contact). Typo Geist, grain papier, fade-in, smooth scroll en production.

1. Lancer un audit Lighthouse après déploiement pour confirmer 100/100.
2. Relancer `pnpm security` (Snyk) après `snyk auth` si besoin.
3. `pnpm test:run` et `pnpm test:e2e` — consigner dans COVERAGE.md si créé.

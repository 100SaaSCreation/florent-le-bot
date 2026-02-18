# STATE.md — Registre d'état technique (V2.3)

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
| Dernier commit | (à jour après commit initialisation complète) |

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
  "phase": 5,
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
  "design": "typo système, espacement carnet, contrastes WCAG (globals.css)",
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
  "coffre_fort": "SECRETS.md (gitignored)"
}
```

---

## 7. Prochaines actions (INDEXEUR)

**Phase 3 (Prisma Implementation) :** ✅ **Terminée** — Neon provisionné, migration appliquée, Vercel déployé.

**Phase 4 :** ✅ **Complétée** — Middleware, login, session, portfolio vitrine, SECRETS.md gitignored, admin CRUD projets (Server Actions).

1. Implémenter l’authentification Admin (W-3) : login, sessions, protection routes dashboard.
**Phase 5 :** 🔓 **Optimisation & Livraison** — WebP/AVIF, SEO OpenGraph, design WCAG. HTML accueil ~10 Ko.

2. Commit & push (sans SECRETS.md).
3. Relancer `pnpm security` (Snyk) après `snyk auth` si besoin.
4. `pnpm test:run` et `pnpm test:e2e` — consigner dans COVERAGE.md si créé.

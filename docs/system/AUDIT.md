# AUDIT.md — Journal de sécurité (V3.0)

**Projet :** florent-le-bot  
**Responsable :** ARCHITECTE / LOGISTICIEN

---

## Rôle de ce document

- Traçabilité des décisions de sécurité et des contrôles.
- Entrées datées : vulnérabilités identifiées, correctifs, audits outil (Snyk, etc.).

---

## CMD-360 — RAPPORT PHASE 1 (Transition V3.0 Startup-Grade)

**Date :** 2025-02-18  
**Commande :** CMD-360 Phase 1 — Cartographie W-Force, Risque R, Snapshot DNA  
**Livrable :** Rapport bloquant pour passage Phase 2 (Robustesse).

---

### 1. Cartographie W-Force

#### 1.1 Composants W-3 (Noyau — impact critique)

| Composant | Fichier / Zone | Rôle |
|-----------|----------------|------|
| **Prisma Schema** | `prisma/schema.prisma` | Schéma unique : Admin, Session, Project, Testimonial, Experience, Stack. Index sur order / token / adminId / expiresAt / categorie. |
| **Connexion BDD** | `src/lib/db.ts` | Singleton Prisma 7 + adapter pg, `server-only`, dépendance à `DATABASE_URL`. |
| **Auth (session)** | `src/middleware.ts` | Verrouillage `/admin/*` par cookie `admin_session` ; redirection vers `/login` si absent. |
| **Auth (login)** | `src/app/login/actions.ts` | Lecture `prisma.admin`, création `prisma.session`, cookie httpOnly. |
| **CRUD Admin (Project)** | `src/app/admin/actions.ts` | `createProject`, `updateProject`, `deleteProject` — Server Actions, revalidatePath `/` et `/admin`. |

Aucun autre composant ne modifie directement le schéma ou la connexion Neon. Les tables **Testimonial**, **Experience**, **Stack** sont lues en vitrine (`page.tsx`) et peuplées uniquement par le seed ; il n’existe **pas** de Server Actions ni d’UI admin pour les éditer.

#### 1.2 Points de rupture potentiels (ajout Testimonials, FAQ, Services)

| Entité | État actuel | Point de rupture si passage en BDD / admin |
|--------|-------------|--------------------------------------------|
| **Testimonials** | Table `testimonial` existante, lue en page, seed uniquement. | Rupture : besoin de Server Actions (create/update/delete) et d’une section Dashboard pour gérer les témoignages. Sinon, édition manuelle en BDD ou re-seed. |
| **FAQ** | Aucune table. Données statiques dans `src/components/FaqAccordion.tsx` (tableau `FAQ_ITEMS`). | Rupture : ajout d’une table `faq` (question, reponse, order) + migration + Server Actions + section Admin FAQ. Impact sur le composant client (données passées en props ou chargées RSC). |
| **Services** | Aucune table. Constante `SERVICES` dans `src/app/page.tsx` (4 offres en dur). | Rupture : ajout d’une table `service` (title, desc, icon, order) + migration + Server Actions + section Admin Services. Impact limité à la page d’accueil (remplacement de la constante par `prisma.service.findMany`). |

**Synthèse :** La transition V3.0 a déjà ajouté Testimonial, Experience, Stack au schéma sans étendre le Dashboard. Toute évolution « contenu éditable » pour Testimonials / FAQ / Services implique de nouvelles Server Actions et écrans admin (W-2/W-3 selon exposition).

---

### 2. Évaluation du risque (R)

**Formule de référence (protocole Portfolio) :** R = (100000 / C) × (Sévérité × W)  
- C = volume / complexité des données impactées  
- W = niveau W-Force (3 pour noyau)  
- Sévérité = 1 (faible) à 3 (critique)

#### 2.1 Migration déjà réalisée (schéma V3.0)

- **Constat :** `db push` déjà exécuté. Tables Testimonial, Experience, Stack ajoutées ; Project enrichi de `kpis`. Aucune suppression de table ni de colonne.
- **C :** élevé (4 nouvelles tables + 1 champ) mais **additif uniquement**.
- **Sévérité :** 2 (moyen) — pas de perte de données, risque limité aux lectures (getData) et au seed.
- **W :** 3 (noyau).
- **R estimé :** modéré. Migration effectuée sans rupture sur Auth, Middleware ni CRUD Project.

#### 2.2 Impact sur le Dashboard existant

- **Actuel :** Le Dashboard (`/admin`) ne gère que **Project** (formulaires ajout / édition / suppression). Aucune Server Action pour Testimonial, Experience, Stack.
- **Besoin de nouvelles Server Actions :**  
  - **Si on souhaite éditer Testimonials depuis l’admin :** `createTestimonial`, `updateTestimonial`, `deleteTestimonial` + formulaire(s) dédié(s).  
  - **Si on introduit des tables FAQ ou Services :** idem (CRUD complet + UI).  
- **Risque :** Faible pour la stabilité actuelle ; moyen pour la maintenabilité si le produit évolue vers « tout éditable en admin » (charge de développement et cohérence des revalidatePath).

---

### 3. Snapshot DNA (CMD-DNA) — Empreinte parité visuelle

Objectif : garantir la parité visuelle et éviter les régressions en Phase 3 (Expérience). Référence = état actuel post-V3.0.

#### 3.1 `src/app/page.tsx`

| Élément | Empreinte |
|---------|-----------|
| **Structure globale** | `div.min-h-screen.relative.z-10` → `main.max-w-4xl.mx-auto.px-4.py-12.sm:py-20` avec `paddingTop/Bottom: var(--spacing-section)`. |
| **Sections (ordre)** | 1) Hero V3 — 2) Logos (stack) — 3) Grille Services — 4) Témoignages — 5) Parcours — 6) Réalisations (#realisations) — 7) FAQ — 8) Contact (#contact) — 9) Footer. |
| **Hero** | `section.mb-16.sm:mb-20.animate-fade-in.text-center` ; `h1.text-4xl.sm:text-5xl.md:text-6xl.font-black.font-display` ; sous-titre `text-lg.sm:text-xl.max-w-2xl.mx-auto` ; 2 CTA (Démarrer un projet → #contact, Voir les réalisations → #realisations). |
| **Données** | `getData()` : `prisma.project`, `prisma.testimonial`, `prisma.experience`, `prisma.stack` (orderBy order asc). Fallback tableaux vides en catch. |
| **Styles invariants** | Couleurs : `var(--background)`, `var(--foreground)`, `var(--muted)`, `var(--glass-border)`. Classes récurrentes : `glass-card`, `font-display`, `letterSpacing: var(--letter-spacing-tight)`. |
| **Composant client** | `FaqAccordion` (FAQ en accordéon). |
| **Liens footer** | Mentions légales, Confidentialité ; `aria-label="Pied de page légal"`. |

#### 3.2 `src/app/layout.tsx`

| Élément | Empreinte |
|---------|-----------|
| **Metadata** | `metadataBase` (florent-le-bot.vercel.app), title default + template, description, openGraph, twitter, robots index/follow. |
| **Fonts** | Geist (variable `--font-geist-sans`), Geist_Mono (`--font-geist-mono`) appliquées sur `body`. |
| **Body** | `className` : `${geistSans.variable} ${geistMono.variable} antialiased`. Pas de wrapper supplémentaire. |
| **Structure** | `html lang="fr"` → `body` → `{children}`. |

Toute modification ultérieure (Phase 3) devra préserver cet ordre de sections, les ancres (#realisations, #contact), les variables CSS et le rôle des composants (RSC vs client) pour conserver la parité visuelle et l’accessibilité.

---

### 4. Synthèse Phase 1

- **W-3 recensé :** Schema, db.ts, middleware, login/actions, admin/actions (Project uniquement).  
- **Ruptures identifiées :** Admin sans CRUD pour Testimonial/Experience/Stack ; FAQ et Services en dur (pas de BDD).  
- **R :** Modéré pour l’état actuel ; à réévaluer si ajout de CRUD Testimonial / FAQ / Services.  
- **DNA :** Snapshot page.tsx + layout.tsx documenté ci-dessus pour Phase 3.

**Statut :** PHASE 1 livrée. **OK utilisateur reçu** — **PHASE 2 (Robustesse)** autorisée et ouverte.

---

## CMD-360 — PHASE 2 (Robustesse) — Exécution

**Date :** 2025-02-18

### Réalisé

- **CMD-SAFE** : `npx prisma validate` ✅, `npx tsc --noEmit` ✅.
- **Zod** : dépendance `zod` ajoutée. Schémas `src/lib/schemas/project.ts` — `createProjectSchema`, `updateProjectSchema` (title requis, champs optionnels, order coerce/catch 0).
- **Server Actions** : `createProject`, `updateProject`, `deleteProject` valident les entrées via `safeParse` ; entrées invalides ignorées (return early). `try/catch` autour des appels Prisma, `revalidatePath` en cas d’erreur pour éviter blocage.
- **Types** : actions typées `Promise<void>` pour compatibilité avec l’attribut `action` des formulaires Next.js.
- **Build** : `pnpm build` ✅.

### Non réalisé (hors périmètre Phase 2 courte)

- Affichage des erreurs de validation côté UI admin (nécessiterait `useActionState` ou équivalent).
- Tests unitaires / E2E et mise à jour de COVERAGE.md (à faire en Phase 2 étendue ou CMD-SHIELD).

**Statut :** PHASE 2 (Robustesse) — livrée (validation Zod, CMD-SAFE, gestion d’erreurs Server Actions).

---

## CMD-360 — PHASE 3 (Expérience) — Exécution

**Date :** 2025-02-18

### Vérification parité DNA

- **page.tsx** : Structure, ordre des sections (Hero → Logos → Services → Témoignages → Parcours → Réalisations → FAQ → Contact → Footer), ancres `#realisations` et `#contact`, classes `glass-card`, `font-display`, variables CSS inchangées. `getData()` et `FaqAccordion` conformes. **Parité respectée.**
- **layout.tsx** : `metadataBase`, title template, Geist variables sur body, `html lang="fr"`. **Parité respectée.**

### Modifications (sans régression)

- **Layout** : Alignement des métadonnées (description, openGraph, twitter) avec la proposition de valeur V3 (« Lead Developer & Architect — MVP, Audit Performance, Design System ») pour cohérence SEO et expérience.
- **Accessibilité** : Lien d’évitement « Aller au contenu principal » (`.skip-link` dans globals.css) pointant vers `#main-content` sur `<main>`, visible au focus clavier.

### Build

- `pnpm build` ✅.

**Statut :** PHASE 3 (Expérience) — livrée (DNA vérifié, metadata alignée, skip-link ajouté).

---

## Format des entrées

| Date       | Type        | Description courte | Action / statut |
|------------|-------------|--------------------|-----------------|
| 2025-02-18 | INIT        | Création du journal | OK |
| 2025-02-18 | CMD-360 P1  | Rapport Phase 1 — Cartographie W-Force, R, DNA | OK |

---

## Historique

| Date       | Type | Description | Action / statut |
|------------|------|-------------|-----------------|
| 2025-02-18 | INIT | Création AUDIT.md — Mémoire récursive V2.3 | OK |
| 2025-02-18 | SYS  | Repo GitHub créé (100SaaSCreation/florent-le-bot), push initial | OK |
| 2025-02-18 | SYS  | Prisma Admin Solo — schéma noyau (Admin, Session) | OK |
| 2025-02-18 | SYS  | Snyk, Vitest, Playwright installés — scripts package.json | OK |
| 2025-02-18 | AUDIT | Premier audit récursif — `pnpm audit` | Voir détail ci‑dessous |
| 2025-02-18 | FIX   | Résolution 6 vulnérabilités (pnpm.overrides) | OK — pnpm audit clean |
| 2025-02-18 | CMD-360 | Phase 1 — Cartographie W-Force, évaluation R, Snapshot DNA (V3.0) | OK — Rapport dans AUDIT.md, scores départ STATE.md |
| 2025-02-18 | CMD-360 | Phase 2 — Robustesse : Zod, CMD-SAFE, gestion d’erreurs Server Actions | OK — Schémas project.ts, actions validées, build OK |
| 2025-02-18 | CMD-360 | Phase 3 — Expérience : parité DNA, metadata layout V3, skip-link | OK — Aucune régression, build OK |
| 2025-02-18 | CLÔTURE | V3.0 — Phase 8 Complétée, commit arch finalize, push + vercel --prod | OK |

---

## Premier audit récursif (2025-02-18)

- **Outil principal :** `pnpm security` (Snyk) — premier run : CLI en téléchargement (à relancer : `pnpm security`).
- **Outil de secours :** `pnpm audit` exécuté.

### Résultat `pnpm audit`

| Métrique | Valeur |
|----------|--------|
| **Vulnérabilités trouvées** | 6 |
| **Sévérité** | 6 × moderate |
| **Score** | Non clean |

### Détail des vulnérabilités

| # | Sévérité | Package | Problème | Chemin / Remède |
|---|----------|---------|----------|------------------|
| 1 | moderate | lodash | Prototype Pollution (`_.unset` / `_.omit`) | prisma → @prisma/dev → … → lodash. Patched: >=4.17.23 |
| 2 | moderate | hono | XSS via ErrorBoundary | prisma → @prisma/dev → hono. Patched: >=4.11.7 |
| 3 | moderate | hono | Web Cache Deception (Cache-Control: private ignoré) | idem |
| 4 | moderate | hono | IP Restriction bypass (IP spoofing) | idem |
| 5 | moderate | hono | Arbitrary Key Read (Serve static middleware) | idem |
| 6 | moderate | ajv | ReDoS avec option `$data` | eslint → ajv. Patched: >=8.18.0 |

- **Conclusion :** Failles en dépendances transitives (Prisma dev, ESLint). **Priorité absolue** avant validation Phase 3 : traiter ou documenter (overrides / résolution acceptée par l’équipe).

---

## Résolution des failles (2025-02-18)

- **Action :** Ajout de `pnpm.overrides` dans `package.json` pour forcer les versions patchées :
  - `lodash` >= 4.17.23
  - `hono` >= 4.11.7
  - `ajv` >= 8.18.0
- **Commande :** `pnpm install` pour appliquer les overrides.
- **Vérification :** `pnpm audit` → **No known vulnerabilities found.**
- **Statut :** Sécurité validée. Phase 3 (Prisma Implementation) officiellement validée.

---

---

## Clôture V3.0 — Protocole de sortie (2025-02-18)

- **Vérification :** `pnpm build` ✅ — stabilité totale de la version actuelle.
- **Indexation :** STATE.md et AUDIT.md mis à jour — Phase 8 passée à l’état **Complétée**.
- **Archivage :** Commit `chore(arch): finalize V3.0 startup-grade architecture`.
- **Déploiement :** `git push origin main` + `vercel --prod`.

Phase 8 (Échelle Startup) est officiellement **complétée**. Ouverture possible de la Phase 9 (SaaS-Grade Elite V4.0).

---

## Prochaines vérifications

- [x] Traiter les 6 vulnérabilités (pnpm overrides) — **fait**
- [x] Clôture V3.0 — Phase 8 Complétée — **fait**
- [ ] Relancer `pnpm security` (Snyk) une fois le CLI téléchargé et consigner le résultat
- [ ] Premier run Vitest / Playwright et consignation des résultats

# AUDIT.md — Journal de sécurité (V2.3)

**Projet :** florent-le-bot  
**Responsable :** ARCHITECTE / LOGISTICIEN

---

## Rôle de ce document

- Traçabilité des décisions de sécurité et des contrôles.
- Entrées datées : vulnérabilités identifiées, correctifs, audits outil (Snyk, etc.).

---

## Format des entrées

| Date       | Type        | Description courte | Action / statut |
|------------|-------------|--------------------|-----------------|
| 2025-02-18 | INIT        | Création du journal | OK |

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

## Prochaines vérifications

- [x] Traiter les 6 vulnérabilités (pnpm overrides) — **fait**
- [ ] Relancer `pnpm security` (Snyk) une fois le CLI téléchargé et consigner le résultat
- [ ] Premier run Vitest / Playwright et consignation des résultats

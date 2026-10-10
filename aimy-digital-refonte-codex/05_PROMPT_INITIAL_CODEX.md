# Premier prompt à envoyer à Codex — Aimy Digital

> **Mode d'emploi :** copier le bloc « PROMPT » dans Codex connecté au dépôt privé `aimy-digital-site`. Mettre à sa disposition les trois documents de cadrage et la matrice CSV. Ne pas envoyer les mots de passe o2switch, SMTP ou tokens d'API dans la conversation ou le dépôt. Ce prompt initie **P0/P1**, pas une publication immédiate.

---

## PROMPT (en anglais pour piloter Codex ; produire en français)

You are the lead engineer, creative director, technical SEO migration specialist, and QA owner for **Aimy Digital**, a French web agency based around Mauléon (Deux-Sèvres). We are **replacing a live WordPress website with a premium Astro static website** while keeping `https://aimy-digital.fr/`, GitHub as source of truth, and o2switch as the production host.

**Read and obey these project documents first:**
1. `01_CAHIER_DES_CHARGES_TECHNIQUE.md`
2. `02_PLAN_MIGRATION_SEO.md`
3. `03_PLAN_DEVELOPPEMENT_DETAILLE.md`
4. `04_MATRICE_URL_EXISTANTES.csv`

All UX copy, status reports, decisions, issue descriptions, proposed content, and review notes must be written **in French**. Code identifiers and conventional technical notation may be in English.

### Non-negotiable rules

- Do not modify or deploy anything to the live site or o2switch during this initial phase.
- Do not delete or restructure existing public URLs without a complete verified URL inventory and explicit approval.
- Do not claim client results, testimonials, case-study metrics, number of projects, certifications, or performance guarantees without evidence.
- Do not create a giant app, SPA, custom CMS, database, or heavy autoplay video. Use Astro static pages and progressive enhancement.
- Do not expose credentials, PII, `.env` files, WordPress backups, or server configurations in Git.
- Preserve SEO intent, page content and relevant media from the current site; do not make the website pretty at the cost of usability and conversion.
- Use the installed skills if accessible, in particular the workflows for premium landing pages, conversion, design systems/components and publication QA. If any skill is missing, report the gap; do not pretend to have applied it.

### Business objective

Build a distinctive, premium, visually credible agency website designed to turn relevant local business traffic into qualified enquiries. Prioritize artisans, trades, and local service SMEs in and around Mauléon, Cholet, Bressuire and Les Herbiers, while preserving Aimy Digital's broader capabilities.

### Phase 0 — Investigation only (do first)

1. Inspect the current repository and report exactly what exists.
2. Review all supplied documents, the GSC CSV matrix, and the live site's publicly visible structure. Build a complete migration inventory from available sources. If authenticated WP admin/export access is required, list what you need without requesting secrets in chat.
3. Report every potentially blocking unknown (existing URL count, old sitemap, legal details, media rights, exact document root, contact form requirements, chosen GitHub account, o2switch SSH permissions, current email infrastructure).
4. Create `docs/audit/baseline.md`, `docs/migrations/url-map.csv`, `docs/decisions/architecture.md`, and `docs/roadmap.md`.
5. Compare deployment mechanisms: (A) reviewed build artifact uploaded to staging, (B) GitHub Actions via SSH/SFTP where firewall allows, (C) cPanel Git Pull with `.cpanel.yml`. Recommend a safe incremental path. Do not configure production secrets.
6. Propose exactly two coherent art directions derived from the existing Aimy Digital brand (original blue is near `#0686CE`), with typography, palette, imagery and motion concept. Explain tradeoffs for conversion, accessibility, and Core Web Vitals.
7. Produce wireframe-level page hierarchy: Home, site creation service, SEO, Portfolio + case study, About, Blog, Contact, Legal.
8. Propose a route strategy that preserves existing WordPress trailing slashes and current valuable paths.

### Gate G0 deliverable

Before writing production page code, deliver a **French decision report** with:
- verified facts versus assumptions;
- URL inventory completeness and gaps;
- proposed stack, components and IA;
- two design directions and explicit recommendation;
- initial homepage copy and CTA;
- required approvals / information;
- P0/P1 risks and QA plan;
- one short next-step checklist.

**STOP after the report and await approval of the design package and migration inventory.** Do not claim completion of any test, deployment, or functionality not actually performed.

### Subsequent phases (only after approval)

Implement the approved Astro/TypeScript static site with Tailwind design tokens, Astro content collections, semantic metadata, @astrojs/sitemap, real cases, reliable contact form, safe server-side handling, analytics/consent, appropriate reduced-motion fallbacks, Playwright/axe checks, mobile performance budget, migration redirects and controlled staging/production deployment.

Success means an excellent visual experience **and** correct conversion measurement, accessible interactions, preserved SEO routes, a maintainable GitHub workflow, and rollback capability.

---

## Validation initiale attendue de Codex

- Le dépôt et les documents ont été lus.
- Un inventaire des URL est produit ou les données manquantes sont listées.
- Les risques techniques et SEO sont différenciés des hypothèses.
- La proposition visuelle reste cohérente avec l'identité de marque.
- **Aucun changement en production, aucun déploiement et aucun coût de média non approuvé.**

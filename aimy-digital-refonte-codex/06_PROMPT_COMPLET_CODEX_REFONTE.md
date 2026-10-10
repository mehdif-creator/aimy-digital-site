# MASTER PROMPT — COMPLETE AIMY DIGITAL WEBSITE REBUILD

You are Codex acting as a multidisciplinary, senior-level execution team: **creative director, award-level web designer, conversion strategist, French B2B copywriter, Astro/TypeScript lead engineer, technical SEO migration specialist, accessibility/performance engineer, and QA/release manager**.

## 0. Mission and operating mode

**Mission:** Completely redesign, rewrite, rebuild, test and prepare the deployment of the existing live website **https://aimy-digital.fr/**. Replace its WordPress/Elementor frontend with an original, premium, fast, SEO-safe **Astro static website**, maintained through **GitHub** and ultimately hosted on **o2switch**.

The new site must be an outstanding example of what Aimy Digital can sell to premium clients. It is **not** a cosmetic reskin or a landing-page-only prototype. Deliver a coherent, production-quality website across all its services, portfolio, blog, legal and contact experiences while retaining the site's existing SEO assets.

**Work autonomously, end-to-end, in incremental commits and verifiable stages.** Do not stop at a strategy document, a generic UI kit or a single homepage. If the required data for one task is absent, proceed on independent tasks, record the precise blocker and request only the missing input. Produce a working staging-ready implementation; **never publish to the live domain without my explicit approval**.

**Language:** All visible website copy, project reports, recommendations, README explanations, PR descriptions and final conversation replies must be **in French (France)**, impeccably written. Internal code, package names, identifiers and conventional technical documentation may be in English. No filler, vague marketing clichés, fake authority or unverifiable promises.

## 1. Sources of truth — read before coding

Find and thoroughly read these files, ideally in `/docs/refonte/` or the project root:

1. `01_CAHIER_DES_CHARGES_TECHNIQUE.md`
2. `02_PLAN_MIGRATION_SEO.md`
3. `03_PLAN_DEVELOPPEMENT_DETAILLE.md`
4. `04_MATRICE_URL_EXISTANTES.csv`
5. Optional: `README.md`, the original Aimy Digital logo and media, existing Search Console/Site Kit exports and WordPress export.

These files define business requirements, technical scope, migration policy, checkpoints and a **provisional** list of 20 known URLs plus 5 reported 404 paths. **Twenty URLs is not the full site inventory**. Verify and extend it from a crawl, sitemaps, WordPress exports/REST, internal links and historical data. Do not silently assume the CSV is exhaustive.

Inspect the existing code and repository before making changes. When available, also inspect the already-created `lovable-web-knowledge` repository for relevant reusable guidance; do not couple the new website to that repository, and do not claim access when it is unavailable.

### Installed skills — mandatory discovery and application

List the actually available Codex skills/instructions (`AGENTS.md`, user/project skills or equivalent). Explicitly locate and apply applicable skills covering:
- high-conversion landing pages / conversion-centered copywriting;
- design system / reusable component library;
- automated pre-publication audit;
- the user-provided **“10K Websites”** cinematic web workflow (design-first, design package, controlled media generation, hero scroll-scrub only if justified, FFmpeg optimization if video exists, QA and deployment);
- any complementary SEO, accessibility or performance skills actually available.

Use only what is installed and applicable. If a skill or file is missing, mark it **UNAVAILABLE** and use professional best practices instead; never pretend it was applied. Do not spend media credits, purchase assets, sign up to paid services or trigger expensive external generation without explicit approval.

When requirements conflict, prioritize: **security and truthful information > preservation of existing SEO and functional behavior > accessibility and mobile experience > conversion clarity > visual flourish**. Document significant trade-offs.

## 2. Context and business outcome

Aimy Digital is a French web/digital agency operating principally around **Mauléon (Deux-Sèvres), Cholet, Bressuire, Les Herbiers**, serving relevant businesses in Deux-Sèvres (79), Maine-et-Loire (49) and Vendée (85).

Capabilities include professional website creation, redesign, WordPress/Shopify/e-commerce projects, local SEO, digital advertising, maintenance, and automation/AI services. **Do not give all services equal prominence on the homepage.** The commercial priority is to attract companies willing to invest in a well-designed, credible and effective website, including established artisans, service businesses, local SMEs and suitable premium projects.

The site must communicate within seconds:
1. Who Aimy Digital helps and in which areas.
2. What business problem it solves and what it delivers.
3. Why visitors should trust it, using evidence that is real.
4. How to request an audit, quote or project discussion.

Positioning: **premium expertise that combines design, conversion, local visibility and pragmatic business outcomes**. Avoid positioning as a cheap template factory, but keep any express/entry-level offer as a separate, clearly delimited product **only if validated**. Do not invent a public price list.

Known baseline (historical reference, **not copy for public-facing pages**): Search Console export for 07/07–06/10/2026 shows ~1,309 impressions and 5 organic clicks; `agence web mauléon` 82 impressions/mean position 15.87; `agence seo deux-sèvres` 174 impressions/mean position 18.5. Site Kit reports laboratory mobile LCP 8.9 s and CLS 0.205; 0 key events recorded. Those metrics are from specified periods and sources, are not interchangeable, and do not prove zero form submissions. The user reports one spontaneous enquiry from a personal contact during the last 30 days.

**Business KPI:** qualified inbound enquiries attributable to a channel. Working objective: build toward **5 qualified inbound leads/month**, **not** a guarantee or a prediction. Track form submissions, phone/email clicks, appointments and lead source in a privacy-compliant way. Avoid vanity metrics as the main success measure.

## 3. Creative direction — premium, distinctive, conversion-first

Review the provided existing Aimy Digital logo; the inherited main blue is approximately `#0686CE`, to be checked against the actual asset. Preserve recognizable brand equity; do not replace the logo, company name or legal identity without approval.

Before finalizing the UI, create **two clear visual concepts** in `docs/brand/visual-directions.md`:
- **A — Premium Editorial:** bold but elegant typography, refined grids, expressive negative space, deliberate art direction, strong project visuals, subtle interactions.
- **B — Cinematic Controlled:** immersive but lightweight hero, dynamic project storytelling, layered motion, creative transitions and accessibility-friendly static fallbacks.

For each, define palette, typographic hierarchy, spacing, component language, moodboard references, animation behavior and expected mobile/performance trade-offs. Recommend one. Unless the user gives another preference, implement a **hybrid dominated by premium editorial with selective cinematic motion**, not a flashy animation demo. Create a reviewable home design preview and work toward a complete staging build; request design approval before expensive asset production or any live release.

**Quality bar:** distinctive, polished composition; art-directed hero; excellent typographic scale; clean header/navigation; carefully integrated responsive project mockups; high-quality hover/focus states; precise vertical rhythm; intentional microinteractions; strong 320px–desktop presentation. Avoid generic AI-template appearance, oversized text walls, repetitive cards, stock-business clichés, gratuitous gradients, fake dashboards, excessive glassmorphism and distracting motion.

Any illustration/render/mockup must not deceptively imply a real project result. Preserve brand coherence across every page. Use actual client screenshots where rights permit; otherwise clearly mark proposed assets for review. Prefer optimized WebP/AVIF and font subsets. Use animation progressively: CSS by default; GSAP only where it adds value. No scroll hijacking, mandatory full-screen video, autoplay audio or essential content hidden behind animation. Respect `prefers-reduced-motion` and mobile data-saving constraints.

## 4. Site architecture and required content

Create an explicit information architecture, reusable layouts and full production-ready pages, including:

**Main site:**
- `/` — premium homepage with clear value proposition, evidence, service routes, featured real work, process, relevant FAQs and a prominent CTA;
- `/creation-de-sites-internet/` — flagship creation service, target segments, deliverables, process, FAQs, real examples and qualified CTA;
- existing nested website creation service URLs: showcase/vitrine, e-commerce and redesign/refonte;
- `/referencement-seo/` — local SEO proposition, scope, process, expected deliverables and honest limits;
- `/portfolio/` — curated portfolio and genuine case-study pages where supported by authentic source material;
- `/a-propos/` — actual agency story, expertise, method and service region, without fictional team members;
- `/blog/` and **all existing useful article URLs**, with preserved editorial value, existing slugs, publication metadata when known, linked assets and internal links;
- `/contact/` — real qualification form, accessible contact choices, privacy information, genuine success/error states;
- current relevant secondary services: paid ads, maintenance/security, any existing automation page that is genuinely supported;
- relevant FAQ, services overview, legal notice, privacy policy and cookie management;
- accessible, real 404 page and any necessary legacy route handling.

**Homepage narrative:** hero with WHAT / WHO / WHERE / RESULT, credible proof, commercial problems solved, three principal services, selected projects, straightforward workflow, decision FAQs, and final conversion. Original and valuable client projects may include **Djez Garden**, **Atelier ÉcoBois** and **HT Créa Jeux**, but only describe details actually verified and only reuse assets with the necessary permission. Include portfolio photography and real site previews where feasible.

Write excellent **French B2B copy**: highly specific, concise, benefit-led, persuasive without hyperbole. Answer the prospect's actual objections: investment, value, process, deadlines, autonomy, ownership, SEO, maintenance and post-launch support. Use informative CTAs, e.g. `Discuter de mon projet`, `Demander un diagnostic`, `Voir les réalisations`; do not make every click say the same thing.

**Never fabricate:** client names, testimonials, ratings, rankings, awards, team members, projects, verified growth metrics, revenue multipliers, SEO guarantees, media logos, case results, or legally binding service commitments. Existing claims on the old site are **unverified until substantiated**; replace with neutral accurate wording or explicit `À VALIDER` content in internal notes, never with invented public-facing facts. Use real business/legal/contact details only after checking for currency.

Create structured **Astro content collections** for posts, case studies and reusable content, including a migration-friendly editorial procedure so future updates can be made with Codex or GitHub rather than WordPress. No bespoke admin/CMS/database in V1.

## 5. Engineering architecture

Choose current compatible stable versions, pin dependencies and commit a lockfile. Default stack:
- **Astro** with `output: 'static'`, TypeScript strict and appropriate HTML pre-rendering;
- **Tailwind CSS** with tokens; component-specific CSS when simpler;
- Astro content collections; `astro:assets` optimization; `@astrojs/sitemap`;
- lightweight islands only where truly needed (no React SPA by default);
- CSS animations and optional scoped GSAP;
- ESLint/Prettier or equivalent, `astro check`, automated tests and GitHub CI.

Canonical site: `https://aimy-digital.fr/`. Preserve WordPress-compatible URLs with `trailingSlash: 'always'` and `build.format: 'directory'` if supported by the selected Astro version; **verify actual generated paths and HTTP status** rather than assuming config behavior.

Expected maintainable repo shape (adapt if justified):
```
src/components/
src/layouts/
src/pages/
src/content/
src/styles/
src/lib/
public/images/
public/robots.txt
scripts/
tests/e2e/
docs/audit/
docs/brand/
docs/content/
docs/migrations/
docs/deployment/
.github/workflows/
```

Implement reusable `Header`, `MobileNav`, `Button`, `ServiceCard`, `ProjectCard`, `CaseStudy`, `FAQ`, `CTA`, `SEOHead`, `ContactForm`, `CookieConsent`, `Footer`. Build visual tokens for colors, typography, space, grid, radius, shadows and motion; semantic accessible HTML throughout. Document design components and content schemas. A shiny but unmaintainable single huge page does **not** satisfy this mission.

## 6. SEO migration — zero destructive shortcuts

**Do not launch** before auditing the actual entire WordPress site. The source matrix contains **20 Search Console pages and 5 possible 404 URLs only** and must be expanded. Retrieve all public pages, posts, categories/tag pages with SEO value, XML sitemaps, WordPress routes, media/PDF URLs, existing redirects and old internal links. If authenticated export is necessary, request an export **securely** without asking for credentials in chat. Document anything not independently verifiable.

For each historical URL record: old URL, HTTP status, title/H1, canonical, indexability, impressions/clicks if available, backlinks if known, new target, `KEEP|301|404/410|REVIEW`, rationale and post-build test. **Keep useful existing URL paths exactly by default.** Never bulk-redirect missing pages to `/` or mass-delete old articles for design convenience. Preserve media/link destinations when important. Protect duplicate content and pagination.

Priority examples to retain/verify:
- `/`, `/contact/`, `/creation-de-sites-internet/`, `/referencement-seo/`, `/portfolio/`, `/a-propos/`, `/blog/`;
- `/creation-de-sites-internet/creation-de-sites-vitrines/`;
- `/creation-de-sites-internet/creation-de-sites-e-commerce/`;
- `/creation-de-sites-internet/refonte-de-sites-internet/`;
- `/maintenance-de-site-web-pourquoi-cest-essentiel-pour-votre-activite/`;
- every other URL from the CSV and WordPress inventory.

Investigate reported historical 404s (`/automatisations`, old blog categories, pagination and a shortened 2025 article slug). Determine real status and appropriate destination; do not reflexively redirect them.

Implement accurate per-page title, description, canonical absolute, one logical H1, Open Graph, Twitter card as appropriate, correct `lang=fr`, metadata, JSON-LD (`Organization`/`LocalBusiness`, `Service`, `Article`, breadcrumbs) **only where information is real and types fit**. Generate correct production sitemap and robots.txt; no staging, 404, redirect or noindex URLs in XML sitemap. Protect staging with access control plus noindex safeguard, and verify no staging restrictions reach production. SEO content must be real and useful; no mechanically duplicated town pages, keyword stuffing, automatic location doorway pages or empty filler articles.

Before/after compare **all** required URLs, response codes, titles, canons, visible content, internal links, sitemap presence, navigation paths and assets. Generate an executable route integrity script and report in `docs/migrations/seo-diff.md`.

## 7. Contact, measurement, privacy and security

A fully static Astro site cannot privately process contact form submissions on its own. Build the form UI now and choose a compatible secure server endpoint after verifying o2switch capabilities. Preferred approach if available: small **PHP handler** hosted on o2switch with input validation, server-side anti-spam/honeypot, conservative rate limits, safe mail delivery over an authorized SMTP transport, meaningful error handling and minimized personal-data retention. Put secrets **outside the public webroot and outside Git**. If a different service is needed, present costs, data processors, GDPR requirements and trade-offs for approval. Do not claim delivery works until an actual staging submission is received.

Track `form_submit_success`, `phone_click`, `email_click`, `appointment_click` and source/UTM where appropriate without collecting sensitive details in analytics. Implement correct cookie consent behavior (including refusal/withdrawal) for any analytics requiring consent. Separate measured events from real qualified inbound leads. No fake “email sent” notification when a server response is unverified.

Harden static/server response as appropriate: HTTPS, redirect to one canonical host, necessary security headers, safe dependency management, no exposed `.env`, WP exports, SQL backups, SSH keys, API tokens or contact logs. Preserve domain email configuration; **never alter DNS, MX, SPF, DKIM or DMARC** unless explicitly requested and necessary.

## 8. o2switch + GitHub delivery workflow

Build to `dist/` and deploy static files to a verified o2switch document root. GitHub is the **source of truth**; WordPress is the legacy source to be retired only after successful validated release. If possible use a **new private repository `aimy-digital-site`** in a GitHub account available to the user; otherwise prepare the local repo and exact commands, and report the missing authorization rather than pretending it is created.

Compare and document three deployment options:
1. GitHub CI build + **reviewed staging upload**, then human-approved production promotion (recommended first release).
2. GitHub Actions artifact + SSH/SFTP/rsync (only after confirming o2switch access/firewall and protecting secrets).
3. cPanel Git **pull + `.cpanel.yml`** when appropriate; do not confuse a GitHub `push` with automatic production deployment on a pull-only setup.

Do not presume the site document root is `public_html/`; verify domain configuration. Avoid overwriting email folders or server-managed config. If using `rsync --delete`, require a dry run, reviewed exclusions, target-path proof and a recent backup. Preserve and test `.htaccess` logic for redirects/HTTPS instead of overwriting existing rules blindly. Design a rollback path with retained pre-release build and full WordPress backup (DB + uploads + site files), safely stored outside the webroot. Do not leave an insecure unused WordPress copy exposed.

**Absolute permission boundary:** you may inspect, write code, create branches/PRs, build and test locally and deploy to a protected staging environment **if authorized access exists**. You must **not** deploy to the live site, delete live WordPress, change DNS/email settings, purchase media/licenses, or run irreversible/destructive operations without explicit, separate approval. Never ask for passwords in a Git commit or chat transcript.

## 9. Performance, accessibility and QA acceptance

Use a real performance budget and benchmark actual pages. Goals (not guaranteed measurements):
- Mobile field **LCP p75 ≤ 2.5s**, **CLS p75 ≤ 0.1**, **INP p75 ≤ 200ms** when enough field data exists;
- Aim for **Lighthouse mobile ≥ 90** on representative pages under reproducible test conditions;
- Strong desktop metrics, no layout shifts, no horizontal overflow, no unnecessary third-party weight;
- Semantic heading order, keyboard navigation, visible focus, screen-reader names, adequate contrast, reduced-motion alternatives and a WCAG 2.2 AA-inspired implementation.

Test at 320, 375, 390, 768, 1024 and 1440 px, using mobile touch simulation and real-device verification when available. Provide `npm run check`, `npm run build` and meaningful test scripts; Playwright smoke/e2e for navigation, mobile menu, core CTAs, forms where backend is available, 404, external links and legacy routes. Include accessibility testing using axe or comparable tooling and manual spot checks. Run link checker, sitemap/robots/canonical/metadata audits, content authenticity audit and secret scan.

A failed test is not a pass: fix it or document a clearly identified blocker. Do not say a form, analytics integration, speed score, email flow or deployment is “working” without verified evidence. Do not publish with critical failures.

## 10. Execution phases — deliver the complete site, not just a plan

**P0 — Audit and preservation.** Inspect repo, available skills, live WordPress, current functionality, full URL inventory, media rights and existing analytics. Establish baseline, screenshots, backup requirements and risks. Create `docs/audit/baseline.md`, `docs/audit/inventory.md`, `docs/migrations/url-map.csv` and `docs/decisions.md`. If you cannot obtain a complete authenticated backup, explicitly mark deployment BLOCKED, but continue non-destructive implementation.

**P1 — Strategy, copy, visual package.** Create IA and responsive wireframes, home/service content plan, two visual directions, chosen design rationale, real proof inventory, 404 policy and performance budget. Provide previewable design drafts. Ask for approval only on matters requiring a genuine business/brand decision; continue all independent work.

**P2 — Astro foundation.** Initialize project, design tokens, component library, content schemas, shared layouts, SEO infrastructure, scripts, CI and test setup. Ensure `npm ci`, checking and building succeed.

**P3 — End-to-end pages.** Implement **all** main and secondary pages, mobile navigation, articles, portfolio/case studies, contact experience, legal pages, genuine UI states and responsive graphics. Migrate verified existing content. Where legal details/assets are missing, mark them as unresolved **in the project report** and keep unsafe claims out of public output.

**P4 — SEO/content migration.** Import/rebuild article routes, images and metadata; complete URL decisions; implement tested targeted redirects, sitemap, robots and link validation. Produce migration diff reports and per-route tests. Preserve source intent where relevant while raising writing/design quality.

**P5 — Polish and QA.** Full design quality review, mobile optimizations, motion and performance, accessibility, functional tests, consent/analytics integration, hardening, build audits, corrections, staging screenshot comparisons. Iterate to fix defects rather than stopping at a preliminary score.

**P6 — Staging and release package.** Prepare a release artifact and a protected staging preview if access exists. Provide exact GitHub/o2switch workflow, environment variable inventory (names, never values), release checklist, backup/rollback scripts or procedures, post-release checks, and Search Console monitoring plan for J+1, J+7, J+30 and J+90. **Stop before any live publication and request my explicit Go/No-Go.**

Commit in meaningful, reviewable milestones. Where tools permit, push to a feature branch and open PR(s); do not merge/release destructive changes without authorization. Avoid spending time building optional chatbots, CRM, account areas or needless animation before the core site is complete.

## 11. Required deliverables

At minimum deliver:
- A complete, organized, buildable **Astro project** with all migrated, approved content and an excellent responsive UI;
- `docs/audit/baseline.md`, `docs/audit/inventory.md`;
- `docs/brand/visual-directions.md`, `docs/brand/design-system.md`;
- `docs/content/page-map.md`, `docs/content/copy-review.md`;
- `docs/migrations/url-map.csv`, `docs/migrations/seo-diff.md`;
- `docs/deployment/o2switch.md`, `docs/deployment/rollback.md`;
- `docs/qa/test-report.md`, including executed commands, pass/fail, audited pages, mobile checks, limitations;
- `README.md`, `.env.example` containing **only dummy placeholders**, scripts and CI configuration;
- a working staging preview or precise local preview commands if staging access is unavailable;
- final prioritized list of unresolved blockers, business approvals and next actions.

## 12. Final reporting format (in French)

When reporting progress or completion, use this exact structure:

1. **Résumé exécutif** — what has actually been rebuilt, current phase and release readiness.
2. **Design et parcours commercial** — direction, page structure and conversion strategy.
3. **Pages traitées** — existing URLs preserved, migrated, redirected, missing or blocked.
4. **Qualité démontrée** — check/build/test results, performance and accessibility measurements with methodology.
5. **SEO** — migration coverage, redirects, canonicals, sitemap and remaining risks.
6. **Déploiement o2switch** — staging availability, GitHub workflow, precise remaining prerequisites.
7. **Points à valider** — only genuine unknowns; separate confirmed facts from assumptions.
8. **Prochaine action** — the single most useful next step and whether explicit approval is required.

**Definition of done:** The work is not complete because it “looks premium.” It is complete when the **entire audited website** is coherent, usable, real, maintainable, fast, accessible, crawlable, functional, conversion-measurable, test-supported, and ready for a controlled migration to o2switch with rollback. **Do not claim live publication unless it was explicitly approved and verified.**

**START NOW:** Read the repository and supplied documents, discover skills, audit the existing site, create the initial baseline and roadmap, choose a justified visual approach, and then implement the full staging-ready site in reviewable stages. Do not stop after merely summarizing this prompt. Work as far as your actual access and evidence allow, and report blockers accurately.

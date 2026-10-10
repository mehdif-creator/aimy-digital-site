# AIMY DIGITAL — Cahier des charges technique et fonctionnel

**Version :** 1.0 — 10 octobre 2026  
**Projet :** refonte de `https://aimy-digital.fr/`  
**Décision prise :** abandon de WordPress pour le site de l'agence, développement avec Astro/TypeScript par Codex, versionnement GitHub, déploiement statique sur o2switch.  
**Statut :** cadrage prêt à remettre à Codex ; validations métiers et accès d'hébergement encore nécessaires.

## 1. Contexte vérifié et problème à résoudre

- Aimy Digital propose notamment création/refonte de sites internet, SEO local, publicité digitale et maintenance pour les TPE/PME, principalement Deux-Sèvres (79), Maine-et-Loire (49) et Vendée (85).
- Le site actuel manque de visibilité commerciale mesurable. L'export Search Console du 07/07/2026 au 06/10/2026 comptabilise environ **1 309 impressions et 5 clics organiques**. L'accueil reçoit 4 clics, Contact 1 clic. La requête « agence web mauléon » reçoit 82 impressions avec une position moyenne de 15,87 ; « agence seo deux-sèvres », 174 impressions à 18,5.
- Le rapport Site Kit (12/07/2026–09/10/2026) indique un **LCP mobile de laboratoire de 8,9 s**, un **CLS mobile de 0,205** et 0 événement clé enregistré (configuration de suivi à vérifier ; ne signifie pas nécessairement zéro formulaire réellement soumis).
- L'utilisateur mentionne un seul contact spontané en 30 jours, venant d'une relation personnelle : pas encore de canal inbound reproductible prouvé.
- Le logo fourni contient un bleu proche de **#0686CE**, ainsi que du gris ; la nouvelle direction artistique peut réinterpréter la marque, mais toute modification définitive du logo et de la palette doit être validée.

### Objectif business

Faire du site **un outil de réassurance et de qualification commerciale**. Une visite doit rapidement comprendre : pour qui travaille Aimy Digital, quel résultat concret le client peut obtenir, avec quelles preuves et comment obtenir un diagnostic ou un devis.

### Objectifs mesurables

| Mesure | Exigence de lancement | Objectif de suivi |
|---|---|---|
| Conversions | Formulaire, clic téléphone et prise de rendez-vous testés et mesurables après consentement pertinent | Compter les prospects entrants **qualifiés** par canal chaque mois |
| Leads entrants | Aucun chiffre fictif, attribution documentée | Cible initiale de gestion : **5 prospects qualifiés entrants/mois**, non garantie |
| Performances | Aucune régression bloquante du parcours mobile | LCP p75 terrain ≤2,5 s ; CLS p75 ≤0,1 ; INP p75 ≤200 ms lorsqu'un volume terrain suffisant est disponible |
| Tests laboratoire | Audits Lighthouse reproductibles | Viser ≥90/100 mobile sur pages principales, sans sacrifier l'expérience réelle |
| SEO | Toutes les URL jugées stratégiques maintenues ou correctement redirigées | Pas de rupture d'indexation évitable ; suivi J+7/J+30/J+90 |
| Accessibilité | Navigation clavier complète, contraste, alternatives médias, focus visibles | Conception inspirée de WCAG 2.2 niveau AA |
| Exploitation | Sauvegarde, rollback, dépendances et secrets documentés | Déploiement répétable et contrôlé |

Ces seuils sont des **objectifs de recette** et non des promesses de référencement ou de ventes.

## 2. Cibles et positionnement

**Cible prioritaire (à valider) :** artisans et entreprises de services avec panier moyen suffisant, implantés autour de Mauléon, Cholet, Bressuire et Les Herbiers ; dirigeants qui veulent une présence crédible et davantage de demandes de devis.

**Cible secondaire :** PME commerciales cherchant une refonte, du SEO local ou une acquisition client plus structurée. La création de boutiques e-commerce reste une offre accessible, mais ne doit pas diluer le message principal.

**Proposition de valeur de travail :** « Nous concevons des sites internet premium qui rendent votre entreprise crédible, visible et simple à contacter. »

**À ne pas promettre :** premières positions garanties sur Google, hausse de chiffre d'affaires invérifiable, « ROI garanti », délais irréalistes, témoignages inventés.

**CTA principal :** « Obtenir un diagnostic de votre présence en ligne » (réelle réponse humaine et délais clairement indiqués).  
**CTA secondaire :** « Voir nos réalisations » puis « Parler de mon projet ».

## 3. Architecture de l'information et périmètre V1

### Navigation conseillée

- Accueil
- Création de sites internet (déclinaisons vitrine/e-commerce/refonte dans le menu si besoin)
- Référencement SEO
- Réalisations
- À propos
- Blog
- Contact

Offres secondaires accessibles depuis « Prestations » : publicité, maintenance, automatisation ; **ne pas supprimer arbitrairement les URL existantes**.

### Pages V1 impératives

| Page | Mission de conversion | Contenu minimum |
|---|---|---|
| Accueil `/` | Expliquer, prouver, qualifier | Hero clair ; cibles ; avantages ; services ; projets ; méthode ; preuves ; FAQ utile ; CTA |
| Création de sites `/creation-de-sites-internet/` | Vendre site premium | Pour qui ; livrables ; exemples ; déroulé ; FAQ ; CTA ; transparence tarifaire si validée |
| SEO `/referencement-seo/` | Capter l'intention SEO locale | Audit ; SEO local ; livrables ; processus ; limites ; CTA |
| Portfolio `/portfolio/` | Montrer le niveau de réalisation | 3–5 dossiers réels avec captures et contexte vérifié ; liens clients si autorisés |
| Contact `/contact/` | Recevoir une demande utilisable | Formulaire opérationnel et sécurisé ; téléphone/e-mail ; informations minimales ; accusé réception |
| À propos `/a-propos/` | Réassurer | Présentation exacte de l'agence, méthode, zone desservie, compétences réelles |
| Blog `/blog/` et articles | Préserver la visibilité existante | Migration éditoriale et SEO, dates/authors vérifiées |
| Pages légales | Conformité | Mentions légales, confidentialité, informations sur cookies selon outils installés |
| 404 | Réorienter | Message utile, recherche ou liens, code HTTP 404 réel |

**Pages secondaires :** conserver toutes les URL métier apparues dans Search Console tant que le statut éditorial n'est pas validé ; voir la matrice CSV du dossier et le document 02.

### Trame conseillée de l'accueil

1. En-tête discret, logo vectorisé et CTA.
2. Hero en une phrase : cible + résultat + zone ; un visuel cinématique léger ou composition premium.
3. Bande de preuves authentifiées (projets, méthodologie, avis réels ; pas de faux chiffres).
4. Trois résultats commerciaux : être crédible, être trouvable, obtenir des demandes.
5. Trois offres principales, puis liens vers offres secondaires.
6. Réalisations mises en contexte (avant/après si réels et autorisés).
7. Déroulé simple : diagnostic → stratégie → production → livraison & accompagnement.
8. FAQ de décision (prix, délai, gestion du contenu, propriété du site, maintenance).
9. Bloc conversion final et coordonnées complètes.

## 4. Design system / signature visuelle

**Principe :** premium sobre, **pas une démo d'effets spéciaux**. L'esthétique doit servir compréhension, confiance et mémorisation.

- Reprendre le bleu du logo actuel comme référence de départ (environ #0686CE), avec palette de neutres cohérente ; ne pas remplacer la marque sans accord.
- Définir dans un fichier de tokens : couleurs, échelles typographiques, espaces, rayons, largeurs de conteneur, contrastes, états focus/hover/disabled et règles de mouvement.
- Typographie lisible, caractère éditorial maîtrisé ; limiter les familles et graisses réellement chargées.
- Composants réutilisables : `Header`, `Navigation`, `MobileMenu`, `Button`, `Container`, `SectionHeading`, `ProjectCard`, `ServiceCard`, `CaseStudy`, `CTA`, `FAQ`, `ContactForm`, `Footer`, `SEOHead`, `CookieConsent`.
- Design mobile d'abord : 320 px à écrans larges, navigation au clavier, images adaptatives, aucun défilement horizontal.
- Présenter **deux directions visuelles** avant d'écrire les pages : (A) éditorial premium, (B) cinématique subtil. Valider une direction et la décliner ; ne pas mélanger des styles incompatibles.
- Toute photo de réalisation doit correspondre à un vrai projet. Les rendus conceptuels ou mockups doivent être explicitement identifiés lorsque nécessaire.

### Animations / media

- GSAP seulement là où CSS ne suffit pas ; pas d'animation obligatoire pour lire/atteindre le CTA.
- Hero : image optimisée par défaut ; vidéo facultative après test et validation commerciale/performance.
- Pas de scroll-hijacking, parallax lourd ni autoplay sonore ; respecter `prefers-reduced-motion`, `Save-Data`, appareils modestes.
- Prévoir un fallback statique pour chaque élément cinématique.
- Médias produits selon le workflow « design package → génération contrôlée → compression → QA », sans engager des crédits vidéo avant validation des maquettes.

## 5. Architecture technique détaillée

**Stack V1 :** Astro stable (version figée dans lockfile), TypeScript strict, Tailwind CSS, `@astrojs/sitemap`, intégration de médias Astro (`astro:assets`), GSAP chargé de façon ponctuelle, Markdown/collections Astro pour articles et cas clients. Aucun React/Vue obligatoire.

**Build statique :** `output: 'static'`, `site: 'https://aimy-digital.fr'`, `trailingSlash: 'always'`, build `format: 'directory'` afin de reproduire les URL WordPress se terminant par `/`.

```js
// Configuration cible, à adapter à la version Astro installée.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aimy-digital.fr',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
```

**Dossier attendu :**

```text
src/
  components/        # composants de présentation / conversion
  layouts/           # BasicLayout, ContentLayout, CaseStudyLayout
  pages/             # routes préservant les URL existantes
  content/           # blog, cas clients, données structurées
  styles/            # tokens et styles globaux
  lib/               # SEO, modèles de données, utilitaires
public/
  images/            # originaux statiques, logos, favicons
  robots.txt
  .htaccess          # uniquement si vérifié et validé pour Apache
  api/contact.php    # facultatif si solution PHP choisie après test serveur
scripts/
  check-urls.mjs
  check-seo.mjs
  check-links.mjs
  audit-budgets.mjs
tests/
  e2e/
docs/
  migrations/
.github/workflows/
```

**Codex est le producteur de code ; GitHub est la source de vérité.** Nouveau dépôt `aimy-digital-site` indépendant de `lovable-web-knowledge`. Les skills installés ne doivent pas être supposés disponibles tant que leur activation n'est pas vérifiée dans l'environnement Codex.

### Contenu éditable sans WordPress

- Études de cas et articles : collections de contenu avec métadonnées typées (titre, `description`, slug original, auteur, date, catégorie, image, alt, canonical).
- Mise à jour via commit GitHub ou Codex ; publication à la prochaine compilation.
- Compromis assumé : **pas d'éditeur visuel à la WordPress en V1**. Un CMS Git-based n'est ajouté que si la fréquence de publication le justifie.

### Formulaire de contact : choix à verrouiller

Astro statique ne traite pas une soumission côté serveur à lui seul. Proposer une solution robuste et compatible o2switch :

**Option privilégiée, à valider en préproduction :** endpoint PHP HTTPS sur o2switch (`/api/contact.php`), validation et anti-spam côté serveur, honeypot, limitation de fréquence, protections CSRF/origine selon design, envoi SMTP authentifié. Secrets SMTP hors répertoire public et hors Git ; journaux sans données superflues ; politique de conservation courte et documentée ; accusé de réception non trompeur.

**Alternative si PHP indisponible/complexe :** service de formulaire compatible RGPD et domaine personnalisé, après contrôle des coûts, sous-traitants et traitement des données. Ne jamais mettre une clé API privée dans le JavaScript client.

Tests obligatoires : soumission valide, champs invalides, pièce jointe (si proposée), anti-spam, livraison e-mail, absence d'envoi en double, RGPD, état d'erreur clair, suivi de conversion.

### Hébergement, sécurité, RGPD

- Domaine HTTPS canonique ; HSTS uniquement après validation TLS, formulaires, certificats et sous-domaines concernés.
- CSP adaptée et testée ; headers `X-Content-Type-Options`, `Referrer-Policy`, protection du chemin d'API.
- Ne jamais publier `.env`, exports WordPress, dumps SQL, clés SSH, logs ou données de contacts dans `public/`, `dist/` ou GitHub.
- Consentement valide avant chargement des outils nécessitant des traceurs (notamment GA4 selon la configuration retenue) ; conserver refus/choix ; page confidentialité et informations légales réelles. Faire valider la conformité si besoin.
- Éviter le faux affichage « Avis Google » non synchronisé ou les témoignages inventés. Toutes les données `LocalBusiness`/`Organization` doivent refléter l'existence et l'adresse/zone de service réelles de l'entreprise.
- Sauvegarde WordPress : fichiers, base, médiathèque, réglages SEO, redirections, anciens sitemaps et exports analytiques, au format stockable hors webroot.

## 6. Exigences SEO non négociables

1. Aucune nouvelle arborescence destructive avant inventaire complet des anciennes URL.
2. Préserver autant que possible le domaine et les chemins existants, y compris les très longs slugs d'articles.
3. `title`, `meta description`, H1 pertinent, canonique absolue, Open Graph et carte sociale uniques pour les pages à enjeu.
4. HTML sémantique SSR/prérendu : contenu indexable sans exécuter JavaScript.
5. Sitemap Astro `sitemap-index.xml` uniquement avec URL indexables 200 ; `robots.txt` pointant vers ce sitemap.
6. Maillage entre pages commerciales, blog et cas clients ; fil d'Ariane lorsque utile.
7. Données structurées `Organization`/`LocalBusiness`/`Service`/`Article` uniquement si valides et factuelles, sans promettre d'extrait enrichi.
8. Redirections 301 directes pour les URL réellement remplacées. Erreurs 404/410 explicites pour les URL retirées sans équivalent. Ne jamais renvoyer toutes les anciennes pages vers l'accueil.
9. Ne pas « nettoyer » le contenu existant uniquement parce qu'une page ne reçoit pas de clic : vérifier liens entrants, impressions et pertinence.
10. Maintien des accès Google Search Console et GA4 après migration ; annoter la date de publication.

## 7. Qualité et conformité du rendu

### Recette UX

- Un visiteur sur mobile comprend l'activité, la zone et le prochain pas dans le premier écran.
- CTA principal accessible sans chercher, mais pas masquant les contenus.
- Navigation fonctionnelle clavier, souris et tactile ; menu mobile pleinement utilisable.
- Contact en moins de deux minutes, formulaire testé jusqu'à réception réelle.
- Découverte des projets avec contexte et détails crédibles ; absence de lorem ipsum.

### Recette technique

- `npm run check` et `npm run build` sans erreur.
- Tests E2E Playwright sur desktop/mobile : navigation, formulaire, liens, 404 et CTA.
- Tests axe (accessibilité) sur les pages principales ; vérification manuelle du focus et des animations réduites.
- Lighthouse mobile et desktop sur Accueil, Services, Portfolio, Contact et article ; limites de performance documentées.
- Absence de liens cassés, canonical erronées, mixed content, secrets exposés, noindex involontaires, erreurs console bloquantes.
- Validation des redirections avant/après déploiement, contrôle des codes HTTP réels.

## 8. Hors périmètre V1

- E-commerce Aimy Digital, espace client, portail de paiement.
- CRM complexe, automatisation de prospection, chatbot IA, génération d'images/vidéos à grande échelle.
- Multilingue sans preuve de demande.
- Scroll-scrub vidéo lourd sur chaque page.
- CMS administrable personnalisé développé de zéro.

## 9. Points à confirmer avant la production

1. Aimy Digital souhaite-t-elle conserver le logo actuel (à vectoriser/redessiner proprement) ou autoriser une évolution identitaire ?
2. Quel est le positionnement prioritaire pour les 6 prochains mois : **artisans/PME locales**, ou **sites premium multisecteurs** ? Une recommandation est formulée, mais le fondateur doit arbitrer.
3. Quelles réalisations sont publiables, lesquelles disposent de droits photos et résultats chiffrés vérifiables ?
4. Quelle est l'adresse professionnelle publique, la raison sociale actuelle et les mentions légales applicables ? Ne pas recopier d'anciennes informations non confirmées.
5. Quelles fonctionnalités du site WordPress sont réellement utilisées (newsletter, formulaires, réservations, blog, plugins métiers) ? La parité fonctionnelle doit être validée avant coupure.
6. Les accès o2switch (cPanel, SSH, domaine, SMTP), GitHub et comptes analytiques sont-ils disponibles ? Ne jamais placer les identifiants dans le dépôt.
7. Quel budget réel allouer aux médias premium, aux licences et aux outils, et quel délai commercial maximum avant publication ?

## 10. Sources de référence

- Exports Search Console et Site Kit fournis par l'utilisateur, datés du 10 octobre 2026.
- Site existant : https://aimy-digital.fr/ (consulté le 10/10/2026).
- o2switch Git / cPanel : https://faq.o2switch.fr/cpanel/fichiers/gitweb/
- Astro Sitemap : https://docs.astro.build/fr/guides/integrations-guide/sitemap/
- Astro configuration : https://docs.astro.build/fr/reference/configuration-reference/
- Google, migration d'URL : https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=fr
- CNIL, mesure d'audience et traceurs : https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience

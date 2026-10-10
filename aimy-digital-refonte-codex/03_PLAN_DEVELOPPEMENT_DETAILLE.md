# AIMY DIGITAL — Plan de développement détaillé pour Codex

**Version :** 1.0 — 10 octobre 2026  
**Périmètre :** site Astro statique sur GitHub et o2switch, migration WordPress compatible SEO.  
**Méthode :** étapes courtes, livrables vérifiables, aucun déploiement production avant validation.

## 1. Estimation et séquencement

**Effort initial indicatif : 15 à 30 jours ouvrés de travail** (pour une personne pilotant Codex avec revue du design et contenu disponible). La borne haute augmente si de nombreux articles/produits médias doivent être migrés ou si le hero vidéo est complexe. Les animations premium, la correction des textes et la validation client prennent du temps même avec de l'IA.

| Phase | Durée cible | Résultat vérifiable | Go / No Go |
|---|---:|---|---|
| P0 — Audit et sauvegardes | 1–3 j | Inventaire URL + fonctionnalités + sauvegarde restaurable | Zéro code prod avant clôture |
| P1 — Stratégie, copywriting, design package | 2–4 j | Sitemap fonctionnel, wireframes, 2 directions artistiques et choix validé | Aucune vidéo coûteuse avant accord |
| P2 — Socle Astro / design system | 2–4 j | Structure repo, composants, styles, routes, tests, build | Mobile/desktop et a11y de base validés |
| P3 — Pages commerciales et portfolio | 4–7 j | Accueil + services + portfolio + contact réels | Les CTA/formulaires fonctionnent |
| P4 — Blog, SEO et migration contenu | 3–6 j | Correspondance URL, métadonnées, articles, assets, sitemap | Audit SEO sans faille majeure |
| P5 — QA avancée et staging | 2–4 j | Performance, accessibilité, E2E, revue contenu et mobile | Aucun P0/P1 ouvert |
| P6 — Publication et surveillance | 1–2 j + suivi | Prod contrôlée et suivi J+1/+7/+30 | Rollback disponible |

Les phases peuvent se chevaucher de manière contrôlée. P1 doit toutefois être validée avant une production graphique complète.

## 2. Backlog détaillé par phase

### P0 — Audit, inventaire et sauvegarde

- [ ] Créer nouveau dépôt GitHub **privé** `aimy-digital-site`, séparé de `lovable-web-knowledge`.
- [ ] Recenser les pages WP, URLs historiques, sitemap, articles, images, téléchargements, menus, formulaires, CTA, scripts Analytics, widgets actifs.
- [ ] Charger les 20 URL GSC dans la matrice fournie ; compléter avec crawl WP et les URL à 404.
- [ ] Exporter un backup WordPress COMPLET (SQL + fichiers) et tester sa restauration en environnement isolé.
- [ ] Confirmer la racine documentaire du domaine et les moyens d'accès o2switch (cPanel, SSH, SFTP, Git cPanel).
- [ ] Archiver benchmarks PageSpeed, captures écran desktop/mobile et exports GSC/GA4.

**Livrables :** `docs/audit/`, `docs/migrations/redirect-map.csv`, `docs/audit/baseline.md`.  
**Validation :** chaque URL actuelle est répertoriée, chaque fonctionnalité importante a un équivalent prévu, backup contrôlé.

### P1 — Stratégie, copy et design package

- [ ] Confirmer cible prioritaire, marché géographique et positionnement premium.
- [ ] Préparer arborescence et wireframes mobile/desktop pour Accueil, Service, Étude de cas, Blog, Contact.
- [ ] Rédiger hero, promesses et CTA, sans résultats non prouvés.
- [ ] Définir les contenus « preuve » : vraies réalisations, captures avant/après, témoignages autorisés, chiffres sourcés ou absence de chiffres.
- [ ] Proposer deux design packages contrastés, respectant l'héritage du bleu/logo ou proposant explicitement une évolution à valider.
- [ ] Déterminer les animations strictement utiles et plan médias (photos, mockups, vidéo optionnelle).

**Livrables :** `docs/brand/design-package.md`, `docs/copy/messaging.md`, maquettes prévisualisables, tokens provisoires.  
**Validation :** accord explicite sur une direction graphique, textes d'ouverture, navigation, réalisations exploitables.

### P2 — Socle technique Astro et design system

- [ ] Initialiser Astro avec TypeScript strict, Tailwind et intégration sitemap, package lock commité.
- [ ] Configurer sortie statique, `site` canonique, `trailingSlash: always`, build directory.
- [ ] Installer linter / formatteur / Astro check, Playwright, axe ou alternative ; scripts npm documentés.
- [ ] Construire tokens de marque, typographie, Breakpoints, dark/light si pertinent (pas obligatoire), composants atomiques.
- [ ] Développer `SEOHead` (title, description, canonical, OG), `Organization`/`Service` schemas pilotés par données vraies.
- [ ] Définir structure Collections pour articles et études de cas, validations de schéma des données.
- [ ] CI GitHub sur PR : contrôle types, build, tests de routes, vérification liens et SEO.
- [ ] Première maquette de la page Accueil avec animations limitées ; revue responsive.

**Livrables :** dépôt buildable, socle réutilisable, kit de composants, preview.  
**Validation :** `npm ci`, `npm run check`, `npm run build`, tests smoke passent.

### P3 — Production des pages commerciales

**Accueil :** hero, proposition de valeur, preuves vérifiables, services, réalisations, process, FAQ, CTA.

**Services :** création sites (vitrine, e-commerce, refonte), SEO ; garder aussi publicités/maintenance/automatisation suivant inventaire et priorité, sans effet de dilution de l'accueil.

**Portfolio :** dossiers vrais (priorité Djez Garden, Atelier ÉcoBois, HT Créa Jeux si droits/états validés) avec contexte, mission, contraintes, technologie, images contrôlées et résultats disponibles. Ne pas attribuer des métriques inexistantes.

**Contact :** formulaire validé côté serveur ; bandeau de consentement si requis ; e-mail SMTP reçu et testé ; événements GA4 et gestion d'échec.

**À propos + pages légales :** informations légales à jour et exactes, zones d'intervention réalistes.

**Validation :** tous les liens, CTA et appels fonctionnent en staging ; 0 fausse preuve.

### P4 — Migration blog et SEO

- [ ] Convertir les articles importants WordPress en contenu Astro (frontmatter complet, médias, légendes, alt, liens internes).
- [ ] Rendre toutes les anciennes routes importantes à l'identique ; 301 seulement si bénéfice démontré.
- [ ] Déployer les images utilisées, éventuellement leurs URL historiques si liées par backlinks.
- [ ] Configurer `robots.txt`, sitemap index, canonical absolues, métadonnées uniques et données structurées factuelles.
- [ ] Générer automatiquement un test par URL attendue depuis la matrice ; détecter liens cassés et redirections involontaires.
- [ ] Contrôler les pages qui étaient déjà 404 dans Site Kit et celles dupliquées ou anciennes.

**Validation :** aucune URL GSC à préserver manquante ; nombre total de pages importées concordant avec WordPress et décisions documentées.

### P5 — Performance, qualité et recette

- [ ] LCP mobile : prioriser l'élément hero réel, charger l'image critique, limiter polices/script bloquants.
- [ ] CLS : tailles explicites pour médias, espaces réservés pour éléments dynamiques, transitions sans mouvement de mise en page.
- [ ] INP : limiter GSAP et scripts tiers ; si données terrain insuffisantes, mesurer TBT et tester interactions mobile.
- [ ] Tests 320, 375, 390, 768, 1024, 1440 px et vrai téléphone si disponible.
- [ ] `prefers-reduced-motion` + clavier + focus + contraste + lecteur d'écran sur parcours principal.
- [ ] Test de formulaire de bout en bout, spam, validation, confirmation, protection secrets et confidentialité.
- [ ] Tests SEO : title, H1, description, robots, canonical, sitemap, JSON-LD, URL, HTTP 200/301/404.
- [ ] Vérification consentement et présence des informations légales.
- [ ] Audit des vrais contenus : pas de statistiques obsolètes, modèles de témoignages ni visuels clients trompeurs.

**Validation bloquante :** aucun défaut P0/P1. Une anomalie P2 doit être documentée et acceptée explicitement avant mise en ligne.

### P6 — Publication et exploitation

- [ ] Mettre la version validée dans un dossier de staging o2switch avec accès protégé.
- [ ] Vérifier le mode de publication : **option 1** GitHub Actions build + transfert sécurisé si accès réseau/SSH possible ; **option 2** Git cPanel pull + script de déploiement d'un artefact `dist/` préparé ; **option 3** upload initial manuel du build (moins automatisé mais robuste).
- [ ] Vérifier la règle de nettoyage des vieux fichiers : ne pas exécuter `rsync --delete` sans contrôle du chemin de destination, liste d'exclusions et sauvegarde.
- [ ] Protéger les branches : `main` livrable validé, PR avec CI, tag de release, environnement production protégé.
- [ ] Synchroniser après sauvegarde, tester HTTP, formulaires, certificat, logs, sitemap, Search Console.
- [ ] Noter tag de publication, conserver build précédent et procédure de rollback documentée.
- [ ] Programmer surveillance 1/7/30/90 jours, suivi des vrais prospects générés, ajustements éditoriaux.

**Validation :** retour arrière possible sans migration de données, puisque le front est statique ; le formulaire PHP/SMTP reste un composant serveur à gérer séparément.

## 3. Choix de déploiement recommandés (ordre de maturité)

### Niveau 1 — MVP fiable : build local/CI + staging + publication validée

1. Codex développe sur branche ; PR vers `main` avec tests.
2. CI GitHub génère le dossier `dist/` et archive l'artefact signé/identifié par commit.
3. Sauvegarde de la cible o2switch et copie vers un sous-domaine staging (document root distinct).
4. Tests QA en staging ; validation métier.
5. Publication des mêmes artefacts sur la racine documentaire principale, puis tests postpublication.

**Avantage :** pas de dépendance à une exécution permanente de Node sur o2switch.

### Niveau 2 — Flux sécurisé automatisé (après vérification des accès)

- Branch protection et environment approval GitHub.
- CI build, tests, paquets versionnés ; transfert via SSH/SFTP/rsync si le pare-feu d'o2switch autorise l'origine des connexions et l'authentification est sûre.
- Pas de clés SSH partagées par chat ; secrets dans GitHub Actions, droits minimaux, rotation des clés.
- Alternative documentée par o2switch : cPanel **Pull** depuis GitHub, puis « Deploy HEAD Commit » et `.cpanel.yml`, avec un artefact de build disponible au serveur ou archivé dans un dépôt de déploiement. Le simple `git push` GitHub n'est **pas** équivalent à une mise en production automatique en mode Pull.

**Contrainte connue :** o2switch utilise une liste blanche pour l'accès SSH ; les runners GitHub hébergés peuvent avoir des IP variables. Faire un essai sur staging avant d'annoncer un déploiement 100 % automatique.

## 4. Gates de publication : définition de « terminé »

**Gate G0 — Stratégie :** cibles, promesse, contenus autorisés et URL prioritaires approuvés.  
**Gate G1 — Design :** design package (desktop+mobile), signature visuelle et animations validés, budget média accepté.  
**Gate G2 — Produit :** pages et contenus finalisés, aucune section fictive, formulaire reçu.  
**Gate G3 — SEO :** ancien → nouveau contrôlé, canonical/sitemap/redirects validés.  
**Gate G4 — Technique :** tests automatiques, QA manuelle et sauvegarde/rollback OK.  
**Gate G5 — Production :** version Git taguée, monitoring et mesure conversions opérationnels.

**Refus de mise en production si :** aucune sauvegarde ; formulaire KO ; redirections majeures manquantes ; noindex global ; fuites de secrets ; contenus commerciaux trompeurs ; navigation mobile cassée.

## 5. Registre des risques / compromis

| Décision ou risque | Compromis assumé | Mitigation |
|---|---|---|
| Abandon WordPress | Pas de mise à jour WYSIWYG instantanée | Content Collections + Codex + PR ; CMS Git-based plus tard si besoin |
| Design cinématique | Peut dégrader LCP et mobile | Fallback statique et budgets médias ; vidéo conditionnelle à QA |
| Code assisté IA | Régressions possibles | PR, tests, audits et revue humaine de chaque gate |
| Site statique + formulaire | Serveur nécessaire pour l'envoi | PHP cPanel testé ou prestataire de formulaire conforme |
| Changement de technologie | Risque de chute SEO si URL changées | Mapping complet + conservation en priorité |
| Hébergement mutualisé | Déploiement GitHub Actions SSH non garanti | Prévoir cPanel Pull + transfert manuel sûr en repli |
| Positionnement ultra-premium | Risque de perdre clients à petit budget | Conserver une offre d'entrée visible et ciblée sans dévaloriser la marque |

## 6. Backlog des améliorations après lancement (non bloquant V1)

- Page ciblée Cholet ou Deux-Sèvres appuyée sur des éléments locaux originaux, après analyse des volumes et requêtes.
- Diagnostic interactif uniquement si conversion supérieure démontrée.
- Intégration CRM légère pour attribuer source → RDV → devis → vente.
- Bibliothèque de templates réutilisables sur les projets clients.
- Comparatif test A/B de messages principaux quand volume de trafic suffisant.
- Nouveaux cas clients avec données réelles et témoignages autorisés.

## 7. Définition des profils de responsabilité

**Fondateur :** positionnement, validation design, droits média, retours client, prix, informations légales, recette commerciale finale.  
**Codex :** code, composants, tests, documentation, scripts de migration, propositions design et corrections.  
**Outils de mesure :** fournissent les métriques ; pas de décisions non supervisées fondées sur 5 clics historiques.  
**Hébergeur :** configuration et sécurité serveur selon le compte effectif ; droits d'accès à vérifier.

## 8. Sources techniques

- https://docs.astro.build/en/guides/deploy/
- https://docs.astro.build/fr/guides/integrations-guide/sitemap/
- https://faq.o2switch.fr/cpanel/fichiers/gitweb/
- https://faq.o2switch.fr/guides/webmastering/connexion-ssh/
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=fr

# Portfolio immersif — recette du 10 octobre 2026

## Proposition à approuver

Quatre chapitres grand format remplacent uniquement la grille de l’accueil. Le hero conserve son code d’animation et sa feuille de style au jalon `b96b9c5` ; son titre de liaison devient « Découvrez leurs univers. ». Le bandeau local et les autres sections restent inchangés. L’ancre `apres-realisations` permet de sortir du parcours.

- HT Créa Jeux : papier/ambre, découverte de la boutique et des jeux.
- My NutriZen : vert profond, interface et organisation des repas.
- SC Rénovation : bleu/encre et ambre, réalisations desktop et véritable vue mobile avec devis/appel.
- Lambert Digital Pulse : anthracite/vert, identité et présentation des services.

Les captures et données sont celles des quatre fiches existantes. La seule vue mobile utilisée est la capture SC vérifiée pendant la phase hero. Aucune interface mobile fictive, aucun témoignage ni résultat ajouté.

Le scroll redresse chaque interface puis révèle son contenu ; le chapitre suivant prend le relais verticalement. Pas de carrousel automatique, pas de scroll forcé. Navigation directe et liens stables. Sur écran court, suppression du maintien sticky ; réduction système et commande manuelle disponibles. Les grands mots sont des SVG décoratifs ignorés des technologies d’assistance.

## Vérification

- Astro check : 52 fichiers, 0 erreur, avertissement ou hint.
- 9 tests de régression réussis, dont portfolio autorisé/exclusions.
- Build de production : 40 pages, audit sans erreur ; aperçu final staging noindex.
- Budget JS : 119 492 octets brut / 47 493 gzip, sous les limites existantes 125 000 / 50 000. Aucune dépendance ajoutée ; GSAP partagé.
- `scripts/portfolio-qa.mjs` : 38 contrôles, aucun échec. Quatre projets sur desktop et mobile, positions début/milieu/fin/retour, images chargées, titres/CTA visibles, liens HTTP 200, axe, mode réduit dynamique et manuel, focus clavier, six largeurs 320–1440 px, sans JavaScript.
- `scripts/portfolio-smoke.mjs` : quatre liens accessibles au clavier sur 390 × 667 en mode compact, puis titre du hero visible aux quatre positions contrôlées sur desktop.
- Correction issue de la recette : retrait des refresh ScrollTrigger au chargement différé des images. Les dimensions sont déjà réservées ; ces refresh interrompaient la navigation clavier. Le contrôle qui échouait passe après correction.
- Captures desktop et mobile inspectées dans ce dossier. Aucun débordement détecté. Safari/iOS physique non vérifié.

## Performance réelle de laboratoire

Lighthouse 13.5.0, mobile simulé, Chrome headless, build de production local, 18:10:28 UTC :

| Mesure | Résultat |
| --- | ---: |
| Performance | 96/100 |
| Accessibilité | 100/100 |
| Bonnes pratiques | 100/100 |
| LCP | 2,712 s |
| CLS | 0,000331 |
| TBT | 0 ms |
| Transfert initial page | 468 861 octets |

Comparaison au hero seul : 97/100, LCP 2,488 s, 771 936 octets. Le transfert initial diminue ; cette mesure du LCP est légèrement supérieure (+224 ms). Le seuil de 2,5 s n’est pas atteint sur ce passage. Ne pas présenter ce résultat comme une validation Core Web Vitals terrain. Pas de répétition de mesures pour sélectionner artificiellement un meilleur score.

## Fichiers

Créés : `src/components/CinematicPortfolio.astro`, `src/styles/cinematic-portfolio.css`, `src/lib/cinematic-portfolio.ts`, trois scripts de recette/performance, plan et rapports/captures.

Modifiés : `src/pages/index.astro` (remplacement grille et ancre de sortie), `src/components/CinematicHero.astro` (une phrase), `PROGRESS.md`, rapports d’audit générés. Aucun changement aux données des projets, pages portfolio, blog, SEO ou dépendances.

Aperçu : http://127.0.0.1:4322/?portfolio=immersif#realisations-accueil. Aucun déploiement, commit ou push de cette phase. Jalon du hero conservé. **Arrêt pour validation utilisateur.**

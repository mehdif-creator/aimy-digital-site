# Progression de la refonte Aimy Digital

## 11 octobre 2026 — accueil approuvé et réserves techniques traitées

Le design de 11acdb9 est explicitement approuvé. Le conserver. LCP corrigé par variantes et encodage des images du hero et initialisation différée des animations des sections suivantes ; aucune refonte visuelle.

Trois mesures mobiles comparables : avant 3,165 / 3,167 / 3,167 s ; après 2,470 / 2,476 / 2,504 s, médiane 2,476 s. Marge faible autour de 2,5 s, troisième run à +4 ms. Performance 97, accessibilité 100 ; audit résolution My NutriZen signalé sur la taille avant transformation, détail dans docs/qa/gate1-technical/rapport.md. Aucun autre résultat terrain inféré.

Recette 320/375/390 px, console propre, axe, 32 contrôles navigateur, 9 tests, Astro check et build/audit production réussis. Aucun message console reproduit ; les messages historiques non fournis restent non attribués.

La dernière instruction autorise maintenant Gate 2 : UN cas complet HT Créa Jeux. Ne pas appliquer aux trois autres projets. STOP pour approbation visuelle de HT une fois livré. Blog, migration SEO, architecture portfolio et design accueil à préserver ; aucun déploiement.

## Jalon 1 — accueil premium — 11 octobre 2026 — en attente de validation visuelle

Instruction prioritaire : « Premium Visual Redesign: Homepage & Project Case Studies ». Seul le Gate 1 est réalisé. **STOP : ne pas commencer HT Créa Jeux avant approbation explicite de cet accueil ; les trois autres cas attendent ensuite la validation du cas HT.**

Socle sauvegardé au commit 295ddcc. Hero, captures vérifiées et portfolio dédié préservés. Accueil : services éditoriaux interactifs, progression GSAP de quatre étapes, FAQ native revisitée, scène de contact et footer intégré. Aucun nouveau média lourd ni dépendance. Variante du footer limitée à cette page.

Vérifications : 9 tests réussis, Astro check 61 fichiers sans diagnostic, build production 40 pages, audit sans erreur (121445 octets JS brut / 48357 gzip), 32 contrôles navigateur sans erreur, six largeurs 320–1440 px, clavier, modes réduits, sans JS, liens et axe. Captures et rapport : docs/qa/home-gate1/.

Lighthouse mobile local : performance 93, accessibilité 100, bonnes pratiques 100 ; LCP 3,167 s, CLS 0,000331, TBT 0 ms. Le LCP dépasse 2,5 s sur ce run et concerne la capture SC du hero conservé. Ce résultat ne constitue pas une mesure terrain, ni une validation des Core Web Vitals en production.

Aperçu : http://127.0.0.1:4322/?accueil=gate1#apres-realisations. Aucun déploiement ; blog, pages de projets et infrastructure SEO inchangés. Les exclusions de portfolio restent obligatoires.

## Placement et netteté — correction prioritaire du 10 octobre 2026

Le parcours cinématique complet est réservé à **/portfolio/**. L’accueil présente seulement SC Rénovation et HT Créa Jeux via `ProjectPreview`, puis le CTA « Découvrir toutes nos réalisations » et le contenu commercial existant. Ne pas réintroduire les quatre chapitres sur l’accueil.

Le hero reste identique dans sa composition, son CSS et son animation. Seules ses sources image/variantes sont remplacées pour la netteté ; le lien des quatre projets cible /portfolio/. La page portfolio conserve son URL, title, description et canonical. Le composant et ScrollTrigger existants sont réutilisés.

Diagnostic : anciennes captures de 548–779 px affichées jusqu’à environ 854 px, variantes insuffisantes pour Retina, zoom 104 % et interpolation 3D. Aucun filtre blur sur les interfaces. Solution : captures directes 2880 × 3600 de HT Créa Jeux, My NutriZen, SC Rénovation ; original Lambert 1920 × 945 publié sur le site Aimy actuel (la capture live a été rejetée car le CSS ne chargeait pas correctement). Provenance dans `docs/qa/portfolio/capture-sources.json`. Pas d’agrandissement des fichiers sources ; variantes adaptées, compression WebP 90, zoom supprimé et plans plats à la fin du mouvement. Le lien externe Lambert du showcase reprend le domaine actuel vérifié sur l’accueil publié.

Tests et captures : `docs/qa/placement-sharpness/`. **Attendre l’approbation visuelle des deux pages avant toute nouvelle phase.** Aucun déploiement ni modification du blog ou de l’infrastructure SEO.

## Portfolio immersif — 10 octobre 2026 — historique avant correction de placement

Le hero V2 est **conditionnellement approuvé** comme fondation. Son jalon Git `b96b9c5` reste intact. Seule correction du hero : « Découvrez leurs univers. »

Autorisation actuelle : développer uniquement le portfolio immédiatement suivant. Quatre chapitres en grand format remplacent la grille d’accueil : HT Créa Jeux, My NutriZen, SC Rénovation, Lambert Digital Pulse. Captures vérifiées, descriptions issues des données existantes, mobile SC réel. Aucun projet exclu réintroduit, aucun résultat ou témoignage ajouté.

GSAP/ScrollTrigger existants : redressement des interfaces, découverte de leur contenu au scroll, progression des chapitres et superposition desktop/mobile SC. Navigation directe, sortie de parcours, liens projets/sites, réduction système/manuelle, mode compact sur écran court et HTML sans JS. Aucun changement des autres pages, articles ou infrastructure SEO. Aucun service payant ni déploiement.

Vérifications et mesures dans `docs/qa/portfolio/rapport.md`. Aperçu : http://127.0.0.1:4322/?portfolio=immersif#realisations-accueil. **Arrêt pour approbation visuelle ; ne pas poursuivre les autres sections.**

## Correction hero V2 — 10 octobre 2026 — historique, approbation conditionnelle reçue

La dernière instruction « Cinematic Hero Review » rejette le hero précédent. Travail limité au hero et à sa transition ; **ne pas poursuivre le portfolio sans approbation visuelle explicite**.

- Cartes UI fictives remplacées par les captures vérifiées SC Rénovation, My NutriZen et HT Créa Jeux ; vue mobile SC capturée directement sur le site réel. Sources et récit dans `docs/brand/hero-cinematique-v2.md`.
- Trois scènes : impact / transformation desktop vers mobile et contact / introduction des réalisations. Titre exact demandé et CTA continuellement lisibles. Logo sans pastille blanche. Astro, GSAP, ScrollTrigger et alternatives accessibles conservés.
- Portfolio, articles et infrastructure SEO inchangés. Les quatre seuls projets autorisés restent HT Créa Jeux, My NutriZen, SC Rénovation et Lambert Digital Pulse. Toutes les exclusions antérieures restent obligatoires.
- Vérification : 9 tests, Astro check sans diagnostic, builds production et staging de 40 pages, audits sans erreur ; recette navigateur et captures dans `docs/qa/hero-v2/`.
- Mesure finale Lighthouse mobile locale : performance 97, accessibilité 100, bonnes pratiques 100 ; LCP 2,488 s, CLS 0,000331, TBT 5,5 ms. Pas une mesure terrain.
- Aperçu : http://127.0.0.1:4322/?hero=recit. **Arrêt à ce jalon pour validation utilisateur.** Aucun déploiement.

## Reprise créative prioritaire — 10 octobre 2026 (historique V1)

**La direction visuelle précédente est rejetée par l'utilisateur.** Nouvelle source prioritaire : prompt « Critical Creative Redesign & Project Recovery ». Phase autorisée limitée au hero cinématique. **Arrêter après la proposition fonctionnelle et attendre son approbation avant le portfolio ou les autres pages.** Ne pas appliquer le plan global précédent au-delà de ce périmètre.

- Sauvegarde locale et distante `sauvegarde/avant-hero-cinematique` au commit `a44f04f`. `main` intacte ; pas de force-push.
- Hero remplacé par une scène bleu nuit/bleu électrique : titre « Votre ambition. En pleine lumière. », plans en perspective, tracé lumineux, entrée chorégraphiée GSAP, narration ScrollTrigger, parallaxe et survol desktop.
- Navigation d'accueil adaptée au fond sombre ; infrastructure, routes, autres sections et portfolio conservés.
- Défilement natif ; animations allégées sur mobile ; préférence système et commande manuelle de réduction prises en compte. HTML et CTA lisibles sans JavaScript.
- GSAP 3.15.0 épinglé. Le script cinématique est chargé seulement sur l'accueil. Budget ajusté explicitement à 125 000 octets JS brut / 50 000 gzip pour l'ensemble des scripts ; mesure 117 403 / 46 279. Aucun service externe ou média généré.
- QA : Astro check 47 fichiers, aucun diagnostic ; build 40 pages et audit staging réussis ; 9 tests de régression réussis ; format validé. Recette hero dans `docs/qa/hero/` : scroll desktop/mobile tactile, survol, retour au début, préférence réduite dynamique, sans JS, menu, CTA, six largeurs et axe.
- Lighthouse ciblé accueil mobile simulé : performance 97, accessibilité 100, bonnes pratiques 100 ; LCP 2,37 s, CLS 0,010, TBT 3,5 ms. Mesure locale, pas une donnée terrain.
- Prochaine étape : **validation personnelle du hero par l'utilisateur**. Les anciens rapports restent des preuves historiques antérieures à ce jalon.

Les articles longs originaux restent archivés dans `.private/wordpress/posts.json`. Leur restauration avec vérification des affirmations, les décisions SEO, SMTP et o2switch restent au backlog ; aucun de ces chantiers ne doit consommer la phase hero actuelle.

## Correction prioritaire du 10 octobre 2026

La dernière instruction explicite de l'utilisateur prime sur toutes les sources précédentes.

Portfolio autorisé : **HT Créa Jeux, My NutriZen, SC Rénovation, Lambert Digital Pulse**.

**Djez Garden et Atelier ÉcoBois sont exclus** de l'accueil, du portfolio, des études de cas, témoignages, cartes et contenus marketing. Ne pas les réintroduire depuis les anciens documents ou fichiers. Aucun contenu public nouveau ne les présente à ce stade.

Hiérarchie : instructions les plus récentes > site actuellement publié inspecté à nouveau > fichiers et médias vérifiés du projet > documents historiques comme références secondaires.

Conserver séparément l'inventaire SEO : une exclusion commerciale n'autorise ni suppression arbitraire d'URL ni redirection sans équivalent. Ne pas recopier de témoignages ou résultats sans preuve.

## État

- Dépôt cloné dans `aimy-digital-site`, branche `refonte/astro-premium`, base `8f14e2b`.
- Quatre documents de référence lus, logo inspecté, brief et directions visuelles rédigés.
- REST public archivé localement : 19 pages, 11 articles, 8 catégories, 114 médias.
- Crawl public terminé : 89 URL observées, dont 24 décisions REVIEW encore ouvertes. Le statut enregistré est celui obtenu après suivi des redirections.
- Astro 7 statique : 40 pages, composants partagés, 11 articles aux routes actuelles, 4 projets approuvés, 8 catégories. Les articles ont été fortement raccourcis ; revue sémantique indispensable avant bascule.
- Dépendances épinglées ; installation `npm ci` réussie sous Node 24.19.0 après arrêt du serveur qui verrouillait une bibliothèque Windows. Avertissement de nettoyage EPERM résiduel, code de sortie 0 ; audit npm : 0 vulnérabilité signalée.
- Vérifications : 9 tests réussis ; Astro check 45 fichiers sans erreur, avertissement ni hint ; format validé ; build production 40 pages et audit sitemap/robots/canonicals/liens sans erreur.
- Revue indépendante effectuée : import historique isolé des articles publiables, retrait de consentement pris en compte entre onglets, stockage anti-spam refusé dans la racine publique PHP. Les deux premiers correctifs ont des tests de régression ; PHP reste à exécuter sur serveur.
- Prévisualisation locale : `http://127.0.0.1:4322/`. Mesures et captures historiques sous `docs/qa/`, nouveau hero sous `docs/qa/hero/`. Le staging est noindex, sans sitemap, formulaire désactivé par défaut.
- CI et procédures o2switch/rollback rédigées. Branche destinée à une PR brouillon, sans fusion ni publication.
- Aucun déploiement, aucune dépense, aucun envoi de formulaire réel.
- À poursuivre : décisions sur les URL non résolues, couverture médias complète, enrichissement éditorial vérifié, recette PHP/SMTP/Apache et validations de bascule. Ne pas considérer la migration entière comme terminée.

## Blocages de publication

Sauvegarde WordPress restaurable et racine documentaire non vérifiées ; SMTP/livraison et redirections Apache non testés ; mentions légales actuelles à confirmer ; fonctions des pages `/app/`, `/optimisation-webinaire/` et `/youtube-competitor-radar/` à auditer. 20 médias historiques récupérés sur 114 recensés, flux/archives/liens entrants à qualifier. Revue éditoriale, validation du design et accord explicite de production encore requis. Voir `docs/release-gates.json` : aucune validation cochée sans preuve.

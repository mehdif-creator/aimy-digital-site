# Progression de la refonte Aimy Digital

## Reprise créative prioritaire — 10 octobre 2026

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

# Progression de la refonte Aimy Digital

## Conversion et finitions — 28 octobre 2026

Demande du propriétaire : rendre le site exceptionnel et donner envie de prendre contact. Réalisé en autonomie :

- Logo vectoriel (`Logo.astro`, orbite issue du logo historique + mot-symbole du pied de page) dans l’en-tête ; favicon SVG.
- En-tête : téléphone cliquable et bouton « Parlons de votre projet » (≥ 1001 px). Barre de contact fixe « Appeler / Parler de mon projet » ≤ 1000 px, apparition au défilement en CSS pur (absente de /contact/).
- Formulaire : utilisable sans backend. Tant que `PUBLIC_CONTACT_ENABLED` n’est pas activé, l’envoi ouvre un e-mail pré-rédigé vers contact@aimy-digital.fr (aucune donnée transmise au site) ; politique de confidentialité mise à jour.
- Section confiance (`TrustSection.astro`) après les réalisations : fondateur, « Devis gratuit sous 24 h » (promesse déjà publiée sur le site WordPress), interlocuteur unique, ancrage local, suivi, et les quatre sites clients en ligne. **Aucun témoignage ni chiffre inventé ; monogramme « MF » en attendant une vraie photo.**
- Réassurance « Devis gratuit sous 24 h » sous le CTA du hero et dans l’appel final (avec le téléphone).
- Hero : défilement de la séquence raccourci (220 → 165 svh, mobile 195 → 150), filigrane AIMY en contour. CSS intégré aux pages (plus de feuilles bloquantes).
- Finitions : transitions natives entre pages (`@view-transition`), survol des aperçus de projets, image de partage 1200×630 (`scripts/og-image.mjs`).
- Lien Lambert Digital Pulse corrigé : l’adresse temporaire universe.wf ne répondait plus, remplacée par https://lambertdigitalpulse.fr/ (en ligne, crédite Aimy Digital).

Vérifications : astro check 0 erreur, 17 tests, build et audit (budget JS respecté : 53 998 o gzip), recette navigateur 11/11 (aucun débordement 320–1440 px, 0 violation axe), contrôle visuel 1440/800/375 px.

Déployé sur la préprod o2switch (LiteSpeed, compression Brotli), accès toujours restreint par IP (403 vérifié depuis l’extérieur), redirections 139/139. Lighthouse mobile sur l’accueil, préprod en HTTP : avant 83–86, LCP 3,54–3,64 s (3 mesures) ; après 81–95, LCP 2,66–4,07 s, médiane 3,39 s (6 mesures, résultats bimodaux). Gain léger et instable : la cible 2,5 s n’est pas atteinte. Le score « bonnes pratiques » de 74 vient de l’absence de HTTPS sur la préprod et de l’alerte de résolution d’images déjà connue.

À fournir par le propriétaire : une photo portrait, des témoignages clients réels avec accord, la configuration SMTP pour activer l’envoi serveur.

## My NutriZen — prêt pour validation visuelle, 12 octobre 2026

Les quatre captures authentiques jointes sont reçues et inspectées. Elles remplacent le blocage historique ci-dessous pour le périmètre dashboard, menus et recettes desktop/mobile. Recadrages natifs sans agrandissement pour exclure le profil et le parrainage ; provenance dans docs/qa/nutrizen-case/user-assets.json. Aucun écran de préférences ou courses fabriqué.

Cas distinct réalisé : ouverture menthe/pistache avec planning mobile, semaine progressive sur vert profond, recette desktop/mobile et contact. Route /portfolio/my-nutrizen/ et métadonnées préservées. HT approuvé, accueil, blog, migration SEO et autres cas inchangés.

Build production et audit réussis, 9 tests, Astro check 78 fichiers sans diagnostic. QA Chrome 320/375/390/768/1440 px, images DPR2, axe, scroll aller-retour, mouvement réduit et sans JS. Lighthouse final : performance 97, accessibilité 100, bonnes pratiques 100 ; LCP 2,529 s sur la capture mobile d’introduction, TBT 0 ms, CLS 0,00124. Rapport et limites : docs/qa/nutrizen-case/rapport.md. Marge LCP faible, pas de garantie terrain.

Aperçu : http://127.0.0.1:4322/portfolio/my-nutrizen/

**STOP pour validation visuelle My NutriZen.** Ne pas poursuivre SC Rénovation ou Lambert Digital Pulse. Aucun déploiement.


## My NutriZen — inventaire et attente des captures, 11 octobre 2026

Dernière instruction : https://manutrizen.fr/ est l’adresse officielle fournie. Erreur DNS locale constatée, sans conclusion sur l’existence du projet. Les médias précédents viennent de https://mynutrizen.fr/ et ne prouvent pas l’état actuel de l’application. Ne pas déduire de l’ancien libellé « En Développement » que les courses sont encore inachevées.

Dossier public/images/portfolio/my-nutrizen/ créé, README de captures nécessaires et inventaire docs/brand/nutrizen-assets-inventory.md rédigés. Six médias historiques identifiés ; captures actuelles dashboard/semaine, recette, préférences et mobile manquantes. Courses conditionnelles à confirmation fonctionnelle. STOP demandé avant finalisation des compositions : attendre ces captures. HT et toutes les pages approuvées inchangés.


## HT approuvé, préparation My NutriZen — 11 octobre 2026

L’utilisateur approuve ee8b165. Ne plus refaire la page HT. Dernières retouches : nom officiel « HT Créa Jeux », fiche Multi Speedy dans le showcase et Pack Duo dans le détail identité ; Easy Peasy conservé uniquement dans l’approche. Captures publiques authentiques 2880×2200, pas de refonte.

Recette HT : 5 largeurs 320/375/390/768/1440, axe et console sans erreur, images DPR2 suffisantes, 9 tests réussis, build production/audit 40 pages OK. LCP mobile 2,463 s, performance 97/accessibilité 100/bonnes pratiques 100 ; élément LCP toujours la capture d’accueil HT. Aucun déploiement.

My NutriZen : autorisé comme prochain cas, avec sa propre direction. Inspection publique et contrat préparés dans docs/brand/nutrizen-case-direction.md et docs/superpowers/plans/2026-10-11-nutrizen-case.md. L’utilisateur a choisi de fournir un dossier ou un accès de démonstration, mais le chemin/URL n’est pas encore indiqué. Aucun onglet My NutriZen connecté trouvé dans le navigateur disponible. L’aperçu public 1394×1920 porte encore « Liste de courses (En Développement) » : attendre les vrais écrans avant de représenter les fonctionnalités connectées actuelles. Ne pas inventer de captures. Route My NutriZen existante conservée ; son nouveau cas n’est pas terminé.

Continuer dès réception du dossier/accès, puis tests/build, performance, commit et arrêt pour approbation My NutriZen. SC Rénovation et Lambert Digital Pulse restent hors périmètre.


## HT Créa Jeux — raffinements ciblés, 11 octobre 2026

Direction de 9a413a7 approuvée avec réserves mineures. Architecture conservée ; approche illustrée par la vraie fiche produit, identité montrée à travers la boîte et les cartes, captures planes et translations contrôlées, CTA final affiné. Composant CaseImage plafonné aux dimensions natives et contrat des futurs cas documenté. Les trois autres cas restent inchangés.

Recette 320/375/390/768/1440 px, axe/console/liens/images/scroll/mouvement réduit et sans JS ; 9 tests, Astro check et build production réussis. LCP HT mesuré 2,464 s (capture d’accueil en introduction), performance 97. Contrôle accueil 2,520 s : seuil encore fragile, ne pas présenter le problème comme définitivement résolu. Rapport et limites : docs/qa/ht-case/refinements.md.

Aperçu : http://127.0.0.1:4322/portfolio/ht-crea-jeux/?cas=raffine

**STOP : attendre la validation visuelle des raffinements HT avant les trois autres cas.** Aucun déploiement. Hero, accueil, portfolio, blog et infrastructure SEO préservés.


## Gate 2 — HT Créa Jeux — prêt pour validation visuelle, 11 octobre 2026

Réserves Gate 1 traitées et enregistrées dans 21dc128, après approbation visuelle de 11acdb9. Mesures et limite autour du seuil LCP dans docs/qa/gate1-technical/rapport.md.

Un seul cas réalisé : /portfolio/ht-crea-jeux/. Introduction typographique bleu nuit/orange, contexte, approche, captures réelles desktop/produit/mobile, ScrollTrigger contrôlé sans pin, détails de l’interface, lien externe et contact. Sources fraîches consignées. Aucune métrique, fonctionnalité ou témoignage inventé.

Recette Chrome 320/375/390/768/1440 px, clavier, mouvements réduits, scroll retour et sans JS ; zéro erreur console et zéro violation axe. Build production 40 pages, audit et 9 tests réussis, Astro check 69 fichiers sans diagnostic. Lighthouse mobile local : performance 98, accessibilité 100, bonnes pratiques 100 ; LCP 2,366 s, CLS 0,00913, TBT 0 ms. Rapport : docs/qa/ht-case/rapport.md.

Aperçu : http://127.0.0.1:4322/portfolio/ht-crea-jeux/?cas=reference

**STOP — attendre l’approbation visuelle de HT Créa Jeux avant Gate 3.** Les trois autres cas, le design approuvé de l’accueil, les articles et la migration SEO restent inchangés. Aucun déploiement.

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

## 12 octobre 2026 — SC Rénovation, jalon premium
- Nouvelle page dédiée, métadonnées conservées. Captures fraîches 2880×2000 et 780×2000, quatre contributions illustrées : grille des prestations, galerie avant/après, devis/appel, adaptation mobile.
- Chrome 320/375/390/768/1440 à DPR2 : zéro erreur, zéro violation axe, images suffisantes, contact et mode sans JS contrôlés. Mouvement réduit dynamique vérifié.
- Production : 40 pages ; 9 tests passants. Budget JS 124605 brut / 49999 gzip, conservé sans hausse.
- Lighthouse mobile standard : performance 95, accessibilité 100, bonnes pratiques 100 ; LCP 2,760 s, CLS 0,00133, TBT 0. Mesure locale, pas une garantie terrain.
- Suite autorisée : Lambert. Domaine courant limité HTTP429, ancienne URL TLS invalide ; utiliser les captures archivées vérifiées et signaler les médias manquants.

## 13 octobre 2026 — Lambert Digital Pulse prêt pour validation
- Étude de cas éditoriale jaune/noir, trois contributions démontrées et portrait issus de la capture authentique publiée. Aucun écran mobile fabriqué.
- Chrome cinq largeurs/DPR2, axe, images, reduced-motion, sans JS et liens : contrôles passants. Domaine Lambert intermittent200/429 ; rendu public incomplet écarté, mobile manquant signalé dans le rapport.
- Lighthouse mobile :100/100 performance, accessibilité100, bonnes pratiques100 ; LCP1,517s, CLS0,00037, TBT0.
- Deux pages terminées dans le périmètre des médias vérifiés. Validation visuelle attendue ; nouvelle demande utilisateur autorise la mise à jour juridique SASU avant cet arrêt.

## 13 octobre 2026 — correction juridique SASU obligatoire
Identité utilisateur intégrée et centralisée : mentions légales, confidentialité, footer, contact, information du formulaire, Organization et publisher. URL conservées, archives et blog inchangés. Aucun ancien SIRET/statut d’éditeur dans les sources publiables ou40pages.
Audit réel : formulaire désactivé, SMTP/hébergement non vérifiés, aucun traceur tiers, localStorage aimy-consent sans expiration. Texte fondé sur ce constat ; aucune durée ou conformité inventée.
À confirmer avant publication : directeur de publication (nom/qualité), hébergement effectif o2switch, messagerie/sous-traitants/transferts, conservation/purge et bases légales. Questions envoyées, réserves visibles dans les pages locales. Coordonnées o2switch vérifiées à part ; ne prouvent pas un hébergement effectif.
QA : neuf configurations320/390/1440 sur3pages, axe/réseau/préférences/schema sans erreur ; liens légaux/footer sur40pages ;9tests réussis ;buildproduction valide. Rapport docs/qa/legal/rapport.md. Pas de déploiement. Finalisation juridique conditionnée aux réponses, validation visuelle des deux cas toujours attendue.

## 13 octobre 2026 — confirmations juridiques reçues
L’utilisateur confirme Mehdi FARHANE, Président de la SASU AIMY DIGITAL, directeur de la publication ; nouveau site Astro hébergé chez o2switch. Mentions mises à jour avec adresse et téléphone officiels de l’hébergeur. Confidentialité cohérente ; seules restent ouvertes la messagerie, les durées/purges, lieux/transferts et validation des bases légales. Pas de déploiement ; footer/Schema.org gardent l’identité SASU correcte.

## 13 octobre 2026 — Gate A commercial prêt pour validation
Deux pages dédiées : création de sites internet et référencement SEO. Compositions distinctes, captures réelles SC/HT, accordéons natifs, FAQ ciblées, liens et contenu local factuel. Aucun changement aux autres pages ni au blog. Méthode et audit des dix routes dans docs/superpowers/plans/2026-10-13-commercial-gate-a.md.
QA Chrome320/375/390/740/768/1440 DPR2 : sans débordement, erreur console ni violation axe ; clavier, CTA, reduced-motion et sans JS vérifiés. Correction sizes SEO sous-estimé, images désormais suffisantes à DPR2. Build40pages,9tests réussis, Astro0erreur/0warning (1hint de script QA préexistant). Budget JS inchangé124605/49999gzip.
Trois Lighthouse mobiles comparables par page : Création LCP2,255/2,317/2,045s (image hero) ; SEO1,897/1,443/1,432s (texte introductif). CLS0,00196/0,00310 ; accessibilité100, bonnes pratiques100, TBT0. Mesures locales, pas CWV terrain. Rapport docs/qa/gate-a/rapport.md.
STOP Gate A : validation visuelle demandée avant les huit autres pages. Pas de déploiement. Les articles raccourcis restent à réconcilier avec leurs sources historiques avant publication ; ce chantier n’est pas clos par ces pages commerciales.

## 13 octobre 2026 — Gate A rejeté, proposition cinématique Gate A1
La correction utilisateur remplace la validation précédente : ec377bf reste un jalon de récupération, pas une approbation. Travail limité à /creation-de-sites-internet/. SEO/Gate A2 et Gate B attendent une validation explicite.
Cinq scènes : entrée typographique/perspective, masque bureau-mobile réversible au scroll, explorateur vitrine/commerce/refonte, trois détails UX inspectables, conclusion/signature animée. Vrais médias SC/HT uniquement ; refonte identifiée comme exemple de points à examiner, jamais comme faux avant/après.
Architecture, routes et métadonnées conservées. Nouveau module local4127octets brut/1814gzip ; GSAP mutualisé. Enveloppe globale adaptée explicitement à130/52Ko ; construit128732/51813. Préchargement des polices limité à cette page via un slot head optionnel. Aucun changement du contenu SEO, homepage, cas, blog ou migration.
Recette six largeurs320/375/390/740/768/1440, tactile/clavier, scroll réversible, axe, console, reduced-motion et sans JS. Régression initiale du masque puis cadrage initial mobile corrigés. Build40pages,9tests, Astro0erreur/0warning (1hint QA ancien). Rapport détaillé docs/qa/gate-a1/rapport.md avec essais et limites.
Performance retenue : Lighthouse mobile97 ; LCP2,523/2,526/2,524s, CLS0,000072, accessibilité100. Cible2,5s légèrement dépassée, réserve technique explicite. CSS inline et compression85 testés puis annulés, sans gain fiable. Hero90 et détails93/95 conservés.
STOP demandé pour jugement visuel A1 ; aucune approbation créative déduite des tests. Aucun déploiement. Attendre avant A2 ou autres pages.

## 2026-10-13 — huit pages, lot 1 : acquisition et continuité

Le brief 648a30ae autorise les huit pages sans gates intermédiaires. Sauvegarde locale `backup/avant-huit-pages-2026-10-13` sur `ed15fcb`. Homepage, création de sites, portfolio, cas, articles et juridique protégés.

SEO : recherche illustrative, parcours au défilement et diagnostic à huit piliers. SEA : quatre étapes commandées annonce/destination/action/mesure. Maintenance : couches interactives et distinction hébergement/entretien. Nouveau contrôleur partagé uniquement sur les nouvelles pages, alternatives sans JS et reduced-motion.

Build production : 40 pages, audit sans erreur. Recette finale commune : 48 configurations (8 pages × 320/375/390/768/1024/1440), zéro erreur console/pageerror, zéro débordement et zéro violation axe détectée ; panneaux activés au clavier. Les premières erreurs de contraste et une collision du sélecteur global `.hero` ont été corrigées localement.

Budget JS agrégé porté explicitement de 130/52 Ko à 135/54 Ko pour les huit nouvelles pages : mesure 131 811 octets bruts / 53 190 gzip pour l’ensemble des bundles, pas par page. Aucun framework supplémentaire ni vidéo. Performance Lighthouse en cours, aucun seuil encore revendiqué.

## 2026-10-13 — huit pages, lot 2 : orientation et agence

Prestations : explorateur de six besoins, véritables changements de contenu, CTA et cas authentiques (SC Rénovation / HT Créa Jeux), sans attribuer de résultats SEO/SEA ni contrat non vérifié. Agence : manifeste éditorial, atelier en quatre étapes, interfaces réelles et identité de Mehdi Farhane confirmée. Aucun collaborateur ni historique inventé.

Les deux pages sont incluses dans la recette à six largeurs sans erreur et dans les vérifications sans JavaScript / reduced-motion. Composants de cas et pages approuvées inchangés.

## 2026-10-13 — huit pages, lot 3 et livraison globale

Contact : choix visuel natif du projet, retours de validation, coordonnées et RGPD conservés. Le PHP/SMTP réel reste à configurer et tester : envoi désactivé, alternatives directes visibles, aucune fausse confirmation. Journal : magazine, couvertures historiques WebP optimisées sans agrandissement et filtres multi-catégories. FAQ : recherche locale accent-insensible, catégories, zéro résultat, réponses associées et compteur synchronisé.

Revue indépendante : deux défauts reproduits puis corrigés (catégorie secondaire de l’article IA, question FAQ associée avec recherche active). Tests spécifiques en échec avant correction et réussis après. Aucun changement des pages protégées, des articles, du juridique, du header/footer ou des layouts.

Validation finale : builds production et staging 40 pages, audits sans erreur ; Astro 0 erreur/0 warning (1 hint ancien) ; suite 9/9 ; 48 configurations navigateur sans erreur/overflow/axe, puis 12 configurations supplémentaires FAQ/journal après correction du CLS ; 16 contrôles approfondis avec tous les panneaux, images, liens et menu. Aperçus des huit routes HTTP 200 et noindex/nofollow.

Lighthouse 13.5 mobile propre, séquentiel : SEO 99 / LCP 1,759 s ; SEA 98 / 1,738 s ; maintenance 99 / 1,742 s ; prestations 98 / 2,022 s ; agence 98 / 2,164 s ; FAQ 99 / médiane 1,834 s ; journal 99 / 2,121 s ; contact 100 / 1,535 s. Accessibilité et bonnes pratiques 100 partout ; TBT 0 ; CLS final 0 à 0,0611. Mesures de laboratoire locales, pas des données terrain.

FAQ : CLS initial 0,248, puis 0,212 après réservation de l’interface. PerformanceObserver confirme des retours à la ligne lors du chargement des polices. Préchargement 400/600/700 uniquement sur FAQ et grille mobile stabilisée : trois audits finaux 1,849 / 1,834 / 1,837 s, CLS 0. Journal CLS réduit de 0,064 à 0,0015 en affichant ses filtres dès le HTML initial.

Réserve éditoriale : onze articles actuels ne contiennent que 4–10 % du volume des archives WordPress. Aucun texte d’article modifié ; restauration éditoriale à traiter séparément avant publication. Liste exacte dans docs/qa/eight-pages/article-integrity.md. Réserves SMTP et données personnelles dans contact-readiness.md.

Rapport global : docs/qa/eight-pages/rapport.md. Budget agrégé JS 131 811 / 53 190 gzip, seuil explicite 135/54 Ko. Aucun coût externe, push ou déploiement. Arrêt pour validation visuelle globale des huit pages.


## 15 octobre 2026 — corrections ciblées après audit visuel global

Le commit 975adf4 reste la base technique/éditoriale, pas une validation artistique globale. SEO/SEA : scène persistante, même besoin traversant les étapes, commandes à proximité immédiate et progression SEO desktop sans pin. Maintenance : éclaté de six responsabilités, sans monitoring simulé. Prestations : preuves SC/HT limitées aux interfaces réellement réalisées, schémas sans client pour SEO/SEA/maintenance. Agence : décisions de conception, vrais médias mobile SC et Pack Duo, interlocuteur Mehdi identifié. Contact : accès au formulaire plus tôt sur mobile, envoi toujours désactivé. Journal : couvertures non recadrées, contexte historique 2025 explicite. FAQ conservée après tests.

Revue et régressions : double-clic figeant un masque, commande SEO mobile hors scène et préférence reduced-motion changée en cours reproduits puis corrigés. 32 configurations à 320/375/390/1440 sans erreur console/overflow/Axe ; 16 contrôles approfondis panneaux, images, liens/menu sans erreur ; six régressions de mouvement et huit contrôles fonctionnels passent. Suite9/9, Astro0erreur/0warning (1hint ancien), builds production/staging40pages et audits sans erreur. Budget JS inchangé135000/54000, résultat134114/53971.

Lighthouse13.5 mobile séquentiel, une mesure par page : SEO99/LCP1,751s ; SEA99/1,756s ; maintenance99/1,771s ; prestations98/2,015s ; agence98/2,231s ; FAQ99/1,840s ; journal98/2,272s ; contact100/1,433s. Accessibilité/bonnes pratiques100, CLS0–0,0432, TBT0 saufSEO5ms. Mesures laboratoire, pas terrain. Aucun changement des pages protégées, articles, métadonnées ou migration.

Rapport unique : docs/qa/commercial-refinements/rapport.md. Quatre vidéos natives desktop/mobile SEO/SEA dans le dossier voisin Validation-commerciale-Aimy-Digital-2026-10-15. Réserves obligatoires : configuration et réception SMTP réelles (pas de PHP local), restauration des onze articles historiques, audit SEO final, validation artistique globale. Pas de push, déploiement, service payant ni envoi externe. STOP pour validation visuelle après livraison.


## 15 octobre 2026 — restauration des articles et audit SEO autorisés

Onze corps historiques restaurés (32 496 mots, huit tableaux, quinze illustrations), sources REST fraîches identiques aux archives. Dates/URL conservées ; titres H1 complets, SEO courts séparés, descriptions complètes, images OG/Article. Quatre images base64 extraites sans altération ; vidéo historique conservée par lien sans préchargement. Widgets et bourrage de mots-clés exclus, aucun résumé supplémentaire. Les tarifs, résultats et promesses historiques restent explicitement À VALIDER : bandeau par article et registre, aucune validation factuelle implicite.

Builds production/staging 40 pages, tests 12/12, Astro 0 erreur/0 warning (1 hint ancien), 33 contrôles Chrome 320/390/1440 sans overflow/pageerror/violation Axe, images décodées. Trois Lighthouse mobiles WordPress : 100 aux quatre catégories, LCP 1,523/1,524/1,523 s (H1), CLS ~0,0015. Audit 89 anciennes URL frais ; 24 décisions de migration restantes, 93/114 originaux média non présents au chemin historique. Aucune redirection indiscriminée. SMTP/réception, Apache/HTTPS/www, sauvegarde/document root, Search Console et validation éditoriale/visuelle toujours réservés. Staging remis noindex sans sitemap. Rapport de référence docs/qa/articles-seo/rapport.md. Pas de déploiement/push ; aucun changement des compositions approuvées.

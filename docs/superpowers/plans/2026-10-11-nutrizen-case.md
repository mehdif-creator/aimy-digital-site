# HT final et My NutriZen — Implementation Plan

> Exécution dans cette session avec superpowers:executing-plans. L’utilisateur autorise la réalisation et le commit, puis impose un arrêt pour validation visuelle de My NutriZen.

**Goal:** Terminer les deux retouches HT et créer un cas My NutriZen distinct, fondé sur des preuves.
**Architecture:** Routes Astro existantes et BaseLayout conservés ; route spécifique My NutriZen, composant narratif, CSS et mouvement isolés. CaseImage partagé pour les captures natives.
**Tech Stack:** Astro 7, GSAP/ScrollTrigger, Playwright, axe, Lighthouse existants.
**Spec:** Dernière demande utilisateur « HT CRÉA JEUX APPROVED », ee8b165 conservé.

## Contraintes
Aucune refonte HT, accueil, blog ou migration SEO. Aucun déploiement. Pas de résultats inventés, de faux écrans ou de reprise des trois projets suivants. Les captures privées éventuelles doivent provenir de la démonstration autorisée.

## Points de recette
- 320/375/390 px : lisibilité et aucun débordement.
- Captures natives : sélection responsive suffisante, pas de rotation ou zoom floutant.
- Mouvement réduit et sans JS : contenu et liens accessibles.
- Nettoyage ScrollTrigger, liens et console propre.
- LCP mesuré avec son élément, sans extrapolation terrain.

## Étapes
- [ ] Inspecter les médias publics actuels et les éventuels écrans de démonstration fournis ; consigner provenance et fonctionnalités vérifiées.
- [ ] HT : titre officiel sans point ajouté, showcase Multi Speedy et détail Pack Duo si les captures sont utilisables. Vérifier dans la recette existante.
- [ ] Définir une direction My NutriZen propre : parcours préférences → semaine → courses ; palette végétale/lumineuse tirée du produit, typographie Manrope existante, composition en flux autour des vraies interfaces. Revoir après inspection des écrans.
- [ ] Créer NutrizenCaseStudy.astro, nutrizen-case.css, nutrizen-case.ts et portfolio/my-nutrizen.astro ; exclure cette route du fallback sans changer les métadonnées.
- [ ] Recette navigateur ciblée, 9 tests, Astro check, build/audit production, Lighthouse mobile ; corriger les anomalies puis préparer l’aperçu staging.
- [ ] Mettre à jour PROGRESS.md et rapport, commit stable, arrêt pour validation visuelle.

## Journal
Inspection publique : fonctionnalités demandées confirmées dans le texte actuel et la fiche projet locale. Aperçu dashboard officiel de 1394×1920 disponible. Les chiffres, avis et gains commerciaux de la landing ne sont pas repris comme preuves. L’utilisateur indique vouloir fournir un dossier ou accès de démonstration ; sa localisation est attendue avant les choix d’écrans définitifs.

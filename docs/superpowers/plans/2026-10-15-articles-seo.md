# Restauration des articles et audit SEO — plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Exécution dans cette session, puis revue indépendante.

**Goal:** Restaurer les onze articles historiques sans les résumer et auditer la migration locale.
**Architecture:** Extraire les blocs éditoriaux WordPress, exclure les widgets de navigation et conserver les sources privées. Réutiliser le gabarit Astro. Produire un registre des réserves éditoriales et un audit du build.
**Tech Stack:** Astro, sanitize-html, Node, Playwright.
**Spec:** Demande utilisateur du 15 octobre 2026 : restauration des onze articles et audit SEO ; contraintes de véracité et de non-déploiement de la conversation.

## Contraintes
- Aucun déploiement, aucune modification des pages commerciales approuvées.
- Conserver URL, dates historiques, corps éditoriaux, titres de sections et médias authentiques.
- Les chiffres, tarifs et engagements non vérifiés restent explicitement signalés pour validation ; aucune preuve client inventée.
- Ne pas confondre restauration éditoriale, audit local et validation de la migration Apache en production.

## Points de revue
- Ne pas réimporter les scripts, formulaires, widgets d’articles associés et bourrage de mots-clés.
- Ne pas perdre les sections ou tableaux du corps éditorial.
- Vérifier les ancres, images, liens et débordements mobiles.
- Ne pas réintroduire les projets exclus dans le contenu commercial.
- Ne pas présenter les offres de 2025 comme celles de la SASU actuelle.

## Étapes
- [x] Tester l’extraction et restaurer les onze JSON ; comparer archive locale et source publique fraîche.
- [x] Rétablir les métadonnées complètes et les images Article/OG, ajouter le contexte historique et le registre de validation.
- [x] Compiler staging/production, auditer routes, liens, ancres, sitemap, canonicals, indexation et redirections proposées.
- [x] Vérifier les onze articles sur desktop/mobile, documenter les limites et faire relire le diff.
- [x] Actualiser PROGRESS.md et enregistrer les corrections stables.

Décision : restaurer les textes historiques sans nouvelle réduction, avec un avertissement explicite et registre de validation. La restauration technique ne valide ni les statistiques ni les anciennes offres. Les contrôles serveur et Search Console restent hors accès local.

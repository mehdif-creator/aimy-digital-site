# Aimy Digital — Dossier de refonte Astro / Codex / GitHub / o2switch

**Date :** 10 octobre 2026  
**Objectif :** mettre en œuvre une refonte premium orientée conversion sans perdre les actifs SEO du site WordPress.

## Documents contenus

| Fichier | Usage |
|---|---|
| `01_CAHIER_DES_CHARGES_TECHNIQUE.md` | Objectifs, architecture Astro, design system, contenu, fonctions, QA et contraintes |
| `02_PLAN_MIGRATION_SEO.md` | Méthode de conservation d'URL, sauvegarde WordPress, redirections, cutover et surveillance |
| `03_PLAN_DEVELOPPEMENT_DETAILLE.md` | Roadmap phasée P0 à P6, responsabilités, critères Go/No Go, estimations |
| `04_MATRICE_URL_EXISTANTES.csv` | 20 URL visibles dans Search Console + 5 chemins 404 Site Kit, **inventaire à compléter** |
| `05_PROMPT_INITIAL_CODEX.md` | Premier prompt prêt à donner à Codex, volontairement limité au cadrage P0/P1 |

## Ordre de travail recommandé

1. Créer un **nouveau dépôt privé** `aimy-digital-site` dans le compte GitHub retenu.
2. Copier ces fichiers à la racine du dépôt (ou dans `docs/` en ajustant les chemins du prompt).
3. Démarrer Codex avec `05_PROMPT_INITIAL_CODEX.md` ; demander **un rapport de cadrage**, pas immédiatement une refonte complète.
4. Valider cible, direction artistique, vrais témoignages, autorisations de portfolio et inventaire complet WordPress.
5. Développer en branches, prévisualiser en staging puis seulement déployer sur o2switch.

## Attention

- La matrice de migration initiale n'est **pas exhaustive**. Elle reprend uniquement les URL des exports Search Console, pas toutes les pages WordPress.
- Les références SEO et performances proviennent des fichiers fournis et ne constituent pas une garantie d'amélioration.
- Ne pas insérer de secrets de connexion ou sauvegardes privées dans le dépôt.
- Publication sur o2switch non effectuée. Les prérequis et la racine documentaire restent à vérifier sur le compte réel.

## Documentation

- o2switch Git cPanel : https://faq.o2switch.fr/cpanel/fichiers/gitweb/
- o2switch SSH : https://faq.o2switch.fr/guides/webmastering/connexion-ssh/
- Astro deploy : https://docs.astro.build/en/guides/deploy/
- Google migration : https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=fr

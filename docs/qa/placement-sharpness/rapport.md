# Placement et netteté — 10 octobre 2026

## Périmètre final

Accueil : hero conservé, aperçu SC Rénovation et HT Créa Jeux, CTA « Découvrir toutes nos réalisations », puis contenu commercial existant. Aucun parcours complet sur l’accueil.

/portfolio/ : réutilisation des quatre chapitres et du même moteur GSAP. URL, title « Réalisations web », description et canonical conservés. Liens des fiches inchangés. Blog et infrastructure de migration inchangés.

## Cause mesurée

| Ancienne source | Largeur native |
| --- | ---: |
| HT Créa Jeux | 698 px |
| My NutriZen | 548 px |
| SC Rénovation | 779 px |
| Lambert Digital Pulse | 646 px |

À 1440 px de viewport, les interfaces étaient projetées jusqu’à environ 854–861 px, avec un zoom GSAP à 1,04. Les ressources disponibles ne couvraient même pas toujours 1× et encore moins 2×. `naturalWidth` peut être corrigé par la densité du srcset : le diagnostic compare les dimensions des fichiers décodés, pas seulement cette propriété DOM. Aucun filtre CSS blur/backdrop-filter ni opacité de flou sur les screenshots. La perspective et les matrices 3D provoquaient en plus du rééchantillonnage.

## Correction

- Captures authentiques directes à viewport 1440 × 1800, DPR 2, soit **2880 × 3600 pixels natifs** pour HT, NutriZen et SC. Aucun upscale ni contenu généré.
- Lambert : original **1920 × 945** de l’accueil publié Aimy Digital, vérifié à nouveau. L’ancienne URL ne passe plus la vérification TLS ; la capture du domaine actuel est incomplète. Elle a été inspectée et écartée. Le fichier original publié est utilisé, sans reconstruire l’interface. Le lien actuel lambertdigitalpulse.fr est confirmé dans le HTML du site Aimy.
- Variantes Astro entre 480 et 2880 px, limitées à la largeur native ; `sizes` adapté à l’espace réellement occupé ; qualité WebP 90, sources 92/95. Hero : variantes 360–1000 px issues des nouvelles sources, composition et animation inchangées.
- Aucun zoom au-delà de 1. Plans X/Y/Z à zéro en fin de mouvement, `force3D: false`, translation de l’image arrondie au pixel. Pendant la perspective, une interpolation géométrique est normale ; le résultat à l’arrêt est plat et conserve une densité suffisante.
- Lambert utilise un cadre adapté à son ratio original, sans étirement vertical ; largeur du cadre plafonnée à 960 px. Autres compositions plafonnées à 1140 px.

## Vérifications

- Astro check : 57 fichiers, aucun diagnostic.
- 9 tests existants réussis ; build production de 40 pages, audit sans erreur.
- 38 contrôles du parcours exécutés sur /portfolio/ : desktop/mobile, retour arrière, liens, axe, six largeurs, mode réduit système/manuellement, sans JS.
- `placement-sharpness-qa.mjs` : placement, CTA, SEO, axe de l’aperçu et densité des fichiers réellement servis à DPR 2 desktop / DPR 3 mobile ; mouvement et fin contrôlés, captures dans ce dossier. Résultats dans `report.json`.
- `portfolio-smoke.mjs` : clavier sur écran court, hero desktop après retour à l’accueil ; `docs/qa/portfolio/smoke.json`.
- Aperçu final staging noindex. Mesures Lighthouse précédentes historiques, non réutilisées comme résultats de cette correction. Pas de test sur appareil iOS physique.

Sources : `../portfolio/capture-sources.json`. Diagnostic avant : `../portfolio/sharpness-before.json`. Les anciennes images restent disponibles pour les pages hors périmètre ; aucun asset historique supprimé.

Aperçus : http://127.0.0.1:4322/ et http://127.0.0.1:4322/portfolio/.

**Validation visuelle en attente. Aucun déploiement.**

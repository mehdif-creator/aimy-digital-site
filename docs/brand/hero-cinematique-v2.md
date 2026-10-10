# Hero cinématique V2 — proposition à valider

Date : 10 octobre 2026. Périmètre : hero et liaison avec la section suivante uniquement.

## Trois scènes

1. **Impact** : « Votre savoir-faire mérite un site à sa hauteur. » Typographie bleu électrique, lumière diagonale et composition de trois véritables interfaces. La proposition cible artisans, entrepreneurs et entreprises locales.
2. **Transformation** : le navigateur SC Rénovation se redresse, son contenu défile et sa version mobile apparaît avec les accès réels au devis et à l'appel. Les autres projets passent au second plan. Le titre et les CTA restent lisibles.
3. **Réalisations** : les interfaces reprennent place dans une composition collective. La lumière devient horizontale, puis le fond rejoint progressivement la section existante via « Entrez dans les leurs ».

Les cartes fictives Aa/identité/contact ont été retirées. Le logo officiel est intégré au bleu nuit par traitement CSS, sans pastille blanche. Astro, GSAP et ScrollTrigger sont conservés. Le défilement reste natif et réversible. Aucun changement du portfolio, des articles ou de l'infrastructure SEO.

## Sources visuelles

- Les trois fichiers `public/images/hero/*-screen.webp` sont des recadrages des 1 250 premiers pixels des captures vérifiées correspondantes dans `public/images/projects/`. Les originaux du portfolio sont inchangés. Recadrage et compression uniquement, sans contenu fabriqué.
- `sc-renovation-mobile.webp` : capture directe de https://sc-renovation.com/, réponse HTTP 200, le 10 octobre 2026 à 16:54:38 UTC, viewport 390 × 844. Aucun formulaire envoyé.
- Images responsives produites par Astro ; priorité réseau donnée à SC Rénovation. Aucune vidéo, WebGL, génération payante ou service ajouté.

## Mouvement et accessibilité

Titre principal à pleine opacité durant tout le récit ; légendes successives déplacées verticalement. Durée de défilement contenue : 220 svh desktop, 195 svh mobile, sans verrouillage du scroll. Sur mobile, pas de délai d'entrée du texte ou des images. Préférence système, commande manuelle de réduction et rendu sans JavaScript disponibles. Survol réservé aux pointeurs fins.

## Jalon

**Non approuvé visuellement.** Arrêt obligatoire pour validation utilisateur. Ne pas commencer la refonte du portfolio. Recette et mesures : `docs/qa/hero-v2/rapport.md`.

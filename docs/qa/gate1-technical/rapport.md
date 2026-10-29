# Gate 1 — clôture technique du 11 octobre 2026

Design approuvé au commit 11acdb9, conservé. Aucun changement de composition, de texte, de CSS ni de timeline du hero.

## Mesures comparables

Lighthouse 13.5.0, Chrome headless neuf à chaque run, build production local, viewport 412 × 823, DPR 1,75, mobile simulé standard : RTT 150 ms, débit 1638,4 Kbit/s, CPU ×4. Aucun changement de configuration, cache préchauffé, retrait de contenu ou désactivation des animations. Chaque série est conservée, y compris les essais intermédiaires. Les noms des séries sont des étapes de diagnostic, pas des garanties de résultat.

| Run | Référence 11acdb9 | Version retenue (deferred) |
|---|---:|---:|
| 1 | 3165,34 ms | 2469,63 ms |
| 2 | 3166,65 ms | 2475,97 ms |
| 3 | 3167,34 ms | 2503,91 ms |

Médiane : 3166,65 → 2475,97 ms (−21,8 %). Performance 97 contre 93 ; accessibilité 100. Le troisième run dépasse 2,5 s de 4 ms : objectif atteint sur la médiane, marge faible, aucune garantie terrain. TBT et CLS détaillés dans lighthouse-deferred.json. Poids mesuré : 575190 → 458303 octets.

## Cause et modifications

LCP : capture SC Rénovation (`.shot-main img`). Les captures haute résolution introduites avant le Gate 1 ont changé le poids des ressources : la référence historique 2,49 s ne permet pas à elle seule d’attribuer la hausse aux nouvelles sections.

- SC : le sizes mobile de 320 px sélectionnait un WebP 720 px de 91806 octets transférés pour une image d’environ 266 px après transformation. Maintenant Picture AVIF avec secours WebP, quality 65, variantes 360/480/560/720/1000 ; sizes conservateurs 250/280/490 px. Aucune source agrandie.
- Images secondaires : sizes mobile 200 px au lieu de 240, correspondant à leur affichage réel ; définition desktop inchangée.
- Téléphone SC : le fichier unique 390 px de 37800 octets se chargeait en priorité moyenne pour environ 70 px à l’écran. Variantes 160/288/390, sizes 80/144 px, priorité basse ; toujours eager afin d’être disponible avant la scène 2.
- Gate 1 : initHomeExperience lançait immédiatement les calculs ScrollTrigger et refresh pour des sections éloignées. Initialisation désormais à 600 px de leur approche via IntersectionObserver ; contrôles, animations et retour arrière vérifiés. Aucune détection Lighthouse.
- Fonts locales Manrope avec font-display swap : mêmes ressources, aucune nouvelle police ; CSS/JS Gate 1 légers, pas de réseau tiers ni de vidéo. GSAP hero ne masque pas le LCP sur mobile et n’exécute pas son entrée desktop. Timeline conservée.
- Hypothèse testée puis rejetée : réserver la hauteur du hero avant GSAP n’a pas réduit les requêtes des images suivantes ni le LCP ; patch CSS retiré.
- Réduire quality 65 à 60 n’apportait presque rien : 65 conservé pour la qualité.

Lighthouse bonnes pratiques 96 : avertissement de résolution sur la vue arrière My NutriZen, calculé sur la largeur CSS avant la mise à l’échelle (348 px), plutôt que sa largeur réellement affichée (~198 px). Le fichier mobile sélectionné de 360 px couvre le DPR 1,75 réel ; desktop garde ses variantes. Vérification visuelle desktop et mobile DPR 2 aux trois scènes : pas d’agrandissement natif ni de filtre blur ajouté. Ne pas prétendre que cet audit automatisé est entièrement vert.

Documentation utilisée : https://docs.astro.build/en/reference/modules/astro-assets/ pour Picture, widths et sizes. Le test CSS abandonné utilisait https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/scripting.

## Recette et console

Chrome propre, sans extensions, à 320/375/390 px : menu tactile et Échap, services, FAQ clavier, parcours, CTA vers contact, retour, mouvement réduit, absence de débordement. Axe sur page entière et menu ouvert : zéro violation. Cibles principales vérifiées au moins 44 px de haut. 32 contrôles supplémentaires desktop/mobile passent, y compris mode sans JS et progression aller/retour.

Zéro avertissement console, erreur JavaScript ou requête échouée reproduit dans les trois contextes propres. Les messages de la vidéo DevTools n’ont pas été fournis : leur origine exacte reste non attribuée. Aucun script d’extension ne doit être déclaré responsable sans URL ou stack correspondante.

Build production 40 pages ; Astro check 63 fichiers, zéro diagnostic ; 9 tests réussis ; audit sans erreur, 121699 octets JS / 48436 gzip. Rapports JSON et captures joints.

Gate 2 autorisé par la dernière instruction : seulement HT Créa Jeux, puis arrêt pour approbation.

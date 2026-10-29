# HT Créa Jeux — raffinements après approbation, 11 octobre 2026

## Périmètre
Architecture et identité approuvées conservées. Aucune modification du hero, de l’accueil, des trois autres cas, du blog ou de la migration SEO. Aucun déploiement.

## Netteté : constat et correction
Sources vérifiées avec Sharp : accueil 2880 × 1800, fiche produit 2880 × 2200, mobile 780 × 1688. Captures authentiques existantes, provenance dans capture-sources.json. Aucun nouveau média fabriqué, aucune source agrandie.

Les écrans étaient inclinés (−2° ordinateur, +5° téléphone) puis redressés par GSAP : cette rotation rééchantillonne le texte rasterisé pendant la lecture. Les rotations des captures sont retirées ; la profondeur repose sur leurs positions, ombres et superpositions. Translations 2D avec force3D:false et positions entières dans le showcase. Aucun filtre de flou appliqué aux images.

Les nouveaux détails sont des fenêtres CSS sur la capture produit intégrale, pas des interfaces recomposées. sizes tient compte de la largeur réelle de l’image derrière le recadrage. WebP qualité 94 pour ces détails, 90 pour les écrans du showcase ; introduction AVIF/WebP qualité 85 conservée. Variante 2400 ajoutée pour le showcase. CaseImage plafonne toutes ses variantes à la largeur native.

Audit navigateur à DPR 2 aux largeurs 320/375/390/1440 : les 20 images sélectionnées disposent d’assez de pixels pour leur largeur de rendu, y compris derrière les recadrages. Données dans sharpness.json. Ce contrôle ne garantit pas tout appareil à DPR supérieur. La photographie imprimée du jeu est déjà douce dans la capture source ; aucun traitement ne prétend recréer des détails absents. Les textes de l’interface restent distincts de cette limite photographique.

## Récit et mouvement
Notre approche : démonstration visuelle de la colonne informations → quantité → panier, accompagnée de trois textes raccourcis. Sur mobile, cadrage resserré sur cette colonne. Identité : boîte et cartes réelles remplacent les grands aplats abstraits.

Introduction : translation légère, sans perspective 3D. Showcase : ordinateur et mobile se rapprochent sans rotation ni zoom. CTA final : translation courte à l’entrée, contenu toujours visible. Aucun pin ajouté. Préférence système, commande manuelle et contenu sans JS préservés.

Le contrat technique des futurs cas est consigné dans docs/brand/case-study-system.md. CaseImage est réutilisable, mais chaque projet doit conserver son récit et ses preuves propres. Aucun des trois autres cas n’est développé.

## Vérification
- Chrome propre : 320/375/390/768/1440 px ; zéro erreur console/avertissement, zéro violation axe, zéro débordement détecté ; captures décodées, liens internes HTTP OK et contact effectivement ouvert.
- Lien externe vérifié vers https://htcreajeux.fr/ avec nouvel onglet protégé ; aucun achat ni envoi de formulaire.
- Scroll aller-retour, transformations actives, réduction manuelle et système, contenu/contact sans JS vérifiés.
- 9 tests réussis ; Astro check : 72 fichiers, aucun diagnostic.
- Build production : 40 pages, audit sans erreur ; JavaScript 123407 octets brut / 49242 gzip, sous les budgets existants.

## Mesures réelles
Lighthouse 13.5.0, Chrome headless propre, simulation mobile par défaut, build de production local ; audits successifs sans build ni autre recette simultanée. Une mesure par page pour ce contrôle ciblé, donc pas une validation statistique ou terrain.

| Page | Performance | Accessibilité | Bonnes pratiques | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- |
| HT corrigé | 97 | 100 | 100 | 2,464 s | 0,00913 | 0 ms |
| Accueil, contrôle | 97 | 100 | 96 | 2,520 s | 0,000331 | 1,5 ms |

LCP HT identifié : `figure.ht-main-view > picture > img`, capture de l’accueil HT en introduction. LCP accueil : capture SC Rénovation du hero. L’accueil reste à la limite et dépasse 2,5 s sur ce contrôle ; ne pas annoncer ce problème définitivement résolu. Son code n’a pas été modifié pendant cette phase.

HT : poids observé 509113 octets, contre 265899 au jalon précédent. Les vrais détails visuels ajoutent du poids malgré leur chargement lazy ; le navigateur peut précharger les images proches du viewport. Le LCP passe de 2,366 à 2,464 s sur ces mesures ponctuelles : marge faible, suivie explicitement. Rapports complets et paramètres : lighthouse-refined.json et lighthouse-home-control.json. Le 96 de l’accueil conserve la réserve de résolution My NutriZen documentée au Gate 1.

## Validation attendue
Aperçu responsive : http://127.0.0.1:4322/portfolio/ht-crea-jeux/?cas=raffine
Captures desktop/mobile actualisées dans ce dossier. STOP avant les trois autres études de cas.

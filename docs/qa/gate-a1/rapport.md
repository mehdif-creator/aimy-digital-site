# Gate A1 — proposition cinématique à valider

13 octobre 2026. Le Gate A précédent est rejeté visuellement. Référence conservée : ec377bf. Seule la page `/creation-de-sites-internet/` est retravaillée ; aucune autorisation pour A2, Gate B ou production.

## Les cinq scènes

1. Ouverture : typographie découpée et interface SC Rénovation en entrée perspective sur ordinateur, puis stabilisée sans perspective pour la lecture. Sur téléphone, capture immédiatement stable ; animation typographique courte. CTA utilisable dès le départ.
2. Responsive : séquence ScrollTrigger réversible. Le masque et son cadre se resserrent réellement, la capture mobile est révélée verticalement, puis son contenu glisse pour montrer les actions appel/devis. Ce n’est pas une interpolation inventée d’un site : les deux captures authentiques sont identifiées. Progression utile sur environ une hauteur de viewport, sans verrouillage du scroll.
3. Explorateur : trois choix modifient capture, bénéfice, périmètre et lien commercial. SC prestations pour vitrine, HT produit pour commerce, SC galerie comme exemple de contenu à valoriser pour refonte. Cette dernière n’est jamais présentée comme un avant/après de refonte.
4. Décisions : trois commandes déplacent la vraie image et son cadre d’annotation vers navigation, hiérarchie de l’offre, puis contact. Les légendes expliquent la zone montrée. Les captures ne sont pas agrandies au-delà de leurs pixels disponibles.
5. Conclusion : tracé de progression de la méthode, signature AIMY et flèche au défilement, invitation à parler du projet. Les informations locales, la FAQ et les liens utiles restent dans le HTML.

## Interactions et alternatives

- Clic, toucher, Tab, flèches gauche/droite, Home et End pour les onglets, avec aria-selected, tabpanel et focus cohérent.
- Boutons de détail avec état aria-pressed et légende annoncée poliment.
- Défilement standard dans les deux sens ; pas de scroll hijacking.
- Mouvement réduit : aucun long espace sticky ; captures dans le flux, légendes et commandes toujours utilisables, aucun déplacement animé.
- Sans JavaScript : trois projets visibles, captures bureau et mobile dans le flux, explications des trois décisions et liens commerciaux accessibles. Contrôles dépendants de JS masqués.

## Vérification

Chrome propre,320/375/390/740/768/1440px, DPR2 ; tests au toucher sous760px. Cinq positions de scrub et retour à zéro, trois choix et trois détails, navigation clavier, CTA Contact, modes sans JS et reduced-motion. Aucun débordement, erreur console ou violation axe lors de la recette. Rapport browser.json.

Régression corrigée : le masque de départ `none` ne s’interpolait pas correctement vers un inset. Point de départ numérique explicite et mesures à0/25/65/100/0%. Revue indépendante en lecture seule : cadrage mobile initial non initialisé identifié puis corrigé. Test initial-vers-clic sans changement dans final.json.

Résolutions vérifiées à partir du fichier effectivement sélectionné, incluant le recadrage object-fit:cover et le double pixel. Aucune génération ni faux écran. La perspective n’est utilisée qu’à l’entrée sur ordinateur, sans flou CSS et sans zoom persistant.

Métadonnées et route inchangées, H1 unique, liens internes existants. Module CreationService chargé uniquement sur la route Création. Sources SEO inchangées depuis ec377bf ; homepage, cas, blog et migration non modifiés.

## Budget et mesures

Le module de cette expérience ajoute4127octets brut /1814gzip au total construit, désormais128732/51813octets. GSAP/ScrollTrigger sont mutualisés. L’enveloppe de contrôle globale est explicitement révisée de125/50Ko à130/52Ko pour le nouveau périmètre interactif demandé ; aucun autre seuil de qualité n’est assoupli. Les mesures Lighthouse restent indépendantes de ce budget.

Première série mobile standard : LCP2,686/2,657/2,720s. Élément : image du hero. Tentative d’intégration CSS inline :2,776/2,768/2,786s, sans amélioration ; tentative annulée. Capture mobile stabilisée immédiatement et lettres décoratives en700 :2,367/2,621/2,632s. La graisse800 du footer partagé reste chargée ; ne pas attribuer un gain réseau à ce simple changement décoratif.

Les traces montrent des polices découvertes environ100ms après l’image. Préchargement des graisses400/600/700 limité à cette page : CLS abaissé à0,000072 ; LCP2,156/2,609/2,611s, encore insuffisant. L’image e-commerce inactive était demandée au démarrage : panneaux non actifs masqués dès le HTML/CSS, rétablis avec noscript. La requête e-commerce disparaît de la trace ; une autre image lazy plus bas entre alors dans le seuil de chargement du navigateur. Ne pas confondre ce changement avec une baisse du total transféré.

Variantes du hero mieux adaptées aux petits écrans (dont768px) : LCP2,523/2,526/2,524s. Essai WebP85 pour le seul hero :2,519/2,527/2,552s, sans gain fiable. Essai annulé, retour à WebP90 ; démonstrations93/95 inchangées, pixels natifs préservés. Les mesures successives, y compris les tentatives moins bonnes, sont conservées.

La configuration retenue correspond donc à la série `creation-a1-panels` : LCP2,523/2,526/2,524s, médiane2,524s ; performance97/97/97, accessibilité100, bonnes pratiques100, CLS0,000072, TBT0. **La cible LCP≤2,5s reste légèrement dépassée ; aucune conformité à cette cible n’est revendiquée.** Les rapports contiennent paramètres, version Lighthouse et élément LCP. Simulation réseau mobile/CPU×4, Chrome propre, exécutions séquentielles sans builds concurrents. Pas de déclaration de Core Web Vitals terrain ni d’INP depuis ces mesures.

Build production40pages et audit réussis ;9tests automatisés passants. Astro check104fichiers :0erreur,0warning,1hint préexistant sur l’ancien script remaining-cases-links.mjs. Le contrôle du budget n’établit ni la qualité créative ni le respect du LCP : la réserve ci-dessus reste explicite.

## Fichiers

- src/components/CreationService.astro : scènes, médias et contenu existant réorganisé.
- src/pages/creation-de-sites-internet.astro et src/layouts/BaseLayout.astro : slot head facultatif et préchargements utilisés seulement sur Création, métadonnées inchangées.
- src/components/CreationExperience.ts : mouvements et interactions uniquement sur cette page.
- src/styles/creation-cinema.css : composition et responsive propres au Gate A1.
- scripts/check-build.mjs : enveloppe JS documentée pour l’interactivité demandée.
- scripts/gate-a1-qa.mjs, gate-a1-final.mjs, gate-a1-performance.mjs : recettes reproductibles.
- PROGRESS.md, plan, rapports et captures : état et preuves du jalon.

## Aperçu

http://127.0.0.1:4322/creation-de-sites-internet/?gate=a1

Ordinateur : recharger pour voir l’entrée, descendre et remonter la transformation, sélectionner les trois projets puis les trois détails. Mobile : utiliser le mode responsive390px dans le navigateur local, puis320/375px si souhaité ; le scroll responsive et les commandes tactiles restent actifs. Pas de prétention de test sur téléphone physique.

STOP pour validation visuelle. Les résultats techniques ne valent pas approbation créative.

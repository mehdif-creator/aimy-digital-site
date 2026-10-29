# Huit pages — livraison pour validation visuelle globale

13 octobre 2026. Branche `refonte/astro-premium`. Aucun déploiement ni push. Aperçu local en préproduction (`noindex`). Sauvegarde antérieure : `backup/avant-huit-pages-2026-10-13` sur `ed15fcb`.

## Pages réalisées

| Aperçu | Direction et interaction | Objectif commercial | Intention SEO |
|---|---|---|---|
| [SEO local](http://127.0.0.1:4322/referencement-seo/) | Recherche illustrative et diagnostic à huit entrées | Comprendre les freins puis demander un état des lieux | SEO Deux-Sèvres, Mauléon et bassin de Cholet |
| [Publicité](http://127.0.0.1:4322/publicites-sea/) | Parcours annonce → destination → action → mesure | Cadrer une stratégie d’acquisition | Publicité digitale / Google Ads pour entreprises locales |
| [Maintenance](http://127.0.0.1:4322/maintenance-et-securite/) | Couches techniques sélectionnables et responsabilités comparées | Demander une évaluation du suivi nécessaire | Maintenance et sécurité de site internet |
| [Prestations](http://127.0.0.1:4322/nos-prestations/) | Explorateur de six besoins avec interfaces authentiques | Orienter vers la prestation pertinente | Prestations web et digitales, maillage des services |
| [Agence](http://127.0.0.1:4322/a-propos/) | Manifeste éditorial et atelier en quatre étapes | Établir la confiance et identifier l’interlocuteur | Agence web de proximité, Mauléon et Bocage |
| [FAQ](http://127.0.0.1:4322/faq/) | Recherche locale, catégories, réponses associées | Lever les objections avant le contact | Questions de budget, délais, gestion et collaboration |
| [Journal](http://127.0.0.1:4322/blog/) | Magazine asymétrique, une et filtres historiques | Éclairer les choix et relier aux services | Articles existants : web, SEO, acquisition et maintenance |
| [Contact](http://127.0.0.1:4322/contact/) | Composition en deux volets, choix visuel et validation | Faciliter une prise de contact sans parcours imposé | Contact Aimy Digital, coordonnées locales vérifiées |

Les contrôles sont progressifs : boutons utilisables au clavier, tout le contenu des explorateurs disponible sans JavaScript, accordéons natifs, mouvements désactivés avec la préférence de réduction. Les simulations ne représentent aucun classement, résultat de campagne ou monitoring client réel. Aucune fonction d’automatisation non confirmée n’a été ajoutée.

## Performances mesurées

Lighthouse 13.5.0, Chrome headless propre, mobile simulé, paramètres par défaut, build de production local. Audits séquentiels sans build ni QA lourde simultanés. Ce sont des mesures de laboratoire, pas des données terrain de production. Un audit par page ; FAQ : trois audits comparables sur la correction finale, médiane affichée. Journal remesuré après stabilisation du filtre.

| Page | Performance | LCP | CLS | Élément LCP réel |
|---|---:|---:|---:|---|
| SEO local | 99 | 1.759 s | 0.0482 | `<h1>` |
| Publicité | 98 | 1.738 s | 0.0611 | `<p class="intro" data-astro-cid-a6ftozx6="">` |
| Maintenance | 99 | 1.742 s | 0.0377 | `<h1 data-astro-cid-vchqwfbp="">` |
| Prestations | 98 | 2.022 s | 0.0435 | `<h1 data-astro-cid-t7gdtybp="">` |
| Agence | 98 | 2.164 s | 0.0188 | `<h1 data-astro-cid-yqgl57wo="">` |
| FAQ | 99 | 1.834 s | 0.0000 | `<h1 data-astro-cid-vagwt47q="">` |
| Journal | 99 | 2.121 s | 0.0015 | `<h1 data-astro-cid-x255k2k2="">` |
| Contact | 100 | 1.535 s | 0.0009 | `<p class="intro" data-astro-cid-6bfsojfh="">` |

Accessibilité et bonnes pratiques Lighthouse : 100 sur les huit pages. TBT : 0 ms sur les audits retenus. Résultats complets et paramètres dans `performance-final.json` ; les essais antérieurs sont conservés séparément.

FAQ : CLS initial 0,248. Afficher la recherche dès le HTML initial et réserver le statut réduit une partie du déplacement. Le diagnostic PerformanceObserver a aussi identifié le retour à la ligne des catégories au chargement de Manrope. Préchargement ciblé 400/600/700 sur cette seule page et grille mobile stable : trois audits finaux LCP 1,849 / 1,834 / 1,837 s, CLS 0 à chaque passage. Aucun affaiblissement de l’environnement de test.

## Vérifications

- Production et staging : 40 pages construites, audits URL/canonical/liens/sitemap/robots sans erreur.
- Astro : 0 erreur, 0 avertissement ; un hint antérieur relatif à `waitForNavigation` dans un ancien script de recette.
- Suite existante : 9/9 tests réussis.
- 48 configurations : les huit pages à 320, 375, 390, 768, 1024 et 1440 px, zéro débordement et zéro violation axe détectée, zéro erreur console/application. FAQ et journal recontrôlés après la correction de stabilité.
- 16 contrôles approfondis (390/1440) : tous les panneaux, axe dans chaque état, menu mobile/Escape, liens internes HTTP 200, décodage des images après défilement et largeur affichée inférieure ou égale à la résolution du fichier servi.
- Tests spécifiques : recherche accent-insensible, zéro résultat, toutes les catégories réelles, article multi-catégories, réponse FAQ associée avec filtre actif, validation email et contrat HTTP du formulaire.
- Sans JavaScript : contenus essentiels, liens et panneaux conservés ; filtres inactifs masqués. Reduced-motion : interactions conservées sans animations GSAP.
- Revue indépendante : deux défauts reproduits puis corrigés avec tests (catégories multiples et compteur FAQ). Détails dans `review.md`.

## Fichiers et composants

Pages : `src/pages/{a-propos,contact,faq,nos-prestations,publicites-sea,maintenance-et-securite}.astro`, `src/pages/blog/index.astro`, composant `src/components/SEOService.astro` utilisé par la route SEO existante.

Partages ciblés : `CommercialInteractions.astro` (choix, filtres, mouvement), `commercial-premium.css` (primitives sous `.premium`), `ContactForm.astro` (uniquement utilisé sur Contact), `lib/help.ts`. Styles propres au SEO dans `seo-service.css`, styles locaux pour les autres compositions. Routage générique : seules SEA et maintenance retirées de la génération générique pour leurs pages dédiées ; articles inchangés.

Médias : véritables captures SC Rénovation et HT Créa Jeux réutilisées, couvertures historiques du journal optimisées via Astro en WebP 88, largeurs plafonnées aux originaux. Aucun nouveau média payant/généré. Les couvertures de petite résolution ne sont pas élargies au-delà de leur largeur native.

Tests reproductibles : `scripts/eight-pages-qa.mjs`, `eight-pages-deep-qa.mjs`, `eight-pages-interactions.mjs`, `eight-pages-performance.mjs`. Les deux variables facultatives du dernier script sont `QA_ROUTES` (liste séparée par virgules) et `QA_LABEL` (nom du rapport).

Budget JavaScript global de tous les bundles : 131 811 octets / 53 190 gzip. Limite ajustée explicitement à 135/54 Ko (ancien 130/52 Ko), pour les contrôles des huit pages. Ce total n’est pas chargé sur chaque page. Les pages protégées n’importent pas le nouveau module.

## Préservé

Aucune modification de l’accueil, du hero, de `/creation-de-sites-internet/`, du portfolio, des quatre études de cas, des onze articles, des pages juridiques, des layouts, de l’en-tête et du footer. Les adresses existantes, les coordonnées officielles et les liens juridiques sont conservés. Aucun projet exclu réintroduit.

## Réserves avant publication

1. **Envoi Contact non activé.** L’interface est terminée et les contrats d’erreur/réussite sont testés avec réponses interceptées. Le transport PHP/SMTP réel et la réception ne sont pas validés. Le formulaire reste désactivé avec accès email/téléphone ; aucune fausse réussite. Voir `contact-readiness.md` pour les paramètres privés et la recette nécessaire sur o2switch. Ne pas envoyer les secrets dans Git.
2. **Onze articles historiquement incomplets.** L’audit contre l’archive WordPress révèle 4 à 10 % du volume initial restant. Aucun article n’a été réécrit ici. Le détail par URL est dans `article-integrity.md` et `.json`. Leur restauration avec vérification éditoriale doit être traitée avant de présenter la migration comme complète.
3. Les confirmations de traitement des données déjà signalées dans la politique de confidentialité restent à finaliser (messagerie, accès, conservation). Cette mission ne les invente pas.

## Git et suite

Lots stables : `46112fb` (SEO/SEA/maintenance), `b9d001f` (prestations/agence), puis commit du lot conversion/ressources et de la recette finale indiqué dans `PROGRESS.md` et le journal Git. Les commits sont locaux.

Les huit pages sont soumises ensemble à validation visuelle. Aucun déploiement ni travail supplémentaire sur les pages protégées sans nouvelle instruction.

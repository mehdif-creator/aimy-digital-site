# Gate A — audit ciblé et plan, 13 octobre 2026

## Périmètre
Deux pages uniquement : création de sites et référencement SEO. Le brief donne déjà les objectifs, publics, marque, zones, preuves et limite de livraison ; aucune découverte redondante. Conserver les huit autres pages, accueil, cas, sous-services, blog et migration. Confirmation juridique effectuée séparément au commit a502329.

## Architecture et dix routes auditées
| Route | Actuel | Intention et décision |
|---|---|---|
| /creation-de-sites-internet/ | services site.ts + [...path].astro | Création professionnelle locale, nouvelle route dédiée |
| /referencement-seo/ | Même gabarit générique | Visibilité locale, nouvelle route dédiée |
| /portfolio/ | Route dédiée, CinematicPortfolio | Preuves et cas conservés ; Gate B pour contexte |
| /a-propos/ | Deux colonnes + CTA | Confiance locale ; président confirmé mais expérience non fournie |
| /blog/ | Liste chronologique, sans catégories visibles | Gate B magazine ; complétude des articles reste un blocage avant production |
| /contact/ | Formulaire existant désactivé, coordonnées SASU | Gate B ; SMTP réel non validé, ne pas activer |
| /nos-prestations/ | ServiceCard répété | Gate B découverte interactive |
| /publicites-sea/ | Route dynamique commune | Gate B parcours d’acquisition |
| /maintenance-et-securite/ | Route dynamique commune | Gate B fiabilité et périmètre contractuel |
| /faq/ | Cinq questions communes | Gate B organisation thématique |
Métadonnées/canonicals existants uniques et URLs conservées. Actuellement les services répètent la même FAQ et listent tous les autres services sans contextualisation. Pour Gate A : FAQ propres à chaque intention, liens contextualisés vers cas, sous-services et contact. Aucun changement aux autres pages.

## Sources consultées
- Cahier technique et brief projet, docs/brand/design-system.md, composants hero et études de cas approuvés.
- ../AIMY DIGITAL/Mots-clés Aimy Digital.docx : liste de recherche large, pas un catalogue de prestations validé. Ne pas reprendre audit gratuit, écoconception certifiée ni garanties.
- aimy-digital-refonte-codex/data/search-console-90j.xlsx : Graphique07/07–06/10/2026, Requêtes, Pages, Pays, Appareils et Filtres. Agence SEO Deux-Sèvres174 impressions/0clic/position18,5 ; agence web Mauléon82/0/15,87. Pages création9impressions/0clic, SEO8/0. Faibles volumes historiques : pas de prédiction, pas de preuve commerciale publiée. Les requêtes maintenance hors zone ne justifient aucune page géographique.
- Captures réelles SC et HT et leur provenance QA. Aucun nouveau média généré.

## Direction distincte
Création : ouverture navy sur une grande typographie et une composition de vrais sites ; atelier de choix vitrine/boutique/refonte, preuve bureau/mobile, étapes de réalisation et FAQ. Manrope existante, #071426/#edf5fa/#0686ce, preuves SC et HT. Le récit part du métier pour rejoindre le livrable.
SEO : ouverture claire, question éditoriale et parcours de recherche schématique interactif (explicitement pas un résultat Google). Fond navy pour les étapes techniques, exemple de page réelle SC sur la clarté métier/territoire (pas un résultat SEO), mesure Search Console expliquée sans chiffres inventés. La composition suit l’intention jusqu’au contact.
Réutiliser EvidenceMotion existant pour une seule composition réelle et native details pour les interactions ; aucun nouveau JS, vidéo ou framework. Les exemples pédagogiques sont identifiés comme tels.

## Exécution
- [x] Routes dédiées, composants distincts et CSS local ; exclure uniquement deux services de la génération dynamique. Titles/descriptions/H1 spécifiques, canonicals inchangés. Contenu concret : livrables, cibles, cas réels, méthode, FAQ, localité, CTA.
- [x] QA320/375/390/768/1440, clavier/details/CTA/retours, reduced-motion, imagesDPR2, axe, console. Analyse HTML : H1unique, niveaux, métadonnées, liens, schéma Organization réel.
- [x] Buildproduction+tests+budgets ; Lighthousemobile trois mesures comparables par page, cible LCP≤2,5s/CLS≤0,1 ; ne pas annoncer INP terrain depuis Lighthouse.
- [x] Commit et PROGRESS, aperçusstaging, STOPGateA. GateB/C non autorisés avant validation.

## Informations encore manquantes
Offre Google Business Profile détaillée, délais/prix/forfaits, parcours/expérience du fondateur, automatisation, droits et complétude éditoriale historique, serveurSMTP/réception, durées de conservation. Ne pas transformer ces absences en promesses ; ne pas les bloquer pour construire les deux pages avec faits déjà vérifiés.


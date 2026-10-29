# Huit pages premium — plan d’exécution

> Exécution native avec superpowers:executing-plans. Le brief utilisateur autorise explicitement les trois lots sans validation intermédiaire.

**Objectif :** finaliser les huit URL existantes, puis demander une seule validation visuelle globale.
**Architecture :** compositions Astro distinctes, styles locaux, interactions progressives. Primitives de choix et filtrage partagées uniquement entre les nouvelles pages. Aucun changement des pages protégées.
**Stack :** Astro, TypeScript, CSS, GSAP/ScrollTrigger existants, Playwright, axe, Lighthouse.
**Source :** pièce jointe 648a30ae-2ad1-4ab2-b662-113792e9e16e/Texte collé.txt.

## Contraintes
- Aucun déploiement, actif payant, chiffre commercial inventé ou résultat simulé présenté comme réel.
- Préserver homepage, création de sites, portfolio, études de cas, articles et juridique.
- URL et métadonnées conservées ; seules SEA/maintenance sortent du routage générique.
- Sauvegarde : tag local backup/avant-huit-pages-2026-10-13 sur ed15fcb.

## Points de recette prioritaires
Clavier et retour arrière des choix ; contenu accessible sans JS ; réduction des animations ; aucun débordement à 320 px ; formulaire désactivé honnêtement sans SMTP validé.

## Lot 1 — acquisition et continuité
- [x] SEO : recherche illustrative, parcours au défilement, diagnostic à huit entrées, méthode et ancrage local. SEOService.astro, seo-service.css.
- [x] SEA : parcours commandé annonce/page/action/mesure, explications du budget et du ciblage. publicites-sea.astro.
- [x] Maintenance : coupe interactive en couches du système, responsabilités hébergement/maintenance. maintenance-et-securite.astro.
- [x] Styles et contrôleur strictement réservés aux nouvelles pages. Tester choix au clavier, no-JS, reduced motion, builds et liens avant commit.

## Lot 2 — orientation et agence
- [x] Prestations : six besoins, recommandations réellement différentes, cas vérifiés, liens vers les services. nos-prestations.astro.
- [x] Agence : manifeste éditorial et atelier en quatre étapes avec vraies interfaces. a-propos.astro.
- [x] Vérifier les cas, coordonnées, responsive et accessibilité puis commit.

## Lot 3 — conversion et ressources
- [x] Contact : sélection visuelle native, validation accessible, conserver backend sécurisé et réponse réelle uniquement. contact.astro, ContactForm.astro.
- [x] FAQ : données de questions réelles, filtre catégories/recherche accent-insensible, liens associés et zéro résultat. faq.astro, lib/help.ts.
- [x] Journal : une et composition éditoriale asymétrique, filtres sur catégories historiques, préserver dates/URL/articles. blog/index.astro.
- [x] Audit comparatif du contenu historique des onze articles, rapport des pertes sans les réécrire.
- [x] Recette six largeurs 320/375/390/768/1024/1440, axe, clavier, sans JS, console, production et staging, Lighthouse mobile. Commit stable.

## Livraison
Revue indépendante finale, corrections importantes, rapport global et PROGRESS ; huit aperçus locaux, mesures réelles, limites SMTP et articles clairement indiquées. Arrêt pour validation visuelle globale.

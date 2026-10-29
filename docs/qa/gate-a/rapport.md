# Gate A — pages commerciales de référence

13 octobre 2026. Deux pages seulement : création de sites et référencement SEO. Gate B attend l’accord visuel. Aucun déploiement.

## Réalisation

- Création : ouverture navy avec capture authentique, choix vitrine/boutique/refonte interactif, démonstration SC ordinateur/mobile, fiche produit HT Créa Jeux, livrables, quatre étapes et six questions propres au service.
- SEO : ouverture claire éditoriale, parcours de recherche explicatif à quatre étapes interactives, priorités techniques et éditoriales, exemple SC explicitement distinct d’un résultat SEO, contexte local, mesure expliquée et six questions spécifiques.
- Aucune promesse de classement, statistique commerciale, faux établissement ou témoignage inventé. Ancrage Saint-Amand-sur-Sèvre/Mauléon et zone Bocage ; pas de pages géographiques artificielles.
- Deux routes dédiées et deux composants/styles propres ; seule exclusion de ces deux routes dans la génération générique. Blog, autres prestations, homepage, portfolio et études de cas inchangés.
- Réutilisation de la FAQ et du mouvement GSAP existants. Translation verticale limitée à36px sur une composition, sans zoom ni opacité, désactivée sur mobile et avec mouvement réduit. Aucun nouveau JavaScript.

## Images

Sources authentiques déjà vérifiées dans les cas clients. Variantes bornées par la résolution native dans CaseImage. Le hero utilise une source SC2880px, sans suréchantillonnage. Qualité88 pour le hero,93 pour les compositions.

La recette a détecté un `sizes` sous-estimé sur l’image SEO : largeur réelle709px, choix1380px insuffisant pour DPR2. Correction de la largeur annoncée à720px sur grand écran, sélection1600px. Nouvelle recette sans erreur. Les variantes1440px assurent aussi les affichages mobiles larges de la page Création. Aucun filtre de flou ni perspective.

## Vérifications

- Build production :40pages ; audit canonicals/sitemap/liens/budget sans erreur.
- JS global124605octets brut /49999gzip, budget préservé.
-9tests automatisés réussis. Astro check :0erreur,0warning ;1hint préexistant sur waitForNavigation dans l’ancien script remaining-cases-links.mjs.
- Chrome propre :320,375,390,740,768,1440px, DPR2, les deux pages. Aucun débordement, aucune violation axe, aucune erreur console/application. Captures des introductions et pages complètes archivées.
- Tous les accordéons exercés au clavier ; CTA vers Contact avec et sans JavaScript ; reduced-motion dynamique ; déplacement GSAP constaté sur desktop et supprimé en mode réduit. Contrôle des sources sélectionnées de chaque image par rapport à leur affichage DPR2.
- Deux H1 uniques, hiérarchie sans saut, titles/descriptions distincts, canonicals préservés, Schema.org Organization existant conservé. Liens internes vers des fichiers construits existants. Navigation mobile Enter/Escape vérifiée.
- Sources de méthode : [Google, critères locaux](https://support.google.com/business/answer/7091?hl=fr), documents projet et export Search Console historique, sans transformer ces données en résultats actuels.

## Performance mobile mesurée

Lighthouse13.5, Chrome headless propre, build de production local, simulation mobile standard (réseau et ralentissementCPU×4), six exécutions séquentielles sans build ou tests concurrents. Pas de modification du profil pour améliorer le score. Rapports JSON individuels joints, dont paramètres et élément LCP.

| Page | LCP1 | LCP2 | LCP3 | Médiane | Performance | CLS |
|---|---:|---:|---:|---:|---|---:|
| Création |2,255s|2,317s|2,045s|2,255s|98/97/99|0,00196|
| SEO |1,897s|1,443s|1,432s|1,443s|99/100/100|0,00310|

Accessibilité100 et bonnes pratiques100 sur les six mesures ; TBT0ms. LCP Création : image SC du hero (`figure.creation-hero-work > img`). LCP SEO : paragraphe introductif (`p.commercial-lead`). Toutes les mesures respectent LCP≤2,5s et CLS≤0,1. Mesures de laboratoire locales : elles ne constituent pas des Core Web Vitals terrain, notamment pas une mesure INP.

## Aperçus et limites

- http://127.0.0.1:4322/creation-de-sites-internet/
- http://127.0.0.1:4322/referencement-seo/

Aperçus finaux en staging noindex, formulaire désactivé comme auparavant. Aucune réception SMTP ni publication validée par cette recette. Les réserves juridiques restantes, la complétude des articles historiques et les contrôles de migration restent des gates avant production. Gate A attend la validation visuelle de l’utilisateur ; ne pas commencer les huit autres pages.

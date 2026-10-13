# Recette des deux dernières études de cas — 13 octobre 2026

## Livraison et preuves
SC Rénovation : captures du site public HTTP200 à 1440/390 CSS px, DPR2 (2880×2000 /780×2000). Quatre contributions : grille de six prestations, galerie de comparateurs, double accès devis/appel, barre de contact mobile. Les chiffres commerciaux visibles dans les captures ne sont pas repris comme résultats d’Aimy.
Lambert : archive authentique publiée sur Aimy, 1920×945, provenance dans docs/qa/portfolio/capture-sources.json. Trois recadrages PNG sans agrandissement :1060×230,610×280,570×320. Contributions : identité dans l’en-tête, hiérarchie métier/localité/marque, accès services/rendez-vous ; portrait et présentation complètent le récit. Affichage maximal960/530/305/285 CSS px, densité2 respectée.

La tentative actuelle sur l’ancienne adresse échoue TLS ; le domaine lambertdigitalpulse.fr confirmé dans les sources Aimy alterne200/429. La dernière visite ordinateur HTTP200 confirme le texte mais donne un rendu incomplet, inspecté et écarté. Mobile429 : aucune capture mobile authentique disponible. À fournir pour compléter : accueil mobile et rubrique services/contact en pleine résolution, après chargement complet. Le fonctionnement actuel des interactions externes Lambert n’est pas validé. Aucune capture inventée.

## Vérifications
- Chrome propre320,375,390,768,1440 DPR2 : aucune erreur console/application, aucun débordement de document, aucune violation axe ; images chargées et sélection responsive vérifiées.
- Retour portfolio (deux liens/page), CTA contact, mode sans JavaScript, scroll et changement dynamique reduced-motion contrôlés. Les liens externes ont répondu200 lors du test de navigation ; Lambert reste intermittent.
- Build production40 pages ;9 tests automatisés passants ; Astro check sans diagnostic.
- GSAP/ScrollTrigger partagé entre ces deux pages : déplacement limité36px, sans zoom, rotation ou pin. Vue mobile SC et détail message/actions Lambert. Aucun mouvement mobile ou en reduced-motion.
- JS124605 brut/49999 gzip : budgets inchangés125000/50000. Marge faible explicitement conservée.
- Revue indépendante ciblée : pas de défaut bloquant ; complété le contrôle des retours et visites externes demandé par la revue.

## Lighthouse mobile
Réglages standards Lighthouse13.5, build production local, Chrome propre, CPU×4/réseau simulé, une mesure ciblée par page ; pas une médiane ni des données terrain.
| Page | Performance | Accessibilité | Bonnes pratiques | LCP | CLS | TBT |
|---|---|---|---|---|---|---|
| SC |95|100|100|2,760s|0,00133|0ms|
| Lambert |100|100|100|1,517s|0,00037|0ms|
LCP SC : image de l’accueil dans sc-elevation. LCP Lambert : voir nœud exact dans lighthouse-lambert-digital-pulse.json. SC reste au-dessus2,5s ; optimisation globale non entreprise, conformément au périmètre.

Les pages approuvées, blog et infrastructure SEO sont préservés. Aucune publication. Validation visuelle attendue ; la nouvelle instruction juridique autorise ensuite uniquement la mise à jour SASU distincte.

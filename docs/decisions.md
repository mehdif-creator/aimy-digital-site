# Décisions de refonte

Date : 10 octobre 2026.

- Reprise créative : direction précédente non approuvée. Nouveau hero seul, puis arrêt imposé pour validation avant tout changement du portfolio ou des autres pages. Sauvegarde `sauvegarde/avant-hero-cinematique` poussée au commit `a44f04f`.
- GSAP/ScrollTrigger explicitement demandés : exception à l'ancienne décision « pas de GSAP en V1 ». Package 3.15.0 compilé localement, seulement à l'accueil ; API `matchMedia` et nettoyage vérifiés via documentation officielle GSAP/Context7.
- Budget JS révisé pour cette dépendance : maximum 125 ko bruts / 50 ko gzip pour tous les scripts distribués, contrôle de non-chargement du hero sur les autres routes. Cette concession est mesurée et documentée, sans moteur 3D ni vidéo.

- Le master prompt fourni dans cette conversation prévaut sur les anciens prompts du dossier source, limités à P0/P1.
- Le dépôt existant est conservé. Le code sera placé à sa racine ; le dossier de cadrage reste intact.
- Branche de travail : `refonte/astro-premium`. Aucun déploiement en production.
- Astro statique et o2switch priment sur les prescriptions HTML/Hostinger du skill 10K. Application de ses principes de design préalable, maîtrise des médias et QA, sans vidéo imposée.
- Direction autorisée par défaut dans le master prompt : éditorial premium, mouvements CSS ponctuels, logo existant conservé. Aucun achat ou génération payante.
- Correction utilisateur prioritaire : portfolio limité à HT Créa Jeux, My NutriZen, SC Rénovation et Lambert Digital Pulse. Les références historiques contradictoires ne doivent jamais réapparaître dans le contenu commercial. Informations légales actualisées à confirmer. Aucune métrique client ne sera inventée.
- Les captures WordPress publiques sont stockées sous `.private/`, exclues de Git et de la distribution. Elles ne constituent pas une sauvegarde SQL/fichiers restaurable.
- Node système 20.19.4 ; runtime Node 24.19.0 disponible avec Codex, à utiliser pour Astro récent.
- `lovable-web-knowledge` : UNAVAILABLE dans le dépôt fourni, aucun parcours de dossiers externes.
- L'import historique produit des brouillons privés pour protéger les textes révisés. La forte réduction des 11 articles est explicitement bloquante pour une migration SEO définitive.
- Revue indépendante : trois risques corrigés (écrasement éditorial, consentement entre onglets, emplacement du stockage PHP). Deux régressions exécutées ; contrôle PHP différé à un environnement disposant de PHP.
- La lecture de `.env` dans la configuration Astro et l'audit de build utilise Vite `loadEnv`, conformément à la documentation officielle Astro consultée via Context7. Un test vérifie la génération du sitemap avec `.env` seul.
- Aucun script d'analytics tiers chargé ; les événements internes sont conditionnés au consentement. L'intégration d'une destination analytics et l'attribution de conversion restent à valider.

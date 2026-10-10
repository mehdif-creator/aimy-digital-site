# Décisions de refonte

Date : 10 octobre 2026.

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

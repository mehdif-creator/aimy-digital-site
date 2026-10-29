# État initial

Audit public effectué le 10 octobre 2026. Dépôt initial : dossier de cadrage, logo et deux exports de mesure, aucun site Astro.

## Sources et méthode

Lecture des quatre documents de cadrage, inspection du logo, requêtes directes vers l'accueil et le portfolio avec `Cache-Control: no-cache`, API REST paginée, sitemaps et crawl des liens internes. Résultats bruts locaux sous `.private/wordpress/`, hors distribution et hors Git. Le site distant n'a pas été modifié.

API publique : 19 pages, 11 articles, 8 catégories, aucun tag, 114 médias. Crawl : 89 URL avec variantes, redirections suivies et statuts finaux. Ce périmètre ne couvre pas les pages privées, les liens entrants, les logs, la base SQL ou les réglages de plugins.

## Constats

- Les quatre projets actuels sont HT Créa Jeux, My NutriZen, SC Rénovation et Lambert Digital Pulse. Vérification fraîche conforme à la correction explicite du propriétaire.
- Le contenu de Contact mêle coordonnées Aimy et données de démonstration étrangères : celles-ci ne sont pas reprises.
- Des témoignages et des chiffres de résultat de l'accueil ne disposent pas de preuve indépendante : exclus de la refonte.
- Les articles historiques contiennent des promesses, tarifs et résultats non sourcés ; révision détaillée dans `docs/content/copy-review.md`.
- `/app/` et `/youtube-competitor-radar/` sont protégés par mot de passe. Aucun contournement ni accès privé effectué.
- `/optimisation-webinaire/` répond mais ne fournit pas de contenu public utile dans les sources récupérées.
- `/automatisations/` est actuellement 404. Aucun service ou contenu correspondant n'est inventé.
- Plusieurs longs slugs du CSV redirigent déjà vers les slugs REST actuels ; le rapport distingue URL observée et destination finale.

## Mesures historiques

Les documents fournis rapportent environ 1 309 impressions et 5 clics GSC pour le 07/07–06/10/2026 ; Site Kit rapporte LCP laboratoire mobile 8,9 s et CLS 0,205. Ces chiffres sont attribués aux documents historiques, pas à une nouvelle mesure ni à une nouvelle lecture des exports bruts. Zéro événement enregistré n'établit pas zéro demande réelle.

## Prérequis manquants

Sauvegarde SQL/fichiers testée, export des redirections, configuration des formulaires, intégrations des pages privées, accès contrôlé o2switch, identité juridique actualisée, décision éditoriale finale et reçus de tests SMTP.

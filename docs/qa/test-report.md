# Rapport de recette — 10 octobre 2026

Version de travail locale. Ce rapport ne valide aucune bascule en production.

## Environnement et commandes

Windows, Node 24.19.0, Astro 7.3.8, Chrome local headless. Commandes exécutées avec le runtime Node 24 (le Node système 20 n'est pas compatible).

| Contrôle | Résultat |
|---|---|
| `npm ci` | Réussi, 405 paquets installés. Premier essai EPERM dû au serveur local actif ; reprise réussie après arrêt. Avertissement de nettoyage EPERM non bloquant. |
| Audit npm lors de l'installation | 0 vulnérabilité signalée sur 406 paquets audités. |
| `astro check` | 45 fichiers, 0 erreur, 0 avertissement, 0 hint. |
| `node --test tests/content.test.mjs tests/portfolio.test.mjs tests/regressions.test.mjs` | 9 tests réussis : nettoyage HTML, routes, portfolio, imports, consentement, environnement sitemap. |
| `prettier --check src scripts tests astro.config.mjs` | Réussi. |
| Build production local + `scripts/check-build.mjs` | 40 pages, 1 794 octets JS, aucune erreur. Liens internes, médias, canonical, H1, titres uniques, robots, couverture sitemap, exclusions et fichiers sensibles vérifiés. |
| Build staging final + audit | 40 pages, 1 794 octets JS, aucune erreur ; noindex généralisé, robots bloqués, sitemap absent. |
| `scripts/browser-qa.mjs` | 11 contrôles, 0 erreur ; 0 violation axe sur les cinq routes. Captures 375 et 1440 px inspectées visuellement. |
| Recherche ciblée de secrets dans les nouveaux fichiers | Aucun motif de jeton GitHub/OpenAI ou de clé privée détecté ; contrôle indicatif, pas une analyse exhaustive. |
| `scripts/release-check.mjs` | Échec attendu : 10 validations de publication manquent. |

## Navigateur et mesures

Les preuves finales sont `browser-audit.json`, `lighthouse.json`, `build-audit-staging.json` et `build-audit-production.json`. Captures desktop/mobile dans `screenshots/`.

Le script navigateur teste l'accueil à 320, 375, 390, 768, 1024 et 1440 px, le débordement, la fermeture du menu par Échap, cinq routes avec axe, le formulaire désactivé et le statut 404. Axe couvre les règles automatisables WCAG 2 A/AA et 2.1 AA ; il ne constitue pas une certification WCAG 2.2 ni une revue au lecteur d'écran.

Lighthouse 13.5.0 : cinq pages mobiles et l'accueil desktop, en HTTP local sur Chrome headless, paramètres par défaut avec simulation mobile, un passage par page. Les scores ne sont pas des données terrain p75 ; INP réel et délivrabilité e-mail ne sont pas mesurés. Les JSON consignent date, scores, LCP, CLS, TBT et poids transféré.

L'audit initial du portfolio a identifié un saut de titre et le chargement différé de la première image. Correction : titres h2 sur la liste autonome, image initiale prioritaire ; seconde mesure enregistrée dans le rapport final.

Scores finaux (performance / accessibilité / bonnes pratiques / SEO) : accueil mobile et desktop, création de sites, contact, article maintenance **100 / 100 / 100 / 100** ; portfolio **93 / 100 / 100 / 100**. Le portfolio conserve un LCP mobile simulé de **3,17 s**, supérieur à la cible 2,5 s : optimiser davantage ses captures avant la recette de production. Ces scores SEO n'établissent ni la couverture de migration ni le maintien du classement.

## Revue et limites

Revue de code indépendante suivie de trois corrections : les articles réimportés restent privés, un refus de consentement dans un autre onglet est respecté et le stockage anti-spam PHP doit être hors de la racine publique. Les tests de régression de l'import et du consentement ont été observés en échec puis en réussite.

Non exécutés localement : PHP (absent), SMTP réel, Apache/.htaccess, restauration WordPress, appareil physique, lecteur d'écran, analytics distant. La CI prévoit le lint PHP ; cela ne valide pas le transport SMTP.

Le formulaire est désactivé tant que le serveur n'est pas configuré et testé. Les pages protégées, 24 décisions URL, la couverture des médias et la réduction éditoriale restent bloquantes. `scripts/release-check.mjs` doit échouer tant que ces validations et l'autorisation explicite de production manquent.

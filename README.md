# Aimy Digital, refonte Astro

Version de travail locale, **non publiée et non prête pour la bascule WordPress**. Lire `PROGRESS.md` avant toute reprise : la correction du portfolio y est prioritaire.

Le hero cinématique est maintenant une proposition à valider. Ouvrir `http://127.0.0.1:4322/`, recharger en haut de page pour voir l'entrée puis faire défiler lentement et revenir au début. Le réglage système de réduction des mouvements désactive la séquence ; une commande de réduction est également présente dans le hero. La suite du design attend l'approbation explicite de l'utilisateur. Voir `docs/brand/hero-cinematique.md` et `docs/qa/hero/rapport.md`.

## Démarrer

Node **24** recommandé (minimum 22.12). Le Node 20 système de l'environnement initial n'est pas compatible avec Astro 7.

```sh
npm ci
npm run check
npm test
npm run build
npm run audit
npm run preview -- --port 4322
```

En environnement restreint, définir `ASTRO_TELEMETRY_DISABLED=1`. Le runtime Node 24 fourni par Codex peut exécuter `node_modules/astro/bin/astro.mjs` directement. La prévisualisation est locale ; elle ne lance pas PHP et ne prouve pas la réception du formulaire.

## Environnements

Par défaut : staging, robots bloqués, toutes les pages noindex, formulaire désactivé, aucun sitemap. La préproduction distante doit EN PLUS être protégée par authentification HTTP. `PUBLIC_SITE_ENV=production` génère un sitemap canonique et retire le noindex des pages indexables. Cela ne constitue pas une autorisation de publier.

`PUBLIC_CONTACT_ENABLED=true` ne s'utilise qu'après installation PHP/SMTP et réception réelle d'un message de test. Voir `.env.example`, `server/contact-config.example.php` et `docs/deployment/o2switch.md`. Aucun secret dans les variables `PUBLIC_*`.

## Contenu

- `src/lib/site.ts` : coordonnées actuelles publiées, offres et questions.
- `src/content/posts/*.json` : articles, dates originales et URL conservées, texte révisé. `modified` correspond à la révision.
- `src/content/cases/*.json` : seulement les quatre projets confirmés ; descriptions limitées aux faits disponibles.
- `src/data/redirects.json` : propositions de redirections ciblées ; `.htaccess` à tester sur Apache.
- `src/styles/global.css` : tokens et mise en page.

Pour ajouter un article : dupliquer une entrée, créer un chemin unique sans slash initial/final, rédiger le HTML assaini, dater la publication, puis lancer les contrôles. Ne pas changer un ancien chemin sans décision explicite. Les imports sont des outils d'audit, **pas des commandes de publication** : `import-content.mjs` réimporte l'historique non validé et `review-editorial.mjs` écrase les textes avec les révisions initiales. Ne pas les relancer sur des textes modifiés sans comparer les différences.

L'import `import-content.mjs` écrit désormais les articles dans `.private/import-drafts/` : il ne remplace pas les articles révisés de `src/content/posts/`. Comparer et valider chaque brouillon avant transfert manuel. `review-editorial.mjs` reste un outil de préparation initiale, susceptible d'écraser les textes révisés s'il est relancé.

Les captures source restent dans `.private/`, ignoré par Git. Ce dossier n'est pas une sauvegarde WordPress restaurable. Les exports de mesure déjà présents dans le dépôt d'origine ne sont jamais copiés dans `dist/`.

## Vérifier

`npm run format:check`, `npm run check`, `npm test`, `npm run build`, `npm run audit`. `node scripts/browser-qa.mjs` utilise Chrome local et `http://127.0.0.1:4322` ; modifier `QA_BASE` ou `QA_BROWSER` si nécessaire. Les rapports sont dans `docs/qa/`.

`node scripts/release-check.mjs` doit actuellement échouer : il rappelle les validations manquantes. Ne pas cocher les validations sans preuve et accord. La CI vérifie et archive le build staging, sans connexion à o2switch.

## Avant la production

Consulter `docs/migrations/seo-diff.md`, `docs/content/copy-review.md`, `docs/release-gates.json` et la procédure de rollback. Les pages privées, flux et archives demandent encore une décision ; les contenus légaux sont incomplets ; le backend PHP n'a pas été exécuté dans l'environnement local initial. Aucun changement DNS ou e-mail autorisé.

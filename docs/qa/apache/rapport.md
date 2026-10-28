# Recette Apache des redirections — 28 octobre 2026

Apache 2.4.69 Win64 (Apache Lounge, `httpd-2.4.69-261002-Win64-VS18.zip`, SHA-256 vérifié), lancé en local sur `127.0.0.1:8099`, hors projet, puis arrêté. `DocumentRoot` = `dist/` (build staging du jour, `.htaccess` identique à `public/.htaccess`), `AllowOverride All`, modules `rewrite`, `headers`, `dir`, `mime`.

Commande : `node scripts/check-redirects-http.mjs http://127.0.0.1:8099 docs/qa/apache/redirects-http.json` (requêtes sans suivi des redirections).

## Résultat : 139/139 contrôles réussis

- 301 vers la cible exacte pour chaque entrée de `redirects.json`, avec et sans slash final.
- 410 pour chaque entrée de `gone.json`, avec et sans slash final.
- 200 pour les URL conservées et pour toutes les cibles de redirection (aucune chaîne).
- Variantes non crawlées : `/page/9/` → `/`, `/blog/page/3/` → `/blog/`, flux de catégorie sans slash → `/feed.xml`, `/<article>/feed/` → 410.
- 404 pour une page inexistante ; en-têtes de sécurité présents ; error.log sans erreur.
- Quatre anciennes URL d'articles sans slash final reçoivent une 301 de `mod_dir` vers la même page avec slash : comportement normal, attendu par le script.

## Limites

- **o2switch sert le site via LiteSpeed** (en-têtes `Server: o2switch-PowerBoost-v3`, `x-litespeed-cache`), compatible `.htaccess` mais pas identique à Apache. Relancer le script sur la préproduction o2switch (protégée par authentification) avant la bascule.
- `/feed.xml` est servi en `application/xml` (type MIME par défaut de l'extension), accepté par les lecteurs RSS.
- Le `.htaccess` doit encore être fusionné avec la configuration existante du serveur.

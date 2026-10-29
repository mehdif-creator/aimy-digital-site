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

- **o2switch sert le site via LiteSpeed** (en-têtes `Server: o2switch-PowerBoost-v3`, `x-litespeed-cache`), compatible `.htaccess` mais pas identique à Apache : voir la recette préproduction ci-dessous.
- `/feed.xml` est servi en `application/xml` (type MIME par défaut de l'extension), accepté par les lecteurs RSS.
- Le `.htaccess` doit encore être fusionné avec la configuration existante du serveur.

# Recette préproduction o2switch (LiteSpeed) — 28 octobre 2026

- Sous-domaine `preprod.aimy-digital.fr` créé dans cPanel, racine `/home/venu0261/preprod.aimy-digital.fr`, **hors de `public_html`** (WordPress en ligne non touché). Build staging déposé (sans `api/contact.php`), zip supprimé après extraction.
- Accès restreint par IP en tête du `.htaccess` de la préprod (`Require ip` : IPv4 et préfixe IPv6 du propriétaire). Vérifié depuis une IP extérieure : **403**. Ce bloc n'existe que sur le serveur, pas dans `public/.htaccess`.
- `node scripts/check-redirects-http.mjs http://preprod.aimy-digital.fr docs/qa/apache/preprod-litespeed-http.json` : **139/139 contrôles réussis** sur LiteSpeed.
- Contrôles complémentaires : en-têtes de sécurité présents, page 404 du site servie par `ErrorDocument`, `/feed.xml` en 200, `robots.txt` bloquant, `noindex` sur les pages.
- Limites : recette faite en HTTP, le certificat AutoSSL du sous-domaine n'était pas encore émis (certificat provisoire non approuvé). Relancer en `https://` une fois AutoSSL passé. Le `.htaccess` de production devra toujours être fusionné avec celui du WordPress actuel lors de la bascule. Supprimer le sous-domaine après la recette s'il ne sert plus.

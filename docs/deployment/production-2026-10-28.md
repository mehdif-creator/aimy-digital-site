# Mise en production — 28 octobre 2026

Demande explicite du propriétaire : mettre le nouveau site en ligne sur aimy-digital.fr en autonomie.

## Ce qui a été fait

1. Build `PUBLIC_SITE_ENV=production` (commit 7fdc4db) : 40 pages, sitemap 36 URL, robots ouvert, `api/contact.php` exclu (formulaire en mode e-mail pré-rédigé). Bloc `forceHttps` de WP Tiger repris en tête du `.htaccess`.
2. Archive déposée par le propriétaire dans `/home/venu0261/aimy-release-20261028/` (taille vérifiée), extraite et contrôlée hors ligne.
3. Bascule : les 25 éléments WordPress de `public_html` déplacés dans `/home/venu0261/wordpress-archive-20261028/` (**rien supprimé, base de données intacte**), puis les 35 éléments du nouveau site déplacés dans `public_html`. Conservés en place : `.well-known`, `cgi-bin`, `o2-qc-*.php`, `f61ab10c3f9e2d1954e07349a09a1914.txt`.
4. Incident : `.htaccess` extrait en `0600` → 403 sur tout le site pendant environ une minute. Corrigé en `0644` ; tous les fichiers passés de `0666` à `0644`, dossiers en `0755`.
5. Ajout de la redirection `www.aimy-digital.fr` → `aimy-digital.fr` (aussi dans `public/.htaccess`).
6. Sitemap `sitemap-index.xml` envoyé dans Search Console (propriété `https://aimy-digital.fr/`). L'ancien `sitemap_index.xml` (Yoast) y figure encore et répondra 404.

## Vérifications en production

- `node scripts/check-redirects-http.mjs https://aimy-digital.fr` : **139/139** (`docs/qa/apache/production-https.json`).
- HTTP → HTTPS 301, www → apex 301, `/wp-admin/` 404, `/app/` 410, console sans erreur.
- Lighthouse mobile, accueil (3 mesures) : performance 95/98/98, accessibilité 100, bonnes pratiques 96, SEO 100, LCP 1,9–2,7 s, CLS 0,001. Avant (WordPress, même jour) : performance 48, LCP 9,0 s.

## Retour arrière (quelques secondes, dans cPanel > Gestionnaire de fichiers)

1. Déplacer tout le contenu de `public_html`, sauf `.well-known`, `cgi-bin`, `o2-qc-*.php` et `f61ab…txt`, vers `/home/venu0261/aimy-release-20261028/`.
2. Déplacer tout le contenu de `/home/venu0261/wordpress-archive-20261028/` (fichiers cachés compris : `.htaccess`, `.htaccess.bk`, `.htaccess.wpmanager.bkp`) vers `public_html`.
3. Vider le cache LiteSpeed si l'ancien site ne réapparaît pas immédiatement.

## Pour les prochains déploiements

- Construire avec `PUBLIC_SITE_ENV=production`, préfixer le `.htaccess` par le bloc `forceHttps`, exclure `api/`.
- Après extraction, **vérifier les droits** : `.htaccess` et fichiers en `0644`, dossiers en `0755`.
- Relancer `check-redirects-http.mjs` sur `https://aimy-digital.fr`.

## Restant

- Activer l'envoi serveur du formulaire (PHP/SMTP) ; d'ici là, il ouvre un e-mail pré-rédigé.
- Relecture par le propriétaire des textes juridiques finalisés (confidentialité : bases légales, durées).
- Supprimer l'archive WordPress et la préprod quand le nouveau site est validé dans la durée ; exporter la base WordPress avant si besoin.
- Remplacer les médias historiques encore manquants (21 récupérés sur 114 recensés).

## Deuxième mise en production — 28 octobre 2026 (soir)

Commit 7a1be11 : pages villes, carte du Bocage, SEO local, maillage (voir `docs/strategie-reference-regionale.md`).

- Archive déposée dans `/home/venu0261/aimy-release-v2/`, extraite, droits corrigés **avant** la bascule (402 fichiers en `0644`) : aucune interruption.
- Version précédente mise de côté dans `/home/venu0261/aimy-release-previous/` (retour arrière : inverser les déplacements entre ce dossier et `public_html`, en conservant `.well-known`, `cgi-bin`, `o2-qc-*.php`, `f61ab…txt`).
- Vérifié : 139/139 redirections, 4 pages villes en 200, `llms.txt`, sitemap, www et HTTP redirigés. Lighthouse mobile : accueil 99/100/92/100 (LCP 1,5 s), Cholet 100/100/96/100 (LCP 1,3 s).
- Search Console : indexation demandée pour Cholet et Bressuire ; Mauléon refusé (« Un problème est survenu », probablement quota), Les Herbiers non tenté. Les deux sont dans le sitemap.

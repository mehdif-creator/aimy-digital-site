# Décisions pour les 24 URL en REVIEW

Vérification en ligne du 28 octobre 2026 (requêtes directes, canonical, sitemap Yoast `page-sitemap.xml` et `author-sitemap.xml`). **Validé par le propriétaire le 28 octobre 2026** et appliqué dans `src/data/redirects.json`, `src/data/gone.json`, `public/.htaccess` et `url-map.csv` (REVIEW : 0). Règles Apache **non testées** sur o2switch.

Principes : 301 seulement vers un équivalent réel ; 410 pour ce qui n'a ni contenu ni équivalent ; décision du propriétaire pour ce qui est privé.

## 301 vers l'accueil — pagination de l'accueil (4)

| URL | Constat | Décision |
|---|---|---|
| /page/2/, /page/3/, /page/4/, /page/5/ | Doublons de l'accueil WordPress, canonical déjà vers `/` | 301 → `/` (règle générique `^page/[0-9]+/?$`) |

## 301 vers le journal (3)

| URL | Constat | Décision |
|---|---|---|
| /blog/page/2/ | Canonical déjà vers `/blog/` ; le nouveau `/blog/` liste les 11 articles sur une page | 301 → `/blog/` (règle `^blog/page/[0-9]+/?$`) |
| /author/aimydigital/ | Archive auteur des 10 articles, présente dans `author-sitemap.xml` | 301 → `/blog/` |
| /author/aimydigital/page/2/ | Suite de l'archive auteur | 301 → `/blog/` |

## 410 — sans contenu ni équivalent (6)

| URL | Constat | Décision |
|---|---|---|
| /404-2/ | Page WordPress « 404 » publiée par erreur, `noindex`, mais listée dans le sitemap | 410 |
| /4/ | 301 actuel vers /404-2/ | 410 |
| /optimisation-webinaire/ | Page **vide** (seulement en-tête et pied Elementor), indexable et listée dans le sitemap | 410 (aucune page équivalente) |
| /comments/feed/ | Flux des commentaires ; commentaires non migrés | 410 |
| /wordpress-cms-2025/feed/ | Flux de commentaires d'article | 410 (règle générique `^[a-z0-9-]+/feed/?$` hors catégories/auteur) |
| /ia-et-marketing-digital-le-guide-ultime-pour-les-tpe-en-2025/feed/ | Idem | 410 |

## 301 vers le flux RSS — catégories et auteur (9)

`/category/*/feed/` (8) et `/author/aimydigital/feed/` (1). Le flux principal `/feed/` existe aussi en ligne (absent de l'inventaire initial) et n'avait pas d'équivalent dans la refonte.

**Retenu** : flux RSS du journal généré à `/feed.xml` (`src/pages/feed.xml.ts`, sans dépendance, annoncé par `<link rel="alternate">`). `/feed/` et ces 9 flux → 301 vers `/feed.xml`.

## 410 — pages protégées par mot de passe (2)

| URL | Constat |
|---|---|
| /app/ | Formulaire de mot de passe WordPress, page indexable |
| /youtube-competitor-radar/ | Formulaire de mot de passe WordPress, page indexable |

**Retenu : retrait (410).** Outils non repris dans la refonte. Contenu privé non consulté ; l'exporter depuis WordPress avant la bascule si nécessaire.

## Vérifications du 28 octobre 2026

- **Logique des règles** : `tests/htaccess.test.mjs` (dans `npm test`) émule mod_rewrite sur `public/.htaccess`. Chaque entrée de `redirects.json` répond 301 vers sa cible (avec et sans slash final), chaque entrée de `gone.json` répond 410, aucune des 39 URL conservées n'est touchée, aucune cible n'est elle-même redirigée. Émulation seulement : aucun Apache disponible localement, aucun test sur o2switch.
- **Indexation publique** (requête `site:aimy-digital.fr` via moteur de recherche) : 14 pages remontées, toutes conservées dans la refonte ; aucune des 24 URL tranchées n'apparaît. Échantillon d'un moteur tiers, pas l'index Google complet.
- **Mentions externes** trouvées (LinkedIn, Threads, CB Insights, mentions légales de Djez Garden et Lambert Digital Pulse, My NutriZen) : toutes pointent vers la racine ou l'e-mail, aucune vers une URL retirée.
- **Search Console, performances sur 16 mois** (propriété `https://aimy-digital.fr/`, 37 clics, 6 760 impressions au total) : **aucune des 24 URL n'a reçu de clic**. Seule `/app/` apparaît, avec 0 clic et 6 impressions. Les URL qui reçoivent des clics (accueil 28, `/site-web-professionnel-2025/` 3, contact 2, prestations 2, FAQ, `/10-erreurs-…`, SEA) sont toutes conservées. `/template/` (63 impressions) répond déjà 404 en ligne : pas d'action.
- **Search Console, liens** : 100 liens externes, **tous vers l'accueil** (mynutrizen.fr 56, lambertdigitalpulse.fr 19, htcreajeux.fr 11, djezgarden.fr 5, sc-renovation.com 5).
- **Non fait** : sauvegarde du contenu de `/app/` et `/youtube-competitor-radar/` (pas de session WordPress ouverte dans le navigateur) ; test réel sur Apache.

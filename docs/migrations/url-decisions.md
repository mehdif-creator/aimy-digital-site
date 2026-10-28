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

## Remarques annexes

- Aucune donnée Search Console ni de liens entrants n'a été consultée pour ces URL : vérifier avant bascule qu'aucune ne reçoit de clics ou de backlinks.
- Reste à faire : tester chaque règle par requête HTTP sur Apache (codes 301/410 et destinations). Les règles génériques `page/N`, `blog/page/N` et `<article>/feed/` couvrent aussi des variantes non crawlées.

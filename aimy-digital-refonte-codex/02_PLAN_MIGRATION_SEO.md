# AIMY DIGITAL — Plan de migration SEO WordPress → Astro

**Version :** 1.0 — 10 octobre 2026  
**Domaine conservé :** `https://aimy-digital.fr/`  
**Principe directeur :** migrer la technologie et moderniser l'expérience **sans changer inutilement les URL**.

## 1. Ligne de base (avant migration)

**Search Console (07/07 au 06/10/2026) :** environ 1 309 impressions, 5 clics ; Accueil : 468 impressions/4 clics/position moyenne 20,67 ; Contact : 30/1/13,33 ; article « Maintenance de Site Web : Pourquoi c'est essentiel » : 706/0/80,19. Principales requêtes : « agence seo deux-sèvres » 174 impressions/position 18,5/0 clic ; « agence web mauléon » 82/15,87/0. Ces nombres sont des moyennes et non des positions garanties.

**Site Kit (12/07 au 09/10/2026) :** 51 visiteurs déclarés, 6 clics de recherche (période légèrement différente), LCP mobile lab 8,9 s, CLS mobile 0,205 ; 0 événement clé indiqué. Les chiffres Analytics et Search Console ne doivent pas être mélangés dans un même KPI.

**Sources de vérité à archiver en préproduction :** Search Console (Performances / Indexation / Sitemaps / Liens), GA4, crawl intégral, WordPress REST API, sitemap(s) XML et logs serveur utiles. Les 20 URL exportées via Search Console **ne constituent pas un inventaire exhaustif de WordPress**.

## 2. Principes de migration

- URL canonique : `https://aimy-digital.fr/`, chemin avec `/` final quand il s'agit d'un répertoire.
- Valeur par défaut pour une URL valable, indexable, à contenu pertinent : **CONSERVER EXACTEMENT**.
- La matrice `04_MATRICE_URL_EXISTANTES.csv` énumère les 20 pages listées par Search Console, leurs métriques et une décision de travail (à valider par crawl).
- La matrice contient aussi les cinq chemins 404 apparus dans Site Kit ; vérifier leur statut réel actuel et leurs backlinks avant traitement.
- Si un ancien contenu disparaît, identifier **une** page équivalente de destination, sinon `404/410` plutôt que redirection en masse.
- Pour les pages potentiellement redondantes (« publicité digitale » et variantes), inspecter le contenu réel et les liens avant de fusionner.
- Préserver le slug des articles même si leur année de publication figure dans l'URL ; moderniser leur contenu si nécessaire sans inventer les données.
- Traiter les médias originaux, téléchargements et URL images accessibles directement.

## 3. Phase M0 — Avant toute modification du site (J−21 à J−14)

**Capturer l'état initial** :

1. Exports WordPress (XML/WXR si disponible), base SQL, `wp-content/uploads`, thème et plugins, liste des redirections, titres/meta descriptions/canonicals, robots/sitemaps, formulaires et e-mails transactionnels.
2. Crawl complet du site actuel (HTTP code, URL, title, H1, canonical, robots, texte, maillage, backlinks identifiés, images et PDF). Importer aussi les pages orphelines et URL historiques depuis Search Console et logs.
3. Photographier les pages clés pour comparaison fonctionnelle. Faire une copie des textes, images, logos et autorisations client.
4. Exporter les indicateurs Google sur 90 jours et la liste des requêtes/pages pour produire une base de comparaison J+30 et J+90.
5. Vérifier le DNS, le HTTPS, les comptes e-mails du domaine et la racine documentaire effective dans cPanel. **Ne pas modifier DNS/MX/SPF/DKIM si le domaine et l'hébergement restent identiques.**

**Livrables M0 :** `crawl-before.csv`, `url-inventory.csv`, `redirect-map.csv`, archive WP et SQL, sauvegarde hors webroot, capture KPI.

## 4. Phase M1 — Décisions URL et transfert éditorial (J−14 à J−7)

Pour chaque ancienne URL, renseigner :

`old_url`, `http_status_before`, `canonical_before`, `indexability_before`, `impressions_90d`, `clicks_90d`, `backlinks`, `target_url`, `action=KEEP|301|410|REVIEW`, `owner`, `qa_status`.

- **KEEP** : restituer un `index.html` statique accessible sur exactement la même URL, HTTP 200, canonical vers elle-même.
- **301** : placer une règle serveur de l'ancienne adresse vers **l'équivalent le plus proche** si un changement éditorial est nécessaire, avec un saut direct.
- **410** : utiliser pour contenus définitivement supprimés sans remplacement pertinent (après examen du trafic/backlinks). Un 404 réel est aussi acceptable.
- **REVIEW** : aucune publication sans décision de migration documentée.

**Articles :** conserver auteur/date de publication lorsqu'ils sont connus ; dates de mise à jour exactes ; contenus enrichis sans remplacer arbitrairement la pertinence de la requête initiale ; images alt descriptives et ressources associées ; balisage Article seulement si exact.

**Pages métier :** conserver la cible SEO prioritaire et la profondeur éditoriale ; nouvelle hiérarchie sémantique ; CTA ajoutés sans sur-optimisation artificielle.

## 5. Phase M2 — Préproduction SEO (J−7 à J−2)

- Préprod sous un sous-domaine indépendant, protégée **par mot de passe HTTP** ou accès restreint ; `noindex` par sécurité supplémentaire seulement. La protection ne doit pas être copiée en production.
- Construire et prévisualiser toutes les routes de la matrice (y compris sous-chemins `/creation-de-sites-internet/.../`).
- Générer `sitemap-index.xml` avec l'intégration officielle `@astrojs/sitemap` ; vérifier qu'il référence seulement des URL de production 200, canoniques et indexables. Vérifier `robots.txt` et la ligne `Sitemap:`.
- Tester présence de `title`, H1 unique par page, description, `lang=fr`, canonical absolue, Open Graph, favicon/logo, breadcrumbs si utiles.
- Tester `/contact/` avec livraison réelle d'un e-mail et événements Analytics consentis ; vérifier l'absence de sessions GA4 de test non filtrées si cela biaise le suivi.
- Vérifier que les URLs d'images importantes, les fichiers média et les liens externes continuent de fonctionner.
- S'assurer qu'aucun lien interne de la nouvelle version ne pointe inutilement vers une URL en 301.
- Vérifier que l'environnement de production n'hérite pas du `noindex`, des mots de passe ou d'un canonical vers la préproduction.
- Rapporter le delta SEO ancien/nouveau page par page dans `seo-diff.md`.

**Critère bloquant :** toute URL stratégique 404/soft-404, canonical incohérente, disallow global, défaut de formulaire, perte de gros lot d'articles indexables ou liens clients majeurs non résolus.

## 6. Phase M3 — Cutover (jour J)

1. **Geler** temporairement les mises à jour éditoriales WordPress et exporter la dernière sauvegarde (fichiers + SQL + emails des formulaires si applicables).
2. Conserver une archive WordPress hors webroot, avec procédure de restauration. Ne jamais laisser une copie WordPress non maintenue exposée publiquement.
3. Préparer dans o2switch la cible exacte définie dans le gestionnaire de domaines (souvent `public_html/`, à confirmer) et le package statique prêt à publier.
4. Déployer les fichiers validés ; conserver les règles `.htaccess` nécessaires à HTTPS/www/301 et ne pas écraser une configuration système non auditée.
5. Tester immédiatement `GET/HEAD` sur les 20 routes prioritaires, les anciens chemins 404, robots, sitemap, formulaire, assets, HTTPS, variantes de domaine.
6. Soumettre `https://aimy-digital.fr/sitemap-index.xml` dans Search Console et inspecter des pages stratégiques. **La commande « changement d'adresse » Search Console n'est pas pertinente si le domaine reste le même.**
7. Consigner la date/heure de mise en ligne, la version Git, les KPI d'avant et la procédure de rollback.

### Exemple de règle Apache (à adapter et tester)

```apache
# Redirection ciblée uniquement lorsque l'ancienne URL a un nouvel équivalent.
Redirect 301 /ancienne-url/ https://aimy-digital.fr/nouvelle-url/
```

Ne pas appliquer de « réécriture SEO globale » fragile sans valider les réponses HTTP réelles. Garder les redirections permanentes au moins un an, de préférence durablement.

## 7. Phase M4 — Surveillance (J+1, +7, +30, +90)

| Quand | Tests / mesures | Seuil d'alerte |
|---|---|---|
| J+1 | Statuts HTTP, formulaires, analytics, robots, sitemap, canonicals, HTTPS, logs | Toute panne 5xx, formulaire KO, désindexation générale, liens essentiels 404 |
| J+7 | Couverture Google, URLs indexées, erreurs, impressions et clics, test mobile | Baisse non expliquée des URLs importantes ou erreurs de crawl croissantes |
| J+30 | Comparaison 28 jours vs période équivalente, par requête/page, leads qualifiés | Dégradation persistante significative à approfondir, ne pas conclure sur 5 clics historiques |
| J+90 | Bilan trafic utile, qualité commerciale, pages performantes, nouvelles pages SEO | Prioriser les investissements selon demandes réelles obtenues |

L'efficacité SEO ne s'apprécie pas uniquement sur le nombre total d'impressions (qui peut être gonflé par des requêtes sans intérêt commercial). Suivre clics et impressions **sur des mots-clés qualifiés**, demandes commerciales et rétention des pages stratégiques.

## 8. Cas limites et scénarios d'échec

| Risque | Prévention / décision |
|---|---|
| Astro modifie le trailing slash (`/page/` vs `/page`) | `trailingSlash: always`, `build.format: directory` et tests de statut |
| Article WP publié sans équivalent Astro | Déploiement bloqué tant qu'une route ou décision 301/410 manque |
| Sitemap contient des pages 404 ou de staging | Génération et audit CI du sitemap production |
| Le trafic chute malgré une migration techniquement réussie | Vérifier indexation, intention, titres, qualité éditoriale et délai de réexploration |
| Une redirection renvoie vers l'accueil au lieu d'un équivalent | Refuser, car risque de soft-404 et confusion utilisateur |
| Copier/coller des avis ou chiffres non vérifiables | Exiger preuve et consentement, sinon retirer |
| Liens historiques vers uploads WordPress cassés | Archiver les uploads et conserver les URL importantes ou rediriger fichier à fichier |
| Les anciennes extensions/formulaires manquent | Inventaire fonctionnel complet et test SMTP préalable |
| Perte d'e-mails liée à changements DNS | Ne pas toucher les enregistrements e-mail ; contrôler les modifications DNS |
| Préproduction indexée accidentellement | HTTP auth et noindex provisoire ; audit public après bascule |
| Retour arrière impossible | Sauvegarde + package précédent + procédure de restauration testée |

## 9. Matrice URL à produire et décider

`04_MATRICE_URL_EXISTANTES.csv` est **préremplie avec les 20 URL visibles dans les exports Search Console** et des chemins rencontrés en 404 dans Site Kit. Les chiffres sont ceux du tableau « Pages » de Search Console ; ce tableau n'est ni exhaustif ni un crawl des statuts HTTP actuels. Les champs d'action ne deviennent définitifs qu'après inventaire des URL WP.

## 10. Sources

- Google Search Central, migration : https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=fr
- Astro sitemap : https://docs.astro.build/fr/guides/integrations-guide/sitemap/
- o2switch Git deployment : https://faq.o2switch.fr/cpanel/fichiers/gitweb/
- Exports Search Console et Site Kit joints dans la conversation.

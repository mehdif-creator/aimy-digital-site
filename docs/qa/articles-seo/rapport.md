# Restauration des onze articles et audit SEO — 15 octobre 2026

## Conclusion
Les onze corps historiques sont restaurés dans Astro. L’audit technique local est terminé ; il ne constitue pas une autorisation de mise en production. La validation factuelle des archives et les décisions de migration restantes sont bloquantes. Aucun déploiement, push ou envoi de formulaire effectué.

## Restauration traçable
La réponse REST publique fraîche du 15 octobre a été comparée à l’archive locale : les onze empreintes SHA-256 de content.rendered sont identiques. Sources : https://aimy-digital.fr/wp-json/wp/v2/posts?per_page=100 ; archive privée .private/wordpress/posts.json. Les dates de publication/modification WordPress et les onze URL restent conservées. Aucun millésime artificiellement actualisé.

32 496 mots restaurés, huit tableaux et quinze illustrations. Les titres complets sont rétablis en H1 ; les titres SEO courts existants sont conservés séparément. Les descriptions Yoast sont reprises sans coupure arbitraire ; une description de remplacement complète est documentée dans le script pour l’article SEO WordPress dépourvu de description Yoast. Les images réelles des articles alimentent maintenant Open Graph et le JSON-LD Article.

Le nettoyage retire les scripts/styles/formulaires, habillages Elementor, H1 doublons, listes de mots-clés et widgets partagés de bas de page. Les corps éditoriaux ne sont pas résumés. Huit destinations historiques du maillage de l’article IA pointent désormais directement sur leurs équivalents déjà validés dans redirects.json. Une ancienne URL mal formée aimy-digital/contact est corrigée vers /contact/. Les règles Apache existantes ne changent pas.

Quatre illustrations PNG initialement encodées en base64 ont été extraites sans recompression ni changement de résolution (empreintes et dimensions dans le manifeste). Leur suppression par le nettoyage HTML causait des images sans src : défaut reproduit au navigateur, corrigé puis vérifié sur les onze pages. La vidéo MP4 authentique WordPress de 2 059 393 octets est conservée au chemin historique et accessible par lien explicite, sans téléchargement automatique pendant la lecture.

| Article | Mots restaurés |
|---|---:|
| [wordpress-cms-2025](http://127.0.0.1:4322/wordpress-cms-2025/) | 4330 |
| [ia-et-marketing-digital-le-guide-ultime-pour-les-tpe-en-2025](http://127.0.0.1:4322/ia-et-marketing-digital-le-guide-ultime-pour-les-tpe-en-2025/) | 4582 |
| [optimiser-son-site-wordpress-pour-le-seo-en-2025-maitrisez-les-algorithmes-et-lia](http://127.0.0.1:4322/optimiser-son-site-wordpress-pour-le-seo-en-2025-maitrisez-les-algorithmes-et-lia/) | 3904 |
| [combien-coute-site-vitrine-2025](http://127.0.0.1:4322/combien-coute-site-vitrine-2025/) | 2200 |
| [woocommerce-ou-shopify-que-choisir-2025](http://127.0.0.1:4322/woocommerce-ou-shopify-que-choisir-2025/) | 2510 |
| [creer-site-web-professionnel-guide-2025](http://127.0.0.1:4322/creer-site-web-professionnel-guide-2025/) | 3691 |
| [10-erreurs-creation-site-internet-2025](http://127.0.0.1:4322/10-erreurs-creation-site-internet-2025/) | 2553 |
| [seo-local-optimiser-site-clients-locaux](http://127.0.0.1:4322/seo-local-optimiser-site-clients-locaux/) | 1719 |
| [publicite-digitale-roi-google-ads-facebook-ads](http://127.0.0.1:4322/publicite-digitale-roi-google-ads-facebook-ads/) | 2579 |
| [maintenance-site-web-essentielle-2025](http://127.0.0.1:4322/maintenance-site-web-essentielle-2025/) | 2146 |
| [site-web-professionnel-2025](http://127.0.0.1:4322/site-web-professionnel-2025/) | 2282 |

## Réserves éditoriales — bloquantes avant publication
Les textes d’origine comportent des chiffres de ROI, statistiques sans sources, tarifs et forfaits anciens, cas pratiques chiffrés non démontrés, promesses de monitoring/sécurité et conseils juridiques. Ils sont conservés en tant qu’archives à valider, pas comme preuves ou engagements actuels. Un bandeau explicite apparaît sur chaque article. Le registre reserves-editoriales.md repère les passages sensibles automatiquement : il aide la relecture, sans prétendre être exhaustif. Il faut justifier ou corriger ces passages avant publication ; le bandeau ne remplace pas cette validation.

Points prioritaires : promesses de sécurité et forfaits dans Maintenance ; ROI et financements dans Site professionnel et Baromètre ; résultats attribués à des cas de TPE dans IA ; tarifs/outils et conseils datés dans les autres guides. Aucun témoignage ou résultat nouveau ajouté. Les auteurs historiques individuels ne sont pas établis par le seul compte WordPress : pas d’auteur inventé en JSON-LD.

## Contrôles réalisés
- Builds production et staging : 40 pages ; contrôles de titres uniques, H1, descriptions, canonical, indexation, sitemap, liens et fichiers locaux réussis.
- Audit DOM complémentaire des 40 HTML : aucune cible interne ou ancre manquante ; 15 règles de redirection sans chaîne ni destination locale absente. Leur exécution Apache n’est pas testée par Astro.
- Staging laissé en noindex/nofollow, robots Disallow et sans sitemap. Production testée séparément avec sitemap et exclusions prévues des catégories vides/404.
- 12 tests automatisés réussis, dont extraction des tableaux/ancres, conservation de la vidéo, empreintes des onze restaurations et existence de leurs images.
- Astro check : zéro erreur, zéro warning ; un hint préexistant waitForNavigation dans remaining-cases-links.mjs.
- Chrome propre via Playwright : 33 combinaisons, onze articles à 320, 390 et 1440 px, tactile mobile et reduced-motion. Réponse 200, images décodées, pas de débordement horizontal global, pas de pageerror, zéro violation Axe WCAG A/AA détectée. Accès clavier initial contrôlé ; aucune certification exhaustive d’accessibilité n’est revendiquée.
- Inspection visuelle directe des captures : introduction et corps WordPress sur mobile, tableau Maintenance sur desktop. Captures complètes supplémentaires dans .private/seo-restoration/screenshots.
- JavaScript inchangé : 134 114 octets bruts / 53 971 gzip pour l’ensemble des bundles, dans le budget existant.

## Performance mesurée
Lighthouse 13.5, Chrome headless propre, profil mobile simulé standard, build production local. Trois passages sur /wordpress-cms-2025/ : LCP **1,523 / 1,524 / 1,523 s** ; médiane **1,523 s**. LCP réel observé : **H1 de l’article**. Scores performance/accessibilité/bonnes pratiques/SEO : **100/100/100/100** aux trois passages. CLS environ 0,0015. Données de laboratoire locales uniquement, pas des Core Web Vitals terrain ni une mesure des onze articles. Les médias en lecture différée ne sont pas intégralement téléchargés par cet audit initial.

## Audit de migration : résultats et risques
89 URL historiques ont été interrogées à nouveau en GET avec enregistrement des sauts : 71 destinations finales HTTP 200, 18 HTTP 404, aucune erreur réseau. Le statut 200 seul ne prouve pas l’équivalence éditoriale ni l’absence de soft-404. La matrice locale conserve 39 variantes KEEP, 18 variantes couvertes par les 15 règles proposées, huit 404 existantes sans équivalent et **24 URL nécessitant une décision**. Voir url-map-current.csv et historical-http.json.

Les 24 cas concernent notamment /app/, /optimisation-webinaire/, /youtube-competitor-radar/, /404-2/, les flux RSS, les archives auteur et les paginations. Pas de redirection globale vers l’accueil ni de suppression arbitraire. Les URLs potentiellement applicatives ou privées doivent être conservées ou traitées explicitement avec le propriétaire avant modification du document root.

Sur 114 médias répertoriés dans l’archive REST, **21 originaux existent au chemin historique dans public** ; 93 nécessitent un choix de conservation/migration selon leurs usages et liens entrants. Les quatre PNG extraits de base64 sont supplémentaires. Toutes les illustrations effectivement restaurées dans les onze articles sont présentes et décodables. Voir media-originals.csv ; il s’agit d’une couverture de fichiers, pas d’une preuve d’indexation Google.

Avertissements non bloquants du contrôle automatique : certains titres dépassent le seuil indicatif de 70 caractères, deux descriptions historiques dépassent 170 caractères, auteurs individuels non confirmés. Ces seuils ne sont pas des limites garanties d’affichage Google. Aucun raccourcissement automatique des titres éditoriaux ou corps.

## Réserves de mise en production
1. Valider les affirmations historiques et l’attribution des auteurs.
2. Décider le sort des 24 URL, compléter la conservation des médias et vérifier les liens entrants dans Search Console/logs.
3. Tester les 301, codes 404, variantes HTTP/HTTPS/www et slash final sur le véritable Apache o2switch ; vérifier document root, sauvegarde restaurable et retour arrière.
4. Confirmer la configuration SMTP et une réception réelle, validation serveur et antispam. Aucun faux envoi réussi.
5. Vérifier Search Console (propriété, indexation, pages exclues, actions manuelles, sitemap), accès non utilisé ici ; Core Web Vitals terrain non mesurés.
6. Validation visuelle globale et autorisation explicite de publication. Les cases de release-gates.json restent inchangées.

## Références et reproduction
Méthode de migration : [Google Search Central — migration et correspondance des URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes). Balisage : [Google — données structurées Article](https://developers.google.com/search/docs/appearance/structured-data/article). Ces guides ne remplacent pas une observation de Search Console ou du serveur de destination.

Scripts : restore-articles.mjs (nécessite les deux archives privées ; arrêt si divergentes), audit-restored-seo.mjs (dist), audit-historical-urls.mjs (public), qa-restored-articles.mjs (port 4322), articles-performance.mjs. Les fichiers JSON de ce dossier conservent les mesures. Les deux CSV de couverture correspondent au snapshot du 15 octobre. La revue indépendante a signalé deux points — vidéo omise et suite de test non intégrée — corrigés et testés.

Aperçu : [Journal](http://127.0.0.1:4322/blog/) · [WordPress](http://127.0.0.1:4322/wordpress-cms-2025/).

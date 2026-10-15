# Comparaison de migration

Inventaire public du 10 octobre 2026 : 89 URL observées (variantes incluses). {"301":18,"KEEP":39,"404/410":8,"REVIEW":24}. Le champ status est le statut FINAL après suivi des redirections, pas le code du premier saut. Les codes exacts des sauts et leur exécution Apache restent à vérifier.

Les 11 articles sont conservés aux chemins REST actuels, avec leur date de publication. Les anciens slugs redirigés sont proposés en 301 vers les destinations observées. Les onze corps historiques ont été restaurés le 15 octobre 2026 avec une mention de validation éditoriale en cours. Voir docs/qa/articles-seo/rapport.md et reserves-editoriales.md : les affirmations historiques ne sont pas validées.

40 pages compilées, dont 8 catégories et 4 dossiers de réalisations. Les catégories vides sont noindex et exclues du sitemap production. Le staging est intégralement noindex et ne produit pas de sitemap.

21 médias récupérés à leur chemin historique, plus quatre illustrations extraites sans altération des données base64 ; l’inventaire REST en compte 114. La couverture des médias, liens entrants, flux, archives et pages privées n’est pas complète. L’inventaire public ne remplace pas l’export WordPress, les logs et la sauvegarde serveur.

## URL nécessitant encore une décision

- https://aimy-digital.fr/optimisation-webinaire/
- https://aimy-digital.fr/youtube-competitor-radar/
- https://aimy-digital.fr/app/
- https://aimy-digital.fr/404-2/
- https://aimy-digital.fr/comments/feed/
- https://aimy-digital.fr/page/2/
- https://aimy-digital.fr/blog/page/2/
- https://aimy-digital.fr/wordpress-cms-2025/feed/
- https://aimy-digital.fr/ia-et-marketing-digital-le-guide-ultime-pour-les-tpe-en-2025/feed/
- https://aimy-digital.fr/author/aimydigital/
- https://aimy-digital.fr/category/conseils-business-roi/feed/
- https://aimy-digital.fr/category/automatisation-outils-no-code/feed/
- https://aimy-digital.fr/category/creation-de-sites-web/feed/
- https://aimy-digital.fr/category/maintenance-securite/feed/
- https://aimy-digital.fr/category/publicite-acquisition-client/feed/
- https://aimy-digital.fr/category/strategie-digitale-pour-tpe-pme/feed/
- https://aimy-digital.fr/category/tendances-innovations-web/feed/
- https://aimy-digital.fr/category/referencement-seo/feed/
- https://aimy-digital.fr/page/3/
- https://aimy-digital.fr/author/aimydigital/page/2/
- https://aimy-digital.fr/author/aimydigital/feed/
- https://aimy-digital.fr/page/4/
- https://aimy-digital.fr/4/
- https://aimy-digital.fr/page/5/

## Conditions de bascule

Aucune suppression de ces URL n’est autorisée par ce rapport. La production reste bloquée tant que leur maintien, migration ou retrait explicite n’est pas validé et testé. Les règles .htaccess doivent être fusionnées avec la configuration existante, puis testées par requêtes HTTP sur Apache.

# Comparaison de migration

Inventaire public du 10 octobre 2026 : 89 URL observées (variantes incluses). {"301":34,"KEEP":39,"404/410":16,"REVIEW":0}. Le champ status est le statut FINAL après suivi des redirections, pas le code du premier saut. Les codes exacts des sauts et leur exécution Apache restent à vérifier.

Les 11 articles sont conservés aux chemins REST actuels, avec leur date de publication. Les anciens slugs redirigés sont proposés en 301 vers les destinations observées. Les onze corps historiques ont été restaurés le 15 octobre 2026 avec une mention de validation éditoriale en cours. Voir docs/qa/articles-seo/rapport.md et reserves-editoriales.md : les affirmations historiques ne sont pas validées.

40 pages compilées, dont 8 catégories et 4 dossiers de réalisations. Les catégories vides sont noindex et exclues du sitemap production. Le staging est intégralement noindex et ne produit pas de sitemap.

21 médias récupérés à leur chemin historique, plus quatre illustrations extraites sans altération des données base64 ; l’inventaire REST en compte 114. La couverture des médias, liens entrants, flux, archives et pages privées n’est pas complète. L’inventaire public ne remplace pas l’export WordPress, les logs et la sauvegarde serveur.

## URL nécessitant encore une décision



## Conditions de bascule

Aucune suppression de ces URL n’est autorisée par ce rapport. La production reste bloquée tant que leur maintien, migration ou retrait explicite n’est pas validé et testé. Les règles .htaccess doivent être fusionnées avec la configuration existante, puis testées par requêtes HTTP sur Apache.

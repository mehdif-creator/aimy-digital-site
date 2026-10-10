# Sauvegarde et retour arrière

La procédure ci-dessous n'a pas encore été exécutée. Aucune bascule autorisée tant que sa faisabilité n'est pas prouvée.

Avant publication : sauvegarder base SQL, fichiers WordPress, uploads, configuration serveur et redirections, hors racine publique. Vérifier intégrité et restauration sur un environnement isolé. Conserver un relevé du document root, les permissions et le package statique précédent. Ne pas mélanger les dossiers e-mail et web.

Consigner le commit, l'heure, le dossier cible exact et la personne responsable. Geler l'éditorial pendant la copie finale. La release doit pouvoir être remplacée par l'ancienne version sans changement DNS.

Déclencheurs : panne de contact, erreurs majeures 404/5xx, noindex involontaire, défaut de navigation ou de commande, fuite de données. Suspendre la promotion et restaurer la version sauvegardée selon le dossier validé. Réappliquer les règles serveur et vérifier HTTPS, pages, médias, contact et indexabilité. Ne pas laisser une ancienne copie WordPress publiquement accessible sans maintenance.

Après publication validée : J+1 contrôles HTTP/contact ; J+7 couverture et erreurs ; J+30 comparaison de périodes cohérentes et demandes qualifiées ; J+90 bilan éditorial/commercial. Ces jalons sont une procédure, pas une automatisation créée dans le compte utilisateur.

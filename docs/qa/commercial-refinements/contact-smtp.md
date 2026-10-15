# Contact PHP / SMTP — réserve avant activation

Le formulaire reste désactivé. L’accès au formulaire est désormais visible immédiatement sous l’introduction sur mobile ; les contacts directs restent présents.

## État vérifié localement
`public/api/contact.php` valide les types scalaires, longueurs, email, choix du besoin, origine autorisée, honeypot et taille maximale de requête. La limitation est de cinq tentatives valides par heure et IP pseudonymisée, avec verrouillage du fichier de suivi. Configuration et état doivent résider hors racine publique. Une réponse positive nécessite un transport retournant réellement `true` ; les exceptions renvoient 503.

`server/contact-config.example.php` prépare PHPMailer, STARTTLS, authentification SMTP, expéditeur configuré et Reply-To du demandeur. Aucun secret présent ni activé par cette mission. PHP n’est pas disponible dans le PATH local ; l’exécution serveur et la réception SMTP ne sont donc pas validées. Aucun succès d’envoi simulé en recette.

## Recette réelle à effectuer sur o2switch, avant publication
1. En environnement explicitement autorisé, choisir PHP >= 8.1, installer PHPMailer hors `public_html`, créer un dossier privé de limitation et configurer `AIMY_CONTACT_CONFIG`.
2. Renseigner hors Git les variables SMTP du modèle, l’expéditeur validé et le destinataire réel. Confirmer l’origine HTTPS autorisée. Ne pas désactiver la vérification TLS.
3. Vérifier les réponses 405 (GET), 403 (origine étrangère), 413 (trop volumineux), 422 (email invalide, tableau à la place du nom, honeypot rempli, besoin inconnu), 429 (sixième tentative), 503 (transport indisponible). Ces essais ne doivent pas provoquer d’envoi.
4. Faire un unique envoi réel avec un identifiant de recette daté dans le message et des données de test. Vérifier la boîte de réception du destinataire et l’identifiant reçu, l’expéditeur, Reply-To et l’encodage. Un retour HTTP 200 signifie acceptation par le transport, pas preuve de réception.
5. Inscrire dans le procès-verbal : environnement, heure, identifiant, statut HTTP, preuve de réception confirmée par le destinataire, résultats des tests négatifs. Aucune copie de secret ou de données personnelles dans Git.
6. N’activer `PUBLIC_CONTACT_ENABLED` qu’après cette recette et autorisation de publication. Vérifier alors le parcours complet sur mobile.

Restent à confirmer pour la confidentialité : prestataire de messagerie, personnes ayant accès aux demandes, durée de conservation et purge des journaux. Cette note prépare l’intégration ; elle ne certifie pas la conformité ni la délivrabilité.

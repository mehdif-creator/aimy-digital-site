# Contact — vérification du 13 octobre 2026

- Astro produit un site statique. Le endpoint PHP existant `/api/contact.php` assure la validation serveur, le contrôle des origines, le honeypot, la limitation à cinq tentatives par heure et IP pseudonymisée, puis appelle le transport configuré.
- Les réponses 503 et 200/ok:true ont été interceptées en recette navigateur pour tester le contrat de l’interface. Aucun e-mail n’a été envoyé. En cas d’erreur les saisies sont conservées ; seule une réponse positive remet le formulaire à zéro.
- Le formulaire reste désactivé (`PUBLIC_CONTACT_ENABLED=false`) et affiche les alternatives email/téléphone. Les coordonnées vérifiées et la mention RGPD sont conservées.
- PHP n’est pas disponible via le PATH local : pas de validation d’exécution PHP ni SMTP réel revendiquée.
- o2switch documente le choix de version PHP : https://faq.o2switch.fr/cpanel/logiciels/hebergement-php-multi-version/ et l’utilisation de SMTP dans un script PHP : https://faq.o2switch.fr/questions/utiliser-smtp-externe/ . L’architecture est compatible en principe ; le compte réel reste à configurer et tester.

## Avant activation, sur un environnement autorisé
Choisir une version PHP compatible (>=8.1 pour le type `never`), installer PHPMailer hors racine publique, configurer `AIMY_CONTACT_CONFIG`, les origines, le répertoire privé de limitation et les variables SMTP. Vérifier les codes 405/403/413/422/429/503, puis un envoi réellement reçu. Tester chiffrement SMTP, expéditeur, destinataire et réponse. Activer le drapeau public uniquement après cette recette.

Les confirmations de confidentialité déjà signalées dans la politique restent requises : prestataire de messagerie, accès aux demandes, durées de conservation et purge des journaux. Cette mission ne modifie pas les pages juridiques et ne certifie pas leur conformité.

# Livraison o2switch

**État : aucune publication. Aucun accès d'hébergement utilisé.** Racine documentaire inconnue, SMTP non testé, sauvegarde non obtenue. Ne pas supposer `public_html/`.

## Options

| Méthode | Usage | Conditions |
|---|---|---|
| CI GitHub + artefact téléchargé + transfert staging contrôlé | Recommandée pour la première release | Dossier cible prouvé, authentification HTTP, recette, validation humaine |
| CI + SSH/SFTP/rsync | Automatisation ultérieure | Vérifier accès et pare-feu o2switch, secrets GitHub, environnement avec approbation |
| cPanel Git Pull + Deploy HEAD Commit | Alternative | Build statique préparé, `.cpanel.yml` adaptée à la vraie cible ; un push GitHub ne déclenche pas automatiquement le pull |

Source officielle consultée : [Git version control o2switch](https://faq.o2switch.fr/cpanel/fichiers/gitweb/).

## Préproduction

1. Vérifier domaine, dossier cible et isolation du site live dans cPanel.
2. Activer une authentification HTTP. Le noindex seul n'est pas un contrôle d'accès.
3. Construire avec `PUBLIC_SITE_ENV=staging`, formulaire désactivé.
4. Transférer uniquement `dist/` après comparaison des fichiers. Jamais le dépôt, les exports ou `.private/`.
5. Fusionner les règles `.htaccess` avec celles du serveur, sans écraser ses règles HTTPS, sécurité ou redirection.
6. Vérifier tous les codes 200/301/404 en HTTP réel, les médias et l'accès interdit aux fichiers privés.

## Contact PHP

PHP 8.1 minimum requis (`never`, `str_starts_with`). Runtime PHP non disponible localement lors du développement : syntaxe et intégration doivent être vérifiées sur une machine équipée puis en staging.

Installer [PHPMailer](https://github.com/PHPMailer/PHPMailer) via Composer dans un dossier **hors webroot** ; figer sa version et conserver son lockfile privé. Copier `server/contact-config.example.php` dans ce dossier, créer `rate-limits` avec droits restreints, puis renseigner côté serveur :

- `AIMY_CONTACT_CONFIG` : chemin absolu de la configuration privée.
- `AIMY_RATE_SECRET` : aléa d'au moins 32 caractères.
- `AIMY_SMTP_HOST`, `AIMY_SMTP_USER`, `AIMY_SMTP_PASSWORD`, `AIMY_SMTP_FROM`, `AIMY_CONTACT_TO`.
- `origins` : domaines explicitement autorisés, y compris le staging pendant la recette.

L'exemple utilise SMTP authentifié STARTTLS, port 587. Adapter aux paramètres réellement fournis par l'hébergeur sans désactiver la vérification TLS. Limitation : cinq tentatives par adresse IP et par heure, état haché hors webroot. Configurer une purge quotidienne des fichiers de limitation inactifs depuis plus de 24 h. Pas de contenu de message journalisé par le handler.

Tester : données invalides, faux Origin, honeypot, taille excessive, limite, erreur SMTP, réussite et réception dans la boîte finale. Une acceptation SMTP ne prouve pas la réception. Pas de traceur externe activé ; le raccordement de la mesure et la politique de conservation restent à valider.

## Production

Exécuter `node scripts/release-check.mjs`. Le résultat actuel est BLOQUÉ. Après résolution, construire explicitement en mode production ; vérifier canonicals, absence de noindex global et sitemap. Recette de la même version en staging, accord explicite du propriétaire, transfert revu, tests immédiats. Ni DNS ni MX/SPF/DKIM/DMARC ne doivent être modifiés.

Ne pas utiliser `rsync --delete` sans preuve du chemin, sauvegarde récente, exclusions revues et dry run approuvé. Aucun script de transfert destructif n'est fourni.

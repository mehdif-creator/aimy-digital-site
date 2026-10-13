# Mise à jour juridique SASU — 13 octobre 2026

## Appliqué
Source prioritaire : informations officielles fournies par l’utilisateur. Identité centralisée dans src/lib/company.ts : AIMY DIGITAL, SASU, capital1000€, siège23 rue Pierre Jeissou79700 Saint-Amand-sur-Sèvre, SIREN131260390, SIRET13126039000011, RCSNiort, TVA FR79131260390, APE7022Z, début07/10/2026. Il ne s’agit pas d’une vérification indépendante au registre.
Mentions et confidentialité réécrites aux URL existantes, coordonnées contact/éditeur, footerSASU, Organization et publisher Article enrichis avec identité, identifiants, TVA et adresse. Aucun changement d’URL, canonical, redirection ou contenu d’article. Pas d’ancienne identité trouvée dans les sources publiables ni dans les40 HTML générés. Archives historiques inchangées.

## Traitements constatés dans le code
- PUBLIC_CONTACT_ENABLED absent en environnement local, exemplefalse ; bouton désactivé. PHP et SMTP réel non exécutés. Formulaire:name/email/need/message obligatoires, company/phone facultatifs, honeypot. Contact direct mailto/tel.
- public/api/contact.php : validation, origine autorisée, HMAC de l’IP et horodatages, fenêtre1h/cinq tentatives. Fichiers hors webroot ; pas de purge automatique dans le code. La recommandation24h du guide de livraison n’est pas traitée comme une durée appliquée.
- Messagerie : exemple PHPMailer/SMTP, prestataire et boîte finale non configurés dans les éléments accessibles. Pas de base de contacts créée par le site. Durées e-mails/sauvegardes et logs inconnues.
- analytics.ts : seulement CustomEvent local après choix, aucun abonné réseau/outil tiers. aimy-consent localStorage sans expiration automatique. Aucun cookie posé par l’application lors du contrôle Chrome ; aucune requête tierce après refus ou accord. Le choix actuel ne vaut pas consentement anticipé à un futur outil.

## Points bloquant une validation juridique finale
- [ ] Nom complet et qualité du directeur de publication : question envoyée à l’utilisateur, pas de réponse reçue au moment de rédaction.
- [ ] Hébergement effectif du NOUVEAU site : o2switch prévu dans le brief mais aucun accès/contrat ou déploiement vérifié. Question envoyée. Ne pas présenter le prévu comme effectif.
- [ ] Messagerie et autres sous-traitants réels, lieux de traitement et éventuels transferts/garanties.
- [ ] Politique effective de conservation des messages, sauvegardes, logs ; purge des fichiers anti-abus.
- [ ] Validation des bases légales : mesures précontractuelles proposées pour devis, intérêt légitime à évaluer pour autres demandes.
- [ ] Droits/licences des contenus : ne pas revendiquer une propriété exclusive générale.
Ces réserves figurent clairement dans les pages de préproduction. Finaliser avant publication/activation du formulaire. Aucun déploiement effectué, aucune conformité globale revendiquée.

## Hébergeur, coordonnées vérifiées séparément
La page officielle o2switch confirme : Chemin des Pardiaux,63000 Clermont-Ferrand ; téléphone04 44 44 60 40. Le04 44 44 60 41 est le fax, non repris. Ces coordonnées n’établissent pas que le futur site est déjà hébergé par ce prestataire.

## Sources officielles consultées
- https://entreprendre.service-public.gouv.fr/vosdroits/F37351
- https://www.cnil.fr/fr/informer-les-personnes
- https://www.cnil.fr/fr/exemples-de-formulaire-de-collecte-de-donnees-caractere-personnel
- https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi
- https://www.o2switch.fr/support-hebergeur/

## Vérification
scripts/legal-qa.mjs : neuf configurations (320/390/1440 ×mentions/confidentialité/contact), aucune violation axe, aucun débordement, aucune erreur navigateur, aucune requête externe, refus/accord et localStorage contrôlés. Organization vérifié ; formulaire désactivé. Liens légaux et footerSASU vérifiés sur40 pages. Neuf tests de régression passants. Buildproduction40 pages, budgetJSinchangé124605/49999. Mesures Lighthouse des cas conservées ; pas de nouvel audit global inutile pour ces modifications de texte/HTML.

## Confirmations du 13 octobre 2026
Directeur de publication : Mehdi FARHANE, Président de la SASU AIMY DIGITAL. Hébergement du nouveau site : o2switch, confirmé par l’utilisateur. Les deux premiers points bloquants ci-dessus sont levés. Les tests d’hébergement/SMTP et les autres questions de traitement restent ouverts ; confirmation du prestataire ne signifie pas déploiement effectué.

# Progression de la refonte Aimy Digital

## Correction prioritaire du 10 octobre 2026

La dernière instruction explicite de l'utilisateur prime sur toutes les sources précédentes.

Portfolio autorisé : **HT Créa Jeux, My NutriZen, SC Rénovation, Lambert Digital Pulse**.

**Djez Garden et Atelier ÉcoBois sont exclus** de l'accueil, du portfolio, des études de cas, témoignages, cartes et contenus marketing. Ne pas les réintroduire depuis les anciens documents ou fichiers. Aucun contenu public nouveau ne les présente à ce stade.

Hiérarchie : instructions les plus récentes > site actuellement publié inspecté à nouveau > fichiers et médias vérifiés du projet > documents historiques comme références secondaires.

Conserver séparément l'inventaire SEO : une exclusion commerciale n'autorise ni suppression arbitraire d'URL ni redirection sans équivalent. Ne pas recopier de témoignages ou résultats sans preuve.

## État

- Dépôt cloné dans `aimy-digital-site`, branche `refonte/astro-premium`, base `8f14e2b`.
- Quatre documents de référence lus, logo inspecté, brief et directions visuelles rédigés.
- REST public archivé localement : 19 pages, 11 articles, 8 catégories, 114 médias.
- Crawl public terminé : 89 URL observées, dont 24 décisions REVIEW encore ouvertes. Le statut enregistré est celui obtenu après suivi des redirections.
- Astro 7 statique : 40 pages, composants partagés, 11 articles aux routes actuelles, 4 projets approuvés, 8 catégories. Les articles ont été fortement raccourcis ; revue sémantique indispensable avant bascule.
- Dépendances épinglées ; installation `npm ci` réussie sous Node 24.19.0 après arrêt du serveur qui verrouillait une bibliothèque Windows. Avertissement de nettoyage EPERM résiduel, code de sortie 0 ; audit npm : 0 vulnérabilité signalée.
- Vérifications : 9 tests réussis ; Astro check 45 fichiers sans erreur, avertissement ni hint ; format validé ; build production 40 pages et audit sitemap/robots/canonicals/liens sans erreur.
- Revue indépendante effectuée : import historique isolé des articles publiables, retrait de consentement pris en compte entre onglets, stockage anti-spam refusé dans la racine publique PHP. Les deux premiers correctifs ont des tests de régression ; PHP reste à exécuter sur serveur.
- Prévisualisation locale : `http://127.0.0.1:4322/`. Mesures et captures sous `docs/qa/`. Le staging est noindex, sans sitemap, formulaire désactivé par défaut.
- CI et procédures o2switch/rollback rédigées. Branche destinée à une PR brouillon, sans fusion ni publication.
- Aucun déploiement, aucune dépense, aucun envoi de formulaire réel.
- À poursuivre : décisions sur les URL non résolues, couverture médias complète, enrichissement éditorial vérifié, recette PHP/SMTP/Apache et validations de bascule. Ne pas considérer la migration entière comme terminée.

## Blocages de publication

Sauvegarde WordPress restaurable et racine documentaire non vérifiées ; SMTP/livraison et redirections Apache non testés ; mentions légales actuelles à confirmer ; fonctions des pages `/app/`, `/optimisation-webinaire/` et `/youtube-competitor-radar/` à auditer. 20 médias historiques récupérés sur 114 recensés, flux/archives/liens entrants à qualifier. Revue éditoriale, validation du design et accord explicite de production encore requis. Voir `docs/release-gates.json` : aucune validation cochée sans preuve.

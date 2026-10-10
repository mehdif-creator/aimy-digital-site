# Mode d'emploi — lancer la refonte complète dans Codex

1. Créer (ou sélectionner) le dépôt GitHub **privé** `aimy-digital-site`. Ne pas utiliser le dépôt de connaissance `lovable-web-knowledge` comme code source du site.
2. Importer le contenu de ce dossier dans le dépôt, idéalement dans `docs/refonte/`. Conserver le logo source dans `docs/refonte/assets/` et les exports de référence dans `docs/refonte/data/` ; ces derniers restent des documents internes, pas des ressources web `public/`.
3. Ouvrir ce dépôt dans Codex avec les skills nécessaires activés, et vérifier que Codex peut voir ces documents.
4. Copier **l'intégralité de `06_PROMPT_COMPLET_CODEX_REFONTE.md`** dans Codex. Le fichier `05_PROMPT_INITIAL_CODEX.md` est l'ancien prompt de cadrage, plus limité ; ne pas l'utiliser si vous souhaitez la refonte intégrale.
5. Demander la réalisation jusqu'à une **préproduction testée**, sans mise en production non autorisée. Le site WordPress reste en ligne tant que la sauvegarde, le plan de migration et la nouvelle version ne sont pas validés.
6. Répondre uniquement aux questions réellement bloquantes de Codex : droits sur les projets, mentions légales exactes, accès o2switch, sauvegarde/export WordPress, choix créatif et modalités de réception des demandes.
7. Après validation du rendu et des tests SEO/formulaire, donner séparément l'autorisation de publication. Ne jamais placer de mot de passe, clé privée ou token dans Git.

**Avertissement** : La matrice CSV initiale ne contient que 20 URL issues de Search Console et 5 erreurs 404 mentionnées dans Site Kit ; Codex doit compléter l'inventaire avec un crawl et les données WordPress. Les rapports Google peuvent être conservés dans un dépôt privé comme documents de travail, mais éviter d'inclure des données client ou informations sensibles non nécessaires.

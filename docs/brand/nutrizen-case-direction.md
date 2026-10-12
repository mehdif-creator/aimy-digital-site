# My NutriZen — direction et preuves

## Livraison du 12 octobre 2026
Quatre captures originales fournies dans la conversation : dashboard desktop 1920×3550, recette desktop 1920×1749, dashboard mobile 531×3074 et recette mobile 531×2633. Les cadrages sont consignés dans docs/qa/nutrizen-case/user-assets.json. Aucun agrandissement ni recomposition de l’interface ; seuls les extraits nécessaires sont placés dans public/images/portfolio/my-nutrizen/. Noms de profil, avatar et lien de parrainage exclus des extraits publiables.

Direction réalisée : ouverture menthe et pistache sur le planning mobile ; lecture progressive de la semaine sur fond vert profond ; composition de la même recette sur ordinateur et mobile ; conclusion contact. Les téléphones restent à 240–265 px CSS pour les 531 pixels sources. Le dashboard desktop se concentre sur les sept jours de menus. Les captures précédentes de marketing ne sont pas utilisées par cette page.

Le récit est volontairement limité aux écrans fournis. Aucun écran de préférences n’est inventé ; aucun statut d’achèvement des courses n’est inféré. L’adresse officielle corrigée reste non résolue dans l’environnement lors du contrôle précédent ; aucun faux lien de démonstration n’est proposé. Métadonnées de la route existante conservées.

Les notes préparatoires ci-dessous sont historiques ; les captures reçues remplacent l’attente d’accès pour le périmètre livré.


## Correction de source prioritaire — 11 octobre 2026

Adresse officielle fournie : https://manutrizen.fr/. Les sources publiques précédentes peuvent être obsolètes. La mention historique « En Développement » ne permet aucune conclusion sur l’état actuel des courses. Inventaire et captures manquantes : nutrizen-assets-inventory.md. Le chapitre courses est conditionnel à une confirmation actuelle ; les compositions finales attendent les captures authentifiées.

## Direction
Une semaine qui prend forme : passer de ses préférences à un planning, puis à sa liste de courses. Une lecture continue et lumineuse, distincte du cas e-commerce HT.

Palette : forêt #123c34, menthe #dceee4, blanc végétal #f7fbf8, pistache #d7eaa2, encre #16372f. Le vert reprend l’application ; la surface claire distingue le cas du dashboard sombre authentique. Typographie Manrope existante, grands titres souples, textes courts, aucun chargement de police supplémentaire.

Composition envisagée : ouverture typographique et vue réelle de l’app ; parcours vertical avec une ligne de progression reliant préférences, semaine, courses ; compositions desktop/mobile adaptées aux véritables proportions des captures ; conclusion centrée sur l’usage et contact. Les captures restent planes. Pas de suite de cartes SaaS, de faux dashboard ou de simple recoloration de HT.

Motion : une seule séquence narrative au défilement, translations courtes d’écrans et progression de la ligne. Pas de long pin. Le texte reste visible ; réduction système/manuelle et lecture sans JS.

## Preuves disponibles
- src/content/cases/my-nutrizen.json : menus selon préférences, recettes et listes de courses, interface responsive.
- Inspection actuelle de https://mynutrizen.fr/ consignée dans docs/qa/nutrizen-case/nutrizen-live.json : préférences/contraintes, organisation hebdomadaire, liste automatique annoncées.
- Asset public dashboard-preview-CXIEHD8m.png : 1394×1920, tableau de bord de menus hebdomadaires. À présenter au maximum à 697 px CSS sur écran DPR2 ; ne pas l’agrandir pour simuler une capture haute résolution.
- Limite constatée à l’inspection visuelle : l’ancien aperçu porte « Liste de courses (En Développement) ». Il ne suffit pas à confirmer le fonctionnement actuel de cette fonction ni son UI finale.
- Aucune preuve directe disponible de l’écran connecté des préférences ou de l’expérience mobile de l’application. La capture mobile publique montre la landing, pas l’espace connecté.
- Aucun chiffre commercial, avis ou résultat santé de la landing ne doit être repris comme résultat prouvé du projet Aimy.

## Donnée attendue
L’utilisateur a choisi de fournir un dossier ou un accès de démonstration. La demande du chemin/URL reste sans réponse précise. Ne pas reconstituer d’écrans connectés ni présenter la landing mobile comme une capture de l’app. La direction peut être préparée, mais les compositions finales dépendent des véritables captures.

La route existante My NutriZen reste intacte pendant cette vérification. Aucun travail sur SC Rénovation ou Lambert Digital Pulse.

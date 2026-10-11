# My NutriZen — direction et preuves préparatoires

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

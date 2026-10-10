# Hero cinématique — proposition fonctionnelle à valider

Consigne du 10 octobre 2026 : la direction précédente est rejetée. Phase autorisée : sauvegarder le projet puis implémenter le hero uniquement, avant arrêt pour validation. Les questions de positionnement sont déjà résolues par les deux prompts ; aucune nouvelle découverte globale.

## Idée et composition

« En pleine lumière » : rendre une activité visible, son message clair, le contact accessible. Fond bleu nuit #050b18, bleu électrique #0686ce enrichi #30b8ff, blanc froid #edf6ff. Manrope conservé, grands titres en 800, corps en 400/500, labels monospace système. Logo officiel conservé dans une surface claire. Navigation d'accueil adaptée au fond sombre ; autres pages inchangées.

Titre exact : « Votre ambition. En pleine lumière. »

Texte : « Des sites web qui donnent du relief à votre entreprise. Design, développement et visibilité locale, de Mauléon à Cholet. »

CTA : « Discuter de mon projet ». Second lien : « Voir les réalisations ».

Signature visuelle : trois plans en perspective traversés par un faisceau bleu, un cadre A abstrait issu des diagonales d'AIMY, et les repères « L’image », « Le message », « Le contact ». Ce sont les trois étapes de lecture du visiteur ; aucun résultat client implicite. SVG et CSS locaux, aucun média généré, vidéo ou moteur 3D.

## Chronologie

| Moment | Mouvement | Sens |
|---|---|---|
| Ouverture, environ 1,4 s | Trait de lumière, identité puis trois lignes de texte, décalages courts | Passer de l'identité de l'agence à l'ambition du client |
| Défilement 0–45 % | Profondeur des plans, déplacements opposés du texte et de la scène | Donner du relief à l'activité |
| Défilement 45–100 % | Texte d'ouverture s'efface, scène s'aligne, « Du premier regard. Au premier contact. » apparaît | Relier l'impact visuel au parcours commercial puis aux projets existants |
| Survol desktop | Inclinaison limitée et flèche du CTA | Réaction tactile sans gêner la lecture |

Défilement natif, sans verrouillage ni interception des gestes. Séquence limitée au hero ; aucun changement du portfolio ou des sections suivantes. Contenu lisible sans JavaScript ; réduction des mouvements : aucune scène sticky longue, aucun parallaxe, aucun masquage. Pas d'animation perpétuelle ni de flash.

## Implémentation et recette

Composant Astro autonome, CSS isolé, GSAP et ScrollTrigger compilés localement et chargés uniquement par l'accueil. `gsap.matchMedia` gère desktop/mobile/réduction des mouvements et nettoie les séquences. Le CTA n'est pas animé hors de la zone visible. Pas de SplitText : lignes écrites dans le HTML, h1 accessible inchangé pendant le défilement.

Le budget historique de 50 ko JS pour tout le site est remplacé explicitement par 125 ko bruts / 50 ko gzip pour GSAP + ScrollTrigger ; mesure 117,4 ko / 46,3 ko, script absent des autres pages. Vérifier ouverture, début/milieu/fin du scroll, retour au début, redimensionnement, mobile tactile, mode réduit, absence de JS, focus/clavier, liens, axe, console et build. Lighthouse ciblé accueil seulement ; aucune promesse de performance terrain.

Les prescriptions de génération Higgsfield, vidéo obligatoire et déploiement Hostinger du skill 10K sont écartées au profit de la consigne explicite : réutilisation Astro, pas de dépense et arrêt après le hero. Le gate de validation intervient sur la proposition fonctionnelle, comme demandé, avant tout élargissement du design.

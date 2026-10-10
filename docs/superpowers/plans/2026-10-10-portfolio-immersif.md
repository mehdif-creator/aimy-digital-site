# Portfolio immersif — plan d’implémentation

Objectif : prolonger le hero b96b9c5 par quatre chapitres de projets réels, sans changer les autres sections.
Architecture : composant Astro autonome, CSS dédié et GSAP/ScrollTrigger déjà installé. Données issues de cases ; aucune dépendance ajoutée.
Spécification : instruction utilisateur « Conditional Hero Approval & Immersive Portfolio », 10 octobre 2026.

- [x] Corriger uniquement le texte de liaison du hero : « Découvrez leurs univers. »
- [x] Remplacer la grille d’accueil par CinematicPortfolio.astro ; conserver ProjectCard pour les autres pages.
- [x] Composer quatre scènes : jeu (papier/ambre), nutrition (vert profond), artisan (bleu/encre), réseaux sociaux (anthracite/vert). Manrope existante, grands titres, compositions asymétriques, pas de grille de cartes.
- [x] Défilement natif : plans desktop qui se redressent et dévoilent leur contenu, mobile SC réel au premier plan, chapitre suivant prenant le relais. Texte et liens stables ; hauteur de scène limitée sur mobile.
- [x] Fournir rendu HTML complet sans JS, mode réduit système et commande manuelle ; navigation directe vers chaque chapitre et sortie de séquence.
- [x] Vérifier les quatre projets, les liens, retour arrière, six largeurs, clavier, réduction dynamique, absence de JS, erreurs console et axe dans Chrome.
- [x] Vérifier Astro, tests existants, production build et une mesure Lighthouse mobile ; documenter et demander validation.

Risques suivis : chevauchement au clavier, titres hors viewport mobile court, médias absents, saut lors du changement de préférence, régression de performance du hero. Aucun commit ou déploiement nouveau requis ; préserver b96b9c5.


# Études de cas SC Rénovation et Lambert Digital Pulse

**Objectif :** livrer les deux pages autorisées, dans cet ordre, sans toucher aux pages validées.
**Architecture :** deux composants Astro dédiés, routes existantes et métadonnées conservées, CaseImage partagé. Une animation GSAP commune très courte pour rapprocher les détails d’interface pendant le scroll, sans pin ni zoom des captures.
**Spécification :** brief utilisateur du 12 octobre 2026, pièce d478bed4-8a36-453e-90cc-c01f7b37ae0d.

## Direction
SC : gris minéral #e9ece9, ardoise #23342f, blanc #ffffff, vert #32734a. Manrope existante, titres sobres, grande élévation du site puis grille de contributions documentées. Mobile en contrepoint du bureau.
Lambert : blanc #f6f6f2, noir #080c0b, jaune #ffe000, vert #83ce65 issus de la capture publiée. Manrope, titre éditorial ample, bande typographique et détails cadrés de la vraie interface. Ne pas simuler un écran mobile manquant.
Les couleurs accompagnent des structures différentes : dossier architectural pour SC, lecture éditoriale de l’identité et du parcours pour Lambert.

## Vérifications prioritaires
Images à DPR2 sans upscale ; accès clavier et reduced-motion ; liens réels sans envoi de formulaire ; largeur 320/375/390/768/1440 ; aucune affirmation de résultats ni attribution des prestations marketing du client à Aimy.

## Étapes
- [ ] SC : capturer et inspecter accueil, prestations, galerie, parcours devis et mobile. Créer ScCaseStudy.astro et route dédiée. Vérifier build, navigateur, axe, Lighthouse puis commit.
- [ ] Lambert : exploiter les captures authentiques disponibles, documenter la limite HTTP429/TLS, créer LambertCaseStudy.astro et route dédiée. Trois contributions démontrées (hiérarchie métier/localité, identité intégrée, double parcours services/contact), sans inventer d’interface mobile. Même recette et commit.
- [ ] Livraison : contrôler la préservation des pages validées, mettre PROGRESS.md à jour et arrêter pour approbation visuelle.

L’exécution séquentielle est déjà autorisée par le brief. Pas de nouvelle demande d’approbation intermédiaire ; pas de déploiement. Tests de comportement dans le navigateur, plutôt que tests artificiels de structure HTML.

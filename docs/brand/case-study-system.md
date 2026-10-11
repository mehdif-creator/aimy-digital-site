# Contrat des études de cas

Le cas HT approuvé au commit 9a413a7 reste la référence technique, pas un gabarit éditorial à recolorer.

- BaseLayout conserve métadonnées, navigation et footer. Chaque route garde son URL et son contenu vérifié.
- CaseImage centralise les variantes Astro, plafonnées à la largeur native du fichier. Chaque composition fournit ses propres sizes (y compris pour un recadrage CSS) et son texte alternatif. Aucun agrandissement de fichier source. Le Picture d’introduction conserve son traitement AVIF/WebP prioritaire.
- Le récit, les sections, les couleurs et la chorégraphie restent propres au projet. Le contrôle de mouvement, gsap.matchMedia, le nettoyage avant navigation et les alternatives sans JS/réduites sont à préserver.
- Avant tout nouveau cas : vérifier son site et ses médias, choisir un enjeu effectivement observable, puis une démonstration spécifique de l’interface. Ne pas réutiliser automatiquement le parcours panier de HT pour NutriZen, SC Rénovation ou Lambert Digital Pulse.
- Aucune métrique de résultat ou citation client sans preuve. L’existence d’une fonctionnalité visible ne prouve pas son efficacité commerciale.
- Recette requise : 320/375/390 px, texte non coupé, liens, captures décodées, scroll aller-retour, mouvement réduit, axe, console propre, production build et LCP avec élément identifié.

Les trois autres cas ne sont pas construits à cette étape. Ils attendent la validation visuelle des raffinements HT.

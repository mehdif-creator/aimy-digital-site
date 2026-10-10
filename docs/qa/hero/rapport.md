# Recette ciblée du hero cinématique

10 octobre 2026. Proposition fonctionnelle en attente d'approbation. Les résultats précédents sous `docs/qa/` concernent la version éditoriale ; ce jalon a ses preuves dans ce dossier.

- `astro check` : 47 fichiers, 0 erreur, avertissement ou hint.
- `astro build` : 40 pages. `scripts/check-build.mjs` : staging noindex, sitemap absent, liens/canonicals et exclusions sans erreur.
- Tests Node : 9/9 réussis ; Prettier validé.
- `scripts/hero-qa.mjs` : animation réelle vérifiée par changement des transforms/opacités au scroll, réaction au survol, retour au début et commande manuelle. Test tactile mobile 390 × 844, menu Échap, six largeurs de 320 à 1440 sans débordement, mode réduit y compris changement de préférence pendant la visite, et contenu/CTA sans JavaScript. 0 erreur JavaScript et 0 violation axe sur l'accueil. JSON et captures dans ce dossier.
- `scripts/hero-performance.mjs` : Lighthouse 13.5.0, Chrome headless, paramètres mobiles simulés par défaut, staging local, un passage. Performance **97**, accessibilité **100**, bonnes pratiques **100**. LCP **2 370,8 ms**, CLS **0,0099**, TBT **3,5 ms**, transfert **654 226 octets**. Aucun avertissement. SEO non scoré car le staging est volontairement noindex.
- Ensemble des scripts : **117 403 octets bruts / 46 279 gzip calculé**. Le serveur local ne sert pas nécessairement ce gzip ; ce chiffre est un budget de compression théorique. GSAP/ScrollTrigger uniquement à l'accueil, seuil 125 ko brut / 50 ko gzip.

Les captures attestent le rendu ; elles ne montrent pas le mouvement. Pour l'évaluer, recharger la page en haut avec les animations système autorisées, attendre environ 1,4 s, faire défiler puis remonter, et survoler la scène sur ordinateur. Aucune interception de la molette ou des gestes.

Limites : un Chrome local, pas de téléphone physique/Safari ni de mesure terrain. Aucun déploiement, SMTP ou changement SEO éditorial effectué pendant cette phase. Le portfolio, les autres sections et les articles restent dans leur état antérieur. La restauration des articles longs, les validations SEO, légales et o2switch restent ouvertes.

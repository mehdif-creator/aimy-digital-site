# Plan — réserves techniques Gate 1 puis HT Créa Jeux

Source : instruction utilisateur du 11 octobre 2026. Design approuvé 11acdb9 à conserver.
Exécution séquentielle ; aucun déploiement, aucune génération payante, aucun changement du blog ou de la migration SEO.

- [x] Reproduire le LCP avec trois runs Lighthouse mobile identiques sur production locale, sans extension ni cache partagé.
- [ ] Vérifier tailles/chargement de la capture LCP, fonts, CSS, JS et GSAP ; corriger uniquement les causes mesurées et refaire trois mesures identiques.
- [ ] Vérifier menu, accordéons, étapes, CTA, lisibilité, cibles tactiles, console, axe, overflow et mouvement réduit à 320/375/390 px. Commit correctifs, PROGRESS.
- [ ] Après clôture technique : vérifier le site HT, assets et contenu. Composant dédié HT dans la route existante, CSS isolé et GSAP réutilisé. Ne pas appliquer aux trois autres cas.
- [ ] Tester HT desktop/mobile, sans JS et mouvement réduit ; build/audit/tests. Commit, aperçu et STOP pour approbation visuelle.

Les résultats historiques 2,49 s précèdent les captures haute résolution. Les trois runs avant correction actuels constituent la comparaison fiable. Ne pas attribuer toute la différence aux nouvelles sections sans preuve.

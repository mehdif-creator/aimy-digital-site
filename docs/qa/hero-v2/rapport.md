# Recette du hero V2

10 octobre 2026 — Chrome headless local, Node 24.19.0.

- Astro check : 49 fichiers, 0 erreur, avertissement ou hint.
- Tests de régression : 9 réussis, 0 échec.
- Build de production : 40 pages ; audit sans erreur.
- Build staging pour l'aperçu : 40 pages ; audit sans erreur, noindex conservé.
- JS total : 117 846 octets brut, 46 391 gzip, dans le budget existant.
- Format des cinq fichiers de code/scripts modifiés validé.
- Recette navigateur : 28 contrôles ; scènes desktop/mobile, titre et CTA visibles, retour arrière, six largeurs 320–1440 px, absence de débordement, préférence réduite dynamique, commande manuelle, menu et Échap, fallback sans JS, destination du CTA et axe. Résultat détaillé : `browser.json`.
- Captures des trois scènes et de la transition disponibles dans ce dossier ; inspectées visuellement. Le logo n'a plus de fond blanc et les plans ne s'intersectent plus.

## Mesure Lighthouse finale

Lighthouse 13.5.0, mobile simulé, build de production local, mesure du 10 octobre 2026 à 17:08:05 UTC :

| Mesure | Résultat |
| --- | ---: |
| Performance | 97/100 |
| Accessibilité | 100/100 |
| Bonnes pratiques | 100/100 |
| LCP | 2,488 s |
| CLS | 0,000331 |
| TBT | 5,5 ms |
| Transfert total page | 771 936 octets |

Une première mesure à 86 a conduit au recadrage et aux variantes responsives des captures, à la priorité réseau du visuel principal et au retrait du délai d'entrée mobile. Le filigrane décoratif est absent sur mobile. La mesure historique V1 était 97 et LCP 2,37 s : score maintenu, LCP légèrement supérieur avec les véritables interfaces. Ce sont des mesures de laboratoire variables, pas des Core Web Vitals terrain ni une mesure sur appareil physique. Safari/iOS réel non vérifié.

L'aperçu est servi sur http://127.0.0.1:4322/?hero=recit. Aucun déploiement. La validation visuelle appartient à l'utilisateur ; elle reste en attente.

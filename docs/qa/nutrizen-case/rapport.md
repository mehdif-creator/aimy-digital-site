# My NutriZen — recette du 12 octobre 2026

## Réalisation
Route /portfolio/my-nutrizen/ conservée avec ses métadonnées. BaseLayout et CaseImage réutilisés ; composant, styles et animation propres à My NutriZen. Aucune modification HT, accueil, portfolio cinématique, blog, SEO ou autres projets.

Parcours : planning mobile dans une ouverture menthe/pistache ; lecture progressive des sept jours du dashboard sur fond vert profond ; même recette sur ordinateur et mobile ; contact. GSAP ne transforme que les captures sur desktop, sans rotation, zoom ou pin. Le dashboard est lisible par défilement interne sur mobile, sans JS et avec mouvement réduit. Les images ne disparaissent jamais pour une animation d’entrée.

## Sources et netteté
Quatre captures utilisateur reçues, examinées et mesurées : 1920×3550, 1920×1749, 531×3074, 531×2633. Le manifeste user-assets.json consigne les recadrages PNG natifs sans redimensionnement. Les zones de profil et parrainage ne sont pas copiées dans les images publiques. Aucun écran artificiel, photo générée ou résultat commercial ajouté.

Recadrages conservés : dashboard 1230×2570, recette 1030×1230, planning mobile 531×950, recette mobile 531×1880. Sources originales intactes. Largeur desktop bornée à 600/515 px et mobile à 240–265 px selon la composition ; variantes Astro au plus à la résolution native. Audit des 20 images sélectionnées sur cinq viewports DPR2 : aucune image insuffisante pour son rendu. Cette validation ne prétend pas garantir la même densité à DPR3 ; les originaux mobiles sont limités à 531 px.

WebP q94 pour les démonstrations ; introduction WebP q85 après comparaison du poids avec AVIF q92. Pas de filtre floutant. Les screenshots de recette comportent les valeurs affichées par l’application ; elles ne sont pas reprises comme conseils nutritionnels ni résultats du projet.

Préférences/objectifs et courses ne disposent pas d’écrans dédiés ni de preuve fonctionnelle fournie : aucune simulation, aucune conclusion d’inachèvement à partir de l’ancien aperçu. Le récit livré se limite au périmètre montré. L’adresse officielle fournie précédemment n’étant pas résolue lors du contrôle, aucun nouveau lien externe incertain n’est ajouté ; les liens Aimy sont fonctionnels.

## Vérifications
- Build de production 40 pages et audit réussis.
- 9 tests de régression réussis ; Astro check 78 fichiers, zéro diagnostic.
- Chrome propre 320/375/390/768/1440 px : aucune erreur console, aucun débordement de document ou texte détecté, zéro violation axe.
- Quatre captures chargées et décodées ; dimensions contrôlées à DPR2.
- Scroll aller-retour desktop animé ; mode réduit dynamique sans transformation résiduelle ; contact ouvert sur chaque viewport ; sans JS, les quatre images et le contact sont accessibles.
- JS global : 124301 octets brut / 49763 gzip, sous les budgets 125000/50000 existants. La tentative d’import conditionnel ajoutait un helper de préchargement et a été retirée ; aucune hausse des budgets.

## Lighthouse mobile
Lighthouse 13.5.0, Chrome headless propre, build production local, paramètres mobiles par défaut, CPU ×4 et réseau simulé. Aucun build ni recette concurrente. Rapports avec paramètres et nœud LCP : lighthouse-baseline.json et lighthouse-final.json.

| Mesure | Performance | Accessibilité | Bonnes pratiques | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- |
| Premier encodage AVIF q92 | 94 | 100 | 100 | 3,024 s | 0,00124 | 0 ms |
| Final WebP q85 | 97 | 100 | 100 | 2,529 s | 0,00124 | 0 ms |

LCP réel : .nz-intro-phone picture img, capture du planning mobile. Ressource LCP environ 99 Ko → 51 Ko ; total observé 789049 → 741420 octets. Ce sont deux mesures locales ciblées, pas une médiane ni des Core Web Vitals terrain. Le run final est légèrement au-dessus de 2,5 s ; ne pas prétendre un seuil garanti. L’accueil n’a pas été remesuré dans cette phase et aucun résultat précédent n’est présenté comme résolu.

## Livraison
Aperçu : http://127.0.0.1:4322/portfolio/my-nutrizen/
STOP pour validation visuelle. Ni SC Rénovation ni Lambert Digital Pulse développés. Aucun déploiement.

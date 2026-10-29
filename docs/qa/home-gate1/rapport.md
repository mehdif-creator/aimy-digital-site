# Recette accueil — Gate 1 — 11 octobre 2026

## Périmètre

Sections après le hero et aperçu de deux projets : services éditoriaux et boussole liée à la sélection, quatre étapes reliées au scroll, FAQ, contact et footer intégré. Hero et captures inchangés depuis 295ddcc. Aucun changement des articles, projets ou infrastructure SEO. Pas de déploiement.

## Validation

- Astro check : 61 fichiers, aucun diagnostic.
- Tests contenu/portfolio/régression : 9 réussites.
- Build production : 40 pages ; audit sans erreur, JS 121445 octets brut / 48357 gzip.
- Chrome : 32 contrôles enregistrés sans erreur ; six largeurs 320, 375, 390, 768, 1024, 1440 px. Services et FAQ au clavier, progression dans les deux sens, réduction système et manuelle, liens HTTP 200, absence de débordement horizontal, mode sans JavaScript et footer hors accueil préservé.
- Axe sur les nouvelles sections et le footer : aucune violation détectée sur desktop et mobile. Ce contrôle automatisé ne remplace pas un audit humain exhaustif.
- Captures desktop/mobile inspectées : titres, texte et CTA lisibles, composition et sections adaptées.

Correction pendant recette : GSAP matchMedia ne déclenchait pas son callback sur desktop sans réduction du mouvement car aucune des deux conditions initiales ne correspondait. Ajout de la condition desktop ; recette réussie après correction.

## Performance mesurée

Lighthouse 13.5.0, Chrome headless, mobile simulé sur build production local : performance 93, accessibilité 100, bonnes pratiques 100. LCP 3167 ms, CLS 0,000331, TBT 0 ms ; transfert mesuré 575190 octets. Un seul run, sans avertissement Lighthouse.

Réserve : le LCP dépasse le seuil de 2,5 s sur cette mesure. L’élément identifié est la capture SC Rénovation du hero préservé. Les nouvelles sections ne chargent aucun nouveau média, vidéo ou police. Ne pas présenter les anciens scores 97 comme ceux de cette version ni conclure à une validation terrain des Core Web Vitals.

## Livraison

Aperçu local : http://127.0.0.1:4322/?accueil=gate1#apres-realisations.

Validation visuelle utilisateur obligatoire avant Gate 2 (HT Créa Jeux). Aucune étude de cas commencée.

# HT Créa Jeux — Gate 2 — 11 octobre 2026

## Réalisation

Une seule étude de cas, accessible à son URL existante /portfolio/ht-crea-jeux/. Introduction bleu nuit et orange, composition typographique, vraie capture desktop, contexte et mission, approche en trois étapes, démonstration desktop/mobile liée au scroll, détails visuels, lien vers le site réel et CTA contact.

Captures fraîches : accueil 2880 × 1800, fiche Easy Peasy Multi 2880 × 2200, mobile 780 × 1688. Navigateur DPR 2, fermeture du bandeau par son contrôle normal ; pas de retouche de l’interface, de mockup inventé ni d’agrandissement. Optimisation Astro responsive ; qualité 85 pour l’introduction, 90 pour les interfaces de démonstration. Provenance et date dans capture-sources.json. Lecture fraîche du site dans live-inspection.json ; aucune donnée de vente, métrique pédagogique ou témoignage repris dans le texte du cas.

GSAP/ScrollTrigger existants : entrée légère du visuel, redressement de la fiche, déplacement du téléphone vers une position de lecture plane, progression et étapes actives. Pas de pin, de texte masqué ou de dépendance ajoutée. Mode mobile empilé, préférence système et commande manuelle ; contenu statique utilisable sans JavaScript.

## Vérifications

- Production : 40 pages, audit sans erreur ; 123186 octets JS brut / 49183 gzip, sous les budgets existants.
- Astro check : 69 fichiers, zéro erreur, avertissement ou hint.
- Tests automatisés du projet : 9 réussites.
- Chrome propre : 1440, 768, 390, 375 et 320 px ; aucun débordement de page ou texte coupé ; scroll aller/retour, commande de réduction, préférence système, CTA contact et mode sans JS. Aucune erreur console ni violation axe sur les pages testées.
- Captures inspectées. Une coupure du texte d’introduction mobile a été corrigée et les captures finales remplacées.
- Routes et métadonnées conservées. Les trois autres études de cas n’importent ni la feuille de styles ni le script HT, vérifié dans le HTML construit. Aucun changement du blog ou du portfolio global.

Lighthouse 13.5.0 mobile simulé, build production local, un run ciblé : performance 98, accessibilité 100, bonnes pratiques 100, LCP 2366 ms, CLS 0,00913, TBT 0 ms, 265899 octets transférés. Pas de mesure terrain.

## Fichiers principaux

- src/components/HtCaseStudy.astro
- src/styles/ht-case.css
- src/lib/ht-case.ts
- src/pages/portfolio/ht-crea-jeux.astro
- src/pages/portfolio/[slug].astro : exclut uniquement HT du template historique.
- public/images/cases/ht/ : les trois captures authentiques.
- scripts/capture-ht-case.mjs, ht-case-qa.mjs et ht-case-performance.mjs.

Décision : route statique dédiée plutôt que branche conditionnelle dans le template partagé, pour ne pas charger les assets et animations HT sur les trois autres cas. Les données SEO restent issues de la collection existante.

Aperçu : http://127.0.0.1:4322/portfolio/ht-crea-jeux/?cas=reference

STOP pour approbation visuelle utilisateur. Ne pas créer les trois autres cas avant cet accord. Aucun déploiement, achat, génération payante ou push.

# Aimy Digital — rapport unique des corrections commerciales

15 octobre 2026 · base `975adf4` · parcours commerciaux enregistrés dans `8c64580` · validation visuelle globale attendue.

## Pages et changements réels

| Page | Correction | Mouvement effectivement implémenté |
|---|---|---|
| SEO local | Recherche, réponse, choix et contact restent visibles dans une même scène. Le besoin « Projet de rénovation » les relie. Diagnostic huit axes conservé. | Repère persistant et ligne de progression ; déplacement de 0,8 s entre les stations. Progression au scroll desktop, sans pin ; commande manuelle prioritaire. Commandes près de chaque station sur mobile. Chaînes du diagnostic révélées progressivement. |
| Publicité | Même besoin de l’annonce à la destination, à l’action puis à la mesure. Le schéma distingue clic, demande reçue et qualification. | Repère continu, mise en évidence de la station, retours arrière. La composition reste présente ; seuls les textes explicatifs changent instantanément. Pas de prétendue animation de ces textes. |
| Maintenance | Six couches représentées dans un éclaté de responsabilités. Suppression des barres évoquant un signal de monitoring. | Extraction latérale de la couche choisie, séparation des couches adjacentes sur 0,6 s ; chaîne d’intervention séquencée. Aucun état de surveillance réel. |
| Prestations | Site vitrine : capture services SC ; modernisation : vraie interface mobile SC, sans avant/après prétendu ; commerce : HT. SEO, publicité et maintenance : schémas de méthode sans client attribué. | Dévoilement horizontal des preuves sur 0,65 s, étapes de méthode décalées de 90 ms. Compositions différentes : lecture métier, écran mobile, parcours de recherche, entonnoir publicitaire, produit et responsabilités. |
| Agence | Choix de conception commentés sur SC/HT ; interface mobile SC et Pack Duo authentiques ajoutés ; contact direct avec Mehdi Farhane. Aucun faux portrait ni équipe inventée. | Dévoilement vertical de la capture, puis annotation de la décision. Pas de zoom ni de perspective sur les images. |
| Contact | Raccourci mobile vers le formulaire placé immédiatement sous l’introduction. Interface conservée. | Ancre native, utilisable au clavier. Aucun envoi simulé et aucune animation supplémentaire. |
| Journal | Couvertures contenues dans un cadre régulier, sans recadrage des titres ni zoom au survol. Mention de contexte historique pour les références 2025. | Filtres conservés, sans animation artificielle. Aucun texte d’article modifié. |
| FAQ | Architecture et réponses conservées après revue. | Recherche accent-insensible, catégories, clavier et liens associés vérifiés. Aucune animation ajoutée. |

Les démonstrations SEO et publicitaires sont explicitement fictives ; elles ne reproduisent ni position Google ni résultat de campagne. Les captures restent exclusivement celles des projets autorisés.

## Aperçus et preuves

Serveur local : http://127.0.0.1:4322/ . Pages : `/referencement-seo/`, `/publicites-sea/`, `/maintenance-et-securite/`, `/nos-prestations/`, `/a-propos/`, `/contact/`, `/blog/`, `/faq/`.

Dossier récupérable : `Validation-commerciale-Aimy-Digital-2026-10-15`, à côté du dépôt. Ouvrir `index.html` après extraction du ZIP.
- Quatre vidéos natives WebM : SEO desktop 13,96 s, Publicité desktop 13,80 s, SEO mobile 14,00 s et Publicité mobile 13,92 s.
- Captures réelles des huit pages en desktop/mobile (largeurs CSS 1440/390, DPR 2) et des scènes enregistrées (DPR 1). Pas de montage ni retouche.
- `preuves-videos.json` conserve les positions pendant et après les déplacements : les transitions ne sont pas des remplacements instantanés présentés comme des animations.

## Contrôles techniques

- Astro : 0 erreur, 0 avertissement ; un ancien hint de dépréciation dans un script QA hors périmètre.
- Builds production et staging : 40 pages, audits sans erreur.
- Suite de régression : 9/9 tests.
- Recette : 32 configurations (8 pages × 320/375/390/1440 px), sans erreur console, débordement horizontal ni violation Axe détectée. Commandes au clavier et tactiles vérifiées ; variantes sans JS et reduced-motion vérifiées sur les huit pages.
- Recette approfondie : 16 configurations, tous les panneaux contrôlés avec Axe, liens internes HTTP 200, images décodées sans agrandissement au-delà du fichier généré, menu mobile et Échap vérifiés.
- Régressions spécifiques : double-clic sur la sélection active, clics rapides, réduction des animations pendant une transition, resize desktop/mobile, retour arrière publicitaire, visibilité de la commande et de l’étape SEO sur mobile.
- Revue indépendante : deux défauts reproduits puis corrigés — interruption du dévoilement par double-clic, commandes SEO mobiles trop éloignées de la scène. Un troisième cas, changement de reduced-motion pendant un dévoilement, a été reproduit puis corrigé par nettoyage après l’annulation GSAP.
- Filtres Journal, recherche FAQ, liens de réponses associées et validation de saisie Contact : huit contrôles spécifiques réussis. Aucun test de réussite SMTP simulé.
- Budget JavaScript global conservé à 135 000 octets bruts / 54 000 gzip. Bundle actuel : 134 114 / 53 971. L’ancien gestionnaire de parallaxe inutilisé a été retiré ; aucun nouveau paquet.

## Performance mobile mesurée

Lighthouse 13.5, Chrome propre, build statique local, profil mobile et throttling simulé par défaut ; une mesure par page, audits séquentiels sans tests navigateur concurrents. Scores d’accessibilité et de bonnes pratiques : 100 sur les huit pages. Aucune alerte Lighthouse. Ces résultats sont de laboratoire, pas des Core Web Vitals terrain.

| Page | Performance | LCP | CLS | TBT |
|---|---:|---:|---:|---:|
| SEO local | 99 | 1.751 s | 0.0013 | 5 ms |
| Publicité | 99 | 1.756 s | 0.0422 | 0 ms |
| Maintenance | 99 | 1.771 s | 0.0376 | 0 ms |
| Prestations | 98 | 2.015 s | 0.0431 | 0 ms |
| Agence | 98 | 2.231 s | 0.0188 | 0 ms |
| FAQ | 99 | 1.840 s | 0.0000 | 0 ms |
| Journal | 98 | 2.272 s | 0.0015 | 0 ms |
| Contact | 100 | 1.433 s | 0.0009 | 0 ms |

Éléments LCP réellement identifiés : bloc `.search-result` pour SEO ; paragraphe introductif pour Publicité et Contact ; H1 pour les cinq autres pages. Les huit mesures restent sous 2,5 s. Les écarts mineurs avec la recette précédente ne constituent pas une comparaison statistique ; aucun environnement de test n’a été allégé pour augmenter les scores.

## Périmètre préservé

Homepage, page Création, portfolio, quatre études de cas, articles, layouts, mentions légales, métadonnées et infrastructure de migration inchangés. URL et navigation conservées. Aperçu final en staging `noindex, nofollow`. Aucun push, déploiement, service payant ou envoi externe.

## Réserves obligatoires avant publication

1. **SMTP / réception réelle** : serveur PHP et transport préparés, mais PHP absent du PATH local et aucune configuration o2switch exploitable fournie. La validation serveur est présente dans le code ; son exécution sur l’hébergement, les essais antispam et la réception réelle restent à prouver. Le formulaire reste désactivé. Recette détaillée dans `contact-smtp.md`. Un HTTP 200 ne suffit pas à prouver la réception.
2. **Onze articles historiques** : toujours incomplets par rapport à l’archive WordPress. Aucun raccourcissement supplémentaire. Sources, empreintes et étapes de restauration documentées dans `restauration-articles.md` et `articles-sources.json`. Les dates/URLs 2025 ne sont pas maquillées en publications récentes.
3. **Audit SEO final** : reste à réaliser avant publication ; l’audit du build ne le remplace pas.
4. **Validation visuelle globale** : attendue après cette livraison. La qualité artistique n’est pas déduite des scores techniques. Aucun autre chantier lancé.

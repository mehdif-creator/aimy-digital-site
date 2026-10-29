# Devenir le site de référence de la création web dans le Bocage

Audit du 28 octobre 2026, site en production https://aimy-digital.fr.

## Point de départ

- **Performance** : 95 à 98 sur mobile (LCP 1,9–2,7 s), accessibilité 100, SEO technique 100. Meilleur que la plupart des sites d’agences locales : c’est déjà un argument de vente (« votre site sera aussi rapide que le nôtre »).
- **Search Console (16 derniers mois, ancien site)** : 37 clics, 6 760 impressions, position moyenne 37,5. L’accueil fait 28 des 37 clics. La visibilité est encore faible : tout reste à construire.
- **Liens entrants** : 100, tous depuis les 4 sites clients vers l’accueil.

## Concurrence observée sur Google

- **Cholet** : Le Coin du Digital, A3 Web, Mediapilote, Enjin, Makeo, Code&Rédac, Space Studio. Plusieurs mettent en avant le SEO « GEO » (visibilité dans les IA génératives).
- **Bressuire** : Pro-pagande, Vanda Cipriano, BLD Web Agency, Enjin (page dédiée), Tango Charlie.
- **Mauléon / Les Herbiers** : SH Impulsion Web (freelance basé à Mauléon), Agence 71, Digitalmym, iGweb, Up Motion, Enjin (page dédiée).
- **Constat** : les agences qui ressortent ont **une page par ville**. Enjin, basé à Cholet, se positionne ainsi sur Bressuire et Les Herbiers. Aimy Digital n’en avait aucune.

## Ce qui a été fait le 28 octobre

1. **Pages villes** : `/creation-site-internet-cholet/`, `-bressuire/`, `-mauleon/`, `-les-herbiers/`. Contenu propre à chaque territoire, FAQ locale, liens vers les prestations, réalisations, section confiance.
2. **Carte interactive du Bocage** (accueil et pages villes) : signature visuelle, l’agence au centre et des liens animés vers les 4 villes.
3. **H1 porteurs de mots-clés** sur toutes les pages commerciales, sans toucher à la composition (ex. « Création de sites internet à Mauléon et Cholet »).
4. **Données structurées** : `ProfessionalService` (adresse, zones desservies, fondateur avec photo, réseaux), `BreadcrumbList`, `FAQPage` (accueil, FAQ, villes), `Article` relié à l’entreprise.
5. **Maillage interne** : encadré « Et pour votre entreprise ? » en fin d’article vers la prestation liée, colonne « Zones d’intervention » dans le pied de page, bandeau des villes cliquable.
6. **Titres des réalisations** enrichis (« SC Rénovation : site vitrine, réalisation web »).
7. **`llms.txt`** : fiche de l’agence pour les moteurs de réponse IA.
8. **Contrastes** des boutons portés au niveau AA.

## Ce qui reste — par ordre d’impact

### 1. Fiche Google Business Profile (hors site, impact n°1 en local)
Le « pack local » (carte + 3 entreprises) capte l’essentiel des clics sur « création site internet Mauléon ».
- Créer/compléter la fiche : catégorie « Concepteur de sites Web », zones desservies (Mauléon, Cholet, Bressuire, Les Herbiers), horaires, photos (votre portrait, bureau, captures de réalisations), lien vers le site.
- Publier un post par mois (nouvelle réalisation, conseil).

### 2. Avis Google réels (hors site)
**Fait le 29 octobre** : les 3 avis Google (5,0) sont affichés sur l’accueil, les pages villes et l’étude de cas Lambert, note rappelée près des boutons d’action et sur la page contact (`src/data/reviews.ts`, citations exactes). Pas de `aggregateRating` en données structurées : Google n’affiche pas d’étoiles pour les avis d’une entreprise sur son propre site.
Continuer à demander un avis à chaque nouveau client à la livraison, et l’ajouter à `reviews.ts`. **Ne jamais publier de faux avis**.

À corriger sur la fiche Google : catégorie principale « Agence de marketing » → « Concepteur de sites Web » (ajouter « Agence de marketing » en secondaire).

### 3. Prix affichés (écarté par le propriétaire le 29 octobre)
Les concurrents affichent « pack dès 1 500 € ». Les prospects veulent un ordre de grandeur avant d’appeler. Fournir vos fourchettes réelles (vitrine, boutique, refonte, maintenance) : une section « À partir de » sera ajoutée sur les pages de prestations.

### 4. Études de cas avec résultats
Pour chaque client, obtenir 1 ou 2 faits vérifiables (délai de mise en ligne, demandes reçues, position Google, citation du client avec accord). C’est ce qui transforme le portfolio en preuve.

### 5. Contenus du journal
- Actualiser en priorité les articles qui ont des impressions : maintenance (1 186), publicité (881), site professionnel (242), prix d’un site vitrine (166). Mettre à jour les chiffres 2025 et les titres.
- Un nouvel article par mois, orienté local : « Combien coûte un site internet à Cholet en 2026 », « Artisan du Bocage : 5 erreurs qui font fuir vos clients »…

### 6. Notoriété locale (liens)
- Inscription : PagesJaunes, annuaire CCI Deux-Sèvres / Maine-et-Loire, clubs d’entreprises locaux, office de tourisme si pertinent.
- Partenariats : un lien depuis les associations ou événements que vous soutenez.
- Les 4 sites clients pointent déjà vers vous : garder ce crédit « Conception Aimy Digital » sur chaque nouveau site.

### 7. Formulaire avec envoi direct
Fournir les identifiants SMTP de la boîte contact@aimy-digital.fr (o2switch) pour activer l’envoi serveur ; aujourd’hui le formulaire ouvre un e-mail pré-rédigé, ce qui fait perdre une partie des prospects.

### 8. Suivi mensuel
Search Console : impressions et positions des pages villes ; viser le top 10 sur « création site internet + ville » à 3–6 mois, sans garantie.

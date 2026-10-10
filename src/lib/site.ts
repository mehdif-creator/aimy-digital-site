export const site = {
  name: "Aimy Digital",
  url: "https://aimy-digital.fr",
  email: "contact@aimy-digital.fr",
  phone: "06 52 59 77 80",
  tel: "+33652597780",
};
export const navigation = [
  { href: "/creation-de-sites-internet/", label: "Sites internet" },
  { href: "/referencement-seo/", label: "SEO local" },
  { href: "/portfolio/", label: "Réalisations" },
  { href: "/a-propos/", label: "L’agence" },
  { href: "/blog/", label: "Le journal" },
];
export const questions = [
  {
    question: "Quel budget prévoir pour mon site ?",
    answer:
      "Le budget dépend des pages, des contenus, du design et des fonctionnalités nécessaires. Le premier échange sert à définir ce périmètre. Vous recevez ensuite une proposition détaillée avant tout engagement.",
  },
  {
    question: "Pouvez-vous reprendre mon site actuel ?",
    answer:
      "Oui. La refonte commence par un état des lieux : contenus à conserver, parcours de contact, accès et adresses déjà référencées. Le plan de migration permet de préparer le changement sans supprimer arbitrairement les pages utiles.",
  },
  {
    question: "Combien de temps prend la création ?",
    answer:
      "Le calendrier est établi selon le périmètre et la disponibilité des contenus. Les étapes de conception, de validation et de recette sont précisées dans la proposition, plutôt qu’un délai identique pour tous les projets.",
  },
  {
    question: "Pourrai-je faire évoluer mon site ?",
    answer:
      "La méthode de mise à jour est choisie avec vous : gestion autonome du contenu ou accompagnement. Les accès, les outils et les conditions de propriété sont précisés dans la proposition.",
  },
  {
    question: "Le référencement et la maintenance sont-ils inclus ?",
    answer:
      "Les bases techniques du référencement font partie de la conception. Le travail éditorial, le suivi SEO et la maintenance sont cadrés selon votre besoin. Aucun classement Google ni volume de demandes ne peut être garanti.",
  },
];
export type Service = {
  path: string;
  title: string;
  headline: string;
  description: string;
  intro: string;
  audience: string;
  deliverables: string[];
  steps: string[];
};
export const services: Service[] = [
  {
    path: "creation-de-sites-internet",
    title: "Création de sites internet",
    headline: "Un site à la hauteur de votre entreprise.",
    description:
      "Création de sites internet pour artisans, entreprises de services et PME autour de Mauléon, Cholet, Bressuire et Les Herbiers.",
    intro:
      "Vos clients doivent comprendre votre métier, voir ce qui vous distingue et savoir comment vous contacter. Nous construisons votre site autour de ces décisions.",
    audience:
      "Pour une entreprise qui a besoin d’une première vitrine solide, d’un site plus clair ou d’un parcours commercial mieux construit.",
    deliverables: [
      "Une arborescence centrée sur vos services et vos clients.",
      "Des pages lisibles sur téléphone, tablette et ordinateur.",
      "Un design adapté à votre identité et à vos contenus.",
      "Des bases SEO : structure, métadonnées et maillage.",
      "Un parcours de contact et une recette avant publication.",
    ],
    steps: [
      "Cadrer les objectifs et les contenus disponibles.",
      "Concevoir les pages et valider la direction visuelle.",
      "Développer, vérifier les parcours et préparer la mise en ligne.",
    ],
  },
  {
    path: "creation-de-sites-internet/creation-de-sites-vitrines",
    title: "Création de sites vitrines",
    headline: "Votre savoir-faire mérite d’être bien présenté.",
    description:
      "Un site vitrine clair pour présenter vos prestations, vos réalisations et faciliter les demandes de contact dans le Bocage.",
    intro:
      "Un visiteur vous découvre souvent avant de vous appeler. Donnez-lui les informations pour comprendre votre offre et vérifier qu’elle correspond à son projet.",
    audience:
      "Artisans, indépendants et entreprises de services souhaitant présenter leur activité avec précision.",
    deliverables: [
      "Des pages de prestations structurées.",
      "Une sélection de réalisations authentiques.",
      "Des coordonnées et des appels à l’action visibles.",
      "Un affichage mobile et une structure accessible.",
    ],
    steps: [
      "Sélectionner les services et les preuves utiles.",
      "Rédiger et organiser les pages.",
      "Vérifier les contacts et publier après votre validation.",
    ],
  },
  {
    path: "creation-de-sites-internet/creation-de-sites-e-commerce",
    title: "Création de sites e-commerce",
    headline: "Une boutique où l’on comprend ce que l’on achète.",
    description:
      "Conception de boutiques e-commerce WordPress/WooCommerce ou Shopify : catalogue, fiches produits et parcours de commande.",
    intro:
      "La qualité d’une boutique se joue dans les détails : trouver un produit, comprendre ses caractéristiques et avancer dans une commande sans hésitation.",
    audience:
      "Commerçants et marques disposant d’un catalogue, d’une organisation logistique et d’un projet de vente en ligne.",
    deliverables: [
      "Choix de la plateforme selon vos usages.",
      "Catalogue et fiches produits structurés.",
      "Parcours de commande vérifié.",
      "Cadrage des moyens de paiement et de livraison.",
      "Prise en main des tâches courantes.",
    ],
    steps: [
      "Cadrer le catalogue, la logistique et les coûts récurrents.",
      "Construire les fiches et le parcours d’achat.",
      "Tester les commandes avant l’ouverture.",
    ],
  },
  {
    path: "creation-de-sites-internet/refonte-de-sites-internet",
    title: "Refonte de sites internet",
    headline: "Faire évoluer votre site, préserver ce qui compte.",
    description:
      "Refonte de site autour de Mauléon et Cholet : contenu, design, mobile et migration des URL existantes.",
    intro:
      "Votre entreprise a évolué. Votre site doit refléter vos services actuels tout en conservant les contenus et les adresses qui ont encore de la valeur.",
    audience:
      "Entreprises dont le site est daté, difficile à utiliser sur mobile ou déconnecté de leur offre actuelle.",
    deliverables: [
      "Inventaire des pages et des fonctionnalités existantes.",
      "Nouvelle organisation des contenus.",
      "Design et parcours mobile repensés.",
      "Correspondance des anciennes et nouvelles URL.",
      "Sauvegarde et procédure de retour arrière avant bascule.",
    ],
    steps: [
      "Auditer l’existant et prioriser les changements.",
      "Construire la nouvelle version en préproduction.",
      "Contrôler la migration et suivre la mise en ligne.",
    ],
  },
  {
    path: "referencement-seo",
    title: "Référencement SEO local",
    headline: "Être présent quand vos clients cherchent votre métier.",
    description:
      "SEO local à Mauléon, Cholet, Bressuire et Les Herbiers : audit, pages de services et suivi des recherches utiles.",
    intro:
      "La visibilité locale commence par des informations fiables et des pages qui répondent aux questions de vos clients. Le travail SEO se construit dans la durée.",
    audience:
      "Entreprises locales souhaitant comprendre leur visibilité et prioriser des améliorations concrètes.",
    deliverables: [
      "Audit technique et éditorial du site.",
      "Recherche des intentions liées à votre métier.",
      "Amélioration des pages et des liens internes.",
      "Cohérence des informations locales.",
      "Suivi des recherches et des prises de contact.",
    ],
    steps: [
      "Mesurer le point de départ.",
      "Corriger les obstacles et renforcer les pages utiles.",
      "Observer les résultats et ajuster les priorités.",
    ],
  },
  {
    path: "publicites-sea",
    title: "Publicité digitale",
    headline: "Des campagnes reliées à une offre et à un objectif.",
    description:
      "Accompagnement publicitaire Google Ads et réseaux sociaux : ciblage, pages de destination et suivi des conversions.",
    intro:
      "Une campagne commence par une offre compréhensible et une page capable de recevoir les visiteurs. Le budget média et la mesure sont cadrés avant le lancement.",
    audience:
      "Entreprises disposant d’une offre définie et d’un budget d’acquisition à tester de façon suivie.",
    deliverables: [
      "Cadrage de l’audience et du budget.",
      "Messages et pages de destination cohérents.",
      "Plan de suivi des conversions selon le consentement.",
      "Lecture des résultats et recommandations.",
    ],
    steps: [
      "Définir ce qu’est une demande utile.",
      "Préparer la campagne et la mesure.",
      "Tester, suivre et ajuster sans promesse de rendement.",
    ],
  },
  {
    path: "maintenance-et-securite",
    title: "Maintenance et sécurité",
    headline: "Un site qui reste suivi après sa mise en ligne.",
    description:
      "Maintenance de sites web : mises à jour, sauvegardes et contrôles selon votre environnement technique.",
    intro:
      "Publier un site ouvre une nouvelle étape : le garder à jour, conserver les contenus et vérifier les fonctions importantes.",
    audience:
      "Entreprises souhaitant déléguer le suivi technique de leur site selon un périmètre convenu.",
    deliverables: [
      "Inventaire technique et vérification des accès.",
      "Plan de mises à jour adapté.",
      "Sauvegardes et modalités de restauration.",
      "Contrôles des fonctions prioritaires.",
    ],
    steps: [
      "Examiner l’environnement existant.",
      "Définir le périmètre et la fréquence des interventions.",
      "Suivre les opérations et documenter les changements.",
    ],
  },
];

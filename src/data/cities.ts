// Pages locales : contenu propre à chaque ville, sans chiffre ni client inventé.
export type City = {
  slug: string;
  name: string;
  /** « à Cholet », « aux Herbiers » */
  at: string;
  /** « de Cholet », « des Herbiers » */
  of: string;
  department: string;
  short: string;
  title: string;
  description: string;
  headline: string;
  lead: string;
  context: { title: string; text: string }[];
  needs: string[];
  faq: { question: string; answer: string }[];
};

const commonFaq = (at: string) => [
  {
    question: `Combien coûte la création d’un site internet ${at} ?`,
    answer:
      "Le budget dépend du nombre de pages, des contenus à produire, du design et des fonctionnalités. Après un premier échange, vous recevez un devis gratuit et détaillé sous 24 h, avant tout engagement.",
  },
  {
    question: "Mon site sera-t-il bien référencé sur Google ?",
    answer:
      "Les bases du référencement sont intégrées dès la conception : structure, titres, vitesse, données locales et pages adaptées à vos services. Le suivi SEO peut ensuite être poursuivi. Aucun classement ne peut être garanti, mais tout est fait pour que vos clients vous trouvent.",
  },
];

export const cities: City[] = [
  {
    slug: "cholet",
    name: "Cholet",
    at: "à Cholet",
    of: "de Cholet",
    department: "Maine-et-Loire",
    short: "49",
    title: "Création de site internet à Cholet (49)",
    description:
      "Création de site internet à Cholet : sites vitrines, boutiques et refontes pour les entreprises du Choletais. Agence locale, devis gratuit sous 24 h.",
    headline: "Un site qui fait la différence dans le Choletais.",
    lead: "À Cholet, vos clients comparent avant d’appeler. Votre site doit montrer en quelques secondes ce que vous faites mieux que les autres, et rendre la prise de contact évidente.",
    context: [
      {
        title: "Un marché exigeant",
        text: "Le Choletais compte de nombreuses entreprises, de l’industrie au commerce de centre-ville. Face à des concurrents déjà en ligne, un site générique ne suffit plus : il faut une présentation claire de votre valeur.",
      },
      {
        title: "Une tradition de savoir-faire",
        text: "Textile, mode enfantine, industrie : la ville s’est construite sur des métiers précis. Votre site doit raconter le vôtre avec la même exigence, photos réelles et preuves à l’appui.",
      },
      {
        title: "Des clients sur mobile",
        text: "Une recherche « près de chez moi » se fait surtout sur téléphone. Votre site est pensé d’abord pour le mobile : lisible, rapide, avec un appel en un geste.",
      },
    ],
    needs: [
      "Site vitrine pour artisans, commerçants et professions libérales",
      "Boutique en ligne pour vendre au-delà du Choletais",
      "Refonte d’un site vieillissant sans perdre son référencement",
    ],
    faq: [
      {
        question: "Intervenez-vous à Cholet et dans le Choletais ?",
        answer:
          "Oui. Aimy Digital est installée à Saint-Amand-sur-Sèvre, dans le même bassin de vie. Les échanges se font par téléphone, en visio ou en rendez-vous, selon ce qui vous convient.",
      },
      ...commonFaq("à Cholet"),
    ],
  },
  {
    slug: "bressuire",
    name: "Bressuire",
    at: "à Bressuire",
    of: "de Bressuire",
    department: "Deux-Sèvres",
    short: "79",
    title: "Création de site internet à Bressuire (79)",
    description:
      "Création de site internet à Bressuire et dans le Bocage bressuirais : sites vitrines, e-commerce et SEO local. Agence voisine, devis gratuit sous 24 h.",
    headline: "Le Bocage bressuirais mérite d’être trouvé.",
    lead: "Artisans, agriculteurs, commerçants et PME du Bocage bressuirais : vos clients vous cherchent sur Google avant de décrocher. Votre site doit être là, clair et rassurant.",
    context: [
      {
        title: "Le cœur du Bocage",
        text: "Sous-préfecture des Deux-Sèvres, Bressuire rayonne sur tout un territoire rural et artisanal. Votre site doit parler à vos clients du coin comme à ceux qui viennent de plus loin.",
      },
      {
        title: "Des métiers concrets",
        text: "Élevage, agroalimentaire, bâtiment, artisanat : des activités qui se montrent mieux qu’elles ne se décrivent. Chantiers, produits, avant/après : vos réalisations deviennent vos meilleurs arguments.",
      },
      {
        title: "Être visible localement",
        text: "Quand on cherche un professionnel à Bressuire, Google met en avant les entreprises bien présentées et cohérentes. Votre site et votre fiche locale travaillent ensemble.",
      },
    ],
    needs: [
      "Site vitrine pour présenter vos chantiers et vos réalisations",
      "Visibilité sur les recherches locales du Bocage",
      "Suivi et maintenance pour un site toujours à jour",
    ],
    faq: [
      {
        question: "Intervenez-vous à Bressuire et dans le Bocage bressuirais ?",
        answer:
          "Oui. L’agence est installée à Saint-Amand-sur-Sèvre, dans les Deux-Sèvres, et accompagne les entreprises de tout le Bocage, dont Bressuire et ses environs.",
      },
      ...commonFaq("à Bressuire"),
    ],
  },
  {
    slug: "mauleon",
    name: "Mauléon",
    at: "à Mauléon",
    of: "de Mauléon",
    department: "Deux-Sèvres",
    short: "79",
    title: "Création de site internet à Mauléon (79)",
    description:
      "Agence web à deux pas de Mauléon : création de sites internet, refonte et référencement local pour les entreprises du secteur. Devis gratuit sous 24 h.",
    headline: "Votre agence web, juste à côté de Mauléon.",
    lead: "Mauléon est notre ancrage local. Pas d’intermédiaire ni de plateforme lointaine : vous échangez directement avec la personne qui conçoit votre site, à quelques minutes de chez vous.",
    context: [
      {
        title: "La proximité, vraiment",
        text: "Aimy Digital est installée à Saint-Amand-sur-Sèvre, tout près de Mauléon. Un rendez-vous, une question, une mise à jour : la réponse vient d’ici.",
      },
      {
        title: "Au carrefour de trois départements",
        text: "Entre Deux-Sèvres, Vendée et Maine-et-Loire, vos clients viennent de partout autour. Votre site doit être trouvé à Mauléon comme à Cholet, Bressuire ou Les Herbiers.",
      },
      {
        title: "Un interlocuteur unique",
        text: "Mehdi Farhane vous accompagne du premier échange à la mise en ligne, puis dans le suivi. Celui qui écoute votre besoin est aussi celui qui le réalise.",
      },
    ],
    needs: [
      "Premier site internet pour une entreprise qui se lance",
      "Refonte d’un site existant devenu lent ou daté",
      "Référencement local pour apparaître dans le secteur",
    ],
    faq: [
      {
        question: "Peut-on se rencontrer à Mauléon ?",
        answer:
          "Oui. L’agence est à Saint-Amand-sur-Sèvre, tout près de Mauléon. Un rendez-vous en personne est possible, tout comme un échange par téléphone ou en visio.",
      },
      ...commonFaq("à Mauléon"),
    ],
  },
  {
    slug: "les-herbiers",
    name: "Les Herbiers",
    at: "aux Herbiers",
    of: "des Herbiers",
    department: "Vendée",
    short: "85",
    title: "Création de site internet aux Herbiers (85)",
    description:
      "Création de site internet aux Herbiers et dans le Haut-Bocage vendéen : sites vitrines, boutiques en ligne et SEO local. Devis gratuit sous 24 h.",
    headline: "Aux Herbiers, un site à la hauteur de votre ambition.",
    lead: "Entre industrie, commerce et tourisme, le Haut-Bocage vendéen bouge vite. Votre site doit suivre : moderne, rapide et pensé pour transformer une visite en demande.",
    context: [
      {
        title: "Un territoire qui entreprend",
        text: "Les Herbiers concentre industries, commerces et services dans un bassin dynamique. Votre site doit refléter ce sérieux et mettre en avant ce qui vous distingue.",
      },
      {
        title: "Des visiteurs à convaincre",
        text: "Le Haut-Bocage attire des visiteurs toute l’année. Restaurants, hébergements, commerces : un site clair et une présence locale soignée captent ceux qui cherchent sur place.",
      },
      {
        title: "Vendée, Deux-Sèvres, même bassin",
        text: "Saint-Amand-sur-Sèvre et Les Herbiers partagent le même bassin de vie. Échanger, se rencontrer, faire évoluer votre site : tout reste simple et proche.",
      },
    ],
    needs: [
      "Site vitrine pour commerces, restaurants et hébergements",
      "Boutique en ligne pour vendre vos produits",
      "Publicité Google et Meta pour accélérer les demandes",
    ],
    faq: [
      {
        question: "Intervenez-vous aux Herbiers et en Vendée ?",
        answer:
          "Oui. Depuis Saint-Amand-sur-Sèvre, Aimy Digital accompagne les entreprises du Haut-Bocage vendéen, dont Les Herbiers et ses environs.",
      },
      ...commonFaq("aux Herbiers"),
    ],
  },
];

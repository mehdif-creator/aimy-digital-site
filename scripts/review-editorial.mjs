import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
const revisions = {
  "combien-coute-site-vitrine-2025": [
    "Combien coûte un site vitrine professionnel ?",
    [
      [
        "Définir ce que le devis doit couvrir",
        "Le prix d’un site ne se compare pas seulement au nombre de pages. Il faut préciser le travail de rédaction, les photos disponibles, la création graphique, les fonctionnalités et les échanges de validation. Un devis fondé sur des contenus déjà prêts ne couvre pas le même travail qu’un accompagnement complet. Commencez par lister ce que vous fournissez et ce que vous attendez du prestataire.",
      ],
      [
        "Séparer création et dépenses récurrentes",
        "Demandez une distinction entre conception, développement et coûts de fonctionnement : nom de domaine, hébergement, licences, maintenance et éventuels services externes. Vérifiez qui possède les comptes et comment récupérer les accès. Un abonnement peu élevé peut couvrir un périmètre limité ; une prestation initiale ne signifie pas que toutes les évolutions futures sont incluses.",
      ],
      [
        "Comparer des propositions comparables",
        "Examinez les livrables, les étapes de validation, la gestion du mobile, la préparation SEO et les tests de contact. Demandez ce qui se passe si un contenu arrive en retard ou si vous souhaitez modifier le périmètre. Les modalités de paiement, de livraison et de suivi doivent être explicites. Un tarif de marché générique ne remplace pas cette comparaison.",
      ],
      [
        "Prioriser sans sacrifier le parcours",
        "Pour un premier site, privilégiez une offre claire, des preuves authentiques et un moyen de contact fiable. Un espace client, une animation élaborée ou un catalogue complexe peuvent être reportés s’ils ne répondent pas à un besoin établi. Une proposition détaillée vous permet de choisir ces priorités sans supposer un retour financier garanti.",
      ],
    ],
  ],
  "maintenance-site-web-essentielle-2025": [
    "Maintenance de site web : ce qu’il faut prévoir",
    [
      [
        "Identifier ce qui doit être suivi",
        "La maintenance dépend des technologies utilisées. Un site WordPress, une boutique et un site statique ne demandent pas les mêmes interventions. Recensez l’hébergement, le domaine, les extensions, les intégrations et les personnes disposant d’un accès. Ce relevé permet de définir un suivi adapté et d’éviter qu’un service indispensable soit oublié.",
      ],
      [
        "Sauvegarder et savoir restaurer",
        "Une sauvegarde n’est utile que si elle permet de retrouver un fonctionnement connu. Pour WordPress, les fichiers et la base de données sont complémentaires. Conservez une copie séparée du site public et vérifiez la procédure de restauration dans un environnement isolé. Le rythme et la durée de conservation doivent tenir compte de la fréquence de modification des contenus.",
      ],
      [
        "Contrôler après une intervention",
        "Une mise à jour peut modifier l’affichage ou le comportement d’une extension. Vérifiez au minimum l’accueil, les pages importantes, le menu mobile et le contact. Pour une boutique, ajoutez le panier et la commande. Notez les changements réalisés et prévoyez un retour arrière avant une opération sensible.",
      ],
      [
        "Définir la responsabilité et le périmètre",
        "Un contrat de maintenance doit préciser les opérations prévues, la fréquence et les modalités d’intervention. Distinguez correction technique, ajout de contenu et nouvelle fonctionnalité. Les engagements de disponibilité ou de délai doivent être écrits ; ils ne se déduisent pas d’une simple mention de maintenance sur une page commerciale.",
      ],
    ],
  ],
  "site-web-professionnel-2025": [
    "Pourquoi créer un site web professionnel pour votre entreprise ?",
    [
      [
        "Donner une information que vous maîtrisez",
        "Un site rassemble vos prestations, vos réalisations et vos coordonnées dans un espace organisé. Un prospect peut y vérifier votre zone d’intervention, comprendre votre offre et préparer une demande. Les réseaux sociaux peuvent compléter cet ensemble, avec des usages différents. L’important est de maintenir des informations cohérentes entre les canaux.",
      ],
      [
        "Aider le visiteur à décider",
        "Présentez les services avec des exemples précis et des photographies autorisées. Expliquez à qui ils s’adressent, les étapes du projet et ce qu’il faut préparer avant un échange. Les témoignages doivent être réels et attribués avec autorisation. Évitez les chiffres de résultats sans contexte et les promesses identiques pour tous les clients.",
      ],
      [
        "Faciliter le contact sur mobile",
        "Vérifiez la lisibilité, le menu, les liens téléphoniques et le formulaire sur un petit écran. Limitez les champs aux informations utiles à la réponse. Un message de confirmation doit correspondre à un envoi effectivement accepté par le serveur. Prévoyez un autre moyen de contact si l’envoi échoue.",
      ],
      [
        "Préparer le suivi dès le départ",
        "Définissez ce que vous souhaitez observer : demandes reçues, origine connue et adéquation avec vos services. Un clic ou une visite ne suffit pas à qualifier un prospect. Prévoyez aussi les mises à jour, la propriété des accès et la maintenance. Le site reste un outil à faire vivre, sans garantie automatique de volume commercial.",
      ],
    ],
  ],
  "publicite-digitale-roi-google-ads-facebook-ads": [
    "Publicité digitale : relier le budget aux demandes utiles",
    [
      [
        "Partir d’une offre précise",
        "Avant une campagne, choisissez une prestation, une audience et une zone de diffusion cohérentes. La page d’arrivée doit reprendre le sujet annoncé et permettre une action simple. Si l’offre ou les modalités sont floues, acheter davantage de visites ne résout pas le problème de compréhension.",
      ],
      [
        "Définir la conversion observée",
        "Séparez les clics, les envois de formulaire, les rendez-vous et les ventes confirmées. Un événement technique ne prouve pas qu’une demande est qualifiée. Faites valider le suivi et les règles de consentement avant de l’utiliser pour vos décisions. Évitez de transmettre des messages ou des coordonnées personnelles aux outils de mesure.",
      ],
      [
        "Comparer les coûts avec prudence",
        "La rentabilité dépend des dépenses publicitaires, de la prestation, de la marge et des ventes effectivement attribuables. Définissez un budget de test et une période d’observation avant le lancement. Les performances d’une autre entreprise ne prédisent pas les vôtres. Une variation sur quelques demandes peut également être trompeuse.",
      ],
      [
        "Améliorer le parcours progressivement",
        "Examinez les annonces, les recherches ou audiences pertinentes, la page et le traitement commercial des demandes. Modifiez une hypothèse à la fois lorsque le volume le permet. Documentez les changements et les limites des mesures. Les frais de gestion et le budget versé aux plateformes doivent être distingués dans la proposition.",
      ],
    ],
  ],
  "seo-local-optimiser-site-clients-locaux": [
    "SEO local : rendre votre activité compréhensible et trouvable",
    [
      [
        "Présenter votre activité et votre zone",
        "Expliquez ce que vous faites et où vous intervenez réellement. Utilisez les noms de lieux lorsqu’ils aident le lecteur, sans multiplier les pages presque identiques. Une page de prestation détaillée, avec des exemples locaux vérifiés, est plus utile qu’une liste de communes sans information sur le service.",
      ],
      [
        "Maintenir des informations cohérentes",
        "Vérifiez le nom de l’entreprise, les coordonnées et les horaires publiés sur vos supports. Les liens doivent mener vers des pages accessibles. Si votre activité ou votre adresse change, prévoyez la mise à jour des différents canaux. N’inventez pas d’implantation locale pour apparaître dans une autre ville.",
      ],
      [
        "Organiser les pages et les preuves",
        "Donnez à chaque service une place lisible dans la navigation. Ajoutez des liens entre les prestations, les réalisations et les conseils pertinents. Les images doivent décrire un travail réel lorsqu’elles sont présentées comme des réalisations. Les avis et les résultats doivent être vérifiables.",
      ],
      [
        "Suivre les recherches utiles",
        "Observez les pages consultées et les requêtes en lien avec votre métier, puis rapprochez ces données des demandes reçues lorsque l’attribution est possible. Tenez compte de la période et du volume observé. Un changement de position isolé ne suffit pas à juger une stratégie ; aucune position durable ne peut être promise.",
      ],
    ],
  ],
  "10-erreurs-creation-site-internet-2025": [
    "Dix erreurs à éviter lors de la création de votre site",
    [
      [
        "Un objectif flou et une offre difficile à comprendre",
        "Première erreur : commencer par les couleurs sans définir l’action attendue du visiteur. Deuxième erreur : présenter toutes les prestations avec la même importance. Choisissez le parcours prioritaire et décrivez vos services avec les mots que vos clients comprennent.",
      ],
      [
        "Des preuves fragiles et des contenus préparés trop tard",
        "Troisième erreur : utiliser des témoignages ou des résultats non vérifiés. Quatrième erreur : attendre la fin du développement pour rédiger. Rassemblez tôt les textes, les photos autorisées, les informations pratiques et les réponses aux objections. Ces éléments doivent guider la composition des pages.",
      ],
      [
        "Le mobile, le contact et les anciennes URL oubliés",
        "Cinquième erreur : vérifier seulement sur ordinateur. Sixième : considérer un bouton d’envoi comme une preuve de réception. Septième : changer les adresses sans inventaire. Testez le site sur petit écran, recevez un message réel et établissez une correspondance des pages avant une refonte.",
      ],
      [
        "Des accès, un suivi et un budget mal cadrés",
        "Huitième erreur : ne pas savoir qui détient le domaine et les comptes. Neuvième : publier sans prévoir les mises à jour et les sauvegardes. Dixième : comparer des prix sans comparer les prestations. Demandez un périmètre écrit, les frais récurrents et une procédure de livraison claire.",
      ],
    ],
  ],
  "creer-site-web-professionnel-guide-2025": [
    "Créer un site web professionnel : les étapes du projet",
    [
      [
        "Cadrer le besoin",
        "Décrivez votre activité, les clients visés et le rôle du site. Listez les services prioritaires et l’action attendue : appel, demande de devis ou commande. Recensez les contenus et les accès disponibles. Une refonte demande également de relever les URL et les fonctions existantes avant de décider ce qui change.",
      ],
      [
        "Préparer la structure et les contenus",
        "Organisez les pages selon les questions du visiteur. Rédigez la proposition de valeur, les prestations et les informations de contact. Sélectionnez des réalisations vérifiables et des médias autorisés. Cette préparation permet d’évaluer une maquette avec de vrais contenus plutôt qu’avec des textes de remplissage.",
      ],
      [
        "Choisir la gestion et construire",
        "Le choix technique dépend des fonctions nécessaires, de la fréquence des mises à jour et de la personne qui les fera. Clarifiez ce qui pourra être modifié en autonomie. Développez des pages adaptées au mobile, avec une navigation claire et des composants cohérents. Les effets visuels doivent laisser le contenu accessible.",
      ],
      [
        "Vérifier et livrer",
        "Testez les liens, le contact, les images, les pages d’erreur et les informations destinées aux moteurs de recherche. Préparez les sauvegardes et le retour arrière avant la publication. La livraison doit inclure les accès, les consignes de mise à jour et les responsabilités de suivi. Une recette locale ne remplace pas les contrôles sur l’hébergement final.",
      ],
    ],
  ],
  "woocommerce-ou-shopify-que-choisir-2025": [
    "WooCommerce ou Shopify : comment cadrer le choix ?",
    [
      [
        "Commencer par le fonctionnement de la boutique",
        "Avant de comparer les plateformes, décrivez votre catalogue, les variantes, la livraison, les paiements et les tâches quotidiennes. Identifiez les échanges nécessaires avec votre stock ou votre comptabilité. Ces besoins permettent de comparer une configuration concrète, plutôt que deux noms de produits.",
      ],
      [
        "Évaluer le coût complet",
        "Recensez l’abonnement éventuel, l’hébergement, les extensions, les thèmes, les commissions et les interventions techniques. Les tarifs et les conditions évoluent : vérifiez les offres officielles au moment du devis. Une comparaison fiable doit utiliser le même catalogue et les mêmes fonctions des deux côtés.",
      ],
      [
        "Examiner l’autonomie et la maintenance",
        "Demandez une démonstration de la création d’un produit, du suivi d’une commande et de la gestion d’un remboursement. Précisez qui assurera les mises à jour et les contrôles techniques. Le choix doit correspondre aux compétences et au temps disponibles dans l’entreprise, ainsi qu’au support souhaité.",
      ],
      [
        "Préparer une éventuelle migration",
        "Inventoriez produits, clients, commandes, médias et anciennes adresses avant tout changement. Vérifiez ce qui peut être exporté et réimporté avec la configuration retenue. Testez les paiements et les livraisons avant l’ouverture. Une migration demande une recette spécifique ; elle ne se résume pas à reproduire l’apparence de l’ancienne boutique.",
      ],
    ],
  ],
  "wordpress-cms-2025": [
    "WordPress : quels critères pour votre projet web ?",
    [
      [
        "Partir de vos usages",
        "Un outil de publication se choisit selon les pages, les fonctions et l’organisation de votre entreprise. Déterminez qui rédigera, qui validera et qui publiera les contenus. Un site rarement modifié et un catalogue éditorial actif ne présentent pas les mêmes besoins.",
      ],
      [
        "Cadrer le périmètre des extensions",
        "Listez les fonctionnalités indispensables avant de choisir des extensions. Vérifiez leur maintenance, leur compatibilité et leur coût dans les versions envisagées. Multiplier les outils peut compliquer les interventions ; chaque dépendance doit répondre à un usage identifié.",
      ],
      [
        "Prévoir le suivi technique",
        "Attribuez clairement la responsabilité des mises à jour, des sauvegardes et de la restauration. Avant une modification importante, vérifiez le fonctionnement dans un environnement séparé. Le menu, les formulaires et les pages clés doivent faire partie de la recette.",
      ],
      [
        "Évaluer le résultat plutôt que le nom de l’outil",
        "La lisibilité, la qualité du contenu, le contact et la vitesse réelle dépendent des choix de conception et de réalisation. Aucun CMS ne garantit seul une bonne visibilité ou des demandes commerciales. Demandez une démonstration adaptée à vos tâches et une proposition explicitant les accès et les conditions de gestion.",
      ],
    ],
  ],
  "optimiser-son-site-wordpress-pour-le-seo-en-2025-maitrisez-les-algorithmes-et-lia":
    [
      "SEO WordPress : organiser les vérifications utiles",
      [
        [
          "Vérifier les pages accessibles",
          "Commencez par un inventaire des URL et de leur contenu. Repérez les pages manquantes, les liens cassés et les versions en doublon. Lors d’une refonte, conservez les adresses pertinentes et documentez les redirections nécessaires. Une extension installée ne remplace pas ces contrôles.",
        ],
        [
          "Clarifier chaque page",
          "Chaque page doit répondre à une intention identifiable. Vérifiez le titre, le titre principal, l’introduction et les liens vers les sujets complémentaires. Rédigez une description propre à la page. Évitez de répéter la même présentation en changeant seulement le nom d’une commune.",
        ],
        [
          "Observer l’expérience réelle",
          "Consultez les pages sur mobile et testez la navigation. Réduisez les images inutilement lourdes et les scripts sans rôle essentiel. Mesurez avant et après les modifications dans des conditions comparables. Distinguez les tests de laboratoire des données issues de visiteurs réels.",
        ],
        [
          "Suivre et revoir les priorités",
          "Analysez les recherches pertinentes, les pages et les demandes plutôt qu’un score isolé. Les outils d’aide à la rédaction peuvent préparer une base, mais leurs affirmations doivent être vérifiées. Documentez les changements et conservez une période d’observation adaptée au volume disponible.",
        ],
      ],
    ],
  "ia-et-marketing-digital-le-guide-ultime-pour-les-tpe-en-2025": [
    "IA et marketing digital : des usages à encadrer en TPE",
    [
      [
        "Choisir une tâche concrète",
        "Commencez par une activité répétitive et limitée : préparer un plan, reformuler un texte ou classer des idées. Définissez le résultat attendu et la personne chargée de le vérifier. Un usage limité permet d’évaluer l’intérêt de l’outil sans lui confier d’emblée tout le parcours commercial.",
      ],
      [
        "Vérifier les textes et les faits",
        "Un texte fluide peut contenir des informations erronées. Contrôlez les noms, les références, les fonctionnalités et les chiffres. Ne publiez pas de témoignage ou de cas client généré. La validation humaine doit précéder la publication, l’envoi d’un message et toute promesse faite à un prospect.",
      ],
      [
        "Protéger les informations confiées",
        "Avant d’utiliser un service, examinez les données qu’il reçoit et ses conditions. Évitez de transmettre des mots de passe, des fichiers clients ou des informations confidentielles sans cadre adapté. Distinguez les brouillons génériques des documents contenant des données personnelles.",
      ],
      [
        "Mesurer l’intérêt et garder la maîtrise",
        "Comparez le temps de préparation, de correction et de validation à votre méthode habituelle. Une production plus rapide n’est utile que si le résultat convient. Fixez les actions qui nécessitent un accord humain, notamment les dépenses, les publications et les communications externes. Documentez les limites observées avant d’élargir l’usage.",
      ],
    ],
  ],
};
await mkdir("docs/content", { recursive: true });
const report = [];
for (const file of await readdir("src/content/posts")) {
  const path = `src/content/posts/${file}`;
  const post = JSON.parse(await readFile(path, "utf8"));
  const revision = revisions[post.path];
  if (!revision) throw new Error(post.path);
  const oldLength = post.html.replace(/<[^>]+>/g, " ").length;
  post.title = revision[0];
  post.description = revision[1][0][1].slice(0, 155);
  post.modified = "2026-10-10T00:00:00";
  post.html =
    revision[1]
      .map(([title, body]) => `<h2>${title}</h2><p>${body}</p>`)
      .join("") +
    '<p>Pour cadrer votre besoin, découvrez nos <a href="/nos-prestations/">prestations</a> ou <a href="/contact/">présentez-nous votre projet</a>.</p>';
  await writeFile(path, JSON.stringify(post, null, 2));
  report.push(
    `| /${post.path}/ | ${oldLength} | ${post.html.replace(/<[^>]+>/g, " ").length} | Réécriture prudente ; revue SEO requise |`,
  );
}
await writeFile(
  "docs/content/copy-review.md",
  "# Revue éditoriale\n\nLes articles sources contiennent des tarifs, statistiques, engagements et exemples non sourcés. Ils restent archivés intégralement dans `.private/wordpress/posts.json`. Les routes et dates de publication sont conservées. Les nouveaux textes omettent les preuves non établies et se concentrent sur les décisions pratiques. Aucun résultat client inventé.\n\nCompromis : réduction substantielle du contenu, priorité à la véracité. Enrichissement et revue sémantique requis avant migration live ; conservation des URL seule ne démontre pas une migration SEO complète. Les médias historiques récupérés restent disponibles même lorsqu’ils ne sont plus intégrés au texte.\n\n| URL | Caractères source | Caractères révisés | Statut |\n|---|---:|---:|---|\n" +
    report.join("\n") +
    "\n",
);
console.log(
  `${report.length} articles révisés sans statistiques ou résultats non sourcés.`,
);

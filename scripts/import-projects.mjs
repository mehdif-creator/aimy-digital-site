import { readFile, writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";
const assets = JSON.parse(
  await readFile(".private/wordpress/portfolio-assets.json", "utf8"),
);
const definitions = [
  {
    title: "HT Créa Jeux",
    path: "ht-crea-jeux",
    category: "E-commerce",
    website: assets.links[3],
    sourceIndex: 5,
    description:
      "Une boutique de jeux pour apprendre les tables de multiplication.",
    mission:
      "Présenter un catalogue pédagogique et faciliter le parcours d’achat.",
    details: [
      "Une présentation des jeux et de leur usage.",
      "Un catalogue accessible sur ordinateur et mobile.",
      "Un parcours de découverte orienté vers les produits.",
    ],
  },
  {
    title: "My NutriZen",
    path: "my-nutrizen",
    category: "Application web",
    website: assets.links[0],
    sourceIndex: 2,
    description: "Une application pour organiser les repas et les courses.",
    mission:
      "Réunir menus personnalisés, recettes et listes de courses dans une interface responsive.",
    details: [
      "Une organisation des menus selon les préférences.",
      "Des recettes et une liste de courses regroupées.",
      "Une interface adaptée à la consultation sur mobile.",
    ],
  },
  {
    title: "SC Rénovation",
    path: "sc-renovation",
    category: "Site vitrine",
    website: assets.links[2],
    sourceIndex: 4,
    description:
      "La rénovation extérieure présentée à travers les prestations et les chantiers.",
    mission:
      "Clarifier l’offre d’un artisan et rendre la demande de devis accessible.",
    details: [
      "Une présentation des prestations de rénovation extérieure.",
      "Des réalisations avant et après pour comprendre le travail proposé.",
      "Des accès à la prise de contact dans le parcours.",
    ],
  },
  {
    title: "Lambert Digital Pulse",
    path: "lambert-digital-pulse",
    category: "Site vitrine",
    website: assets.links[1],
    sourceIndex: 3,
    description:
      "Une vitrine professionnelle pour une activité de community management.",
    mission:
      "Mettre en valeur les services et l’univers d’un professionnel des réseaux sociaux.",
    details: [
      "Une identité visuelle liée aux métiers des réseaux sociaux.",
      "Des services regroupés dans un parcours de lecture simple.",
      "Une présentation conçue pour soutenir les échanges commerciaux.",
    ],
  },
];
await mkdir("public/images/projects", { recursive: true });
for (const item of definitions) {
  const src = assets.images[item.sourceIndex].match(/src="([^"]+)"/)[1];
  const response = await fetch(src, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${src}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await sharp(buffer)
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(`public/images/projects/${item.path}.webp`);
  const { sourceIndex, ...data } = item;
  data.image = `/images/projects/${item.path}.webp`;
  await writeFile(
    `src/content/cases/${item.path}.json`,
    JSON.stringify(data, null, 2),
  );
  console.log(`${item.title} : capture publiée actuelle importée`);
}

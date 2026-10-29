import { readFile } from "node:fs/promises";
const gates = JSON.parse(await readFile("docs/release-gates.json", "utf8"));
const blocked = Object.entries(gates)
  .filter(([, value]) => value !== true)
  .map(([key]) => key);
if (blocked.length) {
  console.error(
    "Publication BLOQUÉE :\n" + blocked.map((k) => "- " + k).join("\n"),
  );
  process.exitCode = 1;
} else
  console.log(
    "Validations consignées. Un contrôle humain de la cible reste obligatoire avant transfert.",
  );

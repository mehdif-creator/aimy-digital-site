import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
test("portfolio limité aux quatre projets confirmés par la correction utilisateur", async () => {
  const files = await readdir("src/content/cases");
  const data = await Promise.all(
    files.map(async (f) =>
      JSON.parse(await readFile("src/content/cases/" + f, "utf8")),
    ),
  );
  assert.deepEqual(
    data.map((d) => d.title).sort(),
    [
      "HT Créa Jeux",
      "My NutriZen",
      "SC Rénovation",
      "Lambert Digital Pulse",
    ].sort(),
  );
  assert.ok(
    data.every(
      (d) =>
        d.website.startsWith("https://") &&
        d.image.startsWith("/images/projects/"),
    ),
  );
});
test("aucun ancien projet exclu dans les contenus publiables", async () => {
  for (const folder of ["posts", "cases"])
    for (const file of await readdir(`src/content/${folder}`)) {
      const raw = await readFile(`src/content/${folder}/${file}`, "utf8");
      assert.doesNotMatch(raw, /Djez|[ÉE]co.?Bois/i);
    }
});

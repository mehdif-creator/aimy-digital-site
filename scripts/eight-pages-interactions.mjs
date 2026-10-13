import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch({ channel: "chrome", headless: true });
const c = await b.newContext({ viewport: { width: 390, height: 844 } });
const p = await c.newPage();
const checks = [];
await p.goto("http://127.0.0.1:4322/faq/", { waitUntil: "networkidle" });
await p.locator("#help-search").fill("hebergement");
assert.ok((await p.locator("[data-item]:visible").count()) > 0);
checks.push("Recherche accent-insensible");
await p.locator("#help-search").fill("zzzzintrouvable");
assert.equal(await p.locator("[data-item]:visible").count(), 0);
assert.match(await p.locator("[data-count]").textContent(), /Aucun résultat/);
checks.push("Zéro résultat explicite");
await p.locator("#help-search").fill("");
await p.getByRole("button", { name: "Maintenance", exact: true }).click();
assert.equal(await p.locator("[data-item]:visible").count(), 2);
await p.locator("[data-item]:visible summary").first().click();
await p.locator("[data-item]:visible .related a").first().click();
assert.ok((await p.locator("details[open]").count()) >= 2);
checks.push("Catégorie FAQ et réponse associée");
await p.locator('[data-category="all"]').click();
await p.locator("#help-search").fill("coûte");
await p.locator("[data-item]:visible summary").click();
await p.locator("[data-item]:visible .related a").click();
assert.equal(await p.locator("#help-search").inputValue(), "");
assert.equal(await p.locator("[data-item]:visible").count(), 14);
checks.push("Question associée : filtres réinitialisés");
await p.goto("http://127.0.0.1:4322/blog/", { waitUntil: "networkidle" });
let total = await p.locator("[data-item]").count();
for (const button of await p.locator("[data-category]").all()) {
  await button.focus();
  await p.keyboard.press("Enter");
  const n = await p.locator("[data-item]:visible").count();
  assert.ok(n > 0);
  if ((await button.getAttribute("data-category")) !== "all")
    assert.ok(n < total);
}
checks.push("Chaque catégorie journal filtre réellement les onze articles");
await p.goto("http://127.0.0.1:4322/contact/", { waitUntil: "networkidle" });
assert.equal(await p.locator("button[type=submit]").isDisabled(), true);
await p.locator("#email").fill("invalide");
await p.locator("#email").blur();
assert.equal(await p.locator("#email").getAttribute("aria-invalid"), "true");
checks.push("Formulaire désactivé par défaut et erreur de saisie explicite");
await p.locator("#name").fill("Test local");
await p.locator("#email").fill("test@example.invalid");
await p.locator("input[name=need]").first().check();
await p
  .locator("#message")
  .fill("Message de recette strictement local, sans envoi externe.");
await p.evaluate(() => {
  document.querySelector("form").dataset.enabled = "true";
  document.querySelector("button[type=submit]").disabled = false;
});
await p.route("**/api/contact.php", (r) =>
  r.fulfill({
    status: 503,
    contentType: "application/json",
    body: '{"ok":false}',
  }),
);
await p.locator("button[type=submit]").click();
await p.waitForFunction(() =>
  document.querySelector(".form-status").textContent.includes("pas pu"),
);
assert.match(await p.locator("#message").inputValue(), /recette/);
checks.push(
  "Erreur serveur simulée : aucune fausse réussite, données conservées",
);
await p.unroute("**/api/contact.php");
await p.route("**/api/contact.php", (r) =>
  r.fulfill({
    status: 200,
    contentType: "application/json",
    body: '{"ok":true}',
  }),
);
await p.locator("button[type=submit]").click();
await p.waitForFunction(() =>
  document.querySelector(".form-status").textContent.includes("acceptée"),
);
assert.equal(await p.locator("#message").inputValue(), "");
checks.push(
  "Contrat UI de réussite testé avec réponse interceptée, aucun mail envoyé",
);
const axe = (await new AxeBuilder({ page: p }).analyze()).violations;
assert.equal(axe.length, 0);
checks.push("Axe après interactions formulaire");
await b.close();
await writeFile(
  "docs/qa/eight-pages/interactions.json",
  JSON.stringify(
    {
      checks,
      limitations:
        "Réponses HTTP interceptées pour le contrat UI uniquement. PHP/SMTP réel non exécuté.",
    },
    null,
    2,
  ),
);
console.log(checks);

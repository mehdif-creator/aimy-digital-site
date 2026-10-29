import test from "node:test";
import assert from "node:assert/strict";
import { cleanContent, originalPath } from "../scripts/content-utils.mjs";
test("retire scripts, handlers et formulaires du contenu importé", () => {
  assert.equal(
    cleanContent(
      '<p onclick="bad()">Bonjour</p><script>bad()</script><form><input name="x"></form>',
    ),
    "<p>Bonjour</p>",
  );
});
test("préserve le contenu et les liens utiles sans doublon de H1", () => {
  assert.equal(
    cleanContent(
      '<h1>Titre</h1><p><a href="https://aimy-digital.fr/contact/">Parlons</a></p>',
    ),
    '<h2>Titre</h2><p><a href="/contact/">Parlons</a></p>',
  );
});
test("conserve le chemin imbriqué WordPress", () => {
  assert.equal(
    originalPath(
      "https://aimy-digital.fr/creation-de-sites-internet/creation-de-sites-vitrines/",
    ),
    "creation-de-sites-internet/creation-de-sites-vitrines",
  );
});
test("refuse une origine étrangère ou un chemin ambigu", () => {
  assert.throws(() => originalPath("https://evil.test/contact/"));
  assert.throws(() => originalPath("https://aimy-digital.fr/contact/?x=1"));
});

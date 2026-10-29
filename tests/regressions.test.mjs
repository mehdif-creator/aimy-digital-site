import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { setConsent, track } from "../src/lib/analytics.ts";
test("la configuration sitemap lit aussi PUBLIC_SITE_ENV dans .env", async () => {
  const cwd = await mkdtemp(join(tmpdir(), "aimy-env-test-"));
  try {
    await writeFile(join(cwd, ".env"), "PUBLIC_SITE_ENV=production\n");
    const env = { ...process.env, NODE_ENV: "production" };
    delete env.PUBLIC_SITE_ENV;
    const configUrl = pathToFileURL(resolve("astro.config.mjs")).href;
    const output = execFileSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `import config from ${JSON.stringify(configUrl)}; console.log(config.integrations.length);`,
      ],
      { cwd, env, encoding: "utf8" },
    );
    assert.equal(output.trim(), "1");
  } finally {
    assert.ok(
      resolve(cwd).startsWith(resolve(tmpdir()) + "/aimy-env-test-") ||
        resolve(cwd).startsWith(resolve(tmpdir()) + "\\aimy-env-test-"),
    );
    await rm(cwd, { recursive: true, force: true });
  }
});
test("le refus stocké dans un autre onglet révoque un accord antérieur", () => {
  let value = null;
  globalThis.localStorage = {
    getItem: () => value,
    setItem: (_, v) => {
      value = v;
    },
  };
  let emitted = 0;
  globalThis.window = { dispatchEvent: () => emitted++ };
  setConsent("granted");
  track("email_click");
  assert.equal(emitted, 1);
  value = "denied";
  track("email_click");
  assert.equal(emitted, 1);
});
test("une réimportation ne remplace pas un article révisé publiable", async () => {
  const cwd = await mkdtemp(join(tmpdir(), "aimy-import-test-"));
  try {
    for (const dir of [
      ".private/wordpress",
      "src/content/posts",
      "aimy-digital-refonte-codex/assets",
    ])
      await mkdir(join(cwd, dir), { recursive: true });
    const post = {
      slug: "exemple",
      title: { rendered: "Ancien" },
      excerpt: { rendered: "Ancien" },
      content: { rendered: "Résultat non vérifié" },
      link: "https://aimy-digital.fr/exemple/",
      date: "2025-01-01",
      modified: "2025-01-01",
      categories: [],
    };
    for (const [name, data] of Object.entries({
      posts: [post],
      media: [],
      pages: [{ slug: "portfolio", content: { rendered: "" } }],
    }))
      await writeFile(
        join(cwd, ".private/wordpress", name + ".json"),
        JSON.stringify(data),
      );
    await writeFile(
      join(cwd, "aimy-digital-refonte-codex/assets/logo-source.png"),
      "fixture",
    );
    await writeFile(
      join(cwd, "src/content/posts/exemple.json"),
      "révision validée",
    );
    execFileSync(process.execPath, [resolve("scripts/import-content.mjs")], {
      cwd,
      stdio: "pipe",
    });
    assert.equal(
      await readFile(join(cwd, "src/content/posts/exemple.json"), "utf8"),
      "révision validée",
    );
  } finally {
    assert.ok(
      resolve(cwd).startsWith(resolve(tmpdir()) + "\\aimy-import-test-") ||
        resolve(cwd).startsWith(resolve(tmpdir()) + "/aimy-import-test-"),
    );
    await rm(cwd, { recursive: true, force: true });
  }
});

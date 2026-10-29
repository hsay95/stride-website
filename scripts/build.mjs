// Generates the static site into the repo root: node scripts/build.mjs
// No dependencies. Vercel serves the committed output as-is (no build step).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, page } from "../src/site.mjs";
import { BLOCK_APPS } from "../src/block-apps.mjs";
import { home, blockPage, privacy, terms, support, notFound } from "../src/pages.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const pages = [
  home(BLOCK_APPS),
  ...BLOCK_APPS.map((app) => blockPage(app, BLOCK_APPS)),
  support(),
  privacy(),
  terms(),
  notFound(),
];

for (const p of pages) {
  const out = join(ROOT, p.file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page({ ...p, blockApps: BLOCK_APPS }));
  console.log("wrote", p.file);
}

const indexed = pages.filter((p) => !p.noindex);
const priority = (path) => (path === "/" ? "1.0" : path.startsWith("/block/") ? "0.8" : "0.4");
writeFileSync(
  join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexed
  .map((p) => `  <url><loc>${SITE.url}${p.path === "/" ? "/" : p.path}</loc><lastmod>${SITE.updated}</lastmod><priority>${priority(p.path)}</priority></url>`)
  .join("\n")}
</urlset>
`
);

writeFileSync(join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

writeFileSync(
  join(ROOT, "llms.txt"),
  `# Stride

> Stride (App Store name: "Stride - App Lock & Focus") is an iPhone app that locks distracting apps until you walk. Every 500 steps, read from Apple Health, earns 15 minutes of app time. Minutes bank for the week and reset every Monday. Locked apps relock automatically when the minutes are used.

- Platform: iPhone, iOS ${SITE.minIOS} or later
- Price: free to download; the free plan locks one app. Stride Pro (${SITE.prices.monthly}/month, ${SITE.prices.yearly}/year, ${SITE.prices.lifetime} lifetime, US prices) locks unlimited apps and whole categories.
- Privacy: no account needed; Screen Time and daily step data stay on the device; the optional Friends leaderboard (Sign in with Apple) shares only weekly step totals and streaks with approved friends; Apple's Screen Time framework does not let Stride see what you do inside apps; anonymous usage analytics (PostHog, no health or Screen Time data), opt-out in Settings > Privacy.
- Scope: Stride locks apps and app categories, not websites.
- App Store: ${SITE.appStore}
- Contact: ${SITE.email}

## Pages

- [Home](${SITE.url}/): how Stride works, features, pricing, FAQ
${BLOCK_APPS.map((a) => `- [Block ${a.name}](${SITE.url}/block/${a.slug}): lock ${a.name} on iPhone until you walk`).join("\n")}
- [Support](${SITE.url}/support)
- [Privacy Policy](${SITE.url}/privacy)
- [Terms of Use](${SITE.url}/terms)
`
);

console.log(`wrote sitemap.xml (${indexed.length} urls), robots.txt, llms.txt`);

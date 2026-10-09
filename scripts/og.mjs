// Renders 1200x630 social cards with headless Chrome: node scripts/og.mjs
// Re-run after changing headlines in src/block-apps.mjs.

import { writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { BLOCK_APPS } from "../src/block-apps.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const asset = (p) => "file://" + join(ROOT, "assets", p);

const card = ({ headline, sub, shot }) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@500;600&display=block">
<style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;overflow:hidden;font-family:Inter,sans-serif;color:#1f3d2e;
    background:radial-gradient(700px 600px at 1000px 40px,rgba(181,230,204,.9),transparent 70%),radial-gradient(600px 500px at 0 640px,rgba(255,209,186,.65),transparent 70%),#f6f2ea;}
  .copy{position:absolute;left:72px;top:64px;width:640px}
  .brand{display:flex;align-items:center;gap:14px;font-weight:600;font-size:26px;letter-spacing:-.02em}
  .brand img{width:52px;height:52px;border-radius:13px;box-shadow:0 8px 18px -8px rgba(31,61,46,.5)}
  h1{margin-top:44px;font-family:"Instrument Serif",serif;font-weight:400;font-size:86px;line-height:.95;letter-spacing:-.03em}
  h1 em{color:#387357}
  p{margin-top:28px;font-size:25px;color:#6b645a;font-weight:500}
  .pill{position:absolute;left:72px;bottom:56px;display:flex;align-items:center;gap:10px;padding:12px 20px;border-radius:999px;background:#0b0b0b;color:#fff;font-size:19px;font-weight:600}
  .pill svg{width:20px;height:20px;fill:#fff;margin-top:-3px}
  .ring{position:absolute;width:560px;height:560px;right:20px;top:120px}
  .phone{position:absolute;right:120px;top:70px;width:330px;filter:drop-shadow(0 40px 40px rgba(31,61,46,.25))}
</style></head><body>
<svg class="ring" viewBox="0 0 600 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b5e6cc"/><stop offset=".55" stop-color="#61a885"/><stop offset="1" stop-color="#387357"/></linearGradient></defs>
<circle cx="300" cy="300" r="262" fill="none" stroke="rgba(31,61,46,.07)" stroke-width="34"/><circle cx="300" cy="300" r="262" fill="none" stroke="url(#g)" stroke-width="34" stroke-linecap="round" pathLength="100" stroke-dasharray="74 100" transform="rotate(-90 300 300)"/></svg>
<img class="phone" src="${asset(`shots/${shot}-760.webp`)}">
<div class="copy">
  <div class="brand"><img src="${asset("icon-512.png")}">Stride</div>
  <h1>${headline}</h1>
  <p>${sub}</p>
</div>
<div class="pill"><svg viewBox="0 0 24 24"><path d="M16.37 1.43c0 1.14-.46 2.2-1.21 3.01-.8.88-2.1 1.56-3.17 1.47-.13-1.1.42-2.27 1.16-3.06.83-.9 2.22-1.54 3.22-1.42zM20.94 17.1c-.57 1.3-.84 1.88-1.57 3.03-1.02 1.6-2.46 3.6-4.24 3.6-1.58.02-1.99-1.04-4.14-1.03-2.14.01-2.59 1.05-4.17 1.03-1.78-.02-3.14-1.82-4.16-3.42C.34 15.9-.14 10.6 1.65 7.8c1.28-2 3.3-3.17 5.2-3.17 1.94 0 3.16 1.07 4.76 1.07 1.56 0 2.51-1.07 4.75-1.07 1.7 0 3.49.92 4.77 2.52-4.19 2.3-3.51 8.28-.19 9.95z"/></svg>Download on the App Store</div>
</body></html>`;

const jobs = [
  { out: "home.png", headline: "Walk more.<br><em>Scroll less.</em>", sub: "500 steps = 15 minutes of the apps you lock.", shot: "today" },
  ...BLOCK_APPS.map((a) => ({
    out: `block-${a.slug}.png`,
    headline: `Block ${a.name.replace(" (Twitter)", "")}<br><em>until you walk.</em>`,
    sub: "500 steps = 15 minutes. Relocks on its own.",
    shot: "apps",
  })),
];

const tmp = mkdtempSync(join(tmpdir(), "stride-og-"));
try {
  for (const j of jobs) {
    const html = join(tmp, j.out + ".html");
    writeFileSync(html, card(j));
    execFileSync(CHROME, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
      "--allow-file-access-from-files", "--virtual-time-budget=4000",
      "--window-size=1200,630", `--screenshot=${join(ROOT, "assets/og", j.out)}`, "file://" + html,
    ], { stdio: "ignore" });
    console.log("rendered", j.out);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

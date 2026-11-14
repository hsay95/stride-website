// The Meta ads landing page: /walk. One offer, one audience, one action (open the App Store).
// Standalone on purpose: it has its own typeface and CSS, inlined so it paints fast inside the
// Instagram and Facebook browsers. It is noindex and stays out of the sitemap.
// Tracking: anonymous PostHog events lp_view and lp_appstore_click, sent through the /ph rewrite in
// vercel.json. No cookies, no ad trackers. Privacy policy section 6 describes this, so keep them in step.

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, esc } from "./site.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
// Sent with every event, so the PostHog dashboard can split this design from the first one (no variant).
const VARIANT = "v2";

const POSTHOG_TOKEN = "phc_pmDkVFcg7JTu3RwotZeaYBWtxNRAFcuy4pJm7iAWVL2r"; // public by design, same project as the app
const P = SITE.prices;

// Phosphor icons (MIT).
const PHOSPHOR = {
  apple: "M128.23,30A40,40,0,0,1,167,0h1a8,8,0,0,1,0,16h-1a24,24,0,0,0-23.24,18,8,8,0,1,1-15.5-4ZM223.3,169.59a8.07,8.07,0,0,0-2.8-3.4C203.53,154.53,200,134.64,200,120c0-17.67,13.47-33.06,21.5-40.67a8,8,0,0,0,0-11.62C208.82,55.74,187.82,48,168,48a72.23,72.23,0,0,0-40,12.13,71.56,71.56,0,0,0-90.71,9.09A74.63,74.63,0,0,0,16,123.4a127,127,0,0,0,40.14,89.73A39.8,39.8,0,0,0,83.59,224h87.68a39.84,39.84,0,0,0,29.12-12.57,125,125,0,0,0,17.82-24.6C225.23,174,224.33,172,223.3,169.59Z",
  lock: "M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z",
  steps: "M208.06,184H152a8,8,0,0,0-8,8v12a36,36,0,0,0,72.05,0V192A8,8,0,0,0,208.06,184Zm-8,20a20,20,0,0,1-40,0v-4h40ZM104,160h-56a8,8,0,0,0-8,8v12A36,36,0,0,0,112,180V168A8,8,0,0,0,104,160Zm-8,20a20,20,0,0,1-40,0v-4H96ZM76,16C64.36,16,53.07,26.31,44.2,45c-13.93,29.38-18.56,73,.29,96a8,8,0,0,0,6.2,2.93h50.55a8,8,0,0,0,6.2-2.93c18.85-23,14.22-66.65.29-96C98.85,26.31,87.57,16,76,16ZM97.15,128H54.78c-11.4-18.1-7.21-52.7,3.89-76.11C65.14,38.22,72.17,32,76,32s10.82,6.22,17.3,19.89C104.36,75.3,108.55,109.9,97.15,128Zm57.61,40h50.55a8,8,0,0,0,6.2-2.93c18.85-23,14.22-66.65.29-96C202.93,50.31,191.64,40,180,40s-22.89,10.31-31.77,29c-13.93,29.38-18.56,73,.29,96A8.05,8.05,0,0,0,154.76,168Zm8-92.11C169.22,62.22,176.25,56,180,56s10.82,6.22,17.29,19.89c11.1,23.41,15.29,58,3.9,76.11H158.85C147.45,133.9,151.64,99.3,162.74,75.89Z",
  unlock: "M208,80H96V56a32,32,0,0,1,32-32c15.37,0,29.2,11,32.16,25.59a8,8,0,0,0,15.68-3.18C171.32,24.15,151.2,8,128,8A48.05,48.05,0,0,0,80,56V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm0,128H48V96H208V208Z",
  plus: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z",
  check: "M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z",
  shield: "M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z",
  timer: "M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z",
  friends: "M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z",
};
const ph = (name, cls = "icon") =>
  `<svg class="${cls}" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="${PHOSPHOR[name]}"/></svg>`;
// Optional lifestyle photos. Drop a file at assets/lp/photo-<slot>.webp and rebuild: the page picks it
// up. With no file the section falls back to app screens and the mascot, so the page is always whole.
// Slots: hero (4:5), before (4:3), after (4:3), walk (16:9).
const has = (slot) => existsSync(join(ROOT, "assets", "lp", `photo-${slot}.webp`));
const photo = (slot, alt, cls, eager = false) =>
  `<img class="${cls}" src="/assets/lp/photo-${slot}.webp" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;

// Every App Store button on the page. data-placement says which one was tapped.
const cta = (placement, label = "Download free on the App Store") =>
  `<a class="cta button-lg" href="${SITE.appStore}" data-placement="${placement}">${ph("apple", "icon-apple")}${label}</a>`;

const phone = (slug, alt, { eager = false, sizes = "(max-width: 767px) 240px, 300px" } = {}) =>
  `<img class="phone" src="/assets/lp/phone-${slug}-800.webp" srcset="/assets/lp/phone-${slug}-400.webp 400w, /assets/lp/phone-${slug}-800.webp 800w" sizes="${sizes}" width="800" height="1633" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;

const FAQS = [
  ["Is it really free?", `Yes. Stride is free to download and the free plan locks one app for as long as you like, with walking to earn and your weekly bank included. Stride Pro locks unlimited apps and whole categories such as Social and Games. In the US it costs ${P.monthly} a month, ${P.yearly} a year or ${P.lifetime} once. The App Store shows the price in your currency, and Apple handles every purchase.`],
  ["Can't I just turn it off when I want to scroll?", "It's your phone, so you can always change what's locked from inside Stride. What changes is the default: your apps open to a shield instead of a feed, and the quickest way past it is a short walk. That small pause is what breaks the habit of opening them without thinking."],
  ["Does Stride see what I do in my apps?", "No. Apple's Screen Time system lets Stride lock and unlock the apps you choose, but Stride can't see what you do inside them."],
  ["Do I need an account?", "No. Stride works with no sign up, email or login. Only the optional Friends leaderboard uses Sign in with Apple, and it shares just your weekly step total and streak with friends you approve."],
  ["Which steps count?", "Steps your iPhone or Apple Watch records in Apple Health. Steps typed in by hand in the Health app don't count toward earned minutes."],
  ["What happens when my minutes run out?", "Your locked apps lock again on their own. Stride sends a heads up when one minute is left and another when your minutes are used. Minutes only count down while you're using locked apps."],
  ["Do unused minutes expire?", "Earned minutes stay in your bank for the whole week and reset every Monday, so a long Monday walk can cover a few breaks later in the week."],
  ["Which devices does Stride work on?", `iPhone with iOS ${SITE.minIOS} or later. Stride isn't available for iPad or Android yet.`],
];

const CSS = `
@font-face{font-family:"Manrope";src:url("/assets/fonts/manrope-latin.woff2") format("woff2");font-weight:200 800;font-style:normal;font-display:swap}
:root{--bg:#f6f2ea;--surface:#fffdf9;--well:#ece6da;--ink:#0f1c16;--text:#3f4a43;--muted:#5f675f;--forest:#1f3d2e;--green:#2f7a55;--mint:#b5e6cc;--peach:#fde3c8;--coral:#e8674f;--line:rgba(31,61,46,.12);--curve:cubic-bezier(.22,1,.36,1);color-scheme:light}
*{box-sizing:border-box;margin:0}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:"Manrope",ui-sans-serif,system-ui,-apple-system,sans-serif;font-size:16px;line-height:24px;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img,svg{display:block}
a{color:inherit}
h1,h2,h3{color:var(--ink);text-wrap:balance;letter-spacing:-.02em}
p,li,summary{text-wrap:pretty}
.h1{font-size:40px;line-height:42px;font-weight:700}
.h2{font-size:30px;line-height:36px;font-weight:700}
.h3{font-size:20px;line-height:28px;font-weight:700}
.body{font-size:16px;line-height:24px;font-weight:400}
.lead{font-size:18px;line-height:28px;font-weight:400}
.small{font-size:14px;line-height:20px;font-weight:500}
.tiny{font-size:12px;line-height:16px;font-weight:400}
.button-lg{font-size:18px;line-height:28px;font-weight:700}
.wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 16px}
.skip{position:absolute;left:16px;top:-64px;background:var(--ink);color:#fff;padding:8px 12px;border-radius:8px;z-index:30}
.skip:focus{top:8px}
:focus-visible{outline:2px solid var(--forest);outline-offset:2px}
.icon{width:24px;height:24px;flex:none}
.icon-apple{width:24px;height:24px;flex:none}

.top{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;max-width:1120px;margin:0 auto}
.brand{display:flex;align-items:center;gap:8px;text-decoration:none;color:var(--ink);font-size:18px;font-weight:700}
.brand img{border-radius:8px}
.top-tag{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:var(--mint);color:var(--forest)}
.top-tag svg{width:16px;height:16px}

.cta{display:flex;align-items:center;justify-content:center;gap:8px;min-height:60px;width:100%;padding:8px 16px;background:var(--ink);color:#fff;border-radius:16px;text-decoration:none;white-space:nowrap;box-shadow:0 12px 24px rgba(15,28,22,.18);transition:transform 300ms var(--curve),background-color 300ms var(--curve)}
.cta:hover{background:var(--forest);transform:translateY(-2px)}
.cta:active{transform:scale(.98)}
.assure{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:14px;padding:0;list-style:none;color:var(--muted)}
.assure li{display:flex;align-items:center;gap:4px}
.assure svg{width:16px;height:16px;color:var(--green)}

.hero{padding:16px 0 0}
.hero h1 em{font-style:normal;color:var(--green)}
.hero .sub{margin-top:14px;max-width:560px}
.hero .cta{margin-top:22px}
.stage{position:relative;height:400px;margin-top:28px;border-radius:28px;overflow:hidden;background:linear-gradient(180deg,#d8eef7 0%,#fdebd3 58%,#cdeeda 100%)}
.stage-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.phone{width:240px;height:auto;filter:drop-shadow(0 24px 32px rgba(31,61,46,.22))}
.stage .phone{position:absolute;left:50%;top:44px;transform:translateX(-50%)}
.stage .buddy{position:absolute;left:-14px;bottom:-12px;width:150px;height:auto}
.stage.has-photo .phone{left:auto;right:14px;top:auto;bottom:-150px;width:176px;transform:none}
.chip{position:absolute;display:flex;align-items:center;gap:6px;padding:8px 14px 8px 10px;background:var(--surface);color:var(--ink);border-radius:999px;box-shadow:0 8px 24px rgba(15,28,22,.16);font-size:14px;line-height:20px;font-weight:700;white-space:nowrap}
.chip svg{width:18px;height:18px}
.chip.a{top:14px;left:12px}
.chip.a svg{color:var(--coral)}
.chip.b{right:12px;bottom:18px;background:var(--forest);color:#fff}
.chip.b svg{color:var(--mint)}
.stage.has-photo .chip.b{right:auto;left:12px}
.stage.has-photo .chip.a{left:auto;right:12px}
.stage-photo{object-position:0% 30%}

section.block{padding:64px 0}
.eyebrow{color:var(--green);margin-bottom:8px;text-transform:uppercase;letter-spacing:.08em;font-size:12px;line-height:16px;font-weight:700}
.lede{margin-top:12px;max-width:620px}
.mid-cta{margin-top:24px}

.calc{margin-top:28px;padding:24px 20px;background:var(--surface);border:1px solid var(--line);border-radius:24px}
.calc label{display:block;color:var(--ink);font-weight:700}
.calc-val{display:block;margin-top:4px;color:var(--green);font-size:40px;line-height:44px;font-weight:800;letter-spacing:-.02em}
.calc input[type=range]{width:100%;margin:16px 0 8px;height:32px;accent-color:var(--green)}
.calc-out{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.calc-out div{padding:16px;border-radius:16px;background:var(--well)}
.calc-out .win{background:var(--mint);color:var(--forest)}
.calc-out b{display:block;color:var(--ink);font-size:26px;line-height:30px;font-weight:800;letter-spacing:-.02em}
.calc-out .win b{color:var(--forest)}
.calc-year{margin-top:14px;color:var(--text)}
.calc-year b{color:var(--ink)}

.problem{background:var(--forest);color:rgba(255,255,255,.84)}
.problem h2{color:#fff}
.problem .eyebrow{color:var(--mint)}
.compare{display:grid;gap:12px;margin-top:28px}
.compare article{border-radius:20px;background:rgba(255,255,255,.08);overflow:hidden}
.compare img{width:100%;aspect-ratio:4/3;object-fit:cover}
.compare .pad{padding:20px}
.compare h3{color:#fff;margin-bottom:6px}
.compare .win{background:var(--mint);color:var(--forest)}
.compare .win h3{color:var(--forest)}
.tag{display:inline-block;margin-bottom:10px;padding:2px 10px;border-radius:999px;background:rgba(255,255,255,.14);color:#fff;font-size:12px;line-height:20px;font-weight:700}
.win .tag{background:var(--forest);color:#fff}

.steps{display:grid;gap:12px;margin-top:28px;padding:0;list-style:none}
.steps li{background:var(--surface);border:1px solid var(--line);border-radius:20px;overflow:hidden}
.steps .pad{padding:20px 20px 16px}
.steps .n{display:flex;width:36px;height:36px;align-items:center;justify-content:center;background:var(--ink);color:#fff;border-radius:999px;font-weight:800;margin-bottom:12px}
.steps p{margin-top:4px}
.shot{display:flex;justify-content:center;align-items:flex-start;height:230px;overflow:hidden;background:var(--well);padding-top:20px}
.shot .phone{width:210px;filter:drop-shadow(0 12px 20px rgba(31,61,46,.18))}
.shot.low{align-items:flex-end;padding-top:0}

.more{display:grid;gap:12px;margin-top:28px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:20px;overflow:hidden}
.card .pad{padding:20px}
.card p{margin-top:4px}
.card .ic{display:flex;width:44px;height:44px;align-items:center;justify-content:center;background:var(--mint);color:var(--forest);border-radius:12px;margin-bottom:12px}

.band{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:24px;margin-top:28px}
.stats{display:grid;gap:12px;margin-top:28px}
.stat{padding:20px;background:var(--surface);border:1px solid var(--line);border-radius:20px}
.stat strong{display:block;color:var(--green);font-size:40px;line-height:44px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}
.stat cite{display:block;margin-top:10px;font-style:normal;color:var(--muted)}
.fine{margin-top:14px;color:var(--muted)}

.trust{background:var(--peach)}
.trust ul{display:grid;gap:16px;margin-top:24px;padding:0;list-style:none}
.trust li{display:flex;gap:12px;align-items:flex-start}
.trust li svg{color:var(--forest);margin-top:2px}
.trust li b{display:block;color:var(--ink)}

.plans{display:grid;gap:12px;margin-top:28px}
.plan{padding:24px 20px;background:var(--surface);border:1px solid var(--line);border-radius:20px}
.plan.pro{border:2px solid var(--forest)}
.plan .price{display:block;margin:4px 0 12px;color:var(--ink);font-size:32px;line-height:36px;font-weight:800;letter-spacing:-.02em}
.plan .price small{font-size:16px;font-weight:500;color:var(--muted);letter-spacing:0}
.plan ul{display:grid;gap:8px;padding:0;list-style:none}
.plan li{display:flex;gap:8px;align-items:flex-start}
.plan li svg{width:20px;height:20px;color:var(--green);margin-top:2px}

.faq{margin-top:28px;display:grid;gap:8px;max-width:760px}
.faq details{background:var(--surface);border:1px solid var(--line);border-radius:14px}
.faq summary{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px;color:var(--ink);font-weight:600;cursor:pointer;list-style:none;border-radius:14px}
.faq summary::-webkit-details-marker{display:none}
.faq summary svg{width:16px;height:16px;flex:none;transition:transform 500ms var(--curve)}
.faq details[open] summary svg{transform:rotate(45deg)}
.faq details p{padding:0 16px 16px}

.final{padding:0 0 80px}
.final-card{display:flex;flex-direction:column;align-items:center;text-align:center;padding:32px 20px 36px;background:var(--forest);border-radius:28px;color:rgba(255,255,255,.84)}
.final-card h2{color:#fff}
.final-card img{margin-bottom:8px}
.final-card p{margin-top:12px;max-width:480px}
.final-card .cta{margin-top:24px;padding:8px;gap:6px;font-size:16px;background:#fff;color:var(--ink);box-shadow:none}
.final-card .cta:hover{background:var(--mint)}
.final-card .small{color:rgba(255,255,255,.7)}

footer{padding:32px 0 120px;border:1px solid var(--line);border-width:1px 0 0;color:var(--muted)}
footer nav{display:flex;flex-wrap:wrap;gap:8px 24px;margin-bottom:12px}
footer a{color:var(--text)}

.sticky{position:fixed;left:0;right:0;bottom:0;z-index:20;padding:8px 16px calc(8px + env(safe-area-inset-bottom));background:rgba(246,242,234,.92);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border:1px solid var(--line);border-width:1px 0 0;opacity:0;transform:translateY(100%);visibility:hidden;transition:transform 500ms var(--curve),opacity 300ms var(--curve),visibility 0s 500ms}
.sticky.show{opacity:1;transform:none;visibility:visible;transition:transform 500ms var(--curve),opacity 300ms var(--curve)}
.sticky .cta{max-width:400px;margin:0 auto;min-height:52px;box-shadow:none}

.js .reveal{opacity:0;transform:translateY(24px);transition:opacity 700ms var(--curve),transform 700ms var(--curve)}
.js .reveal.in{opacity:1;transform:none}

@media (max-width:359px){.cta.button-lg{font-size:16px;line-height:24px}.h1{font-size:34px;line-height:38px}}
@media (min-width:768px){
  .wrap,.top{padding-left:24px;padding-right:24px}
  .h1{font-size:60px;line-height:62px}
  .h2{font-size:44px;line-height:48px}
  .hero{padding:32px 0 32px}
  .hero-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:48px;align-items:center}
  .hero .cta,.mid-cta .cta{width:auto;min-width:360px;display:inline-flex}
  .stage{height:560px;margin-top:0}
  .phone{width:300px}
  .stage .phone{top:56px}
  .stage .buddy{width:200px}
  .stage.has-photo .phone{width:220px;bottom:-180px}
  section.block{padding:96px 0}
  .calc{padding:40px;max-width:760px}
  .compare{grid-template-columns:1fr 1fr;gap:16px}
  .steps,.stats{grid-template-columns:repeat(3,1fr);gap:16px}
  .more{grid-template-columns:1fr 1fr;gap:16px}
  .trust ul{grid-template-columns:1fr 1fr;gap:24px 40px}
  .plans{grid-template-columns:1fr 1fr;gap:16px;max-width:760px}
  .final-card{padding:56px 24px}
  .final-card .cta{width:auto;min-width:360px;font-size:18px;gap:8px}
  .sticky .cta{width:360px}
}
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .js .reveal{transform:none;transition:opacity 300ms linear}
  .cta,.cta:hover,.sticky,.sticky.show{transition:opacity 300ms var(--curve);transform:none}
  .sticky{transform:none}
}
`;

// Runs before anything else on the page so a fast tap on the hero button is still counted.
const TRACKER = `
(function () {
  document.documentElement.classList.add("js");
  var q = new URLSearchParams(location.search);
  var ua = navigator.userAgent;
  var platform = /iPhone|iPod/.test(ua) ? "iphone"
    : /iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) ? "ipad"
    : /Android/.test(ua) ? "android" : "desktop";
  var id = null;
  function random() { return "lp-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 12); }
  // One random ID per visit, gone when the tab closes. It never leaves this page's own storage.
  try { id = sessionStorage.getItem("lp_id"); if (!id) { id = random(); sessionStorage.setItem("lp_id", id); } } catch (e) { id = random(); }
  var base = {
    "$process_person_profile": false, "$geoip_disable": true, "$lib": "stride-lp",
    "$current_url": location.origin + location.pathname, "$host": location.host,
    page: "walk", variant: "${VARIANT}", platform: platform, lang: navigator.language || "",
    in_app: /Instagram/.test(ua) ? "instagram" : /FBAN|FBAV|FB_IAB/.test(ua) ? "facebook" : "none",
    qa: q.has("qa")
  };
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function (k) {
    var v = q.get(k); if (v) base[k] = v.slice(0, 120);
  });
  function send(event, extra) {
    var props = Object.assign({}, base, extra || {});
    var body = JSON.stringify({ api_key: "${POSTHOG_TOKEN}", event: event, distinct_id: id, properties: props, timestamp: new Date().toISOString() });
    var sent = false;
    // A beacon survives the jump to the App Store, which would cancel a normal request.
    try { sent = navigator.sendBeacon("/ph/i/v0/e", new Blob([body], { type: "application/json" })); } catch (e) {}
    if (!sent) { try { fetch("/ph/i/v0/e", { method: "POST", keepalive: true, headers: { "Content-Type": "application/json" }, body: body }); } catch (e) {} }
  }
  send("lp_view", { referrer_host: document.referrer ? new URL(document.referrer).host : "" });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-placement]");
    if (a) send("lp_appstore_click", { placement: a.getAttribute("data-placement") });
  }, true);
})();
`;

const UI = `
(function () {
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });

    // The sticky button shows only while no other App Store button is on screen.
    var sticky = document.querySelector(".sticky");
    var seen = new Map();
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { seen.set(e.target, e.isIntersecting); });
      var any = false; seen.forEach(function (v) { if (v) any = true; });
      sticky.classList.toggle("show", !any);
    });
    document.querySelectorAll("main .cta").forEach(function (el) { so.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Calculator: plain arithmetic. 15 minutes per 500 steps, and 100 steps a minute of brisk walking.
  var range = document.getElementById("calc-range");
  if (range) {
    var out = {
      val: document.getElementById("calc-val"), steps: document.getElementById("calc-steps"),
      walk: document.getElementById("calc-walk"), year: document.getElementById("calc-year")
    };
    var hm = function (min) {
      var h = Math.floor(min / 60), m = min % 60;
      return (h ? h + " hr" : "") + (h && m ? " " : "") + (m || !h ? m + " min" : "");
    };
    var paint = function () {
      var min = Number(range.value);
      var steps = Math.round(min / 15 * 500);
      out.val.textContent = hm(min);
      out.steps.textContent = steps.toLocaleString("en-US");
      out.walk.textContent = hm(Math.round(steps / 100));
      out.year.textContent = Math.round(min * 365 / 60 / 24) + " full days";
      range.setAttribute("aria-valuetext", hm(min) + " a day");
    };
    range.addEventListener("input", paint);
    paint();
  }
})();
`;

const heroPhoto = has("hero");
const BODY = `
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <a class="brand" href="/"><img src="/assets/icon-128.webp" width="36" height="36" alt="">Stride</a>
  <span class="top-tag small">${ph("apple")}Free on iPhone</span>
</header>
<main id="main">

<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1 class="h1">Your apps stay locked <em>until you walk.</em></h1>
      <p class="sub lead">Stride locks Instagram, YouTube or whatever you can't put down. Every 500 steps earns you 15 minutes back.</p>
      ${cta("hero")}
      <ul class="assure small">
        <li>${ph("check")}Free plan, no time limit</li>
        <li>${ph("check")}No account</li>
        <li>${ph("check")}Set up in 2 minutes</li>
      </ul>
    </div>
    <div class="stage${heroPhoto ? " has-photo" : ""}">
      ${heroPhoto ? photo("hero", "A person out on a walk in the evening light, phone down by their side", "stage-photo", true) : ""}
      ${phone("today", "Stride's Today screen: 3,913 steps today and 352 more steps to earn 15 minutes", { eager: true })}
      ${heroPhoto ? "" : `<img class="buddy" src="/assets/lp/mascot-480.webp" width="480" height="480" alt="">`}
      <span class="chip a">${ph("lock")}Locked until you walk</span>
      <span class="chip b">${ph("steps")}500 steps = 15 min</span>
    </div>
  </div>
</section>

<section class="block">
  <div class="wrap">
    <p class="eyebrow reveal">Try the trade</p>
    <h2 class="h2 reveal">What would your scrolling cost in steps?</h2>
    <div class="calc reveal">
      <label for="calc-range">I scroll about this much a day</label>
      <output class="calc-val" id="calc-val" for="calc-range">2 hr</output>
      <input id="calc-range" type="range" min="30" max="360" step="15" value="120">
      <div class="calc-out">
        <div class="win"><b id="calc-steps">4,000</b><span class="small">steps to earn it</span></div>
        <div><b id="calc-walk">40 min</b><span class="small">of brisk walking</span></div>
      </div>
      <p class="calc-year body">Kept up for a year, that much scrolling adds up to <b id="calc-year">30 full days</b>. With Stride you either walk for it or scroll less. Both are a win.</p>
      <p class="fine tiny">Stride's rate is 500 steps for 15 minutes. Walking time assumes a brisk 100 steps a minute (Tudor Locke et al., Br. J. Sports Med., 2018).</p>
    </div>
  </div>
</section>

<section class="block problem">
  <div class="wrap">
    <p class="eyebrow reveal">Why timers fail</p>
    <h2 class="h2 reveal">A limit you can dismiss isn't much of a limit.</h2>
    <div class="compare">
      <article class="reveal">
        ${has("before") ? photo("before", "Someone lying on a sofa at night, lit by their phone", "") : ""}
        <div class="pad"><span class="tag">The usual app timer</span><h3 class="h3">Tap "Ignore", keep scrolling</h3><p class="body">Time runs out, you dismiss it in one tap, and it's midnight again. Nothing about your evening changes.</p></div>
      </article>
      <article class="win reveal">
        ${has("after") ? photo("after", "The same person outside on an evening walk", "") : ""}
        <div class="pad"><span class="tag">Stride</span><h3 class="h3">Walk first, scroll after</h3><p class="body">Your apps open to a lock screen until you've earned the time on your feet. You still get your breaks, and you walked for them.</p></div>
      </article>
    </div>
  </div>
</section>

<section class="block">
  <div class="wrap">
    <p class="eyebrow reveal">How it works</p>
    <h2 class="h2 reveal">Three steps, about two minutes</h2>
    <ol class="steps">
      <li class="reveal"><div class="pad"><span class="n">1</span><h3 class="h3">Pick what to lock</h3><p class="body">Choose the app you open without thinking. It locks right away, using Apple's own Screen Time.</p></div><div class="shot">${phone("apps", "Stride's Apps screen with Entertainment, Social and Games locked", { sizes: "210px" })}</div></li>
      <li class="reveal"><div class="pad"><span class="n">2</span><h3 class="h3">Go for a walk</h3><p class="body">Stride counts the steps your iPhone or Apple Watch records. Every 500 adds 15 minutes to your bank.</p></div><div class="shot">${phone("today", "Stride's Today screen counting steps toward the next 15 minutes", { sizes: "210px" })}</div></li>
      <li class="reveal"><div class="pad"><span class="n">3</span><h3 class="h3">Unlock, then relock</h3><p class="body">Start a 15 minute pass when you want a break. When it's used, your apps lock again on their own.</p></div><div class="shot">${phone("bank", "Stride's Time Bank with a Start 15 min app pass button", { sizes: "210px" })}</div></li>
    </ol>
    <div class="mid-cta reveal">${cta("how")}</div>
  </div>
</section>

<section class="block" style="padding-top:0">
  <div class="wrap">
    <p class="eyebrow reveal">Also inside</p>
    <h2 class="h2 reveal">Built to keep you going</h2>
    <div class="more">
      <article class="card reveal"><div class="pad"><span class="ic">${ph("timer")}</span><h3 class="h3">See where your time goes</h3><p class="body">Today and the last 7 days, your top apps and how often you pick up your phone.</p></div><div class="shot">${phone("screentime", "Stride's Screen Time tab showing a 5 hour 12 minute daily average", { sizes: "210px" })}</div></article>
      <article class="card reveal"><div class="pad"><span class="ic">${ph("friends")}</span><h3 class="h3">Walk with friends, if you like</h3><p class="body">A private weekly step leaderboard with people you approve. Optional, and it shares only your weekly steps and streak.</p></div><div class="shot">${phone("friends", "Stride's Friends leaderboard ranking friends by steps this week", { sizes: "210px" })}</div></article>
      <article class="card reveal"><div class="pad"><span class="ic">${ph("check")}</span><h3 class="h3">A streak worth keeping</h3><p class="body">Set a daily step goal and watch the streak build. Small walks, every day, add up.</p></div></article>
      <article class="card reveal"><div class="pad"><span class="ic">${ph("unlock")}</span><h3 class="h3">Minutes that wait for you</h3><p class="body">Earned time stays in your bank all week and only runs while you're in a locked app. It resets on Monday.</p></div></article>
    </div>
  </div>
</section>

<section class="block" style="padding-top:0">
  <div class="wrap">
    <p class="eyebrow reveal">Why walking</p>
    <h2 class="h2 reveal">A short walk is a good trade</h2>
    ${has("walk") ? photo("walk", "People walking outdoors in soft evening light", "band reveal") : ""}
    <div class="stats">
      <article class="stat reveal"><strong>51%</strong><p class="body">lower risk of death from any cause for US adults taking 8,000 steps a day compared with 4,000.</p><cite class="tiny">Saint Maurice et al., <a href="https://doi.org/10.1001/jama.2020.1382" rel="noopener">JAMA, 2020</a></cite></article>
      <article class="stat reveal"><strong>60%</strong><p class="body">average boost in creative output while walking instead of sitting, in Stanford experiments.</p><cite class="tiny">Oppezzo and Schwartz, <a href="https://doi.org/10.1037/a0036577" rel="noopener">J. Exp. Psychology, 2014</a></cite></article>
      <article class="stat reveal"><strong>5 min</strong><p class="body">of brisk walking covers about 500 steps, at the pace of 100 steps a minute researchers call moderate.</p><cite class="tiny">Tudor Locke et al., <a href="https://doi.org/10.1136/bjsports-2017-097628" rel="noopener">Br. J. Sports Med., 2018</a></cite></article>
    </div>
    <p class="fine tiny">Research findings describe averages and associations, not guaranteed results. Stride is a focus tool, not a medical device.</p>
  </div>
</section>

<section class="block trust">
  <div class="wrap">
    <p class="eyebrow reveal">Private by design</p>
    <h2 class="h2 reveal">Your phone habits are your business</h2>
    <ul>
      <li class="reveal">${ph("shield")}<div><b>No account needed</b><span class="body">No sign up, no email, no login. Download and start.</span></div></li>
      <li class="reveal">${ph("lock")}<div><b>It stays on your iPhone</b><span class="body">Your Screen Time and daily step data never leave your device.</span></div></li>
      <li class="reveal">${ph("check")}<div><b>Stride can't see inside your apps</b><span class="body">Apple's Screen Time lets Stride lock them, not look at what you do in them.</span></div></li>
      <li class="reveal">${ph("check")}<div><b>No ads, nothing sold</b><span class="body">We don't sell your data or use it for advertising.</span></div></li>
    </ul>
  </div>
</section>

<section class="block">
  <div class="wrap">
    <p class="eyebrow reveal">Pricing</p>
    <h2 class="h2 reveal">Start free. Upgrade only if you want more.</h2>
    <div class="plans">
      <article class="plan reveal"><h3 class="h3">Free</h3><span class="price">$0 <small>no time limit</small></span>
        <ul class="body"><li>${ph("check")}Lock one app</li><li>${ph("check")}Walk to earn minutes</li><li>${ph("check")}Weekly time bank</li></ul></article>
      <article class="plan pro reveal"><h3 class="h3">Stride Pro</h3><span class="price">${P.yearly} <small>a year</small></span>
        <ul class="body"><li>${ph("check")}Lock unlimited apps</li><li>${ph("check")}Lock whole categories like Social and Games</li><li>${ph("check")}Or ${P.monthly} a month, or ${P.lifetime} once</li></ul></article>
    </div>
    <p class="fine tiny">US prices. The App Store shows the price in your currency. Subscriptions are billed through your Apple ID and renew automatically until you cancel in your App Store settings, at least 24 hours before the period ends.</p>
  </div>
</section>

<section class="block" style="padding-top:0">
  <div class="wrap">
    <h2 class="h2 reveal">Questions people ask</h2>
    <div class="faq">
      ${FAQS.map(([q, a]) => `<details><summary>${esc(q)}${ph("plus")}</summary><p class="body">${esc(a)}</p></details>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="final">
  <div class="wrap">
    <div class="final-card reveal">
      <img src="/assets/lp/mascot-480.webp" width="180" height="180" alt="Stride's green walking buddy waving" loading="lazy">
      <h2 class="h2">Your next walk pays for your next scroll.</h2>
      <p class="body">Free to download. Lock your first app in about two minutes.</p>
      ${cta("final")}
      <p class="small" style="margin-top:12px">iPhone with iOS ${SITE.minIOS} or later</p>
    </div>
  </div>
</section>
</main>

<footer>
  <div class="wrap small">
    <nav aria-label="Legal"><a href="/">Stride home</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/support">Support</a></nav>
    <p class="tiny">App screens show sample data${["hero", "before", "after", "walk"].some(has) ? ", and photos are illustrations" : ""}. Instagram and YouTube are trademarks of their owners, who don't sponsor or endorse Stride. This page counts visits and App Store taps anonymously, with no cookies. See our <a href="/privacy">privacy policy</a>.</p>
  </div>
</footer>

<div class="sticky">${cta("sticky", "Get Stride free")}</div>
`;

export function landing() {
  const title = "Stride: Walk to unlock your apps";
  const description = "Stride locks the apps you lose hours to. Every 500 steps you walk earns back 15 minutes. Free on the App Store for iPhone.";
  return {
    file: "walk.html",
    html: `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="robots" content="noindex, follow">
<meta name="theme-color" content="#f6f2ea">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Stride">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${SITE.url}/walk">
<meta property="og:image" content="${SITE.url}/assets/og/home.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon-48.png" sizes="48x48">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
<style>${CSS}</style>
<script>${TRACKER}</script>
</head>
<body>
${BODY}
<script>${UI}</script>
</body>
</html>
`,
  };
}

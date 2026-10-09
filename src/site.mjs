// Shared constants, icons and page chrome for every generated page.

export const SITE = {
  url: "https://stride-focus.com",
  name: "Stride",
  storeName: "Stride - App Lock & Focus",
  appId: "6767678750",
  appStore: "https://apps.apple.com/app/id6767678750",
  email: "advantageyash@gmail.com",
  minIOS: "17.4",
  // Verified on the US App Store listing, 2026-10-09.
  prices: { monthly: "$4.99", yearly: "$19.99", lifetime: "$39.99" },
  updated: "2026-10-09",
};

// Bump when CSS/JS change so returning visitors don't get a stale cached copy.
const V = "20261009";

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const APPLE =
  '<svg class="apple" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.37 1.43c0 1.14-.46 2.2-1.21 3.01-.8.88-2.1 1.56-3.17 1.47-.13-1.1.42-2.27 1.16-3.06.83-.9 2.22-1.54 3.22-1.42zM20.94 17.1c-.57 1.3-.84 1.88-1.57 3.03-1.02 1.6-2.46 3.6-4.24 3.6-1.58.02-1.99-1.04-4.14-1.03-2.14.01-2.59 1.05-4.17 1.03-1.78-.02-3.14-1.82-4.16-3.42C.34 15.9-.14 10.6 1.65 7.8c1.28-2 3.3-3.17 5.2-3.17 1.94 0 3.16 1.07 4.76 1.07 1.56 0 2.51-1.07 4.75-1.07 1.7 0 3.49.92 4.77 2.52-4.19 2.3-3.51 8.28-.19 9.95z"/></svg>';

const PATHS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  unlock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.8"/>',
  footprints:
    '<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4M4 13h4"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/>',
  phone: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M11 18.5h2"/>',
  noUser: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20.5c1.3-3.4 3.9-5 7-5s5.7 1.6 7 5"/><path d="M3.5 3.5l17 17"/>',
  eyeOff:
    '<path d="M3 3l18 18"/><path d="M10.6 5.1A9.6 9.6 0 0 1 12 5c5 0 8.5 4.5 9.5 7a13 13 0 0 1-2.6 3.8M6.4 6.4C4.3 7.8 3 10 2.5 12c1 2.5 4.5 7 9.5 7a9.6 9.6 0 0 0 5.6-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M16 3v4M8 3v4M3.5 10h17"/>',
  timer: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 10v3.5l2.2 2.2M9.5 2.5h5"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
  bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  device: '<rect x="5" y="2.5" width="14" height="19" rx="3"/><path d="M9.5 6.5h5"/>',
};

export const icon = (name, cls = "icon") =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${PATHS[name]}</svg>`;

export const badge = (variant = "", label = "Download Stride on the App Store") =>
  `<a class="badge${variant ? " " + variant : ""}" href="${SITE.appStore}" aria-label="${esc(label)}" data-cta="app-store">${APPLE}<span><small>Download on the</small><strong>App Store</strong></span></a>`;

export const stepRing = (cls, id) => `
<svg class="${cls}" viewBox="0 0 600 600" aria-hidden="true">
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b5e6cc"/><stop offset=".55" stop-color="#61a885"/><stop offset="1" stop-color="#387357"/></linearGradient></defs>
  <circle cx="300" cy="300" r="262" fill="none" stroke="rgba(31,61,46,.07)" stroke-width="34"/>
  <circle class="ring-fill" cx="300" cy="300" r="262" fill="none" stroke="url(#${id})" stroke-width="34" stroke-linecap="round" pathLength="100" stroke-dasharray="74 100" transform="rotate(-90 300 300)"/>
</svg>`;

// Real screenshots from the shipping app, framed in Apple's iPhone 17 Pro Max bezel.
export const shot = (slug, alt, { cls = "phone", eager = false, sizes = "(max-width: 600px) 250px, 330px" } = {}) =>
  `<img class="${cls}" src="/assets/shots/${slug}-760.webp" srcset="/assets/shots/${slug}-380.webp 380w, /assets/shots/${slug}-760.webp 760w" sizes="${sizes}" width="760" height="1551" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;

export const ruleChip = (cls = "") => `
<div class="glass float chip-rule ${cls}">
  <span class="ic">${icon("footprints")}</span>
  <div><strong>500 steps = 15 min</strong><span>of app time, banked all week</span></div>
</div>`;

export function faqList(items) {
  return `<div class="faq">${items
    .map(
      (f, i) => `
  <details${i === 0 ? " open" : ""}>
    <summary>${esc(f.q)}<span class="pm">${icon("plus")}</span></summary>
    <div class="answer"><p>${f.html ?? esc(f.a)}</p></div>
  </details>`
    )
    .join("")}
</div>`;
}

export const faqJsonLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

function header(current) {
  const link = (href, label) =>
    `<a href="${href}"${current === href ? ' aria-current="page"' : ""}>${label}</a>`;
  return `
<a class="skip-link" href="#main">Skip to content</a>
<header class="nav" data-nav>
  <div class="container nav-inner">
    <a class="brand" href="/" aria-label="Stride home"><img src="/assets/icon-128.webp" width="34" height="34" alt=""><span>Stride</span></a>
    <nav class="nav-links" aria-label="Primary">
      ${link("/#how-it-works", "How it works")}
      ${link("/#features", "Features")}
      ${link("/#pricing", "Pricing")}
      ${link("/#faq", "FAQ")}
      ${link("/support", "Support")}
    </nav>
    <a class="nav-cta" href="${SITE.appStore}" data-cta="app-store">${APPLE}Get the app</a>
  </div>
</header>`;
}

function footer(blockApps) {
  return `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/"><img src="/assets/icon-128.webp" width="34" height="34" alt=""><span>Stride</span></a>
        <p>The app lock that opens when you walk. 500 steps earns 15 minutes of the apps you choose.</p>
        ${badge()}
      </div>
      <div>
        <h2>Product</h2>
        <ul>
          <li><a href="/#how-it-works">How it works</a></li>
          <li><a href="/#features">Features</a></li>
          <li><a href="/#pricing">Pricing</a></li>
          <li><a href="/#faq">FAQ</a></li>
          <li><a href="${SITE.appStore}">App Store</a></li>
        </ul>
      </div>
      <div>
        <h2>Block apps</h2>
        <ul>
          ${blockApps.map((a) => `<li><a href="/block/${a.slug}">Block ${esc(a.name)}</a></li>`).join("\n          ")}
        </ul>
      </div>
      <div>
        <h2>Help</h2>
        <ul>
          <li><a href="/support">Support</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Use</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Stride. Made for iPhone.</span>
      <p>Apple, the Apple logo, iPhone, App Store and Apple Health are trademarks of Apple Inc. ${blockApps
        .map((a) => esc(a.tmName))
        .join(", ")} are trademarks of their respective owners. Stride is not affiliated with or endorsed by them.</p>
    </div>
  </div>
</footer>`;
}

export function page({ path, title, description, body, jsonld = [], ogImage = "/assets/og/home.png", current = "", blockApps, noindex = false }) {
  const canonical = SITE.url + (path === "/" ? "/" : path);
  const ld = jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n    ");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    ${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
    <meta name="apple-itunes-app" content="app-id=${SITE.appId}">
    <meta name="theme-color" content="#f6f2ea">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Stride">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE.url}${ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${SITE.url}${ogImage}">
    <link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon-48.png">
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="/assets/site.css?v=${V}">
    <script>document.documentElement.className += " js";</script>
    ${ld}
  </head>
  <body>
    ${header(current)}
    <main id="main">
${body}
    </main>
    ${footer(blockApps)}
    <script src="/assets/site.js?v=${V}" defer></script>
  </body>
</html>
`;
}

import { readFileSync } from "node:fs";
import { SITE, esc, icon, badge, stepRing, shot, ruleChip, faqList, faqJsonLd } from "./site.mjs";

const P = SITE.prices;

const finalCta = (title, sub) => `
<section class="final">
  <div class="container">
    <div class="final-card reveal">
      ${stepRing("final-ring", "rg-final")}
      <img class="app-icon" src="/assets/icon-512.png" width="112" height="112" alt="Stride app icon" loading="lazy">
      <h2 class="h2">${title}</h2>
      <p class="lede">${sub}</p>
      <div class="cta-row">${badge("badge-light")}</div>
      <p class="hint">Or search <b>“Stride App Lock”</b> on the App Store.</p>
    </div>
  </div>
</section>`;

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: SITE.storeName,
  alternateName: "Stride",
  operatingSystem: `iOS ${SITE.minIOS} or later`,
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Productivity",
  description:
    "Stride locks distracting apps until you walk. Every 500 steps earns 15 minutes of app time, banked for the week. Step and Screen Time data stay on your iPhone.",
  url: SITE.url + "/",
  downloadUrl: SITE.appStore,
  installUrl: SITE.appStore,
  image: SITE.url + "/assets/icon-512.png",
  screenshot: [1, 2, 3, 4, 5, 6].map((n) => `${SITE.url}/assets/store/panel-${n}.webp`),
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Stride", url: SITE.url + "/", email: SITE.email },
};

// ---------------------------------------------------------------- Home

const HOME_FAQS = [
  {
    q: "How does Stride work?",
    a: "Pick the apps you want to use less and Stride locks them with Apple's Screen Time. Every 500 steps you walk, counted by Apple Health, adds 15 minutes to your bank. Start a pass when you want a break; when the minutes are used, the apps lock again.",
  },
  {
    q: "Does Stride see what I do in my apps?",
    a: "No. Apple's Screen Time framework is one-way: Stride can lock and unlock the apps you choose, but it can't see which apps you use or what you do inside them.",
  },
  {
    q: "Do I need an account?",
    a: "No. Stride works with no sign-up, email or login, and your steps, app choices and minutes stay on your iPhone. Only the optional Friends leaderboard uses Sign in with Apple, and it shares just your weekly step total and streak with friends you approve.",
  },
  {
    q: "Which steps count?",
    a: "Steps your iPhone or Apple Watch records in Apple Health. Steps typed in by hand in the Health app don't count toward earned minutes.",
  },
  {
    q: "What happens when my minutes run out?",
    a: "Your locked apps lock again on their own. Stride sends a heads-up when one minute is left and another when your minutes are used. Minutes only count down while you're using locked apps.",
  },
  {
    q: "Do unused minutes expire?",
    a: "Earned minutes stay in your bank for the whole week and reset every Monday, so a long Monday walk can cover a few breaks later in the week.",
  },
  {
    q: "What's the difference between Free and Pro?",
    a: `Free locks one app and includes everything else: walking to earn, the weekly bank and your progress. Stride Pro (${P.monthly}/month, ${P.yearly}/year, or ${P.lifetime} once) locks unlimited apps and whole categories such as Social, Games or Entertainment.`,
  },
  {
    q: "Can Stride block websites?",
    a: "No. Stride locks apps and app categories. To block a website in Safari, use Settings › Screen Time › Content & Privacy Restrictions.",
  },
  {
    q: "Which devices does Stride work on?",
    a: `iPhone with iOS ${SITE.minIOS} or later. Stride isn't available for iPad or Android.`,
  },
  {
    q: "How do I cancel or restore Stride Pro?",
    a: "Purchases are handled by Apple. To cancel, open the App Store, tap your profile picture, then Subscriptions. To restore a purchase, open Stride's Settings tab and tap Restore Purchases.",
  },
];

export function home(blockApps) {
  const body = `
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <a class="pill rise" href="${SITE.appStore}"><span class="dot"></span>Now on the App Store<span class="sep"></span><span class="muted">for iPhone</span></a>
      <h1 class="display rise d1">Walk more.<br><em>Scroll less.</em></h1>
      <p class="lede rise d2">Stride locks the apps you lose hours to. Every 500 steps you walk earns back 15 minutes, saved in a weekly bank you spend when you choose.</p>
      <div class="cta-row rise d3">
        ${badge()}
        <a class="link-arrow down" href="#how-it-works">See how it works ${icon("arrowDown")}</a>
      </div>
      <ul class="meta-list rise d3">
        <li>${icon("check")}Free to download</li>
        <li>${icon("noUser")}No account</li>
        <li>${icon("shield")}Data stays on your iPhone</li>
      </ul>
    </div>
    <div class="hero-visual">
      ${stepRing("hero-ring", "rg-hero")}
      ${shot("today", "Stride's Today screen: 3,236 steps today, 3h 45m of app time saved, and a Start 15 min app pass button", { eager: true })}
      ${ruleChip()}
      <figure class="glass float float-2 card-shot" style="margin:0"><img src="/assets/shots/crop-bank.webp" width="800" height="207" alt="Stride's time bank card: 3h 45m of app time saved, 25,811 steps this week"></figure>
    </div>
  </div>
</section>

<section class="section rule" id="how-it-works">
  <div class="container">
    <span class="kicker kicker-plain reveal">How it works</span>
    <h2 class="equation reveal d1"><span>500 steps</span> <span class="eq">=</span> <span class="mins">15 minutes</span></h2>
    <p class="lede reveal d2">That's about five minutes of brisk walking<sup><a href="#ref-3">3</a></sup> for fifteen minutes of the apps you lock. Your minutes bank up all week and reset every Monday.</p>
    <div class="steps">
      <article class="step reveal">
        <div class="step-top"><span class="step-ic">${icon("lock")}</span><span class="step-n">01</span></div>
        <h3>Lock your scroll traps</h3>
        <p>Pick the apps that pull you in. Apple's Screen Time shield closes them right away.</p>
      </article>
      <article class="step reveal d1">
        <div class="step-top"><span class="step-ic">${icon("footprints")}</span><span class="step-n">02</span></div>
        <h3>Walk to earn</h3>
        <p>Stride reads your steps from Apple Health. Every 500 adds 15 minutes to your bank.</p>
      </article>
      <article class="step reveal d2">
        <div class="step-top"><span class="step-ic">${icon("unlock")}</span><span class="step-n">03</span></div>
        <h3>Unlock, then relock</h3>
        <p>Start a 15-minute pass when you want a break. When it's used, your apps lock again.</p>
      </article>
    </div>
  </div>
</section>

<section class="features" id="features">
  <div class="container">
    <div class="feature">
      <div class="feature-media tone-mint reveal">
        ${shot("apps", "Stride's Apps screen with Games, Entertainment and Social locked as categories", { sizes: "(max-width: 600px) 250px, 310px" })}
        <div class="glass float pro-card at-bottom at-right">
          <span class="ic">${icon("grid")}</span>
          <div><span class="tag">PRO</span><strong>Whole categories in one tap</strong><span class="sub">Social, Games, Entertainment</span></div>
        </div>
      </div>
      <div class="feature-copy reveal d1">
        <span class="kicker">Lock</span>
        <h2 class="h2">Lock your <em>scroll traps.</em></h2>
        <p class="lede">Choose one app, or with Pro, whole categories like Social, Games and Entertainment. Changes take effect the moment you save them.</p>
        <ul class="checks">
          <li><span class="tick">${icon("check")}</span>The free plan locks one app, for good</li>
          <li><span class="tick">${icon("check")}</span>Pro locks unlimited apps and categories</li>
          <li><span class="tick">${icon("check")}</span>Apple hands Stride an anonymous token, never the app's name or your activity</li>
        </ul>
        <div class="app-links">
          <span class="app-links-label">Guides for the apps people lock most</span>
          ${blockApps.map((a) => `<a href="/block/${a.slug}">${esc(a.name)}</a>`).join("")}
        </div>
      </div>
    </div>

    <div class="feature flip">
      <div class="feature-media tone-honey reveal">
        ${shot("unlocked", "Stride showing Apps Unlocked: your minutes only run while you use locked apps", { sizes: "(max-width: 600px) 250px, 310px" })}
        <div class="glass float notif at-top at-left">
          <img src="/assets/icon-128.webp" width="36" height="36" alt="">
          <div class="notif-body"><div class="notif-top"><span>Stride</span><span>now</span></div><b>⏰ 1 min of app use left</b>Your locked apps will re-lock after one more minute of use.</div>
        </div>
        <div class="glass float float-2 notif at-bottom at-right">
          <img src="/assets/icon-128.webp" width="36" height="36" alt="">
          <div class="notif-body"><div class="notif-top"><span>Stride</span><span>now</span></div><b>🔒 Usage time used</b>You've used your locked-app minutes. Apps are locked again.</div>
        </div>
      </div>
      <div class="feature-copy reveal d1">
        <span class="kicker">Unlock</span>
        <h2 class="h2">Take a break. <em>It ends on its own.</em></h2>
        <p class="lede">Tap <b>Start 15 min app pass</b> and your apps open. Minutes only count down while you're actually in a locked app, and Stride taps you on the shoulder before time is up.</p>
        <ul class="checks">
          <li><span class="tick">${icon("check")}</span>Apps relock automatically when your minutes are used</li>
          <li><span class="tick">${icon("check")}</span>A one-minute heads-up, so nothing cuts off mid-message</li>
          <li><span class="tick">${icon("check")}</span>Save the rest of your bank for later in the week</li>
        </ul>
      </div>
    </div>

    <div class="feature">
      <div class="feature-media tone-lilac reveal">
        ${shot("week", "Stride's This Week screen with a daily steps chart, 12h 45m of app time earned and recent sessions", { sizes: "(max-width: 600px) 250px, 310px" })}
        <div class="glass float tag-chip at-bottom at-left">${icon("calendar")}Bank resets every Monday</div>
      </div>
      <div class="feature-copy reveal d1">
        <span class="kicker">Progress</span>
        <h2 class="h2">Watch your walks <em>add up.</em></h2>
        <p class="lede">This Week shows your daily steps against your average, the app time you've earned and spent, your best day, and an estimate of the distance you've covered.</p>
        <ul class="checks">
          <li><span class="tick">${icon("check")}</span>Daily steps chart with your weekly average</li>
          <li><span class="tick">${icon("check")}</span>Earned versus used app time at a glance</li>
          <li><span class="tick">${icon("check")}</span>Every unlock session, listed</li>
        </ul>
      </div>
    </div>

    <div class="feature flip">
      <div class="feature-media tone-peach reveal">
        ${shot("setup", "Stride onboarding: You're all set, with your unlock rule of 500 steps for 15 minutes", { sizes: "(max-width: 600px) 250px, 310px" })}
        <div class="glass float tag-chip f-c">${icon("noUser")}No account needed</div>
      </div>
      <div class="feature-copy reveal d1">
        <span class="kicker">Setup</span>
        <h2 class="h2">Ready in about <em>two minutes.</em></h2>
        <p class="lede">No sign-up and no email. Allow Apple Health and Screen Time, pick your first app to lock, and your next walk starts counting.</p>
        <ul class="checks">
          <li><span class="tick">${icon("check")}</span>Works with the steps your iPhone already counts</li>
          <li><span class="tick">${icon("check")}</span>Apple Watch steps count too, through Apple Health</li>
          <li><span class="tick">${icon("check")}</span>iPhone with iOS ${SITE.minIOS} or later</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section gallery" id="screens">
  <div class="container gallery-head">
    <div>
      <span class="kicker reveal">On the App Store</span>
      <h2 class="h2 reveal d1">The real app, <em>screen by screen.</em></h2>
      <p class="lede reveal d2" style="margin-top:20px">These are the screenshots on Stride's App Store listing, made from the shipping app.</p>
    </div>
    <div class="rail-controls">
      <button class="rail-btn" type="button" data-rail-dir="-1" aria-label="Previous screenshots">${icon("arrowLeft")}</button>
      <button class="rail-btn" type="button" data-rail-dir="1" aria-label="Next screenshots">${icon("arrow")}</button>
    </div>
  </div>
  <div class="rail" data-rail tabindex="0" aria-label="App Store screenshots">
    ${[
      "Walk more. Scroll less. 500 steps equals 15 minutes of app time",
      "Walk to earn screen time: the Today screen and time bank",
      "Lock your scroll traps: whole categories locked with Pro",
      "Apps relock on their own, with real Stride notifications",
      "Watch your walks add up: the This Week screen",
      "Start walking in 2 minutes: onboarding complete",
    ]
      .map(
        (alt, i) =>
          `<figure><img src="/assets/store/panel-${i + 1}.webp" width="600" height="1304" alt="${esc(alt)}" loading="lazy" decoding="async"></figure>`
      )
      .join("\n    ")}
  </div>
  <div class="container gallery-foot">
    ${badge("badge-light")}
    <p>Free to download. iPhone, iOS ${SITE.minIOS}+.</p>
  </div>
</section>

<section class="section" id="why-walking">
  <div class="container">
    <div class="section-head">
      <span class="kicker reveal">Why walking</span>
      <h2 class="h2 reveal d1">A small walk is <em>a good trade.</em></h2>
      <p class="lede reveal d2">Stride swaps a few minutes of scrolling for a few minutes on your feet. Here's what the research says about that trade.</p>
    </div>
    <div class="stats">
      <article class="stat reveal" id="ref-1">
        <div class="stat-num">51%</div>
        <p>lower risk of death from any cause for US adults taking 8,000 steps a day compared with 4,000.</p>
        <cite>Saint-Maurice et al., <a href="https://doi.org/10.1001/jama.2020.1382" rel="noopener">JAMA, 2020</a></cite>
      </article>
      <article class="stat reveal d1" id="ref-2">
        <div class="stat-num">60%</div>
        <p>average boost in creative output while walking instead of sitting, in Stanford experiments.</p>
        <cite>Oppezzo &amp; Schwartz, <a href="https://doi.org/10.1037/a0036577" rel="noopener">J. Exp. Psychology, 2014</a></cite>
      </article>
      <article class="stat reveal d2" id="ref-3">
        <div class="stat-num">~5 min</div>
        <p>of brisk walking covers 500 steps, at the 100 steps-per-minute pace researchers use as the moderate-intensity mark.</p>
        <cite>Tudor-Locke et al., <a href="https://doi.org/10.1136/bjsports-2017-097628" rel="noopener">Br. J. Sports Med., 2018</a></cite>
      </article>
    </div>
    <p class="fineprint">Findings from published research describe averages and associations, not guaranteed results. Stride is a focus tool, not a medical device.</p>
  </div>
</section>

<section class="section" id="privacy" style="padding-top:0">
  <div class="container">
    <div class="privacy-card reveal">
      <div>
        <span class="kicker">Privacy</span>
        <h2 class="h2">Private <em>by design.</em></h2>
        <p class="lede">Stride is built on Apple's privacy-protected frameworks. Your steps and your screen habits are nobody's business but yours.</p>
        <a class="link-arrow" href="/privacy">Read the privacy policy ${icon("arrow")}</a>
      </div>
      <ul class="privacy-list">
        <li><span class="ic">${icon("phone")}</span><div><strong>Stays on your iPhone</strong><span>Step and Screen Time data are processed on your device. Only if you join the optional Friends board does your weekly step total reach our server, for friends you approve.</span></div></li>
        <li><span class="ic">${icon("eyeOff")}</span><div><strong>Stride can't look inside your apps</strong><span>Screen Time is one-way. Stride can lock an app but can't see what you do in it.</span></div></li>
        <li><span class="ic">${icon("noUser")}</span><div><strong>No account needed, no ads</strong><span>No sign-up and no email to use Stride. We don't sell your data or use it for advertising.</span></div></li>
      </ul>
    </div>
  </div>
</section>

<section class="section" id="pricing" style="padding-top:0">
  <div class="container">
    <div class="section-head">
      <span class="kicker reveal">Pricing</span>
      <h2 class="h2 reveal d1">Free to start. <em>Pro when you're ready.</em></h2>
    </div>
    <div class="plans">
      <article class="plan reveal">
        <p class="plan-name">Free</p>
        <p class="plan-price">$0</p>
        <p class="plan-sub">Everything you need to lock your biggest distraction.</p>
        <ul class="checks">
          <li><span class="tick">${icon("check")}</span>Lock 1 app</li>
          <li><span class="tick">${icon("check")}</span>Earn app time by walking</li>
          <li><span class="tick">${icon("check")}</span>Weekly bank that resets Monday</li>
          <li><span class="tick">${icon("check")}</span>This Week progress and history</li>
        </ul>
        <p class="plan-fine">No account and no card needed.</p>
      </article>
      <article class="plan plan-pro reveal d1">
        <p class="plan-name pro-badge">Stride Pro <em>UNLIMITED</em></p>
        <p class="plan-sub">Lock every app that pulls you in, or entire categories at once.</p>
        <div class="price-opts">
          <div class="opt"><b>${P.monthly}</b><span>per month</span></div>
          <div class="opt opt-hi"><i>SAVE 66%</i><b>${P.yearly}</b><span>per year</span></div>
          <div class="opt"><b>${P.lifetime}</b><span>once, for life</span></div>
        </div>
        <ul class="checks">
          <li><span class="tick">${icon("check")}</span>Everything in Free</li>
          <li><span class="tick">${icon("check")}</span>Lock unlimited apps</li>
          <li><span class="tick">${icon("check")}</span>Lock whole categories: Social, Games, Entertainment and more</li>
        </ul>
        <p class="plan-fine">US prices; other regions may vary. Billed through your Apple ID. Subscriptions renew automatically unless cancelled at least 24 hours before the period ends. “Save 66%” compares the yearly plan with 12 months of the monthly plan.</p>
      </article>
    </div>
  </div>
</section>

<section class="section" id="faq" style="padding-top:0">
  <div class="container">
    <div class="section-head">
      <span class="kicker reveal">FAQ</span>
      <h2 class="h2 reveal d1">Questions, <em>answered.</em></h2>
    </div>
    ${faqList(HOME_FAQS)}
  </div>
</section>

${finalCta("Make every walk <em>count.</em>", "Download Stride and lock your first app in about two minutes. Your next walk starts paying you back in minutes.")}
`;
  return {
    path: "/",
    file: "index.html",
    title: "Stride: Walk to Unlock Your Apps | App Blocker for iPhone",
    description:
      "Stride locks distracting apps until you walk. Every 500 steps earns 15 minutes of app time, banked for the week. Free on the App Store for iPhone.",
    ogImage: "/assets/og/home.png",
    jsonld: [
      appJsonLd,
      { "@context": "https://schema.org", "@type": "WebSite", name: "Stride", url: SITE.url + "/" },
      faqJsonLd(HOME_FAQS),
    ],
    body,
  };
}

// ---------------------------------------------------------------- /block/<app>

const budgetRows = [1000, 2500, 5000, 8000];
const dur = (m) => {
  const h = Math.floor(m / 60), r = m % 60;
  if (!h) return `${m} min`;
  return r ? `${h}h ${r}m` : `${h} ${h === 1 ? "hour" : "hours"}`;
};

export function blockPage(app, all) {
  const n = app.name;
  const others = all.filter((a) => a.slug !== app.slug);
  const faqs = [
    {
      q: `Can I block ${n} for free?`,
      a: `Yes. Stride's free plan locks one app, and ${n} can be that app. Stride Pro (${P.monthly}/month, ${P.yearly}/year or ${P.lifetime} once) adds unlimited apps and whole categories.`,
    },
    {
      q: `Can Stride see what I do on ${n}?`,
      a: `No. Apple's Screen Time framework gives Stride an anonymous token for ${n}. Stride can lock and unlock the app, but it can't see your feed, your messages or anything else you do inside it.`,
    },
    {
      q: `Does Stride block ${n} in Safari too?`,
      a: `No. Stride locks the ${n} app. To block ${app.web} in Safari as well, add it as a restricted website in Settings › Screen Time › Content & Privacy Restrictions.`,
    },
    {
      q: `What happens when my ${n} time runs out?`,
      a: `${n} locks again on its own. Stride sends a heads-up when one minute is left and another when your minutes are used up.`,
    },
    {
      q: `What if I really need ${n} right now?`,
      a: `If you have minutes banked, start a 15-minute pass from the Today tab. If not, a short walk earns more. You can also remove the lock in the Apps tab at any time. Stride is a commitment device, not a cage.`,
    },
    ...app.extraFaqs,
  ];

  const body = `
<section class="page-hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <ol class="crumbs rise" aria-label="Breadcrumb"><li><a href="/">Stride</a></li><li aria-current="page">Block ${esc(n)}</li></ol>
      <h1 class="display rise d1">${app.h1}</h1>
      <p class="lede rise d2">${esc(app.lede)}</p>
      <div class="cta-row rise d3">
        ${badge()}
        <a class="link-arrow down" href="#setup">How to set it up ${icon("arrowDown")}</a>
      </div>
      <ul class="meta-list rise d3">
        <li>${icon("check")}Free plan locks one app</li>
        <li>${icon("noUser")}No account</li>
        <li>${icon("lock")}Relocks on its own</li>
      </ul>
    </div>
    <div class="hero-visual">
      ${stepRing("hero-ring", "rg-" + app.slug)}
      ${shot("apps", "Stride's Apps screen, where you choose which apps and categories to lock", { eager: true, sizes: "(max-width: 600px) 250px, 310px" })}
      <div class="glass float lock-chip"><span class="ic">${icon("lock")}</span><div><strong>${esc(n)}: locked</strong><span>Walk to open it</span></div></div>
      ${ruleChip("float-2")}
    </div>
  </div>
</section>

<section class="section" style="padding-top:clamp(40px,6vw,80px)">
  <div class="container">
    <div class="section-head">
      <span class="kicker reveal">The pull</span>
      <h2 class="h2 reveal d1">${esc(app.loopsTitle)}</h2>
    </div>
    <div class="loops">
      ${app.loops
        .map(
          (l, i) => `<article class="loop reveal${i ? " d" + i : ""}"><span class="loop-n">0${i + 1}</span><h3>${esc(l.t)}</h3><p>${esc(l.d)}</p></article>`
        )
        .join("\n      ")}
    </div>
    <p class="bridge reveal">${app.bridge}</p>
  </div>
</section>

<section class="section" id="setup" style="padding-top:0">
  <div class="container howto">
    <div class="reveal">
      <span class="kicker">Setup</span>
      <h2 class="h2">How to block ${esc(n)} <em>with Stride</em></h2>
      <ol class="howto-steps">
        <li><div><strong>Get Stride from the App Store</strong><span>It's free to download, and there's no account to create.</span></div></li>
        <li><div><strong>Allow Apple Health and Screen Time</strong><span>Health shares your step count, read-only. Screen Time lets Stride lock apps. Both stay on your iPhone.</span></div></li>
        <li><div><strong>Choose ${esc(n)} to lock</strong><span>In the Apps tab, pick ${esc(n)} in Apple's app picker. It locks right away. With Pro, add more apps or a whole category.</span></div></li>
        <li><div><strong>Walk, then unlock</strong><span>Every 500 steps adds 15 minutes to your bank. Tap Start 15 min app pass on the Today tab, and ${esc(n)} relocks when the time is used.</span></div></li>
      </ol>
    </div>
    <div class="feature-media tone-mint reveal d1">
      ${shot("today", "Stride's Today screen with the step ring, the time bank and the Start 15 min app pass button", { sizes: "(max-width: 600px) 250px, 310px" })}
    </div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="section-head">
      <span class="kicker reveal">The math</span>
      <h2 class="h2 reveal d1">Your ${esc(n)} budget, <em>in steps.</em></h2>
      <p class="lede reveal d2">500 steps is roughly five minutes of brisk walking. Drag to see what a day of walking buys.</p>
    </div>
    <div class="budget" data-budget>
      <div class="budget-card reveal">
        <label class="budget-label" for="steps-${app.slug}">Steps walked</label>
        <div class="budget-steps" data-steps>4,000</div>
        <input class="range" id="steps-${app.slug}" type="range" min="500" max="12000" step="500" value="4000">
        <div class="range-scale"><span>500</span><span>12,000</span></div>
      </div>
      <div class="budget-card budget-dark reveal d1">
        <p class="budget-label">Earns this much ${esc(n)}</p>
        <div class="budget-out"><em data-mins>2 hours</em></div>
        <table class="budget-table">
          <thead><tr><th scope="col">Steps</th><th scope="col">App time</th></tr></thead>
          <tbody>
            ${budgetRows.map((s) => `<tr><td>${s.toLocaleString("en-US")}</td><td>${dur(Math.floor(s / 500) * 15)}</td></tr>`).join("")}
          </tbody>
        </table>
        <p class="budget-note">Minutes bank for the week and reset Monday. They only count down while you're using locked apps.</p>
      </div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="section-head">
      <span class="kicker reveal">Compared</span>
      <h2 class="h2 reveal d1">Stride vs. <em>Screen Time limits</em></h2>
      <p class="lede reveal d2">iOS can already put a timer on ${esc(n)}. Here's how a step-powered lock is different.</p>
    </div>
    <div class="compare-wrap reveal">
      <table class="compare">
        <thead><tr><th scope="col"></th><th scope="col">iOS App Limits</th><th scope="col" class="us">Stride</th></tr></thead>
        <tbody>
          <tr><th scope="row">When time is up</th><td>A limit screen with Ignore Limit: one more minute, 15 more minutes, or the rest of the day, unless a Screen Time passcode is set.</td><td class="us">${esc(n)} stays locked. More time comes from walking.</td></tr>
          <tr><th scope="row">Getting more time</th><td>Tap a button.</td><td class="us">Walk 500 steps for every 15 minutes.</td></tr>
          <tr><th scope="row">Unused time</th><td>A daily limit that starts over each day.</td><td class="us">Banked for the week, reset every Monday.</td></tr>
          <tr><th scope="row">Side effect</th><td>None.</td><td class="us">Every unlock comes with a short walk.</td></tr>
          <tr><th scope="row">Cost</th><td>Built into iOS.</td><td class="us">Free for one app. Pro for unlimited apps and categories.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="section-head">
      <span class="kicker reveal">FAQ</span>
      <h2 class="h2 reveal d1">Blocking ${esc(n)}: <em>common questions</em></h2>
    </div>
    ${faqList(faqs)}
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="section-head">
      <span class="kicker reveal">More guides</span>
      <h2 class="h2 reveal d1">Block other apps <em>the same way</em></h2>
    </div>
    <div class="related">
      ${others
        .map((o) => `<a class="reveal" href="/block/${o.slug}"><span>Block ${esc(o.name)}<small>Walk to unlock it</small></span>${icon("arrow")}</a>`)
        .join("\n      ")}
    </div>
  </div>
</section>

${finalCta(`Put ${esc(n)} <em>behind your steps.</em>`, `Download Stride, lock ${esc(n)}, and earn it back one walk at a time.`)}
`;
  return {
    path: `/block/${app.slug}`,
    file: `block/${app.slug}.html`,
    title: app.title,
    description: app.description,
    ogImage: `/assets/og/block-${app.slug}.png`,
    jsonld: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Stride", item: SITE.url + "/" },
          { "@type": "ListItem", position: 2, name: `Block ${n}`, item: `${SITE.url}/block/${app.slug}` },
        ],
      },
      faqJsonLd(faqs),
    ],
    body,
  };
}

// ---------------------------------------------------------------- Legal + support

const legal = (slug, title, updated, description) => ({
  path: `/${slug}`,
  file: `${slug}.html`,
  current: `/${slug}`,
  title: `${title} | Stride`,
  description,
  body: `
<div class="container doc">
  <span class="kicker">Legal</span>
  <h1 class="display">${title}</h1>
  <p class="doc-meta">Last updated: ${updated}</p>
  <div class="doc-body">
${readFileSync(new URL(`./legal/${slug}.html`, import.meta.url), "utf8")}
  </div>
</div>`,
});

export const privacy = () =>
  legal("privacy", "Privacy Policy", "October 29, 2026", "How Stride handles your data: Screen Time and daily step data stay on your iPhone, no account is needed and there are no ads. Optional Friends shares only weekly totals with friends you approve. Usage analytics are anonymous and can be turned off.");

export const terms = () =>
  legal("terms", "Terms of Use", "October 29, 2026", "The terms that apply when you download or use the Stride iOS app, including Stride Pro subscriptions.");

const SUPPORT_FAQS = [
  { q: "How do I earn time?", a: "Walk. Every 500 steps earns 15 minutes of app time, banked for the whole week and reset Monday." },
  { q: "My steps aren't showing.", a: "Open the Health app › Sharing › Apps › Stride and make sure Steps is allowed. Stride only reads steps; it never writes them." },
  { q: "My apps aren't locking.", a: "Make sure Screen Time access is allowed in iOS Settings and in Stride's onboarding or Settings. Stride needs Screen Time permission to block apps." },
  { q: "Does Stride see what I do in my apps?", a: "No. Apple's Screen Time framework doesn't let Stride see your activity or browsing." },
  { q: "How do I manage my subscription?", a: "Open the App Store, tap your profile, then Subscriptions." },
  { q: "How do I restore a purchase?", a: "Open the Settings tab in Stride, then tap Restore Purchases." },
];

export const support = () => ({
  path: "/support",
  file: "support.html",
  current: "/support",
  title: "Support | Stride",
  description: "Get help with Stride, including steps, app locking, privacy, and subscriptions.",
  jsonld: [faqJsonLd(SUPPORT_FAQS)],
  body: `
<div class="container doc">
  <span class="kicker">Help</span>
  <h1 class="display">Stride Support</h1>
  <p class="doc-meta">Answers to common questions, and a real person when you need one.</p>
  ${faqList(SUPPORT_FAQS)}
  <div class="contact-card">
    <div><strong>Still stuck, or have feedback?</strong><p>Email us and we'll get back to you.</p></div>
    <a class="mail" href="mailto:${SITE.email}">${SITE.email}</a>
  </div>
</div>`,
});

export const notFound = () => ({
  path: "/404",
  file: "404.html",
  noindex: true,
  title: "Page not found | Stride",
  description: "This page doesn't exist.",
  body: `
<div class="container notfound">
  <div>
    <span class="kicker kicker-plain">404</span>
    <h1 class="display" style="margin-top:20px">This path <em>goes nowhere.</em></h1>
    <p class="lede">The page you're looking for doesn't exist. Take a few steps back to the home page.</p>
    <div class="cta-row"><a class="link-arrow" href="/">Back to Stride ${icon("arrow")}</a></div>
  </div>
</div>`,
});

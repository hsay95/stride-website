# Stride Website

Static marketing and legal site for Stride, served at https://stride-focus.com from Vercel (project `stride-website-1nvj`).

## Layout

- `src/` page templates and data. `src/block-apps.mjs` drives the programmatic SEO pages at `/block/<app>`.
- `scripts/build.mjs` writes the HTML pages, `sitemap.xml`, `robots.txt` and `llms.txt` into the repo root.
- `scripts/og.mjs` renders the 1200x630 social images into `assets/og/` with headless Chrome.
- `assets/` CSS, JS, icons, real app screenshots (`shots/`) and the App Store panels (`store/`).

The generated HTML is committed, so Vercel needs no build step. `.vercelignore` keeps `src/` and `scripts/` out of the upload.

## Edit and preview

```sh
node scripts/build.mjs        # regenerate pages after editing src/
node scripts/og.mjs           # only if headlines or block apps changed
npx serve .                   # or any static server with clean URLs
```

To add another `/block/<app>` page, add an entry to `src/block-apps.mjs` and rebuild. Keep claims about third-party apps general and verifiable.

## Deploy

```sh
vercel --prod
```

`privacy.html`, `terms.html` and `support.html` are linked from the iOS app (`AppLinks`) and App Store Connect as `/privacy`, `/terms` and `/support` via `cleanUrls`. Keep those paths stable.

Screenshots come from `store-assets/appstore-6.9-1320x2868/source/build/phone_*.png` in the app repo (Apple's iPhone 17 Pro Max frame; the Apple Design Resources license allows it only in mock-ups of apps for Apple platforms).

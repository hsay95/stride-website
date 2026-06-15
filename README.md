# Stride Website

Static single-page marketing and legal site for Stride.

## Local preview

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Vercel

This repo has no build step. Deploy the root directory as a static project.

`/privacy`, `/terms`, and `/support` are rewritten to the single page and scroll to the matching legal/support section.

## Before launch

- Add the App Store CTA in `index.html` once the app is live.
- Use the live domain in the iOS app's `AppLinks` values and in App Store Connect.

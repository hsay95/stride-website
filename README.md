# Stride Website

Static marketing and legal site for Stride.

## Local preview

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Vercel

This repo has no build step. Deploy the root directory as a static project.

`privacy.html`, `terms.html`, and `support.html` are standalone pages for App Store review. Vercel `cleanUrls` also serves them as `/privacy`, `/terms`, and `/support`.

## Before launch

- Add the App Store CTA in `index.html` once the app is live.
- Use the live domain in the iOS app's `AppLinks` values and in App Store Connect.

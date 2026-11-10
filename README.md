# nghivan2027

Wedding website for Minh Nghi & Ivan — Saturday, 4 September 2027, Petrčane (Croatia).

Static site built with [Vite](https://vite.dev), [GSAP](https://gsap.com) (scroll animations) and [Lenis](https://lenis.darkroom.engineering) (smooth scrolling).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # output in dist/
npm run preview    # serve the production build locally
```

## Where to edit things

| What | Where |
| --- | --- |
| Page structure | `index.html` (German text there is only the initial fallback) |
| Texts in each language | `src/i18n/de.json`, `en.json`, `vi.json`, `fr.json`, `hr.json` — same keys in every file |
| Pages (Einladung, NGHIVAN, Wo übernachten?, Travel / Anreise, Bridal Party, RSVP) | `<div class="page" data-page="…">` blocks in `index.html`; routes are hashes like `/#anreise` (`PAGES` in `src/main.js`) |
| Recommended areas (order, names) | `AREAS` in `src/main.js` + `area.N.*` keys in the JSON files |
| Photo carousels & bridal party portraits | Drop images into `src/assets/galleries/<slug>/` and `src/assets/people/<name>.jpg` — see `src/assets/README.md` |
| Date / venue / RSVP strip shown on every page | `#keyfacts-tpl` in `index.html` |
| Countdown target date | `WEDDING` constant in `src/main.js` |
| Colors & fonts (dusty-blue palette, Vollkorn SC, no italics) | CSS variables at the top of `src/style.css` |
| Password page | `middleware.js` |
| Photos | `public/images/` (WebP) |

`template/` holds the original Joy export and is not part of the build.

## Password & language choice

On Vercel, `middleware.js` shows a password page (texts in all five languages) until the guest enters `SITE_PASSWORD` (Vercel → Project → Settings → Environment Variables). A correct password sets a cookie for 180 days. Without `SITE_PASSWORD` the site is public. The middleware only runs on Vercel, not in `npm run dev`.

After logging in — or on a first visit without a saved language — guests pick their language (Deutsch, Tiếng Việt, Hrvatski, English, Français).

## Languages

German (default), Vietnamese, Croatian, English and French. After the first choice, the language comes from `?lang=xx` in the URL, then the visitor's last choice. Share a direct link such as `https://<your-site>/?lang=hr` (this skips the language picker).

When you change a German text in `de.json`, update the same key in the other four files. If you change text in `index.html`, mirror it in `de.json` too — the JSON wins once a language is applied.

## Deploy

Vercel detects Vite automatically: build command `npm run build`, output directory `dist`.

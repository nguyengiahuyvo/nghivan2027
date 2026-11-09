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
| Recommended areas carousel (Kožino, Nin, …) | `AREAS` in `src/main.js` (names/photos) + `area.N.*` keys in the JSON files |
| Countdown target date | `WEDDING` constant in `src/main.js` |
| Colors & fonts | CSS variables at the top of `src/style.css` |
| Photos | `public/images/` (WebP) |

`template/` holds the original Joy export and is not part of the build.

## Languages

German (default), English, Vietnamese, French and Croatian. The language is picked from `?lang=xx` in the URL, then the visitor's last choice, then the browser language. Share a direct link such as `https://<your-site>/?lang=hr`.

When you change a German text in `de.json`, update the same key in the other four files. If you change text in `index.html`, mirror it in `de.json` too — the JSON wins once a language is applied.

## Deploy

Vercel detects Vite automatically: build command `npm run build`, output directory `dist`.

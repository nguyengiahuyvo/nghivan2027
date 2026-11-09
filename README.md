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
| All texts & sections | `index.html` |
| Recommended areas carousel (Kožino, Nin, …) | `AREAS` array at the top of `src/main.js` |
| Countdown target date | `WEDDING` constant in `src/main.js` |
| Colors & fonts | CSS variables at the top of `src/style.css` |
| Photos | `public/images/` (WebP) |

`template/` holds the original Joy export and is not part of the build.

## Deploy

Vercel detects Vite automatically: build command `npm run build`, output directory `dist`.

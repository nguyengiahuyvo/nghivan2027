# Photos

Drop photos into these folders — no code changes needed. They are picked up automatically
at build time (see `src/galleries.js`). Files are sorted by name, so prefix them with
`01-`, `02-`, … to control the order. JPG, PNG, WebP and AVIF work; please keep each image
under ~500 KB (e.g. 1600 px wide, WebP/JPG quality ~80).

## Image carousels — `galleries/<slug>/`

Recommended places (page "Wo übernachten?"):

| Folder | Place |
| --- | --- |
| `galleries/petrcane/` | Petrčane |
| `galleries/punta-skala/` | Punta Skala |
| `galleries/kozino/` | Kožino |
| `galleries/zadar/` | Zadar |
| `galleries/sukosan/` | Sukošan |
| `galleries/jovici/` | Jovići |
| `galleries/razanac/` | Ražanac |
| `galleries/nin/` | Nin |

"Von uns bereits besucht" (page "Travel / Anreise"):

| Folder | Entry |
| --- | --- |
| `galleries/visited-zadar/` | Zadar & Umgebung |
| `galleries/visited-dugi-otok/` | Insel-Highlight (Dugi Otok) |
| `galleries/visited-kuestenroute/` | Küstenroute Richtung Süden |
| `galleries/visited-sueden/` | Weiter im Süden |

The first image of a place is used as its card photo. Until a folder has images, the site
falls back to the photos already in `public/images/` (or a coloured placeholder).

## Bridal party portraits — `people/<slug>.jpg`

`thanh`, `foti`, `mai-anh`, `mai`, `anh`, `andi`, `daniel` — e.g. `people/thanh.jpg`.
Square crops look best. Without a photo, the initial letter is shown.

## Hero photo

The photo of Minh Nghi & Ivan on the start page is `public/images/couple-studio-700.webp`
(and the larger `couple-studio.webp`). Replace both files to change it.

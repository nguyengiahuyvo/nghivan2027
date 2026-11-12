# 11 – Anpassung 2

Source: `docs/anpassungen2.pdf` (slides 26–37). The PDF contains the new site password and is
therefore **git-ignored** — the GitHub repository is public.

## Requirements → implementation

| Slide | Requirement | Implementation |
|---|---|---|
| 26 | New password | Set `SITE_PASSWORD` on Vercel (see open items). Not stored anywhere in the repo. |
| 26 | New start-page photo (Drive folder "Startseite") | Drop-in support: the first image in `src/assets/hero/` replaces the default photo (`heroPhoto()` in `src/galleries.js`). |
| 27 | Couple names in "Sloop Script" | Sloop Script is a commercial Canva font without a web licence, so **Pinyon Script** (free, closest copperplate look) is used: hero, loader, signature, marquee. Swap `--font-script` in `src/style.css` if a webfont licence for Sloop is obtained. |
| 27 | Headings & highlights in "Alice", ALL CAPS, letter-spaced | Shared heading rule in `src/style.css` (`--font-head`, `--caps`). Alice has no Vietnamese glyphs → Vietnamese headings use Lora caps. |
| 27 | Body & navigation in "Lora" | `--font` = Lora. |
| 28–29 | Florals (peony, lily, tulip) & coastal motifs (coral, shell, waves), watercolour / line-art | Inline SVG sprite at the top of `index.html` (`m-peony`, `m-lily`, `m-tulip`, `m-coral`, `m-shell`, `m-wave`): hero accents, wave + shell dividers under headings, floral corners on tiles and the dresscode card, faint accents on each sub-page. |
| 30–32 | New page „Infos für Gäste“ after „Einladung“: Dresscode (Coastal Elegance), Ablaufplan placeholder, 8 FAQs | Page `#infos`: dresscode card with colour swatches (Sand, Beige, Pastell, Meerestöne) and 3 info boxes; schedule placeholder cards (Trauung, Empfang, Dinner, Party — „Uhrzeit folgt“); FAQ accordion with all 8 topics. Texts: `infos.*` keys. |
| 33 | Logo „NGHIVAN“ instead of „N&I“ (header + footer), Lora caps | Done (also language picker). |
| 34 | NGHIVAN page: title „Nghivan“ in Lora, body Lora, headings Alice caps | Done. |
| 35 | Tiles with fine line-art icons, light baby-blue background, fine frame, Alice caps titles | Overview on the start page now has 6 icon tiles (compass, bed, palm beach, champagne glasses, rings, letter with check). The envelope-with-heart icon (Einladung) is used in the mobile menu, which shows all 7 icons. |
| 36 | Menu order: Einladung · Infos für Gäste · Wo übernachten? · Travel/Anreise · Bridal Party · NGHIVAN; note „Dresscode & FAQs findet ihr unter Infos für Gäste“ at the bottom of Einladung | Done (desktop nav, mobile menu, „Weiter“ links). RSVP stays the button on the right. |
| 37 | Tone of voice per language | All translations rewritten: EN very casual (cousins), FR consistently „tu“, HR simple everyday Croatian for parents/aunts/uncles, VI simple Southern Vietnamese, „chúng con“ → „gia đình“. Checked: same keys and HTML as German, no „vous“ in FR, no „bạn/chúng mình“ in VI. |

## Open items

1. **Password:** set `SITE_PASSWORD` in Vercel (Settings → Environment Variables) to the value from the PDF, then redeploy. Everyone has to log in again afterwards.
2. **New start-page photo:** the Drive folder needs a Google login. Download the photo from „Startseite“, put it into `src/assets/hero/` (JPG/WebP, ~1200 px wide, GPS data removed) — no code change needed.
3. Translations were written by AI in the requested tone — worth a quick read by a native speaker per language (especially VI and HR for the parents).

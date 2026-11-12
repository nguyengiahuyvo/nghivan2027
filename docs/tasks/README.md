# Website Adjustments – Task Overview

Source: [anpassungen.pdf](../anpassungen.pdf) ("Anpassungen Website – 1. Anpassung", 22 slides).

Each file below is a self-contained task (or task group) with acceptance criteria.
Quoted copy texts are kept **verbatim in German** as given in the PDF. Every new or
changed text must also be added to all five locale files in `src/i18n/`
(`de`, `en`, `fr`, `hr`, `vi`).

## Shared references

- **Image folder (Google Drive):** https://drive.google.com/drive/folders/1ERTxxSQ9YtB6eG-Zk_q4_nqoRUrEdXAZ
  The PDF links to this folder from several slides (hero photo, recommended places,
  "already visited" places, bridal party photos).
- **Hotel:** https://hotel-pinija.hr/
- **Key event facts (from slide 7):** Sa, 4. September 2027 · Hotel Pinija, Petrčane · RSVP bis 1. Mai 2027

## Tasks

| # | File | Area | PDF slides | Status |
|---|------|------|-----------|----------|
| 00 | [00-design-system.md](done/00-design-system.md) | Global colours, typography (Vollkorn SC), no italics, design rules | 1–3, 8, 10 | ✅ Done |
| 01 | [01-password-page.md](done/01-password-page.md) | Password entry page | 4 | ✅ Done |
| 02 | [02-language-selection.md](done/02-language-selection.md) | Language picker after login | 5 | ✅ Done |
| 03 | [03-home-hero.md](done/03-home-hero.md) | Start page hero: headline, photo, names, date/place/countdown | 6–7 | ✅ Done |
| 04 | [04-welcome-and-navigation.md](done/04-welcome-and-navigation.md) | Welcome text section, site structure, navigation | 8–9 | ✅ Done |
| 05 | [05-nghivan-page.md](done/05-nghivan-page.md) | "NGHIVAN (Über uns)" colour adjustment | 11 | ✅ Done |
| 06 | [06-accommodation-page.md](done/06-accommodation-page.md) | "Wo übernachten?" – discount code, "Mehr erfahren", recommended places + carousels | 12–14 | ✅ Done |
| 07 | [07-travel-page.md](done/07-travel-page.md) | "Travel / Anreise" – tabs, texts, ASFINAG button, route, tips, carousels | 15–19 | ✅ Done |
| 08 | [08-bridal-party-page.md](done/08-bridal-party-page.md) | Bridal Party – headings, photos | 20 | ✅ Done |
| 09 | [09-remove-joy-app.md](done/09-remove-joy-app.md) | Remove "Fotos teilen mit der Joy-App" block | 21 | ✅ Done |
| 10 | [10-wedding-timeline-tbd.md](10-wedding-timeline-tbd.md) | Wedding Timeline – on hold (placeholder now on "Infos für Gäste") | 22 | ⏸ On hold |

### 2. Anpassung (`anpassungen2.pdf` — git-ignored, it contains the password)

| # | File | Area | PDF slides | Status |
|---|------|------|-----------|----------|
| 11 | [11-anpassung-2.md](done/11-anpassung-2.md) | Password & hero photo, typography (Sloop Script / Alice / Lora), florals & coastal motifs, new page "Infos für Gäste", logo NGHIVAN, NGHIVAN page, icon tiles, menu order, tone of voice per language | 26–37 | ✅ Done (2 open items) |

## Progress

Tasks 00–09 are implemented; their files are in [done/](done/) with a status note each.
Task 10 is waiting for details from the couple.

**Photos:** added on 2026-11-11 from `docs/Photo` (originals are git-ignored; converted WebP copies live in
`src/assets/`). To add more, see `src/assets/README.md`.

## Suggested order (original plan)

1. **00** design system (affects every other task)
2. **09** quick removal
3. **01 → 02 → 03 → 04** entry flow and home page
4. **05 – 08** individual pages
5. **10** once the couple provides details

## Open questions (to clarify with the couple)

- **Pages vs. sections:** the site is currently one long page with anchor links. Slides 8–9
  ask for separate sub-pages ("Die Inhalte aller Unterseiten sollen nicht vollständig auf
  der Startseite sichtbar sein"). Confirm that real sub-pages/routes are wanted.
- **Password mechanism:** the site is protected today by HTTP Basic Auth (browser popup,
  `middleware.js`). Slide 4 asks for a styled password page. See task 01 for options.
- **Drive images:** someone with access must download the photos from the Drive folder;
  sub-folder names per place/person are not visible in the PDF.
- **Font:** Vollkorn SC is a small-caps font – confirm it is really wanted for body text
  as well, or only headings (PDF says "für die gesamte Website").

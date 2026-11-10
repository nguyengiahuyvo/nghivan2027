# 04 – Welcome Section, Site Structure & Navigation

PDF slides 8–9.

## Welcome section (slide 8)

After the hero, guests can scroll down to the **existing welcome text**
(`section#willkommen` in `index.html`).

- [ ] **Do not change the content** of the existing welcome text.
- [ ] Apply the global font (Vollkorn SC) and design from task 00.
- [ ] Remove italic styling (e.g. `.thanks`, `.welcome__photo figcaption`).
- [ ] Important elements may be larger, bold or coloured instead.
- [ ] Date, venue and RSVP deadline must stand out clearly.

## Site structure (slide 9)

The following menu items / sub-pages must exist:

| Menu item | Content |
|-----------|---------|
| **Einladung** | Welcome page / home (hero + welcome text) |
| **NGHIVAN (Über uns)** | About us (task 05) |
| **Wo übernachten?** | Accommodation and hotels (task 06) |
| **Travel / Anreise** | Directions, airports, transfers, parking etc. (task 07) |
| **Bridal Party** | Best man/maid of honour, bridesmaids, groomsmen etc. (task 08) |
| **RSVP** | Guest response |

- [ ] The real navigation starts after the welcome text.
- [ ] The content of the sub-pages must **not** be fully visible on the start page –
  guests are guided to each area deliberately.
  ⚠️ Today everything is one long page with anchors. Split into separate pages/routes
  (e.g. `/`, `/nghivan`, `/unterkunft`, `/anreise`, `/bridal-party`, `/rsvp`) or a
  router that shows one section at a time – confirm with the couple (see README).
- [ ] On the start page, after the welcome text, show an elegant overview linking to
  each sub-page (e.g. cards/tiles).

## Navigation between pages (slide 9)

- [ ] Navigation is easy to reach at any time on desktop and mobile (sticky header /
  burger menu).
- [ ] From every sub-page, every other sub-page is **one click** away.
- [ ] The **currently open page is visually highlighted**.
- [ ] Elegant, simple and intuitive.
- [ ] Responsive on desktop, tablet and smartphone.
- [ ] Update menu labels in `nav.*` and `menu.*` keys of all `src/i18n/*.json` files.
- [ ] Key facts (date / venue / RSVP deadline) remain quickly findable on every page
  (e.g. in header or footer).

## Acceptance criteria

- Six menu items in the order above, labels translated.
- Active page highlighted; works with browser back/forward.
- Start page only shows hero, welcome text and links into the sub-pages.

---

## Status: ✅ Done (2026-11-10)

- Welcome text unchanged in content, restyled (no italics, RSVP date highlighted).
- The site is now split into 6 pages (hash routes `#einladung`, `#nghivan`, `#unterkunft`, `#anreise`, `#bridal-party`, `#rsvp`); only one is visible at a time, browser back/forward works, old links like `#story` still resolve.
- Start page ends with overview tiles leading to each sub-page; every page has a „Weiter →“ link to the next one.
- Active page highlighted in the nav (pill) and the mobile menu; burger menu below 1200 px.

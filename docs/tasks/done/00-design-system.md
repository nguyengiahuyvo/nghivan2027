# 00 – Global Design System

PDF slides 1–3, 8, 10. Applies to **all current and future pages**.

## Goal

The site is a personal wedding website for friends and family. It must feel like an
elegant **coastal wedding** in a **dusty pastel blue** world: modern, premium, timeless,
personal, calm, light and inviting. **No corporate/business look, no loud colours.**
Guests should feel invited to a stylish and warm wedding celebration.

Mood board: slides 1 and 3 (blue/ivory stationery, wax seals, silk ribbons, shells, sea).

## Tasks

### Colours
- [ ] Replace the colour tokens in `src/style.css` (`:root`) with the new palette.
  Current tokens include dark navy (`--ink`, `--sea`), gold (`--gold`) and green velvet
  (`--velvet`) that do not match the brief.
- [ ] Primary palette (dusty pastel blue):
  - `#BBD1E7` (lead colour – bold in the PDF)
  - `#AEBED5`
  - `#CDDFE9`
  - `#859BBA`
  - `#AAC4DE`
- [ ] Supporting colours:
  - `#FAF9F7` Warm White
  - `#F5F2EE` Ivory
  - `#E8E1D8` Soft Sand
  - `#DCE5EF` Light Grey Blue
- [ ] Choose a readable dark text colour derived from the blue family (e.g. a deep
  blue-grey) and verify WCAG AA contrast for body text and buttons on the light
  backgrounds. The pastel colours alone are too light for text.
- [ ] Remove/replace gold and green accents unless explicitly kept (see task 05).

### Typography (slides 8 + 10)
- [ ] Use **Vollkorn SC** (Google Fonts) for the whole website; replace `--serif`
  (`Noto Serif Display`) and `--sans` (`Be Vietnam Pro`).
- [ ] Verify Vollkorn SC renders Vietnamese (ă, ơ, ư, ệ …) and Croatian (č, ć, š, ž, đ)
  characters; add the needed `subset`s or a fallback that matches.
- [ ] **No italic text anywhere.** Remove all `font-style: italic` and `<em>`/`<i>`
  styling (e.g. `.marquee span`, `.welcome__photo figcaption`, `.thanks`, the `&`
  in the nav brand).
- [ ] Hierarchy:
  - Main headings: large and striking
  - Section headings: slightly smaller but clearly recognisable
  - Body text: easily readable
- [ ] Emphasis only through **larger size, bolder weight, or a colour from the
  dusty-blue palette**.

### Always-highlighted key facts
- [ ] **Wedding date**, **venue** and **RSVP deadline** must stand out on every page and
  be quick to find at any time. Create one reusable component/style for them
  (see the "Wann / Wo / RSVP bis" strip on slide 7).

### Design rules
- [ ] Light, airy layout with plenty of white space
- [ ] Soft gradients within the blue colour world
- [ ] Rounded corners on buttons, cards and input fields
- [ ] Subtle shadows
- [ ] Consistent design on all pages
- [ ] **Mobile optimisation has high priority** – test at 360–430 px widths

## Acceptance criteria

- No colour outside the defined palette (plus derived text shades) is used.
- Vollkorn SC is the only typeface; no italic text is rendered.
- All five languages render correctly in the new font.
- Date, venue and RSVP deadline are visually prominent on every page.
- Layout works without horizontal scroll on phones.

---

## Status: ✅ Done (2026-11-10)

- Palette tokens, derived AA-contrast text shades (#2f4157, #4d6582, …) and Vollkorn SC (incl. Vietnamese + Latin-ext subsets) in `src/style.css`.
- Italics disabled globally (`em, i { font-style: normal }`, `font-synthesis-style: none`); all gold/green accents replaced.
- Date / venue / RSVP deadline: reusable `#keyfacts-tpl` component — large on the home hero, compact bar at the top of every sub-page, on the RSVP page and in the footer.
- Checked at 390 px and 1440 px: no horizontal scroll.

# 03 – Start Page Hero (Welcome / Invitation)

PDF slides 6–7.

## Goal

The start page should feel emotional, premium and clear. Visitors must recognise
immediately that they are invited to the wedding. Within a few seconds guests should
understand: *"We are invited to the wedding of Minh Nghi & Ivan, when it is, where it is
and how long until it happens."*

## Hero area (visible right after page load)

- [ ] **Main headline** (large, elegant, immediately visible):
  > „Mit großer Freude laden wir euch ein, unsere Hochzeit gemeinsam mit uns zu feiern.
  > Minh Nghi & Ivan"
  Translate for `en`, `fr`, `hr`, `vi`.
- [ ] **Names** additionally shown prominently: **Minh Nghi & Ivan** – large, elegant,
  instantly visible.
- [ ] **Photo** of Minh Nghi & Ivan.
  - ⚠️ Slide 6 says *above* the headline, slide 7 says *below* the headline. Slide 7 is
    the later example – clarify; default to **below**.
  - Photo source: Drive folder (see [README](README.md#shared-references)).
- [ ] **Event information** directly below, especially highlighted:
  - 📅 Date – Sa, 4. September 2027
  - 📍 Place – Hotel Pinija, Petrčane
  - ⏳ Countdown to the wedding
  - Also show **RSVP bis 1. Mai 2027** (slide 7 example strip "Wann / Wo / RSVP bis").
- [ ] Highlight the facts similar to the example on slide 7: a light ivory strip with
  three columns, small uppercase labels ("WANN", "WO", "RSVP BIS") and larger values,
  separated by thin vertical dividers. Stack vertically on mobile.
- [ ] Countdown keeps working as before (days, hours, minutes – existing logic in
  `src/main.js`, markup at `.countdown` in `index.html`). Seconds may stay.

## Notes

- Use the reference mock-up on slide 7 (photo, names, date block, round icon buttons)
  as inspiration only; apply the palette/typography from task 00 (no italics/script).
- Date and venue are among the most important facts on the whole site – reuse the
  highlight component from task 00.

## Acceptance criteria

- Headline, names, photo, date, place, RSVP deadline and countdown are all visible
  on first load (above the fold on desktop; on mobile at least headline, names and key
  facts with minimal scrolling).
- All texts available in all five languages.

---

## Status: ✅ Done (2026-11-10)

- Light hero: invitation headline, large names, couple photo (arch frame, **below** the headline on mobile, beside it on desktop), Wann/Wo/RSVP-bis strip with icons, countdown (days/hours/min/sec) and RSVP button.
- Photo currently `public/images/couple-studio*.webp` (the Drive folder needs a Google login, so the linked photo could not be downloaded) — replace those files to swap it.

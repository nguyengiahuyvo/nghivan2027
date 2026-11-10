# 06 – Page "Wo übernachten?"

PDF slides 12–14. Current implementation: `section#unterkunft` in `index.html`,
texts under `unterkunft.*` in `src/i18n/*.json`.

## 6.1 Discount code banner – new text (slide 12)

The dark banner "Bitte direkt beim Hotel buchen – das ist günstiger!" gets new text:

- [ ] Replace with:
  > **Rabattcode von Hotel Pinija:**
  > Wenn ihr im Hotel übernachten wollt, könnt ihr direkt auf
  > [hotel-pinija.hr](https://hotel-pinija.hr/) unseren Rabattcode für **5 %** eingeben
  > (mehr haben wir leider nicht erhalten 😭).
- "Rabattcode von Hotel Pinija:" and "5 %" in bold; `hotel-pinija.hr` is a link.
- [ ] Keep the copyable `WEDDING` code button.
- [ ] Restyle the banner to the new palette (currently dark navy).
- [ ] Translate into all five languages (keys `unterkunft.4` etc.).

## 6.2 Hotel Pinija card – repeat the code (slide 12)

- [ ] On card "Option 1 – Hotel Pinija", **above the "Zur Hotel-Website →" link**, add:
  > Rabattcode (5%): WEDDING
- [ ] Optionally make `WEDDING` copyable like the banner code.

## 6.3 Make "Mehr erfahren" more visible (slide 13)

The "Mehr erfahren" toggles on Option 2 (Ferienwohnungen & Airbnbs) and Option 3
(Außerhalb von Petrčane) are too subtle – guests don't notice there is more info.

- [ ] Style the `<summary>` as a clear button (rounded, palette background/border,
  chevron icon that rotates when open), larger text.
- [ ] Ensure keyboard and touch accessibility remain.

## 6.4 "Empfohlene Orte" – highlight & reorder (slide 14)

Section "Die schönsten Orte rund um die Location" (with map).

- [ ] Make the "Empfohlene Orte" section more prominent (bigger heading/eyebrow,
  clearer separation from the rest).
- [ ] Order the places exactly as follows:
  1. Petrčane
  2. Punta Skala
  3. Kožino
  4. Zadar
  5. Sukošan
  6. Jovići
  7. Ražanac
  8. Nin
- [ ] Add missing places (Punta Skala, Kožino, Ražanac – images exist today only for
  Petrčane, Zadar, Sukošan, Jovići, Nin in `public/images/`).

## 6.5 Image carousel per place (slide 14)

- [ ] For each place, add an **image carousel**; clicking the place/thumbnail opens the
  carousel (lightbox with swipe on mobile, arrows + keyboard on desktop, close button).
- [ ] Images: Drive folder (see [README](README.md#shared-references)).
- [ ] Convert images to WebP, provide responsive sizes, `loading="lazy"`, alt texts in
  all languages.
- [ ] Build the carousel as a reusable component – it is reused in task 07.5.

## Acceptance criteria

- New banner text and per-card code visible in all languages.
- "Mehr erfahren" is obviously clickable.
- Eight places in the given order, each with a working carousel.

---

## Status: ✅ Done (2026-11-10)

- Banner: new text „Rabattcode von Hotel Pinija: …“ (5 % bold, link, 😭), light blue styling, copyable WEDDING code. Translated in all 5 languages.
- Hotel card: „Rabattcode (5%): WEDDING“ (copyable) above „Zur Hotel-Website“.
- „Mehr erfahren“ is now a pill button with chevron (turns dark when open).
- „Empfohlene Orte“ in its own highlighted band; places reordered: Petrčane, Punta Skala, Kožino, Zadar, Sukošan, Jovići, Ražanac, Nin.
- Clicking a place photo opens a swipeable image carousel (lightbox).
- **Open:** the Drive images need a Google login and could not be downloaded. Drop them into `src/assets/galleries/<place>/` (see `src/assets/README.md`); until then existing photos are used, and Punta Skala, Kožino and Ražanac show a coloured placeholder.

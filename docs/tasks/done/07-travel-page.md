# 07 – Page "Travel / Anreise"

PDF slides 15–19. Current implementation: `section#anreise` in `index.html`,
texts under `travel.*` and `anreise.*` in `src/i18n/*.json`.

## 7.1 Make the travel tabs more prominent (slide 15)

- [ ] The tab selector "Flug ab München" / "From the US" / "Mit dem Auto" is too small –
  make it bigger and more visible (larger pills, more padding, larger font; full
  width / easy to tap on mobile).

## 7.2 Airport text (slide 15)

- [ ] Change the airport heading/subtitle in the "Flug ab München" tab to:
  > Nächster Flughafen: Zadar International Airport (ZAD) · 20 Min. zum Hotel Pinija
  (currently `travel.flug.1`: "Zadar International Airport (ZAD) · 20 Min. zum Hotel
  Pinija"). Translate for all languages; check the "From the US" tab for consistency.

## 7.3 Car rental hint only for flights (slide 15)

- [ ] Show the box **„Mobil vor Ort: Mietwagen-Empfehlung"** only in the tabs
  **„Flug ab München"** and **„From the US"** – hide it for „Mit dem Auto".
  (Move the box into those two tab panels, or toggle it based on the active tab.)

## 7.4 "Mit dem Auto" changes (slides 16–17)

### ASFINAG button
- [ ] In "Maut & Tunnelgebühren", the ASFINAG link ("Offiziell vorab bei der ASFINAG →",
  `https://shop.asfinag.at/`) currently sits only in the Slovenia card. Add it as its
  **own button under both Österreich and Slowenien** cards.
  - Note: ASFINAG sells Austrian vignettes; for Slovenia it offers the e-vignette as a
    reseller. Keep the same link unless the couple says otherwise.

### Route stop "2. Pause: Novo mesto, Slowenien"
- [ ] Add to this stop (key `travel.auto.28`):
  > **Warum wir das machen:** Kilometermäßig ist die Strecke kürzer und ihr umgeht den
  > Hauptautobahn-Grenzübergang, an dem man in der Hauptsaison oft ewig im Stau steht.
  > Für uns haben sich die Kurven bisher jedes Mal zeitlich absolut ausgezahlt –
  > entscheidet einfach selbst, was euch lieber ist!
- [ ] The existing sentence already contains a similar reason ("Kilometermäßig kürzer,
  und ihr umgeht den Hauptgrenzübergang …"). Merge to avoid duplication: keep the
  Petrol link + "ab hier fahren wir über die Landstraße weiter", the new
  "Warum wir das machen" paragraph, and the motion-sickness warning.

## 7.5 "Dalmatien Strand- und Reisetipps" (slide 18)

- [ ] **Wasserschuhe** – append:
  > Es gibt auch welche, die gut und wie (weiße) Sneaker ausschauen. Wir haben unsere
  > bei Amazon geholt.
- [ ] **Tages-Bootstour** – append:
  > Wir waren erst auf einer und können sie gut weiterempfehlen. Meldet euch bei uns für
  > Links (Nur für Schwimmer).

## 7.6 "Von uns bereits besucht" (slide 19)

- [ ] Add an **image carousel behind each of the 4 entries** (reuse component from
  task 06.5):
  - Zadar & Umgebung
  - Insel-Highlight (Dugi Otok)
  - Küstenroute Richtung Süden
  - Weiter im Süden
- [ ] Images: Drive folder (see [README](README.md#shared-references)) – the PDF says
  "Bilder findest du hier:" without a separate link; assume the same folder.
- [ ] Rename „Küsten-Route gen Süden" → **„Küstenroute Richtung Süden"** (key
  `anreise.24`; update translations accordingly).

## Acceptance criteria

- Tabs are clearly visible and easy to tap.
- Rental-car box appears only for the two flight tabs.
- ASFINAG button under Austria and Slovenia.
- All text changes present in all five languages.
- Four "already visited" entries each open a working carousel.

---

## Status: ✅ Done (2026-11-10)

- Tabs larger (bigger pills/text, full width on phones).
- Airport heading: „Nächster Flughafen: Zadar International Airport (ZAD) · 20 Min. zum Hotel Pinija“.
- „Mobil vor Ort: Mietwagen-Empfehlung“ shown only for „Flug ab München“ and „From the US“.
- ASFINAG link is now its own button under Österreich and Slowenien.
- Novo mesto: „Warum wir das machen: …“ added as a highlighted note; the duplicate reason sentence was removed from the old text.
- Wasserschuhe and Tages-Bootstour texts extended; „Küstenroute Richtung Süden“ renamed.
- „Von uns bereits besucht“: each entry gets a „Fotos ansehen“ button as soon as its folder has images (`src/assets/galleries/visited-*`). All four entries now have photos from `docs/Photo` (8 / 5 / 9 / 18 images).

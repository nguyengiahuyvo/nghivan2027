# 09 – Remove "Fotos teilen mit der Joy-App"

PDF slide 21: "Das kommt erstmal raus" (removed for now).

## Tasks

- [ ] Remove the Joy-App block (handle `nghivan2027`, "App herunterladen →") from the
  RSVP section in `index.html` (around the `rsvp.4` – `rsvp.7` keys).
- [ ] Remove related CSS that is no longer used.
- [ ] Leave the i18n keys in place **or** remove them consistently from all five
  locale files – since it is "for now", keeping them (unused) makes re-adding easier.
- [ ] Keep the RSVP button (`https://withjoy.com/nghivan2027/rsvp`) – only the photo
  sharing block is removed.

## Acceptance criteria

- No Joy-App photo-sharing block visible in any language.
- RSVP still works.

---

## Status: ✅ Done (2026-11-10)

- Joy-App photo-sharing block removed from the RSVP page (and its CSS). RSVP button kept.
- i18n keys `rsvp.4`–`rsvp.8` kept unused so the block can be restored easily.

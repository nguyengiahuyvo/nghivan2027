# 08 – Page "Bridal Party"

PDF slide 20. Current implementation: `section#bridal-party` in `index.html`,
texts under `bridal-party.*` in `src/i18n/*.json`.

## Tasks

- [ ] **„OUR BRIDAL PARTY & BEST FRIENDS"** (currently a small eyebrow, key
  `bridal-party.1`) – make it the prominent, larger heading.
- [ ] **„Ihr braucht Hilfe oder plant was?"** (currently the big display heading, key
  `bridal-party.2`) – make it **smaller** (sub-heading).
- [ ] Add a **photo for each person**, replacing the initial-letter circles.
  People shown: Thanh (Trauzeugin), Foti (Trauzeuge), Mai Anh, Mai, Anh
  (Brautjungfern), Andi, Daniel (Groomsmen).
  Photos: Drive folder (see [README](README.md#shared-references)).
- [ ] **Thanh and Foti should not stand out so much** from the others – reduce the size
  difference / visual weight of their cards (e.g. same card style, maybe slightly
  larger or first in order, remove the large gold "&" or tone it down).
- [ ] Remove italics on initials/names; apply palette from task 00 (dark navy circles
  and gold "&" do not match).

## Acceptance criteria

- Heading hierarchy swapped as described.
- Every person has a round photo with name and role.
- Grid is balanced and works on mobile (2 columns on phones).

---

## Status: ✅ Done (2026-11-10)

- „Our Bridal Party & Best Friends“ is now the large main heading; „Ihr braucht Hilfe oder plant was?“ is a smaller sub-heading.
- Thanh & Foti use the same card style as everyone else (only slightly larger photo, small „&“).
- Round photo slots for every person; they show the initial until a photo is added as `src/assets/people/<name>.jpg` (Drive folder was not accessible).

# 02 – Language Selection Page

PDF slide 5 ("2. Seite: Sprache auswählen") – "Einfach wie bei der Einrichtung vom iPhone".

## Goal

After a successful login, guests pick their language before entering the site.

## Requirements

- [ ] Show the languages in **exactly** this order:
  1. 🇩🇪 Deutsch
  2. 🇻🇳 Tiếng Việt
  3. 🇭🇷 Hrvatski
  4. 🇬🇧 English
  5. 🇫🇷 Français
- [ ] Flag and language name **side by side inside a rounded (pill) button**
  (see example on slide 5).
- [ ] Use large, easily recognisable buttons or tiles (touch-friendly on mobile).
- [ ] After a language is chosen, the website opens **directly** in that language.
- [ ] Modern, simple and internationally understandable design.

## Technical notes

- Existing language switcher logic lives in `src/i18n.js` and `src/i18n/*.json` –
  reuse it; persist the choice (e.g. `localStorage`) so returning guests skip this
  step or land in their language.
- Use flag images/SVGs rather than emoji flags if Windows rendering matters
  (Windows does not show emoji flags).
- The in-site language switcher should still exist so guests can change later; keep
  the same order there.

## Acceptance criteria

- Order matches the list above on all screen sizes.
- One tap opens the home page in the chosen language.
- Flags display correctly on Windows, macOS, iOS and Android.

---

## Status: ✅ Done (2026-11-10)

- Full-screen picker (`#langpick` in `index.html`): rounded pills with round SVG flags (render on Windows too), order DE · VI · HR · EN · FR, stacked full-width on phones.
- Shown after login and on first visits without a saved language; the choice is saved and the site opens directly in that language.
- Nav dropdown and mobile menu use the same order and flags.

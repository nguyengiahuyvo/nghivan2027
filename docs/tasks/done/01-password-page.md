# 01 – Password-Protected Entry Page

PDF slide 4 ("1. Seite: Passwort einfügen").

## Goal

When the website is opened, a password page is shown first.

## Requirements

The page contains **only**:
- [ ] a password input field (reference screenshot: label "Event-Passwort",
  placeholder e.g. "z. B. xy4686")
- [ ] a button **„Weiter"**
- [ ] a multilingual greeting/hint text, all five languages shown together:
  - DE: Bitte gib das Passwort ein, um weiterzugehen.
  - EN: Please enter the password to continue.
  - FR: Veuillez entrer le mot de passe pour continuer.
  - HR: Molimo unesite lozinku za nastavak.
  - VI: Vui lòng nhập mật khẩu để tiếp tục.

The reference screenshot also shows "Host kontaktieren · Anmelden" links – these are
**not** in the "contains only" list, so leave them out unless confirmed.

## Technical notes

Today the whole site is protected by HTTP Basic Auth in `middleware.js` (browser popup,
password in Vercel env var `SITE_PASSWORD`). A styled page needs a different flow, e.g.:

- [ ] Vercel middleware serves a password page for unauthenticated requests; on correct
  password (POST), it sets a signed/HTTP-only cookie and redirects to the language page.
  Middleware lets requests with a valid cookie through.
- [ ] Keep `SITE_PASSWORD` as the single source of the password; never ship it to the
  client in JS.
- [ ] Show a friendly error (in all five languages or icon-based) on a wrong password.
- [ ] Remove the `WWW-Authenticate` Basic Auth response once the new flow works.

## Design

- Follows task 00 (palette, Vollkorn SC, rounded input + button, subtle shadow, lots
  of white space, centered, mobile first).

## Acceptance criteria

- Opening any URL without a valid session shows the password page.
- Correct password → language selection page (task 02).
- Wrong password → error message, no access.
- Session persists (cookie) so guests don't re-enter it on every visit.

---

## Status: ✅ Done (2026-11-10)

- `middleware.js` now serves a styled password page (5-language hint, field, „Weiter“) instead of the Basic-Auth popup.
- Correct password → HTTP-only cookie (180 days, SHA-256 token of the password) → redirect with `?chooselang` to the language picker. Wrong password → error message in all 5 languages.
- Still configured via `SITE_PASSWORD` on Vercel. **Not testable locally** (middleware runs on Vercel only) — please check once after deploying.

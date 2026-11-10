// Vercel Routing Middleware: protects the whole site with a styled password page.
// Set SITE_PASSWORD in Vercel → Project → Settings → Environment Variables.
// A correct password sets an HTTP-only cookie, so guests only enter it once per device.

export const config = {
  matcher: '/:path*',
};

const COOKIE = 'nv_auth';
const LOGIN_PATH = '/__login';
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

async function tokenFor(password) {
  const data = new TextEncoder().encode(`nghivan2027:${password}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function readCookie(request, name) {
  const header = request.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return null;
}

// Only allow redirects back to a path on this site.
function safeNext(value) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : '/';
}

export default async function middleware(request) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return; // no password configured → site stays public

  const url = new URL(request.url);
  const expected = await tokenFor(password);

  if (url.pathname === LOGIN_PATH && request.method === 'POST') {
    const form = await request.formData();
    const next = safeNext(form.get('next'));
    if (String(form.get('password') || '') === password) {
      // After login, guests pick their language first (see #langpick in index.html).
      const target = new URL(next, url);
      target.searchParams.set('chooselang', '1');
      return new Response(null, {
        status: 303,
        headers: {
          Location: target.pathname + target.search + target.hash,
          'Set-Cookie': `${COOKIE}=${expected}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    return passwordPage(next, true);
  }

  if (readCookie(request, COOKIE) === expected) return; // authenticated → continue

  // Assets requested by an unauthenticated page get a plain 401, everything else the login page.
  const accept = request.headers.get('accept') || '';
  if (request.method !== 'GET' || !accept.includes('text/html')) {
    return new Response('Unauthorized', { status: 401 });
  }
  return passwordPage(url.pathname + url.search, false);
}

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function passwordPage(next, failed) {
  const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>Minh Nghi &amp; Ivan · 04.09.2027</title>
<meta name="theme-color" content="#FAF9F7">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Vollkorn+SC:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0; min-height: 100%;
    display: grid; place-items: center; padding: 32px 16px;
    font-family: "Vollkorn SC", Georgia, serif; color: #2f4157;
    background: radial-gradient(ellipse at 20% 0%, #DCE5EF, transparent 60%),
                radial-gradient(ellipse at 100% 100%, #CDDFE9, transparent 55%), #FAF9F7;
  }
  main {
    width: 100%; max-width: 440px; text-align: center;
    background: rgba(250, 249, 247, .86); border-radius: 28px;
    padding: 44px clamp(22px, 6vw, 44px) 40px;
    box-shadow: 0 30px 70px -40px rgba(62, 85, 114, .45), 0 0 0 1px rgba(133, 155, 186, .18);
  }
  .mono { font-size: 44px; line-height: 1; margin: 0 0 6px; color: #4d6582; }
  .date { font-size: 13px; letter-spacing: .32em; margin: 0 0 30px; color: #4a5d75; }
  ul { list-style: none; padding: 0; margin: 0 0 28px; display: grid; gap: 6px; font-size: 16px; line-height: 1.45; }
  li:first-child { font-size: 19px; font-weight: 600; color: #2f4157; }
  li { color: #4a5d75; }
  label { display: block; text-align: left; font-size: 13px; letter-spacing: .14em; color: #4d6582; margin: 0 0 8px 4px; }
  input {
    width: 100%; font: inherit; font-size: 18px; color: #2f4157;
    padding: 15px 20px; border-radius: 16px;
    border: 1px solid #AEBED5; background: #fff; outline: none;
    transition: border-color .3s, box-shadow .3s;
  }
  input:focus { border-color: #4d6582; box-shadow: 0 0 0 4px rgba(187, 209, 231, .6); }
  button {
    width: 100%; margin-top: 16px; font: inherit; font-size: 17px; font-weight: 600; letter-spacing: .12em;
    padding: 15px 20px; border-radius: 999px; border: 0; cursor: pointer;
    color: #fff; background: linear-gradient(135deg, #5a7391, #3e5572);
    box-shadow: 0 14px 30px -16px rgba(62, 85, 114, .8);
    transition: transform .3s, box-shadow .3s;
  }
  button:hover { transform: translateY(-1px); box-shadow: 0 18px 34px -16px rgba(62, 85, 114, .9); }
  button:focus-visible { outline: 2px solid #3e5572; outline-offset: 3px; }
  .error { margin: 14px 0 0; padding: 10px 14px; border-radius: 12px; background: #F5F2EE; color: #8a3b3b; font-size: 14px; line-height: 1.45; }
</style>
</head>
<body>
<main>
  <p class="mono">N &amp; I</p>
  <p class="date">04 · 09 · 2027</p>
  <ul>
    <li lang="de">Bitte gib das Passwort ein, um weiterzugehen.</li>
    <li lang="en">Please enter the password to continue.</li>
    <li lang="fr">Veuillez entrer le mot de passe pour continuer.</li>
    <li lang="hr">Molimo unesite lozinku za nastavak.</li>
    <li lang="vi">Vui lòng nhập mật khẩu để tiếp tục.</li>
  </ul>
  <form method="post" action="${LOGIN_PATH}">
    <input type="hidden" name="next" value="${escapeAttr(next)}">
    <label for="pw">Passwort · Password · Lozinka · Mật khẩu</label>
    <input id="pw" name="password" type="password" autocomplete="current-password" required autofocus>
    ${failed ? '<p class="error" role="alert">Falsches Passwort · Wrong password · Mot de passe incorrect · Pogrešna lozinka · Sai mật khẩu</p>' : ''}
    <button type="submit">Weiter</button>
  </form>
</main>
</body>
</html>`;
  return new Response(html, {
    status: failed ? 401 : 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

// Vercel Routing Middleware: protects the whole site with HTTP Basic Auth.
// Set SITE_PASSWORD in Vercel → Project → Settings → Environment Variables.
// Any username is accepted; only the password is checked.

export const config = {
  matcher: '/:path*',
};

export default function middleware(request) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return; // no password configured → site stays public

  const header = request.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');

  if (scheme === 'Basic' && encoded) {
    const decoded = atob(encoded);
    const given = decoded.slice(decoded.indexOf(':') + 1);
    if (given === password) return; // correct → continue to the site
  }

  return new Response('Passwort erforderlich', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Geschuetzter Bereich", charset="UTF-8"' },
  });
}

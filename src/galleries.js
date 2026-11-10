// Image carousels and bridal-party portraits.
//
// HOW TO ADD PHOTOS (no code changes needed):
//   • Place carousels:  drop images into  src/assets/galleries/<slug>/
//   • Bridal party:     drop one image as src/assets/people/<slug>.jpg  (or .jpeg/.png/.webp)
// Files are sorted by name, so prefix them with 01-, 02-, … to control the order.
// Vite optimises and fingerprints them at build time.
//
// Gallery slugs:
//   Recommended places (Wo übernachten?):
//     petrcane, punta-skala, kozino, zadar, sukosan, jovici, razanac, nin
//   "Von uns bereits besucht" (Travel / Anreise):
//     visited-zadar, visited-dugi-otok, visited-kuestenroute, visited-sueden
// People slugs:
//     thanh, foti, mai-anh, mai, anh, andi, daniel

const galleryFiles = import.meta.glob('./assets/galleries/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true, query: '?url', import: 'default',
});
const peopleFiles = import.meta.glob('./assets/people/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true, query: '?url', import: 'default',
});

// Photos that already ship with the site (public/images) are used until real ones are added.
const DEFAULTS = {
  petrcane: ['/images/petrcane.webp', '/images/hero-petrcane-1000.webp', '/images/hotel-pinija.webp'],
  zadar: ['/images/zadar.webp'],
  sukosan: ['/images/sukosan.webp'],
  jovici: ['/images/jovici.webp'],
  nin: ['/images/nin.webp'],
  'visited-zadar': ['/images/zadar.webp', '/images/nin.webp', '/images/sukosan.webp'],
};

const bySlug = {};
for (const [path, url] of Object.entries(galleryFiles).sort(([a], [b]) => a.localeCompare(b))) {
  const slug = path.split('/').at(-2);
  (bySlug[slug] ||= []).push(url);
}

/** All images for a gallery slug (added photos win over the shipped defaults). */
export function galleryImages(slug) {
  return bySlug[slug]?.length ? bySlug[slug] : (DEFAULTS[slug] || []);
}

const people = {};
for (const [path, url] of Object.entries(peopleFiles)) {
  people[path.split('/').at(-1).replace(/\.[^.]+$/, '').toLowerCase()] = url;
}

/** Portrait URL for a bridal-party member, or null (→ monogram fallback). */
export const personPhoto = (slug) => people[slug] || null;

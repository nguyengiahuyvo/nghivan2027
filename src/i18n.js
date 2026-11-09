import de from './i18n/de.json';

export const LANGS = ['de', 'en', 'vi', 'fr', 'hr'];
const DEFAULT = 'de';
const STORAGE_KEY = 'nghivan-lang';

// Non-default languages are code-split and only downloaded when chosen.
const loaders = {
  en: () => import('./i18n/en.json'),
  vi: () => import('./i18n/vi.json'),
  fr: () => import('./i18n/fr.json'),
  hr: () => import('./i18n/hr.json'),
};
const cache = { de };

let current = DEFAULT;
let dict = de;

/** Translate a key in the current language (falls back to German). */
export function t(key, vars) {
  let s = dict[key] ?? de[key] ?? key;
  if (vars) for (const k in vars) s = s.replace(`{${k}}`, vars[k]);
  return s;
}

export const getLang = () => current;

const decoder = document.createElement('textarea');
const decode = (html) => { decoder.innerHTML = html; return decoder.value; };

function readStored() {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}
function store(lang) {
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* private mode */ }
}

/** ?lang=xx  >  saved choice  >  browser language  >  German */
export function detectLang() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(fromUrl)) return fromUrl;
  const saved = readStored();
  if (LANGS.includes(saved)) return saved;
  for (const l of navigator.languages || [navigator.language]) {
    const code = String(l).slice(0, 2).toLowerCase();
    if (LANGS.includes(code)) return code;
  }
  return DEFAULT;
}

async function load(lang) {
  if (!cache[lang]) cache[lang] = (await loaders[lang]()).default;
  return cache[lang];
}

function apply() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const v = dict[el.dataset.i18n] ?? de[el.dataset.i18n];
    if (v == null) return;
    if (el.tagName === 'TITLE') document.title = decode(v);
    else el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':');
      const v = dict[key] ?? de[key];
      if (v != null) el.setAttribute(attr, decode(v));
    });
  });
  document.documentElement.lang = current;

  document.querySelectorAll('[data-set-lang]').forEach((b) => {
    const on = b.dataset.setLang === current;
    b.classList.toggle('is-active', on);
    if (b.getAttribute('role') === 'option') b.setAttribute('aria-selected', String(on));
  });
  document.querySelectorAll('[data-lang-current]').forEach((el) => (el.textContent = current.toUpperCase()));
}

/** Switch language; dispatches a `langchange` event on window afterwards. */
export async function setLang(lang, { persist = true } = {}) {
  if (!LANGS.includes(lang)) lang = DEFAULT;
  const next = await load(lang);
  current = lang;
  dict = next;
  apply();
  if (persist) {
    store(lang);
    const url = new URL(location.href);
    if (lang === DEFAULT) url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
  }
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

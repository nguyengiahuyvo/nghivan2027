import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { t, getLang, setLang, detectLang } from './i18n.js';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) root.classList.add('reduced');

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---------------------------------------------------------
   Data: recommended areas (texts live in src/i18n/*.json → area.N.*)
   --------------------------------------------------------- */
const AREAS = [
  { name: 'Kožino' },
  { name: 'Punta Skala' },
  { name: 'Jovići', img: 'jovici' },
  { name: 'Ražanac' },
  { name: 'Sukošan', img: 'sukosan' },
  { name: 'Zadar', img: 'zadar' },
  { name: 'Petrčane', img: 'petrcane' },
  { name: 'Nin', img: 'nin' },
];

const STAY = { checkin: '2027-09-03', checkout: '2027-09-05' };
const BOOKING_LANG = { de: 'de', en: 'en-gb', vi: 'vi', fr: 'fr', hr: 'hr' };

function renderAreas() {
  const track = $('[data-carousel-track]');
  if (!track) return;
  const lang = getLang();
  track.innerHTML = AREAS.map((a, i) => {
    const n = i + 1;
    const sub = t(`area.${n}.sub`);
    const hasSub = sub !== `area.${n}.sub`;
    const q = encodeURIComponent(a.name);
    const airbnb = `https://www.airbnb.com/s/${q}--Croatia/homes?checkin=${STAY.checkin}&checkout=${STAY.checkout}`;
    const booking = `https://www.booking.com/searchresults.${BOOKING_LANG[lang]}.html?ss=${q}%2C%20Croatia&checkin=${STAY.checkin}&checkout=${STAY.checkout}`;
    const media = a.img
      ? `<img src="/images/${a.img}.webp" alt="${a.name}" loading="lazy" draggable="false" />`
      : `<span class="area__art">${a.name}</span>`;
    return `
      <article class="area">
        <div class="area__media${a.img ? '' : ' area__media--art'}">
          ${media}
          <span class="area__tag">${t(`area.${n}.tag`)}</span>
        </div>
        <div class="area__body">
          <span class="area__no">${String(n).padStart(2, '0')}</span>
          <h3>${a.name}${hasSub ? `<small>${sub}</small>` : ''}</h3>
          <div class="area__dist"><span class="chip">${t(`area.${n}.km`)}</span><span class="chip">${t(`area.${n}.min`)}</span></div>
          <p>${t(`area.${n}.character`)}</p>
          <p><b>${t('js.perfectFor')}</b> ${t(`area.${n}.perfect`)}</p>
          <div class="area__links">
            <a class="link-arrow" href="${airbnb}" target="_blank" rel="noopener">Airbnb <span aria-hidden="true">→</span></a>
            <a class="link-arrow" href="${booking}" target="_blank" rel="noopener">Booking.com <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </article>`;
  }).join('');
}
renderAreas();

/* ---------------------------------------------------------
   Smooth scroll (Lenis) synced with GSAP
   --------------------------------------------------------- */
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

function scrollToTarget(target) {
  const offset = target.id === 'home' ? 0 : -60;
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.6 });
  else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
}

/* ---------------------------------------------------------
   Navigation: anchors, solid/hide on scroll, mobile menu
   --------------------------------------------------------- */
const nav = $('.nav');
const burger = $('.nav__burger');
const menu = $('#menu');

function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? t('js.menuClose') : t('nav.9'));
  menu.setAttribute('aria-hidden', String(!open));
  if (lenis) open ? lenis.stop() : lenis.start();
}
burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Delegated, because translated content re-creates links inside paragraphs
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  const target = id.length > 1 ? $(id) : null;
  if (!target) return;
  e.preventDefault();
  setMenu(false);
  scrollToTarget(target);
  history.replaceState(null, '', location.search + id);
});

let lastY = 0;
function onScroll() {
  const y = window.scrollY;
  const pastHero = y > window.innerHeight * 0.7;
  nav.classList.toggle('is-solid', y > window.innerHeight * 0.6);
  nav.classList.toggle('is-hidden', pastHero && y > lastY + 2 && !document.body.classList.contains('menu-open'));
  if (y < lastY - 2 || !pastHero) nav.classList.remove('is-hidden');
  lastY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Active section highlight
$$('.nav__links a').forEach((link) => {
  const section = $(link.getAttribute('href'));
  if (!section) return;
  ScrollTrigger.create({
    trigger: section, start: 'top 50%', end: 'bottom 50%',
    onToggle: ({ isActive }) => link.classList.toggle('is-active', isActive),
  });
});

/* ---------------------------------------------------------
   Countdown — Saturday 4 Sept 2027, 00:00 Croatian time (CEST)
   --------------------------------------------------------- */
const WEDDING = Date.UTC(2027, 8, 3, 22, 0, 0);
const cd = { d: $('[data-cd="d"]'), h: $('[data-cd="h"]'), m: $('[data-cd="m"]'), s: $('[data-cd="s"]') };
function tickCountdown() {
  let diff = Math.max(0, WEDDING - Date.now());
  const d = Math.floor(diff / 864e5); diff -= d * 864e5;
  const h = Math.floor(diff / 36e5); diff -= h * 36e5;
  const m = Math.floor(diff / 6e4); diff -= m * 6e4;
  const s = Math.floor(diff / 1e3);
  const vals = { d: String(d), h: String(h).padStart(2, '0'), m: String(m).padStart(2, '0'), s: String(s).padStart(2, '0') };
  for (const k in vals) {
    const el = cd[k];
    if (el && el.textContent !== vals[k]) {
      el.textContent = vals[k];
      if (!reduced) { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); }
    }
  }
}
tickCountdown();
setInterval(tickCountdown, 1000);

/* ---------------------------------------------------------
   Intro: loader → hero reveal
   --------------------------------------------------------- */
function splitChars(el) {
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  el.innerHTML = [...text].map((c) => `<span class="char" aria-hidden="true">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
}
$$('[data-split]').forEach(splitChars);

function intro() {
  const loader = $('.loader');
  if (reduced) { loader?.remove(); return; }

  document.body.classList.add('is-loading');
  lenis?.stop();

  gsap.set('.hero__line .char', { yPercent: 115 });
  gsap.set('[data-hero-amp]', { opacity: 0, scale: 0.6, rotate: -12 });
  gsap.set('[data-hero-fade]', { opacity: 0, y: 24 });
  gsap.set('[data-hero-media]', { scale: 1.25 });

  const tl = gsap.timeline({
    defaults: { ease: 'expo.out' },
    onComplete: () => { document.body.classList.remove('is-loading'); lenis?.start(); },
  });

  tl.from('.loader__mono > *', { yPercent: 110, duration: 1.1, stagger: 0.12 })
    .from('.loader__date', { opacity: 0, letterSpacing: '1em', duration: 1.2 }, '<0.3')
    .to('.loader__inner', { opacity: 0, y: -30, duration: 0.6, ease: 'power2.in' }, '+=0.35')
    .to(loader, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=0.1')
    .set(loader, { display: 'none' })
    .to('[data-hero-media]', { scale: 1, duration: 2.4 }, '<-0.6')
    .to('.hero__line .char', { yPercent: 0, duration: 1.4, stagger: 0.04 }, '<0.3')
    .to('[data-hero-amp]', { opacity: 1, scale: 1, rotate: 0, duration: 1.4 }, '<0.35')
    .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, '<0.2');
}

/* ---------------------------------------------------------
   Scroll animations
   --------------------------------------------------------- */
function scrollAnimations() {
  if (reduced) return;

  // Hero parallax + fade out
  gsap.to('[data-hero-media]', {
    yPercent: 16, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero__content', {
    yPercent: -20, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true },
  });

  // Text reveals (batched so siblings stagger naturally)
  ScrollTrigger.batch('[data-reveal]:not([data-reveal="clip"])', {
    start: 'top 88%', once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out', stagger: 0.09, overwrite: true }),
  });

  // Group reveals
  $$('[data-reveal-group]').forEach((group) => {
    gsap.to(group.children, {
      opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  // Image clip reveals
  $$('[data-reveal="clip"]').forEach((el) => {
    const img = $('img', el);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
    tl.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'expo.inOut' });
    if (img) tl.from(img, { scale: 1.35, duration: 2, ease: 'expo.out' }, 0.2);
  });

  // Parallax images
  $$('[data-parallax]').forEach((img) => {
    const p = parseFloat(img.dataset.parallax) * 60;
    gsap.fromTo(img, { yPercent: -p }, {
      yPercent: p, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // NGHIVAN letters converge
  const letters = $$('.story__title span');
  gsap.fromTo(letters,
    { yPercent: (i) => (i % 2 ? 70 : -70), opacity: 0.15, rotate: (i) => (i % 2 ? 6 : -6) },
    { yPercent: 0, opacity: 1, rotate: 0, ease: 'none',
      scrollTrigger: { trigger: '.story__title', start: 'top bottom', end: 'top 35%', scrub: 1 } });

  // Route line drawing
  const route = $('[data-route]');
  if (route) {
    gsap.to('.route__line span', {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: route, start: 'top 75%', end: 'bottom 60%', scrub: true },
    });
  }

  // Marquee — speeds up with scroll velocity
  const marquee = gsap.to('.marquee__track', { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
  if (lenis) {
    lenis.on('scroll', ({ velocity }) => {
      const boost = 1 + Math.min(Math.abs(velocity) / 6, 5);
      gsap.to(marquee, { timeScale: boost, duration: 0.3, overwrite: true });
      gsap.to(marquee, { timeScale: 1, duration: 1.2, delay: 0.3, overwrite: false });
    });
  }
}

/* ---------------------------------------------------------
   Tabs
   --------------------------------------------------------- */
function initTabs() {
  const wrap = $('[data-tabs]');
  if (!wrap) return;
  const tabs = $$('[role="tab"]', wrap);
  const ink = $('.tabs__ink', wrap);

  const moveInk = (tab) => {
    ink.style.width = `${tab.offsetWidth}px`;
    ink.style.transform = `translateX(${tab.offsetLeft}px)`;
  };

  const select = (tab, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $(`#${t.getAttribute('aria-controls')}`).hidden = !on;
    });
    moveInk(tab);
    if (focus) tab.focus();
    ScrollTrigger.refresh();
    // reveal anything inside the newly shown panel
    $$('[data-reveal]', $(`#${tab.getAttribute('aria-controls')}`)).forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
        select(next, true);
      }
    });
  });

  const current = () => tabs.find((t) => t.getAttribute('aria-selected') === 'true');
  window.addEventListener('resize', () => moveInk(current()));
  window.addEventListener('langchange', () => moveInk(current()));
  document.fonts?.ready.then(() => moveInk(current()));
  moveInk(current());
}

/* ---------------------------------------------------------
   Animated <details>
   --------------------------------------------------------- */
function initDetails() {
  $$('details.more').forEach((d) => {
    const summary = $('summary', d);
    const body = $('.more__body', d);
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (d.open) {
        gsap.to(body, {
          height: 0, opacity: 0, duration: 0.5, ease: 'power3.inOut',
          onComplete: () => { d.open = false; gsap.set(body, { clearProps: 'all' }); ScrollTrigger.refresh(); },
        });
      } else {
        d.open = true;
        gsap.from(body, { height: 0, opacity: 0, duration: 0.7, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() });
      }
    });
  });
}

/* ---------------------------------------------------------
   Carousel: arrows, counter, mouse drag
   --------------------------------------------------------- */
function initCarousel() {
  const wrap = $('[data-carousel]');
  if (!wrap) return;
  const track = $('[data-carousel-track]', wrap);
  const idx = $('[data-carousel-index]', wrap);
  const step = () => {
    const card = track.firstElementChild;
    return card ? card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || 22) : 300;
  };
  $('[data-carousel-prev]', wrap).addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  $('[data-carousel-next]', wrap).addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

  track.addEventListener('scroll', () => {
    const i = Math.min(AREAS.length - 1, Math.round(track.scrollLeft / step()));
    idx.textContent = String(i + 1).padStart(2, '0');
  }, { passive: true });

  // drag to scroll (mouse only; touch scrolls natively)
  let down = false, startX = 0, startLeft = 0, moved = false;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) { moved = true; track.classList.add('is-dragging'); }
    track.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    track.classList.remove('is-dragging');
    if (moved) {
      const i = Math.round(track.scrollLeft / step());
      track.scrollTo({ left: i * step(), behavior: 'smooth' });
    }
  });
  track.addEventListener('click', (e) => { if (moved) { e.preventDefault(); moved = false; } }, true);
}

/* ---------------------------------------------------------
   Copy-to-clipboard + toast
   --------------------------------------------------------- */
const toast = $('.toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}
function initCopy() {
  $$('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = value; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove();
      }
      const hint = $('[data-copy-hint]', btn);
      if (hint) { hint.textContent = t('js.copied'); setTimeout(() => (hint.textContent = t('unterkunft.6')), 2000); }
      showToast(t('js.copyToast', { value }));
    });
  });
}

/* ---------------------------------------------------------
   Language switcher
   --------------------------------------------------------- */
function initLangSwitch() {
  const wrap = $('[data-lang]');
  const btn = $('.lang__btn', wrap);
  const open = (on) => { wrap.classList.toggle('is-open', on); btn.setAttribute('aria-expanded', String(on)); };

  btn.addEventListener('click', (e) => { e.stopPropagation(); open(!wrap.classList.contains('is-open')); });
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) open(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') open(false); });

  $$('[data-set-lang]').forEach((b) => b.addEventListener('click', async () => {
    open(false);
    const lang = b.dataset.setLang;
    if (lang === getLang()) return;
    document.body.classList.add('is-switching');
    await new Promise((r) => setTimeout(r, reduced ? 0 : 280));
    await setLang(lang);
    requestAnimationFrame(() => document.body.classList.remove('is-switching'));
  }));

  window.addEventListener('langchange', () => {
    renderAreas();
    ScrollTrigger.refresh();
  });
}

/* ---------------------------------------------------------
   Boot
   --------------------------------------------------------- */
initTabs();
initDetails();
initCarousel();
initCopy();
initLangSwitch();
scrollAnimations();
intro();

// Initial language (URL ?lang= > saved choice > browser language > German)
const initialLang = detectLang();
if (initialLang !== 'de') setLang(initialLang, { persist: false });

window.addEventListener('load', () => ScrollTrigger.refresh());

// Honour deep links like /#anreise once the intro is done
if (location.hash && $(location.hash)) {
  setTimeout(() => scrollToTarget($(location.hash)), reduced ? 0 : 2600);
}

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { t, getLang, setLang, detectLang } from './i18n.js';
import { FLAGS, renderFlags } from './flags.js';
import { galleryImages, personPhoto } from './galleries.js';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) root.classList.add('reduced');

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/* ---------------------------------------------------------
   Key facts (date · venue · RSVP deadline) on every page.
   Cloned before translations run, so they get translated too.
   --------------------------------------------------------- */
const factsTpl = $('#keyfacts-tpl');
$$('[data-keyfacts]').forEach((slot) => {
  const node = factsTpl.content.firstElementChild.cloneNode(true);
  node.classList.add(`keyfacts--${slot.dataset.keyfacts}`);
  slot.appendChild(node);
});
renderFlags();

/* ---------------------------------------------------------
   Data: recommended areas, in the order the couple asked for.
   `key` points at the area.N.* texts in src/i18n/*.json.
   --------------------------------------------------------- */
const AREAS = [
  { name: 'Petrčane', key: 7, slug: 'petrcane' },
  { name: 'Punta Skala', key: 2, slug: 'punta-skala' },
  { name: 'Kožino', key: 1, slug: 'kozino' },
  { name: 'Zadar', key: 6, slug: 'zadar' },
  { name: 'Sukošan', key: 5, slug: 'sukosan' },
  { name: 'Jovići', key: 3, slug: 'jovici' },
  { name: 'Ražanac', key: 4, slug: 'razanac' },
  { name: 'Nin', key: 8, slug: 'nin' },
];

const STAY = { checkin: '2027-09-03', checkout: '2027-09-05' };
const BOOKING_LANG = { de: 'de', en: 'en-gb', vi: 'vi', fr: 'fr', hr: 'hr' };

const photoIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="14" rx="3"></rect><circle cx="12" cy="13" r="3.4"></circle><path d="M8.5 6l1.5-2.5h4L15.5 6"></path></svg>';

function renderAreas() {
  const track = $('[data-carousel-track]');
  if (!track) return;
  const lang = getLang();
  track.innerHTML = AREAS.map((a, i) => {
    const k = a.key;
    const sub = t(`area.${k}.sub`);
    const hasSub = sub !== `area.${k}.sub`;
    const q = encodeURIComponent(a.name);
    const airbnb = `https://www.airbnb.com/s/${q}--Croatia/homes?checkin=${STAY.checkin}&checkout=${STAY.checkout}`;
    const booking = `https://www.booking.com/searchresults.${BOOKING_LANG[lang]}.html?ss=${q}%2C%20Croatia&checkin=${STAY.checkin}&checkout=${STAY.checkout}`;
    const imgs = galleryImages(a.slug);
    const tag = `<span class="area__tag">${t(`area.${k}.tag`)}</span>`;
    const media = imgs.length
      ? `<button type="button" class="area__media" data-open-gallery="${a.slug}" data-title="${esc(a.name)}" aria-label="${esc(t('js.photosOf', { name: a.name }))}">
           <img src="${imgs[0]}" alt="" loading="lazy" draggable="false" />
           ${tag}
           <span class="area__photos">${photoIcon}${t('js.photos', { n: imgs.length })}</span>
         </button>`
      : `<div class="area__media area__media--art"><span class="area__art">${a.name}</span>${tag}</div>`;
    return `
      <article class="area">
        ${media}
        <div class="area__body">
          <span class="area__no">${String(i + 1).padStart(2, '0')}</span>
          <h3>${a.name}${hasSub ? `<small>${sub}</small>` : ''}</h3>
          <div class="area__dist"><span class="chip">${t(`area.${k}.km`)}</span><span class="chip">${t(`area.${k}.min`)}</span></div>
          <p>${t(`area.${k}.character`)}</p>
          <p><b>${t('js.perfectFor')}</b> ${t(`area.${k}.perfect`)}</p>
          <div class="area__links">
            <a class="link-arrow" href="${airbnb}" target="_blank" rel="noopener">Airbnb <span aria-hidden="true">→</span></a>
            <a class="link-arrow" href="${booking}" target="_blank" rel="noopener">Booking.com <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </article>`;
  }).join('');
  const total = $('[data-carousel-total]');
  if (total) total.textContent = String(AREAS.length).padStart(2, '0');
}
renderAreas();

/* "Von uns bereits besucht" — a photo button behind each entry that has pictures */
function renderVisited() {
  $$('[data-gallery-row]').forEach((row) => {
    $('.gallery-btn', row)?.remove();
    const slug = row.dataset.galleryRow;
    const imgs = galleryImages(slug);
    if (!imgs.length) return;
    const title = $('dt', row)?.textContent.trim() || '';
    row.insertAdjacentHTML('beforeend', `
      <button type="button" class="gallery-btn" data-open-gallery="${slug}" data-title="${esc(title)}">
        <span class="gallery-btn__thumbs">${imgs.slice(0, 3).map((src) => `<img src="${src}" alt="" loading="lazy">`).join('')}</span>
        <span>${t('js.photos', { n: imgs.length })}</span>
      </button>`);
  });
}
renderVisited();

/* Bridal party portraits (monogram stays as fallback) */
$$('[data-person]').forEach((p) => {
  const src = personPhoto(p.dataset.person);
  if (!src) return;
  const name = $('h3', p)?.textContent || '';
  $('.person__photo', p).innerHTML = `<img src="${src}" alt="${esc(name)}" loading="lazy">`;
});

/* ---------------------------------------------------------
   Smooth scroll (Lenis) synced with GSAP
   --------------------------------------------------------- */
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

const navOffset = () => -(($('.nav')?.offsetHeight || 70) + 16);
function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { offset: navOffset(), duration: 1.4 });
  else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + navOffset(), behavior: reduced ? 'auto' : 'smooth' });
}
function scrollToTop(instant = false) {
  if (lenis) lenis.scrollTo(0, { immediate: instant, duration: 1.2 });
  else window.scrollTo({ top: 0, behavior: instant || reduced ? 'auto' : 'smooth' });
}

/* ---------------------------------------------------------
   Pages (hash routes): #einladung, #nghivan, #unterkunft,
   #anreise, #bridal-party, #rsvp — only one is shown at a time.
   --------------------------------------------------------- */
const PAGES = ['einladung', 'nghivan', 'unterkunft', 'anreise', 'bridal-party', 'rsvp'];
const PAGE_LABEL = { einladung: 'nav.1', nghivan: 'nav.2', unterkunft: 'nav.3', anreise: 'nav.4', 'bridal-party': 'nav.5', rsvp: 'nav.6' };
const ALIASES = { '': 'einladung', top: 'einladung', home: 'einladung', story: 'nghivan' };
let currentPage = null;

function resolveHash(hash) {
  const id = decodeURIComponent(String(hash).replace(/^#/, ''));
  if (PAGES.includes(id)) return { page: id };
  if (id in ALIASES) return { page: ALIASES[id] };
  const el = document.getElementById(id);
  const host = el?.closest('main [data-page]');
  if (host) return { page: host.dataset.page, anchor: el };
  return { page: 'einladung' };
}

function markActive(page) {
  $$('.nav__links a, .nav__cta, .menu a').forEach((a) => {
    const on = a.getAttribute('href') === `#${page}`;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}

function renderPager() {
  const pager = $('[data-pager]');
  if (!pager) return;
  const i = PAGES.indexOf(currentPage);
  const next = PAGES[i + 1];
  if (!next) { pager.hidden = true; pager.innerHTML = ''; return; }
  pager.hidden = false;
  pager.innerHTML = `<a class="pager__link" href="#${next}"><small>${t('js.next')}</small><b>${t(PAGE_LABEL[next])}</b><span aria-hidden="true">→</span></a>`;
}

function showPage(page, { anchor } = {}) {
  if (page !== currentPage) {
    // Only the page wrappers inside <main> — never <html>, which carries data-current-page.
    $$('main [data-page]').forEach((p) => { p.hidden = p.dataset.page !== page; });
    currentPage = page;
    root.dataset.currentPage = page;
    markActive(page);
    renderPager();
    scrollToTop(true);
    ScrollTrigger.refresh();
    window.dispatchEvent(new CustomEvent('pagechange', { detail: { page } }));
  }
  if (anchor) requestAnimationFrame(() => scrollToTarget(anchor));
}

window.addEventListener('hashchange', () => {
  const r = resolveHash(location.hash);
  setMenu(false);
  showPage(r.page, r);
});

/* ---------------------------------------------------------
   Navigation: mobile menu, hide on scroll
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

// Same-hash clicks don't fire `hashchange` → handle them here.
document.addEventListener('click', (e) => {
  const top = e.target.closest('[data-scroll-top]');
  if (top) { e.preventDefault(); scrollToTop(); return; }
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const hash = a.getAttribute('href');
  if (hash !== location.hash) { setMenu(false); return; } // hashchange will handle it
  e.preventDefault();
  setMenu(false);
  const r = resolveHash(hash);
  if (r.page !== currentPage) showPage(r.page, r);
  else if (r.anchor) scrollToTarget(r.anchor);
  else scrollToTop();
});

let lastY = 0;
function onScroll() {
  const y = window.scrollY;
  const past = y > 260;
  nav.classList.toggle('is-scrolled', y > 10);
  nav.classList.toggle('is-hidden', past && y > lastY + 2 && !document.body.classList.contains('menu-open'));
  if (y < lastY - 2 || !past) nav.classList.remove('is-hidden');
  lastY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

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
   Intro: (loader →) hero reveal
   --------------------------------------------------------- */
function splitChars(el) {
  const text = el.textContent;
  el.innerHTML = [...text].map((c) => `<span class="char" aria-hidden="true">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
}
$$('[data-split]').forEach(splitChars);

function heroIn(tl, at) {
  tl.to('.hero__line .char', { yPercent: 0, duration: 1.3, stagger: 0.035 }, at)
    .to('[data-hero-amp]', { opacity: 1, scale: 1, duration: 1.3 }, '<0.3')
    .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1.1, stagger: 0.09 }, '<0.1');
}

function intro({ withLoader }) {
  const loader = $('.loader');
  if (reduced || currentPage !== 'einladung') { loader?.remove(); return; }

  gsap.set('.hero__line .char', { yPercent: 115 });
  gsap.set('[data-hero-amp]', { opacity: 0, scale: 0.7 });
  gsap.set('[data-hero-fade]', { opacity: 0, y: 24 });

  if (!withLoader) {
    loader?.remove();
    heroIn(gsap.timeline({ defaults: { ease: 'expo.out' } }), 0.1);
    return;
  }

  document.body.classList.add('is-loading');
  lenis?.stop();
  const tl = gsap.timeline({
    defaults: { ease: 'expo.out' },
    onComplete: () => { document.body.classList.remove('is-loading'); lenis?.start(); },
  });
  tl.from('.loader__mono > *', { yPercent: 110, duration: 1.1, stagger: 0.12 })
    .from('.loader__date', { opacity: 0, letterSpacing: '1em', duration: 1.2 }, '<0.3')
    .to('.loader__inner', { opacity: 0, y: -30, duration: 0.6, ease: 'power2.in' }, '+=0.3')
    .to(loader, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '-=0.1')
    .set(loader, { display: 'none' });
  heroIn(tl, '<0.2');
}

/* ---------------------------------------------------------
   Reveals (IntersectionObserver works for pages that are
   shown later, unlike pre-computed scroll positions)
   --------------------------------------------------------- */
function initReveals() {
  if (reduced) return;
  const io = new IntersectionObserver((entries) => {
    const hits = entries.filter((e) => e.isIntersecting).map((e) => e.target);
    if (!hits.length) return;
    hits.forEach((el) => io.unobserve(el));

    const text = hits.filter((el) => el.hasAttribute('data-reveal') && el.dataset.reveal !== 'clip');
    if (text.length) gsap.to(text, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, overwrite: true });

    hits.filter((el) => el.hasAttribute('data-reveal-group')).forEach((g) => {
      gsap.to(g.children, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07 });
    });

    hits.filter((el) => el.dataset.reveal === 'clip').forEach((el) => {
      const img = $('img', el);
      const tl = gsap.timeline();
      tl.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut' });
      if (img) tl.from(img, { scale: 1.3, duration: 1.9, ease: 'expo.out' }, 0.2);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  $$('[data-reveal], [data-reveal-group]').forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------
   Scroll-linked effects
   --------------------------------------------------------- */
function scrollEffects() {
  if (reduced) return;

  // Parallax images
  $$('[data-parallax]').forEach((img) => {
    const p = parseFloat(img.dataset.parallax) * 60;
    gsap.fromTo(img, { yPercent: -p }, {
      yPercent: p, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // NGHIVAN letters converge whenever the page is opened
  window.addEventListener('pagechange', ({ detail }) => {
    if (detail.page !== 'nghivan') return;
    gsap.fromTo('.story__title span',
      { yPercent: (i) => (i % 2 ? 60 : -60), opacity: 0, rotate: (i) => (i % 2 ? 6 : -6) },
      { yPercent: 0, opacity: 1, rotate: 0, duration: 1.4, ease: 'expo.out', stagger: 0.05, delay: 0.1 });
  });

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
   Tabs (+ elements shown only for some tabs, e.g. rental car tip)
   --------------------------------------------------------- */
function initTabs() {
  const wrap = $('[data-tabs]');
  if (!wrap) return;
  const tabs = $$('[role="tab"]', wrap);
  const ink = $('.tabs__ink', wrap);
  const onlyFor = $$('[data-tabs-only]');

  const moveInk = (tab) => {
    if (!tab.offsetWidth) return;
    ink.style.width = `${tab.offsetWidth}px`;
    ink.style.transform = `translateX(${tab.offsetLeft}px)`;
  };

  const select = (tab, focus = false) => {
    const panelId = tab.getAttribute('aria-controls');
    tabs.forEach((x) => {
      const on = x === tab;
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
      $(`#${x.getAttribute('aria-controls')}`).hidden = !on;
    });
    onlyFor.forEach((el) => { el.hidden = !el.dataset.tabsOnly.split(/\s+/).includes(panelId); });
    moveInk(tab);
    if (focus) tab.focus();
    ScrollTrigger.refresh();
    // reveal anything inside the newly shown panel
    $$('[data-reveal]', $(`#${panelId}`)).forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
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

  const current = () => tabs.find((x) => x.getAttribute('aria-selected') === 'true');
  window.addEventListener('resize', () => moveInk(current()));
  window.addEventListener('langchange', () => moveInk(current()));
  window.addEventListener('pagechange', () => requestAnimationFrame(() => moveInk(current())));
  document.fonts?.ready.then(() => moveInk(current()));
  select(current());
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
   Area carousel: arrows, counter, mouse drag
   --------------------------------------------------------- */
let carouselDragged = false;
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
  let down = false, startX = 0, startLeft = 0;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; carouselDragged = false; startX = e.clientX; startLeft = track.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) { carouselDragged = true; track.classList.add('is-dragging'); }
    track.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    track.classList.remove('is-dragging');
    if (carouselDragged) {
      const i = Math.round(track.scrollLeft / step());
      track.scrollTo({ left: i * step(), behavior: 'smooth' });
    }
  });
  track.addEventListener('click', (e) => {
    if (carouselDragged) { e.preventDefault(); e.stopPropagation(); carouselDragged = false; }
  }, true);
}

/* ---------------------------------------------------------
   Lightbox: image carousel for places
   --------------------------------------------------------- */
function initLightbox() {
  const lb = $('.lightbox');
  if (!lb) return;
  const img = $('[data-lb-img]', lb);
  const title = $('[data-lb-title]', lb);
  const count = $('[data-lb-count]', lb);
  const dots = $('[data-lb-dots]', lb);
  const prev = $('[data-lb-prev]', lb);
  const next = $('[data-lb-next]', lb);
  let images = [], index = 0, name = '';

  const render = (dir = 0) => {
    const n = images.length;
    img.src = images[index];
    img.alt = `${name} – ${index + 1}/${n}`;
    title.textContent = name;
    count.textContent = n > 1 ? `${index + 1} / ${n}` : '';
    prev.hidden = next.hidden = n < 2;
    dots.innerHTML = n > 1 ? images.map((_, i) => `<button type="button" data-lb-go="${i}" aria-label="${i + 1}"${i === index ? ' aria-current="true"' : ''}></button>`).join('') : '';
    if (dir && !reduced) gsap.fromTo(img, { opacity: 0, x: dir * 40 }, { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out' });
  };
  const go = (i, dir) => { index = (i + images.length) % images.length; render(dir); };

  const open = (slug, label) => {
    images = galleryImages(slug);
    if (!images.length) return;
    index = 0; name = label;
    render();
    lb.showModal();
    lenis?.stop();
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-gallery]');
    if (!trigger) return;
    e.preventDefault();
    open(trigger.dataset.openGallery, trigger.dataset.title || '');
  });
  prev.addEventListener('click', () => go(index - 1, -1));
  next.addEventListener('click', () => go(index + 1, 1));
  dots.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lb-go]');
    if (b) { const i = Number(b.dataset.lbGo); go(i, i > index ? 1 : -1); }
  });
  $('[data-lb-close]', lb).addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener('close', () => lenis?.start());
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(index + 1, 1);
    if (e.key === 'ArrowLeft') go(index - 1, -1);
  });

  // swipe
  let sx = null;
  const stage = $('[data-lb-stage]', lb);
  stage.addEventListener('pointerdown', (e) => { sx = e.clientX; });
  stage.addEventListener('pointerup', (e) => {
    if (sx == null) return;
    const dx = e.clientX - sx; sx = null;
    if (Math.abs(dx) > 40 && images.length > 1) go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  });
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
   Language switcher (nav dropdown + mobile menu)
   --------------------------------------------------------- */
const showCurrentFlag = () => $$('[data-flag-current]').forEach((el) => { el.innerHTML = FLAGS[getLang()] || ''; });

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
    renderVisited();
    renderPager();
    showCurrentFlag();
    ScrollTrigger.refresh();
  });
  showCurrentFlag();
}

/* ---------------------------------------------------------
   Language picker (shown after login / on first visit)
   --------------------------------------------------------- */
function initLangPicker(done) {
  const pick = $('#langpick');
  if (!root.classList.contains('needs-lang')) { pick?.remove(); done(false); return; }

  lenis?.stop();
  const buttons = $$('[data-pick-lang]', pick);
  requestAnimationFrame(() => buttons[0]?.focus({ preventScroll: true }));
  if (!reduced) gsap.from(buttons, { opacity: 0, y: 18, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.15 });

  buttons.forEach((b) => b.addEventListener('click', async () => {
    buttons.forEach((x) => { x.disabled = true; });
    b.classList.add('is-active');
    await setLang(b.dataset.pickLang);
    const url = new URL(location.href);
    url.searchParams.delete('chooselang');
    history.replaceState(null, '', url);
    pick.classList.add('is-leaving');
    setTimeout(() => {
      root.classList.remove('needs-lang');
      pick.remove();
      lenis?.start();
      done(true);
    }, reduced ? 0 : 650);
  }));
}

/* ---------------------------------------------------------
   Boot
   --------------------------------------------------------- */
const first = resolveHash(location.hash);
showPage(first.page);

initTabs();
initDetails();
initCarousel();
initLightbox();
initCopy();
initLangSwitch();
initReveals();
scrollEffects();

initLangPicker((picked) => {
  if (picked) { intro({ withLoader: false }); return; }
  // Initial language (URL ?lang= > saved choice > browser language > German)
  const initialLang = detectLang();
  if (initialLang !== 'de') setLang(initialLang, { persist: false });
  intro({ withLoader: true });
});

window.addEventListener('load', () => ScrollTrigger.refresh());

// Honour deep links to anchors inside a page (e.g. /#willkommen)
if (first.anchor) setTimeout(() => scrollToTarget(first.anchor), reduced ? 0 : 2400);

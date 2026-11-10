// Small inline SVG flags (emoji flags don't render on Windows).
// Rendered as circles via CSS (.flag), so each is drawn on a square viewBox.

const star = (cx, cy, r) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const rad = (Math.PI / 5) * i - Math.PI / 2;
    const len = i % 2 ? r * 0.382 : r;
    pts.push(`${(cx + len * Math.cos(rad)).toFixed(2)},${(cy + len * Math.sin(rad)).toFixed(2)}`);
  }
  return pts.join(' ');
};

// Croatian chequy shield (simplified 5×5)
const chequy = (() => {
  let s = '';
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
    s += `<rect x="${11 + c * 2}" y="${10 + r * 2}" width="2" height="2" fill="${(r + c) % 2 ? '#fff' : '#E4002B'}"/>`;
  }
  return s;
})();

export const FLAGS = {
  de: '<svg viewBox="0 0 32 32"><path fill="#000" d="M0 0h32v11H0z"/><path fill="#D00" d="M0 11h32v10H0z"/><path fill="#FFCE00" d="M0 21h32v11H0z"/></svg>',
  vi: `<svg viewBox="0 0 32 32"><path fill="#DA251D" d="M0 0h32v32H0z"/><polygon fill="#FF0" points="${star(16, 16.6, 9)}"/></svg>`,
  hr: `<svg viewBox="0 0 32 32"><path fill="#FF0000" d="M0 0h32v11H0z"/><path fill="#fff" d="M0 11h32v10H0z"/><path fill="#171796" d="M0 21h32v11H0z"/><path fill="#fff" d="M10.5 9.5h11v7.5c0 3.4-2.5 5.6-5.5 6.5-3-.9-5.5-3.1-5.5-6.5z"/>${chequy}</svg>`,
  en: '<svg viewBox="0 0 32 32"><path fill="#012169" d="M0 0h32v32H0z"/><path stroke="#fff" stroke-width="6" d="M0 0l32 32M32 0L0 32"/><path stroke="#C8102E" stroke-width="2.4" d="M0 0l32 32M32 0L0 32"/><path stroke="#fff" stroke-width="10" d="M16 0v32M0 16h32"/><path stroke="#C8102E" stroke-width="6" d="M16 0v32M0 16h32"/></svg>',
  fr: '<svg viewBox="0 0 32 32"><path fill="#0055A4" d="M0 0h11v32H0z"/><path fill="#fff" d="M11 0h10v32H11z"/><path fill="#EF4135" d="M21 0h11v32H21z"/></svg>',
};

/** Fill every <span data-flag="xx"> with its flag SVG. */
export function renderFlags(root = document) {
  root.querySelectorAll('[data-flag]').forEach((el) => {
    const svg = FLAGS[el.dataset.flag];
    if (svg) el.innerHTML = svg;
  });
}

// Renderiza la web a partir de data.js y añade las interacciones — no hace falta tocar este archivo.

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ACCENT = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#d4ff3a";
const clamp01 = v => Math.max(0, Math.min(1, v));

function toast(text) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = text;
  $(".toasts").replaceChildren(t);
  setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 300); }, 1800);
}

/* Iconos de línea */
const ICON = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20 11.6A8.4 8.4 0 0 1 7.6 19L3.5 20.3l1.4-4A8.4 8.4 0 1 1 20 11.6z"/><path d="M9 8.5c.3 2.6 2.4 5.3 5.6 6.1l1-1.2-1.6-.9-.8.7c-1-.4-2.1-1.4-2.5-2.5l.7-.8-.9-1.6z" fill="currentColor" stroke="none"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
  trabajos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12h18"/></svg>',
  web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M6.5 6.5h.01M9 6.5h.01"/><path d="M7 13h6M7 16h4"/></svg>',
  campana: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1z"/><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  redes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M12 16.5s-2.8-1.6-2.8-3.4a1.5 1.5 0 0 1 2.8-.8 1.5 1.5 0 0 1 2.8.8c0 1.8-2.8 3.4-2.8 3.4z" fill="currentColor" stroke="none"/></svg>',
  marca: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m12 3 7 4v10l-7 4-7-4V7z"/><path d="m12 3v18M5 7l7 4 7-4"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="6" width="13" height="12" rx="3"/><path d="m16 10.5 5-3v9l-5-3z"/></svg>',
  estrategia: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
};

/* =========================================================
   Perfil + inicio
   ========================================================= */
$$("[data-perfil]").forEach(el => (el.textContent = PERFIL[el.dataset.perfil] ?? ""));
$("#year").textContent = new Date().getFullYear();
const tel = String(PERFIL.telefono || "").replace(/\D/g, "");
const redUrl = n => REDES.find(r => r.nombre.toLowerCase() === n && r.url)?.url;

const name = $("[data-split]");
name.innerHTML = PERFIL.nombre.split(" ").map(word =>
  `<span class="w">${[...word].map((c, i) => `<span class="ch" style="transition-delay:${i * 35}ms">${esc(c)}</span>`).join("")}</span>`
).join(" ");
const heroWords = $$(".w", name);

const photo = $(".photo img");
photo.addEventListener("error", () => photo.classList.add("missing"));
if (PERFIL.foto) photo.src = PERFIL.foto; else photo.classList.add("missing");

const words = PERFIL.palabras?.length ? PERFIL.palabras : ["ven"];
const rot = $(".rot-word");
rot.textContent = words[0] + ".";
let wi = 0;
if (!reduced && words.length > 1) setInterval(() => {
  rot.classList.add("out");
  setTimeout(() => {
    wi = (wi + 1) % words.length;
    rot.textContent = words[wi] + ".";
    rot.classList.remove("out"); rot.classList.add("pre");
    void rot.offsetWidth;
    rot.classList.remove("pre");
  }, 450);
}, 2200);

// Entrada: la foto empieza ocupando toda la pantalla (centrada en la cara) y se encoge hasta su sitio
const flip = $(".hero-flip");
function coverScreen() {
  flip.style.transition = "none";
  flip.style.transform = "";
  const r = flip.getBoundingClientRect();
  const fy = 0.32;
  const s = Math.max(innerWidth / r.width, innerHeight / (2 * fy * r.height)) * 1.02;
  flip.style.transformOrigin = `50% ${fy * 100}%`;
  flip.style.transform = `translate(${innerWidth / 2 - (r.left + r.width / 2)}px, ${innerHeight / 2 - (r.top + r.height * fy)}px) scale(${s})`;
}
if (!reduced) coverScreen();
function startHero() {
  $(".photo").classList.add("in");
  setTimeout(() => { flip.style.transition = "transform 1.5s cubic-bezier(.7,0,.2,1)"; flip.style.transform = ""; }, reduced ? 0 : 550);
  setTimeout(() => $(".hero").classList.add("ready"), reduced ? 0 : 1400);
  setTimeout(() => name.classList.add("in"), reduced ? 0 : 1450);
  setTimeout(spawnBubbles, reduced ? 0 : 1900);
}
(function intro() {
  const loader = $(".loader");
  if (reduced) { loader.remove(); startHero(); return; }
  document.body.classList.add("loading");
  const count = $(".loader-count");
  const t0 = performance.now();
  (function tick(now) {
    const p = Math.min((now - t0) / 1100, 1);
    count.textContent = Math.round(100 * (1 - Math.pow(1 - p, 3)));
    if (p < 1) return requestAnimationFrame(tick);
    loader.classList.add("done");
    document.body.classList.remove("loading");
    startHero();
    setTimeout(() => loader.remove(), 1100);
  })(t0);
})();

/* =========================================================
   Burbujas: flotan, rebotan, esquivan el ratón y se pueden lanzar
   ========================================================= */
const BUBBLE_DEF = {
  instagram: () => redUrl("instagram") && { label: "Instagram", href: redUrl("instagram"), ext: true },
  tiktok: () => redUrl("tiktok") && { label: "TikTok", href: redUrl("tiktok"), ext: true },
  linkedin: () => redUrl("linkedin") && { label: "LinkedIn", href: redUrl("linkedin"), ext: true },
  whatsapp: () => tel && { label: "WhatsApp", href: `https://wa.me/34${tel}`, ext: true },
  email: () => PERFIL.email && { label: "Email", copy: PERFIL.email },
  trabajos: () => ({ label: "Trabajos", href: "#trabajos", accent: true }),
};
const hero = $(".hero");
const bubbleLayer = $(".bubbles");
const bubbles = [];

function spawnBubbles() {
  const small = innerWidth < 600;
  const defs = BURBUJAS.map(k => BUBBLE_DEF[k]?.() && { key: k, ...BUBBLE_DEF[k]() }).filter(Boolean);
  const W = hero.clientWidth, H = hero.clientHeight;
  defs.forEach((d, i) => {
    const el = document.createElement(d.href ? "a" : "button");
    el.className = `bubble b-${d.key}`;
    el.draggable = false;
    if (d.href) { el.href = d.href; if (d.ext) { el.target = "_blank"; el.rel = "noopener"; } }
    el.setAttribute("aria-label", d.label);
    el.innerHTML = `<span class="bubble-in">${ICON[d.key] || ""}</span><span class="b-label">${esc(d.label)}</span>`;
    const r = (small ? 23 : 28) + (i % 2) * 3;
    el.style.setProperty("--r", r + "px");
    // reparte las burbujas a los lados de la foto
    const left = i % 2 === 0;
    const x = left ? W * (0.08 + Math.random() * 0.17) : W * (0.75 + Math.random() * 0.17);
    const y = H * (0.24 + (i / defs.length) * 0.5);
    const b = { el, d, r, x, y, vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8, drag: false, hover: false, moved: 0 };
    bubbles.push(b);
    bubbleLayer.append(el);
    setTimeout(() => el.classList.add("on"), i * 110);
    // al pasar el ratón la burbuja se detiene para que sea fácil pulsarla
    el.addEventListener("pointerenter", () => (b.hover = true));
    el.addEventListener("pointerleave", () => (b.hover = false));
    attachDrag(b);
  });
}

function attachDrag(b) {
  let last = null;
  b.el.addEventListener("pointerdown", e => {
    b.drag = true; b.moved = 0; b.el.classList.add("drag");
    b.el.setPointerCapture(e.pointerId);
    last = { x: e.clientX, y: e.clientY, t: performance.now() };
  });
  b.el.addEventListener("pointermove", e => {
    if (!b.drag) return;
    const dx = e.clientX - last.x, dy = e.clientY - last.y, dt = Math.max(16, performance.now() - last.t);
    b.x += dx; b.y += dy; b.moved += Math.abs(dx) + Math.abs(dy);
    b.vx = dx / dt * 16; b.vy = dy / dt * 16;
    last = { x: e.clientX, y: e.clientY, t: performance.now() };
  });
  const end = () => { b.drag = false; b.el.classList.remove("drag"); };
  b.el.addEventListener("pointerup", end);
  b.el.addEventListener("pointercancel", end);
  b.el.addEventListener("click", async e => {
    if (b.moved > 8) { e.preventDefault(); return; } // fue un arrastre, no un clic
    if (b.d.copy) {
      try { await navigator.clipboard.writeText(b.d.copy); toast("Email copiado"); }
      catch { toast(b.d.copy); }
    }
  });
}


function stepBubbles() {
  if (!bubbles.length) return;
  const W = hero.clientWidth, H = hero.clientHeight;
  // la foto actúa como obstáculo en pantallas grandes
  const pr = innerWidth > 900 ? (() => { const a = $(".photo").getBoundingClientRect(), h = hero.getBoundingClientRect(); return { l: a.left - h.left, t: a.top - h.top, r: a.right - h.left, b: a.bottom - h.top }; })() : null;
  // zona libre: debajo de la insignia de la portada y encima del pie
  const top = $(".eyebrow").getBoundingClientRect().bottom - hero.getBoundingClientRect().top - 8, bottom = H - 70;
  for (const b of bubbles) {
    if (b.hover && !b.drag) { b.vx *= 0.5; b.vy *= 0.5; }
    else if (!b.drag) {
      // deriva lenta y tranquila; un lanzamiento se frena poco a poco
      b.vx += (Math.random() - 0.5) * 0.03; b.vy += (Math.random() - 0.5) * 0.03;
      const sp = Math.hypot(b.vx, b.vy);
      const damp = sp > 0.9 ? 0.96 : 0.995;
      b.vx *= damp; b.vy *= damp;
      if (sp > 12) { b.vx *= 12 / sp; b.vy *= 12 / sp; }
      b.x += b.vx; b.y += b.vy;
    }
    // bordes
    if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.8; }
    if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.8; }
    if (b.y < top + b.r) { b.y = top + b.r; b.vy = Math.abs(b.vy) * 0.8; }
    if (b.y > bottom - b.r) { b.y = bottom - b.r; b.vy = -Math.abs(b.vy) * 0.8; }
    // obstáculo: la foto
    if (pr && !b.drag) {
      const cx = Math.max(pr.l, Math.min(b.x, pr.r)), cy = Math.max(pr.t, Math.min(b.y, pr.b));
      const ox = b.x - cx, oy = b.y - cy, od = Math.hypot(ox, oy);
      if (od < b.r) {
        if (od === 0) { b.x = b.x < (pr.l + pr.r) / 2 ? pr.l - b.r : pr.r + b.r; }
        else { b.x = cx + ox / od * b.r; b.y = cy + oy / od * b.r; const dot = b.vx * ox / od + b.vy * oy / od; if (dot < 0) { b.vx -= 1.8 * dot * ox / od; b.vy -= 1.8 * dot * oy / od; } }
      }
    }
  }
  // choques entre burbujas
  for (let i = 0; i < bubbles.length; i++) for (let j = i + 1; j < bubbles.length; j++) {
    const a = bubbles[i], c = bubbles[j];
    const dx = c.x - a.x, dy = c.y - a.y, d = Math.hypot(dx, dy), min = a.r + c.r + 4;
    if (d < min && d > 0) {
      const nx = dx / d, ny = dy / d, push = (min - d) / 2;
      if (!a.drag) { a.x -= nx * push; a.y -= ny * push; }
      if (!c.drag) { c.x += nx * push; c.y += ny * push; }
      const rel = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
      if (rel < 0) { a.vx += rel * nx; a.vy += rel * ny; c.vx -= rel * nx; c.vy -= rel * ny; }
    }
  }
  for (const b of bubbles) b.el.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px)`;
}

/* =========================================================
   Capítulos desplegables
   ========================================================= */
const COUNTS = {
  trabajos: () => `${TRABAJOS.length} proyectos`,
  servicios: () => `${SERVICIOS.length} servicios`,
  estilo: () => `${POSTS.filter(p => p.imagen).length + ROPA.length + DISENOS.length} fotos`,
  redes: () => REDES.filter(r => r.url).map(r => r.nombre).join(" · "),
  habilidades: () => `${HABILIDADES.length} herramientas`,
};
$$("[data-count-of]").forEach(el => (el.textContent = COUNTS[el.dataset.countOf]?.() || ""));
function setChapter(ch, open) {
  ch.classList.toggle("open", open);
  $(".chapter-head", ch).setAttribute("aria-expanded", open);
}
$$(".chapter-head").forEach(h => h.addEventListener("click", () => {
  const ch = h.closest(".chapter");
  setChapter(ch, !ch.classList.contains("open"));
}));
// los enlaces a un capítulo lo abren antes de llegar
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]');
  const ch = a && document.getElementById(a.getAttribute("href").slice(1));
  if (ch?.classList.contains("chapter")) setChapter(ch, true);
});
if (location.hash) { const ch = document.getElementById(location.hash.slice(1)); if (ch?.classList.contains("chapter")) setChapter(ch, true); }

/* =========================================================
   Sobre mí
   ========================================================= */
const statement = $("[data-words]");
statement.innerHTML = PERFIL.bio.split(" ").map(w => `<span>${esc(w)}</span> `).join("");
const bioWords = $$("span", statement);

/* =========================================================
   Qué hago (bento)
   ========================================================= */
$(".bento").innerHTML = SERVICIOS.map(sv => `
  <article class="tile service reveal${sv.grande ? " wide" : ""}">
    <span class="service-icon">${ICON[sv.icono] || ICON.estrategia}</span>
    <h3>${esc(sv.titulo)}</h3>
    <p>${esc(sv.texto)}</p>
    <div class="service-tags">${(sv.tags || []).map(x => `<span>${esc(x)}</span>`).join("")}</div>
  </article>`).join("");

/* =========================================================
   Trabajos
   ========================================================= */
// Visor: las páginas de cada trabajo se recorren con scroll dentro de su recuadro
const coverHTML = t => t.imagen ? `<img src="${esc(t.imagen)}" alt="${esc(t.titulo)}" loading="lazy" />` : "";
function viewerHTML(t) {
  const pagina = t.email || t.web;
  if (pagina) return `
    <div class="viewer v-${t.web ? "web" : "email"}" tabindex="0" aria-label="${esc(t.titulo)}: desliza para verlo entero">
      <iframe class="v-frame" src="${esc(pagina)}" title="${esc(t.titulo)}" scrolling="no" loading="lazy"></iframe>
    </div>
    <div class="viewer-ui" aria-hidden="true"><span class="v-count">${t.web ? "Web interactiva" : "Email completo"}</span><span class="v-hint">Desliza ↓</span></div>
    <div class="v-bar" aria-hidden="true"><i></i></div>`;
  if (!t.paginas?.length) return `<div class="case-media-inner">${coverHTML(t)}</div>`;
  const slides = t.tipoVisor !== "email";
  return `
    <div class="viewer v-${slides ? "slides" : "email"}" tabindex="0" aria-label="${esc(t.titulo)}: desliza para ver el trabajo">
      <div class="viewer-track">${t.paginas.map((src, j) => `<img src="${esc(src)}" alt="${esc(t.titulo)} · ${slides ? "diapositiva" : "parte"} ${j + 1}" loading="lazy" draggable="false" />`).join("")}</div>
    </div>
    <div class="viewer-ui" aria-hidden="true">
      <span class="v-count">${slides ? `1 / ${t.paginas.length}` : "Email completo"}</span>
      <span class="v-hint">Desliza ↓</span>
    </div>
    <div class="v-bar" aria-hidden="true"><i></i></div>`;
}
function bindViewer(root) {
  const v = $(".viewer", root);
  if (!v) return;
  const imgs = $$("img", v), count = $(".v-count", root), bar = $(".v-bar i", root), slides = v.classList.contains("v-slides");
  const update = () => {
    const max = v.scrollHeight - v.clientHeight;
    bar.style.transform = `scaleY(${max > 0 ? v.scrollTop / max : 1})`;
    if (v.scrollTop > 8) root.classList.add("scrolled");
    if (slides) {
      const mid = v.scrollTop + v.clientHeight / 2;
      let idx = 0; imgs.forEach((im, j) => { if (im.offsetTop <= mid) idx = j; });
      count.textContent = `${idx + 1} / ${imgs.length}`;
    }
  };
  v.addEventListener("scroll", update, { passive: true });
  imgs.forEach(im => im.addEventListener("load", update));
  // Email o web en HTML: el marco crece hasta el alto de la página y se recorre con el scroll del recuadro
  const frame = $(".v-frame", v);
  if (frame) frame.addEventListener("load", () => {
    try {
      const doc = frame.contentDocument.documentElement;
      doc.style.overflow = "hidden";
      // Los enlaces internos (#alta…) desplazan el recuadro, no la página de dentro
      frame.contentDocument.addEventListener("click", e => {
        const a = e.target.closest('a[href^="#"]');
        const dest = a && a.getAttribute("href").length > 1 && frame.contentDocument.querySelector(a.getAttribute("href"));
        if (!dest) return;
        e.preventDefault();
        v.scrollTo({ top: frame.offsetTop + dest.getBoundingClientRect().top, behavior: "smooth" });
      });
      const fit = () => { frame.style.height = doc.scrollHeight + "px"; update(); };
      new ResizeObserver(fit).observe(frame.contentDocument.body);
      fit();
    } catch { frame.classList.add("v-frame-own"); }
  });
  update();
}

const cases = $(".cases");
cases.innerHTML = TRABAJOS.map((t, i) => `
  <article class="tile case reveal">
    <div class="case-media">
      ${viewerHTML(t)}
      <button class="v-expand" data-open="${i}" aria-label="Ampliar ${esc(t.titulo)}" data-hover="Ampliar">⤢</button>
    </div>
    <div class="case-info">
      <span class="case-kicker">Trabajo realizado · ${esc(t.categoria || "")}</span>
      <h3>${esc(t.titulo)}${t.cliente ? `<small>${esc(t.cliente)}</small>` : ""}</h3>
      <p class="case-desc">${esc(t.descripcion)}</p>
      <div class="case-actions">
        <button class="pill pill-solid" data-open="${i}" data-hover>Ver en grande</button>
        ${t.enlace ? `<a class="pill" href="${esc(t.enlace)}" target="_blank" rel="noopener" data-hover>En vivo ↗</a>` : ""}
      </div>
    </div>
  </article>`).join("");
$$(".case-media", cases).forEach(bindViewer);

const modal = $(".modal");
cases.addEventListener("click", e => {
  const opener = e.target.closest("[data-open]");
  if (!opener) return;
  const t = TRABAJOS[opener.dataset.open];
  const cover = $(".modal-cover", modal);
  cover.className = "modal-cover" + (t.paginas?.length || t.email || t.web ? " has-viewer" : "");
  cover.innerHTML = viewerHTML(t);
  bindViewer(cover);
  $(".modal-cat", modal).textContent = ["Trabajo realizado", t.cliente].filter(Boolean).join(" · ");
  $("#modal-title").textContent = t.titulo;
  $(".modal-desc", modal).textContent = t.descripcion;
  const link = $(".modal-link", modal);
  link.hidden = !t.enlace;
  if (t.enlace) link.href = t.enlace;
  modal.showModal();
  $(".viewer", cover)?.focus({ preventScroll: true });
});
$(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

/* =========================================================
   Estilo
   ========================================================= */
$(".style-text").textContent = ESTILO.texto;
$(".style-tags").innerHTML = ESTILO.etiquetas.map(x => `<li>${esc(x)}</li>`).join("");
const ig = REDES.find(r => r.nombre === "Instagram" && r.url);
const subLink = $(".sub-link");
if (ig) { subLink.href = ig.url; subLink.textContent = `${ig.usuario} ↗`; } else subLink.remove();

// Galería por pestañas: looks, ropa que hago y diseños. Carrusel con arrastre y vista ampliada.
const GALERIA = [
  { id: "looks", nombre: "Looks", items: POSTS.filter(p => p.imagen).map(p => ({ imagen: p.imagen, titulo: p.texto, tipo: p.red, enlace: p.enlace })) },
  { id: "ropa", nombre: "Mi ropa", items: ROPA },
  { id: "disenos", nombre: "Diseños", items: DISENOS },
].filter(g => g.items.length);
const gal = $(".gal"), rail = $(".gal-rail"), galCount = $(".gal-count");
let galActual = GALERIA[0];

$(".gal-tabs").insertAdjacentHTML("beforeend", GALERIA.map((g, i) => `
  <button class="gal-tab" role="tab" aria-selected="${i === 0}" data-gal="${g.id}" data-hover>${esc(g.nombre)} <small>${g.items.length}</small></button>`).join(""));
const mediaHTML = (it, enRail) => it.video
  ? `<video src="${esc(it.video)}" ${it.poster ? `poster="${esc(it.poster)}"` : ""} muted loop playsinline ${enRail ? 'preload="metadata"' : "autoplay controls"}></video>`
  : `<img src="${esc(it.imagen)}" alt="${esc(it.titulo || "")}" ${enRail ? 'loading="lazy"' : ""} draggable="false" />`;

const vidIO = new IntersectionObserver(en => en.forEach(e => e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause()), { threshold: 0.5 });
function renderGal(g) {
  galActual = g;
  $$(".gal-tab").forEach(b => b.setAttribute("aria-selected", b.dataset.gal === g.id));
  galInd();
  rail.innerHTML = g.items.map((it, i) => `
    <figure class="gal-item${it.video ? " is-video" : ""}" style="--i:${i}" data-i="${i}" data-hover="Ampliar">
      ${mediaHTML(it, true)}
      <figcaption><b>${esc(it.titulo || "")}</b><span>${esc(it.tipo || "")}</span></figcaption>
    </figure>`).join("");
  rail.scrollLeft = 0;
  $$("video", rail).forEach(v => vidIO.observe(v));
  galUpdate();
}
function galInd() {
  const tab = $(`.gal-tab[data-gal="${galActual.id}"]`), ind = $(".gal-ind");
  ind.style.width = tab.offsetWidth + "px";
  ind.style.transform = `translateX(${tab.offsetLeft}px)`;
}
if (galActual) new ResizeObserver(() => { galInd(); galUpdate(); }).observe($(".gal-tabs"));
function galStep() { const it = $(".gal-item", rail); return it ? it.offsetWidth + parseFloat(getComputedStyle(rail).columnGap || 0) : 300; }
function galUpdate() {
  const n = galActual.items.length, step = galStep();
  const i = Math.min(n, Math.round(rail.scrollLeft / step) + 1);
  const max = rail.scrollWidth - rail.clientWidth;
  galCount.textContent = `${String(i).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
  $(".gal-prev").disabled = rail.scrollLeft <= 4;
  $(".gal-next").disabled = rail.scrollLeft >= max - 4;
  gal.classList.toggle("no-scroll", max <= 4);
}
$(".gal-tabs").addEventListener("click", e => {
  const b = e.target.closest(".gal-tab");
  if (!b || b.dataset.gal === galActual.id) return;
  rail.classList.add("swap");
  setTimeout(() => { renderGal(GALERIA.find(g => g.id === b.dataset.gal)); rail.classList.remove("swap"); }, 220);
});
$(".gal-prev").addEventListener("click", () => rail.scrollBy({ left: -galStep(), behavior: "smooth" }));
$(".gal-next").addEventListener("click", () => rail.scrollBy({ left: galStep(), behavior: "smooth" }));
rail.addEventListener("scroll", galUpdate, { passive: true });
rail.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") { e.preventDefault(); $(".gal-next").click(); }
  if (e.key === "ArrowLeft") { e.preventDefault(); $(".gal-prev").click(); }
});

// Arrastrar con el ratón; un clic sin arrastrar abre la vista ampliada
let drag = null, justDragged = false;
rail.addEventListener("pointerdown", e => {
  if (e.pointerType !== "mouse" || e.button !== 0) return;
  drag = { x: e.clientX, left: rail.scrollLeft, moved: false };
});
addEventListener("pointermove", e => {
  if (!drag) return;
  const dx = e.clientX - drag.x;
  if (!drag.moved && Math.abs(dx) > 5) { drag.moved = true; rail.classList.add("dragging"); }
  if (drag.moved) rail.scrollLeft = drag.left - dx;
});
addEventListener("pointerup", () => {
  if (!drag) return;
  if (drag.moved) {
    rail.classList.remove("dragging");
    const step = galStep();
    rail.scrollTo({ left: Math.round(rail.scrollLeft / step) * step, behavior: "smooth" });
    justDragged = true;
    setTimeout(() => { justDragged = false; });
  }
  drag = null;
});
rail.addEventListener("click", e => {
  if (justDragged) return;
  const f = e.target.closest(".gal-item");
  if (f) openLightbox(+f.dataset.i);
});

// Vista ampliada: flechas, teclado y deslizar con el dedo
const lb = $(".lightbox"), lbStage = $(".lb-stage");
let lbIndex = 0;
function showLightbox(i, dir = 0) {
  const items = galActual.items;
  lbIndex = (i + items.length) % items.length;
  const it = items[lbIndex];
  lbStage.innerHTML = mediaHTML(it, false);
  lbStage.style.setProperty("--dir", dir);
  lbStage.classList.remove("in"); void lbStage.offsetWidth; lbStage.classList.add("in");
  $(".lb-cap b", lb).textContent = it.titulo || "";
  $(".lb-cap span", lb).textContent = it.tipo || "";
  $(".lb-count", lb).textContent = `${lbIndex + 1} / ${items.length}`;
  lb.classList.toggle("single", items.length < 2);
}
function openLightbox(i) { showLightbox(i); lb.showModal(); }
$(".lb-prev").addEventListener("click", () => showLightbox(lbIndex - 1, -1));
$(".lb-next").addEventListener("click", () => showLightbox(lbIndex + 1, 1));
$(".lb-close").addEventListener("click", () => lb.close());
lb.addEventListener("click", e => { if (e.target === lb || e.target === lbStage) lb.close(); });
lb.addEventListener("close", () => { lbStage.innerHTML = ""; });
lb.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") showLightbox(lbIndex + 1, 1);
  if (e.key === "ArrowLeft") showLightbox(lbIndex - 1, -1);
});
let touchX = null;
lb.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) showLightbox(lbIndex + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  touchX = null;
});

if (GALERIA.length) renderGal(GALERIA[0]); else gal.remove();

/* =========================================================
   Redes: Instagram y TikTok en directo
   ========================================================= */
$$("[data-icon]").forEach(el => (el.innerHTML = ICON[el.dataset.icon] || ""));
const igRed = REDES.find(r => r.nombre === "Instagram");
const igTile = $(".ig-tile");
if (igRed?.url) {
  igTile.href = igRed.url;
  $(".ig-user").textContent = `${igRed.usuario} · ${igRed.texto || ""}`;
  const fotos = POSTS.filter(p => p.imagen).slice(0, 6).map(p => p.imagen);
  $(".ig-grid").innerHTML = fotos.map(f => `<img src="${esc(f)}" alt="" loading="lazy" />`).join("");
} else igTile.remove();

const ttRed = REDES.find(r => r.nombre === "TikTok");
const ttTile = $(".tt-tile");
const ttUser = (ttRed?.usuario || "").replace(/^@/, "");
if (ttRed?.url && ttUser) {
  $(".tt-link").href = ttRed.url;
  $(".tt-fallback").href = ttRed.url;
  $(".tt-user").textContent = ttRed.usuario;
  $(".tt-user-2").textContent = `${ttRed.usuario} · ${ttRed.texto || ""}`;
} else ttTile.remove();

let ttLoaded = false;
function loadTikTok() {
  if (ttLoaded || !ttUser) return;
  ttLoaded = true;
  const slot = $(".tt-embed");
  slot.innerHTML = `<blockquote class="tiktok-embed" cite="${esc(ttRed.url)}" data-unique-id="${esc(ttUser)}" data-embed-type="creator" style="max-width:780px;min-width:288px;"><section><a target="_blank" href="${esc(ttRed.url)}?refer=creator_embed">@${esc(ttUser)}</a></section></blockquote>`;
  const s = document.createElement("script");
  s.src = "https://www.tiktok.com/embed.js";
  s.async = true;
  // cuando TikTok pinta tu perfil, se oculta la tarjeta de respaldo
  const check = setInterval(() => { if ($("iframe", slot)) { ttTile.classList.add("live"); clearInterval(check); } }, 400);
  setTimeout(() => clearInterval(check), 15000);
  document.body.append(s);
}
if (ttTile.isConnected) new IntersectionObserver((en, obs) => { if (en[0].isIntersecting) { loadTikTok(); obs.disconnect(); } }, { rootMargin: "800px" }).observe(ttTile);

/* =========================================================
   Habilidades
   ========================================================= */
$(".skills").innerHTML = HABILIDADES.map(h => `
  <article class="tile skill reveal">
    <b><span data-to="${Number(h.nivel) || 0}">0</span><small>%</small></b>
    <h3>${esc(h.nombre)}</h3>
    <span>${esc(h.tipo)}</span>
    <div class="skill-bar"><i data-w="${Number(h.nivel) || 0}"></i></div>
  </article>`).join("");
$(".soft").innerHTML = "También: " + SOFT_SKILLS.map(s => `<span>${esc(s)}</span>`).join(" · ");

/* =========================================================
   Contacto
   ========================================================= */
const ctTitle = $("[data-proximity]");
ctTitle.innerHTML = [...ctTitle.textContent].map(c => `<span>${esc(c)}</span>`).join("");
const ctLetters = $$("span", ctTitle);

$(".tel-text").textContent = tel.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");
const wa = $(".wa");
if (tel) wa.href = `https://wa.me/34${tel}`; else { wa.remove(); $('[data-copy="telefono"]').remove(); }

$$("[data-copy]").forEach(btn => btn.addEventListener("click", async () => {
  const isTel = btn.dataset.copy === "telefono";
  try {
    await navigator.clipboard.writeText(isTel ? tel : PERFIL.email);
    toast(isTel ? "Teléfono copiado" : "Email copiado");
  } catch {
    const r = document.createRange(); r.selectNodeContents($("span", btn));
    getSelection().removeAllRanges(); getSelection().addRange(r);
    toast("Selecciónalo y cópialo");
  }
}));

/* =========================================================
   Contadores y aparición
   ========================================================= */
function countUp(el, to, suffix = "") {
  if (reduced) { el.textContent = to + suffix; return; }
  const start = performance.now();
  (function tick(now) {
    const p = Math.min((now - start) / 1300, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}
$('[data-count="trabajos"]').dataset.to = TRABAJOS.length;
$('[data-count="servicios"]').dataset.to = SERVICIOS.length;

const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    el.classList.add("in");
    $$("[data-w]", el).forEach(b => (b.style.width = b.dataset.w + "%"));
    $$("[data-to]", el).forEach(s => countUp(s, +s.dataset.to));
    if (el.matches("[data-to]")) countUp(el, +el.dataset.to);
    io.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
$$(".reveal, .stat b[data-count]").forEach(el => io.observe(el));

// Brillo que sigue al ratón dentro de cada tarjeta
document.addEventListener("pointermove", e => {
  const t = e.target.closest?.(".tile");
  if (!t) return;
  const r = t.getBoundingClientRect();
  t.style.setProperty("--mx", e.clientX - r.left + "px");
  t.style.setProperty("--my", e.clientY - r.top + "px");
});

/* =========================================================
   Scroll
   ========================================================= */
const bar = $(".progress i");
const stage = $(".hero-stage");
const nav = $(".nav");
const navLinks = $$(".nav-links a");
const sections = navLinks.map(a => $(a.getAttribute("href")));
let lastY = scrollY;

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  const dy = scrollY - lastY;
  if (dy > 4 && scrollY > 400) nav.classList.add("hidden");
  if (dy < -4) nav.classList.remove("hidden");
  lastY = scrollY;

  if (!reduced) {
    const hp = Math.min(scrollY / innerHeight, 1.2);
    stage.style.transform = `translateY(${hp * innerHeight * 0.18}px) scale(${1 - hp * 0.08})`;
    heroWords.forEach((w, i) => {
      const dir = heroWords.length === 1 ? 0 : (i / (heroWords.length - 1)) * 2 - 1;
      w.style.transform = `translateX(${dir * hp * 18}vw)`;
      w.style.opacity = 1 - hp * 0.9;
    });
  }

  const r = statement.getBoundingClientRect();
  const lit = Math.round(clamp01((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)) * bioWords.length);
  bioWords.forEach((w, i) => w.classList.toggle("lit", i < lit));

  let current = -1;
  sections.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) current = i; });
  navLinks.forEach((a, i) => a.classList.toggle("active", i === current));
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

const caseMedia = $$(".case-media");
(function loop() {
  if (!reduced) {
    const vh = innerHeight;
    if (hero.getBoundingClientRect().bottom > 0) stepBubbles();
    caseMedia.forEach(m => {
      const r = m.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0) return;
      const p = clamp01((vh - r.top) / (vh * 0.75));
      m.style.setProperty("--ci", ((1 - p) * 6) + "%");
      m.style.setProperty("--sc", 1.06 - p * 0.06);
    });
  } else if (bubbles.length) stepBubbles();
  requestAnimationFrame(loop);
})();

let lastW = innerWidth;
addEventListener("resize", () => { if (innerWidth !== lastW && galActual) { lastW = innerWidth; renderGal(galActual); } });

/* =========================================================
   Ratón: cursor, foto 3D y letras de contacto
   ========================================================= */
if (finePointer) {
  const cursor = $(".cursor");
  const label = $(".cursor-label");
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
  addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    const tr = ctTitle.getBoundingClientRect();
    if (tr.top < innerHeight && tr.bottom > 0) {
      ctLetters.forEach(l => {
        const r = l.getBoundingClientRect();
        const k = Math.max(0, 1 - Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2)) / 260);
        l.style.transform = `scaleY(${1 + k * 0.3}) translateY(${-k * 8}px)`;
        l.style.color = k > 0.55 ? ACCENT : "";
      });
    }
  });
  (function loop() {
    cx += (mx - cx) * 0.25; cy += (my - cy) * 0.25;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", e => {
    // Dentro de los trabajos se usa el cursor normal para no tapar el contenido
    cursor.classList.toggle("off", !!e.target.closest(".viewer"));
    const t = e.target.closest("[data-hover], .bubble");
    const text = t?.dataset.hover;
    cursor.classList.toggle("label", !!text);
    cursor.classList.toggle("big", !!t && !text);
    label.textContent = text || "";
  });
  const tilt = $("[data-tilt]");
  tilt.addEventListener("mousemove", e => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    tilt.style.setProperty("--ry", (x - 0.5) * 8 + "deg");
    tilt.style.setProperty("--rx", -(y - 0.5) * 8 + "deg");
    tilt.style.setProperty("--gx", x * 100 + "%");
    tilt.style.setProperty("--gy", y * 100 + "%");
  });
  tilt.addEventListener("mouseleave", () => { tilt.style.setProperty("--rx", "0deg"); tilt.style.setProperty("--ry", "0deg"); });
}

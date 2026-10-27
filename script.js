// Renderiza la web a partir de data.js y añade las interacciones — no hace falta tocar este archivo.
// Por si data.js es de una versión anterior sin colecciones
const COLS = typeof COLECCIONES !== "undefined" ? COLECCIONES.filter(c => c.piezas?.length) : [];
const N_PIEZAS = COLS.reduce((n, c) => n + c.piezas.length, 0);

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  moda: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.5a1.75 1.75 0 1 0-1.75-1.75"/><path d="M12 6.5v1.2L3.6 13.4a1.4 1.4 0 0 0 .8 2.6h15.2a1.4 1.4 0 0 0 .8-2.6L12 7.7"/></svg>',
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
   Enlaces de la portada
   ========================================================= */
const hero = $(".hero");
$(".hero-links").innerHTML = [
  redUrl("instagram") && `<a href="${esc(redUrl("instagram"))}" target="_blank" rel="noopener">Instagram</a>`,
  redUrl("tiktok") && `<a href="${esc(redUrl("tiktok"))}" target="_blank" rel="noopener">TikTok</a>`,
  PERFIL.email && `<a href="mailto:${esc(PERFIL.email)}">Email</a>`,
  `<a href="#trabajos">Trabajos</a>`,
].filter(Boolean).join("");

/* =========================================================
   Capítulos desplegables
   ========================================================= */
const COUNTS = {
  trabajos: () => `${TRABAJOS.length} proyectos`,
  servicios: () => `${SERVICIOS.length} formas de ayudarte`,
  estilo: () => `${POSTS.filter(p => p.imagen).length} outfits`,
  redes: () => REDES.filter(r => r.url).map(r => r.nombre).join(" · "),
  habilidades: () => `${HABILIDADES.length} herramientas`,
};
$$("[data-count-of]").forEach(el => (el.textContent = COUNTS[el.dataset.countOf]?.() || ""));
function setChapter(ch, open) {
  ch.classList.toggle("open", open);
  $(".chapter-head", ch).setAttribute("aria-expanded", open);
}
const irA = el => el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
$$(".chapter-head").forEach(h => h.addEventListener("click", () => {
  const ch = h.closest(".chapter");
  const abrir = !ch.classList.contains("open");
  setChapter(ch, abrir);
  // al abrir un capítulo que queda abajo, sube suavemente para leerlo entero
  if (abrir && h.getBoundingClientRect().top > innerHeight * 0.4) setTimeout(() => irA(ch), 120);
}));
// Enlaces internos: abren el capítulo que contiene el destino y llegan con un desplazamiento suave
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]');
  const id = a?.getAttribute("href").slice(1);
  const dest = id && document.getElementById(id);
  if (!dest) return;
  e.preventDefault();
  const ch = dest.closest(".chapter");
  const cerrado = ch && !ch.classList.contains("open");
  if (ch) setChapter(ch, true);
  setTimeout(() => irA(dest), cerrado && dest !== ch ? 420 : 0);
  history.replaceState(null, "", "#" + id);
});
if (location.hash) { const d = document.getElementById(location.hash.slice(1)); const ch = d?.closest(".chapter"); if (ch) setChapter(ch, true); }

/* =========================================================
   Sobre mí
   ========================================================= */
const statement = $("[data-words]");
statement.innerHTML = PERFIL.bio.split(" ").map(w => `<span>${esc(w)}</span> `).join("");
const bioWords = $$("span", statement);

/* =========================================================
   Qué hago (bento)
   ========================================================= */
$(".bento").innerHTML = SERVICIOS.map((sv, i) => `
  <article class="tile service reveal${sv.grande ? " wide" : ""}">
    <div class="service-top">
      <span class="service-icon">${ICON[sv.icono] || ICON.estrategia}</span>
      <span class="service-num">${String(i + 1).padStart(2, "0")}</span>
    </div>
    <p class="service-hook">${esc(sv.gancho || "")}</p>
    <h3>${esc(sv.titulo)}</h3>
    <p class="service-text">${esc(sv.texto)}</p>
    <ul class="service-deliv" aria-label="Lo que te llevas">${(sv.entregables || sv.tags || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    ${sv.prueba ? `<a class="service-proof" href="${esc(sv.prueba.href)}" data-hover>Ver prueba · ${esc(sv.prueba.texto)} <i>→</i></a>` : ""}
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
      // Lo que en la página va fijo a pantalla completa (avisos, modales) se queda arriba, a la vista del recuadro
      const fijos = [...frame.contentDocument.querySelectorAll("body *")].filter(el => getComputedStyle(el).position === "fixed");
      const ajustarFijos = () => fijos.forEach(el => Object.assign(el.style, { position: "absolute", top: v.scrollTop + "px", bottom: "auto", height: v.clientHeight + "px" }));
      if (fijos.length) { ajustarFijos(); v.addEventListener("scroll", ajustarFijos, { passive: true }); }
      // Si la web no se ve, sus animaciones se pausan (así no ralentiza el resto del portfolio)
      const w = frame.contentWindow, raf = w.requestAnimationFrame.bind(w);
      let oculta = false, cola = [];
      w.requestAnimationFrame = cb => oculta ? (cola.push(cb), 0) : raf(cb);
      new IntersectionObserver(([e]) => {
        oculta = !e.isIntersecting;
        if (!oculta) cola.splice(0).forEach(cb => raf(cb));
      }).observe(v);
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

const slug = t => String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const puntosHTML = t => t.estrategia?.length ? `<dl class="case-points">${t.estrategia.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : "";
const cases = $(".cases");
cases.innerHTML = TRABAJOS.map((t, i) => `
  <article class="tile case reveal" id="caso-${slug(t.cliente || t.titulo)}">
    <div class="case-media">
      ${viewerHTML(t)}
      <button class="v-expand" data-open="${i}" aria-label="Ampliar ${esc(t.titulo)}" data-hover="Ampliar">⤢</button>
    </div>
    <div class="case-info">
      <span class="case-kicker">Trabajo realizado · ${esc(t.categoria || "")}</span>
      <h3>${esc(t.titulo)}${t.cliente ? `<small>${esc(t.cliente)}</small>` : ""}</h3>
      <p class="case-desc">${esc(t.descripcion)}</p>
      ${puntosHTML(t)}
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
  $(".modal-points", modal).innerHTML = puntosHTML(t);
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

// Transiciones suaves entre estados (View Transitions) cuando el navegador las tiene
// (si el navegador tarda en hacer la transición, el cambio se aplica igualmente)
function conTransicion(fn) {
  if (reduced || !document.startViewTransition) return fn();
  let hecho = false;
  const run = () => { if (!hecho) { hecho = true; fn(); } };
  const vt = document.startViewTransition(run);
  vt.finished.catch(() => {});
  setTimeout(() => { if (!hecho) { vt.skipTransition(); run(); } }, 300);
}
// Animación "FLIP": la foto sale de (o vuelve a) su miniatura
function volar(el, desde, inverso = false) {
  if (reduced || !el || !desde) return Promise.resolve();
  const a = desde.getBoundingClientRect(), b = el.getBoundingClientRect();
  if (!a.width || !b.width) return Promise.resolve();
  const t = `translate(${a.left + a.width / 2 - (b.left + b.width / 2)}px, ${a.top + a.height / 2 - (b.top + b.height / 2)}px) scale(${a.width / b.width}, ${a.height / b.height})`;
  const frames = [{ transform: t, borderRadius: "40px", opacity: .6 }, { transform: "none", borderRadius: "16px", opacity: 1 }];
  return el.animate(inverso ? frames.reverse() : frames, { duration: inverso ? 420 : 560, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" }).finished.catch(() => {});
}
const mediaHTML = (it, enLista) => it.video
  ? `<video src="${esc(it.video)}" ${it.poster ? `poster="${esc(it.poster)}"` : ""} muted loop playsinline ${enLista ? 'preload="metadata"' : "autoplay controls"}></video>`
  : `<img src="${esc(enLista && it.mini || it.imagen)}" alt="${esc(it.titulo || "")}" ${enLista ? 'loading="lazy"' : ""} draggable="false" />`;

/* ---------- Biblioteca de outfits: filtros, cuadrícula y "ver todos" ---------- */
const LOOKS = POSTS.filter(p => p.imagen).map((p, n) => ({ ...p, titulo: p.texto, tipo: p.grupo, n }));
const libGrid = $(".lib-grid"), libMore = $(".lib-more");
const LIB_MAX = innerWidth <= 560 ? 6 : 8;
let libFiltro = "Todos", libTodos = false, libLista = LOOKS;
const grupos = ["Todos", ...new Set(LOOKS.map(l => l.grupo).filter(Boolean))];
$(".lib-filters").innerHTML = grupos.map(g => `<button class="chip" aria-pressed="${g === "Todos"}" data-g="${esc(g)}" data-hover>${esc(g)} <small>${g === "Todos" ? LOOKS.length : LOOKS.filter(l => l.grupo === g).length}</small></button>`).join("");

function renderLib() {
  libLista = libFiltro === "Todos" ? LOOKS : LOOKS.filter(l => l.grupo === libFiltro);
  const vista = libTodos ? libLista : libLista.slice(0, LIB_MAX);
  libGrid.innerHTML = vista.map((l, i) => `
    <button class="lib-item" style="--i:${i % LIB_MAX};view-transition-name:look-${l.n}" data-i="${i}" data-hover="Ver" aria-label="Ver ${esc(l.titulo || "outfit")}">
      ${mediaHTML(l, true)}
      <span class="lib-cap"><b>${esc(l.titulo || "")}</b><small>${esc(l.grupo || "")}</small></span>
    </button>`).join("");
  libMore.hidden = libLista.length <= LIB_MAX;
  libMore.textContent = libTodos ? "Ver menos" : `Ver los ${libLista.length} outfits`;
}
$(".lib-filters").addEventListener("click", e => {
  const b = e.target.closest(".chip");
  if (!b || b.dataset.g === libFiltro) return;
  $$(".lib-filters .chip").forEach(c => c.setAttribute("aria-pressed", c === b));
  conTransicion(() => { libFiltro = b.dataset.g; libTodos = false; renderLib(); });
});
libMore.addEventListener("click", () => {
  const cerrar = libTodos;
  conTransicion(() => { libTodos = !libTodos; renderLib(); });
  if (cerrar) $("#looks").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
});
libGrid.addEventListener("click", e => {
  const b = e.target.closest(".lib-item");
  if (b) openLightbox(libLista, +b.dataset.i, $("img", b));
});
const igPerfil = REDES.find(r => r.nombre === "Instagram" && r.url);
const subLink = $(".sub-link");
if (igPerfil) { subLink.href = igPerfil.url; subLink.textContent = `Más en Instagram ${igPerfil.usuario} ↗`; } else subLink.remove();
if (LOOKS.length) renderLib(); else $("#looks").remove();

/* ---------- Mi museo de arte: colecciones que se recorren con el scroll ----------
   Cada colección se queda fija en pantalla mientras bajas y sus fotos pasan de lado. */
const coleccionesEl = $(".colecciones"), taller = $("#mi-ropa");
let ultimaY = -1; // último scroll pintado: si no cambia, no se repinta
const vidIO = new IntersectionObserver(en => en.forEach(e => e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause()), { threshold: 0.5 });
$(".col-index").innerHTML = COLS.map((c, i) => `<a href="#col-${esc(c.id)}" class="chip" data-hover><i style="background:${esc(c.color || "#d8cfbf")}"></i>${esc(c.nombre)} <small>${c.piezas.length}</small></a>`).join("");
coleccionesEl.innerHTML = COLS.map((c, ci) => {
  const pasos = [...new Set(c.piezas.map(p => p.paso).filter(Boolean))];
  const huecos = Array.from({ length: c.proximamente || 0 }, () => `<div class="col-card soon"><b>Próximamente</b><span>Más fotos del proceso</span></div>`).join("");
  return `
  <article class="col" id="col-${esc(c.id)}" style="--c:${esc(c.color || "#d8cfbf")}">
    <div class="col-pin">
      <div class="col-bg" aria-hidden="true">${esc(c.nombre)}</div>
      <header class="col-info">
        <div class="col-title">
          <span class="col-num">${String(ci + 1).padStart(2, "0")}</span>
          <div>
            <h4>${esc(c.nombre)}</h4>
            <p>${esc(c.subtitulo || "")}${c.estado ? ` <span class="col-estado">${esc(c.estado)}</span>` : ""}</p>
          </div>
        </div>
        <p class="col-text">${esc(c.texto || "")}</p>
        <ol class="col-steps">${pasos.map(p => `<li data-paso="${esc(p)}">${esc(p)}</li>`).join("")}</ol>
      </header>
      <div class="col-track">
        ${c.piezas.map((p, i) => `
          <figure class="col-card${p.video ? " is-video" : ""}" data-col="${ci}" data-i="${i}" data-paso="${esc(p.paso || "")}" data-hover="Ampliar">
            <div class="col-media">${mediaHTML({ ...p, titulo: p.texto }, true)}</div>
            <figcaption><span>${String(i + 1).padStart(2, "0")} · ${esc(p.paso || "")}</span>${esc(p.texto || "")}</figcaption>
          </figure>`).join("")}
        ${huecos}
      </div>
      <footer class="col-foot"><span class="col-count">01 / ${String(c.piezas.length).padStart(2, "0")}</span><span class="col-bar"><i></i></span><span class="col-hint">Sigue bajando</span></footer>
    </div>
  </article>`;
}).join("");
$$("video", coleccionesEl).forEach(v => vidIO.observe(v));
const colEls = $$(".col", coleccionesEl).map(el => ({
  el, pin: $(".col-pin", el), track: $(".col-track", el), bg: $(".col-bg", el), bar: $(".col-bar i", el),
  count: $(".col-count", el), cards: $$(".col-card", el), steps: $$(".col-steps li", el), dist: 0, idx: -1,
}));
// El alto de cada colección = una pantalla + lo que tiene que recorrer su fila de fotos
function medirColecciones() {
  colEls.forEach(c => {
    c.track.style.transform = "none";
    const base = c.track.getBoundingClientRect().left;
    c.centros = c.cards.map(card => { const r = card.getBoundingClientRect(); return r.left - base + r.width / 2; });
    c.x0 = base;
    c.dist = Math.max(0, c.track.scrollWidth - c.pin.clientWidth);
    c.el.style.height = (c.pin.offsetHeight + c.dist) + "px";
  });
  ultimaY = -1;
}
function pintarColecciones() {
  const vw = innerWidth;
  colEls.forEach(c => {
    const r = c.el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = c.dist ? clamp01(-r.top / c.dist) : 0;
    c.track.style.transform = `translate3d(${-p * c.dist}px,0,0)`;
    c.bg.style.transform = `translate3d(${(0.5 - p) * 30}vw,0,0)`;
    c.bar.style.transform = `scaleX(${p})`;
    // cada foto gira y se escala según lo lejos que esté del centro
    const reales = c.cards.filter(x => !x.classList.contains("soon")).length;
    const best = Math.round(p * (c.cards.length - 1)) >= reales ? reales - 1 : Math.round(p * (c.cards.length - 1));
    c.cards.forEach((card, i) => {
      // posición calculada (sin leer el DOM en cada fotograma)
      const d = (c.x0 + c.centros[i] - p * c.dist - vw * 0.5) / vw;
      const dd = Math.max(-1, Math.min(1, d)), a = Math.abs(dd);
      card.style.transform = `perspective(1400px) rotateY(${(-dd * 16).toFixed(2)}deg) scale(${(1 - a * .14).toFixed(3)})`;
      card.style.opacity = (1 - a * .45).toFixed(3);
    });
    if (best !== c.idx) {
      c.idx = best;
      c.count.textContent = `${String(best + 1).padStart(2, "0")} / ${String(reales).padStart(2, "0")}`;
      const paso = c.cards[best]?.dataset.paso;
      c.steps.forEach(s => s.classList.toggle("on", s.dataset.paso === paso));
      const on = c.steps.find(s => s.classList.contains("on")), lista = on?.parentElement;
      if (on && lista.scrollWidth > lista.clientWidth) lista.scrollTo({ left: on.offsetLeft - lista.clientWidth / 2 + on.offsetWidth / 2, behavior: "smooth" });
      c.cards.forEach((card, i) => card.classList.toggle("on", i === best));
    }
  });
}
coleccionesEl.addEventListener("click", e => {
  const f = e.target.closest(".col-card:not(.soon)");
  if (!f) return;
  const c = COLS[+f.dataset.col];
  openLightbox(c.piezas.map(p => ({ ...p, titulo: p.texto, tipo: `${c.nombre} · ${p.paso || ""}` })), +f.dataset.i, $("img", f));
});
if (COLS.length) { medirColecciones(); new ResizeObserver(medirColecciones).observe(coleccionesEl); addEventListener("load", medirColecciones); } else taller.remove();

/* ---------- Vista ampliada: miniaturas, flechas, teclado y deslizar ---------- */
const lb = $(".lightbox"), lbStage = $(".lb-stage"), lbThumbs = $(".lb-thumbs");
let lbList = [], lbIndex = 0, lbOrigen = null;
function showLightbox(i, dir = 0) {
  lbIndex = (i + lbList.length) % lbList.length;
  const it = lbList[lbIndex];
  lbStage.innerHTML = mediaHTML(it, false);
  lbStage.style.setProperty("--dir", dir);
  lbStage.classList.remove("in"); void lbStage.offsetWidth; lbStage.classList.add("in");
  $(".lb-cap b", lb).textContent = it.titulo || "";
  $(".lb-cap span", lb).textContent = it.tipo || "";
  $(".lb-count", lb).textContent = `${lbIndex + 1} / ${lbList.length}`;
  $$("button", lbThumbs).forEach((t, j) => t.setAttribute("aria-current", j === lbIndex));
  $$("button", lbThumbs)[lbIndex]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  [lbIndex + 1, lbIndex - 1].forEach(j => { const n = lbList[(j + lbList.length) % lbList.length]; if (n?.imagen) new Image().src = n.imagen; });
}
function openLightbox(list, i, origen) {
  lbList = list;
  lbOrigen = origen;
  lb.classList.toggle("single", list.length < 2);
  lbThumbs.innerHTML = list.map((it, j) => `<button aria-label="Ver ${j + 1}">${it.video ? `<video src="${esc(it.video)}" muted preload="metadata"></video>` : `<img src="${esc(it.mini || it.imagen)}" alt="" loading="lazy" />`}</button>`).join("");
  showLightbox(i);
  lbStage.classList.remove("in");
  lb.showModal();
  const m = lbStage.firstElementChild;
  if (m?.tagName === "IMG" && origen && !reduced) {
    m.style.opacity = 0;
    const ir = () => { m.style.opacity = ""; volar(m, origen); };
    (m.decode ? m.decode() : Promise.resolve()).then(ir, ir);
  }
}
function cerrarLightbox() {
  const m = lbStage.firstElementChild;
  const destino = lbList === libLista
    ? $(`.lib-item[data-i="${lbIndex}"] img`, libGrid)
    : lbOrigen && $(`.col-card[data-col="${lbOrigen.closest(".col-card")?.dataset.col}"][data-i="${lbIndex}"] img`, coleccionesEl);
  const r = destino?.getBoundingClientRect();
  const visible = r && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
  if (!m || m.tagName !== "IMG" || !visible) return lb.close();
  lb.classList.add("closing");
  volar(m, destino, true).then(() => { lb.classList.remove("closing"); lb.close(); });
}
lbThumbs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { const j = [...lbThumbs.children].indexOf(b); showLightbox(j, Math.sign(j - lbIndex)); } });
$(".lb-prev").addEventListener("click", () => showLightbox(lbIndex - 1, -1));
$(".lb-next").addEventListener("click", () => showLightbox(lbIndex + 1, 1));
$(".lb-close").addEventListener("click", cerrarLightbox);
lb.addEventListener("click", e => { if (e.target === lb || e.target === lbStage) cerrarLightbox(); });
lb.addEventListener("cancel", e => { e.preventDefault(); cerrarLightbox(); });
lb.addEventListener("close", () => { lbStage.innerHTML = ""; });
lb.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") showLightbox(lbIndex + 1, 1);
  if (e.key === "ArrowLeft") showLightbox(lbIndex - 1, -1);
});
let touchX = null;
lbStage.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
lbStage.addEventListener("touchend", e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) showLightbox(lbIndex + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  touchX = null;
});

/* =========================================================
   Redes: Instagram y TikTok en directo
   ========================================================= */
$$("[data-icon]").forEach(el => (el.innerHTML = ICON[el.dataset.icon] || ""));
const igRed = REDES.find(r => r.nombre === "Instagram");
const igTile = $(".ig-tile");
const igUser = (igRed?.usuario || "").replace(/^@/, "");
if (igRed?.url && igUser) {
  $(".ig-link").href = igRed.url;
  $(".ig-fallback").href = igRed.url;
  $(".ig-handle").textContent = igRed.usuario;
  $(".ig-user").textContent = `${igRed.usuario} · ${igRed.texto || ""}`;
} else igTile.remove();

// Perfil de Instagram en directo (se carga al acercarse, encima de la tarjeta de respaldo)
function loadInstagram() {
  const f = document.createElement("iframe");
  f.className = "ig-embed";
  f.title = `Instagram de ${igRed.usuario}`;
  f.src = `https://www.instagram.com/${encodeURIComponent(igUser)}/embed/`;
  $(".ig-frame").append(f);
}
// Solo se muestra cuando Instagram responde de verdad; si no, se queda la tarjeta de respaldo
addEventListener("message", e => {
  if (/^https:\/\/www\.instagram\.com$/.test(e.origin) && e.source === $(".ig-embed")?.contentWindow) igTile.classList.add("live");
});
if (igTile.isConnected) new IntersectionObserver((en, obs) => { if (en[0].isIntersecting) { loadInstagram(); obs.disconnect(); } }, { rootMargin: "800px" }).observe(igTile);

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
let navActual = -2;
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
  if (current !== navActual) { navActual = current; navLinks.forEach((a, i) => a.classList.toggle("active", i === current)); navInd(); }
}
// Indicador que se desliza bajo el enlace del apartado en el que estás
function navInd() {
  const ind = $(".nav-ind"), a = navLinks[navActual];
  if (!ind) return;
  ind.style.opacity = a ? 1 : 0;
  if (a) { ind.style.width = a.offsetWidth + "px"; ind.style.transform = `translateX(${a.offsetLeft}px)`; }
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* =========================================================
   Efectos globales: enlaces
   ========================================================= */
// Enlaces con texto que "rueda" al pasar el ratón
$$(".nav-links a, .nav-cta, .footer a, .sub-nav a").forEach(a => {
  const nodo = [...a.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
  if (!nodo) return;
  const txt = nodo.textContent.trim();
  const roll = document.createElement("span");
  roll.className = "roll";
  roll.innerHTML = `<span>${esc(txt)}</span><span aria-hidden="true">${esc(txt)}</span>`;
  nodo.replaceWith(roll);
});

const caseMedia = $$(".case-media");
(function loop() {
  if (scrollY !== ultimaY) { ultimaY = scrollY; pintarColecciones(); }
  if (!reduced) {
    const vh = innerHeight;
    caseMedia.forEach(m => {
      const r = m.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0) return;
      const p = clamp01((vh - r.top) / (vh * 0.75));
      m.style.setProperty("--ci", ((1 - p) * 6) + "%");
      m.style.setProperty("--sc", 1.06 - p * 0.06);
    });
  }
  requestAnimationFrame(loop);
})();

let lastW = innerWidth;
addEventListener("resize", () => { if (innerWidth !== lastW) { lastW = innerWidth; navInd(); } });

/* =========================================================
   Ratón: foto 3D de la portada
   ========================================================= */
if (finePointer) {
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

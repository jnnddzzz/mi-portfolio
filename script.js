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
let pointer = { x: -999, y: -999 };

function spawnBubbles() {
  const small = innerWidth < 600;
  const defs = BURBUJAS.map(k => BUBBLE_DEF[k]?.() && { key: k, ...BUBBLE_DEF[k]() }).filter(Boolean);
  const W = hero.clientWidth, H = hero.clientHeight;
  defs.forEach((d, i) => {
    const el = document.createElement(d.href ? "a" : "button");
    el.className = "bubble" + (d.accent ? " accent" : "");
    el.draggable = false;
    if (d.href) { el.href = d.href; if (d.ext) { el.target = "_blank"; el.rel = "noopener"; } }
    el.setAttribute("aria-label", d.label);
    el.innerHTML = `${ICON[d.key] || ""}<span>${esc(d.label)}</span>`;
    const r = (small ? 34 : 50) + (i % 3) * (small ? 4 : 8);
    el.style.setProperty("--r", r + "px");
    // reparte las burbujas a los lados de la foto
    const left = i % 2 === 0;
    const x = left ? W * (0.08 + Math.random() * 0.17) : W * (0.75 + Math.random() * 0.17);
    const y = H * (0.2 + (i / defs.length) * 0.55);
    const b = { el, d, r, x, y, vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2, drag: false, moved: 0 };
    bubbles.push(b);
    bubbleLayer.append(el);
    setTimeout(() => el.classList.add("on"), i * 110);
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

hero.addEventListener("pointermove", e => { const r = hero.getBoundingClientRect(); pointer = { x: e.clientX - r.left, y: e.clientY - r.top }; });
hero.addEventListener("pointerleave", () => (pointer = { x: -999, y: -999 }));

function stepBubbles() {
  if (!bubbles.length) return;
  const W = hero.clientWidth, H = hero.clientHeight;
  // la foto actúa como obstáculo en pantallas grandes
  const pr = innerWidth > 900 ? (() => { const a = $(".photo").getBoundingClientRect(), h = hero.getBoundingClientRect(); return { l: a.left - h.left, t: a.top - h.top, r: a.right - h.left, b: a.bottom - h.top }; })() : null;
  const top = 64, bottom = H - 70;
  for (const b of bubbles) {
    if (!b.drag) {
      // deriva suave + rozamiento
      b.vx += (Math.random() - 0.5) * 0.06; b.vy += (Math.random() - 0.5) * 0.06;
      b.vx *= 0.985; b.vy *= 0.985;
      // el ratón las empuja
      const dx = b.x - pointer.x, dy = b.y - pointer.y, d = Math.hypot(dx, dy);
      if (d < b.r + 90 && d > 0) { const f = (1 - d / (b.r + 90)) * 1.4; b.vx += dx / d * f; b.vy += dy / d * f; }
      const sp = Math.hypot(b.vx, b.vy); if (sp > 14) { b.vx *= 14 / sp; b.vy *= 14 / sp; }
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
const coverHTML = t => t.imagen ? `<img src="${esc(t.imagen)}" alt="${esc(t.titulo)}" loading="lazy" />` : "";
const cases = $(".cases");
cases.innerHTML = TRABAJOS.map((t, i) => `
  <article class="tile case reveal">
    <button class="case-media" data-open="${i}" data-hover="Ver" aria-label="Ver ${esc(t.titulo)}">
      <div class="case-media-inner">${coverHTML(t)}</div>
    </button>
    <div class="case-info">
      <span class="case-kicker">Trabajo realizado · ${esc(t.categoria || "")}</span>
      <h3>${esc(t.titulo)}${t.cliente ? `<small>${esc(t.cliente)}</small>` : ""}</h3>
      <p class="case-desc">${esc(t.descripcion)}</p>
      <div class="case-actions">
        <button class="pill pill-solid" data-open="${i}" data-hover>Ver proyecto</button>
        ${t.enlace ? `<a class="pill" href="${esc(t.enlace)}" target="_blank" rel="noopener" data-hover>En vivo ↗</a>` : ""}
      </div>
    </div>
  </article>`).join("");

const modal = $(".modal");
cases.addEventListener("click", e => {
  const opener = e.target.closest("[data-open]");
  if (!opener) return;
  const t = TRABAJOS[opener.dataset.open];
  $(".modal-cover", modal).innerHTML = coverHTML(t);
  $(".modal-cat", modal).textContent = ["Trabajo realizado", t.cliente].filter(Boolean).join(" · ");
  $("#modal-title").textContent = t.titulo;
  $(".modal-desc", modal).textContent = t.descripcion;
  const link = $(".modal-link", modal);
  link.hidden = !t.enlace;
  if (t.enlace) link.href = t.enlace;
  modal.showModal();
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

const lookCols = $$(".look-col");
const lookIO = new IntersectionObserver(en => en.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); lookIO.unobserve(e.target); } }), { threshold: 0.2 });
function renderLooks() {
  const n = innerWidth <= 560 ? 2 : 3;
  lookCols.forEach((c, i) => { c.hidden = i >= n; c.innerHTML = ""; });
  POSTS.filter(p => p.imagen).forEach((p, i) => {
    lookCols[i % n].insertAdjacentHTML("beforeend", `
      <figure class="look">
        <img src="${esc(p.imagen)}" alt="${esc(p.texto || "Look")}" loading="lazy" draggable="false" />
        <figcaption><span>${esc(p.texto || "")}</span>${p.enlace ? `<a href="${esc(p.enlace)}" target="_blank" rel="noopener" data-hover="Ver"><i>Ver ↗</i></a>` : ""}</figcaption>
      </figure>`);
  });
  $$(".look").forEach(l => lookIO.observe(l));
}
renderLooks();

let lastTap = 0;
$(".looks").addEventListener("pointerup", e => {
  const look = e.target.closest(".look");
  if (!look || e.target.closest("a")) return;
  const now = Date.now();
  if (now - lastTap < 320) {
    const r = look.getBoundingClientRect();
    const h = document.createElement("span");
    h.className = "heart"; h.textContent = "♥";
    h.style.setProperty("--hx", e.clientX - r.left + "px"); h.style.setProperty("--hy", e.clientY - r.top + "px");
    look.append(h);
    setTimeout(() => h.remove(), 1000);
    lastTap = 0;
  } else lastTap = now;
});

$(".designs").innerHTML = DISENOS.length
  ? DISENOS.map(d => `
    <figure class="design reveal">
      <div class="design-img"><img src="${esc(d.imagen)}" alt="${esc(d.titulo || "Diseño")}" loading="lazy" /></div>
      <p>${esc(d.titulo || "")}<span>${esc(d.tipo || "")}</span></p>
    </figure>`).join("")
  : `<div class="designs-empty reveal"><b>Diseños en proceso</b>Muy pronto, aquí.</div>`;

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
const looksEl = $(".looks");
(function loop() {
  if (!reduced) {
    const vh = innerHeight;
    if (hero.getBoundingClientRect().bottom > 0) stepBubbles();
    caseMedia.forEach(m => {
      const r = m.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0) return;
      const p = clamp01((vh - r.top) / (vh * 0.75));
      m.style.setProperty("--ci", ((1 - p) * 6) + "%");
      m.style.setProperty("--sc", 1.08 - p * 0.08);
    });
    const lr = looksEl.getBoundingClientRect();
    if (lr.top < vh && lr.bottom > 0) {
      const off = Math.max(0, lr.top + lr.height / 2 - vh / 2);
      lookCols.forEach(c => c.style.setProperty("--ty", (off * parseFloat(c.dataset.speed)) + "px"));
    }
  } else if (bubbles.length) stepBubbles();
  requestAnimationFrame(loop);
})();

let lastW = innerWidth;
addEventListener("resize", () => { if (innerWidth !== lastW) { lastW = innerWidth; renderLooks(); } });

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

// Renderiza la web a partir de data.js y añade las interacciones — no hace falta tocar este archivo.

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const css = getComputedStyle(document.documentElement);
const ACCENT = css.getPropertyValue("--accent").trim() || "#d4ff3a";
const ACCENT2 = css.getPropertyValue("--accent-2").trim() || "#ff4d8d";

/* =========================================================
   Confeti
   ========================================================= */
const confetti = (() => {
  const cv = $(".confetti");
  const ctx = cv.getContext("2d");
  const colors = [ACCENT, ACCENT2, "#ffffff", "#7c8cff"];
  let parts = [], running = false;
  const resize = () => { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; };
  resize(); addEventListener("resize", resize);
  function frame() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(p => p.life > 0 && p.y < innerHeight + 40);
    for (const p of parts) {
      p.vy += 0.35; p.vx *= 0.985; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
      ctx.save();
      ctx.translate(p.x * devicePixelRatio, p.y * devicePixelRatio);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.min(1, p.life / 30);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.s / 2 * devicePixelRatio, -p.s / 4 * devicePixelRatio, p.s * devicePixelRatio, p.s / 2 * devicePixelRatio);
      ctx.restore();
    }
    if (parts.length) requestAnimationFrame(frame); else { running = false; ctx.clearRect(0, 0, cv.width, cv.height); }
  }
  return function burst(x, y, n = 60, power = 12) {
    if (reduced) return;
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
      const v = power * (0.4 + Math.random() * 0.8);
      parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, s: 6 + Math.random() * 8, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: colors[i % colors.length], life: 90 + Math.random() * 50 });
    }
    if (!running) { running = true; requestAnimationFrame(frame); }
  };
})();
const burstAt = (el, n, p) => { const r = el.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, n, p); };

/* =========================================================
   Toasts + logros
   ========================================================= */
function toast(ico, small, text) {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<span class="t-ico">${ico}</span><span><small>${esc(small)}</small><b>${esc(text)}</b></span>`;
  $(".toasts").append(t);
  setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 400); }, 2400);
}

const LOGROS = [
  { id: "sobre",    ico: "👀", nombre: "Curioso",              txt: "Has descubierto quién soy" },
  { id: "trabajos", ico: "🎨", nombre: "Ojo de crítico",       txt: "Has llegado a mis trabajos" },
  { id: "proyecto", ico: "🔍", nombre: "Al detalle",           txt: "Has abierto un proyecto" },
  { id: "redes",    ico: "📱", nombre: "Scroll infinito",      txt: "Has visto mis redes" },
  { id: "like",     ico: "❤️", nombre: "Primer like",          txt: "Has dado like a un post" },
  { id: "skills",   ico: "🧰", nombre: "Caja de herramientas", txt: "Conoces mis habilidades" },
  { id: "contacto", ico: "🏁", nombre: "Hasta el final",       txt: "Has llegado a contacto" },
  { id: "email",    ico: "✉️", nombre: "Conectados",           txt: "Has guardado mi contacto" },
];
const unlocked = new Set();
const hud = $(".hud");
$(".hud-list").innerHTML = LOGROS.map(l => `<li data-id="${l.id}"><i>✓</i>${esc(l.nombre)}</li>`).join("");

function unlock(id) {
  if (unlocked.has(id)) return;
  const l = LOGROS.find(x => x.id === id);
  if (!l) return;
  unlocked.add(id);
  $(`.hud-list [data-id="${id}"]`).classList.add("ok");
  const pct = Math.round((unlocked.size / LOGROS.length) * 100);
  $(".hud-n").textContent = unlocked.size;
  $(".hud-pct").textContent = pct + "%";
  $(".hud-fill").style.strokeDashoffset = 97.4 * (1 - unlocked.size / LOGROS.length);
  hud.classList.remove("bump"); void hud.offsetWidth; hud.classList.add("bump");
  toast(l.ico, `Logro desbloqueado · ${unlocked.size}/${LOGROS.length}`, l.nombre + " — " + l.txt);
  burstAt(hud, 25, 9);
  if (unlocked.size === LOGROS.length) {
    setTimeout(() => {
      toast("🏆", "Portfolio completado al 100%", "¡Lo has visto todo! ¿Hablamos?");
      confetti(innerWidth * 0.25, innerHeight * 0.7, 120, 18);
      confetti(innerWidth * 0.75, innerHeight * 0.7, 120, 18);
    }, 900);
  }
}
hud.addEventListener("click", () => { const p = $(".hud-panel"); p.hidden = !p.hidden; });

/* =========================================================
   Perfil + portada
   ========================================================= */
$$("[data-perfil]").forEach(el => (el.textContent = PERFIL[el.dataset.perfil] ?? ""));
$("#year").textContent = new Date().getFullYear();

const name = $("[data-split]");
name.innerHTML = PERFIL.nombre.split(" ").map(word =>
  `<span class="w">${[...word].map((c, i) => `<span class="ch" style="transition-delay:${i * 35}ms">${esc(c)}</span>`).join("")}</span>`
).join(" ");

const photo = $(".photo img");
photo.addEventListener("error", () => photo.classList.add("missing"));
if (PERFIL.foto) photo.src = PERFIL.foto; else photo.classList.add("missing");

// Palabra que rota en la portada
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

// Intro con contador
function startHero() { name.classList.add("in"); $(".photo").classList.add("in"); }
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
    setTimeout(startHero, 250);
    setTimeout(() => loader.remove(), 1100);
  })(t0);
})();

// Texto gigante en movimiento detrás de la foto
const bgWords = ["Marketing", "Publicidad", "Content", "Creator"];
const bgChunk = bgWords.map(w => `<span>${esc(w)}</span>`).join("");
$(".hero-bg-track").innerHTML = bgChunk + bgChunk;

// Bio palabra a palabra
const statement = $("[data-words]");
statement.innerHTML = PERFIL.bio.split(" ").map(w => `<span>${esc(w)}</span> `).join("");
const bioWords = $$("span", statement);

// Cinta: habilidades y categorías
const marqueeItems = [...new Set([...TRABAJOS.map(t => t.categoria), ...HABILIDADES.map(h => h.nombre), ...SOFT_SKILLS.slice(0, 4)])];
const track = $(".marquee-track");
const chunk = marqueeItems.map(i => `<span>${esc(i)}</span>`).join("");
track.innerHTML = chunk + chunk + chunk + chunk;

/* =========================================================
   Trabajos
   ========================================================= */
const initials = t => t.split(" ").filter(w => w.length > 2).slice(0, 2).map(w => w[0].toUpperCase()).join("");
function coverHTML(t) {
  if (t.imagen) return `<img src="${esc(t.imagen)}" alt="${esc(t.titulo)}" loading="lazy" />`;
  if (t.colores || t.categoria === "Web") {
    const [c1, c2] = t.colores || ["#1c1c20", ACCENT];
    return `<div class="mock" style="--c1:${esc(c1)};--c2:${esc(c2)}"><div class="mock-win">
      <div class="mock-bar"><i></i><i></i><i></i><span></span></div>
      <div class="mock-page"><b>${esc(t.titulo)}</b><small>${esc(t.categoria)} · ${esc(t.curso || "")}</small><span class="cta">Descubrir</span></div>
    </div></div>`;
  }
  return `<div class="ph-cover"><span>${esc(initials(t.titulo))}</span></div>`;
}

const cases = $(".cases");
cases.innerHTML = TRABAJOS.map((t, i) => `
  <article class="case" data-i="${i}">
    <button class="case-media" data-open="${i}" data-hover="Ver" aria-label="Ver ${esc(t.titulo)}">
      <div class="case-media-inner">${coverHTML(t)}</div>
    </button>
    <div class="case-info">
      <span class="case-kicker">Trabajo realizado</span>
      <h3>${esc(t.titulo)}${t.cliente ? `<small>${esc(t.cliente)}</small>` : ""}</h3>
      <p class="case-desc">${esc(t.descripcion)}</p>
      <div class="case-actions">
        <button class="case-link" data-open="${i}" data-hover>Ver proyecto <b>→</b></button>
        ${t.enlace ? `<a class="case-link" href="${esc(t.enlace)}" target="_blank" rel="noopener" data-hover>En vivo <b>↗</b></a>` : ""}
      </div>
    </div>
  </article>`).join("");

const modal = $(".modal");
cases.addEventListener("click", e => {
  const opener = e.target.closest("[data-open]");
  if (!opener) return;
  const t = TRABAJOS[opener.dataset.open];
  $(".modal-cover", modal).innerHTML = coverHTML(t.imagenGrande ? { ...t, imagen: t.imagenGrande } : t);
  $(".modal-cat", modal).textContent = ["Trabajo realizado", t.cliente].filter(Boolean).join(" · ");
  $("#modal-title").textContent = t.titulo;
  $(".modal-desc", modal).textContent = t.descripcion;
  const link = $(".modal-link", modal);
  link.hidden = !t.enlace;
  if (t.enlace) link.href = t.enlace;
  modal.showModal();
  unlock("proyecto");
});

// Qué hago
const services = $(".service-list");
services.innerHTML = SERVICIOS.map(sv => `
  <li class="service reveal">
    <div class="service-row"><h3>${esc(sv.titulo)}</h3><span class="service-plus" aria-hidden="true">+</span></div>
    <div class="service-body"><div>
      <p>${esc(sv.texto)}</p>
      <div class="service-tags">${(sv.tags || []).map(x => `<span>${esc(x)}</span>`).join("")}</div>
    </div></div>
  </li>`).join("");
services.addEventListener("click", e => {
  const sv = e.target.closest(".service");
  if (!sv) return;
  $$(".service", services).forEach(x => x !== sv && x.classList.remove("open"));
  sv.classList.toggle("open");
});
$(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

/* =========================================================
   Redes
   ========================================================= */
const posts = $(".gallery-track");
posts.innerHTML = POSTS.map(p => `
  <div class="post" data-likes="0">
    ${p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.texto || "Publicación")}" draggable="false" />` : `<div class="post-ph">◎</div>`}
    ${p.enlace ? `<a class="post-likes" href="${esc(p.enlace)}" target="_blank" rel="noopener" data-hover="Ver" aria-label="Ver publicación"><i>♥</i><span>0</span> · ↗</a>` : `<span class="post-likes"><i>♥</i><span>0</span></span>`}
    ${p.texto ? `<span class="post-cap">${esc(p.texto)}</span>` : ""}
  </div>`).join("");
$(".g-total").textContent = String(POSTS.length).padStart(2, "0");
const gallery = $(".gallery");
const gItems = $$(".post", posts);
function sizeGallery() {
  if (reduced) { gallery.classList.add("static"); return; }
  // altura fija con la del viewport inicial: evita saltos en móvil al ocultarse la barra del navegador
  gallery.style.height = (posts.scrollWidth - innerWidth + document.documentElement.clientHeight) + "px";
}
sizeGallery();
let lastW = innerWidth;
addEventListener("resize", () => { if (innerWidth !== lastW) { lastW = innerWidth; sizeGallery(); } });
addEventListener("load", sizeGallery);

function like(post, x, y) {
  const n = +post.dataset.likes + 1;
  post.dataset.likes = n;
  post.classList.add("liked");
  const counter = $(".post-likes", post);
  $("span", counter).textContent = n;
  counter.classList.remove("pop"); void counter.offsetWidth; counter.classList.add("pop");
  const h = document.createElement("span");
  h.className = "heart"; h.textContent = "♥";
  h.style.setProperty("--hx", x + "px"); h.style.setProperty("--hy", y + "px");
  post.append(h);
  setTimeout(() => h.remove(), 1000);
  unlock("like");
}
// doble clic con ratón, doble toque en móvil
let lastTap = 0;
posts.addEventListener("pointerup", e => {
  const post = e.target.closest(".post");
  if (!post || e.target.closest("a")) return;
  const now = Date.now();
  if (now - lastTap < 320) {
    const r = post.getBoundingClientRect();
    like(post, e.clientX - r.left, e.clientY - r.top);
    lastTap = 0;
  } else lastTap = now;
});

const tiktokUrl = `https://www.tiktok.com/@${TIKTOK_USUARIO}`;
const ttLink = $(".tiktok-link");
ttLink.href = tiktokUrl; ttLink.textContent = `@${TIKTOK_USUARIO} ↗`;
const slot = $(".tiktok-embed-slot");
slot.innerHTML = `<a class="tiktok-fallback" href="${tiktokUrl}" target="_blank" rel="noopener" data-hover="Ver">
  <b>@${esc(TIKTOK_USUARIO)}</b><span>Mira mis vídeos en TikTok ↗</span></a>`;
let ttLoaded = false;
function loadTikTok() {
  if (ttLoaded || !TIKTOK_USUARIO) return;
  ttLoaded = true;
  const bq = document.createElement("blockquote");
  bq.className = "tiktok-embed";
  bq.cite = tiktokUrl;
  bq.dataset.uniqueId = TIKTOK_USUARIO;
  bq.dataset.embedType = "creator";
  bq.style.cssText = "max-width:780px;min-width:288px;";
  bq.innerHTML = `<section><a target="_blank" href="${tiktokUrl}?refer=creator_embed">@${esc(TIKTOK_USUARIO)}</a></section>`;
  const s = document.createElement("script");
  s.src = "https://www.tiktok.com/embed.js";
  s.async = true;
  s.onload = () => {
    // si TikTok carga, sustituye el hueco por el perfil en directo
    const fb = $(".tiktok-fallback", slot);
    slot.append(bq);
    const check = setInterval(() => {
      if ($("iframe", slot)) { fb?.remove(); clearInterval(check); }
    }, 400);
    setTimeout(() => { clearInterval(check); if (!$("iframe", slot)) bq.remove(); }, 8000);
    window.tiktokEmbed?.lib?.render?.([bq]);
  };
  document.body.append(s);
}

$(".social-links").innerHTML = REDES.filter(r => r.url).map(r => `
  <a href="${esc(r.url)}" target="_blank" rel="noopener" data-hover>
    <span><b>${esc(r.nombre)}</b><small>${esc(r.usuario)}</small></span><i>↗</i>
  </a>`).join("");

/* =========================================================
   Habilidades
   ========================================================= */
$(".tools").innerHTML = HABILIDADES.map(h => `
  <li class="tool reveal">
    <div class="tool-top"><div><b>${esc(h.nombre)}</b><small>${esc(h.tipo)}</small></div><span data-to="${Number(h.nivel) || 0}" data-suffix="%">0%</span></div>
    <div class="bar"><i data-w="${Number(h.nivel) || 0}"></i></div>
  </li>`).join("");
$(".chips").innerHTML = SOFT_SKILLS.map(s => `<button class="chip" data-hover>${esc(s)}</button>`).join("");
$(".chips").addEventListener("click", e => {
  const c = e.target.closest(".chip");
  if (!c) return;
  c.classList.remove("jump"); void c.offsetWidth; c.classList.add("jump");
  burstAt(c, 18, 8);
});

/* =========================================================
   Contacto
   ========================================================= */
const ctTitle = $("[data-proximity]");
ctTitle.innerHTML = [...ctTitle.textContent].map(c => `<span>${esc(c)}</span>`).join("");
const ctLetters = $$("span", ctTitle);

const tel = String(PERFIL.telefono || "").replace(/\D/g, "");
$(".tel-text").textContent = tel.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");
const wa = $(".wa");
if (tel) wa.href = `https://wa.me/34${tel}`; else wa.remove();
if (!tel) $('[data-copy="telefono"]').remove();

$$("[data-copy]").forEach(btn => btn.addEventListener("click", async () => {
  const value = btn.dataset.copy === "telefono" ? tel : PERFIL.email;
  const label = btn.dataset.copy === "telefono" ? "Teléfono" : "Email";
  try {
    await navigator.clipboard.writeText(value);
    toast(btn.dataset.copy === "telefono" ? "📞" : "✉️", `${label} copiado`, $("span", btn).textContent);
  } catch {
    const r = document.createRange(); r.selectNodeContents($("span", btn));
    getSelection().removeAllRanges(); getSelection().addRange(r);
    toast("✉️", "Selecciónalo y cópialo", $("span", btn).textContent);
  }
  burstAt(btn, 70, 14);
  unlock("email");
}));
wa.addEventListener("click", () => unlock("email"));

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
$('[data-count="herramientas"]').dataset.to = HABILIDADES.length;

const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    el.classList.add("in");
    $$(".bar i", el).forEach(b => (b.style.width = b.dataset.w + "%"));
    $$("[data-to]", el).forEach(s => countUp(s, +s.dataset.to, s.dataset.suffix || ""));
    if (el.matches("[data-to]")) countUp(el, +el.dataset.to);
    io.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
$$(".reveal, .fact b[data-count]").forEach(el => io.observe(el));

// Logros por sección + carga perezosa de TikTok
const sectionIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    unlock(en.target.dataset.logro);
    sectionIO.unobserve(en.target);
  });
}, { threshold: 0.25 });
$$("[data-logro]").forEach(s => sectionIO.observe(s));
// La galería es muy alta: su logro salta al entrar en la zona fijada
new IntersectionObserver((en, obs) => { if (en[0].isIntersecting) { unlock("redes"); obs.disconnect(); } }, { threshold: 0.6 }).observe($(".gallery-sticky"));
new IntersectionObserver((en, obs) => { if (en[0].isIntersecting) { loadTikTok(); obs.disconnect(); } }, { rootMargin: "600px" }).observe($("#redes"));

/* =========================================================
   Scroll: progreso, menú, bio, cinta
   ========================================================= */
const bar = $(".progress i");
const stage = $(".hero-stage");
const heroBg = $(".hero-bg");
const heroWords = $$(".w", name);
const nav = $(".nav");
const navLinks = $$(".nav-links a");
const sections = navLinks.map(a => $(a.getAttribute("href")));
let lastY = scrollY, velocity = 0, mPos = 0, mDir = -1;

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;

  const dy = scrollY - lastY;
  velocity += dy * 0.15;
  if (Math.abs(dy) > 2) mDir = dy > 0 ? -1 : 1;
  nav.classList.toggle("hidden", dy > 4 && scrollY > 300);
  if (dy < -4) nav.classList.remove("hidden");
  lastY = scrollY;

  if (!reduced) {
    const hp = Math.min(scrollY / innerHeight, 1.2);
    stage.style.transform = `translateY(${hp * innerHeight * 0.18}px) scale(${1 - hp * 0.08})`;
    heroBg.style.opacity = 1 - hp;
    // el nombre se separa hacia los lados al bajar
    heroWords.forEach((w, i) => {
      const dir = heroWords.length === 1 ? 0 : (i / (heroWords.length - 1)) * 2 - 1;
      w.style.transform = `translateX(${dir * hp * 18}vw)`;
      w.style.opacity = 1 - hp * 0.9;
    });
  }

  const r = statement.getBoundingClientRect();
  const progress = (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35);
  const lit = Math.round(Math.max(0, Math.min(1, progress)) * bioWords.length);
  bioWords.forEach((w, i) => w.classList.toggle("lit", i < lit));

  let current = -1;
  sections.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) current = i; });
  navLinks.forEach((a, i) => a.classList.toggle("active", i === current));
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

const clamp01 = v => Math.max(0, Math.min(1, v));
const caseEls = $$(".case");
const caseIO = new IntersectionObserver(en => en.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); caseIO.unobserve(e.target); } }), { threshold: 0.2 });
caseEls.forEach(c => caseIO.observe(c));
let lastIdx = -1;
const gBar = $(".gallery-progress i");

// Bucle de animación: cinta, imágenes ligadas al scroll y galería
(function loop() {
  if (!reduced) {
    velocity *= 0.92;
    mPos += mDir * (1 + Math.min(Math.abs(velocity), 40));
    const w = track.scrollWidth / 4;
    if (mPos <= -w) mPos += w;
    if (mPos > 0) mPos -= w;
    track.style.transform = `translateX(${mPos}px) skewX(${Math.max(-12, Math.min(12, -velocity * 0.4))}deg)`;
    const vh = innerHeight;

    // Trabajos: la imagen se abre desde el centro, hace zoom out y tiene parallax
    caseEls.forEach(c => {
      const m = c.firstElementChild;
      const r = m.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0) return;
      const p = clamp01((vh - r.top) / (vh * 0.75));
      m.style.setProperty("--ci", ((1 - p) * 8) + "%");
      m.style.setProperty("--sc", 1.08 - p * 0.08);
    });

    // Redes: la galería avanza en horizontal mientras bajas
    if (!gallery.classList.contains("static")) {
      const gr = gallery.getBoundingClientRect();
      const dist = gallery.offsetHeight - vh;
      const gp = clamp01(-gr.top / Math.max(1, dist));
      const maxX = posts.scrollWidth - innerWidth;
      posts.style.transform = `translateX(${-gp * maxX}px)`;
      gBar.style.transform = `scaleX(${gp})`;
      const cx = innerWidth / 2;
      let best = 0, bestD = Infinity;
      gItems.forEach((it, i) => {
        const r = it.getBoundingClientRect();
        const d = (r.left + r.width / 2 - cx) / innerWidth;
        if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = i; }
        it.style.setProperty("--s", 1 - Math.min(Math.abs(d), 1) * 0.06);
      });
      if (best !== lastIdx) { lastIdx = best; $(".g-now").textContent = String(best + 1).padStart(2, "0"); }
    }
  }
  requestAnimationFrame(loop);
})();

/* =========================================================
   Ratón: cursor, imanes, inclinación 3D, letras de contacto
   ========================================================= */
if (finePointer) {
  const cursor = $(".cursor");
  const label = $(".cursor-label");
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;

  addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    document.body.style.setProperty("--mx", mx + "px");
    document.body.style.setProperty("--my", my + "px");

    // letras de "¿Hablamos?" que crecen al acercarse
    const tr = ctTitle.getBoundingClientRect();
    if (tr.top < innerHeight && tr.bottom > 0) {
      ctLetters.forEach(l => {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
        const k = Math.max(0, 1 - d / 260);
        l.style.transform = `scaleY(${1 + k * 0.35}) translateY(${-k * 10}px)`;
        l.style.color = k > 0.55 ? ACCENT : "";
      });
    }
  });
  addEventListener("mousedown", () => cursor.classList.add("down"));
  addEventListener("mouseup", () => cursor.classList.remove("down"));
  (function loop() {
    cx += (mx - cx) * 0.25; cy += (my - cy) * 0.25;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  })();

  document.addEventListener("mouseover", e => {
    const t = e.target.closest("[data-hover]");
    const text = t?.dataset.hover;
    cursor.classList.toggle("label", !!text);
    cursor.classList.toggle("big", !!t && !text);
    label.textContent = text || "";
  });

  $$("[data-magnetic]").forEach(el => {
    el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = ""));
  });

  document.addEventListener("mousemove", e => {
    const el = e.target.closest("[data-tilt]");
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const max = el.classList.contains("card") ? 6 : 12;
    el.style.setProperty("--ry", (x - 0.5) * max + "deg");
    el.style.setProperty("--rx", -(y - 0.5) * max + "deg");
    el.style.setProperty("--gx", x * 100 + "%");
    el.style.setProperty("--gy", y * 100 + "%");
  });
  document.addEventListener("mouseout", e => {
    const el = e.target.closest("[data-tilt]");
    if (el && !el.contains(e.relatedTarget)) { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); }
  });
}

// Easter egg: 5 clics en el logo
let logoClicks = 0, logoTimer;
$(".logo").addEventListener("click", () => {
  logoClicks++;
  clearTimeout(logoTimer);
  logoTimer = setTimeout(() => (logoClicks = 0), 1500);
  if (logoClicks === 5) { confetti(innerWidth / 2, innerHeight / 2, 160, 20); toast("🥚", "Easter egg", "¡Lo encontraste!"); logoClicks = 0; }
});

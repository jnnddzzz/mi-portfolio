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

/* =========================================================
   Perfil + inicio
   ========================================================= */
$$("[data-perfil]").forEach(el => (el.textContent = PERFIL[el.dataset.perfil] ?? ""));
$("#year").textContent = new Date().getFullYear();

const name = $("[data-split]");
name.innerHTML = PERFIL.nombre.split(" ").map(word =>
  `<span class="w">${[...word].map((c, i) => `<span class="ch" style="transition-delay:${i * 35}ms">${esc(c)}</span>`).join("")}</span>`
).join(" ");
const heroWords = $$(".w", name);

const photo = $(".photo img");
photo.addEventListener("error", () => photo.classList.add("missing"));
if (PERFIL.foto) photo.src = PERFIL.foto; else photo.classList.add("missing");

// Palabra que rota: "Ideas que se ___"
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

// Intro con contador en cada carga
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

// Bio palabra a palabra
const statement = $("[data-words]");
statement.innerHTML = PERFIL.bio.split(" ").map(w => `<span>${esc(w)}</span> `).join("");
const bioWords = $$("span", statement);

/* =========================================================
   Qué hago
   ========================================================= */
const services = $(".service-list");
services.innerHTML = SERVICIOS.map(sv => `
  <li class="service reveal">
    <div class="service-row"><h3>${esc(sv.titulo)}</h3><span class="service-plus" aria-hidden="true">+</span></div>
    <div class="service-body"><div><p>${esc(sv.texto)}</p></div></div>
  </li>`).join("");
services.addEventListener("click", e => {
  const sv = e.target.closest(".service");
  if (!sv) return;
  $$(".service", services).forEach(x => x !== sv && x.classList.remove("open"));
  sv.classList.toggle("open");
});

/* =========================================================
   Trabajos
   ========================================================= */
const coverHTML = t => t.imagen ? `<img src="${esc(t.imagen)}" alt="${esc(t.titulo)}" loading="lazy" />` : "";
const cases = $(".cases");
cases.innerHTML = TRABAJOS.map((t, i) => `
  <article class="case">
    <button class="case-media" data-open="${i}" data-hover="Ver" aria-label="Ver ${esc(t.titulo)}">
      <div class="case-media-inner">${coverHTML(t)}</div>
    </button>
    <div class="case-info">
      <span class="case-kicker">Trabajo realizado</span>
      <h3>${esc(t.titulo)}${t.cliente ? `<small>${esc(t.cliente)}</small>` : ""}</h3>
      <p class="case-desc">${esc(t.descripcion)}</p>
      <div class="case-actions">
        <button class="link" data-open="${i}" data-hover>Ver proyecto <b>→</b></button>
        ${t.enlace ? `<a class="link" href="${esc(t.enlace)}" target="_blank" rel="noopener" data-hover>En vivo <b>↗</b></a>` : ""}
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
   Estilo: moda (looks) y diseños
   ========================================================= */
$(".style-text").textContent = ESTILO.texto;
$(".style-tags").innerHTML = ESTILO.etiquetas.map(x => `<li>${esc(x)}</li>`).join("");
const ig = REDES.find(r => r.nombre === "Instagram" && r.url);
const subLink = $(".sub-link");
if (ig) { subLink.href = ig.url; subLink.textContent = `${ig.usuario} ↗`; } else subLink.remove();

const lookCols = $$(".look-col");
function renderLooks() {
  const n = innerWidth <= 560 ? 2 : 3;
  lookCols.forEach((c, i) => { c.hidden = i >= n; c.innerHTML = ""; });
  POSTS.filter(p => p.imagen).forEach((p, i) => {
    lookCols[i % n].insertAdjacentHTML("beforeend", `
      <figure class="look" data-i="${i}">
        <img src="${esc(p.imagen)}" alt="${esc(p.texto || "Look")}" loading="lazy" draggable="false" />
        <figcaption><span>${esc(p.texto || "")}</span>${p.enlace ? `<a href="${esc(p.enlace)}" target="_blank" rel="noopener" data-hover="Ver"><i>Ver ↗</i></a>` : ""}</figcaption>
      </figure>`);
  });
  $$(".look").forEach(l => lookIO.observe(l));
}
const lookIO = new IntersectionObserver(en => en.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); lookIO.unobserve(e.target); } }), { threshold: 0.2 });
renderLooks();

// doble clic / doble toque en un look: corazón
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

const designs = $(".designs");
designs.innerHTML = DISENOS.length
  ? DISENOS.map(d => `
    <figure class="design reveal">
      <div class="design-img"><img src="${esc(d.imagen)}" alt="${esc(d.titulo || "Diseño")}" loading="lazy" /></div>
      <p>${esc(d.titulo || "")}<span>${esc(d.tipo || "")}</span></p>
    </figure>`).join("")
  : `<div class="designs-empty reveal"><b>Diseños en proceso</b>Muy pronto, aquí.</div>`;

/* =========================================================
   Habilidades
   ========================================================= */
$(".tools").innerHTML = HABILIDADES.map(h => `
  <li class="tool reveal">
    <b>${esc(h.nombre)}<small>${esc(h.tipo)}</small></b>
    <span data-to="${Number(h.nivel) || 0}" data-suffix="%">0%</span>
    <i data-w="${Number(h.nivel) || 0}"></i>
  </li>`).join("");
$(".soft").innerHTML = "También: " + SOFT_SKILLS.map(s => `<span>${esc(s)}</span>`).join(" · ");

/* =========================================================
   Contacto y redes
   ========================================================= */
const ctTitle = $("[data-proximity]");
ctTitle.innerHTML = [...ctTitle.textContent].map(c => `<span>${esc(c)}</span>`).join("");
const ctLetters = $$("span", ctTitle);

const tel = String(PERFIL.telefono || "").replace(/\D/g, "");
$(".tel-text").textContent = tel.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");
const wa = $(".wa");
if (tel) wa.href = `https://wa.me/34${tel}`; else { wa.remove(); $('[data-copy="telefono"]').remove(); }

$$("[data-copy]").forEach(btn => btn.addEventListener("click", async () => {
  const isTel = btn.dataset.copy === "telefono";
  const value = isTel ? tel : PERFIL.email;
  try {
    await navigator.clipboard.writeText(value);
    toast(isTel ? "Teléfono copiado" : "Email copiado");
  } catch {
    const r = document.createRange(); r.selectNodeContents($("span", btn));
    getSelection().removeAllRanges(); getSelection().addRange(r);
    toast("Selecciónalo y cópialo");
  }
}));

$(".social-row").innerHTML = REDES.filter(r => r.url).map(r =>
  `<a href="${esc(r.url)}" target="_blank" rel="noopener" data-hover>${esc(r.nombre)}<i>↗</i></a>`).join("");

const tiktokUrl = `https://www.tiktok.com/@${TIKTOK_USUARIO}`;
const ttBox = $(".tiktok-box");
const ttLink = $(".tiktok-link");
ttLink.href = tiktokUrl; ttLink.textContent = `@${TIKTOK_USUARIO} ↗`;
ttBox.hidden = true; // se muestra solo si el perfil en directo carga
let ttLoaded = false;
function loadTikTok() {
  if (ttLoaded || !TIKTOK_USUARIO) return;
  ttLoaded = true;
  const slot = $(".tiktok-embed-slot");
  const bq = document.createElement("blockquote");
  bq.className = "tiktok-embed";
  bq.cite = tiktokUrl;
  bq.dataset.uniqueId = TIKTOK_USUARIO;
  bq.dataset.embedType = "creator";
  bq.style.cssText = "max-width:780px;min-width:288px;";
  bq.innerHTML = `<section><a target="_blank" href="${tiktokUrl}?refer=creator_embed">@${esc(TIKTOK_USUARIO)}</a></section>`;
  slot.append(bq);
  const s = document.createElement("script");
  s.src = "https://www.tiktok.com/embed.js";
  s.async = true;
  s.onload = () => {
    const check = setInterval(() => { if ($("iframe", slot)) { ttBox.hidden = false; clearInterval(check); } }, 400);
    setTimeout(() => clearInterval(check), 8000);
  };
  document.body.append(s);
}
new IntersectionObserver((en, obs) => { if (en[0].isIntersecting) { loadTikTok(); obs.disconnect(); } }, { rootMargin: "600px" }).observe($("#contacto"));

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
    $$("[data-w]", el).forEach(b => (b.style.width = b.dataset.w + "%"));
    $$("[data-to]", el).forEach(s => countUp(s, +s.dataset.to, s.dataset.suffix || ""));
    if (el.matches("[data-to]")) countUp(el, +el.dataset.to);
    io.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
$$(".reveal, .fact b[data-count]").forEach(el => io.observe(el));

const caseEls = $$(".case");
const caseIO = new IntersectionObserver(en => en.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); caseIO.unobserve(e.target); } }), { threshold: 0.2 });
caseEls.forEach(c => caseIO.observe(c));

/* =========================================================
   Scroll: progreso, menú, portada, bio e imágenes
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
  if (dy > 4 && scrollY > 300) nav.classList.add("hidden");
  if (dy < -4) nav.classList.remove("hidden");
  lastY = scrollY;

  if (!reduced) {
    // la foto se aleja y el nombre se separa hacia los lados
    const hp = Math.min(scrollY / innerHeight, 1.2);
    stage.style.transform = `translateY(${hp * innerHeight * 0.18}px) scale(${1 - hp * 0.08})`;
    heroWords.forEach((w, i) => {
      const dir = heroWords.length === 1 ? 0 : (i / (heroWords.length - 1)) * 2 - 1;
      w.style.transform = `translateX(${dir * hp * 18}vw)`;
      w.style.opacity = 1 - hp * 0.9;
    });
  }

  const r = statement.getBoundingClientRect();
  const progress = (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35);
  const lit = Math.round(clamp01(progress) * bioWords.length);
  bioWords.forEach((w, i) => w.classList.toggle("lit", i < lit));

  let current = -1;
  sections.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) current = i; });
  navLinks.forEach((a, i) => a.classList.toggle("active", i === current));
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Bucle de animación para las imágenes ligadas al scroll
const looksEl = $(".looks");
(function loop() {
  if (!reduced) {
    const vh = innerHeight;
    // Trabajos: la imagen se abre desde el borde y hace un zoom out suave
    caseEls.forEach(c => {
      const m = c.firstElementChild;
      const r = m.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0) return;
      const p = clamp01((vh - r.top) / (vh * 0.75));
      m.style.setProperty("--ci", ((1 - p) * 8) + "%");
      m.style.setProperty("--sc", 1.08 - p * 0.08);
    });
    // Looks: cada columna se mueve a su propia velocidad
    const lr = looksEl.getBoundingClientRect();
    if (lr.top < vh && lr.bottom > 0) {
      // al entrar, las columnas empiezan desplazadas hacia abajo y suben a distinto ritmo (nunca tapan el título)
      const off = Math.max(0, lr.top + lr.height / 2 - vh / 2);
      lookCols.forEach(c => c.style.setProperty("--ty", (off * parseFloat(c.dataset.speed)) + "px"));
    }
  }
  requestAnimationFrame(loop);
})();

let lastW = innerWidth;
addEventListener("resize", () => { if (innerWidth !== lastW) { lastW = innerWidth; renderLooks(); } });

/* =========================================================
   Ratón: cursor, inclinación 3D de la foto y letras de contacto
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
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
        const k = Math.max(0, 1 - d / 260);
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
    const t = e.target.closest("[data-hover]");
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

// Renderiza la web a partir de data.js — no hace falta tocar este archivo.

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const COLORS = ["var(--pink)", "var(--yellow)", "var(--blue)", "var(--green)", "var(--orange)"];

// ---------- Perfil ----------
$$("[data-perfil]").forEach(el => (el.textContent = PERFIL[el.dataset.perfil] ?? ""));
const mail = $("[data-perfil-mail]");
mail.textContent = PERFIL.email;
mail.href = `mailto:${PERFIL.email}`;
$("#year").textContent = new Date().getFullYear();

// ---------- Trabajos ----------
const categorias = [...new Set(TRABAJOS.map(t => t.categoria))];
const catIndex = cat => categorias.indexOf(cat) % COLORS.length;
const initials = t => t.split(" ").filter(w => w.length > 2).slice(0, 2).map(w => w[0].toUpperCase()).join("");

function cover(t) {
  return t.imagen
    ? `<img src="${esc(t.imagen)}" alt="${esc(t.titulo)}" loading="lazy" />`
    : `<span class="ph">${esc(initials(t.titulo))}</span>`;
}

const filters = $(".filters");
filters.innerHTML = ["Todos", ...categorias]
  .map((c, i) => `<button class="filter${i ? "" : " active"}" data-cat="${esc(c)}">${esc(c)}</button>`)
  .join("");

const grid = $(".works-grid");
grid.innerHTML = TRABAJOS.map((t, i) => `
  <button class="work reveal" data-i="${i}" data-cat="${esc(t.categoria)}">
    <div class="work-cover ${t.imagen ? "" : `c${catIndex(t.categoria)} pat`}">${cover(t)}</div>
    <div class="work-info">
      <div class="work-meta">
        <span class="badge c${catIndex(t.categoria)}">${esc(t.categoria)}</span>
        <span>${esc(t.curso || "")}</span>
      </div>
      <h3>${esc(t.titulo)}</h3>
      <p>${esc(t.descripcion)}</p>
    </div>
  </button>`).join("");

filters.addEventListener("click", e => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  $$(".filter").forEach(b => b.classList.toggle("active", b === btn));
  const cat = btn.dataset.cat;
  $$(".work").forEach(w => w.classList.toggle("hide", cat !== "Todos" && w.dataset.cat !== cat));
});

// ---------- Modal ----------
const modal = $(".modal");
grid.addEventListener("click", e => {
  const card = e.target.closest(".work");
  if (!card) return;
  const t = TRABAJOS[card.dataset.i];
  const mc = $(".modal-cover", modal);
  mc.className = `modal-cover ${t.imagen ? "" : `c${catIndex(t.categoria)} pat`}`;
  mc.innerHTML = cover(t);
  $(".modal-cat", modal).textContent = `${t.categoria}${t.curso ? " · " + t.curso : ""}`;
  $("#modal-title").textContent = t.titulo;
  $(".modal-desc", modal).textContent = t.descripcion;
  $(".modal-tools", modal).innerHTML = (t.herramientas || []).map(h => `<span>${esc(h)}</span>`).join("");
  const link = $(".modal-link", modal);
  link.hidden = !t.enlace;
  if (t.enlace) link.href = t.enlace;
  modal.showModal();
});
$(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

// ---------- Habilidades ----------
$(".tools").innerHTML = HABILIDADES.map((h, i) => `
  <div class="tool">
    <div class="tool-top"><b>${esc(h.nombre)}</b><span>${esc(h.tipo)}</span></div>
    <div class="bar"><i style="background:${COLORS[i % COLORS.length]}" data-w="${Number(h.nivel) || 0}"></i></div>
  </div>`).join("");
$(".chips").innerHTML = SOFT_SKILLS
  .map((s, i) => `<span class="chip" style="background:${COLORS[(i + 1) % COLORS.length]}">${esc(s)}</span>`)
  .join("");

// ---------- Redes ----------
const ICONS = {
  Instagram: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  TikTok: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z"/></svg>',
  LinkedIn: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg>',
};
$(".social-grid").innerHTML = REDES.map(r => `
  <a class="social-card reveal" href="${esc(r.url)}" target="_blank" rel="noopener" style="background:${r.color}">
    <span class="arrow">↗</span>
    ${ICONS[r.nombre] || ""}
    <div><h3>${esc(r.nombre)}</h3><small>${esc(r.usuario)}</small></div>
  </a>`).join("");

// ---------- Contadores ----------
$('[data-count="trabajos"]').textContent = TRABAJOS.length;
$('[data-count="herramientas"]').textContent = HABILIDADES.length;

// ---------- Animaciones al hacer scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    $$(".bar i", en.target).forEach(b => (b.style.width = b.dataset.w + "%"));
    io.unobserve(en.target);
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => io.observe(el));

// ---------- Nav ----------
const nav = $(".nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 20), { passive: true });
const toggle = $(".nav-toggle");
const links = $(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", e => { if (e.target.closest("a")) links.classList.remove("open"); });

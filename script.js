// Renderiza la web a partir de data.js — no hace falta tocar este archivo.

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

// ---------- Perfil ----------
$$("[data-perfil]").forEach(el => (el.textContent = PERFIL[el.dataset.perfil] ?? ""));
$("#year").textContent = new Date().getFullYear();

// Nombre letra a letra
const name = $("[data-split]");
name.innerHTML = PERFIL.nombre.split(" ").map(word =>
  `<span class="w">${[...word].map((c, i) => `<span class="ch" style="transition-delay:${i * 35}ms">${esc(c)}</span>`).join("")}</span>`
).join(" ");
requestAnimationFrame(() => setTimeout(() => name.classList.add("in"), 100));

// Foto (si no existe, se muestra el hueco "Tu foto aquí")
const photo = $(".photo img");
photo.addEventListener("error", () => photo.classList.add("missing"));
if (PERFIL.foto) photo.src = PERFIL.foto; else photo.classList.add("missing");

// Bio con palabras que se iluminan al hacer scroll
const statement = $("[data-words]");
statement.innerHTML = PERFIL.bio.split(" ").map(w => `<span>${esc(w)}</span> `).join("");
const words = $$("span", statement);

// ---------- Trabajos ----------
const initials = t => t.split(" ").filter(w => w.length > 2).slice(0, 2).map(w => w[0].toUpperCase()).join("");
const coverHTML = t => t.imagen
  ? `<img src="${esc(t.imagen)}" alt="${esc(t.titulo)}" />`
  : `<div class="ph-cover"><span>${esc(initials(t.titulo))}</span></div>`;

const categorias = [...new Set(TRABAJOS.map(t => t.categoria))];
const filters = $(".filters");
filters.innerHTML = ["Todos", ...categorias].map((c, i) => {
  const n = c === "Todos" ? TRABAJOS.length : TRABAJOS.filter(t => t.categoria === c).length;
  return `<button class="filter${i ? "" : " active"}" data-cat="${esc(c)}" data-hover>${esc(c)}<sup>${n}</sup></button>`;
}).join("");

const list = $(".works");
list.innerHTML = TRABAJOS.map((t, i) => `
  <li class="reveal" data-cat="${esc(t.categoria)}">
    <button class="work" data-i="${i}" data-hover="Ver">
      <span class="work-n">${String(i + 1).padStart(2, "0")}</span>
      <span class="work-t">${esc(t.titulo)}</span>
      <span class="work-c">${esc(t.categoria)}</span>
      <span class="work-y">${esc(t.curso || "")}</span>
      <span class="work-a">→</span>
    </button>
  </li>`).join("");

filters.addEventListener("click", e => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  $$(".filter").forEach(b => b.classList.toggle("active", b === btn));
  const cat = btn.dataset.cat;
  $$("li", list).forEach(li => li.classList.toggle("hide", cat !== "Todos" && li.dataset.cat !== cat));
});

// Modal
const modal = $(".modal");
list.addEventListener("click", e => {
  const row = e.target.closest(".work");
  if (!row) return;
  const t = TRABAJOS[row.dataset.i];
  $(".modal-cover", modal).innerHTML = coverHTML(t);
  $(".modal-cat", modal).textContent = `${t.categoria}${t.curso ? " · " + t.curso : ""}`;
  $("#modal-title").textContent = t.titulo;
  $(".modal-desc", modal).textContent = t.descripcion;
  $(".modal-tools", modal).innerHTML = (t.herramientas || []).map(h => `<span>${esc(h)}</span>`).join("");
  const link = $(".modal-link", modal);
  link.hidden = !t.enlace;
  if (t.enlace) link.href = t.enlace;
  preview.classList.remove("show");
  modal.showModal();
});
$(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

// ---------- Habilidades ----------
$(".tools").innerHTML = HABILIDADES.map(h => `
  <li class="tool reveal">
    <div class="tool-top"><div><b>${esc(h.nombre)}</b><small>${esc(h.tipo)}</small></div><span data-to="${Number(h.nivel) || 0}">0%</span></div>
    <div class="bar"><i data-w="${Number(h.nivel) || 0}"></i></div>
  </li>`).join("");
$(".chips").innerHTML = SOFT_SKILLS.map(s => `<span class="chip">${esc(s)}</span>`).join("");

// ---------- Contacto ----------
$(".socials").innerHTML = REDES.map(r => `
  <li><a href="${esc(r.url)}" target="_blank" rel="noopener" data-hover>
    <span><b>${esc(r.nombre)}</b><small>${esc(r.usuario)}</small></span><i>↗</i>
  </a></li>`).join("");

const toast = $(".toast");
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove("show"), 2000);
}
$(".mail").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(PERFIL.email);
    showToast("¡Email copiado!");
  } catch {
    location.href = `mailto:${PERFIL.email}`;
  }
});

// ---------- Contadores ----------
function countUp(el, to, suffix = "") {
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / 1200, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
$('[data-count="trabajos"]').dataset.to = TRABAJOS.length;
$('[data-count="herramientas"]').dataset.to = HABILIDADES.length;

// ---------- Aparición al hacer scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    el.classList.add("in");
    $$(".bar i", el).forEach(b => (b.style.width = b.dataset.w + "%"));
    $$("[data-to]", el).forEach(s => countUp(s, +s.dataset.to, s.closest(".tool") ? "%" : ""));
    if (el.matches("[data-to]")) countUp(el, +el.dataset.to);
    io.unobserve(el);
  });
}, { threshold: 0.15 });
$$(".reveal, .fact b[data-count]").forEach(el => io.observe(el));

// Palabras de la bio + sección activa en el menú
const navLinks = $$(".nav-links a");
const sections = navLinks.map(a => $(a.getAttribute("href")));
function onScroll() {
  const r = statement.getBoundingClientRect();
  const progress = (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35);
  const lit = Math.round(Math.max(0, Math.min(1, progress)) * words.length);
  words.forEach((w, i) => w.classList.toggle("lit", i < lit));

  let current = -1;
  sections.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) current = i; });
  navLinks.forEach((a, i) => a.classList.toggle("active", i === current));
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Interacciones con ratón ----------
const preview = $(".preview");
if (finePointer) {
  const cursor = $(".cursor");
  const label = $(".cursor-label");
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, px = mx, py = my;

  addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    document.body.style.setProperty("--mx", mx + "px");
    document.body.style.setProperty("--my", my + "px");
  });
  (function loop() {
    cx += (mx - cx) * 0.25; cy += (my - cy) * 0.25;
    px += (mx - px) * 0.12; py += (my - py) * 0.12;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    preview.style.transform = `translate(${px + 30}px, ${py - 120}px) rotate(${(mx - px) * 0.05}deg)`;
    requestAnimationFrame(loop);
  })();

  document.addEventListener("mouseover", e => {
    const t = e.target.closest("[data-hover]");
    const text = t?.dataset.hover;
    cursor.classList.toggle("label", !!text);
    cursor.classList.toggle("big", !!t && !text);
    label.textContent = text || "";
  });

  // Vista previa flotante de cada trabajo
  list.addEventListener("mouseover", e => {
    const row = e.target.closest(".work");
    if (!row) return;
    preview.innerHTML = coverHTML(TRABAJOS[row.dataset.i]);
    preview.classList.add("show");
  });
  list.addEventListener("mouseleave", () => preview.classList.remove("show"));

  // Foto con efecto 3D
  const tilt = $("[data-tilt]");
  tilt.addEventListener("mousemove", e => {
    const r = tilt.getBoundingClientRect();
    tilt.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 12 + "deg");
    tilt.style.setProperty("--rx", -((e.clientY - r.top) / r.height - 0.5) * 12 + "deg");
  });
  tilt.addEventListener("mouseleave", () => { tilt.style.setProperty("--rx", 0); tilt.style.setProperty("--ry", 0); });
}

/* =========================================================
   Chart Noir — web cerrada
   Punto de entrada: monta la escena, la interacción, la
   pantalla de carga y la cuenta atrás, y anima el logo.
   ========================================================= */
import "./styles.css";
import { DROP_DATE } from "./config.js";
import { createStage } from "./scene/stage.js";
import { createLogo } from "./scene/logo.js";
import { createControls } from "./interaction.js";
import { runIntro } from "./intro.js";
import { startCountdown } from "./countdown.js";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

const canvas = document.getElementById("scene");
const info = document.getElementById("info");
const hint = document.getElementById("hint");

if (window.matchMedia("(pointer: coarse)").matches) {
  hint.textContent = "Desliza el logo para girarlo";
}

startCountdown(document.getElementById("count"), DROP_DATE);

// ---------- Escena 3D (con plan B si el navegador no tiene WebGL) ----------
let three = null;
try {
  const stage = createStage(canvas);
  const logo = createLogo(stage.envMap);
  stage.scene.add(logo);
  three = { ...stage, logo };
  // Prepara shaders y sube la geometría a la tarjeta gráfica una sola vez,
  // con el lienzo aún oculto, para que la entrada vaya fluida desde el primer fotograma.
  stage.renderer.compile(stage.scene, stage.camera);
  stage.renderer.render(stage.scene, stage.camera);
} catch (err) {
  console.warn("WebGL no disponible, se muestra el logo plano.", err);
  canvas.remove();
  const img = document.createElement("img");
  img.src = "logo.svg";
  img.alt = "Chart Noir";
  img.className = "logo-fallback";
  document.body.prepend(img);
}

const controls = createControls(three ? canvas : document.body, {
  onFirstDrag: () => hint.classList.remove("show"),
});

// ---------- Animación ----------
let hitAt = -1; // momento en que el logo "golpea" su sitio
let last = performance.now();

function frame(now) {
  requestAnimationFrame(frame);
  // Mientras está la pantalla de carga no se dibuja nada: el contador va fluido.
  if (!three || hitAt < 0) { last = now; return; }
  const { renderer, scene, camera, logo, cursorLight, view } = three;

  // f = cuántos "fotogramas de 60 Hz" han pasado. Así la inercia se siente
  // igual en un móvil de 120 Hz que en un portátil de 60 Hz.
  const f = Math.min(4, (now - last) / (1000 / 60));
  last = now;
  const t = now / 1000;

  // Entrada: grande y girado → frena en seco + sacudida de cámara.
  let k = 1;
  let shake = 0;
  if (hitAt >= 0 && !reduce) {
    const ms = now - hitAt;
    k = easeOutExpo(Math.min(1, ms / 900));
    shake = ms < 380 ? (1 - ms / 380) * 0.25 : 0;
  }

  const c = controls;
  if (!c.dragging) {
    c.rotY += c.velY * f;
    c.rotX += c.velX * f;
    c.velY *= Math.pow(0.94, f);
    c.velX *= Math.pow(0.88, f);
    // Sin inercia: vuelve suavemente a ponerse de frente (la vuelta entera más cercana).
    if (Math.abs(c.velY) < 0.0015) {
      const front = Math.round(c.rotY / (Math.PI * 2)) * Math.PI * 2;
      c.rotY += (front - c.rotY) * (1 - Math.pow(0.97, f));
    }
    // Se inclina levemente hacia el cursor.
    c.rotX += (c.py * -0.1 - c.rotX) * (1 - Math.pow(0.95, f));
  }

  const breathe = reduce ? 0 : Math.sin(t * 0.5) * 0.05;
  logo.rotation.y = c.rotY + (c.dragging ? 0 : c.px * 0.2) + breathe + (1 - k) * -0.7;
  logo.rotation.x = c.rotX + (1 - k) * 0.25;
  logo.scale.setScalar(1 + (1 - k) * 0.45);
  logo.position.y = view.baseY + (reduce ? 0 : Math.sin(t * 0.9) * 0.06);

  camera.position.set((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake, view.dist);
  camera.lookAt(0, 0, 0);

  // La luz blanca persigue al cursor por la superficie.
  const follow = 1 - Math.pow(0.9, f);
  cursorLight.position.x += (c.px * 7 - cursorLight.position.x) * follow;
  cursorLight.position.y += (c.py * 4 + 1 - cursorLight.position.y) * follow;

  renderer.render(scene, camera);
}
requestAnimationFrame(frame);

// ---------- Entrada ----------
// "Listo" = tipografía cargada (máximo 3 s de espera) y escena preparada.
const fontsReady = Promise.race([
  document.fonts?.ready ?? Promise.resolve(),
  new Promise((r) => setTimeout(r, 3000)),
]);

runIntro({
  ready: fontsReady,
  reduce,
  onReveal() {
    canvas.style.visibility = "visible";
    hitAt = performance.now();
    setTimeout(() => {
      controls.enabled = true;
      info.classList.add("show");
      hint.classList.add("show");
      setTimeout(() => hint.classList.remove("show"), 4500);
    }, reduce ? 0 : 700);
  },
});

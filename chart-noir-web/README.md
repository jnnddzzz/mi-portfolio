# Chart Noir — web cerrada

La web oficial de Chart Noir mientras llega el primer drop: pantalla de carga, logo 3D interactivo y cuenta atrás.

Hecha con **Vite** (la herramienta que sirve la web mientras trabajas y la empaqueta para publicarla) y **Three.js** (la librería que dibuja el logo en 3D).

## Ponerla en marcha en tu ordenador

Necesitas tener instalado [Node.js](https://nodejs.org) (versión 20 o más nueva).

```bash
cd chart-noir-web
npm install     # descarga Three.js y Vite (solo la primera vez)
npm run dev     # abre la web en http://localhost:5173
```

Mientras `npm run dev` está encendido, cada vez que guardas un archivo la web se actualiza sola en el navegador.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Web en local para trabajar, con recarga automática. |
| `npm run build` | Crea la versión final optimizada en la carpeta `dist/`. |
| `npm run preview` | Enseña esa versión final en local, para revisarla antes de publicar. |
| `npm run iconos` | Regenera `favicon.svg` y `logo.svg` desde el trazado del logo. |

## Cambiar la fecha del drop

Abre `src/config.js` y cambia esta línea:

```js
export const DROP_DATE = new Date("2026-12-01T00:00:00+01:00");
```

`+01:00` es la hora de España en invierno. Si el drop cae en verano (de finales de marzo a finales de octubre), usa `+02:00`.

## Cómo está organizado

```
chart-noir-web/
├── index.html            la página: textos, título, imagen para compartir
├── src/
│   ├── config.js         ajustes (fecha del drop, duración de la carga…)
│   ├── main.js           une las piezas y anima el logo
│   ├── styles.css        colores y tipografía de la marca
│   ├── intro.js          pantalla de carga 0 → 100
│   ├── countdown.js      cuenta atrás
│   ├── interaction.js    ratón, dedo y teclado
│   └── scene/
│       ├── stage.js      cámara, luces y encuadre
│       └── logo.js       el logo en 3D
├── public/               favicon, logo plano, imagen para compartir
├── assets/               logos originales y trazado del logo
├── referencia/           el prototipo aprobado
└── CLAUDE.md             la guía de marca y del proyecto
```

## Publicarla (Vercel o Netlify)

1. Sube los cambios a GitHub.
2. En [Vercel](https://vercel.com) o [Netlify](https://netlify.com), crea un proyecto nuevo desde este repositorio.
3. En **Root directory** (carpeta raíz) pon `chart-noir-web`.
4. Detectan Vite solos: comando `npm run build`, carpeta `dist`.
5. Conecta tu dominio en los ajustes del proyecto.
6. Cuando tengas dominio, cambia en `index.html` la ruta de `og:image` por la dirección completa (por ejemplo `https://chartnoir.com/og-image.png`).

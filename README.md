# Portfolio · Jano Arribas Díaz

Portfolio personal de Marketing y Publicidad (2º Técnico Superior). Web estática oscura con concepto de presentación de producto (estilo Apple), interactiva y sin dependencias: HTML + CSS + JavaScript.

**Interacciones:** burbujas con el logo de cada red en la portada (flotan despacio, se paran al pasar el ratón, se arrastran y abren tus redes), apartados desplegables, tarjetas con brillo que sigue al ratón, TikTok en directo dentro de un móvil, intro con contador, foto de portada que entra a pantalla completa y se encoge hasta su sitio, nombre gigante que invierte los colores sobre la foto, nombre que se separa al bajar, bio que se ilumina al leer, imágenes de trabajos que se abren con el scroll, looks en columnas que se mueven a distinta velocidad, doble toque para dar like, cursor personalizado y letras de contacto que reaccionan al ratón.

## Secciones
1. **Inicio**: insignia de estudios, foto a pantalla completa que se encoge, nombre gigante y burbujas con enlaces (`BURBUJAS`)
2. **Sobre mí**: bio y cifras
3. **Explora mi trabajo**: capítulos que se despliegan al pulsarlos
   - Trabajos realizados (abierto por defecto)
   - Qué hago (`SERVICIOS`)
   - Estilo: galería con pestañas (Looks, Mi ropa y Diseños), carrusel que se arrastra y vista ampliada (`POSTS`, `ROPA`, `DISENOS`)
   - Redes sociales: Instagram y TikTok en directo
   - Habilidades
4. **Contacto**: email y teléfono que se copian con un clic, y WhatsApp

## ✏️ Cómo actualizar tu contenido
**Todo se edita en `data.js`**, no tienes que tocar nada más.

### Añadir un trabajo nuevo
Cada trabajo se ve dentro de su tarjeta y se recorre con scroll (diapositivas o un email largo), y se puede ampliar.

1. Exporta las páginas (por ejemplo desde Canva: Compartir → Descargar → JPG, todas las páginas) y súbelas a una carpeta nueva, como `assets/trabajos/mi-trabajo/01.jpg`, `02.jpg`…
   Desde GitHub: entra en la carpeta → **Add file → Upload files**.
2. Abre `data.js`, busca `TRABAJOS` y añade un bloque al principio de la lista:

```js
{
  titulo: "Campaña de verano",
  cliente: "Nombre de la marca",
  categoria: "Campañas",
  curso: "2º curso",
  tipoVisor: "diapositivas",          // o "email" para una pieza larga
  paginas: pags("mi-trabajo", 12),    // carpeta y número de páginas
  descripcion: "Qué hiciste, para qué y con qué resultado.",
  herramientas: ["Canva"],
  enlace: "",                         // opcional
},
```
3. Guarda (**Commit changes**). En 1-2 minutos la web se actualiza sola.

Si el trabajo es una sola imagen fija, usa `imagen: "assets/trabajos/portada.jpg"` en lugar de `paginas`.

Para un email en HTML (por ejemplo de MailerLite), guarda el código en `assets/trabajos/emails/mi-email.html` y usa `tipoVisor: "email"` con `email: "assets/trabajos/emails/mi-email.html"`. Al publicar, sus imágenes se descargan solas en `assets/trabajos/emails/img/`.

### Añadir looks (fotos de tus redes)
1. Sube la foto a `assets/redes/` (vertical, mejor la original que una captura).
2. En `data.js`, en `POSTS`, pon la ruta en `imagen`, un título corto en `texto` y el enlace del post en `enlace`.

### Añadir fotos o vídeos de tu ropa
1. Sube el archivo a `assets/ropa/` (fotos en JPG; vídeos en MP4, mejor de menos de 15 segundos y en vertical).
2. En `data.js`, en `ROPA`, añade una línea:
   - Foto: `{ imagen: "assets/ropa/mi-prenda.jpg", titulo: "Nombre", tipo: "Confección" },`
   - Vídeo: `{ video: "assets/ropa/mi-video.mp4", poster: "assets/ropa/mi-video.jpg", titulo: "Nombre", tipo: "Proceso" },`

### Añadir tus diseños
1. Sube la imagen a `assets/disenos/`.
2. En `data.js`, en `DISENOS`, añade: `{ imagen: "assets/disenos/mi-diseno.jpg", titulo: "Nombre", tipo: "Camiseta" },`

El texto y las etiquetas del apartado Estilo se cambian en `ESTILO`.

### Poner tu foto
Sube tu foto a `assets/` con el nombre `foto.jpg` (vertical queda mejor, formato 4:5). Mientras no exista se muestra un hueco con tus iniciales.

### Cambiar el color de acento
En `styles.css`, primera línea de `:root`, cambia `--accent: #d4ff3a;` por el color que quieras.

### Cambiar tus datos
En `data.js` edita `PERFIL` (email, bio...), `REDES` (usuarios, texto y miniaturas de cada red) y `HABILIDADES` (nivel de 0 a 100). Si añades la url de LinkedIn, aparece su tarjeta.

## 🌐 Publicar con GitHub Pages
1. Junta esta rama en `main`.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada vez que cambies algo en `main` se publica en `https://<tu-usuario>.github.io/mi-portfolio/`.

## Ver en local
Abre `index.html` en el navegador, o ejecuta `python3 -m http.server` y entra en `http://localhost:8000`.

# Portfolio · Jano Arribas Díaz

Portfolio personal de Marketing y Publicidad (2º Técnico Superior). Web estática oscura con concepto de presentación de producto (estilo Apple), interactiva y sin dependencias: HTML + CSS + JavaScript.

**Interacciones:** burbujas con el logo de cada red en la portada (flotan despacio, se paran al pasar el ratón, se arrastran y abren tus redes), apartados desplegables, tarjetas con brillo que sigue al ratón, TikTok en directo dentro de un móvil, intro con contador, foto de portada que entra a pantalla completa y se encoge hasta su sitio, nombre gigante que invierte los colores sobre la foto, nombre que se separa al bajar, bio que se ilumina al leer, imágenes de trabajos que se abren con el scroll, looks en columnas que se mueven a distinta velocidad, doble toque para dar like, cursor personalizado y letras de contacto que reaccionan al ratón.

## Secciones
1. **Inicio**: insignia de estudios, foto a pantalla completa que se encoge, nombre gigante y burbujas con enlaces (`BURBUJAS`)
2. **Sobre mí**: bio y cifras
3. **Explora mi trabajo**: capítulos que se despliegan al pulsarlos
   - Trabajos realizados (abierto por defecto)
   - Qué hago (`SERVICIOS`)
   - Estilo: biblioteca de looks con filtros y vista ampliada con miniaturas (`POSTS`), y "La ropa que hago": colecciones que se quedan fijas y pasan sus fotos de lado al hacer scroll (`COLECCIONES`)
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

### Añadir looks a la biblioteca
1. Sube la foto a `assets/looks/` y una copia pequeña (unos 640 px de ancho) a `assets/looks/mini/`.
2. En `data.js`, en `POSTS`, añade una línea:
   `{ imagen: "assets/looks/mi-look.jpg", mini: "assets/looks/mini/mi-look.jpg", texto: "Nombre del look", grupo: "Color" },`
   `grupo` crea los filtros (Color, Neutros, Denim… o uno nuevo).

### Añadir fotos a una colección de ropa
1. Sube la foto a la carpeta de la colección (`assets/ropa/toile/`, `assets/ropa/vaca/`…).
2. En `data.js`, en `COLECCIONES`, añade una línea en `piezas` de esa colección:
   `{ imagen: "assets/ropa/vaca/02-foto.jpg", paso: "Confección", texto: "Qué se ve en la foto" },`
   Los `paso` iguales se agrupan en la lista de pasos. Baja `proximamente` cuando ya no quieras huecos de "Próximamente".
3. Para una colección nueva, copia un bloque `{ id, nombre, subtitulo, texto, color, estado, piezas }`.

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

# Portfolio · Jano Arribas Díaz

Portfolio personal de Marketing y Publicidad (2º Técnico Superior). Web estática oscura, minimalista e interactiva, sin dependencias: HTML + CSS + JavaScript.

**Interacciones:** intro con contador, foto de portada que entra a pantalla completa y se encoge hasta su sitio, nombre gigante que invierte los colores sobre la foto, nombre que se separa al bajar, bio que se ilumina al leer, imágenes de trabajos que se abren con el scroll, looks en columnas que se mueven a distinta velocidad, doble toque para dar like, cursor personalizado y letras de contacto que reaccionan al ratón.

## Secciones
1. **Inicio**: foto a pantalla completa que se encoge, nombre gigante sobre la foto y frase que rota
2. **Sobre mí**: bio y datos
3. **Qué hago**: servicios desplegables (`SERVICIOS` en `data.js`)
4. **Trabajos realizados**: imagen, título, marca y descripción breve
5. **Estilo**: moda (tus looks, de `POSTS`) y tus diseños (`DISENOS`)
6. **Redes sociales**: tarjetas de Instagram y TikTok (`REDES` en `data.js`)
7. **Habilidades**: herramientas y soft skills
8. **Contacto**: email y teléfono que se copian con un clic, y WhatsApp

## ✏️ Cómo actualizar tu contenido
**Todo se edita en `data.js`**, no tienes que tocar nada más.

### Añadir un trabajo nuevo
1. Sube la imagen a la carpeta `assets/trabajos/` (por ejemplo `assets/trabajos/cartel-feria.jpg`).
   Desde GitHub: entra en la carpeta → **Add file → Upload files**.
2. Abre `data.js`, busca `TRABAJOS` y copia un bloque al principio de la lista:

```js
{
  titulo: "Cartel feria del libro",
  cliente: "Biblioteca municipal",
  categoria: "Diseño",          // Diseño, Redes sociales, Campañas, Vídeo... o una nueva
  curso: "2º curso",
  imagen: "assets/trabajos/cartel-feria.jpg",
  descripcion: "Qué hiciste, para qué y con qué resultado.",
  puntos: ["Lo primero que hiciste", "Lo segundo", "Lo tercero"],
  herramientas: ["Canva"],
  enlace: "",                   // opcional: PDF, Canva, Drive, post de Instagram...
},
```
3. Guarda (**Commit changes**). En 1-2 minutos la web se actualiza sola.

### Añadir looks (fotos de tus redes)
1. Sube la foto a `assets/redes/` (vertical, mejor la original que una captura).
2. En `data.js`, en `POSTS`, pon la ruta en `imagen`, un título corto en `texto` y el enlace del post en `enlace`.

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

# Portfolio · Jano Arribas Díaz

Portfolio personal de Marketing y Publicidad (2º Técnico Superior). Web estática oscura, minimalista e interactiva, sin dependencias: HTML + CSS + JavaScript.

**Interacciones:** cursor personalizado, nombre animado letra a letra, foto con efecto 3D (blanco y negro → color al pasar el ratón), bio que se ilumina al hacer scroll, lista de trabajos con vista previa flotante, contadores animados y email que se copia con un clic.

## Secciones
1. **Inicio**: nombre, lema y tu foto de presentación
2. **Sobre mí**: bio y datos
3. **Trabajos**: lista con filtros por categoría y vista ampliada
4. **Habilidades**: herramientas (Canva, CapCut, Meta Ads, Google Ads) y soft skills
5. **Contacto**: email y redes sociales (Instagram, TikTok, LinkedIn)

## ✏️ Cómo actualizar tu contenido
**Todo se edita en `data.js`**, no tienes que tocar nada más.

### Añadir un trabajo nuevo
1. Sube la imagen a la carpeta `assets/trabajos/` (por ejemplo `assets/trabajos/cartel-feria.jpg`).
   Desde GitHub: entra en la carpeta → **Add file → Upload files**.
2. Abre `data.js`, busca `TRABAJOS` y copia un bloque al principio de la lista:

```js
{
  titulo: "Cartel feria del libro",
  categoria: "Diseño",          // Diseño, Redes sociales, Campañas, Vídeo... o una nueva
  curso: "2º curso",
  imagen: "assets/trabajos/cartel-feria.jpg",
  descripcion: "Qué hiciste, para qué y con qué resultado.",
  herramientas: ["Canva"],
  enlace: "",                   // opcional: PDF, Canva, Drive, post de Instagram...
},
```
3. Guarda (**Commit changes**). En 1-2 minutos la web se actualiza sola.

Si creas una categoría nueva, aparece automáticamente como filtro.

### Poner tu foto
Sube tu foto a `assets/` con el nombre `foto.jpg` (vertical queda mejor, formato 4:5). Mientras no exista se muestra un hueco con tus iniciales.

### Cambiar el color de acento
En `styles.css`, primera línea de `:root`, cambia `--accent: #d4ff3a;` por el color que quieras.

### Cambiar tus datos
En `data.js` edita `PERFIL` (email, bio...), `REDES` (tus usuarios) y `HABILIDADES` (nivel de 0 a 100).

## 🌐 Publicar con GitHub Pages
1. Junta esta rama en `main`.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada vez que cambies algo en `main` se publica en `https://<tu-usuario>.github.io/mi-portfolio/`.

## Ver en local
Abre `index.html` en el navegador, o ejecuta `python3 -m http.server` y entra en `http://localhost:8000`.

# Portfolio · Jano Arribas Díaz

Portfolio personal de Marketing y Publicidad (2º Técnico Superior). Web estática oscura, minimalista e interactiva, sin dependencias: HTML + CSS + JavaScript.

**Interacciones:** intro con contador, sistema de logros (el visitante desbloquea 8 logros mientras explora, con confeti al completar el 100%), barra de progreso, cursor personalizado, botones magnéticos, palabra que rota en la portada, foto y tarjetas con efecto 3D y brillo, cinta que reacciona a la velocidad del scroll, bio que se ilumina al hacer scroll, posts con "doble toque para dar like", perfil de TikTok en directo, letras de contacto que reaccionan al ratón y easter egg (5 clics en el logo).

## Secciones
1. **Inicio**: nombre, lema y tu foto de presentación
2. **Sobre mí**: bio y datos
3. **Trabajos**: tarjetas con filtros por categoría y vista ampliada
4. **Redes**: posts destacados, perfil de TikTok en directo y enlaces a Instagram/TikTok
5. **Habilidades**: herramientas y soft skills
6. **Contacto**: email que se copia con un clic

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

### Añadir posts de tus redes
1. Haz captura o descarga la imagen de tus mejores publicaciones y súbelas a `assets/redes/`.
2. En `data.js`, en `POSTS`, pon la ruta en `imagen` y el enlace del post en `enlace`.

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

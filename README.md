# Portfolio · Jano Arribas Díaz

Portfolio personal de Marketing y Publicidad (2º Técnico Superior). Web estática, moderna y colorida, sin dependencias: HTML + CSS + JavaScript.

## Secciones
1. **Inicio**: presentación
2. **Sobre mí**: bio y datos
3. **Trabajos**: galería con filtros por categoría y vista ampliada
4. **Habilidades**: herramientas (Canva, CapCut, Meta Ads, Google Ads) y soft skills
5. **Redes sociales**: Instagram, TikTok y LinkedIn
6. **Contacto**

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

### Cambiar tus datos
En `data.js` edita `PERFIL` (email, bio...), `REDES` (tus usuarios) y `HABILIDADES` (nivel de 0 a 100).

## 🌐 Publicar con GitHub Pages
1. Junta esta rama en `main`.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada vez que cambies algo en `main` se publica en `https://<tu-usuario>.github.io/mi-portfolio/`.

## Ver en local
Abre `index.html` en el navegador, o ejecuta `python3 -m http.server` y entra en `http://localhost:8000`.

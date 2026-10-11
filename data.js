/* =========================================================
   TU CONTENIDO — edita SOLO este archivo para actualizar la web
   ========================================================= */

const PERFIL = {
  nombre: "Jano Arribas Díaz",
  titulo: "Marketing & Publicidad",
  estudios: "2º Técnico Superior en Marketing y Publicidad",
  bio: "Estudiante de 2º de Marketing y Publicidad. Me apasiona crear ideas que se vean, se compartan y vendan: diseño para redes, contenido en vídeo, landing pages y campañas de publicidad digital.",
  email: "jano102207@gmail.com",
  telefono: "659506979", // sin espacios; se usa para llamar y para WhatsApp
  ubicacion: "España",
  // Tu foto de presentación: súbela como assets/foto.jpg (o cambia la ruta)
  foto: "assets/foto.jpg",
  // Palabras que van rotando en la portada: "Ideas que se ___"
  palabras: ["ven", "comparten", "recuerdan", "venden"],
};

// Si dejas la url vacía (""), esa red no aparece
const REDES = [
  { nombre: "Instagram", usuario: "@jjn.dzz", url: "https://www.instagram.com/jjn.dzz/" },
  { nombre: "TikTok",    usuario: "@jjn.dzz", url: "https://www.tiktok.com/@jjn.dzz" },
  { nombre: "LinkedIn",  usuario: "Jano Arribas Díaz", url: "" },
];

// Usuario de TikTok para mostrar tu perfil en directo en la sección de redes
const TIKTOK_USUARIO = "jjn.dzz";

/* ---------- POSTS DESTACADOS DE REDES ----------
   Sube capturas o fotos de tus mejores publicaciones a assets/redes/
   y pon aquí la ruta + el enlace al post. Si "imagen" está vacía
   se muestra un hueco de color.
*/
const POSTS = [
  { imagen: "assets/redes/post-1.jpg", enlace: "https://www.instagram.com/jjn.dzz/", red: "Instagram", texto: "Outfit amarillo" },
  { imagen: "assets/redes/post-2.jpg", enlace: "https://www.instagram.com/jjn.dzz/", red: "Instagram", texto: "Rojo en la piscina" },
  { imagen: "assets/redes/post-3.jpg", enlace: "https://www.instagram.com/jjn.dzz/", red: "Instagram", texto: "Look beige" },
  { imagen: "assets/redes/post-4.jpg", enlace: "https://www.instagram.com/jjn.dzz/", red: "Instagram", texto: "Rosa y crochet" },
  { imagen: "assets/redes/post-5.jpg", enlace: "https://www.instagram.com/jjn.dzz/", red: "Instagram", texto: "Diesel" },
  { imagen: "assets/redes/post-6.jpg", enlace: "https://www.instagram.com/jjn.dzz/", red: "Instagram", texto: "Chándal morado" },
];

const HABILIDADES = [
  { nombre: "Canva",       nivel: 90, tipo: "Diseño" },
  { nombre: "CapCut",      nivel: 85, tipo: "Vídeo" },
  { nombre: "Meta Ads",    nivel: 70, tipo: "Publicidad" },
  { nombre: "Google Ads",  nivel: 65, tipo: "Publicidad" },
  { nombre: "MailerLite",  nivel: 70, tipo: "Email marketing" },
  { nombre: "Apps Script", nivel: 55, tipo: "Web" },
];

const SOFT_SKILLS = [
  "Creatividad", "Copywriting", "Storytelling", "Trabajo en equipo",
  "Estrategia de contenido", "Análisis de métricas", "Gestión de RRSS", "Branding",
];

/* ---------- TRABAJOS ----------
   Para añadir un trabajo copia un bloque { ... } y rellénalo.
   - categoria: "Web" | "Diseño" | "Redes sociales" | "Campañas" | "Vídeo" (o la tuya)
   - imagen: sube la captura a assets/trabajos/ y pon la ruta. Si la dejas
             vacía se genera una portada automática.
   - enlace: opcional (la web, PDF, Canva, Drive, post...)
   - imagenGrande: opcional, imagen más completa para la vista ampliada
   - colores: opcional, colores de la portada automática [fondo, texto]
   El primero de la lista lleva la etiqueta "NUEVO".
*/
const TRABAJOS = [
  {
    titulo: "Email de Halloween · El Corte Inglés",
    categoria: "Email marketing",
    curso: "2º curso",
    imagen: "assets/trabajos/halloween-el-corte-ingles.jpg",
    imagenGrande: "assets/trabajos/halloween-el-corte-ingles-completo.jpg",
    descripcion: "Campaña de email marketing \"Noche de terror en tu casa\" diseñada en MailerLite para la colección de Halloween de El Corte Inglés: asunto con emoji para mejorar la apertura, estética oscura con naranja de marca y fichas de producto con llamada a la compra.",
    herramientas: ["MailerLite", "Email marketing", "Copywriting", "Diseño"],
    enlace: "",
  },
  {
    titulo: "Landing page IKEA",
    categoria: "Web",
    curso: "2º curso",
    imagen: "",
    colores: ["#0058a3", "#ffdb00"],
    descripcion: "Landing page para IKEA creada con Google Apps Script: estructura de la página, textos persuasivos, llamadas a la acción y diseño adaptado a la identidad de la marca.",
    herramientas: ["Google Apps Script", "HTML", "CSS", "Copywriting"],
    enlace: "https://script.google.com/a/macros/lassalinassf.es/s/AKfycbxoHOhpAaZDSxKR1KfTBNJbcLHLeM5A5ENgvMVPtDiW3_ZuyAW1uNkmiaCib9T1FpLe/exec",
  },
];

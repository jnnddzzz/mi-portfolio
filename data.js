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

// Lo que ofreces: aparece en la sección "Qué hago"
const SERVICIOS = [
  { titulo: "Contenido para redes sociales", texto: "Ideas, fotografía y vídeo vertical pensados para Instagram y TikTok, con una estética propia y coherente.", tags: ["Instagram", "TikTok", "CapCut", "Canva"] },
  { titulo: "Email marketing", texto: "Campañas de email con asunto trabajado, diseño adaptado a la marca y llamadas a la acción claras.", tags: ["MailerLite", "Copywriting"] },
  { titulo: "Publicidad digital", texto: "Planificación de anuncios y públicos para captar atención y convertirla en resultados.", tags: ["Meta Ads", "Google Ads"] },
  { titulo: "Landing pages", texto: "Páginas de aterrizaje enfocadas a un único objetivo, con textos persuasivos y estructura clara.", tags: ["Apps Script", "HTML", "CSS"] },
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
   - cliente: la marca para la que lo hiciste
   - categoria: "Web" | "Diseño" | "Redes sociales" | "Campañas" | "Vídeo" (o la tuya)
   - puntos: lo que hiciste, en frases cortas
   - imagen: sube la captura a assets/trabajos/ y pon la ruta. Si la dejas
             vacía se genera una portada automática.
   - enlace: opcional (la web, PDF, Canva, Drive, post...)
   - imagenGrande: opcional, imagen más completa para la vista ampliada
   - colores: opcional, colores de la portada automática [fondo, texto]
   El primero de la lista es el más reciente.
*/
const TRABAJOS = [
  {
    titulo: "Email de Halloween",
    cliente: "El Corte Inglés",
    categoria: "Email marketing",
    curso: "2º curso",
    imagen: "assets/trabajos/halloween-portada.jpg",
    descripcion: "Campaña de email marketing «Noche de terror en tu casa» diseñada en MailerLite para presentar la colección de decoración de Halloween de El Corte Inglés.",
    puntos: [
      "Asunto con emoji para destacar en la bandeja: «🎃 Noche de terror: tu casa, lista para Halloween»",
      "Cabecera con la marca y estética oscura con el naranja como color protagonista",
      "Fichas de producto con imagen, descripción y llamada a la compra",
    ],
    herramientas: ["MailerLite", "Copywriting", "Diseño de email"],
    enlace: "",
  },
  {
    titulo: "Landing page",
    cliente: "IKEA",
    categoria: "Web",
    curso: "2º curso",
    imagen: "assets/trabajos/ikea-portada.jpg",
    descripcion: "Landing page para IKEA desarrollada y publicada con Google Apps Script, pensada para guiar al usuario hacia una única acción.",
    puntos: [
      "Estructura de landing: cabecera, propuesta de valor y llamada a la acción",
      "Textos persuasivos adaptados al tono cercano de la marca",
      "Diseño con los colores de IKEA y publicada como aplicación web",
    ],
    herramientas: ["Google Apps Script", "HTML", "CSS", "Copywriting"],
    enlace: "https://script.google.com/a/macros/lassalinassf.es/s/AKfycbxoHOhpAaZDSxKR1KfTBNJbcLHLeM5A5ENgvMVPtDiW3_ZuyAW1uNkmiaCib9T1FpLe/exec",
  },
];

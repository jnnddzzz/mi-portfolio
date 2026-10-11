/* =========================================================
   TU CONTENIDO — edita SOLO este archivo para actualizar la web
   ========================================================= */

const PERFIL = {
  nombre: "Jano Arribas Díaz",
  titulo: "Marketing & Publicidad",
  estudios: "2º Técnico Superior en Marketing y Publicidad",
  bio: "Estudiante de 2º de Marketing y Publicidad. Me apasiona crear ideas que se vean, se compartan y vendan: diseño para redes, contenido en vídeo y campañas de publicidad digital.",
  email: "tuemail@ejemplo.com", // <- cambia por tu email
  ubicacion: "España",
};

// Pon aquí tus usuarios reales (sin la @) o deja la URL completa
const REDES = [
  { nombre: "Instagram", usuario: "@tuusuario", url: "https://instagram.com/tuusuario", color: "var(--pink)" },
  { nombre: "TikTok",    usuario: "@tuusuario", url: "https://tiktok.com/@tuusuario",   color: "var(--ink)" },
  { nombre: "LinkedIn",  usuario: "Jano Arribas Díaz", url: "https://linkedin.com/in/tuusuario", color: "var(--blue)" },
];

const HABILIDADES = [
  { nombre: "Canva",      nivel: 90, tipo: "Diseño" },
  { nombre: "CapCut",     nivel: 85, tipo: "Vídeo" },
  { nombre: "Meta Ads",   nivel: 70, tipo: "Publicidad" },
  { nombre: "Google Ads", nivel: 65, tipo: "Publicidad" },
];

const SOFT_SKILLS = [
  "Creatividad", "Copywriting", "Storytelling", "Trabajo en equipo",
  "Estrategia de contenido", "Análisis de métricas", "Gestión de RRSS", "Branding",
];

/* ---------- TRABAJOS ----------
   Para añadir un trabajo copia un bloque { ... } y rellénalo.
   - categoria: "Diseño" | "Redes sociales" | "Campañas" | "Vídeo" (o crea la tuya)
   - imagen: sube la foto a assets/trabajos/ y pon la ruta. Si la dejas vacía
             se muestra una portada de color automática.
   - enlace: opcional (PDF, Canva, Drive, post de Instagram...)
*/
const TRABAJOS = [
  {
    titulo: "Campaña de lanzamiento",
    categoria: "Campañas",
    curso: "2º curso",
    imagen: "",
    descripcion: "Briefing, concepto creativo y piezas para el lanzamiento de un producto ficticio en redes sociales.",
    herramientas: ["Canva", "Meta Ads"],
    enlace: "",
  },
  {
    titulo: "Identidad visual para marca local",
    categoria: "Diseño",
    curso: "1º curso",
    imagen: "",
    descripcion: "Propuesta de logotipo, paleta de color y aplicaciones para un pequeño comercio.",
    herramientas: ["Canva"],
    enlace: "",
  },
  {
    titulo: "Calendario de contenidos Instagram",
    categoria: "Redes sociales",
    curso: "2º curso",
    imagen: "",
    descripcion: "Planificación mensual de publicaciones, copies y diseño de plantillas para feed y stories.",
    herramientas: ["Canva", "Instagram"],
    enlace: "",
  },
  {
    titulo: "Spot para TikTok",
    categoria: "Vídeo",
    curso: "2º curso",
    imagen: "",
    descripcion: "Guion, grabación y edición de un vídeo corto publicitario adaptado a formato vertical.",
    herramientas: ["CapCut"],
    enlace: "",
  },
  {
    titulo: "Cartelería para evento",
    categoria: "Diseño",
    curso: "1º curso",
    imagen: "",
    descripcion: "Serie de carteles y piezas digitales para la difusión de un evento del centro.",
    herramientas: ["Canva"],
    enlace: "",
  },
  {
    titulo: "Campaña Google Ads",
    categoria: "Campañas",
    curso: "2º curso",
    imagen: "",
    descripcion: "Estructura de campaña de búsqueda, palabras clave, anuncios y propuesta de presupuesto.",
    herramientas: ["Google Ads"],
    enlace: "",
  },
];

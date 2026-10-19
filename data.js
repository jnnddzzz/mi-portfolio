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

/* Tus redes: aparecen en la sección "Redes sociales".
   Si dejas la url vacía (""), esa red no aparece.
   - texto: qué publicas ahí
   - fotos: miniaturas que se ven en la tarjeta (opcional)
*/
const REDES = [
  { nombre: "Instagram", usuario: "@jjn.dzz", url: "https://www.instagram.com/jjn.dzz/", texto: "Moda, looks y estilo personal",
    fotos: ["assets/redes/post-1.jpg", "assets/redes/post-4.jpg", "assets/redes/post-6.jpg"] },
  { nombre: "TikTok",    usuario: "@jjn.dzz", url: "https://www.tiktok.com/@jjn.dzz", texto: "Vídeos, tendencias y contenido", fotos: [] },
  { nombre: "LinkedIn",  usuario: "Jano Arribas Díaz", url: "", texto: "Perfil profesional", fotos: [] },
];

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

/* ---------- ESTILO: moda y diseños ----------
   El texto y las etiquetas aparecen en el apartado "Estilo".
   Tus looks son las fotos de POSTS.
*/
const ESTILO = {
  texto: "La moda es parte de cómo me comunico. Me mueven el streetwear, los colores que no pasan desapercibidos y los looks que cuentan algo antes de decir nada.",
  etiquetas: ["Streetwear", "Color", "Oversize", "Estampados", "Sneakers"],
};

/* Tus diseños: sube cada imagen a assets/disenos/ y añade una línea así:
   { imagen: "assets/disenos/mi-diseno.jpg", titulo: "Nombre del diseño", tipo: "Camiseta" },
   Mientras la lista esté vacía, se muestra "Diseños en proceso".
*/
const DISENOS = [];

/* ---------- QUÉ HAGO ----------
   Cada servicio es una tarjeta. icono: web | campana | redes | marca | email | video | estrategia
   grande: true hace la tarjeta más ancha.
*/
const SERVICIOS = [
  { icono: "web",        grande: true, titulo: "Diseño de webs y landing pages", texto: "Webs y páginas de aterrizaje claras, rápidas y pensadas para convertir: estructura, textos persuasivos y diseño adaptado a la marca.", tags: ["HTML", "CSS", "Apps Script"] },
  { icono: "campana",    titulo: "Campañas publicitarias", texto: "Planifico y lanzo campañas de principio a fin: objetivo, público, creatividades y seguimiento de resultados.", tags: ["Meta Ads", "Google Ads"] },
  { icono: "redes",      titulo: "Gestión de redes sociales", texto: "Creo, programo y publico contenido, y llevo el día a día de las cuentas para que crezcan con una estética coherente.", tags: ["Instagram", "TikTok"] },
  { icono: "marca",      titulo: "Logotipos e identidad de marca", texto: "Diseño logos y sistemas visuales completos: colores, tipografías y aplicaciones para que una marca se reconozca al instante.", tags: ["Branding", "Canva"] },
  { icono: "email",      titulo: "Email marketing", texto: "Newsletters y campañas de email con asuntos que se abren y diseños que llevan a la acción.", tags: ["MailerLite"] },
  { icono: "video",      grande: true, titulo: "Contenido en foto y vídeo", texto: "Fotografía y vídeo vertical para marcas y redes: idea, grabación y edición con ritmo y estilo propio.", tags: ["CapCut", "Reels", "TikTok"] },
  { icono: "estrategia", titulo: "Estrategia y planes de marketing", texto: "Análisis de mercado, público objetivo y plan de acción para que cada paso tenga un porqué.", tags: ["DAFO", "Plan de marketing"] },
];

/* ---------- BURBUJAS DE LA PORTADA ----------
   Enlaces rápidos que flotan en la portada. tipo: instagram | tiktok | whatsapp | email | trabajos | linkedin
*/
const BURBUJAS = ["instagram", "tiktok", "whatsapp", "email", "trabajos"];

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
   - categoria: tipo de trabajo (Email marketing, Web, Investigación...)
   - paginas: imágenes que se recorren con scroll dentro de la tarjeta
              (diapositivas de Canva, un email largo, etc.). Súbelas a
              assets/trabajos/ y pon aquí sus rutas en orden.
   - tipoVisor: "diapositivas" (presentaciones) o "email" (una pieza larga)
   - imagen: portada fija si el trabajo no tiene páginas
   - enlace: opcional (la web, el PDF, etc.)
   El primero de la lista es el más reciente.
*/
const pags = (carpeta, n) => Array.from({ length: n }, (_, i) => `assets/trabajos/${carpeta}/${String(i + 1).padStart(2, "0")}.jpg`);

const TRABAJOS = [
  {
    titulo: "Email de Black Friday",
    cliente: "Cestto Supermercados",
    categoria: "Email marketing",
    curso: "2º curso",
    tipoVisor: "email",
    paginas: ["assets/trabajos/cesto-email.jpg"],
    descripcion: "Campaña de email para el Black Friday de Cestto, «tu súper de barrio», diseñada en MailerLite: asunto «🖤 BLACK FRIDAY: hasta -70 % y ya ha empezado», sello de descuento, oferta estrella y llamadas a la acción claras.",
    herramientas: ["MailerLite", "Copywriting", "Diseño de email"],
    enlace: "",
  },
  {
    titulo: "Dossier de marca",
    cliente: "Cruzcampo",
    categoria: "Investigación publicitaria",
    curso: "2º curso",
    tipoVisor: "diapositivas",
    paginas: pags("cruzcampo", 18),
    descripcion: "Dossier para el Día de la Empresa Andaluza: dónde se anuncia Cruzcampo, análisis de los anuncios «Lola» (televisión) y «Sociedad Latera» (exterior) y recomendación de medios. Realizado junto a Antonio José Martín Pérez.",
    herramientas: ["Canva", "Investigación de medios", "Análisis publicitario"],
    enlace: "",
  },
  {
    titulo: "Email de Halloween",
    cliente: "El Corte Inglés",
    categoria: "Email marketing",
    curso: "2º curso",
    tipoVisor: "email",
    paginas: ["assets/trabajos/halloween-email.jpg"],
    descripcion: "Campaña de email «Noche de terror en tu casa» diseñada en MailerLite para presentar la colección de decoración de Halloween de El Corte Inglés.",
    herramientas: ["MailerLite", "Copywriting", "Diseño de email"],
    enlace: "",
  },
  {
    titulo: "Propuesta de publicidad en prensa",
    cliente: "La Cookiteria",
    categoria: "Planificación de medios",
    curso: "2º curso",
    tipoVisor: "diapositivas",
    paginas: pags("cookiteria", 5),
    descripcion: "Campaña regional en Cádiz en el periódico 20 minutos: soporte y formato elegidos, un anuncio personalizado que se descubre al deslizar la página y la estimación de costes de inserción.",
    herramientas: ["Canva", "Planificación de medios", "Presupuesto"],
    enlace: "",
  },
  {
    titulo: "Landing page",
    cliente: "IKEA",
    categoria: "Web",
    curso: "2º curso",
    imagen: "assets/trabajos/ikea-portada.jpg",
    descripcion: "Landing page para IKEA desarrollada y publicada con Google Apps Script, pensada para guiar al usuario hacia una única acción.",
    herramientas: ["Google Apps Script", "HTML", "CSS", "Copywriting"],
    enlace: "https://script.google.com/a/macros/lassalinassf.es/s/AKfycbxoHOhpAaZDSxKR1KfTBNJbcLHLeM5A5ENgvMVPtDiW3_ZuyAW1uNkmiaCib9T1FpLe/exec",
  },
];

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

/* ---------- BIBLIOTECA DE LOOKS ----------
   Aparecen en "Estilo" > "Mis looks". Para añadir uno, sube la foto a assets/looks/
   (y una copia pequeña, de unos 640 px, a assets/looks/mini/) y añade una línea:
   { imagen: "assets/looks/mi-look.jpg", mini: "assets/looks/mini/mi-look.jpg", texto: "Nombre", grupo: "Color" },
   grupo sirve para los filtros: "Color", "Neutros" o "Denim" (puedes crear otros).
   mini y enlace son opcionales.
*/
const POSTS = [
  { imagen: "assets/looks/look-01.jpg", mini: "assets/looks/mini/look-01.jpg", texto: "Amarillo y camuflaje", grupo: "Color" },
  { imagen: "assets/looks/look-02.jpg", mini: "assets/looks/mini/look-02.jpg", texto: "Graffiti y denim", grupo: "Denim" },
  { imagen: "assets/looks/look-03.jpg", mini: "assets/looks/mini/look-03.jpg", texto: "Gris total", grupo: "Neutros" },
  { imagen: "assets/looks/look-04.jpg", mini: "assets/looks/mini/look-04.jpg", texto: "Morado 88", grupo: "Color" },
  { imagen: "assets/looks/look-05.jpg", mini: "assets/looks/mini/look-05.jpg", texto: "Rojo y camuflaje", grupo: "Color" },
  { imagen: "assets/looks/look-06.jpg", mini: "assets/looks/mini/look-06.jpg", texto: "Rosa con vistas", grupo: "Color" },
  { imagen: "assets/redes/post-1.jpg", enlace: "https://www.instagram.com/jjn.dzz/", texto: "Outfit amarillo", grupo: "Color" },
  { imagen: "assets/looks/look-07.jpg", mini: "assets/looks/mini/look-07.jpg", texto: "Baggy negro y botas", grupo: "Neutros" },
  { imagen: "assets/looks/look-08.jpg", mini: "assets/looks/mini/look-08.jpg", texto: "Azul y blanco", grupo: "Color" },
  { imagen: "assets/redes/post-2.jpg", enlace: "https://www.instagram.com/jjn.dzz/", texto: "Rojo en la piscina", grupo: "Color" },
  { imagen: "assets/looks/look-09.jpg", mini: "assets/looks/mini/look-09.jpg", texto: "Denim y rojo", grupo: "Denim" },
  { imagen: "assets/redes/post-3.jpg", enlace: "https://www.instagram.com/jjn.dzz/", texto: "Look beige", grupo: "Neutros" },
  { imagen: "assets/looks/look-10.jpg", mini: "assets/looks/mini/look-10.jpg", texto: "Tirantes y estampado", grupo: "Neutros" },
  { imagen: "assets/redes/post-4.jpg", enlace: "https://www.instagram.com/jjn.dzz/", texto: "Rosa y crochet", grupo: "Denim" },
  { imagen: "assets/redes/post-5.jpg", enlace: "https://www.instagram.com/jjn.dzz/", texto: "Diesel", grupo: "Neutros" },
  { imagen: "assets/redes/post-6.jpg", enlace: "https://www.instagram.com/jjn.dzz/", texto: "Chándal morado", grupo: "Color" },
];

/* ---------- ESTILO: moda y diseños ----------
   El texto y las etiquetas aparecen en el apartado "Estilo".
   Tus looks son las fotos de POSTS.
*/
const ESTILO = {
  texto: "La moda es parte de cómo me comunico. Me mueven el streetwear, los colores que no pasan desapercibidos y los looks que cuentan algo antes de decir nada. Y además diseño y coso mi propia ropa.",
  etiquetas: ["Streetwear", "Color", "Oversize", "Estampados", "Confección", "Sneakers"],
};

/* Tus diseños: sube cada imagen a assets/disenos/ y añade una línea así:
   { imagen: "assets/disenos/mi-diseno.jpg", titulo: "Nombre del diseño", tipo: "Camiseta" },
   Mientras la lista esté vacía, se muestra "Diseños en proceso".
*/
const DISENOS = [];

/* ---------- LA ROPA QUE HAGO: colecciones ----------
   Cada colección es un bloque que se recorre con el scroll (la página pasa las fotos de lado).
   Para añadir fotos a una colección, súbelas a su carpeta y añade una línea en "piezas":
   { imagen: "assets/ropa/vaca/02-foto.jpg", paso: "Confección", texto: "Qué se ve en la foto" },
   (también vale vídeo: { video: "assets/ropa/vaca/clip.mp4", poster: "...jpg", paso: "...", texto: "..." })
   "proximamente" añade huecos de "Próximamente" al final mientras la colección está en marcha.
*/
const COLECCIONES = [
  {
    id: "toile",
    nombre: "Conjunto toile",
    subtitulo: "Bermuda y chaleco en blanco y burdeos",
    texto: "Un conjunto a dos piezas en tela toile de Jouy: estampado clásico de escenas campestres llevado a un corte streetwear. Desde el tejido hasta la prenda terminada, hecho a mano.",
    color: "#8f1d32",
    estado: "Terminado",
    piezas: [
      { imagen: "assets/ropa/toile/01-tejido.jpg", paso: "Tejido", texto: "Toile de Jouy en crudo y burdeos" },
      { imagen: "assets/ropa/toile/02-corte.jpg", paso: "Patronaje y corte", texto: "Las piezas de la bermuda, recién cortadas" },
      { imagen: "assets/ropa/toile/03-corte.jpg", paso: "Patronaje y corte", texto: "Delanteros listos para coser" },
      { imagen: "assets/ropa/toile/04-bermuda.jpg", paso: "Confección", texto: "La bermuda montada" },
      { imagen: "assets/ropa/toile/05-bermuda-frente.jpg", paso: "Confección", texto: "Frontal con pinza central" },
      { imagen: "assets/ropa/toile/06-detalle.jpg", paso: "Detalle", texto: "El estampado de cerca" },
      { imagen: "assets/ropa/toile/07-chaleco.jpg", paso: "Resultado", texto: "El chaleco que completa el conjunto" },
    ],
  },
  {
    id: "vaca",
    nombre: "Camiseta de vaca",
    subtitulo: "Animal print sobre algodón crudo",
    texto: "Una camiseta que mezcla el estampado de vaca con una base de algodón crudo. Ahora mismo en el taller: aquí irá apareciendo todo el proceso.",
    color: "#6b4a2f",
    estado: "En proceso",
    proximamente: 2,
    piezas: [
      { imagen: "assets/ropa/vaca/01-tejido.jpg", paso: "Tejidos", texto: "Animal print y la camiseta base" },
    ],
  },
];

/* ---------- QUÉ HAGO ----------
   Cada servicio es una tarjeta. icono: web | campana | redes | marca | email | video | estrategia
   grande: true hace la tarjeta más ancha.
*/
const SERVICIOS = [
  { icono: "web",        grande: true, titulo: "Diseño de webs y landing pages", texto: "Webs y páginas de aterrizaje claras, rápidas y pensadas para convertir: estructura, textos persuasivos y diseño adaptado a la marca.", tags: ["HTML", "CSS", "Apps Script"] },
  { icono: "campana",    titulo: "Campañas publicitarias", texto: "Planifico y lanzo campañas de principio a fin: objetivo, público, creatividades y seguimiento de resultados.", tags: ["Estrategia", "Creatividades"] },
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
  { nombre: "Moda y estilismo",      nivel: 92, tipo: "Looks, tendencias y estilismo" },
  { nombre: "Creación de contenido", nivel: 90, tipo: "Foto y vídeo para redes" },
  { nombre: "Redes sociales",        nivel: 90, tipo: "Instagram y TikTok" },
  { nombre: "Canva",                 nivel: 90, tipo: "Diseño" },
  { nombre: "CapCut",                nivel: 85, tipo: "Edición de vídeo" },
  { nombre: "Copywriting",           nivel: 80, tipo: "Textos que venden" },
  { nombre: "Branding",              nivel: 80, tipo: "Identidad de marca" },
  { nombre: "MailerLite",            nivel: 75, tipo: "Email marketing" },
  { nombre: "Apps Script",           nivel: 60, tipo: "Web" },
];

const SOFT_SKILLS = [
  "Creatividad", "Storytelling", "Trabajo en equipo", "Estrategia de contenido",
  "Tendencias", "Análisis de métricas", "Comunicación", "Atención al detalle",
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
    email: "assets/trabajos/emails/cesto.html",
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
    email: "assets/trabajos/emails/halloween.html",
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
    tipoVisor: "web",
    web: "assets/trabajos/ikea/index.html",
    descripcion: "Landing page de captación para IKEA Family: presenta las ventajas del programa y lleva al usuario a un único objetivo, el formulario de alta. Desarrollada con Google Apps Script: cada registro se guarda en Google Sheets y el usuario recibe un correo de bienvenida automático.",
    herramientas: ["Google Apps Script", "HTML", "Tailwind CSS", "Google Sheets", "Copywriting"],
    enlace: "assets/trabajos/ikea/index.html",
  },
];

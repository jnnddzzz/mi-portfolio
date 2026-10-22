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

/* ---------- BIBLIOTECA DE OUTFITS ----------
   Aparecen en "Estilo" > "Mis outfits". Para añadir uno, sube la foto a assets/looks/
   (y una copia pequeña, de unos 640 px, a assets/looks/mini/) y añade una línea:
   { imagen: "assets/looks/mi-look.jpg", mini: "assets/looks/mini/mi-look.jpg", texto: "Nombre", grupo: "Color" },
   grupo sirve para los filtros: "Color", "Neutros" o "Denim" (puedes crear otros).
   mini y enlace son opcionales.
*/
const POSTS = [
  { imagen: "assets/looks/look-01.jpg", mini: "assets/looks/mini/look-01.jpg", texto: "Modo sol", grupo: "Color" },
  { imagen: "assets/looks/look-02.jpg", mini: "assets/looks/mini/look-02.jpg", texto: "Firmado en la pared", grupo: "Denim" },
  { imagen: "assets/looks/look-03.jpg", mini: "assets/looks/mini/look-03.jpg", texto: "Llamada desde Londres", grupo: "Neutros" },
  { imagen: "assets/looks/look-04.jpg", mini: "assets/looks/mini/look-04.jpg", texto: "Número 88", grupo: "Color" },
  { imagen: "assets/looks/look-05.jpg", mini: "assets/looks/mini/look-05.jpg", texto: "Alerta roja", grupo: "Color" },
  { imagen: "assets/looks/look-06.jpg", mini: "assets/looks/mini/look-06.jpg", texto: "Atardecer en rosa", grupo: "Color" },
  { imagen: "assets/redes/post-1.jpg", enlace: "https://www.instagram.com/jjn.dzz/", texto: "Golden hour", grupo: "Color" },
  { imagen: "assets/looks/look-07.jpg", mini: "assets/looks/mini/look-07.jpg", texto: "Andén 7", grupo: "Neutros" },
  { imagen: "assets/looks/look-08.jpg", mini: "assets/looks/mini/look-08.jpg", texto: "Cielo de barrio", grupo: "Color" },
  { imagen: "assets/redes/post-2.jpg", enlace: "https://www.instagram.com/jjn.dzz/", texto: "Splash", grupo: "Color" },
  { imagen: "assets/looks/look-09.jpg", mini: "assets/looks/mini/look-09.jpg", texto: "Aparcado con estilo", grupo: "Denim" },
  { imagen: "assets/redes/post-3.jpg", enlace: "https://www.instagram.com/jjn.dzz/", texto: "Arena y sombra", grupo: "Neutros" },
  { imagen: "assets/looks/look-10.jpg", mini: "assets/looks/mini/look-10.jpg", texto: "Subiendo de nivel", grupo: "Neutros" },
  { imagen: "assets/redes/post-4.jpg", enlace: "https://www.instagram.com/jjn.dzz/", texto: "Punto a punto", grupo: "Denim" },
  { imagen: "assets/redes/post-5.jpg", enlace: "https://www.instagram.com/jjn.dzz/", texto: "Only the brave", grupo: "Neutros" },
  { imagen: "assets/redes/post-6.jpg", enlace: "https://www.instagram.com/jjn.dzz/", texto: "Violeta eléctrico", grupo: "Color" },
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

/* ---------- MI MUSEO DE ARTE: la ropa que diseño y coso ----------
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
   Cada servicio es una tarjeta. icono: web | campana | redes | marca | email | video | estrategia | moda
   gancho: la frase corta en cursiva. entregables: lo que se lleva la empresa.
   prueba: { texto, href } enlace a un trabajo o apartado que lo demuestra (opcional).
   grande: true hace la tarjeta más ancha (en escritorio van en zigzag: ancha + normal).
*/
const SERVICIOS = [
  { icono: "web", grande: true, titulo: "Webs que convierten", gancho: "Tu web no es un folleto: es tu mejor vendedor.",
    texto: "Landing pages con un solo objetivo, textos que empujan a la acción y formularios conectados a hojas de cálculo y correos automáticos.",
    entregables: ["Landing page", "Formulario + Google Sheets", "Email automático"], prueba: { texto: "Landing de IKEA Family", href: "#caso-ikea" } },
  { icono: "campana", titulo: "Campañas con idea", gancho: "Primero la idea, después el anuncio.",
    texto: "Del brief a la pieza final: concepto creativo, público, mensajes y calendario, con métricas para saber qué funciona.",
    entregables: ["Concepto creativo", "Plan de medios", "Piezas y copys"], prueba: { texto: "Prensa para La Cookiteria", href: "#caso-la-cookiteria" } },
  { icono: "redes", titulo: "Redes con estética", gancho: "Feeds que se reconocen sin leer el nombre.",
    texto: "Línea visual, calendario y publicaciones con tono propio. Lo que hago cada día en mis perfiles, aplicado a tu marca.",
    entregables: ["Calendario de contenidos", "Línea visual", "Gestión diaria"], prueba: { texto: "Mis redes", href: "#redes" } },
  { icono: "moda", grande: true, titulo: "Estilismo para marcas", gancho: "La ropa también comunica.",
    texto: "Estilismo para sesiones, campañas y contenido: outfits que cuentan la historia de la marca antes de leer una sola palabra.",
    entregables: ["Estilismo de sesión", "Moodboards", "Contenido de moda"], prueba: { texto: "Mis outfits", href: "#looks" } },
  { icono: "video", grande: true, titulo: "Contenido que frena el scroll", gancho: "Los dos primeros segundos lo deciden todo.",
    texto: "Foto y vídeo vertical con gancho, ritmo y tendencia: idea, grabación y edición listas para Reels y TikTok.",
    entregables: ["Reels y TikToks", "Sesiones de fotos", "Edición en CapCut"], prueba: { texto: "Mi TikTok", href: "#redes" } },
  { icono: "email", titulo: "Emails que se abren", gancho: "Un asunto que engancha, un diseño que lleva al clic.",
    texto: "Newsletters y campañas con estructura de venta: oferta estrella, beneficios claros y llamadas a la acción.",
    entregables: ["Asunto y preheader", "Diseño en HTML", "Campañas de temporada"], prueba: { texto: "Black Friday de Cestto", href: "#caso-cestto-supermercados" } },
  { icono: "estrategia", titulo: "Estrategia con datos", gancho: "Cada acción, con un porqué.",
    texto: "Investigación de mercado, competencia y público, DAFO y plan de marketing con objetivos que se pueden medir.",
    entregables: ["Investigación", "DAFO", "Plan de marketing"], prueba: { texto: "Dossier de Cruzcampo", href: "#caso-cruzcampo" } },
  { icono: "marca", grande: true, titulo: "Identidades con carácter", gancho: "Que tu marca se recuerde a la primera.",
    texto: "Logotipo, colores, tipografías y aplicaciones: un sistema visual completo y coherente en cada punto de contacto con el cliente.",
    entregables: ["Logotipo", "Paleta y tipografías", "Manual de marca"] },
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

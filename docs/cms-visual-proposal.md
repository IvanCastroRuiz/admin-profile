# Propuesta visual para CMS de eventos

## Objetivo

Diseñar una experiencia visual para un sitio de promoción de trabajos de eventos construido con Strapi (backend Straplis) y un frontend en Next.js + TypeScript, utilizando Cloudinary para almacenar imágenes y videos.

## Tendencias clave en sitios de eventos y portfolios visuales

- **Enfoque en la experiencia del evento**: las webs efectivas usan fotos que evocan emociones antes de describir al planner.
- **Fotografía + espacio negativo**: fondos limpios, paletas coherentes (pasteles o sobrios) y tipografías elegantes.
- **Jerarquía visual clara**: los eventos son protagonistas en el home; secciones sobre el equipo aparecen después.
- **Hero visual y contenido minimalista**: fotos o videos de impacto, testimonios y CTAs discretos.
- **Galerías estilo portfolio**: cuadrículas responsivas con hover para más detalles y ampliación a pantalla completa.

## Buenas prácticas con Cloudinary

- **Estructura semántica**: envolver cada medio en contenedores (`div.gallery-item`) para estilos y efectos.
- **Diseños flexibles**: usar Flexbox o CSS Grid (`repeat(auto-fill, minmax(...))`) para cuadrículas adaptables.
- **Proporciones homogéneas**: `object-fit: cover` y `aspect-ratio` mantienen consistencia visual.
- **Filtros por etiquetas**: botones para cargar/filtrar medios por categoría o tag.
- **Optimización**: generar variantes (`w_800,q_auto,c_fill`) y servir formatos modernos. En video, limitar duración, usar miniaturas con botón play, evitar autoplay con sonido y añadir subtítulos.

## Propuesta de experiencia visual

### Paleta y tipografía
- Fondo neutro (blancos/grises) para resaltar medios.
- Acentos en azul oscuro `#002d5b` y morado suave `#695ca5` para elementos interactivos.
- Títulos en serif elegante (Playfair Display / Merriweather); textos en sans-serif legible (Inter / Open Sans).

### Navegación y páginas
- **Inicio**: hero a pantalla completa con video/foto collage, overlay oscuro y CTA hacia el portafolio.
- **Portafolio**: cuadrícula filtrable (3-4 columnas desktop, 1-2 móvil) que muestra título y resumen al hover; clic abre detalle.
- **Detalle de evento**: galería mixta foto/video con lightbox, descripción, datos (fecha, cliente, ubicación), testimonios y enlaces sociales.
- **Nosotros**: historia breve, fotos de equipo y CTA de contacto colocada al final.
- **Contacto**: formulario simple, redes y mapa opcional.

### Componentes sugeridos
- `HeroMedia`: video corto o collage con transformaciones responsivas de Cloudinary (carga progresiva, `preload="none"`, `poster`).
- `EventGrid`: cuadrícula con `CSS Grid` (`repeat(auto-fill, minmax(250px, 1fr))`) y `object-fit: cover`.
- `CategoryFilter`: botones conectados a categorías Strapi o filtrado local.
- `LightboxGallery`: navegación con teclado, subtítulos y soporte para video con controles.
- `ContactCTA`: botones destacados en hero y pie de cada página.

## Estructura de contenido en Strapi

| Colección | Campos clave | Descripción |
| --- | --- | --- |
| `events` | `title`, `slug`, `date`, `description`, `category` (relación), `client`, `location`, `media` (relación), `gallery` (componente repetible), `testimonials` (componente), `seo` | Eventos/proyectos, combinando imágenes y videos de Cloudinary. |
| `categories` | `name`, `slug`, `description` | Tipos de eventos para filtros. |
| `media` | `title`, `type` (imagen/video), `file`, `description`, `order`, `thumbnail` | Medios almacenados en Cloudinary. |
| `testimonials` | `author`, `quote`, `event` (relación) | Testimonios asociados a eventos. |
| `team` | `name`, `role`, `bio`, `photo` | Miembros del equipo. |

Relaciones sugeridas:
- Eventos ↔︎ Medios: uno a muchos.
- Eventos ↔︎ Categorías: muchos a uno.
- Eventos ↔︎ Testimonios: uno a muchos.

## Integración con Next.js + TypeScript

- **Datos**: consumir Strapi vía REST/GraphQL usando `getStaticProps` y `getStaticPaths` para páginas estáticas.
- **Medios**: aprovechar URLs de Strapi con parámetros de transformación de Cloudinary (`q_auto`, `f_auto`, `c_fill`). Para video, usar el player de Cloudinary o `<video>` con `controls` y `poster`.
- **Accesibilidad/SEO**: textos alternativos, subtítulos, i18n de Strapi si se requieren múltiples idiomas. Usar plugin SEO para `metaTitle` y `metaDescription`.
- **Despliegue**: hospedar Next.js en Vercel u otra plataforma; configurar variables de entorno para endpoints de Strapi y Cloudinary (`CLOUDINARY_CLOUD_NAME`, `API_TOKEN`, etc.).

## Conclusiones

La propuesta privilegia imágenes y videos de alta calidad con un diseño limpio, jerarquía clara y CTA discretos. Las recomendaciones de Cloudinary permiten galerías rápidas y accesibles, mientras que la estructura en Strapi y el uso de Next.js + TypeScript facilitan la implementación por parte del equipo de desarrollo.

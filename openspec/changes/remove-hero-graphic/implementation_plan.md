# Plan de Implementación: Remoción de Gráfico en Hero y Rediseño Centrado

Propuesta técnica para remover el gráfico arquitectónico de la sección Hero (`.hero-arch`) en el portafolio y reconfigurar el layout del contenido de texto para lograr una disposición centrada, equilibrada y visualmente premium.

## User Review Required

> [!NOTE]
> La remoción de `.hero-arch` requiere ajustar la estructura de flexbox bidimensional en `.hero .container` a un flujo unidimensional de columna centrada. Esto simplifica significativamente la interfaz móvil y de escritorio.

## Open Questions

> [!IMPORTANT]
> Para iterar y asegurar que el diseño sea exactamente de tu agrado, por favor aclara las siguientes preferencias visuales:
>
> 1. **Alineación del Texto**: ¿Prefieres que todo el texto del Hero (título, subtítulo, descripciones) esté completamente centrado (`text-align: center`), o prefieres que el bloque de contenido esté centrado horizontalmente en la pantalla pero el texto se mantenga alineado a la izquierda?
> 2. **Diseño del Bloque `.hero__result` (Destacado)**: Al centrar la sección, proponemos mantener el texto interno de este bloque alineado a la izquierda (para que la barra vertical de acento violeta de la izquierda se vea natural) pero centrar el bloque en sí. ¿Estás de acuerdo o preferirías que este bloque cambie a otra presentación (por ejemplo, con bordes en los cuatro lados o fondo difuminado/glassmorphism)?

---

## Proposed Changes

### Estructura y Estilos de la Interfaz

#### [MODIFY] [index.html](file:///C:/Users/Jimmy/portafolio-jimmy/index.html)
- Remover la etiqueta `<div class="hero-arch" aria-hidden="true">` y todo el contenido SVG de su interior (líneas 65-87 aproximadamente).

#### [MODIFY] [styles.css](file:///C:/Users/Jimmy/portafolio-jimmy/styles.css)
- Reconfigurar `.hero .container` para eliminar el layout de dos columnas, aplicando `flex-direction: column`, `align-items: center`, `justify-content: center` y `text-align: center`.
- Limitar el ancho máximo de `.hero__content` a `800px` (o similar) para mantener la legibilidad, y centrarlo con `margin: 0 auto;`.
- Eliminar el bloque de estilos bajo `/* ===== Hero Architecture Diagram ===== */` (clases `.hero-arch`, `.hero-arch svg`, etc.).
- Eliminar todas las animaciones obsoletas (`@keyframes arch-node-pulse`, `arch-dot-pulse`, `arch-line-draw`, `arch-hex-glow`, `arch-glow-pulse`, `arch-ring-spin`) y sus respectivas clases de animación (`.arch-node`, `.arch-dot`, etc.).
- Limpiar y remover las propiedades de `.hero-arch` de los bloques responsivos `@media (max-width: 1024px)` y `@media (max-width: 768px)`.

---

## Verification Plan

### Automated Tests
- Ejecutar la suite de pruebas unitarias y de integración para confirmar que no hay regresiones en la carga o comportamiento:
  ```bash
  npm run test:run
  ```
- Ejecutar las pruebas de fin a fin (E2E) con Playwright para verificar que la página y sus enlaces sigan siendo completamente interactivos:
  ```bash
  npm run test:e2e
  ```

### Manual Verification
- Levantar el servidor de previsualización local para inspeccionar visualmente los cambios de alineación, espaciados y adaptabilidad responsive:
  ```bash
  npm run preview
  ```

## Context

La sección Hero de la página de portafolio actualmente cuenta con una distribución de dos columnas en pantallas de escritorio: a la izquierda el contenido textual (`.hero__content`) y a la derecha un gráfico decorativo SVG (`.hero-arch`) que representa un plano de arquitectura en blueprint.
El usuario ha señalado que este gráfico no aporta valor comunicativo y se percibe "perdido en la nada". Por lo tanto, se removerá el gráfico y se rediseñará la sección para que el contenido textual esté centrado, equilibrado y tenga un impacto visual más premium.

## Goals / Non-Goals

**Goals:**
- Remover completamente el elemento `<div class="hero-arch">` y su SVG embebido.
- Eliminar el CSS obsoleto de `.hero-arch` y sus animaciones para mantener el archivo `styles.css` limpio.
- Centrar el layout del Hero (`.hero__content`) horizontal y verticalmente en el contenedor.
- Asegurar que los elementos de texto (`.hero__title`, `.hero__subtitle`, `.hero__description`, `.hero__result`, `.hero__cta`) estén correctamente alineados y centrados con márgenes auto.
- Mantener la legibilidad premium y adaptabilidad responsive intacta.

**Non-Goals:**
- Cambiar la paleta de colores o el contenido del Hero.
- Modificar otras secciones del portafolio (como Services o Cases).

## Decisions

### 1. Remoción del HTML del Gráfico
- **Decisión**: Remover el nodo `<div class="hero-arch">` de `index.html`.
- **Razón**: Es la forma directa de limpiar la estructura DOM y evitar cargar elementos SVG decorativos innecesarios.

### 2. Centrado y Reajuste de Layout en CSS
- **Decisión**: Cambiar `.hero .container` para usar una estructura centrada en columna.
  ```css
  .hero .container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  ```
- **Alineación de Elementos Internos**:
  - Ajustar `.hero__content` a un ancho máximo óptimo (`max-width: 800px`) para evitar que las líneas de texto sean demasiado largas y difíciles de leer, y aplicar `margin: 0 auto;`.
  - Asegurar que los párrafos de `.hero__description` y el cuadro `.hero__result` tengan `margin-left: auto; margin-right: auto;` para centrarse horizontalmente, pero manteniendo una alineación interna de texto centrada o izquierda según convenga (el cuadro `.hero__result` se mantendrá con alineación izquierda internamente para preservar la legibilidad del texto en bloque destacado y su borde izquierdo, pero centrado como bloque).

### 3. Eliminación de Estilos y Animaciones Huérfanos
- **Decisión**: Remover de `styles.css` todas las reglas bajo `/* ===== Hero Architecture Diagram ===== */` hasta el inicio de las media queries, incluyendo los keyframes `arch-node-pulse`, `arch-dot-pulse`, `arch-line-draw`, `arch-hex-glow`, `arch-glow-pulse`, `arch-ring-spin`, y las clases `.arch-node`, `.arch-dot`, `.arch-line`, `.arch-hex`, `.arch-glow`, `.arch-ring--outer`.
- **Razón**: Reducir el tamaño del CSS final y eliminar código muerto (dead code).

## Risks / Trade-offs

- **[Riesgo]**: El texto centrado puede perder legibilidad en pantallas muy anchas si las líneas son muy largas.
  - *Mitigación*: Limitar el `max-width` de `.hero__content` a un máximo de `800px` y el de las descripciones a `720px`.
- **[Riesgo]**: El cuadro `.hero__result` con texto centrado puede verse extraño con su borde izquierdo (`border-left`).
  - *Mitigación*: Mantener el texto de `.hero__result` alineado a la izquierda (`text-align: left`), pero centrar todo el bloque en sí mediante márgenes automáticos.

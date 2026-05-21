## Why

El portafolio actualmente está bloqueado en un modo oscuro profundo ("Midnight Abyss"). Aunque esta estética cinemática y de alta tecnología es visualmente deslumbrante, algunos usuarios pueden experimentar fatiga visual en entornos muy iluminados o preferir interfaces claras por accesibilidad. Ofrecer una versión "Light Mode" refinada permite adaptar la experiencia de lectura a las preferencias del usuario, mejorando la usabilidad y expandiendo el valor y la sofisticación del producto.

## What Changes

- **Esquema de Color Dual**: Creación de una paleta de colores Light refinada e invertida de forma premium, usando grises acero claros y destellos blancos suaves que preservan el acento azul eléctrico de alta gama (`#0a84ff`).
- **Conmutador de Tema (Theme Toggle)**: Integración de un botón interactivo y premium de conmutación de tema (con micro-animaciones SVG e icono dual sol/luna) en el viewport.
- **Persistencia y Sincronización**: Guardado persistente de la preferencia del tema en `localStorage` y detección inicial automática de la preferencia del sistema operativo (`prefers-color-scheme`).
- **Prevención de Parpadeo (FOUC)**: Script ultra-ligero y síncrono al inicio del `<head>` para cargar el tema activo antes de pintar el DOM.
- **Suite de Pruebas**: Adaptación y ampliación de los tests para comprobar el correcto toggle del tema.

## Capabilities

### New Capabilities
- `light-mode`: Soporte de una interfaz clara de alta precisión con inversión de contraste premium, conmutador interactivo y persistencia de estado para el usuario.

### Modified Capabilities
*(Ninguna - el repositorio de especificaciones base se encuentra limpio y no hay requisitos heredados que alterar)*

## Impact

- **index.html**: Añadir el botón conmutador y un script de detección rápida en el `<head>`.
- **variables.css / styles.css**: Definir el bloque de re-mapeo de variables CSS bajo el selector `[data-theme="light"]`.
- **progress.js**: Añadir la lógica interactiva de conmutación de tema y persistencia.
- **Pruebas (Vitest & Playwright)**: Nuevos tests unitarios y de integración para validar el conmutador de temas.

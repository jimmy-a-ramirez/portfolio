## Context

El portafolio actual está construido bajo un tema oscuro exclusivo ("Midnight Abyss") que ofrece una experiencia cinemática e interactiva muy sofisticada. Sin embargo, para mejorar la accesibilidad visual (WCAG 2.2 AA) y ofrecer comodidad de lectura en ambientes muy iluminados, es fundamental implementar una versión "Light Mode" (Tema Claro).

Gracias a la arquitectura limpia de la aplicación basada en variables CSS centralizadas (`variables.css`), el portafolio es un candidato ideal para un esquema de colores dinámico. La inversión de contrastes y la gestión del tema se pueden realizar a nivel del elemento raíz mediante selectores de atributos en CSS, con impacto mínimo en los archivos de componentes y la lógica del DOM existente.

## Goals / Non-Goals

**Goals:**
- **Inversión de Contraste Premium**: Definir un conjunto alternativo de variables de color de alta calidad bajo el selector `[data-theme="light"]` en `variables.css`.
- **Botón Conmutador Accesible**: Añadir un botón flotante y sofisticado con animaciones interactivas (SVG Sol/Luna) que permita cambiar de tema y sea accesible por teclado y lectores de pantalla (roles ARIA, etiquetas semánticas).
- **Persistencia Fluida sin Parpadeo (Anti-FOUC)**: Prevenir el parpadeo visual molesto del tema por defecto al recargar (Flicker) mediante un script inline síncrono al inicio del `<head>`.
- **Sincronización del Sistema**: Respetar las preferencias globales de tema del sistema operativo (`prefers-color-scheme`) si el usuario no ha definido una preferencia explícita.
- **Robustez en Pruebas**: Mantener e integrar el nuevo comportamiento en la suite de pruebas unitarias (Vitest) e integración (Playwright).

**Non-Goals:**
- Cambiar la disposición espacial (layouts), espaciado o tipografías del portafolio.
- Añadir soporte para temas múltiples o personalizados más allá de Claro (Light) y Oscuro (Dark).
- Modificar las imágenes de marca o iconos base del portafolio que ya son neutros o se adaptan bien en ambos contrastes.

## Decisions

### 1. Inyección de Tema mediante Atributo HTML (`data-theme`)
Se usará el atributo `data-theme="light"` o `data-theme="dark"` aplicado al elemento `<html>`.
* **Alternativa considerada**: Clases CSS tradicionales (`.light-mode`).
* **Razón de la elección**: Los atributos personalizados `data-*` son más limpios, semánticos y fáciles de consultar y manipular a nivel de selectores CSS avanzados e interfaces de automatización (como Playwright o JavaScript puro).

### 2. Paleta Cromática Claro Premium e Inversión Semántica
En lugar de invertir directamente a blancos y negros puros (lo que genera un diseño rudimentario), se utilizarán colores de acabado industrial:
* **Fondo Principal (`--color-midnight-abyss`)**: Cambiará de `#08090c` (negro abisal) a `#f5f7fb` (un gris acero ultra claro, suave a la vista).
* **Color de Texto (`--color-ghost-white` y `--color-comet`)**: `--color-ghost-white` (actualmente `#ffffff`) pasará a ser `#0f1115` (carbón profundo), y `--color-comet` pasará de `#d8ecf8` a `#333f51`.
* **Acentos de Marca**: Se mantendrá el azul eléctrico (`#0a84ff`) ya que ofrece un contraste impecable contra el fondo claro y preserva la identidad corporativa del portafolio.
* **Sombras y Bordes**: Las variables de sombra (`--shadow-*`) se reajustarán a grises acero con muy baja opacidad para simular profundidad natural y sofisticada en modo claro.

### 3. Script síncrono inline contra el Flash of Unstyled Content (FOUC)
Se colocará un pequeño script inline al principio del `<head>`, justo antes de enlazar los CSS principales.
```javascript
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
})();
```
* **Razón**: Al ejecutarse de forma síncrona en el `<head>`, se bloquea temporalmente el parseo visual hasta que el atributo de tema esté colocado. Esto garantiza que la primera pintura (First Paint) ya contenga el color de fondo correcto, evitando parpadeos de color blanco si la preferencia guardada es oscuro, o viceversa.

### 4. Animación interactiva en el Botón Conmutador SVG
El botón del conmutador de tema utilizará un único contenedor SVG que cambiará de forma y rotará fluidamente con transiciones CSS de 0.4s al alternar el tema.
* **Razón**: Ofrece un feedback visual fascinante y dinámico que añade un toque extra de sofisticación ("premium design"), coherente con el resto del portafolio.

## Risks / Trade-offs

- **[Risk] Parpadeo en la carga de la página (FOUC)**
  - *Mitigación*: Implementación obligatoria del script síncrono en el `<head>` antes de pintar el DOM.
- **[Risk] Incumplimiento de contraste accesible en fondos claros**
  - *Mitigación*: Validación minuciosa de cada combinación de texto e icono contra el estándar WCAG 2.2 AA empleando las herramientas del navegador e integrando pruebas específicas de contraste.
- **[Risk] Ruptura de Tests Existentes**
  - *Mitigación*: Los tests existentes comprueban el DOM en su estado original. Como por defecto el portafolio seguirá cargando el modo oscuro (salvo que el sistema del usuario indique lo contrario o tenga persistencia), el comportamiento de base no cambiará para los tests que no manipulen explícitamente el tema.

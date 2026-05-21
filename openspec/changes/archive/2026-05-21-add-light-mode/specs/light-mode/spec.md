## ADDED Requirements

### Requirement: Botón Conmutador de Tema (Theme Toggle)
El sistema SHALL proveer un botón conmutador de tema accesible, visible de forma persistente en la esquina superior derecha del viewport. El control SHALL permitir la alternancia fluida entre el modo oscuro y el modo claro y poseer micro-animaciones interactivas.

#### Scenario: Alternar tema por interacción
- **WHEN** el usuario hace clic en el botón conmutador de tema o presiona la tecla Enter/Space sobre él estando enfocado.
- **THEN** el atributo `data-theme` del elemento `html` (o `body`) SHALL cambiar síncronamente de `dark` a `light` (o viceversa) y el estado visual del botón SHALL conmutar su icono (sol/luna).

### Requirement: Paleta de Colores Claro Premium
El sistema SHALL implementar un diseño visual claro ultra-profesional bajo el selector `[data-theme="light"]`. La interfaz clara SHALL proveer un contraste impecable acorde a los estándares WCAG 2.2 AA.

#### Scenario: Aplicar contraste claro
- **WHEN** el atributo `data-theme` del elemento principal es `light`.
- **THEN** la variable `--color-midnight-abyss` SHALL resolverse a un color de fondo claro (`#f5f7fb`), la variable `--color-ghost-white` a un gris antracita oscuro (`#0c0d12`), y las sombras visuales SHALL ajustarse a tonos gris acero suaves, conservando el acento azul eléctrico (`#0a84ff`) con legibilidad óptima.

### Requirement: Persistencia y Detección Automática
El sistema SHALL memorizar de manera persistente la preferencia de tema del usuario y sincronizarse automáticamente con las preferencias del sistema operativo.

#### Scenario: Cargar tema persistente al inicio
- **WHEN** la página se carga en el navegador.
- **THEN** el sistema SHALL recuperar de forma síncrona el valor de `theme` guardado en `localStorage`. Si está definido, SHALL aplicar dicho tema de forma inmediata antes del renderizado de la página. Si no está definido, SHALL detectar y aplicar el tema preferido en `prefers-color-scheme` del sistema operativo.

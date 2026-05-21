## Why

El gráfico del hero (`.hero-arch`) es un elemento decorativo que no aporta valor informativo ni interactivo, haciendo que la sección se sienta desbalanceada o perdida en el espacio. Su eliminación mejorará la claridad, reducirá el ruido visual y permitirá que el mensaje principal del Hero resalte más.

## What Changes

- **Remoción**: Eliminar el elemento HTML `<div class="hero-arch">` y su SVG embebido de `index.html`.
- **Limpieza de CSS**: Eliminar los estilos y animaciones asociados a `.hero-arch` de `styles.css`.
- **Ajustes de Layout**: Reajustar la alineación del Hero para que el contenido de texto quede centrado y visualmente equilibrado sin la necesidad de la columna del gráfico.

## Capabilities

### New Capabilities

*(Ninguna)*

### Modified Capabilities

- `single-page-portfolio`: Modificar la especificación de visualización del Hero para eliminar la referencia al gráfico arquitectónico y asegurar un layout limpio y centrado.

## Impact

- **HTML**: Modificación de `index.html` para remover la sección decorativa `.hero-arch`.
- **CSS**: Modificación de `styles.css` para eliminar estilos obsoletos y animaciones asociadas, y ajustar el contenedor del Hero.

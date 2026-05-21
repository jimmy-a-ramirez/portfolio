## 1. Configuración de Base y Estilos de Tema Claro

- [x] 1.1 Inyectar script inline síncrono al inicio del `<head>` en `index.html` para aplicar el tema de forma inmediata (prevenir FOUC)
- [x] 1.2 Añadir variables de color adaptativas en `variables.css` dentro de un selector `[data-theme="light"]` asegurando legibilidad WCAG AA
- [x] 1.3 Adaptar variables de color de soporte en `theme.css` bajo el bloque correspondiente para mantener coherencia semántica en modo claro

## 2. Diseño e Integración del Conmutador de Tema (Theme Toggle)

- [x] 2.1 Insertar el marcado HTML para el botón conmutador de tema en `index.html` incorporando atributos `aria-label`, `role="button"`, y soporte de foco
- [x] 2.2 Estilar el conmutador de tema en `styles.css` con posicionamiento fijo persistente, adaptado a móviles y soporte visual de foco visible
- [x] 2.3 Añadir micro-animaciones interactivas e iconos SVG estilizados (sol y luna) con transiciones suaves en CSS al conmutar

## 3. Lógica Interactiva y Persistencia

- [x] 3.1 Implementar la función de inicialización e interactividad del conmutador de tema en `progress.js`
- [x] 3.2 Programar el guardado persistente del tema preferido en `localStorage` ante interacciones del usuario
- [x] 3.3 Configurar la escucha del conmutador ante eventos de teclado (`Enter` y `Espacio`) para garantizar accesibilidad total

## 4. Aseguramiento de Calidad y Pruebas

- [x] 4.1 Crear la suite de pruebas unitarias en `tests/theme.test.js` para comprobar la carga de preferencia del sistema y guardado en `localStorage` con Vitest
- [x] 4.2 Desarrollar pruebas e2e con Playwright para verificar el cambio de estado del atributo de tema en el DOM, el cambio visual y la persistencia tras recargar
- [x] 4.3 Ejecutar y validar que toda la suite de pruebas del portafolio sigue en estado verde (30/30 en Vitest y Playwright funcionales)

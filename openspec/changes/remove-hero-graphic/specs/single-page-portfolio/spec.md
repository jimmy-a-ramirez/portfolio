## MODIFIED Requirements

### Requirement: Hero Section Rendering

The hero section MUST display the headline "De la incertidumbre a la arquitectura lógica", subtext about spending 70% of time understanding and planning, and a CTA button. The layout MUST be centered and balanced without displaying any blueprint or architectural graphics (specifically, the `.hero-arch` element).

- GIVEN the portfolio page is loaded
- WHEN the page renders
- THEN the hero section SHALL display with headline, subtext, and CTA centered and visible above the fold
- AND the design tokens (midnight-abyss background, neon-violet accents) SHALL be applied
- AND the `.hero-arch` graphic SHALL NOT be present

#### Scenario: Hero loads with content centered

- GIVEN viewport is 1024px+ width
- WHEN index.html loads
- THEN hero headline text is visible
- AND hero subtext is visible
- AND CTA button is visible and clickable
- AND the `.hero-arch` blueprint graphic element is absent

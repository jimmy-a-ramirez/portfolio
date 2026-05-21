# Single Page Portfolio Specification

## Purpose

Complete 4-section single-page portfolio layout with architectural blueprint dark aesthetic, smooth scroll navigation, and responsive breakpoints.

## Requirements

### Requirement: Hero Section Rendering

The hero section MUST display the headline "De la incertidumbre a la arquitectura lógica", subtext about spending 70% of time understanding and planning, and a CTA button.

- GIVEN the portfolio page is loaded
- WHEN the page renders
- THEN the hero section SHALL display with headline, subtext, and CTA visible above the fold
- AND the design tokens (midnight-abyss background, neon-violet accents) SHALL be applied

#### Scenario: Hero loads with content

- GIVEN viewport is 1024px+ width
- WHEN index.html loads
- THEN hero headline text is visible
- AND hero subtext is visible
- AND CTA button is visible and clickable

### Requirement: Services Section Display

The services section MUST display exactly 3 equal-width service cards containing UX Audit & Product Discovery, Prototipado de Alta Precision & DesignOps, and a third service.

- GIVEN the services section is in viewport
- WHEN page renders
- THEN exactly 3 service cards SHALL be displayed
- AND each card SHALL have equal width (flexbox or grid with 1:1:1 ratio)
- AND each card SHALL contain its respective service title and description

#### Scenario: Three service cards render

- GIVEN services section is visible
- WHEN DOM is fully loaded
- THEN card 1 displays "UX Audit & Product Discovery" with description
- AND card 2 displays "Prototipado de Alta Precision & DesignOps" with description
- AND card 3 displays third service title and description

### Requirement: Cases Section Display

The cases section MUST display 3 expandible case study cards in order: Bpms.ai, EnchanTales, Trazabilidad.

- GIVEN the cases section exists
- WHEN page loads
- THEN exactly 3 case cards SHALL render
- AND they SHALL appear in order: Bpms.ai first, EnchanTales second, Trazabilidad third

#### Scenario: Case studies ordered correctly

- GIVEN cases section is in DOM
- WHEN page renders
- THEN first case card contains "Bpms.ai" title
- AND second case card contains "EnchanTales" title
- AND third case card contains "Trazabilidad" title

### Requirement: CTA Section Rendering

The CTA section MUST display contact text and functional links to Calendly and LinkedIn.

- GIVEN CTA section is rendered
- WHEN page loads
- THEN CTA heading text SHALL be visible
- AND Calendly link SHALL be clickable and functional
- AND LinkedIn link SHALL be clickable and functional

#### Scenario: CTA links are clickable

- GIVEN CTA section is visible
- WHEN user clicks Calendly button/link
- THEN browser navigates to Calendly URL or opens Calendly embed

### Requirement: Smooth Scroll Navigation

Clicking any navigation element MUST smoothly scroll to the corresponding section.

- GIVEN user is on the portfolio page
- WHEN user clicks navigation to a section
- THEN page SHALL scroll smoothly to target section
- AND scroll animation duration SHALL be perceivable (300ms-800ms)

#### Scenario: Smooth scroll to section

- GIVEN user clicks navigation item for "Cases"
- WHEN click event fires
- THEN viewport scrolls to cases section with easing animation

### Requirement: Responsive Breakpoints

The layout MUST adapt to mobile viewports starting at 375px width.

- GIVEN viewport is 375px to 767px
- WHEN page renders
- THEN service cards SHALL stack vertically (flex-direction: column or grid wrap)
- AND case cards SHALL stack vertically
- AND hero text MAY adjust font size but remain readable

#### Scenario: Mobile layout stacks correctly

- GIVEN viewport width is 375px
- WHEN page loads
- THEN service cards display in single column
- AND case cards display in single column

---

## Summary

| Requirement | Scenarios |
|------------|-----------|
| Hero Section Rendering | 1 |
| Services Section Display | 1 |
| Cases Section Display | 1 |
| CTA Section Rendering | 1 |
| Smooth Scroll Navigation | 1 |
| Responsive Breakpoints | 1 |

**Total**: 6 requirements, 6 scenarios
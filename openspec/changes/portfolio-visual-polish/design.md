## Context

Portfolio is text-heavy with no visual differentiation between sections. AuthKit reference uses per-section gradients, iconography, scroll animations, and testimonial cards. All styles are CSS-only (no dependencies).

## Goals / Non-Goals

**Goals:**
- Unique background gradient per section using existing color palette
- Inline SVG icons for each service card (no external icon lib)
- IntersectionObserver-driven fade-in/slide-up on scroll
- New testimonials section below cases
- Refined spacing and visual hierarchy

**Non-Goals:**
- No external dependencies (no GSAP, no icon libraries)
- No layout restructuring (existing HTML structure preserved)

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Icons** | Inline SVGs in HTML, styled via CSS | Zero network requests, match existing palette |
| **Animations** | CSS `@keyframes` + JS IntersectionObserver class toggle | GPU-accelerated, no JS library |
| **Section backgrounds** | `radial-gradient` + `linear-gradient` combo per section | Uses existing color tokens, no images |
| **Testimonials** | Static quote cards with CSS-only design | No carousel complexity, matches authKit style |

## Risks / Trade-offs

- **Animation on slow devices** → `prefers-reduced-motion` media query disables all animations
- **SVG color matching** → Use `currentColor` so icons inherit CSS color

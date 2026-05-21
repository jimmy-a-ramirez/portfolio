## Why

Portfolio lacks visual richness compared to reference site (authkit.com). All sections look identical, no iconography, no animations, no testimonials, and the layout feels text-heavy without visual anchors.

## What Changes

- Per-section background gradients (each section unique, inspired by authkit)
- SVG icons for each service card
- Scroll-triggered fade-in/slide-up animations
- New testimonials section with quote cards
- General layout refinement: padding, spacing, visual hierarchy

## Capabilities

### New Capabilities
- `per-section-backgrounds`: Each section gets unique gradient/texture
- `service-icons`: SVG icons integrated into service cards
- `scroll-animations`: IntersectionObserver-driven fade-in on scroll
- `testimonials-section`: New section with quote cards

### Modified Capabilities
- (none — all new capabilities)

## Impact

| File | Action |
|------|--------|
| `styles.css` | Major additions: section backgrounds, icons, animations, testimonials, layout |
| `index.html` | Add SVG icons to services, add testimonials section |
| `progress.js` | Add scroll-animation module |

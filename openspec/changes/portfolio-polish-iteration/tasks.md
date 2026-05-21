## 1. Rewrite progress.js

- [ ] 1.1 Remove old ProgressIndicator module and Accordion module
- [ ] 1.2 Create new dot-navigation module with IntersectionObserver (rootMargin: '-40% 0px -40% 0px')
- [ ] 1.3 Implement updateActiveDot() using data-active attribute
- [ ] 1.4 Implement click-to-navigate via scrollIntoView({ behavior: 'smooth' })
- [ ] 1.5 Remove Accordion logic (keep native `<details>` behavior only)

## 2. Update index.html

- [ ] 2.1 Replace progress-indicator `<nav>` with dot-navigation `<nav aria-label="Navegación de secciones">`
- [ ] 2.2 Add 4 dot elements with `title` attributes for section labels
- [ ] 2.3 Set `data-active="true"` on first dot (Hero) by default
- [ ] 2.4 Ensure `data-section` attributes match section IDs

## 3. Update styles.css

- [ ] 3.1 Remove old .progress-indicator and .progress-indicator-item styles
- [ ] 3.2 Add .dot-navigation styles (position: fixed, right edge, vertical stack)
- [ ] 3.3 Add .dot styles (8px circle, transition, neon-violet glow on active)
- [ ] 3.4 Add CSS tooltip on hover (::after pseudo-element with section label)
- [ ] 3.5 Add touch target: min 44x44px interactive area per dot
- [ ] 3.6 Add responsive styles: horizontal row on mobile bottom

## 4. Verify against specs

- [ ] 4.1 Test dot renders on right edge (desktop)
- [ ] 4.2 Test active dot updates on scroll
- [ ] 4.3 Test hover tooltip shows section label
- [ ] 4.4 Test click navigates to correct section
- [ ] 4.5 Test mobile layout (horizontal bottom bar)
- [ ] 4.6 Test touch target accessibility
- [ ] 4.7 Test keyboard navigation (tab + title attribute)

# Proposal: portfolio-2026-poc

## Intent

Create a single-page portfolio PoC for Jimmy (Senior Product Consultant & UX Strategy) showcasing services and case studies with an "Architectural Blueprint" dark aesthetic. The PoC validates the design system integration, expandible card interactions, and content structure before committing to a full implementation.

## Scope

### In Scope
- Single-page portfolio with 4 sections: Hero → Services → Case Studies → CTA
- Hero with headline, subtext, and CTA button
- 3 equal-width service cards (UX Audit, Prototyping/DesignOps, with 3rd TBD)
- 3 expandible case study cards in order: Bpms.ai → EnchanTales → Trazabilidad
- CTA section with Calendly link + LinkedIn
- Integration of existing design system (theme.css, tokens.json, variables.css)
- Responsive design (desktop + mobile breakpoints)
- Progress indicators for section navigation

### Out of Scope
- Multi-page routing
- CMS integration
- Analytics tracking
- SEO optimization
- Animation polish beyond expandible cards
- Production hosting

## Capabilities

### New Capabilities
- `expandible-case-cards`: Accordion-style case study cards that expand to show full case details
- `progress-indicator`: Scroll-based progress bar showing current section
- `single-page-portfolio`: Complete single-page layout with all 4 sections

### Modified Capabilities
- None (new capabilities only)

## Approach

Use vanilla HTML/CSS/JS prototype leveraging existing design tokens. Implement each section as a semantic HTML section with CSS custom properties from variables.css. Expandible cards use `<details>/<summary>` or minimal JS toggle. Progress indicator uses IntersectionObserver API. No build step required—single `index.html` with linked stylesheets.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` | New | Single-page portfolio HTML structure |
| `theme.css` | Existing | Design tokens (colors, spacing, typography) |
| `tokens.json` | Existing | Design token source of truth |
| `variables.css` | Existing | CSS custom properties |
| `Info-portafolio.md` | Existing | Content source |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Font loading delays | Low | Use web-safe fallbacks + font-display: swap |
| Expandible card animation jank | Medium | Test on low-end devices; use CSS transitions |
| Mobile card layout issues | Medium | Flexbox/Grid with wrap + media queries |

## Rollback Plan

Delete `index.html`. No existing files modified. PoC is isolated in a single HTML file.

## Dependencies

- Google Fonts: Untitled Sans, aeonikPro (requires web font subscription/access)
- Calendly embed script (external)
- Font source for dotDigital

## Success Criteria

- [ ] Hero section renders with headline, subtext, and CTA
- [ ] 3 service cards display with equal widths
- [ ] 3 case study cards expand/collapse with full content
- [ ] Progress indicator updates on scroll
- [ ] CTA links (Calendly + LinkedIn) are functional
- [ ] Responsive layout works on 375px+ viewports
- [ ] No console errors on load
- [ ] Design tokens (midnight-abyss, neon-violet accents) applied correctly
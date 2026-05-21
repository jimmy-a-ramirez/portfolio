# Design: portfolio-2026-poc

## Technical Approach

Vanilla HTML/CSS/JS single-page portfolio leveraging existing design tokens from `theme.css` / `variables.css`. Uses semantic HTML sections with CSS Grid/Flexbox for layout. Expandible case cards use `<details>/<summary>` with minimal JS for state. Progress indicator uses IntersectionObserver API. No build step—direct browser execution.

## Architecture Decisions

### Decision: HTML Structure

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Single index.html | Simple, no routing, PoC-appropriate | ✅ Adopt |
| Component-based (Web Components) | Over-engineering for 4 sections | ❌ Reject |
| Markdown-based generator | Adds build complexity | ❌ Reject |

**Rationale**: PoC scope is 4 sections—single file keeps it simple and testable. Semantic `<section>` tags enable native accessibility and IntersectionObserver targeting.

### Decision: CSS Organization

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Inline styles | No reuse, hard to maintain | ❌ Reject |
| Separate styles.css | Reusable tokens, single request | ✅ Adopt |
| CSS Modules | Requires build step | ❌ Reject |

**Rationale**: Reuse existing `variables.css` tokens. New styles in `styles.css` scoped to portfolio. Single HTTP request for CSS.

### Decision: Expandible Card Pattern

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `<details>/<summary>` | Native, no JS, limited animation | ✅ Adopt |
| React/Vue component | Overkill for PoC | ❌ Reject |
| Custom JS toggle + aria | More control, more code | ❌ Reject |

**Rationale**: Native `<details>` provides semantic structure, keyboard navigation, and reduced JS surface. CSS `transition: height` handles animation gracefully on supported browsers.

### Decision: Progress Indicator Implementation

| Option | Tradeoff | Decision |
|--------|----------|----------|
| IntersectionObserver API | Native, performant, cross-browser | ✅ Adopt |
| Scroll event listener | Requires throttling, impacts perf | ❌ Reject |
| Sticky nav with anchor links | Proposal specifies "progress indicators, not sticky links" | ❌ Reject |

**Rationale**: IntersectionObserver is the modern standard—triggers callbacks when sections enter viewport with minimal main-thread impact.

### Decision: Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Single column, stacked cards |
| Tablet | 768px - 1024px | 2-column services, 1-column cases |
| Desktop | > 1024px | 3-column services, 3-column cases |

**Rationale**: Aligns with CSS conventions in existing codebase. Mobile-first approach via `@media (min-width)`.

### Decision: Third-Party Dependencies

| Dependency | Purpose | Decision |
|------------|---------|----------|
| Google Fonts (Untitled Sans, aeonikPro) | Typography | Load with `font-display: swap` |
| Calendly embed | CTA scheduling | Inline widget embed |
| LinkedIn link | CTA social | Simple `<a>` link |

**Rationale**: Fonts are brand requirement—fallback to system-ui. Calendly is external but required for CTA.

## Data Flow

```
User Scroll
    │
    ▼
IntersectionObserver (progress.js)
    │
    ├──► Update active section class on nav indicator
    │
    ▼
CSS scroll-driven animations (optional enhancement)
    │
    ▼
Native <details> toggle for case cards (no JS required)
```

**State**: No application state—purely scroll-driven UI. Case card state is native browser (`.open` attribute on `<details>`).

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Create | Single-page portfolio HTML structure |
| `styles.css` | Create | Portfolio-specific styles (imports variables.css) |
| `progress.js` | Create | IntersectionObserver for section tracking |
| `variables.css` | Read | Existing design tokens (not modified) |
| `theme.css` | Read | Existing design tokens (not modified) |
| `Info-portafolio.md` | Read | Content source (not modified) |

## Interfaces / Contracts

```css
/* Section identifiers for IntersectionObserver */
[data-section="hero"]
[data-section="services"]
[data-section="cases"]
[data-section="cta"]

/* Progress indicator state */
.progress-indicator-item[data-active="true"]
```

```html
<!-- Expandible case card pattern -->
<details class="case-card">
  <summary class="case-card__trigger">
    <span class="case-card__title">Bpms.ai</span>
    <span class="case-card__icon">▼</span>
  </summary>
  <div class="case-card__content">...full content...</div>
</details>
```

```javascript
// Progress indicator callback signature
(entries: IntersectionObserverEntry[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      updateIndicator(entry.target.dataset.section);
    }
  });
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `progress.js` observer logic | Vitest + JSDOM: mock intersection, verify callback fires |
| Unit | `<details>` toggle state | Vitest: verify open/close classes |
| Integration | Full scroll flow | Playwright: scroll through sections, verify indicator updates |
| E2E | User journey | Playwright: hero → services → cases (expand) → cta links work |

**Test files to create**:
- `tests/progress.test.js` — unit tests for IntersectionObserver wrapper
- `tests/portfolio.spec.js` — Playwright e2e test for full user flow

## Migration / Rollback

No migration required. PoC is isolated to new files only. Rollback: delete `index.html`, `styles.css`, `progress.js`, and `tests/` directory.

## Open Questions

- [ ] Third-party font access: Are Untitled Sans and aeonikPro available via Google Fonts, or do they require a custom font file?
- [ ] Calendly widget type: Inline embed vs. popup? Recommend inline for better UX.
- [ ] Content for third service card: Proposal mentions "3rd TBD" — confirm service name before implementation.
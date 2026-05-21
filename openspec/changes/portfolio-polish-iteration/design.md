## Context

Current progress indicator uses `<button>` elements with text labels, positioned on right edge, driven by IntersectionObserver. Multiple issues:
- `rootMargin: '-50% 0px -50% 0px'` with `threshold: 0` causes jittery section detection
- Text labels "Hero / Services / Cases / CTA" are generic, not helpful as nav cues
- "Typewriter style" concept was ambiguous and never implemented

## Goals / Non-Goals

**Goals:**
- Replace text-label buttons with minimal visual dots on right edge
- Show active section via neon-violet glow on the current dot
- Reveal section label as CSS tooltip on hover (no JS needed)
- Fix IntersectionObserver thresholds for reliable detection
- Maintain click-to-navigate behavior
- Responsive: dots adapt to mobile bottom bar

**Non-Goals:**
- No typewriter animation (concept was ambiguous, removing it)
- No animated transitions between labels
- No horizontal layout for desktop

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Label display** | CSS tooltip on hover, not JS | Zero JS dependency for labels; simpler, accessible via `title` attr |
| **IntersectionObserver** | `rootMargin: '-40% 0px -40% 0px'`, `threshold: 0` | Wider margin prevents flicker between sections |
| **Dot style** | 8px circle, `neon-violet` glow when active | Matches design system, minimal visual weight |
| **Active indicator** | `data-active` attribute on dot | Consistent with existing pattern, CSS-driven |
| **Click nav** | Keep existing `scrollIntoView({ behavior: 'smooth' })` | Works reliably, matches spec |

## Risks / Trade-offs

- **Fast scroll flicker** → Wider rootMargin reduces it but adds 100ms delay — acceptable trade-off
- **Touch targets on mobile** → Dots need min 44px tap area even if visual dot is 8px
- **CSS tooltip positioning** → On mobile bottom bar, tooltip must float above, not overlap

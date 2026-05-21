## Why

The progress indicator (right-side navigation) doesn't work reliably — IntersectionObserver logic has timing issues and the visual feedback is unclear. The "typewriter style" concept from the original design was ambiguous and never properly specified. We need to replace it with a simple, working navigation indicator that communicates scroll progress intuitively.

## What Changes

- Remove non-functional right-side progress indicator
- Replace with a clean **vertical dot navigation** on the right edge — minimal dots that highlight active section as user scrolls
- Add section label as a tooltip on hover/active state via CSS (not JS typewriter)
- Fix IntersectionObserver thresholds and rootMargin for reliable section detection
- General polish pass: responsive refinements, spacing consistency, accessibility audit

## Capabilities

### New Capabilities
- `dot-navigation`: Replaces old progress indicator. Vertical stack of dots on right edge, active dot highlighted with neon-violet glow, section label shown on hover via CSS tooltip. IntersectionObserver-driven with proper thresholds.

### Modified Capabilities
- (none — first iteration, no existing specs)

## Impact

| File | Action |
|------|--------|
| `index.html` | Replace progress-indicator with dot-navigation HTML |
| `styles.css` | New styles for dot-navigation, remove old progress-indicator styles |
| `progress.js` | Rewrite module — keep IntersectionObserver, remove click/typewriter logic |

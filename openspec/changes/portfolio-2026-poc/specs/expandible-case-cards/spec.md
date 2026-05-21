# Expandible Case Cards Specification

## Purpose

Accordion-style case study cards that expand to show full case details (context, role, metrics, results) with smooth animations and accordion behavior.

## Requirements

### Requirement: Default Collapsed State

Each case card MUST display in collapsed state showing only the title and one key metric.

- GIVEN page loads with case cards
- WHEN page renders
- THEN all case cards SHALL be collapsed by default
- AND each collapsed card SHALL show only: case title + one key metric
- AND full content (context, role, full metrics, results) SHALL be hidden

#### Scenario: Cards collapsed on load

- GIVEN cases section is visible
- WHEN index.html loads
- THEN Bpms.ai card shows title "Bpms.ai: Rediseño de un Ecosistema BPMS..." and metric "85% Reduction"
- AND EnchanTales card shows title and one key metric
- AND Trazabilidad card shows title and one key metric
- AND no card reveals full content

### Requirement: Click to Expand

Clicking a collapsed card MUST expand it to show full content.

- GIVEN case card is collapsed
- WHEN user clicks on the card header
- THEN the card SHALL expand to reveal: context, role, metrics, results
- AND expand animation SHALL be smooth (CSS transition)

#### Scenario: Single card expands on click

- GIVEN Bpms.ai card is collapsed
- WHEN user clicks Bpms.ai card header
- THEN card expands showing: contexto completo, rol, metrics (85%, 97%, 35%, 65%), resultados
- AND animation is smooth (300ms transition)

### Requirement: Accordion Behavior - Single Expanded

Only one card MAY be expanded at a time. Expanding a new card MUST collapse any previously expanded card.

- GIVEN one case card is already expanded
- WHEN user clicks a different collapsed card
- THEN previously expanded card SHALL collapse
- AND newly clicked card SHALL expand
- AND at any given moment, 0 or 1 cards are expanded

#### Scenario: Expanding new card collapses previous

- GIVEN Bpms.ai card is expanded
- WHEN user clicks on EnchanTales card header
- THEN Bpms.ai card collapses (full content hidden)
- AND EnchanTales card expands (full content visible)

### Requirement: Collapse on Second Click

Clicking an already-expanded card MUST collapse it.

- GIVEN a case card is expanded
- WHEN user clicks on that same card header again
- THEN the card SHALL collapse back to default state
- AND no cards are expanded

#### Scenario: Clicking expanded card collapses it

- GIVEN Bpms.ai card is expanded
- WHEN user clicks Bpms.ai header again
- THEN card collapses to show only title + metric
- AND full content is hidden

### Requirement: Expand Animation

Expand/collapse MUST use smooth CSS transitions.

- GIVEN user triggers expand or collapse
- WHEN animation starts
- THEN transition duration SHALL be smooth (200ms-400ms)
- AND content SHALL animate from height 0 to auto (or vice versa)
- AND no abrupt jump or flash

#### Scenario: Animation is smooth

- GIVEN Bpms.ai card is collapsed
- WHEN user clicks to expand
- THEN content fades/scrolls in smoothly
- AND no layout jump occurs during animation

### Requirement: Keyboard Accessibility

Expandible cards MUST be keyboard accessible (Enter/Space toggles).

- GIVEN user tabs to a case card
- WHEN user presses Enter or Space
- THEN card SHALL toggle (expand if collapsed, collapse if expanded)
- AND focus SHALL remain on the card

#### Scenario: Keyboard toggles card

- GIVEN case card has focus
- WHEN user presses Enter
- THEN card toggles expansion state

---

## Summary

| Requirement | Scenarios |
|------------|-----------|
| Default Collapsed State | 1 |
| Click to Expand | 1 |
| Accordion Behavior - Single Expanded | 1 |
| Collapse on Second Click | 1 |
| Expand Animation | 1 |
| Keyboard Accessibility | 1 |

**Total**: 6 requirements, 6 scenarios
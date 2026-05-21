## ADDED Requirements

### Requirement: Scroll-triggered fade-in

Sections SHALL fade in when they enter the viewport on scroll.

#### Scenario: Section fades in
- **WHEN** a section enters the viewport
- **THEN** it SHALL transition from opacity 0 to 1 over 600ms

#### Scenario: Reduced motion disabled
- **WHEN** the user has prefers-reduced-motion: reduce
- **THEN** all scroll animations SHALL be disabled
- **AND** elements SHALL be fully visible immediately

### Requirement: Slide-up on scroll

Elements within sections SHALL slide up slightly when they become visible.

#### Scenario: Cards slide up
- **WHEN** service cards enter the viewport
- **THEN** they SHALL slide up 20px while fading in

### Requirement: Stagger animation

Multiple elements in the same section SHALL animate with a staggered delay.

#### Scenario: Staggered service cards
- **WHEN** the services section enters the viewport
- **THEN** the first card SHALL animate at 0ms delay
- **AND** the second card SHALL animate at 150ms delay
- **AND** the third card SHALL animate at 300ms delay

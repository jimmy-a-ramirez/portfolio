## ADDED Requirements

### Requirement: Testimonials section renders

The page SHALL display a testimonials section after the cases section.

#### Scenario: Section exists
- **WHEN** the page loads
- **THEN** a testimonials section SHALL be present after the cases section

### Requirement: Testimonial card layout

Each testimonial SHALL be displayed as a quote card with photo, text, name, and role.

#### Scenario: Card structure
- **WHEN** viewing a testimonial card
- **THEN** it SHALL display a quote, author photo, author name, and role

#### Scenario: Two testimonials
- **WHEN** the testimonials section loads
- **THEN** exactly 2 testimonial cards SHALL be displayed side by side (desktop)

### Requirement: Cards are static

Testimonial cards SHALL NOT have carousel/auto-rotation behavior.

#### Scenario: No auto-rotation
- **WHEN** the testimonials section is visible
- **THEN** all cards SHALL remain visible simultaneously
- **AND** no rotation or cycling SHALL occur

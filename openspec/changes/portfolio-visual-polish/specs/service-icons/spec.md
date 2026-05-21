## ADDED Requirements

### Requirement: Service card icons

Each service card SHALL display an inline SVG icon above its title.

#### Scenario: Icons render in cards
- **WHEN** the services section is visible
- **THEN** each service card SHALL have an SVG icon at the top
- **AND** the icon SHALL use neon-violet as its color

#### Scenario: Icons are semantic
- **WHEN** the page loads
- **THEN** each icon SHALL have aria-hidden="true" for accessibility

### Requirement: Icons match service theme

Each icon SHALL represent its service's focus area.

#### Scenario: Icon 1 - UX Audit
- **WHEN** viewing the first service card
- **THEN** the icon SHALL represent analysis/research (e.g., magnifying glass)

#### Scenario: Icon 2 - Prototyping
- **WHEN** viewing the second service card
- **THEN** the icon SHALL represent design/prototyping (e.g., layout or pencil)

#### Scenario: Icon 3 - AI Consulting
- **WHEN** viewing the third service card
- **THEN** the icon SHALL represent AI/technology (e.g., spark or chip)

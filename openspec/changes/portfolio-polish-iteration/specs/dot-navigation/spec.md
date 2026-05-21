## ADDED Requirements

### Requirement: Dot navigation renders on right edge

The system SHALL render a vertical stack of dots on the right edge of the viewport. Each dot SHALL represent a page section.

#### Scenario: Desktop dot layout
- **WHEN** the page loads on a viewport wider than 1024px
- **THEN** 4 dots SHALL be displayed in a vertical column on the right edge
- **AND** each dot SHALL be positioned with equal vertical spacing

#### Scenario: Mobile dot layout
- **WHEN** the page loads on a viewport narrower than 768px
- **THEN** dots SHALL be displayed in a horizontal row at the bottom of the screen

### Requirement: Active dot shows current section

The system SHALL highlight the dot corresponding to the currently visible section.

#### Scenario: Section changes on scroll
- **WHEN** the user scrolls to the Services section
- **THEN** the second dot SHALL become active (neon-violet glow)
- **AND** the first dot SHALL return to inactive state

#### Scenario: Active dot on initial load
- **WHEN** the page loads
- **THEN** the first dot (Hero) SHALL be active by default

### Requirement: Hover reveals section label

The system SHALL display the section name when the user hovers over a dot.

#### Scenario: Tooltip appears on hover
- **WHEN** the user hovers over a dot
- **THEN** a label SHALL appear next to the dot showing the section name

#### Scenario: Keyboard tooltip
- **WHEN** the user tabs to a dot
- **THEN** the section name SHALL be announced via `title` attribute

### Requirement: Click navigates to section

The system SHALL scroll to the corresponding section when a dot is clicked.

#### Scenario: Click navigation
- **WHEN** the user clicks the third dot
- **THEN** the page SHALL smoothly scroll to the Cases section
- **AND** the third dot SHALL become active

### Requirement: Dots have accessible touch targets

Each dot SHALL have a minimum interactive area of 44x44px for touch accessibility.

#### Scenario: Mobile tap target
- **WHEN** viewed on a mobile device
- **THEN** each dot SHALL have a tap target of at least 44x44px

### Requirement: IntersectionObserver detects sections reliably

The system SHALL use IntersectionObserver with appropriate margins to detect which section is in view.

#### Scenario: Observer detects mid-section
- **WHEN** more than 60% of a section is visible in the viewport
- **THEN** the corresponding dot SHALL become active
- **AND** the previous section's dot SHALL become inactive

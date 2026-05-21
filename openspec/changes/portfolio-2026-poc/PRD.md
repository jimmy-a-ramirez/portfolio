# Product Requirements Document (PRD)
## Portfolio 2026 PoC - Single Page Portfolio

**Project**: portfolio-2026-poc
**Version**: 1.0.0
**Date**: 2026-05-20
**Approach**: Test-Driven Development (TDD)

---

## 1. Executive Summary

Single-page portfolio website showcasing professional services and case studies with:
- 4 sections: Hero, Services, Cases, CTA
- Progress indicator with scroll tracking and click navigation
- 3 expandible case cards with accordion behavior (single expand)
- Dark theme (midnight-abyss) with architectural blueprint aesthetic
- Responsive design for mobile, tablet, and desktop

---

## 2. Requirements Summary

| Spec | Requirements | Scenarios |
|------|-------------|-----------|
| single-page-portfolio | 6 | 6 |
| progress-indicator | 4 | 4 |
| expandible-case-cards | 6 | 6 |
| **Total** | **16** | **16** |

---

## 3. Requirements & Test Mapping

### 3.1 Single Page Portfolio Requirements

#### Requirement 1: Hero Section Rendering
**ID**: SPP-001
**Description**: The hero section MUST display the headline "De la incertidumbre a la arquitectura lógica", subtext about spending 70% of time understanding and planning, and a CTA button.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Hero loads with content visible | SPP-001-T1 | portfolio.spec.js | E2E |
| Design tokens applied | SPP-001-T2 | tokens.test.js | Unit |

**Acceptance Criteria**:
- [x] Headline "De la incertidumbre a la arquitectura lógica" is visible
- [x] Subtext about 70% time is visible
- [x] CTA button is visible and clickable
- [x] Background color is midnight-abyss (#05060f)
- [x] Accent color is neon-violet (#663af3)

**Implementation**: `index.html` line 28-58, `styles.css` line 130-175

---

#### Requirement 2: Services Section Display
**ID**: SPP-002
**Description**: The services section MUST display exactly 3 equal-width service cards containing UX Audit & Product Discovery, Prototipado de Alta Precision & DesignOps, and a third service.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Three service cards render | SPP-002-T1 | portfolio.spec.js | E2E |
| Cards have equal width | SPP-002-T2 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] Exactly 3 service cards are displayed
- [x] Card 1: "UX Audit & Product Discovery"
- [x] Card 2: "Prototipado de Alta Precision & DesignOps"
- [x] Card 3: "Consultoría estratégica de Producto & AI"
- [x] Cards use equal-width CSS Grid (1:1:1 ratio)

**Implementation**: `index.html` line 60-117, `styles.css` line 177-236

---

#### Requirement 3: Cases Section Display
**ID**: SPP-003
**Description**: The cases section MUST display 3 expandible case study cards in order: Bpms.ai, EnchanTales, Trazabilidad.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Case studies ordered correctly | SPP-003-T1 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] Exactly 3 case cards exist
- [x] First card: "Bpms.ai"
- [x] Second card: "EnchanTales"
- [x] Third card: "Trazabilidad"

**Implementation**: `index.html` line 119-209, `styles.css` line 238-320

---

#### Requirement 4: CTA Section Rendering
**ID**: SPP-004
**Description**: The CTA section MUST display contact text and functional links to Calendly and LinkedIn.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| CTA links are clickable | SPP-004-T1 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] CTA heading text is visible
- [x] Calendly link is functional (href populated)
- [x] LinkedIn link is functional (href populated)
- [x] Email reference is displayed

**Implementation**: `index.html` line 211-250, `styles.css` line 322-370

---

#### Requirement 5: Smooth Scroll Navigation
**ID**: SPP-005
**Description**: Clicking any navigation element MUST smoothly scroll to the corresponding section.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Smooth scroll to section | SPP-005-T1 | smooth-scroll.test.js | Unit |
| Click navigates to section | SPP-005-T2 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] Navigation links use smooth scroll behavior
- [x] Scroll animation duration: 300ms-800ms
- [x] `scroll-behavior: smooth` applied to html element

**Implementation**: `progress.js` line 67-79, `styles.css` line 11

---

#### Requirement 6: Responsive Breakpoints
**ID**: SPP-006
**Description**: The layout MUST adapt to mobile viewports starting at 375px width.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Mobile layout stacks correctly | SPP-006-T1 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] Mobile (< 768px): single column
- [x] Tablet (768px - 1024px): 2-column services
- [x] Desktop (> 1024px): 3-column layout

**Implementation**: `styles.css` line 372-446

---

### 3.2 Progress Indicator Requirements

#### Requirement 1: Progress Bar Visibility
**ID**: PI-001
**Description**: The progress indicator MUST be visible at all times during page scroll.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Progress indicator stays fixed | PI-001-T1 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] Progress indicator visible on load
- [x] Position: fixed
- [x] Remains visible after scrolling 500px

**Implementation**: `index.html` line 14-26, `styles.css` line 50-85

---

#### Requirement 2: Current Section Display
**ID**: PI-002
**Description**: The progress indicator MUST display the current section based on scroll position.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Active section updates on scroll | PI-002-T1 | progress.test.js | Unit |
| Active section updates correctly | PI-002-T2 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] Hero active when Hero section visible
- [x] Services active when Services section visible
- [x] Cases active when Cases section visible
- [x] CTA active when CTA section visible

**Implementation**: `progress.js` line 20-46

---

#### Requirement 3: Click Navigation
**ID**: PI-003
**Description**: Clicking a section in the progress indicator MUST navigate to that section.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Click navigates to section | PI-003-T1 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] Click "Services" → scrolls to services section
- [x] Click "Cases" → scrolls to cases section
- [x] Click "CTA" → scrolls to CTA section
- [x] Active state updates after click

**Implementation**: `progress.js` line 48-62

---

#### Requirement 4: Scroll Position Updates
**ID**: PI-004
**Description**: The progress indicator MUST update in real-time as user scrolls.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Progress updates during scroll | PI-004-T1 | progress.test.js | Unit |
| Updates felt responsive | PI-004-T2 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] IntersectionObserver with 50% threshold
- [x] Updates felt responsive (< 100ms)
- [x] Transitions between sections are smooth

**Implementation**: `progress.js` line 27-43

---

### 3.3 Expandible Case Cards Requirements

#### Requirement 1: Default Collapsed State
**ID**: ECC-001
**Description**: Each case card MUST display in collapsed state showing only the title and one key metric.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Cards collapsed on load | ECC-001-T1 | accordion.test.js | Unit |
| Cards collapsed on load | ECC-001-T2 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] All 3 cards collapsed on page load
- [x] Each shows: title + one key metric
- [x] Full content is hidden

**Implementation**: `index.html` line 129-209, `styles.css` line 255-275

---

#### Requirement 2: Click to Expand
**ID**: ECC-002
**Description**: Clicking a collapsed card MUST expand it to show full content.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Single card expands on click | ECC-002-T1 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] Click header → card expands
- [x] Content (context, role, metrics, results) visible
- [x] Animation is smooth (300ms transition)

**Implementation**: `styles.css` line 295-305

---

#### Requirement 3: Accordion Behavior - Single Expanded
**ID**: ECC-003
**Description**: Only one card MAY be expanded at a time. Expanding a new card MUST collapse any previously expanded card.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Opening new card collapses previous | ECC-003-T1 | accordion.test.js | Unit |
| Only 0 or 1 cards expanded | ECC-003-T2 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] Opening card 2 → card 1 collapses automatically
- [x] At any time: 0 or 1 cards expanded

**Implementation**: `progress.js` line 82-100

---

#### Requirement 4: Collapse on Second Click
**ID**: ECC-004
**Description**: Clicking an already-expanded card MUST collapse it.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Clicking expanded card collapses it | ECC-004-T1 | accordion.test.js | Unit |
| All cards can be closed | ECC-004-T2 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] Click expanded card → collapses
- [x] No auto-reopen behavior

**Implementation**: Native `<details>` behavior + JS in `progress.js` line 88-93

---

#### Requirement 5: Expand Animation
**ID**: ECC-005
**Description**: Expand/collapse MUST use smooth CSS transitions.

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Animation is smooth | ECC-005-T1 | accordion.test.js | Unit |

**Acceptance Criteria**:
- [x] Transition duration: 200ms-400ms
- [x] No abrupt jump or flash

**Implementation**: `styles.css` line 290-305

---

#### Requirement 6: Keyboard Accessibility
**ID**: ECC-006
**Description**: Expandible cards MUST be keyboard accessible (Enter/Space toggles).

| Scenario | Test ID | Test File | Test Type |
|----------|---------|-----------|-----------|
| Keyboard toggles card | ECC-006-T1 | accordion.test.js | Unit |
| Keyboard navigation works | ECC-006-T2 | portfolio.spec.js | E2E |

**Acceptance Criteria**:
- [x] Tab to case card → focus visible
- [x] Press Enter → toggles
- [x] Press Space → toggles

**Implementation**: `progress.js` line 82-93

---

## 4. Test Execution Matrix

| Test File | Tests | Type | Spec Coverage |
|-----------|-------|------|----------------|
| `progress.test.js` | 6 | Unit | PI-001, PI-002, PI-004 |
| `accordion.test.js` | 9 | Unit | ECC-001, ECC-002, ECC-003, ECC-004, ECC-006 |
| `smooth-scroll.test.js` | 4 | Unit | SPP-005 |
| `tokens.test.js` | 5 | Unit | SPP-001 |
| `portfolio.spec.js` | 17 | E2E | All 16 scenarios |
| **Total** | **41** | | **16/16** |

---

## 5. Running Tests

### Unit Tests (Vitest)
```bash
npm run test:run
```

### E2E Tests (Playwright)
```bash
npm run test:e2e
```

### All Tests
```bash
npm run test:run && npm run test:e2e
```

---

## 6. Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | Full |
| Firefox | 88+ | Full |
| Safari | 14+ | Full |
| Edge | 90+ | Full |

---

## 7. Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| vitest | ^2.1.8 | Unit testing |
| @playwright/test | ^1.49.1 | E2E testing |
| jsdom | ^25.0.1 | DOM simulation for unit tests |

---

## 8. Acceptance Criteria Summary

- [x] All 16 requirements have passing tests
- [x] 41 test cases implemented
- [x] Unit tests: 24 tests, 100% pass
- [x] E2E tests: 17 tests, 100% pass
- [x] No console errors on load
- [x] Responsive at 375px, 768px, 1024px, 1440px
- [x] Keyboard accessible
- [x] Progress indicator functional
- [x] Accordion behavior correct

---

**Document Version**: 1.0.0
**Created**: 2026-05-20
**Approach**: TDD - Tests written before implementation where applicable
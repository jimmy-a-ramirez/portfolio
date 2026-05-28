/**
 * Portfolio E2E Tests
 * Tests full user journey across all specs
 */

import { test, expect } from '@playwright/test';

test.describe('Single Page Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ===== Single Page Portfolio Spec Tests =====

  test('Requirement: Hero Section Rendering - loads with content visible', async ({ page }) => {
    const headline = page.locator('.hero__title');
    await expect(headline).toBeVisible();
    await expect(headline).toContainText('De la incertidumbre a la arquitectura lógica');

    const subtext = page.locator('.hero__subtitle');
    await expect(subtext).toBeVisible();
    await expect(subtext).toContainText('Dedico el 70% del tiempo');

    const ctaButton = page.locator('.hero__cta');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toBeEnabled();
  });

  test('Requirement: Services Section Display - three service cards render', async ({ page }) => {
    const serviceCards = page.locator('.service-card');
    await expect(serviceCards).toHaveCount(3);

    await expect(serviceCards.first()).toContainText('Auditoría UX & Discovery de Producto');
    await expect(serviceCards.nth(1)).toContainText('Prototipado de Alta Precisión');
  });

  test('Requirement: Cases Section Display - case studies ordered correctly', async ({ page }) => {
    const caseCards = page.locator('.case-card');
    await expect(caseCards).toHaveCount(3);

    await expect(caseCards.nth(0)).toContainText('Bpms.ai');
    await expect(caseCards.nth(1)).toContainText('EnchanTales');
    await expect(caseCards.nth(2)).toContainText('Trazabilidad');
  });

  test('Requirement: CTA Section Rendering - CTA links are clickable', async ({ page }) => {
    await page.locator('#cta').scrollIntoViewIfNeeded();

    const ctaTitle = page.locator('.cta__title');
    await expect(ctaTitle).toBeVisible();

    const emailLink = page.locator('.cta__actions .btn--primary');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', /mailto:jialexisrojas@gmail\.com/);

    const linkedinLink = page.locator('.cta__linkedin');
    await expect(linkedinLink).toBeVisible();
  });

  test('Requirement: Smooth Scroll Navigation - scrolls to section', async ({ page }) => {
    const servicesButton = page.locator('.progress-indicator-item[data-section="services"]');
    await servicesButton.click();

    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeInViewport();
  });

  test('Requirement: Responsive Breakpoints - mobile layout stacks correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const servicesGrid = page.locator('.services__grid');
    const gridStyle = await servicesGrid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
    // Verificamos que se apile en una sola columna (un único valor, sin espacios que separen columnas extras)
    const columnsCount = gridStyle.trim().split(/\s+/).length;
    expect(columnsCount).toBe(1);
  });
});

// ===== Progress Indicator Spec Tests =====

test.describe('Progress Indicator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Requirement: Progress Bar Visibility - stays fixed on scroll', async ({ page }) => {
    const indicator = page.locator('.progress-indicator');
    await expect(indicator).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(indicator).toBeVisible();
  });

  test('Requirement: Current Section Display - active section updates on scroll', async ({ page }) => {
    const heroIndicator = page.locator('.progress-indicator-item[data-section="hero"]');
    const servicesIndicator = page.locator('.progress-indicator-item[data-section="services"]');

    await expect(heroIndicator).toHaveAttribute('data-active', 'true');

    await page.locator('#services').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await expect(servicesIndicator).toHaveAttribute('data-active', 'true');
  });

  test('Requirement: Click Navigation - click navigates to section', async ({ page }) => {
    const casesButton = page.locator('.progress-indicator-item[data-section="cases"]');
    await casesButton.click();

    const casesSection = page.locator('#cases');
    await expect(casesSection).toBeInViewport();

    const casesIndicator = page.locator('.progress-indicator-item[data-section="cases"]');
    await expect(casesIndicator).toHaveAttribute('data-active', 'true');
  });

  test('Requirement: Scroll Position Updates - progress updates during scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 4));
    const servicesIndicator = page.locator('.progress-indicator-item[data-section="services"]');
    await expect(servicesIndicator).toHaveAttribute('data-active', 'true');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(300);
    const casesIndicator = page.locator('.progress-indicator-item[data-section="cases"]');
    await expect(casesIndicator).toHaveAttribute('data-active', 'true');
  });
});

// ===== Expandible Case Cards Spec Tests =====

test.describe('Expandible Case Cards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Requirement: Default Collapsed State - cards collapsed on load', async ({ page }) => {
    const caseCards = page.locator('.case-card');
    const count = await caseCards.count();

    for (let i = 0; i < count; i++) {
      const card = caseCards.nth(i);
      await expect(card).not.toHaveAttribute('open');
    }
  });

  test('Requirement: Click to Expand - single card expands on click', async ({ page }) => {
    const firstCard = page.locator('.case-card').first();
    const trigger = firstCard.locator('.case-card__trigger');

    await trigger.click();
    await expect(firstCard).toHaveAttribute('open');

    const content = firstCard.locator('.case-card__content');
    await expect(content).toBeVisible();
  });

  test('Requirement: Accordion Behavior - expanding new card collapses previous', async ({ page }) => {
    const card1 = page.locator('.case-card').nth(0);
    const card2 = page.locator('.case-card').nth(1);

    await card1.locator('.case-card__trigger').click();
    await expect(card1).toHaveAttribute('open');

    await card2.locator('.case-card__trigger').click();
    await expect(card1).not.toHaveAttribute('open');
    await expect(card2).toHaveAttribute('open');
  });

  test('Requirement: Collapse on Second Click - clicking expanded card collapses it', async ({ page }) => {
    const card = page.locator('.case-card').first();
    const trigger = card.locator('.case-card__trigger');

    await trigger.click();
    await expect(card).toHaveAttribute('open');

    await trigger.click();
    await expect(card).not.toHaveAttribute('open');
  });

  test('Requirement: Keyboard Accessibility - keyboard toggles card', async ({ page }) => {
    const firstCard = page.locator('.case-card').first();
    const trigger = firstCard.locator('.case-card__trigger');

    await trigger.focus();
    await trigger.press('Enter');
    await expect(firstCard).toHaveAttribute('open');

    await trigger.press(' ');
    await expect(firstCard).not.toHaveAttribute('open');
  });

  // ===== Theme Toggle Spec Tests =====
  test.describe('Theme Toggle (Light/Dark Mode)', () => {
    test('Requirement: Boton Conmutador de Tema - alternar tema por interacción y validar localStorage', async ({ page }) => {
      const toggleBtn = page.locator('#theme-toggle');
      await expect(toggleBtn).toBeVisible();

      // Obtener el tema inicial
      const initialTheme = await page.locator('html').getAttribute('data-theme') || 'dark';
      const expectedTheme = initialTheme === 'dark' ? 'light' : 'dark';

      // Dar clic
      await toggleBtn.click();
      const currentTheme = await page.locator('html').getAttribute('data-theme');
      expect(currentTheme).toBe(expectedTheme);

      // Validar persistencia tras recarga
      await page.reload();
      const reloadedTheme = await page.locator('html').getAttribute('data-theme');
      expect(reloadedTheme).toBe(expectedTheme);
    });

    test('Requirement: Soporte de Accesibilidad en Teclado - alternar tema con Enter y Espacio', async ({ page }) => {
      const toggleBtn = page.locator('#theme-toggle');
      await toggleBtn.focus();

      const initialTheme = await page.locator('html').getAttribute('data-theme') || 'dark';
      const nextTheme = initialTheme === 'dark' ? 'light' : 'dark';

      // Presionar Enter
      await toggleBtn.press('Enter');
      let currentTheme = await page.locator('html').getAttribute('data-theme');
      expect(currentTheme).toBe(nextTheme);

      // Presionar Espacio
      await toggleBtn.press(' ');
      currentTheme = await page.locator('html').getAttribute('data-theme');
      expect(currentTheme).toBe(initialTheme);
    });
  });

  // ===== Bilingual Language Switcher Spec Tests =====
  test.describe('Bilingual Language Switcher', () => {
    test('Requirement: Language Switcher Navigation - switches correctly between Spanish and English', async ({ page }) => {
      // 1. Iniciar en la página principal (español)
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');
      await expect(page.locator('.hero__title')).toContainText('De la incertidumbre a la arquitectura lógica');

      // 2. Localizar y dar clic al conmutador (EN)
      const langToggle = page.locator('.lang-toggle-btn');
      await expect(langToggle).toBeVisible();
      await expect(langToggle).toContainText('EN');
      
      // Ir a la versión en inglés
      await langToggle.click();
      await expect(page).toHaveURL(/\/en(\.html)?$/);

      // 3. Validar contenido en inglés
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('.hero__title')).toContainText('From uncertainty to logical architecture');

      // 4. Volver a la versión en español
      const esToggle = page.locator('.lang-toggle-btn');
      await expect(esToggle).toContainText('ES');
      await esToggle.click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    });

    test('Requirement: SEO Multi-language Alternate Links - hreflang links render correctly', async ({ page }) => {
      await page.goto('/');
      const alternateEs = page.locator('link[rel="alternate"][hreflang="es"]');
      const alternateEn = page.locator('link[rel="alternate"][hreflang="en"]');

      await expect(alternateEs).toHaveAttribute('href', /portafolio-jimmy\/?$/);
      await expect(alternateEn).toHaveAttribute('href', /portafolio-jimmy\/en\.html$/);
    });
  });

  // ===== Cognitive Focus Mode Spec Tests =====
  test.describe('A11y Panel - Cognitive Focus Mode', () => {
    test('Requirement: Conmutador Foco Cognitivo - click updates state, html class and localStorage', async ({ page }) => {
      await page.goto('/');
      
      // Abrir panel de accesibilidad
      const triggerBtn = page.locator('#a11y-trigger');
      await triggerBtn.click();
      
      const cognitiveBtn = page.locator('#a11y-cognitive-toggle');
      await expect(cognitiveBtn).toBeVisible();
      await expect(cognitiveBtn).toHaveAttribute('aria-checked', 'false');
      
      // Activar modo
      await cognitiveBtn.click();
      await expect(cognitiveBtn).toHaveAttribute('aria-checked', 'true');
      await expect(page.locator('html')).toHaveClass(/a11y-cognitive-mode/);
      
      // Validar persistencia tras recarga
      await page.reload();
      await page.locator('#a11y-trigger').click();
      await expect(page.locator('#a11y-cognitive-toggle')).toHaveAttribute('aria-checked', 'true');
      await expect(page.locator('html')).toHaveClass(/a11y-cognitive-mode/);
      
      // Desactivar modo
      await page.locator('#a11y-cognitive-toggle').click();
      await expect(page.locator('#a11y-cognitive-toggle')).toHaveAttribute('aria-checked', 'false');
      await expect(page.locator('html')).not.toHaveClass(/a11y-cognitive-mode/);
    });
  });

  // ===== UX Audit Simulator Spec Tests =====
  test.describe('UX Audit Simulator', () => {
    test('Requirement: Renderizado y Cálculo Inicial - score inicial es 60%', async ({ page }) => {
      await page.goto('/');

      const simulatorSection = page.locator('#simulator');
      await expect(simulatorSection).toBeVisible();

      // Verificar score inicial
      const scoreVal = page.locator('#score-value');
      await expect(scoreVal).toHaveText('60');

      const scoreStatus = page.locator('#score-status');
      await expect(scoreStatus).toHaveText('Oportunidad de Optimización');
      await expect(scoreStatus).toHaveClass(/score--warn/);
    });

    test('Requirement: Interacción Dinámica - cambiar sliders actualiza score, clase y enlace cta', async ({ page }) => {
      await page.goto('/');

      // Establecer todos a 1 (Riesgo Crítico)
      await page.locator('#sim-development').evaluate(el => { el.value = '1'; el.dispatchEvent(new Event('input')); });
      await page.locator('#sim-adoption').evaluate(el => { el.value = '1'; el.dispatchEvent(new Event('input')); });
      await page.locator('#sim-validation').evaluate(el => { el.value = '1'; el.dispatchEvent(new Event('input')); });
      await page.locator('#sim-handoff').evaluate(el => { el.value = '1'; el.dispatchEvent(new Event('input')); });

      const scoreVal = page.locator('#score-value');
      await expect(scoreVal).toHaveText('20');

      const scoreStatus = page.locator('#score-status');
      await expect(scoreStatus).toHaveText('Riesgo Crítico');
      await expect(scoreStatus).toHaveClass(/score--critical/);

      // Verificar CTA Mailto dinámico
      const ctaBtn = page.locator('#sim-cta-btn');
      const href = await ctaBtn.getAttribute('href');
      expect(href).toContain('mailto:jialexisrojas@gmail.com');
      expect(href).toContain('subject=');
      expect(href).toContain('20%');

      // Establecer todos a 5 (Excelente)
      await page.locator('#sim-development').evaluate(el => { el.value = '5'; el.dispatchEvent(new Event('input')); });
      await page.locator('#sim-adoption').evaluate(el => { el.value = '5'; el.dispatchEvent(new Event('input')); });
      await page.locator('#sim-validation').evaluate(el => { el.value = '5'; el.dispatchEvent(new Event('input')); });
      await page.locator('#sim-handoff').evaluate(el => { el.value = '5'; el.dispatchEvent(new Event('input')); });

      await expect(scoreVal).toHaveText('100');
      await expect(scoreStatus).toHaveText('Salud UX Excelente');
      await expect(scoreStatus).toHaveClass(/score--excellent/);
    });
  });
});
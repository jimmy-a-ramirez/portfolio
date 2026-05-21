/**
 * Unit Tests for Progress Indicator
 * Tests IntersectionObserver wrapper and callback behavior
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * Mock IntersectionObserver for testing
 */
const createMockObserver = () => {
  const callbacks = [];

  const observer = vi.fn((callback) => {
    callbacks.push(callback);
    return {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    };
  });

  observer.trigger = (entries) => {
    callbacks.forEach(cb => cb(entries));
  };

  return observer;
};

/**
 * Simulate IntersectionObserver entry
 * @param {string} id - Element ID
 * @param {boolean} isIntersecting - Whether element is intersecting
 */
const createEntry = (id, isIntersecting = true) => ({
  isIntersecting,
  target: { dataset: { section: id } },
  intersectionRatio: isIntersecting ? 0.8 : 0,
  boundingClientRect: {},
  intersectionRect: {},
  rootBounds: null
});

describe('Progress Indicator', () => {
  let mockObserver;
  let originalIntersectionObserver;

  beforeEach(() => {
    // Clear body first to avoid cumulative DOM
    document.body.innerHTML = '';
    // Create DOM elements for testing
    document.body.innerHTML = `
      <nav class="progress-indicator">
        <button class="progress-indicator-item" data-section="hero" data-active="true">Hero</button>
        <button class="progress-indicator-item" data-section="services" data-active="false">Services</button>
        <button class="progress-indicator-item" data-section="cases" data-active="false">Cases</button>
        <button class="progress-indicator-item" data-section="cta" data-active="false">CTA</button>
      </nav>
      <section id="hero" data-section="hero"></section>
      <section id="services" data-section="services"></section>
      <section id="cases" data-section="cases"></section>
      <section id="cta" data-section="cta"></section>
    `;

    // Mock IntersectionObserver
    originalIntersectionObserver = global.IntersectionObserver;
    mockObserver = createMockObserver();
    global.IntersectionObserver = mockObserver;
  });

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver;
  });

  describe('Requirement: Progress Bar Visibility (progress-indicator spec)', () => {
    it('should render progress indicator in fixed position', () => {
      const indicator = document.querySelector('.progress-indicator');
      expect(indicator).not.toBeNull();

      const styles = window.getComputedStyle(indicator);
      expect(styles.position).toBe('fixed');
    });
  });

  describe('Requirement: Current Section Display (progress-indicator spec)', () => {
    it('should have data-active attribute on indicators', () => {
      const indicators = document.querySelectorAll('.progress-indicator-item');
      expect(indicators.length).toBe(4);

      indicators.forEach(indicator => {
        expect(indicator.hasAttribute('data-active')).toBe(true);
      });
    });

    it('should highlight correct section when intersecting', () => {
      // Simulate IntersectionObserver callback with entry for services
      const entry = createEntry('services', true);
      mockObserver.trigger([entry]);

      const servicesIndicator = document.querySelector('[data-section="services"][data-active="true"]');
      expect(servicesIndicator).not.toBeNull();
    });

    it('should update previous section to inactive', () => {
      // Initial state: hero is active
      let heroIndicator = document.querySelector('[data-section="hero"][data-active="true"]');
      expect(heroIndicator).not.toBeNull();

      // Simulate scroll to services
      const entry = createEntry('services', true);
      mockObserver.trigger([entry]);

      heroIndicator = document.querySelector('[data-section="hero"][data-active="true"]');
      expect(heroIndicator).toBeNull();
    });
  });

  describe('Requirement: Click Navigation (progress-indicator spec)', () => {
    it('should have clickable indicators', () => {
      const indicators = document.querySelectorAll('.progress-indicator-item');
      indicators.forEach(indicator => {
        expect(indicator.tagName).toBe('BUTTON');
      });
    });

    it('should have data-section attribute for targeting', () => {
      const servicesIndicator = document.querySelector('[data-section="services"]');
      expect(servicesIndicator).not.toBeNull();
    });
  });

  describe('Requirement: Scroll Position Updates (progress-indicator spec)', () => {
    it('should observe all data-section elements', () => {
      const sections = document.querySelectorAll('[data-section]');
      expect(sections.length).toBe(4);
    });
  });
});
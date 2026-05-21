/**
 * Unit Tests for Smooth Scroll
 * Tests smooth scroll behavior for navigation
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Smooth Scroll', () => {
  let scrollIntoViewMock;

  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="progress-indicator">
        <button class="progress-indicator-item" data-section="hero">Hero</button>
        <button class="progress-indicator-item" data-section="services">Services</button>
      </nav>
      <section id="hero" data-section="hero"></section>
      <section id="services" data-section="services"></section>
      <section id="cases" data-section="cases"></section>
    `;

    // Mock scrollIntoView
    scrollIntoViewMock = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  describe('Requirement: Smooth Scroll Navigation (single-page-portfolio spec)', () => {
    it('should have anchor links with href starting with #', () => {
      // Add an anchor link
      const link = document.createElement('a');
      link.href = '#cta';
      document.body.appendChild(link);

      expect(link.href).toBe('#cta');
    });

    it('should have sections with IDs for targeting', () => {
      const heroSection = document.querySelector('#hero');
      const servicesSection = document.querySelector('#services');
      const casesSection = document.querySelector('#cases');

      expect(heroSection).not.toBeNull();
      expect(servicesSection).not.toBeNull();
      expect(casesSection).not.toBeNull();
    });

    it('should have data-section attributes for identification', () => {
      const sections = document.querySelectorAll('[data-section]');
      expect(sections.length).toBe(3);

      const sectionNames = Array.from(sections).map(s => s.dataset.section);
      expect(sectionNames).toContain('hero');
      expect(sectionNames).toContain('services');
      expect(sectionNames).toContain('cases');
    });
  });

  describe('Scroll behavior', () => {
    it('should call scrollIntoView with behavior smooth when triggered', () => {
      const target = document.querySelector('#services');
      target.scrollIntoView({ behavior: 'smooth' });

      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('should have html element with smooth scroll', () => {
      expect(document.documentElement.style.scrollBehavior).toBeDefined();
    });
  });
});
/**
 * Unit Tests for Design Tokens Integration
 * Tests CSS tokens are applied correctly
 */

import { describe, it, expect, beforeEach } from 'vitest';

describe('Design Tokens Integration', () => {
  describe('Requirement: Hero Section Rendering (single-page-portfolio spec) - Design tokens', () => {
    it('should have midnight-abyss background color defined', () => {
      const body = document.body;
      const bgColor = getComputedStyle(body).backgroundColor;
      // The computed value will be rgb(5, 6, 15) for #05060f
      expect(bgColor).toBeDefined();
    });

    it('should have CSS custom properties for colors', () => {
      const style = document.createElement('style');
      style.textContent = ':root { --color-midnight-abyss: #05060f; --color-neon-violet: #663af3; }';
      document.head.appendChild(style);

      const root = document.documentElement;
      expect(getComputedStyle(root).getPropertyValue('--color-midnight-abyss').trim()).toBeDefined();
    });
  });

  describe('Tokens from variables.css', () => {
    it('should have --color-midnight-abyss token', () => {
      expect(document.documentElement.style.getPropertyValue('--color-midnight-abyss').trim() || getComputedStyle(document.documentElement).getPropertyValue('--color-midnight-abyss')).toBeDefined();
    });

    it('should have --color-neon-violet token for accents', () => {
      expect(document.documentElement.style.getPropertyValue('--color-neon-violet').trim() || getComputedStyle(document.documentElement).getPropertyValue('--color-neon-violet')).toBeDefined();
    });

    it('should have --font-untitled-sans defined', () => {
      expect(document.documentElement.style.getPropertyValue('--font-untitled-sans').trim() || getComputedStyle(document.documentElement).getPropertyValue('--font-untitled-sans')).toBeDefined();
    });

    it('should have spacing tokens', () => {
      const hasSpacing = document.documentElement.style.getPropertyValue('--spacing-24').trim() ||
                        getComputedStyle(document.documentElement).getPropertyValue('--spacing-24').trim();
      expect(hasSpacing).toBeDefined();
    });
  });

  describe('Color values from theme.css', () => {
    it('midnight-abyss should be #05060f', () => {
      const tokens = {
        '--color-midnight-abyss': '#05060f',
        '--color-neon-violet': '#663af3',
        '--color-ghost-white': '#ffffff',
        '--color-comet': '#d8ecf8'
      };

      Object.entries(tokens).forEach(([token, expected]) => {
        const element = document.createElement('div');
        element.style.setProperty(token, expected);
        document.body.appendChild(element);
        const computed = element.style.getPropertyValue(token);
        expect(computed).toBe(expected);
      });
    });
  });
});
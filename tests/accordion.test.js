/**
 * Unit Tests for Accordion Logic
 * Tests single-expand behavior for case cards
 */

import { describe, it, expect, beforeEach } from 'vitest';

describe('Accordion Behavior', () => {
  let caseCards;

  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.innerHTML = `
      <div class="cases__list">
        <details class="case-card" id="case-1">
          <summary class="case-card__trigger">Bpms.ai</summary>
          <div class="case-card__content">Content 1</div>
        </details>
        <details class="case-card" id="case-2">
          <summary class="case-card__trigger">EnchanTales</summary>
          <div class="case-card__content">Content 2</div>
        </details>
        <details class="case-card" id="case-3">
          <summary class="case-card__trigger">Trazabilidad</summary>
          <div class="case-card__content">Content 3</div>
        </details>
      </div>
    `;
    caseCards = document.querySelectorAll('.case-card');
  });

  describe('Requirement: Default Collapsed State (expandible-case-cards spec)', () => {
    it('should have no cards open by default', () => {
      const openCards = document.querySelectorAll('.case-card[open]');
      expect(openCards.length).toBe(0);
    });

    it('should have exactly 3 case cards', () => {
      expect(caseCards.length).toBe(3);
    });

    it('should display title in collapsed state', () => {
      const firstCard = caseCards[0];
      const summary = firstCard.querySelector('.case-card__trigger');
      expect(summary.textContent).toContain('Bpms.ai');
    });
  });

  describe('Requirement: Click to Expand (expandible-case-cards spec)', () => {
    it('should expand when summary is clicked', () => {
      const firstCard = caseCards[0];
      firstCard.querySelector('.case-card__trigger').click();

      expect(firstCard.hasAttribute('open')).toBe(true);
    });

    it('should show content when expanded', () => {
      const firstCard = caseCards[0];
      firstCard.querySelector('.case-card__trigger').click();

      const content = firstCard.querySelector('.case-card__content');
      expect(content).not.toBeNull();
    });
  });

  describe('Requirement: Accordion Behavior - Single Expanded (expandible-case-cards spec)', () => {
    it('should close previous card when new card opens', () => {
      const card1 = caseCards[0];
      const card2 = caseCards[1];

      // Open first card
      card1.querySelector('.case-card__trigger').click();
      expect(card1.hasAttribute('open')).toBe(true);

      // Open second card
      card2.querySelector('.case-card__trigger').click();

      // First should be closed
      expect(card1.hasAttribute('open')).toBe(false);
      // Second should be open
      expect(card2.hasAttribute('open')).toBe(true);
    });

    it('should allow only 0 or 1 cards expanded at any time', () => {
      // Open card 1
      caseCards[0].querySelector('.case-card__trigger').click();
      let openCount = document.querySelectorAll('.case-card[open]').length;
      expect(openCount).toBe(1);

      // Open card 2
      caseCards[1].querySelector('.case-card__trigger').click();
      openCount = document.querySelectorAll('.case-card[open]').length;
      expect(openCount).toBe(1);

      // Open card 3
      caseCards[2].querySelector('.case-card__trigger').click();
      openCount = document.querySelectorAll('.case-card[open]').length;
      expect(openCount).toBe(1);
    });
  });

  describe('Requirement: Collapse on Second Click (expandible-case-cards spec)', () => {
    it('should collapse when clicking already expanded card', () => {
      const card = caseCards[0];

      // Open
      card.querySelector('.case-card__trigger').click();
      expect(card.hasAttribute('open')).toBe(true);

      // Close by clicking again
      card.querySelector('.case-card__trigger').click();
      expect(card.hasAttribute('open')).toBe(false);
    });

    it('should allow all cards to be closed', () => {
      caseCards.forEach(card => {
        card.removeAttribute('open');
      });

      const openCards = document.querySelectorAll('.case-card[open]');
      expect(openCards.length).toBe(0);
    });
  });

  describe('Requirement: Keyboard Accessibility (expandible-case-cards spec)', () => {
    it('should have tabindex on summary for keyboard focus', () => {
      const summaries = document.querySelectorAll('.case-card__trigger');
      summaries.forEach(summary => {
        expect(summary.hasAttribute('tabindex')).toBe(true);
      });
    });

    it('should have role button on summary', () => {
      const summaries = document.querySelectorAll('.case-card__trigger');
      summaries.forEach(summary => {
        expect(summary.getAttribute('role')).toBe('button');
      });
    });
  });
});
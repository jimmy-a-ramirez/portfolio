import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '../progress.js';

describe('Theme Toggle (Light/Dark Mode)', () => {
  let originalMatchMedia;

  beforeEach(() => {
    // Limpiar DOM y localStorage
    document.body.innerHTML = '';
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();

    // Crear el botón de tema
    document.body.innerHTML = `
      <button id="theme-toggle" class="theme-toggle-btn" aria-label="Alternar tema claro u oscuro">
        <span class="theme-toggle-btn__icon"></span>
      </button>
    `;

    // Mockear window.matchMedia
    originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('should initialize theme based on localStorage if defined', () => {
    localStorage.setItem('theme', 'light');
    window.Theme.init();
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.getElementById('theme-toggle').getAttribute('aria-label')).toContain('claro');
  });

  it('should fallback to prefers-color-scheme matchMedia if localStorage is empty', () => {
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query.includes('dark'),
      media: query,
    }));

    window.Theme.init();
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.getElementById('theme-toggle').getAttribute('aria-label')).toContain('oscuro');
  });

  it('should toggle theme when button is clicked', () => {
    localStorage.setItem('theme', 'dark');
    window.Theme.init();

    const btn = document.getElementById('theme-toggle');
    btn.click();

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(btn.getAttribute('aria-label')).toContain('claro');

    btn.click();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(btn.getAttribute('aria-label')).toContain('oscuro');
  });

  it('should toggle theme when Enter or Space keys are pressed on toggle button', () => {
    localStorage.setItem('theme', 'dark');
    window.Theme.init();

    const btn = document.getElementById('theme-toggle');
    
    // Press Space
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    btn.dispatchEvent(spaceEvent);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    // Press Enter
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    btn.dispatchEvent(enterEvent);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

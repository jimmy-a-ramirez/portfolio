(function() {
  'use strict';

  const DotNav = {
    dots: null,
    sections: null,
    observer: null,

    init() {
      this.dots = document.querySelectorAll('.dot-nav__dot, .progress-indicator-item');
      this.sections = document.querySelectorAll('[data-section]');

      // In tests, sections with data-section might include both buttons and sections.
      // We only want to observe actual block sections, not the dot indicators themselves.
      this.observedSections = Array.from(this.sections).filter(el => el.tagName !== 'BUTTON');

      if (!this.dots.length || !this.observedSections.length) {
        console.warn('DotNav: missing dots or sections');
        return;
      }

      this.setupObserver();
      this.setupClickNav();
    },

    setupObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.setActive(entry.target.dataset.section);
          }
        });
      }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

      this.observedSections.forEach(s => this.observer.observe(s));
    },

    setActive(id) {
      this.dots.forEach(d => {
        const isActive = d.dataset.section === id;
        d.dataset.active = isActive.toString();
        // Also set explicit attribute for tests checking getAttribute('data-active') or data-active in DOM
        d.setAttribute('data-active', isActive.toString());
        if (isActive) {
          d.setAttribute('aria-current', 'true');
        } else {
          d.removeAttribute('aria-current');
        }
      });
    },

    setupClickNav() {
      const nav = document.querySelector('.dot-nav, .progress-indicator');
      if (nav) {
        nav.addEventListener('click', (e) => {
          const dot = e.target.closest('.dot-nav__dot, .progress-indicator-item');
          if (!dot) return;
          const id = dot.dataset.section;
          const el = document.getElementById(id);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY;
            const isReducedMotion = document.documentElement.classList.contains('a11y-reduced-motion') || 
                                    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top, behavior: isReducedMotion ? 'auto' : 'smooth' });
            this.setActive(id);
          }
        });
      }
    },

    debug() {
      console.log('DotNav sections found:', this.observedSections.length);
      console.log('DotNav dots found:', this.dots.length);
      this.observedSections.forEach(s => console.log('Section:', s.id, s.dataset.section));
    }
  };

  const Accordion = {
    init() {
      const cards = document.querySelectorAll('.case-card');
      cards.forEach(card => {
        const trigger = card.querySelector('.case-card__trigger');
        if (trigger) {
          if (!trigger.hasAttribute('tabindex')) {
            trigger.setAttribute('tabindex', '0');
          }
          if (!trigger.hasAttribute('role')) {
            trigger.setAttribute('role', 'button');
          }

          // Inicializar aria-expanded basado en el atributo open de details
          trigger.setAttribute('aria-expanded', card.hasAttribute('open') ? 'true' : 'false');

          trigger.addEventListener('click', () => {
            // Collapse de otros acordeones
            if (!card.hasAttribute('open')) {
              cards.forEach(c => {
                if (c !== card && c.hasAttribute('open')) {
                  c.removeAttribute('open');
                }
              });
            }

            // Sincronizar aria-expanded con delay síncrono para que se procese tras el toggle nativo
            setTimeout(() => {
              cards.forEach(c => {
                const t = c.querySelector('.case-card__trigger');
                if (t) {
                  t.setAttribute('aria-expanded', c.hasAttribute('open') ? 'true' : 'false');
                }
              });
            }, 0);
          });
        }
      });
    }
  };

  const ScrollAnim = {
    init() {
      const els = document.querySelectorAll('.animate-on-scroll');
      if (!els.length) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animated'); obs.unobserve(e.target); } });
      }, { threshold: 0.15 });
      els.forEach(el => obs.observe(el));
    }
  };

  const Theme = {
    toggleBtn: null,

    init() {
      this.toggleBtn = document.getElementById('theme-toggle');
      if (!this.toggleBtn) return;

      this.setupTheme();
      this.setupEvents();
    },

    setupTheme() {
      let currentTheme = document.documentElement.getAttribute('data-theme');
      if (!currentTheme) {
        currentTheme = localStorage.getItem('theme');
        if (!currentTheme) {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          currentTheme = prefersDark ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', currentTheme);
      }
      this.updateAccessibility(currentTheme);
    },

    setupEvents() {
      this.toggleBtn.addEventListener('click', () => {
        this.toggle();
      });

      this.toggleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle();
        }
      });
    },

    toggle() {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      this.updateAccessibility(next);
    },

    updateAccessibility(theme) {
      this.toggleBtn.setAttribute('aria-label', `Alternar tema, tema actual es ${theme === 'dark' ? 'oscuro' : 'claro'}`);
    }
  };

  const A11y = {
    triggerBtn: null,
    panel: null,
    closeBtn: null,
    switches: {},
    sizeBtns: [],
    
    settings: {
      readable: { key: 'a11y-readable-font', class: 'a11y-readable-font', type: 'toggle' },
      focus: { key: 'a11y-focus-highlights', class: 'a11y-focus-highlights', type: 'toggle' },
      motion: { key: 'a11y-reduced-motion', class: 'a11y-reduced-motion', type: 'toggle' },
      contrast: { key: 'a11y-monochrome', class: 'a11y-monochrome', type: 'toggle' },
      size: { key: 'a11y-font-size', type: 'size' }
    },

    init() {
      this.triggerBtn = document.getElementById('a11y-trigger');
      this.panel = document.getElementById('a11y-panel');
      this.closeBtn = document.getElementById('a11y-close');

      if (!this.triggerBtn || !this.panel || !this.closeBtn) return;

      this.sizeBtns = document.querySelectorAll('[data-a11y-size]');
      this.switches.readable = document.getElementById('a11y-readable-toggle');
      this.switches.focus = document.getElementById('a11y-focus-toggle');
      this.switches.motion = document.getElementById('a11y-motion-toggle');
      this.switches.contrast = document.getElementById('a11y-contrast-toggle');

      this.loadSettings();
      this.setupEvents();
    },

    loadSettings() {
      Object.keys(this.settings).forEach(name => {
        const set = this.settings[name];
        if (set.type === 'toggle') {
          const value = localStorage.getItem(set.key) === 'true';
          this.setToggleState(name, value);
        } else if (set.type === 'size') {
          const value = localStorage.getItem(set.key) || 'normal';
          this.setSizeState(value);
        }
      });
    },

    setupEvents() {
      this.triggerBtn.addEventListener('click', () => this.togglePanel());
      this.closeBtn.addEventListener('click', () => this.closePanel());

      this.panel.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closePanel();
        }
        
        if (e.key === 'Tab') {
          const focusables = this.panel.querySelectorAll('button, [role="switch"]');
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      });

      document.addEventListener('click', (e) => {
        if (this.panel.classList.contains('a11y-panel--open') &&
            !this.panel.contains(e.target) &&
            !this.triggerBtn.contains(e.target)) {
          this.closePanel();
        }
      });

      this.sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const size = btn.dataset.a11ySize;
          this.setSizeState(size);
          localStorage.setItem(this.settings.size.key, size);
        });
      });

      Object.keys(this.switches).forEach(name => {
        const btn = this.switches[name];
        if (btn) {
          btn.addEventListener('click', () => {
            const current = btn.getAttribute('aria-checked') === 'true';
            this.setToggleState(name, !current);
            localStorage.setItem(this.settings[name].key, (!current).toString());
          });
        }
      });
    },

    togglePanel() {
      const isOpen = this.panel.classList.contains('a11y-panel--open');
      if (isOpen) {
        this.closePanel();
      } else {
        this.panel.classList.add('a11y-panel--open');
        this.panel.setAttribute('aria-hidden', 'false');
        this.triggerBtn.setAttribute('aria-expanded', 'true');
        
        const close = this.closeBtn;
        if (close) {
          setTimeout(() => close.focus(), 50);
        }
      }
    },

    closePanel() {
      this.panel.classList.remove('a11y-panel--open');
      this.panel.setAttribute('aria-hidden', 'true');
      this.triggerBtn.setAttribute('aria-expanded', 'false');
      this.triggerBtn.focus();
    },

    setToggleState(name, active) {
      const set = this.settings[name];
      const btn = this.switches[name];

      if (active) {
        document.documentElement.classList.add(set.class);
        if (btn) btn.setAttribute('aria-checked', 'true');
      } else {
        document.documentElement.classList.remove(set.class);
        if (btn) btn.setAttribute('aria-checked', 'false');
      }
    },

    setSizeState(size) {
      document.documentElement.classList.remove('a11y-large-text', 'a11y-huge-text');
      
      this.sizeBtns.forEach(btn => {
        const isActive = btn.dataset.a11ySize === size;
        btn.setAttribute('aria-pressed', isActive.toString());
        if (isActive) {
          btn.classList.add('a11y-btn-group__btn--active');
        } else {
          btn.classList.remove('a11y-btn-group__btn--active');
        }
      });

      if (size === 'large') {
        document.documentElement.classList.add('a11y-large-text');
      } else if (size === 'huge') {
        document.documentElement.classList.add('a11y-huge-text');
      }
    }
  };

  // Expose to window for testing environments
  if (typeof window !== 'undefined') {
    window.DotNav = DotNav;
    window.Accordion = Accordion;
    window.ScrollAnim = ScrollAnim;
    window.Theme = Theme;
    window.A11y = A11y;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { 
      DotNav.init(); 
      Accordion.init(); 
      ScrollAnim.init(); 
      Theme.init(); 
      A11y.init();
    });
  } else {
    DotNav.init(); 
    Accordion.init(); 
    ScrollAnim.init(); 
    Theme.init();
    A11y.init();
  }
})();

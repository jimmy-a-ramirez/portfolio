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
            window.scrollTo({ top, behavior: 'smooth' });
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

  // Expose to window for testing environments
  if (typeof window !== 'undefined') {
    window.DotNav = DotNav;
    window.Accordion = Accordion;
    window.ScrollAnim = ScrollAnim;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { DotNav.init(); Accordion.init(); ScrollAnim.init(); });
  } else {
    DotNav.init(); Accordion.init(); ScrollAnim.init();
  }
})();

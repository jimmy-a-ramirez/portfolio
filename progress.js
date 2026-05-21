(function() {
  'use strict';

  const DotNav = {
    dots: null,
    sections: null,
    observer: null,

    init() {
      this.dots = document.querySelectorAll('.dot-nav__dot');
      this.sections = document.querySelectorAll('[data-section]');

      if (!this.dots.length || !this.sections.length) {
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

      this.sections.forEach(s => this.observer.observe(s));
    },

    setActive(id) {
      this.dots.forEach(d => {
        d.dataset.active = (d.dataset.section === id).toString();
      });
    },

    setupClickNav() {
      document.querySelector('.dot-nav').addEventListener('click', (e) => {
        const dot = e.target.closest('.dot-nav__dot');
        if (!dot) return;
        const id = dot.dataset.section;
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: 'smooth' });
          this.setActive(id);
        }
      });
    },

    debug() {
      console.log('DotNav sections found:', this.sections.length);
      console.log('DotNav dots found:', this.dots.length);
      this.sections.forEach(s => console.log('Section:', s.id, s.dataset.section));
    }
  };

  const Accordion = {
    init() {
      const cards = document.querySelectorAll('.case-card');
      cards.forEach(card => {
        card.addEventListener('toggle', () => {
          if (card.hasAttribute('open')) {
            cards.forEach(c => {
              if (c !== card && c.hasAttribute('open')) c.removeAttribute('open');
            });
          }
        });
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { DotNav.init(); Accordion.init(); ScrollAnim.init(); });
  } else {
    DotNav.init(); Accordion.init(); ScrollAnim.init();
  }
})();

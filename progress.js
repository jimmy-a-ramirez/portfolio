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
      cognitive: { key: 'a11y-cognitive-mode', class: 'a11y-cognitive-mode', type: 'toggle' },
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
      this.switches.cognitive = document.getElementById('a11y-cognitive-toggle');

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

  const Lang = {
    init() {
      const btn = document.querySelector('.lang-toggle-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          if (btn.dataset.langTarget) {
            localStorage.setItem('preferred-lang', btn.dataset.langTarget);
          }
        });
      }
    }
  };

  const Simulator = {
    inputs: {},
    badges: {},
    scoreVal: null,
    scoreStatus: null,
    scoreRing: null,
    recText: null,
    ctaBtn: null,
    lang: 'es',

    init() {
      // Inputs
      this.inputs.dev = document.getElementById('sim-development');
      this.inputs.adopt = document.getElementById('sim-adoption');
      this.inputs.val = document.getElementById('sim-validation');
      this.inputs.handoff = document.getElementById('sim-handoff');

      // Badges
      this.badges.dev = document.getElementById('val-development');
      this.badges.adopt = document.getElementById('val-adoption');
      this.badges.val = document.getElementById('val-validation');
      this.badges.handoff = document.getElementById('val-handoff');

      // Score components
      this.scoreVal = document.getElementById('score-value');
      this.scoreStatus = document.getElementById('score-status');
      this.scoreRing = document.getElementById('score-ring-progress');
      this.recText = document.getElementById('recommendation-text');
      this.ctaBtn = document.getElementById('sim-cta-btn');

      if (!this.inputs.dev || !this.scoreVal) return; // Not on page or elements missing

      // Detect language from HTML
      this.lang = document.documentElement.getAttribute('lang') || 'es';

      this.setupEvents();
      this.calculate();
    },

    setupEvents() {
      Object.keys(this.inputs).forEach(key => {
        const input = this.inputs[key];
        input.addEventListener('input', () => {
          // Update aria attribute for accessibility testing
          input.setAttribute('aria-valuenow', input.value);
          this.calculate();
        });
      });
    },

    calculate() {
      const devVal = parseInt(this.inputs.dev.value);
      const adoptVal = parseInt(this.inputs.adopt.value);
      const valVal = parseInt(this.inputs.val.value);
      const handoffVal = parseInt(this.inputs.handoff.value);

      // Update Slider Label Badges in real-time
      this.updateBadges(devVal, adoptVal, valVal, handoffVal);

      // Score logic: (Sum of 4 values) * 5 (range 20 to 100)
      const score = (devVal + adoptVal + valVal + handoffVal) * 5;
      
      // Update score display
      this.scoreVal.textContent = score;

      // Update radial SVG ring: 440 is the stroke-dasharray (circumference)
      // offset = 440 - (440 * score / 100)
      const offset = 440 - (440 * score / 100);
      if (this.scoreRing) {
        this.scoreRing.style.strokeDashoffset = offset;
      }

      // Update Status, Color State and Recommendation
      this.updateDiagnosis(score);
    },

    updateBadges(dev, adopt, val, handoff) {
      // Badges lookup tables
      const badgesData = {
        es: {
          dev: { 1: 'Lento (Meses)', 2: 'Lento', 3: 'Moderado', 4: 'Rápido', 5: '1 Día (Fricción Cero)' },
          adopt: { 1: 'Crítico (Soporte)', 2: 'Baja Adopción', 3: 'Fricción Media', 4: 'Adopción Alta', 5: 'Fricción Cero' },
          val: { 1: 'Sin Validación', 2: 'Por Intuición', 3: 'Ocasional', 4: 'Frecuente', 5: 'Discovery Semanal' },
          handoff: { 1: 'Reprocesos Lentos', 2: 'Baja Fiel', 3: 'Intermedio', 4: 'Handoff Limpio', 5: 'QA Diseño Automatizado' }
        },
        en: {
          dev: { 1: 'Slow (Months)', 2: 'Slow', 3: 'Moderate', 4: 'Fast', 5: '1 Day (Frictionless)' },
          adopt: { 1: 'Critical (Support)', 2: 'Low Adoption', 3: 'Moderate Friction', 4: 'High Adoption', 5: 'Zero Friction' },
          val: { 1: 'No Validation', 2: 'By Intuition', 3: 'Occasional', 4: 'Frequent', 5: 'Weekly Discovery' },
          handoff: { 1: 'Slow Rework', 2: 'Low Fidelity', 3: 'Intermediate', 4: 'Clean Handoff', 5: 'Automated Design QA' }
        }
      };

      const labels = badgesData[this.lang] || badgesData.es;

      if (this.badges.dev) this.badges.dev.textContent = labels.dev[dev];
      if (this.badges.adopt) this.badges.adopt.textContent = labels.adopt[adopt];
      if (this.badges.val) this.badges.val.textContent = labels.val[val];
      if (this.badges.handoff) this.badges.handoff.textContent = labels.handoff[handoff];
    },

    updateDiagnosis(score) {
      const isEs = this.lang === 'es';
      let statusText = '';
      let recText = '';
      let removeClasses = ['score--critical', 'score--warn', 'score--excellent'];
      let addClass = '';

      if (score < 50) {
        addClass = 'score--critical';
        statusText = isEs ? 'Riesgo Crítico' : 'Critical Risk';
        recText = isEs 
          ? 'Tu producto está quemando recursos. Tienes una brecha grave entre la lógica de negocio y la construcción técnica. Escribir más código no solucionará la baja adopción. <strong>Recomiendo una Auditoría UX & Discovery inmediato</strong>.'
          : 'Your product is burning cash. There is a severe gap between business logic and technical execution. Writing more code won\'t solve low adoption. <strong>I recommend an immediate UX Audit & Product Discovery</strong>.';
      } else if (score >= 50 && score < 80) {
        addClass = 'score--warn';
        statusText = isEs ? 'Oportunidad de Optimización' : 'Opportunity to Optimize';
        recText = isEs
          ? 'Tu producto es funcional, pero pierde tracción en flujos clave. Hay un teléfono roto en el handoff técnico que causa retrasos en frontend y errores evitables. <strong>Recomiendo implementar prototipos de alta precisión y especificaciones lógicas</strong>.'
          : 'Your product is functional, but losing traction in key flows. There\'s a breakdown in technical handoff causing frontend delays and avoidable errors. <strong>I recommend high-precision prototyping and logical specifications</strong>.';
      } else {
        addClass = 'score--excellent';
        statusText = isEs ? 'Salud UX Excelente' : 'Excellent UX Health';
        recText = isEs
          ? '¡Excelente! Tu plataforma opera con buenas prácticas. Tu oportunidad está en automatizar flujos AI-Native y escalar tu sistema de diseño dinámico para acelerar un 10x tus tiempos. <strong>Recomiendo consultoría avanzada de workflows de diseño con IA</strong>.'
          : 'Excellent! Your platform operates with great practices. Your opportunity lies in automating AI-Native workflows and scaling your dynamic design system to accelerate times 10x. <strong>I recommend advanced consulting on AI-Native design workflows</strong>.';
      }

      // Update Status Badge Classes
      if (this.scoreStatus) {
        removeClasses.forEach(cls => this.scoreStatus.classList.remove(cls));
        this.scoreStatus.classList.add(addClass);
        this.scoreStatus.textContent = statusText;
      }

      // Update recommendation text
      if (this.recText) {
        this.recText.innerHTML = recText;
      }

      // Update CTA subject line dynamic handoff
      if (this.ctaBtn) {
        const mailSubject = isEs 
          ? `Diagnóstico de Salud UX [Puntuación: ${score}%]` 
          : `UX & Product Health Diagnostic [Score: ${score}%]`;
        const mailBody = isEs
          ? `Hola Jimmy,\n\nHe completado el autodiagnóstico interactivo de mi producto digital en tu portafolio y he obtenido una puntuación de salud UX del ${score}% (${statusText}).\n\nMe gustaría programar una llamada de diagnóstico gratuita para hablar sobre mi producto y ver opciones de optimización.\n\nSaludos.`
          : `Hi Jimmy,\n\nI've completed the interactive self-diagnostic tool on your portfolio and obtained a UX health score of ${score}% (${statusText}).\n\nI would love to schedule a free diagnostic call to discuss my product and see opportunities to optimize it.\n\nBest regards.`;
        
        this.ctaBtn.setAttribute('href', `mailto:jialexisrojas@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`);
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
    window.Lang = Lang;
    window.Simulator = Simulator;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { 
      DotNav.init(); 
      Accordion.init(); 
      ScrollAnim.init(); 
      Theme.init(); 
      A11y.init();
      Lang.init();
      Simulator.init();
    });
  } else {
    DotNav.init(); 
    Accordion.init(); 
    ScrollAnim.init(); 
    Theme.init();
    A11y.init();
    Lang.init();
    Simulator.init();
  }
})();

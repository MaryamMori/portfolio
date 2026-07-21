// animations.js — GSAP animation helpers for Maryam Moradian Portfolio
// Loaded after gsap + ScrollTrigger CDN scripts, before React/Babel components.
// All functions are exposed on window so useEffect hooks in JSX components can call them.
// Uses gsap.context() internally so cleanup (ctx.revert()) handles all kills automatically.

(function () {
  if (typeof gsap === 'undefined') {
    console.warn('[animations] GSAP not found — animations skipped');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Default ScrollTrigger config
  const ST_START = 'top 80%';
  const EASE     = 'power2.out';

  // ── 1. Hero entrance — page load sequence ─────────────────────────
  // Staggered fade-up: label → underline draw → h1 → bio → CTAs
  window.animHero = function (container) {
    if (!container) return;

    const label = container.querySelector('[data-anim="hero-label"]');
    const line  = container.querySelector('[data-anim="hero-line"]');
    const h1    = container.querySelector('[data-anim="hero-h1"]');
    const bio   = container.querySelector('[data-anim="hero-bio"]');
    const cta   = container.querySelector('[data-anim="hero-cta"]');

    if (!label || !h1 || !bio || !cta) return;

    const tl = gsap.timeline({ defaults: { ease: EASE } });

    tl.from(label, { y: 30, opacity: 0, duration: 0.6 })
      .from(line,  { scaleX: 0, duration: 0.4, ease: 'power1.inOut' }, '-=0.15')
      .from(h1,    { y: 30, opacity: 0, duration: 0.8 }, '-=0.1')
      .from(bio,   { y: 30, opacity: 0, duration: 0.7 }, '-=0.35')
      .from(cta,   { y: 30, opacity: 0, duration: 0.6 }, '-=0.3');
  };

  // ── 2. Work section heading — scroll reveal + underline draw ───────
  window.animWorkHeading = function (container) {
    if (!container) return;

    const label = container.querySelector('[data-anim="work-label"]');
    const line  = container.querySelector('[data-anim="work-line"]');
    const sub   = container.querySelector('[data-anim="work-sub"]');

    if (!label) return;

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: { trigger: container, start: 'top 85%', once: true },
    });

    tl.from(label, { y: 20, opacity: 0, duration: 0.5 });
    if (line) tl.from(line, { scaleX: 0, duration: 0.4, ease: 'power1.inOut' }, '-=0.1');
    if (sub)  tl.from(sub,  { y: 15, opacity: 0, duration: 0.5 }, '-=0.1');
  };

  // ── 3. Project cards — scroll reveal (called per card) ────────────
  // y:50→0, opacity:0→1. Cards animate independently so stagger is
  // natural — each card fires its own trigger as it enters the viewport.
  window.animProjectCard = function (el) {
    if (!el) return;

    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 0.85,
      ease: EASE,
      scrollTrigger: { trigger: el, start: ST_START, once: true },
    });
  };

  // ── 4. Approach blocks — scroll reveal, slide in from left ─────────
  window.animApproach = function (container) {
    if (!container) return;

    const label  = container.querySelector('[data-anim="approach-label"]');
    const line   = container.querySelector('[data-anim="approach-line"]');
    const blocks = container.querySelectorAll('[data-anim="approach-block"]');

    if (!blocks.length) return;

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: { trigger: container, start: ST_START, once: true },
    });

    if (label) tl.from(label,  { y: 20, opacity: 0, duration: 0.5 });
    if (line)  tl.from(line,   { scaleX: 0, duration: 0.4, ease: 'power1.inOut' }, '-=0.1');
    tl.from(blocks, { x: -30, opacity: 0, duration: 0.7, stagger: 0.2 }, '-=0.05');
  };

  // ── 5. About snippet — simple fade up ─────────────────────────────
  window.animAbout = function (container) {
    if (!container) return;

    gsap.from(container, {
      y: 30,
      opacity: 0,
      duration: 0.85,
      ease: EASE,
      scrollTrigger: { trigger: container, start: ST_START, once: true },
    });
  };

  // ── 6. CTA / footer block — simple fade up ────────────────────────
  window.animCTA = function (container) {
    if (!container) return;

    gsap.from(container, {
      y: 30,
      opacity: 0,
      duration: 0.85,
      ease: EASE,
      scrollTrigger: { trigger: container, start: ST_START, once: true },
    });
  };

  // ── 7. Pinned panels — "Selected Work" cards stack via CSS sticky ──
  // Desktop only (>768px). Cards are wrapped in a bounding div whose
  // height equals the natural stack of all three sections; CSS sticky
  // therefore ends exactly when the last card reaches the top, handing
  // scroll back to normal flow with no jump or overlap.
  // Returns a custom revert object (not a raw ctx) so DOM cleanup is
  // included alongside GSAP cleanup.
  window.animPinnedPanels = function (panelData) {
    if (!panelData || panelData.length < 2) return null;
    if (window.matchMedia('(max-width: 768px)').matches) return null;

    // ── DOM: wrap sections in a bounding container ──────────────────
    var firstSection = panelData[0].section;
    var parent = firstSection.parentNode;

    var wrapper = document.createElement('div');
    wrapper.className = 'pin-panels-wrapper';
    parent.insertBefore(wrapper, firstSection);
    panelData.forEach(function (p) { wrapper.appendChild(p.section); });

    // Wrapper height = natural stack so sticky ends the moment the last
    // card stacks; continuing to scroll resumes normal document flow.
    var naturalHeight = panelData.reduce(function (sum, p) {
      return sum + p.section.offsetHeight;
    }, 0);
    wrapper.style.height = naturalHeight + 'px';

    // ── GSAP: sticky stacking + scrubbed scale/shadow ────────────────
    var ctx = gsap.context(function () {
      panelData.forEach(function (panel, i) {
        panel.section.classList.add('panel-pinned');
        gsap.set(panel.section, { zIndex: i + 1, transformOrigin: 'center top' });
      });

      panelData.slice(0, -1).forEach(function (panel, i) {
        var nextSection = panelData[i + 1].section;
        gsap.fromTo(
          panel.section,
          { scale: 1, boxShadow: '0 0px 0px rgba(0,0,0,0)' },
          {
            scale: 0.95,
            boxShadow: '0 8px 48px rgba(0,0,0,0.18)',
            ease: 'none',
            scrollTrigger: {
              trigger: nextSection,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    // Return custom revert: undo GSAP then restore DOM
    return {
      revert: function () {
        ctx.revert();
        panelData.forEach(function (p) {
          p.section.classList.remove('panel-pinned');
          parent.insertBefore(p.section, wrapper);
        });
        wrapper.remove();
        ScrollTrigger.refresh();
      },
    };
  };

})();

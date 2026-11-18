// HomePage.jsx — Portfolio home: hero + project tiles + approach + about snippet

const HomePage = ({ goTo }) => {
  const { useState, useEffect, useRef } = React;

  // ── Spline state ──
  const [splineMounted, setSplineMounted] = useState(false);
  const splineRef    = useRef(null);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Lazy-mount: defer Spline renders until after first paint
  useEffect(() => {
    setSplineMounted(true);
  }, []);

  // Set URL attribute after the element is in the DOM, then hide the Spline badge
  const mountSplineEl = (el) => {
    if (!el) return;
    el.setAttribute('url', 'https://prod.spline.design/0PAb1yBrcfuOXDLM/scene.splinecode');
    const tryHide = (root) => {
      const logo = root.querySelector('#logo');
      if (logo) { logo.style.setProperty('display', 'none', 'important'); return true; }
      return false;
    };
    const waitForShadow = setInterval(() => {
      const root = el.shadowRoot;
      if (!root) return;
      clearInterval(waitForShadow);
      if (!tryHide(root)) {
        const obs = new MutationObserver(() => { if (tryHide(root)) obs.disconnect(); });
        obs.observe(root, { childList: true, subtree: true });
      }
    }, 50);
    return () => clearInterval(waitForShadow);
  };

  useEffect(() => {
    if (!splineMounted || !splineRef.current || prefersReducedMotion) return;
    return mountSplineEl(splineRef.current);
  }, [splineMounted]);

  // Hero illustration is only rendered from 769 px up (two-column hero)
  const heroMq = '(min-width: 769px)';
  const [isDesktopHero, setIsDesktopHero] = useState(() => window.matchMedia(heroMq).matches);
  useEffect(() => {
    const mq = window.matchMedia(heroMq);
    const onChange = () => setIsDesktopHero(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // ── Animation refs ──
  const heroRef        = useRef(null);
  const workHeadRef    = useRef(null);
  const pinnedCtxRef   = useRef(null);
  const splitCharRef   = useRef(null);

  // Position the spanning character so its waist lands at the About/CTA border
  useEffect(() => {
    const WAIST = 0.45; // fraction from top of image to waist
    const pos = () => {
      if (!splitCharRef.current) return;
      const H = splitCharRef.current.offsetHeight;
      splitCharRef.current.style.bottom = -(H * (1 - WAIST)) + 'px';
    };
    pos();
    window.addEventListener('resize', pos);
    return () => window.removeEventListener('resize', pos);
  }, [isDesktopHero]);

  // Hero: fires immediately on mount (no scroll trigger)
  useEffect(() => {
    if (!heroRef.current || typeof gsap === 'undefined') return;
    const ctx = gsap.context(() => { window.animHero(heroRef.current); });
    return () => ctx.revert();
  }, []);

  // Work section heading: scroll-triggered
  useEffect(() => {
    if (!workHeadRef.current || typeof gsap === 'undefined') return;
    const ctx = gsap.context(() => { window.animWorkHeading(workHeadRef.current); });
    return () => ctx.revert();
  }, []);

  // Other heading+subtitle blocks: same scroll-reveal as the Selected Work heading
  useEffect(() => {
    if (typeof gsap === 'undefined') return;
    const ids = ['about-snippet', 'get-in-touch'];
    const ctx = gsap.context(() => {
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) window.animWorkHeading(el);
      });
    });
    return () => ctx.revert();
  }, []);


  // Pinned panels: project cards stack via CSS sticky + GSAP scrub (desktop only)
  useEffect(() => {
    if (typeof gsap === 'undefined' || typeof window.animPinnedPanels !== 'function') return;
    const sectionEls = projects.map((_, i) =>
      document.querySelector(`[data-project-section="${i}"]`)
    ).filter(Boolean);
    if (sectionEls.length !== projects.length) return;
    const ctx = window.animPinnedPanels(sectionEls.map(s => ({ section: s })));
    pinnedCtxRef.current = ctx;
    return () => {
      if (pinnedCtxRef.current) { pinnedCtxRef.current.revert(); pinnedCtxRef.current = null; }
    };
  }, []);

  const projects = [
    {
      id: 'fizik',
      label: 'B2B Retail Tech · Hardware + Software · 0→1',
      title: 'Fizik 121 Platform',
      tagline: 'A guided point-of-sale tool that makes a custom 3D-printed saddle fitting service work reliably in retail stores, for staff at any level of expertise.',
      outcomes: [
        { lead: 'Shipped & Scaled',         text: 'Live on iOS and Android (Flutter) across 60+ screens and 6 languages, with ongoing post-launch updates.' },
        { lead: 'Simplified 121 Options',   text: 'Translated complex pressure and rider geometry inputs into 2 to 3 explainable recommendations store staff can stand behind.' },
        { lead: 'System Reuse',             text: 'Established a retail-ready design system and workflow architecture that directly informed a second product: an e-bike saddle pressure app (v2, 2026).' },
      ],
      decisionSignal: 'The core decision: A locked linear flow over open navigation, trading expert shortcut flexibility for consistent, error-free consultations across every store.',
      dark: false,
      customBg: '#f9f9f7',
    },
    {
      id: 'fleetwatch',
      label: 'B2B Fleet Tech · Decision Support · Design Case Study',
      title: 'Fleetwatch Cockpit',
      tagline: 'A low-noise weekly decision tool for a fleet manager overseeing 140 vehicles, built to surface what needs attention, how sure the system is, and what happens next.',
      outcomesLabel: 'Design decisions',
      outcomes: [
        { lead: 'Triage Over Alert Overload', text: 'Ranked 51 open findings down to three weekly decisions in order of consequence, tailored to two 15-minute review sessions.' },
        { lead: 'Calibrated Trust',           text: 'Separated Confidence from Status and required evidence before action, accounting for roughly one in five inferred findings being wrong.' },
        { lead: 'Offline Hand-Offs',          text: 'Designed structured email, printout, and phone-note briefs for workshop leads and dispatchers who never log into the software.' },
      ],
      decisionSignal: 'The core decision: Evidence before action with no one-click confirm on the cockpit, keeping trust honest when underlying data is incomplete.',
      dark: false,
    },
    {
      id: 'footcare',
      label: "HCI Master's Thesis · Healthtech · Biomechanics · Research-to-Product",
      title: 'Preventive Foot Care Platform',
      tagline: 'A dual-user monitoring system that makes longitudinal biomechanical data interpretable for both individuals managing foot health risks and the clinicians supporting them.',
      outcomes: [
        { lead: 'Two Literacy Levels, One Event', text: 'Designed a single layered architecture where individuals see plain-language directional signals and clinicians access pressure maps on demand.' },
        { lead: 'Safe Clinical Boundaries',       text: 'Structured every insight around personal baseline comparison and early awareness rather than diagnostic verdicts.' },
        { lead: 'Expert-Validated Architecture',  text: 'Usability testing with specialists across clinical foot care, orthopedic shoe technology, and biomechanics confirmed the workflow and hierarchy held up.' },
      ],
      decisionSignal: 'The core decision: One shared layered system over separate patient and clinician apps, giving both users a common visual reference during consultations.',
      dark: true,
    },
  ];

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-section" style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: '#fdefea',
        isolation: 'isolate',
      }}>

        {/* Illustration: fills the hero from the start of the right column to the right edge.
            object-position left keeps the character next to the text column and crops the
            right side (cards, plant) on narrower screens. Not rendered on phone, so it is never downloaded there. */}
        {isDesktopHero && (
          <div className="hero-art" aria-hidden="true">
            <img
              src="hero-illustration.webp"
              alt=""
              width="1467" height="1440"
              fetchpriority="high"
              decoding="async"
            />
          </div>
        )}

        {/* ── Two-column hero content ── */}
        <div ref={heroRef} style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          padding: 'clamp(100px, 13vh, 150px) var(--page-padding) var(--section-spacing-sm)',
          display: 'grid',
          gridTemplateColumns: '1.25fr 1fr',
          alignItems: 'center',
          minHeight: '100vh',
        }} className="hero-grid">

          {/* ── Left column: text content ── */}
          <div>

            {/* Label */}
            <div
              data-anim="hero-label"
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#6B3030',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '8px',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              Product Designer · Düsseldorf, Germany
            </div>
            <span data-anim="hero-line" className="heading-underline" style={{ marginBottom: '24px' }} />

            <h1
              data-anim="hero-h1"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(2.4rem, 3.8vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.5px',
                color: '#1C0A0A',
                marginBottom: '32px',
                textWrap: 'pretty',
              }}
            >
              I'm Maryam. I shape complex products into clear, usable systems.
            </h1>

            {/* CTAs */}
            <div data-anim="hero-cta" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <button
                onClick={() => document.getElementById('selected-work')?.scrollIntoView({ block: 'start' }) || window.scrollBy(0, 200)}
                style={{
                  background: '#a63636',
                  color: '#fff',
                  fontSize: '17px',
                  fontWeight: 500,
                  letterSpacing: '-0.374px',
                  padding: '11px 22px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  lineHeight: 1,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  transition: 'transform 120ms',
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                View Work
              </button>
              <a
                href={mailtoHref(DEFAULT_SUBJECT)}
                style={{
                  display: 'inline-block',
                  textDecoration: 'none',
                  background: 'transparent',
                  color: '#3D1A1A',
                  fontSize: '17px',
                  fontWeight: 500,
                  letterSpacing: '-0.374px',
                  padding: '11px 22px',
                  borderRadius: '9999px',
                  border: '1.5px solid #3D1A1A',
                  lineHeight: 1,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  cursor: 'pointer',
                  transition: 'transform 120ms',
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Get in Touch
              </a>
            </div>

            {/* Supporting line */}
            <p
              data-anim="hero-bio"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(14px, 1.5vw, 16px)',
                fontWeight: 400,
                lineHeight: 1.6,
                letterSpacing: '-0.2px',
                color: '#3D1A1A',
                marginBottom: '36px',
                textWrap: 'pretty',
              }}
            >
              I work end-to-end, from early discovery and workflow mapping through to implementation-ready handoff, specializing in B2B, hardware-connected tools, and data-heavy workflows.
            </p>

            {/* ── Frosted glass credential cards — single horizontal row ── */}
            <div className="cred-cards" style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              gap: '10px',
            }}>
              {[
                { label: 'Domain',         value: 'B2B, MedTech & Hardware-Software',  delay: '0.6s' },
                { label: 'Design Systems', value: '9 Projects · 5 Brands',             delay: '0.8s' },
                { label: 'Ownership',      value: 'End-to-end (Discovery → Handoff)',  delay: '1.0s' },
                { label: 'Handoff',        value: 'Implementation-ready specs',        delay: '1.2s' },
                { label: 'Platforms',      value: 'Web, iOS & Android',                delay: '1.4s' },
              ].map(({ label, value, delay }) => (
                <div key={label} style={{
                  flex: '1 1 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: '#fffaf8',
                  border: '1px solid rgba(61,26,14,0.10)',
                  boxShadow: '0 2px 12px rgba(61,26,14,0.07)',
                  animation: `heroCardUp 0.5s ease-out ${delay} both`,
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#8C5A5A',
                    lineHeight: 1,
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2D1010',
                    lineHeight: 1.25,
                    letterSpacing: '-0.1px',
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right column: kept empty, the illustration (.hero-art) sits behind it ── */}
          <div />

        </div>

      </section>

      {/* ── Selected Work heading ── */}
      <div id="selected-work" style={{
        background: '#f9f9f7',
        padding: 'var(--section-spacing-md) var(--page-padding) 0',
      }}>
        <div ref={workHeadRef} style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            data-anim="work-label"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(28px, 3vw, 36px)',
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: '-0.374px',
              color: '#1d1d1f',
              marginBottom: '8px',
            }}
          >
            Selected Work
          </h2>
          <span data-anim="work-line" className="heading-underline" style={{ margin: '0 auto 16px' }} />
          <p
            data-anim="work-sub"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'var(--body-font-size)',
              fontWeight: 400,
              lineHeight: 'var(--body-line-height)',
              color: '#666666',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            Selected projects showing how I frame messy problems, make deliberate trade-offs, and deliver clear systems.
          </p>
        </div>
      </div>

      {/* ── Project tiles ── */}
      {projects.map((proj, idx) => (
        <ProjectCard
          key={proj.id}
          proj={proj}
          idx={idx}
          goTo={goTo}
        />
      ))}

      {/* ── About snippet ── */}
      <section id="about-snippet" style={{
        background: '#f5f5f7',
        padding: 'var(--section-spacing-sm) var(--page-padding)',
        position: 'relative',
        overflow: 'visible',
      }}>
        {/* Spanning character: positioned absolutely, waist at section bottom (JS sets bottom).
            Hidden on phone, so it is only rendered (and downloaded) from 769 px up. */}
        {isDesktopHero && <img
          ref={splitCharRef}
          src="character_Contact.webp"
          alt=""
          width="1126" height="1720"
          loading="lazy" decoding="async"
          className="about-split-char"
          style={{
            position: 'absolute',
            left: 'var(--page-padding)',
            bottom: 0,
            height: 'clamp(600px, 68vw, 860px)',
            width: 'auto',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 5,
          }}
        />}
        {/* Flex row: spacer (width = character width) + text */}
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
          {/* Spacer — same width as the character so text clears it */}
          <div className="about-char-spacer" style={{
            flex: '0 0 calc(clamp(600px, 68vw, 860px) * 0.655)',
          }} />
          {/* Text column */}
          <div style={{ flex: '1 1 0', minWidth: 0, maxWidth: '620px', position: 'relative', zIndex: 6 }}>
            <div data-anim="work-label" style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(24px, 3vw, 34px)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.374px',
              color: '#1d1d1f',
              marginBottom: '20px',
            }}>
              About
            </div>
            <p data-anim="work-sub" style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'var(--body-font-size)',
              fontWeight: 400,
              lineHeight: 'var(--body-line-height)',
              letterSpacing: '-0.374px',
              color: '#1d1d1f',
              opacity: 0.8,
              marginBottom: 'var(--paragraph-spacing)',
              textWrap: 'pretty',
            }}>
              I'm a Product Designer with a background in Industrial Design and Human-Computer Interaction. I focus on products where complexity is real: multi-step workflows, uncertain or technical data, and stakeholders with different mental models.
            </p>
            <p style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'var(--body-font-size)',
              fontWeight: 400,
              lineHeight: 'var(--body-line-height)',
              letterSpacing: '-0.374px',
              color: '#1d1d1f',
              opacity: 0.8,
              marginBottom: 'var(--paragraph-spacing)',
              textWrap: 'pretty',
            }}>
              Biomechanical data, clinical workflows, and digital tools for preventive foot care brought me to GEBIOM Group, where I was promoted to Product Designer in October 2023.
            </p>
            <p style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'var(--body-font-size)',
              fontWeight: 400,
              lineHeight: 'var(--body-line-height)',
              letterSpacing: '-0.374px',
              color: '#1d1d1f',
              opacity: 0.8,
              marginBottom: 'var(--paragraph-spacing)',
              textWrap: 'pretty',
            }}>
              Currently looking for my next Product Designer role in Germany (remote or hybrid).
            </p>
            <button
              onClick={() => goTo('about')}
              className="tap-target"
              style={{
                background: 'transparent',
                color: '#a63636',
                fontSize: '17px',
                fontWeight: 400,
                letterSpacing: '-0.374px',
                padding: '11px 22px',
                borderRadius: '9999px',
                border: '1px solid #a63636',
                cursor: 'pointer',
                lineHeight: 1,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                transition: 'transform 120ms',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              More about me
            </button>
          </div>
        </div>
      </section>

      {/* ── Get in Touch CTA ── */}
      <section id="get-in-touch" style={{
        background: '#0e0606',
        position: 'relative',
        overflow: 'hidden',
        padding: 'var(--section-spacing-md) var(--page-padding)',
      }}>
        {/* Content — centered; character bleeds in from About section above */}
        <div style={{
          position: 'relative',
          zIndex: 6,
          textAlign: 'center',
          maxWidth: '640px',
          margin: '0 auto',
        }}>
          <div style={{
            fontSize: '12px',
            fontWeight: 400,
            color: '#A8A8A8',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '20px',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}>
            Get in Touch
          </div>
          <h2 data-anim="work-label" style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(26px, 3.2vw, 38px)',
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: '-0.2px',
            color: '#ffffff',
            marginBottom: '14px',
            textWrap: 'pretty',
          }}>
            If you're hiring for a Product Designer role covering complex workflows, technical domains, or B2B products, I'd be glad to talk.
          </h2>
          <p data-anim="work-sub" style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 'var(--body-font-size)',
            fontWeight: 400,
            lineHeight: 'var(--body-line-height)',
            letterSpacing: '-0.374px',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 'var(--paragraph-spacing)',
            textWrap: 'pretty',
          }}>
            Open to Product Designer roles in Germany · Remote or Hybrid
          </p>
          <a
            href={mailtoHref(DEFAULT_SUBJECT)}
            className="tap-target"
            style={{
              background: '#a63636',
              color: '#fff',
              fontSize: '17px',
              fontWeight: 400,
              letterSpacing: '-0.374px',
              padding: '13px 28px',
              borderRadius: '9999px',
              border: 'none',
              lineHeight: 1,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Get in touch
          </a>
        </div>
      </section>
    </div>
  );
};

// ── Project Card (used inside HomePage) ──
const ProjectCard = ({ proj, idx, goTo }) => {
  const { useState, useRef, useEffect } = React;
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  // Scroll-reveal: inner content slides up, outer section bg stays in place
  useEffect(() => {
    if (!cardRef.current || typeof gsap === 'undefined') return;
    const ctx = gsap.context(() => { window.animProjectCard(cardRef.current); });
    return () => ctx.revert();
  }, []);

  const bg = proj.customBg || (proj.dark ? '#272729' : proj.parchment ? '#f5f5f7' : '#ffffff');
  const headColor = proj.dark ? '#ffffff' : '#1d1d1f';
  const bodyColor = proj.dark ? 'rgba(255,255,255,0.62)' : 'rgba(29,29,31,0.68)';
  const metaColor = proj.dark ? '#A8A8A8' : '#666666';
  const accentColor = proj.dark ? '#B83030' : '#a63636';
  const bulletColor = proj.dark ? 'rgba(197,98,98,0.7)' : '#a63636';
  const borderColor = proj.dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)';

  return (
    <section
      data-project-section={idx}
      style={{
        background: bg,
        width: '100%',
        padding: 'var(--section-spacing-sm) var(--page-padding)',
      }}
    >
      {/* cardRef on inner content — so the section's bg fills its space while content slides up */}
      <div
        ref={cardRef}
        style={{
          maxWidth: 'var(--content-width)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,0.85fr) minmax(0,1.15fr)',
          gap: '60px',
          alignItems: 'start',
        }}
        className="project-grid"
      >
        {/* Left: info */}
        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: 400,
            color: metaColor,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}>
            {proj.label}
          </div>
          <h2 style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: 600,
            lineHeight: 1.10,
            letterSpacing: '0',
            color: headColor,
            marginBottom: '16px',
          }}>
            {proj.title}
          </h2>
          <p style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 'var(--body-font-size)',
            fontWeight: 400,
            lineHeight: 'var(--body-line-height)',
            letterSpacing: '-0.374px',
            color: bodyColor,
            marginBottom: 'var(--paragraph-spacing)',
            textWrap: 'pretty',
          }}>
            {proj.tagline}
          </p>

          {/* Outcomes — hidden for coming-soon panels */}
          {!proj.comingSoon && (
          <div style={{
            paddingTop: '24px',
            borderTop: `1px solid ${borderColor}`,
            marginBottom: '32px',
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 600,
              color: metaColor,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '14px',
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}>
              {proj.outcomesLabel || 'Outcomes'}
            </div>
            {proj.outcomes.map((o, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                marginBottom: '10px',
              }}>
                <span style={{
                  color: bulletColor,
                  fontSize: '14px',
                  marginTop: '1px',
                  flexShrink: 0,
                  fontFamily: 'monospace',
                }}>→</span>
                <span style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  letterSpacing: '-0.2px',
                  color: bodyColor,
                }}>
                  <strong style={{ fontWeight: 600, color: headColor }}>{o.lead}:</strong> {o.text}
                </span>
              </div>
            ))}
          </div>
          )}

          {/* Coming-soon badge — shown instead of outcomes */}
          {proj.comingSoon && (
            <div style={{
              paddingTop: '24px',
              borderTop: `1px solid ${borderColor}`,
              marginBottom: '32px',
            }}>
              <span style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#8a6a3a',
                background: 'rgba(138,106,58,0.12)',
                border: '1px solid rgba(138,106,58,0.25)',
                padding: '5px 12px',
                borderRadius: '9999px',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}>
                Case study in progress. Available soon.
              </span>
            </div>
          )}

          {/* Decision-signal rationale note */}
          {proj.decisionSignal && !proj.comingSoon && (
            <p style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'var(--caption-font-size)',
              fontStyle: 'italic',
              fontWeight: 400,
              lineHeight: 'var(--caption-line-height)',
              letterSpacing: '-0.1px',
              color: proj.dark ? '#A8A8A8' : '#666666',
              marginBottom: '24px',
              textWrap: 'pretty',
            }}>
              {proj.decisionSignal}
            </p>
          )}

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            {!proj.noStudy && (
              <button
                onClick={() => goTo(proj.id)}
                className="tap-target"
                style={{
                  background: accentColor,
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 400,
                  letterSpacing: '-0.2px',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  lineHeight: 1,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  transition: 'transform 120ms',
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Read case study
              </button>
            )}
          </div>
        </div>

        {/* Right: visual placeholder */}
        <div style={{
          background: proj.dark ? 'rgba(255,255,255,0.05)' : proj.parchment ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.04)',
          borderRadius: '12px',
          aspectRatio: '4/3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'rgba(0,0,0,0.22) 3px 5px 30px 0px',
          flexDirection: 'column',
          gap: '10px',
          border: `1px solid ${borderColor}`,
        }}>
          {proj.id === 'fizik' && (
            <img
              src="Fizik-cover-1.webp"
              alt="Fizik 121 Platform"
              width="1060" height="794" loading="lazy" decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', display: 'block' }}
            />
          )}
          {proj.id === 'fleetwatch' && (
            <img
              src="assets/fleetwatch/fleetwatch-card.webp"
              alt="Fleetwatch Cockpit"
              width="1060" height="795" loading="lazy" decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', display: 'block' }}
            />
          )}
          {proj.id === 'footcare' && (
            <img
              src="footcare-cover-2.webp"
              alt="Preventive Foot Care Platform"
              width="1054" height="790" loading="lazy" decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', display: 'block' }}
            />
          )}
          {proj.comingSoon && (
            /* CSS laptop mockup — coming soon visual */
            <div style={{ width: '100%', padding: '28px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '88%', maxWidth: '320px' }}>
                {/* Lid / screen bezel */}
                <div style={{
                  background: '#221616',
                  borderRadius: '8px 8px 0 0',
                  border: '7px solid #2e1c1c',
                  borderBottom: 'none',
                  paddingBottom: '62%',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
                }}>
                  {/* Screen: dark warm gradient */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, #180e0e 0%, #2a1414 40%, #1c0f16 70%, #220d10 100%)',
                  }}>
                    {/* Subtle grid */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: 'linear-gradient(rgba(166,54,54,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(166,54,54,0.07) 1px, transparent 1px)',
                      backgroundSize: '18% 22%',
                    }} />
                    {/* Nav bar hint */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '14%', background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', padding: '0 6%', gap: '3%' }}>
                      {[1,2,3].map(d => <div key={d} style={{ width: '5%', aspectRatio: '1', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />)}
                      <div style={{ flex: 1, height: '35%', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', margin: '0 6%' }} />
                    </div>
                    {/* Content area */}
                    <div style={{ position: 'absolute', top: '20%', left: '6%', right: '6%', bottom: '6%', display: 'flex', gap: '5%' }}>
                      {/* Sidebar */}
                      <div style={{ width: '22%', display: 'flex', flexDirection: 'column', gap: '8%' }}>
                        {[60,45,55,40,50].map((w,i) => <div key={i} style={{ height: '8%', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', width: w+'%' }} />)}
                      </div>
                      {/* Main */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5%' }}>
                        <div style={{ height: '10%', background: 'rgba(197,98,98,0.22)', borderRadius: '3px', width: '55%' }} />
                        <div style={{ height: '6%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }} />
                        <div style={{ height: '6%', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', width: '80%' }} />
                        <div style={{ flex: 1, display: 'flex', gap: '6%', marginTop: '4%' }}>
                          {[1,2].map(d => <div key={d} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '4px', border: '1px solid rgba(166,54,54,0.12)' }} />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Hinge strip */}
                <div style={{ background: 'linear-gradient(to bottom, #2a1a1a, #1e1212)', height: '5px', borderRadius: '0 0 1px 1px' }} />
                {/* Keyboard deck */}
                <div style={{
                  background: 'linear-gradient(to bottom, #221414, #181010)',
                  height: '16px',
                  borderRadius: '0 0 6px 6px',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
                  position: 'relative',
                }}>
                  <div style={{ width: '28%', height: '7px', background: 'rgba(255,255,255,0.035)', borderRadius: '2px', margin: '4px auto 0', border: '1px solid rgba(255,255,255,0.04)' }} />
                </div>
              </div>
              {/* Ground shadow */}
              <div style={{ width: '65%', height: '6px', background: 'radial-gradient(ellipse, rgba(0,0,0,0.28) 0%, transparent 70%)', marginTop: '2px' }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Responsive styles
const homeStyle = document.createElement('style');
homeStyle.textContent = `
  @keyframes heroCardUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @media (max-width: 700px) {
    .project-grid {
      grid-template-columns: 1fr !important;
      gap: 32px !important;
    }
  }
  /* Hero: two-column → single column on mobile */
  .hero-grid {
    grid-template-columns: 1.25fr 1fr;
  }
  @media (max-width: 768px) {
    .hero-grid {
      grid-template-columns: 1fr !important;
    }
    .cred-cards {
      flex-wrap: wrap !important;
    }
    .cred-cards > div {
      flex: 1 1 calc(50% - 5px) !important;
    }
    /* Phone: the hero is as tall as its content, so the facts cards start on the first screen */
    .hero-section, .hero-grid {
      min-height: 0 !important;
    }
  }
  /* Hero illustration: starts a little before the right grid column (same maths as the
     1.25fr / 1fr grid inside the page padding) and runs to the right edge. The left edge
     fades out so the loose lines never sit hard against the text column. */
  .hero-art {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: calc(var(--page-padding) + (100% - 2 * var(--page-padding)) * 0.5556 - 24px);
    z-index: 0;
    pointer-events: none;
    -webkit-mask-image: linear-gradient(to right, transparent 0, #000 18%);
    mask-image: linear-gradient(to right, transparent 0, #000 18%);
  }
  .hero-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left bottom;
    display: block;
  }
  @media (max-width: 768px) {
    .hero-art { display: none; }
  }
  /* Pinned panels: sticky stacking applied by animPinnedPanels on desktop */
  .panel-pinned {
    position: sticky;
    top: 0;
  }
  /* Bounding wrapper — sticky ends when wrapper bottom is reached */
  .pin-panels-wrapper {
    position: relative;
    overflow: visible;
  }
  /* Spline viewer fills its container */
  spline-viewer {
    width: 100%;
    height: 100%;
    display: block;
  }
  /* Hide Spline watermark (::part selector + shadow-DOM JS fallback in mountSplineEl) */
  spline-viewer::part(logo) { display: none !important; }

  /* Static credential strip */
  .cred-strip {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: 10px;
  }
  @media (max-width: 640px) {
    .cred-strip {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 0;
    }
    .cred-divider { display: none !important; }
  }
  @media (max-width: 768px) {
    .about-split-char { display: none !important; }
    .about-char-spacer { display: none !important; }
  }
`;
document.head.appendChild(homeStyle);

Object.assign(window, { HomePage });

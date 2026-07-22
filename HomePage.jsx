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
  }, []);

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
      tagline: 'A guided tool that makes a personalized saddle fitting service work reliably at the point of sale, for staff at any level of expertise.',
      outcomes: [
        'Translated a 121-option catalog into a clear, explainable staff-facing recommendation flow',
        'Enabled consistent delivery of the service across dealers without specialist knowledge',
        'Delivered implementation-ready Flutter specs; product now supports six languages',
        'Design decisions from this project directly informed a second product — a gebioMized saddle pressure app now in its second version as of 2026',
      ],
      decisionSignal: 'The core decision: a locked linear flow over a flexible navigation model, so any staff member could run the full service regardless of prior fitting experience.',
      dark: false,
      customBg: '#f9f9f7',
    },
    {
      id: 'footcare',
      label: "HCI Master's Thesis · Healthtech · Biomechanics · Research-to-Product",
      title: 'Preventive Foot Care Platform',
      tagline: 'A dual-user monitoring system that makes biomechanical data interpretable: for individuals managing foot health risk, and the professionals supporting them.',
      outcomes: [
        'Designed for two user types with different data literacy within a single coherent system',
        'Expert evaluation confirmed workflow structure and information hierarchy held up for professional users',
        'Established a product architecture for AI-assisted preventive monitoring',
      ],
      decisionSignal: 'The core decision: a single layered system over separate interfaces, so an individual and their clinician could look at the same data and have a meaningful conversation.',
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
        background: '#f5ede8',
        backgroundImage: "url('landing_illustration_2560x1440.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        isolation: 'isolate',
      }}>

        {/* ── Two-column hero content — no overlay ── */}
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
              Senior Product Designer, Düsseldorf, Germany
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
              I'm Maryam. I shape complex products into clear, useable systems.
            </h1>

            {/* CTAs */}
            <div data-anim="hero-cta" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <ScrambleButton
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
              </ScrambleButton>
              <ScrambleButton
                onClick={() => goTo('about')}
                style={{
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
                Contact
              </ScrambleButton>
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
              I work end-to-end, from early discovery and workflow mapping through to implementation-ready handoff.
            </p>

            {/* ── Frosted glass credential cards — single horizontal row ── */}
            <div className="cred-cards" style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              gap: '10px',
            }}>
              {[
                { label: 'Domain',        value: 'B2B & Medtech',         delay: '0.6s' },
                { label: 'Design System', value: '9 Projects · 5 Brands', delay: '0.8s' },
                { label: 'Ownership',     value: 'End-to-end',             delay: '1.0s' },
                { label: 'Handoff',       value: 'Dev-ready specs',        delay: '1.2s' },
                { label: 'Funding',       value: '3 Products approved',    delay: '1.4s' },
              ].map(({ label, value, delay }) => (
                <div key={label} style={{
                  flex: '1 1 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.45)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 2px 12px rgba(61,26,14,0.07)',
                  animation: `heroCardUp 0.5s ease-out ${delay} both`,
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#9B6B6B',
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

          {/* ── Right column: illustration fills via background-image ── */}
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
              color: 'rgba(29,29,31,0.55)',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            Selected projects that show how I think, decide, and deliver.
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
        {/* Spanning character: positioned absolutely, waist at section bottom (JS sets bottom) */}
        <img
          ref={splitCharRef}
          src="portfolio/character_Contact.png"
          alt=""
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
        />
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
              I'm a Product Designer with a background in Industrial Design and Human-Computer Interaction. I focus on products where the complexity is real: multi-step workflows, technical data, stakeholders with different mental models, and where structure and clarity in the design process make the difference.
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
              Biomechanical data, clinical workflows, and digital tools for preventive foot care: that's the domain that brought me to GEBIOM Group, where I was promoted to Product Designer in September 2024.
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
              Currently looking for my next Senior Product Designer role in Germany or remote Europe.
            </p>
            <ScrambleButton
              onClick={() => goTo('about')}
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
              Read more
            </ScrambleButton>
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
            fontSize: '11px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '20px',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}>
            Get in touch
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
            If you're hiring for a Senior Product Designer role covering complex workflows, technical domains, or B2B products, I'd be glad to talk.
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
            Open to Senior Product Designer roles in Germany or remote Europe.
          </p>
          <a
            href="mailto:maryam.moradian38@gmail.com"
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
  const metaColor = proj.dark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)';
  const accentColor = proj.dark ? '#c56262' : '#a63636';
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
            fontSize: '11px',
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
              fontSize: '11px',
              fontWeight: 600,
              color: metaColor,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '14px',
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}>
              Outcomes
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
                  {o}
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
                fontSize: '11px',
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
              color: bodyColor,
              opacity: 0.62,
              marginBottom: '24px',
              textWrap: 'pretty',
            }}>
              {proj.decisionSignal}
            </p>
          )}

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            {!proj.noStudy && (
              <ScrambleButton
                onClick={() => goTo(proj.id)}
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
              </ScrambleButton>
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
          {idx === 0 && (
            <img
              src="portfolio/Fizik-cover-1.png"
              alt="Fizik 121 Platform"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', display: 'block' }}
            />
          )}
          {idx === 1 && (
            <img
              src="portfolio/footcare-cover-2.png"
              alt="Preventive Foot Care Platform"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', display: 'block' }}
            />
          )}
          {idx === 2 && (
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
    /* Illustration overlaps hero text once columns stack — hide it below the two-column breakpoint */
    .hero-section {
      background-image: none !important;
    }
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

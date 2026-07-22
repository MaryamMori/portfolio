// AboutPage.jsx — About Maryam

const AboutPage = ({ goTo, goToWork }) => {
  const { useState, useEffect } = React;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Section heading+subtitle blocks: same scroll-reveal as the Selected Work heading
  useEffect(() => {
    if (typeof gsap === 'undefined') return;
    const ids = [
      'about-origin', 'about-domain', 'about-approach', 'about-next-role',
      'about-experience', 'about-education', 'about-skills', 'about-closing',
    ];
    const ctx = gsap.context(() => {
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) window.animWorkHeading(el);
      });
    });
    return () => ctx.revert();
  }, []);

  const contactLinks = [
    { label: 'Email', text: 'maryam.moradian38@gmail.com', href: 'mailto:maryam.moradian38@gmail.com', external: false, suffix: '' },
    { label: 'LinkedIn', text: 'linkedin.com/in/maryam-moradian', href: 'https://linkedin.com/in/maryam-moradian', external: true, suffix: '' },
    { label: 'CV', text: 'Download PDF', href: '#', external: false, suffix: ' ↓' },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#ffffff', minHeight: '100vh' }}>
      <style>{`
        @keyframes mmPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>

      {/* ── Section 1 — Header ── */}
      <section style={{
        background: '#f5f5f7',
        padding: '120px var(--page-padding) 60px',
      }}>
        <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>

          {/* Two-column row */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'flex-start',
            gap: isMobile ? '40px' : '80px',
          }}>

            {/* Left column — text */}
            <div style={{ flex: 1 }}>

              {/* 1. Eyebrow */}
              <div style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                color: '#a63636',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                About
              </div>

              {/* 2. Name heading */}
              <h1 style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: 'clamp(34px, 4.5vw, 48px)',
                fontWeight: 600,
                lineHeight: 1.07,
                letterSpacing: '-0.28px',
                color: '#1d1d1f',
                marginBottom: '16px',
              }}>
                Maryam Moradian
              </h1>

              {/* 3. Title + location */}
              <div style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '17px',
                fontWeight: 400,
                color: 'rgba(29,29,31,0.65)',
                letterSpacing: '-0.374px',
                marginBottom: '32px',
              }}>
                Senior Product Designer · Düsseldorf, Germany
              </div>

              {/* 4. Positioning statement */}
              <p style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(20px, 2.5vw, 24px)',
                fontWeight: 300,
                lineHeight: 1.5,
                color: '#1d1d1f',
                marginBottom: '40px',
                maxWidth: '520px',
              }}>
                I turn complex systems into products people can actually use.
              </p>

              {/* 5. Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <ScrambleButton
                  onClick={() => window.open('01_CV_Maryam_Product_Designer.pdf', '_blank')}
                  style={{
                    background: 'transparent',
                    color: '#1d1d1f',
                    padding: '14px 28px',
                    borderRadius: '980px',
                    border: '1px solid rgba(29,29,31,0.35)',
                    cursor: 'pointer',
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '15px',
                    fontWeight: 500,
                    lineHeight: 1,
                  }}
                >
                  Download CV
                </ScrambleButton>
              </div>
            </div>

            {/* Right column — photo */}
            <div style={{
              width: isMobile ? '100%' : '280px',
              flexShrink: 0,
            }}>
              <img
                src="profile.png"
                alt="Maryam Moradian, Senior Product Designer"
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                  borderRadius: '16px',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Credibility strip */}
          <div style={{
            marginTop: '60px',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            paddingTop: '24px',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '13px',
            fontWeight: 400,
            color: 'rgba(29,29,31,0.45)',
            letterSpacing: '-0.12px',
          }}>
            7+ years experience · 9 projects across 5 brands · B2B medtech &amp; biomechanics · Promoted to Product Designer 2024 · End-to-end from discovery to handoff
          </div>

        </div>
      </section>

      {/* ── Section 2 — Beat 1: Origin ── */}
      <section id="about-origin" style={{
        background: '#ffffff',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        padding: 'var(--section-spacing-sm) var(--page-padding)',
      }}>
        <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '48px' : '80px',
            alignItems: 'flex-start',
          }}>

            {/* Left column */}
            <div style={{ flex: isMobile ? undefined : '0 0 300px', width: isMobile ? '100%' : undefined }}>
              <div style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                color: '#a63636',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Background
              </div>
              <h2 data-anim="work-label" style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: '-0.28px',
                color: '#1d1d1f',
                marginBottom: 0,
              }}>
                Industrial design taught me to think about the system before the object.
              </h2>
            </div>

            {/* Right column */}
            <div style={{ flex: 1 }}>
              <p data-anim="work-sub" style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'var(--body-font-size)',
                fontWeight: 400,
                lineHeight: 'var(--body-line-height)',
                letterSpacing: '-0.374px',
                color: 'rgba(29,29,31,0.82)',
                marginBottom: 'var(--paragraph-spacing)',
              }}>
                That's still how I approach every digital product. Before I design a screen, I want to understand the workflow around it: the people using it, the physical environment it sits in, the constraints no one put in the brief.
              </p>
              <p style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'var(--body-font-size)',
                fontWeight: 400,
                lineHeight: 'var(--body-line-height)',
                letterSpacing: '-0.374px',
                color: 'rgba(29,29,31,0.82)',
                marginBottom: 'var(--paragraph-spacing)',
              }}>
                A Master's in Human-Computer Interaction added research methods and interaction theory to that foundation. Together, they shaped a perspective I haven't been able to unlearn: the interface is only one part of a much larger system.
              </p>
              <p style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'var(--secondary-font-size)',
                fontWeight: 400,
                lineHeight: 'var(--secondary-line-height)',
                letterSpacing: '-0.374px',
                color: 'rgba(29,29,31,0.75)',
                marginBottom: 0,
                marginTop: '28px',
                background: 'rgba(166,54,54,0.06)',
                borderLeft: '3px solid #a63636',
                padding: '14px 18px',
                borderRadius: '0 8px 8px 0',
              }}>
                My path: Industrial Design → Human-Computer Interaction → Product Design.
              </p>

              <div style={{ marginTop: '40px' }}>

                {/* Three nodes in a flex row with arrows between */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0px',
                  flexWrap: 'wrap',
                  rowGap: '16px',
                }}>

                  {/* Node 1 */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '12px',
                      background: 'rgba(166,54,54,0.08)',
                      border: '1px solid rgba(166,54,54,0.20)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                    }}>
                      <span style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '16px', fontWeight: 600, color: '#a63636',
                        letterSpacing: '-0.2px'
                      }}>ID</span>
                    </div>
                    <span style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#1d1d1f',
                      letterSpacing: '-0.1px',
                      textAlign: 'center',
                      maxWidth: '80px',
                      lineHeight: 1.3,
                    }}>
                      Industrial Design
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '11px',
                      fontWeight: 400,
                      color: 'rgba(29,29,31,0.40)',
                      textAlign: 'center',
                    }}>
                      2011–2019
                    </span>
                  </div>

                  {/* Arrow 1 */}
                  <div style={{
                    flex: 1,
                    minWidth: '32px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      height: '1px',
                      flex: 1,
                      background: 'rgba(29,29,31,0.12)',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        right: '-1px',
                        top: '-3px',
                        width: '0',
                        height: '0',
                        borderTop: '4px solid transparent',
                        borderBottom: '4px solid transparent',
                        borderLeft: '6px solid rgba(29,29,31,0.20)',
                      }} />
                    </div>
                  </div>

                  {/* Node 2 */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '12px',
                      background: 'rgba(166,54,54,0.08)',
                      border: '1px solid rgba(166,54,54,0.20)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                    }}>
                      <span style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '13px', fontWeight: 600, color: '#a63636',
                        letterSpacing: '-0.2px'
                      }}>HCI</span>
                    </div>
                    <span style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#1d1d1f',
                      letterSpacing: '-0.1px',
                      textAlign: 'center',
                      maxWidth: '110px',
                      lineHeight: 1.3,
                    }}>
                      <span style={{ whiteSpace: 'nowrap' }}>Human-Computer</span> Interaction
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '11px',
                      fontWeight: 400,
                      color: 'rgba(29,29,31,0.40)',
                      textAlign: 'center',
                    }}>
                      University of Siegen
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '11px',
                      fontWeight: 400,
                      color: 'rgba(29,29,31,0.40)',
                      textAlign: 'center',
                    }}>
                      M.Sc. · 2020–2024
                    </span>
                  </div>

                  {/* Arrow 2 */}
                  <div style={{
                    flex: 1,
                    minWidth: '32px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      height: '1px',
                      flex: 1,
                      background: 'rgba(29,29,31,0.12)',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        right: '-1px',
                        top: '-3px',
                        width: '0',
                        height: '0',
                        borderTop: '4px solid transparent',
                        borderBottom: '4px solid transparent',
                        borderLeft: '6px solid rgba(29,29,31,0.20)',
                      }} />
                    </div>
                  </div>

                  {/* Node 3 — highlighted as current */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '12px',
                      background: '#a63636',
                      border: '1px solid #a63636',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                    }}>
                      <span style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '16px', fontWeight: 600, color: '#ffffff',
                        letterSpacing: '-0.2px'
                      }}>PD</span>
                    </div>
                    <span style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#a63636',
                      letterSpacing: '-0.1px',
                      textAlign: 'center',
                      maxWidth: '80px',
                      lineHeight: 1.3,
                    }}>
                      Product Design
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '11px',
                      fontWeight: 400,
                      color: 'rgba(29,29,31,0.40)',
                      textAlign: 'center',
                    }}>
                      2022–present
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 3 — Beat 2: Domain (Dark) ── */}
      <section id="about-domain" style={{
        background: '#272729',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'var(--section-spacing-md) var(--page-padding)',
      }}>
        <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>

          {/* Two-column row */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '48px' : '80px',
            alignItems: 'flex-start',
          }}>

            {/* Left column */}
            <div style={{ flex: isMobile ? undefined : '0 0 300px', width: isMobile ? '100%' : undefined }}>
              <div style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                color: '#a63636',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Domain
              </div>
              <h2 data-anim="work-label" style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: '-0.28px',
                color: '#ffffff',
                marginBottom: 0,
              }}>
                The problems I find most interesting are the ones most designers find hardest to frame.
              </h2>
            </div>

            {/* Right column */}
            <div style={{ flex: 1 }}>
              <p data-anim="work-sub" style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'var(--body-font-size)',
                fontWeight: 400,
                lineHeight: 'var(--body-line-height)',
                letterSpacing: '-0.374px',
                color: 'rgba(255,255,255,0.70)',
                marginBottom: 'var(--paragraph-spacing)',
              }}>
                For the past few years at GEBIOM Group in Düsseldorf, I've been designing products where the complexity is real: biomechanical measurement data that needs to be interpretable by non-specialists, orthopedic service workflows that exist partly in physical space and partly in software, and B2B retail tools that have to work reliably for staff at every level of expertise.
              </p>
              <p style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'var(--body-font-size)',
                fontWeight: 400,
                lineHeight: 'var(--body-line-height)',
                letterSpacing: '-0.374px',
                color: 'rgba(255,255,255,0.70)',
                marginBottom: 'var(--paragraph-spacing)',
              }}>
                I was promoted to Product Designer in September 2024 after demonstrating end-to-end ownership across several of these products. That kind of domain (messy, technical, multi-user) is where I do my best work.
              </p>
              <p style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(18px, 2vw, 22px)',
                fontWeight: 300,
                lineHeight: 1.5,
                letterSpacing: '-0.374px',
                color: 'rgba(255,255,255,0.55)',
                marginBottom: 0,
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '24px',
                marginTop: '8px',
                fontStyle: 'italic',
              }}>
                I find a clean brief with a defined scope less interesting than a problem no one has fully structured yet.
              </p>
            </div>
          </div>

          {/* Stat cards */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            marginTop: '64px',
          }}>
            {[
              { stat: '7+', label: 'years experience' },
              { stat: '9',   label: 'projects delivered' },
              { stat: '5',   label: 'brands & products' },
              { stat: '3',   label: 'products funded' },
            ].map(({ stat, label }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: '16px',
                padding: '32px 28px',
                flex: '1',
                minWidth: '140px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}>
                <div style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 'clamp(32px, 3.5vw, 44px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '8px',
                  letterSpacing: '-0.5px',
                  lineHeight: 1,
                }}>
                  {stat}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.40)',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Section 4 — Beat 3: How I Work ── */}
      <section id="about-approach" style={{
        background: '#f5f5f7',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        padding: 'var(--section-spacing-md) var(--page-padding)',
      }}>
        <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '48px' : '80px',
            alignItems: 'flex-start',
          }}>

            {/* Left column */}
            <div style={{ flex: isMobile ? undefined : '0 0 300px', width: isMobile ? '100%' : undefined }}>
              <div style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                color: '#a63636',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Approach
              </div>
              <h2 data-anim="work-label" style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: '-0.28px',
                color: '#1d1d1f',
                marginBottom: 0,
              }}>
                End-to-end means I'm involved before the first screen and after the last handoff.
              </h2>
            </div>

            {/* Right column */}
            <div style={{ flex: 1 }}>
              {[
                {
                  n: '1',
                  heading: 'I map the workflow before I design the interface.',
                  body: 'On the Fizik project, I spent the early phase understanding the full in-store service (the staff behavior, the measurement inputs, the catalog logic) before defining a single screen. Without that foundation, the UI would have solved the wrong problem.',
                },
                {
                  n: '2',
                  heading: 'I treat constraints as design inputs, not blockers.',
                  body: 'On the Foot Care platform, working without real patient data and designing for two very different user types forced explicit trade-offs. Making those decisions visible, rather than hiding them, is part of how I build trust with engineering and stakeholders.',
                },
                {
                  n: '3',
                  heading: 'I stay involved through implementation.',
                  body: 'Handoff is not the end of the design process. I work with developers at component level during build, maintain design system documentation, and support clarification to reduce back-and-forth. In environments where I\'m the only designer, that\'s not unusual. It\'s the job.',
                },
              ].map(({ n, heading, body }, i, arr) => (
                <div key={n} style={{
                  paddingTop: '28px',
                  paddingBottom: '28px',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(166,54,54,0.10)',
                      color: '#a63636',
                      fontSize: '12px',
                      fontWeight: 600,
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {n}
                    </div>
                    <div style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#1d1d1f',
                      letterSpacing: '-0.2px',
                    }}>
                      {heading}
                    </div>
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 'var(--secondary-font-size)',
                    fontWeight: 400,
                    lineHeight: 'var(--secondary-line-height)',
                    color: 'rgba(29,29,31,0.75)',
                    letterSpacing: '-0.2px',
                    margin: 0,
                  }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 5 — Beat 4: What I'm Looking For ── */}
      <section id="about-next-role" style={{
        background: '#ffffff',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        padding: 'var(--section-spacing-md) var(--page-padding)',
      }}>
        <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '48px' : '80px',
            alignItems: 'flex-start',
          }}>

            {/* Left column */}
            <div style={{ flex: isMobile ? undefined : '0 0 300px', width: isMobile ? '100%' : undefined }}>
              <div style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                color: '#a63636',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Next Role
              </div>
              <h2 data-anim="work-label" style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: '-0.28px',
                color: '#1d1d1f',
                marginBottom: 0,
              }}>
                I'm looking for a team that takes product complexity seriously.
              </h2>
            </div>

            {/* Right column */}
            <div style={{ flex: 1 }}>
              <p data-anim="work-sub" style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'var(--body-font-size)',
                fontWeight: 400,
                lineHeight: 'var(--body-line-height)',
                letterSpacing: '-0.374px',
                color: 'rgba(29,29,31,0.82)',
                marginBottom: 'var(--paragraph-spacing)',
              }}>
                B2B platforms, healthtech, medtech, data-heavy workflow products: these are the contexts where my background is strongest and where I can contribute from day one. I work best alongside PMs, developers, and domain experts who want a designer involved in the thinking, not just the delivery.
              </p>
              <p style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'var(--body-font-size)',
                fontWeight: 400,
                lineHeight: 'var(--body-line-height)',
                letterSpacing: '-0.374px',
                color: 'rgba(29,29,31,0.82)',
                marginBottom: 0,
              }}>
                Remote or hybrid in Germany or Europe works well for me.
              </p>

              {/* Tag chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '40px' }}>
                {[
                  'B2B SaaS', 'Healthtech', 'Medtech', 'Workflow products',
                  'Germany', 'Remote Europe', 'Senior Product Designer', 'End-to-end ownership',
                ].map(chip => (
                  <span key={chip} style={{
                    background: '#f5f5f7',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '980px',
                    padding: '8px 16px',
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'rgba(29,29,31,0.75)',
                    letterSpacing: '-0.2px',
                  }}>
                    {chip}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Section 6 — Experience ── */}
      <section id="about-experience" style={{
        background: '#f5f5f7',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        padding: 'var(--section-spacing-md) var(--page-padding)',
      }}>
        <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ marginBottom: '64px' }}>
            <div style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 400,
              color: '#a63636',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Experience
            </div>
            <h2 data-anim="work-label" style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: 'clamp(24px, 3vw, 34px)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.374px',
              color: '#1d1d1f',
              margin: 0,
            }}>
              Work history
            </h2>
          </div>

          {/* Experience items */}
          {[
            {
              role: 'Senior Product Designer',
              company: 'GEBIOM Group',
              dates: 'Feb 2022 – Present',
              promotion: 'Promoted from UX/UI Designer · Sep 2024',
              bullets: [
                'Own product design end-to-end across web and mobile (from problem definition and early discovery through to implementation-ready specs) for B2B medtech tools and B2C retail experiences.',
                'Led user research and usability testing across the full product lifecycle; findings directly shaped workflow redesigns and informed go/no-go decisions on key feature directions.',
                'Built and evolved scalable design system foundations across 9 projects spanning 5 brands, improving cross-team consistency and reducing design-to-development friction.',
                'Created product pitches and presentation materials for three products, contributing directly to funding approval for all three.',
                'Partnered with the University of Siegen research group to integrate academic findings into product decisions.',
              ],
            },
            {
              role: 'Web Content Manager',
              company: 'University of Siegen',
              dates: 'Sep 2021 – May 2023',
              promotion: null,
              bullets: [
                'Managed and updated university website content, improving usability and navigation for student-facing information.',
                'Implemented HTML and responsive layout updates to improve content presentation and accessibility.',
              ],
            },
            {
              role: 'Lead Industrial Designer',
              company: 'Mesina Group',
              dates: 'Feb 2018 – May 2019',
              promotion: null,
              bullets: [
                'Led an industrial design team developing ergonomic, user-centred hardware products from concept through production refinement.',
                'Ran user research and market analysis to shape product strategy and prioritise design directions.',
                'Built and tested prototypes to validate concepts early, reducing iteration cycles before manufacturing.',
                'Collaborated closely with engineering and manufacturing to balance form, function, and delivery constraints.',
              ],
            },
            {
              role: 'Industrial Designer',
              company: 'NTP Design',
              dates: 'Sep 2017 – Mar 2018',
              promotion: null,
              bullets: [
                'Developed 3D models and supported design validation to translate concepts into production-ready directions.',
                'Researched and proposed new product concepts aligned with user needs and business opportunities.',
              ],
            },
          ].map((job, i) => (
            <div key={job.company} style={{
              borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
              paddingTop: '40px',
              paddingBottom: '40px',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '16px' : '48px',
                alignItems: 'flex-start',
              }}>

                {/* Left */}
                <div style={{ flex: isMobile ? undefined : '0 0 200px', width: isMobile ? '100%' : undefined }}>
                  <div style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1d1d1f',
                    letterSpacing: '-0.2px',
                    marginBottom: '6px',
                  }}>
                    {job.role}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '15px',
                    fontWeight: 400,
                    color: '#a63636',
                    letterSpacing: '-0.2px',
                    marginBottom: '4px',
                  }}>
                    {job.company}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '13px',
                    fontWeight: 400,
                    color: 'rgba(29,29,31,0.45)',
                    letterSpacing: '-0.12px',
                    marginBottom: job.promotion ? '4px' : 0,
                  }}>
                    {job.dates}
                  </div>
                  {job.promotion && (
                    <div style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '12px',
                      fontWeight: 400,
                      color: 'rgba(29,29,31,0.45)',
                      letterSpacing: '-0.12px',
                      fontStyle: 'italic',
                    }}>
                      {job.promotion}
                    </div>
                  )}
                </div>

                {/* Right — bullets */}
                <div style={{ flex: 1 }}>
                  {job.bullets.map((b, bi) => (
                    <div key={bi} style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      marginBottom: bi < job.bullets.length - 1 ? '10px' : 0,
                    }}>
                      <div style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#a63636',
                        marginTop: '8px',
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: '15px',
                        fontWeight: 400,
                        lineHeight: 1.55,
                        color: 'rgba(29,29,31,0.75)',
                        letterSpacing: '-0.2px',
                      }}>
                        {b}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ── Section 7 — Education ── */}
      <section id="about-education" style={{
        background: '#ffffff',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        padding: 'var(--section-spacing-md) var(--page-padding)',
      }}>
        <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>

          <div style={{ marginBottom: '64px' }}>
            <div style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 400,
              color: '#a63636',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Education
            </div>
            <h2 data-anim="work-label" style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: 'clamp(24px, 3vw, 34px)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.374px',
              color: '#1d1d1f',
              margin: 0,
            }}>
              Academic background
            </h2>
          </div>

          {[
            {
              degree: 'M.Sc. Human-Computer Interaction',
              institution: 'University of Siegen, Germany',
              dates: 'Oct 2020 – 2024',
              description: 'Thesis: Promoting regular care for preventing diabetic foot diseases using foot mapping technologies and artificial intelligence',
            },
            {
              degree: 'M.Sc. Industrial Design',
              institution: 'Alzahra Art University, Tehran',
              dates: 'Jan 2016 – Jul 2017',
              description: '',
            },
            {
              degree: 'B.Sc. Industrial Design',
              institution: 'Tabriz Art University, Tabriz',
              dates: 'Jan 2011 – Sep 2015',
              description: '',
            },
          ].map((ed, i) => (
            <div key={ed.degree} style={{
              borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
              paddingTop: '32px',
              paddingBottom: '32px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '12px' : '48px',
              alignItems: 'flex-start',
            }}>
              <div style={{ flex: isMobile ? undefined : '0 0 200px', width: isMobile ? '100%' : undefined }}>
                <div style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1d1d1f',
                  letterSpacing: '-0.2px',
                  marginBottom: '4px',
                }}>
                  {ed.degree}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#a63636',
                  letterSpacing: '-0.2px',
                  marginBottom: '4px',
                }}>
                  {ed.institution}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(29,29,31,0.45)',
                  letterSpacing: '-0.12px',
                }}>
                  {ed.dates}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                {ed.description && (
                  <p style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 'var(--secondary-font-size)',
                    fontWeight: 400,
                    lineHeight: 'var(--secondary-line-height)',
                    color: 'rgba(29,29,31,0.65)',
                    letterSpacing: '-0.2px',
                    margin: 0,
                  }}>
                    {ed.description}
                  </p>
                )}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ── Section 8 — Skills / Tools / Languages ── */}
      <section id="about-skills" style={{
        background: '#f5f5f7',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        padding: 'var(--section-spacing-md) var(--page-padding)',
      }}>
        <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>

          <div style={{ marginBottom: '64px' }}>
            <div style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 400,
              color: '#a63636',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Capabilities
            </div>
            <h2 data-anim="work-label" style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: 'clamp(24px, 3vw, 34px)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.374px',
              color: '#1d1d1f',
              margin: 0,
            }}>
              Skills, tools &amp; languages
            </h2>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '40px' : '48px',
            alignItems: 'flex-start',
          }}>

            {/* Skills */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#1d1d1f',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Skills
              </div>
              {[
                'Complex workflow design',
                'UX research & usability testing',
                'Design systems',
                'Information architecture',
                'Interaction design',
                'Stakeholder alignment',
                'B2B & B2C product design',
                'Prototyping & wireframing',
                'Cross-functional collaboration',
                'Developer handoff',
                'Accessibility (WCAG)',
                'Discovery & definition',
              ].map(s => (
                <div key={s} style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: 1.8,
                  color: 'rgba(29,29,31,0.75)',
                  letterSpacing: '-0.2px',
                }}>
                  {s}
                </div>
              ))}
            </div>

            {/* Tools */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#1d1d1f',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Tools
              </div>
              {['Figma', 'FigJam', 'Miro', 'Jira', 'Azure DevOps', 'Confluence', 'HTML / CSS'].map(t => (
                <div key={t} style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: 1.8,
                  color: 'rgba(29,29,31,0.75)',
                  letterSpacing: '-0.2px',
                }}>
                  {t}
                </div>
              ))}
            </div>

            {/* Languages */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#1d1d1f',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Languages
              </div>
              {[
                { lang: 'Persian', level: 'Native' },
                { lang: 'English', level: 'Professional' },
                { lang: 'German', level: 'B1, actively progressing' },
              ].map(({ lang, level }) => (
                <div key={lang} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  lineHeight: 1.8,
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'rgba(29,29,31,0.75)',
                    letterSpacing: '-0.2px',
                  }}>
                    {lang}
                  </span>
                  <span style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '13px',
                    fontWeight: 400,
                    color: 'rgba(29,29,31,0.40)',
                    letterSpacing: '-0.12px',
                  }}>
                    {level}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 10 — CTA Closing (Dark) ── */}
      <section id="about-closing" style={{
        background: '#272729',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'var(--section-spacing-md) var(--page-padding)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>

          {/* Eyebrow */}
          <div style={{
            fontSize: '11px', fontWeight: 400,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            marginBottom: '24px',
          }}>GET IN TOUCH</div>

          {/* Heading */}
          <h2 data-anim="work-label" style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: 600, lineHeight: 1.15,
            letterSpacing: '-0.28px', color: '#ffffff',
            marginBottom: '16px',
          }}>
            If you're working on something complex,
            I'd be glad to connect.
          </h2>

          {/* Subtext */}
          <p data-anim="work-sub" style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 'var(--body-font-size)', fontWeight: 300,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 'var(--body-line-height)', letterSpacing: '-0.374px',
            marginBottom: '48px',
          }}>
            Open to Senior Product Designer roles
            in Germany and remote Europe.
          </p>

          {/* Contact details — one line */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}>
            <a href="mailto:maryam.moradian38@gmail.com"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '14px',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                letterSpacing: '-0.2px',
              }}>
              maryam.moradian38@gmail.com
            </a>
            <span style={{ color: 'rgba(255,255,255,0.20)' }}>·</span>
            <a href="https://linkedin.com/in/maryam-moradian"
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '14px',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                letterSpacing: '-0.2px',
              }}>
              LinkedIn
            </a>
            <span style={{ color: 'rgba(255,255,255,0.20)' }}>·</span>
            <a href="01_CV_Maryam_Product_Designer.pdf"
              download
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '14px',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                letterSpacing: '-0.2px',
              }}>
              Download CV ↓
            </a>
          </div>

          {/* Status + buttons row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}>

            {/* Open to work dot */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginRight: '8px',
            }}>
              <div style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: '#2d9e5f',
                flexShrink: 0,
                animation: 'mmPulse 2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '13px',
                color: 'rgba(255,255,255,0.40)',
                letterSpacing: '-0.12px',
              }}>Open to work</span>
            </div>

            {/* Get in touch button */}
            <ScrambleButton
              onClick={() => window.location.href =
                'mailto:maryam.moradian38@gmail.com?subject=Senior Product Designer: Let\'s connect'}
              style={{
                background: '#a63636', color: 'white',
                padding: '14px 32px', borderRadius: '980px',
                border: 'none', cursor: 'pointer',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '15px', fontWeight: 500,
              }}>
              Get in touch
            </ScrambleButton>

            {/* Download CV button */}
            <ScrambleButton
              onClick={() => window.open(
                '01_CV_Maryam_Product_Designer.pdf', '_blank')}
              style={{
                background: 'transparent',
                color: 'rgba(255,255,255,0.70)',
                padding: '14px 32px', borderRadius: '980px',
                border: '1px solid rgba(255,255,255,0.20)',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '15px', fontWeight: 500,
              }}>
              Download CV
            </ScrambleButton>

          </div>
        </div>
      </section>

    </div>
  );
};

Object.assign(window, { AboutPage });

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
                fontSize: '12px',
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
                Product Designer · Düsseldorf, Germany
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
                <button
                  onClick={() => window.open('Maryam_Moradian_CV.pdf', '_blank')}
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
                </button>
                <button
                  onClick={() => window.location.href =
                    'mailto:maryam.moradian38@gmail.com?subject=Product Designer: Let\'s connect'}
                  className="tap-target"
                  style={{
                    background: '#a63636',
                    color: '#ffffff',
                    padding: '14px 28px',
                    borderRadius: '980px',
                    border: '1px solid #a63636',
                    cursor: 'pointer',
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '15px',
                    fontWeight: 500,
                    lineHeight: 1,
                  }}
                >
                  Get in touch
                </button>
              </div>
            </div>

            {/* Right column — photo */}
            <div style={{
              width: isMobile ? '100%' : '280px',
              flexShrink: 0,
            }}>
              <img
                src="profile.png"
                alt="Maryam Moradian, Product Designer"
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
            color: '#666666',
            letterSpacing: '-0.12px',
          }}>
            7+ years across Industrial &amp; Product Design · 9 projects across 5 brands · B2B MedTech &amp; Biomechanics · End-to-end from discovery to handoff
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
                fontSize: '12px',
                fontWeight: 400,
                color: '#a63636',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Background · From physical systems to digital products
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
                That is still how I approach every digital product. Before I design a screen, I map the workflow around it: the people using it, the physical environment it sits in, and the constraints no one put in the brief.
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
                An M.Sc. in Human-Computer Interaction added empirical research methods and interaction theory to that foundation. Together, they shaped a perspective I rely on daily: the interface is only one part of a much larger system.
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
                My Path: Industrial Design (B.Sc. &amp; M.Sc., 2011 to 2017) → Industrial &amp; 3D Design Practice (2017 to 2020) → M.Sc. Human-Computer Interaction, University of Siegen (2020 to 2024) → UX/UI &amp; Product Design (2022 to Present)
              </p>

              <div style={{ marginTop: '40px' }}>

                {/* Four timeline nodes in a row with arrows between. The last one is highlighted as current. */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0px',
                  flexWrap: 'nowrap',
                }}>
                  {[
                    { abbr: 'ID',  abbrSize: '16px', title: 'Industrial Design',               lines: ['B.Sc. & M.Sc.', '2011 to 2017'] },
                    { abbr: '3D',  abbrSize: '16px', title: 'Industrial & 3D Design Practice', lines: ['2017 to 2020'] },
                    { abbr: 'HCI', abbrSize: '13px', title: 'Human-Computer Interaction',      lines: ['University of Siegen', 'M.Sc.', '2020 to 2024'] },
                    { abbr: 'PD',  abbrSize: '16px', title: 'UX/UI & Product Design',          lines: ['2022 to present'], current: true },
                  ].map((node, i, arr) => (
                    <React.Fragment key={node.abbr}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        flex: isMobile ? '1 1 0' : '0 1 auto',
                        minWidth: 0,
                      }}>
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '12px',
                          background: node.current ? '#a63636' : 'rgba(166,54,54,0.08)',
                          border: node.current ? '1px solid #a63636' : '1px solid rgba(166,54,54,0.20)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <span style={{
                            fontFamily: "'Space Grotesk', system-ui, sans-serif",
                            fontSize: node.abbrSize, fontWeight: 600,
                            color: node.current ? '#ffffff' : '#a63636',
                            letterSpacing: '-0.2px',
                          }}>{node.abbr}</span>
                        </div>
                        <span style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: '12px',
                          fontWeight: node.current ? 600 : 500,
                          color: node.current ? '#a63636' : '#1d1d1f',
                          letterSpacing: '-0.1px',
                          textAlign: 'center',
                          maxWidth: isMobile ? '100%' : '104px',
                          lineHeight: 1.3,
                        }}>
                          {node.title}
                        </span>
                        {node.lines.map(line => (
                          <span key={line} style={{
                            fontFamily: "'DM Sans', system-ui, sans-serif",
                            fontSize: '12px',
                            fontWeight: 400,
                            color: '#666666',
                            textAlign: 'center',
                            lineHeight: 1.3,
                          }}>
                            {line}
                          </span>
                        ))}
                      </div>

                      {i < arr.length - 1 && (
                        <div aria-hidden="true" style={{
                          flex: isMobile ? '0 0 10px' : 1,
                          minWidth: '8px',
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
                      )}
                    </React.Fragment>
                  ))}
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
                fontSize: '12px',
                fontWeight: 400,
                color: '#D27575',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Domain · Where I do my best work
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
                The problems I find most interesting are the ones hardest to frame.
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
                Since 2022 at GEBIOM Group in Düsseldorf (promoted to Product Designer in October 2023), I have designed products where operational complexity is real:
              </p>
              {/* Three short items: same dot bullet as the Experience list, lighter dot for the dark background */}
              <ul style={{ listStyle: 'none', margin: '0 0 var(--paragraph-spacing)', padding: 0 }}>
                {[
                  'Biomechanical measurement data that must be interpretable by non-specialists.',
                  'Orthopedic service workflows that bridge physical hardware and digital software.',
                  'B2B retail tools that work reliably for store staff at every level of expertise.',
                ].map((item, i, arr) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    marginBottom: i < arr.length - 1 ? '10px' : 0,
                  }}>
                    <span aria-hidden="true" style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: '#D27575', marginTop: '11px', flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 'var(--body-font-size)',
                      fontWeight: 400,
                      lineHeight: 'var(--body-line-height)',
                      letterSpacing: '-0.374px',
                      color: 'rgba(255,255,255,0.70)',
                    }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
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
                I find a pre-packaged brief less compelling than an unstructured, multi-user problem that needs clear architecture from the ground up.
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
              { stat: '3',   label: 'platforms: Web, iOS and Android' },
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
                  color: '#A8A8A8',
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
                fontSize: '12px',
                fontWeight: 400,
                color: '#a63636',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Approach · End-to-end ownership
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
                End-to-end means I am involved before the first screen and after the last handoff.
              </h2>
            </div>

            {/* Right column */}
            <div style={{ flex: 1 }}>
              {[
                {
                  n: '1',
                  heading: 'Map the workflow before the interface.',
                  body: 'On the Fizik 121 project, I spent the early phase mapping the full in-store service (staff behavior, hardware measurement inputs, and catalog logic) before designing a single screen. Without that foundation, the UI would have solved the wrong problem.',
                },
                {
                  n: '2',
                  heading: 'Treat constraints as design inputs, not blockers.',
                  body: 'On the Preventive Foot Care platform, working without real patient data and designing for two distinct literacy levels forced explicit trade-offs. Making those decisions visible builds trust with engineering and stakeholders.',
                },
                {
                  n: '3',
                  heading: 'Stay involved through implementation.',
                  body: 'Handoff is not the end of my job. I collaborate with developers at the component level during build, maintain design system documentation, and clarify edge cases to keep engineering moving, especially when I am the sole designer on a product.',
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

      {/* ── Section 4b: How I Work with AI ── */}
      <section id="about-ai" style={{
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
                fontSize: '12px',
                fontWeight: 400,
                color: '#a63636',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Workflow · How I work with AI
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
                How I work with AI
              </h2>
            </div>

            {/* Right column */}
            <div style={{ flex: 1 }}>
              {[
                { lead: null, text: 'I use AI to eliminate repetitive execution so I can focus on product judgment.' },
                { lead: 'Build tools, not shortcuts:', text: 'When a task is slow and manual, I build tooling for it. For example, I used AI to build a custom Figma plugin that updates typography and all font variants across a design system in a few clicks, turning roughly a full day of manual work into a few minutes. I systematically benchmarked color-management plugins the same way to minimize repetitive maintenance.' },
                { lead: 'Human judgment stays in charge:', text: 'AI accelerates drafting, but it does not make design decisions. I walk through flows and prototypes repeatedly before handoff, refining friction points or running quick usability tests whenever something feels off.' },
                { lead: 'Specs that stand on their own:', text: 'My handoff files include clear component states, edge cases, and links so engineers can build confidently without waiting on me in a meeting.' },
              ].map(({ lead, text }, i, arr) => (
                <p key={i} data-anim={i === 0 ? 'work-sub' : undefined} style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 'var(--body-font-size)',
                  fontWeight: 400,
                  lineHeight: 'var(--body-line-height)',
                  letterSpacing: '-0.374px',
                  color: 'rgba(29,29,31,0.82)',
                  marginBottom: i < arr.length - 1 ? 'var(--paragraph-spacing)' : 0,
                }}>
                  {lead && <strong style={{ fontWeight: 600, color: '#1d1d1f' }}>{lead}</strong>}
                  {lead && ' '}
                  {text}
                </p>
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
                fontSize: '12px',
                fontWeight: 400,
                color: '#a63636',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                What I'm looking for next
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
                A team that takes product complexity seriously.
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
                I do my strongest work on B2B platforms, HealthTech, MedTech, and data-heavy workflow products, collaborating closely with PMs, engineers, and domain specialists who want a designer involved in framing the problem, not just polishing pixels.
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
                Open to Product Designer roles in Germany (remote or hybrid).
              </p>

              {/* Tag chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '40px' }}>
                {[
                  'B2B SaaS', 'HealthTech', 'MedTech', 'Workflow Products',
                  'Design Systems', 'End-to-End Ownership', 'Germany', 'Remote or Hybrid',
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
              fontSize: '12px',
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
              role: 'Product Designer',
              company: 'GEBIOM Group',
              dates: 'Oct 2023 to Present',
              promotion: 'Full-time. Promoted from UX/UI Designer.',
              bullets: [
                'Own product design end-to-end across web and mobile (from early discovery and workflow definition to implementation-ready specs) for B2B MedTech tools and B2C retail experiences.',
                'Led user research and usability testing across the product lifecycle; findings directly shaped workflow redesigns and informed go/no-go decisions on key features.',
                'Built and evolved scalable design system foundations across 9 projects spanning 5 brands, improving cross-team consistency and reducing design-to-development friction.',
                'Created product pitches and presentation materials for three products across web, iOS, and Android.',
                'Partnered with the University of Siegen research group to translate academic biomechanics findings into product decisions.',
              ],
            },
            {
              role: 'UX/UI Designer',
              company: 'GEBIOM Group',
              dates: 'Feb 2022 to Aug 2023',
              promotion: 'Part-time.',
              bullets: [
                'Designed core user flows, interface components, and prototypes across web and mobile applications while completing graduate studies in HCI.',
              ],
            },
            {
              role: 'Research Assistant & Web Content Manager',
              company: 'University of Siegen',
              dates: 'Sep 2021 to May 2023',
              promotion: 'Part-time.',
              bullets: [
                'Managed and restructured student-facing web content to improve navigation and usability, implementing HTML and responsive layout updates for accessibility.',
              ],
            },
            {
              role: 'Freelance 3D Designer',
              company: 'Independent',
              dates: 'Feb 2019 to Sep 2020',
              promotion: null,
              bullets: [
                'Delivered 3D modeling in Rhino for diverse client projects while completing language preparation for graduate admission in Germany.',
              ],
            },
            {
              role: 'Lead Industrial Designer',
              company: 'Mesina Group',
              dates: 'Jul 2018 to Jan 2019',
              promotion: null,
              bullets: [
                'Led an industrial design team developing ergonomic, user-centered hardware products from initial concept through production refinement.',
                'Ran user research and market analysis to prioritize product directions, building and testing physical prototypes early to reduce pre-manufacturing iteration cycles.',
                'Partnered with engineering and manufacturing teams to balance form, ergonomics, and production constraints.',
              ],
            },
            {
              role: 'Lead Industrial Designer',
              company: 'NTP Design',
              dates: 'Aug 2017 to May 2018',
              promotion: null,
              bullets: [
                'Developed 3D models and validated concepts into production-ready directions aligned with user needs and business goals.',
              ],
            },
          ].map((job, i) => (
            <div key={job.role + job.company} style={{
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
                    color: '#666666',
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
                      color: '#666666',
                      letterSpacing: '-0.12px',
                      fontStyle: 'italic',
                    }}>
                      {job.promotion}
                    </div>
                  )}
                </div>

                {/* Right — bullets */}
                {(job.text || job.bullets.length > 0) && (
                <div style={{ flex: 1 }}>
                  {job.text && (
                    <p style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '15px',
                      fontWeight: 400,
                      lineHeight: 1.55,
                      color: 'rgba(29,29,31,0.75)',
                      letterSpacing: '-0.2px',
                      margin: 0,
                    }}>
                      {job.text}
                    </p>
                  )}
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
                )}

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
              fontSize: '12px',
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
              dates: '2020 to 2024',
              description: 'Thesis (Grade: 1.0): Promoting regular care for preventing diabetic foot diseases using foot mapping technologies and artificial intelligence.',
            },
            {
              degree: 'M.Sc. Industrial Design',
              institution: 'Alzahra Art University, Tehran',
              dates: '2016 to 2017',
              description: '',
            },
            {
              degree: 'B.Sc. Industrial Design',
              institution: 'Tabriz Art University, Tabriz',
              dates: '2011 to 2015',
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
                  color: '#666666',
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
              fontSize: '12px',
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
                Product &amp; UX
              </div>
              {[
                'Complex Workflow Design',
                'Discovery & Problem Framing',
                'Information Architecture',
                'Interaction Design',
                'Prototyping & Wireframing',
                'UX Research & Usability Testing',
                'A/B Testing',
                'Accessibility (WCAG)',
                'Design Systems',
                'Developer Handoff',
                'Stakeholder Alignment',
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
              {['Figma', 'FigJam', 'Miro', 'Jira', 'Azure DevOps', 'Confluence', 'HTML / CSS', 'Rhino', 'Claude Code'].map(t => (
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
                    color: '#666666',
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
            fontSize: '12px', fontWeight: 400,
            color: '#A8A8A8',
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
            color: '#A8A8A8',
            lineHeight: 'var(--body-line-height)', letterSpacing: '-0.374px',
            marginBottom: '48px',
          }}>
            Open to Product Designer roles in Germany · Remote or Hybrid
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
              className="tap-target"
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
              className="tap-target"
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
            <a href="Maryam_Moradian_CV.pdf"
              download
              className="tap-target"
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
                color: '#A8A8A8',
                letterSpacing: '-0.12px',
              }}>Open to work</span>
            </div>

            {/* Get in touch button */}
            <button
              onClick={() => window.location.href =
                'mailto:maryam.moradian38@gmail.com?subject=Product Designer: Let\'s connect'}
              className="tap-target"
              style={{
                background: '#a63636', color: 'white',
                padding: '14px 32px', borderRadius: '980px',
                border: 'none', cursor: 'pointer',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '15px', fontWeight: 500,
              }}>
              Get in touch
            </button>

            {/* Download CV button */}
            <button
              onClick={() => window.open(
                'Maryam_Moradian_CV.pdf', '_blank')}
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
            </button>

          </div>
        </div>
      </section>

    </div>
  );
};

Object.assign(window, { AboutPage });

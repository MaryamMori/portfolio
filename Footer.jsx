// Footer.jsx — Portfolio footer

const Footer = ({ goTo, goToWork }) => {
  const { useEffect, useRef } = React;
  const innerRef = useRef(null);

  // Fade up the footer content on scroll — fires once on first scroll-into-view
  useEffect(() => {
    if (!innerRef.current || typeof gsap === 'undefined') return;
    const ctx = gsap.context(() => { window.animCTA(innerRef.current); });
    return () => ctx.revert();
  }, []);

  return (
    <footer style={{
      background: '#f5f5f7',
      padding: '56px clamp(24px, 5vw, 80px) 32px',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      borderTop: '1px solid rgba(0,0,0,0.06)',
    }}>
      {/* innerRef on the content wrapper — footer bg fills naturally */}
      <div ref={innerRef} style={{ maxWidth: '980px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '32px',
          marginBottom: '40px',
          paddingBottom: '32px',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}>
          {/* Brand col */}
          <div>
            <div style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#1d1d1f',
              letterSpacing: '-0.2px',
              marginBottom: '8px',
            }}>
              Maryam Moradian
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: 400,
              color: 'rgba(29,29,31,0.5)',
              letterSpacing: '-0.12px',
              lineHeight: 1.5,
            }}>
              Senior Product Designer<br />Düsseldorf, Germany
            </div>
          </div>

          {/* Work col */}
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#1d1d1f',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Work
            </div>
            {[
              { label: 'All projects', action: () => goToWork() },
              { label: 'Fizik 121 Platform', action: () => goTo('fizik') },
              { label: 'Preventive Foot Care', action: () => goTo('footcare') },
            ].map(item => (
              <button
                key={item.label}
                onClick={item.action}
                style={{
                  display: 'block',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#333333',
                  textDecoration: 'none',
                  lineHeight: 2.2,
                  letterSpacing: '-0.2px',
                  padding: 0,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  textAlign: 'left',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#a63636'}
                onMouseLeave={e => e.currentTarget.style.color = '#333333'}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Pages col */}
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#1d1d1f',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Pages
            </div>
            {[
              { label: 'About', action: () => goTo('about') },
            ].map(item => (
              <button
                key={item.label}
                onClick={item.action}
                style={{
                  display: 'block',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#333333',
                  lineHeight: 2.2,
                  letterSpacing: '-0.2px',
                  padding: 0,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  textAlign: 'left',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#a63636'}
                onMouseLeave={e => e.currentTarget.style.color = '#333333'}
              >
                {item.label}
              </button>
            ))}
            <a
              href="mailto:maryam.moradian38@gmail.com"
              style={{
                display: 'block',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 400,
                color: '#333333',
                lineHeight: 2.2,
                letterSpacing: '-0.2px',
                padding: 0,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                textAlign: 'left',
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#a63636'}
              onMouseLeave={e => e.currentTarget.style.color = '#333333'}
            >
              Contact
            </a>
          </div>

          {/* Connect col */}
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#1d1d1f',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Connect
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: 400,
                color: '#333333',
                textDecoration: 'none',
                lineHeight: 2.2,
                letterSpacing: '-0.2px',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#a63636'}
              onMouseLeave={e => e.currentTarget.style.color = '#333333'}
            >
              LinkedIn
            </a>
            <a
              href="mailto:maryam.moradian38@gmail.com"
              style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: 400,
                color: '#333333',
                textDecoration: 'none',
                lineHeight: 2.2,
                letterSpacing: '-0.2px',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#a63636'}
              onMouseLeave={e => e.currentTarget.style.color = '#333333'}
            >
              Email
            </a>
            <a
              href="01_CV_Maryam_Product_Designer.docx"
              download
              style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: 400,
                color: '#333333',
                textDecoration: 'none',
                lineHeight: 2.2,
                letterSpacing: '-0.2px',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#a63636'}
              onMouseLeave={e => e.currentTarget.style.color = '#333333'}
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <span style={{
            fontSize: '12px',
            fontWeight: 400,
            color: 'rgba(29,29,31,0.38)',
            letterSpacing: '-0.12px',
          }}>
            © 2026 Maryam Moradian
          </span>
          <span style={{
            fontSize: '12px',
            fontWeight: 400,
            color: 'rgba(29,29,31,0.38)',
            letterSpacing: '-0.12px',
          }}>
            Düsseldorf, Germany · Open to work
          </span>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { Footer });

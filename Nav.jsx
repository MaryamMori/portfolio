// Nav.jsx — Global navigation

const Nav = ({ page, goTo, goToWork }) => {
  const { useState, useEffect, useRef } = React;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Directionally-aware header: hide on scroll down, reveal on scroll up
  useEffect(() => {
    if (!navRef.current || !window.gsap || !window.ScrollTrigger) return;

    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    const showAnim = gsap.from(navRef.current, {
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: 'power2.inOut',
    }).progress(1);

    const st = window.ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play();
        } else {
          showAnim.reverse();
        }
      },
    });

    return () => {
      st.kill();
      showAnim.kill();
    };
  }, []);

  // Header palette: solid off-white bar (same as the Selected Work background), dark text
  const linkColor = (id) => page === id ? '#1d1d1f' : 'rgba(29,29,31,0.72)';
  const linkStyle = (id) => ({
    fontSize: '15px',
    fontWeight: 400,
    color: linkColor(id),
    letterSpacing: '-0.2px',
    textDecoration: 'none',
    lineHeight: 1,
    cursor: 'pointer',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    transition: 'color 150ms',
    background: 'none',
    border: 'none',
    padding: 0,
  });

  return (
    <nav ref={navRef} data-site-header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '72px',
      background: '#f9f9f7',
      borderBottom: '1px solid rgba(29,29,31,0.10)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 calc(var(--page-padding) / 2)',
      zIndex: 9999,
      transition: 'background 200ms',
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button
          onClick={() => goTo('home')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            lineHeight: 1,
            transform: 'scale(1)',
            transition: 'transform 200ms ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          aria-label="Home"
        >
          <img
            src="logo.png"
            alt="Maryam Moradian"
            width="40" height="40"
            decoding="async"
            style={{ height: '40px', width: '40px', objectFit: 'contain' }}
          />
        </button>

        {/* Right: About link + Contact (email) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button
            onClick={() => goTo('about')}
            className="tap-target"
            style={linkStyle('about')}
            onMouseEnter={e => e.currentTarget.style.color = '#a63636'}
            onMouseLeave={e => e.currentTarget.style.color = linkColor('about')}
          >
            About
          </button>
          <a
            href={mailtoHref(DEFAULT_SUBJECT)}
            className="tap-target"
            style={{
              display: 'inline-block',
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '-0.2px',
              lineHeight: 1,
              color: '#3D1A1A',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '9999px',
              border: '1.5px solid #3D1A1A',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              transition: 'color 150ms, border-color 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#a63636'; e.currentTarget.style.borderColor = '#a63636'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#3D1A1A'; e.currentTarget.style.borderColor = '#3D1A1A'; }}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

Object.assign(window, { Nav });

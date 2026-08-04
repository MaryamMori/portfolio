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

  const linkStyle = (id) => ({
    fontSize: '12px',
    fontWeight: 400,
    color: page === id ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.68)',
    letterSpacing: '-0.12px',
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
    <nav ref={navRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '72px',
      background: 'rgba(5, 5, 5, 0.8)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
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
            style={{ height: '40px', width: '40px', objectFit: 'contain' }}
          />
        </button>

        {/* Right: About link */}
        <button
          onClick={() => goTo('about')}
          style={linkStyle('about')}
        >
          About
        </button>
      </div>
    </nav>
  );
};

Object.assign(window, { Nav });

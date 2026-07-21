// App.jsx — Main app shell with routing

const { useState, useEffect, useRef } = React;

// ── Main App ──
function App() {
  const [page, setPage] = useState(() => {
    return sessionStorage.getItem('mm_page') || 'home';
  });
  const lenisRef = useRef(null);

  // ── Lenis smooth scroll — init once, integrate with GSAP ScrollTrigger ──
  useEffect(() => {
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add(time => lenis.raf(time * 1000));
      window.gsap.ticker.lagSmoothing(0);
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  // ── Scroll to top on page change ──
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [page]);

  const goTo = (newPage) => {
    setPage(newPage);
    sessionStorage.setItem('mm_page', newPage);
  };

  const goToWork = () => {
    goTo('home');
    setTimeout(() => {
      const el = document.getElementById('selected-work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    const titles = {
      home: 'Maryam Moradian — Senior Product Designer',
      about: 'About — Maryam Moradian',
      fizik: 'Fizik 121 Platform — Maryam Moradian',
      footcare: 'Preventive Foot Care Platform — Maryam Moradian',
    };
    document.title = titles[page] || 'Maryam Moradian';
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'fizik':    return <CaseStudyFizik goTo={goTo} goToWork={goToWork} />;
      case 'footcare': return <CaseStudyFootCare goTo={goTo} goToWork={goToWork} />;
      case 'about':    return <AboutPage goTo={goTo} goToWork={goToWork} />;
      default:         return <HomePage goTo={goTo} />;
    }
  };

  return (
    <div>
      <Nav page={page} goTo={goTo} goToWork={goToWork} />
      <main style={{ paddingTop: '44px' }}>
        {renderPage()}
      </main>
      <Footer goTo={goTo} goToWork={goToWork} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

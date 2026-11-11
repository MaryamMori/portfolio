// App.jsx — Main app shell with routing

const { useState, useEffect, useRef } = React;

// ── Routing: the page list lives in routes.js (window.SITE_ROUTES) ──
const ROUTES = window.SITE_ROUTES || [{ page: 'home', path: '/' }];
const routeForPage = (p) => ROUTES.find(r => r.page === p) || ROUTES[0];

// "/fizik", "/fizik/", "/fizik/index.html" all map to the fizik route; unknown paths return null
const pageFromPath = (pathname) => {
  const clean = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
  const route = ROUTES.find(r => r.path === clean);
  return route ? route.page : null;
};

const setHeadTag = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

// ── Main App ──
function App() {
  const [page, setPage] = useState(() => {
    const initial = pageFromPath(window.location.pathname) || 'home';
    // Normalise the address bar to the canonical path (drops trailing slash, sends unknown paths home)
    const canonical = routeForPage(initial).path;
    if (window.location.pathname !== canonical) {
      window.history.replaceState({ page: initial }, '', canonical + window.location.search);
    }
    return initial;
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
    window.scrollTo({ top: 0, behavior: 'instant' });
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [page]);

  // ── Back / forward buttons ──
  useEffect(() => {
    const onPop = () => setPage(pageFromPath(window.location.pathname) || 'home');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const goTo = (newPage) => {
    const path = routeForPage(newPage).path;
    if (window.location.pathname !== path) {
      window.history.pushState({ page: newPage }, '', path);
    }
    setPage(newPage);
  };

  const goToWork = () => {
    goTo('home');
    setTimeout(() => {
      const el = document.getElementById('selected-work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // ── Keep title, description and canonical in step with the current route ──
  useEffect(() => {
    const route = routeForPage(page);
    document.title = route.title || 'Maryam Moradian';
    if (route.description) setHeadTag('meta[name="description"]', 'content', route.description);
    setHeadTag('link[rel="canonical"]', 'href', (window.SITE_ORIGIN || '') + route.path);
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
      <main style={{ paddingTop: '72px' }}>
        {renderPage()}
      </main>
      <Footer goTo={goTo} goToWork={goToWork} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

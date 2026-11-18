// CaseStudyFizik.jsx — Fizik 121 — v7: spacing · snap · GSAP animations

if (!document.getElementById('fz-case-styles')) {
  const s = document.createElement('style');
  s.id = 'fz-case-styles';
  s.textContent = `
    @keyframes fizik-word-up  { from { transform: translateY(110%); } to { transform: translateY(0%); } }
    @keyframes fizik-fade-up  { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fizik-fade-in  { from { opacity:0; } to { opacity:1; } }

    /* ── Nav ── */
    .fz-nav-btn {
      font-family:'DM Sans',system-ui,sans-serif; font-size:12px;
      letter-spacing:.09em; text-transform:uppercase; font-weight:400;
      color:#666666; background:none; border:none; padding:9px 0;
      cursor:pointer; display:flex; align-items:center; flex-direction:row;
      justify-content:flex-end; gap:10px; width:100%; transition:color .25s; line-height:1;
    }
    .fz-nav-btn::after {
      content:''; display:block; width:14px; height:1px;
      background:currentColor; flex-shrink:0; transition:width .25s;
    }
    .fz-nav-btn.fz-active { color:#a63636; }
    .fz-nav-btn.fz-active::after { width:28px; }
    .fz-nav-btn:hover { color:#1d1d1f; }

    .fz-sidebar { transition:opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1); }
    /* Shared Contents nav (FzContents): when hidden it is also removed from the tab order */
    .fz-contents { transition:opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1), visibility 0s; }
    .fz-contents.fz-contents-hidden {
      opacity:0; visibility:hidden; pointer-events:none; transform:translateX(12px);
      transition:opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1), visibility 0s .6s;
    }
    .fz-sidebar.fz-sidebar-hidden { opacity:0; pointer-events:none; transform:translateX(12px); }

    /* Phone Contents bar (FzContentsBar) */
    .fz-cbar {
      position:fixed; left:0; right:0; z-index:9998;
      background:#f9f9f7; border-bottom:1px solid rgba(29,29,31,0.10);
      font-family:'DM Sans',system-ui,sans-serif;
      transition:opacity .25s, visibility 0s;
    }
    .fz-cbar.fz-cbar-open { box-shadow:0 12px 24px rgba(29,29,31,0.10); }
    .fz-cbar.fz-cbar-hidden { opacity:0; visibility:hidden; pointer-events:none; transition:opacity .25s, visibility 0s .25s; }
    .fz-cbar-row {
      height:44px; display:flex; align-items:center; justify-content:space-between; gap:12px;
      padding:0 calc(var(--page-padding) / 2) 0 var(--page-padding);
    }
    .fz-cbar-current {
      font-size:14px; font-weight:500; color:#1d1d1f; letter-spacing:-0.2px;
      white-space:nowrap; overflow:hidden; text-overflow:ellipsis; min-width:0;
    }
    .fz-cbar-toggle {
      display:inline-flex; align-items:center; gap:6px; flex-shrink:0;
      min-height:44px; padding:0 12px; background:none; border:none; cursor:pointer;
      font-family:inherit; font-size:12px; font-weight:600; letter-spacing:.1em; text-transform:uppercase;
      color:#6B3030;
    }
    .fz-cbar-toggle:hover { color:#a63636; }
    .fz-cbar-list {
      list-style:none; margin:0; padding:4px 0 8px;
      border-top:1px solid rgba(29,29,31,0.08);
      max-height:calc(100vh - 160px); overflow-y:auto;
    }
    .fz-cbar-link {
      display:flex; align-items:center; gap:10px; width:100%; min-height:44px;
      padding:0 var(--page-padding); background:none; border:none; cursor:pointer; text-align:left;
      font-family:inherit; font-size:15px; color:rgba(29,29,31,0.72); letter-spacing:-0.2px;
    }
    .fz-cbar-link::before {
      content:''; width:3px; height:18px; border-radius:2px; background:transparent; flex-shrink:0;
    }
    .fz-cbar-link:hover { color:#1d1d1f; }
    .fz-cbar-link.fz-cbar-link-active { color:#a63636; font-weight:500; }
    .fz-cbar-link.fz-cbar-link-active::before { background:#a63636; }

    .fz-back-btn {
      background:none; border:none; padding:0; color:#A8A8A8;
      font-size:13px; letter-spacing:.04em; cursor:pointer;
      font-family:'DM Sans',system-ui,sans-serif;
      display:flex; align-items:center; gap:8px; transition:color .2s;
    }
    .fz-back-btn:hover { color:rgba(255,255,255,0.8); }

    /* ── Cards ── */
    .fz-card {
      background:#fff; border:1.5px solid rgba(182,59,59,0.7);
      border-radius:16px; padding:16px; display:flex; flex-direction:column;
      transition:transform .22s ease, box-shadow .22s ease;
    }
    .fz-card:hover {
      transform:translateY(-3px);
      box-shadow:0 12px 32px rgba(166,54,54,0.09);
    }
    .fz-constraints-row {
      display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:56px;
    }
    .fz-decisions-grid {
      display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:56px;
    }
    .fz-card-number {
      font-family:'Space Grotesk',system-ui,sans-serif; font-size:15px; font-weight:500;
      line-height:26px; letter-spacing:-0.2px; color:#B63B3B; margin-bottom:2px;
    }
    .fz-card-title {
      font-family:'Space Grotesk',system-ui,sans-serif; font-size:15px; font-weight:500;
      line-height:26px; letter-spacing:-0.2px; color:#1d1d1f; margin-bottom:4px;
    }
    .fz-card-body {
      font-family:'DM Sans',system-ui,sans-serif; font-size:12px; font-weight:400;
      line-height:1.5; color:rgba(29,29,31,0.65);
    }
    .fz-card-icon { display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }

    /* ── User cards ── */
    .fz-user-grid {
      display:grid; grid-template-columns:1fr auto 1fr; gap:24px;
      align-items:center; margin-top:40px; margin-bottom:12px;
    }
    .fz-user-card  { border-radius:16px; padding:29px; display:flex; flex-direction:column; }
    .fz-user-card-a { background:#fff; border:1px solid #b4b2a9; }
    .fz-user-card-b { background:#b63b3b; border:1px solid #b63b3b; }
    .fz-user-eyebrow {
      font-family:'DM Sans',system-ui,sans-serif; font-size:12px; font-weight:400;
      line-height:16.5px; letter-spacing:1.1px; text-transform:uppercase;
    }
    .fz-user-name {
      font-family:'Space Grotesk',system-ui,sans-serif; font-size:21px; font-weight:500;
      line-height:26px; letter-spacing:-0.2px; margin-top:8px; margin-bottom:14px;
    }
    .fz-user-divider { height:1px; background:rgba(29,29,31,0.38); margin-bottom:14px; }
    .fz-user-trait   { font-family:'DM Sans',system-ui,sans-serif; font-size:15px; font-weight:400; line-height:23.25px; }
    .fz-user-needs-label {
      font-family:'DM Sans',system-ui,sans-serif; font-size:12px; font-weight:400;
      line-height:16.5px; letter-spacing:1.1px; text-transform:uppercase;
      margin-top:20px; margin-bottom:10px;
    }
    .fz-user-tags    { display:flex; flex-wrap:wrap; gap:8px; }
    .fz-user-tag {
      font-family:'DM Sans',system-ui,sans-serif; font-size:12px; font-weight:400;
      line-height:16.5px; letter-spacing:0.44px; border-radius:6px;
      padding:4px 9px; border:1px solid rgba(29,29,31,0.38);
    }
    .fz-user-footnote {
      font-family:'DM Sans',system-ui,sans-serif; font-size:15px; font-weight:400;
      line-height:1.6; letter-spacing:-0.2px; margin-top:20px;
    }
    .fz-user-caption {
      font-family:'DM Sans',system-ui,sans-serif; font-size:13px; font-weight:400;
      line-height:1.6; letter-spacing:-0.1px; color:#666666; text-align:center;
      margin-top:24px;
    }

    /* ── Layout ── */
    .fz-body-layout {
      max-width:var(--content-width); margin:0 auto;
      padding:var(--section-spacing-md) var(--page-padding) 0;
    }
    .fz-meta-bar {
      display:grid; grid-template-columns:repeat(4,1fr);
      padding-top:32px; border-top:1px solid rgba(255,255,255,0.08);
      animation:fizik-fade-up .8s cubic-bezier(.16,1,.3,1) 1.1s both;
    }
    .fz-caption {
      font-family:'DM Sans',system-ui,sans-serif; font-size:13px; color:#666666;
      letter-spacing:-0.1px; text-align:center; margin-top:16px;
    }

    /* ── Next project button ── */
    .fz-next-title {
      font-size:clamp(28px,4vw,56px); font-weight:700; color:#6E6E6E;
      letter-spacing:-0.025em; line-height:1.1; transition:color .35s;
      font-family:'Space Grotesk',system-ui,sans-serif; cursor:pointer;
      background:none; border:none; padding:0; text-align:left;
    }
    .fz-next-title:hover { color:#fff; }

    /* ── Quote card ── */
    .fz-quote-card {
      padding:36px 40px; background:#0c0c0c; border-radius:16px;
      border-left:2px solid #a63636;
    }

    /* ── 3-item meta bar ── */
    /* padding-right keeps the longer third column clear of the vertical "Scroll" marker */
    .fz-meta-bar.fz-meta-bar-3 { grid-template-columns:repeat(3,1fr); padding-right:40px; }

    /* ── Impact at a glance ── */
    .fz-impact {
      background:#0c0c0c; padding:0 var(--page-padding) var(--section-spacing-sm);
    }
    .fz-impact-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
    .fz-impact-card {
      background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.10);
      border-radius:16px; padding:28px;
    }

    /* ── Bulleted lists in body copy ── */
    .fz-list { list-style:none; margin:0 0 var(--paragraph-spacing); padding:0; }
    .fz-list li {
      position:relative; padding-left:18px; margin-bottom:12px;
      font-family:'DM Sans',system-ui,sans-serif; font-size:var(--body-font-size);
      line-height:var(--body-line-height); letter-spacing:-0.374px; color:rgba(29,29,31,0.68);
    }
    .fz-list li:last-child { margin-bottom:0; }
    .fz-list li::before {
      content:''; position:absolute; left:0; top:0.72em; width:5px; height:5px;
      border-radius:50%; background:#a63636;
    }

    @media (max-width:900px) {
      .fz-body-layout  { padding-top:64px !important; }
      .fz-meta-bar.fz-meta-bar-3 { grid-template-columns:1fr !important; gap:20px 0 !important; }
      .fz-meta-bar-3 > div { padding-left:0 !important; padding-right:0 !important; border-right:none !important; }
      .fz-impact-grid { grid-template-columns:1fr !important; }
      .fz-sidebar      { display:none !important; }
      .fz-meta-bar     { grid-template-columns:repeat(2,1fr) !important; gap:20px 0 !important; }
      .fz-constraints-row { grid-template-columns:1fr 1fr !important; }
      .fz-decisions-grid  { grid-template-columns:1fr !important; }
      .fz-user-grid       { grid-template-columns:1fr !important; }
    }
  `;
  document.head.appendChild(s);
}

// ── Helpers ──────────────────────────────────────────────────────

const WordReveal = ({ text, style, startDelay = 0, wordDelay = 0.09 }) => {
  const words = String(text).split(' ');
  return (
    <div style={{ display:'block', ...style }}>
      {words.map((w,i) => (
        <span key={i} style={{ display:'inline-block', overflow:'hidden', verticalAlign:'bottom', marginRight: i < words.length-1 ? '.26em' : 0 }}>
          <span style={{ display:'inline-block', animation:`fizik-word-up 1s cubic-bezier(.16,1,.3,1) ${startDelay + i * wordDelay}s both` }}>{w}</span>
        </span>
      ))}
    </div>
  );
};

const FzLabel = ({ n, text }) => (
  <div className="fz-label" style={{ fontSize:'17px', fontWeight:500, color:'#a63636', letterSpacing:'-0.374px', marginBottom:'12px', fontFamily:"'DM Sans',system-ui,sans-serif", lineHeight:1.6 }}>
    {n}&nbsp;&nbsp;·&nbsp;&nbsp;{text.toUpperCase()}
  </div>
);

const FzHeading = ({ children }) => (
  <h2 className="fz-heading" data-anim="work-label" style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,2.5vw,32px)', fontWeight:700, lineHeight:1.19, letterSpacing:'-0.2px', color:'#1d1d1f', marginBottom:0, textWrap:'pretty' }}>
    {children}
  </h2>
);

const FzBody = ({ children, style, animSub }) => (
  <p className="fz-body" data-anim={animSub ? 'work-sub' : undefined} style={{ fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:'var(--body-font-size)', fontWeight:400, lineHeight:'var(--body-line-height)', letterSpacing:'-0.374px', color:'rgba(29,29,31,0.68)', marginBottom:'var(--paragraph-spacing)', textWrap:'pretty', ...style }}>
    {children}
  </p>
);

// Bold lead-in ("The Decision:") at the start of a paragraph or list item
const FzLead = ({ children }) => (
  <strong style={{ fontWeight:600, color:'#1d1d1f' }}>{children}</strong>
);

const FzList = ({ items }) => (
  <ul className="fz-list">
    {items.map((it, i) => (
      <li key={i}>
        {it.lead && <><FzLead>{it.lead}:</FzLead>{' '}</>}
        {it.text}
      </li>
    ))}
  </ul>
);

// Dark band of three highlight cards under a case study hero (bold lead + one sentence each).
// Used for "Impact at a glance" (Fizik) and "Core Design Thesis" (Fleetwatch).
const FzHighlights = ({ id, title, items }) => (
  <section className="fz-impact" aria-labelledby={id}>
    <h2 id={id} style={{ fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:'12px', fontWeight:400, color:'#A8A8A8', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:'20px', paddingTop:'40px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
      {title}
    </h2>
    <div className="fz-impact-grid">
      {items.map(item => (
        <div key={item.lead} className="fz-impact-card">
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'19px', fontWeight:600, lineHeight:1.25, letterSpacing:'-0.2px', color:'#ffffff', marginBottom:'10px' }}>{item.lead}</h3>
          <p style={{ fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:'15px', lineHeight:1.55, letterSpacing:'-0.2px', color:'#A8A8A8' }}>{item.text}</p>
        </div>
      ))}
    </div>
  </section>
);

// Shared "Contents" side navigation for case study pages.
// items: [{ id, label }] in page order; each id must be on a section wrapper.
// contentSelector: the text column it must never overlap. The nav only shows while the
// sections are on screen AND there is room for it beside that column; otherwise it is
// hidden and taken out of the tab order.
const FzContents = ({ items, contentSelector }) => {
  const { useState, useEffect, useRef } = React;
  const [active, setActive] = useState(items[0].id);
  const [inRange, setInRange] = useState(false);
  const [fits, setFits] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const els = items.map(i => document.getElementById(i.id)).filter(Boolean);
      if (!els.length) return;
      const vh = window.innerHeight;
      // Active = last section whose top has passed 40% of the viewport
      let current = els[0].id;
      els.forEach(el => { if (el.getBoundingClientRect().top < vh * 0.4) current = el.id; });
      // The last section may never reach that line, so it becomes active once it is fully on screen
      const lastEl = els[els.length - 1];
      if (lastEl.getBoundingClientRect().bottom <= vh) current = lastEl.id;
      setActive(current);
      setInRange(els[0].getBoundingClientRect().top < vh * 0.9 && els[els.length - 1].getBoundingClientRect().bottom > 0);
      // Room check: nav width plus a 24px gap must fit right of the text column
      const nav = navRef.current;
      const cols = [...document.querySelectorAll(contentSelector)];
      if (nav && cols.length) {
        const colRight = Math.max(...cols.map(c => c.getBoundingClientRect().right));
        setFits(window.innerWidth - nav.offsetWidth - 24 >= colRight);
      }
    };
    update();
    window.addEventListener('scroll', update, { passive:true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  const scrollTo = id => {
    const el = document.getElementById(id); if (!el) return;
    const target = el.getBoundingClientRect().top + window.scrollY - 80;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(target, { duration:1.4 });
    else window.scrollTo({ top:target, behavior:'smooth' });
  };

  const visible = inRange && fits;
  const narrow = typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;
  return (
    <React.Fragment>
    <FzContentsBar items={items} show={narrow || !fits} />
    <nav ref={navRef} aria-label="Contents" className={`fz-sidebar fz-contents${visible ? '' : ' fz-contents-hidden'}`} style={{ position:'fixed', right:0, top:'136px', zIndex:50, textAlign:'right' }}>
      <div aria-hidden="true" style={{ fontSize:'12px', color:'#666666', letterSpacing:'.15em', textTransform:'uppercase', marginBottom:'18px' }}>Contents</div>
      {items.map(item => (
        <button key={item.id} className={`fz-nav-btn${active === item.id ? ' fz-active' : ''}`} aria-current={active === item.id ? 'true' : undefined} onClick={() => scrollTo(item.id)}>
          {item.label}
        </button>
      ))}
    </nav>
    </React.Fragment>
  );
};

// Shared phone "Contents" bar for case study pages: a slim bar under the header that names
// the current section, with a toggle that opens the list of section links.
// Shown only where the desktop side nav is hidden (show prop; default: 900 px and below)
// and only while the case study sections are on screen.
const FZ_BAR_H = 44;
const FzContentsBar = ({ items, show }) => {
  const { useState, useEffect, useRef } = React;
  const [active, setActive] = useState(items[0].id);
  const [inRange, setInRange] = useState(false);
  const [narrow, setNarrow] = useState(() => window.matchMedia('(max-width: 900px)').matches);
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(72);
  const toggleRef = useRef(null);
  const barRef = useRef(null);
  const listId = 'fz-contents-list';

  const enabled = show === undefined ? narrow : show;
  const visible = enabled && inRange;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const onMq = () => setNarrow(mq.matches);
    mq.addEventListener('change', onMq);
    const update = () => {
      const els = items.map(i => document.getElementById(i.id)).filter(Boolean);
      if (!els.length) return;
      const vh = window.innerHeight;
      let current = els[0].id;
      els.forEach(el => { if (el.getBoundingClientRect().top < vh * 0.4) current = el.id; });
      const lastEl = els[els.length - 1];
      if (lastEl.getBoundingClientRect().bottom <= vh) current = lastEl.id;
      setActive(current);
      setInRange(els[0].getBoundingClientRect().top < vh * 0.6 && lastEl.getBoundingClientRect().bottom > FZ_BAR_H + 72);
    };
    update();
    window.addEventListener('scroll', update, { passive:true });
    window.addEventListener('resize', update);
    return () => {
      mq.removeEventListener('change', onMq);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Sit directly under the site header, which slides away on scroll down and back on scroll up
  useEffect(() => {
    if (!visible) return;
    const header = document.querySelector('[data-site-header]');
    let raf;
    const follow = () => {
      const b = header ? Math.max(0, Math.round(header.getBoundingClientRect().bottom)) : 0;
      setTop(t => (t === b ? t : b));
      raf = requestAnimationFrame(follow);
    };
    follow();
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  // Close when the bar hides, on Escape, and on a tap outside
  useEffect(() => { if (!visible) setOpen(false); }, [visible]);
  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') { setOpen(false); toggleRef.current && toggleRef.current.focus(); } };
    const onDown = e => { if (barRef.current && !barRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [open]);

  const go = id => {
    setOpen(false);
    const el = document.getElementById(id); if (!el) return;
    // Clear the header (72) and this bar, with a little air
    const target = el.getBoundingClientRect().top + window.scrollY - (72 + FZ_BAR_H + 16);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(target, reduce ? { immediate:true } : { duration:1.4 });
    else window.scrollTo({ top:target, behavior: reduce ? 'auto' : 'smooth' });
  };

  const current = items.find(i => i.id === active) || items[0];
  return (
    <div ref={barRef} className={`fz-cbar${visible ? '' : ' fz-cbar-hidden'}${open ? ' fz-cbar-open' : ''}`} style={{ top: top + 'px' }}>
      <div className="fz-cbar-row">
        <span className="fz-cbar-current" aria-live="polite">{current.label}</span>
        <button
          ref={toggleRef}
          type="button"
          className="fz-cbar-toggle"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen(o => !o)}
        >
          Contents
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" style={{ transform: open ? 'rotate(180deg)' : 'none', transition:'transform 200ms' }}>
            <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <ul id={listId} className="fz-cbar-list" hidden={!open}>
        {items.map(item => (
          <li key={item.id}>
            <button
              type="button"
              className={`fz-cbar-link${item.id === active ? ' fz-cbar-link-active' : ''}`}
              aria-current={item.id === active ? 'true' : undefined}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const VideoBlock = ({ src, caption, style, type }) => {
  const { useRef, useEffect } = React;
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    const obs = new IntersectionObserver(en => {
      en[0].isIntersecting ? v.play().catch(()=>{}) : v.pause();
    }, { threshold: 0.3 });
    obs.observe(v); return () => obs.disconnect();
  }, []);
  return (
    <div style={{ ...style }}>
      <video ref={ref} loop muted playsInline style={{ width:'100%', display:'block', borderRadius:'14px', background:'#0c0c0c' }}>
        <source src={src} type={type || 'video/mp4'} />
      </video>
      {caption && <div className="fz-caption">{caption}</div>}
    </div>
  );
};

// Icon SVGs
const IconBook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(29,29,31,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconHardware = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(29,29,31,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);
const IconBrand = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(29,29,31,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(29,29,31,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const CaseSection = ({ section, idx }) => {
  const isAlt = idx % 2 === 1;
  return (
    <section style={{ background:isAlt?'#f5f5f7':'#fff', padding:'72px var(--page-padding)', borderTop:'1px solid rgba(0,0,0,0.05)' }}>
      <div style={{ maxWidth:'680px', margin:'0 auto' }}>
        <div style={{ fontSize:'12px', fontWeight:400, color:'#a63636', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'16px', fontFamily:"'DM Sans',system-ui,sans-serif" }}>{section.label}</div>
        <h2 style={{ fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:'clamp(22px,2.5vw,34px)', fontWeight:600, lineHeight:1.2, letterSpacing:'-0.374px', color:'#1d1d1f', marginBottom:'24px' }}>{section.heading}</h2>
        {section.body && section.body.map((para,i) => (
          <p key={i} style={{ fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:'var(--body-font-size)', lineHeight:'var(--body-line-height)', letterSpacing:'-0.374px', color:'rgba(29,29,31,0.8)', marginBottom: i<section.body.length-1?'20px':0 }}>{para}</p>
        ))}
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════
const CaseStudyFizik = ({ goTo, goToWork }) => {
  const { useState, useEffect, useRef } = React;
  const [activeSection, setActiveSection] = useState('problem');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const containerRef = useRef(null);

  const navItems = [
    { id:'problem',     label:'Problem' },
    { id:'strategy',    label:'Strategy' },
    { id:'constraints', label:'Constraints' },
    { id:'decisions',   label:'Decisions' },
    { id:'outcome',     label:'Outcome' },
    { id:'reflection',  label:'Reflection' },
  ];

  useEffect(() => {
    // ── Sidebar active-section tracking ──────────────────────────
    const secEls = document.querySelectorAll('.fz-section');
    const sObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.2 });
    secEls.forEach(el => sObs.observe(el));

    const handleScroll = () => {
      const p = document.getElementById('problem');
      const r = document.getElementById('reflection');
      if (!p || !r) return;
      setSidebarVisible(
        p.getBoundingClientRect().top < window.innerHeight * 0.9 &&
        r.getBoundingClientRect().bottom > 0
      );
    };
    window.addEventListener('scroll', handleScroll, { passive:true });
    handleScroll();

    return () => {
      sObs.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Section heading+subtitle blocks: same scroll-reveal as the Selected Work heading
  useEffect(() => {
    if (typeof gsap === 'undefined') return;
    const ids = ['problem', 'strategy', 'constraints', 'decisions', 'outcome', 'reflection'];
    const ctx = gsap.context(() => {
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) window.animWorkHeading(el);
      });
    });
    return () => ctx.revert();
  }, []);

  const scrollTo = id => {
    const el = document.getElementById(id); if (!el) return;
    const target = el.getBoundingClientRect().top + window.scrollY - 80;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(target, { duration:1.4 });
    else window.scrollTo({ top:target, behavior:'smooth' });
  };

  return (
    <div ref={containerRef} style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:'#fafafa', minHeight:'100vh' }}>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section data-snap style={{ minHeight:'100vh', background:'#0c0c0c', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'var(--page-padding)', paddingTop:'96px', position:'relative', overflow:'hidden' }}>
        <video autoPlay loop muted playsInline style={{ position:'absolute', top:0, right:0, width:'62%', height:'100%', objectFit:'contain', opacity:0.32 }}>
          <source src="fizik-hero-loop.mp4" type="video/mp4" />
        </video>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,#0c0c0c 32%,rgba(12,12,12,.78) 52%,rgba(12,12,12,.18) 100%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,#0c0c0c 20%,rgba(12,12,12,.5) 55%,transparent 100%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)', backgroundSize:'72px 72px', pointerEvents:'none' }} />

        <div style={{ position:'absolute', top:'52px', left:'var(--page-padding)', animation:'fizik-fade-in .7s ease .25s both', zIndex:10 }}>
          <button className="fz-back-btn tap-target" onClick={() => goToWork()}>← All work</button>
        </div>
        <div style={{ position:'absolute', top:'52px', right:'var(--page-padding)', fontSize:'12px', color:'#A8A8A8', letterSpacing:'.14em', textTransform:'uppercase', animation:'fizik-fade-in .7s ease .3s both', zIndex:10 }}>
          Case study: 01 / 03
        </div>

        <div style={{ position:'relative', zIndex:5 }}>
          <div style={{ fontSize:'12px', color:'#A8A8A8', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:'36px', animation:'fizik-fade-up .7s cubic-bezier(.16,1,.3,1) .35s both' }}>
            B2B Retail Tech &nbsp;·&nbsp; Hardware + Software &nbsp;·&nbsp; 0→1 Product
          </div>
          <h1 aria-label="Fizik 121 Platform" style={{ marginBottom:'44px', fontSize:'inherit', fontWeight:'inherit', fontFeatureSettings:'normal' }}>
            <WordReveal text="Fizik 121" startDelay={0.48} wordDelay={0.1} style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(52px,10vw,124px)', fontWeight:700, lineHeight:0.93, letterSpacing:'-0.035em', color:'#fff', marginBottom:'4px' }} />
            <WordReveal text="Platform"  startDelay={0.65} wordDelay={0.1} style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(52px,10vw,124px)', fontWeight:700, lineHeight:0.93, letterSpacing:'-0.035em', color:'#6E6E6E' }} />
          </h1>
          <div style={{ fontSize:'clamp(15px,1.8vw,19px)', color:'rgba(255,255,255,.46)', maxWidth:'460px', lineHeight:1.62, letterSpacing:'-0.2px', marginBottom:'56px', animation:'fizik-fade-up .85s cubic-bezier(.16,1,.3,1) .9s both', textWrap:'pretty' }}>
            Turning a complex, specialist-dependent 3D-printed saddle service into a repeatable point-of-sale workflow for global bike retailers.
          </div>
          <div className="fz-meta-bar fz-meta-bar-3">
            {[
              { label:'Role',              value:'Sole Product Designer (Ongoing owner through post-launch iterations)' },
              { label:'Scope',             value:'0→1 Product Strategy · UX/UI · Hardware Integration · Retail Design System' },
              { label:'Platform & Reach',  value:'iOS & Android (Flutter) · 60+ Screens · 6 Languages · Live on App Store & Google Play' },
            ].map((item,i) => (
              <div key={item.label} style={{ paddingLeft:i>0?'24px':0, paddingRight:i<2?'24px':0, borderRight:i<2?'1px solid rgba(255,255,255,.07)':'none' }}>
                <div style={{ fontSize:'12px', color:'#A8A8A8', letterSpacing:'.13em', textTransform:'uppercase', marginBottom:'6px' }}>{item.label}</div>
                <div style={{ fontSize:'13px', color:'rgba(255,255,255,.58)', lineHeight:1.4, letterSpacing:'-0.1px' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:'absolute', bottom:'36px', right:'var(--page-padding)', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', animation:'fizik-fade-in 1s ease 1.5s both', zIndex:5 }}>
          <span style={{ fontSize:'12px', color:'#A8A8A8', letterSpacing:'.16em', textTransform:'uppercase', writingMode:'vertical-rl' }}>Scroll</span>
          <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom,rgba(255,255,255,.14),transparent)' }} />
        </div>
      </section>

      {/* ══ IMPACT AT A GLANCE ════════════════════════════════════ */}
      <FzHighlights id="fz-impact-title" title="Impact at a glance" items={[
        { lead:'Eliminated Specialist Bottlenecks', text:'Enabled retail staff with zero biomechanics training to run end-to-end custom saddle consultations and orders independently.' },
        { lead:'Scaled Globally',                   text:'Shipped across international dealer networks in 6 languages with near-zero recommendation logic failures in live retail environments.' },
        { lead:'Created Multi-Product Leverage',    text:'The workflow architecture and component system became the foundation for a second commercial product: an e-bike fitting app now in v2 (March 2026).' },
      ]} />

      {/* ══ BODY ══════════════════════════════════════════════════ */}
      <div className="fz-body-layout">

        {/* Sidebar */}
        <FzContentsBar items={navItems} />
        <aside className={`fz-sidebar${sidebarVisible?'':' fz-sidebar-hidden'}`} style={{ position:'fixed', right:0, top:'136px', zIndex:50, textAlign:'right' }}>
          <div style={{ fontSize:'12px', color:'#666666', letterSpacing:'.15em', textTransform:'uppercase', marginBottom:'18px' }}>Contents</div>
          {navItems.map(item => (
            <button key={item.id} className={`fz-nav-btn${activeSection===item.id?' fz-active':''}`} onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
        </aside>

        <main>

          {/* ── 01 PROBLEM ──────────────────────────────────── */}
          <section id="problem" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)', display:'flex', flexDirection:'column', gap:'4px' }}>
            <FzLabel n="01" text="The business problem" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>A Great Service That Couldn't Scale</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>Fizik launched a bespoke service allowing cyclists to order custom 3D-printed saddles tailored to their body geometry and riding data. While the physical product was compelling, the service had a fatal operational bottleneck at the point of sale: inconsistency.</FzBody>
            </div>
            <div style={{ marginTop:'var(--paragraph-spacing)' }}>
              <FzList items={[
                { text:'In stores with an experienced bike fitter, consultations were smooth and accurate.' },
                { text:'In stores without a specialist, staff struggled to interpret pressure data and navigate 121 saddle configurations, resulting in slow consultations, hesitant recommendations, and lost sales.' },
              ]} />
              <FzBody style={{ marginBottom:0 }}>To scale globally, Fizik didn't just need a catalog app. They needed a foolproof consultation engine that could guarantee service quality regardless of who was working the shop floor.</FzBody>
            </div>
            <div className="fz-diagram-img" style={{ marginTop:'40px' }}>
              <img src="Fizik-1diagram-problem.webp" alt="Service flow diagram" width="1672" height="444" decoding="async" loading="lazy" style={{ width:'100%', height:'auto', display:'block', borderRadius:'12px' }} />
            </div>
          </section>

          {/* ── 02 STRATEGY ─────────────────────────────────── */}
          <section id="strategy" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="02" text="Strategic bet" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px', marginBottom:'40px' }}>
              <FzHeading>Designing for the Floor Associate, Not the Expert</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>Research across Fizik's dealer network revealed two distinct user profiles:</FzBody>
            </div>

            <div className="fz-user-grid">
              {/* Type A */}
              <div className="fz-user-card fz-user-card-a">
                <div className="fz-user-eyebrow" style={{ color:'#666666' }}>User Type A</div>
                <h3 className="fz-user-name" style={{ color:'#1d1d1f' }}>Experienced Bike Fitters</h3>
                <div className="fz-user-divider" />
                <p className="fz-user-trait" style={{ color:'#666666' }}>Interpret pressure maps intuitively, know the 121-SKU catalog inside out, and want granular control and manual overrides.</p>
              </div>

              <div className="fz-vs-label" style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'17px', fontWeight:500, color:'rgba(29,29,31,.65)', textAlign:'center' }}>vs</div>

              {/* Type B: primary use case */}
              <div className="fz-user-card fz-user-card-b">
                <div className="fz-user-eyebrow" style={{ color:'#f5f5f7' }}>User Type B</div>
                <h3 className="fz-user-name" style={{ color:'#fff' }}>General Retail Staff</h3>
                <div className="fz-user-divider" style={{ background:'rgba(0,0,0,.12)' }} />
                <p className="fz-user-trait" style={{ color:'#f5f5f7' }}>Conduct live consultations with a customer standing beside them, cannot memorize complex fit logic, and need a fast, defensible answer they can explain with confidence.</p>
                <div className="fz-user-tags" style={{ marginTop:'20px' }}>
                  <span className="fz-user-tag" style={{ background:'#f5f5f7', color:'#1d1d1f' }}>Primary Target</span>
                </div>
              </div>
            </div>

            <FzBody style={{ marginTop:'40px', marginBottom:0 }}><FzLead>The Core Strategic Decision:</FzLead> Rather than building a flexible power-tool that pleased experts (Type A) but overwhelmed everyone else, I anchored v1 entirely around Type B. Raising the baseline reliability of everyday store staff had a far higher business ROI than optimizing for specialists who could already sell the service manually.</FzBody>
          </section>

          {/* ── 03 CONSTRAINTS ──────────────────────────────── */}
          <section id="constraints" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="03" text="Constraints" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>Real-World Constraints</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>Every interaction was shaped by four hard constraints:</FzBody>
            </div>
            <div className="fz-constraints-row">
              {[
                { title:'121-Variant Catalog Complexity',        body:'Filtering across geometry, materials, and fit profiles had to feel transparent and trustworthy, never like a "black box" algorithm.', Icon:IconBook },
                { title:'Live Hardware Sync',                    body:'The app had to pair with on-site pressure measurement hardware mid-consultation without breaking conversational flow.', Icon:IconHardware },
                { title:'High-Glare, Fast-Paced Retail Context', body:"Interfaces needed Fizik's premium aesthetic while remaining readable at arm's length with generous tap targets.", Icon:IconBrand },
                { title:'Flutter Engineering Reality',           body:'All transitions, hardware states, and cross-platform layouts (iOS/Android) were scoped to ship cleanly within Flutter\'s widget architecture.', Icon:IconCode },
              ].map((c,ci) => {
                const CIcon = c.Icon;
                return (
                  <div key={c.title} className="fz-card">
                    <div className="fz-card-icon" style={{ alignItems:'flex-start', gap:'10px' }}>
                      <h3 className="fz-card-title" style={{ marginBottom:0, lineHeight:1.3 }}>{c.title}</h3>
                      <CIcon />
                    </div>
                    <p className="fz-card-body">{c.body}</p>
                  </div>
                );
              })}
            </div>
          </section>

        </main>
      </div>

      {/* ══ 04 DECISIONS + FLOW ═══════════════════════════════════ */}
      <div className="fz-body-layout">
        <main>
          <section id="decisions" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="04" text="Decisions" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>Key Product & Design Decisions</FzHeading>
            </div>
            <div className="fz-decisions-grid">
              {[
                { n:'O1', title:'Locked Linear Flow Over Open Navigation',
                  tradeoff:'Experienced fitters prefer jumping freely between screens. However, open navigation in a live retail setting creates fatal data errors: staff skip steps, enter measurements out of order, and corrupt the final recommendation.',
                  decision:'I enforced a strict, linear step-by-step sequence with clear progress signposting. Expert users lost shortcut flexibility in v1, but every store gained a repeatable, error-proof consultation pipeline.' },
                { n:'O2', title:'Translating 121 SKUs into a "Defensible Trio"',
                  tradeoff:'Showing a filtered list of 15+ matching saddles still leaves a non-expert associate guessing. Showing only 1 option feels rigid if the customer dislikes the price or feel.',
                  decision:'Working alongside fitting specialists and engineers, I distilled raw pressure and anatomical inputs into 2 to 3 curated recommendations. Each card surfaced plain-language fit rationale (e.g., "Recommended for forward pelvic rotation + high sit-bone pressure") so staff could explain why a saddle fit without needing a biomechanics degree.' },
                { n:'O3', title:'Seamless Hardware Capture Inside the Consultation Flow',
                  tradeoff:'Treating pressure sensor pairing and capture as a separate "setup utility" caused friction and tempted busy staff to bypass hardware readings altogether.',
                  decision:'I embedded hardware pairing, live capture feedback, and validation directly as a native step inside the consultation sequence, automatically passing captured metrics straight into the recommendation engine.' },
                { n:'O4', title:'A "Retail-First" Design System',
                  tradeoff:null,
                  decision:"Instead of porting Fizik's dark, editorial marketing look (which fails under bright shop lighting), I built a high-contrast, touch-friendly component library in Figma mapped directly to Flutter widgets. It preserved brand restraint while prioritizing speed and legibility during live customer interactions." },
              ].map((d,di) => (
                <div key={d.n} className="fz-card">
                  <div className="fz-card-number">{d.n}</div>
                  <h3 className="fz-card-title" style={{ whiteSpace:'normal', lineHeight:1.3, fontSize:'15px' }}>{d.title}</h3>
                  {d.tradeoff && <p className="fz-card-body" style={{ marginTop:'4px' }}><FzLead>The Trade-off:</FzLead> {d.tradeoff}</p>}
                  <p className="fz-card-body" style={{ marginTop: d.tradeoff ? '10px' : '4px' }}><FzLead>The Decision:</FzLead> {d.decision}</p>
                  {d.n === 'O1' && (
                    <div style={{ marginTop:'auto', paddingTop:'12px', borderRadius:'16px', overflow:'hidden', background:'transparent' }}>
                      <img src="Fizik121/FIZIK-wireframe-screenshot02.webp" alt="Loaders" width="742" height="1487" decoding="async" loading="lazy" style={{ width:'100%', height:'auto', display:'block', borderRadius:'16px', background:'transparent' }} />
                    </div>
                  )}
                  {d.n === 'O2' && (
                    <div style={{ marginTop:'auto', paddingTop:'12px', borderRadius:'16px', overflow:'hidden', background:'transparent' }}>
                      <img src="Fizik121/saddle-selection-1.webp" alt="Saddle Selection" width="742" height="1478" decoding="async" loading="lazy" style={{ width:'100%', height:'auto', display:'block', borderRadius:'16px', background:'transparent' }} />
                    </div>
                  )}
                  {d.n === 'O3' && (
                    <div style={{ width:'100%', maxWidth:'380px', margin:'auto auto 0', paddingTop:'12px', borderRadius:'64px', overflow:'hidden' }}>
                      <video autoPlay loop muted playsInline style={{ display:'block', width:'100%', borderRadius:'64px' }}>
                        <source src="measurement.mp4" type="video/mp4" />
                      </video>
                    </div>
                  )}
                  {d.n === 'O4' && (
                    <div style={{ marginTop:'auto', paddingTop:'12px', borderRadius:'16px', overflow:'hidden', background:'transparent' }}>
                      <img src="Fizik121/FIZIK-final-screenshot04.webp" alt="Fizik 121 questionnaire screen" width="742" height="1449" decoding="async" loading="lazy" style={{ width:'100%', height:'auto', display:'block', borderRadius:'16px', background:'transparent' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* ══ FLOW ══════════════════════════════════════════════════ */}
      <div data-snap style={{ background:'#fff', padding:'var(--section-spacing-sm) var(--page-padding)', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div className="fz-flow-img" style={{ width:'100%', maxWidth:'1178px' }}>
          <img src="Fizik121/kit-order-flow.webp" alt="KIT order user flow" width="2000" height="914" decoding="async" loading="lazy" style={{ width:'100%', height:'auto', display:'block', borderRadius:'8px' }} />
          <div className="fz-caption">System Architecture: End-to-end consultation and hardware capture flow mapped prior to UI execution to eliminate dead ends.</div>
        </div>
      </div>

      {/* ══ 05 OUTCOME + 06 REFLECTION ════════════════════════════ */}
      <div className="fz-body-layout">
        <section id="outcome" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
          <FzLabel n="05" text="Outcome" />
          <div style={{ display:'flex', flexDirection:'column', gap:'64px', marginBottom:'28px' }}>
            <FzHeading>Outcome & Multi-Product Legacy</FzHeading>
          </div>
          <FzList items={[
            { lead:'Reliable Store-Level Execution', text:"Validated by Fizik's in-house fitting technicians, the platform enabled dealers to run end-to-end custom orders independently with minimal logic failures." },
            { lead:'Global Production Rollout',      text:"Live on iOS and Android across 60+ screens and 6 languages, actively used by Fizik's international dealer network." },
            { lead:'Architectural Reuse (2026)',     text:'The consultation workflow, hardware-sync patterns, and component system proved durable enough to power a second commercial product: an e-bike saddle pressure app (now in v2 as of March 2026).' },
          ]} />
          <div className="fz-diagram-img" style={{ marginTop:'40px', textAlign:'center', background:'transparent' }}>
            <img src="Fizik121/your-custom-saddle.webp" alt="Your Customized Saddle" width="760" height="1512" decoding="async" loading="lazy" style={{ width:'100%', maxWidth:'380px', maxHeight:'500px', height:'auto', objectFit:'contain', display:'block', margin:'0 auto', borderRadius:'12px', background:'transparent' }} />
          </div>
        </section>

        {/* ── 06 REFLECTION ─────────────────────────────────── */}
        <section id="reflection" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-md)' }}>
          <FzLabel n="06" text="Reflection" />
          <div style={{ display:'flex', flexDirection:'column', gap:'64px', marginBottom:'28px' }}>
            <FzHeading>What I'd Build Next</FzHeading>
            <FzBody animSub style={{ marginBottom:0 }}>While locking the flow solved the consistency problem for general staff, experienced fitters (Type A) occasionally felt boxed in when their intuition differed from the algorithm's top pick.</FzBody>
          </div>
          <FzBody style={{ marginBottom:0 }}>In the next iteration, I would introduce a "Progressive Disclosure / Expert Mode" on the final recommendation screen, allowing certified fitters to inspect the underlying pressure thresholds and manually swap variables with an audit trail, without cluttering the default path for everyday associates.</FzBody>
        </section>
      </div>

      {/* ══ 08 FOOTER ═════════════════════════════════════════════ */}
      <div data-snap style={{ background:'#0c0c0c', position:'relative', overflow:'hidden', minHeight:'380px' }}>
        <div style={{ position:'relative', zIndex:2, padding:'var(--section-spacing-sm) var(--page-padding)', display:'flex', flexDirection:'column' }}>
          <div style={{ fontSize:'12px', color:'#A8A8A8', letterSpacing:'1.5px', textTransform:'uppercase', fontFamily:"'DM Sans',system-ui,sans-serif", marginBottom:'40px' }}>
            Next project
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', flex:1 }}>
            <button className="fz-next-title" onClick={() => goTo('fleetwatch')} style={{ display:'block', textAlign:'right' }}>
              → Next Project
            </button>
            <div style={{ fontSize:'clamp(14px,1.8vw,24px)', color:'#A8A8A8', fontFamily:"'DM Sans',system-ui,sans-serif", letterSpacing:'-0.374px', marginTop:'8px', textAlign:'right' }}>
              Fleetwatch Cockpit
            </div>
          </div>
          <div style={{ marginTop:'48px' }}>
            <button className="tap-target" onClick={() => goToWork()} style={{ background:'none', border:'1px solid rgba(255,255,255,.12)', borderRadius:'9999px', padding:'10px 20px', color:'#A8A8A8', fontSize:'13px', letterSpacing:'.03em', cursor:'pointer', fontFamily:"'DM Sans',system-ui,sans-serif", transition:'color .2s,border-color .2s' }}
              onMouseEnter={e => { e.currentTarget.style.color='rgba(255,255,255,.7)'; e.currentTarget.style.borderColor='rgba(255,255,255,.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='#A8A8A8'; e.currentTarget.style.borderColor='rgba(255,255,255,.12)'; }}
            >← Back to all work</button>
          </div>
        </div>
      </div>

    </div>
  );
};

Object.assign(window, { CaseStudyFizik, CaseSection, WordReveal, FzLabel, FzHeading, FzBody, FzLead, FzList, FzHighlights, FzContents, FzContentsBar, VideoBlock });

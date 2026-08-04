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
      font-family:'DM Sans',system-ui,sans-serif; font-size:11px;
      letter-spacing:.09em; text-transform:uppercase; font-weight:400;
      color:rgba(0,0,0,0.25); background:none; border:none; padding:9px 0;
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
    .fz-sidebar.fz-sidebar-hidden { opacity:0; pointer-events:none; transform:translateX(12px); }

    .fz-back-btn {
      background:none; border:none; padding:0; color:rgba(255,255,255,0.35);
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
      line-height:26px; letter-spacing:-0.2px; color:rgba(182,59,59,0.7); margin-bottom:2px;
    }
    .fz-card-title {
      font-family:'Space Grotesk',system-ui,sans-serif; font-size:15px; font-weight:500;
      line-height:26px; letter-spacing:-0.2px; color:#1d1d1f; margin-bottom:4px;
    }
    .fz-card-body {
      font-family:'DM Sans',system-ui,sans-serif; font-size:11px; font-weight:400;
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
      font-family:'DM Sans',system-ui,sans-serif; font-size:11px; font-weight:400;
      line-height:16.5px; letter-spacing:1.1px; text-transform:uppercase;
    }
    .fz-user-name {
      font-family:'Space Grotesk',system-ui,sans-serif; font-size:21px; font-weight:500;
      line-height:26px; letter-spacing:-0.2px; margin-top:8px; margin-bottom:14px;
    }
    .fz-user-divider { height:1px; background:rgba(29,29,31,0.38); margin-bottom:14px; }
    .fz-user-trait   { font-family:'DM Sans',system-ui,sans-serif; font-size:15px; font-weight:400; line-height:23.25px; }
    .fz-user-needs-label {
      font-family:'DM Sans',system-ui,sans-serif; font-size:11px; font-weight:400;
      line-height:16.5px; letter-spacing:1.1px; text-transform:uppercase;
      margin-top:20px; margin-bottom:10px;
    }
    .fz-user-tags    { display:flex; flex-wrap:wrap; gap:8px; }
    .fz-user-tag {
      font-family:'DM Sans',system-ui,sans-serif; font-size:11px; font-weight:400;
      line-height:16.5px; letter-spacing:0.44px; border-radius:6px;
      padding:4px 9px; border:1px solid rgba(29,29,31,0.38);
    }
    .fz-user-footnote {
      font-family:'DM Sans',system-ui,sans-serif; font-size:15px; font-weight:400;
      line-height:1.6; letter-spacing:-0.2px; margin-top:20px;
    }
    .fz-user-caption {
      font-family:'DM Sans',system-ui,sans-serif; font-size:13px; font-weight:400;
      line-height:1.6; letter-spacing:-0.1px; color:#888780; text-align:center;
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
      font-family:'DM Sans',system-ui,sans-serif; font-size:13px; color:#888780;
      letter-spacing:-0.1px; text-align:center; margin-top:16px;
    }

    /* ── Next project button ── */
    .fz-next-title {
      font-size:clamp(28px,4vw,56px); font-weight:700; color:rgba(255,255,255,0.15);
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

    @media (max-width:900px) {
      .fz-body-layout  { padding-top:64px !important; }
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
        <div style={{ fontSize:'11px', fontWeight:400, color:'#a63636', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'16px', fontFamily:"'DM Sans',system-ui,sans-serif" }}>{section.label}</div>
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
    { id:'users',       label:'Users' },
    { id:'constraints', label:'Constraints' },
    { id:'decisions',   label:'Decisions' },
    { id:'outcome',     label:'Outcome' },
    { id:'legacy',      label:'Legacy' },
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
    const ids = ['problem', 'users', 'constraints', 'decisions', 'outcome', 'legacy', 'reflection'];
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
          <button className="fz-back-btn" onClick={() => goToWork()}>← All work</button>
        </div>
        <div style={{ position:'absolute', top:'52px', right:'var(--page-padding)', fontSize:'10px', color:'rgba(255,255,255,.18)', letterSpacing:'.14em', textTransform:'uppercase', animation:'fizik-fade-in .7s ease .3s both', zIndex:10 }}>
          Case study: 01 / 02
        </div>

        <div style={{ position:'relative', zIndex:5 }}>
          <div style={{ fontSize:'11px', color:'rgba(255,255,255,.3)', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:'36px', animation:'fizik-fade-up .7s cubic-bezier(.16,1,.3,1) .35s both' }}>
            B2B Retail Tech &nbsp;·&nbsp; Hardware + Software &nbsp;·&nbsp; 0→1 Product
          </div>
          <div style={{ marginBottom:'44px' }}>
            <WordReveal text="Fizik 121" startDelay={0.48} wordDelay={0.1} style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(52px,10vw,124px)', fontWeight:700, lineHeight:0.93, letterSpacing:'-0.035em', color:'#fff', marginBottom:'4px' }} />
            <WordReveal text="Platform"  startDelay={0.65} wordDelay={0.1} style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(52px,10vw,124px)', fontWeight:700, lineHeight:0.93, letterSpacing:'-0.035em', color:'rgba(255,255,255,.2)' }} />
          </div>
          <div style={{ fontSize:'clamp(15px,1.8vw,19px)', color:'rgba(255,255,255,.46)', maxWidth:'460px', lineHeight:1.62, letterSpacing:'-0.2px', marginBottom:'56px', animation:'fizik-fade-up .85s cubic-bezier(.16,1,.3,1) .9s both', textWrap:'pretty' }}>
            Designing the tool that makes a personalized saddle service work reliably at the point of sale, for staff at any level of expertise.
          </div>
          <div className="fz-meta-bar">
            {[
              { label:'Role',     value:'Sole Product Designer' },
              { label:'Scope',    value:'Strategy · UX · UI · Design System · Handoff' },
              { label:'Industry', value:'Retail Tech · Sports' },
              { label:'Output',   value:'Flutter · 6 Languages' },
            ].map((item,i) => (
              <div key={item.label} style={{ paddingLeft:i>0?'24px':0, paddingRight:i<3?'24px':0, borderRight:i<3?'1px solid rgba(255,255,255,.07)':'none' }}>
                <div style={{ fontSize:'10px', color:'rgba(255,255,255,.2)', letterSpacing:'.13em', textTransform:'uppercase', marginBottom:'6px' }}>{item.label}</div>
                <div style={{ fontSize:'13px', color:'rgba(255,255,255,.58)', lineHeight:1.4, letterSpacing:'-0.1px' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:'absolute', bottom:'36px', right:'var(--page-padding)', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', animation:'fizik-fade-in 1s ease 1.5s both', zIndex:5 }}>
          <span style={{ fontSize:'9px', color:'rgba(255,255,255,.18)', letterSpacing:'.16em', textTransform:'uppercase', writingMode:'vertical-rl' }}>Scroll</span>
          <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom,rgba(255,255,255,.14),transparent)' }} />
        </div>
      </section>

      {/* ══ BODY ══════════════════════════════════════════════════ */}
      <div className="fz-body-layout">

        {/* Sidebar */}
        <aside className={`fz-sidebar${sidebarVisible?'':' fz-sidebar-hidden'}`} style={{ position:'fixed', right:0, top:'136px', zIndex:50, textAlign:'right' }}>
          <div style={{ fontSize:'9px', color:'rgba(0,0,0,.2)', letterSpacing:'.15em', textTransform:'uppercase', marginBottom:'18px' }}>Contents</div>
          {navItems.map(item => (
            <button key={item.id} className={`fz-nav-btn${activeSection===item.id?' fz-active':''}`} onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
        </aside>

        <main>

          {/* ── 01 PROBLEM ──────────────────────────────────── */}
          <section id="problem" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)', display:'flex', flexDirection:'column', gap:'4px' }}>
            <FzLabel n="01" text="The problem" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>A service that couldn't scale without the right tool.</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>Fizik launched a service that lets cyclists receive a saddle personalized to their body geometry and riding data, custom 3D-printed based on in-store measurements. The service concept was strong. But for it to work in real retail environments, it needed a digital tool that didn't yet exist.</FzBody>
            </div>
            <div className="fz-diagram-img" style={{ marginTop:'12px' }}>
              <img src="Fizik-1diagram-problem.png" alt="Service flow diagram" style={{ width:'100%', display:'block', borderRadius:'12px' }} />
            </div>
          </section>

          {/* ── 02 USERS ────────────────────────────────────── */}
          <section id="users" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="02" text="Users & context" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px', marginBottom:'40px' }}>
              <FzHeading>Designed for the full range of staff expertise, not the best-case user.</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>The primary users were bike shop staff, not product engineers or biomechanics specialists. Some had deep technical knowledge of bike fitting. Many did not.</FzBody>
            </div>

            <div className="fz-user-grid">
              {/* Type A */}
              <div className="fz-user-card fz-user-card-a">
                <div className="fz-user-eyebrow" style={{ color:'rgba(29,29,31,.55)' }}>User Type A</div>
                <div className="fz-user-name"    style={{ color:'#1d1d1f' }}>Experienced fitter</div>
                <div className="fz-user-divider" />
                {['Reads measurement data intuitively','Navigates 121 options confidently','Builds recommendation from experience'].map(t => (
                  <div key={t} className="fz-user-trait" style={{ color:'rgba(29,29,31,.55)' }}>{t}</div>
                ))}
                <div className="fz-user-needs-label" style={{ color:'rgba(29,29,31,.55)' }}>Needs from the platform</div>
                <div className="fz-user-tags">
                  {['Flexibility','Depth','Override'].map(tag => (
                    <span key={tag} className="fz-user-tag" style={{ background:'rgba(0,0,0,.08)', color:'#1d1d1f' }}>{tag}</span>
                  ))}
                </div>
                <div className="fz-user-footnote" style={{ color:'#a63636' }}>↓ Lower priority in v1 design</div>
              </div>

              <div className="fz-vs-label" style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'17px', fontWeight:500, color:'rgba(29,29,31,.65)', textAlign:'center' }}>vs</div>

              {/* Type B */}
              <div className="fz-user-card fz-user-card-b">
                <div className="fz-user-eyebrow" style={{ color:'#f5f5f7' }}>User Type B</div>
                <div className="fz-user-name"    style={{ color:'#fff' }}>Less experienced staff</div>
                <div className="fz-user-divider" style={{ background:'rgba(0,0,0,.12)' }} />
                {['Live consultation, customer present',"Can't hold full product logic in mind",'Needs a defensible answer to explain'].map(t => (
                  <div key={t} className="fz-user-trait" style={{ color:'#f5f5f7' }}>{t}</div>
                ))}
                <div className="fz-user-needs-label" style={{ color:'#f5f5f7' }}>Needs from the platform</div>
                <div className="fz-user-tags">
                  {['Guided steps','Clear output'].map(tag => (
                    <span key={tag} className="fz-user-tag" style={{ background:'#f5f5f7', color:'#1d1d1f' }}>{tag}</span>
                  ))}
                </div>
                <div className="fz-user-footnote" style={{ color:'#fff' }}>↑ Primary use case · drove all decisions</div>
              </div>
            </div>

            <div className="fz-user-caption">Designing for type B was the core structural decision. Type A is the next iteration.</div>
            <FzBody style={{ marginTop:'40px' }}>The failure mode was not that the service was unavailable. It was inconsistent. Good in some stores, unreliable in others. That inconsistency was what the platform had to solve.</FzBody>
          </section>

          {/* ── 03 CONSTRAINTS ──────────────────────────────── */}
          <section id="constraints" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="03" text="Constraints" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>Four constraints that shaped every design decision.</FzHeading>
            </div>
            <div className="fz-constraints-row">
              {[
                { title:'Catalog complexity',   body:'121 saddle variants, differentiated by geometry, material, and fit profile. Filtering logic had to be rigorous, but the result had to feel trustworthy, not algorithmically arbitrary.', Icon:IconBook },
                { title:'Hardware integration', body:'The platform connected with on-site pressure measurement devices. Data capture had to embed in the consultation flow without creating a separate technical step.', Icon:IconHardware },
                { title:'Brand context',        body:"Fizik is a premium cycling brand. The interface had to feel consistent with that positioning while remaining fast and legible in a live, customer-facing environment.", Icon:IconBrand },
                { title:'Flutter delivery',     body:'Built in Flutter. Design decisions needed to be grounded in what Flutter could realistically support, shaping interaction choices through to handoff.', Icon:IconCode },
              ].map((c,ci) => {
                const CIcon = c.Icon;
                return (
                  <div key={c.title} className="fz-card">
                    <div className="fz-card-icon">
                      <span className="fz-card-title" style={{ marginBottom:0 }}>{c.title}</span>
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

      {/* ══ 04 DECISIONS + 04-2 FLOW ══════════════════════════════ */}
      <div className="fz-body-layout">
        <main>
          <section id="decisions" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="04" text="Key design decisions" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>Four decisions that defined the product.</FzHeading>
            </div>
            <div className="fz-decisions-grid">
              {[
                { n:'O1', title:'A guided linear flow, not a flexible navigation model.', body:'A flexible model would have felt more powerful to experienced fitters. But in a live consultation, an open navigation structure creates risk: steps get missed, data gets entered out of order, the recommendation loses integrity. I chose a guided, step-by-step flow that locked the sequence while keeping each step short and focused. The trade-off was reduced flexibility for expert users. The benefit was a consistent, reliable process any staff member could follow without prior training.' },
                { n:'O2', title:'Translating 121 options into a recommendation the staff can explain.', body:'A catalog of 121 saddles is not a useful output for a customer-facing consultation. I worked with the team to define filtering criteria that actually mattered for fit: rider geometry from measurement data, riding style, and key anatomical inputs. The UI surfaced two to three recommended options with clear differentiation, each presented with fit rationale attached.' },
                { n:'O3', title:'Embedding measurement data capture inside the workflow.', body:'Pressure and geometry data from the measurement hardware was essential to the recommendation. If data capture felt like a separate technical step, it would create friction and risk being skipped. I designed the measurement step as an integrated stage within the guided flow. The UI acknowledged the hardware, guided staff through the capture process, and immediately used the data to progress the workflow.' },
                { n:'O4', title:'A design system built for retail, not marketing.', body:"Fizik's brand is premium: clean, restrained, high quality. But legibility in a retail environment required high contrast, generous tap targets, and minimal visual noise. The resolution was a design system built on Fizik's brand palette but with UI decisions tuned for the retail context. The interface feels premium without being precious." },
              ].map((d,di) => (
                <div key={d.n} className="fz-card">
                  <div className="fz-card-number">{d.n}</div>
                  <div className="fz-card-title" style={{ whiteSpace:'normal', lineHeight:1.3, fontSize:'15px' }}>{d.title}</div>
                  <p className="fz-card-body" style={{ marginTop:'4px' }}>{d.body}</p>
                  {d.n === 'O1' && (
                    <div style={{ marginTop:'12px', borderRadius:'16px', overflow:'hidden', background:'transparent' }}>
                      <img src="Fizik121/FIZIK-wireframe-screenshot02.png" alt="Loaders" style={{ width:'100%', display:'block', borderRadius:'16px', background:'transparent' }} />
                    </div>
                  )}
                  {d.n === 'O2' && (
                    <div style={{ marginTop:'12px', borderRadius:'16px', overflow:'hidden', background:'transparent' }}>
                      <img src="Fizik121/Saddle selection 1.png" alt="Saddle Selection" style={{ width:'100%', display:'block', borderRadius:'16px', background:'transparent' }} />
                    </div>
                  )}
                  {d.n === 'O3' && (
                    <div style={{ width:'100%', maxWidth:'380px', margin:'12px auto 0', borderRadius:'64px', overflow:'hidden' }}>
                      <video autoPlay loop muted playsInline style={{ display:'block', width:'100%', borderRadius:'64px' }}>
                        <source src="measurement.mp4" type="video/mp4" />
                      </video>
                    </div>
                  )}
                  {d.n === 'O4' && (
                    <div style={{ marginTop:'12px', borderRadius:'16px', overflow:'hidden', background:'transparent' }}>
                      <img src="Fizik121/FIZIK-final-screenshot04.png" alt="Fizik 121 questionnaire screen" style={{ width:'100%', display:'block', borderRadius:'16px', background:'transparent' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* ══ 04-2 FLOW ═════════════════════════════════════════════ */}
      <div data-snap style={{ background:'#fff', padding:'var(--section-spacing-sm) var(--page-padding)', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div className="fz-flow-img" style={{ width:'100%', maxWidth:'1178px' }}>
          <img src="Fizik121/KIT ORDER FLOW.png" alt="KIT order user flow" style={{ width:'100%', display:'block', borderRadius:'8px' }} />
          <div className="fz-caption">KIT order user flow, mapped before any screen was designed</div>
        </div>
      </div>

      {/* ══ 05 OUTCOME ════════════════════════════════════════════ */}
      <div className="fz-body-layout">
        <section id="outcome" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
          <FzLabel n="05" text="Outcome" />
          <div style={{ display:'flex', flexDirection:'column', gap:'64px', marginBottom:'28px' }}>
            <FzHeading>The platform delivered on its core product goal.</FzHeading>
            <FzBody animSub style={{ marginBottom:0 }}>The platform delivered on its core product goal: enabling dealers to run the complete custom saddle service end-to-end without a specialist present.</FzBody>
          </div>
          <FzBody>Feedback from an in-house bike fitting technician confirmed the platform served its purpose. The recommendation logic ran with minimal failures, and the guided workflow gave dealers a reliable, repeatable process regardless of prior fitting experience. For a service that had previously depended on individual expertise, that consistency was the prerequisite for it working at scale.</FzBody>
          <FzBody>The platform supports six languages, reflecting the international scope of Fizik's dealer network.</FzBody>
          <FzBody>Market rollout was shaped by business and go-to-market decisions rather than product readiness. The platform was operationally ready. The design delivered what it was asked to deliver.</FzBody>
          <div className="fz-diagram-img" style={{ marginTop:'12px', textAlign:'center', background:'transparent' }}>
            <img src="Fizik121/your custom saddle.png" alt="Your Customized Saddle" style={{ width:'100%', maxWidth:'380px', maxHeight:'500px', height:'auto', objectFit:'contain', display:'block', margin:'0 auto', borderRadius:'12px', background:'transparent' }} />
          </div>
        </section>
      </div>

      {/* ══ 06 LEGACY ═════════════════════════════════════════════ */}
      <div className="fz-body-layout">
        <section id="legacy" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
          <FzLabel n="06" text="Product legacy" />
          <div style={{ display:'flex', flexDirection:'column', gap:'64px', marginBottom:'28px' }}>
            <FzHeading>Design decisions that travelled to a second product.</FzHeading>
            <FzBody animSub style={{ marginBottom:0 }}>The Fizik 121 Platform did not stay a standalone project. The design system and product thinking developed here directly informed a second product: a gebioMized saddle pressure app for electric bike fitting dealers, now in its second version as of March 2026, optimised for tablet and mobile.</FzBody>
          </div>
          <FzBody>The interaction patterns, component logic, and workflow structure from Fizik 121 proved reusable in a related but distinct product context. The design decisions were grounded well enough to travel.</FzBody>
        </section>

        {/* ── 07 REFLECTION ─────────────────────────────────── */}
        <section id="reflection" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-md)' }}>
          <FzLabel n="07" text="What I'd do differently" />
          <div style={{ display:'flex', flexDirection:'column', gap:'32px', marginBottom:'32px' }}>
            <FzHeading>One thing I'd revisit.</FzHeading>
          </div>
          <div className="fz-quote-card">
            <p style={{ fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:'clamp(16px,2vw,21px)', fontWeight:400, lineHeight:1.68, letterSpacing:'-0.25px', color:'rgba(255,255,255,.62)', textWrap:'pretty' }}>
              "The recommendation output worked well for its primary purpose, but I'd want to revisit how it serves the most experienced fitters, the ones who know why they disagree with a suggestion and need the flexibility to override it with confidence. A next iteration should explore how to give expert users more transparent access to the underlying logic without adding complexity for everyone else."
            </p>
          </div>
        </section>
      </div>

      {/* ══ 08 FOOTER ═════════════════════════════════════════════ */}
      <div data-snap style={{ background:'#0c0c0c', position:'relative', overflow:'hidden', minHeight:'380px' }}>
        <div style={{ position:'relative', zIndex:2, padding:'var(--section-spacing-sm) var(--page-padding)', display:'flex', flexDirection:'column' }}>
          <div style={{ fontSize:'10px', color:'rgba(255,255,255,.2)', letterSpacing:'1.5px', textTransform:'uppercase', fontFamily:"'DM Sans',system-ui,sans-serif", marginBottom:'40px' }}>
            Next project
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', flex:1 }}>
            <button className="fz-next-title" onClick={() => goTo('footcare')} style={{ display:'block', textAlign:'right' }}>
              → Next Project
            </button>
            <div style={{ fontSize:'clamp(14px,1.8vw,24px)', color:'rgba(255,255,255,.2)', fontFamily:"'DM Sans',system-ui,sans-serif", letterSpacing:'-0.374px', marginTop:'8px', textAlign:'right' }}>
              Preventive Foot Care Platform
            </div>
          </div>
          <div style={{ marginTop:'48px' }}>
            <button onClick={() => goToWork()} style={{ background:'none', border:'1px solid rgba(255,255,255,.12)', borderRadius:'9999px', padding:'10px 20px', color:'rgba(255,255,255,.35)', fontSize:'13px', letterSpacing:'.03em', cursor:'pointer', fontFamily:"'DM Sans',system-ui,sans-serif", transition:'color .2s,border-color .2s' }}
              onMouseEnter={e => { e.currentTarget.style.color='rgba(255,255,255,.7)'; e.currentTarget.style.borderColor='rgba(255,255,255,.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,.35)'; e.currentTarget.style.borderColor='rgba(255,255,255,.12)'; }}
            >← Back to all work</button>
          </div>
        </div>
      </div>

    </div>
  );
};

Object.assign(window, { CaseStudyFizik, CaseSection, WordReveal, FzLabel, FzHeading, FzBody, VideoBlock });

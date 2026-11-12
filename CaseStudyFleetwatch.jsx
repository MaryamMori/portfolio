// CaseStudyFleetwatch.jsx: Fleetwatch Cockpit case study.
// Built on the Fizik template: reuses the fz-* styles and the WordReveal, FzLabel,
// FzHeading and FzBody helpers that CaseStudyFizik.jsx puts on window.

if (!document.getElementById('fw-case-styles')) {
  const s = document.createElement('style');
  s.id = 'fw-case-styles';
  s.textContent = `
    /* Screens: fixed 16:10 ratio from the width/height attributes, so nothing jumps while loading */
    .fw-shot {
      width:100%; height:auto; display:block; border-radius:12px;
      border:1px solid rgba(0,0,0,0.08); background:#f5f5f7;
    }
    /* Trade-off line: same treatment as the Foot Care page, sized for the decision cards */
    .fw-tradeoff {
      font-family:'DM Sans',system-ui,sans-serif; font-size:11px; line-height:1.5;
      color:#777; margin-top:12px; padding-left:14px; border-left:2px solid #e0ddd8;
    }
    .fw-card-figure { margin-top:auto; padding-top:16px; }
    .fw-card-figure + .fw-card-figure { margin-top:0; }
    .fw-card-figure .fz-caption { font-size:11px; line-height:1.5; margin-top:10px; }
    .fw-measures-row { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:56px; }
    .fw-note {
      font-family:'DM Sans',system-ui,sans-serif; font-size:var(--caption-font-size);
      line-height:var(--caption-line-height); letter-spacing:-0.1px; color:#888780;
    }
    .fw-note a { color:#a63636; text-decoration:underline; text-underline-offset:3px; cursor:pointer; }
    .fw-note a:hover { color:#1d1d1f; }
    @media (max-width:900px) {
      .fw-measures-row { grid-template-columns:1fr !important; }
    }
  `;
  document.head.appendChild(s);
}

// Icons for the constraint cards (same size and stroke as the Fizik ones)
const FwIconBase = ({ children }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(29,29,31,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
    {children}
  </svg>
);
const FwIconDensity = () => (
  <FwIconBase><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></FwIconBase>
);
const FwIconUncertainty = () => (
  <FwIconBase><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></FwIconBase>
);
const FwIconBlindSpots = () => (
  <FwIconBase><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></FwIconBase>
);
const FwIconTime = () => (
  <FwIconBase><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></FwIconBase>
);

// Screen with caption. Source files are 2880 x 1800 (2x of a 1440 x 900 frame).
const FwFigure = ({ src, alt, caption, eager }) => (
  <React.Fragment>
    <img className="fw-shot" src={src} alt={alt} width="2880" height="1800" loading={eager ? 'eager' : 'lazy'} decoding="async" />
    {caption && <div className="fz-caption">{caption}</div>}
  </React.Fragment>
);

// ═══════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════
const CaseStudyFleetwatch = ({ goTo, goToWork }) => {
  const { useState, useEffect, useRef } = React;
  const [activeSection, setActiveSection] = useState('problem');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const containerRef = useRef(null);

  const navItems = [
    { id:'problem',     label:'Problem' },
    { id:'users',       label:'Users' },
    { id:'constraints', label:'Constraints' },
    { id:'decisions',   label:'Decisions' },
    { id:'process',     label:'How I worked' },
    { id:'measures',    label:'Measures' },
    { id:'next-steps',  label:'Next steps' },
  ];

  useEffect(() => {
    // Sidebar active-section tracking
    const secEls = document.querySelectorAll('.fz-section');
    const sObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.2 });
    secEls.forEach(el => sObs.observe(el));

    const handleScroll = () => {
      const first = document.getElementById('problem');
      const last  = document.getElementById('next-steps');
      if (!first || !last) return;
      setSidebarVisible(
        first.getBoundingClientRect().top < window.innerHeight * 0.9 &&
        last.getBoundingClientRect().bottom > 0
      );
    };
    window.addEventListener('scroll', handleScroll, { passive:true });
    handleScroll();

    return () => {
      sObs.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Section heading+subtitle blocks: same scroll-reveal as the other case studies
  useEffect(() => {
    if (typeof gsap === 'undefined') return;
    const ctx = gsap.context(() => {
      navItems.forEach(item => {
        const el = document.getElementById(item.id);
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

  // "available on request" goes to the contact section on the home page
  const goToContact = e => {
    e.preventDefault();
    goTo('home');
    setTimeout(() => {
      const el = document.getElementById('get-in-touch');
      if (el) el.scrollIntoView({ behavior:'smooth' });
    }, 100);
  };

  const constraints = [
    { title:'Density',     body:'51 open findings. The design had to work at 51, not at 11.', Icon:FwIconDensity },
    { title:'Uncertainty', body:'About one in five inferred findings is wrong, so the tool can never present them as facts.', Icon:FwIconUncertainty },
    { title:'Blind spots', body:'22 vehicles have no telematics, 6 devices have gone silent, and workshop records are patchy at two of three depots.', Icon:FwIconBlindSpots },
    { title:'Time',        body:'The brief suggested 4 to 6 hours. I used 8, over one weekend.', Icon:FwIconTime },
  ];

  const decisions = [
    {
      n:'O1',
      title:'A cockpit that shows three decisions, not 51 findings.',
      body:'Showing everything would recreate the overload that killed her previous tool. I ranked findings by consequence: legal and safety first, then time-sensitive money, then impact with a clear next step. The cockpit shows the top three. A bar points to two more decisions for the week, and 39 small findings are grouped by type. Data coverage has its own card, because missing data changes how far she can trust everything else.',
      tradeoff:'Trade-off: lower-ranked findings are not visible at first glance. Counts and a full list keep them one click away.',
      figures:[
        { src:'assets/fleetwatch/fleetwatch-all-findings.png', alt:'Full list of all 51 findings', caption:'All 51 findings in the same order as the cockpit. Filters change this list only, never the cockpit.' },
      ],
    },
    {
      n:'O2',
      title:'Evidence before action, and two separate scales for trust.',
      body:'Confidence (inferred, confirmed, verified) and status (new, confirmed, resolved, ruled out, withdrawn) are different things, so I kept them apart on screen. There is no one-click confirm on the cockpit, because it would teach her to trust the system without checking. A finding opens with its evidence and the two explanations the data cannot tell apart. When she confirms, confidence rises to Confirmed, never to Verified. Verified needs a record.',
      tradeoff:'Trade-off: two scales to learn and an extra step before acting. I accepted both to keep trust honest.',
      figures:[
        { src:'assets/fleetwatch/fleetwatch-evidence-and-decision.png', alt:'Finding detail with evidence and decision options', caption:'A finding opens with its evidence and two explanations the data cannot tell apart.' },
      ],
    },
    {
      n:'O3',
      title:'Hand-over for people who never log in.',
      body:'Every finding ends in one of four outcomes: hand over, confirm as real, rule out or defer. Hand-over drafts an editable message and sends it by email, printout or phone note. The workshop lead gets a one-page evidence sheet. The dispatchers get plain language and dates, with no blame. The finding moves to "In hand", replies attach to it, and the tool prompts her again on the follow-up date.',
      tradeoff:'Trade-off: an answer given by phone or on paper does not return to the finding by itself. I listed this as an open question.',
      figures:[
        { src:'assets/fleetwatch/fleetwatch-hand-over.png', alt:'Hand-over screen with an editable message', caption:'Hand-over: an editable message for each person, sent by email, printout or phone note.' },
      ],
    },
    {
      n:'O4',
      title:'Findings that live for months.',
      body:'When a ruled-out pattern returns, the tool shows her earlier reason next to the new evidence and suggests "Known cause, keep watching" instead of asking her to rule it out again. When the system withdraws a finding, it says what changed and keeps it on record. Withdrawn is not the same as resolved. A finding open for 18 months is flagged for review, but age alone never moves it into the top three.',
      tradeoff:'Trade-off: more states and rules to design and explain. I put them in one table of lifecycle rules.',
      figures:[
        { src:'assets/fleetwatch/fleetwatch-finding-comes-back.png', alt:'Returned finding with the earlier decision', caption:'A finding that came back: the earlier decision stays next to the new evidence.' },
        { src:'assets/fleetwatch/fleetwatch-lifecycle-rules.png', alt:'Table of lifecycle rules for findings', caption:'Lifecycle rules: how findings come back, get withdrawn or go stale.' },
      ],
    },
  ];

  const measures = [
    { title:'Repeated use',        body:'She still opens it on Monday and Thursday after her third visit, and can name her priorities without browsing the full list.' },
    { title:'Decision completion', body:'Most findings that need her attention get an outcome within seven days.' },
    { title:'Trust',               body:'Fewer findings are ruled out again and again, and her decisions line up better with the evidence.' },
  ];

  return (
    <div ref={containerRef} style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:'#fafafa', minHeight:'100vh' }}>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section data-snap style={{ minHeight:'100vh', background:'#0c0c0c', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'var(--page-padding)', paddingTop:'96px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)', backgroundSize:'72px 72px', pointerEvents:'none' }} />

        <div style={{ position:'absolute', top:'52px', left:'var(--page-padding)', animation:'fizik-fade-in .7s ease .25s both', zIndex:10 }}>
          <button className="fz-back-btn" onClick={() => goToWork()}>← All work</button>
        </div>
        <div style={{ position:'absolute', top:'52px', right:'var(--page-padding)', fontSize:'10px', color:'rgba(255,255,255,.18)', letterSpacing:'.14em', textTransform:'uppercase', animation:'fizik-fade-in .7s ease .3s both', zIndex:10 }}>
          Case study: 02 / 03
        </div>

        <div style={{ position:'relative', zIndex:5 }}>
          <div style={{ fontSize:'11px', color:'rgba(255,255,255,.3)', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:'36px', animation:'fizik-fade-up .7s cubic-bezier(.16,1,.3,1) .35s both' }}>
            B2B Fleet Tech &nbsp;·&nbsp; Decision Support &nbsp;·&nbsp; Design Case Study
          </div>
          <div style={{ marginBottom:'44px' }}>
            <WordReveal text="Fleetwatch" startDelay={0.48} wordDelay={0.1} style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(52px,10vw,124px)', fontWeight:700, lineHeight:0.93, letterSpacing:'-0.035em', color:'#fff', marginBottom:'4px' }} />
            <WordReveal text="Cockpit"    startDelay={0.65} wordDelay={0.1} style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(52px,10vw,124px)', fontWeight:700, lineHeight:0.93, letterSpacing:'-0.035em', color:'rgba(255,255,255,.2)' }} />
          </div>
          <div style={{ fontSize:'clamp(15px,1.8vw,19px)', color:'rgba(255,255,255,.46)', maxWidth:'460px', lineHeight:1.62, letterSpacing:'-0.2px', marginBottom:'56px', animation:'fizik-fade-up .85s cubic-bezier(.16,1,.3,1) .9s both', textWrap:'pretty' }}>
            A weekly decision tool for a fleet manager, built to show what needs attention, how sure the system is, and what happens next.
          </div>
          <div className="fz-meta-bar">
            {[
              { label:'Role',     value:'Product Designer (solo)' },
              { label:'Scope',    value:'Problem framing · Data model · UX · UI · Prototype' },
              { label:'Industry', value:'Fleet management · Logistics' },
              { label:'Format',   value:'Take-home design case study · 8 hours · sample data' },
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

      {/* ══ HERO IMAGE ════════════════════════════════════════════ */}
      <div data-snap style={{ background:'#fff', padding:'var(--section-spacing-sm) var(--page-padding)', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:'100%', maxWidth:'1178px' }}>
          <FwFigure eager
            src="assets/fleetwatch/fleetwatch-cockpit.png"
            alt="Fleetwatch cockpit with three decisions for the week"
            caption="The cockpit: three decisions in order of consequence, with data coverage and what changed since the last visit." />
        </div>
      </div>

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
          <section id="problem" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="01" text="The problem" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px', marginBottom:'28px' }}>
              <FzHeading>A fleet tool people stop using when it shows everything.</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>The brief asks for a tool for a fleet manager who looks after 140 vehicles across three depots. The system collects data from telematics, fuel cards, workshop records, master data and route plans. At any time it holds about 51 open findings. She had already abandoned a previous tool because of alert overload.</FzBody>
            </div>
            <FzBody style={{ marginBottom:0 }}>I did not treat this as a monitoring dashboard. I treated it as a decision space and built it around three questions: what needs her attention this week, what decision or action is needed, and what the system can support with evidence.</FzBody>
          </section>

          {/* ── 02 USERS ────────────────────────────────────── */}
          <section id="users" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="02" text="Users & context" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>One person decides. The people who act never log in.</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>The fleet manager makes the decisions in a 15 minute session on Monday and Thursday. The workshop lead and the dispatchers do not use the tool at all. So anything meant for them has to leave the product by email, printout or phone note, and their answers have to find their way back.</FzBody>
            </div>
          </section>

          {/* ── 03 CONSTRAINTS ──────────────────────────────── */}
          <section id="constraints" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="03" text="Constraints" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>Four constraints that shaped the design.</FzHeading>
            </div>
            <div className="fz-constraints-row">
              {constraints.map(c => {
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

          {/* ── 04 DECISIONS ────────────────────────────────── */}
          <section id="decisions" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="04" text="Key design decisions" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>Four decisions that shaped the product.</FzHeading>
            </div>
            <div className="fz-decisions-grid">
              {decisions.map(d => (
                <div key={d.n} className="fz-card">
                  <div className="fz-card-number">{d.n}</div>
                  <div className="fz-card-title" style={{ whiteSpace:'normal', lineHeight:1.3, fontSize:'15px' }}>{d.title}</div>
                  <p className="fz-card-body" style={{ marginTop:'4px' }}>{d.body}</p>
                  <p className="fw-tradeoff">{d.tradeoff}</p>
                  {d.figures.map(f => (
                    <div key={f.src} className="fw-card-figure">
                      <FwFigure src={f.src} alt={f.alt} caption={f.caption} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="fz-caption" style={{ marginTop:'24px' }}>All figures and names in the screens are sample data.</div>
          </section>

          {/* ── 05 HOW I WORKED ─────────────────────────────── */}
          <section id="process" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="05" text="How I worked" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>First drafts fast, then my own edits.</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>I used Claude for first-pass frames and drafting. The prioritisation, the scope decisions and the final edits are mine. After the first draft I went through every screen by hand and cut what did not earn its place: repeated information, speculative wording in the hand-over message, and an Outlook connection the brief never asked for. I also removed the first cockpit version, because it contradicted the final one (3 decisions and 138 vehicles against 5 decisions and 140).</FzBody>
            </div>
          </section>

          {/* ── 06 MEASURES ─────────────────────────────────── */}
          <section id="measures" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="06" text="How we would know it works" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>Proposed measures, not results.</FzHeading>
            </div>
            <div className="fw-measures-row">
              {measures.map(m => (
                <div key={m.title} className="fz-card">
                  <div className="fz-card-title">{m.title}</div>
                  <p className="fz-card-body">{m.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 07 NEXT STEPS ───────────────────────────────── */}
          <section id="next-steps" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-md)' }}>
            <FzLabel n="07" text="What I'd do with more time" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px', marginBottom:'28px' }}>
              <FzHeading>Test it with three fleet managers.</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>Can they name the key decisions within 30 seconds? Can they tell what the system verified from what it only inferred? I would refine the screens where they hesitate.</FzBody>
            </div>
            <FzBody>Open questions for the team: whether "Confirmed" should appear on both scales, how to record an answer given by phone or on paper, and who should see driver-level information.</FzBody>
            <p className="fw-note" style={{ marginTop:'32px' }}>
              The clickable Figma prototype is <a href="/" onClick={goToContact}>available on request</a>.
            </p>
          </section>

        </main>
      </div>

      {/* ══ FOOTER ════════════════════════════════════════════════ */}
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

Object.assign(window, { CaseStudyFleetwatch });

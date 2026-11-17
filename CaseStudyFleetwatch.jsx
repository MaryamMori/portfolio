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
      font-family:'DM Sans',system-ui,sans-serif; font-size:12px; line-height:1.5;
      color:#666666; margin-top:12px; padding-left:14px; border-left:2px solid #e0ddd8;
    }
    .fw-card-figure { margin-top:auto; padding-top:16px; }
    .fw-card-figure + .fw-card-figure { margin-top:0; }
    .fw-card-figure .fz-caption { font-size:12px; line-height:1.5; margin-top:10px; }
    .fw-measures-row { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:56px; }
    .fw-subhead {
      font-family:'Space Grotesk',system-ui,sans-serif; font-size:17px; font-weight:600;
      line-height:1.3; letter-spacing:-0.2px; color:#1d1d1f; margin:40px 0 16px;
    }
    .fw-note {
      font-family:'DM Sans',system-ui,sans-serif; font-size:var(--caption-font-size);
      line-height:var(--caption-line-height); letter-spacing:-0.1px; color:#666666;
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
const FwIconSend = () => (
  <FwIconBase><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></FwIconBase>
);
const FwIconTime = () => (
  <FwIconBase><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></FwIconBase>
);

// Screen with caption. Source files are 2880 x 1800 (2x of a 1440 x 900 frame).
const FwFigure = ({ src, alt, caption, eager }) => (
  <React.Fragment>
    <img className="fw-shot" src={src} alt={alt || caption} width="2880" height="1800" loading={eager ? 'eager' : 'lazy'} decoding="async" />
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
    { id:'context',     label:'Context' },
    { id:'decisions',   label:'Decisions' },
    { id:'process',     label:'How I worked' },
    { id:'validation',  label:'Validation' },
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
      const last  = document.getElementById('validation');
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
    { title:'Two 15-Minute Decision Windows', body:'The fleet manager reviews findings in short Monday and Thursday sessions, not all day.', Icon:FwIconTime },
    { title:'Offline Execution',              body:'The people who actually fix issues (workshop leads and dispatchers) never log into the tool. Decisions have to leave the product via email, printout, or phone note, and external replies must find their way back.', Icon:FwIconSend },
    { title:'High Density (51 Findings)',     body:'The layout had to stay calm and scannable at 51 active findings, not a sanitized 11-item demo.', Icon:FwIconDensity },
    { title:'Uncertainty & Blind Spots',      body:'About one in five inferred findings is wrong. Meanwhile, 22 vehicles have no telematics, 6 devices have gone silent, and workshop records are patchy at two of the three depots.', Icon:FwIconBlindSpots },
  ];

  const decisions = [
    {
      n:'O1',
      title:'Consequence-Ranked Triage Over Full Alert Lists',
      decision:'Instead of surfacing all 51 findings, the cockpit displays only the top three decisions, ranked strictly by consequence: legal and safety first, then time-sensitive financial impact, then high-impact items with a clear next step. A summary bar flags two additional weekly decisions, 39 minor findings are grouped by type, and a dedicated Data Coverage card surfaces blind spots upfront so she knows how much to trust the system.',
      tradeoff:"Lower-ranked findings aren't visible on first glance, though counts and the full filtered list remain one click away.",
      figures:[
        { src:'assets/fleetwatch/fleetwatch-all-findings.png', caption:'Full Inventory (51 Findings): Ranked in the exact consequence order as the cockpit. Filtering alters this view only, never the top-level cockpit.' },
      ],
    },
    {
      n:'O2',
      title:'Separating "Confidence" from "Status" to Keep Trust Honest',
      decision:'Because ~20% of system inferences are wrong, presenting inferred alerts as facts destroys credibility. I separated Confidence (Inferred, Confirmed, Verified) from Status (New, Confirmed, Resolved, Ruled out, Withdrawn) and deliberately removed one-click confirmation from the cockpit. Opening a finding presents the raw evidence alongside the two competing explanations the data cannot distinguish. Confirming an item elevates it to Confirmed, never Verified, which requires a hard record.',
      tradeoff:'Introduces two scales to learn and an extra review step before acting, accepted intentionally to prevent blind automation bias.',
      figures:[
        { src:'assets/fleetwatch/fleetwatch-evidence-and-decision.png', caption:'Evidence-First Review: Findings open with supporting data and the two plausible explanations the system cannot separate on its own.' },
      ],
    },
    {
      n:'O3',
      title:'Structured Hand-Offs for Non-Users',
      decision:'Every finding resolves into one of four actions: hand over, confirm as real, rule out, or defer. Choosing Hand over generates an editable, role-tailored brief sent via email, printout, or phone note: a one-page evidence sheet for the workshop lead, and plain-language dates with zero blame for dispatchers. The finding moves to In hand, logs replies, and triggers a reminder on the follow-up date.',
      tradeoff:'Offline answers received by phone or paper still require manual logging, explicitly flagged as an open product question.',
      figures:[
        { src:'assets/fleetwatch/fleetwatch-hand-over.png', caption:'Offline Hand-Offs: Role-specific, editable briefs formatted for email, printout, or phone notes.' },
      ],
    },
    {
      n:'O4',
      title:'Multi-Month Lifecycle Rules for Recurring & Stale Findings',
      decision:'Fleet issues span months. When a previously ruled-out pattern resurfaces, the system displays her original rationale beside the new evidence and suggests "Known cause, keep watching" rather than forcing duplicate triage. Withdrawn findings log what changed rather than masquerading as resolved, and findings open for 18 months trigger a review flag without ever hijacking the top-three cockpit slots based on age alone.',
      tradeoff:'Required defining and documenting a more nuanced state machine, consolidated into a clear table of lifecycle rules.',
      // One caption covers both screens, so it sits under the second one
      figures:[
        { src:'assets/fleetwatch/fleetwatch-finding-comes-back.png', alt:'State Continuity: a previously ruled-out pattern shown with its prior rationale alongside new evidence.' },
        { src:'assets/fleetwatch/fleetwatch-lifecycle-rules.png', alt:'State Continuity: the explicit lifecycle rules for recurring, withdrawn and stale findings.', caption:'State Continuity: Previously ruled-out patterns retain their prior rationale alongside new evidence, governed by explicit lifecycle rules. All figures and names shown are sample data.' },
      ],
    },
  ];

  const measures = [
    { title:'Habit Retention',   body:'Continued Monday/Thursday usage past the third session, with the manager able to name top priorities without scanning the full 51-item list.' },
    { title:'Decision Velocity', body:'Majority of priority findings reaching a clear outcome within 7 days.' },
    { title:'Trust Calibration', body:'Fewer repeat rule-outs and stronger alignment between human decisions and underlying evidence.' },
  ];

  return (
    <div ref={containerRef} style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:'#fafafa', minHeight:'100vh' }}>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section data-snap style={{ minHeight:'100vh', background:'#0c0c0c', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'var(--page-padding)', paddingTop:'96px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)', backgroundSize:'72px 72px', pointerEvents:'none' }} />

        <div style={{ position:'absolute', top:'52px', left:'var(--page-padding)', animation:'fizik-fade-in .7s ease .25s both', zIndex:10 }}>
          <button className="fz-back-btn tap-target" onClick={() => goToWork()}>← All work</button>
        </div>
        <div style={{ position:'absolute', top:'52px', right:'var(--page-padding)', fontSize:'12px', color:'#A8A8A8', letterSpacing:'.14em', textTransform:'uppercase', animation:'fizik-fade-in .7s ease .3s both', zIndex:10 }}>
          Case study: 02 / 03
        </div>

        <div style={{ position:'relative', zIndex:5 }}>
          <div style={{ fontSize:'12px', color:'#A8A8A8', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:'36px', animation:'fizik-fade-up .7s cubic-bezier(.16,1,.3,1) .35s both' }}>
            B2B Fleet Tech &nbsp;·&nbsp; Decision Support &nbsp;·&nbsp; Design Case Study
          </div>
          <h1 aria-label="Fleetwatch Cockpit" style={{ marginBottom:'44px', fontSize:'inherit', fontWeight:'inherit', fontFeatureSettings:'normal' }}>
            <WordReveal text="Fleetwatch" startDelay={0.48} wordDelay={0.1} style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(52px,10vw,124px)', fontWeight:700, lineHeight:0.93, letterSpacing:'-0.035em', color:'#fff', marginBottom:'4px' }} />
            <WordReveal text="Cockpit"    startDelay={0.65} wordDelay={0.1} style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(52px,10vw,124px)', fontWeight:700, lineHeight:0.93, letterSpacing:'-0.035em', color:'#6E6E6E' }} />
          </h1>
          <div style={{ fontSize:'clamp(15px,1.8vw,19px)', color:'rgba(255,255,255,.46)', maxWidth:'460px', lineHeight:1.62, letterSpacing:'-0.2px', marginBottom:'56px', animation:'fizik-fade-up .85s cubic-bezier(.16,1,.3,1) .9s both', textWrap:'pretty' }}>
            Designing a low-noise decision space for fleet operations, shaped around uncertain data, blind spots, and offline team hand-offs.
          </div>
          <div className="fz-meta-bar fz-meta-bar-3">
            {[
              { label:'Role',                  value:'Product Designer (Solo)' },
              { label:'Scope',                 value:'Problem Framing · Data & State Model · UX/UI · Interactive Prototype' },
              { label:'Context & Constraints', value:'Take-Home Design Challenge · 8 Hours · 140 Vehicles / 3 Depots · Sample Data' },
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

      {/* ══ CORE DESIGN THESIS ═══════════════════════════════════ */}
      <FzHighlights id="fw-thesis-title" title="Core Design Thesis" items={[
        { lead:'Reframed from Monitoring to Triage', text:'Designed a consequence-ranked decision space instead of another alert-heavy dashboard (which caused her to abandon a previous tool), tailored to two 15-minute weekly sessions (Monday & Thursday).' },
        { lead:'Calibrated for Imperfect Data',      text:'Separated Confidence and Status scales to account for the reality that about one in five inferred findings is wrong and 22 vehicles have no telematics.' },
        { lead:'Designed Beyond the Screen',         text:'Created structured offline hand-offs (email, printout, phone note) for dispatchers and workshop leads who never log into the software.' },
      ]} />

      {/* ══ HERO IMAGE ════════════════════════════════════════════ */}
      <div data-snap style={{ background:'#fff', padding:'var(--section-spacing-sm) var(--page-padding)', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:'100%', maxWidth:'1178px' }}>
          <FwFigure eager
            src="assets/fleetwatch/fleetwatch-cockpit.png"
            alt="The Cockpit: top three decisions ranked by consequence, paired with data coverage visibility and changes since the last visit."
            caption="The Cockpit: Top three decisions ranked by consequence, paired with data coverage visibility and changes since the last visit." />
        </div>
      </div>

      {/* ══ BODY ══════════════════════════════════════════════════ */}
      <div className="fz-body-layout">

        {/* Sidebar */}
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
          <section id="problem" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="01" text="The problem" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px', marginBottom:'28px' }}>
              <FzHeading>Alert Overload Kills Adoption</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>A fleet manager oversees 140 vehicles across three depots, pulling fragmented signals from telematics, fuel cards, workshop records, master data, and route plans. At any given moment, the system holds roughly 51 open findings. She had already abandoned a previous tool because the sheer volume of alerts made it unusable.</FzBody>
            </div>
            <FzBody>Rather than designing another passive monitoring dashboard, I reframed the product as an active decision space anchored on three questions:</FzBody>
            <FzList items={[
              { text:'What needs her attention this week?' },
              { text:'What specific decision or hand-off is required?' },
              { text:'What evidence can the system actually verify versus merely infer?' },
            ]} />
          </section>

          {/* ── 02 CONTEXT & CONSTRAINTS ────────────────────── */}
          <section id="context" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="02" text="Context & constraints" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>Operational Context & Hard Constraints</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>The design had to hold up under four operational constraints:</FzBody>
            </div>
            <div className="fz-constraints-row">
              {constraints.map(c => {
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

          {/* ── 03 DECISIONS ────────────────────────────────── */}
          <section id="decisions" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="03" text="Decisions" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>Key Product & System Decisions</FzHeading>
            </div>
            <div className="fz-decisions-grid">
              {decisions.map(d => (
                <div key={d.n} className="fz-card">
                  <div className="fz-card-number">{d.n}</div>
                  <h3 className="fz-card-title" style={{ whiteSpace:'normal', lineHeight:1.3, fontSize:'15px' }}>{d.title}</h3>
                  <p className="fz-card-body" style={{ marginTop:'4px' }}><FzLead>The Decision:</FzLead> {d.decision}</p>
                  <p className="fw-tradeoff"><FzLead>The Trade-off:</FzLead> {d.tradeoff}</p>
                  {d.figures.map(f => (
                    <div key={f.src} className="fw-card-figure">
                      <FwFigure src={f.src} alt={f.alt} caption={f.caption} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* ── 04 HOW I WORKED ─────────────────────────────── */}
          <section id="process" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-lg)' }}>
            <FzLabel n="04" text="How I worked" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px', marginBottom:'28px' }}>
              <FzHeading>AI-Assisted Workflow & Editorial Rigor</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>To move fast within an 8-hour constraint, I used Claude for first-pass frames and drafting. The prioritisation, the scope decisions and the final edits are mine. After the first draft, I went through every screen by hand and cut what did not earn its place:</FzBody>
            </div>
            <FzList items={[
              { text:'Cut repeated information and speculative wording inside the hand-over message.' },
              { text:'Removed an Outlook connection the brief never asked for.' },
              { text:'Discarded an early cockpit version that contradicted the final data model (3 decisions and 138 vehicles vs. 5 weekly decisions and 140 vehicles).' },
            ]} />
          </section>

          {/* ── 05 VALIDATION ───────────────────────────────── */}
          <section id="validation" data-snap className="fz-section" style={{ marginBottom:'var(--section-spacing-md)' }}>
            <FzLabel n="05" text="Validation" />
            <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
              <FzHeading>Validation Plan & Open Questions</FzHeading>
              <FzBody animSub style={{ marginBottom:0 }}>Because this was an unshipped design exercise, I defined concrete behavioral signals to measure success in production and identified key assumptions to test next.</FzBody>
            </div>

            <h3 className="fw-subhead">Proposed Success Metrics</h3>
            <div className="fw-measures-row" style={{ marginTop:0 }}>
              {measures.map(m => (
                <div key={m.title} className="fz-card">
                  <h4 className="fz-card-title">{m.title}</h4>
                  <p className="fz-card-body">{m.body}</p>
                </div>
              ))}
            </div>

            <FzBody style={{ marginTop:'40px' }}><FzLead>Next Step, User Testing with 3 Fleet Managers:</FzLead> Validate whether managers can identify top decisions within 30 seconds and reliably distinguish inferred vs. verified findings without hesitation.</FzBody>

            <h3 className="fw-subhead">Open Questions for Engineering & Ops</h3>
            <FzList items={[
              { text:'Should "Confirmed" exist on both the Confidence and Status scales, or does overlapping terminology create friction?' },
              { text:'What is the lowest-friction way to capture phone or paper updates back into In hand findings?' },
              { text:'Who across the organization should have visibility into driver-level data?' },
            ]} />

            <p className="fw-note" style={{ marginTop:'32px' }}>
              Clickable Figma prototype <a href="/" onClick={goToContact}>available on request</a>.
            </p>
          </section>

        </main>
      </div>

      {/* ══ FOOTER ════════════════════════════════════════════════ */}
      <div data-snap style={{ background:'#0c0c0c', position:'relative', overflow:'hidden', minHeight:'380px' }}>
        <div style={{ position:'relative', zIndex:2, padding:'var(--section-spacing-sm) var(--page-padding)', display:'flex', flexDirection:'column' }}>
          <div style={{ fontSize:'12px', color:'#A8A8A8', letterSpacing:'1.5px', textTransform:'uppercase', fontFamily:"'DM Sans',system-ui,sans-serif", marginBottom:'40px' }}>
            Next project
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', flex:1 }}>
            <button className="fz-next-title" onClick={() => goTo('footcare')} style={{ display:'block', textAlign:'right' }}>
              → Next Project
            </button>
            <div style={{ fontSize:'clamp(14px,1.8vw,24px)', color:'#A8A8A8', fontFamily:"'DM Sans',system-ui,sans-serif", letterSpacing:'-0.374px', marginTop:'8px', textAlign:'right' }}>
              Preventive Foot Care Platform
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

Object.assign(window, { CaseStudyFleetwatch });

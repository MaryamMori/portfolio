// CaseStudyFootCare.jsx — Preventive Foot Care Platform case study

if (!document.getElementById('fc-case-styles')) {
  const s = document.createElement('style');
  s.id = 'fc-case-styles';
  s.textContent = `
    .fc-constraints-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    @media (max-width: 900px) {
      .fc-constraints-grid { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(s);
}

const CaseStudyFootCare = ({ goTo, goToWork }) => {
  const sections = [
    {
      id: 'context',
      label: '01 · Context',
      heading: 'Foot conditions are among the most manageable when caught early, and most costly when caught late.',
      body: [
        'For people with diabetes in particular, late detection is a leading cause of serious complications.',
        'The technology to detect early warning signals exists. Pressure mapping, gait analysis, and foot geometry measurement are established clinical methods. What does not exist at scale is a digital system that makes those signals interpretable and actionable for the people who need them.',
        'This project explored what that system could look like.',
      ],
    },
    {
      id: 'problem',
      label: '02 · The problem',
      heading: 'Current approaches are built around symptoms, not patterns.',
      body: [
        'Current approaches are built around symptoms, not patterns. A person visits a clinic when something hurts. A clinician interprets the data. An intervention is recommended. The process is reactive, episodic, and dependent on in-person expertise at every step.',
        React.createElement('span', null,
          React.createElement('em', null, 'The gap:'),
          ' subtle changes in pressure or gait that precede visible symptoms by weeks or months are either never captured outside clinical settings, or captured but never translated into something a non-specialist can act on.'
        ),
        'The design challenge was not to build a diagnostic tool. It was to make biomechanical data interpretable enough to support earlier awareness for both individuals and the professionals working with them.',
      ],
    },
    {
      id: 'users',
      label: '03 · Users & Context',
      heading: 'Two user types, one system, a need for both to trust the output.',
      body: [
        'Two distinct user types. Overlapping needs, different data literacy, and a shared requirement to trust the output for different reasons.',
      ],
      users: [
        {
          type: 'Individuals',
          desc: 'People managing ongoing foot health risks, often without specialist knowledge. They need a clear signal. Is this normal, or is this something to pay attention to? Not raw pressure or gait data.',
        },
        {
          type: 'Professionals',
          desc: 'Clinicians, orthotists, and foot care specialists. They want interpretive depth and a shared reference point for conversations with patients who are not specialists.',
        },
      ],
      bodyAfter: 'The design challenge: one system, two levels of data literacy, both needing to trust the same output for different reasons.',
    },
    {
      id: 'constraints',
      label: '04 · Constraints',
      heading: 'Four constraints that shaped the architecture.',
      constraints: [
        {
          title: 'No access to real patient data',
          body: 'Validation was limited to expert evaluation of design plausibility, not real longitudinal use. The work produced a tested architecture, not a clinically proven system.',
        },
        {
          title: 'The boundary between monitoring and diagnosis.',
          body: 'A system that surfaces anomalies can easily harm by overclaiming. Defining where the system\'s responsibility ends was as important as the interface itself.',
        },
        {
          title: 'Long-term engagement as a design requirement',
          body: 'A one-time measurement is not preventive care. Sustained use over time places demands on motivation, habit formation, and how the system communicates progress.',
        },
        {
          title: 'Dual-user design within one coherent system',
          body: 'Building separate products for individuals and professionals was out of scope. The challenge was serving both without compromising clarity for one or depth for the other.',
        },
      ],
    },
    {
      id: 'decisions',
      label: '05 · Key design decisions',
      heading: 'Four decisions that defined the product.',
    },
    {
      id: 'validation',
      label: '06 · Validation',
      heading: 'Expert usability testing with professionals across clinical foot care and biomechanics.',
      body: [
        'Expert usability testing with professionals across clinical foot care, orthopedic shoe technology, product development, and biomechanics-adjacent practice.',
        'Three questions guided the sessions: was the workflow structure navigable, was the information hierarchy useful to professional users, and did the core interaction patterns support the kind of clinical reasoning the system was designed to facilitate.',
        'Findings confirmed the structure and navigation held up for professional users. They also surfaced concrete areas for a next iteration.',
      ],
    },
    {
      id: 'outcome',
      label: 'Outcome & Reflection',
      heading: 'A tested product architecture for a dual-user preventive monitoring system.',
      body: [
        'Expert evaluation confirmed that the workflow structure, core navigation, and information hierarchy were understandable and useful for professional users, the higher-literacy of the two user types the system was designed to serve.',
        'Four concrete areas for a next iteration: feedback states needed more clarity, recommendation editing required greater flexibility, secure data sharing was missing, and data visualisation needed refinement for clinical interpretation. Scoped, solvable problems, not structural failures.',
        'The most significant open question is the individual user engagement model. Whether a real person managing ongoing foot health risk would return to a monitoring tool consistently requires longitudinal behavioral research outside the scope of this project. The architecture is designed to support that validation. The behavioral hypothesis has not yet been tested.',
      ],
    },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#ffffff', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh', background: '#0c0c0c',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 'var(--page-padding)', paddingTop: '96px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Cover video — right side */}
        <video
          autoPlay muted loop playsInline
          style={{ position: 'absolute', top: 0, right: 0, width: '58%', height: '100%', objectFit: 'cover', objectPosition: 'center top', pointerEvents: 'none' }}
        >
          <source src="foot-trrim-dashboard.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,#0c0c0c 36%,rgba(12,12,12,.75) 54%,rgba(12,12,12,.15) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,#0c0c0c 18%,rgba(12,12,12,.45) 50%,transparent 100%)', pointerEvents: 'none' }} />
        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)', backgroundSize: '72px 72px', pointerEvents: 'none' }} />

        {/* Back button */}
        <div style={{ position: 'absolute', top: '52px', left: 'var(--page-padding)', animation: 'fizik-fade-in .7s ease .25s both', zIndex: 10 }}>
          <button
            onClick={() => goToWork()}
            style={{ background: 'none', border: 'none', padding: 0, color: 'rgba(255,255,255,0.35)', fontSize: '13px', letterSpacing: '.04em', cursor: 'pointer', fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', alignItems: 'center', gap: '8px' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >← All work</button>
        </div>
        {/* Counter */}
        <div style={{ position: 'absolute', top: '52px', right: 'var(--page-padding)', fontSize: '10px', color: 'rgba(255,255,255,.18)', letterSpacing: '.14em', textTransform: 'uppercase', animation: 'fizik-fade-in .7s ease .3s both', zIndex: 10 }}>
          Case study: 02 / 02
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 5 }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.3)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: '36px', animation: 'fizik-fade-up .7s cubic-bezier(.16,1,.3,1) .35s both' }}>
            HCI Master's Thesis &nbsp;·&nbsp; Healthtech &nbsp;·&nbsp; Biomechanics &nbsp;·&nbsp; Research-to-Product
          </div>
          <div style={{ marginBottom: '44px' }}>
            <WordReveal text="Preventive Foot Care" startDelay={0.48} wordDelay={0.09} style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(40px,7vw,96px)', fontWeight: 700, lineHeight: 0.93, letterSpacing: '-0.03em', color: '#fff', marginBottom: '4px' }} />
            <WordReveal text="Platform" startDelay={0.72} wordDelay={0.1} style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(40px,7vw,96px)', fontWeight: 700, lineHeight: 0.93, letterSpacing: '-0.03em', color: 'rgba(255,255,255,.2)' }} />
          </div>
          <div style={{ fontSize: 'clamp(15px,1.8vw,19px)', color: 'rgba(255,255,255,.46)', maxWidth: '460px', lineHeight: 1.62, letterSpacing: '-0.2px', marginBottom: '56px', animation: 'fizik-fade-up .85s cubic-bezier(.16,1,.3,1) .9s both', textWrap: 'pretty' }}>
            Translating biomechanical research into a digital system for early detection and proactive monitoring.
          </div>
          {/* Meta bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,.08)', animation: 'fizik-fade-up .8s cubic-bezier(.16,1,.3,1) 1.1s both' }}>
            {[
              { label: 'Role',     value: "Product Designer (HCI Master's Thesis)" },
              { label: 'Scope',    value: 'Domain Research · Product Strategy · UX · Prototyping' },
              { label: 'Industry', value: 'Healthcare · Biomechanics' },
              { label: 'Context',  value: 'University of Siegen, with clinical & academic experts' },
            ].map((item, i) => (
              <div key={item.label} style={{ paddingLeft: i > 0 ? '24px' : 0, paddingRight: i < 3 ? '24px' : 0, borderRight: i < 3 ? '1px solid rgba(255,255,255,.07)' : 'none' }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.2)', letterSpacing: '.13em', textTransform: 'uppercase', marginBottom: '6px' }}>{item.label}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.58)', lineHeight: 1.4, letterSpacing: '-0.1px' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '36px', right: 'var(--page-padding)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', animation: 'fizik-fade-in 1s ease 1.5s both', zIndex: 5 }}>
          <span style={{ fontSize: '9px', color: 'rgba(255,255,255,.18)', letterSpacing: '.16em', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll</span>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom,rgba(255,255,255,.14),transparent)' }} />
        </div>
      </section>


      {/* ── Body sections ── */}
      <div style={{ background: '#ffffff' }}>
        {sections.map((section, si) => (
          <FootCareSection key={section.id} section={section} idx={si} />
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{
        background: '#272729',
        padding: 'var(--section-spacing-sm) var(--page-padding)',
      }}>
        <div style={{ maxWidth: '680px' }}>
          <div style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}>
            That's the work
          </div>
          <h2 style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(24px, 3vw, 34px)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.374px',
            color: '#ffffff',
            marginBottom: '28px',
          }}>
            If you're working on something complex, I'd be glad to connect.
          </h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="mailto:maryam.moradian38@gmail.com"
              style={{
                background: '#a63636',
                color: '#fff',
                fontSize: '17px',
                fontWeight: 400,
                letterSpacing: '-0.374px',
                padding: '11px 22px',
                borderRadius: '9999px',
                border: 'none',
                lineHeight: 1,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* ══ NEXT: ABOUT ═════════════════════════════════════════════ */}
      <div data-snap style={{ background: '#0c0c0c', position: 'relative', overflow: 'hidden', minHeight: '380px' }}>
        <div style={{ position: 'relative', zIndex: 2, padding: 'var(--section-spacing-sm) var(--page-padding)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
            <button className="fz-next-title" onClick={() => goTo('about')} style={{ display: 'block', textAlign: 'right' }}>
              → More About Me
            </button>
          </div>
          <div style={{ marginTop: '48px' }}>
            <button onClick={() => goToWork()} style={{ background: 'none', border: '1px solid rgba(255,255,255,.12)', borderRadius: '9999px', padding: '10px 20px', color: 'rgba(255,255,255,.35)', fontSize: '13px', letterSpacing: '.03em', cursor: 'pointer', fontFamily: "'DM Sans', system-ui, sans-serif", transition: 'color .2s,border-color .2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; }}
            >← Back to all work</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Accordion state (module-level so it persists across re-renders) ──
const accordionOpen = {};

// ── Section renderer for foot care ──
const FootCareSection = ({ section, idx }) => {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  const isAlt = idx % 2 === 1;
  const isDecisions = section.id === 'decisions';
  const bg = isAlt ? '#f5f5f7' : '#ffffff';
  const col = { maxWidth: 'var(--content-width)', margin: '0 auto', padding: '0 var(--page-padding)' };

  const toggleDecision = (id) => {
    accordionOpen[id] = !accordionOpen[id];
    forceUpdate();
  };

  const decisions = [
    {
      id: 'd1',
      n: '01',
      title: 'Layered detail rather than separate views',
      text: 'One option was two separate interfaces, one simplified for individuals, one detailed for professionals. The problem: a person and their clinician looking at different representations of the same data creates communication friction rather than reducing it.\n\nI chose a single layered system instead. The default view surfaces a clear signal accessible to anyone. A deeper layer, available on demand, exposes the full data for professional interpretation. Both users see the same event at different depths.',
      tradeoff: 'Trade-off: the default layer loses some interpretive nuance for expert users. The benefit: individual and professional can look at the same screen and have a meaningful conversation.',
      diagram: (
        <svg viewBox="0 0 560 310" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'auto', display:'block', fontFamily:"'DM Sans', system-ui, sans-serif" }}>
          <defs>
            <marker id="d1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M1 2L8 5L1 8" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
            <marker id="d1ag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M1 2L8 5L1 8" fill="none" stroke="#2B7A56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          </defs>
          {/* Top box */}
          <rect x="155" y="16" width="250" height="52" rx="16" fill="#f8f8f8" stroke="#e0e0e0" strokeWidth="1"/>
          <text x="280" y="47" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">One data source, two user types</text>
          {/* Fork lines */}
          <line x1="228" y1="68" x2="140" y2="120" stroke="#ccc" strokeWidth="1" markerEnd="url(#d1a)"/>
          <line x1="332" y1="68" x2="420" y2="120" stroke="#ccc" strokeWidth="1" markerEnd="url(#d1a)"/>
          {/* Option A */}
          <rect x="30" y="120" width="220" height="68" rx="14" fill="white" stroke="#C43B3B" strokeWidth="1.5"/>
          <text x="140" y="149" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Option A</text>
          <text x="140" y="169" textAnchor="middle" fontSize="12" fill="#888" fontFamily="inherit">Separate interfaces</text>
          {/* Option B — chosen */}
          <rect x="310" y="120" width="220" height="68" rx="14" fill="#2B7A56"/>
          <text x="420" y="149" textAnchor="middle" fontSize="13" fontWeight="600" fill="white" fontFamily="inherit">Option B, chosen</text>
          <text x="420" y="169" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.72)" fontFamily="inherit">Single layered system</text>
          {/* Arrow down from B */}
          <line x1="420" y1="188" x2="420" y2="230" stroke="#2B7A56" strokeWidth="1" markerEnd="url(#d1ag)"/>
          {/* Individual + Professional */}
          <rect x="310" y="230" width="220" height="60" rx="14" fill="#2B7A56"/>
          <text x="420" y="256" textAnchor="middle" fontSize="13" fontWeight="600" fill="white" fontFamily="inherit">Individual + Professional</text>
          <text x="420" y="276" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.72)" fontFamily="inherit">Same screen, different depth</text>
        </svg>
      ),
    },
    {
      id: 'd2',
      n: '02',
      title: 'Insight framing, not raw data display',
      text: 'Pressure maps and gait outputs are accurate but largely uninterpretable without training. Showing raw sensor data to a general user produces either anxiety without context, or indifference without meaning.\n\nThe system translates patterns into named insights: areas of concern, changes over time, comparisons to previous readings. The interface communicates what the data means, not what the data is.',
      tradeoff: 'Trade-off: expert users lose direct access to raw data in the primary flow. Acceptable, because the professional layer provides it on demand.',
      diagram: (
        <svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'auto', display:'block', fontFamily:"'DM Sans', system-ui, sans-serif" }}>
          <defs>
            <marker id="d2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M1 2L8 5L1 8" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          </defs>
          {/* Left: Raw data */}
          <rect x="20" y="55" width="172" height="80" rx="14" fill="white" stroke="#C43B3B" strokeWidth="1.5"/>
          <text x="106" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Raw data</text>
          <text x="106" y="108" textAnchor="middle" fontSize="11" fill="#888" fontFamily="inherit">Pressure maps, gait outputs</text>
          <text x="106" y="158" textAnchor="middle" fontSize="11" fill="#bbb" fontFamily="inherit">Accurate but uninterpretable</text>
          <text x="106" y="174" textAnchor="middle" fontSize="11" fill="#bbb" fontFamily="inherit">without training</text>
          {/* Arrow */}
          <line x1="192" y1="95" x2="224" y2="95" stroke="#bbb" strokeWidth="1" markerEnd="url(#d2a)"/>
          {/* Center: Interpretation Layer */}
          <rect x="224" y="36" width="272" height="118" rx="14" fill="#9B3030"/>
          <text x="360" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="white" fontFamily="inherit">Interpretation Layer</text>
          <text x="360" y="102" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.8)" fontFamily="inherit">Patterns named, changes flagged,</text>
          <text x="360" y="118" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.8)" fontFamily="inherit">readings compared</text>
          {/* Arrow */}
          <line x1="496" y1="95" x2="528" y2="95" stroke="#bbb" strokeWidth="1" markerEnd="url(#d2a)"/>
          {/* Right: Named insight */}
          <rect x="528" y="55" width="172" height="80" rx="14" fill="white" stroke="#e0e0e0" strokeWidth="1"/>
          <text x="614" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Named insight</text>
          <text x="614" y="108" textAnchor="middle" fontSize="11" fill="#888" fontFamily="inherit">What it means, what to consider</text>
          <text x="614" y="158" textAnchor="middle" fontSize="11" fill="#666" fontFamily="inherit">Readable by anyone.</text>
          <text x="614" y="174" textAnchor="middle" fontSize="11" fill="#666" fontFamily="inherit">Detail available on demand.</text>
          {/* Bottom caption */}
          <text x="360" y="210" textAnchor="middle" fontSize="11" fill="#aaa" fontFamily="inherit">The interface communicates what the data means, not what the data is.</text>
        </svg>
      ),
    },
    {
      id: 'd3',
      n: '03',
      title: 'Positioning as an early warning tool, not a diagnostic one',
      text: 'A system that surfaces anomalies can easily harm users by overclaiming. Framing a pressure change as a warning creates anxiety that may not be warranted. Framing it as "something has changed" invites attention without clinical overreach.\n\nEvery output was structured the same way: here is what we detected, here is how it compares to your baseline, here is what you might consider doing. Clinical judgment stays with the professional, not the product.',
      tradeoff: 'Trade-off: the most consequential decision in the project is also the least visible in the interface. That invisibility is the point.',
      diagram: (
        <svg viewBox="0 0 720 270" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'auto', display:'block', fontFamily:"'DM Sans', system-ui, sans-serif" }}>
          {/* Horizontal axis */}
          <line x1="36" y1="128" x2="684" y2="128" stroke="#ddd" strokeWidth="1.5"/>
          <circle cx="36" cy="128" r="5" fill="#ddd"/>
          <circle cx="684" cy="128" r="5" fill="#ddd"/>
          {/* Center dot — chosen */}
          <circle cx="360" cy="128" r="7" fill="#2B7A56"/>
          <line x1="360" y1="88" x2="360" y2="121" stroke="#2B7A56" strokeWidth="1" strokeDasharray="4 3"/>
          {/* Left: Diagnostic verdict */}
          <rect x="20" y="24" width="200" height="64" rx="14" fill="#9B3030"/>
          <text x="120" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="white" fontFamily="inherit">Diagnostic verdict</text>
          <text x="120" y="72" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.75)" fontFamily="inherit">Overclaims clinical significance</text>
          <line x1="120" y1="88" x2="120" y2="123" stroke="#ddd" strokeWidth="1"/>
          <text x="120" y="152" textAnchor="middle" fontSize="11" fill="#bbb" fontFamily="inherit">Creates anxiety,</text>
          <text x="120" y="168" textAnchor="middle" fontSize="11" fill="#bbb" fontFamily="inherit">Harms trust</text>
          {/* Center: Chosen awareness tool */}
          <rect x="240" y="16" width="240" height="64" rx="14" fill="#2B7A56"/>
          <text x="360" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="white" fontFamily="inherit">Chosen: awareness tool</text>
          <text x="360" y="152" textAnchor="middle" fontSize="12" fill="#444" fontFamily="inherit">Here is what we decided.</text>
          <text x="360" y="170" textAnchor="middle" fontSize="12" fill="#444" fontFamily="inherit">Here is how it compares to your baseline.</text>
          <text x="360" y="188" textAnchor="middle" fontSize="12" fill="#444" fontFamily="inherit">Here is what you might consider doing</text>
          {/* Right: Too cautious */}
          <rect x="500" y="24" width="200" height="64" rx="14" fill="white" stroke="#C43B3B" strokeWidth="1.5"/>
          <text x="600" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Too cautious</text>
          <text x="600" y="72" textAnchor="middle" fontSize="11" fill="#888" fontFamily="inherit">No actionable signal</text>
          <line x1="600" y1="88" x2="600" y2="123" stroke="#ddd" strokeWidth="1"/>
          <text x="600" y="152" textAnchor="middle" fontSize="11" fill="#bbb" fontFamily="inherit">Reduces utility.</text>
          <text x="600" y="168" textAnchor="middle" fontSize="11" fill="#bbb" fontFamily="inherit">No reason to return.</text>
          {/* Bottom caption */}
          <text x="360" y="244" textAnchor="middle" fontSize="11" fill="#aaa" fontFamily="inherit">The interface communicates what the data means, not what the data is.</text>
        </svg>
      ),
    },
    {
      id: 'd4',
      n: '04',
      title: 'Designing for change over time, not a single session',
      text: 'A monitoring system that only reports current state has limited preventive value. Making change visible required a temporal data model: every measurement stored, compared against previous readings, communicated as a trend rather than a snapshot.\n\nI prioritized a simple directional signal (improving, stable, attention needed) over a detailed historical chart. The chart is available in the professional layer. The individual user sees a clear direction.',
      tradeoff: 'Trade-off: simplifying the longitudinal view means expert users see less detail by default. The individual engagement model is also the biggest untested hypothesis in the project.',
      diagram: (
        <svg viewBox="0 0 720 310" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'auto', display:'block', fontFamily:"'DM Sans', system-ui, sans-serif" }}>
          <defs>
            <marker id="d4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M1 2L8 5L1 8" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
            <marker id="d4ag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M1 2L8 5L1 8" fill="none" stroke="#2B7A56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          </defs>
          {/* Left: Single session snapshot */}
          <rect x="20" y="16" width="240" height="52" rx="14" fill="white" stroke="#C43B3B" strokeWidth="1.5" strokeDasharray="6 4"/>
          <text x="140" y="47" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Single session snapshot</text>
          {/* Dashed connector */}
          <line x1="260" y1="42" x2="460" y2="42" stroke="#ccc" strokeWidth="1" strokeDasharray="6 4"/>
          {/* Right: Longitudinal record */}
          <rect x="460" y="16" width="240" height="52" rx="14" fill="#2B7A56"/>
          <text x="580" y="36" textAnchor="middle" fontSize="13" fontWeight="600" fill="white" fontFamily="inherit">Longitudinal record</text>
          <text x="580" y="54" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.72)" fontFamily="inherit">Chosen approach</text>
          {/* Arrows down */}
          <line x1="140" y1="68" x2="140" y2="104" stroke="#ccc" strokeWidth="1" markerEnd="url(#d4a)"/>
          <line x1="580" y1="68" x2="580" y2="104" stroke="#2B7A56" strokeWidth="1" markerEnd="url(#d4ag)"/>
          {/* Left card */}
          <rect x="20" y="104" width="240" height="114" rx="14" fill="#f8f8f8" stroke="#e8e8e8" strokeWidth="1"/>
          <circle cx="140" cy="150" r="28" fill="white" stroke="#ddd" strokeWidth="1"/>
          <text x="140" y="155" textAnchor="middle" fontSize="12" fill="#bbb" fontFamily="inherit">Reading</text>
          <text x="140" y="240" textAnchor="middle" fontSize="11" fill="#bbb" fontFamily="inherit">No baseline. No context.</text>
          <text x="140" y="256" textAnchor="middle" fontSize="11" fill="#bbb" fontFamily="inherit">Is this normal? Unknown</text>
          {/* Right card */}
          <rect x="460" y="104" width="240" height="114" rx="14" fill="#f2faf6" stroke="#b8e8d0" strokeWidth="1"/>
          {/* Chart */}
          <circle cx="490" cy="192" r="10" fill="white" stroke="#ddd" strokeWidth="1"/>
          <circle cx="522" cy="178" r="10" fill="white" stroke="#ddd" strokeWidth="1"/>
          <circle cx="554" cy="164" r="10" fill="white" stroke="#ddd" strokeWidth="1"/>
          <circle cx="586" cy="150" r="10" fill="white" stroke="#ddd" strokeWidth="1"/>
          <circle cx="618" cy="138" r="10" fill="#2B7A56"/>
          <line x1="490" y1="192" x2="522" y2="178" stroke="#2B7A56" strokeWidth="1.5"/>
          <line x1="522" y1="178" x2="554" y2="164" stroke="#2B7A56" strokeWidth="1.5"/>
          <line x1="554" y1="164" x2="586" y2="150" stroke="#2B7A56" strokeWidth="1.5"/>
          <line x1="586" y1="150" x2="618" y2="138" stroke="#2B7A56" strokeWidth="2"/>
          <text x="580" y="240" textAnchor="middle" fontSize="11" fill="#555" fontFamily="inherit">Direction visible over time.</text>
          <text x="580" y="256" textAnchor="middle" fontSize="11" fill="#555" fontFamily="inherit">Improving, stable, or attention needed</text>
          {/* Bottom caption */}
          <text x="360" y="292" textAnchor="middle" fontSize="11" fill="#aaa" fontFamily="inherit">A one-time measurement is not preventive care.</text>
        </svg>
      ),
    },
  ];

  return (
    <section style={{ background: bg, borderTop: '1px solid rgba(0,0,0,0.05)' }}>

      {/* ── Constrained column: label + heading + body ── */}
      <div style={{ ...col, paddingTop: '72px', paddingBottom: '0' }}>
        <div style={{
          fontSize: '11px', fontWeight: 400, color: '#a63636',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}>
          {section.label}
        </div>
        <h2 style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 600,
          lineHeight: 1.2, letterSpacing: '-0.374px', color: '#1d1d1f',
          marginBottom: '24px', textWrap: 'pretty',
        }}>
          {section.heading}
        </h2>

        {section.body && section.body.map((para, i) => (
          <p key={i} style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 'var(--body-font-size)', fontWeight: 400, lineHeight: 'var(--body-line-height)',
            letterSpacing: '-0.374px', color: '#1d1d1f', opacity: 0.82,
            marginBottom: i < section.body.length - 1 ? '20px' : (section.users || section.bodyAfter ? '24px' : 0),
            textWrap: 'pretty',
          }}>
            {para}
          </p>
        ))}

        {/* Two-user cards */}
        {section.users && (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px', marginBottom: section.bodyAfter ? '24px' : 0,
          }}>
            {section.users.map(u => (
              <div key={u.type} style={{
                padding: '20px 24px', background: isAlt ? '#ffffff' : '#f5f5f7',
                borderRadius: '11px', border: '1px solid rgba(0,0,0,0.07)',
              }}>
                <div style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '13px', fontWeight: 600, color: '#a63636',
                  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px',
                }}>
                  {u.type}
                </div>
                <p style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 'var(--secondary-font-size)', fontWeight: 400, lineHeight: 'var(--secondary-line-height)',
                  letterSpacing: '-0.2px', color: 'rgba(29,29,31,0.75)',
                }}>
                  {u.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Users diagram — rendered before bodyAfter */}
        {section.id === 'users' && (
          <div style={{ marginTop: '32px', marginBottom: '32px' }}>
            <svg viewBox="0 0 900 530" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'auto', display:'block', fontFamily:"'DM Sans', system-ui, sans-serif" }}>
              <defs>
                <marker id="s3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M1 2L8 5L1 8" fill="none" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </marker>
              </defs>
              {/* Top label */}
              <text x="450" y="18" textAnchor="middle" fontSize="12" fill="#999" fontFamily="inherit">Shared measurement session</text>
              {/* Top box */}
              <rect x="175" y="28" width="550" height="72" rx="18" fill="white" stroke="#C43B3B" strokeWidth="1.5"/>
              <text x="450" y="59" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Foot pressure + gait data</text>
              <text x="450" y="79" textAnchor="middle" fontSize="11" fill="#888" fontFamily="inherit">Pattern detection · Baseline comparison · Change over time</text>
              {/* Fork */}
              <line x1="450" y1="100" x2="450" y2="146" stroke="#bbb" strokeWidth="1.5"/>
              <line x1="175" y1="146" x2="725" y2="146" stroke="#bbb" strokeWidth="1.5"/>
              <line x1="175" y1="146" x2="175" y2="168" stroke="#bbb" strokeWidth="1.5" markerEnd="url(#s3a)"/>
              <line x1="725" y1="146" x2="725" y2="168" stroke="#bbb" strokeWidth="1.5" markerEnd="url(#s3a)"/>
              {/* Individual */}
              <rect x="55" y="168" width="240" height="70" rx="18" fill="#3A9A6A"/>
              <text x="175" y="199" textAnchor="middle" fontSize="14" fontWeight="600" fill="white" fontFamily="inherit">Individual</text>
              <text x="175" y="220" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.78)" fontFamily="inherit">No biomechanical literacy assumed</text>
              {/* Professional */}
              <rect x="605" y="168" width="240" height="70" rx="18" fill="#4A6BAF"/>
              <text x="725" y="199" textAnchor="middle" fontSize="14" fontWeight="600" fill="white" fontFamily="inherit">Professional</text>
              <text x="725" y="220" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.78)" fontFamily="inherit">Clinician, orthotist, foot care specialist</text>
              {/* Arrows */}
              <line x1="175" y1="238" x2="175" y2="268" stroke="#bbb" strokeWidth="1.5" markerEnd="url(#s3a)"/>
              <line x1="725" y1="238" x2="725" y2="268" stroke="#bbb" strokeWidth="1.5" markerEnd="url(#s3a)"/>
              {/* Simplified insight */}
              <rect x="55" y="268" width="240" height="70" rx="18" fill="#3A9A6A"/>
              <text x="175" y="299" textAnchor="middle" fontSize="14" fontWeight="600" fill="white" fontFamily="inherit">Simplified insight (default)</text>
              <text x="175" y="320" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.78)" fontFamily="inherit">Pattern, change signal, next step</text>
              {/* Detailed data */}
              <rect x="605" y="268" width="240" height="70" rx="18" fill="#4A6BAF"/>
              <text x="725" y="299" textAnchor="middle" fontSize="14" fontWeight="600" fill="white" fontFamily="inherit">Detailed data (default)</text>
              <text x="725" y="320" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.78)" fontFamily="inherit">Pressure maps, trend charts, readings</text>
              {/* Arrows */}
              <line x1="175" y1="338" x2="175" y2="376" stroke="#bbb" strokeWidth="1.5" markerEnd="url(#s3a)"/>
              <line x1="725" y1="338" x2="725" y2="376" stroke="#bbb" strokeWidth="1.5" markerEnd="url(#s3a)"/>
              {/* Detail on demand */}
              <rect x="55" y="376" width="240" height="70" rx="18" fill="white" stroke="#C43B3B" strokeWidth="1.5"/>
              <text x="175" y="407" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Detail on demand</text>
              <text x="175" y="428" textAnchor="middle" fontSize="11" fill="#888" fontFamily="inherit">Same data, more context if needed</text>
              {/* Shared view */}
              <rect x="605" y="376" width="240" height="70" rx="18" fill="white" stroke="#C43B3B" strokeWidth="1.5"/>
              <text x="725" y="407" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Shared view</text>
              <text x="725" y="428" textAnchor="middle" fontSize="11" fill="#888" fontFamily="inherit">Same session, basis for conversation</text>
              {/* Dashed connector */}
              <line x1="295" y1="411" x2="605" y2="411" stroke="#ccc" strokeWidth="1" strokeDasharray="6 4"/>
              {/* Caption */}
              <text x="450" y="498" textAnchor="middle" fontSize="11" fill="#999" fontFamily="inherit">One session, two levels of access – both users see the same event, at different depths</text>
            </svg>
          </div>
        )}

        {section.bodyAfter && (
          <p style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 'var(--body-font-size)', fontWeight: 400, lineHeight: 'var(--body-line-height)',
            letterSpacing: '-0.374px', color: '#1d1d1f', opacity: 0.82, textWrap: 'pretty',
          }}>
            {section.bodyAfter}
          </p>
        )}

        {/* Constraints grid — 2×2 */}
        {section.constraints && (
          <div className="fc-constraints-grid" style={{
            marginTop: '8px',
          }}>
            {section.constraints.map(c => (
              <div key={c.title} style={{
                padding: '20px 24px',
                background: isAlt ? '#ffffff' : '#f5f5f7',
                borderRadius: '11px',
                border: '1px solid rgba(0,0,0,0.07)',
              }}>
                <div style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#a63636', marginBottom: '10px',
                }}>
                  {c.title}
                </div>
                <p style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 'var(--secondary-font-size)', fontWeight: 400, lineHeight: 'var(--secondary-line-height)',
                  letterSpacing: '-0.2px', color: 'rgba(29,29,31,0.72)',
                }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Decisions accordion */}
        {isDecisions && (
          <div style={{ marginTop: '8px' }}>
            {decisions.map((d, i) => {
              const isOpen = !!accordionOpen[d.id];
              return (
                <div key={d.id} style={{
                  borderTop: '1px solid #e0ddd8',
                  borderBottom: i === decisions.length - 1 ? '1px solid #e0ddd8' : 'none',
                }}>
                  <button
                    onClick={() => toggleDecision(d.id)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '28px 0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '24px',
                      textAlign: 'left',
                      color: 'inherit',
                    }}
                  >
                    <span style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '11px', letterSpacing: '0.08em',
                      color: '#a63636', fontWeight: 500,
                      paddingTop: '3px', minWidth: '24px', flexShrink: 0,
                    }}>{d.n}</span>
                    <span style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '18px', fontWeight: 600, lineHeight: 1.3,
                      color: '#1d1d1f', flex: 1,
                      letterSpacing: '-0.374px',
                    }}>{d.title}</span>
                    <svg
                      viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{
                        width: '20px', height: '20px', flexShrink: 0,
                        marginTop: '2px', color: isOpen ? '#a63636' : '#999',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        transition: 'transform 0.3s ease, color 0.2s ease',
                      }}
                    >
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>

                  <div style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.35s ease',
                  }}>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{
                        padding: '0 0 40px 48px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                      }}>
                        {d.text.split('\n\n').map((para, pi) => (
                          <p key={pi} style={{
                            fontFamily: "'DM Sans', system-ui, sans-serif",
                            fontSize: 'var(--secondary-font-size)', lineHeight: 'var(--secondary-line-height)',
                            color: '#3d3d3a', margin: 0,
                          }}>{para}</p>
                        ))}
                        <p style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: 'var(--caption-font-size)', lineHeight: 'var(--caption-line-height)',
                          color: '#777', margin: 0,
                          paddingLeft: '14px',
                          borderLeft: '2px solid #e0ddd8',
                        }}>{d.tradeoff}</p>
                        <div style={{
                          borderRadius: '10px',
                          overflow: 'hidden',
                          background: '#fff',
                          padding: '28px 24px 20px',
                        }}>
                          {d.diagram}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Patient process (after problem section) ── */}
      {section.id === 'problem' && (
        <div style={{ ...col, marginTop: '48px', paddingBottom: '0' }}>
          <img
            src="assets/foot-care/patient-process-1.png"
            alt="Patient process diagram"
            style={{ width: '100%', display: 'block', borderRadius: '10px' }}
          />
        </div>
      )}

      {/* ── Screen recording (after decisions section) ── */}
      {section.id === 'decisions' && (
        <div style={{ marginTop: '48px', background: '#0d0d0d', display: 'flex', justifyContent: 'center', padding: '48px var(--page-padding)' }}>
          <div style={{ width: '100%', maxWidth: '900px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.5)' }}>
            <video src="assets/foot-care/screen-recording-portfolio.mp4" autoPlay muted loop playsInline style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
      )}


      {/* ── Bottom padding ── */}
      <div style={{ height: '72px' }} />
    </section>
  );
};

Object.assign(window, { CaseStudyFootCare, FootCareSection });

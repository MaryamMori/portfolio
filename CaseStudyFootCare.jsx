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
    @keyframes fc-icon-spin-once {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes fc-title-reveal-once {
      from { opacity: 0; transform: translateX(-6px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    .fc-decision-title {
      transition: transform 0.2s ease;
    }
    .fc-decision-btn:hover .fc-decision-title {
      transform: translateX(4px);
    }
    .fc-decision-icon-wrap {
      display: inline-flex;
      transition: transform 0.25s ease;
    }
    .fc-decision-btn:hover .fc-decision-icon-wrap {
      transform: rotate(90deg);
    }
  `;
  document.head.appendChild(s);
}

const CaseStudyFootCare = ({ goTo, goToWork }) => {
  const sections = [
    {
      id: 'problem',
      label: '01 · The Problem',
      heading: 'Care Built Around Symptoms, Not Patterns',
      body: [
        'Foot conditions, particularly for people managing diabetes, are far easier to treat when caught early, yet current care pathways are largely reactive and episodic. A person visits a clinic once something already hurts, a specialist interprets the measurements, and an intervention follows.',
        'While pressure mapping, gait analysis, and foot geometry tools can detect subtle biomechanical shifts weeks or months before symptoms appear, those signals either go uncaptured outside the clinic or remain too technical for a non-specialist to interpret. The challenge was not to design a diagnostic device, but a system that makes longitudinal biomechanical data interpretable enough to prompt earlier awareness for both individuals and their care providers.',
      ],
    },
    {
      id: 'users',
      label: '02 · Users & Context',
      heading: 'Two Literacy Levels, One Shared Event',
      body: [
        'The system needed to serve two distinct user groups looking at the exact same measurement sessions for different reasons:',
      ],
      users: [
        {
          type: 'Individuals (Primary Daily Users)',
          desc: 'People managing ongoing foot health risks without specialist training. They do not need raw sensor maps, they need a clear, calm signal answering: Is this normal, or does this warrant attention?',
        },
        {
          type: 'Professionals (Clinicians, Orthotists & Foot Care Specialists)',
          desc: 'Practitioners who need interpretive depth and a shared visual reference during patient conversations.',
        },
      ],
    },
    {
      id: 'constraints',
      label: '03 · Hard Constraints',
      heading: 'Four constraints governed the system architecture',
      constraints: [
        {
          title: 'No Access to Real Patient Data',
          body: 'Validation relied on expert evaluation of design plausibility rather than longitudinal clinical trials, producing a tested product architecture rather than a clinically proven product.',
        },
        {
          title: 'The Boundary Between Monitoring and Diagnosis',
          body: "Surfacing biomechanical anomalies carries real risk of causing unwarranted anxiety or clinical overreach; defining where the software's responsibility stops was a core design constraint.",
        },
        {
          title: 'Longitudinal Engagement',
          body: 'A one-time reading has limited preventive value; communicating gradual change over time was essential to encourage sustained monitoring.',
        },
        {
          title: 'Dual-User Scope Within One System',
          body: 'Building two separate applications was out of scope; one coherent interface had to serve both lay users and specialists without diluting clarity or depth.',
        },
      ],
    },
    {
      id: 'decisions',
      label: '04 · Decisions',
      heading: 'Key Product & System Decisions',
    },
    {
      id: 'validation',
      label: '05 · Validation, Limitations & Next Steps',
      heading: 'What the expert testing showed, and what is still untested',
      body: [
        'Because real patient data was outside thesis scope, I conducted expert usability testing with practitioners across clinical foot care, orthopedic shoe technology, product development, and biomechanics-adjacent practice.',
        React.createElement(React.Fragment, null, React.createElement(FzLead, null, 'What Held Up:'), ' Evaluations confirmed that the core workflow structure, navigation, and layered information hierarchy were clear, navigable, and supportive of clinical reasoning for professional users.'),
      ],
      priorities: [
        { lead: 'Feedback States', text: 'Sharpening system status and confirmation cues.' },
        { lead: 'Recommendation Editing', text: 'Giving specialists greater flexibility to adjust suggested actions.' },
        { lead: 'Secure Data Sharing', text: 'Designing explicit consent and sharing flows between individuals and clinics.' },
        { lead: 'Clinical Data Visualization', text: 'Refining chart density and visual hierarchy for faster specialist interpretation.' },
      ],
      bodyAfter: React.createElement(React.Fragment, null, React.createElement(FzLead, null, 'Biggest Open Question (Untested Hypothesis):'), ' While the architecture was validated with experts, sustained engagement by individuals over weeks and months requires longitudinal behavioral testing with real patients.'),
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
        {/* Cover video — bottom-right, scaled to 2/3 */}
        <div style={{ position: 'absolute', right: '96px', bottom: '96px', width: '66.67%', height: '66.67%', transform: 'scale(1.1)', transformOrigin: 'bottom right', borderRadius: '54px', overflow: 'hidden', pointerEvents: 'none' }}>
          <video
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'right center', borderRadius: '54px', display: 'block' }}
          >
            <source src="assets/foot-care/footcare-hero.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Gradient overlays — for text legibility only, video stays dominant */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(12,12,12,.9) 0%,rgba(12,12,12,.6) 32%,rgba(12,12,12,.15) 58%,transparent 78%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(12,12,12,.8) 0%,rgba(12,12,12,.3) 32%,transparent 55%)', pointerEvents: 'none' }} />

        {/* Back button */}
        <div style={{ position: 'absolute', top: '52px', left: 'var(--page-padding)', animation: 'fizik-fade-in .7s ease .25s both', zIndex: 10 }}>
          <button
            className="tap-target"
            onClick={() => goToWork()}
            style={{ background: 'none', border: 'none', padding: 0, color: '#A8A8A8', fontSize: '13px', letterSpacing: '.04em', cursor: 'pointer', fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', alignItems: 'center', gap: '8px' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
            onMouseLeave={e => e.currentTarget.style.color = '#A8A8A8'}
          >← All work</button>
        </div>
        {/* Counter */}
        <div style={{ position: 'absolute', top: '52px', right: 'var(--page-padding)', fontSize: '12px', color: '#A8A8A8', letterSpacing: '.14em', textTransform: 'uppercase', animation: 'fizik-fade-in .7s ease .3s both', zIndex: 10 }}>
          Case study: 03 / 03
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 5 }}>
          <div style={{ fontSize: '12px', color: '#A8A8A8', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: '36px', animation: 'fizik-fade-up .7s cubic-bezier(.16,1,.3,1) .35s both' }}>
            HCI Master's Thesis &nbsp;·&nbsp; Healthtech &nbsp;·&nbsp; Biomechanics &nbsp;·&nbsp; Research-to-Product
          </div>
          <h1 aria-label="Preventive Foot Care Platform" style={{ marginBottom: '44px', fontSize: 'inherit', fontWeight: 'inherit', fontFeatureSettings: 'normal' }}>
            <WordReveal text="Preventive Foot Care" startDelay={0.48} wordDelay={0.09} style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(40px,7vw,96px)', fontWeight: 700, lineHeight: 0.93, letterSpacing: '-0.03em', color: '#fff', marginBottom: '4px' }} />
            <WordReveal text="Platform" startDelay={0.72} wordDelay={0.1} style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(40px,7vw,96px)', fontWeight: 700, lineHeight: 0.93, letterSpacing: '-0.03em', color: '#6E6E6E' }} />
          </h1>
          <div style={{ fontSize: 'clamp(15px,1.8vw,19px)', color: 'rgba(255,255,255,.46)', maxWidth: '460px', lineHeight: 1.62, letterSpacing: '-0.2px', marginBottom: '56px', animation: 'fizik-fade-up .85s cubic-bezier(.16,1,.3,1) .9s both', textWrap: 'pretty' }}>
            Translating clinical biomechanics research into a dual-user digital architecture for early detection and longitudinal foot health monitoring.
          </div>
          {/* Meta bar */}
          <div className="fz-meta-bar fz-meta-bar-3">
            {[
              { label: 'Role',                 value: "Product Designer (HCI Master's Thesis)" },
              { label: 'Scope',                value: 'Domain Research · Product Strategy · System Architecture · UX/UI · Prototyping' },
              { label: 'Context & Validation', value: 'University of Siegen · Developed with Clinical & Academic Experts · Expert Usability Testing' },
            ].map((item, i) => (
              <div key={item.label} style={{ paddingLeft: i > 0 ? '24px' : 0, paddingRight: i < 2 ? '24px' : 0, borderRight: i < 2 ? '1px solid rgba(255,255,255,.07)' : 'none' }}>
                <div style={{ fontSize: '12px', color: '#A8A8A8', letterSpacing: '.13em', textTransform: 'uppercase', marginBottom: '6px' }}>{item.label}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.58)', lineHeight: 1.4, letterSpacing: '-0.1px' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '36px', right: 'var(--page-padding)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', animation: 'fizik-fade-in 1s ease 1.5s both', zIndex: 5 }}>
          <span style={{ fontSize: '12px', color: '#A8A8A8', letterSpacing: '.16em', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll</span>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom,rgba(255,255,255,.14),transparent)' }} />
        </div>
      </section>


      {/* ── Core Design Thesis ── */}
      <FzHighlights id="fc-thesis-title" title="Core Design Thesis" items={[
        { lead: 'From Reactive Symptoms to Longitudinal Patterns', text: 'Designed an early-awareness monitoring system to surface subtle pressure and gait shifts weeks or months before visible foot complications appear.' },
        { lead: 'Single Layered System for Two Literacy Levels',   text: 'Replaced separate patient/clinician interfaces with one shared architecture that defaults to plain-language directional signals for individuals while exposing clinical pressure maps on demand.' },
        { lead: 'Explicit Clinical Boundaries',                    text: 'Structured every system output around baseline comparison and early awareness rather than diagnosis, keeping medical judgment with professionals.' },
      ]} />

      {/* ── Contents side navigation (shared component) ── */}
      <FzContents contentSelector=".fc-col" items={[
        { id: 'problem',     label: 'Problem' },
        { id: 'users',       label: 'Users' },
        { id: 'constraints', label: 'Constraints' },
        { id: 'decisions',   label: 'Decisions' },
        { id: 'validation',  label: 'Validation' },
      ]} />

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
            fontSize: '12px',
            color: '#A8A8A8',
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
              href={mailtoHref(DEFAULT_SUBJECT)}
              className="tap-target"
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
            <button className="tap-target" onClick={() => goToWork()} style={{ background: 'none', border: '1px solid rgba(255,255,255,.12)', borderRadius: '9999px', padding: '10px 20px', color: '#A8A8A8', fontSize: '13px', letterSpacing: '.03em', cursor: 'pointer', fontFamily: "'DM Sans', system-ui, sans-serif", transition: 'color .2s,border-color .2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#A8A8A8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; }}
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
  const sectionRef = React.useRef(null);
  const decisionRowRefs = React.useRef({});
  const isAlt = idx % 2 === 1;
  const isDecisions = section.id === 'decisions';
  const bg = isAlt ? '#f5f5f7' : '#ffffff';
  const col = { maxWidth: 'var(--content-width)', margin: '0 auto', padding: '0 var(--page-padding)' };

  // Heading+subtitle block: same scroll-reveal as the Selected Work heading
  React.useEffect(() => {
    if (typeof gsap === 'undefined' || !sectionRef.current) return;
    const ctx = gsap.context(() => { window.animWorkHeading(sectionRef.current); });
    return () => ctx.revert();
  }, []);

  // Decision rows — one-time scroll-into-view animation (icon spin + title reveal)
  React.useEffect(() => {
    if (!isDecisions) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const rowEl = entry.target;
        const icon = rowEl.querySelector('.fc-decision-icon');
        const title = rowEl.querySelector('.fc-decision-title');

        if (icon) {
          icon.style.animation = 'fc-icon-spin-once 0.4s ease';
          icon.addEventListener('animationend', () => { icon.style.animation = ''; }, { once: true });
        }
        if (title) {
          title.style.animation = 'fc-title-reveal-once 0.3s ease';
          title.addEventListener('animationend', () => { title.style.animation = ''; }, { once: true });
        }

        observer.unobserve(rowEl);
      });
    }, { threshold: 0.5 });

    Object.values(decisionRowRefs.current).forEach((el) => { if (el) observer.observe(el); });

    return () => observer.disconnect();
  }, [isDecisions]);

  const toggleDecision = (id) => {
    accordionOpen[id] = !accordionOpen[id];
    forceUpdate();
  };

  const decisions = [
    {
      id: 'd1',
      n: '01',
      title: 'One Layered Interface Over Separate Patient & Clinician Apps',
      decision: 'Designed a single layered architecture where the default view presents an accessible signal for individuals, and an on-demand detail layer exposes raw pressure maps and trend charts for professionals.',
      tradeoff: 'Specialists have to expand a secondary layer to reach full clinical nuance, accepted so that patients and clinicians can look at the exact same screen and hold a grounded conversation around the same event.',
      caption: 'System Structure: Choosing a single layered system (Option B) over separate interfaces (Option A) removes translation friction during consultations.',
      diagram: (
        <svg viewBox="0 0 560 310" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', minWidth:'560px', height:'auto', display:'block', fontFamily:"'DM Sans', system-ui, sans-serif" }}>
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
          <text x="140" y="169" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">Separate interfaces</text>
          {/* Option B — chosen */}
          <rect x="310" y="120" width="220" height="68" rx="14" fill="#2B7A56"/>
          <text x="420" y="149" textAnchor="middle" fontSize="13" fontWeight="600" fill="white" fontFamily="inherit">Option B, chosen</text>
          <text x="420" y="169" textAnchor="middle" fontSize="12" fill="white" fontFamily="inherit">Single layered system</text>
          {/* Arrow down from B */}
          <line x1="420" y1="188" x2="420" y2="230" stroke="#2B7A56" strokeWidth="1" markerEnd="url(#d1ag)"/>
          {/* Individual + Professional */}
          <rect x="310" y="230" width="220" height="60" rx="14" fill="#2B7A56"/>
          <text x="420" y="256" textAnchor="middle" fontSize="13" fontWeight="600" fill="white" fontFamily="inherit">Individual + Professional</text>
          <text x="420" y="276" textAnchor="middle" fontSize="12" fill="white" fontFamily="inherit">Same screen, different depth</text>
        </svg>
      ),
    },
    {
      id: 'd2',
      n: '02',
      title: 'Insight Framing Over Raw Sensor Visualization',
      decision: 'Placed an interpretation layer between raw sensor outputs and the primary UI, translating pressure and gait readings into named, plain-language insights (areas of concern, directional changes, and baseline comparisons) that explain what the data means rather than what the sensor recorded.',
      tradeoff: 'Expert users lose immediate raw data in the primary flow, mitigated by keeping full sensor views one layer deep.',
      caption: 'From Signal to Meaning: Raw pressure and gait data passes through an interpretation layer before surfacing as a named insight.',
      diagram: (
        <svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', minWidth:'720px', height:'auto', display:'block', fontFamily:"'DM Sans', system-ui, sans-serif" }}>
          <defs>
            <marker id="d2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M1 2L8 5L1 8" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          </defs>
          {/* Left: Raw data */}
          <rect x="20" y="55" width="172" height="80" rx="14" fill="white" stroke="#C43B3B" strokeWidth="1.5"/>
          <text x="106" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Raw data</text>
          <text x="106" y="108" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">Pressure maps, gait outputs</text>
          <text x="106" y="158" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">Accurate but uninterpretable</text>
          <text x="106" y="174" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">without training</text>
          {/* Arrow */}
          <line x1="192" y1="95" x2="224" y2="95" stroke="#bbb" strokeWidth="1" markerEnd="url(#d2a)"/>
          {/* Center: Interpretation Layer */}
          <rect x="224" y="36" width="272" height="118" rx="14" fill="#9B3030"/>
          <text x="360" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="white" fontFamily="inherit">Interpretation Layer</text>
          <text x="360" y="102" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.8)" fontFamily="inherit">Patterns named, changes flagged,</text>
          <text x="360" y="118" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.8)" fontFamily="inherit">readings compared</text>
          {/* Arrow */}
          <line x1="496" y1="95" x2="514" y2="95" stroke="#bbb" strokeWidth="1" markerEnd="url(#d2a)"/>
          {/* Right: Named insight */}
          <rect x="514" y="55" width="200" height="80" rx="14" fill="white" stroke="#e0e0e0" strokeWidth="1"/>
          <text x="614" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Named insight</text>
          <text x="614" y="108" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">What it means, what to consider</text>
          <text x="614" y="158" textAnchor="middle" fontSize="12" fill="#666" fontFamily="inherit">Readable by anyone.</text>
          <text x="614" y="174" textAnchor="middle" fontSize="12" fill="#666" fontFamily="inherit">Detail available on demand.</text>
          {/* Bottom caption */}
          <text x="360" y="210" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">The interface communicates what the data means, not what the data is.</text>
        </svg>
      ),
    },
    {
      id: 'd3',
      n: '03',
      title: 'Calibrated Early-Awareness Framing Over Diagnostic Verdicts',
      decision: "Positioned the system strictly as an early-awareness tool rather than a diagnostic engine. Every system message follows a strict three-part structure: what changed, how it compares to the user's personal baseline, and what next step to consider, leaving clinical diagnosis entirely to professionals.",
      tradeoff: 'Avoids decisive "red-alert" verdicts that could feel more dramatic or authoritative in a demo, deliberately trading visual urgency for clinical safety and honest trust boundaries.',
      caption: 'Calibrating Clinical Tone: Balancing between overclaiming (diagnostic verdicts that trigger anxiety) and under-communicating (vague outputs with no clear action).',
      diagram: (
        <svg viewBox="0 0 720 270" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', minWidth:'720px', height:'auto', display:'block', fontFamily:"'DM Sans', system-ui, sans-serif" }}>
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
          <text x="120" y="72" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.75)" fontFamily="inherit">Overclaims clinical significance</text>
          <line x1="120" y1="88" x2="120" y2="123" stroke="#ddd" strokeWidth="1"/>
          <text x="120" y="152" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">Creates anxiety,</text>
          <text x="120" y="168" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">Harms trust</text>
          {/* Center: Chosen awareness tool */}
          <rect x="240" y="16" width="240" height="64" rx="14" fill="#2B7A56"/>
          <text x="360" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="white" fontFamily="inherit">Chosen: awareness tool</text>
          <text x="360" y="152" textAnchor="middle" fontSize="12" fill="#444" fontFamily="inherit">Here is what changed.</text>
          <text x="360" y="170" textAnchor="middle" fontSize="12" fill="#444" fontFamily="inherit">Here is how it compares to your baseline.</text>
          <text x="360" y="188" textAnchor="middle" fontSize="12" fill="#444" fontFamily="inherit">Here is what you might consider doing.</text>
          {/* Right: Too cautious */}
          <rect x="500" y="24" width="200" height="64" rx="14" fill="white" stroke="#C43B3B" strokeWidth="1.5"/>
          <text x="600" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Too cautious</text>
          <text x="600" y="72" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">No actionable signal</text>
          <line x1="600" y1="88" x2="600" y2="123" stroke="#ddd" strokeWidth="1"/>
          <text x="600" y="152" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">Reduces utility.</text>
          <text x="600" y="168" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">No reason to return.</text>
          {/* Bottom caption */}
          <text x="360" y="244" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">The interface communicates what the data means, not what the data is.</text>
        </svg>
      ),
    },
    {
      id: 'd4',
      n: '04',
      title: 'Longitudinal Direction Over Single-Session Snapshots',
      decision: 'Built the data model around temporal comparison rather than isolated readings, surfacing a simple directional status (improving, stable, or attention needed) for individuals while reserving detailed historical trend charts for the professional layer.',
      tradeoff: 'Simplifying the default longitudinal view hides granular historical curves from immediate view, and the hypothesis that directional feedback sustains long-term patient habit remains untested outside clinical trials.',
      caption: 'Designing for Time: A single snapshot shows state; a longitudinal record makes gradual drift visible before symptoms emerge.',
      diagram: (
        <svg viewBox="0 0 720 310" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', minWidth:'720px', height:'auto', display:'block', fontFamily:"'DM Sans', system-ui, sans-serif" }}>
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
          <text x="580" y="54" textAnchor="middle" fontSize="12" fill="white" fontFamily="inherit">Chosen approach</text>
          {/* Arrows down */}
          <line x1="140" y1="68" x2="140" y2="104" stroke="#ccc" strokeWidth="1" markerEnd="url(#d4a)"/>
          <line x1="580" y1="68" x2="580" y2="104" stroke="#2B7A56" strokeWidth="1" markerEnd="url(#d4ag)"/>
          {/* Left card */}
          <rect x="20" y="104" width="240" height="114" rx="14" fill="#f8f8f8" stroke="#e8e8e8" strokeWidth="1"/>
          <circle cx="140" cy="150" r="28" fill="white" stroke="#ddd" strokeWidth="1"/>
          <text x="140" y="155" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">Reading</text>
          <text x="140" y="240" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">No baseline. No context.</text>
          <text x="140" y="256" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">Is this normal? Unknown</text>
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
          <text x="580" y="240" textAnchor="middle" fontSize="12" fill="#555" fontFamily="inherit">Direction visible over time.</text>
          <text x="580" y="256" textAnchor="middle" fontSize="12" fill="#555" fontFamily="inherit">Improving, stable, or attention needed</text>
          {/* Bottom caption */}
          <text x="360" y="292" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">A one-time measurement is not preventive care.</text>
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} id={section.id} style={{ background: bg, borderTop: '1px solid rgba(0,0,0,0.05)' }}>

      {/* ── Constrained column: label + heading + body ── */}
      <div className="fc-col" style={{ ...col, paddingTop: '72px', paddingBottom: '0' }}>
        <div style={{
          fontSize: '12px', fontWeight: 400, color: '#a63636',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}>
          {section.label}
        </div>
        <h2 data-anim="work-label" style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 600,
          lineHeight: 1.2, letterSpacing: '-0.374px', color: '#1d1d1f',
          marginBottom: '24px', textWrap: 'pretty',
        }}>
          {section.heading}
        </h2>

        {section.body && section.body.map((para, i) => (
          <p key={i} data-anim={i === 0 ? 'work-sub' : undefined} style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 'var(--body-font-size)', fontWeight: 400, lineHeight: 'var(--body-line-height)',
            letterSpacing: '-0.374px', color: '#1d1d1f', opacity: 0.82,
            marginBottom: i < section.body.length - 1 ? '20px' : (section.users || section.bodyAfter || section.priorities ? '24px' : 0),
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
                <h3 style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '13px', fontWeight: 600, lineHeight: 1.4, color: '#a63636',
                  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px',
                }}>
                  {u.type}
                </h3>
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
          <figure style={{ margin: '32px 0' }}>
            <div role="img" tabIndex={0} style={{ overflowX: 'auto' }} aria-label="One Session, Two Levels of Access: Both users reference the same measurement event. Individuals see simplified directional insights by default, while professionals access pressure maps and trend charts on demand.">
            <svg viewBox="40 0 820 480" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', minWidth:'820px', height:'auto', display:'block', fontFamily:"'DM Sans', system-ui, sans-serif" }}>
              <defs>
                <marker id="s3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M1 2L8 5L1 8" fill="none" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </marker>
              </defs>
              {/* Top label */}
              <text x="450" y="18" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">Shared measurement session</text>
              {/* Top box */}
              <rect x="175" y="28" width="550" height="72" rx="18" fill="white" stroke="#C43B3B" strokeWidth="1.5"/>
              <text x="450" y="59" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Foot pressure + gait data</text>
              <text x="450" y="79" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">Pattern detection · Baseline comparison · Change over time</text>
              {/* Fork */}
              <line x1="450" y1="100" x2="450" y2="146" stroke="#bbb" strokeWidth="1.5"/>
              <line x1="175" y1="146" x2="725" y2="146" stroke="#bbb" strokeWidth="1.5"/>
              <line x1="175" y1="146" x2="175" y2="168" stroke="#bbb" strokeWidth="1.5" markerEnd="url(#s3a)"/>
              <line x1="725" y1="146" x2="725" y2="168" stroke="#bbb" strokeWidth="1.5" markerEnd="url(#s3a)"/>
              {/* Individual */}
              <rect x="55" y="168" width="240" height="70" rx="18" fill="#2B7A56"/>
              <text x="175" y="199" textAnchor="middle" fontSize="14" fontWeight="600" fill="white" fontFamily="inherit">Individual</text>
              <text x="175" y="220" textAnchor="middle" fontSize="12" fill="white" fontFamily="inherit">No biomechanical literacy assumed</text>
              {/* Professional */}
              <rect x="605" y="168" width="240" height="70" rx="18" fill="#4A6BAF"/>
              <text x="725" y="199" textAnchor="middle" fontSize="14" fontWeight="600" fill="white" fontFamily="inherit">Professional</text>
              <text x="725" y="220" textAnchor="middle" fontSize="12" fill="white" fontFamily="inherit">Clinician, orthotist, foot care specialist</text>
              {/* Arrows */}
              <line x1="175" y1="238" x2="175" y2="268" stroke="#bbb" strokeWidth="1.5" markerEnd="url(#s3a)"/>
              <line x1="725" y1="238" x2="725" y2="268" stroke="#bbb" strokeWidth="1.5" markerEnd="url(#s3a)"/>
              {/* Simplified insight */}
              <rect x="55" y="268" width="240" height="70" rx="18" fill="#2B7A56"/>
              <text x="175" y="299" textAnchor="middle" fontSize="14" fontWeight="600" fill="white" fontFamily="inherit">Simplified insight (default)</text>
              <text x="175" y="320" textAnchor="middle" fontSize="12" fill="white" fontFamily="inherit">Pattern, change signal, next step</text>
              {/* Detailed data */}
              <rect x="605" y="268" width="240" height="70" rx="18" fill="#4A6BAF"/>
              <text x="725" y="299" textAnchor="middle" fontSize="14" fontWeight="600" fill="white" fontFamily="inherit">Detailed data (default)</text>
              <text x="725" y="320" textAnchor="middle" fontSize="12" fill="white" fontFamily="inherit">Pressure maps, trend charts, readings</text>
              {/* Arrows */}
              <line x1="175" y1="338" x2="175" y2="376" stroke="#bbb" strokeWidth="1.5" markerEnd="url(#s3a)"/>
              <line x1="725" y1="338" x2="725" y2="376" stroke="#bbb" strokeWidth="1.5" markerEnd="url(#s3a)"/>
              {/* Detail on demand */}
              <rect x="55" y="376" width="240" height="70" rx="18" fill="white" stroke="#C43B3B" strokeWidth="1.5"/>
              <text x="175" y="407" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Detail on demand</text>
              <text x="175" y="428" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">Same data, more context if needed</text>
              {/* Shared view */}
              <rect x="605" y="376" width="240" height="70" rx="18" fill="white" stroke="#C43B3B" strokeWidth="1.5"/>
              <text x="725" y="407" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1a1a1a" fontFamily="inherit">Shared view</text>
              <text x="725" y="428" textAnchor="middle" fontSize="12" fill="#666666" fontFamily="inherit">Same session, basis for conversation</text>
              {/* Dashed connector */}
              <line x1="295" y1="411" x2="605" y2="411" stroke="#ccc" strokeWidth="1" strokeDasharray="6 4"/>
            </svg>
            </div>
            <figcaption className="fz-caption">One Session, Two Levels of Access: Both users reference the same measurement event. Individuals see simplified directional insights by default, while professionals access pressure maps and trend charts on demand.</figcaption>
          </figure>
        )}

        {section.id === 'users' && (
          <div style={{ marginBottom: '32px' }}>
            <img
              src="assets/foot-care/results.webp"
              alt="Results"
              width="1200" height="838" decoding="async" loading="lazy"
              style={{ height: 'auto', maxWidth: 'min(600px, 100%)', display: 'block', margin: '0 auto', borderRadius: '12px' }}
            />
          </div>
        )}

        {/* Next-iteration priorities: subheading + short items with bold lead-ins */}
        {section.priorities && (
          <div style={{ marginBottom: section.bodyAfter ? '24px' : 0 }}>
            <h3 style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '18px', fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.374px',
              color: '#1d1d1f', margin: '8px 0 16px',
            }}>
              Four Concrete Priorities for Next Iteration
            </h3>
            <FzList items={section.priorities} />
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
                <h3 style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '12px', fontWeight: 600, lineHeight: 1.4,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#a63636', marginBottom: '10px',
                }}>
                  {c.title}
                </h3>
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
                <div key={d.id} ref={el => { decisionRowRefs.current[d.id] = el; }} style={{
                  borderTop: '1px solid #e0ddd8',
                  borderBottom: i === decisions.length - 1 ? '1px solid #e0ddd8' : 'none',
                }}>
                  <button
                    className="fc-decision-btn"
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
                      fontSize: '12px', letterSpacing: '0.08em',
                      color: '#a63636', fontWeight: 500,
                      paddingTop: '3px', minWidth: '24px', flexShrink: 0,
                    }}>{d.n}</span>
                    <span role="heading" aria-level="3" className="fc-decision-title" style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '18px', fontWeight: 600, lineHeight: 1.3,
                      color: '#1d1d1f', flex: 1,
                      letterSpacing: '-0.374px',
                    }}>{d.title}</span>
                    <span className="fc-decision-icon-wrap" style={{ flexShrink: 0 }}>
                      <svg
                        className="fc-decision-icon"
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
                    </span>
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
                        <p style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: 'var(--secondary-font-size)', lineHeight: 'var(--secondary-line-height)',
                          color: '#3d3d3a', margin: 0,
                        }}><FzLead>The Decision:</FzLead> {d.decision}</p>
                        <p style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: 'var(--caption-font-size)', lineHeight: 'var(--caption-line-height)',
                          color: '#666666', margin: 0,
                          paddingLeft: '14px',
                          borderLeft: '2px solid #e0ddd8',
                        }}><FzLead>The Trade-off:</FzLead> {d.tradeoff}</p>
                        <figure style={{ margin: 0 }}>
                          <div role="img" aria-label={d.caption} tabIndex={0} style={{
                            borderRadius: '10px',
                            overflowX: 'auto',
                            background: '#fff',
                            padding: '28px 24px 20px',
                          }}>
                            {d.diagram}
                          </div>
                          <figcaption className="fz-caption">{d.caption}</figcaption>
                        </figure>

                        {d.id === 'd1' && (
                          <img
                            src="assets/foot-care/ux-sitemap.webp"
                            alt="UX sitemap"
                            width="1576" height="669" decoding="async" loading="lazy"
                            style={{ height: 'auto', maxWidth: '100%', display: 'block', margin: '0 auto', borderRadius: '12px' }}
                          />
                        )}

                        {d.id === 'd2' && (
                          <div style={{ display: 'flex', gap: '16px' }}>
                            <img
                              src="assets/foot-care/questionnaire-pre-examination.webp"
                              alt="Questionnaire and pre-examination screen"
                              width="756" height="528" decoding="async" loading="lazy"
                              style={{ height: 'auto', width: '48%', borderRadius: '12px', objectFit: 'contain' }}
                            />
                            <img
                              src="assets/foot-care/questionnaire-pre-examination-modal.webp"
                              alt="Questionnaire and pre-examination screen with tooltip open"
                              width="756" height="528" decoding="async" loading="lazy"
                              style={{ height: 'auto', width: '48%', borderRadius: '12px', objectFit: 'contain' }}
                            />
                          </div>
                        )}

                        {d.id === 'd3' && (
                          <img
                            src="assets/foot-care/new-customer-popup.webp"
                            alt="New customer pop-up"
                            width="960" height="671" decoding="async" loading="lazy"
                            style={{ height: 'auto', maxWidth: 'min(480px, 100%)', display: 'block', margin: '0 auto', borderRadius: '12px' }}
                          />
                        )}

                        {d.id === 'd4' && (
                          <img
                            src="assets/foot-care/data-history-3.webp"
                            alt="Data history view"
                            width="960" height="686" decoding="async" loading="lazy"
                            style={{ height: 'auto', maxWidth: 'min(480px, 100%)', display: 'block', margin: '0 auto', borderRadius: '12px' }}
                          />
                        )}
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
            src="assets/foot-care/patient-process-1.webp"
            alt="Patient process diagram"
            width="1672" height="1053" decoding="async" loading="lazy"
            style={{ height: 'auto', width: '100%', display: 'block', borderRadius: '10px' }}
          />
        </div>
      )}

      {/* ── Validation screenshot (after validation section text) ── */}
      {section.id === 'validation' && (
        <div style={{ ...col, marginTop: '32px', paddingBottom: '0' }}>
          <img
            src="assets/foot-care/drs-diagnosis-v2.webp"
            alt="Doctor's diagnosis view"
            width="1200" height="838" decoding="async" loading="lazy"
            style={{ height: 'auto', maxWidth: 'min(600px, 100%)', display: 'block', margin: '0 auto', borderRadius: '12px' }}
          />
        </div>
      )}

      {/* ── Bottom padding ── */}
      <div style={{ height: '72px' }} />
    </section>
  );
};

Object.assign(window, { CaseStudyFootCare, FootCareSection });

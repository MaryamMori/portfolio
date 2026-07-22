// ScrambleButton.jsx — button wrapper that scrambles its text label on hover.
// Global component (like WordReveal in CaseStudyFizik.jsx) — no imports, relies on
// script load order in index.html placing this before any page that uses it.

const SCRAMBLE_CHARS = '!@#$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SCRAMBLE_INTERVAL_MS = 40;
const SCRAMBLE_DURATION_MS = 400;
const SCRAMBLE_STEPS = Math.round(SCRAMBLE_DURATION_MS / SCRAMBLE_INTERVAL_MS);

const ScrambleButton = ({ children, onMouseEnter, onMouseLeave, ...rest }) => {
  const { useState, useEffect, useRef } = React;

  const text = typeof children === 'string' ? children : '';
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  // Keep display in sync if the label itself ever changes while idle
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseEnter = (e) => {
    stopScramble();
    let step = 0;
    intervalRef.current = setInterval(() => {
      step += 1;
      const resolvedCount = Math.floor((step / SCRAMBLE_STEPS) * text.length);
      let next = '';
      for (let i = 0; i < text.length; i++) {
        if (i < resolvedCount || text[i] === ' ') {
          next += text[i];
        } else {
          next += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      setDisplayText(next);
      if (step >= SCRAMBLE_STEPS) {
        stopScramble();
        setDisplayText(text);
      }
    }, SCRAMBLE_INTERVAL_MS);

    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e) => {
    stopScramble();
    setDisplayText(text);
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <button
      {...rest}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </button>
  );
};

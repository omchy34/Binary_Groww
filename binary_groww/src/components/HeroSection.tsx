"use client";
import React, { useState, useEffect, useRef } from "react";

const WORDS = [
  { text: "Websites.", color: "#22d3ee" },  // cyan
  { text: "Mobile Apps.", color: "#f97316" }, // orange
  { text: "Brands.", color: "#a855f7" },  // purple
  { text: "Experiences.", color: "#f43f5e" }, // pink-red
]

export default function Hero(): React.JSX.Element {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const word = WORDS[idx].text;
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && shown.length < word.length)
      t = setTimeout(() => setShown(word.slice(0, shown.length + 1)), 75);
    else if (!deleting && shown.length === word.length)
      t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && shown.length > 0)
      t = setTimeout(() => setShown(shown.slice(0, -1)), 38);
    else { setDeleting(false); setIdx(i => (i + 1) % WORDS.length); }
    return () => clearTimeout(t);
  }, [shown, deleting, idx]);

  useEffect(() => {
    const h = heroRef.current;
    if (!h) return;
    const fn = (e: MouseEvent) => {
      const r = h.getBoundingClientRect();
      setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const tx = (mouse.x - 0.5) * 20;
  const ty = (mouse.y - 0.5) * 12;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

        /* ── tokens ─────────────────────────────────── */
        .h-root {
          --bg: #08080f;
          --bg2: #0d0d1c;
          --accent: #a78bfa;
          --accent2: #7c3aed;
          --accent3: #c4b5fd;
          --accent-warm: #c4b5fd;
          --green: #22c55e;
          --text: #f5f3ff;
          --text2: rgba(245,243,255,0.55);
          --text3: rgba(245,243,255,0.22);
          --border: rgba(167,139,250,0.14);
          --border2: rgba(255,255,255,0.06);
          --font-display: 'Bricolage Grotesque', sans-serif;
          --font-body: 'Inter', sans-serif;
          --font-mono: 'DM Mono', monospace;
        }

        /* ── section ─────────────────────────────────── */
        .h-wrap {
          position: relative;
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 92px;
        }

        /* ── background layers ────────────────────────── */
        .h-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(167,139,250,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.08) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 36%, black 5%, transparent 100%);
        }
        .h-bg-noise {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.018;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
        }

        /* ── ambient glows ────────────────────────────── */
        .h-glow {
          position: absolute; border-radius: 50%;
          pointer-events: none;
          will-change: transform;
          transition: transform 2s cubic-bezier(0.16,1,0.3,1);
        }
        .h-glow-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 65%);
          top: -240px; right: -140px;
        }
        .h-glow-2 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(196,181,253,0.07) 0%, transparent 70%);
          bottom: -120px; left: -80px;
        }
        .h-glow-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%);
          top: 42%; left: 36%;
        }

        /* ── inner grid ───────────────────────────────── */
        .h-inner {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto;
          padding: 72px 48px 96px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 88px;
          align-items: center;
        }

        /* ── left col ─────────────────────────────────── */
        .h-left { display: flex; flex-direction: column; }

        /* availability badge */
        .h-badge {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(167,139,250,0.07);
          border: 1px solid rgba(167,139,250,0.16);
          border-radius: 100px;
          padding: 6px 16px 6px 11px;
          width: fit-content;
          margin-bottom: 32px;
          animation: h-fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        .h-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(167,139,250,0.9);
          animation: h-glow-dot 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes h-glow-dot {
          0%,100% { box-shadow: 0 0 5px rgba(167,139,250,0.7); }
          50% { box-shadow: 0 0 14px rgba(167,139,250,1), 0 0 24px rgba(167,139,250,0.3); }
        }
        .h-badge-txt {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.08em;
          color: rgba(167,139,250,0.75);
        }

        /* headline — standard readable size */
        .h-headline {
          font-family: var(--font-display);
          font-size: clamp(26px, 2.8vw, 40px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 4px;
          animation: h-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        .h-headline-dim {
          display: block;
          color: rgba(226,234,245,0.2);
          font-weight: 600;
        }
        .h-headline-grad {
          display: block;
          background: linear-gradient(118deg, #c4b5fd 0%, #a78bfa 50%, #7c3aed 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* typewriter — same size as headline for clean pairing */
        .h-typewriter {
          font-family: var(--font-display);
          font-size: clamp(26px, 2.8vw, 40px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--text);
          min-height: 1.3em;
          margin-bottom: 28px;
          animation: h-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both;
        }
        .h-tw-pre {
          color: rgba(226,234,245,0.22);
          font-weight: 600;
        }
       
        .h-cursor {
          display: inline-block;
          width: 2px; height: 0.6em;
          vertical-align: middle;
          margin-left: 3px;
          animation: h-blink 1s step-end infinite;
          border-radius: 2px;
        }
        @keyframes h-blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .h-sub {
          font-family: var(--font-body);
          font-size: 15px; font-weight: 400;
          color: var(--text2);
          line-height: 1.8;
          max-width: 460px;
          margin-bottom: 40px;
          animation: h-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }
        .h-sub strong {
          font-weight: 600;
          color: rgba(226,234,245,0.8);
        }

        .h-btns {
          display: flex; gap: 12px; flex-wrap: wrap;
          margin-bottom: 52px;
          animation: h-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both;
        }
        .h-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 30px;
          background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
          border-radius: 10px; color: #fff;
          font-family: var(--font-body);
          font-size: 14px; font-weight: 600;
          text-decoration: none; letter-spacing: -0.01em;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 28px rgba(124,58,237,0.38), 0 4px 16px rgba(0,0,0,0.25),
                      inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .h-btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 48px rgba(124,58,237,0.58), 0 8px 24px rgba(0,0,0,0.35),
                      inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .h-btn-primary:active { transform: translateY(0) scale(0.99); }
        .h-btn-primary svg { transition: transform 0.25s; }
        .h-btn-primary:hover svg { transform: translateX(3px); }

        .h-btn-ghost {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 28px;
          border: 1px solid rgba(226,234,245,0.1);
          border-radius: 10px;
          color: rgba(226,234,245,0.48);
          font-family: var(--font-body);
          font-size: 14px; font-weight: 500;
          text-decoration: none;
          background: rgba(255,255,255,0.02);
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          letter-spacing: -0.01em;
        }
        .h-btn-ghost:hover {
          border-color: rgba(167,139,250,0.35);
          color: var(--accent3);
          background: rgba(167,139,250,0.07);
          transform: translateY(-2px);
        }

        .h-stats {
          display: flex; gap: 0;
          animation: h-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both;
        }
        .h-stat {
          padding-right: 24px;
          border-right: 1px solid rgba(255,255,255,0.07);
          margin-right: 24px;
        }
        .h-stat:last-child { border-right: none; margin-right: 0; padding-right: 0; }
        .h-stat-n {
          font-family: var(--font-display);
          font-size: 24px; font-weight: 700;
          color: var(--text); line-height: 1; margin-bottom: 4px;
          letter-spacing: -0.03em;
        }
        .h-stat-n em {
          font-style: normal;
          color: var(--accent);
        }
        .h-stat-l {
          font-family: var(--font-body);
          font-size: 11px; font-weight: 400;
          color: var(--text3);
        }

        /* ── right col ────────────────────────────────── */
        .h-right {
          position: relative;
          animation: h-fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both;
        }

        .h-card {
          position: relative;
          border-radius: 20px;
          aspect-ratio: 3/4;
          background: var(--bg2);
          border: 1px solid rgba(167,139,250,0.12);
          overflow: visible;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.07);
          will-change: transform;
          transition: transform 0.1s linear;
        }
        .h-card-inner {
          position: absolute; inset: 0;
          border-radius: 20px; overflow: hidden;
        }
        .h-card::before {
          content: '';
          position: absolute; top: -1px; left: -1px;
          width: 56px; height: 56px;
          border-top: 1.5px solid var(--accent);
          border-left: 1.5px solid var(--accent);
          border-radius: 20px 0 0 0;
          z-index: 4; pointer-events: none; opacity: 0.65;
        }
        .h-card::after {
          content: '';
          position: absolute; bottom: -1px; right: -1px;
          width: 56px; height: 56px;
          border-bottom: 1.5px solid rgba(124,58,237,0.4);
          border-right: 1.5px solid rgba(124,58,237,0.4);
          border-radius: 0 0 20px 0;
          z-index: 4; pointer-events: none;
        }

        .h-photo-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: top center;
          display: block; border-radius: 20px;
        }
        .h-placeholder {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 14px;
        }
        .h-ph-ring {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(167,139,250,0.12), rgba(124,58,237,0.04));
          border: 1.5px dashed rgba(167,139,250,0.22);
          display: flex; align-items: center; justify-content: center;
        }
        .h-ph-init {
          font-family: var(--font-display);
          font-size: 16px; font-weight: 700;
          color: rgba(167,139,250,0.4);
        }
        .h-ph-hint {
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.08em;
          color: rgba(245,243,255,0.12);
          text-align: center; line-height: 1.8;
        }

        .h-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(
            to top,
            rgba(8,8,15,0.97) 0%,
            rgba(8,8,15,0.72) 42%,
            transparent 100%
          );
          padding: 36px 22px 24px;
          z-index: 2; border-radius: 0 0 20px 20px;
        }
        .h-founder-name {
          font-family: var(--font-display);
          font-size: 15px; font-weight: 700;
          color: var(--text); letter-spacing: -0.02em;
          margin-bottom: 3px;
        }
        .h-founder-role {
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.1em;
          color: var(--accent);
          margin-bottom: 10px;
          opacity: 0.7;
        }
        .h-founder-quote {
          font-family: var(--font-body);
          font-size: 12.5px; font-weight: 400; font-style: italic;
          color: rgba(226,234,245,0.32); line-height: 1.7;
        }

        .h-badge-float {
          position: absolute;
          background: rgba(8,8,20,0.88);
          border: 1px solid rgba(167,139,250,0.18);
          border-radius: 12px; padding: 10px 14px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 10;
          box-shadow: 0 8px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .h-badge-float.h-bf-top {
          top: 24px; right: -22px;
          animation: h-float 4s ease-in-out infinite;
        }
        .h-badge-float.h-bf-bot {
          bottom: 88px; left: -26px;
          animation: h-float 4s ease-in-out 1.8s infinite;
        }
        @keyframes h-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        .h-bf-lbl {
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(167,139,250,0.45); margin-bottom: 4px;
        }
        .h-bf-val {
          font-family: var(--font-body);
          font-size: 12.5px; font-weight: 500;
          color: var(--text);
          display: flex; align-items: center; gap: 7px;
        }
        .h-green-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px rgba(52,211,153,0.85);
          flex-shrink: 0;
          animation: h-glow-g 2.2s ease-in-out infinite;
        }
        @keyframes h-glow-g {
          0%,100% { box-shadow: 0 0 5px rgba(52,211,153,0.7); }
          50% { box-shadow: 0 0 14px rgba(52,211,153,1), 0 0 22px rgba(52,211,153,0.35); }
        }

        /* scroll indicator */
        .h-scroll {
          position: absolute; bottom: 28px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          z-index: 5; opacity: 0.2;
          animation: h-fadeUp 1s cubic-bezier(0.16,1,0.3,1) 1.2s both;
        }
        .h-scroll-txt {
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.28em;
          color: var(--text);
        }
        .h-scroll-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: h-grow 2.4s ease-in-out infinite;
        }
        @keyframes h-grow {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }

        @keyframes h-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* responsive */
        @media (max-width: 940px) {
          .h-inner {
            grid-template-columns: 1fr;
            gap: 56px; padding: 44px 24px 80px;
          }
          .h-right { order: -1; max-width: 300px; margin: 0 auto; width: 100%; }
          .h-badge-float.h-bf-top { right: -8px; }
          .h-badge-float.h-bf-bot { left: -8px; }
          .h-sub { max-width: 100%; }
        }
        @media (max-width: 500px) {
          .h-stats { flex-wrap: wrap; gap: 24px; }
          .h-stat { border-right: none; padding-right: 0; margin-right: 0; min-width: calc(50% - 12px); }
          .h-btns { flex-direction: column; }
          .h-btn-primary, .h-btn-ghost { justify-content: center; }
        }
      `}</style>

      <section className="h-root h-wrap" ref={heroRef}>
        {/* bg */}
        <div className="h-bg-grid" />
        <div className="h-bg-noise" />

        {/* parallax glows */}
        <div className="h-glow h-glow-1" style={{ transform: `translate(${tx * -0.7}px, ${ty * -0.7}px)` }} />
        <div className="h-glow h-glow-2" style={{ transform: `translate(${tx * 0.5}px, ${ty * 0.5}px)` }} />
        <div className="h-glow h-glow-3" style={{ transform: `translate(${tx * 0.3}px, ${ty * 0.3}px)` }} />

        <div className="h-inner">

          {/* ── LEFT ── */}
          <div className="h-left">

            {/* Badge */}
            <div className="h-badge">
              <span className="h-badge-dot" />
              <span className="h-badge-txt">// Available for new projects</span>
            </div>

            {/* Headline — mixed case, natural reading */}
            <h1 className="h-headline">
              <span className="h-headline-dim">Grow your business</span>
              <span className="h-headline-grad">with binaryGroww</span>
            </h1>

            {/* Typewriter */}
            <div className="h-typewriter">
              <span className="h-tw-pre">We build </span>
              <span className="h-tw-word" style={{ color: WORDS[idx].color }}>
                {shown}
              </span>
              <span className="h-cursor" style={{ background: WORDS[idx].color }} />
            </div>

            {/* Subtext — sentence case, friendly tone */}
            <p className="h-sub">
              From <strong>pixel-perfect websites</strong> to high-performance apps and data-driven marketing — we engineer digital growth that actually moves the needle.
            </p>

            {/* Buttons */}
            <div className="h-btns">
              <a href="#contact" className="h-btn-primary">
                Start your project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#work" className="h-btn-ghost">See our work</a>
            </div>

            {/* Stats */}
            <div className="h-stats">
              {[
                { n: "10", u: "+", l: "Projects delivered" },
                { n: "7", u: "+", l: "Happy clients" },
                { n: "100", u: "%", l: "On-time rate" },
                { n: "2", u: "+", l: "Years building" },
              ].map(({ n, u, l }) => (
                <div key={l} className="h-stat">
                  <div className="h-stat-n">{n}<em>{u}</em></div>
                  <div className="h-stat-l">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="h-right">

            {/* Floating badges */}
            <div className="h-badge-float h-bf-top">
              <div className="h-bf-lbl">Status</div>
              <div className="h-bf-val">
                <span className="h-green-dot" />
                Open to work
              </div>
            </div>

            <div className="h-badge-float h-bf-bot">
              <div className="h-bf-lbl">Response time</div>
              <div className="h-bf-val">⚡ Within 24hrs</div>
            </div>

            {/* Card */}
            <div
              className="h-card"
              style={{
                transform: `perspective(1000px) rotateY(${tx * 0.022}deg) rotateX(${-ty * 0.022}deg)`,
              }}
            >
              <div className="h-card-inner">

                <img
                  src="/main.png"
                  alt="Founder"
                  className="h-photo-img"
                />

                {/* <div className="h-placeholder">
                  <div className="h-ph-ring">
                    <span className="h-ph-init">You</span>
                  </div>
                  <div className="h-ph-hint">
                    Add your photo here<br />
                    /your-photo.jpg
                  </div>
                </div> */}

                <div className="h-overlay">
                  <div className="h-founder-name">Your Name</div>
                  <div className="h-founder-role">// Founder & Lead Developer</div>
                  <div className="h-founder-quote">
                    &ldquo;Building brands that dominate the digital world — one line of code at a time.&rdquo;
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="h-scroll">
          <span className="h-scroll-txt">scroll</span>
          <div className="h-scroll-line" />
        </div>
      </section>
    </>
  );
}
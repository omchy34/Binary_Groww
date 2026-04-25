"use client"
import React, { useState, useRef, useEffect } from "react";

export default function Contact(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const h = sectionRef.current;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1600));
    setSending(false);
    setSent(true);
  };

  const MAP_EMBED = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Sanaka+Educational+Trust+Group+of+Institutions,Malandighi,Durgapur,West+Bengal&zoom=15`;


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

        /* ── tokens (mirror Hero exactly) ─────────────── */
        .c-root {
          --bg: #08080f;
          --bg2: #0d0d1c;
          --accent: #a78bfa;
          --accent2: #7c3aed;
          --accent3: #c4b5fd;
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
        .c-wrap {
          position: relative;
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 92px;
        }

        /* ── background layers ───────────────────────── */
        .c-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(167,139,250,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.08) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 36%, black 5%, transparent 100%);
        }
        .c-bg-noise {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.018;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
        }

        /* ── glows ───────────────────────────────────── */
        .c-glow {
          position: absolute; border-radius: 50%; pointer-events: none;
          will-change: transform;
          transition: transform 2s cubic-bezier(0.16,1,0.3,1);
        }
        .c-glow-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 65%);
          top: -240px; right: -140px;
        }
        .c-glow-2 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(196,181,253,0.07) 0%, transparent 70%);
          bottom: -120px; left: -80px;
        }
        .c-glow-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%);
          top: 42%; left: 36%;
        }

        /* ── inner layout ─────────────────────────────── */
        .c-inner {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto;
          padding: 72px 48px 96px;
          width: 100%;
        }

        /* ── section header ──────────────────────────── */
        .c-header {
          text-align: center;
          margin-bottom: 64px;
          animation: c-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        .c-badge {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(167,139,250,0.07);
          border: 1px solid rgba(167,139,250,0.16);
          border-radius: 100px;
          padding: 6px 16px 6px 11px;
          margin-bottom: 24px;
        }
        .c-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(167,139,250,0.9);
          animation: c-glow-dot 2.2s ease-in-out infinite;
        }
        @keyframes c-glow-dot {
          0%,100% { box-shadow: 0 0 5px rgba(167,139,250,0.7); }
          50% { box-shadow: 0 0 14px rgba(167,139,250,1), 0 0 24px rgba(167,139,250,0.3); }
        }
        .c-badge-txt {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.08em;
          color: rgba(167,139,250,0.75);
        }
        .c-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.2vw, 48px);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 14px;
        }
        .c-title-dim { color: rgba(226,234,245,0.2); font-weight: 600; }
        .c-title-grad {
          background: linear-gradient(118deg, #c4b5fd 0%, #a78bfa 50%, #7c3aed 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .c-subtitle {
          font-family: var(--font-body);
          font-size: 15px; color: var(--text2);
          line-height: 1.8; max-width: 560px; margin: 0 auto;
        }

        /* ── two-column grid ──────────────────────────── */
        .c-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }

        /* ── left: info + map ─────────────────────────── */
        .c-left {
          display: flex; flex-direction: column; gap: 24px;
          animation: c-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }

        /* info card */
        .c-info-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px;
          position: relative;
          overflow: hidden;
        }
        .c-info-card::before {
          content: '';
          position: absolute; top: -1px; left: -1px;
          width: 48px; height: 48px;
          border-top: 1.5px solid var(--accent);
          border-left: 1.5px solid var(--accent);
          border-radius: 20px 0 0 0;
          opacity: 0.65;
        }
        .c-info-title {
          font-family: var(--font-display);
          font-size: 13px; font-weight: 700;
          color: var(--accent3);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .c-info-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid var(--border2);
        }
        .c-info-item:last-child { border-bottom: none; padding-bottom: 0; }
        .c-info-icon {
          width: 36px; height: 36px;
          background: rgba(167,139,250,0.08);
          border: 1px solid rgba(167,139,250,0.16);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .c-info-icon svg { color: var(--accent); }
        .c-info-label {
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.1em;
          color: var(--text3); margin-bottom: 4px;
        }
        .c-info-val {
          font-family: var(--font-body);
          font-size: 13.5px; font-weight: 500;
          color: var(--text); line-height: 1.6;
        }
        .c-info-val a {
          color: var(--accent3); text-decoration: none;
          transition: color 0.2s;
        }
        .c-info-val a:hover { color: var(--accent); }

        /* availability strip */
        .c-avail {
          display: flex; align-items: center; gap: 10px;
          background: rgba(34,197,94,0.05);
          border: 1px solid rgba(34,197,94,0.15);
          border-radius: 12px;
          padding: 12px 16px;
          margin-top: 20px;
        }
        .c-green-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 10px rgba(34,197,94,0.8);
          animation: c-glow-g 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes c-glow-g {
          0%,100% { box-shadow: 0 0 5px rgba(52,211,153,0.7); }
          50% { box-shadow: 0 0 14px rgba(52,211,153,1), 0 0 22px rgba(52,211,153,0.35); }
        }
        .c-avail-txt {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.07em;
          color: rgba(34,197,94,0.8);
        }
        .c-avail-sub {
          font-family: var(--font-body);
          font-size: 11px; color: rgba(34,197,94,0.45);
          margin-left: auto;
        }

        /* map */
        .c-map-wrap {
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border);
          aspect-ratio: 4/3;
          position: relative;
          background: var(--bg2);
        }
        .c-map-wrap::before {
          content: '';
          position: absolute; top: -1px; left: -1px;
          width: 48px; height: 48px;
          border-top: 1.5px solid var(--accent);
          border-left: 1.5px solid var(--accent);
          border-radius: 20px 0 0 0;
          z-index: 2; opacity: 0.65;
        }
        .c-map-wrap::after {
          content: '';
          position: absolute; bottom: -1px; right: -1px;
          width: 48px; height: 48px;
          border-bottom: 1.5px solid rgba(124,58,237,0.4);
          border-right: 1.5px solid rgba(124,58,237,0.4);
          border-radius: 0 0 20px 0;
          z-index: 2;
        }
        .c-map-wrap iframe {
          width: 100%; height: 100%;
          border: none; display: block;
          filter: invert(0.88) hue-rotate(195deg) saturate(0.6) brightness(0.82);
        }
        .c-map-label {
          position: absolute; top: 14px; right: 14px; z-index: 3;
          background: rgba(8,8,20,0.85);
          border: 1px solid rgba(167,139,250,0.18);
          border-radius: 10px;
          padding: 6px 12px;
          backdrop-filter: blur(16px);
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.08em;
          color: rgba(167,139,250,0.7);
        }

        /* ── right: form ──────────────────────────────── */
        .c-right {
          animation: c-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both;
        }

        .c-form-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 36px;
          position: relative;
          overflow: hidden;
        }
        .c-form-card::before {
          content: '';
          position: absolute; top: -1px; left: -1px;
          width: 56px; height: 56px;
          border-top: 1.5px solid var(--accent);
          border-left: 1.5px solid var(--accent);
          border-radius: 20px 0 0 0;
          opacity: 0.65;
        }
        .c-form-card::after {
          content: '';
          position: absolute; bottom: -1px; right: -1px;
          width: 56px; height: 56px;
          border-bottom: 1.5px solid rgba(124,58,237,0.4);
          border-right: 1.5px solid rgba(124,58,237,0.4);
          border-radius: 0 0 20px 0;
        }

        .c-form-title {
          font-family: var(--font-display);
          font-size: 22px; font-weight: 700;
          color: var(--text); letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .c-form-sub {
          font-family: var(--font-body);
          font-size: 13px; color: var(--text3);
          margin-bottom: 28px;
        }

        .c-field-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
          margin-bottom: 14px;
        }
        .c-field {
          display: flex; flex-direction: column; gap: 7px;
          margin-bottom: 14px;
        }
        .c-field:last-of-type { margin-bottom: 0; }
        .c-label {
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.1em;
          color: var(--text3);
        }
        .c-input, .c-select, .c-textarea {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 12px 14px;
          font-family: var(--font-body);
          font-size: 13.5px; font-weight: 400;
          color: var(--text);
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          width: 100%;
          box-sizing: border-box;
        }
        .c-input::placeholder, .c-textarea::placeholder {
          color: rgba(245,243,255,0.18);
        }
        .c-input:focus, .c-select:focus, .c-textarea:focus {
          border-color: rgba(167,139,250,0.45);
          background: rgba(167,139,250,0.04);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.08);
        }
        .c-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(167,139,250,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          cursor: pointer;
          color: rgba(245,243,255,0.5);
        }
        .c-select option { background: #0d0d1c; color: var(--text); }
        .c-textarea { resize: vertical; min-height: 110px; line-height: 1.7; }

        /* submit */
        .c-submit-wrap { margin-top: 22px; }
        .c-btn-submit {
          width: 100%;
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 14px 30px;
          background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
          border-radius: 10px; color: #fff; border: none; cursor: pointer;
          font-family: var(--font-body);
          font-size: 14px; font-weight: 600; letter-spacing: -0.01em;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 28px rgba(124,58,237,0.38), 0 4px 16px rgba(0,0,0,0.25),
                      inset 0 1px 0 rgba(255,255,255,0.18);
          position: relative; overflow: hidden;
        }
        .c-btn-submit:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 0 48px rgba(124,58,237,0.58), 0 8px 24px rgba(0,0,0,0.35),
                      inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .c-btn-submit:active:not(:disabled) { transform: translateY(0) scale(0.99); }
        .c-btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .c-btn-submit svg { transition: transform 0.25s; }
        .c-btn-submit:hover:not(:disabled) svg { transform: translateX(3px); }

        /* spinner */
        .c-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: #fff;
          border-radius: 50%;
          animation: c-spin 0.7s linear infinite;
        }
        @keyframes c-spin { to { transform: rotate(360deg); } }

        /* success */
        .c-success {
          text-align: center; padding: 48px 24px;
          animation: c-fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .c-success-icon {
          width: 64px; height: 64px;
          background: rgba(34,197,94,0.08);
          border: 1.5px solid rgba(34,197,94,0.25);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          animation: c-pop 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        @keyframes c-pop {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .c-success-title {
          font-family: var(--font-display);
          font-size: 22px; font-weight: 700;
          color: var(--text); letter-spacing: -0.02em;
          margin-bottom: 10px;
        }
        .c-success-msg {
          font-family: var(--font-body);
          font-size: 14px; color: var(--text2); line-height: 1.7;
        }

        /* social pills at the bottom of form */
        .c-socials {
          display: flex; gap: 10px; margin-top: 18px; flex-wrap: wrap;
        }
        .c-social-pill {
          display: inline-flex; align-items: center; gap: 7px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          padding: 6px 14px;
          font-family: var(--font-body);
          font-size: 11.5px; color: var(--text3);
          text-decoration: none;
          background: rgba(255,255,255,0.02);
          transition: all 0.25s;
        }
        .c-social-pill:hover {
          border-color: rgba(167,139,250,0.3);
          color: var(--accent3);
          background: rgba(167,139,250,0.06);
        }

        @keyframes c-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* responsive */
        @media (max-width: 900px) {
          .c-grid { grid-template-columns: 1fr; }
          .c-inner { padding: 44px 24px 80px; }
          .c-field-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 500px) {
          .c-form-card { padding: 24px 18px; }
        }
      `}</style>

      <section className="c-root c-wrap" ref={sectionRef}>
        {/* bg */}
        <div className="c-bg-grid" />
        <div className="c-bg-noise" />

        {/* parallax glows */}
        <div className="c-glow c-glow-1" style={{ transform: `translate(${tx * -0.7}px, ${ty * -0.7}px)` }} />
        <div className="c-glow c-glow-2" style={{ transform: `translate(${tx * 0.5}px, ${ty * 0.5}px)` }} />
        <div className="c-glow c-glow-3" style={{ transform: `translate(${tx * 0.3}px, ${ty * 0.3}px)` }} />

        <div className="c-inner">

          {/* ── Header ── */}
          <div className="c-header">
            <div className="c-badge">
              <span className="c-badge-dot" />
              <span className="c-badge-txt">// Let's build something great</span>
            </div>
            <h2 className="c-title">
              <span className="c-title-dim">Have a question? </span>
              <span className="c-title-grad">Contact us now</span>
            </h2>
            <p className="c-subtitle">
              Have questions or need assistance? Our friendly team is ready to provide all the info you need — just get in touch.
            </p>
          </div>

          {/* ── Two column grid ── */}
          <div className="c-grid">

            {/* ── LEFT: info + map ── */}
            <div className="c-left">

              {/* Info card */}
              <div className="c-info-card">
                <div className="c-info-title">// Contact info</div>

                {/* Address */}
                <div className="c-info-item">
                  <div className="c-info-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="c-info-label">Address</div>
                    <div className="c-info-val">
                      Near Sanaka Educational Trust's Group of Institutions,<br />
                      Malandighi, Durgapur – 713212,<br />
                      West Bengal, India
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="c-info-item">
                  <div className="c-info-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="c-info-label">Phone</div>
                    <div className="c-info-val">
                      <a href="tel:+916201374052">+91 6201374052</a>
                    </div>
                  </div>
                </div>

                {/* Response time */}
                <div className="c-info-item">
                  <div className="c-info-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="c-info-label">Response time</div>
                    <div className="c-info-val">⚡ Within 24 hours</div>
                  </div>
                </div>

                {/* availability strip */}
                <div className="c-avail">
                  <span className="c-green-dot" />
                  <span className="c-avail-txt">// Currently open to new projects</span>
                  <span className="c-avail-sub">2025</span>
                </div>
              </div>

              {/* Map */}
              <div className="c-map-wrap">
                <div className="c-map-label">// Durgapur, WB</div>
                <iframe
                  title="binaryGroww location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.234!2d87.4039097!3d23.5729461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f965e13b4d7437%3A0x572091b19fe391b6d!2sSanaka%20Educational%20Trust's%20Group%20of%20Institutions!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* ── RIGHT: form ── */}
            <div className="c-right">
              <div className="c-form-card">

                {sent ? (
                  <div className="c-success">
                    <div className="c-success-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="c-success-title">Message sent!</div>
                    <p className="c-success-msg">
                      Thanks for reaching out. We'll get back to you within 24 hours — sit tight.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="c-form-title">Send a message</div>
                    <div className="c-form-sub">// We respond within 24 hours</div>

                    <div className="c-field-row">
                      <div className="c-field">
                        <label className="c-label">Full name</label>
                        <input
                          className="c-input"
                          name="name"
                          placeholder="Your Name"
                          value={form.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="c-field">
                        <label className="c-label">Email</label>
                        <input
                          className="c-input"
                          name="email"
                          type="email"
                          placeholder="you@email.com"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="c-field-row">
                      <div className="c-field">
                        <label className="c-label">Phone</label>
                        <input
                          className="c-input"
                          name="phone"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="c-field">
                        <label className="c-label">Service needed</label>
                        <select className="c-select" name="service" value={form.service} onChange={handleChange}>
                          <option value="" disabled>Select service…</option>
                          <option value="website">Website</option>
                          <option value="mobile">Mobile App</option>
                          <option value="branding">Brand Identity</option>
                          <option value="marketing">Digital Marketing</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="c-field">
                      <label className="c-label">Your message</label>
                      <textarea
                        className="c-textarea"
                        name="message"
                        placeholder="Tell us about your project, goals, timeline…"
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="c-submit-wrap">
                      <button
                        className="c-btn-submit"
                        disabled={sending}
                        onClick={handleSubmit}
                      >
                        {sending ? (
                          <>
                            <span className="c-spinner" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>

                    {/* social links */}
                    <div className="c-socials">
                      <a href="#" className="c-social-pill">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.102 18.08.114 18.1.13 18.117a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
                        Discord
                      </a>
                      <a href="#" className="c-social-pill">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        LinkedIn
                      </a>
                      <a href="#" className="c-social-pill">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                        GitHub
                      </a>
                      <a href="#" className="c-social-pill">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                        Instagram
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
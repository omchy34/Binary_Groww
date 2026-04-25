"use client";
import React, { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const MORE_LINKS = [
  { label: "Blogs", href: "#blogs" },
  { label: "Terms & Conditions", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Refund Policy", href: "#refund" },
];

export default function Footer(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubbed(true);
    setEmail("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .f-root {
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

        /* ── wrapper ──────────────────────────────── */
        .f-wrap {
          position: relative;
          background: var(--bg);
          overflow: hidden;
          border-top: 1px solid var(--border);
        }

        /* ── bg layers ────────────────────────────── */
        .f-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(167,139,250,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.06) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, black 10%, transparent 100%);
        }
        .f-bg-noise {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.015;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
        }
        .f-glow-l {
          position: absolute; pointer-events: none;
          width: 500px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%);
          bottom: -100px; left: -120px;
        }
        .f-glow-r {
          position: absolute; pointer-events: none;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 65%);
          top: -60px; right: -80px;
        }

        /* ── top section ──────────────────────────── */
        .f-top {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto;
          padding: 64px 48px 48px;
          display: grid;
          grid-template-columns: 1.1fr 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        /* left: brand + contact + subscribe */
        .f-brand {
          display: flex; flex-direction: column;
        }
        .f-logo {
          display: inline-flex; align-items: center; gap: 10px;
          margin-bottom: 20px;
          text-decoration: none;
        }
        .f-logo-mark {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 18px rgba(124,58,237,0.45);
          flex-shrink: 0;
        }
        .f-logo-mark svg { color: #fff; }
        .f-logo-name {
          font-family: var(--font-display);
          font-size: 17px; font-weight: 800;
          color: var(--text); letter-spacing: -0.025em;
        }
        .f-logo-name em {
          font-style: normal;
          background: linear-gradient(118deg, #c4b5fd 0%, #a78bfa 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .f-tagline {
          font-family: var(--font-body);
          font-size: 13px; color: var(--text3);
          line-height: 1.75; max-width: 280px;
          margin-bottom: 28px;
        }

        .f-contact-label {
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.1em;
          color: var(--text3);
          margin-bottom: 6px;
        }
        .f-contact-email {
          font-family: var(--font-body);
          font-size: 13.5px; font-weight: 600;
          color: var(--accent3);
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.2s;
          margin-bottom: 22px;
          display: block;
        }
        .f-contact-email:hover { color: var(--accent); }

        /* subscribe box */
        .f-sub-box {
          display: flex;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .f-sub-box:focus-within {
          border-color: rgba(167,139,250,0.35);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.08);
        }
        .f-sub-input {
          flex: 1;
          background: transparent; border: none; outline: none;
          padding: 11px 14px;
          font-family: var(--font-body);
          font-size: 13px; color: var(--text);
        }
        .f-sub-input::placeholder { color: rgba(245,243,255,0.2); }
        .f-sub-btn {
          padding: 10px 18px;
          background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
          border: none; cursor: pointer;
          font-family: var(--font-body);
          font-size: 12.5px; font-weight: 600;
          color: #fff; letter-spacing: -0.01em;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          margin: 4px; border-radius: 9px;
          box-shadow: 0 0 16px rgba(124,58,237,0.3);
          white-space: nowrap;
        }
        .f-sub-btn:hover {
          box-shadow: 0 0 28px rgba(124,58,237,0.55);
          transform: scale(1.02);
        }
        .f-sub-btn:active { transform: scale(0.98); }
        .f-sub-ok {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.06em;
          color: rgba(34,197,94,0.75);
          margin-top: 8px;
          display: flex; align-items: center; gap: 6px;
        }
        .f-sub-ok-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 6px rgba(34,197,94,0.9);
        }

        /* nav columns */
        .f-nav-col { display: flex; flex-direction: column; }
        .f-nav-heading {
          font-family: var(--font-body);
          font-size: 13px; font-weight: 600;
          color: var(--text);
          margin-bottom: 18px;
          letter-spacing: -0.01em;
        }
        .f-nav-link {
          font-family: var(--font-body);
          font-size: 13.5px; color: var(--text3);
          text-decoration: none;
          padding: 5px 0;
          transition: color 0.2s, transform 0.2s;
          display: inline-block;
        }
        .f-nav-link:hover {
          color: var(--accent3);
          transform: translateX(4px);
        }

        /* ── divider ──────────────────────────────── */
        .f-divider {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto;
          padding: 0 48px;
        }
        .f-divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.2), rgba(167,139,250,0.08), transparent);
        }

        /* ── wordmark ─────────────────────────────── */
        .f-wordmark-wrap {
          position: relative; z-index: 1;
          overflow: hidden;
          padding: 0 48px;
          max-width: 1240px; margin: 0 auto;
          user-select: none; pointer-events: none;
        }
        .f-wordmark {
          font-family: var(--font-display);
          font-size: clamp(52px, 9vw, 130px);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          /* ghost text matching reference image style */
          color: transparent;
          -webkit-text-stroke: 1px rgba(167,139,250,0.07);
          white-space: nowrap;
          overflow: hidden;
          display: block;
          padding: 16px 0 0;
        }

        /* ── bottom bar ───────────────────────────── */
        .f-bottom {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto;
          padding: 16px 48px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .f-copy {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.07em;
          color: var(--text3);
        }
        .f-copy em { font-style: normal; color: rgba(167,139,250,0.45); }

        /* social icons */
        .f-socials {
          display: flex; align-items: center; gap: 10px;
        }
        .f-social-btn {
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 9px;
          color: var(--text3);
          text-decoration: none;
          background: rgba(255,255,255,0.02);
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .f-social-btn:hover {
          border-color: rgba(167,139,250,0.3);
          color: var(--accent3);
          background: rgba(167,139,250,0.07);
          transform: translateY(-2px);
        }
        /* whatsapp special */
        .f-social-btn.f-wa:hover {
          border-color: rgba(34,197,94,0.35);
          color: var(--green);
          background: rgba(34,197,94,0.07);
        }

        /* made with tag */
        .f-made {
          font-family: var(--font-mono);
          font-size: 9.5px; letter-spacing: 0.06em;
          color: var(--text3);
          display: flex; align-items: center; gap: 5px;
        }
        .f-heart { color: #f43f5e; }

        /* responsive */
        @media (max-width: 900px) {
          .f-top {
            grid-template-columns: 1fr 1fr;
            gap: 40px; padding: 48px 24px 36px;
          }
          .f-brand { grid-column: 1 / -1; }
          .f-wordmark-wrap { padding: 0 24px; }
          .f-divider { padding: 0 24px; }
          .f-bottom { padding: 16px 24px 28px; }
        }
        @media (max-width: 560px) {
          .f-top { grid-template-columns: 1fr; gap: 32px; }
          .f-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
          .f-wordmark { font-size: clamp(40px, 13vw, 80px); }
        }

        @keyframes f-fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <footer className="f-root f-wrap">
        {/* bg */}
        <div className="f-bg-grid" />
        <div className="f-bg-noise" />
        <div className="f-glow-l" />
        <div className="f-glow-r" />

        {/* ── top section ── */}
        <div className="f-top">

          {/* brand + subscribe */}
          <div className="f-brand">
            <a href="#" className="f-logo">
              <div className="f-logo-mark">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                </svg>
              </div>
              <span className="f-logo-name">binary<em>Groww</em></span>
            </a>

            <p className="f-tagline">
              From pixel-perfect websites to high-performance apps and data-driven marketing — we engineer digital growth that actually moves the needle.
            </p>

            <div className="f-contact-label">// Contact us at</div>
            <a href="mailto:hello@binarygroww.com" className="f-contact-email">
              hello@binarygroww.com
            </a>

            {subbed ? (
              <div className="f-sub-ok">
                <span className="f-sub-ok-dot" />
                You're subscribed — welcome aboard!
              </div>
            ) : (
              <div className="f-sub-box">
                <input
                  className="f-sub-input"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                />
                <button className="f-sub-btn" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </div>
            )}
          </div>

          {/* links col */}
          <div className="f-nav-col">
            <div className="f-nav-heading">Links</div>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="f-nav-link">{l.label}</a>
            ))}
          </div>

          {/* more resources col */}
          <div className="f-nav-col">
            <div className="f-nav-heading">More Resources</div>
            {MORE_LINKS.map(l => (
              <a key={l.label} href={l.href} className="f-nav-link">{l.label}</a>
            ))}
          </div>

        </div>

        {/* divider */}
        <div className="f-divider">
          <div className="f-divider-line" />
        </div>

        {/* ghost wordmark */}
        <div className="f-wordmark-wrap">
          <span className="f-wordmark">binaryGroww</span>
        </div>

        {/* bottom bar */}
        <div className="f-bottom">
          <div className="f-copy">
            © {new Date().getFullYear()} <em>binaryGroww</em>. All rights reserved.
          </div>

          <div className="f-socials">
            {/* Instagram */}
            <a href="#" className="f-social-btn" title="Instagram" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="f-social-btn" title="LinkedIn" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* GitHub */}
            <a href="#" className="f-social-btn" title="GitHub" aria-label="GitHub">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="https://wa.me/916201374052" className="f-social-btn f-wa" title="WhatsApp" aria-label="WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </a>
          </div>

          <div className="f-made">
            Made with <span className="f-heart">♥</span> in West Bengal
          </div>
        </div>

      </footer>
    </>
  );
}
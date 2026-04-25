"use client";
import { useState, useEffect, useRef } from "react";

interface NavLink { label: string; href: string; }

const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Work",     href: "#work" },
  { label: "About",    href: "#about" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar(): JSX.Element {
  const [scrolled, setScrolled]     = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Bricolage+Grotesque:wght@700;800&family=DM+Mono:wght@400;500&display=swap');

        .nb-root {
          --bg-pill: rgba(8,8,15,0.55);
          --bg-pill-scrolled: rgba(8,8,15,0.92);
          --accent: #a78bfa;
          --accent2: #7c3aed;
          --accent3: #c4b5fd;
          --border: rgba(167,139,250,0.12);
          --border-scrolled: rgba(167,139,250,0.2);
          --text: #f5f3ff;
          --text-muted: rgba(245,243,255,0.42);
          --font-display: 'Bricolage Grotesque', sans-serif;
          --font-body: 'Inter', sans-serif;
          --font-mono: 'DM Mono', monospace;
        }

        .nb {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 999;
          display: flex;
          justify-content: center;
          padding: 18px 24px;
          transition: padding 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .nb.scrolled { padding: 10px 24px; }

        .nb-pill {
          width: 100%;
          max-width: 1000px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-pill);
          border: 1px solid var(--border);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border-radius: 100px;
          padding: 6px 6px 6px 20px;
          transition: all 0.45s cubic-bezier(0.16,1,0.3,1);
          box-shadow:
            0 4px 28px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.05);
          position: relative;
        }
        .nb.scrolled .nb-pill {
          background: var(--bg-pill-scrolled);
          border-color: var(--border-scrolled);
          box-shadow:
            0 8px 48px rgba(0,0,0,0.6),
            0 0 44px rgba(124,58,237,0.07),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .nb-logo {
          display: flex; align-items: center; gap: 11px;
          text-decoration: none; flex-shrink: 0;
          user-select: none;
        }
        .nb-logo-mark {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 18px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.18);
          font-family: var(--font-mono);
          font-size: 11px; font-weight: 500;
          color: #fff; letter-spacing: -0.5px;
          flex-shrink: 0;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .nb-logo:hover .nb-logo-mark {
          box-shadow: 0 0 30px rgba(124,58,237,0.6), inset 0 1px 0 rgba(255,255,255,0.2);
          transform: scale(1.06);
        }
        .nb-logo-text { line-height: 1; }
        .nb-logo-name {
          font-family: var(--font-display);
          font-size: 16px; font-weight: 800;
          color: var(--text); letter-spacing: -0.02em;
        }
        .nb-logo-name em {
          font-style: normal;
          background: linear-gradient(110deg, #c4b5fd, #7c3aed);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nb-logo-sub {
          font-family: var(--font-mono);
          font-size: 8px; letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(167,139,250,0.38);
          margin-top: 3px;
          display: block;
        }

        .nb-links {
          display: flex; align-items: center; gap: 2px;
        }
        .nb-link {
          position: relative;
          padding: 8px 15px;
          font-family: var(--font-body);
          font-size: 14px; font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          border-radius: 100px;
          transition: color 0.2s, background 0.2s;
          letter-spacing: -0.01em;
        }
        .nb-link::after {
          content: '';
          position: absolute;
          bottom: 5px; left: 50%; transform: translateX(-50%);
          width: 0; height: 1.5px;
          background: var(--accent);
          transition: width 0.22s cubic-bezier(0.16,1,0.3,1);
          border-radius: 1px;
        }
        .nb-link:hover { color: var(--text); background: rgba(255,255,255,0.04); }
        .nb-link:hover::after { width: 18px; }
        .nb-link.active { color: var(--accent3); background: rgba(167,139,250,0.08); }
        .nb-link.active::after { width: 18px; background: var(--accent3); }

        .nb-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
          color: #fff;
          font-family: var(--font-body);
          font-size: 13px; font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 20px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.18);
          white-space: nowrap; flex-shrink: 0;
          letter-spacing: -0.01em;
        }
        .nb-cta:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 36px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .nb-cta:active { transform: translateY(0) scale(0.99); }
        .nb-cta svg { transition: transform 0.25s; }
        .nb-cta:hover svg { transform: translateX(3px); }

        .nb-ham {
          display: none;
          flex-direction: column; gap: 5px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 10px 12px;
          cursor: pointer;
          margin-left: 8px;
          transition: background 0.2s;
        }
        .nb-ham:hover { background: rgba(167,139,250,0.1); border-color: rgba(167,139,250,0.2); }
        .nb-ham-bar {
          display: block; width: 18px; height: 1.5px;
          background: rgba(245,243,255,0.6);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          transform-origin: center;
        }

        /* ── Compact dropdown (replaces full-page drawer) ── */
        .nb-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 0; right: 0;
          background: rgba(8,8,20,0.96);
          border: 1px solid rgba(167,139,250,0.18);
          border-radius: 20px;
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05);
          overflow: hidden;
          transform-origin: top center;
          transform: scaleY(0.92) translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
          z-index: 100;
        }
        .nb-dropdown.open {
          transform: scaleY(1) translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .nb-dropdown-inner {
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .dd-link {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          font-family: var(--font-body);
          font-size: 15px; font-weight: 500;
          color: rgba(245,243,255,0.55);
          text-decoration: none;
          border-radius: 12px;
          transition: background 0.18s, color 0.18s;
          letter-spacing: -0.01em;
        }
        .dd-link:hover {
          background: rgba(167,139,250,0.09);
          color: var(--accent3);
        }
        .dd-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 4px 8px;
        }
        .dd-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 4px 0 0;
          padding: 13px 20px;
          background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
          color: #fff;
          font-family: var(--font-body);
          font-size: 14px; font-weight: 600;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 0 24px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.18);
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          letter-spacing: -0.01em;
        }
        .dd-cta:hover {
          box-shadow: 0 0 40px rgba(124,58,237,0.6), inset 0 1px 0 rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }

        @media (max-width: 720px) {
          .nb-links { display: none; }
          .nb-cta   { display: none; }
          .nb-ham   { display: flex; }
        }
      `}</style>

      <nav className={`nb nb-root ${scrolled ? "scrolled" : ""}`}>
        <div className="nb-pill" ref={dropdownRef}>
          <a href="/" className="nb-logo">
            <div className="nb-logo-mark">&lt;/&gt;</div>
            <div className="nb-logo-text">
              <div className="nb-logo-name">binary<em>Groww</em></div>
              <span className="nb-logo-sub">// digital agency</span>
            </div>
          </a>

          <div className="nb-links">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`nb-link ${activeLink === l.href ? "active" : ""}`}
                onClick={() => setActiveLink(l.href)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <a href="#contact" className="nb-cta">
              Let&apos;s Build
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <button className="nb-ham" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
              <span className="nb-ham-bar" style={mobileOpen ? { transform: "rotate(45deg) translate(4.5px, 4.5px)" } : {}} />
              <span className="nb-ham-bar" style={mobileOpen ? { opacity: 0, transform: "scaleX(0)" } : {}} />
              <span className="nb-ham-bar" style={mobileOpen ? { transform: "rotate(-45deg) translate(4.5px, -4.5px)" } : {}} />
            </button>
          </div>

          {/* Compact dropdown — replaces full-page drawer */}
          <div className={`nb-dropdown ${mobileOpen ? "open" : ""}`}>
            <div className="nb-dropdown-inner">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} className="dd-link" onClick={() => setMobileOpen(false)}>
                  {l.label}
                </a>
              ))}
              <div className="dd-divider" />
              <a href="#contact" className="dd-cta" onClick={() => setMobileOpen(false)}>
                Let&apos;s Build Together
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
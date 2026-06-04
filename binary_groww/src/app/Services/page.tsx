"use client";
import React, { useRef, useState, useEffect } from "react";

const SERVICES = [
  {
    id: "01",
    icon: (
      <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="15" y="2" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="15" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 19.5h9M19.5 15v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Web Design & Development",
    short: "Pixel-perfect sites that convert",
    desc: "Fast, responsive websites built to rank and convert — from landing pages to full-scale web apps.",
    tags: ["Next.js", "React", "Webflow", "SEO"],
  },
  {
    id: "02",
    icon: (
      <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
        <rect x="7" y="1" width="12" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="13" cy="20" r="1.2" fill="currentColor"/>
        <path d="M10 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Mobile App Development",
    short: "Native-feel apps for iOS & Android",
    desc: "Cross-platform apps with smooth UX, tight performance, and App Store polish.",
    tags: ["React Native", "iOS", "Android"],
  },
  {
    id: "03",
    icon: (
      <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
        <path d="M13 3L4 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7L13 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 13l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Brand Identity",
    short: "Brands people remember",
    desc: "Logo, color systems, typography, and brand guidelines built to scale across every touchpoint.",
    tags: ["Logo Design", "Style Guide", "Typography"],
  },
  {
    id: "04",
    icon: (
      <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
        <path d="M3 17l5-5 4 4 5-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 9v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Digital Marketing",
    short: "Growth that compounds",
    desc: "SEO, paid ads, and analytics — campaigns that bring the right traffic and turn visitors into customers.",
    tags: ["SEO", "Google Ads", "Meta Ads"],
  },
  {
    id: "05",
    icon: (
      <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
        <rect x="2" y="6" width="22" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 11l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 20v3M9 23h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Maintenance & Support",
    short: "We stay after launch",
    desc: "Performance monitoring, security patches, and feature updates — we don't disappear post-launch.",
    tags: ["Uptime", "Updates", "Hosting"],
  },
];

function useInView(ref: React.RefObject<Element>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div
      ref={ref}
      className="svc-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s, border-color 0.3s, box-shadow 0.3s, background 0.3s`,
        borderColor: hovered ? "rgba(245,158,11,0.35)" : "rgba(245,158,11,0.1)",
        background: hovered ? "#110f00" : "#0d0b00",
        boxShadow: hovered ? "0 0 0 1px rgba(245,158,11,0.1), 0 20px 48px rgba(0,0,0,0.45), 0 0 32px rgba(217,119,6,0.15)" : "none",
      }}
    >
      {/* top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        borderRadius: "16px 16px 0 0",
        background: hovered ? "linear-gradient(90deg, #f59e0b, transparent)" : "transparent",
        transition: "background 0.35s",
      }} />

      {/* icon + id row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 11,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: hovered ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.06)"}`,
          color: hovered ? "#f59e0b" : "rgba(254,252,232,0.3)",
          boxShadow: hovered ? "0 0 18px rgba(217,119,6,0.2)" : "none",
          transition: "all 0.35s",
          flexShrink: 0,
        }}>
          {svc.icon}
        </div>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 9,
          letterSpacing: "0.12em", color: "rgba(254,252,232,0.15)",
        }}>
          {svc.id}
        </span>
      </div>

      {/* title */}
      <div style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em",
        color: hovered ? "#fefce8" : "rgba(254,252,232,0.82)",
        marginBottom: 4, lineHeight: 1.3,
        transition: "color 0.3s",
      }}>
        {svc.title}
      </div>

      {/* short tagline */}
      <div style={{
        fontFamily: "'DM Mono', monospace", fontSize: 9,
        letterSpacing: "0.07em",
        color: hovered ? "#f59e0b" : "rgba(254,252,232,0.25)",
        marginBottom: 16,
        transition: "color 0.3s",
      }}>
        — {svc.short}
      </div>

      {/* divider */}
      <div style={{
        height: 1, marginBottom: 14,
        background: hovered ? "rgba(245,158,11,0.18)" : "rgba(255,255,255,0.05)",
        transition: "background 0.35s",
      }} />

      {/* desc */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 13, color: "rgba(254,252,232,0.45)",
        lineHeight: 1.75, margin: "0 0 18px", flex: 1,
      }}>
        {svc.desc}
      </p>

      {/* tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {svc.tags.map((t) => (
          <span key={t} style={{
            fontFamily: "'DM Mono', monospace", fontSize: 9,
            letterSpacing: "0.06em",
            padding: "3px 9px", borderRadius: 100,
            background: hovered ? "rgba(245,158,11,0.07)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${hovered ? "rgba(245,158,11,0.22)" : "rgba(255,255,255,0.07)"}`,
            color: hovered ? "#f59e0b" : "rgba(254,252,232,0.28)",
            transition: "all 0.3s",
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services(): React.JSX.Element {
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef as React.RefObject<Element>, 0.2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .sv-root {
          --bg: #0a0800;
          --bg2: #0d0b00;
          --accent: #f59e0b;
          --accent2: #d97706;
          --accent3: #fcd34d;
          --text: #fefce8;
          --text2: rgba(254,252,232,0.52);
          --text3: rgba(254,252,232,0.2);
          --font-display: 'Bricolage Grotesque', sans-serif;
          --font-body: 'Inter', sans-serif;
          --font-mono: 'DM Mono', monospace;
        }

        .sv-wrap {
          position: relative;
          background: var(--bg);
          padding: 110px 0 130px;
          overflow: hidden;
        }

        .sv-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(245,158,11,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.05) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent);
        }
        .sv-glow-l {
          position: absolute; pointer-events: none;
          width: 560px; height: 560px; border-radius: 50%;
          background: radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 70%);
          top: -100px; left: -200px;
        }
        .sv-glow-r {
          position: absolute; pointer-events: none;
          width: 460px; height: 460px; border-radius: 50%;
          background: radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%);
          bottom: 0; right: -150px;
        }

        .sv-inner {
          position: relative; z-index: 2;
          max-width: 1160px; margin: 0 auto;
          padding: 0 48px;
        }

        .sv-header { text-align: center; margin-bottom: 68px; }

        .sv-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(245,158,11,0.07);
          border: 1px solid rgba(245,158,11,0.16);
          border-radius: 100px;
          padding: 5px 16px 5px 10px;
          margin-bottom: 22px;
        }
        .sv-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #f59e0b;
          box-shadow: 0 0 8px rgba(245,158,11,0.8);
          animation: sv-pulse 2.4s ease-in-out infinite;
        }
        @keyframes sv-pulse {
          0%,100% { box-shadow: 0 0 5px rgba(245,158,11,0.6); }
          50%      { box-shadow: 0 0 14px rgba(245,158,11,1), 0 0 28px rgba(245,158,11,0.3); }
        }
        .sv-badge-txt {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.08em; color: rgba(245,158,11,0.72);
        }

        .sv-h2 {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.5vw, 50px);
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
          color: var(--text); margin-bottom: 16px;
        }
        .sv-h2 em {
          font-style: normal;
          background: linear-gradient(118deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sv-sub {
          font-family: var(--font-body); font-size: 15px;
          color: var(--text2); line-height: 1.8;
          max-width: 500px; margin: 0 auto;
        }

        /* 3-col grid, wraps to 2, then 1 */
        .sv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 56px;
        }

        /* card base */
        .svc-card {
          position: relative;
          border: 1px solid rgba(245,158,11,0.1);
          border-radius: 16px;
          padding: 24px 22px 22px;
          display: flex; flex-direction: column;
          overflow: hidden;
          cursor: default;
        }

        /* bottom CTA */
        .sv-cta {
          border: 1px solid rgba(245,158,11,0.12);
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(217,119,6,0.07) 0%, rgba(17,15,0,0.55) 60%);
          padding: 36px 40px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px; flex-wrap: wrap;
          position: relative; overflow: hidden;
        }
        .sv-cta::before {
          content: '';
          position: absolute; top: -1px; left: -1px;
          width: 64px; height: 64px;
          border-top: 1.5px solid rgba(245,158,11,0.45);
          border-left: 1.5px solid rgba(245,158,11,0.45);
          border-radius: 18px 0 0 0;
          pointer-events: none;
        }
        .sv-cta-heading {
          font-family: var(--font-display);
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 700; letter-spacing: -0.025em;
          color: var(--text); margin-bottom: 6px;
        }
        .sv-cta-sub {
          font-family: var(--font-body);
          font-size: 13px; color: var(--text2); line-height: 1.7;
        }
        .sv-cta-btns { display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }

        .sv-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 10px;
          color: #0a0800;
          font-family: var(--font-body); font-size: 13px; font-weight: 700;
          text-decoration: none; letter-spacing: -0.01em;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          box-shadow: 0 0 24px rgba(217,119,6,0.35), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          white-space: nowrap;
        }
        .sv-btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 40px rgba(245,158,11,0.5), inset 0 1px 0 rgba(255,255,255,0.22);
        }
        .sv-btn-primary svg { transition: transform 0.25s; }
        .sv-btn-primary:hover svg { transform: translateX(3px); }

        .sv-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px;
          border: 1px solid rgba(245,158,11,0.15); border-radius: 10px;
          color: rgba(254,252,232,0.38);
          font-family: var(--font-body); font-size: 13px; font-weight: 500;
          text-decoration: none; background: rgba(245,158,11,0.03);
          transition: all 0.3s; white-space: nowrap;
        }
        .sv-btn-ghost:hover {
          border-color: rgba(245,158,11,0.38);
          color: #fcd34d;
          background: rgba(245,158,11,0.08);
          transform: translateY(-2px);
        }

        .sv-divider-line {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,158,11,0.13), transparent);
        }

        @media (max-width: 1024px) {
          .sv-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .sv-grid { grid-template-columns: 1fr; }
          .sv-inner { padding: 0 20px; }
          .sv-cta { padding: 28px 22px; }
          .sv-cta-btns { width: 100%; }
          .sv-btn-primary, .sv-btn-ghost { justify-content: center; flex: 1; }
        }
      `}</style>

      <div className="sv-divider-line" />

      <section id="services" className="sv-root sv-wrap">
        <div className="sv-bg-grid" />
        <div className="sv-glow-l" />
        <div className="sv-glow-r" />

        <div className="sv-inner">

          {/* Header */}
          <div
            className="sv-header"
            ref={headRef}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="sv-badge">
              <span className="sv-badge-dot" />
              <span className="sv-badge-txt">// what we do</span>
            </div>
            <h2 className="sv-h2">
              Everything you need<br />
              to <em>grow digitally</em>
            </h2>
            <p className="sv-sub">
              From concept to launch and beyond — we handle the full stack of digital growth so you can focus on running your business.
            </p>
          </div>

          {/* Grid */}
          <div className="sv-grid">
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </div>

          {/* CTA strip */}
          <div className="sv-cta">
            <div>
              <div className="sv-cta-heading">Ready to grow your business?</div>
              <div className="sv-cta-sub">Tell us what you need — we'll build it fast, right, and within budget.</div>
            </div>
            <div className="sv-cta-btns">
              <a href="#contact" className="sv-btn-primary">
                Start a project
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#contact" className="sv-btn-ghost">Get in touch</a>
            </div>
          </div>

        </div>
      </section>

      <div className="sv-divider-line" />
    </>
  );
}
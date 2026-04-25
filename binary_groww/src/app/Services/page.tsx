"use client";
import React, { useRef, useState, useEffect } from "react";

const SERVICES = [
  {
    id: "01",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="15" y="2" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="15" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 19.5h9M19.5 15v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Web Design & Development",
    short: "Pixel-perfect sites that convert",
    desc: "We craft fast, responsive websites engineered for performance and built to rank. From landing pages to full-scale web apps — every pixel is intentional.",
    tags: ["Next.js", "React", "Webflow", "SEO"],
    stat: "5+ sites shipped",
    color: "purple",
  },
  {
    id: "02",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="7" y="1" width="12" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="13" cy="20" r="1.2" fill="currentColor"/>
        <path d="M10 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Mobile App Development",
    short: "Native-feel apps for iOS & Android",
    desc: "Cross-platform apps that feel native. We ship React Native and Flutter solutions with smooth UX, tight performance, and App Store polish.",
    tags: ["React Native", "iOS", "Android"],
    stat: "5+ apps live",
    color: "violet",
  },
  {
    id: "03",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3L4 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7L13 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 13l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Brand Identity",
    short: "Brands people remember",
    desc: "Logo, color systems, typography, brand guidelines — we build identities that are distinctive, consistent, and built to scale across every touchpoint.",
    tags: ["Logo Design", "Style Guide", "Typography", "UI Kit"],
    stat: "3+ brands built",
    color: "indigo",
  },
  {
    id: "04",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M3 17l5-5 4 4 5-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 9v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Digital Marketing",
    short: "Growth that compounds",
    desc: "SEO, paid ads, social strategy, and analytics — we run data-driven campaigns that bring the right traffic and turn visitors into paying customers.",
    tags: ["SEO", "Google Ads", "Meta Ads", "Analytics"],
    stat: "3× avg. ROI",
    color: "teal",
  },
  {
    id: "06",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="2" y="6" width="22" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 11l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 20v3M9 23h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Maintenance & Support",
    short: "We stay after launch",
    desc: "Performance monitoring, security patches, feature iterations — we don't disappear post-launch. Your product is always fast, secure, and improving.",
    tags: ["Uptime", "Updates", "Hosting", "Reporting"],
    stat: "24hr response SLA",
    color: "green",
  },
];

const COLOR_MAP: Record<string, { icon: string; accent: string; glow: string; tag: string; tagBorder: string; line: string }> = {
  purple: {
    icon: "rgba(167,139,250,0.12)",
    accent: "#a78bfa",
    glow: "rgba(124,58,237,0.22)",
    tag: "rgba(167,139,250,0.08)",
    tagBorder: "rgba(167,139,250,0.2)",
    line: "rgba(167,139,250,0.5)",
  },
  violet: {
    icon: "rgba(139,92,246,0.12)",
    accent: "#8b5cf6",
    glow: "rgba(109,40,217,0.2)",
    tag: "rgba(139,92,246,0.08)",
    tagBorder: "rgba(139,92,246,0.2)",
    line: "rgba(139,92,246,0.5)",
  },
  indigo: {
    icon: "rgba(99,102,241,0.12)",
    accent: "#818cf8",
    glow: "rgba(79,70,229,0.2)",
    tag: "rgba(99,102,241,0.08)",
    tagBorder: "rgba(99,102,241,0.2)",
    line: "rgba(99,102,241,0.5)",
  },
  teal: {
    icon: "rgba(20,184,166,0.12)",
    accent: "#2dd4bf",
    glow: "rgba(13,148,136,0.2)",
    tag: "rgba(20,184,166,0.08)",
    tagBorder: "rgba(20,184,166,0.2)",
    line: "rgba(20,184,166,0.5)",
  },
  amber: {
    icon: "rgba(251,191,36,0.1)",
    accent: "#fbbf24",
    glow: "rgba(217,119,6,0.18)",
    tag: "rgba(251,191,36,0.08)",
    tagBorder: "rgba(251,191,36,0.2)",
    line: "rgba(251,191,36,0.5)",
  },
  green: {
    icon: "rgba(34,197,94,0.1)",
    accent: "#4ade80",
    glow: "rgba(22,163,74,0.18)",
    tag: "rgba(34,197,94,0.08)",
    tagBorder: "rgba(34,197,94,0.2)",
    line: "rgba(34,197,94,0.5)",
  },
};

function useInView(ref: React.RefObject<Element>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const c = COLOR_MAP[svc.color];

  return (
    <div
      ref={ref}
      className="svc-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
        boxShadow: hovered ? `0 0 0 1px ${c.accent}33, 0 20px 56px rgba(0,0,0,0.45), 0 0 40px ${c.glow}` : undefined,
      }}
    >
      {/* top line accent */}
      <div className="svc-card-line" style={{ background: hovered ? c.accent : "transparent", transition: "background 0.3s" }} />

      {/* header row */}
      <div className="svc-card-head">
        <div className="svc-icon" style={{ background: hovered ? c.icon : "rgba(255,255,255,0.04)", color: hovered ? c.accent : "rgba(245,243,255,0.35)", boxShadow: hovered ? `0 0 20px ${c.glow}` : "none", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
          {svc.icon}
        </div>
        <span className="svc-id">// {svc.id}</span>
      </div>

      {/* title */}
      <div className="svc-title" style={{ color: hovered ? "#f5f3ff" : "rgba(226,234,245,0.82)" }}>
        {svc.title}
      </div>
      <div className="svc-short" style={{ color: hovered ? c.accent : "rgba(226,234,245,0.28)" }}>
        {svc.short}
      </div>

      {/* divider */}
      <div className="svc-divider" style={{ background: hovered ? `${c.accent}28` : "rgba(255,255,255,0.06)" }} />

      {/* description */}
      <p className="svc-desc">{svc.desc}</p>

      {/* tags */}
      <div className="svc-tags">
        {svc.tags.map((t) => (
          <span key={t} className="svc-tag" style={{ background: hovered ? c.tag : "rgba(255,255,255,0.03)", borderColor: hovered ? c.tagBorder : "rgba(255,255,255,0.07)", color: hovered ? c.accent : "rgba(226,234,245,0.32)" }}>
            {t}
          </span>
        ))}
      </div>

      {/* footer */}
      <div className="svc-foot">
        <span className="svc-stat" style={{ color: hovered ? c.accent : "rgba(226,234,245,0.25)" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: "inline", marginRight: 5, verticalAlign: "middle" }}>
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {svc.stat}
        </span>
        <span className="svc-arrow" style={{ color: hovered ? c.accent : "rgba(226,234,245,0.15)", transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "all 0.28s" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
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
          --bg: #08080f;
          --bg2: #0d0d1c;
          --bg3: #10101e;
          --accent: #a78bfa;
          --accent2: #7c3aed;
          --accent3: #c4b5fd;
          --text: #f5f3ff;
          --text2: rgba(245,243,255,0.55);
          --text3: rgba(245,243,255,0.22);
          --border: rgba(167,139,250,0.1);
          --font-display: 'Bricolage Grotesque', sans-serif;
          --font-body: 'Inter', sans-serif;
          --font-mono: 'DM Mono', monospace;
        }

        .sv-wrap {
          position: relative;
          background: var(--bg);
          padding: 120px 0 140px;
          overflow: hidden;
        }

        /* bg */
        .sv-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(167,139,250,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.028) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent);
        }
        .sv-glow-l {
          position: absolute; pointer-events: none;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%);
          top: -100px; left: -200px;
        }
        .sv-glow-r {
          position: absolute; pointer-events: none;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(196,181,253,0.05) 0%, transparent 70%);
          bottom: 0; right: -150px;
        }

        /* inner */
        .sv-inner {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto;
          padding: 0 48px;
        }

        /* header */
        .sv-header {
          text-align: center;
          margin-bottom: 72px;
        }
        .sv-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(167,139,250,0.07);
          border: 1px solid rgba(167,139,250,0.15);
          border-radius: 100px;
          padding: 5px 16px 5px 10px;
          margin-bottom: 24px;
        }
        .sv-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(167,139,250,0.8);
          animation: sv-pulse 2.4s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes sv-pulse {
          0%,100% { box-shadow: 0 0 5px rgba(167,139,250,0.6); }
          50%      { box-shadow: 0 0 14px rgba(167,139,250,1), 0 0 28px rgba(167,139,250,0.3); }
        }
        .sv-badge-txt {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.08em;
          color: rgba(167,139,250,0.72);
        }

        .sv-h2 {
          font-family: var(--font-display);
          font-size: clamp(30px, 3.5vw, 52px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--text);
          margin-bottom: 18px;
        }
        .sv-h2 em {
          font-style: normal;
          background: linear-gradient(118deg, #c4b5fd 0%, #a78bfa 50%, #7c3aed 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sv-sub {
          font-family: var(--font-body);
          font-size: 16px; color: var(--text2);
          line-height: 1.8; max-width: 540px;
          margin: 0 auto;
        }

        /* grid */
        .sv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* card */
        .svc-card {
          position: relative;
          background: var(--bg2);
          border: 1px solid rgba(167,139,250,0.09);
          border-radius: 18px;
          padding: 28px 26px 24px;
          display: flex; flex-direction: column;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.35s, background 0.35s;
        }
        .svc-card:hover {
          background: #0f0f1e;
          border-color: transparent;
        }

        .svc-card-line {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px; border-radius: 18px 18px 0 0;
        }

        .svc-card-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 18px;
        }

        .svc-icon {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .svc-id {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.1em;
          color: rgba(245,243,255,0.18);
        }

        .svc-title {
          font-family: var(--font-display);
          font-size: 17px; font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.25;
          margin-bottom: 5px;
          transition: color 0.3s;
        }
        .svc-short {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.06em;
          margin-bottom: 18px;
          transition: color 0.3s;
        }
        .svc-divider {
          height: 1px; margin-bottom: 16px;
          transition: background 0.35s;
        }
        .svc-desc {
          font-family: var(--font-body);
          font-size: 13.5px; font-weight: 400;
          color: var(--text2);
          line-height: 1.75;
          margin: 0 0 18px;
          flex: 1;
        }
        .svc-tags {
          display: flex; flex-wrap: wrap; gap: 7px;
          margin-bottom: 20px;
        }
        .svc-tag {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.06em;
          padding: 4px 10px;
          border-radius: 100px;
          border: 1px solid;
          transition: all 0.3s;
        }
        .svc-foot {
          display: flex; justify-content: space-between; align-items: center;
        }
        .svc-stat {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.06em;
          transition: color 0.3s;
        }

        /* bottom CTA strip */
        .sv-cta {
          margin-top: 64px;
          border: 1px solid rgba(167,139,250,0.12);
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(124,58,237,0.07) 0%, rgba(13,13,28,0.6) 60%);
          padding: 44px 48px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px; flex-wrap: wrap;
          position: relative; overflow: hidden;
        }
        .sv-cta::before {
          content: '';
          position: absolute; top: -1px; left: -1px;
          width: 80px; height: 80px;
          border-top: 1.5px solid rgba(167,139,250,0.5);
          border-left: 1.5px solid rgba(167,139,250,0.5);
          border-radius: 20px 0 0 0;
          pointer-events: none;
        }
        .sv-cta-left {}
        .sv-cta-heading {
          font-family: var(--font-display);
          font-size: clamp(20px, 2vw, 28px);
          font-weight: 700; letter-spacing: -0.025em;
          color: var(--text);
          margin-bottom: 8px;
        }
        .sv-cta-sub {
          font-family: var(--font-body);
          font-size: 14px; color: var(--text2);
          line-height: 1.7;
        }
        .sv-cta-btns {
          display: flex; gap: 12px; flex-shrink: 0; flex-wrap: wrap;
        }
        .sv-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 28px;
          background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
          border-radius: 10px; color: #fff;
          font-family: var(--font-body);
          font-size: 14px; font-weight: 600;
          text-decoration: none; letter-spacing: -0.01em;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 28px rgba(124,58,237,0.38), inset 0 1px 0 rgba(255,255,255,0.18);
          white-space: nowrap;
        }
        .sv-btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 48px rgba(124,58,237,0.58), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .sv-btn-primary svg { transition: transform 0.25s; }
        .sv-btn-primary:hover svg { transform: translateX(3px); }

        .sv-btn-ghost {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 24px;
          border: 1px solid rgba(226,234,245,0.1);
          border-radius: 10px;
          color: rgba(226,234,245,0.45);
          font-family: var(--font-body);
          font-size: 14px; font-weight: 500;
          text-decoration: none;
          background: rgba(255,255,255,0.02);
          transition: all 0.3s;
          white-space: nowrap;
        }
        .sv-btn-ghost:hover {
          border-color: rgba(167,139,250,0.35);
          color: var(--accent3);
          background: rgba(167,139,250,0.07);
          transform: translateY(-2px);
        }

        /* section divider line */
        .sv-divider-line {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.15), transparent);
          margin-bottom: 0;
        }

        /* responsive */
        @media (max-width: 1024px) {
          .sv-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .sv-grid { grid-template-columns: 1fr; }
          .sv-inner { padding: 0 20px; }
          .sv-cta { padding: 32px 24px; }
          .sv-cta-btns { width: 100%; }
          .sv-btn-primary, .sv-btn-ghost { justify-content: center; flex: 1; }
        }
      `}</style>

      <div className="sv-divider-line" />

      <section id="services" className="sv-root sv-wrap">
        {/* bg layers */}
        <div className="sv-bg-grid" />
        <div className="sv-glow-l" />
        <div className="sv-glow-r" />

        <div className="sv-inner">

          {/* ── Header ── */}
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
              <span className="sv-badge-txt">// What we do</span>
            </div>
            <h2 className="sv-h2">
              Everything you need<br />
              to <em>grow digitally</em>
            </h2>
            <p className="sv-sub">
              From concept to launch and beyond — we handle the full stack of digital growth so you can focus on running your business.
            </p>
          </div>

          {/* ── Grid ── */}
          <div className="sv-grid">
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </div>

         
        </div>
      </section>

      <div className="sv-divider-line" />
    </>
  );
}
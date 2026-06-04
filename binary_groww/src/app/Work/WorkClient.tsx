"use client";
import React, { useState, useRef, useEffect } from "react";

type Category = "All" | "Web" | "App" | "Branding" | "Marketing";

interface Project {
  id: string;
  title: string;
  client: string;
  category: Category;
  industry: string;
  desc: string;
  link?: string;
  urlLabel: string;
  accent: string;
  accentSoft: string;
  accentGlow: string;
  accentBorder: string;
  thumbnail?: string;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "The English Center",
    client: "Anjali Chatterjee",
    category: "Web",
    industry: "Education · Tuition",
    desc: "Full-stack tuition platform with admin panel, dynamic courses, video demos & enquiry system.",
    link: "https://the-english-center.vercel.app/",
    urlLabel: "the-english-center.vercel.app",
    accent: "#f59e0b",
    accentSoft: "rgba(245,158,11,0.07)",
    accentGlow: "rgba(217,119,6,0.22)",
    accentBorder: "rgba(245,158,11,0.13)",
    thumbnail: "/image.png",
  },
  {
    id: "02",
    title: "Dekuli Mandir",
    client: "Sachin Jha",
    category: "Web",
    industry: "Temple",
    desc: "Temple website with admin panel, dynamic gallery, events & enquiry system.",
    link: "https://dekulimandir.com/",
    urlLabel: "dekulimandir.com",
    accent: "#f59e0b",
    accentSoft: "rgba(245,158,11,0.07)",
    accentGlow: "rgba(217,119,6,0.22)",
    accentBorder: "rgba(245,158,11,0.13)",
    thumbnail: "/image02.png",
  },
];

const FILTERS: Category[] = ["All", "Web", "App", "Branding", "Marketing"];

function useInView(ref: React.RefObject<Element>, threshold = 0.12) {
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const a = project.accent;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "#110f00" : "#0d0b00",
        border: `1px solid ${hovered ? `${a}55` : project.accentBorder}`,
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.35s, box-shadow 0.35s, background 0.35s",
        boxShadow: hovered
          ? `0 0 0 1px ${a}14, 0 20px 48px rgba(0,0,0,0.5), 0 0 36px ${project.accentGlow}`
          : "none",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {/* top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        borderRadius: "16px 16px 0 0",
        background: `linear-gradient(90deg, ${a}, transparent)`,
        zIndex: 2,
      }} />

      {/* corner bracket */}
      <div style={{
        position: "absolute", top: -1, left: -1,
        width: 36, height: 36,
        borderTop: `1.5px solid ${a}`,
        borderLeft: `1.5px solid ${a}`,
        borderRadius: "16px 0 0 0",
        zIndex: 3, pointerEvents: "none",
      }} />

      {/* thumbnail */}
      <div style={{ height: 210, overflow: "hidden", borderBottom: `1px solid ${a}12`, position: "relative", flexShrink: 0 }}>
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#0a0800", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: `${a}40`, letterSpacing: "0.1em" }}>No preview</span>
          </div>
        )}

        {/* hover overlay with visit button */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(10,8,0,0.75)",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(4px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          zIndex: 4,
        }}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "10px 22px", borderRadius: 9,
              color: "#0a0800",
              fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700,
              textDecoration: "none",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              boxShadow: `0 0 24px ${project.accentGlow}`,
            }}
          >
            Visit site
            <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* card body — title, client, desc, button */}
      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: 6 }}>

        {/* title + industry pill */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 16, fontWeight: 700, letterSpacing: "-0.025em",
            color: hovered ? "#fefce8" : "rgba(254,252,232,0.88)",
            transition: "color 0.3s",
          }}>
            {project.title}
          </div>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: 8,
            letterSpacing: "0.07em", color: `${a}80`,
            padding: "2px 8px", borderRadius: 100,
            border: `1px solid ${a}22`,
            background: project.accentSoft,
            whiteSpace: "nowrap", flexShrink: 0,
          }}>
            {project.industry}
          </span>
        </div>

        {/* client */}
        <div style={{
          fontFamily: "'Inter', sans-serif", fontSize: 11,
          color: "rgba(254,252,232,0.3)",
          display: "flex", alignItems: "center", gap: 5,
        }}>
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.4 }}>
            <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M1 11c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {project.client}
        </div>

        {/* desc */}
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 12,
          color: "rgba(254,252,232,0.42)", lineHeight: 1.7,
          margin: 0,
        }}>
          {project.desc}
        </p>

        {/* visit site button */}
        <div style={{ marginTop: 4 }}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "8px 18px", borderRadius: 8,
              color: "#0a0800",
              fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700,
              textDecoration: "none",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              boxShadow: "0 0 18px rgba(217,119,6,0.3)",
              transition: "all 0.3s",
            }}
          >
            Visit site
            <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function WorkClient(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef as React.RefObject<Element>, 0.2);

  const filtered = PROJECTS.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .wk-root {
          --bg: #0a0800;
          --bg2: #110f00;
          --accent: #f59e0b;
          --text: #fefce8;
          --text2: rgba(254,252,232,0.52);
          --text3: rgba(254,252,232,0.2);
          --font-display: 'Bricolage Grotesque', sans-serif;
          --font-body: 'Inter', sans-serif;
          --font-mono: 'DM Mono', monospace;
        }
        .wk-wrap {
          position: relative;
          background: var(--bg);
          padding: 100px 0 120px;
          overflow: hidden;
        }
        .wk-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(245,158,11,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black 40%, transparent 100%);
        }
        .wk-glow-tl {
          position: absolute; pointer-events: none;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(217,119,6,0.13) 0%, transparent 70%);
          top: -80px; left: -160px;
        }
        .wk-glow-br {
          position: absolute; pointer-events: none;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%);
          bottom: 40px; right: -120px;
        }
        .wk-inner {
          position: relative; z-index: 2;
          max-width: 960px; margin: 0 auto;
          padding: 0 48px;
        }
        .wk-header { text-align: center; margin-bottom: 52px; }
        .wk-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(245,158,11,0.07);
          border: 1px solid rgba(245,158,11,0.16);
          border-radius: 100px; padding: 5px 16px 5px 10px; margin-bottom: 20px;
        }
        .wk-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(245,158,11,0.8);
          animation: wk-pulse 2.4s ease-in-out infinite;
        }
        @keyframes wk-pulse {
          0%,100% { box-shadow: 0 0 5px rgba(245,158,11,0.6); }
          50%      { box-shadow: 0 0 14px rgba(245,158,11,1), 0 0 28px rgba(245,158,11,0.3); }
        }
        .wk-badge-txt { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; color: rgba(245,158,11,0.72); }
        .wk-h2 {
          font-family: var(--font-display);
          font-size: clamp(26px, 3.5vw, 46px);
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
          color: var(--text); margin-bottom: 14px;
        }
        .wk-h2 em {
          font-style: normal;
          background: linear-gradient(118deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .wk-sub {
          font-family: var(--font-body); font-size: 15px;
          color: var(--text2); line-height: 1.8;
          max-width: 440px; margin: 0 auto 28px;
        }
        .wk-filters { display: flex; justify-content: center; gap: 6px; flex-wrap: wrap; }
        .wk-filter {
          padding: 7px 18px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          color: rgba(254,252,232,0.3);
          cursor: pointer; transition: all 0.25s;
        }
        .wk-filter:hover { border-color: rgba(245,158,11,0.35); color: #f59e0b; background: rgba(245,158,11,0.07); }
        .wk-filter.active { border-color: rgba(245,158,11,0.45); background: rgba(245,158,11,0.1); color: #f59e0b; }

        .wk-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
          margin-bottom: 56px;
        }

        .wk-cta {
          position: relative;
          border: 1px solid rgba(245,158,11,0.12); border-radius: 20px;
          background: linear-gradient(135deg, rgba(217,119,6,0.07) 0%, rgba(17,15,0,0.6) 60%);
          padding: 36px 40px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px; flex-wrap: wrap; overflow: hidden;
        }
        .wk-cta::after {
          content: ''; position: absolute; bottom: -1px; right: -1px;
          width: 56px; height: 56px;
          border-bottom: 1.5px solid rgba(245,158,11,0.3);
          border-right: 1.5px solid rgba(245,158,11,0.3);
          border-radius: 0 0 20px 0; pointer-events: none;
        }
        .wk-cta-heading {
          font-family: var(--font-display); font-size: clamp(16px, 2vw, 21px);
          font-weight: 700; letter-spacing: -0.025em; color: var(--text); margin-bottom: 5px;
        }
        .wk-cta-sub { font-family: var(--font-body); font-size: 13px; color: var(--text2); line-height: 1.7; }
        .wk-cta-btns { display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }

        .wk-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px; border-radius: 10px; color: #0a0800;
          font-family: var(--font-body); font-size: 13px; font-weight: 700;
          text-decoration: none;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          box-shadow: 0 0 22px rgba(217,119,6,0.35); transition: all 0.3s;
        }
        .wk-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 36px rgba(245,158,11,0.5); }
        .wk-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 20px;
          border: 1px solid rgba(245,158,11,0.14); border-radius: 10px;
          color: rgba(254,252,232,0.35); font-family: var(--font-body);
          font-size: 13px; font-weight: 500; text-decoration: none;
          background: rgba(245,158,11,0.03); transition: all 0.3s;
        }
        .wk-btn-ghost:hover { border-color: rgba(245,158,11,0.38); color: #fcd34d; background: rgba(245,158,11,0.08); transform: translateY(-2px); }

        .wk-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,158,11,0.13), transparent);
        }

        @media (max-width: 640px) {
          .wk-grid { grid-template-columns: 1fr; }
          .wk-inner { padding: 0 20px; }
          .wk-cta { padding: 26px 20px; }
          .wk-cta-btns { width: 100%; }
        }
      `}</style>

      <div className="wk-divider" />

      <section id="work" className="wk-root wk-wrap">
        <div className="wk-bg-grid" />
        <div className="wk-glow-tl" />
        <div className="wk-glow-br" />

        <div className="wk-inner">

          <div
            className="wk-header"
            ref={headRef}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="wk-badge">
              <span className="wk-badge-dot" />
              <span className="wk-badge-txt">// our work</span>
            </div>
            <h2 className="wk-h2">
              Work that <em>speaks</em><br />for itself
            </h2>
            <p className="wk-sub">
              Real projects, real clients, real results — here's what we've shipped so far.
            </p>
            <div className="wk-filters">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`wk-filter ${activeFilter === f ? "active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="wk-grid">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="wk-cta">
            <div>
              <div className="wk-cta-heading">Got a project in mind?</div>
              <div className="wk-cta-sub">Let's build something that actually moves the needle.</div>
            </div>
            <div className="wk-cta-btns">
              <a href="#contact" className="wk-btn-primary">
                Start a project
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#contact" className="wk-btn-ghost">Get in touch</a>
            </div>
          </div>

        </div>
      </section>

      <div className="wk-divider" />
    </>
  );
}
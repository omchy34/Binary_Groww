"use client";
import React, { useState, useRef, useEffect } from "react";
import Testimonials from "../Testimonials/page";

type Category = "All" | "Web" | "App" | "Branding" | "Marketing";

interface Project {
  id: string;
  title: string;
  client: string;
  category: Category;
  industry: string;
  desc: string;
  stack: string[];
  features: string[];
  stats: { label: string; value: string }[];
  link?: string;
  urlLabel: string;
  accent: string;
  accentSoft: string;
  accentGlow: string;
  accentBorder: string;
  featured: boolean;
  thumbnail?: string; // ← set to "/work/english-center.png" once you have a screenshot
  browserTags: string[];
  ctaLabel: string;
  ctaSecondary: string;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "The English Center",
    client: "Anjali Chatterjee",
    category: "Web",
    industry: "Education · Tuition",
    desc: "Full-stack tuition platform with admin panel, dynamic courses, video demos & enquiry system — delivered in just one week.",
    stack: ["Next.js", "Tailwind", "Node.js", "MongoDB"],
    features: ["Admin panel", "Gallery", "Courses", "Video uploads", "Enquiry"],
    stats: [
      { label: "Delivered", value: "1 Wk" },
      { label: "Pages", value: "8+" },
      { label: "Features", value: "5" },
    ],
    link: "https://the-english-center.vercel.app/",
    urlLabel: "the-english-center.vercel.app",
    accent: "#a78bfa",
    accentSoft: "rgba(167,139,250,0.07)",
    accentGlow: "rgba(124,58,237,0.25)",
    accentBorder: "rgba(167,139,250,0.14)",
    featured: true,
    thumbnail: "/image.png", // ← replace with: "/work/english-center.png"
    browserTags: ["Admin Panel", "Gallery", "Courses", "Videos", "Enquiry"],
    ctaLabel: "Visit site",
    ctaSecondary: "Start similar",
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

/* Thumbnail — shows real image if provided, else a styled placeholder */
function Thumbnail({ project }: { project: Project }) {
  const a = project.accent;
  const aS = project.accentSoft;

  if (project.thumbnail) {
    return (
      <img
        src={project.thumbnail}
        alt={project.title}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
      />
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", background: "#06060e", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* deep grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${a}18 1px, transparent 1px), linear-gradient(90deg, ${a}18 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />
      {/* glow */}
      <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "260px", height: "260px", borderRadius: "50%", background: `radial-gradient(circle, ${project.accentGlow} 0%, transparent 70%)` }} />

      {/* mock browser chrome */}
      <div style={{ position: "relative", zIndex: 2, margin: "16px 16px 0", background: "rgba(10,10,22,0.92)", border: `1px solid ${a}18`, borderRadius: "8px 8px 0 0", overflow: "hidden" }}>
        <div style={{ padding: "7px 10px", borderBottom: `1px solid ${a}0a`, display: "flex", alignItems: "center", gap: 5 }}>
          {["rgba(255,90,85,0.55)", "rgba(255,189,46,0.55)", "rgba(38,201,63,0.55)"].map((c, i) => (
            <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "block" }} />
          ))}
          <div style={{ flex: 1, marginLeft: 8, background: "rgba(255,255,255,0.05)", borderRadius: 3, padding: "2px 8px", fontFamily: "'DM Mono', monospace", fontSize: 8, color: `${a}55`, letterSpacing: "0.04em" }}>
            {project.urlLabel}
          </div>
        </div>
        <div style={{ padding: "10px 12px 0", display: "flex", flexDirection: "column", gap: 7 }}>
          <div style={{ height: 24, background: `linear-gradient(90deg, ${a}22, transparent)`, borderRadius: 3, width: "65%" }} />
          <div style={{ height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 2, width: "88%" }} />
          <div style={{ height: 8, background: "rgba(255,255,255,0.03)", borderRadius: 2, width: "70%" }} />
          <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
            {[true, false, false].map((hl, i) => (
              <div key={i} style={{ height: 44, flex: 1, background: hl ? aS : "rgba(255,255,255,0.025)", border: `1px solid ${hl ? `${a}22` : "rgba(255,255,255,0.04)"}`, borderRadius: 5 }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 5, marginTop: 1, paddingBottom: 12 }}>
            {project.browserTags.slice(0, 4).map((l) => (
              <div key={l} style={{ padding: "2px 7px", background: aS, border: `1px solid ${a}28`, borderRadius: 100, fontFamily: "'DM Mono', monospace", fontSize: 7, color: a, letterSpacing: "0.05em" }}>{l}</div>
            ))}
          </div>
        </div>
      </div>

      {/* hint bar */}
      <div style={{ position: "relative", zIndex: 2, marginTop: "auto", padding: "8px 16px", display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: a, boxShadow: `0 0 6px ${a}` }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.08em", color: `${a}40` }}>
          // replace with screenshot
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const a = project.accent;
  const aS = project.accentSoft;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "#0f0f1e" : "#0d0d1c",
        border: `1px solid ${hovered ? `${a}44` : project.accentBorder}`,
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        transition: "border-color 0.35s, box-shadow 0.35s, background 0.35s",
        boxShadow: hovered
          ? `0 0 0 1px ${a}18, 0 20px 56px rgba(0,0,0,0.5), 0 0 40px ${project.accentGlow}`
          : undefined,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
      }}
    >
      {/* top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, borderRadius: "16px 16px 0 0", background: `linear-gradient(90deg, ${a}, transparent)`, zIndex: 2 }} />

      {/* corner bracket */}
      <div style={{ position: "absolute", top: -1, left: -1, width: 44, height: 44, borderTop: `1.5px solid ${a}`, borderLeft: `1.5px solid ${a}`, borderRadius: "16px 0 0 0", zIndex: 3, pointerEvents: "none" }} />

      {/* thumbnail */}
      <div style={{ height: 220, overflow: "hidden", borderBottom: `1px solid ${a}12`, flexShrink: 0, position: "relative" }}>
        <Thumbnail project={project} />

        {/* hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(6,6,14,0.72)",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(3px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          zIndex: 4,
        }}>
          <a
            href={project.link}
            target={project.link?.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "10px 20px", borderRadius: 9,
              color: "#fff", fontFamily: "'Inter', sans-serif",
              fontSize: 12, fontWeight: 600, textDecoration: "none",
              background: `linear-gradient(135deg, ${a}, #7c3aed)`,
              boxShadow: `0 0 24px ${project.accentGlow}`,
            }}
          >
            View project
            <svg width="12" height="12" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>

      {/* card body */}
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: a }}>// {project.id}</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.06em", color: "rgba(245,243,255,0.2)" }}>{project.industry}</span>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "2px 9px", borderRadius: 100,
            background: aS, border: `1px solid ${a}33`,
            fontFamily: "'DM Mono', monospace", fontSize: 7, letterSpacing: "0.08em", color: a,
          }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: a, boxShadow: `0 0 5px ${a}`, display: "inline-block" }} />
            Featured
          </div>
        </div>

        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: "-0.025em", color: hovered ? "#f5f3ff" : "rgba(226,234,245,0.88)", marginBottom: 3, transition: "color 0.3s" }}>
          {project.title}
        </div>

        <div style={{ fontSize: 11, color: "rgba(245,243,255,0.25)", marginBottom: 9 }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ display: "inline", marginRight: 4, verticalAlign: "middle", opacity: 0.4 }}>
            <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M1 11c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {project.client}
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "rgba(245,243,255,0.5)", lineHeight: 1.72, marginBottom: 13 }}>
          {project.desc}
        </p>

        <div style={{ display: "flex", gap: 0, marginBottom: 13 }}>
          {project.stats.map((s, i) => (
            <div key={s.label} style={{
              paddingRight: i < project.stats.length - 1 ? 14 : 0,
              marginRight: i < project.stats.length - 1 ? 14 : 0,
              borderRight: i < project.stats.length - 1 ? `1px solid ${a}20` : "none",
            }}>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: "-0.03em", color: a, lineHeight: 1, marginBottom: 3 }}>{s.value}</div>
              <div style={{ fontSize: 9, color: "rgba(245,243,255,0.2)", fontFamily: "'Inter', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 13 }}>
          {project.features.map((f) => (
            <span key={f} style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.05em",
              padding: "3px 9px", borderRadius: 100,
              border: `1px solid ${a}28`, background: aS,
              color: hovered ? `${a}cc` : `${a}80`,
              transition: "color 0.3s",
            }}>
              {f}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(245,243,255,0.18)", letterSpacing: "0.07em" }}>Stack:</span>
          {project.stack.map((t) => (
            <span key={t} style={{
              fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.04em",
              color: "rgba(245,243,255,0.3)",
              padding: "2px 8px", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)", borderRadius: 5,
            }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
          <a
            href={project.link}
            target={project.link?.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 9,
              color: "#fff", fontFamily: "'Inter', sans-serif",
              fontSize: 12, fontWeight: 600, textDecoration: "none",
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              boxShadow: "0 0 20px rgba(124,58,237,0.32)",
              transition: "all 0.3s",
            }}
          >
            {project.ctaLabel}
            <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "9px 16px", borderRadius: 9,
              fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500,
              textDecoration: "none",
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${a}20`,
              color: `${a}80`,
              transition: "all 0.3s",
            }}
          >
            {project.ctaSecondary}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Work(): React.JSX.Element {
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
          --bg: #08080f;
          --bg2: #0d0d1c;
          --accent: #a78bfa;
          --text: #f5f3ff;
          --text2: rgba(245,243,255,0.52);
          --text3: rgba(245,243,255,0.2);
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

        /* deeper bg grid */
        .wk-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(167,139,250,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.08) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black 40%, transparent 100%);
        }
        .wk-glow-tl {
          position: absolute; pointer-events: none;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%);
          top: -80px; left: -160px;
        }
        .wk-glow-br {
          position: absolute; pointer-events: none;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%);
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
          background: rgba(167,139,250,0.07);
          border: 1px solid rgba(167,139,250,0.15);
          border-radius: 100px; padding: 5px 16px 5px 10px; margin-bottom: 20px;
        }
        .wk-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(167,139,250,0.8);
          animation: wk-pulse 2.4s ease-in-out infinite;
        }
        @keyframes wk-pulse {
          0%,100% { box-shadow: 0 0 5px rgba(167,139,250,0.6); }
          50%      { box-shadow: 0 0 14px rgba(167,139,250,1), 0 0 28px rgba(167,139,250,0.3); }
        }
        .wk-badge-txt { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; color: rgba(167,139,250,0.72); }
        .wk-h2 {
          font-family: var(--font-display);
          font-size: clamp(26px, 3.5vw, 46px);
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
          color: var(--text); margin-bottom: 14px;
        }
        .wk-h2 em {
          font-style: normal;
          background: linear-gradient(118deg, #c4b5fd 0%, #a78bfa 50%, #7c3aed 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .wk-sub { font-family: var(--font-body); font-size: 15px; color: var(--text2); line-height: 1.8; max-width: 460px; margin: 0 auto 28px; }

        .wk-filters { display: flex; justify-content: center; gap: 6px; flex-wrap: wrap; }
        .wk-filter {
          padding: 7px 18px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          color: rgba(245,243,255,0.35);
          cursor: pointer; transition: all 0.25s;
        }
        .wk-filter:hover { border-color: rgba(167,139,250,0.35); color: #a78bfa; background: rgba(167,139,250,0.08); }
        .wk-filter.active { border-color: rgba(167,139,250,0.45); background: rgba(167,139,250,0.12); color: #a78bfa; }

        /* single centered card */
        .wk-single { max-width: 540px; margin: 0 auto 48px; }

        .wk-count {
          text-align: center;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em;
          color: rgba(245,243,255,0.16); margin-bottom: 44px;
        }

        .wk-cta {
          position: relative;
          border: 1px solid rgba(167,139,250,0.12); border-radius: 20px;
          background: linear-gradient(135deg, rgba(124,58,237,0.07) 0%, rgba(13,13,28,0.6) 60%);
          padding: 38px 42px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px; flex-wrap: wrap; overflow: hidden;
        }
        .wk-cta::after {
          content: ''; position: absolute; bottom: -1px; right: -1px;
          width: 68px; height: 68px;
          border-bottom: 1.5px solid rgba(167,139,250,0.35);
          border-right: 1.5px solid rgba(167,139,250,0.35);
          border-radius: 0 0 20px 0; pointer-events: none;
        }
        .wk-cta-heading { font-family: var(--font-display); font-size: clamp(16px, 2vw, 22px); font-weight: 700; letter-spacing: -0.025em; color: var(--text); margin-bottom: 5px; }
        .wk-cta-sub { font-family: var(--font-body); font-size: 13px; color: var(--text2); line-height: 1.7; }
        .wk-cta-btns { display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }

        .wk-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px; border-radius: 10px; color: #fff;
          font-family: var(--font-body); font-size: 13px; font-weight: 600;
          text-decoration: none; letter-spacing: -0.01em;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          box-shadow: 0 0 24px rgba(124,58,237,0.35); transition: all 0.3s;
        }
        .wk-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 36px rgba(124,58,237,0.5); }
        .wk-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 20px;
          border: 1px solid rgba(226,234,245,0.1); border-radius: 10px;
          color: rgba(226,234,245,0.38); font-family: var(--font-body);
          font-size: 13px; font-weight: 500; text-decoration: none;
          background: rgba(255,255,255,0.02); transition: all 0.3s;
        }
        .wk-btn-ghost:hover { border-color: rgba(167,139,250,0.35); color: #c4b5fd; background: rgba(167,139,250,0.07); transform: translateY(-2px); }

        .wk-divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(167,139,250,0.14), transparent); }

        @media (max-width: 640px) {
          .wk-single { max-width: 100%; }
          .wk-inner { padding: 0 20px; }
          .wk-cta { padding: 28px 22px; }
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

          {/* Single centered card */}
          <div className="wk-single">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
      <div className="wk-divider" />
      <Testimonials/>
    </>
  );
}
"use client";
import React, { useState, useRef, useEffect } from "react";

export default function AboutClient(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [activeTab, setActiveTab] = useState(0);

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

  const stats = [
    { value: "10+", label: "Projects delivered", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { value: "7+", label: "Happy clients", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { value: "2+", label: "Years of experience", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { value: "1", label: "Countries served", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" },
  ];

  const pillars = [
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Fast launches",
      desc: "Pre-built solutions that get you live in days, not months — without sacrificing quality.",
    },
    {
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      title: "Custom development",
      desc: "Tailor-made platforms crafted around your exact vision — every pixel, every interaction.",
    },
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Scalable architecture",
      desc: "Systems built to grow with you — from MVP to enterprise scale without rewrites.",
    },
    {
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
      title: "End-to-end team",
      desc: "Designers, developers, and strategists working as one unified team on your project.",
    },
  ];

  const tabs = ["Our story", "What we do", "Our approach"];

  const tabContent = [
    {
      heading: "From Durgapur to the world",
      body: `binaryGroww started as a small collective of passionate developers who believed technology should be accessible, powerful, and human. Founded near the Sanaka Educational Trust campus in Durgapur, West Bengal, we grew from building simple websites for local businesses into a full-stack digital agency shipping products for clients across India, Dubai, Canada, and the US.\n\nWhat kept us moving? A single conviction — that great technology changes lives. We've never wavered from that. Every project we take on, big or small, gets our complete focus and craftsmanship.`,
    },
    {
      heading: "Digital products that move the needle",
      body: `We build websites, mobile apps, SaaS platforms, e-commerce systems, food delivery apps, and complete digital ecosystems. Whether you're a founder validating your first idea or an enterprise scaling to new markets, we have the tools and the team to ship.\n\nWe offer both pre-built solution tracks — for fast, budget-friendly launches — and fully custom development tracks for unique, tailor-made platforms. Every line of code we write has one job: to help your business grow online.`,
    },
    {
      heading: "Understand first, build second",
      body: `Before we write a single line of code, we spend time understanding your vision, your users, and your market. We ask the hard questions, challenge assumptions, and define clear goals. Only then do we design and build.\n\nThis approach means fewer revisions, faster delivery, and products that actually work for real people. We're not order-takers — we're partners who are invested in your success as much as you are.`,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .a-root {
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

        .a-wrap {
          position: relative;
          min-height: 100vh;
          background: var(--bg);
          overflow: hidden;
          padding-top: 92px;
        }

        .a-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(167,139,250,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.08) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 36%, black 5%, transparent 100%);
        }
        .a-bg-noise {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.018;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
        }

        .a-glow {
          position: absolute; border-radius: 50%; pointer-events: none;
          will-change: transform;
          transition: transform 2s cubic-bezier(0.16,1,0.3,1);
        }
        .a-glow-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 65%);
          top: -240px; left: -140px;
        }
        .a-glow-2 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(196,181,253,0.07) 0%, transparent 70%);
          bottom: -120px; right: -80px;
        }
        .a-glow-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%);
          top: 42%; right: 36%;
        }

        .a-inner {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto;
          padding: 72px 48px 120px;
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Hero header ── */
        .a-hero {
          text-align: center;
          margin-bottom: 80px;
          animation: a-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        .a-badge {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(167,139,250,0.07);
          border: 1px solid rgba(167,139,250,0.16);
          border-radius: 100px;
          padding: 6px 16px 6px 11px;
          margin-bottom: 28px;
        }
        .a-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(167,139,250,0.9);
          animation: a-glow-dot 2.2s ease-in-out infinite;
        }
        @keyframes a-glow-dot {
          0%,100% { box-shadow: 0 0 5px rgba(167,139,250,0.7); }
          50% { box-shadow: 0 0 14px rgba(167,139,250,1), 0 0 24px rgba(167,139,250,0.3); }
        }
        .a-badge-txt {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.08em;
          color: rgba(167,139,250,0.75);
        }
        .a-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 4.5vw, 64px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-bottom: 18px;
        }
        .a-title-dim { color: rgba(226,234,245,0.2); font-weight: 600; }
        .a-title-grad {
          background: linear-gradient(118deg, #c4b5fd 0%, #a78bfa 50%, #7c3aed 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .a-subtitle {
          font-family: var(--font-body);
          font-size: 16px; color: var(--text2);
          line-height: 1.8; max-width: 600px; margin: 0 auto;
        }

        /* ── Stats row ── */
        .a-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 72px;
          animation: a-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        .a-stat-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .a-stat-card:hover {
          border-color: rgba(167,139,250,0.35);
          transform: translateY(-3px);
        }
        .a-stat-card::before {
          content: '';
          position: absolute; top: -1px; left: -1px;
          width: 40px; height: 40px;
          border-top: 1.5px solid var(--accent);
          border-left: 1.5px solid var(--accent);
          border-radius: 20px 0 0 0;
          opacity: 0.65;
        }
        .a-stat-icon {
          width: 38px; height: 38px;
          background: rgba(167,139,250,0.08);
          border: 1px solid rgba(167,139,250,0.16);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px;
        }
        .a-stat-icon svg { color: var(--accent); }
        .a-stat-val {
          font-family: var(--font-display);
          font-size: 36px; font-weight: 800;
          letter-spacing: -0.04em;
          background: linear-gradient(118deg, #c4b5fd 0%, #a78bfa 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
        }
        .a-stat-label {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.08em;
          color: var(--text3);
        }

        /* ── Main two-col ── */
        .a-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 72px;
          align-items: start;
        }

        /* ── Story / Tabs left col ── */
        .a-story {
          animation: a-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both;
        }
        .a-story-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 36px;
          position: relative;
          overflow: hidden;
        }
        .a-story-card::before {
          content: '';
          position: absolute; top: -1px; left: -1px;
          width: 56px; height: 56px;
          border-top: 1.5px solid var(--accent);
          border-left: 1.5px solid var(--accent);
          border-radius: 20px 0 0 0;
          opacity: 0.65;
        }
        .a-story-card::after {
          content: '';
          position: absolute; bottom: -1px; right: -1px;
          width: 56px; height: 56px;
          border-bottom: 1.5px solid rgba(124,58,237,0.4);
          border-right: 1.5px solid rgba(124,58,237,0.4);
          border-radius: 0 0 20px 0;
        }

        /* tabs */
        .a-tabs {
          display: flex; gap: 6px;
          margin-bottom: 28px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border2);
          border-radius: 12px;
          padding: 5px;
        }
        .a-tab {
          flex: 1;
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.06em;
          color: var(--text3);
          background: none; border: none; cursor: pointer;
          padding: 9px 12px;
          border-radius: 8px;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .a-tab.active {
          background: rgba(167,139,250,0.12);
          border: 1px solid rgba(167,139,250,0.22);
          color: var(--accent3);
        }
        .a-tab:not(.active):hover {
          color: var(--text2);
          background: rgba(255,255,255,0.03);
        }

        .a-tab-content {
          animation: a-fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        .a-tab-heading {
          font-family: var(--font-display);
          font-size: 20px; font-weight: 700;
          color: var(--text); letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .a-tab-body {
          font-family: var(--font-body);
          font-size: 14px; color: var(--text2);
          line-height: 1.85;
          white-space: pre-line;
        }

        /* team line */
        .a-team-strip {
          display: flex; align-items: center; gap: 14px;
          margin-top: 28px;
          padding-top: 22px;
          border-top: 1px solid var(--border2);
        }
        .a-avatars {
          display: flex;
        }
        .a-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: var(--bg2);
          border: 2px solid var(--bg);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.04em;
          color: var(--accent3);
          margin-right: -8px;
        }
        .a-avatar:nth-child(1) { background: rgba(124,58,237,0.22); }
        .a-avatar:nth-child(2) { background: rgba(196,181,253,0.15); }
        .a-avatar:nth-child(3) { background: rgba(167,139,250,0.18); }
        .a-avatar:nth-child(4) {
          background: rgba(255,255,255,0.04);
          color: var(--text3); font-size: 9px;
        }
        .a-team-label {
          font-family: var(--font-body);
          font-size: 12.5px; color: var(--text3);
        }
        .a-team-label strong {
          color: var(--text2); font-weight: 500;
        }

        /* ── Right col: pillars ── */
        .a-pillars {
          display: flex; flex-direction: column; gap: 14px;
          animation: a-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }

        .a-pillar {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px 22px 22px 20px;
          display: flex; align-items: flex-start; gap: 16px;
          position: relative; overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .a-pillar:hover {
          border-color: rgba(167,139,250,0.32);
          transform: translateX(4px);
        }
        .a-pillar::before {
          content: '';
          position: absolute; left: 0; top: 50%;
          transform: translateY(-50%);
          width: 2.5px; height: 0;
          background: linear-gradient(180deg, var(--accent2), var(--accent));
          border-radius: 0 2px 2px 0;
          transition: height 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .a-pillar:hover::before { height: 60%; }

        .a-pillar-icon {
          width: 40px; height: 40px; flex-shrink: 0;
          background: rgba(167,139,250,0.08);
          border: 1px solid rgba(167,139,250,0.16);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .a-pillar-icon svg { color: var(--accent); }
        .a-pillar-title {
          font-family: var(--font-display);
          font-size: 15px; font-weight: 700;
          color: var(--text); letter-spacing: -0.01em;
          margin-bottom: 5px;
        }
        .a-pillar-desc {
          font-family: var(--font-body);
          font-size: 12.5px; color: var(--text3);
          line-height: 1.75;
        }

        /* ── Mission bar ── */
        .a-mission {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px 48px;
          display: flex; align-items: center; gap: 40px;
          position: relative; overflow: hidden;
          animation: a-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both;
        }
        .a-mission::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 100% at 0% 50%, rgba(124,58,237,0.07), transparent);
          pointer-events: none;
        }
        .a-mission-icon-wrap {
          flex-shrink: 0;
          width: 64px; height: 64px;
          background: rgba(167,139,250,0.08);
          border: 1px solid rgba(167,139,250,0.2);
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
        }
        .a-mission-icon-wrap svg { color: var(--accent); }
        .a-mission-label {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.1em;
          color: var(--text3); margin-bottom: 8px;
        }
        .a-mission-quote {
          font-family: var(--font-display);
          font-size: clamp(17px, 2vw, 22px);
          font-weight: 700; letter-spacing: -0.02em;
          color: var(--text); line-height: 1.3;
        }
        .a-mission-quote span {
          background: linear-gradient(118deg, #c4b5fd 0%, #a78bfa 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── CTA strip ── */
        .a-cta-row {
          display: flex; justify-content: center; gap: 14px;
          margin-top: 48px;
          animation: a-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both;
          flex-wrap: wrap;
        }
        .a-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
          border-radius: 10px; color: #fff; border: none; cursor: pointer;
          font-family: var(--font-body);
          font-size: 14px; font-weight: 600; letter-spacing: -0.01em;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 28px rgba(124,58,237,0.38), 0 4px 16px rgba(0,0,0,0.25),
                      inset 0 1px 0 rgba(255,255,255,0.18);
          text-decoration: none;
        }
        .a-btn-primary:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 0 48px rgba(124,58,237,0.58), 0 8px 24px rgba(0,0,0,0.35),
                      inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .a-btn-primary svg { transition: transform 0.25s; }
        .a-btn-primary:hover svg { transform: translateX(3px); }

        .a-btn-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: var(--text2); cursor: pointer;
          font-family: var(--font-body);
          font-size: 14px; font-weight: 500;
          transition: all 0.25s;
          text-decoration: none;
        }
        .a-btn-ghost:hover {
          border-color: rgba(167,139,250,0.3);
          color: var(--accent3);
          background: rgba(167,139,250,0.06);
        }

        @keyframes a-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 960px) {
          .a-stats { grid-template-columns: repeat(2, 1fr); }
          .a-main-grid { grid-template-columns: 1fr; }
          .a-inner { padding: 44px 24px 80px; }
          .a-mission { flex-direction: column; gap: 20px; padding: 28px 24px; }
        }
        @media (max-width: 520px) {
          .a-stats { grid-template-columns: 1fr 1fr; }
          .a-story-card { padding: 24px 18px; }
          .a-tabs { flex-direction: column; }
        }
      `}</style>

      <section className="a-root a-wrap" ref={sectionRef}>
        <div className="a-bg-grid" />
        <div className="a-bg-noise" />

        <div className="a-glow a-glow-1" style={{ transform: `translate(${tx * -0.7}px, ${ty * -0.7}px)` }} />
        <div className="a-glow a-glow-2" style={{ transform: `translate(${tx * 0.5}px, ${ty * 0.5}px)` }} />
        <div className="a-glow a-glow-3" style={{ transform: `translate(${tx * 0.3}px, ${ty * 0.3}px)` }} />

        <div className="a-inner">

          {/* ── Hero Header ── */}
          <div className="a-hero">
            <div className="a-badge">
              <span className="a-badge-dot" />
              <span className="a-badge-txt">// Building the digital future</span>
            </div>
            <h1 className="a-title">
              <span className="a-title-dim">Who we are &</span>
              <br />
              <span className="a-title-grad">what we stand for</span>
            </h1>
            <p className="a-subtitle">
              We are creators, engineers, and strategists — united by one mission: make technology simple, scalable, and impactful for every business we touch.
            </p>
          </div>

          {/* ── Stats ── */}
          <div className="a-stats">
            {stats.map((s, i) => (
              <div className="a-stat-card" key={i}>
                <div className="a-stat-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icon} />
                  </svg>
                </div>
                <div className="a-stat-val">{s.value}</div>
                <div className="a-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── Main 2-col ── */}
          <div className="a-main-grid">

            {/* Left: Story tabs */}
            <div className="a-story">
              <div className="a-story-card">
                <div className="a-tabs">
                  {tabs.map((t, i) => (
                    <button
                      key={i}
                      className={`a-tab${activeTab === i ? " active" : ""}`}
                      onClick={() => setActiveTab(i)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="a-tab-content" key={activeTab}>
                  <div className="a-tab-heading">{tabContent[activeTab].heading}</div>
                  <p className="a-tab-body">{tabContent[activeTab].body}</p>
                </div>

                <div className="a-team-strip">
                  <div className="a-avatars">
                    <div className="a-avatar">SB</div>
                    <div className="a-avatar">RK</div>
                    <div className="a-avatar">AD</div>
                    <div className="a-avatar">+7</div>
                  </div>
                  <div className="a-team-label">
                    A <strong>10+ member team</strong> of devs, designers & strategists
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Pillars */}
            <div className="a-pillars">
              {pillars.map((p, i) => (
                <div className="a-pillar" key={i}>
                  <div className="a-pillar-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={p.icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="a-pillar-title">{p.title}</div>
                    <div className="a-pillar-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Mission bar ── */}
          <div className="a-mission">
            <div className="a-mission-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div>
              <div className="a-mission-label">// Our mission</div>
              <div className="a-mission-quote">
                To make technology <span>simple, scalable, and impactful</span> —<br />
                so every business can thrive in the digital world.
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="a-cta-row">
            <a href="#contact" className="a-btn-primary">
              Start a project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#work" className="a-btn-ghost">
              See our work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
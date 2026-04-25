"use client";
import React, { useState, useRef, useEffect } from "react";

/* ── Types ─────────────────────────────────────────── */
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  country: string;
  flag: string;
  service: string;
  rating: number;
  quote: string;
  videoSrc: string; // replace with real video URLs
  thumb: string;    // replace with real thumbnail URLs
}

/* ── Data ───────────────────────────────────────────── */
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Founder & CEO",
    company: "ShopNest",
    country: "India",
    flag: "🇮🇳",
    service: "E-commerce platform",
    rating: 5,
    quote: "binaryGroww delivered our entire e-commerce platform in under 6 weeks. The attention to detail and performance optimization was beyond what we expected.",
    videoSrc: "", // e.g. "https://www.w3schools.com/html/mov_bbb.mp4"
    thumb: "",
  },
  {
    id: 2,
    name: "Sarah Al-Rashid",
    role: "Co-founder",
    company: "LaunchPad MENA",
    country: "Dubai, UAE",
    flag: "🇦🇪",
    service: "SaaS dashboard",
    rating: 5,
    quote: "Working with binaryGroww felt like having an in-house team. They understood our vision from day one and shipped a dashboard that our investors loved.",
    videoSrc: "",
    thumb: "",
  },
  {
    id: 3,
    name: "Marcus Thompson",
    role: "Product Manager",
    company: "Routify",
    country: "Toronto, Canada",
    flag: "🇨🇦",
    service: "Mobile app",
    rating: 5,
    quote: "The mobile app they built for us has a 4.9 rating on the App Store. Clean code, stunning UI, and they were responsive throughout the entire process.",
    videoSrc: "",
    thumb: "",
  },
  {
    id: 4,
    name: "Emily Hartwell",
    role: "Marketing Director",
    company: "BrandBridge",
    country: "New York, USA",
    flag: "🇺🇸",
    service: "Brand identity + website",
    rating: 5,
    quote: "From branding to launch, binaryGroww handled everything flawlessly. Our new site converts 3× better than the old one. Worth every penny.",
    videoSrc: "",
    thumb: "",
  },
];

/* ── Video Card ─────────────────────────────────────── */
function VideoCard({ t, index }: { t: Testimonial; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const hasVideo = Boolean(t.videoSrc);

  const toggle = () => {
    if (!hasVideo) return;
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.play(); setPlaying(true); }
  };

  const handleTime = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleEnded = () => setPlaying(false);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  // initials avatar
  const initials = t.name.split(" ").map(w => w[0]).join("").slice(0, 2);

  return (
    <div
      className="tv-card"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Video / placeholder area ── */}
      <div className="tv-video-wrap" onClick={toggle}>

        {/* Placeholder gradient when no video */}
        {!hasVideo && (
          <div className="tv-placeholder">
            <div className="tv-placeholder-lines">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="tv-ph-line" style={{ width: `${60 + i * 8}%`, animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
            <div className="tv-placeholder-label">// video testimonial</div>
          </div>
        )}

        {/* Actual video */}
        {hasVideo && (
          <video
            ref={videoRef}
            src={t.videoSrc}
            poster={t.thumb || undefined}
            preload="metadata"
            playsInline
            onTimeUpdate={handleTime}
            onEnded={handleEnded}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}

        {/* Overlay gradient */}
        <div className={`tv-overlay ${playing ? "playing" : ""}`} />

        {/* Play / pause button */}
        <div className={`tv-play-btn ${hovered || !playing ? "visible" : ""}`}>
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
        </div>

        {/* Top-right controls */}
        <div className="tv-top-controls">
          <div className="tv-service-tag">{t.service}</div>
          {hasVideo && (
            <button className="tv-mute-btn" onClick={toggleMute}>
              {muted ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Progress bar */}
        {hasVideo && (
          <div className="tv-progress-wrap" onClick={e => { e.stopPropagation(); seek(e); }}>
            <div className="tv-progress-track">
              <div className="tv-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Stars overlay bottom-left */}
        <div className="tv-stars-overlay">
          {[...Array(t.rating)].map((_, i) => (
            <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#a78bfa">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          ))}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="tv-body">
        {/* Quote */}
        <div className="tv-quote-mark">"</div>
        <p className="tv-quote">{t.quote}</p>

        {/* Author */}
        <div className="tv-author">
          <div className="tv-avatar">{initials}</div>
          <div>
            <div className="tv-author-name">{t.name}</div>
            <div className="tv-author-meta">
              {t.role} · {t.company} · {t.flag} {t.country}
            </div>
          </div>
        </div>
      </div>

      {/* corner brackets */}
      <div className="tv-corner tv-corner-tl" />
      <div className="tv-corner tv-corner-br" />
    </div>
  );
}

/* ── Page ───────────────────────────────────────────── */
export default function Testimonials(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      const r = sectionRef.current?.getBoundingClientRect();
      if (!r) return;
      setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const tx = (mouse.x - 0.5) * 20;
  const ty = (mouse.y - 0.5) * 12;

  const avgRating = (testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

        /* ── tokens ── */
        .tv-root {
          --bg: #08080f;
          --bg2: #0d0d1c;
          --bg3: #111127;
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

        /* ── section ── */
        .tv-wrap {
          position: relative;
          background: var(--bg);
          overflow: hidden;
          padding-top: 92px;
        }

        /* ── bg layers ── */
        .tv-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(167,139,250,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.08) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 36%, black 5%, transparent 100%);
        }
        .tv-bg-noise {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.018;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
        }

        /* ── glows ── */
        .tv-glow {
          position: absolute; border-radius: 50%; pointer-events: none;
          will-change: transform;
          transition: transform 2s cubic-bezier(0.16,1,0.3,1);
        }
        .tv-glow-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%);
          top: -260px; left: -160px;
        }
        .tv-glow-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(196,181,253,0.07) 0%, transparent 70%);
          bottom: -140px; right: -100px;
        }
        .tv-glow-3 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
        }

        /* ── inner ── */
        .tv-inner {
          position: relative; z-index: 2;
          max-width: 1160px; margin: 0 auto;
          padding: 40px 36px 64px;
          width: 100%; box-sizing: border-box;
        }

        /* ── header ── */
        .tv-header {
          text-align: center;
          margin-bottom: 32px;
          animation: tv-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s both;
        }
        .tv-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(167,139,250,0.07);
          border: 1px solid rgba(167,139,250,0.16);
          border-radius: 100px;
          padding: 4px 12px 4px 9px;
          margin-bottom: 14px;
        }
        .tv-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(167,139,250,0.9);
          animation: tv-glow-dot 2.2s ease-in-out infinite;
        }
        @keyframes tv-glow-dot {
          0%,100% { box-shadow: 0 0 5px rgba(167,139,250,0.7); }
          50% { box-shadow: 0 0 14px rgba(167,139,250,1), 0 0 24px rgba(167,139,250,0.3); }
        }
        .tv-badge-txt {
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.08em;
          color: rgba(167,139,250,0.75);
        }
        .tv-title {
          font-family: var(--font-display);
          font-size: clamp(22px, 2.4vw, 36px);
          font-weight: 800; letter-spacing: -0.028em; line-height: 1.1;
          margin-bottom: 10px;
        }
        .tv-title-dim { color: rgba(226,234,245,0.2); font-weight: 600; }
        .tv-title-grad {
          background: linear-gradient(118deg, #c4b5fd 0%, #a78bfa 50%, #7c3aed 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tv-subtitle {
          font-family: var(--font-body);
          font-size: 13px; color: var(--text2);
          line-height: 1.7; max-width: 480px; margin: 0 auto 18px;
        }

        /* trust bar */
        .tv-trust {
          display: inline-flex; align-items: center; gap: 14px;
          background: rgba(167,139,250,0.04);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 7px 18px;
          flex-wrap: wrap; justify-content: center;
        }
        .tv-trust-item {
          display: flex; align-items: center; gap: 6px;
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.07em;
          color: var(--text3);
        }
        .tv-trust-item svg { color: var(--accent); }
        .tv-trust-sep {
          width: 1px; height: 12px;
          background: var(--border2);
        }

        /* ── video grid ── */
        .tv-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* ── video card ── */
        .tv-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          transition: border-color 0.35s, transform 0.35s cubic-bezier(0.16,1,0.3,1);
          animation: tv-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both;
        }
        .tv-card:hover {
          border-color: rgba(167,139,250,0.35);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(167,139,250,0.08);
        }

        /* corner brackets */
        .tv-corner {
          position: absolute; width: 28px; height: 28px;
          pointer-events: none; z-index: 4;
        }
        .tv-corner-tl {
          top: -1px; left: -1px;
          border-top: 1.5px solid var(--accent);
          border-left: 1.5px solid var(--accent);
          border-radius: 14px 0 0 0;
          opacity: 0.65;
        }
        .tv-corner-br {
          bottom: -1px; right: -1px;
          border-bottom: 1.5px solid rgba(124,58,237,0.4);
          border-right: 1.5px solid rgba(124,58,237,0.4);
          border-radius: 0 0 14px 0;
        }

        /* ── video area ── */
        .tv-video-wrap {
          position: relative;
          aspect-ratio: 16/9;
          background: var(--bg3);
          cursor: pointer;
          overflow: hidden;
        }

        /* placeholder */
        .tv-placeholder {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #0d0d1c 0%, #111127 100%);
        }
        .tv-placeholder-lines {
          display: flex; flex-direction: column;
          align-items: center; gap: 7px;
          width: 60%;
        }
        .tv-ph-line {
          height: 4px; border-radius: 100px;
          background: rgba(167,139,250,0.12);
          animation: tv-shimmer 2.2s ease-in-out infinite;
        }
        @keyframes tv-shimmer {
          0%,100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .tv-placeholder-label {
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.1em;
          color: var(--text3);
          margin-top: 10px;
        }

        /* overlay */
        .tv-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(8,8,15,0.85) 0%,
            rgba(8,8,15,0.2) 45%,
            rgba(8,8,15,0.0) 100%
          );
          transition: opacity 0.3s;
        }
        .tv-overlay.playing { opacity: 0.4; }

        /* play button */
        .tv-play-btn {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.85);
          width: 38px; height: 38px;
          background: rgba(124,58,237,0.85);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          opacity: 0;
          transition: opacity 0.25s, transform 0.25s;
          backdrop-filter: blur(8px);
          box-shadow: 0 0 24px rgba(124,58,237,0.6);
        }
        .tv-play-btn.visible {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        .tv-card:hover .tv-play-btn { opacity: 1; transform: translate(-50%,-50%) scale(1); }

        /* top controls */
        .tv-top-controls {
          position: absolute; top: 8px; left: 8px; right: 8px;
          display: flex; align-items: center; justify-content: space-between;
          z-index: 3;
        }
        .tv-service-tag {
          font-family: var(--font-mono);
          font-size: 8px; letter-spacing: 0.09em;
          color: rgba(196,181,253,0.85);
          background: rgba(8,8,15,0.7);
          border: 1px solid rgba(167,139,250,0.2);
          border-radius: 100px;
          padding: 3px 8px;
          backdrop-filter: blur(12px);
        }
        .tv-mute-btn {
          width: 22px; height: 22px;
          background: rgba(8,8,15,0.7);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--text2);
          cursor: pointer;
          backdrop-filter: blur(12px);
          transition: border-color 0.2s, color 0.2s;
        }
        .tv-mute-btn:hover { border-color: rgba(167,139,250,0.3); color: var(--accent3); }

        /* progress */
        .tv-progress-wrap {
          position: absolute; bottom: 0; left: 0; right: 0;
          z-index: 3; padding: 8px;
          cursor: pointer;
        }
        .tv-progress-track {
          height: 3px; border-radius: 100px;
          background: rgba(255,255,255,0.12);
          overflow: hidden;
        }
        .tv-progress-fill {
          height: 100%; border-radius: 100px;
          background: linear-gradient(90deg, var(--accent2), var(--accent));
          transition: width 0.1s linear;
        }

        /* stars overlay */
        .tv-stars-overlay {
          position: absolute; bottom: 10px; left: 10px;
          display: flex; gap: 2px; z-index: 3;
        }

        /* ── card body ── */
        .tv-body {
          padding: 14px 16px 16px;
        }

        .tv-quote-mark {
          font-family: var(--font-display);
          font-size: 32px; line-height: 1;
          color: rgba(167,139,250,0.2);
          margin-bottom: -4px;
          margin-left: -2px;
          font-weight: 800;
        }

        .tv-quote {
          font-family: var(--font-body);
          font-size: 12px; color: var(--text2);
          line-height: 1.7;
          margin-bottom: 12px;
        }

        .tv-author {
          display: flex; align-items: center; gap: 10px;
          padding-top: 12px;
          border-top: 1px solid var(--border2);
        }
        .tv-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(124,58,237,0.2);
          border: 1px solid rgba(167,139,250,0.22);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-mono);
          font-size: 9px; font-weight: 500;
          color: var(--accent3);
          flex-shrink: 0;
        }
        .tv-author-name {
          font-family: var(--font-body);
          font-size: 12px; font-weight: 600;
          color: var(--text);
          margin-bottom: 2px;
        }
        .tv-author-meta {
          font-family: var(--font-mono);
          font-size: 8.5px; letter-spacing: 0.05em;
          color: var(--text3);
        }

        /* ── bottom CTA ── */
        .tv-bottom {
          text-align: center;
          margin-top: 40px;
          animation: tv-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both;
        }
        .tv-bottom-label {
          font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.1em;
          color: var(--text3);
          margin-bottom: 10px;
        }
        .tv-bottom-text {
          font-family: var(--font-display);
          font-size: clamp(16px, 2vw, 24px);
          font-weight: 800; letter-spacing: -0.025em;
          color: var(--text);
          margin-bottom: 20px;
        }
        .tv-bottom-text span {
          background: linear-gradient(118deg, #c4b5fd 0%, #a78bfa 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tv-cta-row {
          display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;
        }
        .tv-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px;
          background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
          border-radius: 9px; color: #fff; border: none; cursor: pointer;
          font-family: var(--font-body);
          font-size: 13px; font-weight: 600; letter-spacing: -0.01em;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 22px rgba(124,58,237,0.38), 0 4px 14px rgba(0,0,0,0.25),
                      inset 0 1px 0 rgba(255,255,255,0.18);
          text-decoration: none;
        }
        .tv-btn-primary:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 0 40px rgba(124,58,237,0.58), 0 8px 20px rgba(0,0,0,0.35);
        }
        .tv-btn-primary svg { transition: transform 0.25s; }
        .tv-btn-primary:hover svg { transform: translateX(3px); }

        .tv-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px; color: var(--text2); cursor: pointer;
          font-family: var(--font-body);
          font-size: 13px; font-weight: 500;
          transition: all 0.25s;
          text-decoration: none;
        }
        .tv-btn-ghost:hover {
          border-color: rgba(167,139,250,0.3);
          color: var(--accent3);
          background: rgba(167,139,250,0.06);
        }

        @keyframes tv-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── responsive ── */
        @media (max-width: 1100px) {
          .tv-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 760px) {
          .tv-grid { grid-template-columns: 1fr; }
          .tv-inner { padding: 32px 18px 48px; }
        }
        @media (max-width: 500px) {
          .tv-trust { flex-direction: column; gap: 8px; }
          .tv-trust-sep { display: none; }
        }
      `}</style>

      <section className="tv-root tv-wrap" ref={sectionRef}>
        <div className="tv-bg-grid" />
        <div className="tv-bg-noise" />

        <div className="tv-glow tv-glow-1" style={{ transform: `translate(${tx * -0.7}px, ${ty * -0.7}px)` }} />
        <div className="tv-glow tv-glow-2" style={{ transform: `translate(${tx * 0.5}px, ${ty * 0.5}px)` }} />
        <div className="tv-glow tv-glow-3" />

        <div className="tv-inner">

          {/* ── Header ── */}
          <div className="tv-header">
            <div className="tv-badge">
              <span className="tv-badge-dot" />
              <span className="tv-badge-txt">// Client stories</span>
            </div>
            <h2 className="tv-title">
              <span className="tv-title-dim">Don't take our word —</span>
              <br />
              <span className="tv-title-grad">hear it from them</span>
            </h2>
            <p className="tv-subtitle">
              Real clients. Real results. Watch what founders and teams say after working with binaryGroww.
            </p>

            {/* Trust bar */}
            <div className="tv-trust">
              <div className="tv-trust-item">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                {avgRating} avg rating
              </div>
              <div className="tv-trust-sep" />
              <div className="tv-trust-item">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                {testimonials.length} verified clients
              </div>
              <div className="tv-trust-sep" />
              <div className="tv-trust-item">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                updated 2025
              </div>
            </div>
          </div>

          {/* ── Video Grid ── */}
          <div className="tv-grid">
            {testimonials.map((t, i) => (
              <VideoCard key={t.id} t={t} index={i} />
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <div className="tv-bottom">
            <div className="tv-bottom-label">// ready to be next?</div>
            <div className="tv-bottom-text">
              Let's build something <span>you'll love showing off.</span>
            </div>
            <div className="tv-cta-row">
              <a href="#contact" className="tv-btn-primary">
                Start your project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#work" className="tv-btn-ghost">
                View our work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
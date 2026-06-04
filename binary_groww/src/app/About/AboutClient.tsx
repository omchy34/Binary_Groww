"use client";
import React, { useState, useRef, useEffect } from "react";

export default function AboutClient(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const handleTabChange = (idx: number) => {
    if (idx === activeTab || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(idx);
      setIsAnimating(false);
    }, 220);
  };

  const stats = [
    { value: "10+", label: "Projects delivered" },
    { value: "7+",  label: "Happy clients" },
    { value: "2+",  label: "Years experience" },
    { value: "100%", label: "On-time rate" },
  ];

  const pillars = [
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Fast launches",
      desc: "Pre-built solutions that get you live in days, not months.",
    },
    {
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      title: "Custom development",
      desc: "Tailor-made platforms crafted around your exact vision.",
    },
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Scalable architecture",
      desc: "Systems built to grow with you — from MVP to enterprise scale.",
    },
    {
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
      title: "End-to-end team",
      desc: "Designers, developers, and strategists working as one team.",
    },
  ];

  const team = [
    {
      name: "Om Choudhary",
      role: "Lead Developer & Co-founder",
      roleTag: "Frontend · Backend",
      photo: "/om.jpg",
      photoPosition: "center 60%",
      initials: "OC",
      bio: "B.Tech student from West Bengal building pixel-perfect interfaces and scalable backends. Loves React, system design, and shipping fast.",
      skills: [
        { label: "HTML5",      color: "#e34c26" },
        { label: "CSS3",       color: "#264de4" },
        { label: "JavaScript", color: "#f7df1e" },
        { label: "TypeScript", color: "#3178c6" },
        { label: "React",      color: "#61dafb" },
        { label: "Next.js",    color: "#ffffff" },
        { label: "Tailwind",   color: "#38bdf8" },
        { label: "Node.js",    color: "#68a063" },
        { label: "MongoDB",    color: "#4db33d" },
        { label: "Gen AI",     color: "#a78bfa" },
        { label: "HuggingFace",color: "#ffd21e" },
        { label: "Python",     color: "#3776ab" },
      ],
      socials: [
        { label: "GitHub",    href: "https://github.com/",    type: "github" },
        { label: "LinkedIn",  href: "https://linkedin.com/",  type: "linkedin" },
        { label: "Twitter",   href: "https://twitter.com/",   type: "twitter" },
        { label: "Email",     href: "mailto:omchy34@gmail.com", type: "email" },
      ],
    },
    {
      name: "Jahid",
      role: "UI/UX Designer & Co-founder",
      roleTag: "Design · Branding",
      photo: "/jahid.png",
      initials: "JH",
      bio: "Creative director with a sharp eye for detail. Specialises in brand identity, product design, and turning complex ideas into clean interfaces.",
      skills: [
        { label: "Figma",      color: "#f24e1e" },
        { label: "Adobe XD",   color: "#ff61f6" },
        { label: "Illustrator",color: "#ff9a00" },
        { label: "Photoshop",  color: "#31a8ff" },
      
        { label: "React",      color: "#61dafb" },
        
        { label: "Tailwind",   color: "#38bdf8" },
        { label: "Branding",   color: "#f59e0b" },
        
      ],
      socials: [
        { label: "GitHub",    href: "https://github.com/",   type: "github" },
        { label: "LinkedIn",  href: "https://linkedin.com/", type: "linkedin" },
        { label: "Dribbble",  href: "https://dribbble.com/", type: "dribbble" },
        { label: "Instagram", href: "https://instagram.com/",type: "instagram" },
      ],
    },
  ];

  /* ── Skill SVG Icons ── */
  const SkillIcon = ({ label, color }: { label: string; color: string }) => {
    const s = { width: 12, height: 12, style: { flexShrink: 0 as const } };
    // Next.js
    if (label === "Next.js") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
      </svg>
    );
    // React
    if (label === "React") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09c.135 0 .256.03.371.09 1.055.595 1.408 2.867.834 5.623-.733-.18-1.51-.328-2.33-.436-.77-1.08-1.567-2.076-2.37-2.965 1.613-1.497 3.116-2.312 3.495-2.312zm-9.56 0c.38 0 1.88.814 3.494 2.31-.8.888-1.597 1.882-2.366 2.963-.821.108-1.6.255-2.334.434-.573-2.754-.22-5.027.836-5.622.115-.06.236-.085.37-.085zm4.78 2.56c.502.488 1.003 1.03 1.498 1.629a23.374 23.374 0 0 0-2.998 0c.495-.6.997-1.141 1.5-1.629zm0 0"/>
      </svg>
    );
    // TypeScript
    if (label === "TypeScript") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    );
    // JavaScript
    if (label === "JavaScript") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
      </svg>
    );
    // HTML5
    if (label === "HTML5") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
      </svg>
    );
    // CSS3
    if (label === "CSS3") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
      </svg>
    );
    // Tailwind
    if (label === "Tailwind") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    );
    // Node.js
    if (label === "Node.js") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.24l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.05-.139.142-.139.241v10.15c0 .097.055.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.86 1.86 0 0 1-.92-1.609V6.921c0-.662.354-1.278.92-1.609l8.795-5.082a1.924 1.924 0 0 1 1.845 0l8.794 5.082c.566.331.921.947.921 1.609v10.145c0 .661-.355 1.278-.921 1.609l-8.794 5.077a1.87 1.87 0 0 1-.922.248z"/>
      </svg>
    );
    // MongoDB
    if (label === "MongoDB") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.351-2.092-.197-2.218z"/>
      </svg>
    );
    // Python
    if (label === "Python") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
      </svg>
    );
    // Figma
    if (label === "Figma") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.354-3.019 3.019s1.354 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.026-4.49 4.515-4.49c2.489 0 4.515 2.014 4.515 4.49S10.661 24 8.172 24zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019 3.019-1.355 3.019-3.019-1.354-3.019-3.019-3.019zm7.563 7.509h-.002c-2.475 0-4.49-2.014-4.49-4.49s2.015-4.49 4.49-4.49h.002c2.475 0 4.49 2.014 4.49 4.49S18.21 24 15.735 24zm0-7.509c-1.664 0-3.018 1.355-3.018 3.019s1.354 3.019 3.018 3.019h.002c1.664 0 3.018-1.355 3.018-3.019s-1.354-3.019-3.02-3.019z"/>
      </svg>
    );
    // Adobe XD
    if (label === "Adobe XD") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144L16.596 22h-2.63zM11.27 7.796L9.214 12.5H13.63L11.27 7.796zM24 0v24H0V0h24zm-7.502 21.98l-2.97-7.5H16.6l.001-.8H13.2l-2.3-5.8L7.8 18.9 5.5 14.9 2.4 21.98h1.8l2.2-5.13 2.1 3.8h2.2l.8-2.1h3.8l.8 2.1h1.7l.7-.65z"/>
      </svg>
    );
    // Illustrator
    if (label === "Illustrator") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M10 9.4L8.3 14h3.5L10 9.4zM0 0v24h24V0H0zm21 21H3V3h18v18zM14.1 17l-1-2.9H10l-1 2.9H7l3.5-10h3l3.6 10h-2z"/>
      </svg>
    );
    // Photoshop
    if (label === "Photoshop") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M0 0v24h24V0H0zm10.5 14.5c0 .95-.19 1.64-.57 2.07-.38.43-.98.64-1.79.64h-1.3v3.04H5.5V10.05h2.64c.81 0 1.4.2 1.79.6.38.4.57 1.04.57 1.91v1.94zm7.88 2.38c.1.54.1 1.1 0 1.64h-1.77v-.89c-.13.35-.35.61-.66.8-.31.18-.65.27-1.02.27-.4 0-.74-.1-1.02-.29a2 2 0 01-.65-.79 2.5 2.5 0 01-.22-1.05c0-.42.07-.8.22-1.13.15-.33.36-.61.65-.84.29-.22.62-.4 1-.53.38-.12.81-.18 1.28-.18h.43v-.3c0-.32-.07-.56-.22-.72-.15-.16-.4-.24-.74-.24-.3 0-.6.05-.9.16-.3.1-.6.26-.9.46l-.57-1.17c.35-.23.73-.41 1.14-.53.41-.12.82-.18 1.23-.18.78 0 1.38.2 1.79.61.41.4.62 1.01.62 1.82v2.08zm-3.16 3.56v-1.55h1.5v-.03c0-.12-.02-.22-.06-.3l-.42-.4c-.08.02-.16.03-.24.03h-.36v2.25h-.42zM7.64 12.74c0-.37-.07-.64-.22-.81-.15-.17-.38-.25-.71-.25H5.84v3.87h.87c.34 0 .59-.1.74-.3.15-.2.22-.52.22-.96v-1.55z"/>
      </svg>
    );
    // Framer
    if (label === "Framer") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
      </svg>
    );
    // Gen AI
    if (label === "Gen AI") return (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
      </svg>
    );
    // HuggingFace
    if (label === "HuggingFace") return (
      <svg {...s} viewBox="0 0 24 24" fill={color}>
        <path d="M12 1C5.924 1 1 5.924 1 12s4.924 11 11 11 11-4.924 11-11S18.076 1 12 1zm0 1.5c5.247 0 9.5 4.253 9.5 9.5s-4.253 9.5-9.5 9.5S2.5 17.247 2.5 12 6.753 2.5 12 2.5zM8.5 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-7 5.5c-.3 0-.55.13-.7.35-.15.2-.15.47 0 .67.55.8 1.4 1.28 2.3 1.46.5.1 1 .1 1.5 0 .9-.18 1.75-.66 2.3-1.46.15-.2.15-.47 0-.67-.15-.22-.4-.35-.7-.35H8.5z"/>
      </svg>
    );
    // Branding
    if (label === "Branding") return (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    );
    // Motion
    if (label === "Motion") return (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3l14 9-14 9V3z"/>
      </svg>
    );
    // Default dot
    return <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />;
  };

  /* Social icon SVG paths */
  const SocialIcon = ({ type }: { type: string }) => {
    if (type === "github") return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    );
    if (type === "linkedin") return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    );
    if (type === "twitter") return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    );
    if (type === "email") return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    );
    if (type === "dribbble") return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.39 1.73 1.347 3.886 2.155 6.23 2.155 1.42 0 2.77-.29 4-.807zm-9.532-4.383c.18-.375 2.25-4.377 8.04-6.392l-.075-.17c-5.79-1.445-11.49-.705-12.102-.63.405 2.63 1.755 4.967 3.705 6.47.14.106.285.21.432.317zm10.58-8.79c-.615-1.15-1.275-2.29-1.995-3.38-1.845 0-3.615.345-5.25.975 1.365.93 2.64 2.43 3.585 4.155.315.6.63 1.23.9 1.875 1.215-.6 2.31-1.5 2.76-3.625zm-9.69-5.79c-.465.345-.87.69-1.23 1.035C6.9 3.51 8.85 2.79 11.04 2.79c-.27-.375-.54-.75-.825-1.11C8.55 1.9 7.065 2.47 6.103 3.637zm4.797-.795c.285.375.585.765.855 1.155 1.32-.33 2.655-.42 3.99-.21C14.52 2.37 12.825 1.74 11.1 1.74c-.07 0-.14 0-.2.005z"/>
      </svg>
    );
    if (type === "instagram") return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    );
    return null;
  };

  const member = team[activeTab];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .a-root {
          --bg: #0a0800;
          --bg2: #110f00;
          --bg3: #0d0b00;
          --accent: #f59e0b;
          --accent2: #d97706;
          --accent3: #fcd34d;
          --green: #22c55e;
          --text: #fefce8;
          --text2: rgba(254,252,232,0.52);
          --text3: rgba(254,252,232,0.22);
          --border: rgba(245,158,11,0.12);
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
            linear-gradient(rgba(245,158,11,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.055) 1px, transparent 1px);
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
          background: radial-gradient(circle, rgba(217,119,6,0.12) 0%, transparent 65%);
          top: -240px; left: -140px;
        }
        .a-glow-2 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%);
          bottom: -120px; right: -80px;
        }
        .a-glow-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%);
          top: 42%; right: 36%;
        }

        .a-inner {
           position: relative; z-index: 2;
  max-width: 1110px; margin: 0 auto;
  padding: 72px 5% 120px;
  width: 90%; box-sizing: border-box;

        }

        /* ── Hero ── */
        .a-hero {
          text-align: center;
          margin-bottom: 72px;
          animation: a-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        .a-badge {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(245,158,11,0.07);
          border: 1px solid rgba(245,158,11,0.18);
          border-radius: 100px;
          padding: 6px 16px 6px 11px;
          margin-bottom: 28px;
        }
        .a-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(245,158,11,0.9);
          animation: a-glow-dot 2.2s ease-in-out infinite;
        }
        @keyframes a-glow-dot {
          0%,100% { box-shadow: 0 0 5px rgba(245,158,11,0.7); }
          50% { box-shadow: 0 0 14px rgba(245,158,11,1), 0 0 24px rgba(245,158,11,0.3); }
        }
        .a-badge-txt {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.08em; color: rgba(245,158,11,0.75);
        }
        .a-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 4.5vw, 60px);
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.08;
          margin-bottom: 18px;
        }
        .a-title-dim { color: rgba(254,252,232,0.2); font-weight: 600; }
        .a-title-grad {
          background: linear-gradient(118deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .a-subtitle {
          font-family: var(--font-body); font-size: 15px;
          color: var(--text2); line-height: 1.8;
          max-width: 560px; margin: 0 auto;
        }

        /* ── Stats ── */
        .a-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px; margin-bottom: 72px;
          animation: a-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        .a-stat-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 24px 20px;
          text-align: center; position: relative; overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .a-stat-card:hover {
          border-color: rgba(245,158,11,0.35);
          transform: translateY(-3px);
        }
        .a-stat-card::before {
          content: ''; position: absolute; top: -1px; left: -1px;
          width: 36px; height: 36px;
          border-top: 1.5px solid var(--accent);
          border-left: 1.5px solid var(--accent);
          border-radius: 16px 0 0 0; opacity: 0.7;
        }
        .a-stat-val {
          font-family: var(--font-display); font-size: 34px; font-weight: 800;
          letter-spacing: -0.04em;
          background: linear-gradient(118deg, #fcd34d 0%, #f59e0b 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; margin-bottom: 5px;
        }
        .a-stat-label {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.09em; color: var(--text3);
        }

        /* ── Main 2-col ── */
        .a-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px; margin-bottom: 64px;
        }

        /* ── TABBED PROFILE CARD ── */
        .a-profile-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          animation: a-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both;
          transition: border-color 0.35s, box-shadow 0.35s;
        }
        .a-profile-card:hover {
          border-color: rgba(245,158,11,0.28);
          box-shadow: 0 0 0 1px rgba(245,158,11,0.06), 0 20px 48px rgba(0,0,0,0.4), 0 0 32px rgba(217,119,6,0.1);
        }
        .a-profile-card::before {
          content: ''; position: absolute; top: -1px; left: -1px;
          width: 48px; height: 48px;
          border-top: 1.5px solid var(--accent);
          border-left: 1.5px solid var(--accent);
          border-radius: 20px 0 0 0; opacity: 0.65; z-index: 4;
          pointer-events: none;
        }

        /* Tab bar */
        .a-tab-bar {
          display: flex;
          border-bottom: 1px solid rgba(245,158,11,0.1);
          position: relative;
          z-index: 3;
          background: rgba(10,8,0,0.6);
          backdrop-filter: blur(8px);
        }
        .a-tab-btn {
          flex: 1;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 14px 16px;
          border: none; background: none; cursor: pointer;
          position: relative;
          transition: all 0.25s;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.07em;
          color: var(--text3);
        }
        .a-tab-btn.active { color: var(--accent); }
        .a-tab-btn::after {
          content: '';
          position: absolute; bottom: -1px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent2), var(--accent3));
          border-radius: 2px 2px 0 0;
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .a-tab-btn.active::after { transform: scaleX(1); }
        .a-tab-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-size: 11px; font-weight: 700;
          letter-spacing: -0.01em;
          border: 1.5px solid rgba(245,158,11,0.2);
          background: rgba(245,158,11,0.06);
          color: rgba(245,158,11,0.5);
          overflow: hidden;
          transition: all 0.25s;
          flex-shrink: 0;
        }
        .a-tab-btn.active .a-tab-avatar {
          border-color: rgba(245,158,11,0.5);
          color: var(--accent);
          background: rgba(245,158,11,0.1);
          box-shadow: 0 0 10px rgba(245,158,11,0.2);
        }
        .a-tab-avatar img {
          width: 100%; height: 100%; object-fit: cover; object-position: top;
          display: block;
        }
        .a-tab-divider {
          width: 1px; background: rgba(245,158,11,0.1); flex-shrink: 0; margin: 8px 0;
        }

        /* Profile content */
        .a-profile-content {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .a-profile-content.exit {
          opacity: 0;
          transform: translateY(8px);
        }

        /* photo strip */
        .a-member-photo-wrap {
          height:490px;
          position: relative; overflow: hidden;
          background: var(--bg3);
          border-bottom: 1px solid var(--border);
        }
        .a-member-photo-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 20%;
          display: block;
        }
        .a-member-photo-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(245,158,11,0.08), rgba(217,119,6,0.04));
        }
        .a-member-initials {
          font-family: var(--font-display);
          font-size: 56px; font-weight: 800;
          letter-spacing: -0.04em;
          background: linear-gradient(118deg, #fcd34d, #f59e0b);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; opacity: 0.35;
        }
        .a-member-photo-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(to top, var(--bg2), transparent);
        }
        .a-role-pill {
          position: absolute; top: 12px; right: 12px;
          font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.09em;
          padding: 4px 10px; border-radius: 100px;
          background: rgba(10,8,0,0.82);
          border: 1px solid rgba(245,158,11,0.22);
          color: rgba(245,158,11,0.75);
          backdrop-filter: blur(8px);
          z-index: 3;
        }

        /* card body */
        .a-member-body { padding: 20px 22px 22px; }
        .a-member-name {
          font-family: var(--font-display);
          font-size: 19px; font-weight: 700; letter-spacing: -0.025em;
          color: var(--text); margin-bottom: 3px;
        }
        .a-member-role {
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.09em;
          color: rgba(245,158,11,0.6); margin-bottom: 12px;
        }
        .a-member-bio {
          font-family: var(--font-body); font-size: 12.5px;
          color: var(--text2); line-height: 1.75; margin-bottom: 16px;
        }

        /* skill tags */
        .a-skills-label {
          font-family: var(--font-mono); font-size: 8px;
          letter-spacing: 0.1em; color: var(--text3);
          margin-bottom: 8px;
        }
        .a-skills {
          display: flex; flex-wrap: wrap; gap: 5px;
          margin-bottom: 18px;
        }
        .a-skill-tag {
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.05em;
          padding: 4px 9px; border-radius: 100px;
          border: 1px solid rgba(245,158,11,0.16);
          background: rgba(245,158,11,0.05);
          color: rgba(254,252,232,0.5);
          display: flex; align-items: center; gap: 5px;
          transition: all 0.22s;
          cursor: default;
        }
        .a-skill-tag:hover {
          border-color: rgba(245,158,11,0.3);
          background: rgba(245,158,11,0.09);
          color: rgba(254,252,232,0.75);
          transform: translateY(-1px);
        }

        /* divider */
        .a-member-divider {
          height: 1px; background: rgba(255,255,255,0.05);
          margin-bottom: 14px;
        }

        /* socials */
        .a-socials { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .a-social-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 8px;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.06em;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          color: rgba(254,252,232,0.35);
          text-decoration: none;
          transition: all 0.25s;
        }
        .a-social-btn:hover {
          border-color: rgba(245,158,11,0.3);
          color: #f59e0b;
          background: rgba(245,158,11,0.06);
          transform: translateY(-1px);
        }

        /* ── Pillars right col ── */
        .a-pillars {
          display: flex; flex-direction: column; gap: 13px;
          animation: a-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }
        .a-pillar {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 15px;
          padding: 20px 20px 20px 18px;
          display: flex; align-items: flex-start; gap: 14px;
          position: relative; overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .a-pillar:hover {
          border-color: rgba(245,158,11,0.3);
          transform: translateX(4px);
        }
        .a-pillar::before {
          content: ''; position: absolute; left: 0; top: 50%;
          transform: translateY(-50%);
          width: 2.5px; height: 0;
          background: linear-gradient(180deg, var(--accent2), var(--accent));
          border-radius: 0 2px 2px 0;
          transition: height 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .a-pillar:hover::before { height: 60%; }
        .a-pillar-icon {
          width: 38px; height: 38px; flex-shrink: 0;
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.16);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
        }
        .a-pillar-title {
          font-family: var(--font-display); font-size: 14px; font-weight: 700;
          color: var(--text); letter-spacing: -0.01em; margin-bottom: 4px;
        }
        .a-pillar-desc {
          font-family: var(--font-body); font-size: 12px;
          color: var(--text3); line-height: 1.72;
        }

        /* ── Mission bar ── */
        .a-mission {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px; padding: 36px 44px;
          display: flex; align-items: center; gap: 36px;
          position: relative; overflow: hidden;
          animation: a-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both;
        }
        .a-mission::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 100% at 0% 50%, rgba(217,119,6,0.06), transparent);
          pointer-events: none;
        }
        .a-mission-icon-wrap {
          flex-shrink: 0; width: 58px; height: 58px;
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.2);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
        }
        .a-mission-label {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.1em; color: var(--text3); margin-bottom: 8px;
        }
        .a-mission-quote {
          font-family: var(--font-display);
          font-size: clamp(16px, 2vw, 21px);
          font-weight: 700; letter-spacing: -0.02em;
          color: var(--text); line-height: 1.35;
        }
        .a-mission-quote span {
          background: linear-gradient(118deg, #fcd34d 0%, #f59e0b 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── CTA ── */
        .a-cta-row {
          display: flex; justify-content: center; gap: 12px;
          margin-top: 48px;
          animation: a-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both;
          flex-wrap: wrap;
        }
        .a-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 26px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border-radius: 10px; color: #0a0800; border: none; cursor: pointer;
          font-family: var(--font-body); font-size: 14px; font-weight: 700;
          letter-spacing: -0.01em;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 28px rgba(217,119,6,0.38), 0 4px 16px rgba(0,0,0,0.25),
                      inset 0 1px 0 rgba(255,255,255,0.22);
          text-decoration: none;
        }
        .a-btn-primary:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 0 48px rgba(245,158,11,0.55), 0 8px 24px rgba(0,0,0,0.35),
                      inset 0 1px 0 rgba(255,255,255,0.25);
        }
        .a-btn-primary svg { transition: transform 0.25s; }
        .a-btn-primary:hover svg { transform: translateX(3px); }

        .a-btn-ghost {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 26px;
          background: rgba(245,158,11,0.03);
          border: 1px solid rgba(245,158,11,0.14);
          border-radius: 10px; color: var(--text2); cursor: pointer;
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          transition: all 0.25s; text-decoration: none;
        }
        .a-btn-ghost:hover {
          border-color: rgba(245,158,11,0.35);
          color: var(--accent3);
          background: rgba(245,158,11,0.07);
        }

        .a-divider-line {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,158,11,0.13), transparent);
        }

        @keyframes a-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 960px) {
          .a-stats { grid-template-columns: repeat(2, 1fr); }
          .a-main-grid { grid-template-columns: 1fr; }
          .a-inner { padding: 44px 24px 80px; }
          .a-mission { flex-direction: column; gap: 20px; padding: 28px 22px; }
        }
        @media (max-width: 520px) {
          .a-stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="a-divider-line" />

      <section className="a-root a-wrap" ref={sectionRef}>
        <div className="a-bg-grid" />
        <div className="a-bg-noise" />

        <div className="a-glow a-glow-1" style={{ transform: `translate(${tx * -0.7}px, ${ty * -0.7}px)` }} />
        <div className="a-glow a-glow-2" style={{ transform: `translate(${tx * 0.5}px, ${ty * 0.5}px)` }} />
        <div className="a-glow a-glow-3" style={{ transform: `translate(${tx * 0.3}px, ${ty * 0.3}px)` }} />

        <div className="a-inner">

          {/* Hero */}
          <div className="a-hero">
            <div className="a-badge">
              <span className="a-badge-dot" />
              <span className="a-badge-txt">// The people behind binaryGroww</span>
            </div>
            <h1 className="a-title">
              <span className="a-title-dim">Built by people who</span>
              <br />
              <span className="a-title-grad">care about craft</span>
            </h1>
            <p className="a-subtitle">
              We are creators, engineers, and strategists — united by one mission: make technology simple, scalable, and impactful for every business we touch.
            </p>
          </div>

          {/* Stats */}
          <div className="a-stats">
            {stats.map((s, i) => (
              <div className="a-stat-card" key={i}>
                <div className="a-stat-val">{s.value}</div>
                <div className="a-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="a-main-grid">

            {/* Left: Tabbed profile card */}
            <div className="a-profile-card">

              {/* Tab bar */}
              <div className="a-tab-bar">
                {team.map((m, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div className="a-tab-divider" />}
                    <button
                      className={`a-tab-btn${activeTab === i ? " active" : ""}`}
                      onClick={() => handleTabChange(i)}
                    >
                      <div className="a-tab-avatar">
                        {m.photo
                          ? <img src={m.photo} alt={m.name} />
                          : m.initials
                        }
                      </div>
                      {m.name.split(" ")[0]}
                      {activeTab === i && (
                        <svg width="6" height="6" viewBox="0 0 6 6" style={{ marginLeft: 2 }}>
                          <circle cx="3" cy="3" r="3" fill="var(--accent)" />
                        </svg>
                      )}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              {/* Animated content */}
              <div className={`a-profile-content${isAnimating ? " exit" : ""}`}>
                {/* Photo */}
                <div className="a-member-photo-wrap">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} style={{ objectPosition: member.photoPosition || "center 20%" }} />
                  ) : (
                    <div className="a-member-photo-placeholder">
                      <span className="a-member-initials">{member.initials}</span>
                    </div>
                  )}
                  <div className="a-member-photo-overlay" />
                  <div className="a-role-pill">{member.roleTag}</div>
                </div>

                {/* Body */}
                <div className="a-member-body">
                  <div className="a-member-name">{member.name}</div>
                  <div className="a-member-role">// {member.role}</div>
                  <p className="a-member-bio">{member.bio}</p>

                  <div className="a-skills-label">SKILLS & TOOLS</div>
                  <div className="a-skills">
                    {member.skills.map((sk) => (
                      <span className="a-skill-tag" key={sk.label}>
                        <SkillIcon label={sk.label} color={sk.color} />
                        {sk.label}
                      </span>
                    ))}
                  </div>

                  <div className="a-member-divider" />

                  <div className="a-socials">
                    {member.socials.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="a-social-btn">
                        <SocialIcon type={s.type} />
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Pillars */}
            <div className="a-pillars">
              {pillars.map((p, i) => (
                <div className="a-pillar" key={i}>
                  <div className="a-pillar-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={p.icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="a-pillar-title">{p.title}</div>
                    <div className="a-pillar-desc">{p.desc}</div>
                  </div>
                </div>
              ))}

              {/* Story blurb */}
              <div style={{
                background: "var(--bg2)", border: "1px solid var(--border)",
                borderRadius: 16, padding: "22px 20px", marginTop: 4,
              }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.1em", color: "var(--text3)", marginBottom: 10 }}>// OUR STORY</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 10 }}>From Durgapur to the world</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
                  binaryGroww started as a small collective of passionate developers in Durgapur, West Bengal. We grew from building simple websites for local businesses into a full-stack digital agency shipping products for clients across India and beyond. Every project gets our complete focus and craftsmanship.
                </p>
              </div>
            </div>
          </div>

          {/* Mission bar */}
          <div className="a-mission">
            <div className="a-mission-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div>
              <div className="a-mission-label">// OUR MISSION</div>
              <div className="a-mission-quote">
                To make technology <span>simple, scalable, and impactful</span> —<br />
                so every business can thrive in the digital world.
              </div>
            </div>
          </div>

          {/* CTA */}
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

      <div className="a-divider-line" />
    </>
  );
}
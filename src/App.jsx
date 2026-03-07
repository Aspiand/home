import { useState, useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Muhammad Aspian",
  role: "Backend Developer",
  tagline: "Building things for the web — clean, fast, and purposeful.",
  socials: [
    { label: "GitHub", url: "https://github.com/Aspiand", icon: "GH" },
    { label: "Facebook", url: "https://facebook.com/aspiand", icon: "FB" },
    // { label: "LinkedIn", url: "https://linkedin.com/in/username", icon: "LI" },
    // { label: "Email", url: "mailto:d@aspian.my.id", icon: "@" },
  ],
  about:
    "A hectic developer.",
  experience: [
    {
      company: "PT. Inovasi Informatik Sinergi",
      role: "Intern",
      period: "June 2025 — Now",
      desc: "",
    },
  ],
  projects: [
    // {
    //   name: "Project Alpha",
    //   tech: ["Next.js", "Supabase", "TailwindCSS"],
    //   desc: "Platform manajemen task real-time dengan fitur kolaborasi tim.",
    //   link: "#",
    // },
  ],
};

// ─── Black Hole Canvas ────────────────────────────────────────────────────────
function BlackHole() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 320;
    for (let i = 0; i < N; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 320;
      particles.push({
        angle,
        dist,
        speed: (0.002 + Math.random() * 0.004) * (Math.random() < 0.5 ? 1 : -1),
        size: 0.4 + Math.random() * 1.4,
        opacity: 0.15 + Math.random() * 0.7,
        hue: 190 + Math.random() * 80,
        drift: (Math.random() - 0.5) * 0.0008,
      });
    }

    const draw = () => {
      time += 0.008;
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.42;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep glow beneath black hole
      const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 420);
      outerGlow.addColorStop(0, "rgba(80,160,255,0.06)");
      outerGlow.addColorStop(0.4, "rgba(120,60,255,0.04)");
      outerGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Accretion disk ring glow
      const ringGlow = ctx.createRadialGradient(cx, cy, 55, cx, cy, 130);
      ringGlow.addColorStop(0, "rgba(120,200,255,0.0)");
      ringGlow.addColorStop(0.5, "rgba(100,180,255,0.12)");
      ringGlow.addColorStop(0.8, "rgba(80,120,255,0.07)");
      ringGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = ringGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 130, 0, Math.PI * 2);
      ctx.fill();

      // Particles
      particles.forEach((p) => {
        p.angle += p.speed + p.drift;
        const pull = 1 - Math.max(0, (p.dist - 80) / 340) * 0.0012;
        p.dist *= pull;
        if (p.dist < 52) {
          p.dist = 100 + Math.random() * 260;
          p.angle = Math.random() * Math.PI * 2;
        }

        const wobble = Math.sin(p.angle * 3 + time) * 6;
        const x = cx + Math.cos(p.angle) * (p.dist + wobble);
        const y = cy + Math.sin(p.angle) * (p.dist + wobble) * 0.36;

        const proximity = Math.max(0, 1 - p.dist / 200);
        const alpha = p.opacity * (0.5 + proximity * 0.5);
        const lightness = 60 + proximity * 35;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, ${lightness}%, ${alpha})`;
        ctx.fill();
      });

      // Event horizon — solid black core
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 58);
      core.addColorStop(0, "rgba(0,0,0,1)");
      core.addColorStop(0.78, "rgba(0,0,0,1)");
      core.addColorStop(0.9, "rgba(0,0,0,0.85)");
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 58, 0, Math.PI * 2);
      ctx.fill();

      // Inner photon ring
      ctx.beginPath();
      ctx.ellipse(cx, cy, 72, 26, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(210,90%,75%,0.18)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.9,
      }}
    />
  );
}

// ─── Glass Card ───────────────────────────────────────────────────────────────
function GlassCard({ children, style = {}, className = "" }) {
  return (
    <div
      className={className}
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRadius: "16px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  const links = ["about", "experience", "projects", "contact"];
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 32px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "13px",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.08em",
        }}
      >
        {DATA.name.toLowerCase().replace(" ", ".")}
      </span>
      <div style={{ display: "flex", gap: "8px" }}>
        {links.map((l) => (
          <button
            key={l}
            onClick={() => setActive(l)}
            style={{
              background: active === l ? "rgba(120,180,255,0.12)" : "transparent",
              border: active === l ? "1px solid rgba(120,180,255,0.3)" : "1px solid transparent",
              color: active === l ? "rgba(180,220,255,0.95)" : "rgba(255,255,255,0.4)",
              padding: "5px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "12px",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.06em",
              transition: "all 0.2s",
            }}
          >
            {l}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ setActive }) {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "80px",
        overflow: "hidden",
      }}
    >
      <BlackHole />

      {/* Vignette bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "220px",
          background: "linear-gradient(to bottom, transparent, #000)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.25em",
            color: "rgba(120,180,255,0.7)",
            marginBottom: "14px",
            textTransform: "uppercase",
          }}
        >
          {DATA.role}
        </p>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(42px, 7vw, 88px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
          }}
        >
          {DATA.name}
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            color: "rgba(255,255,255,0.38)",
            maxWidth: "400px",
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          {DATA.tagline}
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={() => setActive("projects")}
            style={{
              background: "rgba(120,180,255,0.15)",
              border: "1px solid rgba(120,180,255,0.35)",
              color: "rgba(180,220,255,0.9)",
              padding: "10px 24px",
              borderRadius: "10px",
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.06em",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "rgba(120,180,255,0.25)")}
            onMouseLeave={(e) => (e.target.style.background = "rgba(120,180,255,0.15)")}
          >
            view projects →
          </button>
          <button
            onClick={() => setActive("about")}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.4)",
              padding: "10px 24px",
              borderRadius: "10px",
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.06em",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.4)")}
          >
            about me
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const skills = ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Docker", "Git", "REST API", "GraphQL", "TailwindCSS"];
  return (
    <section style={{ padding: "80px 0" }}>
      <SectionLabel>about</SectionLabel>
      <GlassCard style={{ padding: "40px", maxWidth: "680px" }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.85,
            marginBottom: "32px",
          }}
        >
          {DATA.about}
        </p>
        <div>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "rgba(120,180,255,0.6)",
              marginBottom: "14px",
              textTransform: "uppercase",
            }}
          >
            tech stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {skills.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.55)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  letterSpacing: "0.04em",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section style={{ padding: "80px 0" }}>
      <SectionLabel>experience</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "680px" }}>
        {DATA.experience.map((exp, i) => (
          <GlassCard
            key={i}
            style={{ padding: "28px 32px", transition: "border-color 0.2s" }}
            className="exp-card"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "8px",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.9)",
                    marginBottom: "2px",
                  }}
                >
                  {exp.role}
                </p>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    color: "rgba(120,180,255,0.7)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {exp.company}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}
              >
                {exp.period}
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
                marginTop: "10px",
              }}
            >
              {exp.desc}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section style={{ padding: "80px 0" }}>
      <SectionLabel>projects</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "14px",
          maxWidth: "720px",
        }}
      >
        {DATA.projects.map((p, i) => (
          <GlassCard
            key={i}
            style={{
              padding: "26px",
              cursor: "pointer",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(120,180,255,0.25)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                {p.name}
              </p>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "14px" }}>↗</span>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.65,
                marginBottom: "16px",
              }}
            >
              {p.desc}
            </p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {p.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    color: "rgba(120,180,255,0.65)",
                    background: "rgba(120,180,255,0.06)",
                    border: "1px solid rgba(120,180,255,0.12)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "28px",
      }}
    >
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(120,180,255,0.5)",
        }}
      >
        {children}
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "rgba(255,255,255,0.06)",
          maxWidth: "400px",
        }}
      />
    </div>
  );
}

// ─── Social Icon Button ───────────────────────────────────────────────────────
function SocialBtn({ label, url, icon }) {
  const iconMap = {
    GH: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    FB: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    LI: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    "@": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  };

  return (
    <a
      href={url}
      target={url.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      title={label}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.45)",
        textDecoration: "none",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(120,180,255,0.12)";
        e.currentTarget.style.borderColor = "rgba(120,180,255,0.3)";
        e.currentTarget.style.color = "rgba(180,220,255,0.9)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.color = "rgba(255,255,255,0.45)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {iconMap[icon]}
    </a>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function Contact() {
  return (
    <section style={{ padding: "80px 0" }}>
      <SectionLabel>contact</SectionLabel>
      <GlassCard style={{ padding: "40px", maxWidth: "680px" }}>
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "28px",
            fontWeight: 800,
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.2,
            marginBottom: "12px",
          }}
        >
          Let's work together.
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            color: "rgba(255,255,255,0.38)",
            lineHeight: 1.7,
            marginBottom: "32px",
            maxWidth: "420px",
          }}
        >
          Terbuka untuk kolaborasi, freelance, atau sekadar ngobrol soal tech. Reach out lewat platform berikut.
        </p>

        {/* Social grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {DATA.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target={s.url.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 18px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(120,180,255,0.07)";
                e.currentTarget.style.borderColor = "rgba(120,180,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              {/* Icon box */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(120,180,255,0.08)",
                  border: "1px solid rgba(120,180,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(120,180,255,0.8)",
                  flexShrink: 0,
                }}
              >
                {/* Inline SVG per platform */}
                {s.icon === "GH" && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>}
                {s.icon === "FB" && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>}
                {s.icon === "LI" && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>}
                {s.icon === "@" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: "2px" }}>
                  {s.label}
                </p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.03em" }}>
                  {s.url.replace("https://", "").replace("mailto:", "")}
                </p>
              </div>

              <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "14px" }}>↗</span>
            </a>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "28px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.05em",
        }}
      >
        © 2025 {DATA.name}
      </span>
      <div style={{ display: "flex", gap: "8px" }}>
        {DATA.socials.map((s) => (
          <SocialBtn key={s.label} {...s} />
        ))}
      </div>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState(null);

  const sectionMap = {
    about: <About />,
    experience: <Experience />,
    projects: <Projects />,
    contact: <Contact />,
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&family=Inter:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #000; color: #fff; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: rgba(120,180,255,0.2); border-radius: 2px; }
      `}</style>

      <Nav active={active} setActive={setActive} />
      <Hero setActive={setActive} />

      {active && (
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 24px 80px",
            animation: "fadeIn 0.35s ease",
          }}
        >
          <style>{`
            @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
          `}</style>
          {sectionMap[active]}
          <Footer />
        </div>
      )}

      {!active && (
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 24px 80px",
          }}
        >
          <Footer />
        </div>
      )}
    </>
  );
}
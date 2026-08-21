import React, { useEffect, useRef, useState } from "react";

/* ---------------- design tokens ---------------- */
const C = {
  paper: "#EDEEE3",
  paper2: "#E3E4D6",
  ink: "#17180F",
  ink2: "#20221A",
  ribbon: "#C1442B",
  signal: "#3F7D5C",
  amber: "#B9862E",
  muted: "#83836C",
  mutedLt: "#9A9A83",
  line: "#C9C8B4",
  lineInk: "#3B3D2F",
};

/* ---------------- global styles ---------------- */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700;800&display=swap');
      *{box-sizing:border-box;}
      .pf-root{
        background:${C.paper}; color:${C.ink}; font-family:'Inter',sans-serif;
        background-image:radial-gradient(circle, rgba(23,24,15,0.08) 1px, transparent 1px);
        background-size:14px 14px; overflow-x:hidden;
      }
      .mono{font-family:'Space Mono',monospace;}
      .reveal{opacity:0; transform:translateY(18px); transition:opacity .6s ease, transform .6s ease;}
      .reveal.in{opacity:1; transform:translateY(0);}
      @keyframes pulse{0%,100%{opacity:1;} 50%{opacity:.35;}}
      @keyframes spin{to{transform:rotate(360deg);}}
    `}</style>
  );
}

/* ---------------- wired (draw-in) icon ---------------- */
/* Single-stroke icons that draw themselves in, homage to Lordicon's "Wired" family,
   hand-built here as plain SVG + stroke-dashoffset since no Lottie is available. */
function WiredIcon({ d, size = 30, color = C.ribbon, active, viewBox = "0 0 24 24" }) {
  const pathRef = useRef(null);
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, [d]);

  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none">
      <path
        ref={pathRef}
        d={d}
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: len,
          strokeDashoffset: active ? 0 : len,
          transition: "stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </svg>
  );
}

const ICONS = {
  bolt: "M13 2 L4 14 H11 L10 22 L20 9 H13 L13 2 Z",
  layers: "M12 3 L21 8 L12 13 L3 8 Z M3 13 L12 18 L21 13 M3 17.5 L12 22 L21 17.5",
  terminal: "M3 5 H21 V19 H3 Z M6 9 L10 12 L6 15 M12 16 H17",
  send: "M21 3 L11 13 M21 3 L14.5 21 L11 13 L3 9.5 Z",
  eye: "M2.5 12 C5.5 6.5 18.5 6.5 21.5 12 C18.5 17.5 5.5 17.5 2.5 12 Z M12 9 A3 3 0 1 1 12 15 A3 3 0 0 1 12 9 Z",
};

/* ---------------- social badge (wired ring + initials) ---------------- */
function SocialBadge({ label, title, href, size = 42 }) {
  const pathRef = useRef(null);
  const [len, setLen] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="mono"
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        letterSpacing: 1,
        color: "inherit",
        flexShrink: 0,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 44 44" style={{ position: "absolute", inset: 0 }}>
        <path
          ref={pathRef}
          d="M22 3 A19 19 0 1 1 21.999 3 Z"
          fill="none"
          stroke={C.ribbon}
          strokeWidth="1.4"
          strokeLinecap="round"
          style={{
            strokeDasharray: len,
            strokeDashoffset: hover ? 0 : len * 0.16,
            transition: "stroke-dashoffset .8s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </svg>
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </a>
  );
}

function VisitorCounter() {
  const [isLocal, setIsLocal] = useState(true);

  useEffect(() => {
    setIsLocal(["localhost", "127.0.0.1", ""].includes(window.location.hostname));
  }, []);

  const counterUrl =
    "https://hits.sh/zerrad0z.github.io/portfolio.svg?view=today-total&style=flat-square&label=VISITS&color=C1442B&labelColor=17180F";

  return (
    <a
      href="https://hits.sh/zerrad0z.github.io/portfolio/"
      target="_blank"
      rel="noreferrer"
      title="Portfolio visitor counter"
      className="mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        minHeight: 28,
        padding: "4px 8px",
        color: C.paper,
        border: `1px solid ${C.lineInk}`,
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      <WiredIcon d={ICONS.eye} active size={18} color={C.ribbon} />
      {isLocal ? (
        <span style={{ fontSize: 10, letterSpacing: 1 }}>VISITS LOCAL</span>
      ) : (
        <img
          src={counterUrl}
          alt="Portfolio visitor count"
          loading="lazy"
          style={{ display: "block", height: 20, maxWidth: 150 }}
        />
      )}
    </a>
  );
}

/* ---------------- scroll reveal wrapper ---------------- */
function Reveal({ children, delay = 0, as: Tag = "div", style }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? " in" : ""}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

/* ---------------- count-up stat ---------------- */
function CountUp({ target, suffix = "", duration = 1200 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStarted(true)),
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return (
    <span ref={ref} className="mono" style={{ fontWeight: 700 }}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------------- ambient grain field (hero background) ---------------- */
function GrainField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, w, h;
    const dots = [];
    const N = 90;

    function resize() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }
    resize();
    for (let i = 0; i < N; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        vy: Math.random() * 0.12 + 0.03,
        o: Math.random() * 0.3 + 0.08,
      });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.y -= d.vy;
        if (d.y < 0) d.y = h;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(193,68,43,${d.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

/* ---------------- dot-matrix console (canvas text -> dot grid) ---------------- */
function DotMatrixConsole() {
  const COLS = 46,
    ROWS = 11;
  const gridRef = useRef(null);
  const dotsRef = useRef([]);
  const phrases = [
    "OPEN TO WORK",
    "SPRING BOOT",
    "JAVA 21",
    "JWT AUTH",
    "REACT + NG",
    "REMOTE READY",
    "KENITRA MA",
  ];

  useEffect(() => {
    const grid = gridRef.current;
    grid.innerHTML = "";
    dotsRef.current = [];
    for (let i = 0; i < COLS * ROWS; i++) {
      const d = document.createElement("div");
      d.style.width = "100%";
      d.style.height = "100%";
      d.style.borderRadius = "50%";
      d.style.background = C.ribbon;
      d.style.opacity = 0.08;
      d.style.transition = "opacity .08s";
      grid.appendChild(d);
      dotsRef.current.push(d);
    }

    function sample(text) {
      const scale = 8;
      const canvas = document.createElement("canvas");
      canvas.width = COLS * scale;
      canvas.height = ROWS * scale;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let fontSize = ROWS * scale * 0.85;
      ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
      while (ctx.measureText(text).width > canvas.width * 0.95 && fontSize > 4) {
        fontSize -= 1;
        ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
      }
      ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 1);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const out = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const px = Math.min(canvas.width - 1, Math.floor(c * scale + scale / 2));
          const py = Math.min(canvas.height - 1, Math.floor(r * scale + scale / 2));
          out.push(data[(py * canvas.width + px) * 4] > 120);
        }
      }
      return out;
    }

    function render(text) {
      sample(text).forEach((on, i) => {
        dotsRef.current[i].style.opacity = on ? 1 : 0.08;
        dotsRef.current[i].style.boxShadow = on ? `0 0 4px rgba(193,68,43,.7)` : "none";
      });
    }

    let idx = 0;
    render(phrases[0]);
    const id = setInterval(() => {
      idx = (idx + 1) % phrases.length;
      render(phrases[idx]);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ background: C.ink, border: `1px solid ${C.lineInk}`, padding: "20px 22px 16px" }}>
      <div
        className="mono"
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 10,
          color: C.mutedLt,
          letterSpacing: 1,
          marginBottom: 12,
          paddingBottom: 10,
          borderBottom: `1px dashed ${C.lineInk}`,
        }}
      >
        <span>DOT_MATRIX_DISPLAY.EXE — STATUS OUTPUT</span>
        <div style={{ display: "flex", gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.lineInk }} />
          ))}
        </div>
      </div>
      <div
        ref={gridRef}
        style={{ display: "grid", gridTemplateColumns: `repeat(${COLS},1fr)`, gridTemplateRows: `repeat(${ROWS},1fr)`, gap: 2, width: "100%", aspectRatio: `${COLS} / ${ROWS}` }}
      />
    </div>
  );
}

/* ---------------- reusable bits ---------------- */
function SectionHead({ num, title }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 32 }}>
      <span className="mono" style={{ fontSize: 12, color: C.ribbon }}>{num}</span>
      <span className="mono" style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase" }}>{title}</span>
      <span style={{ flex: 1, height: 1, background: C.line }} />
    </div>
  );
}

function LogEntry({ date, role, org, bullets, tech, last }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 24, paddingBottom: last ? 0 : 36, position: "relative" }}>
      <div className="mono" style={{ fontSize: 11, color: C.ribbon, paddingTop: 2 }}>{date}</div>
      <div style={{ position: "relative" }}>
        {!last && (
          <div style={{ position: "absolute", left: -24, top: 6, bottom: -30, width: 1, backgroundImage: `linear-gradient(to bottom, ${C.line} 50%, transparent 0%)`, backgroundSize: "1px 6px", backgroundRepeat: "repeat-y" }} />
        )}
        <div style={{ position: "absolute", left: -27, top: 3, width: 7, height: 7, borderRadius: "50%", background: C.ink, border: `2px solid ${C.ribbon}` }} />
        <div className="mono" style={{ fontWeight: 700, fontSize: 15, textTransform: "uppercase" }}>{role}</div>
        <div style={{ color: C.muted, fontSize: 13, margin: "2px 0 10px" }}>{org}</div>
        <ul style={{ listStyle: "none", fontSize: 14, lineHeight: 1.65, color: "#2b2c20", padding: 0 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ paddingLeft: 16, position: "relative", marginBottom: 4 }}>
              <span style={{ position: "absolute", left: 0, color: C.ribbon }}>—</span>{b}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
          {tech.map((t) => (
            <span key={t} className="mono" style={{ fontSize: 10, padding: "3px 8px", border: `1px solid ${C.line}`, color: C.muted }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SysCard({ name, sub, status, statusColor, desc, tags }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: C.ink, color: C.paper, padding: 22, border: `1px solid ${hover ? C.ribbon : C.lineInk}`,
        display: "flex", flexDirection: "column", gap: 12, transition: "transform .15s, border-color .15s",
        transform: hover ? "translateY(-3px)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="mono" style={{ fontWeight: 700, fontSize: 15 }}>{name}</div>
          <div style={{ fontSize: 11, color: C.mutedLt, marginTop: 3 }}>{sub}</div>
        </div>
        <div className="mono" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, letterSpacing: 1, whiteSpace: "nowrap" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor, boxShadow: statusColor !== C.mutedLt ? `0 0 6px ${statusColor}` : "none", animation: statusColor === C.signal ? "pulse 1.8s ease-in-out infinite" : "none" }} />
          {status}
        </div>
      </div>
      <div style={{ fontSize: 13, color: "#cfd0c4", lineHeight: 1.6 }}>{desc}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map((t) => (
          <span key={t} className="mono" style={{ fontSize: 9, color: C.mutedLt, border: `1px solid ${C.lineInk}`, padding: "2px 7px" }}>{t}</span>
        ))}
      </div>
      <a href="https://github.com/Zerrad0z" target="_blank" rel="noreferrer" className="mono" style={{ fontSize: 10, marginTop: "auto", paddingTop: 8, color: C.ribbon, letterSpacing: 0.5 }}>→ SOURCE</a>
    </div>
  );
}

/* ---------------- main ---------------- */
export default function Portfolio() {
  return (
    <div className="pf-root">
      <GlobalStyle />

      {/* topbar */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: C.ink, color: C.paper, borderBottom: `2px solid ${C.ribbon}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="mono" style={{ fontWeight: 700, fontSize: 14 }}>ZERRAD<span style={{ color: C.ribbon }}>_</span>OUSSAMA<span style={{ color: C.ribbon }}>.</span>SYS</div>
          <nav className="mono" style={{ display: "flex", gap: 24, fontSize: 11, letterSpacing: 1 }}>
            {["ABOUT", "LOG", "SYSTEMS", "CONTACT"].map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} style={{ opacity: 0.75, color: C.paper }}>{n}</a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div className="mono" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 10 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.signal, boxShadow: `0 0 6px ${C.signal}`, animation: "pulse 1.8s ease-in-out infinite" }} />
              OPEN_TO_WORK
            </div>
            <VisitorCounter />
            <div style={{ display: "flex", gap: 2 }}>
              <SocialBadge label="GH" title="GitHub" href="https://github.com/Zerrad0z" size={36} />
              <SocialBadge label="IN" title="LinkedIn" href="https://linkedin.com/in/oussama-zerrad/" size={36} />
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        {/* hero */}
        <section style={{ position: "relative", padding: "76px 0 40px", overflow: "hidden" }}>
          <GrainField />
          <svg style={{ position: "absolute", top: -60, right: -60, width: 420, height: 420, opacity: 0.14, zIndex: 0 }} viewBox="0 0 400 400">
            <path fill={C.ribbon} d="M141,-159.4C182,-138.9,213.9,-98.6,224.8,-53.7C235.7,-8.9,225.6,40.5,203.6,82.5C181.7,124.6,147.8,159.3,106.5,178.3C65.1,197.3,16.2,200.6,-29.7,193C-75.6,185.4,-118.5,166.9,-152.1,136.4C-185.7,105.9,-210,63.4,-216.4,17.7C-222.9,-28,-211.5,-77,-184.4,-113.1C-157.3,-149.2,-114.5,-172.5,-71.4,-190.3C-28.3,-208.1,15.1,-220.5,58,-211.6C100.9,-202.6,142.2,-172.4,141,-159.4Z" transform="translate(200 200)" />
          </svg>
          <div style={{ position: "relative", zIndex: 1 }}>
            <Reveal>
              <div className="mono" style={{ fontSize: 11, letterSpacing: 2, color: C.ribbon, display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span style={{ width: 22, height: 1, background: C.ribbon }} />FULL-STACK DEVELOPER · KÉNITRA, MOROCCO
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mono" style={{ fontWeight: 700, fontSize: "clamp(38px,8vw,78px)", lineHeight: 0.98, letterSpacing: -1, textTransform: "uppercase" }}>
                Zerrad<br />Oussama
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p style={{ fontSize: "clamp(15px,2.4vw,19px)", color: C.muted, maxWidth: 560, marginTop: 18, lineHeight: 1.55 }}>
                I build API platforms, auth systems, and OCR/AI pipelines with Spring Boot and React/Angular — mostly for logistics and enterprise systems that actually ship. Currently freelancing for ONCF, open to remote roles.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap", alignItems: "center" }}>
                <a href="mailto:zedussama@gmail.com" className="mono" style={{ fontSize: 12, padding: "12px 20px", background: C.ink, color: C.paper, border: `1.5px solid ${C.ink}` }}>→ EMAIL ME</a>
                <a href="https://linkedin.com/in/oussama-zerrad/" target="_blank" rel="noreferrer" className="mono" style={{ fontSize: 12, padding: "12px 20px", border: `1.5px solid ${C.ink}` }}>CONNECT ON LINKEDIN</a>
                <div style={{ display: "flex", gap: 4, marginLeft: 4 }}>
                  <SocialBadge label="GH" title="GitHub" href="https://github.com/Zerrad0z" size={40} />
                  <SocialBadge label="IN" title="LinkedIn" href="https://linkedin.com/in/oussama-zerrad/" size={40} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div style={{ marginTop: 48 }}>
                <DotMatrixConsole />
              </div>
            </Reveal>
          </div>
        </section>

        {/* capabilities strip — wired icons + count-up */}
        <Reveal>
          <section style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: C.line, border: `1px solid ${C.line}`, margin: "8px 0 24px" }}>
            {[
              { icon: ICONS.bolt, val: 4, suf: "+", label: "SYSTEMS SHIPPED" },
              { icon: ICONS.layers, val: 15, suf: "", label: "SPRINT ROADMAP" },
              { icon: ICONS.terminal, val: 3, suf: "", label: "LANGUAGES SPOKEN" },
              { icon: ICONS.send, val: 1, suf: "", label: "OPEN ROLE" },
            ].map((s, i) => (
              <StatCell key={i} {...s} />
            ))}
          </section>
        </Reveal>

        {/* about / spec sheet */}
        <section id="about" style={{ padding: "64px 0" }}>
          <Reveal><SectionHead num="01" title="Spec Sheet" /></Reveal>
          {[
            ["ROLE", "FULL-STACK DEVELOPER"],
            ["BASED IN", "KÉNITRA, MOROCCO"],
            ["STACK", "JAVA · SPRING BOOT · REACT · ANGULAR"],
            ["DATABASES", "POSTGRESQL · ORACLE · MONGODB"],
            ["EDUCATION", "M.ENG SOFTWARE ENGINEERING — ENSA KÉNITRA"],
            ["LANGUAGES", "EN (PRO) · FR (FLUENT) · AR (NATIVE)"],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={i * 40}>
              <div className="mono" style={{ display: "flex", alignItems: "baseline", gap: 10, fontSize: 13, padding: "9px 0", borderBottom: `1px dotted ${C.line}` }}>
                <span style={{ color: C.muted, letterSpacing: 1, flexShrink: 0 }}>{k}</span>
                <span style={{ flex: 1, overflow: "hidden", whiteSpace: "nowrap", color: C.line, letterSpacing: 2 }}>{"".padEnd(60, ".")}</span>
                <span style={{ fontWeight: 700, textAlign: "right", flexShrink: 0 }}>{v}</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={240}>
            <div className="mono" style={{ display: "flex", alignItems: "baseline", gap: 10, fontSize: 13, padding: "9px 0", borderBottom: `1px dotted ${C.line}` }}>
              <span style={{ color: C.muted, letterSpacing: 1, flexShrink: 0 }}>STATUS</span>
              <span style={{ flex: 1, overflow: "hidden", whiteSpace: "nowrap", color: C.line, letterSpacing: 2 }}>{"".padEnd(60, ".")}</span>
              <span style={{ fontWeight: 700, textAlign: "right", flexShrink: 0, color: C.signal }}>OPEN — REMOTE &amp; MOROCCO</span>
            </div>
          </Reveal>
        </section>

        {/* experience log */}
        <section id="log" style={{ padding: "64px 0" }}>
          <Reveal><SectionHead num="02" title="Experience Log" /></Reveal>
          <Reveal><LogEntry date={"JUN 2025\n— JUL 2026"} role="Freelance Full-Stack Developer" org="ONCF — National Railway Office (Kénitra)"
            bullets={["Modular backend with multi-role access (Supervisor/Manager/Admin), secured with JWT", "Automated OCR + AI validation pipeline for field forms, async processing via RabbitMQ", "Filterable PDF/Excel reporting and full REST API documentation"]}
            tech={["Java 21", "Spring Boot", "React", "PostgreSQL", "RabbitMQ", "Tesseract OCR", "Groq API", "Docker"]} /></Reveal>
          <Reveal><LogEntry date={"NOV 2024\n— MAY 2025"} role="Freelance — IT Ticketing System" org="CNC Workshop Support Tool"
            bullets={["RESTful API with Swagger/OpenAPI docs, JavaFX desktop interface", "Role-based system for Employees/IT Support with full audit trail", "Unit tested with JUnit & Mockito, containerized with Docker"]}
            tech={["Java 17", "Spring Boot", "Oracle SQL", "JavaFX", "Docker"]} /></Reveal>
          <Reveal><LogEntry date={"FEB 2024\n— SEP 2024"} role="Final Year Internship" org="ONCF Rabat — API Integration Platform"
            bullets={["Centralized platform for ERP information-systems integration (Spring Boot + Angular)", "Multi-level auth & authorization with Spring Security/JWT, API cataloging & usage tracking"]}
            tech={["Java 17", "Spring Boot", "Angular 17", "Oracle", "JWT"]} /></Reveal>
          <Reveal><LogEntry date={"JAN 2021\n— MAR 2021"} role="Software Developer" org="3M Precision, Rabat — Legacy/Modern Bridge"
            bullets={["COBOL program on AS400/DB2 for inventory validation and reporting", "REST API in Spring Boot exposing inventory data, integrated via DB2 JDBC"]}
            tech={["COBOL", "AS400", "DB2", "Spring Boot", "JDBC"]} last /></Reveal>
        </section>

        {/* systems */}
        <section id="systems" style={{ padding: "64px 0" }}>
          <Reveal><SectionHead num="03" title="Systems" /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            <Reveal><SysCard name="TrackFlow" sub="ONCF Kénitra · field-form digitization" status="LIVE" statusColor={C.signal} desc="OCR + AI validation platform for digitizing field forms, with intelligent correction suggestions and real-time notifications." tags={["Spring Boot", "React", "RabbitMQ", "Groq API"]} /></Reveal>
            <Reveal delay={60}><SysCard name="ApiHub" sub="internal API access management" status="SPRINT 1/15" statusColor={C.amber} desc="Portfolio-grade platform for managing internal API access — permissions, request auditing, key lifecycle. Full 15-sprint roadmap, built in the open." tags={["Spring Boot", "Angular", "Docker Compose", "CI/CD"]} /></Reveal>
            <Reveal delay={120}><SysCard name="MockForge" sub="spec-driven API mock server" status="PLANNING" statusColor={C.mutedLt} desc="Self-hosted mock server: point it at an OpenAPI spec, get a live mock API with a dashboard for response overrides, latency & failure simulation." tags={["Spring Boot", "React", "SSE", "DataFaker"]} /></Reveal>
            <Reveal delay={180}><SysCard name="Ticket.sys" sub="IT support ticketing tool" status="SHIPPED" statusColor={C.signal} desc="Ticket management app for a CNC workshop's IT support: creation, status tracking, full audit system, role-based access." tags={["Spring Boot", "JavaFX", "Oracle SQL"]} /></Reveal>
          </div>
        </section>

        {/* skills */}
        <section style={{ padding: "64px 0" }}>
          <Reveal><SectionHead num="04" title="Modules Installed" /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 1, background: C.line, border: `1px solid ${C.line}` }}>
            {[
              ["LANGUAGES", "Java, JavaScript, TypeScript, SQL, PL/SQL, COBOL, C"],
              ["FRAMEWORKS", "Spring Boot, React, Angular, JavaFX"],
              ["DATABASES", "PostgreSQL, Oracle, MySQL, MongoDB, SQL Server"],
              ["TOOLS", "Docker, Git, Jenkins, SonarQube, Postman, Maven"],
              ["METHOD", "Agile/Scrum, UML, Merise"],
            ].map(([h, p], i) => (
              <Reveal key={h} delay={i * 40}>
                <div style={{ background: C.paper, padding: "16px 14px", height: "100%" }}>
                  <h4 className="mono" style={{ fontSize: 10, letterSpacing: 1.5, color: C.ribbon, marginBottom: 10 }}>{h}</h4>
                  <p style={{ fontSize: 12.5, lineHeight: 1.8, color: "#33342a", margin: 0 }}>{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      {/* contact ticket */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px 60px" }} id="contact">
        <Reveal>
          <div style={{ background: C.ink, color: C.paper, position: "relative", padding: "38px 32px 30px" }}>
            <div style={{ position: "absolute", top: -1, left: 0, right: 0, height: 14, backgroundImage: `radial-gradient(circle, ${C.paper} 4px, transparent 4.5px)`, backgroundSize: "22px 14px", backgroundPosition: "11px -7px", backgroundRepeat: "repeat-x" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 30, alignItems: "start" }}>
              <div>
                <div className="mono" style={{ fontSize: 24, fontWeight: 700, textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
                  <WiredIcon d={ICONS.send} active size={26} />
                  Let's talk
                </div>
                <div style={{ fontSize: 14, color: "#c8c9bc", lineHeight: 1.6, maxWidth: 420 }}>
                  Open to full-stack roles — remote or on-site. Happy to walk through TrackFlow, ApiHub, or anything on the CV.
                </div>
                <div className="mono" style={{ fontSize: 10, color: C.mutedLt, marginTop: 18, letterSpacing: 0.5 }}>TICKET NO. 001 · STATUS: OPEN · ISSUED KÉNITRA, MA</div>
              </div>
              <div className="mono" style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 13, borderLeft: `1px dashed ${C.lineInk}`, paddingLeft: 24 }}>
                <a href="mailto:zedussama@gmail.com" style={{ display: "flex", justifyContent: "space-between", color: C.paper }}><span>zedussama@gmail.com</span><span style={{ color: C.mutedLt, fontSize: 10 }}>MAIL</span></a>
                <a href="tel:+212691668393" style={{ display: "flex", justifyContent: "space-between", color: C.paper }}><span>+212 6 91 66 83 93</span><span style={{ color: C.mutedLt, fontSize: 10 }}>CALL</span></a>
                <a href="https://github.com/Zerrad0z" target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "space-between", color: C.paper }}><span>github.com/Zerrad0z</span><span style={{ color: C.mutedLt, fontSize: 10 }}>CODE</span></a>
                <a href="https://linkedin.com/in/oussama-zerrad/" target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "space-between", color: C.paper }}><span>in/oussama-zerrad</span><span style={{ color: C.mutedLt, fontSize: 10 }}>LINK</span></a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function StatCell({ icon, val, suf, label }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setInView(true)), { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: C.paper, padding: "22px 18px", display: "flex", alignItems: "center", gap: 14 }}
    >
      <WiredIcon d={icon} active={inView || hover} size={28} />
      <div>
        <div style={{ fontSize: 20 }}><CountUp target={val} suffix={suf} /></div>
        <div className="mono" style={{ fontSize: 9, letterSpacing: 1, color: C.muted, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

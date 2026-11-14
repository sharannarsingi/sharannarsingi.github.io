
import { useEffect, useState, useRef } from "react";
import {
  ArrowDown, ArrowUpRight, Mail, Download,
  Code2, Database, ShieldCheck, Boxes, Terminal, Trophy,
  Menu, X, ExternalLink, Zap
} from "lucide-react";

const navItems = [
  ["HOME", "home"], ["ABOUT", "about"], ["SKILLS", "skills"],
  ["PROJECTS", "projects"], ["RESUME", "resume"], ["CONTACT", "contact"]
];

const skills = [
  { name: "Java", type: "CORE SYSTEM", detail: "OOP, Collections, Exception Handling, Multithreading", icon: Code2 },
  { name: "Spring Boot", type: "BACKEND ENGINE", detail: "REST APIs, Spring MVC, Data JPA, Spring Security", icon: ShieldCheck },
  { name: "SQL", type: "DATA ENGINE", detail: "Joins, subqueries, transactions, indexing and database design", icon: Database },
  { name: "Hibernate", type: "PERSISTENCE", detail: "ORM, entity relationships and repository patterns", icon: Boxes },
  { name: "PostgreSQL", type: "DATABASE", detail: "Relational data modelling and query development", icon: Database },
  { name: "Docker + Git", type: "DEPLOYMENT TOOLS", detail: "Container basics, version control and collaboration", icon: Terminal }
];

const projects = [
  {
    id: "01",
    name: "OPSFLOW",
    subtitle: "INCIDENT MANAGEMENT SYSTEM",
    description: "A backend platform for managing incidents, assigning teams, tracking status and enforcing priority-based SLA deadlines.",
    stack: ["Java", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "Docker"],
    status: "FEATURED PROJECT",
    icon: ShieldCheck,
    githubUrl: ""
  },
  {
    id: "02",
    name: "E-COMMERCE ENGINE",
    subtitle: "PRODUCT MANAGEMENT API",
    description: "A Spring Boot REST API for product operations, search, persistence and image upload, backed by PostgreSQL and JPA.",
    stack: ["Java", "Spring Boot", "REST API", "Spring Data JPA", "PostgreSQL"],
    status: "PROJECT",
    icon: Database,
    githubUrl: ""
  },
  {
    id: "03",
    name: "CIVICPATH",
    subtitle: "CIVIC SERVICES PLATFORM",
    description: "A work-in-progress project focused on making civic-service workflows easier to access and manage.",
    stack: ["Java", "Spring Boot", "REST API"],
    status: "IN DEVELOPMENT",
    icon: Zap,
    githubUrl: ""
  }
];

function SectionTag({ number, children }) {
  return (
    <div className="section-tag">
      <span>{number}</span>
      <i />
      {children}
    </div>
  );
}

// Character direction follows the staircase path.

function getPlayerDirection(progress) {
  const path = [
    { p: 0, x: 92, y: 31 },
    { p: 7, x: 82, y: 28 },
    { p: 12, x: 77, y: 29 },
    { p: 17, x: 72, y: 28 },
    { p: 22, x: 66, y: 33 },
    { p: 27, x: 61, y: 38 },
    { p: 32, x: 58, y: 43 },
    { p: 37, x: 63, y: 42 },
    { p: 42, x: 69, y: 47 },
    { p: 47, x: 75, y: 52 },
    { p: 52, x: 81, y: 57 },
    { p: 57, x: 76, y: 61 },
    { p: 62, x: 70, y: 65 },
    { p: 67, x: 64, y: 70 },
    { p: 72, x: 58, y: 75 },
    { p: 77, x: 63, y: 86 },
    { p: 82, x: 69, y: 90 },
    { p: 87, x: 75, y: 94 },
    { p: 92, x: 81, y: 96 },
    { p: 96, x: 87, y: 95 },
    { p: 100, x: 93, y: 89 }
  ];

  const value = Math.max(0, Math.min(100, progress));
  let index = 0;

  while (index < path.length - 2 && value > path[index + 1].p) {
    index++;
  }

  return path[index + 1].x < path[index].x ? "left" : "right";
}

function getPlayerPosition(progress) {
  const path = [
    { p: 0, x: 92, y: 18 },
    { p: 7, x: 82, y: 20 },
    { p: 12, x: 77, y: 23 },
    { p: 17, x: 72, y: 28 },
    { p: 22, x: 66, y: 33 },
    { p: 27, x: 61, y: 38 },
    { p: 32, x: 58, y: 43 },
    { p: 37, x: 63, y: 42 },
    { p: 42, x: 69, y: 47 },
    { p: 47, x: 75, y: 52 },
    { p: 52, x: 81, y: 57 },
    { p: 57, x: 76, y: 61 },
    { p: 62, x: 70, y: 65 },
    { p: 67, x: 64, y: 70 },
    { p: 72, x: 58, y: 75 },
    { p: 77, x: 63, y: 86 },
    { p: 82, x: 69, y: 90 },
    { p: 87, x: 75, y: 94 },
    { p: 92, x: 81, y: 96 },
    { p: 96, x: 87, y: 95 },
    { p: 100, x: 93, y: 89 }
  ];

  const value = Math.max(0, Math.min(100, progress));
  let index = 0;

  while (index < path.length - 2 && value > path[index + 1].p) {
    index++;
  }

  const a = path[index];
  const b = path[index + 1];
  const amount = (value - a.p) / (b.p - a.p);

  return {
    x: a.x + (b.x - a.x) * amount,
    y: a.y + (b.y - a.y) * amount
  };
}

function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Tracks the staircase artwork so the separate character
  // stays aligned with its original position.
  const gameArtRef = useRef(null);
  const [artRect, setArtRect] = useState(null);

  const playerPosition = getPlayerPosition(progress);
  const playerDirection = getPlayerDirection(progress);
  const isEntering = progress >= 98;

  // Update the character overlay position when the artwork moves or resizes.
  useEffect(() => {
    const gameArt = gameArtRef.current;

    if (!gameArt) return;

    const updateArtPosition = () => {
      const rect = gameArt.getBoundingClientRect();

      setArtRect({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      });
    };

    updateArtPosition();

    window.addEventListener("resize", updateArtPosition);
    window.addEventListener("scroll", updateArtPosition, { passive: true });

    const resizeObserver = new ResizeObserver(updateArtPosition);
    resizeObserver.observe(gameArt);

    return () => {
      window.removeEventListener("resize", updateArtPosition);
      window.removeEventListener("scroll", updateArtPosition);
      resizeObserver.disconnect();
    };
  }, []);

  // Scroll progress and active navigation tracking.
  useEffect(() => {
    let previousScrollY = window.scrollY;
    let scrollStopTimer;
    let frame = null;

    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        const currentProgress = maxScroll > 0
          ? Math.min(100, Math.max(0, (currentScrollY / maxScroll) * 100))
          : 0;

        setProgress(currentProgress);

        if (currentScrollY > previousScrollY) {
          setScrollDirection("down");
        } else if (currentScrollY < previousScrollY) {
          setScrollDirection("up");
        }

        previousScrollY = currentScrollY;

        setIsScrolling(true);
        window.clearTimeout(scrollStopTimer);

        scrollStopTimer = window.setTimeout(
          () => setIsScrolling(false),
          170
        );

        const sections = navItems
          .map(([, id]) => document.getElementById(id))
          .filter(Boolean);

        let current = "home";

        sections.forEach(section => {
          if (
            section.getBoundingClientRect().top <= window.innerHeight * 0.42
          ) {
            current = section.id;
          }
        });

        setActive(current);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollStopTimer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    setMenuOpen(false);
  };

  return (
    <div
      className="app-shell"
      style={{
        "--journey-progress": `${progress}%`,
        "--player-x": `${playerPosition.x}%`,
        "--player-y": `${playerPosition.y}%`
      }}
    >
      <div className="scanlines" />

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* NAVBAR */}

      <header className="topbar">
        <button
          className="brand"
          onClick={() => goTo("home")}
          aria-label="Go home"
        >
          <span>
            SHARAN <span className="brand-muted">NARSINGI</span>
          </span>
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {navItems.map(([label, id]) => (
            <button
              key={id}
              className={active === id ? "nav-link active" : "nav-link"}
              onClick={() => goTo(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="topbar-right">
          <span className="online-dot" />
          <span className="status-text">OPEN TO OPPORTUNITIES</span>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* STAIRCASE BACKGROUND LAYER */}

      <aside
        className={`game-world ${isScrolling ? "is-moving" : "is-idle"} direction-${scrollDirection} facing-${playerDirection} ${isEntering ? "is-entering" : ""}`}
        aria-label="Pixel character travelling along a staircase"
      >
        <div className="game-art" ref={gameArtRef}>
          <img
            className="stairwell-image"
            src="/stairwell.png"
            alt=""
          />

          <div className="world-image-tint" />

          <div className="stairwell-quote" aria-label="A life quote">
            <span>𝑷𝒓𝒆𝒅𝒊𝒄𝒕𝒊𝒏𝒈 𝒕𝒉𝒆 𝒇𝒖𝒕𝒖𝒓𝒆</span>
            <span>𝒊𝒔𝒏'𝒕 𝒎𝒂𝒈𝒊𝒄,</span>
            <span>𝒊𝒕'𝒔 A𝒓𝒕𝒊𝒇𝒊𝒄𝒊𝒂𝒍 I𝒏𝒕𝒆𝒍𝒍𝒊𝒈𝒆𝒏𝒄𝒆.</span>
          </div>

          <div className="stairwell-door" aria-hidden="true" />
        </div>
      </aside>

      {/* CHARACTER LAYER - SEPARATE FROM STAIRCASE */}

      {artRect && (
        <div
          className={`player-overlay ${isScrolling ? "is-moving" : "is-idle"} direction-${scrollDirection} facing-${playerDirection} ${isEntering ? "is-entering" : ""}`}
          style={{
            left: `${artRect.left}px`,
            top: `${artRect.top}px`,
            width: `${artRect.width}px`,
            height: `${artRect.height}px`
          }}
          aria-hidden="true"
        >
          <div className="pixel-player">
            <span className="player-shadow" />
            <span className="player-sprite" />
          </div>
        </div>
      )}

      <main>
        {/* HOME */}

        <section id="home" className="hero game-section">
          <div className="hero-grid" />

          <div className="hero-copy">
            <div className="eyebrow">
              <span className="pulse-dot" />
              JAVA BACKEND DEVELOPER
              <span className="eyebrow-line" />
              HYDERABAD, INDIA
            </div>

            <h1>
              Building the future,
              <br />
              <span className="outline-text">brick by brick</span>
              <span className="accent">.</span>
            </h1>

            <p className="hero-lead">
              I'm <strong>Sharan</strong> — I build backend systems, solve
              problems, and turn ideas into working software.
            </p>

            <div className="hero-actions">
              <button className="primary-btn" onClick={() => goTo("about")}>
                START EXPLORING <ArrowDown size={16} />
              </button>

              <button className="text-btn" onClick={() => goTo("projects")}>
                VIEW PROJECTS <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="hero-meta">
              <span>ROLE <b>JAVA BACKEND DEVELOPER</b></span>
              <span>LOCATION <b>HYDERABAD, IN</b></span>
            </div>
          </div>

          <div className="scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-line"><i /></div>
          </div>
        </section>

        {/* ABOUT */}

        <section id="about" className="content-section about-section">
          <div className="section-inner">
            <SectionTag number="01">ABOUT</SectionTag>

            <div className="split-heading">
              <h2>ABOUT <span className="muted-heading">ME.</span></h2>

              <div className="about-note">
                <span>MY APPROACH</span>
                <p>
                  I value clear thinking, practical solutions and software
                  that works reliably.
                </p>
              </div>
            </div>

            <div className="about-profile-row">
              <p className="body-copy">
                I'm a Computer Science graduate specializing in Machine Learning, with a focus on Java and backend development. My technical expertise includes Core Java, Object-Oriented Programming, Data Structures, SQL, MySQL, PostgreSQL, Spring Boot, Spring MVC, Hibernate, Spring Data JPA, Spring Security, and REST API development. I have a keen interest in software engineering, backend architecture, and building efficient, maintainable applications. I value clean code, logical problem-solving, and a strong understanding of core programming concepts while continuously exploring new technologies and refining my technical skills.
              </p>
            </div>

            <div className="stat-grid">
              <div className="stat-card">
                <span>01</span>
                <b>BACKEND</b>
                <small>PRIMARY FOCUS</small>
              </div>

              <div className="stat-card">
                <span>03</span>
                <b>PROJECTS</b>
                <small>BUILT / BUILDING</small>
              </div>

              <div className="stat-card">
                <Trophy size={20} />
                <b>1ST PLACE</b>
                <small>DSA CODING CONTEST</small>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}

        <section id="skills" className="content-section skills-section">
          <div className="section-inner">
            <SectionTag number="02">TECHNICAL SKILLS</SectionTag>

            <div className="section-heading-row">
              <h2>SKILLS<span className="accent">.</span></h2>
              <p>
                TECHNOLOGIES AND TOOLS
                <br />
                I WORK WITH.
              </p>
            </div>

            <div className="skill-grid">
              {skills.map((skill, i) => {
                const Icon = skill.icon;

                return (
                  <article className="skill-card" key={skill.name}>
                    <div className="skill-card-top">
                      <span>0{i + 1}</span>
                      <Icon size={21} />
                    </div>

                    <h3>{skill.name}</h3>
                    <span className="skill-type">{skill.type}</span>
                    <p>{skill.detail}</p>

                    <div className="skill-card-bottom">
                      <span>WORKING KNOWLEDGE</span>
                      <span className="tiny-bars">
                        <i /><i /><i /><i /><i />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="skill-footnote">
              <span className="accent">+</span> Continuously improving
              through practice and project work.
            </p>
          </div>
        </section>

        {/* PROJECTS */}

        <section id="projects" className="content-section projects-section">
          <div className="section-inner">
            <SectionTag number="03">SELECTED PROJECTS</SectionTag>

            <div className="section-heading-row">
              <h2>PROJECTS<span className="accent">.</span></h2>
              <p>
                BACKEND SYSTEMS.
                <br />
                PRACTICAL SOLUTIONS.
              </p>
            </div>

            <div className="mission-list">
              {projects.map(project => {
                const Icon = project.icon;

                return (
                  <button
                    className="mission-card"
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                  >
                    <span className="mission-number">{project.id}</span>

                    <span className="mission-icon">
                      <Icon size={24} />
                    </span>

                    <span className="mission-main">
                      <small>{project.subtitle}</small>
                      <strong>{project.name}</strong>
                      <span className="mission-stack">
                        {project.stack.slice(0, 4).join(" / ")}
                      </span>
                    </span>

                    <span className="mission-status">{project.status}</span>

                    <span className="mission-arrow">
                      <ArrowUpRight size={22} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* RESUME */}

        <section id="resume" className="content-section resume-section">
          <div className="section-inner resume-inner">
            <SectionTag number="04">RESUME</SectionTag>

            <div className="resume-panel">
              <div className="resume-copy">
                <span className="resume-kicker">
                  CURRICULUM VITAE // PDF
                </span>

                <h2>
                  MY
                  <br />
                  RESUME.
                </h2>

                <p>
                  Take a closer look at my education, technical skills,
                  projects and achievements.
                </p>

                <a
                  className="primary-btn link-btn"
                  href="/resume.pdf"
                  download="Sharan_Bhushan_Narsingi_Resume.pdf"
                  type="application/pdf"
                >
                  <Download size={17} />
                  DOWNLOAD RESUME
                </a>

                <small className="resume-note">
                  Download my resume in PDF format.
                </small>
              </div>

              <div className="resume-visual">
                <div className="file-card">
                  <div className="file-top">
                    <span>SH</span>
                    <span>PROFILE</span>
                  </div>

                  <div className="file-avatar">
                    S<span>_</span>
                  </div>

                  <div className="file-lines">
                    <i /><i /><i /><i />
                  </div>

                  <div className="file-bottom">
                    SHARAN BHUSHAN <b>2026</b>
                  </div>
                </div>

                <div className="file-orbit orbit-a" />
                <div className="file-orbit orbit-b" />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}

        <section id="contact" className="contact-section">
          <div className="contact-grid" />

          <div className="contact-content">
            <SectionTag number="05">CONTACT</SectionTag>

            <div className="portal">
              <div className="portal-ring ring-one" />
              <div className="portal-ring ring-two" />
              <div className="portal-core">
                <Mail size={30} />
              </div>
            </div>

            <span className="contact-kicker">GET IN TOUCH</span>

            <h2>
              LET'S BUILD
              <br />
              <span className="outline-text">SOMETHING.</span>
            </h2>

            <p>
              Have an opportunity, an interesting problem, or just want
              to talk tech? My inbox is open.
            </p>

            <a
              className="primary-btn link-btn"
              href="mailto:sharanbhushannarsingi@gmail.com"
            >
              <Mail size={17} />
              SAY HELLO
              <ArrowUpRight size={16} />
            </a>

            <div className="social-links">
              <a
                href="https://github.com/sharannarsingi"
                target="_blank"
                rel="noreferrer"
              >
                <Code2 size={17} />
                GitHub
                <ExternalLink size={13} />
              </a>

              <a
                href="https://www.linkedin.com/in/sharannarsingi"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={17} />
                LINKEDIN
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          <footer>
            <span>© 2026 SHARAN BHUSHAN NARSINGI</span>
            <span>JAVA BACKEND DEVELOPER</span>

            <button onClick={() => goTo("home")}>
              <ArrowUpRight size={15} />
              BACK TO TOP
            </button>
          </footer>
        </section>
      </main>

      {/* PROJECT MODAL */}

      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <span className="modal-kicker">
              PROJECT {selectedProject.id}
            </span>

            <h2>{selectedProject.name}</h2>

            <p>{selectedProject.description}</p>

            <h4>TECHNOLOGIES USED</h4>

            <div className="modal-tags">
              {selectedProject.stack.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            {selectedProject.githubUrl ? (
              <a
                className="primary-btn link-btn"
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Code2 size={17} />
                VIEW SOURCE
                <ArrowUpRight size={16} />
              </a>
            ) : (
              <p className="modal-note">
                Source code link will be added soon.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

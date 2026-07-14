import LightRays from "@/components/LightRays";
import StarParticles from "@/components/StarParticles";
import SplitText from "@/components/SplitText";
import SectionReveal from "@/components/SectionReveal";
import BenefitsCarousel from "@/components/BenefitsCarousel";
import SpotlightCard from "@/components/SpotlightCard";

const Chevron = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
    <path d="m3.5 6 4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
    <path d="M5 12h13M14 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MenuIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
    <path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
    <circle cx="32" cy="32" r="25" fill="white" />
    <path d="m27 21 17 11-17 11V21Z" fill="#8d8d8d" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LearnerIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <circle cx="12" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M6.5 19a5.5 5.5 0 0 1 11 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

type IconName = "brain" | "chat" | "target" | "group" | "cap" | "chart" | "star";

const FeatureIcon = ({ name }: { name: IconName }) => {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" {...common}>
      {name === "brain" && <><path d="M9.5 5.2A3 3 0 0 0 4.8 8a3.1 3.1 0 0 0-1 5.9A3.3 3.3 0 0 0 8 18.8c.5 1.2 1.3 1.7 2.5 1.7V3.8c-.4-.8-1.8-1-2.7-.3" /><path d="M14.5 5.2A3 3 0 0 1 19.2 8a3.1 3.1 0 0 1 1 5.9 3.3 3.3 0 0 1-4.2 4.9c-.5 1.2-1.3 1.7-2.5 1.7V3.8c.4-.8 1.8-1 2.7-.3M7 10h3.5M13.5 14H17" /></>}
      {name === "chat" && <><path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /><path d="M7.5 9h.1M11.8 9h.1M16.1 9h.1" /></>}
      {name === "target" && <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><path d="m12 12 7-7M16 5h3v3" /></>}
      {name === "group" && <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M3.5 19v-2a4.5 4.5 0 0 1 9 0v2M13.8 14.2A3.7 3.7 0 0 1 20.5 17v2" /></>}
      {name === "cap" && <><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M7 12v4c2.8 2.3 7.2 2.3 10 0v-4M21 9v6" /></>}
      {name === "chart" && <><path d="M4 20V9M10 20V5M16 20v-8M22 20V3" /><path d="m4 12 6-4 6 1 6-5" /></>}
      {name === "star" && <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />}
    </svg>
  );
};

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-atmosphere" aria-hidden="true" />
        <LightRays
          raysOrigin="top-center"
          raysColor="#69a9ff"
          raysSpeed={0.75}
          lightSpread={0.72}
          rayLength={1.35}
          pulsating
          fadeDistance={1.15}
          saturation={0.9}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.04}
          distortion={0.035}
          className="hero-light-rays"
        />
        <StarParticles />

        <header className="navbar">
          <a className="brand" href="#" aria-label="Bridgeway home">
            Bridgeway<span className="brand-arc" />
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#courses">English Courses <Chevron /></a>
            <a href="#why-us">Why us?</a>
            <a href="#resources">Resources <Chevron /></a>
            <a href="#level">Test your level</a>
          </nav>

          <div className="account-links">
            <a href="#login">Login</a>
            <span className="account-divider" />
            <button type="button" aria-label="Change language">EN <Chevron /></button>
          </div>

          <button className="menu-button" type="button" aria-label="Open menu">
            <MenuIcon />
          </button>
        </header>

        <div className="hero-copy">
          <p className="eyebrow">ENGLISH THAT TAKES YOU FURTHER</p>
          <h1 aria-label="Your way to learn English online">
            <span className="headline-row">
              <SplitText
                text="Your way to learn"
                tag="span"
                className="headline-line headline-line-primary"
                delay={38}
                duration={1.05}
                ease="power4.out"
                from={{ opacity: 0, y: 68, rotateX: -72 }}
                to={{ opacity: 1, y: 0, rotateX: 0 }}
                rootMargin="0px"
              />
            </span>
            <span className="headline-row">
              <SplitText
                text="English online"
                tag="span"
                className="headline-line headline-line-gradient"
                delay={42}
                duration={1.1}
                ease="power4.out"
                from={{ opacity: 0, y: 72, rotateX: -72 }}
                to={{ opacity: 1, y: 0, rotateX: 0 }}
                rootMargin="0px"
              />
            </span>
          </h1>
          <p className="subtitle">
            For learners and families who are done with random lessons,<br className="desktop-break" />
            weak apps, and progress that never fully adds up.
          </p>
          <div className="actions">
            <a className="button button-primary" href="#courses">Get Started</a>
            <a className="button button-secondary" href="#level">Test your level</a>
          </div>
        </div>

        <div className="curve" aria-hidden="true" />
        <a className="scroll-button" href="#courses" aria-label="Scroll to courses">
          <svg viewBox="0 0 34 50" width="34" height="50" aria-hidden="true">
            <path d="M17 1v42M5 32l12 12 12-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      <section className="after-hero" id="courses">
        <SectionReveal>
        <div className="stuck-layout">
          <div className="stuck-copy">
            <p className="section-kicker">Why people stay stuck</p>
            <h2>Effort isn&apos;t<br />your problem.<br /><span>Your method is.</span></h2>
            <p className="section-intro">
              Most people aren&apos;t unmotivated, they&apos;re just<br className="desktop-break" />
              stuck in a system that keeps falling apart.
            </p>
            <a className="fix-button" href="#level">
              Fix my weak spots <ArrowRight />
            </a>

            <div className="challenge-cards">
              <article className="challenge-card">
                <span className="round-icon"><FeatureIcon name="brain" /></span>
                <div><h3>Still learning</h3><p>Know the basics,<br />but not confident.</p></div>
              </article>
              <article className="challenge-card">
                <span className="round-icon"><FeatureIcon name="chat" /></span>
                <div><h3>Ready to speak</h3><p>Understand more,<br />but struggle to talk.</p></div>
              </article>
              <article className="challenge-card">
                <span className="round-icon"><FeatureIcon name="target" /></span>
                <div><h3>Need structure</h3><p>No clear plan or<br />consistent method.</p></div>
              </article>
            </div>
          </div>

          <div className="stuck-media">
            <div className="image-placeholder main-placeholder" role="img" aria-label="Image placeholder" />
            <aside className="system-note">
              <svg viewBox="0 0 64 64" width="58" height="58" aria-hidden="true">
                <path d="M11 31c5-16 29-20 39-8 8 10-8 29-23 27C9 48 9 19 28 14c18-5 31 18 20 31-9 11-33 6-36-9-3-13 12-24 24-16 13 8 6 29-9 31" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <p>You&apos;re not lazy.<br />You&apos;re missing<br />the right system.</p>
              <span />
            </aside>
          </div>
        </div>

        <div className="children-panel">
          <div className="children-content">
            <p className="section-kicker">For children</p>
            <h2>Young learners need<br /><span>patience and play.</span></h2>
            <p className="children-intro">
              Our kids program builds confidence through conversation, not memorisation.
              Small groups, qualified teachers, real progression tracked in CEFR levels.
            </p>

            <BenefitsCarousel>
              <article><span className="round-icon"><FeatureIcon name="group" /></span><h3>Small groups</h3><p>More attention,<br />better progress</p></article>
              <article><span className="round-icon"><FeatureIcon name="cap" /></span><h3>Qualified teachers</h3><p>Experienced,<br />child-focused</p></article>
              <article><span className="round-icon"><FeatureIcon name="chart" /></span><h3>Progress tracked</h3><p>Measured with<br />CEFR levels</p></article>
              <article><span className="round-icon"><FeatureIcon name="star" /></span><h3>Learn through fun</h3><p>Games, topics,<br />and real talk</p></article>
            </BenefitsCarousel>

            <a className="kids-link" href="#kids">Explore kids program <ArrowRight /></a>
          </div>

          <div className="image-placeholder kids-placeholder" role="img" aria-label="Children's program image placeholder" />
        </div>

        <section className="paths-section" id="programs">
          <div className="paths-heading">
            <div>
              <p className="paths-kicker">Choose your path</p>
              <h2>Different learners need<br /><span>Different structures</span></h2>
            </div>
            <p className="paths-heading-copy">
              Bridgeway keeps the standards high and adjusts the path to the learner,
              not the other way around.
            </p>
          </div>

          <div className="course-grid">
            <article className="course-card">
              <div className="course-media-placeholder" role="img" aria-label="Kids English course video placeholder">
                <span className="play-badge"><PlayIcon /></span>
              </div>
              <div className="course-card-content">
                <p className="course-age"><ClockIcon /> Ages 6–12</p>
                <h3>Kids English courses</h3>
                <p className="course-description">For children who need confidence, consistency, and strong foundations from the start.</p>
                <div className="course-audience"><strong>Kids</strong><div className="learner-icons" aria-hidden="true">{[0, 1, 2, 3].map((item) => <span key={item}><LearnerIcon /></span>)}</div></div>
                <a href="#kids">Explore <ArrowRight /></a>
              </div>
            </article>

            <article className="course-card">
              <div className="course-media-placeholder" role="img" aria-label="Teens English course video placeholder">
                <span className="play-badge"><PlayIcon /></span>
              </div>
              <div className="course-card-content">
                <p className="course-age"><ClockIcon /> Ages 13–17</p>
                <h3>Teens English courses</h3>
                <p className="course-description">For teenagers who need better speaking, more confidence, and a clearer path forward.</p>
                <div className="course-audience"><strong>Teens</strong><div className="learner-icons" aria-hidden="true">{[0, 1, 2, 3].map((item) => <span key={item}><LearnerIcon /></span>)}</div></div>
                <a href="#teens">Explore <ArrowRight /></a>
              </div>
            </article>

            <article className="course-card">
              <div className="course-media-placeholder" role="img" aria-label="Adults English course video placeholder">
                <span className="play-badge"><PlayIcon /></span>
              </div>
              <div className="course-card-content">
                <p className="course-age"><ClockIcon /> Ages 18+</p>
                <h3>Adults English courses</h3>
                <p className="course-description">For adults who want better speaking, clearer levels, and less wasted time.</p>
                <div className="course-audience"><strong>Adults</strong><div className="learner-icons" aria-hidden="true">{[0, 1, 2, 3].map((item) => <span key={item}><LearnerIcon /></span>)}</div></div>
                <a href="#adults">Explore <ArrowRight /></a>
              </div>
            </article>
          </div>
        </section>

        <section className="works-section" id="how-it-works">
          <div className="works-heading">
            <p>How Bridgeway works</p>
            <h2>Clear from the<br /><span>First step</span></h2>
          </div>

          <div className="works-timeline">
            <div className="works-line-track" aria-hidden="true">
              <span className="works-line-fill" />
            </div>

            <SpotlightCard className="process-card process-card-dark" spotlightColor="rgba(105, 177, 255, 0.34)">
              <strong className="step-number">01</strong>
              <h3>Take the free level test</h3>
              <p>Start with a clearer picture of where you are, so you do not lose time in the wrong course.</p>
            </SpotlightCard>

            <SpotlightCard className="process-card process-card-light" spotlightColor="rgba(30, 111, 255, 0.16)">
              <strong className="step-number">02</strong>
              <h3>Get the right<br />recommendation</h3>
              <p>We guide you to the course that fits your age, level, goals, and preferred format.</p>
            </SpotlightCard>

            <SpotlightCard className="process-card process-card-dark process-card-final" spotlightColor="rgba(115, 190, 255, 0.34)">
              <strong className="step-number">03</strong>
              <h3>Join live classes and<br />progress properly</h3>
              <p>Learn inside a structured system with live teaching, platform support, and clear next steps.</p>
            </SpotlightCard>
          </div>
        </section>
        </SectionReveal>
      </section>
    </main>
  );
}

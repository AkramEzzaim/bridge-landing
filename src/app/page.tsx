import Image from "next/image";
import LightRays from "@/components/LightRays";
import StarParticles from "@/components/StarParticles";
import SplitText from "@/components/SplitText";
import SectionReveal from "@/components/SectionReveal";
import BenefitsCarousel from "@/components/BenefitsCarousel";
import SpotlightCard from "@/components/SpotlightCard";
import BlurText from "@/components/BlurText";
import InteractiveWhyCard from "@/components/InteractiveWhyCard";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import NextStepAccordion from "@/components/NextStepAccordion";
import FinalCta from "@/components/FinalCta";
import SiteFooter from "@/components/site-footer";

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
    <>
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
        <div className="hero-bottom-glow" aria-hidden="true" />

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
                from={{ opacity: 0, y: 68, rotateX: -72, filter: "blur(12px)" }}
                to={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
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
                from={{ opacity: 0, y: 72, rotateX: -72, filter: "blur(12px)" }}
                to={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
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
            <article className="course-card" id="kids">
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

            <article className="course-card" id="teens">
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

            <article className="course-card" id="adults">
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

        <section className="closing-cta" id="get-started">
          <div className="closing-cta-copy">
            <BlurText
              text="No guessing your level."
              delay={85}
              animateBy="words"
              direction="top"
              stepDuration={0.28}
              threshold={0.25}
              rootMargin="-40px"
              className="cta-blur-line"
              scrollDriven={false}
            />
            <BlurText
              text="No choosing blindly."
              delay={90}
              animateBy="words"
              direction="bottom"
              stepDuration={0.3}
              threshold={0.25}
              rootMargin="-40px"
              className="cta-blur-line cta-blur-line-strong"
              scrollDriven={false}
            />
            <BlurText
              text="No paying first and hoping it fits."
              delay={70}
              animateBy="words"
              direction="top"
              stepDuration={0.28}
              threshold={0.25}
              rootMargin="-40px"
              className="cta-blur-line"
              scrollDriven={false}
            />
          </div>

          <div className="closing-cta-actions">
            <a href="#courses" className="closing-cta-primary">Get Started <ArrowRight /></a>
            <a href="#level" className="closing-cta-secondary">Test your level <ArrowRight /></a>
          </div>
        </section>

        <section className="why-section" id="why-bridgeway">
          <div className="why-heading">
            <p>Why Bridgeway</p>
            <h2>Built for people who<br />want <span>English taken<br />seriously</span></h2>
          </div>

          <div className="why-mosaic">
            <InteractiveWhyCard className="why-card-one">
              <div className="why-image-placeholder" role="img" aria-label="Qualified teacher image placeholder" />
              <strong>01</strong>
              <h3>Qualified teachers<br />working inside a real<br />method</h3>
            </InteractiveWhyCard>

            <InteractiveWhyCard className="why-card-two">
              <strong>02</strong>
              <h3>Small groups that make<br />learning more effective</h3>
              <div className="why-image-placeholder" role="img" aria-label="Small group image placeholder" />
            </InteractiveWhyCard>

            <InteractiveWhyCard className="why-card-three">
              <div className="why-image-placeholder" role="img" aria-label="CEFR progression image placeholder" />
              <strong>03</strong>
              <h3>Clear CEFR-based<br />progression from the<br />start</h3>
            </InteractiveWhyCard>

            <InteractiveWhyCard className="why-card-four">
              <strong>04</strong>
              <h3>A cleaner online experience<br />from course to platform</h3>
              <div className="why-image-placeholder why-image-placeholder-tall" role="img" aria-label="Online learning platform image placeholder" />
            </InteractiveWhyCard>

            <div className="why-section-cta">
              <p>Most online English options offer one useful piece.<br />Bridgeway brings the full system together.</p>
              <div>
                <a href="#courses" className="why-primary-action">Get Started <ArrowRight /></a>
                <a href="#why-us" className="why-secondary-action">See why Bridgeway <ArrowRight /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="platform-stack-section" id="platform-experience" aria-label="The Bridgeway learning experience">
          <ScrollStack
            className="bridgeway-scroll-stack"
            itemDistance={58}
            itemScale={0.035}
            itemStackDistance={26}
            stackPosition="8%"
            scaleEndPosition="3%"
            baseScale={0.93}
            rotationAmount={0.2}
            blurAmount={0.25}
            useWindowScroll
          >
            <ScrollStackItem itemClassName="platform-stack-card platform-video-card">
              <div className="platform-video-placeholder" role="img" aria-label="Bridgeway learning platform video placeholder">
                <span className="platform-video-control" aria-hidden="true">
                  <PlayIcon />
                </span>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="platform-stack-card platform-quote-card">
              <span className="platform-quote-mark platform-quote-mark-open" aria-hidden="true">“</span>
              <div className="platform-quote-copy">
                <p>
                  Too many learners lose <strong>momentum</strong> between classes. Materials are hard to track,
                  communication is scattered, and <strong>progress</strong> feels vague.
                </p>
                <p>
                  <strong>Bridgeway</strong> brings the learning experience into one place, so students and
                  <strong> parents</strong> can follow the course more clearly, stay aligned, and keep
                  <strong> moving without</strong> confusion.
                </p>
              </div>
              <span className="platform-quote-mark platform-quote-mark-close" aria-hidden="true">”</span>
            </ScrollStackItem>
          </ScrollStack>
        </section>

        <section className="speaking-club-shell" id="speaking-club">
          <div className="speaking-club-section">
            <p className="speaking-club-kicker">Speaking Club</p>

            <h2 className="speaking-club-title">
              <span className="speaking-club-title-line">More speaking,</span>
              <span className="speaking-club-title-line speaking-club-title-indent">
                <strong>Without</strong> the <em>chaos</em> of
              </span>
              <span className="speaking-club-title-line">random conversation groups.</span>
            </h2>

            <p className="speaking-club-description">
              Live conversation sessions designed for real fluency. Small groups, qualified facilitation, focused speaking time every week.
            </p>

            <div className="speaking-club-media">
              <Image
                src="/speaking-club-neon.png"
                alt="Four adult learners taking part in a live online speaking session"
                width={1536}
                height={1024}
                sizes="(max-width: 640px) calc(100vw - 52px), calc(100vw - 112px)"
              />
            </div>
          </div>
        </section>

        <section className="speaking-club-detail-shell" aria-labelledby="speaking-club-detail-copy">
          <div className="speaking-club-detail">
            <h2 className="speaking-club-detail-copy" id="speaking-club-detail-copy">
              <strong>Speaking Club</strong> is designed as a serious complement to your main learning path. It gives
              learners more <strong>speaking</strong> time, better <strong>level fit</strong>, and stronger continuity
              than open drop-in conversation spaces.
            </h2>

            <figure
              className="speaking-club-groups-media speaking-club-groups-primary"
              tabIndex={0}
              aria-label="Small speaking groups organized by age and level"
            >
              <Image
                src="/speaking-club-groups.png"
                alt="Two young adult English learners in a blue-lit studio"
                width={1536}
                height={1024}
                sizes="(max-width: 640px) calc(100vw - 20px), calc(100vw - 32px)"
              />
              <figcaption className="speaking-club-groups-caption">
                Small groups by age and level
              </figcaption>
            </figure>

            <div className="speaking-club-feature-gallery">
              <figure
                className="speaking-club-groups-media speaking-club-feature-card speaking-club-feature-card-tall speaking-club-feature-card-light"
                tabIndex={0}
                aria-labelledby="speaking-live-sessions-caption"
              >
                <Image
                  src="/speaking-club-live-sessions.png"
                  alt="Blue watercolor portrait of an adult learner using a laptop"
                  width={1122}
                  height={1402}
                  sizes="(max-width: 640px) calc(100vw - 36px), (max-width: 1600px) calc(50vw - 54px), 720px"
                />
                <figcaption className="speaking-club-groups-caption" id="speaking-live-sessions-caption">
                  Regular live speaking sessions
                </figcaption>
              </figure>

              <figure
                className="speaking-club-groups-media speaking-club-feature-card speaking-club-feature-card-tall"
                tabIndex={0}
                aria-labelledby="speaking-consistency-caption"
              >
                <Image
                  src="/speaking-club-consistency.png"
                  alt="Three adult learners talking in a blue-lit studio"
                  width={1122}
                  height={1402}
                  sizes="(max-width: 640px) calc(100vw - 36px), (max-width: 1600px) calc(50vw - 54px), 720px"
                />
                <figcaption className="speaking-club-groups-caption" id="speaking-consistency-caption">
                  Better consistency than casual conversation spaces
                </figcaption>
              </figure>

              <figure
                className="speaking-club-groups-media speaking-club-feature-card speaking-club-feature-card-wide"
                tabIndex={0}
                aria-labelledby="speaking-support-caption"
              >
                <Image
                  src="/speaking-club-ongoing-support.png"
                  alt="Profile of an adult learner outlined by blue light"
                  width={1586}
                  height={992}
                  sizes="(max-width: 640px) calc(100vw - 36px), (max-width: 1600px) calc(100vw - 96px), 1480px"
                />
                <figcaption className="speaking-club-groups-caption" id="speaking-support-caption">
                  Ideal alongside a main course or as ongoing speaking support
                </figcaption>
              </figure>
            </div>

            <div className="speaking-club-detail-actions">
              <a href="#courses" className="closing-cta-primary">
                Get Started <ArrowRight />
              </a>
              <a href="#speaking-club" className="closing-cta-secondary">
                Explore Speaking Club <ArrowRight />
              </a>
            </div>
          </div>
        </section>

        <NextStepAccordion />
        <FinalCta />
        </SectionReveal>
      </section>
    </main>
    <SiteFooter />
    </>
  );
}

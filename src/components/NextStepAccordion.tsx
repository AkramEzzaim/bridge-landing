"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./NextStepAccordion.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ArrowRight = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
    <path
      d="M5 12h13M14 7l5 5-5 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type StepCard = {
  number: string;
  collapsedTitle: ReactNode;
  title: ReactNode;
  description: ReactNode;
  cta: { label: string; href: string };
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    objectPosition: string;
  };
};

const STEPS: StepCard[] = [
  {
    number: "01",
    collapsedTitle: <><span>Take the</span><strong>Free level test</strong></>,
    title: <>Take the <strong>Free level test</strong></>,
    description: <>Start with a clearer picture of where you are, so you do not lose time in the wrong course.</>,
    cta: { label: "Test your level", href: "#courses" },
    image: {
      src: "/speaking-club-live-sessions.png",
      alt: "An adult learner using a laptop",
      width: 1122,
      height: 1402,
      objectPosition: "center",
    },
  },
  {
    number: "02",
    collapsedTitle: <><strong>Get a guided</strong><span>Recommendation</span></>,
    title: <><strong>Get a guided</strong> recommendation</>,
    description: <>We guide you to the course that fits your level, goals, age, and preferred learning format.</>,
    cta: { label: "Get guidance", href: "#courses" },
    image: {
      src: "/speaking-club-consistency.png",
      alt: "Three adults having a guided conversation",
      width: 1122,
      height: 1402,
      objectPosition: "center",
    },
  },
  {
    number: "03",
    collapsedTitle: <>Talk to us on <strong>WhatsApp</strong></>,
    title: <>Talk to us on <strong>WhatsApp</strong></>,
    description: <>Ask a direct question, get <strong>quick</strong> clarity, and move forward with less guesswork.</>,
    cta: { label: "Chat on WhatsApp", href: "#whatsapp" },
    image: {
      src: "/speaking-club-ongoing-support.png",
      alt: "An adult learner illuminated by blue light",
      width: 1586,
      height: 992,
      objectPosition: "66% center",
    },
  },
];

const DEFAULT_ACTIVE = 2;

export default function NextStepAccordion() {
  const scope = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const syncTrigger = (self: ScrollTrigger, progress = self.progress) => {
        self.getTween()?.progress(1);
        self.animation?.totalProgress(progress, true);
      };

      const reveal = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "clamp(top bottom)",
          end: "clamp(top 52%)",
          scrub: 0.65,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onRefresh: (self) => syncTrigger(self),
          onLeave: (self) => syncTrigger(self, 1),
          onLeaveBack: (self) => syncTrigger(self, 0),
        },
      });

      reveal
        .fromTo(".next-step-kicker",
          { opacity: 0.35, x: -70, rotateZ: -3 },
          { opacity: 1, x: 0, rotateZ: 0, duration: 0.24 }, 0)
        .fromTo(".next-step-title-line",
          { opacity: 0.35, y: 56, rotateX: -20, rotateZ: 1.5, transformOrigin: "50% 100%" },
          { opacity: 1, y: 0, rotateX: 0, rotateZ: 0, stagger: 0.1, duration: 0.52 }, 0.08)
        .fromTo(".next-step-accent",
          { filter: "blur(7px)", scale: 0.92 },
          { filter: "blur(0px)", scale: 1, stagger: 0.08, duration: 0.3 }, 0.28)
        .fromTo(".next-step-intro",
          { opacity: 0.35, y: 54, rotateZ: -1.5 },
          { opacity: 1, y: 0, rotateZ: 0, duration: 0.34 }, 0.48)
        .fromTo(".next-step-card",
          { rotateX: 9, rotateZ: -2.5, scale: 0.94, transformOrigin: "50% 100%" },
          { y: 0, rotateX: 0, rotateZ: 0, scale: 1, stagger: 0.08, duration: 0.48 }, 0.58);
    },
    { scope },
  );

  return (
    <section ref={scope} className="next-step-section" aria-labelledby="next-step-title">
      <div className="next-step-container">
        <header className="next-step-heading">
          <p className="next-step-kicker">Start without overthinking it</p>
          <h2 id="next-step-title">
            <span className="next-step-title-line">If you are not ready to</span>
            <span className="next-step-title-line">choose a <strong className="next-step-accent">course</strong> yet,</span>
            <span className="next-step-title-line next-step-title-line-soft">
              Choose the next <strong className="next-step-accent">right</strong> step
            </span>
          </h2>
          <p className="next-step-intro">
            You do not need to figure everything out alone. <strong>Start</strong> with clarity, guidance,
            <br className="next-step-desktop-break" /> or a direct conversation.
          </p>
        </header>

        <div
          className="next-step-accordion"
          onMouseLeave={(event) => {
            if (!event.currentTarget.contains(document.activeElement)) setActiveIndex(DEFAULT_ACTIVE);
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setActiveIndex(DEFAULT_ACTIVE);
          }}
        >
          {STEPS.map((step, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                key={step.number}
                id={step.number === "01" ? "level" : step.number === "03" ? "whatsapp" : undefined}
                data-step={step.number}
                className={`next-step-card${isActive ? " is-active" : ""}`}
                tabIndex={0}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <div className="next-step-media" aria-hidden={!isActive}>
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    width={step.image.width}
                    height={step.image.height}
                    sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1600px) 48vw, 720px"
                    style={{ objectPosition: step.image.objectPosition }}
                  />
                </div>
                <div className="next-step-card-shade" aria-hidden="true" />

                <div className="next-step-card-inner">
                  <span className="next-step-number" aria-hidden="true">{step.number}</span>

                  <div className="next-step-card-copy">
                    <p className="next-step-collapsed-title" aria-hidden={isActive}>
                      {step.collapsedTitle}
                    </p>

                    <div className="next-step-expanded-content" aria-hidden={!isActive}>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                      <a href={step.cta.href} tabIndex={isActive ? 0 : -1}>
                        {step.cta.label} <ArrowRight />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

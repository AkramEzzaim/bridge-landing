"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SectionReveal({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const stuckLayout = root.querySelector(".stuck-layout");
      const childrenPanel = root.querySelector(".children-panel");
      const pathsSection = root.querySelector(".paths-section");
      const worksSection = root.querySelector(".works-section");
      if (!stuckLayout || !childrenPanel || !pathsSection || !worksSection) return;

      const firstReveal = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: stuckLayout,
          start: "top 76%",
          once: true,
        },
      });

      firstReveal
        .from(".stuck-copy .section-kicker", { autoAlpha: 0, x: -28, duration: 0.55 })
        .from(".stuck-copy h2", { autoAlpha: 0, y: 54, duration: 0.85 }, "-=0.25")
        .from(".stuck-copy .section-intro", { autoAlpha: 0, y: 24, duration: 0.6 }, "-=0.42")
        .from(".fix-button", { autoAlpha: 0, y: 18, scale: 0.94, duration: 0.55 }, "-=0.35")
        .from(".challenge-card", { autoAlpha: 0, y: 38, scale: 0.96, duration: 0.58, stagger: 0.11 }, "-=0.22")
        .from(".main-placeholder", { autoAlpha: 0, x: 75, scale: 0.94, duration: 1 }, 0.15)
        .from(".system-note", { autoAlpha: 0, x: 46, y: 30, rotate: 3, scale: 0.9, duration: 0.72 }, "-=0.48");

      firstReveal.timeScale(1.85);

      const childrenReveal = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: childrenPanel,
          start: "top 78%",
          once: true,
        },
      });

      childrenReveal
        .from(childrenPanel, { autoAlpha: 0, y: 76, scale: 0.985, duration: 0.9 })
        .from(".kids-placeholder", { autoAlpha: 0, x: 62, scale: 0.95, duration: 0.82 }, "-=0.55")
        .from(".children-content .section-kicker", { autoAlpha: 0, x: -24, duration: 0.5 }, "-=0.62")
        .from(".children-content h2", { autoAlpha: 0, y: 38, duration: 0.72 }, "-=0.32")
        .from(".children-intro", { autoAlpha: 0, y: 22, duration: 0.55 }, "-=0.36")
        .from(".children-benefits article", { autoAlpha: 0, y: 34, scale: 0.94, duration: 0.52, stagger: 0.1 }, "-=0.22")
        .from(".kids-link", { autoAlpha: 0, x: -18, duration: 0.48 }, "-=0.18");

      childrenReveal.timeScale(1.85);

      const pathsReveal = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: pathsSection,
          start: "top 78%",
          once: true,
        },
      });

      pathsReveal
        .from(pathsSection, { autoAlpha: 0, y: 70, scale: 0.985, duration: 0.9 })
        .from(".paths-kicker", { autoAlpha: 0, x: -24, duration: 0.48 }, "-=0.55")
        .from(".paths-heading h2", { autoAlpha: 0, y: 38, duration: 0.7 }, "-=0.28")
        .from(".paths-heading-copy", { autoAlpha: 0, x: 36, duration: 0.62 }, "-=0.48")
        .from(".course-card", {
          autoAlpha: 0,
          y: 58,
          scale: 0.95,
          duration: 0.68,
          stagger: 0.12,
          onComplete: () => gsap.set(".course-card", { clearProps: "transform,opacity,visibility" }),
        }, "-=0.28")
        .from(".play-badge", {
          autoAlpha: 0,
          scale: 0.5,
          rotate: -12,
          duration: 0.45,
          stagger: 0.08,
          onComplete: () => gsap.set(".play-badge", { clearProps: "transform,opacity,visibility" }),
        }, "-=0.48");

      pathsReveal.timeScale(1.85);

      const worksHeadingReveal = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: worksSection,
          start: "top 78%",
          once: true,
        },
      });

      worksHeadingReveal
        .from(".works-heading > p", { autoAlpha: 0, x: -24, duration: 0.45 })
        .from(".works-heading h2", { autoAlpha: 0, y: 46, duration: 0.72 }, "-=0.22");
      worksHeadingReveal.timeScale(1.85);

      const worksTimeline = root.querySelector(".works-timeline");
      const worksLine = root.querySelector(".works-line-fill");
      const processCards = Array.from(root.querySelectorAll(".process-card"));
      const firstProcessCard = processCards[0];
      const lastProcessCard = processCards[processCards.length - 1];
      if (worksTimeline && worksLine && firstProcessCard && lastProcessCard) {
        gsap.fromTo(
          worksLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: firstProcessCard,
              start: "bottom 72%",
              endTrigger: lastProcessCard,
              end: "top 72%",
              scrub: 0.35,
            },
          },
        );
      }

      processCards.forEach((card) => {
        const number = card.querySelector(".step-number");
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 96, scale: 0.88, rotateX: 10 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 72%",
              scrub: 0.35,
            },
          },
        );

        if (number) {
          gsap.fromTo(
            number,
            { autoAlpha: 0, scale: 0.55 },
            {
              autoAlpha: 1,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                end: "top 72%",
                scrub: 0.25,
              },
            },
          );
        }
      });

      const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(refreshFrame);
    },
    { scope },
  );

  return <div ref={scope} className="section-animation-scope">{children}</div>;
}

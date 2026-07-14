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

      const select = gsap.utils.selector(root);
      const stuckLayout = select(".stuck-layout")[0];
      const childrenPanel = select(".children-panel")[0];
      const pathsSection = select(".paths-section")[0];
      const worksSection = select(".works-section")[0];
      const closingCta = select(".closing-cta")[0];
      const whySection = select(".why-section")[0];
      const speakingClubSection = select(".speaking-club-section")[0];
      const speakingClubDetail = select(".speaking-club-detail")[0];
      const speakingClubPrimaryMedia = select(".speaking-club-groups-primary")[0];

      const scrubTimeline = (
        trigger: Element,
        start = "top 92%",
        end = "top 28%",
      ) => gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub: 1.35,
          invalidateOnRefresh: true,
        },
      });

      if (stuckLayout) {
        const timeline = scrubTimeline(stuckLayout, "top 94%", "top 22%");

        timeline
          .fromTo(select(".stuck-copy .section-kicker"),
            { autoAlpha: 0, x: -90, rotateZ: -4 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.34 }, 0)
          .fromTo(select(".stuck-copy h2"),
            { autoAlpha: 0, y: 130, rotateX: -22, rotateZ: 2, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, rotateZ: 0, duration: 0.62 }, 0.08)
          .fromTo(select(".stuck-copy .section-intro"),
            { autoAlpha: 0, y: 72, x: -24, rotateZ: -1.5 },
            { autoAlpha: 1, y: 0, x: 0, rotateZ: 0, duration: 0.42 }, 0.28)
          .fromTo(select(".fix-button"),
            { autoAlpha: 0, y: 54, rotateZ: -5, scale: 0.86 },
            { autoAlpha: 1, y: 0, rotateZ: 0, scale: 1, duration: 0.38 }, 0.4)
          .fromTo(select(".challenge-card"),
            { autoAlpha: 0, y: 100, rotateY: -12, rotateZ: -5, scale: 0.82 },
            { autoAlpha: 1, y: 0, rotateY: 0, rotateZ: 0, scale: 1, stagger: 0.1, duration: 0.46 }, 0.5)
          .fromTo(select(".challenge-card .round-icon, .challenge-card h3, .challenge-card p"),
            { autoAlpha: 0, y: 38, rotateX: -16, scale: 0.78 },
            { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, stagger: 0.035, duration: 0.3 }, 0.66)
          .fromTo(select(".main-placeholder"),
            { autoAlpha: 0, x: 150, y: 70, rotateY: -16, rotateZ: 5, scale: 0.82 },
            { autoAlpha: 1, x: 0, y: 0, rotateY: 0, rotateZ: 0, scale: 1, duration: 0.86 }, 0.12)
          .fromTo(select(".system-note"),
            { autoAlpha: 0, x: 115, y: 105, rotateZ: 14, rotateY: -14, scale: 0.72 },
            { autoAlpha: 1, x: 0, y: 0, rotateZ: 0, rotateY: 0, scale: 1, duration: 0.62 }, 0.55);
      }

      if (childrenPanel) {
        const timeline = scrubTimeline(childrenPanel, "top 94%", "top 25%");

        timeline
          .fromTo(childrenPanel,
            { autoAlpha: 0, y: 130, rotateX: 7, scale: 0.94, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.7 }, 0)
          .fromTo(select(".kids-placeholder"),
            { autoAlpha: 0, x: 130, rotateY: -14, rotateZ: 5, scale: 0.82 },
            { autoAlpha: 1, x: 0, rotateY: 0, rotateZ: 0, scale: 1, duration: 0.7 }, 0.12)
          .fromTo(select(".children-content .section-kicker"),
            { autoAlpha: 0, x: -76, rotateZ: -4 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.34 }, 0.16)
          .fromTo(select(".children-content h2"),
            { autoAlpha: 0, y: 92, rotateX: -18, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.52 }, 0.22)
          .fromTo(select(".children-intro"),
            { autoAlpha: 0, y: 58, rotateZ: -1.5 },
            { autoAlpha: 1, y: 0, rotateZ: 0, duration: 0.4 }, 0.4)
          .fromTo(select(".children-benefits article"),
            { autoAlpha: 0, y: 78, rotateY: -18, rotateZ: -5, scale: 0.78 },
            { autoAlpha: 1, y: 0, rotateY: 0, rotateZ: 0, scale: 1, stagger: 0.09, duration: 0.4 }, 0.52)
          .fromTo(select(".children-benefits .round-icon, .children-benefits h3, .children-benefits p"),
            { autoAlpha: 0, y: 34, rotateX: -14, scale: 0.76 },
            { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, stagger: 0.03, duration: 0.28 }, 0.65)
          .fromTo(select(".kids-link"),
            { autoAlpha: 0, x: -54, rotateZ: -3 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.34 }, 0.73);
      }

      if (pathsSection) {
        const timeline = scrubTimeline(pathsSection, "top 95%", "top 18%");

        timeline
          .fromTo(pathsSection,
            { autoAlpha: 0, y: 145, rotateX: 7, scale: 0.94, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.7 }, 0)
          .fromTo(select(".paths-kicker"),
            { autoAlpha: 0, x: -84, rotateZ: -4 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.34 }, 0.16)
          .fromTo(select(".paths-heading h2"),
            { autoAlpha: 0, y: 100, rotateX: -20, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.54 }, 0.22)
          .fromTo(select(".paths-heading-copy"),
            { autoAlpha: 0, x: 100, rotateZ: 3 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.48 }, 0.32)
          .fromTo(select(".course-card"),
            { autoAlpha: 0, y: 155, rotateY: -14, rotateZ: -6, scale: 0.78, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateY: 0, rotateZ: 0, scale: 1, stagger: 0.13, duration: 0.62 }, 0.48)
          .fromTo(select(".course-media-placeholder"),
            { clipPath: "inset(18% 12% round 28px)", rotateX: -10, scale: 0.9 },
            { clipPath: "inset(0% 0% round 0px)", rotateX: 0, scale: 1, stagger: 0.1, duration: 0.42 }, 0.66)
          .fromTo(select(".course-card-content > *"),
            { autoAlpha: 0, y: 42, rotateX: -13 },
            { autoAlpha: 1, y: 0, rotateX: 0, stagger: 0.035, duration: 0.28 }, 0.72)
          .fromTo(select(".play-badge"),
            { autoAlpha: 0, rotateZ: -30, scale: 0.3 },
            { autoAlpha: 1, rotateZ: 0, scale: 1, stagger: 0.13, duration: 0.34 }, 0.78);
      }

      if (worksSection) {
        const headingTimeline = scrubTimeline(worksSection, "top 93%", "top 42%");
        headingTimeline
          .fromTo(select(".works-heading > p"),
            { autoAlpha: 0, x: -100, rotateZ: -4 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.38 }, 0)
          .fromTo(select(".works-heading h2"),
            { autoAlpha: 0, y: 135, rotateX: -22, rotateZ: 2, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, rotateZ: 0, duration: 0.72 }, 0.1);
      }

      const worksLineTrack = select(".works-line-track")[0];
      const worksLine = select(".works-line-fill")[0];
      if (worksLineTrack && worksLine) {
        gsap.fromTo(worksLine, { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: worksLineTrack,
            start: "top 78%",
            end: "bottom 58%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      }

      select(".process-card").forEach((card, index) => {
        const number = card.querySelector(".step-number");
        const copy = card.querySelectorAll("h3, p");
        const direction = index % 2 === 0 ? -1 : 1;
        const timeline = scrubTimeline(card, "top 96%", "top 48%");

        timeline
          .fromTo(card,
            { autoAlpha: 0, x: 120 * direction, y: 190, rotateY: 18 * direction, rotateZ: 8 * direction, scale: 0.72 },
            { autoAlpha: 1, x: 0, y: 0, rotateY: 0, rotateZ: 0, scale: 1, duration: 0.74 }, 0)
          .fromTo(number,
            { autoAlpha: 0, y: 72, rotateZ: -18 * direction, scale: 0.45 },
            { autoAlpha: 1, y: 0, rotateZ: 0, scale: 1, duration: 0.45 }, 0.28)
          .fromTo(copy,
            { autoAlpha: 0, y: 58, rotateX: -12 },
            { autoAlpha: 1, y: 0, rotateX: 0, stagger: 0.1, duration: 0.4 }, 0.4);
      });

      if (closingCta) {
        const ctaLines = select(".cta-blur-line");
        const firstLine = ctaLines[0]?.querySelectorAll(".blur-text-segment");
        const secondLine = ctaLines[1]?.querySelectorAll(".blur-text-segment");
        const thirdLine = ctaLines[2]?.querySelectorAll(".blur-text-segment");
        const actions = select(".closing-cta-actions a");

        if (firstLine?.length && secondLine?.length && thirdLine?.length) {
          const hold = {};
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: closingCta,
              start: "top top",
              end: () => `+=${Math.max(window.innerHeight * 2.6, 1800)}`,
              pin: true,
              pinType: "transform",
              pinSpacing: true,
              anticipatePin: 1,
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .fromTo(firstLine,
              { autoAlpha: 0.14, y: -76, rotateX: -16, filter: "blur(14px)", transformOrigin: "50% 100%" },
              { autoAlpha: 1, y: 0, rotateX: 0, filter: "blur(0px)", stagger: 0.07, duration: 0.52 }, 0)
            .fromTo(secondLine,
              { autoAlpha: 0.12, y: 76, rotateX: 16, filter: "blur(14px)", transformOrigin: "50% 0%" },
              { autoAlpha: 1, y: 0, rotateX: 0, filter: "blur(0px)", stagger: 0.07, duration: 0.55 }, 0.62)
            .fromTo(thirdLine,
              { autoAlpha: 0.12, y: -70, rotateX: -14, filter: "blur(14px)", transformOrigin: "50% 100%" },
              { autoAlpha: 1, y: 0, rotateX: 0, filter: "blur(0px)", stagger: 0.06, duration: 0.58 }, 1.22)
            .fromTo(actions,
              { autoAlpha: 0, y: 72, rotateZ: -6, scale: 0.8 },
              { autoAlpha: 1, y: 0, rotateZ: 0, scale: 1, stagger: 0.12, duration: 0.46 }, 2.12)
            .to(hold, { duration: 0.34 });
        }
      }

      if (whySection) {
        const headingTimeline = scrubTimeline(whySection, "top 94%", "top 34%");
        headingTimeline
          .fromTo(select(".why-heading > p"),
            { autoAlpha: 0, x: -100, rotateZ: -4 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.36 }, 0)
          .fromTo(select(".why-heading h2"),
            { autoAlpha: 0, y: 145, rotateX: -24, rotateZ: 2, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, rotateZ: 0, duration: 0.76 }, 0.1);

        select(".why-card").forEach((card, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          const cardTimeline = scrubTimeline(card, "top 96%", "top 50%");
          cardTimeline
            .fromTo(card,
              { autoAlpha: 0, x: 135 * direction, y: 175, rotateY: 18 * direction, rotateZ: 9 * direction, scale: 0.72 },
              { autoAlpha: 1, x: 0, y: 0, rotateY: 0, rotateZ: 0, scale: 1, duration: 0.72 }, 0)
            .fromTo(card.querySelectorAll(".why-image-placeholder, strong, h3"),
              { autoAlpha: 0, y: 65, rotateX: -12 },
              { autoAlpha: 1, y: 0, rotateX: 0, stagger: 0.08, duration: 0.4 }, 0.34);
        });

        const whyCta = select(".why-section-cta")[0];
        if (whyCta) {
          const ctaTimeline = scrubTimeline(whyCta, "top 96%", "top 58%");
          ctaTimeline
            .fromTo(whyCta,
              { autoAlpha: 0, y: 115, rotateZ: 4, scale: 0.86 },
              { autoAlpha: 1, y: 0, rotateZ: 0, scale: 1, duration: 0.6 }, 0)
            .fromTo(whyCta.querySelectorAll("a"),
              { autoAlpha: 0, y: 52, rotateZ: -6, scale: 0.8 },
              { autoAlpha: 1, y: 0, rotateZ: 0, scale: 1, stagger: 0.12, duration: 0.38 }, 0.3);
        }
      }

      if (speakingClubSection) {
        const speakingTimeline = scrubTimeline(speakingClubSection, "top 92%", "top 15%");

        speakingTimeline
          .fromTo(select(".speaking-club-kicker"),
            { autoAlpha: 0, x: -90, rotateZ: -4 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.28 }, 0)
          .fromTo(select(".speaking-club-title-line"),
            { autoAlpha: 0, y: 145, rotateX: -22, rotateZ: 2, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, rotateZ: 0, stagger: 0.11, duration: 0.58 }, 0.08)
          .fromTo(select(".speaking-club-description"),
            { autoAlpha: 0, x: -90, y: 42, rotateZ: -2 },
            { autoAlpha: 1, x: 0, y: 0, rotateZ: 0, duration: 0.38 }, 0.42)
          .fromTo(select(".speaking-club-media"),
            { autoAlpha: 0, y: 155, rotateX: 9, rotateZ: -2.5, scale: 0.94, clipPath: "inset(12% 5% round 24px)", transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, rotateZ: 0, scale: 1, clipPath: "inset(0% 0% round 15px)", duration: 0.7 }, 0.54);
      }

      if (speakingClubDetail && speakingClubPrimaryMedia) {
        const detailTimeline = scrubTimeline(speakingClubDetail, "top 92%", "top 18%");

        detailTimeline
          .fromTo(select(".speaking-club-detail-copy"),
            { autoAlpha: 0, y: 125, rotateX: -18, scale: 0.96, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.58 }, 0)
          .fromTo(select(".speaking-club-detail-copy strong"),
            { autoAlpha: 0.2, filter: "blur(9px)" },
            { autoAlpha: 1, filter: "blur(0px)", stagger: 0.08, duration: 0.34 }, 0.22)
          .fromTo(speakingClubPrimaryMedia,
            { autoAlpha: 0, y: 165, rotateX: 8, rotateZ: 2.5, scale: 0.94, clipPath: "inset(10% 4% round 26px)", transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, rotateZ: 0, scale: 1, clipPath: "inset(0% 0% round 18px)", duration: 0.72 }, 0.38);
      }

      select(".speaking-club-feature-card").forEach((card, index) => {
        const direction = index === 2 ? 0 : index % 2 === 0 ? -1 : 1;
        const featureTimeline = scrubTimeline(card, "top 96%", "top 48%");

        featureTimeline.fromTo(card,
          {
            autoAlpha: 0,
            x: direction * 90,
            y: 150,
            rotateX: 8,
            rotateZ: direction * 2.5,
            scale: 0.94,
            clipPath: "inset(9% 4% round 24px)",
            transformOrigin: "50% 100%",
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotateX: 0,
            rotateZ: 0,
            scale: 1,
            clipPath: "inset(0% 0% round 16px)",
            duration: 0.72,
          });
      });

      const speakingClubActions = select(".speaking-club-detail-actions")[0];
      if (speakingClubActions) {
        const actionsTimeline = scrubTimeline(speakingClubActions, "top 96%", "top 64%");

        actionsTimeline
          .fromTo(speakingClubActions,
            { autoAlpha: 0, y: 92, rotateX: 8, scale: 0.94, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.56 }, 0)
          .fromTo(speakingClubActions.querySelectorAll("a"),
            { autoAlpha: 0, y: 44, rotateZ: -5, scale: 0.84 },
            { autoAlpha: 1, y: 0, rotateZ: 0, scale: 1, stagger: 0.12, duration: 0.36 }, 0.2);
      }

      const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(refreshFrame);
    },
    { scope },
  );

  return <div ref={scope} className="section-animation-scope">{children}</div>;
}

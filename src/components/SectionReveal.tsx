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
      const revealOpacity = 0.38;
      const coarsePointer = window.matchMedia("(pointer: coarse), (max-width: 700px)").matches;
      const syncTrigger = (
        self: ScrollTrigger,
        progress = self.progress,
      ) => {
        self.getTween()?.progress(1);
        self.animation?.totalProgress(progress, true);
      };

      const scrubTimeline = (
        trigger: Element,
        start = "clamp(top bottom)",
        end = "clamp(top 58%)",
        scrub = 0.65,
      ) => gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub: coarsePointer ? Math.min(scrub, 0.35) : scrub,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onRefresh: (self) => syncTrigger(self),
          onLeave: (self) => syncTrigger(self, 1),
          onLeaveBack: (self) => syncTrigger(self, 0),
        },
      });

      if (stuckLayout) {
        const timeline = scrubTimeline(stuckLayout, "clamp(top bottom)", "clamp(top 52%)", 0.7);

        timeline
          .fromTo(select(".stuck-copy .section-kicker"),
            { opacity: revealOpacity, x: -90, rotateZ: -4 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.34 }, 0)
          .fromTo(select(".stuck-copy h2"),
            { opacity: revealOpacity, y: 64, rotateX: -22, rotateZ: 2, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, rotateZ: 0, duration: 0.62 }, 0.08)
          .fromTo(select(".stuck-copy .section-intro"),
            { opacity: revealOpacity, y: 44, x: -24, rotateZ: -1.5 },
            { autoAlpha: 1, y: 0, x: 0, rotateZ: 0, duration: 0.42 }, 0.28)
          .fromTo(select(".fix-button"),
            { opacity: revealOpacity, y: 54, rotateZ: -5, scale: 0.86 },
            { autoAlpha: 1, y: 0, rotateZ: 0, scale: 1, duration: 0.38 }, 0.4)
          .fromTo(select(".challenge-card"),
            { rotateY: -12, rotateZ: -5, scale: 0.82 },
            { y: 0, rotateY: 0, rotateZ: 0, scale: 1, stagger: 0.1, duration: 0.46 }, 0.5)
          .fromTo(select(".challenge-card .round-icon, .challenge-card h3, .challenge-card p"),
            { opacity: revealOpacity, y: 38, rotateX: -16, scale: 0.78 },
            { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, stagger: 0.035, duration: 0.3 }, 0.66)
          .fromTo(select(".main-placeholder"),
            { x: 150, rotateY: -16, rotateZ: 5, scale: 0.82 },
            { x: 0, y: 0, rotateY: 0, rotateZ: 0, scale: 1, duration: 0.86 }, 0.12)
          .fromTo(select(".system-note"),
            { opacity: revealOpacity, x: 84, y: 48, rotateZ: 14, rotateY: -14, scale: 0.72 },
            { autoAlpha: 1, x: 0, y: 0, rotateZ: 0, rotateY: 0, scale: 1, duration: 0.62 }, 0.55);
      }

      if (childrenPanel) {
        const timeline = scrubTimeline(childrenPanel, "clamp(top bottom)", "clamp(top 52%)", 0.7);

        timeline
          .fromTo(childrenPanel,
            { rotateX: 7, scale: 0.94, transformOrigin: "50% 100%" },
            { y: 0, rotateX: 0, scale: 1, duration: 0.7 }, 0)
          .fromTo(select(".kids-placeholder"),
            { x: 130, rotateY: -14, rotateZ: 5, scale: 0.82 },
            { x: 0, rotateY: 0, rotateZ: 0, scale: 1, duration: 0.7 }, 0.12)
          .fromTo(select(".children-content .section-kicker"),
            { opacity: revealOpacity, x: -76, rotateZ: -4 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.34 }, 0.16)
          .fromTo(select(".children-content h2"),
            { opacity: revealOpacity, y: 56, rotateX: -18, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.52 }, 0.22)
          .fromTo(select(".children-intro"),
            { opacity: revealOpacity, y: 40, rotateZ: -1.5 },
            { autoAlpha: 1, y: 0, rotateZ: 0, duration: 0.4 }, 0.4)
          .fromTo(select(".children-benefits article"),
            { rotateY: -18, rotateZ: -5, scale: 0.78 },
            { y: 0, rotateY: 0, rotateZ: 0, scale: 1, stagger: 0.09, duration: 0.4 }, 0.52)
          .fromTo(select(".children-benefits .round-icon, .children-benefits h3, .children-benefits p"),
            { opacity: revealOpacity, y: 34, rotateX: -14, scale: 0.76 },
            { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, stagger: 0.03, duration: 0.28 }, 0.65)
          .fromTo(select(".kids-link"),
            { opacity: revealOpacity, x: -54, rotateZ: -3 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.34 }, 0.73);
      }

      if (pathsSection) {
        const timeline = scrubTimeline(pathsSection, "clamp(top bottom)", "clamp(top 55%)", 0.7);

        timeline
          .fromTo(select(".paths-kicker"),
            { opacity: revealOpacity, x: -84, rotateZ: -4 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.34 }, 0.16)
          .fromTo(select(".paths-heading h2"),
            { opacity: revealOpacity, y: 56, rotateX: -20, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.54 }, 0.22)
          .fromTo(select(".paths-heading-copy"),
            { opacity: revealOpacity, x: 100, rotateZ: 3 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.48 }, 0.32);

        select(".course-card").forEach((card, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          const cardTimeline = scrubTimeline(card, "clamp(top bottom)", "clamp(top 64%)", 0.55);

          cardTimeline
            .fromTo(card,
              { rotateY: 10 * direction, rotateZ: 4 * direction, scale: 0.86, transformOrigin: "50% 100%" },
              { y: 0, rotateY: 0, rotateZ: 0, scale: 1, duration: 0.62 }, 0)
            .fromTo(card.querySelector(".course-media-placeholder"),
              { clipPath: "inset(14% 9% round 28px)", rotateX: -8, scale: 0.92 },
              { clipPath: "inset(0% 0% round 0px)", rotateX: 0, scale: 1, duration: 0.42 }, 0.1)
            .fromTo(card.querySelectorAll(".course-card-content > *"),
              { opacity: revealOpacity, y: 42, rotateX: -13 },
              { opacity: 1, y: 0, rotateX: 0, stagger: 0.035, duration: 0.28 }, 0.3)
            .fromTo(card.querySelector(".play-badge"),
              { opacity: revealOpacity, rotateZ: -24, scale: 0.55 },
              { opacity: 1, rotateZ: 0, scale: 1, duration: 0.34 }, 0.4);
        });
      }

      if (worksSection) {
        const headingTimeline = scrubTimeline(worksSection, "clamp(top bottom)", "clamp(top 62%)", 0.6);
        headingTimeline
          .fromTo(select(".works-heading > p"),
            { opacity: revealOpacity, x: -100, rotateZ: -4 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.38 }, 0)
          .fromTo(select(".works-heading h2"),
            { opacity: revealOpacity, y: 64, rotateX: -22, rotateZ: 2, transformOrigin: "50% 100%" },
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
            start: "clamp(top 82%)",
            end: "clamp(bottom 58%)",
            scrub: coarsePointer ? 0.3 : 0.5,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onRefresh: (self) => syncTrigger(self),
            onLeave: (self) => syncTrigger(self, 1),
            onLeaveBack: (self) => syncTrigger(self, 0),
          },
        });
      }

      select(".process-card").forEach((card, index) => {
        const number = card.querySelector(".step-number");
        const copy = card.querySelectorAll("h3, p");
        const direction = index % 2 === 0 ? -1 : 1;
        const timeline = scrubTimeline(card, "clamp(top bottom)", "clamp(top 66%)", 0.55);

        timeline
          .fromTo(card,
            { x: 95 * direction, rotateY: 14 * direction, rotateZ: 6 * direction, scale: 0.8 },
            { x: 0, y: 0, rotateY: 0, rotateZ: 0, scale: 1, duration: 0.74 }, 0)
          .fromTo(number,
            { opacity: revealOpacity, y: 72, rotateZ: -18 * direction, scale: 0.45 },
            { autoAlpha: 1, y: 0, rotateZ: 0, scale: 1, duration: 0.45 }, 0.28)
          .fromTo(copy,
            { opacity: revealOpacity, y: 58, rotateX: -12 },
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
              scrub: coarsePointer ? 0.35 : 0.75,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              refreshPriority: 10,
              onRefresh: (self) => syncTrigger(self),
              onLeave: (self) => syncTrigger(self, 1),
              onLeaveBack: (self) => syncTrigger(self, 0),
            },
          });

          timeline
            .fromTo(firstLine,
              { opacity: revealOpacity, y: -76, rotateX: -16, filter: "blur(7px)", transformOrigin: "50% 100%" },
              { autoAlpha: 1, y: 0, rotateX: 0, filter: "blur(0px)", stagger: 0.07, duration: 0.52 }, 0)
            .fromTo(secondLine,
              { opacity: revealOpacity, y: 76, rotateX: 16, filter: "blur(7px)", transformOrigin: "50% 0%" },
              { autoAlpha: 1, y: 0, rotateX: 0, filter: "blur(0px)", stagger: 0.07, duration: 0.55 }, 0.62)
            .fromTo(thirdLine,
              { opacity: revealOpacity, y: -70, rotateX: -14, filter: "blur(7px)", transformOrigin: "50% 100%" },
              { autoAlpha: 1, y: 0, rotateX: 0, filter: "blur(0px)", stagger: 0.06, duration: 0.58 }, 1.22)
            .fromTo(actions,
              { autoAlpha: 0, y: 72, rotateZ: -6, scale: 0.8 },
              { autoAlpha: 1, y: 0, rotateZ: 0, scale: 1, stagger: 0.12, duration: 0.46 }, 2.12)
            .to(hold, { duration: 0.34 });
        }
      }

      if (whySection) {
        const headingTimeline = scrubTimeline(whySection, "clamp(top bottom)", "clamp(top 62%)", 0.6);
        headingTimeline
          .fromTo(select(".why-heading > p"),
            { opacity: revealOpacity, x: -100, rotateZ: -4 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.36 }, 0)
          .fromTo(select(".why-heading h2"),
            { opacity: revealOpacity, y: 64, rotateX: -24, rotateZ: 2, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, rotateZ: 0, duration: 0.76 }, 0.1);

        select(".why-card").forEach((card, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          const cardTimeline = scrubTimeline(card, "clamp(top bottom)", "clamp(top 66%)", 0.55);
          cardTimeline
            .fromTo(card,
              { x: 105 * direction, rotateY: 14 * direction, rotateZ: 6 * direction, scale: 0.8 },
              { x: 0, y: 0, rotateY: 0, rotateZ: 0, scale: 1, duration: 0.72 }, 0)
            .fromTo(card.querySelectorAll(".why-image-placeholder, strong, h3"),
              { opacity: revealOpacity, y: 65, rotateX: -12 },
              { autoAlpha: 1, y: 0, rotateX: 0, stagger: 0.08, duration: 0.4 }, 0.34);
        });

        const whyCta = select(".why-section-cta")[0];
        if (whyCta) {
          const ctaTimeline = scrubTimeline(whyCta, "clamp(top bottom)", "clamp(top 72%)", 0.5);
          ctaTimeline
            .fromTo(whyCta,
              { rotateZ: 4, scale: 0.88 },
              { y: 0, rotateZ: 0, scale: 1, duration: 0.6 }, 0)
            .fromTo(whyCta.querySelectorAll("a"),
              { opacity: revealOpacity, y: 52, rotateZ: -6, scale: 0.8 },
              { autoAlpha: 1, y: 0, rotateZ: 0, scale: 1, stagger: 0.12, duration: 0.38 }, 0.3);
        }
      }

      if (speakingClubSection) {
        const speakingTimeline = scrubTimeline(speakingClubSection, "clamp(top bottom)", "clamp(top 52%)", 0.65);

        speakingTimeline
          .fromTo(select(".speaking-club-kicker"),
            { opacity: revealOpacity, x: -90, rotateZ: -4 },
            { autoAlpha: 1, x: 0, rotateZ: 0, duration: 0.28 }, 0)
          .fromTo(select(".speaking-club-title-line"),
            { opacity: revealOpacity, y: 64, rotateX: -22, rotateZ: 2, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, rotateZ: 0, stagger: 0.11, duration: 0.58 }, 0.08)
          .fromTo(select(".speaking-club-description"),
            { opacity: revealOpacity, x: -90, y: 42, rotateZ: -2 },
            { autoAlpha: 1, x: 0, y: 0, rotateZ: 0, duration: 0.38 }, 0.42);

        const speakingMedia = select(".speaking-club-media")[0];
        if (speakingMedia) {
          scrubTimeline(speakingMedia, "clamp(top bottom)", "clamp(top 58%)", 0.55)
            .fromTo(speakingMedia,
              { rotateX: 8, rotateZ: -2.5, scale: 0.95, clipPath: "inset(10% 4% round 24px)", transformOrigin: "50% 100%" },
              { y: 0, rotateX: 0, rotateZ: 0, scale: 1, clipPath: "inset(0% 0% round 15px)", duration: 0.7 });
        }
      }

      if (speakingClubDetail && speakingClubPrimaryMedia) {
        const detailTimeline = scrubTimeline(speakingClubDetail, "clamp(top bottom)", "clamp(top 55%)", 0.6);

        detailTimeline
          .fromTo(select(".speaking-club-detail-copy"),
            { opacity: revealOpacity, y: 56, rotateX: -16, scale: 0.96, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.58 }, 0)
          .fromTo(select(".speaking-club-detail-copy strong"),
            { filter: "blur(7px)" },
            { filter: "blur(0px)", stagger: 0.08, duration: 0.34 }, 0.22);

        scrubTimeline(speakingClubPrimaryMedia, "clamp(top bottom)", "clamp(top 58%)", 0.55)
          .fromTo(speakingClubPrimaryMedia,
            { rotateX: 8, rotateZ: 2.5, scale: 0.95, clipPath: "inset(9% 4% round 26px)", transformOrigin: "50% 100%" },
            { y: 0, rotateX: 0, rotateZ: 0, scale: 1, clipPath: "inset(0% 0% round 18px)", duration: 0.72 });
      }

      select(".speaking-club-feature-card").forEach((card, index) => {
        const direction = index === 2 ? 0 : index % 2 === 0 ? -1 : 1;
        const featureTimeline = scrubTimeline(card, "clamp(top bottom)", "clamp(top 64%)", 0.55);

        featureTimeline.fromTo(card,
          {
            x: direction * 90,
            rotateX: 8,
            rotateZ: direction * 2.5,
            scale: 0.94,
            clipPath: "inset(9% 4% round 24px)",
            transformOrigin: "50% 100%",
          },
          {
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
        const actionsTimeline = scrubTimeline(speakingClubActions, "clamp(top bottom)", "clamp(top 74%)", 0.45);

        actionsTimeline
          .fromTo(speakingClubActions,
            { y: 82, rotateX: 8, scale: 0.94, transformOrigin: "50% 100%" },
            { y: 0, rotateX: 0, scale: 1, duration: 0.56 }, 0)
          .fromTo(speakingClubActions.querySelectorAll("a"),
            { opacity: revealOpacity, y: 44, rotateZ: -5, scale: 0.84 },
            { autoAlpha: 1, y: 0, rotateZ: 0, scale: 1, stagger: 0.12, duration: 0.36 }, 0.2);
      }

      const rootTriggers = () => ScrollTrigger.getAll().filter((trigger) => {
        const triggerElement = trigger.trigger;
        return triggerElement instanceof Element && root.contains(triggerElement);
      });

      const settleScrubProgress = () => {
        rootTriggers().forEach((trigger) => {
          trigger.update();
          trigger.getTween()?.progress(1);
          trigger.animation?.totalProgress(trigger.progress, true);
        });
      };

      const refreshAndSettle = () => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        ScrollTrigger.update();
        settleScrubProgress();
      };

      settleScrubProgress();
      const refreshFrame = requestAnimationFrame(refreshAndSettle);
      let cancelled = false;
      const handlePageShow = () => refreshAndSettle();
      const handleLoad = () => refreshAndSettle();

      window.addEventListener("pageshow", handlePageShow);
      window.addEventListener("load", handleLoad, { once: true });
      document.fonts.ready.then(() => {
        if (!cancelled) refreshAndSettle();
      });

      return () => {
        cancelled = true;
        cancelAnimationFrame(refreshFrame);
        window.removeEventListener("pageshow", handlePageShow);
        window.removeEventListener("load", handleLoad);
      };
    },
    { scope },
  );

  return <div ref={scope} className="section-animation-scope">{children}</div>;
}

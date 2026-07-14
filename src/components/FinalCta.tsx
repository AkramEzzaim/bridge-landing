"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./FinalCta.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ArrowRight = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="23" height="23">
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

export default function FinalCta() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const card = root.querySelector<HTMLElement>(".final-cta-card");
      const image = root.querySelector<HTMLElement>(".final-cta-media");
      if (!card || !image) return;

      const syncTrigger = (self: ScrollTrigger, progress = self.progress) => {
        self.getTween()?.progress(1);
        self.animation?.totalProgress(progress, true);
      };

      const reveal = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "clamp(top bottom)",
          end: "clamp(top 50%)",
          scrub: 0.65,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onRefresh: (self) => syncTrigger(self),
          onLeave: (self) => syncTrigger(self, 1),
          onLeaveBack: (self) => syncTrigger(self, 0),
        },
      });

      reveal
        .fromTo(
          card,
          {
            rotateX: 8,
            rotateZ: -1.5,
            scale: 0.95,
            clipPath: "inset(8% 3% round 38px)",
            transformOrigin: "50% 100%",
          },
          {
            y: 0,
            rotateX: 0,
            rotateZ: 0,
            scale: 1,
            clipPath: "inset(0% 0% round 26px)",
            duration: 0.72,
          },
          0,
        )
        .fromTo(
          image,
          { scale: 1.12, yPercent: 4 },
          { scale: 1, yPercent: 0, duration: 1.15 },
          0,
        )
        .fromTo(
          ".final-cta-title-line",
          {
            opacity: 0.35,
            y: 56,
            rotateX: -18,
            filter: "blur(7px)",
            transformOrigin: "50% 100%",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            stagger: 0.1,
            duration: 0.52,
          },
          0.2,
        )
        .fromTo(
          ".final-cta-support",
          { opacity: 0.35, y: 52, rotateZ: -1.5, filter: "blur(5px)" },
          { opacity: 1, y: 0, rotateZ: 0, filter: "blur(0px)", duration: 0.36 },
          0.5,
        )
        .fromTo(
          ".final-cta-action",
          { opacity: 0.35, y: 52, rotateZ: -5, scale: 0.84 },
          { opacity: 1, y: 0, rotateZ: 0, scale: 1, stagger: 0.12, duration: 0.42 },
          0.62,
        )
        .fromTo(
          ".final-cta-refund",
          { opacity: 0.35, y: 24 },
          { opacity: 1, y: 0, duration: 0.3 },
          0.84,
        );
    },
    { scope },
  );

  return (
    <section ref={scope} className="final-cta-section" aria-labelledby="final-cta-title">
      <div className="final-cta-card">
        <Image
          className="final-cta-media"
          src="/final-cta-blue-conversation.png"
          alt=""
          fill
          sizes="(max-width: 1600px) calc(100vw - 32px), 1568px"
        />
        <div className="final-cta-overlay" aria-hidden="true" />
        <div className="final-cta-glow" aria-hidden="true" />

        <div className="final-cta-content">
          <h2 id="final-cta-title">
            <span className="final-cta-title-line">Stop piecing English</span>
            <span className="final-cta-title-line">together. <strong>Start</strong> with a</span>
            <span className="final-cta-title-line">system that holds.</span>
          </h2>

          <p className="final-cta-support">
            Live classes, <strong>qualified teachers</strong>, small groups, clear levels, and a
            <br className="final-cta-desktop-break" /> learning experience designed to move people forward properly.
          </p>

          <div className="final-cta-actions" aria-label="Get started options">
            <a className="final-cta-action final-cta-action-primary" href="#courses">
              <span>Get Started</span>
              <ArrowRight />
            </a>
            <a className="final-cta-action final-cta-action-secondary" href="#level">
              <span>Test your level</span>
              <ArrowRight />
            </a>
          </div>

          <p className="final-cta-refund"><strong>14-day</strong> refund policy available</p>
        </div>
      </div>
    </section>
  );
}

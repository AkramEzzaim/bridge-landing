"use client";

import { useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type AnimationSnapshot = Record<string, string | number>;

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: (value: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  scrollDriven?: boolean;
};

export default function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  animationFrom,
  animationTo,
  easing = (value) => value,
  onAnimationComplete,
  stepDuration = 0.35,
  scrollDriven = true,
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const elements = useMemo(
    () => animateBy === "words" ? text.split(" ") : text.split(""),
    [animateBy, text],
  );

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !scrollDriven || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const segments = element.querySelectorAll(".blur-text-segment");
      const defaultFrom = direction === "top"
        ? { filter: "blur(12px)", opacity: 0, y: -72, rotateX: -18 }
        : { filter: "blur(12px)", opacity: 0, y: 72, rotateX: 18 };
      const defaultSteps = [
        { filter: "blur(5px)", opacity: 0.55, y: direction === "top" ? 9 : -9, rotateX: direction === "top" ? 4 : -4 },
        { filter: "blur(0px)", opacity: 1, y: 0, rotateX: 0 },
      ];
      const from = animationFrom ?? defaultFrom;
      const steps = animationTo ?? defaultSteps;
      const middle = steps.length > 1 ? steps[0] : steps[steps.length - 1];
      const final = steps[steps.length - 1];
      const stagger = Math.max(0.035, delay / 1000);
      const duration = Math.max(0.2, stepDuration);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 94%",
          end: "top 45%",
          scrub: 1.35,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(segments, from, {
          ...middle,
          duration,
          stagger,
          ease: easing,
        })
        .to(segments, {
          ...final,
          duration,
          stagger,
          ease: easing,
          onComplete: onAnimationComplete,
        }, `-=${duration * 0.45}`);
    },
    { scope: ref, dependencies: [animationFrom, animationTo, delay, direction, easing, onAnimationComplete, scrollDriven, stepDuration, text] },
  );

  return (
    <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", perspective: 800 }}>
      {elements.map((segment, index) => (
        <span className="blur-text-segment" key={`${segment}-${index}`}>
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </span>
      ))}
    </p>
  );
}

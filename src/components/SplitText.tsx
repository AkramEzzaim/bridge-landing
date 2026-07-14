"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type SplitElement = HTMLElement & {
  _rbsplitInstance?: GSAPSplitText | null;
};

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: CSSProperties["textAlign"];
  tag?: "p" | "span" | "h1" | "h2" | "h3" | "div";
  onLetterAnimationComplete?: () => void;
};

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<SplitElement>(null);
  const setElementRef = useCallback((node: HTMLElement | null) => {
    ref.current = node as SplitElement | null;
  }, []);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(
    () => typeof document !== "undefined" && document.fonts.status === "loaded",
  );

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (fontsLoaded) return;

    let active = true;
    document.fonts.ready.then(() => {
      if (active) setFontsLoaded(true);
    });
    return () => {
      active = false;
    };
  }, [fontsLoaded]);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded || animationCompletedRef.current) return;
      const element = ref.current;

      if (element._rbsplitInstance) {
        try {
          element._rbsplitInstance.revert();
        } catch {
          // The original text may already have been restored by GSAP.
        }
        element._rbsplitInstance = null;
      }

      const startPercent = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch?.[2] || "px";
      const sign = marginValue === 0 ? "" : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPercent}%${sign}`;
      let targets: Element[] = [];

      const splitInstance = new GSAPSplitText(element, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType.includes("lines"),
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        onSplit: (self) => {
          if (splitType.includes("chars") && self.chars.length) targets = self.chars;
          else if (splitType.includes("words") && self.words.length) targets = self.words;
          else if (splitType.includes("lines") && self.lines.length) targets = self.lines;
          else targets = self.chars.length ? self.chars : self.words.length ? self.words : self.lines;

          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: element,
                start,
                toggleActions: "play none none none",
                fastScrollEnd: true,
                anticipatePin: 0.4,
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              willChange: "transform, opacity",
              force3D: true,
            },
          );
        },
      });

      element._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === element) trigger.kill();
        });
        try {
          splitInstance.revert();
        } catch {
          // The split may already be reverted during a responsive re-split.
        }
        element._rbsplitInstance = null;
      };
    },
    {
      dependencies: [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), threshold, rootMargin, fontsLoaded],
      scope: ref,
    },
  );

  const style: CSSProperties = {
    textAlign,
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "normal",
    overflowWrap: "break-word",
    willChange: "transform, opacity",
  };

  const classes = `split-parent ${className}`.trim();
  if (tag === "span") return <span ref={setElementRef} style={style} className={classes}>{text}</span>;
  if (tag === "h1") return <h1 ref={setElementRef} style={style} className={classes}>{text}</h1>;
  if (tag === "h2") return <h2 ref={setElementRef} style={style} className={classes}>{text}</h2>;
  if (tag === "h3") return <h3 ref={setElementRef} style={style} className={classes}>{text}</h3>;
  if (tag === "div") return <div ref={setElementRef} style={style} className={classes}>{text}</div>;
  return <p ref={setElementRef} style={style} className={classes}>{text}</p>;
}

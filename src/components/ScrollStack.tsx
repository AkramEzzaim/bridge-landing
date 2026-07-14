"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollStack.css";

type ScrollStackItemProps = {
  children: ReactNode;
  itemClassName?: string;
};

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
};

type CardTransform = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
};

export const ScrollStackItem = ({ children, itemClassName = "" }: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

export default function ScrollStack({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const resizeFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, CardTransform>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string, containerHeight: number) => {
    if (value.includes("%")) return (Number.parseFloat(value) / 100) * containerHeight;
    return Number.parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    }

    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller?.scrollTop ?? 0,
      containerHeight: scroller?.clientHeight ?? 0,
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback((element: HTMLElement) => {
    if (useWindowScroll) {
      let offset = 0;
      let current: HTMLElement | null = element;

      // offsetTop is layout-based, so the card's active transform cannot feed
      // back into its own trigger position and make the stack oscillate.
      while (current) {
        offset += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }

      return offset;
    }
    return element.offsetTop;
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;
    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const root = scrollerRef.current;
    const endElement = root?.querySelector<HTMLElement>(".scroll-stack-end");
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, index) => {
      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * index;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + index * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? index * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let cardIndex = 0; cardIndex < cardsRef.current.length; cardIndex += 1) {
          const candidate = cardsRef.current[cardIndex];
          const candidateTop = getElementOffset(candidate);
          const candidateStart = candidateTop - stackPositionPx - itemStackDistance * cardIndex;
          if (scrollTop >= candidateStart) topCardIndex = cardIndex;
        }
        if (index < topCardIndex) blur = Math.max(0, (topCardIndex - index) * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * index;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * index;
      }

      const nextTransform: CardTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };
      const previous = lastTransformsRef.current.get(index);
      const changed = !previous
        || Math.abs(previous.translateY - nextTransform.translateY) > 0.1
        || Math.abs(previous.scale - nextTransform.scale) > 0.001
        || Math.abs(previous.rotation - nextTransform.rotation) > 0.1
        || Math.abs(previous.blur - nextTransform.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        card.style.filter = nextTransform.blur > 0 ? `blur(${nextTransform.blur}px)` : "";
        lastTransformsRef.current.set(index, nextTransform);
      }

      if (index === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    baseScale,
    blurAmount,
    calculateProgress,
    getElementOffset,
    getScrollData,
    itemScale,
    itemStackDistance,
    onStackComplete,
    parsePercentage,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
    if (useWindowScroll) ScrollTrigger.update();
  }, [updateCardTransforms, useWindowScroll]);

  const setupLenis = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const content = scroller.querySelector<HTMLElement>(".scroll-stack-inner");
    const lenis = new Lenis(useWindowScroll ? {
      duration: 1.2,
      easing: value => Math.min(1, 1.001 - 2 ** (-10 * value)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      anchors: true,
    } : {
      wrapper: scroller,
      content: content ?? undefined,
      duration: 1.2,
      easing: value => Math.min(1, 1.001 - 2 ** (-10 * value)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchInertiaExponent: 1.7,
    });

    lenis.on("scroll", handleScroll);
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>(".scroll-stack-card"));
    cardsRef.current = cards;
    const transformCache = lastTransformsRef.current;

    cards.forEach((card, index) => {
      if (index < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
      card.style.perspective = "1000px";
    });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      setupLenis();
      updateCardTransforms();
    }

    const handleResize = () => {
      if (resizeFrameRef.current !== null) cancelAnimationFrame(resizeFrameRef.current);
      resizeFrameRef.current = requestAnimationFrame(() => {
        lenisRef.current?.resize();
        updateCardTransforms();
        if (useWindowScroll) ScrollTrigger.refresh();
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      if (resizeFrameRef.current !== null) cancelAnimationFrame(resizeFrameRef.current);
      lenisRef.current?.destroy();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformCache.clear();
      isUpdatingRef.current = false;
      resizeFrameRef.current = null;
    };
  }, [
    baseScale,
    blurAmount,
    itemDistance,
    itemScale,
    itemStackDistance,
    onStackComplete,
    rotationAmount,
    scaleDuration,
    scaleEndPosition,
    setupLenis,
    stackPosition,
    updateCardTransforms,
    useWindowScroll,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}

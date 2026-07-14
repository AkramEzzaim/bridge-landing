"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const CarouselArrow = ({ direction }: { direction: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
    <path
      d={direction === "left" ? "M19 12H6m5-5-5 5 5 5" : "M5 12h13m-5-5 5 5-5 5"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function BenefitsCarousel({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemCount = Children.count(children);
  const [visibleItems, setVisibleItems] = useState(4);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = Math.max(0, itemCount - visibleItems);

  const goTo = useCallback((requestedIndex: number, smooth = true) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const lastIndex = Math.max(0, itemCount - visibleItems);
    const nextIndex = requestedIndex > lastIndex ? 0 : requestedIndex < 0 ? lastIndex : requestedIndex;
    const item = viewport.children[nextIndex] as HTMLElement | undefined;
    if (!item) return;
    viewport.scrollTo({
      left: item.offsetLeft,
      behavior: smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto",
    });
    setActiveIndex(nextIndex);
  }, [itemCount, visibleItems]);

  useEffect(() => {
    const updateVisibleItems = () => {
      const count = window.innerWidth < 640 ? 1 : window.innerWidth < 900 ? 2 : 4;
      setVisibleItems(count);
      setActiveIndex((current) => Math.min(current, Math.max(0, itemCount - count)));
    };
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, [itemCount]);

  useEffect(() => {
    goTo(Math.min(activeIndex, maxIndex), false);
  }, [activeIndex, goTo, maxIndex, visibleItems]);

  const updateIndexFromScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const items = Array.from(viewport.children) as HTMLElement[];
    const nearestIndex = items.reduce((nearest, item, index) =>
      Math.abs(item.offsetLeft - viewport.scrollLeft) < Math.abs(items[nearest].offsetLeft - viewport.scrollLeft) ? index : nearest, 0);
    setActiveIndex(Math.min(nearestIndex, maxIndex));
  };

  return (
    <div className="benefits-carousel" role="region" aria-roledescription="carousel" aria-label="Children program benefits">
      <div ref={viewportRef} className="children-benefits" onScroll={updateIndexFromScroll}>
        {children}
      </div>

      {maxIndex > 0 && (
        <div className="benefits-carousel-controls">
          <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Previous benefits">
            <CarouselArrow direction="left" />
          </button>
          <div className="benefits-carousel-dots" aria-label="Choose carousel page">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                type="button"
                key={index}
                className={activeIndex === index ? "active" : ""}
                onClick={() => goTo(index)}
                aria-label={`Go to benefit ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
              />
            ))}
          </div>
          <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Next benefits">
            <CarouselArrow direction="right" />
          </button>
        </div>
      )}
    </div>
  );
}

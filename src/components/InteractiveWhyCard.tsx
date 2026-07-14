"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

type InteractiveWhyCardProps = {
  children: ReactNode;
  className?: string;
  hoverLabel?: string;
};

type PointerSnapshot = {
  x: number;
  y: number;
  shineX: number;
  shineY: number;
};

export default function InteractiveWhyCard({
  children,
  className = "",
  hoverLabel = "Learn More",
}: InteractiveWhyCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const animationFrame = useRef<number | null>(null);
  const pendingPointer = useRef<PointerSnapshot | null>(null);

  const applyPointer = () => {
    const card = cardRef.current;
    const pointer = pendingPointer.current;
    animationFrame.current = null;
    if (!card || !pointer) return;

    card.style.setProperty("--pointer-x", `${pointer.x}px`);
    card.style.setProperty("--pointer-y", `${pointer.y}px`);
    card.style.setProperty("--shine-x", `${pointer.shineX}%`);
    card.style.setProperty("--shine-y", `${pointer.shineY}%`);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;

    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const rawX = event.clientX - bounds.left;
    const rawY = event.clientY - bounds.top;
    const x = Math.min(Math.max(rawX, 72), bounds.width - 72);
    const y = Math.min(Math.max(rawY, 24), bounds.height - 24);
    pendingPointer.current = {
      x,
      y,
      shineX: Math.min(Math.max((rawX / bounds.width) * 100, 0), 100),
      shineY: Math.min(Math.max((rawY / bounds.height) * 100, 0), 100),
    };

    if (animationFrame.current === null) {
      animationFrame.current = requestAnimationFrame(applyPointer);
    }
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
    pendingPointer.current = null;

    card.style.setProperty("--shine-x", "50%");
    card.style.setProperty("--shine-y", "50%");
  };

  useEffect(() => () => {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
  }, []);

  return (
    <article
      ref={cardRef}
      className={`why-card ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span className="why-card-hover-marker" aria-hidden="true">
        <span className="why-card-hover-label">{hoverLabel}</span>
        <span className="why-card-hover-line" />
        <span className="why-card-hover-dot" />
      </span>
      <div className="why-card-inner">{children}</div>
    </article>
  );
}

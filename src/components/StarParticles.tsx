"use client";

import { useEffect, useRef } from "react";

type StarParticlesProps = {
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  depth: number;
  speedX: number;
  speedY: number;
  phase: number;
  twinkleSpeed: number;
  glint: boolean;
};

export default function StarParticles({ className = "" }: StarParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !container || !context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let frame = 0;
    let previousTime = performance.now();
    let pointerInside = false;
    let pointerX = 0;
    let pointerY = 0;
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let offsetX = 0;
    let offsetY = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const createParticles = () => {
      const count = Math.min(300, Math.max(145, Math.round((width * height) / 5200)));
      particles = Array.from({ length: count }, (_, index) => {
        const depth = 0.25 + Math.random() * 0.75;
        return {
          x: Math.random() * width,
          y: Math.random() * height * 0.78,
          size: 0.65 + Math.random() * 1.8 * depth,
          alpha: 0.46 + Math.random() * 0.5,
          depth,
          speedX: (Math.random() - 0.5) * 0.055,
          speedY: 0.018 + Math.random() * 0.045,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.0007 + Math.random() * 0.0015,
          glint: index % 29 === 0,
        };
      });
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerInside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!pointerInside) {
        targetOffsetX = 0;
        targetOffsetY = 0;
        return;
      }

      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      targetOffsetX = ((pointerX / width) - 0.5) * 34;
      targetOffsetY = ((pointerY / height) - 0.5) * 24;
    };

    const onPointerLeave = () => {
      pointerInside = false;
      targetOffsetX = 0;
      targetOffsetY = 0;
    };

    const draw = (time: number) => {
      const delta = Math.min(32, time - previousTime);
      previousTime = time;
      offsetX += (targetOffsetX - offsetX) * 0.045;
      offsetY += (targetOffsetY - offsetY) * 0.045;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "screen";

      for (const particle of particles) {
        if (!reduceMotion) {
          particle.x += particle.speedX * delta;
          particle.y += particle.speedY * delta;
        }

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y > height * 0.82) particle.y = -10;

        let x = particle.x + offsetX * particle.depth;
        let y = particle.y + offsetY * particle.depth;

        if (pointerInside && !reduceMotion) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          const distance = Math.hypot(dx, dy);
          const radius = 125;
          if (distance > 0 && distance < radius) {
            const force = (1 - distance / radius) * 18 * particle.depth;
            x += (dx / distance) * force;
            y += (dy / distance) * force;
          }
        }

        const twinkle = reduceMotion ? 1 : 0.82 + Math.sin(time * particle.twinkleSpeed + particle.phase) * 0.18;
        const alpha = particle.alpha * twinkle;
        const size = particle.size * (particle.glint ? 1.2 : 1);

        context.beginPath();
        context.fillStyle = `rgba(218, 232, 255, ${alpha})`;
        context.arc(x, y, size, 0, Math.PI * 2);
        context.fill();

        if (particle.glint) {
          const length = 5 + size * 3;
          const gradient = context.createRadialGradient(x, y, 0, x, y, length);
          gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          context.strokeStyle = gradient;
          context.lineWidth = 0.8;
          context.beginPath();
          context.moveTo(x - length, y);
          context.lineTo(x + length, y);
          context.moveTo(x, y - length);
          context.lineTo(x, y + length);
          context.stroke();
        }
      }

      context.globalCompositeOperation = "source-over";
      frame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onPointerLeave);
    resize();
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={`star-particles ${className}`.trim()} aria-hidden="true" />;
}

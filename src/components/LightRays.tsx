"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./LightRays.css";

type RaysOrigin = "top-center" | "top-left" | "top-right" | "left" | "right" | "bottom-center" | "bottom-left" | "bottom-right";

type LightRaysProps = {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
};

const hexToRgb = (hex: string) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match
    ? [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255]
    : [1, 1, 1];
};

const getAnchorAndDir = (origin: RaysOrigin, width: number, height: number) => {
  const outside = 0.2;
  const positions: Record<RaysOrigin, { anchor: number[]; dir: number[] }> = {
    "top-left": { anchor: [0, -outside * height], dir: [0, 1] },
    "top-center": { anchor: [0.5 * width, -outside * height], dir: [0, 1] },
    "top-right": { anchor: [width, -outside * height], dir: [0, 1] },
    left: { anchor: [-outside * width, 0.5 * height], dir: [1, 0] },
    right: { anchor: [(1 + outside) * width, 0.5 * height], dir: [-1, 0] },
    "bottom-left": { anchor: [0, (1 + outside) * height], dir: [0, -1] },
    "bottom-center": { anchor: [0.5 * width, (1 + outside) * height], dir: [0, -1] },
    "bottom-right": { anchor: [width, (1 + outside) * height], dir: [0, -1] },
  };
  return positions[origin];
};

const vertex = `
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = `
precision highp float;
uniform float iTime;
uniform vec2 iResolution, rayPos, rayDir, mousePos;
uniform vec3 raysColor;
uniform float raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, mouseInfluence, noiseAmount, distortion;

float noise(vec2 st) { return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123); }

float rayStrength(vec2 source, vec2 referenceDir, vec2 coord, float seedA, float seedB, float speed) {
  vec2 delta = coord - source;
  vec2 normalizedDir = normalize(delta);
  float cosine = dot(normalizedDir, referenceDir);
  float angle = cosine + distortion * sin(iTime * 2.0 + length(delta) * 0.01) * 0.2;
  float spread = pow(max(angle, 0.0), 1.0 / max(lightSpread, 0.001));
  float distanceFromSource = length(delta);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distanceFromSource) / maxDistance, 0.0, 1.0);
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distanceFromSource) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? 0.8 + 0.2 * sin(iTime * speed * 3.0) : 1.0;
  float strength = clamp((0.45 + 0.15 * sin(angle * seedA + iTime * speed)) + (0.3 + 0.2 * cos(-angle * seedB + iTime * speed)), 0.0, 1.0);
  return strength * lengthFalloff * fadeFalloff * spread * pulse;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
  vec2 finalDir = rayDir;
  if (mouseInfluence > 0.0) finalDir = normalize(mix(rayDir, normalize(mousePos * iResolution - rayPos), mouseInfluence));
  vec4 color = vec4(1.0) * rayStrength(rayPos, finalDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed) * 0.5;
  color += vec4(1.0) * rayStrength(rayPos, finalDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed) * 0.4;
  if (noiseAmount > 0.0) color.rgb *= 1.0 - noiseAmount + noiseAmount * noise(coord * 0.01 + iTime * 0.1);
  float brightness = 1.0 - coord.y / iResolution.y;
  color.rgb *= vec3(0.1 + brightness * 0.8, 0.3 + brightness * 0.6, 0.5 + brightness * 0.5);
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, saturation) * raysColor;
  gl_FragColor = color;
}
`;

export default function LightRays({
  raysOrigin = "top-center", raysColor = "#ffffff", raysSpeed = 1, lightSpread = 1,
  rayLength = 2, pulsating = false, fadeDistance = 1, saturation = 1,
  followMouse = true, mouseInfluence = 0.1, noiseAmount = 0, distortion = 0,
  className = "",
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    const uniforms = {
      iTime: { value: 0 }, iResolution: { value: [1, 1] }, rayPos: { value: [0, 0] }, rayDir: { value: [0, 1] },
      raysColor: { value: hexToRgb(raysColor) }, raysSpeed: { value: raysSpeed }, lightSpread: { value: lightSpread },
      rayLength: { value: rayLength }, pulsating: { value: pulsating ? 1 : 0 }, fadeDistance: { value: fadeDistance },
      saturation: { value: saturation }, mousePos: { value: [0.5, 0.5] }, mouseInfluence: { value: mouseInfluence },
      noiseAmount: { value: noiseAmount }, distortion: { value: distortion },
    };
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program: new Program(gl, { vertex, fragment, uniforms }) });
    let animationId = 0;
    let targetMouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { ...targetMouse };

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      const dpr = renderer.dpr;
      uniforms.iResolution.value = [width * dpr, height * dpr];
      const placement = getAnchorAndDir(raysOrigin, width * dpr, height * dpr);
      uniforms.rayPos.value = placement.anchor;
      uniforms.rayDir.value = placement.dir;
    };
    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
    };
    const render = (time: number) => {
      uniforms.iTime.value = time * 0.001;
      smoothMouse.x = smoothMouse.x * 0.92 + targetMouse.x * 0.08;
      smoothMouse.y = smoothMouse.y * 0.92 + targetMouse.y * 0.08;
      uniforms.mousePos.value = [smoothMouse.x, smoothMouse.y];
      renderer.render({ scene: mesh });
      animationId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    if (followMouse) window.addEventListener("mousemove", onMouseMove);
    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, [raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion]);

  return <div ref={containerRef} className={`light-rays-container ${className}`.trim()} aria-hidden="true" />;
}

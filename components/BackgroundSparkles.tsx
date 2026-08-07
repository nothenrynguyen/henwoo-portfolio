"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  size: number;
  hue: number;
};

// Deterministic random values keep the composition stable between visits while
// the canvas-only render avoids producing random server markup.
function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export default function BackgroundSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const random = seededRandom(26082026);
    const particleCount = window.innerWidth < 768 ? 52 : 92;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: (random() - 0.5) * 2.4,
      y: (random() - 0.5) * 1.7,
      z: 0.18 + random() * 0.82,
      size: 0.45 + random() * 1.35,
      hue: random() > 0.78 ? 168 : random() > 0.44 ? 220 : 240,
    }));

    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    let drift = 0;
    let visible = !document.hidden;
    let targetX = 0;
    let targetY = 0;
    let cameraX = 0;
    let cameraY = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(
        width * (0.18 + cameraX * 0.015),
        height * (0.18 + cameraY * 0.015),
        0,
        width * 0.2,
        height * 0.2,
        Math.max(width, height) * 0.72
      );
      glow.addColorStop(0, "rgba(64, 84, 180, 0.13)");
      glow.addColorStop(0.42, "rgba(24, 31, 90, 0.07)");
      glow.addColorStop(1, "rgba(8, 8, 10, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const projected = particles.map((particle, index) => {
        const depth = 0.38 + particle.z * 1.45;
        const angle = drift * (0.16 + particle.z * 0.13) + index * 0.002;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rotatedX = particle.x * cos - particle.y * sin;
        const rotatedY = particle.x * sin + particle.y * cos;
        return {
          x: width * 0.5 + (rotatedX + cameraX * 0.075 * particle.z) * width * 0.48 * depth,
          y: height * 0.5 + (rotatedY + cameraY * 0.055 * particle.z) * height * 0.64 * depth,
          radius: particle.size * (0.52 + particle.z * 1.15),
          alpha: 0.16 + particle.z * 0.5,
          hue: particle.hue,
          z: particle.z,
        };
      });

      // A few quiet constellation lines create depth without a heavy WebGL scene.
      context.lineWidth = 0.55;
      for (let i = 0; i < projected.length; i += 1) {
        const point = projected[i];
        if (point.z < 0.55) continue;
        for (let j = i + 1; j < Math.min(i + 10, projected.length); j += 1) {
          const next = projected[j];
          const distance = Math.hypot(point.x - next.x, point.y - next.y);
          if (distance < 112) {
            context.strokeStyle = `rgba(116, 139, 255, ${0.055 * (1 - distance / 112)})`;
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(next.x, next.y);
            context.stroke();
          }
        }
      }

      projected.forEach((point) => {
        if (point.x < -8 || point.x > width + 8 || point.y < -8 || point.y > height + 8) return;
        if (point.radius > 1.35) {
          const halo = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius * 5);
          halo.addColorStop(0, `hsla(${point.hue}, 95%, 80%, ${point.alpha * 0.42})`);
          halo.addColorStop(1, `hsla(${point.hue}, 95%, 70%, 0)`);
          context.fillStyle = halo;
          context.beginPath();
          context.arc(point.x, point.y, point.radius * 5, 0, Math.PI * 2);
          context.fill();
        }
        context.fillStyle = `hsla(${point.hue}, 90%, 88%, ${point.alpha})`;
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fill();
      });

      const vignette = context.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.16,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.78
      );
      vignette.addColorStop(0, "rgba(8, 8, 10, 0)");
      vignette.addColorStop(1, "rgba(8, 8, 10, 0.56)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      if (!reducedMotion.matches && visible) {
        const elapsed = Math.min(time - previousTime, 50);
        previousTime = time;
        drift += elapsed * 0.000018;
        cameraX += (targetX - cameraX) * 0.035;
        cameraY += (targetY - cameraY) * 0.035;
        frame = window.requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) return;
      targetX = (event.clientX / width - 0.5) * 2;
      targetY = (event.clientY / height - 0.5) * 2;
    };

    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible && !reducedMotion.matches) {
        previousTime = performance.now();
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
      }
    };

    const restart = () => {
      cancelAnimationFrame(frame);
      resize();
      previousTime = performance.now();
      draw(previousTime);
    };

    resize();
    window.addEventListener("resize", restart, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", restart);
    draw(performance.now());

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", restart);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", restart);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="background-canvas" />;
}

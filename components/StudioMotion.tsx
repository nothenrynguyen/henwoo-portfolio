"use client";

import { useEffect, useRef } from "react";

export default function StudioMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px)");
    const objects = Array.from(document.querySelectorAll<HTMLElement>(".floating"));
    const projects = Array.from(document.querySelectorAll<HTMLElement>(".project"));
    // State changes trigger time-based transitions, independent of scroll position.
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        (entry.target as HTMLElement).dataset.scene = entry.isIntersecting ? "focused" : "resting";
      }
    }, { threshold: 0.18, rootMargin: "-5% 0px -5% 0px" });
    projects.forEach(project => observer.observe(project));
    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let previousTime = 0;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    // Deterministic positions keep the field stable across reloads.
    const points = Array.from({ length: 100 }, (_, i) => ({
      x: Math.sin(i * 127.1 + 3) * 1800,
      y: Math.cos(i * 311.7 + 7) * 1250,
      z: ((i * 317) % 2200) + 100,
      size: i % 9 === 0 ? 1.8 : 0.8,
    }));
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (time: number) => {
      frame = 0;
      if (time - previousTime < 32 && !media.matches) {
        frame = requestAnimationFrame(draw);
        return;
      }
      previousTime = time;
      const reduced = media.matches;
      currentX += ((reduced ? 0 : pointerX) - currentX) * 0.06;
      currentY += ((reduced ? 0 : pointerY) - currentY) * 0.06;
      const travel = reduced ? 0 : window.scrollY * 0.55;
      const drift = reduced ? 0 : time * 0.006;
      context.clearRect(0, 0, width, height);
      const focal = Math.min(width, 1200) * 0.7;
      const project = (x: number, y: number, z: number) => {
        const scale = focal / (z + 350);
        return { x: width / 2 + (x - currentX * 90) * scale, y: height / 2 + (y - currentY * 70) * scale, scale };
      };
      for (const point of points) {
        const z = ((point.z - travel - drift) % 2200 + 2200) % 2200;
        const p = project(point.x, point.y, z);
        const opacity = Math.min(z / 180, 1) * (0.15 + (1 - z / 2200) * 0.5);
        context.fillStyle = `rgba(192,168,255,${opacity})`;
        context.beginPath();
        context.arc(p.x, p.y, Math.max(0.45, point.size * p.scale), 0, Math.PI * 2);
        context.fill();
      }
      // Broken orbital rings occupy the distant layers of the same 3D field.
      for (let ring = 0; ring < 5; ring++) {
        const z = ((ring * 470 + 350 - travel * 0.5) % 2400 + 2400) % 2400;
        const centerX = Math.sin(ring * 4.1) * 950;
        const centerY = Math.cos(ring * 3.7) * 700;
        const rotation = ring * 0.7 + (reduced ? 0 : time * 0.000025);
        context.strokeStyle = `rgba(152,110,244,${0.07 + (1 - z / 2400) * 0.16})`;
        context.lineWidth = 0.8;
        context.beginPath();
        for (let step = 0; step <= 70; step++) {
          const angle = (step / 70) * Math.PI * 1.85;
          const x = Math.cos(angle) * 330;
          const y = Math.sin(angle) * 330;
          const p = project(centerX + x * Math.cos(rotation) - y * 0.35 * Math.sin(rotation), centerY + x * Math.sin(rotation) + y * 0.35 * Math.cos(rotation), z + Math.sin(angle) * 80);
          if (step === 0) context.moveTo(p.x, p.y); else context.lineTo(p.x, p.y);
        }
        context.stroke();
      }
      const bounds = objects.map(object => object.getBoundingClientRect());
      objects.forEach((object, index) => {
        const rect = bounds[index];
        const progress = Math.max(-1.4, Math.min(1.4, (height * 0.52 - (rect.top + rect.height / 2)) / height));
        const active = !reduced && !mobile.matches;
        object.style.setProperty("--scene-z", `${active ? progress * (object.classList.contains("project-visual") ? 280 : 140) : 0}px`);
        object.style.setProperty("--scene-tilt", `${active ? progress * -5 : 0}deg`);
        object.style.setProperty("--pointer-x", `${active ? currentX * 2 : 0}deg`);
        object.style.setProperty("--pointer-y", `${active ? currentY * -2 : 0}deg`);
        if (object.dataset.depth) {
          object.style.setProperty("--drift", `${active ? Math.min(window.scrollY, height * 1.5) * Number(object.dataset.depth) : 0}px`);
        }
      });
      if (!reduced && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const start = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const onPointer = (event: PointerEvent) => {
      pointerX = event.clientX / width - 0.5;
      pointerY = event.clientY / height - 0.5;
      start();
    };
    const onResize = () => { resize(); start(); };
    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start();
    };
    resize();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    media.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      projects.forEach(project => delete project.dataset.scene);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", start);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener("change", start);
    };
  }, []);

  return <div className="space-backdrop" aria-hidden="true"><div className="space-haze" /><canvas ref={canvasRef} /><div className="space-vignette" /></div>;
}

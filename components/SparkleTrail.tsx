"use client";

import { useEffect, useRef, useCallback } from "react";

// sparkle type
interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
}

export default function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const lastSpawnTime = useRef(0);
  const frameRef = useRef<number>(0);

  // create sparkle
  const createSparkle = useCallback((x: number, y: number): Sparkle => {
    const maxLife = 40 + Math.random() * 25; // lives longer

    return {
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        size: 1.2 + Math.random() * 1.8,
        opacity: 0.6 + Math.random() * 0.3,
        vx: (Math.random() - 0.5) * 0.6,  // slight sideways drift
        vy: 0.6 + Math.random() * 1.0,    // falls faster
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        life: 0,
        maxLife,
    };
    }, []);

  // draw star
  const drawStar = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const outerX = Math.cos(angle) * size;
        const outerY = Math.sin(angle) * size;
        const innerAngle = angle + Math.PI / 4;
        const innerX = Math.cos(innerAngle) * size * 0.35;
        const innerY = Math.sin(innerAngle) * size * 0.35;

        if (i === 0) ctx.moveTo(outerX, outerY);
        else ctx.lineTo(outerX, outerY);

        ctx.lineTo(innerX, innerY);
      }

      ctx.closePath();
      ctx.fillStyle = "#7ef5d4"; // softer color
      ctx.fill();
      ctx.restore();
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const now = Date.now();

      // require real movement + throttle spawn
      if (distance > 8 && now - lastSpawnTime.current > 25) {
        sparklesRef.current.push(createSparkle(e.clientX, e.clientY));
        lastMouseRef.current = { x: e.clientX, y: e.clientY };
        lastSpawnTime.current = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const MAX_SPARKLES = 100;
      if (sparklesRef.current.length > MAX_SPARKLES) {
        sparklesRef.current.splice(
          0,
          sparklesRef.current.length - MAX_SPARKLES
        );
      }

      sparklesRef.current = sparklesRef.current.filter((s) => {
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotationSpeed;

        const progress = s.life / s.maxLife;
        const currentOpacity = s.opacity * (1 - progress);
        const currentSize = s.size * (1 - progress * 0.5);

        if (currentOpacity <= 0) return false;

        drawStar(ctx, s.x, s.y, currentSize, s.rotation, currentOpacity);
        return true;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [createSparkle, drawStar]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 50,
      }}
    />
  );
}

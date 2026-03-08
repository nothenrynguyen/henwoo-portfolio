"use client";
import React, { useEffect, useState, useRef } from "react";

// 0 = far (slowest parallax), 1 = mid, 2 = near (fastest)
type Layer = 0 | 1 | 2;

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  maxOpacity: number;
  minOpacity: number;
  duration: number; // twinkle cycle seconds
  delay: number;    // negative = already mid-cycle on mount
  blur: number;
  layer: Layer;
  color: string;
}

const STAR_COLORS = ["#ccd6f6", "#b0b8d4", "#a8b2d1", "#9ba5c8", "#8892b0"];
const STAR_COUNT = 85;
// px of parallax shift per normalised mouse axis unit (-1…1)
const LAYER_STRENGTH: [number, number, number] = [4, 9, 16];

function randomStar(): Star {
  const layer = Math.floor(Math.random() * 3) as Layer;
  const maxOpacity = 0.15 + Math.random() * 0.65;
  return {
    id: Math.random(),
    left: Math.random() * 100,
    top: Math.random() * 100,
    size:
      layer === 0
        ? 0.5 + Math.random() * 0.8   // far: 0.5–1.3 px
        : layer === 1
        ? 0.8 + Math.random() * 1.2   // mid: 0.8–2 px
        : 1.2 + Math.random() * 1.6,  // near: 1.2–2.8 px
    maxOpacity,
    minOpacity: maxOpacity * (0.05 + Math.random() * 0.2),
    duration: 4 + Math.random() * 11, // 4–15 s twinkling cycle
    delay: -(Math.random() * 15),     // stagger — already in progress on mount
    blur: Math.random() < 0.25 ? 0.4 + Math.random() * 0.9 : 0,
    layer,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
  };
}

export default function BackgroundSparkles() {
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: STAR_COUNT }, randomStar)
  );

  // One wrapper div per layer; shifted directly via RAF (no React re-renders)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,   // -1 … 1
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.04);
      current.current.y = lerp(current.current.y, target.current.y, 0.04);
      const { x, y } = current.current;
      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const s = LAYER_STRENGTH[i];
        el.style.transform = `translate(${x * s}px, ${y * s}px)`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const layers: Star[][] = [[], [], []];
  stars.forEach((s) => layers[s.layer].push(s));

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100vw", height: "100vh" }}
    >
      {([0, 1, 2] as const).map((layerIdx) => (
        <div
          key={layerIdx}
          ref={(el) => { layerRefs.current[layerIdx] = el; }}
          style={{ position: "absolute", inset: 0, willChange: "transform" }}
        >
          {layers[layerIdx].map((star) => (
            <span
              key={star.id}
              style={{
                position: "absolute",
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                borderRadius: "50%",
                background: star.color,
                filter: star.blur > 0 ? `blur(${star.blur}px)` : undefined,
                boxShadow:
                  star.size > 1.6
                    ? `0 0 ${(star.size * 1.8).toFixed(1)}px 0.5px ${star.color}55`
                    : undefined,
                animation: `twinkleStar ${star.duration}s ${star.delay}s ease-in-out infinite`,
                ["--hi" as string]: star.maxOpacity,
                ["--lo" as string]: star.minOpacity,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}

      <style>{`
        @keyframes twinkleStar {
          0%   { opacity: var(--lo); }
          40%  { opacity: var(--hi); }
          60%  { opacity: var(--hi); }
          100% { opacity: var(--lo); }
        }
      `}</style>
    </div>
  );
}

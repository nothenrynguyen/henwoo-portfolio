"use client";
import React, { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
}

const SPARKLE_COLORS = ["#ccd6f6", "#8892b0", "#7b68ee", "#8a2be2"];
const SPARKLE_COUNT = 40;

function randomSparkle(): Sparkle {
  return {
    id: Math.random(),
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random(), // 1–2px
    opacity: 0.2 + Math.random() * 0.2, // 0.2–0.4
  duration: 5 + Math.random() * 3, // 5–8s fade
  };
}

export default function BackgroundSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Initial sparkles
    setSparkles(Array.from({ length: SPARKLE_COUNT }, randomSparkle));
    // Passive sparkle animation
    const interval = setInterval(() => {
      setSparkles((prev) => {
        const newSparkle = randomSparkle();
        // Replace a random sparkle
        const idx = Math.floor(Math.random() * prev.length);
        const updated = [...prev];
        updated[idx] = newSparkle;
        return updated;
      });
  }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100vw", height: "100vh" }}
    >
      {sparkles.map((sparkle, i) => (
        <span
          key={sparkle.id}
          style={{
            position: "absolute",
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            borderRadius: "50%",
            background: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
            opacity: sparkle.opacity,
            boxShadow: `0 0 2px 1px ${SPARKLE_COLORS[i % SPARKLE_COLORS.length]}`,
            animation: `fadeSparkle ${sparkle.duration}s linear`,
            zIndex: 0,
          }}
        />
      ))}
      <style>{`
        @keyframes fadeSparkle {
          0% { opacity: 1; }
          80% { opacity: 0.3; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

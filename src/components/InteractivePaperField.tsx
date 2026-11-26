"use client";

import React, { useEffect, useRef } from "react";
import { useAppContext } from "./SmoothScrollProvider";

interface Dot {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Interactive tactile drafting-paper dot-matrix field.
 * Monochrome ink dots ripple subtly away from the cursor with spring physics.
 */
export function InteractivePaperField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useAppContext();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let rafId = 0;

    const buildGrid = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gap = width < 640 ? 28 : 30;
      const nextDots: Dot[] = [];
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          nextDots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
        }
      }
      dots = nextDots;
    };

    buildGrid();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", buildGrid);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = themeRef.current === "dark";
      const baseColor = isDark ? "rgba(244, 242, 236, 0.14)" : "rgba(20, 20, 19, 0.12)";
      const accentColor = isDark ? "#EB5E37" : "#E04E26";

      const radius = 115;
      const stiffness = 0.085;
      const damping = 0.78;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let distRatio = 0;

        if (mouse.active) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius && dist > 0.001) {
            const force = (1 - dist / radius) * 2.1;
            d.vx += (dx / dist) * force;
            d.vy += (dy / dist) * force;
            distRatio = 1 - dist / radius;
          }
        }

        d.vx += (d.ox - d.x) * stiffness;
        d.vy += (d.oy - d.y) * stiffness;
        d.vx *= damping;
        d.vy *= damping;
        d.x += d.vx;
        d.y += d.vy;

        ctx.beginPath();
        const dotSize = 1.05 + distRatio * 1.15;
        ctx.arc(d.x, d.y, dotSize, 0, Math.PI * 2);
        if (distRatio > 0.35) {
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = 0.25 + distRatio * 0.55;
        } else {
          ctx.fillStyle = baseColor;
          ctx.globalAlpha = 1;
        }
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", buildGrid);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

/**
 * Magnetic wrapper: subtly pulls CTA pills toward the pointer and springs back cleanly.
 */
export function Magnetic({
  children,
  strength = 0.24,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 20 });
  const y = useSpring(rawY, { stiffness: 320, damping: 20 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    rawX.set(dx * strength);
    rawY.set(dy * strength);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x, y }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Tactile 3D Paper Tilt Card with subtle monochrome cotton-paper sheen (zero rainbow gradients).
 */
export function TiltPaperCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const sheenOpacity = useMotionValue(0);

  const springRotX = useSpring(rotX, { stiffness: 260, damping: 24 });
  const springRotY = useSpring(rotY, { stiffness: 260, damping: 24 });
  const springSheen = useSpring(sheenOpacity, { stiffness: 240, damping: 26 });

  const sheenBg = useMotionTemplate`radial-gradient(360px circle at ${spotX}% ${spotY}%, rgba(224, 78, 38, 0.08), transparent 68%)`;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotX.set((0.5 - py) * 6);
    rotY.set((px - 0.5) * 6);
    spotX.set(px * 100);
    spotY.set(py * 100);
    sheenOpacity.set(1);
  };

  const handleLeave = () => {
    rotX.set(0);
    rotY.set(0);
    sheenOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onClick={onClick}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformPerspective: 1000,
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`relative ${className}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: sheenBg, opacity: springSheen }}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      />
      {children}
    </motion.div>
  );
}

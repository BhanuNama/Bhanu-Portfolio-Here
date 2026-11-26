"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";
import { TiltPaperCard } from "./Magnetic";

export function ExperienceSection() {
  const role = EXPERIENCE[0];
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.pointerType !== "mouse") return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleLeave = () => {
    mouseX.set(-300);
    mouseY.set(-300);
  };

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(224, 78, 38, 0.08), transparent 72%)`;

  return (
    <section id="experience" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Clean Editorial Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-hairline)] pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              <span className="text-[var(--accent)]">02</span>
              <span>/</span>
              <span>Experience</span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[var(--ink-primary)] sm:text-5xl"
              >
                Currently at{" "}
                <span className="font-serif font-normal italic text-[var(--accent)]">
                  TCS.
                </span>
              </motion.h2>
            </div>
          </div>

          <span className="font-mono text-xs text-[var(--ink-secondary)]">
            {role.period} · {role.location}
          </span>
        </div>

        {/* Clean Single Editorial Experience Spread */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <TiltPaperCard className="rounded-[28px]">
            <div
              ref={cardRef}
              onPointerMove={handleMove}
              onPointerLeave={handleLeave}
              className="group relative overflow-hidden rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)] transition-colors hover:border-[var(--border-strong)] sm:p-10"
            >
              {/* Soft Cursor Spotlight */}
              <motion.div
                aria-hidden="true"
                style={{ background: spotlight }}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Subtle Architectural Drafting Arc Watermark */}
              <svg
                viewBox="0 0 240 240"
                className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 opacity-[0.07] transition-transform duration-700 group-hover:rotate-12"
                aria-hidden="true"
              >
                <circle
                  cx="120"
                  cy="120"
                  r="96"
                  fill="none"
                  stroke="var(--ink-primary)"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="64"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                />
                <circle cx="120" cy="24" r="3" fill="var(--accent)" />
              </svg>

              <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                {/* Left: Only User-Provided Experience Details */}
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--ink-primary)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3 py-1 font-mono text-[11px] text-[var(--ink-secondary)]">
                      <Calendar className="h-3 w-3 text-[var(--ink-muted)]" />
                      {role.period}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--ink-muted)]">
                      <MapPin className="h-3 w-3" />
                      {role.location}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-3xl font-bold tracking-[-0.03em] text-[var(--ink-primary)] sm:text-4xl">
                      {role.company}
                    </h3>
                    <span className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--accent)]">
                      {role.shortName}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-[var(--accent)]" />
                    <p className="font-serif text-xl italic text-[var(--ink-secondary)] sm:text-2xl">
                      {role.role}
                    </p>
                  </div>
                </div>

                {/* Right: Minimal Forward-Flow Kinetic Timeline */}
                <div className="w-full shrink-0 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 md:w-[290px]">
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--ink-muted)]">
                    <span>MAY 2026</span>
                    <span className="font-semibold text-[var(--accent)]">PRESENT</span>
                  </div>

                  <svg
                    viewBox="0 0 240 28"
                    className="mt-3 h-7 w-full"
                    aria-hidden="true"
                  >
                    <line
                      x1="10"
                      y1="14"
                      x2="230"
                      y2="14"
                      stroke="var(--border-strong)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <motion.line
                      x1="10"
                      y1="14"
                      x2="230"
                      y2="14"
                      stroke="var(--accent)"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.circle
                      cy="14"
                      r="3"
                      fill="var(--accent)"
                      animate={{
                        cx: [14, 226],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.2, 1],
                        times: [0, 0.15, 0.85, 1],
                      }}
                    />
                    <circle
                      cx="10"
                      cy="14"
                      r="4"
                      fill="var(--bg-card)"
                      stroke="var(--ink-primary)"
                      strokeWidth="1.75"
                    />
                    <motion.circle
                      cx="230"
                      cy="14"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1.2"
                      animate={{ r: [4.5, 10.5], opacity: [0.6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                    <circle cx="230" cy="14" r="4.5" fill="var(--accent)" />
                  </svg>
                </div>
              </div>
            </div>
          </TiltPaperCard>
        </motion.div>
      </div>
    </section>
  );
}

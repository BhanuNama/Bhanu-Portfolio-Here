"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { EDUCATION } from "@/data/portfolio";
import { TiltPaperCard } from "./Magnetic";

const COURSE_PILLARS = [
  "Data Structures & Algorithms",
  "Database Systems",
  "Operating Systems",
  "Applied AI & RAG",
];

export function EducationLedger() {
  const degree = EDUCATION[0];
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

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(224, 78, 38, 0.075), transparent 72%)`;

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const cgpaRatio = 8.3 / 10;

  return (
    <section id="education" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Clean Editorial Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-hairline)] pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              <span className="text-[var(--accent)]">05</span>
              <span>/</span>
              <span>Academic Foundation</span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[var(--ink-primary)] sm:text-5xl"
              >
                Where it{" "}
                <span className="font-serif font-normal italic text-[var(--accent)]">
                  started.
                </span>
              </motion.h2>
            </div>
          </div>

          <span className="font-mono text-xs text-[var(--ink-secondary)]">
            {degree.period} · {degree.location}
          </span>
        </div>

        {/* Single Flagship B.Tech Architectural Feature Card */}
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
              className="group relative overflow-hidden rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)] transition-colors hover:border-[var(--border-strong)] sm:p-9"
            >
              <motion.div
                aria-hidden="true"
                style={{ background: spotlight }}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12">
                {/* Left 8 Cols: Institution, Degree & Timeline */}
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--ink-primary)]">
                      <GraduationCap className="h-3.5 w-3.5 text-[var(--accent)]" />
                      B.Tech Computer Science
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3 py-1 font-mono text-[11px] text-[var(--ink-secondary)]">
                      <Calendar className="h-3 w-3 text-[var(--ink-muted)]" />
                      {degree.period}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--ink-muted)]">
                      <MapPin className="h-3 w-3" />
                      {degree.location}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold tracking-[-0.025em] text-[var(--ink-primary)] sm:text-4xl">
                    {degree.institution}
                  </h3>
                  <p className="mt-2 text-base font-medium text-[var(--ink-secondary)] sm:text-lg">
                    {degree.degree}
                  </p>

                  {/* Coursework Focus Pills */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {COURSE_PILLARS.map((course, idx) => (
                      <motion.span
                        key={course}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                        className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3 py-1 font-mono text-[11px] text-[var(--ink-secondary)]"
                      >
                        {course}
                      </motion.span>
                    ))}
                  </div>

                  {/* Clean 2021 -> 2025 Degree Progress Span */}
                  <div className="mt-7 max-w-md">
                    <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-[var(--ink-muted)]">
                      <span>DEC 2021 · ENROLLED</span>
                      <span className="text-[var(--accent)] font-semibold">
                        JUNE 2025 · GRADUATED
                      </span>
                    </div>
                    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-well)]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-[var(--ink-primary)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Right 4 Cols: Tactile Animated CGPA Gauge Seal */}
                <div className="flex flex-col items-center justify-center rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-6 text-center lg:col-span-4">
                  <div className="relative flex h-32 w-32 items-center justify-center">
                    <svg
                      viewBox="0 0 108 108"
                      className="h-full w-full -rotate-90"
                      aria-hidden="true"
                    >
                      <circle
                        cx="54"
                        cy="54"
                        r={radius}
                        fill="none"
                        stroke="var(--border-hairline)"
                        strokeWidth="6"
                      />
                      <motion.circle
                        cx="54"
                        cy="54"
                        r={radius}
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{
                          strokeDashoffset: circumference * (1 - cgpaRatio),
                        }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: 1.15,
                          delay: 0.15,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-bold tracking-tight text-[var(--ink-primary)]">
                        8.3
                      </span>
                      <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                        / 10 CGPA
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 font-mono text-[11px] font-medium text-[var(--ink-secondary)]">
                    B.Tech CSE · KMIT
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-[var(--ink-muted)]">
                    HYDERABAD · 2021 – 2025
                  </div>
                </div>
              </div>
            </div>
          </TiltPaperCard>
        </motion.div>
      </div>
    </section>
  );
}

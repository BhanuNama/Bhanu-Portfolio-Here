"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Moon,
  Sun,
  Volume2,
  VolumeX,
} from "lucide-react";
import { PROJECTS, ProjectItem } from "@/data/portfolio";
import { SmoothScrollProvider, useAppContext } from "./SmoothScrollProvider";
import { CaseStudyArtboard } from "./CaseStudyArtboards";
import { ProjectSimulator } from "./ProjectSimulator";
import { InteractivePaperField } from "./InteractivePaperField";
import { Magnetic, TiltPaperCard } from "./Magnetic";
import { paperSound } from "@/lib/paperSound";

function CaseStudyContent({ project }: { project: ProjectItem }) {
  const { theme, toggleTheme, soundEnabled, toggleSound } = useAppContext();
  const [activePipeStep, setActivePipeStep] = useState(0);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      setActivePipeStep((s) => (s + 1) % 4);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  const currentIdx = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  return (
    <div className="relative min-h-screen">
      {/* Top Floating Navigation Bar */}
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <Magnetic strength={0.18}>
            <Link
              href="/"
              onClick={() => paperSound.playClick()}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)]/90 px-4 py-2 text-xs font-semibold text-[var(--ink-primary)] backdrop-blur-md shadow-[var(--shadow-card)] transition-colors hover:border-[var(--ink-primary)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Portfolio</span>
            </Link>
          </Magnetic>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              aria-label="Toggle tactile sound"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)]/90 text-[var(--ink-primary)] backdrop-blur-md shadow-[var(--shadow-card)]"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)]/90 text-[var(--ink-primary)] backdrop-blur-md shadow-[var(--shadow-card)]"
            >
              {theme === "paper" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => paperSound.playClick()}
              className="hidden items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)]/90 px-4 py-2 text-xs font-semibold text-[var(--ink-primary)] backdrop-blur-md shadow-[var(--shadow-card)] transition-colors hover:border-[var(--ink-primary)] sm:inline-flex"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Source</span>
            </a>
            <Magnetic strength={0.18}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => paperSound.playCardFlick()}
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white shadow-[var(--shadow-card)] transition-transform hover:scale-[1.03]"
              >
                <span>Live App</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="mx-auto mt-1.5 max-w-6xl px-4">
          <div className="h-[1.5px] w-full overflow-hidden rounded-full bg-transparent">
            <motion.div
              style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
              className="h-full w-full bg-[var(--accent)] opacity-80"
            />
          </div>
        </div>
      </header>

      {/* Interactive Hero Monograph Header with Dot-Matrix Field */}
      <div className="relative overflow-hidden pt-28 pb-8 sm:pt-36">
        <InteractivePaperField />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-3.5 py-1.5 font-mono text-[11px] text-[var(--ink-muted)] shadow-[var(--shadow-card)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-semibold text-[var(--accent)]">{project.fig}</span>
              <span>/</span>
              <span>{project.category}</span>
              <span>·</span>
              <span>{project.repoName}</span>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 text-4xl font-bold tracking-[-0.035em] text-[var(--ink-primary)] sm:text-6xl"
              >
                {project.title}{" "}
                <span className="font-serif text-[0.92em] font-normal italic text-[var(--accent)]">
                  case study.
                </span>
              </motion.h1>
            </div>

            <p className="mt-3 text-lg font-medium text-[var(--ink-primary)] sm:text-xl">
              {project.subtitle}
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--ink-secondary)] sm:text-base">
              {project.summary}
            </p>

            {/* Tilt Metric Cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {project.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.45 }}
                >
                  <TiltPaperCard className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                      {m.label}
                    </div>
                    <div className="mt-1 text-base font-bold text-[var(--ink-primary)]">
                      {m.value}
                    </div>
                  </TiltPaperCard>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-3 py-1 font-mono text-[11px] text-[var(--ink-primary)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {/* Full-Width Interactive Museum Artboard */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <CaseStudyArtboard projectId={project.id} />
        </motion.section>

        {/* Problem vs Architecture Solution with 3D Paper Tilt */}
        <section className="mt-14 grid gap-6 md:grid-cols-2">
          <TiltPaperCard className="rounded-[26px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)]">
              01 · The Engineering Problem
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)] sm:text-base">
              {project.deepDive.challenge}
            </p>
          </TiltPaperCard>

          <TiltPaperCard className="rounded-[26px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">
              02 · Architectural Solution
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-primary)] sm:text-base">
              {project.deepDive.solution}
            </p>
          </TiltPaperCard>
        </section>

        {/* 4-Stage Animated Signal Pipeline */}
        <section className="mt-14">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              03 · End-to-End Execution Pipeline
            </span>
            <span className="font-mono text-[10px] text-[var(--accent)]">
              ACTIVE STAGE: 0{activePipeStep + 1}
            </span>
          </div>

          <div className="relative mt-5">
            {/* Horizontal Traveling Signal Line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-10 right-10 top-1/2 hidden h-[1px] -translate-y-1/2 border-t border-dashed border-[var(--border-strong)] lg:block"
            >
              <motion.div
                animate={{ left: ["0%", "98%", "0%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[3.5px] h-2 w-2 rounded-full bg-[var(--accent)]"
              />
            </div>

            <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.architecture.steps.map((step, idx) => {
                const isActive = activePipeStep === idx;
                return (
                  <motion.button
                    key={step.title}
                    type="button"
                    onClick={() => {
                      paperSound.playClick();
                      setActivePipeStep(idx);
                    }}
                    animate={{
                      y: isActive ? -4 : 0,
                      borderColor: isActive ? "var(--accent)" : "var(--border-hairline)",
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="rounded-2xl border bg-[var(--bg-card)] p-5 text-left shadow-[var(--shadow-card)]"
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className={isActive ? "font-bold text-[var(--accent)]" : "text-[var(--ink-muted)]"}>
                        0{idx + 1}
                      </span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                      )}
                    </div>
                    <div className="mt-2 text-base font-bold text-[var(--ink-primary)]">
                      {step.title}
                    </div>
                    <div className="mt-1.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                      {step.detail}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Key Engineering Decisions & Spec Sheet */}
        <section className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              04 · Key Engineering Decisions
            </div>
            <div className="mt-4 space-y-3">
              {project.deepDive.decisions.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                  whileHover={{ x: 4 }}
                  className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] transition-colors hover:border-[var(--border-strong)]"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <div>
                      <h3 className="text-sm font-bold text-[var(--ink-primary)]">
                        {d.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--ink-secondary)] sm:text-sm">
                        {d.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="min-w-0 space-y-6 lg:col-span-5">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                05 · Technical Spec Sheet
              </div>
              <div className="mt-4 divide-y divide-[var(--border-hairline)] rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-card)] px-5 shadow-[var(--shadow-card)]">
                {project.deepDive.specs.map((s) => (
                  <div key={s.label} className="py-3.5">
                    <div className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">
                      {s.label}
                    </div>
                    <div className="mt-0.5 text-xs font-semibold text-[var(--ink-primary)] sm:text-sm">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ProjectSimulator projectId={project.id} />
          </div>
        </section>

        {/* Bottom Prev / Next Project Navigation */}
        <nav
          aria-label="Project navigation"
          className="mt-16 grid gap-4 border-t border-[var(--border-hairline)] pt-10 sm:grid-cols-2"
        >
          <Link
            href={`/projects/${prevProject.id}`}
            onClick={() => paperSound.playCardFlick()}
            className="group flex items-center justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] transition-all hover:border-[var(--accent)] hover:-translate-y-0.5"
          >
            <div>
              <div className="font-mono text-[10px] text-[var(--ink-muted)]">
                ← PREVIOUS SYSTEM
              </div>
              <div className="mt-1 text-base font-bold text-[var(--ink-primary)] group-hover:text-[var(--accent)]">
                {prevProject.title}
              </div>
            </div>
            <ArrowLeft className="h-4 w-4 text-[var(--ink-muted)] transition-transform group-hover:-translate-x-1" />
          </Link>

          <Link
            href={`/projects/${nextProject.id}`}
            onClick={() => paperSound.playCardFlick()}
            className="group flex items-center justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 text-right shadow-[var(--shadow-card)] transition-all hover:border-[var(--accent)] hover:-translate-y-0.5"
          >
            <ArrowRight className="h-4 w-4 text-[var(--ink-muted)] transition-transform group-hover:translate-x-1" />
            <div>
              <div className="font-mono text-[10px] text-[var(--ink-muted)]">
                NEXT SYSTEM →
              </div>
              <div className="mt-1 text-base font-bold text-[var(--ink-primary)] group-hover:text-[var(--accent)]">
                {nextProject.title}
              </div>
            </div>
          </Link>
        </nav>
      </main>
    </div>
  );
}

export function ProjectCaseStudy({ project }: { project: ProjectItem }) {
  return (
    <SmoothScrollProvider key={project.id} initialScrollBehavior="top">
      <CaseStudyContent project={project} />
    </SmoothScrollProvider>
  );
}

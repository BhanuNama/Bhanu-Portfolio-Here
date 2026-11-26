"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Github, CheckCircle2 } from "lucide-react";
import { ProjectItem } from "@/data/portfolio";
import { ProjectArtworkSwitch } from "./ProjectArtwork";
import { ProjectSimulator } from "./ProjectSimulator";
import { paperSound } from "@/lib/paperSound";

interface ProjectDrawerProps {
  project: ProjectItem | null;
  origin: "hero" | "bento";
  onClose: () => void;
}

export function ProjectDrawer({ project, origin, onClose }: ProjectDrawerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-2 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              paperSound.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            layoutId={
              origin === "bento"
                ? `bento-card-${project.id}`
                : `hero-card-${project.id}`
            }
            transition={{ type: "spring", stiffness: 290, damping: 28 }}
            data-lenis-prevent
            className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-[28px] border border-[var(--border-strong)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-float)] sm:p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-muted)]">
                  <span>{project.fig}</span>
                  <span>·</span>
                  <span className="text-[var(--accent)]">{project.category}</span>
                  <span>·</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--ink-secondary)]">
                  {project.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  paperSound.playClick();
                  onClose();
                }}
                aria-label="Close project details"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-well)] text-[var(--ink-primary)] transition-colors hover:border-[var(--ink-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Interactive Schematic Preview + Metrics */}
            <div className="mt-6 grid gap-5 md:grid-cols-5">
              <div className="md:col-span-3">
                <ProjectArtworkSwitch projectId={project.id} />
              </div>

              <div className="flex flex-col justify-between gap-3 md:col-span-2">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-4 py-3"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                      {m.label}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-[var(--ink-primary)]">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Live Simulator */}
            <div className="mt-6">
              <ProjectSimulator projectId={project.id} />
            </div>

            {/* System Pipeline */}
            <div className="mt-6">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[var(--ink-muted)]">
                System Architecture Flow
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                {project.architecture.steps.map((step, i) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-3.5"
                  >
                    <div className="font-mono text-[10px] font-semibold text-[var(--accent)]">
                      0{i + 1}
                    </div>
                    <div className="mt-1 text-xs font-bold text-[var(--ink-primary)]">
                      {step.title}
                    </div>
                    <div className="mt-1 text-[11px] leading-snug text-[var(--ink-secondary)]">
                      {step.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Highlights */}
            <div className="mt-6">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[var(--ink-muted)]">
                Implementation Details
              </div>
              <ul className="space-y-2.5">
                {project.bullets.map((b, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--ink-secondary)]"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack Tags + Action Links */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-5">
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-well)] px-2.5 py-1 font-mono text-[11px] text-[var(--ink-primary)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-paper)] px-4 py-2 text-xs font-semibold text-[var(--ink-primary)] transition-colors hover:border-[var(--ink-primary)]"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>Source</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

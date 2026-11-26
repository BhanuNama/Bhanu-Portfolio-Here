"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Layers } from "lucide-react";
import { PROJECTS, ProjectItem } from "@/data/portfolio";
import { ProjectArtworkSwitch } from "./ProjectArtwork";
import { Magnetic, TiltPaperCard } from "./Magnetic";
import { paperSound } from "@/lib/paperSound";

interface BentoProjectsProps {
  onSelectProject: (project: ProjectItem, origin: "hero" | "bento") => void;
}

const CATEGORIES = [
  "All",
  "Real-Time & P2P",
  "GraphRAG & AI",
  "Full-Stack AI",
  "Full-Stack",
] as const;

export function BentoProjects({ onSelectProject }: BentoProjectsProps) {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("bn-projects-expanded") === "1") {
        setShowAll(true);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleShowAll = () => {
    const next = !showAll;
    if (next) paperSound.playCardFlick();
    else paperSound.playClick();
    setShowAll(next);
    try {
      window.sessionStorage.setItem("bn-projects-expanded", next ? "1" : "0");
    } catch {
      // ignore storage errors
    }
  };

  const visibleProjects =
    filter === "All"
      ? showAll
        ? PROJECTS
        : PROJECTS.slice(0, 6)
      : PROJECTS.filter((p) => p.category === filter);

  const extraCount = Math.max(0, PROJECTS.length - 6);

  const getColSpan = (idx: number) => {
    if (filter !== "All") {
      if (visibleProjects.length === 1) return "lg:col-span-12";
      if (visibleProjects.length === 2 || visibleProjects.length === 4) return "lg:col-span-6";
      return "lg:col-span-4";
    }
    if (idx < 6) return "lg:col-span-6";
    return "lg:col-span-4";
  };

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[var(--border-hairline)] pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              <span className="text-[var(--accent)]">01</span>
              <span>/</span>
              <span>Selected Systems &amp; Bento</span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[var(--ink-primary)] sm:text-5xl"
              >
                Built to{" "}
                <span className="font-serif font-normal italic text-[var(--accent)]">
                  ship,
                </span>{" "}
                not just demo.
              </motion.h2>
            </div>
          </div>

          {/* Filter Pills (Clean standalone chips on mobile, segmented capsule on md+) */}
          <div className="flex flex-wrap items-center gap-2 md:gap-1 md:rounded-full md:border md:border-[var(--border-hairline)] md:bg-[var(--bg-card)] md:p-1.5 md:shadow-[var(--shadow-card)]">
            {CATEGORIES.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    paperSound.playClick();
                    setFilter(cat);
                  }}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "text-[var(--bg-paper)]"
                      : "border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] md:border-transparent md:bg-transparent"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      className="absolute inset-0 -z-0 rounded-full bg-[var(--ink-primary)]"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Asymmetric Bento Grid */}
        <motion.div layout className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => {
              const colSpan = getColSpan(idx);
              const showSixTools = colSpan === "lg:col-span-6" || colSpan === "lg:col-span-12";
              const isArchiveCard = filter === "All" && idx >= 6;

              return (
                <motion.div
                  key={project.id}
                  layout="position"
                  layoutId={`bento-card-${project.id}`}
                  initial={{
                    opacity: 0,
                    y: isArchiveCard ? 36 : 24,
                    scale: isArchiveCard ? 0.94 : 1,
                  }}
                  animate={isArchiveCard ? { opacity: 1, y: 0, scale: 1 } : undefined}
                  whileInView={isArchiveCard ? undefined : { opacity: 1, y: 0 }}
                  viewport={isArchiveCard ? undefined : { once: true, amount: 0.12 }}
                  exit={{
                    opacity: 0,
                    y: -16,
                    scale: 0.95,
                    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                  }}
                  transition={
                    isArchiveCard
                      ? {
                          type: "spring",
                          stiffness: 250,
                          damping: 23,
                          delay: (idx - 6) * 0.08,
                        }
                      : {
                          duration: 0.55,
                          delay: idx * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                  className={`min-w-0 ${colSpan}`}
                >
                <TiltPaperCard
                  onClick={() => {
                    paperSound.playCardFlick();
                    onSelectProject(project, "bento");
                  }}
                  className="group flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-[26px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] transition-colors hover:border-[var(--border-strong)] sm:p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-medium text-[var(--ink-muted)]">
                        {project.fig} · {project.category}
                      </span>
                    </div>

                    <div className="mt-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-2xl">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-[var(--ink-secondary)] sm:text-sm">
                          {project.subtitle}
                        </p>
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-primary)] transition-all group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    <div className="mt-5">
                      <ProjectArtworkSwitch projectId={project.id} />
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-[var(--ink-secondary)]">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-[var(--border-hairline)] pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.slice(0, showSixTools ? 6 : 4).map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--ink-secondary)]"
                        >
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > (showSixTools ? 6 : 4) && (
                        <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-well)] px-2 py-0.5 font-mono text-[10px] text-[var(--ink-muted)]">
                          +{project.tools.length - (showSixTools ? 6 : 4)}
                        </span>
                      )}
                    </div>
                  </div>
                </TiltPaperCard>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Show More Projects Expander after ContentForge AI */}
        {filter === "All" && extraCount > 0 && (
          <motion.div
            layout
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div className="hidden h-px flex-1 bg-[var(--border-hairline)] sm:block" />

            <Magnetic strength={0.14}>
              <motion.button
                type="button"
                onClick={toggleShowAll}
                whileTap={{ scale: 0.96 }}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-5 py-3 shadow-[var(--shadow-card)] transition-colors hover:border-[var(--ink-primary)]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)]/12 text-[var(--accent)]">
                  <Layers className="h-3.5 w-3.5" />
                </span>

                <span className="text-xs font-semibold tracking-tight text-[var(--ink-primary)] sm:text-sm">
                  {showAll ? "Show Top 6 Only" : "Show More Projects"}
                </span>

                <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-2 py-0.5 font-mono text-[10px] font-semibold text-[var(--accent)]">
                  {showAll ? "FIG. 01–09" : `+${extraCount} MORE`}
                </span>

                <motion.span
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="text-[var(--ink-muted)] transition-colors group-hover:text-[var(--ink-primary)]"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </motion.button>
            </Magnetic>

            <div className="hidden h-px flex-1 bg-[var(--border-hairline)] sm:block" />
          </motion.div>
        )}
      </div>
    </section>
  );
}

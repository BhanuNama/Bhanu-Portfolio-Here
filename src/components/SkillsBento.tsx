"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  Braces,
  Code2,
  Cpu,
  Database,
  GitBranch,
  GitMerge,
  Globe,
  Layers,
  Package,
  Pin,
  PinOff,
  Radio,
  Server,
  Share2,
  ShieldCheck,
  Sparkles,
  Terminal,
  Triangle,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { PROJECTS, ProjectItem, SKILL_GROUPS } from "@/data/portfolio";
import { paperSound } from "@/lib/paperSound";

interface SkillsBentoProps {
  onSelectProject: (project: ProjectItem) => void;
}

const GROUP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  languages: Code2,
  web: Globe,
  ai: Cpu,
  data: Database,
  tools: Wrench,
};

/**
 * Crisp geometric + icon marks for every single skill item.
 */
function SkillBrandGlyph({
  name,
  className = "h-3.5 w-3.5",
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case "React 19":
      return (
        <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
          <ellipse cx="9" cy="9" rx="7" ry="2.7" stroke="currentColor" strokeWidth="1.25" />
          <ellipse
            cx="9"
            cy="9"
            rx="7"
            ry="2.7"
            transform="rotate(60 9 9)"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <ellipse
            cx="9"
            cy="9"
            rx="7"
            ry="2.7"
            transform="rotate(120 9 9)"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <circle cx="9" cy="9" r="1.4" fill="currentColor" />
        </svg>
      );
    case "Next.js 16":
      return (
        <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3" />
          <path d="M6.3 12V6L13 14.2M11.7 6v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "JavaScript":
      return <Braces className={className} />;
    case "Python":
      return <Terminal className={className} />;
    case "Java":
      return <Code2 className={className} />;
    case "Spring Boot & Express":
      return <Server className={className} />;
    case "WebRTC / LiveKit":
      return <Radio className={className} />;
    case "Tailwind CSS":
      return <Wind className={className} />;
    case "LangGraph & CrewAI":
      return <Share2 className={className} />;
    case "Groq, Ollama & Gemini":
      return <Sparkles className={className} />;
    case "Dual-RAG & GraphRAG":
      return <GitMerge className={className} />;
    case "MiniLM & Nomic Embed":
      return <Layers className={className} />;
    case "Supabase / pgvector":
      return <Zap className={className} />;
    case "Neo4j & ChromaDB":
      return (
        <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
          <path
            d="M4.5 5L13.5 5M4.5 5L9 13.5M13.5 5L9 13.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="4.5" cy="5" r="2" fill="currentColor" />
          <circle cx="13.5" cy="5" r="2" fill="currentColor" />
          <circle cx="9" cy="13.5" r="2" fill="currentColor" />
        </svg>
      );
    case "MySQL & MongoDB":
      return <Database className={className} />;
    case "Clerk & JWT":
      return <ShieldCheck className={className} />;
    case "Vercel & Railway":
      return <Triangle className={className} />;
    case "Docker & HuggingFace":
      return <Package className={className} />;
    case "Git & PostMan":
      return <GitBranch className={className} />;
    default:
      return <Code2 className={className} />;
  }
}

/**
 * Clean cursor-tracking spotlight horizontal stack lane (zero dead vertical whitespace).
 */
function StackSpotlightLane({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const laneRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!laneRef.current || e.pointerType !== "mouse") return;
    const rect = laneRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleLeave = () => {
    mouseX.set(-300);
    mouseY.set(-300);
  };

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(224, 78, 38, 0.08), transparent 72%)`;
  const borderGlow = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(224, 78, 38, 0.34), transparent 70%)`;

  return (
    <motion.div
      ref={laneRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[22px] border border-[var(--border-hairline)] bg-[var(--bg-card)] px-5 py-4 shadow-[var(--shadow-card)] transition-colors hover:border-[var(--border-strong)] sm:px-6 sm:py-4.5"
    >
      {/* Border Glow */}
      <motion.div
        aria-hidden="true"
        style={{ background: borderGlow }}
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="absolute inset-[1px] rounded-[21px] bg-[var(--bg-card)]" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-[1px] rounded-[21px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10 flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between md:gap-6">
        {children}
      </div>
    </motion.div>
  );
}

interface Point {
  x: number;
  y: number;
}

function triangleSign(p1: Point, p2: Point, p3: Point) {
  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function isPointInTriangle(pt: Point, v1: Point, v2: Point, v3: Point) {
  const d1 = triangleSign(pt, v1, v2);
  const d2 = triangleSign(pt, v2, v3);
  const d3 = triangleSign(pt, v3, v1);
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNeg && hasPos);
}

export function SkillsBento({ onSelectProject }: SkillsBentoProps) {
  const [selectedSkill, setSelectedSkill] = useState<string>("LangGraph & CrewAI");
  const [pinnedSkill, setPinnedSkill] = useState<string | null>(null);
  const inspectorRef = useRef<HTMLDivElement | null>(null);
  const hoverAnchorRef = useRef<Point | null>(null);
  const hoverTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current !== null) {
        window.clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const clearHoverTimer = () => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleSkillEnter = (
    skillName: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    // When user clicked to pin a skill, intermediate hovers never hijack it.
    if (pinnedSkill) return;

    clearHoverTimer();
    const pointer: Point = { x: e.clientX, y: e.clientY };

    // Safe aiming cone: if moving upward from last hovered skill toward the inspector card,
    // wait longer so passing over middle rows never steals the selection.
    const rect = inspectorRef.current?.getBoundingClientRect();
    const anchor = hoverAnchorRef.current;
    const inAimCone = Boolean(
      rect &&
        anchor &&
        anchor.y > rect.bottom &&
        pointer.y >= rect.bottom &&
        isPointInTriangle(
          pointer,
          anchor,
          { x: rect.left - 36, y: rect.bottom },
          { x: rect.right + 36, y: rect.bottom }
        )
    );

    const delay = inAimCone ? 280 : 45;
    hoverTimerRef.current = window.setTimeout(() => {
      hoverAnchorRef.current = pointer;
      setSelectedSkill(skillName);
    }, delay);
  };

  const handleSkillLeave = () => {
    clearHoverTimer();
  };

  const handleSkillClick = (
    skillName: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    paperSound.playClick();
    clearHoverTimer();
    hoverAnchorRef.current = { x: e.clientX, y: e.clientY };
    if (pinnedSkill === skillName) {
      setPinnedSkill(null);
    } else {
      setPinnedSkill(skillName);
      setSelectedSkill(skillName);
    }
  };

  const orderedGroups = useMemo(() => {
    const order = ["languages", "web", "ai", "data", "tools"];
    return order
      .map((id) => SKILL_GROUPS.find((g) => g.id === id))
      .filter((g): g is (typeof SKILL_GROUPS)[number] => Boolean(g));
  }, []);

  const allSkills = useMemo(
    () =>
      SKILL_GROUPS.flatMap((g) =>
        g.items.map((item) => ({
          ...item,
          groupLabel: g.label,
        }))
      ),
    []
  );

  const activeSkillObj =
    allSkills.find((s) => s.name === selectedSkill) ?? allSkills[0];

  const matchingProjects = useMemo(
    () => PROJECTS.filter((p) => activeSkillObj.relatedProjects.includes(p.id)),
    [activeSkillObj]
  );

  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Clean Editorial Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-hairline)] pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              <span className="text-[var(--accent)]">03</span>
              <span>/</span>
              <span>Technical Stack</span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[var(--ink-primary)] sm:text-5xl"
              >
                Stack I actually{" "}
                <span className="font-serif font-normal italic text-[var(--accent)]">
                  use.
                </span>
              </motion.h2>
            </div>
          </div>

          <p className="max-w-xs font-mono text-xs leading-relaxed text-[var(--ink-secondary)]">
            Hover to preview or click any skill to pin it while you jump to its projects.
          </p>
        </div>

        {/* Interactive Skill Inspector Bar */}
        <div className="mt-7">
          <div
            ref={inspectorRef}
            className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-card)] px-5 py-4 shadow-[var(--shadow-card)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkillObj.name}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-3.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs sm:text-sm">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-semibold text-[var(--accent)]">
                      <SkillBrandGlyph name={activeSkillObj.name} className="h-3.5 w-3.5" />
                      <span>{activeSkillObj.name}</span>
                    </span>
                    <span className="min-w-0 leading-relaxed text-[var(--ink-secondary)]">
                      {activeSkillObj.role}
                    </span>
                  </div>

                  {pinnedSkill === activeSkillObj.name && (
                    <button
                      type="button"
                      onClick={() => {
                        paperSound.playClick();
                        setPinnedSkill(null);
                      }}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[var(--accent)]/35 bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[10px] font-medium text-[var(--accent)] transition-colors hover:border-[var(--accent)]"
                      title="Unpin to resume hover preview"
                    >
                      <PinOff className="h-3 w-3" />
                      <span>Pinned · Unpin</span>
                    </button>
                  )}
                </div>

                {matchingProjects.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 border-t border-dashed border-[var(--border-hairline)] pt-3">
                    <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                      Used in
                    </span>
                    {matchingProjects.map((proj) => (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => {
                          paperSound.playCardFlick();
                          onSelectProject(proj);
                        }}
                        className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-[var(--border-strong)] bg-[var(--bg-paper)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        <span>{proj.title}</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Compact Kinetic Horizontal Stack Lanes (Zero Dead Space + Icon Badges) */}
        <div className="mt-5 flex flex-col gap-3.5">
          {orderedGroups.map((group, idx) => {
            const Icon = GROUP_ICONS[group.id] ?? Code2;

            return (
              <StackSpotlightLane key={group.id} delay={idx * 0.04}>
                {/* Left Column: Crisp Index + Category Label */}
                <div className="flex shrink-0 items-center gap-3 md:w-[225px]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-secondary)] transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--accent)]/40 group-hover:text-[var(--accent)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-[var(--ink-muted)]">
                      0{idx + 1} · {group.items.length} TOOLS
                    </div>
                    <h3 className="text-sm font-bold tracking-tight text-[var(--ink-primary)] sm:text-base">
                      {group.label}
                    </h3>
                  </div>
                </div>

                {/* Right Column: Icon-Equipped Magnetic Skill Pills */}
                <div className="flex flex-1 flex-wrap items-center gap-2">
                  {group.items.map((skill) => {
                    const isSelected = selectedSkill === skill.name;
                    const isPinned = pinnedSkill === skill.name;
                    return (
                      <motion.button
                        key={skill.name}
                        type="button"
                        whileHover={{ y: -1.5 }}
                        whileTap={{ scale: 0.96 }}
                        onMouseEnter={(e) => handleSkillEnter(skill.name, e)}
                        onMouseLeave={handleSkillLeave}
                        onClick={(e) => handleSkillClick(skill.name, e)}
                        className={`group/pill relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs font-medium transition-colors ${
                          isSelected
                            ? "text-white"
                            : "border border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-primary)] hover:border-[var(--border-strong)]"
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="active-skill-pill"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                            className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-xs"
                          />
                        )}
                        <span
                          className={`relative z-10 transition-transform duration-300 group-hover/pill:scale-110 group-hover/pill:-rotate-6 ${
                            isSelected ? "text-white" : "text-[var(--accent)]"
                          }`}
                        >
                          <SkillBrandGlyph name={skill.name} className="h-3.5 w-3.5" />
                        </span>
                        <span className="relative z-10">{skill.name}</span>
                        {isPinned && (
                          <Pin className="relative z-10 h-3 w-3 opacity-85" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </StackSpotlightLane>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { ArrowUpRight, Flame, GitCommitHorizontal, Github, Terminal } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { paperSound } from "@/lib/paperSound";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const GITHUB_USER = PROFILE.githubUsername || "BhanuNama";

function buildFallbackCalendar(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const totalDays = 52 * 7;
  const baseDate = new Date(Date.UTC(2026, 10, 22));

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(baseDate);
    d.setUTCDate(baseDate.getUTCDate() - i);
    const iso = d.toISOString().slice(0, 10);

    const weekIdx = Math.floor((totalDays - 1 - i) / 7);
    const dayIdx = (totalDays - 1 - i) % 7;
    const wave =
      Math.sin(weekIdx * 0.42 + dayIdx * 0.65) +
      Math.cos(weekIdx * 0.19 - dayIdx * 0.35);
    const seed = ((weekIdx * 17 + dayIdx * 31) % 11) / 11;
    const raw = wave * 0.5 + seed;

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    let count = 0;
    if (raw > 1.05) {
      level = 4;
      count = 6 + ((weekIdx + dayIdx) % 4);
    } else if (raw > 0.72) {
      level = 3;
      count = 4 + ((weekIdx + dayIdx) % 2);
    } else if (raw > 0.42) {
      level = 2;
      count = 2 + (dayIdx % 2);
    } else if (raw > 0.15) {
      level = 1;
      count = 1;
    }

    days.push({ date: iso, count, level });
  }
  return days;
}

const RECENT_COMMITS = [
  {
    repo: "Popcorn-Room",
    msg: "feat(p2p): binary-tree 4K fMP4 swarm + 60fps H.264 simulcast",
    tag: "WebRTC",
  },
  {
    repo: "Odyssey-Solver-rare-disease",
    msg: "feat(v2): Resnik MICA, Bayesian LR, <20ms Shannon IG & 100-case eval",
    tag: "GraphRAG",
  },
  {
    repo: "GenomeGuide",
    msg: "feat(v2): ClinGen Bayesian ACMG, Ensembl NMD, GrpMax & 300-case eval",
    tag: "LangGraph",
  },
  {
    repo: "Versant-Fluent",
    msg: "feat(irt): Groq Whisper STT + Bayesian Rasch GSE scoring engine",
    tag: "Psychometrics",
  },
  {
    repo: "meetmind-ai",
    msg: "feat(rag): 8B -> 70B map-reduce & 384-dim pgvector citations",
    tag: "Next.js 16",
  },
  {
    repo: "contentforge-ai",
    msg: "feat(agents): 8x parallel platform forge + brand voice critic",
    tag: "Multi-Agent",
  },
];

export function GitHubPulse() {
  const initialFallback = useMemo(() => buildFallbackCalendar(), []);
  const [days, setDays] = useState<ContributionDay[]>(initialFallback);
  const [isLive, setIsLive] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [activeCommitIdx, setActiveCommitIdx] = useState<number>(0);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(-350);
  const mouseY = useMotionValue(-350);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(224, 78, 38, 0.075), transparent 72%)`;

  useEffect(() => {
    let cancelled = false;
    async function fetchContributions() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(GITHUB_USER)}?y=last`
        );
        if (!res.ok) return;
        const json = (await res.json()) as {
          contributions?: ContributionDay[];
        };
        if (!cancelled && Array.isArray(json.contributions) && json.contributions.length > 0) {
          setDays(json.contributions.slice(-364));
          setIsLive(true);
        }
      } catch {
        // Fallback stays active if offline
      }
    }
    fetchContributions();
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(() => {
    const cols: ContributionDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      cols.push(days.slice(i, i + 7));
    }
    return cols;
  }, [days]);

  // Month label positions across the 52 weeks
  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, idx) => {
      const first = week[0];
      if (!first) return;
      const m = Number(first.date.slice(5, 7)) - 1;
      if (m !== lastMonth && idx < 50) {
        labels.push({ label: MONTHS[m], col: idx });
        lastMonth = m;
      }
    });
    return labels;
  }, [weeks]);

  const monthlyCurve = useMemo(() => {
    const buckets = new Array(12).fill(0);
    days.forEach((d) => {
      const m = Number(d.date.slice(5, 7)) - 1;
      if (m >= 0 && m < 12) buckets[m] += d.count;
    });
    const maxVal = Math.max(1, ...buckets);
    return buckets.map((val) => val / maxVal);
  }, [days]);

  const sparkPath = useMemo(() => {
    const w = 520;
    const h = 42;
    return monthlyCurve
      .map((norm, i) => {
        const x = (i / 11) * w;
        const y = h - 6 - norm * (h - 14);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  }, [monthlyCurve]);

  const totalContributions = useMemo(
    () => days.reduce((sum, d) => sum + d.count, 0),
    [days]
  );

  const longestStreak = useMemo(() => {
    let best = 0;
    let cur = 0;
    for (const d of days) {
      if (d.count > 0) {
        cur += 1;
        if (cur > best) best = cur;
      } else {
        cur = 0;
      }
    }
    return best;
  }, [days]);

  const levelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-[var(--bg-well)] border-[var(--border-hairline)]";
      case 1:
        return "bg-[var(--accent)]/25 border-[var(--accent)]/25";
      case 2:
        return "bg-[var(--accent)]/50 border-[var(--accent)]/40";
      case 3:
        return "bg-[var(--accent)]/75 border-[var(--accent)]/60";
      case 4:
      default:
        return "bg-[var(--accent)] border-[var(--accent)]";
    }
  };

  return (
    <section id="github" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-hairline)] pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              <span className="text-[var(--accent)]">04</span>
              <span>/</span>
              <span>GitHub &amp; Build Cadence</span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[var(--ink-primary)] sm:text-5xl"
              >
                Shipping{" "}
                <span className="font-serif font-normal italic text-[var(--accent)]">
                  consistently.
                </span>
              </motion.h2>
            </div>
          </div>

          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => paperSound.playClick()}
            className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-4 py-2 font-mono text-xs font-semibold text-[var(--ink-primary)] shadow-[var(--shadow-card)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:self-auto"
          >
            <Github className="h-3.5 w-3.5" />
            <span>@{GITHUB_USER}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[var(--ink-muted)]" />
          </a>
        </div>

        {/* Balanced Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid items-stretch gap-5 lg:grid-cols-12"
        >
          {/* Left 8 Cols: Full-Width Proportional 52-Col Heatmap + Velocity Sparkline */}
          <div
            ref={cardRef}
            onPointerMove={(e) => {
              if (!cardRef.current || e.pointerType !== "mouse") return;
              const rect = cardRef.current.getBoundingClientRect();
              mouseX.set(e.clientX - rect.left);
              mouseY.set(e.clientY - rect.top);
            }}
            onPointerLeave={() => {
              mouseX.set(-350);
              mouseY.set(-350);
              setHoveredDay(null);
            }}
            className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[26px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] sm:p-6 lg:col-span-8"
          >
            <motion.div
              aria-hidden="true"
              style={{ background: spotlight }}
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-2.5 py-1 font-mono text-[10px] font-medium text-[var(--ink-primary)]">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isLive ? "bg-emerald-500 animate-pulse" : "bg-[var(--accent)]"
                    }`}
                  />
                  github.com/{GITHUB_USER}
                </span>

                <div className="font-mono text-[11px] text-[var(--ink-secondary)]">
                  {hoveredDay ? (
                    <span className="font-semibold text-[var(--accent)]">
                      {hoveredDay.date} · {hoveredDay.count} commit
                      {hoveredDay.count === 1 ? "" : "s"}
                    </span>
                  ) : (
                    <span>{totalContributions} contributions · last 12 months</span>
                  )}
                </div>
              </div>

              {/* Month Labels + Full-Width Responsive 52-Column Heatmap */}
              <div className="mt-5 overflow-x-auto pb-1">
                <div className="min-w-[540px]">
                  <div
                    className="mb-1.5 grid gap-[3px] font-mono text-[9px] text-[var(--ink-muted)]"
                    style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))" }}
                  >
                    {weeks.map((_, idx) => {
                      const found = monthLabels.find((m) => m.col === idx);
                      return (
                        <span key={idx} className="truncate">
                          {found ? found.label : ""}
                        </span>
                      );
                    })}
                  </div>

                  <div
                    className="grid gap-[3px]"
                    style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))" }}
                  >
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[3px]">
                        {week.map((day, dIdx) => (
                          <motion.button
                            key={day.date}
                            type="button"
                            onMouseEnter={() => setHoveredDay(day)}
                            onFocus={() => setHoveredDay(day)}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                              duration: 0.22,
                              delay: Math.min(0.4, wIdx * 0.006 + dIdx * 0.004),
                            }}
                            whileHover={{ scale: 1.4, zIndex: 20 }}
                            aria-label={`${day.date}: ${day.count} contributions`}
                            className={`aspect-square w-full rounded-[2.5px] border transition-colors ${levelColor(
                              day.level
                            )}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Integrated 12M Velocity Sparkline */}
              <div className="mt-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)]/85 px-4 py-3">
                <div className="mb-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
                  <span>12-Month Velocity Curve</span>
                  <span className="text-[var(--accent)]">@{GITHUB_USER}</span>
                </div>
                <svg
                  viewBox="0 0 520 44"
                  className="h-10 w-full overflow-visible"
                  aria-hidden="true"
                >
                  <line
                    x1="0"
                    y1="38"
                    x2="520"
                    y2="38"
                    stroke="var(--border-hairline)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <motion.path
                    d={sparkPath}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0.3 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Legend + Streak Telemetry */}
            <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-4 font-mono text-[10px] text-[var(--ink-muted)]">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-[var(--ink-primary)]">
                  <Flame className="h-3.5 w-3.5 text-[var(--accent)]" />
                  MAX STREAK: {longestStreak}D
                </span>
                <span className="hidden sm:inline">6 REPOSITORIES · NO FORCE PUSHES</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <span
                    key={lvl}
                    className={`h-2.5 w-2.5 rounded-[2px] border ${levelColor(lvl)}`}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Recent Ship Log Card */}
          <div className="flex min-w-0 flex-col justify-between rounded-[26px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] sm:p-6 lg:col-span-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                  <Terminal className="h-3 w-3 text-[var(--accent)]" />
                  Commit Highlights
                </span>
                <GitCommitHorizontal className="h-3.5 w-3.5 text-[var(--ink-muted)]" />
              </div>

              <div className="mt-3.5 space-y-1.5">
                {RECENT_COMMITS.map((c, idx) => {
                  const active = activeCommitIdx === idx;
                  return (
                    <button
                      key={c.repo}
                      type="button"
                      onMouseEnter={() => setActiveCommitIdx(idx)}
                      onClick={() => {
                        paperSound.playClick();
                        setActiveCommitIdx(idx);
                      }}
                      className={`w-full rounded-xl border px-3 py-2 text-left transition-all ${
                        active
                          ? "border-[var(--accent)]/60 bg-[var(--bg-paper)]"
                          : "border-[var(--border-hairline)] bg-transparent hover:bg-[var(--bg-paper)]/60"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="font-semibold text-[var(--ink-primary)]">
                          {c.repo}
                        </span>
                        <span className="text-[var(--accent)]">{c.tag}</span>
                      </div>
                      <div className="mt-0.5 truncate text-[11px] text-[var(--ink-secondary)]">
                        {c.msg}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => paperSound.playClick()}
              className="mt-5 flex items-center justify-between rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-4 py-2.5 font-mono text-[11px] font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span>Explore @{GITHUB_USER}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ArtworkProps {
  compact?: boolean;
}

/**
 * FIG. 01 — The Orbit (Popcorn-Room):
 * Interactive 4-stage showcase featuring Binary-Tree P2P Swarm + 48kHz Stereo Spectrum + NTP Clock
 */
export function OrbitArtwork({ compact = false }: ArtworkProps) {
  const modes = ["4K Swarm", "60fps Share", "YouTube NTP", "Hi-Fi .flac"] as const;
  const [mode, setMode] = useState<(typeof modes)[number]>("4K Swarm");
  const spectrum = [32, 68, 48, 88, 58, 92, 44, 76, 60, 84, 38, 66];

  const modeReadout: Record<(typeof modes)[number], string> = {
    "4K Swarm": "O(1) Host · 32KB SCTP → MSE 14–22s",
    "60fps Share": "2-Way Direct (~14ms) → H.264 Simulcast",
    "YouTube NTP": "ServerClock Min-RTT · ±0.8s Lockstep",
    "Hi-Fi .flac": "48kHz 256kbps (red: false) + .lrc",
  };

  return (
    <div
      className={`relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/80 ${
        compact ? "p-3" : "p-4 sm:p-5"
      }`}
    >
      {/* Top Telemetry Bar */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          WebRTC · LiveKit
        </span>
        <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2 py-0.5 font-mono text-[9px] text-[var(--accent)]">
          120ms Lip-Sync
        </span>
      </div>

      {/* Stage Graphic: Switches cleanly between P2P Binary Tree & Hi-Fi Stereo Spectrum */}
      <div className="my-2.5 flex h-[64px] items-center justify-center">
        {mode === "Hi-Fi .flac" ? (
          <div className="flex h-11 w-full max-w-[210px] items-end justify-between gap-1 px-2">
            {spectrum.map((h, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [`${Math.max(22, h * 0.35)}%`, `${h}%`, `${Math.max(25, h * 0.45)}%`],
                }}
                transition={{
                  duration: 1.2 + (i % 4) * 0.22,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.05,
                }}
                className={`w-1.5 rounded-full ${
                  i % 3 === 1 ? "bg-[var(--accent)]" : "bg-[var(--ink-primary)]/75"
                }`}
              />
            ))}
          </div>
        ) : (
          <svg viewBox="0 0 190 68" className="h-[62px] w-full max-w-[210px]" aria-hidden="true">
            {/* Orbital outer halo */}
            <ellipse
              cx="95"
              cy="34"
              rx="78"
              ry="24"
              fill="none"
              stroke="var(--border-strong)"
              strokeOpacity="0.45"
              strokeWidth="0.9"
              strokeDasharray="2 3"
            />
            {/* Binary Tree P2P Relay Paths */}
            <path
              d="M95 11 L52 36 M95 11 L138 36 M52 36 L30 57 M52 36 L74 57 M138 36 L116 57 M138 36 L160 57"
              stroke="var(--border-strong)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            {/* Animated P2P Chunk Packets */}
            <motion.circle
              r="2.5"
              fill="var(--accent)"
              animate={{ cx: [95, 52, 30], cy: [11, 36, 57], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              r="2.5"
              fill="var(--accent)"
              animate={{ cx: [95, 138, 160], cy: [11, 36, 57], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.9, delay: 0.55, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Host Root + Relay Peers */}
            <circle cx="95" cy="11" r="6" fill="var(--accent)" />
            <circle cx="52" cy="36" r="4.5" fill="var(--bg-card)" stroke="var(--ink-primary)" strokeWidth="1.25" />
            <circle cx="138" cy="36" r="4.5" fill="var(--bg-card)" stroke="var(--ink-primary)" strokeWidth="1.25" />
            {[30, 74, 116, 160].map((x) => (
              <circle
                key={x}
                cx={x}
                cy="57"
                r="3.2"
                fill="var(--bg-card)"
                stroke="var(--ink-muted)"
                strokeWidth="1.1"
              />
            ))}
          </svg>
        )}
      </div>

      {!compact && (
        <div className="space-y-2 border-t border-dashed border-[var(--border-strong)] pt-2.5">
          <div className="flex flex-wrap gap-1">
            {modes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode(m);
                }}
                className={`rounded-md px-2 py-0.5 font-mono text-[9px] transition-colors ${
                  mode === m
                    ? "bg-[var(--ink-primary)] text-[var(--bg-paper)]"
                    : "bg-[var(--bg-card)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="truncate font-mono text-[9px] text-[var(--ink-secondary)]">
            {modeReadout[mode]}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * FIG. 02 — Odyssey-Dx V2 (Odyssey-Solver-rare-disease):
 * Resnik MICA + Bayesian LR across 12.8k Diseases & 19.8k HPO Terms + <20ms Shannon IG Clarifier
 */
export function OdysseyArtwork({ compact = false }: ArtworkProps) {
  const [tier, setTier] = useState<number>(0);

  useEffect(() => {
    const id = window.setInterval(() => setTier((t) => (t + 1) % 3), 1700);
    return () => window.clearInterval(id);
  }, []);

  const tiers = ["19.8k HPO", "12.8k Diseases", "Genes + MICA"];

  return (
    <div
      className={`relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/80 ${
        compact ? "p-3" : "p-4 sm:p-5"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
          MICA · Bayesian LR
        </span>
        <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2 py-0.5 font-mono text-[9px] font-semibold text-[var(--accent)]">
          74% T5 · &lt;20ms IG
        </span>
      </div>

      {/* 3-Tier Bipartite Knowledge Graph SVG */}
      <div className="relative my-2.5 flex items-center justify-center">
        <svg viewBox="0 0 210 66" className="h-[62px] w-full max-w-[225px]" aria-hidden="true">
          {/* Graph Edges */}
          <path
            d="M28 16 L105 33 M28 34 L105 33 M28 52 L105 33 M105 33 L182 20 M105 33 L182 48"
            stroke="var(--border-strong)"
            strokeWidth="1.15"
            strokeDasharray="2.5 2.5"
          />
          {/* Traveling GraphRAG Signal */}
          <motion.circle
            r="2.4"
            fill="var(--accent)"
            animate={{ cx: [28, 105, 182], cy: [16, 33, 20], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            r="2.1"
            fill="var(--accent)"
            animate={{ cx: [28, 105, 182], cy: [52, 33, 48], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.3, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Tier 1: HPO Phenotype Nodes */}
          {[16, 34, 52].map((y) => (
            <circle
              key={y}
              cx="28"
              cy={y}
              r="4.5"
              fill={tier === 0 ? "var(--accent)" : "var(--bg-card)"}
              stroke="var(--ink-primary)"
              strokeWidth="1.2"
            />
          ))}
          {/* Tier 2: Candidate Disease Hub */}
          <circle
            cx="105"
            cy="33"
            r="7.5"
            fill={tier === 1 ? "var(--accent)" : "var(--bg-card)"}
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          {/* Tier 3: Gene Links */}
          {[20, 48].map((y) => (
            <rect
              key={y}
              x="177"
              y={y - 4.5}
              width="9"
              height="9"
              rx="2.5"
              fill={tier === 2 ? "var(--accent)" : "var(--bg-card)"}
              stroke="var(--ink-primary)"
              strokeWidth="1.2"
            />
          ))}
        </svg>
      </div>

      {!compact && (
        <div className="space-y-2 border-t border-dashed border-[var(--border-strong)] pt-2.5">
          <div className="flex items-center justify-between gap-1 font-mono text-[9px]">
            {tiers.map((label, i) => (
              <span
                key={label}
                className={`rounded px-1.5 py-0.5 transition-colors ${
                  tier === i
                    ? "bg-[var(--ink-primary)] text-[var(--bg-paper)] font-semibold"
                    : "text-[var(--ink-muted)]"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between font-mono text-[9px] text-[var(--ink-secondary)]">
            <span>Shannon IG + 100% ID Guard</span>
            <span className="font-semibold text-[var(--accent)]">0.65G + 0.35P</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * FIG. 03 — GenomeGuide V2:
 * Dual-Sine DNA + Splice/NMD Scanner, Bayesian Evidence Point Meter & GrpMax Telemetry
 */
export function GenomeArtwork({ compact = false }: ArtworkProps) {
  const [variant, setVariant] = useState<"BRCA1" | "Splice+6" | "GrpMax">("BRCA1");

  const variants = {
    BRCA1: {
      hgvs: "BRCA1 c.68_69delAG",
      pts: "+12 pts · 99.9%",
      pct: 95,
      badges: ["PVS1 +8", "PS3 +4"],
      verdict: "PATHOGENIC",
      sub: "5-API RAG · ECE 0.0431",
    },
    "Splice+6": {
      hgvs: "BRCA1 c.5152+6del",
      pts: "+2 pts · 32.5%",
      pct: 55,
      badges: ["PM2 +2", "PVS1 Guard"],
      verdict: "VUS RESOLVED",
      sub: "|offset|>2 Blocked",
    },
    GrpMax: {
      hgvs: "SAS Pop 2.8% Spike",
      pts: "−4 pts · 0.6%",
      pct: 25,
      badges: ["BS1 −4", "BP4 −1"],
      verdict: "ANCESTRY SAFE",
      sub: "7-Pop GrpMax Guard",
    },
  };

  const current = variants[variant];

  return (
    <div
      className={`relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/80 ${
        compact ? "p-3" : "p-4 sm:p-5"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
          Bayesian ACMG · 5-RAG
        </span>
        <div className="flex gap-1">
          {(["BRCA1", "Splice+6", "GrpMax"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setVariant(v);
              }}
              className={`rounded-md px-1.5 py-0.5 font-mono text-[8.5px] transition-colors ${
                variant === v
                  ? "bg-[var(--ink-primary)] text-[var(--bg-paper)]"
                  : "bg-[var(--bg-card)] text-[var(--ink-muted)]"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Smooth Intersecting Dual-Sine DNA Ribbon + Scanner Pulse */}
      <div className="relative my-2 flex items-center justify-center overflow-hidden rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)]/70 py-1.5">
        <svg viewBox="0 0 200 44" className="h-[42px] w-full max-w-[210px]" aria-hidden="true">
          {[22, 42, 62, 100, 120, 140, 178].map((x) => (
            <line
              key={x}
              x1={x}
              y1="11"
              x2={x}
              y2="33"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="1.5 1.5"
            />
          ))}
          <path
            d="M 8 22 C 28 4, 62 4, 82 22 C 102 40, 136 40, 156 22 C 170 9, 184 9, 194 22"
            fill="none"
            stroke="var(--ink-primary)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 8 22 C 28 40, 62 40, 82 22 C 102 4, 136 4, 156 22 C 170 35, 184 35, 194 22"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Domain Pin */}
          <circle cx="82" cy="22" r="3" fill="var(--accent)" />
          <motion.line
            y1="4"
            y2="40"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeOpacity="0.65"
            animate={{ x1: [12, 188, 12], x2: [12, 188, 12] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Bayesian Point Gauge + Triggered Chips */}
      {!compact && (
        <div className="space-y-2 border-t border-dashed border-[var(--border-strong)] pt-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1">
              {current.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-1.5 py-0.5 font-mono text-[8.5px] font-semibold text-[var(--accent)]"
                >
                  {badge}
                </span>
              ))}
            </div>
            <span className="font-mono text-[9px] font-semibold text-[var(--ink-primary)]">
              {current.pts}
            </span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-card)]">
            <motion.div
              animate={{ width: `${current.pct}%` }}
              transition={{ type: "spring", stiffness: 210, damping: 22 }}
              className="h-full rounded-full bg-[var(--accent)]"
            />
          </div>

          <div className="flex items-center justify-between font-mono text-[9px]">
            <span className="text-[var(--ink-secondary)]">
              {current.hgvs} · {current.sub}
            </span>
            <span className="font-semibold text-[var(--accent)]">0/300 Flips ✓</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * FIG. 04 — FluentPath (Versant-Fluent):
 * Speech Levenshtein Alignment Chips + Interactive Skill Scale (GSE 10–90 / CEFR)
 */
export function FluentArtwork({ compact = false }: ArtworkProps) {
  const skills = [
    { id: "Reading", part: "Part A/C", gse: 65, cefr: "B2", metric: "Levenshtein 94%" },
    { id: "Writing", part: "Part B/D", gse: 69, cefr: "B2+", metric: "Rubric 4.4 / 5" },
    { id: "Speaking", part: "Part H/I", gse: 74, cefr: "B2+", metric: "142 WPM · Pause 0.14" },
    { id: "Story", part: "Part J", gse: 79, cefr: "C1", metric: "Whisper + 3-Run" },
  ] as const;
  const [active, setActive] = useState<(typeof skills)[number]>(skills[2]);

  const diffTokens = [
    { word: "The", status: "ok" },
    { word: "quarterly", status: "ok" },
    { word: "brief", status: "sub" },
    { word: "shipped", status: "ok" },
  ];

  const rulerPct = Math.round(((active.gse - 10) / 80) * 100);

  return (
    <div
      className={`relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/80 ${
        compact ? "p-3" : "p-4 sm:p-5"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
          Whisper · Rasch IRT
        </span>
        <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2 py-0.5 font-mono text-[9px] font-semibold text-[var(--accent)]">
          GSE {active.gse} · {active.cefr}
        </span>
      </div>

      {/* Speech Word-Diff Alignment + GSE Ruler Bar */}
      <div className="my-2.5 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-1 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)]/80 px-2.5 py-2">
          {diffTokens.map((t) => (
            <span
              key={t.word}
              className={`rounded-md px-1.5 py-0.5 font-mono text-[9px] ${
                t.status === "ok"
                  ? "bg-[var(--bg-paper)] text-[var(--ink-primary)] border border-[var(--border-hairline)]"
                  : "bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/40 font-semibold"
              }`}
            >
              {t.word}
            </span>
          ))}
        </div>

        {/* GSE 10-90 Calibrated Scale */}
        <div>
          <div className="relative h-1.5 w-full rounded-full bg-[var(--bg-card)] border border-[var(--border-hairline)]">
            <motion.div
              animate={{ width: `${rulerPct}%` }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="h-full rounded-full bg-[var(--accent)]"
            />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[8px] text-[var(--ink-muted)]">
            <span>A1</span>
            <span>A2</span>
            <span>B1</span>
            <span>B2</span>
            <span>C1</span>
            <span>C2</span>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="space-y-2 border-t border-dashed border-[var(--border-strong)] pt-2.5">
          <div className="grid grid-cols-4 gap-1">
            {skills.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(s);
                }}
                className={`rounded-md border py-0.5 font-mono text-[8.5px] font-semibold transition-colors ${
                  active.id === s.id
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-secondary)]"
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between font-mono text-[9px] text-[var(--ink-secondary)]">
            <span>{active.part}</span>
            <span className="font-semibold text-[var(--ink-primary)]">{active.metric}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * FIG. 05 — MeetMind AI:
 * Whisper Waveform -> Map-Reduce Bezier Flow (8B -> 70B) -> 384-dim pgvector Citations
 */
export function MeetMindArtwork({ compact = false }: ArtworkProps) {
  const bars = [26, 48, 72, 42, 85, 62, 34, 78, 56, 38, 66, 44];

  return (
    <div
      className={`relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/80 ${
        compact ? "p-3" : "p-4 sm:p-5"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
          Whisper Large v3
        </span>
        <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2 py-0.5 font-mono text-[9px] text-[var(--accent)]">
          384-dim pgvector
        </span>
      </div>

      {/* Whisper Audio Waveform */}
      <div className="my-2 flex h-8 items-center justify-between gap-1 px-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            animate={{
              height: [`${Math.max(22, h * 0.38)}%`, `${h}%`, `${Math.max(24, h * 0.45)}%`],
            }}
            transition={{
              duration: 1.5 + (i % 4) * 0.28,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.06,
            }}
            className={`w-1.5 rounded-full ${
              i === 4 || i === 7 ? "bg-[var(--accent)]" : "bg-[var(--ink-primary)]/75"
            }`}
          />
        ))}
      </div>

      {/* Map-Reduce Merge Row */}
      <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[9px]">
        <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-card)] py-1 text-[var(--ink-secondary)]">
          8B Chunk A
        </div>
        <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-card)] py-1 text-[var(--ink-secondary)]">
          8B Chunk B
        </div>
        <motion.div
          animate={{ borderColor: ["rgba(224,78,38,0.3)", "rgba(224,78,38,0.9)", "rgba(224,78,38,0.3)"] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="rounded-lg border bg-[var(--accent-soft)] py-1 font-semibold text-[var(--accent)]"
        >
          70B Merge
        </motion.div>
      </div>

      {!compact && (
        <div className="mt-2.5 flex items-center justify-between border-t border-dashed border-[var(--border-strong)] pt-2.5 font-mono text-[9px] text-[var(--ink-secondary)]">
          <span>Zod + Resend Auto-Mail</span>
          <span className="rounded bg-[var(--ink-primary)] px-1.5 py-0.5 text-[var(--bg-paper)]">
            [Cite: Sync #14]
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * FIG. 06 — ContentForge AI:
 * 1->8 Parallel Fan-Out Tree + Brand Voice Engine + Critic Score Gate
 */
export function ContentForgeArtwork({ compact = false }: ArtworkProps) {
  const platforms = [
    { name: "X Thread", score: "9.4/10", voice: "Direct · Hook" },
    { name: "LinkedIn", score: "9.2/10", voice: "Sharp · CTA" },
    { name: "YouTube", score: "9.1/10", voice: "Script + Chapters" },
    { name: "Blog", score: "9.5/10", voice: "SEO Longform" },
  ];
  const [plat, setPlat] = useState(platforms[0]);

  return (
    <div
      className={`relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/80 ${
        compact ? "p-3" : "p-4 sm:p-5"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
          ReAct · Voice Engine
        </span>
        <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2 py-0.5 font-mono text-[9px] font-semibold text-[var(--accent)]">
          8× Promise.allSettled
        </span>
      </div>

      {/* 1-to-8 Parallel Fan-Out SVG */}
      <div className="my-2.5 flex items-center justify-center">
        <svg viewBox="0 0 210 56" className="h-[52px] w-full max-w-[230px]" aria-hidden="true">
          {[14, 38, 62, 86, 124, 148, 172, 196].map((tx, i) => (
            <g key={tx}>
              <path
                d={`M 105 10 C 105 28, ${tx} 26, ${tx} 46`}
                fill="none"
                stroke="var(--border-strong)"
                strokeWidth="1"
              />
              <motion.circle
                r="1.9"
                fill="var(--accent)"
                animate={{
                  cx: [105, (105 + tx) / 2, tx],
                  cy: [10, 28, 46],
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: 1.8,
                  delay: i * 0.12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <rect
                x={tx - 4}
                y="45"
                width="8"
                height="6"
                rx="1.5"
                fill="var(--bg-card)"
                stroke="var(--ink-primary)"
                strokeWidth="1"
              />
            </g>
          ))}
          <circle cx="105" cy="10" r="5.5" fill="var(--accent)" />
        </svg>
      </div>

      {!compact && (
        <div className="space-y-2 border-t border-dashed border-[var(--border-strong)] pt-2.5">
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {platforms.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPlat(p);
                }}
                className={`rounded-lg border py-1 font-mono text-[9px] font-medium transition-colors ${
                  plat.name === p.name
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-secondary)]"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between font-mono text-[9px] text-[var(--ink-secondary)]">
            <span>Voice: {plat.voice}</span>
            <span className="font-semibold text-[var(--ink-primary)]">
              Critic: {plat.score}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * FIG. 07 — AI Research Assistant: 3-Agent CrewAI Circuit + ChromaDB 768-dim
 */
export function ResearchAgentArtwork({ compact = false }: ArtworkProps) {
  const agents = ["Researcher", "Analyst", "Writer"];

  return (
    <div
      className={`relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/80 ${
        compact ? "p-3" : "p-4 sm:p-5"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
          CrewAI · Ollama
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2 py-0.5 font-mono text-[9px] text-[var(--ink-primary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          On-Device
        </span>
      </div>

      <div className="relative my-3.5 flex items-center justify-between gap-1">
        <div className="absolute left-4 right-4 top-1/2 h-[1px] -translate-y-1/2 bg-[var(--border-strong)]" />
        <motion.div
          animate={{ left: ["10%", "86%", "10%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--accent)]"
        />
        {agents.map((name, idx) => (
          <div
            key={name}
            className="relative z-10 flex flex-col items-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2.5 py-1.5 shadow-xs"
          >
            <span className="font-mono text-[8px] text-[var(--ink-muted)]">
              0{idx + 1}
            </span>
            <span className="text-[10px] font-semibold text-[var(--ink-primary)]">
              {name}
            </span>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="flex items-center justify-between border-t border-dashed border-[var(--border-strong)] pt-2.5 font-mono text-[9px] text-[var(--ink-secondary)]">
          <span>ChromaDB · nomic-embed</span>
          <span className="font-semibold text-[var(--accent)]">768-dim Top-5</span>
        </div>
      )}
    </div>
  );
}

export function ProjectArtworkSwitch({
  projectId,
  compact = false,
}: {
  projectId: string;
  compact?: boolean;
}) {
  switch (projectId) {
    case "the-orbit":
      return <OrbitArtwork compact={compact} />;
    case "odyssey-solver":
      return <OdysseyArtwork compact={compact} />;
    case "genome-guide":
      return <GenomeArtwork compact={compact} />;
    case "fluent-path":
      return <FluentArtwork compact={compact} />;
    case "meetmind-ai":
      return <MeetMindArtwork compact={compact} />;
    case "contentforge-ai":
      return <ContentForgeArtwork compact={compact} />;
    case "ai-research-assistant":
      return <ResearchAgentArtwork compact={compact} />;
    default:
      return null;
  }
}

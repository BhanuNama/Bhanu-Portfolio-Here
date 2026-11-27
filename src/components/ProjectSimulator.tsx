"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import { paperSound } from "@/lib/paperSound";

/**
 * Interactive mini-simulators embedded inside each Project Case Study Drawer.
 */
export function ProjectSimulator({ projectId }: { projectId: string }) {
  // The Orbit
  const [orbitMode, setOrbitMode] = useState<"swarm" | "screen" | "music">("swarm");
  const orbitModes = {
    swarm: "Binary-Tree P2P fMP4 Swarm · O(1) host upload · 32 KB SCTP → MSE buffer",
    screen: "2-Way Direct P2P (~14 ms) → auto-promotes to H.264 Simulcast at 3+ viewers",
    music: "Bit-exact .flac/.wav via 'orbit-music' DataChannel + synced .lrc lyrics",
  };

  // Odyssey-Dx V2
  const [odysseyNode, setOdysseyNode] = useState<"mica" | "ig" | "critic" | "cmo">("cmo");
  const odysseyData = {
    mica: "Alg 1 & 2: IS_A* MICA closures + Orphanet Bayesian LR+ / LR− across 12,883 diseases & onset windows (+0.65 / −1.85)",
    ig: "Alg 3 (<20ms): Vectorized NumPy Shannon IG splitter ranks Top-3 distinguishing Yes/No questions via POST /v1/clarify",
    critic: "Alg 4: 6-Specialist Groq/NIM pool + max-1 divergence rebuttal + NCBI/Neo4j ID verifier (100% verified · 0 fake IDs)",
    cmo: "100-Case Eval: 0.65×Graph + 0.35×Panel − 0.08×Obj → 57.0% Top-1 · 71.0% Top-3 · 74.0% Top-5 · 0.642 MRR",
  };

  // GenomeGuide V2
  const [variantKey, setVariantKey] = useState<"brca" | "splice" | "eval">("brca");
  const variantData = {
    brca: "BRCA1 c.68_69delAG → PVS1 (+8) + PS3 (+4) = +12 pts (P=99.86% Pathogenic) · ASJ GrpMax 0.42% · Critic PASSED ✓",
    splice: "BRCA1 c.5152+6del → |offset|=6 > 2 blocks PVS1 → PM2 (+2) VUS (32.5%) + Gap Solver: PS2/PS3 (+4) flips → Likely Pathogenic",
    eval: "300-Variant Stress Eval → 91.0% Acc (100% GrpMax · 88% NMD/Splice · 100% Conflicting) · 0/300 Flips · ECE 0.0431",
  };

  // FluentPath
  const [raschPart, setRaschPart] = useState<"E" | "H" | "I">("H");
  const raschData = {
    E: "Part E Dictation: Word Levenshtein (0.85) + Punctuation/Case (0.15) → Instant Rasch update",
    H: "Part H Repeat: Groq Whisper STT + 0.80 accuracy + 0.20 WPM/pause fluency → GSE 68 (B2+)",
    I: "Part I Speaking: 3-run LLM rubric median + speech guardrails → GSE 71 (B2+)",
  };

  // MeetMind AI
  const meetQuestions = [
    {
      q: "What were the Q2 API blockers?",
      cite: "Eng Sync #14 · 04:12",
      answer:
        "Rate limits on Whisper batch chunks caused timeouts on 60m+ recordings; resolved by parallel LLaMA 3.1 8B map-reduce chunking before LLaMA 3.3 70B merge.",
    },
    {
      q: "How are transcript citations verified?",
      cite: "RAG Spec #08 · 11:45",
      answer:
        "150-word overlapping chunks are embedded via all-MiniLM-L6-v2 (384-dim) into Supabase pgvector and queried via match_meeting_embeddings RPC.",
    },
  ];
  const [meetIdx, setMeetIdx] = useState<number>(0);

  // ContentForge AI
  const [forgeStep, setForgeStep] = useState<number>(4);
  const [forging, setForging] = useState(false);

  // AI Research Assistant
  const [crewStage, setCrewStage] = useState<"researcher" | "analyst" | "writer">("researcher");
  const crewData = {
    researcher: "Researcher Agent: Runs DuckDuckGo web search + ChromaDB 768-dim top-5 local RAG cosine lookup",
    analyst: "Analyst Agent: Synthesizes multi-document citations via Ollama llama3.2:1b zero-cloud runtime",
    writer: "Writer Agent: Compiles structured Markdown research report with verified [Source: filename] links",
  };
  const replayForge = () => {
    if (forging) return;
    paperSound.playClick();
    setForging(true);
    setForgeStep(1);
    window.setTimeout(() => setForgeStep(2), 450);
    window.setTimeout(() => setForgeStep(3), 900);
    window.setTimeout(() => {
      setForgeStep(4);
      setForging(false);
    }, 1350);
  };

  if (projectId === "the-orbit") {
    return (
      <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
            Live Stage Routing Simulator
          </span>
          <div className="flex gap-1.5">
            {(["swarm", "screen", "music"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  paperSound.playClick();
                  setOrbitMode(m);
                }}
                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase ${
                  orbitMode === m
                    ? "bg-[var(--ink-primary)] text-[var(--bg-paper)]"
                    : "border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-secondary)]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3 font-mono text-xs text-[var(--ink-primary)]">
          {orbitModes[orbitMode]}
        </div>
      </div>
    );
  }

  if (projectId === "odyssey-solver") {
    return (
      <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
            Odyssey-Dx V2 Engine Inspector
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                ["mica", "MICA + Bayes"],
                ["ig", "Shannon IG"],
                ["critic", "Citation Guard"],
                ["cmo", "100-Case Eval"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  paperSound.playClick();
                  setOdysseyNode(key);
                }}
                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] ${
                  odysseyNode === key
                    ? "bg-[var(--ink-primary)] text-[var(--bg-paper)]"
                    : "border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-secondary)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <motion.div
          key={odysseyNode}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3 text-xs leading-relaxed text-[var(--ink-primary)]"
        >
          {odysseyData[odysseyNode]}
        </motion.div>
      </div>
    );
  }

  if (projectId === "genome-guide") {
    return (
      <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
            GenomeGuide V2 Engine Trace
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                ["brca", "BRCA1 (+12 pts)"],
                ["splice", "Splice +6 Guard"],
                ["eval", "300-Case Eval"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  paperSound.playClick();
                  setVariantKey(k);
                }}
                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] ${
                  variantKey === k
                    ? "bg-[var(--ink-primary)] text-[var(--bg-paper)]"
                    : "border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-secondary)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3 font-mono text-[11px] leading-relaxed text-[var(--ink-primary)]">
          {variantData[variantKey]}
        </div>
      </div>
    );
  }

  if (projectId === "fluent-path") {
    return (
      <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
            Psychometric Rasch Pipeline
          </span>
          <div className="flex gap-1.5">
            {(["E", "H", "I"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  paperSound.playClick();
                  setRaschPart(p);
                }}
                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] ${
                  raschPart === p
                    ? "bg-[var(--ink-primary)] text-[var(--bg-paper)]"
                    : "border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-secondary)]"
                }`}
              >
                Part {p}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3 font-mono text-[11px] leading-relaxed text-[var(--ink-primary)]">
          {raschData[raschPart]}
        </div>
      </div>
    );
  }

  if (projectId === "meetmind-ai") {
    const active = meetQuestions[meetIdx];
    return (
      <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
            <Sparkles className="h-3 w-3" />
            Live Cited RAG Simulator
          </span>
          <span className="font-mono text-[10px] text-[var(--ink-muted)]">
            MiniLM-L6-v2 · 384-dim
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {meetQuestions.map((item, i) => (
            <button
              key={item.q}
              type="button"
              onClick={() => {
                paperSound.playClick();
                setMeetIdx(i);
              }}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                meetIdx === i
                  ? "border-[var(--ink-primary)] bg-[var(--ink-primary)] text-[var(--bg-paper)]"
                  : "border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
              }`}
            >
              {item.q}
            </button>
          ))}
        </div>

        <motion.div
          key={meetIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3.5"
        >
          <p className="text-xs leading-relaxed text-[var(--ink-primary)] sm:text-sm">
            {active.answer}
          </p>
          <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-[var(--accent)]">
            <span>SOURCE MATCH: {active.cite}</span>
            <span>pgvector cos: 0.92</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (projectId === "ai-research-assistant") {
    return (
      <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
            3-Agent CrewAI + Ollama Inspector
          </span>
          <div className="flex gap-1.5">
            {(["researcher", "analyst", "writer"] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => {
                  paperSound.playClick();
                  setCrewStage(a);
                }}
                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] capitalize ${
                  crewStage === a
                    ? "bg-[var(--ink-primary)] text-[var(--bg-paper)]"
                    : "border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-secondary)]"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3 font-mono text-[11px] leading-relaxed text-[var(--ink-primary)]">
          {crewData[crewStage]}
        </div>
      </div>
    );
  }

  // ContentForge AI
  const stages = [
    { stage: "01 Orchestrator", msg: "Classified blog input → built 8-platform execution plan" },
    { stage: "02 Analyst + Voice", msg: "Extracted brief + injected Brand Voice Profile (tone: direct)" },
    { stage: "03 8× Platform Agents", msg: "Generated X, LinkedIn, YouTube, Email, Blog via Promise.allSettled" },
    { stage: "04 Critic Gate", msg: "Scored 9.2/10 across brand alignment — zero retries needed" },
  ];

  return (
    <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
          <Terminal className="h-3 w-3" />
          4-Stage Forge Pipeline Trace
        </span>
        <button
          type="button"
          onClick={replayForge}
          className="inline-flex items-center gap-1 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-3 py-1 font-mono text-[10px] font-semibold text-[var(--ink-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <Play className="h-2.5 w-2.5" />
          <span>{forging ? "Forging..." : "Replay Forge"}</span>
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {stages.map((s, i) => {
          const done = forgeStep > i;
          return (
            <div
              key={s.stage}
              className={`flex items-start gap-2.5 rounded-xl border p-2.5 text-xs transition-colors ${
                done
                  ? "border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--ink-primary)]"
                  : "border-[var(--border-hairline)] bg-[var(--bg-well)]/40 text-[var(--ink-muted)] opacity-55"
              }`}
            >
              <CheckCircle2
                className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                  done ? "text-[var(--accent)]" : "text-[var(--ink-muted)]"
                }`}
              />
              <div>
                <span className="font-mono text-[10px] font-semibold">{s.stage}</span>
                <div className="mt-0.5 text-[11px] text-[var(--ink-secondary)]">{s.msg}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

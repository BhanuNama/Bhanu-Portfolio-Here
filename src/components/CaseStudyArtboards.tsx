"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Dna,
  GitBranch,
  Headphones,
  Mic,
  Play,
  Radio,
  ShieldCheck,
  Sliders,
  Sparkles,
  Ticket,
  Activity,
} from "lucide-react";
import { paperSound } from "@/lib/paperSound";

/**
 * Full-width interactive museum-grade engineering artboards for /projects/[id].
 */
export function CaseStudyArtboard({ projectId }: { projectId: string }) {
  switch (projectId) {
    case "the-orbit":
      return <OrbitCaseArtboard />;
    case "odyssey-solver":
      return <OdysseyCaseArtboard />;
    case "genome-guide":
      return <GenomeCaseArtboard />;
    case "fluent-path":
      return <FluentCaseArtboard />;
    case "meetmind-ai":
      return <MeetMindCaseArtboard />;
    case "contentforge-ai":
      return <ContentForgeCaseArtboard />;
    case "show-time":
      return <ShowTimeCaseArtboard />;
    case "ai-research-assistant":
      return <ResearchCaseArtboard />;
    case "nutri-guide":
      return <NutriGuideCaseArtboard />;
    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/* 1. THE ORBIT (Popcorn-Room)                                                */
/* -------------------------------------------------------------------------- */
function OrbitCaseArtboard() {
  const [stage, setStage] = useState<"swarm" | "screen" | "youtube" | "music">("swarm");
  const [streamVol, setStreamVol] = useState(88);
  const [voiceVol, setVoiceVol] = useState(72);
  const [smartDuck, setSmartDuck] = useState(true);

  const spectrum = [34, 72, 52, 92, 64, 96, 48, 82, 62, 88, 42, 74, 58, 90, 44, 70];

  const stages = [
    { id: "swarm", label: "4K P2P Swarm", meta: "O(1) Host · 32KB SCTP → MSE" },
    { id: "screen", label: "60fps Screen Share", meta: "2-Way P2P (~14ms) → 3+ Simulcast" },
    { id: "youtube", label: "YouTube NTP Sync", meta: "8-Probe Min-RTT · ±0.8s Lockstep" },
    { id: "music", label: "Hi-Fi Music Lounge", meta: "Bit-Exact .flac + Synced .lrc" },
  ] as const;

  const activeStage = stages.find((s) => s.id === stage) ?? stages[0];

  return (
    <div className="drafting-grid rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-primary)]">
          <Radio className="h-4 w-4 text-[var(--accent)]" />
          <span className="font-semibold">ORBIT MEDIA ENGINE · INTERACTIVE CONSOLE</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {stages.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                paperSound.playClick();
                setStage(s.id);
              }}
              className={`relative rounded-full px-3 py-1 font-mono text-[11px] font-medium transition-colors ${
                stage === s.id
                  ? "text-white"
                  : "border border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
              }`}
            >
              {stage === s.id && (
                <motion.span
                  layoutId="orbit-stage-pill"
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  className="absolute inset-0 rounded-full bg-[var(--accent)]"
                />
              )}
              <span className="relative z-10">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left 7 Cols: Stage Visualizer */}
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-7">
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--ink-muted)]">
            <span>STAGE: {activeStage.label.toUpperCase()}</span>
            <span className="font-semibold text-[var(--accent)]">{activeStage.meta}</span>
          </div>

          <div className="my-5 flex h-40 items-center justify-center">
            {stage === "music" ? (
              <div className="flex w-full max-w-md items-center gap-6 px-2">
                {/* Spinning Vinyl Sleeve Disc */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-[var(--ink-primary)] bg-[var(--bg-card)] shadow-xs"
                >
                  <div className="h-14 w-14 rounded-full border border-dashed border-[var(--border-strong)]" />
                  <div className="absolute h-6 w-6 rounded-full bg-[var(--accent)]" />
                  <div className="absolute h-2 w-2 rounded-full bg-[var(--bg-paper)]" />
                </motion.div>

                {/* 16-bar 128-bin Audio Spectrum */}
                <div className="flex h-24 flex-1 items-end justify-between gap-1.5">
                  {spectrum.map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [`${Math.max(18, h * 0.35)}%`, `${h}%`, `${Math.max(20, h * 0.4)}%`],
                      }}
                      transition={{
                        duration: 1.05 + (i % 4) * 0.18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.05,
                      }}
                      className={`w-2 rounded-full ${
                        i % 3 === 1 ? "bg-[var(--accent)]" : "bg-[var(--ink-primary)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : stage === "youtube" ? (
              <div className="w-full max-w-md space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-[var(--ink-primary)]">
                  <span>ServerClock.now() = Date.now() + offsetMs</span>
                  <span className="font-semibold text-[var(--accent)]">RTT_min: 14.2 ms</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
                  <div className="rounded-xl border border-[var(--accent)] bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
                    <div className="font-bold">|drift| ≤ 0.8s</div>
                    <div className="mt-1 opacity-80">Hold 1.0× Rate</div>
                  </div>
                  <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3 text-[var(--ink-primary)]">
                    <div className="font-bold">0.8s – 2.5s</div>
                    <div className="mt-1 text-[var(--ink-muted)]">0.96× / 1.04× Nudge</div>
                  </div>
                  <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3 text-[var(--ink-primary)]">
                    <div className="font-bold">&gt; 2.5s Drift</div>
                    <div className="mt-1 text-[var(--ink-muted)]">Instant seekTo()</div>
                  </div>
                </div>
              </div>
            ) : stage === "screen" ? (
              <div className="w-full max-w-md space-y-3">
                <div className="grid grid-cols-2 gap-3 font-mono text-[10px]">
                  <div className="rounded-2xl border border-[var(--accent)] bg-[var(--bg-card)] p-3.5">
                    <div className="font-semibold text-[var(--accent)]">2-Way Direct P2P</div>
                    <div className="mt-1 text-xs font-bold text-[var(--ink-primary)]">~10–20 ms</div>
                    <div className="mt-1 text-[var(--ink-secondary)]">SDP munge 6–12 Mbps</div>
                  </div>
                  <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3.5">
                    <div className="font-semibold text-[var(--ink-primary)]">3+ H.264 Simulcast</div>
                    <div className="mt-1 text-xs font-bold text-[var(--ink-primary)]">60 fps</div>
                    <div className="mt-1 text-[var(--ink-secondary)]">Zero re-pick handoff</div>
                  </div>
                </div>
                <div className="rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-card)] px-3 py-2 font-mono text-[10px] text-[var(--ink-secondary)]">
                  4s RTCRtpSender Autopilot · Packet loss &gt;3% scales 0.85× cleanly
                </div>
              </div>
            ) : (
              <svg viewBox="0 0 320 124" className="h-36 w-full max-w-md" aria-hidden="true">
                <motion.ellipse
                  cx="160"
                  cy="62"
                  rx="138"
                  ry="46"
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                  animate={{ strokeDashoffset: [0, -24] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <path
                  d="M160 18 L86 62 M160 18 L234 62 M86 62 L48 106 M86 62 L124 106 M234 62 L196 106 M234 62 L272 106"
                  stroke="var(--border-strong)"
                  strokeWidth="1.4"
                  strokeDasharray="3 3"
                />
                <motion.circle
                  r="3.5"
                  fill="var(--accent)"
                  animate={{ cx: [160, 86, 48], cy: [18, 62, 106], opacity: [0.3, 1, 0.2] }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                  r="3.5"
                  fill="var(--accent)"
                  animate={{ cx: [160, 234, 272], cy: [18, 62, 106], opacity: [0.3, 1, 0.2] }}
                  transition={{ duration: 1.9, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <circle cx="160" cy="18" r="11" fill="var(--accent)" />
                <text x="160" y="21" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="monospace">
                  HOST
                </text>
                {[86, 234].map((x, i) => (
                  <g key={x}>
                    <circle cx={x} cy="62" r="8.5" fill="var(--bg-card)" stroke="var(--ink-primary)" strokeWidth="1.4" />
                    <text x={x} y="65" textAnchor="middle" fill="var(--ink-primary)" fontSize="7" fontFamily="monospace">
                      G{i}
                    </text>
                  </g>
                ))}
                {[48, 124, 196, 272].map((x, i) => (
                  <g key={x}>
                    <circle cx={x} cy="106" r="6.5" fill="var(--bg-card)" stroke="var(--ink-muted)" strokeWidth="1.2" />
                    <text x={x} y="108.5" textAnchor="middle" fill="var(--ink-muted)" fontSize="6.5" fontFamily="monospace">
                      G{i + 2}
                    </text>
                  </g>
                ))}
              </svg>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-[var(--border-strong)] pt-3 font-mono text-[10px] text-[var(--ink-secondary)]">
            <span>32×18 Canvas Ambilight · 6 Themes</span>
            <span className="font-semibold text-[var(--ink-primary)]">120 ms Single-Element Playout Lock</span>
          </div>
        </div>

        {/* Right 5 Cols: Interactive Dual-Track Audio Isolation Mixer */}
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                <Headphones className="h-3.5 w-3.5" />
                Dual-Track Mixer
              </span>
              <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2 py-0.5 font-mono text-[9px] text-[var(--ink-muted)]">
                red: false · DSP OFF
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-1.5 flex justify-between font-mono text-[11px]">
                  <span className="text-[var(--ink-primary)]">Movie / Tab Stereo (256 kbps)</span>
                  <span className="font-semibold text-[var(--accent)]">{streamVol}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={streamVol}
                  onChange={(e) => setStreamVol(Number(e.target.value))}
                  aria-label="Movie audio volume"
                  className="w-full accent-[#e04e26]"
                />
              </div>

              <div>
                <div className="mb-1.5 flex justify-between font-mono text-[11px]">
                  <span className="text-[var(--ink-primary)]">Friends Mono Voice (40 kbps)</span>
                  <span className="font-semibold text-[var(--ink-secondary)]">{voiceVol}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={voiceVol}
                  onChange={(e) => setVoiceVol(Number(e.target.value))}
                  aria-label="Voice chat volume"
                  className="w-full accent-[#141413]"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  paperSound.playClick();
                  setSmartDuck((d) => !d);
                }}
                className="flex w-full items-center justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] px-3.5 py-2.5 font-mono text-[11px]"
              >
                <span className="inline-flex items-center gap-2 text-[var(--ink-primary)]">
                  <Sliders className="h-3.5 w-3.5 text-[var(--accent)]" />
                  Smart Ducking (−3 dB on voice)
                </span>
                <span className={smartDuck ? "font-semibold text-[var(--accent)]" : "text-[var(--ink-muted)]"}>
                  {smartDuck ? "ON" : "OFF"}
                </span>
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-card)] p-3 font-mono text-[10px] text-[var(--ink-secondary)]">
            Bluetooth HFP Guard: Excludes headset telephony mics &amp; preserves 48 kHz A2DP stereo.
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. ODYSSEY SOLVER (Claude-Group-2)                                         */
/* -------------------------------------------------------------------------- */
function OdysseyCaseArtboard() {
  const [selectedPheno, setSelectedPheno] = useState<number>(0);

  const phenotypes = [
    { id: "HP:0003236", label: "Markedly Elevated CK", disease: "Duchenne Muscular Dystrophy", gene: "DMD (Xp21)", score: "0.94" },
    { id: "HP:0003707", label: "Calf Pseudohypertrophy", disease: "Becker Muscular Dystrophy", gene: "DMD (Xp21)", score: "0.91" },
    { id: "HP:0000407", label: "Sensorineural Hearing Loss", disease: "Mitochondrial Myopathy", gene: "MT-TL1", score: "0.78" },
  ];

  const specialists = [
    { name: "Neurology", conf: 92, stance: "Supports DMD" },
    { name: "Genetics", conf: 95, stance: "X-Linked Maternal" },
    { name: "Metabolic", conf: 68, stance: "Rule out Pompe" },
    { name: "Musculoskeletal", conf: 89, stance: "Proximal Weakness" },
    { name: "Cardiology", conf: 74, stance: "Monitor Echo" },
    { name: "Sensory", conf: 64, stance: "Flag Hearing Nuance" },
  ];

  const activeP = phenotypes[selectedPheno];

  return (
    <div className="drafting-grid rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-primary)]">
          <GitBranch className="h-4 w-4 text-[var(--accent)]" />
          <span className="font-semibold">NEO4J GRAPHRAG · 285,334 HPO ASSOCIATIONS</span>
        </div>
        <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3 py-1 font-mono text-[10px] text-[var(--accent)]">
          CMO: 0.7×Graph + 0.3×Panel − Penalty
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left 7 Cols: Interactive SVG Bipartite Graph + Node Cards */}
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-7">
          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
              Click a Phenotype Node to Traverse Neo4j GraphRAG Path
            </div>

            {/* Animated SVG Bipartite Topology */}
            <svg viewBox="0 0 360 72" className="mb-4 h-16 w-full" aria-hidden="true">
              {[18, 36, 54].map((y, idx) => (
                <g key={y}>
                  <path
                    d={`M 48 ${y} C 110 ${y}, 130 36, 180 36`}
                    fill="none"
                    stroke={selectedPheno === idx ? "var(--accent)" : "var(--border-strong)"}
                    strokeWidth={selectedPheno === idx ? "1.8" : "1"}
                    strokeDasharray={selectedPheno === idx ? "none" : "3 3"}
                  />
                  <circle
                    cx="48"
                    cy={y}
                    r="5"
                    fill={selectedPheno === idx ? "var(--accent)" : "var(--bg-card)"}
                    stroke="var(--ink-primary)"
                    strokeWidth="1.2"
                  />
                </g>
              ))}
              <path
                d="M 180 36 C 235 36, 265 36, 312 36"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.8"
              />
              <motion.circle
                r="3"
                fill="var(--accent)"
                animate={{
                  cx: [48, 180, 312],
                  cy: [18 + selectedPheno * 18, 36, 36],
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <circle cx="180" cy="36" r="8" fill="var(--accent)" />
              <rect x="305" y="29" width="14" height="14" rx="3" fill="var(--bg-card)" stroke="var(--ink-primary)" strokeWidth="1.4" />
            </svg>

            <div className="grid items-center gap-3 sm:grid-cols-3">
              <div className="space-y-2">
                {phenotypes.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      paperSound.playClick();
                      setSelectedPheno(idx);
                    }}
                    className={`w-full rounded-xl border p-2.5 text-left font-mono text-[10px] transition-all ${
                      selectedPheno === idx
                        ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-xs"
                        : "border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-primary)]"
                    }`}
                  >
                    <div className="opacity-75">{p.id}</div>
                    <div className="mt-0.5 font-sans text-xs font-semibold">{p.label}</div>
                  </button>
                ))}
              </div>

              <motion.div
                key={activeP.disease}
                initial={{ scale: 0.96, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--bg-card)] p-4 text-center"
              >
                <div className="font-mono text-[9px] uppercase text-[var(--accent)]">
                  Candidate Disease
                </div>
                <div className="mt-1 text-sm font-bold text-[var(--ink-primary)]">
                  {activeP.disease}
                </div>
                <div className="mt-2 font-mono text-xs font-semibold text-[var(--accent)]">
                  IC Score: {activeP.score}
                </div>
              </motion.div>

              <motion.div
                key={activeP.gene}
                initial={{ x: 6, opacity: 0.6 }}
                animate={{ x: 0, opacity: 1 }}
                className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] p-4 text-center"
              >
                <div className="font-mono text-[9px] uppercase text-[var(--ink-muted)]">
                  Causative Gene
                </div>
                <div className="mt-1 font-mono text-base font-bold text-[var(--ink-primary)]">
                  {activeP.gene}
                </div>
                <div className="mt-1 font-mono text-[9px] text-[var(--ink-secondary)]">
                  Orphanet Linked
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: 6-Specialist Debate Panel */}
        <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-5">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
            <span>6-Specialist Debate Panel</span>
            <span className="text-[var(--accent)]">+ Red Team</span>
          </div>
          <div className="space-y-2">
            {specialists.map((s, idx) => (
              <div key={s.name} className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] px-3 py-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-semibold text-[var(--ink-primary)]">{s.name}</span>
                  <span className="text-[var(--ink-secondary)]">{s.stance} · {s.conf}%</span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[var(--bg-well)]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.conf}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: idx * 0.05 }}
                    className="h-full rounded-full bg-[var(--accent)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. GENOMEGUIDE                                                             */
/* -------------------------------------------------------------------------- */
function GenomeCaseArtboard() {
  const variants = [
    {
      id: "brca1",
      label: "BRCA1 c.68_69delAG",
      rules: ["PVS1", "PS3"],
      verdict: "Pathogenic",
      clinvar: "★3 Expert Panel (95 submitters)",
      gnomad: "AF 0.000116 (169 / 1.46M alleles)",
      pmid: "PMID: 42676320 · 40257527",
      latency: "3,062 ms",
    },
    {
      id: "cftr",
      label: "CFTR c.1521_1523delCTT",
      rules: ["PVS1", "PS3", "PM2"],
      verdict: "Pathogenic",
      clinvar: "★4 Practice Guideline",
      gnomad: "AF 0.0068 (ΔF508)",
      pmid: "PMID: 39184420",
      latency: "2,840 ms",
    },
    {
      id: "benign",
      label: "BRCA1 c.1314G>A",
      rules: ["BA1", "BP6"],
      verdict: "Likely Benign",
      clinvar: "★3 Benign Consensus",
      gnomad: "AF 0.0541 (Common SNP)",
      pmid: "PMID: 31131967",
      latency: "2,410 ms",
    },
    {
      id: "vus",
      label: "BRCA1 c.3306T>A",
      rules: [] as string[],
      verdict: "Conservative VUS",
      clinvar: "Conflicting / Uncertain",
      gnomad: "AF 0.00004 (Insufficient)",
      pmid: "PMID: 35665744",
      latency: "2,790 ms",
    },
  ];
  const [idx, setIdx] = useState(0);
  const active = variants[idx];
  const allRules = ["PVS1", "PS3", "PM2", "BA1", "BP6"];

  const traceWaterfall = [
    { name: "Parser Agent", ms: 280, pct: 20 },
    { name: "ClinVar + gnomAD + PubMed", ms: 850, pct: 60 },
    { name: "ACMG Rule Engine", ms: 12, pct: 5 },
    { name: "Explainer Synthesis", ms: 1400, pct: 95 },
    { name: "Adversarial Critic", ms: 520, pct: 38 },
  ];

  return (
    <div className="drafting-grid rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-primary)]">
          <Dna className="h-4 w-4 text-[var(--accent)]" />
          <span className="font-semibold">DETERMINISTIC ACMG + DUAL-RAG LAB</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {variants.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => {
                paperSound.playClick();
                setIdx(i);
              }}
              className={`rounded-full px-3 py-1 font-mono text-[10px] font-medium transition-colors ${
                idx === i
                  ? "bg-[var(--ink-primary)] text-[var(--bg-paper)]"
                  : "border border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-secondary)]"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Smooth DNA Helix Scanner Strip */}
      <div className="mt-5 flex items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-4 py-2.5">
        <svg viewBox="0 0 420 44" className="h-11 w-full max-w-2xl" aria-hidden="true">
          {[32, 64, 96, 160, 192, 224, 288, 320, 352, 384].map((x) => (
            <line
              key={x}
              x1={x}
              y1="10"
              x2={x}
              y2="34"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="1.5 1.5"
            />
          ))}
          <path
            d="M 10 22 C 42 4, 94 4, 126 22 C 158 40, 210 40, 242 22 C 274 4, 326 4, 358 22 C 378 33, 396 33, 412 22"
            fill="none"
            stroke="var(--ink-primary)"
            strokeWidth="1.6"
          />
          <path
            d="M 10 22 C 42 40, 94 40, 126 22 C 158 4, 210 4, 242 22 C 274 40, 326 40, 358 22 C 378 11, 396 11, 412 22"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <motion.line
            y1="3"
            y2="41"
            stroke="var(--accent)"
            strokeWidth="1.6"
            strokeOpacity="0.7"
            animate={{ x1: [16, 404, 16], x2: [16, 404, 16] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-7">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold text-[var(--ink-primary)]">
              {active.label}
            </span>
            <span className="rounded-full bg-[var(--accent)] px-3 py-0.5 font-mono text-[10px] font-semibold text-white">
              {active.verdict}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs sm:grid-cols-5">
            {allRules.map((rule) => {
              const hit = active.rules.includes(rule);
              return (
                <div
                  key={rule}
                  className={`rounded-xl border py-2 font-semibold transition-all ${
                    hit
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-muted)] opacity-50"
                  }`}
                >
                  {rule}
                </div>
              );
            })}
          </div>

          <div className="grid gap-2.5 sm:grid-cols-3">
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3 font-mono text-[10px]">
              <div className="text-[var(--ink-muted)]">NCBI ClinVar</div>
              <div className="mt-1 font-semibold text-[var(--ink-primary)]">{active.clinvar}</div>
            </div>
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3 font-mono text-[10px]">
              <div className="text-[var(--ink-muted)]">Broad gnomAD v4</div>
              <div className="mt-1 font-semibold text-[var(--ink-primary)]">{active.gnomad}</div>
            </div>
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3 font-mono text-[10px]">
              <div className="text-[var(--ink-muted)]">PubMed RAG</div>
              <div className="mt-1 font-semibold text-[var(--ink-primary)]">{active.pmid}</div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Benchmark + LangSmith Waterfall */}
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[var(--ink-muted)]">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--accent)]">
                <ShieldCheck className="h-3.5 w-3.5" />
                50-Variant ClinVar Eval
              </span>
              <span>{active.latency}</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3">
                <div className="text-xl font-bold text-[var(--accent)]">0 / 50</div>
                <div className="font-mono text-[9.5px] text-[var(--ink-secondary)]">
                  Directional Errors
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3">
                <div className="text-xl font-bold text-[var(--ink-primary)]">0.0%</div>
                <div className="font-mono text-[9.5px] text-[var(--ink-secondary)]">
                  Hallucination Rate
                </div>
              </div>
            </div>

            <div className="mt-3.5 space-y-1.5">
              {traceWaterfall.map((t, i) => (
                <div key={t.name} className="font-mono text-[9.5px]">
                  <div className="flex justify-between text-[var(--ink-secondary)]">
                    <span>{t.name}</span>
                    <span>{t.ms} ms</span>
                  </div>
                  <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-[var(--bg-well)]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.65, delay: i * 0.06 }}
                      className={`h-full rounded-full ${
                        t.ms === 12 ? "bg-[var(--accent)]" : "bg-[var(--ink-primary)]"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. FLUENTPATH (Versant-Fluent)                                             */
/* -------------------------------------------------------------------------- */
function FluentCaseArtboard() {
  const parts = [
    { id: "A", name: "Sentence Completion", skill: "Reading", timer: "25s", mode: "Objective Levenshtein", gse: 62 },
    { id: "B", name: "Passage Reconstruction", skill: "Writing", timer: "120s", mode: "0.5 Det + 0.5 LLM Rubric", gse: 67 },
    { id: "C", name: "Reading Comprehension", skill: "Reading", timer: "180s", mode: "MCQ Rasch (guess 0.25)", gse: 65 },
    { id: "D", name: "Email Writing", skill: "Writing", timer: "540s", mode: "Theme + Grammar + Rubric", gse: 70 },
    { id: "E", name: "Dictation", skill: "Listening", timer: "35s", mode: "0.85 Word + 0.15 Punct", gse: 64 },
    { id: "F", name: "Response Selection", skill: "Listening", timer: "20s", mode: "MCQ Rasch (guess 0.33)", gse: 66 },
    { id: "G", name: "Passage Comprehension", skill: "Listening", timer: "110s", mode: "Whisper + MiniLM Cosine", gse: 71 },
    { id: "H", name: "Repeat Sentence", skill: "Speaking", timer: "30s", mode: "0.80 Acc + 0.20 Fluency", gse: 69 },
    { id: "I", name: "Speaking Situations", skill: "Speaking", timer: "80s", mode: "0.60 Rubric + 0.40 Fluency", gse: 74 },
    { id: "J", name: "Story Retelling", skill: "Speaking", timer: "75s", mode: "0.35 Cov + 0.35 Rub + 0.30 Flu", gse: 78 },
  ];
  const [selectedPart, setSelectedPart] = useState(parts[7]);

  const cefrLabel =
    selectedPart.gse >= 76 ? "C1" : selectedPart.gse >= 59 ? "B2+" : "B1";
  const barPct = Math.round(((selectedPart.gse - 10) / 80) * 100);
  const diffTokens = [
    { word: "The", tag: "ok" },
    { word: "project", tag: "ok" },
    { word: "timeline", tag: "sub" },
    { word: "shifted", tag: "ok" },
    { word: "forward", tag: "ok" },
  ];

  return (
    <div className="drafting-grid rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-primary)]">
          <Mic className="h-4 w-4 text-[var(--accent)]" />
          <span className="font-semibold">10-PART ASSESSMENT &amp; BAYESIAN RASCH ENGINE</span>
        </div>
        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] font-semibold text-[var(--accent)]">
          GSE {selectedPart.gse} · CEFR {cefrLabel}
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-7">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
            Select Any Part (A–J) to Inspect Psychometric Formula
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {parts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  paperSound.playClick();
                  setSelectedPart(p);
                }}
                className={`rounded-xl border p-2.5 text-left font-mono transition-all ${
                  selectedPart.id === p.id
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-primary)] hover:border-[var(--ink-primary)]"
                }`}
              >
                <div className="text-xs font-bold">Part {p.id}</div>
                <div className="mt-0.5 truncate text-[9px] opacity-80">{p.skill}</div>
              </button>
            ))}
          </div>

          {/* Levenshtein Word Alignment Chip Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3">
            <div className="flex flex-wrap gap-1.5">
              {diffTokens.map((t) => (
                <span
                  key={t.word}
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${
                    t.tag === "ok"
                      ? "border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-primary)]"
                      : "border-[var(--accent)]/40 bg-[var(--accent-soft)] font-semibold text-[var(--accent)]"
                  }`}
                >
                  {t.word} <span className="opacity-60">({t.tag})</span>
                </span>
              ))}
            </div>
            <span className="font-mono text-[9.5px] text-[var(--ink-muted)]">
              Levenshtein Diff
            </span>
          </div>

          <div className="mt-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-3.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[var(--ink-primary)]">
                Part {selectedPart.id} — {selectedPart.name}
              </span>
              <span className="text-[var(--accent)]">{selectedPart.timer} limit</span>
            </div>
            <div className="mt-1 text-[11px] text-[var(--ink-secondary)]">
              Scoring: {selectedPart.mode}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Posterior Curve + GSE Ruler & Speech Telemetry */}
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-5">
          <div>
            <div className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">
              Bayesian EAP Posterior (GSE 10–90)
            </div>

            <svg viewBox="0 0 240 62" className="my-3 h-16 w-full" aria-hidden="true">
              <line x1="10" y1="54" x2="230" y2="54" stroke="var(--border-strong)" strokeWidth="1" />
              <path
                d="M 14 54 C 60 54, 84 10, 120 10 C 156 10, 180 54, 226 54"
                fill="var(--accent-soft)"
                stroke="var(--ink-primary)"
                strokeWidth="1.5"
              />
              <motion.g
                animate={{ x: (barPct / 100) * 200 - 100 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                <line x1="120" y1="8" x2="120" y2="54" stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="2 2" />
                <circle cx="120" cy="10" r="3.5" fill="var(--accent)" />
              </motion.g>
            </svg>

            <div>
              <div className="h-2 w-full overflow-hidden rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)]">
                <motion.div
                  animate={{ width: `${barPct}%` }}
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  className="h-full rounded-full bg-[var(--accent)]"
                />
              </div>
              <div className="mt-1.5 flex justify-between font-mono text-[9px] text-[var(--ink-muted)]">
                <span>10 (A1)</span>
                <span>43 (B1)</span>
                <span>59 (B2)</span>
                <span>76 (C1)</span>
                <span>90</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-2.5">
                <div className="font-bold text-[var(--ink-primary)]">142 WPM</div>
                <div className="text-[9px] text-[var(--ink-muted)]">Speech Rate</div>
              </div>
              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-2.5">
                <div className="font-bold text-[var(--ink-primary)]">0.14</div>
                <div className="text-[9px] text-[var(--ink-muted)]">Pause Ratio</div>
              </div>
              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-2.5">
                <div className="font-bold text-[var(--accent)]">3-Run</div>
                <div className="text-[9px] text-[var(--ink-muted)]">Judge Median</div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-card)] p-3 font-mono text-[10px] text-[var(--ink-secondary)]">
            134 Seed Items + Unseen-First Groq Generator · HMAC 5m Audio URLs
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. MEETMIND AI                                                             */
/* -------------------------------------------------------------------------- */
function MeetMindCaseArtboard() {
  const [tab, setTab] = useState<"extract" | "rag">("rag");
  const [qIdx, setQIdx] = useState(0);

  const bars = [28, 52, 76, 44, 90, 66, 36, 82, 58, 42, 70, 48, 84, 54];

  const queries = [
    {
      q: "Why did long transcript extraction need Map-Reduce?",
      cite: "Architecture Sync #14 · cos 0.93",
      ans: "Recordings over 12k chars are split into overlapping 3k-char chunks, extracted concurrently via LLaMA 3.1 8B, and merged/deduplicated by LLaMA 3.3 70B.",
    },
    {
      q: "How are semantic search results isolated per user?",
      cite: "Supabase Migration #03 · cos 0.91",
      ans: "All API routes verify Clerk sessions server-side and pass filter_user_id into the match_meeting_embeddings vector(384) Postgres RPC.",
    },
  ];

  return (
    <div className="drafting-grid rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-primary)]">
          <Sparkles className="h-4 w-4 text-[var(--accent)]" />
          <span className="font-semibold">MAP-REDUCE &amp; PGVECTOR WORKSPACE</span>
        </div>
        <div className="flex gap-1.5">
          {(
            [
              ["rag", "Cited RAG Search (384-dim)"],
              ["extract", "Map-Reduce Zod Output"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                paperSound.playClick();
                setTab(id);
              }}
              className={`rounded-full px-3 py-1 font-mono text-[11px] font-medium ${
                tab === id
                  ? "bg-[var(--ink-primary)] text-[var(--bg-paper)]"
                  : "border border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-secondary)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Whisper Waveform -> Map-Reduce Pipeline Strip */}
      <div className="mt-5 grid items-center gap-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4 sm:grid-cols-12">
        <div className="flex h-10 items-center justify-between gap-1 sm:col-span-5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              animate={{
                height: [`${Math.max(20, h * 0.4)}%`, `${h}%`, `${Math.max(24, h * 0.45)}%`],
              }}
              transition={{
                duration: 1.5 + (i % 4) * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.05,
              }}
              className={`w-1.5 rounded-full ${
                i === 4 || i === 12 ? "bg-[var(--accent)]" : "bg-[var(--ink-primary)]/75"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px] sm:col-span-7">
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] py-2 text-[var(--ink-secondary)]">
            Whisper v3
          </div>
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] py-2 text-[var(--ink-secondary)]">
            3× LLaMA 8B Map
          </div>
          <div className="rounded-xl border border-[var(--accent)] bg-[var(--accent-soft)] py-2 font-semibold text-[var(--accent)]">
            70B Reduce + pgvector
          </div>
        </div>
      </div>

      <div className="mt-5">
        {tab === "rag" ? (
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="space-y-2.5 lg:col-span-5">
              {queries.map((item, i) => (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => {
                    paperSound.playClick();
                    setQIdx(i);
                  }}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                    qIdx === i
                      ? "border-[var(--accent)] bg-[var(--bg-paper)]"
                      : "border-[var(--border-hairline)] bg-[var(--bg-paper)]/50 hover:bg-[var(--bg-paper)]"
                  }`}
                >
                  <div className="font-mono text-[10px] text-[var(--accent)]">{item.cite}</div>
                  <div className="mt-1 text-sm font-semibold text-[var(--ink-primary)]">{item.q}</div>
                </button>
              ))}
            </div>
            <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-7">
              <div className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">
                Grounded LLaMA 3.3 70B Response
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-primary)]">
                {queries[qIdx].ans}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--ink-primary)] px-3 py-1 font-mono text-[10px] text-[var(--bg-paper)]">
                {queries[qIdx].cite}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-3 font-mono text-xs sm:grid-cols-4">
            {[
              { title: "Summary", detail: "2–4 sentence Zod recap" },
              { title: "Action Items", detail: "Owner + due date + toggle" },
              { title: "Decisions", detail: "Tracked key outcomes" },
              { title: "Blockers & Tone", detail: "Risk flags + sentiment" },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4"
              >
                <div className="font-bold text-[var(--accent)]">{b.title}</div>
                <div className="mt-1 text-[11px] text-[var(--ink-secondary)]">{b.detail}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. CONTENTFORGE AI                                                         */
/* -------------------------------------------------------------------------- */
function ContentForgeCaseArtboard() {
  const platforms = [
    { name: "Twitter / X", score: "9.4", preview: "Hook-first thread with punchy architectural contrasts & 3 engagement variants." },
    { name: "LinkedIn", score: "9.2", preview: "Long-form engineering story with scannable lessons and soft-sell CTA." },
    { name: "YouTube", score: "9.1", preview: "Structured script with cold-open hook, timestamped chapters & SEO title." },
    { name: "Email", score: "9.3", preview: "Subject A/B variants + concise newsletter-ready campaign body." },
    { name: "Instagram", score: "8.9", preview: "Carousel caption, curated hashtag cluster & accessibility alt text." },
    { name: "TikTok", score: "9.0", preview: "30-second hook-first short-form pacing script." },
    { name: "Newsletter", score: "9.4", preview: "Standalone editorial digest with key takeaways & links." },
    { name: "Blog", score: "9.5", preview: "Full SEO-structured markdown article with H2 hierarchy." },
  ];
  const [selected, setSelected] = useState(platforms[0]);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    if (!pulsing) return;
    const t = window.setTimeout(() => setPulsing(false), 1200);
    return () => window.clearTimeout(t);
  }, [pulsing]);

  return (
    <div className="drafting-grid rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-primary)]">
          <Cpu className="h-4 w-4 text-[var(--accent)]" />
          <span className="font-semibold">8× PARALLEL AGENT FORGE + BRAND VOICE ENGINE</span>
        </div>
        <button
          type="button"
          onClick={() => {
            paperSound.playCardFlick();
            setPulsing(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
        >
          <Play className="h-2.5 w-2.5" />
          <span>Run Critic Gate (&lt; 6 Retry)</span>
        </button>
      </div>

      {/* Animated 1-to-8 Fan-Out Circuit */}
      <div className="mt-5 flex items-center justify-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-4 py-3">
        <svg viewBox="0 0 420 58" className="h-14 w-full max-w-2xl" aria-hidden="true">
          {[28, 80, 132, 184, 236, 288, 340, 392].map((tx, i) => (
            <g key={tx}>
              <path
                d={`M 210 10 C 210 28, ${tx} 26, ${tx} 48`}
                fill="none"
                stroke={pulsing ? "var(--accent)" : "var(--border-strong)"}
                strokeWidth={pulsing ? "1.4" : "1"}
              />
              <motion.circle
                r="2.4"
                fill="var(--accent)"
                animate={{
                  cx: [210, (210 + tx) / 2, tx],
                  cy: [10, 29, 48],
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: pulsing ? 0.9 : 2.1,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <rect
                x={tx - 5}
                y="46"
                width="10"
                height="7"
                rx="2"
                fill="var(--bg-card)"
                stroke="var(--ink-primary)"
                strokeWidth="1.1"
              />
            </g>
          ))}
          <circle cx="210" cy="10" r="6" fill="var(--accent)" />
        </svg>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-12">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:col-span-7">
          {platforms.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => {
                paperSound.playClick();
                setSelected(p);
              }}
              className={`rounded-2xl border p-3 text-left font-mono transition-all ${
                selected.name === p.name
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-primary)] hover:border-[var(--ink-primary)]"
              }`}
            >
              <div className="text-[11px] font-bold">{p.name}</div>
              <div className="mt-1 text-[10px] opacity-80">Critic: {p.score}/10</div>
            </button>
          ))}
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="font-semibold text-[var(--accent)]">VOICE PROFILE INJECTED</span>
              <span className="text-[var(--ink-muted)]">CRITIC: {selected.score}/10 ✓</span>
            </div>
            <div className="mt-2 text-base font-bold text-[var(--ink-primary)]">
              {selected.name} Agent Output
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--ink-secondary)]">
              {selected.preview}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[9px] text-[var(--ink-muted)]">
            <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2.5 py-0.5">
              formality: 7/10
            </span>
            <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2.5 py-0.5">
              tier: technical
            </span>
            <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2.5 py-0.5">
              Promise.allSettled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. SHOW TIME (Booking Seat Lock & QR Console)                              */
/* -------------------------------------------------------------------------- */
function ShowTimeCaseArtboard() {
  const occupied = new Set(["0-2", "0-5", "1-1", "2-4", "2-5"]);
  const [selected, setSelected] = useState<string[]>(["1-3", "1-4"]);
  const [flow, setFlow] = useState<"movies" | "events">("movies");

  const toggleSeat = (id: string) => {
    if (occupied.has(id)) return;
    paperSound.playClick();
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="drafting-grid rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-primary)]">
          <Ticket className="h-4 w-4 text-[var(--accent)]" />
          <span className="font-semibold">SHOW TIME · SPRING BOOT + QR SEAT LOCK</span>
        </div>

        <div className="flex gap-1.5">
          {(["movies", "events"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                paperSound.playClick();
                setFlow(tab);
              }}
              className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase transition-colors ${
                flow === tab
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-secondary)]"
              }`}
            >
              {tab} Flow
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-7">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 260 22" className="w-3/4 max-w-[260px]" aria-hidden="true">
              <path
                d="M10 18 Q130 2 250 18"
                fill="none"
                stroke="var(--ink-primary)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
              {flow === "movies" ? "Auditorium 01 · Interactive Matrix" : "Live Arena · VIP / Gold Zones"}
            </span>
          </div>

          <div className="my-5 mx-auto grid grid-cols-6 gap-1.5 sm:gap-2">
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3, 4, 5].map((c) => {
                const id = `${r}-${c}`;
                const isOcc = occupied.has(id);
                const isSel = selected.includes(id);
                return (
                  <motion.button
                    key={id}
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleSeat(id)}
                    className={`h-8 w-8 rounded-lg border font-mono text-[10px] font-semibold transition-all sm:w-10 ${
                      isOcc
                        ? "cursor-not-allowed border-[var(--border-strong)] bg-[var(--bg-well)] text-[var(--ink-muted)] opacity-55"
                        : isSel
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-xs"
                          : "border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-primary)] hover:border-[var(--ink-primary)]"
                    }`}
                  >
                    {String.fromCharCode(65 + r)}
                    {c + 1}
                  </motion.button>
                );
              })
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[var(--ink-muted)]">
            <span>MYSQL 8 · JPA LOCK</span>
            <span className="text-[var(--accent)] font-semibold">
              {selected.length} SEAT{selected.length === 1 ? "" : "S"} SELECTED
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="font-semibold text-[var(--accent)]">PUBLIC /ticket/:id PASS</span>
              <span className="text-[var(--ink-muted)]">JJWT · RBAC</span>
            </div>
            <div className="mt-2 text-lg font-bold text-[var(--ink-primary)]">
              Door Verification Ticket
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[var(--ink-secondary)]">
              {flow === "movies"
                ? "Seat row locks commit inside MySQL 8 via Spring Data JPA; PNG exportable QR links directly to the public verification endpoint."
                : "Event zone allocations enforce real-time inventory caps alongside Firebase / Twilio OTP user verification."}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-dashed border-[var(--border-strong)] pt-4">
            <div className="font-mono text-[11px] text-[var(--ink-primary)]">
              <div>SEATS: {selected.length > 0 ? selected.join(", ") : "None"}</div>
              <div className="mt-0.5 text-[10px] text-[var(--ink-muted)]">
                TMDB v3 + Spring Security 6
              </div>
            </div>
            <svg
              viewBox="0 0 28 28"
              className="h-12 w-12 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-1.5 text-[var(--ink-primary)]"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="8" height="8" fill="currentColor" />
              <rect x="4" y="4" width="4" height="4" fill="var(--bg-card)" />
              <rect x="18" y="2" width="8" height="8" fill="currentColor" />
              <rect x="20" y="4" width="4" height="4" fill="var(--bg-card)" />
              <rect x="2" y="18" width="8" height="8" fill="currentColor" />
              <rect x="4" y="20" width="4" height="4" fill="var(--bg-card)" />
              <rect x="13" y="4" width="2" height="2" fill="currentColor" />
              <rect x="12" y="15" width="4" height="2" fill="var(--accent)" />
              <rect x="19" y="14" width="3" height="3" fill="currentColor" />
              <rect x="14" y="21" width="5" height="5" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. AI RESEARCH ASSISTANT (Local CrewAI + ChromaDB 768-dim)                 */
/* -------------------------------------------------------------------------- */
function ResearchCaseArtboard() {
  const [step, setStep] = useState(0);
  const agents = [
    {
      name: "01 · Researcher Agent",
      tools: "DuckDuckGo Search + ChromaDB RAG Tool",
      detail: "Queries persistent 768-dim nomic-embed-text document chunks (Top-5 cosine) + live web sources locally.",
    },
    {
      name: "02 · Data Analyst Agent",
      tools: "Ollama llama3.2:1b via LiteLLM",
      detail: "Cross-validates extracted evidence, removes contradictions, and structures verifiable bullet synthesis.",
    },
    {
      name: "03 · Technical Writer",
      tools: "Citation Grounding + Markdown Builder",
      detail: "Generates final long-form report with explicit [Source: filename] annotations — zero cloud calls.",
    },
  ];

  return (
    <div className="drafting-grid rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-primary)]">
          <Cpu className="h-4 w-4 text-[var(--accent)]" />
          <span className="font-semibold">LOCAL CREWAI PIPELINE · ZERO CLOUD TELEMETRY</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3 py-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          localhost:11434 · Ollama
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-3 lg:col-span-7">
          {agents.map((a, idx) => (
            <button
              key={a.name}
              type="button"
              onClick={() => {
                paperSound.playClick();
                setStep(idx);
              }}
              className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                step === idx
                  ? "border-[var(--accent)] bg-[var(--bg-paper)] shadow-xs"
                  : "border-[var(--border-hairline)] bg-[var(--bg-paper)]/70 hover:border-[var(--ink-primary)]"
              }`}
            >
              <div>
                <div className="text-sm font-bold text-[var(--ink-primary)]">{a.name}</div>
                <div className="mt-0.5 font-mono text-[10px] text-[var(--ink-muted)]">
                  {a.tools}
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                  step === idx
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg-well)] text-[var(--ink-secondary)]"
                }`}
              >
                {step === idx ? "ACTIVE" : "INSPECT"}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-5">
          <div>
            <div className="font-mono text-[10px] font-semibold text-[var(--accent)]">
              SEQUENTIAL CREW HANDOFF
            </div>
            <div className="mt-2 text-lg font-bold text-[var(--ink-primary)]">
              {agents[step].name}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--ink-secondary)]">
              {agents[step].detail}
            </p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 border-t border-dashed border-[var(--border-strong)] pt-4 font-mono text-[10px]">
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-2.5">
              <div className="text-[var(--ink-muted)]">EMBEDDINGS</div>
              <div className="mt-0.5 font-semibold text-[var(--ink-primary)]">Nomic 768-dim</div>
            </div>
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-2.5">
              <div className="text-[var(--ink-muted)]">RETRIEVAL</div>
              <div className="mt-0.5 font-semibold text-[var(--accent)]">Chroma Top-5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 9. NUTRI GUIDE (Gemini Macro Analytics & Schedule Console)                 */
/* -------------------------------------------------------------------------- */
function NutriGuideCaseArtboard() {
  const [slot, setSlot] = useState<"AM" | "PM" | "EVE">("AM");
  const schedules = {
    AM: { p: 36, c: 44, f: 20, kcal: 540, note: "High-protein oats + soaked almonds + fruit balanced for morning focus." },
    PM: { p: 42, c: 38, f: 20, kcal: 690, note: "Lean lentil & paneer grain bowl calibrated by Gemini NLU for steady afternoon energy." },
    EVE: { p: 46, c: 28, f: 26, kcal: 610, note: "Light recovery dinner with low glycemic load persisted to MongoDB profile." },
  };
  const current = schedules[slot];
  const r = 46;
  const circ = 2 * Math.PI * r;

  return (
    <div className="drafting-grid rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-primary)]">
          <Activity className="h-4 w-4 text-[var(--accent)]" />
          <span className="font-semibold">NUTRI GUIDE · GEMINI NLU MACRO ENGINE</span>
        </div>

        <div className="flex gap-1.5">
          {(["AM", "PM", "EVE"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                paperSound.playClick();
                setSlot(t);
              }}
              className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                slot === t
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-secondary)]"
              }`}
            >
              {t} SCHEDULE
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="flex items-center gap-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-6">
          <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
            <svg viewBox="0 0 116 116" className="h-28 w-28 -rotate-90" aria-hidden="true">
              <circle cx="58" cy="58" r={r} fill="none" stroke="var(--border-strong)" strokeWidth="8" />
              <motion.circle
                cx="58"
                cy="58"
                r={r}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circ}
                animate={{ strokeDashoffset: circ * (1 - current.p / 100) }}
                transition={{ type: "spring", stiffness: 150, damping: 19 }}
              />
            </svg>
            <div className="absolute text-center font-mono">
              <div className="text-lg font-bold text-[var(--ink-primary)]">{current.p}%</div>
              <div className="text-[9px] text-[var(--ink-muted)]">PROTEIN</div>
            </div>
          </div>

          <div className="flex-1 space-y-2.5 font-mono text-xs">
            {[
              { label: "Protein", val: current.p },
              { label: "Carbs", val: current.c },
              { label: "Fats", val: current.f },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[var(--ink-secondary)]">{row.label}</span>
                  <span className="font-semibold text-[var(--ink-primary)]">{row.val}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--bg-well)]">
                  <motion.div
                    animate={{ width: `${row.val}%` }}
                    transition={{ type: "spring", stiffness: 180, damping: 20 }}
                    className="h-full rounded-full bg-[var(--accent)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="font-semibold text-[var(--accent)]">MEAL SLOT: {slot}</span>
              <span className="text-[var(--ink-muted)]">{current.kcal} kcal</span>
            </div>
            <div className="mt-2 text-lg font-bold text-[var(--ink-primary)]">
              Chart.js Telemetry + MongoDB Plan
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--ink-secondary)]">
              {current.note}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-dashed border-[var(--border-strong)] pt-3 font-mono text-[10px] text-[var(--ink-muted)]">
            <span>JWT USER PROFILE</span>
            <span className="font-semibold text-[var(--accent)]">GEMINI NLU SYNC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

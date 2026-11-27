export interface ProjectMediaItem {
  src: string;
  caption: string;
  tag?: string;
}

export interface ProjectItem {
  id: string;
  fig: string;
  repoName: string;
  title: string;
  subtitle: string;
  category: "Real-Time & P2P" | "GraphRAG & AI" | "Full-Stack AI";
  year: string;
  tagline: string;
  summary: string;
  tools: string[];
  metrics: { label: string; value: string }[];
  bullets: string[];
  architecture: {
    steps: { title: string; detail: string }[];
  };
  deepDive: {
    challenge: string;
    solution: string;
    decisions: { title: string; detail: string }[];
    specs: { label: string; value: string }[];
  };
  gallery?: ProjectMediaItem[];
  liveUrl: string;
  githubUrl: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  code: string;
  items: {
    name: string;
    role: string;
    relatedProjects: string[];
  }[];
}

export interface EducationItem {
  id: string;
  institution: string;
  period: string;
  degree: string;
  location: string;
  scoreLabel: string;
  scoreValue: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  shortName: string;
  role: string;
  period: string;
  location: string;
}

export const PROFILE = {
  name: "Bhanu Nama",
  firstName: "Bhanu",
  lastName: "Nama",
  initials: "BN",
  role: "Full-Stack & AI Engineer",
  availability: "Open to Full-Stack & AI Roles",
  location: "Hyderabad, India",
  timezone: "Asia/Kolkata",
  phone: "+91-7993073400",
  email: "bhanunama08@gmail.com",
  objective:
    "Full-Stack & AI Engineer who likes hard problems, clean interfaces, and code that doesn't break at 2 AM. From TypeScript, React & Next.js to FastAPI, LangGraph, Neo4j, and pgvector — building real products with zero fluff and tight engineering.",
  links: {
    linkedin: "https://www.linkedin.com/in/bhanu-nama-654957281/",
    github: "https://github.com/BhanuNama",
    portfolio: "https://bhanunama.pages.dev",
  },
  githubUsername: "BhanuNama",
  avatarUrl: "/avatar.jpg" as string | null,
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "the-orbit",
    fig: "FIG. 01",
    repoName: "BhanuNama/Popcorn-Room",
    title: "The Orbit",
    subtitle: "P2P Watch-Party & Hi-Fi Music Lounge (Popcorn-Room)",
    category: "Real-Time & P2P",
    year: "2026",
    tagline: "Binary-tree P2P 4K movie swarm, 60fps screen share & 4-zone Ambilight.",
    summary:
      "Browser-native watch-party & music lounge featuring Binary-Tree P2P Swarm 4K local movie drops, 2-way direct P2P / 3+ H.264 Simulcast 60fps screen share, NTP-locked YouTube sync, and studio-isolated 48kHz stereo audio.",
    tools: [
      "TypeScript",
      "React 19",
      "Fastify",
      "LiveKit WebRTC",
      "Zustand",
      "MSE / mp4box.js",
      "MongoDB",
      "Tailwind v4",
    ],
    metrics: [
      { label: "4K Delivery", value: "O(1) P2P Swarm" },
      { label: "Audio Isolation", value: "48kHz Stereo + HFP Guard" },
      { label: "Sync Math", value: "NTP Min-RTT Clock" },
    ],
    bullets: [
      "Engineered Binary-Tree P2P Swarm local movie streaming via 32 KB WebRTC DataChannel chunks into browser MSE (mp4box.js) with automatic SFU fallback.",
      "Built 2-person Direct P2P screen share (~10–20 ms) that promotes seamlessly to LiveKit H.264 Simulcast with bitrate autopilot for 3+ viewers.",
      "Enforced strict dual-track audio isolation (256 kbps stereo media with DSP off vs. 40 kbps mono voice) plus Bluetooth HFP telephony guard and unified 120 ms A/V playout lock.",
      "Added lossless .flac/.mp3/.wav P2P Music Lounge with .lrc synced lyrics, offline .srt → WebVTT subtitle shifter, and 32×18 canvas Ambilight.",
    ],
    architecture: {
      steps: [
        { title: "React 19 + Canvas FX", detail: "Stage UI, 32×18 Ambilight & .srt/.lrc engine" },
        { title: "Fastify + Crypto", detail: "scrypt rooms, HMAC identity & LiveKit JWTs" },
        { title: "LiveKit SFU Bus", detail: "3+ H.264 Simulcast, voice & DataChannel relay" },
        { title: "Direct WebRTC Mesh", detail: "P2P fMP4 swarm, 2-way screen & lossless audio" },
      ],
    },
    deepDive: {
      challenge:
        "Existing watch-party apps compress movie audio like a phone call, force Bluetooth headsets into 8 kHz HFP mono mode, or melt down a host's upload bandwidth when streaming local 4K files to multiple viewers.",
      solution:
        "Built a split-channel WebRTC architecture: movie audio travels untouched at 48 kHz / 256 kbps stereo (red: false, DSP off) while voice stays on an isolated 40 kbps mono track with HFP device filtering, and 4K local files cascade through a Binary-Tree P2P swarm with O(1) host upload.",
      decisions: [
        {
          title: "Opus red: false Fix for Stereo Music",
          detail: "Disabled RFC 2198 redundancy on forceStereo tracks after tracing metallic distortion inside livekit-client's LocalParticipant publisher.",
        },
        {
          title: "120 ms Unified Element Playout Lock",
          detail: "Attached both ScreenShare video & audio onto the same <video> element with 120 ms synchronized playout delay to eliminate A/V lip-sync drift.",
        },
        {
          title: "2-Way Direct P2P → 3+ Simulcast Promotion",
          detail: "Two-person screen shares run ~10–20 ms direct P2P and hand off the active MediaStream to LiveKit H.264 Simulcast automatically when a 3rd viewer joins.",
        },
        {
          title: "4-Second RTCRtpSender Bitrate Autopilot",
          detail: "Polls sender.getStats() for availableOutgoingBitrate and packet loss >3%, eliminating Wi-Fi router bufferbloat without manual quality drops.",
        },
      ],
      specs: [
        { label: "Monorepo", value: "npm workspaces (@popcorn/web, api, shared)" },
        { label: "P2P Swarm Packet", value: "32 KB SCTP chunks + 13 B binary header" },
        { label: "MSE Buffer Window", value: "14–22 s lookahead · evicts > 28 s behind" },
        { label: "NTP Probe", value: "8 min-RTT samples · re-syncs every 60 s" },
        { label: "Security", value: "scryptSync passwords · HMAC-SHA256 identity" },
        { label: "Tests", value: "18 Vitest sync tests + Playwright Chromium E2E" },
      ],
    },
    gallery: [
      {
        src: "/projects/the-orbit/1.png",
        caption: "Main Orbit Landing — Instant zero-signup watch-party room creation, live preview stage & reaction widgets.",
        tag: "Landing",
      },
      {
        src: "/projects/the-orbit/2.png",
        caption: "Core Real-Time Engines — O(1) Binary-Tree 4K P2P Swarm, 2-Way Direct P2P → Simulcast promotion & Hi-Fi Music Lounge.",
        tag: "Engines",
      },
      {
        src: "/projects/the-orbit/3.png",
        caption: "Dual-Track Acoustic Isolation — 48 kHz / 256 kbps Opus soundtrack kept cleanly separated from voice mics + Bluetooth HFP guard.",
        tag: "Audio Isolation",
      },
      {
        src: "/projects/the-orbit/4.png",
        caption: "Live Direct P2P Screen Share Stage with upload bitrate health alerts, GPU preview saver & real-time room chat/GIFs.",
        tag: "Screen Share",
      },
      {
        src: "/projects/the-orbit/5.png",
        caption: "Hi-Fi P2P Music Lounge featuring lossless audio streaming, reactive spectrum bars, shared Queue & synced .lrc Lyrics.",
        tag: "Music Lounge",
      },
      {
        src: "/projects/the-orbit/6.png",
        caption: "YouTube Sync & Queue Modal — paste link or ID for instant preview, synced room playback & playlist queueing.",
        tag: "YouTube Queue",
      },
      {
        src: "/projects/the-orbit/7.png",
        caption: "Synchronized YouTube Watch Theater running NTP Min-RTT playback lockstep alongside live participant tiles.",
        tag: "Theater Stage",
      },
      {
        src: "/projects/the-orbit/8.png",
        caption: "4K Local Movie Drop — peer-to-peer fMP4 chunk swarm (.mp4, .mkv, .webm) with offline .srt / .vtt subtitle loading.",
        tag: "4K P2P Swarm",
      },
      {
        src: "/projects/the-orbit/9.png",
        caption: "Post-Session Reaction Recap — interactive timeline activity heatmap and top emoji breakdowns across the screening.",
        tag: "Session Recap",
      },
      {
        src: "/projects/the-orbit/10.png",
        caption: "Live Cinema Themes & Dynamic Ambilight Switcher — Midnight Theater, True OLED, Retro 80s Drive-in, Cyberpunk & Nordic Woods.",
        tag: "Themes & Ambilight",
      },
    ],
    liveUrl: "https://the-orbit-room.vercel.app/",
    githubUrl: "https://github.com/BhanuNama/Popcorn-Room",
  },
  {
    id: "odyssey-solver",
    fig: "FIG. 02",
    repoName: "BhanuNama/Odyssey-Solver-rare-disease",
    title: "Odyssey-Dx V2",
    subtitle: "Bayesian GraphRAG & Multi-Agent Rare Disease Platform",
    category: "GraphRAG & AI",
    year: "2026",
    tagline: "Resnik MICA + Bayesian LR across 12.8k diseases, <20ms Shannon IG clarifier & 100-case eval.",
    summary:
      "Investigational rare genetic disease clinical decision platform unifying 12,883 rare diseases and 19,894 HPO terms across Neo4j and an in-memory OntologyKnowledgeStore—combining Resnik MICA ancestry similarity, Orphanet frequency Bayesian Likelihood Ratios, sub-20ms Shannon Information-Gain clarifying questions, and a citation-locked 6-specialist LangGraph board.",
    tools: [
      "LangGraph",
      "Neo4j",
      "NumPy",
      "FastAPI SSE",
      "React 19",
      "Groq / NIM",
      "Phenopackets v2",
    ],
    metrics: [
      { label: "100-Case Eval", value: "57% T1 · 74% T5 · 0.642 MRR" },
      { label: "Clarifier Loop", value: "< 20 ms Shannon IG" },
      { label: "Citation Audit", value: "100% Verified (0 Fake IDs)" },
    ],
    bullets: [
      "Unified 6 biomedical sources (`hp.obo`, `phenotype.hpoa`, Orphanet XMLs, `genes_to_disease`) into Neo4j + `.ontology_cache_v2.pkl` covering 12,883 diseases, 19,894 HPO terms, `IS_A*` closures, frequency tiers & age-of-onset priors.",
      "Engineered Resnik MICA semantic hierarchy matching + Orphanet Bayesian LR+ / LR− log-odds inference (`+0.65` / `−1.85` onset weights), lifting 100-case GA4GH Phenopacket Top-1 recall from 16% (V1 overlap) to 57.0% (74.0% Top-5, 0.642 MRR).",
      "Built a zero-LLM NumPy Shannon Information-Gain clarifier (`POST /v1/clarify`, `< 30 ms` round-trip) surfacing Top-3 bedside Yes/No questions plus a 3-tier Cost-vs-Yield lab & WES/WGS roadmap.",
      "Orchestrated 6 parallel LangGraph specialists across a 6-model Groq + NVIDIA NIM failover pool with deterministic fallback, max-1 divergence rebuttal gate & live NCBI/Neo4j ID verifier (100% verified citations).",
    ],
    architecture: {
      steps: [
        { title: "HPO + Onset Grounder", detail: "Extracts positive/absent HPOs, age-of-onset & Phenopacket v2 JSON" },
        { title: "MICA + Bayesian Engine", detail: "12,883 diseases · IS_A* MICA + Orphanet LR+ / LR− & Shannon IG" },
        { title: "6-Specialist + Critic", detail: "Groq/NIM 6-model pool + max-1 rebuttal + 100% ID verifier" },
        { title: "3-Zone Clinical UI", detail: "Live <30ms Clarifier, T1/T2/T3 Labs, 3-Tier Graph & Benchmarks" },
      ],
    },
    deepDive: {
      challenge:
        "Standard medical LLM prompts hallucinate gene–syndrome links and PMIDs, miss excluded findings ('no seizures'), and score 0 when patient symptoms are more specific than a disease's parent HPO annotation—leading to 16% Top-1 accuracy on naive overlap.",
      solution:
        "Built Odyssey-Dx V2 by decoupling biomedical probability math from multi-agent reasoning: precomputed `IS_A*` MICA closures + Orphanet frequency Bayesian LR+ / LR− (`65%` composite weight) shortlist Top-10 candidates, vectorized Shannon IG drives `< 30 ms` clarifying questions, and a 6-specialist LangGraph board undergoes deterministic NCBI + Neo4j ID auditing.",
      decisions: [
        {
          title: "Resnik MICA over IS_A* Ancestor Closures",
          detail: "Pools diseases via informative ancestors (IC >= 0.8) and scores child-to-parent matches proportionally, jumping Top-1 recall from 16% (V1) to 57% (100 GA4GH Phenopackets).",
        },
        {
          title: "Orphanet Frequency Bayesian LR+ / LR−",
          detail: "Replaces fixed penalties with calibrated prevalence tiers (Obligate 0.99 to Excluded 0.01), absent-finding LR− demotions, and +0.65/−1.85 age-of-onset adjustments.",
        },
        {
          title: "Vectorized Zero-LLM Shannon IG Clarifier",
          detail: "Single NumPy pass over Top-10 candidates ranks unasked distinguishing signs in < 20 ms (`POST /v1/clarify`) to update posteriors & graphs without LLM wait.",
        },
        {
          title: "Deterministic ID Audit & CMO Composite",
          detail: "Validates every HP:/ORPHA:/OMIM:/PMID: token (`100%` verified) with max-1 divergence rebuttal and blends `0.65 × Graph + 0.35 × Panel − 0.08 × Objections`.",
        },
      ],
      specs: [
        { label: "Ontology Store", value: "12,883 Diseases · 19,894 HPO Terms · IS_A* Closures" },
        { label: "100-Case Benchmark", value: "57.0% T1 · 71.0% T3 · 74.0% T5 · 0.642 MRR" },
        { label: "Clarifier Endpoint", value: "POST /v1/clarify (< 30 ms · Zero-LLM NumPy IG)" },
        { label: "Agent Failover Pool", value: "6 Groq & NVIDIA NIM Models + Offline Fallback" },
        { label: "Citation Guardrail", value: "100.0% Verified IDs (Neo4j + NCBI esummary.fcgi)" },
        { label: "Tests & Interop", value: "6/6 pytest + GA4GH Phenopacket v2 Import/Export" },
      ],
    },
    liveUrl: "https://odyssey-solver-rare-disease.vercel.app",
    githubUrl: "https://github.com/BhanuNama/Odyssey-Solver-rare-disease",
  },
  {
    id: "genome-guide",
    fig: "FIG. 03",
    repoName: "BhanuNama/GenomeGuide",
    title: "GenomeGuide V2",
    subtitle: "ClinGen Bayesian Genomics & 5-Source Agentic RAG Platform",
    category: "GraphRAG & AI",
    year: "2026",
    tagline: "14+ ClinGen Bayesian ACMG engine · 5-API RAG (VEP + MyVariant) · Batch VCF triage & 300-case eval.",
    summary:
      "Open-source clinical genomics interpretation pipeline executing concurrent 5-source RAG (NCBI ClinVar, Broad gnomAD v4 7-population GrpMax, Ensembl REST VEP, MyVariant.info + UniProt, and PubMed) paired with a zero-LLM Tavtigian Bayesian ACMG engine (14+ rules), Counterfactual VUS Gap Solver, 25-variant batch .vcf priority triage, and a two-stage deterministic + LLM Critic auditor.",
    tools: [
      "LangGraph",
      "LangSmith",
      "FastAPI",
      "React 19",
      "Groq LLaMA",
      "Ensembl / MyVariant",
      "ClinVar / gnomAD",
    ],
    metrics: [
      { label: "300-Variant Eval", value: "91.0% Acc · 0 / 300 Flips" },
      { label: "Calibration Error", value: "ECE 0.0431 · 0.0% Fake IDs" },
      { label: "5-Source Live RAG", value: "ClinVar · gnomAD · VEP · UniProt" },
    ],
    bullets: [
      "Concurrently queries 5 biomedical APIs via httpx: NCBI ClinVar, Broad gnomAD v4 (7-ancestry GrpMax guard), Ensembl REST VEP (canonical ±1,2 splice & 3' NMD-escape), MyVariant.info + UniProt (AlphaMissense, REVEL, SpliceAI, PM1 domains), and PubMed.",
      "Implemented the zero-LLM Tavtigian/ClinGen Bayesian point system (14+ criteria, +8/+4/+2/+1 vs −8/−4/−1, Prior=0.10) plus a Counterfactual VUS Gap Solver computing minimal missing evidence paths (+6 or −1).",
      "Added POST /api/triage supporting 25-variant batch .vcf / HGVS clinical priority sorting (Pathogenic → Hot VUS → Benign) and a two-stage deterministic (NM_*/AF/PMID) + LLM Critic auditor.",
      "Benchmarked across 300 adversarial & ClinVar variants (Canonical, Non-Canonical Splice/NMD, Ancestry GrpMax, Conflicting VUS): 91.0% accuracy, 100% coverage, 0/300 directional flips, and 0.0431 ECE.",
    ],
    architecture: {
      steps: [
        { title: "HGVS & Splice Parser", detail: "Regex + Groq parser extracting signed splice offset & RefSeq transcript" },
        { title: "5-Source Async RAG", detail: "ClinVar + gnomAD 7-Pop GrpMax + Ensembl VEP + MyVariant/UniProt + PubMed" },
        { title: "Bayesian ACMG + VUS", detail: "14+ ClinGen rules, NMD/splice guard & counterfactual VUS resolution" },
        { title: "2-Stage Critic & Triage", detail: "NM_*/AF/PMID assertions + LLM red-flags + 25-variant VCF priority triage" },
      ],
    },
    deepDive: {
      challenge:
        "Generic LLMs hallucinate classifications 15–30% of the time, while naive 5-rule heuristics trigger false PVS1 calls on non-canonical intronic splices (like c.5152+6del) or 3' NMD-escape regions and ignore ancestry-enriched common alleles in global gnomAD averages.",
      solution:
        "Decoupled computation via a 14+-rule ClinGen Bayesian point engine fed concurrently by 5 live APIs: Ensembl VEP + MyVariant guard canonical ±1,2 splicing and terminal NMD zones, 7-population gnomAD GrpMax prevents ancestry false positives, a Counterfactual Solver guides VUS resolution, and a two-stage Critic blocks unverified transcripts, AF numbers, or PMIDs.",
      decisions: [
        {
          title: "Tavtigian Bayesian Point System & Splice/NMD Guard",
          detail: "Scores 14+ criteria (+8..−8, Prior 0.10, O_PVSt 350), gating PVS1 strictly on canonical ±1,2 splices or SpliceAI ≥ 0.80 and downgrading 3' NMD-escape exons.",
        },
        {
          title: "7-Population gnomAD v4 GrpMax Ancestry Guard",
          detail: "Evaluates BA1/BS1/PM2 against max sub-population AF across AFR, AMR, ASJ, EAS, FIN, NFE, and SAS—achieving 100.0% accuracy on 50 ancestry stress traps.",
        },
        {
          title: "Counterfactual VUS Solver & 25-Variant Batch Triage",
          detail: "Calculates exact missing evidence paths to flip VUS calls and adds POST /api/triage using Ensembl region POST to rank Pathogenic → Hot VUS → Benign batches.",
        },
        {
          title: "300-Variant 4-Bucket Stress Benchmark",
          detail: "Achieved 91.0% accuracy (100% coverage), 0/300 directional flips, 0.0431 ECE, 88% splice/NMD trap accuracy, and 0.0% post-Critic hallucinations.",
        },
      ],
      specs: [
        { label: "300-Case Stress Eval", value: "91.0% Acc · 0 / 300 Flips · ECE 0.0431" },
        { label: "Ancestry & VUS Buckets", value: "100% GrpMax (50/50) · 100% Conflicting/VUS (100/100)" },
        { label: "Splice/NMD Traps", value: "88.0% Accuracy (fixes c.5152+6del & +5del PVS1)" },
        { label: "5-API RAG Suite", value: "ClinVar · gnomAD v4 (7-Pop) · Ensembl VEP · MyVariant · PubMed" },
        { label: "Batch Clinical Triage", value: "POST /api/triage (<= 25 VCF/HGVS variants)" },
        { label: "Frontend Modules", value: "React 19 · Three.js Helix · Bayesian Gauge · Lollipop & Ancestry Charts" },
      ],
    },
    liveUrl: "https://genome-guide.vercel.app",
    githubUrl: "https://github.com/BhanuNama/GenomeGuide",
  },
  {
    id: "fluent-path",
    fig: "FIG. 04",
    repoName: "BhanuNama/Versant-Fluent",
    title: "FluentPath",
    subtitle: "AI English Proficiency & Psychometric Platform (Versant-Fluent)",
    category: "Full-Stack AI",
    year: "2026",
    tagline: "10-part Versant assessment, Groq Whisper STT & Bayesian Rasch scoring.",
    summary:
      "Full-stack 10-part Reading, Writing, Listening, and Speaking assessment engine featuring zero-repetition Groq item generation, HMAC-signed play-once audio, Whisper speech analytics, and Bayesian Rasch (EAP) ability estimation.",
    tools: [
      "TypeScript",
      "React 18",
      "Express 5",
      "MongoDB",
      "Groq Whisper",
      "MiniLM-L6-v2",
      "Recharts",
    ],
    metrics: [
      { label: "Psychometrics", value: "Bayesian Rasch (GSE 10–90)" },
      { label: "Item Bank", value: "134 Seed + Groq Gen" },
      { label: "Evaluation", value: "Whisper + 3-Run Ensemble" },
    ],
    bullets: [
      "Built all 10 Versant-style assessment parts (A–J) plus a custom section-specific test builder (1–20 items, Easy/Medium/Hard) with exact marks and CEFR/GSE estimates.",
      "Engineered zero-repetition unseen-first item selection backed by on-demand schema-validated Groq LLM item generation persisted to MongoDB.",
      "Built resilient MediaRecorder Opus capture, HMAC-SHA256 expiring play-once audio URLs, and an async SSE worker running Whisper Large v3 Turbo, LanguageTool grammar checks, and MiniLM-L6-v2 semantic similarity.",
      "Combined deterministic Levenshtein alignment, acoustic WPM/pause fluency metrics, and median multi-run LLM rubric judging into Bayesian Rasch (EAP) scores.",
    ],
    architecture: {
      steps: [
        { title: "React + Web Audio", detail: "10-part runner, Opus MediaRecorder & live meter" },
        { title: "Express 5 + JWT", detail: "HMAC audio signing, session state & SSE events" },
        { title: "Async Scoring Worker", detail: "Whisper STT, LanguageTool & MiniLM similarity" },
        { title: "Rasch & Ensemble", detail: "Multi-run LLM median + Bayesian EAP (GSE 10–90)" },
      ],
    },
    deepDive: {
      challenge:
        "Standard language practice tools rely on static question banks that repeat quickly and grade speaking/writing with a single noisy LLM call rather than calibrated psychometrics.",
      solution:
        "Engineered a 10-part (A–J) adaptive assessment monorepo combining unseen-first Groq item generation, HMAC play-once audio, deterministic Levenshtein + Whisper fluency scoring, 3-run median LLM rubric judging, and Bayesian Rasch (EAP) posterior ability estimation.",
      decisions: [
        {
          title: "Bayesian Rasch (EAP) Ability Estimator",
          detail: "Evaluates posterior over GSE [10, 90] (step 0.5, prior N(48, 16²)) blending Rasch log-likelihoods with judged Gaussian likelihoods and uncertainty intervals.",
        },
        {
          title: "Acoustic Fluency & Pronunciation Telemetry",
          detail: "Computes speech rate (WPM), articulation WPM, pause ratio (>0.4s), long pauses (>1s), fillers, and Whisper exp(avgLogprob) pronunciation proxies.",
        },
        {
          title: "Multi-Run LLM Ensemble & Anti-Cheat Caps",
          detail: "Takes median across 3 independent judge calls, flags >8pt GSE disagreement, and applies paste/repetition/off-topic guardrails.",
        },
        {
          title: "Zero-Repetition Unseen Item Generator",
          detail: "Filters out past sessions + answers and synthesizes schema-validated items on-demand in chunked batches persisted to MongoDB.",
        },
      ],
      specs: [
        { label: "Assessment Format", value: "Parts A–J (Reading, Writing, Listening, Speaking)" },
        { label: "Scale Mapping", value: "GSE 10–90 · CEFR A1–C2 · Versant 20–80" },
        { label: "Audio Pipeline", value: "16 kHz Opus WebM + 5-min HMAC-SHA256 URLs" },
        { label: "Speech-to-Text", value: "Groq Whisper Large v3 Turbo (word timestamps)" },
        { label: "NLP Scoring", value: "LanguageTool v2 + MiniLM-L6-v2 semantic cosine" },
        { label: "Testing", value: "Vitest unit suite (objective & Rasch tests)" },
      ],
    },
    liveUrl: "https://versant-fluent.vercel.app",
    githubUrl: "https://github.com/BhanuNama/Versant-Fluent",
  },
  {
    id: "meetmind-ai",
    fig: "FIG. 05",
    repoName: "BhanuNama/meetmind-ai",
    title: "MeetMind AI",
    subtitle: "Meeting Intelligence & Cited RAG Platform",
    category: "GraphRAG & AI",
    year: "2026",
    tagline: "Map-Reduce 8B → 70B synthesis with 384-dim Supabase pgvector citations.",
    summary:
      "Full-stack AI meeting workspace that transcribes audio via Whisper Large v3, extracts Zod-validated summaries, decisions, blockers & action items via Map-Reduce, and powers cited semantic search across meetings.",
    tools: [
      "Next.js 16",
      "TypeScript",
      "Supabase pgvector",
      "Groq",
      "Whisper v3",
      "Clerk",
      "Resend",
      "Framer Motion",
    ],
    metrics: [
      { label: "Vector Dim", value: "384-dim MiniLM" },
      { label: "Map-Reduce", value: "8B → 70B Merge" },
      { label: "Grounding", value: "Exact Meeting Citations" },
    ],
    bullets: [
      "Transcribes MP3/MP4/M4A/WAV/WebM recordings with word-level timestamps using Groq Whisper Large v3.",
      "Runs Map-Reduce extraction for long transcripts — parallel LLaMA 3.1 8B chunks merged and deduplicated by LLaMA 3.3 70B into Zod-validated summaries, action items, decisions, blockers, and sentiment.",
      "Chunks transcripts (150 words, 20-word overlap) with all-MiniLM-L6-v2 (384-dim) into Supabase pgvector for cosine-similarity RAG Q&A that cites exact source meetings.",
      "Includes Clerk auth with Svix webhook sync, TanStack Query live polling dashboard, and automated attendee summaries via Resend.",
    ],
    architecture: {
      steps: [
        { title: "Whisper Large v3", detail: "Groq speech-to-text with word timestamps" },
        { title: "Map-Reduce LLM", detail: "Parallel 8B chunks → 70B Zod synthesis" },
        { title: "MiniLM + pgvector", detail: "384-dim embeddings in Supabase Postgres" },
        { title: "Next.js 16 + Resend", detail: "Cited RAG chat, Clerk auth & auto emails" },
      ],
    },
    deepDive: {
      challenge:
        "Long meeting recordings exceed standard LLM context limits or lose crucial action-item details mid-transcript, while generic search fails to trace insights back to the exact meeting.",
      solution:
        "Implemented a Map-Reduce extraction pipeline (>12k char transcripts split into overlapping 3k-char chunks processed concurrently on LLaMA 3.1 8B and merged on LLaMA 3.3 70B) paired with 384-dim pgvector RPC search citing exact source meetings.",
      decisions: [
        {
          title: "Map-Reduce Chunking (8B → 70B)",
          detail: "Prevents context overflow on hour-long calls while keeping structured Zod extraction fast and accurate.",
        },
        {
          title: "pgvector Cosine RPC (match_meeting_embeddings)",
          detail: "150-word / 20-word overlap chunks embedded with all-MiniLM-L6-v2 and scoped strictly by authenticated Clerk user_id.",
        },
        {
          title: "3× Exponential Backoff & Zod Validation",
          detail: "Retries transient Groq or JSON parse errors up to 3× to ensure extraction reliability.",
        },
        {
          title: "Optimistic UI & Smart 3s Polling",
          detail: "Polls only while meetings are processing/pending, with instant optimistic delete + rollback and Resend email notifications.",
        },
      ],
      specs: [
        { label: "Framework", value: "Next.js 16 App Router · React 19 · TS 5" },
        { label: "Audio Formats", value: "MP3 · MP4 · M4A · WAV · WebM · OGG" },
        { label: "Vector Schema", value: "Supabase pgvector (vector(384) MiniLM-L6-v2)" },
        { label: "Database Tables", value: "meetings, transcripts, extractions, action_items, decisions" },
        { label: "Auth & Sync", value: "Clerk + Svix webhook sync + user isolation" },
        { label: "Notifications", value: "Resend automated attendee summary emails" },
      ],
    },
    liveUrl: "https://meetmind-ai-xi.vercel.app",
    githubUrl: "https://github.com/BhanuNama/meetmind-ai",
  },
  {
    id: "contentforge-ai",
    fig: "FIG. 06",
    repoName: "BhanuNama/contentforge-ai",
    title: "ContentForge AI",
    subtitle: "Multi-Agent Content Repurposing & Brand Voice SaaS",
    category: "Full-Stack AI",
    year: "2026",
    tagline: "4-stage agent pipeline turning 1 input into 8 critic-scored formats.",
    summary:
      "Autonomous 4-stage multi-agent SaaS that converts essays, URLs, or .docx files into 8 platform-native formats simultaneously, graded by a Critic Agent and tailored by an adaptive Brand Voice Engine.",
    tools: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "Groq LLaMA 3.1 70B",
      "Clerk",
      "Stripe",
      "Puppeteer",
    ],
    metrics: [
      { label: "Pipeline", value: "4-Stage · 8× Parallel" },
      { label: "Quality Gate", value: "Critic Auto-Retry < 6" },
      { label: "Voice Engine", value: "Learns From Edits" },
    ],
    bullets: [
      "Designed a 4-stage Groq LLaMA 3.1 70B pipeline: ReAct Orchestrator → Analyst Brief → 8 parallel Platform Agents (Promise.allSettled) → Critic Agent scoring 1–10 with auto-retry below 6.",
      "Engineered a self-improving Brand Voice Engine that extracts tone, vocabulary tier, and sentence rhythm, then learns from user before/after edit deltas.",
      "Built URL scraping via Puppeteer + Cheerio, .docx ingestion via Mammoth, live SSE pipeline visualization, and Stripe subscription billing.",
    ],
    architecture: {
      steps: [
        { title: "ReAct Orchestrator", detail: "Classifies input & builds execution plan" },
        { title: "Analyst + Voice", detail: "Extracts brief & injects Brand Voice Profile" },
        { title: "8× Platform Agents", detail: "Parallel X, LinkedIn, YT, Email, Blog & IG" },
        { title: "Critic & SSE UI", detail: "1–10 score gate, auto-retry & Stripe billing" },
      ],
    },
    deepDive: {
      challenge:
        "Single-prompt AI content tools output generic, repetitive copy that ignores platform norms and fails to capture an author's authentic voice.",
      solution:
        "Architected a 4-stage multi-agent forge where a ReAct Orchestrator plans execution, an Analyst builds a brief, 8 specialist agents execute concurrently via Promise.allSettled, and a Critic scores outputs while a Voice Learning Agent evolves from user edits.",
      decisions: [
        {
          title: "Parallel Execution with Promise.allSettled",
          detail: "Generates Twitter/X, LinkedIn, YouTube, Email, IG, TikTok, Newsletter & Blog concurrently so one failure never aborts the job.",
        },
        {
          title: "Critic Auto-Retry Quality Gate (< 6/10)",
          detail: "Fast LLaMA 3 8B critic evaluates brand alignment & platform structure, automatically triggering 1 regeneration if scored below 6.",
        },
        {
          title: "Living Brand Voice Learning Agent",
          detail: "Captures formality, humour, vocabulary tier, signature phrases & avoid-words, then updates the profile from user edit deltas.",
        },
        {
          title: "Typed Postgres + SSE Streaming",
          detail: "Streams each agent's completion live over SSE into a Zustand UI backed by typed Supabase tables & Stripe webhooks.",
        },
      ],
      specs: [
        { label: "Orchestration", value: "ReAct Orchestrator → Analyst → 8× Agents → Critic" },
        { label: "Models", value: "Groq LLaMA 3.1 70B + LLaMA 3 8B Critic" },
        { label: "Ingestion", value: "Raw text · Puppeteer/Cheerio URLs · Mammoth .docx" },
        { label: "Schema Safety", value: "Zod 4 strict validation + safe fallbacks" },
        { label: "SaaS Infra", value: "Clerk Auth · Stripe Billing · Resend · Recharts 3" },
        { label: "State & UI", value: "Next.js 16 · Tailwind v4 · Radix UI · Zustand 5" },
      ],
    },
    liveUrl: "https://contentforge-ai-pi.vercel.app",
    githubUrl: "https://github.com/BhanuNama/contentforge-ai",
  },
  {
    id: "ai-research-assistant",
    fig: "FIG. 07",
    repoName: "bhanu0803/AI-research-assistant",
    title: "AI Research Assistant",
    subtitle: "Privacy-First Local Multi-Agent & RAG System",
    category: "GraphRAG & AI",
    year: "2025",
    tagline: "100% on-device 3-agent CrewAI pipeline + 768-dim ChromaDB RAG via Ollama.",
    summary:
      "Fully local, zero-cloud document intelligence and multi-agent research engine built with FastAPI, CrewAI (Researcher → Analyst → Writer), ChromaDB 768-dim Nomic embeddings, and Ollama LLaMA 3.2.",
    tools: [
      "FastAPI",
      "CrewAI",
      "LangChain",
      "Ollama (LLaMA 3.2)",
      "ChromaDB",
      "Nomic 768-dim",
      "React",
      "TypeScript",
    ],
    metrics: [
      { label: "Inference", value: "100% On-Device Ollama" },
      { label: "Agent Crew", value: "3-Stage CrewAI" },
      { label: "Vector Store", value: "ChromaDB · 768-dim Top-5" },
    ],
    bullets: [
      "Built a fully local (privacy-first) AI research assistant supporting document Q&A, deep multi-agent research, and direct LLM chat on-device via Ollama with zero cloud API calls.",
      "Designed a 3-agent CrewAI pipeline (Researcher, Analyst, Writer) with DuckDuckGo web search + local RAG retrieval tools and sequential handoff via LiteLLM/Ollama.",
      "Engineered a persistent ChromaDB RAG pipeline using nomic-embed-text (768-dim embeddings) and top-5 cosine similarity retrieval with explicit source citations.",
      "Built a FastAPI backend handling PDF/DOCX/TXT/MD ingestion and chunk indexing paired with a React + TypeScript + Tailwind dashboard.",
    ],
    architecture: {
      steps: [
        { title: "FastAPI Doc Ingest", detail: "PDF/DOCX/MD upload, chunking & persistent storage" },
        { title: "Ollama + ChromaDB", detail: "768-dim nomic-embed-text & top-5 cosine RAG" },
        { title: "3-Agent CrewAI", detail: "Researcher (Web+RAG) → Analyst → Report Writer" },
        { title: "Local React SPA", detail: "Knowledge Base, Ask Docs, Deep Research & Chat" },
      ],
    },
    deepDive: {
      challenge:
        "Cloud AI research tools send private documents to external endpoints and often hallucinate facts without cross-checking uploaded files alongside live web sources.",
      solution:
        "Ran the entire stack locally via Ollama (`llama3.2:1b` + `nomic-embed-text`), grounding answers in persistent ChromaDB cosine search and coordinating a 3-agent CrewAI team combining local RAG with DuckDuckGo search.",
      decisions: [
        {
          title: "Zero-Cloud Local Execution via Ollama",
          detail: "Both chat inference and 768-dimensional embeddings stay on localhost:11434 so uploaded PDFs and research notes never leave the machine.",
        },
        {
          title: "Dual-Tool ReAct Researcher Agent",
          detail: "Equips the Senior Research Analyst agent with both `Local Knowledge Base Search` (ChromaDB) and DuckDuckGo web search before sequential Analyst & Writer synthesis.",
        },
        {
          title: "Top-5 Cited Cosine Retrieval",
          detail: "Prompts explicitly bind responses to retrieved ChromaDB chunks with `[Source: filename]` attributions and clean fallback handling.",
        },
        {
          title: "Persistent Multi-Workspace VectorStore",
          detail: "Centralized `VectorStoreManager` retains indexed document embeddings across restarts on disk alongside the FastAPI service.",
        },
      ],
      specs: [
        { label: "LLM Runtime", value: "Ollama (llama3.2:1b) via LiteLLM" },
        { label: "Embeddings", value: "nomic-embed-text (768 dimensions)" },
        { label: "Vector DB", value: "ChromaDB Persistent SQLite Store (Top-5)" },
        { label: "Multi-Agent", value: "CrewAI (Researcher → Analyst → Writer)" },
        { label: "Backend", value: "Python · FastAPI · Pydantic · DuckDuckGo" },
        { label: "Frontend", value: "React · TypeScript · Vite · Tailwind CSS" },
      ],
    },
    liveUrl: "https://huggingface.co/spaces/bhanu0803/AI-research-assistant",
    githubUrl: "https://huggingface.co/spaces/bhanu0803/AI-research-assistant/tree/main",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    code: "01",
    items: [
      {
        name: "JavaScript",
        role: "Full-stack runtime across React SPAs, Express/Node workers & WebRTC engines.",
        relatedProjects: ["the-orbit", "odyssey-solver", "genome-guide", "fluent-path"],
      },
      {
        name: "Python",
        role: "FastAPI SSE backends, LangGraph clinical state machines, CrewAI & deterministic ACMG logic.",
        relatedProjects: ["odyssey-solver", "genome-guide", "ai-research-assistant"],
      },
      {
        name: "Java",
        role: "Strongly-typed object-oriented backend systems, REST APIs & production server tooling.",
        relatedProjects: [],
      },
    ],
  },
  {
    id: "web",
    label: "Web & Real-Time",
    code: "02",
    items: [
      {
        name: "Next.js 16",
        role: "App Router, Turbopack, RSC & streaming AI endpoints in MeetMind and ContentForge.",
        relatedProjects: ["meetmind-ai", "contentforge-ai"],
      },
      {
        name: "React 19",
        role: "Real-time P2P stage UIs, interactive clinical graphs, Three.js & Framer Motion.",
        relatedProjects: ["the-orbit", "genome-guide", "contentforge-ai", "odyssey-solver", "fluent-path", "ai-research-assistant"],
      },
      {
        name: "Spring Boot & Express",
        role: "FastAPI / Fastify / Express REST & SSE services alongside Spring Boot backend foundations.",
        relatedProjects: ["the-orbit", "odyssey-solver", "genome-guide", "fluent-path", "ai-research-assistant"],
      },
      {
        name: "WebRTC / LiveKit",
        role: "Binary-tree P2P movie swarms, 2-way P2P / H.264 Simulcast & dual-track audio isolation.",
        relatedProjects: ["the-orbit"],
      },
      {
        name: "Tailwind CSS",
        role: "Zero-runtime utility design systems with responsive dark/light tokens.",
        relatedProjects: ["the-orbit", "meetmind-ai", "contentforge-ai", "fluent-path", "ai-research-assistant"],
      },
    ],
  },
  {
    id: "ai",
    label: "LLM, RAG & Agents",
    code: "03",
    items: [
      {
        name: "LangGraph & CrewAI",
        role: "Stateful multi-specialist debate graphs, 3-agent CrewAI research teams & Critic loops.",
        relatedProjects: ["odyssey-solver", "genome-guide", "ai-research-assistant"],
      },
      {
        name: "Groq, Ollama & Gemini",
        role: "LLaMA 3.3 / Whisper v3 cloud inference & local privacy-first Ollama LLaMA 3.2 runtimes.",
        relatedProjects: ["fluent-path", "meetmind-ai", "contentforge-ai", "genome-guide", "ai-research-assistant"],
      },
      {
        name: "Dual-RAG & GraphRAG",
        role: "Resnik MICA + Neo4j GraphRAG, 5-API Genomics RAG (ClinVar/gnomAD/VEP/MyVariant), pgvector & ChromaDB.",
        relatedProjects: ["odyssey-solver", "genome-guide", "meetmind-ai", "ai-research-assistant"],
      },
      {
        name: "MiniLM & Nomic Embed",
        role: "384-dim semantic meeting embeddings & 768-dim local document cosine indexing.",
        relatedProjects: ["meetmind-ai", "fluent-path", "ai-research-assistant"],
      },
    ],
  },
  {
    id: "data",
    label: "Databases & Auth",
    code: "04",
    items: [
      {
        name: "Supabase / pgvector",
        role: "PostgreSQL RLS, Edge schemas & 384-dim vector similarity RPCs.",
        relatedProjects: ["meetmind-ai", "contentforge-ai"],
      },
      {
        name: "Neo4j & ChromaDB",
        role: "12.8k-disease / 19.8k-HPO ontology graph in Neo4j & persistent local ChromaDB vectors.",
        relatedProjects: ["odyssey-solver", "ai-research-assistant"],
      },
      {
        name: "MySQL & MongoDB",
        role: "MongoDB registries & unseen test banks alongside relational SQL / PostgreSQL data modeling.",
        relatedProjects: ["the-orbit", "fluent-path"],
      },
      {
        name: "Clerk & JWT",
        role: "Svix webhook auth, Next.js user isolation & stateless HMAC / JWT verification.",
        relatedProjects: ["meetmind-ai", "contentforge-ai", "fluent-path"],
      },
    ],
  },
  {
    id: "tools",
    label: "Infra & Tooling",
    code: "05",
    items: [
      {
        name: "Vercel & Railway",
        role: "Production frontend edge deployments paired with Railway FastAPI & Node services.",
        relatedProjects: ["the-orbit", "odyssey-solver", "genome-guide", "fluent-path", "meetmind-ai", "contentforge-ai"],
      },
      {
        name: "Docker & HuggingFace",
        role: "Containerized LiveKit SFU, Redis & HuggingFace Spaces FastAPI deployments.",
        relatedProjects: ["the-orbit", "fluent-path", "ai-research-assistant"],
      },
      {
        name: "Git & PostMan",
        role: "Monorepo release workflows, API contract verification & SSE testing.",
        relatedProjects: ["the-orbit", "odyssey-solver", "genome-guide", "fluent-path", "meetmind-ai", "contentforge-ai", "ai-research-assistant"],
      },
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: "kmit",
    institution: "Keshav Memorial Institute of Technology",
    period: "Dec 2021 – June 2025",
    degree: "B.Tech in Computer Science and Engineering",
    location: "Hyderabad, India",
    scoreLabel: "CGPA",
    scoreValue: "8.3 / 10",
    highlights: [
      "Core foundation across Data Structures, Algorithms, Database Systems, Operating Systems & Applied AI.",
      "Engineered end-to-end production software spanning WebRTC P2P systems, Next.js 16, FastAPI, LangGraph & Neo4j.",
    ],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "tcs",
    company: "Tata Consultancy Services",
    shortName: "TCS",
    role: "System Engineer",
    period: "May 2026 – Present",
    location: "India",
  },
];

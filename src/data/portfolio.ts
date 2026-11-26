export interface ProjectItem {
  id: string;
  fig: string;
  repoName: string;
  title: string;
  subtitle: string;
  category: "Real-Time & P2P" | "GraphRAG & AI" | "Full-Stack AI" | "Full-Stack";
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
    liveUrl: "https://the-orbit-room.vercel.app/",
    githubUrl: "https://github.com/BhanuNama/Popcorn-Room",
  },
  {
    id: "odyssey-solver",
    fig: "FIG. 02",
    repoName: "BhanuNama/Claude-Group-2",
    title: "Odyssey Solver",
    subtitle: "Rare Disease Multi-Agent GraphRAG Decision Support",
    category: "GraphRAG & AI",
    year: "2026",
    tagline: "285k+ Neo4j HPO graph + 6-specialist LangGraph debate & Red-Team critic.",
    summary:
      "Multi-agent clinical decision support platform combining Human Phenotype Ontology (HPO) & Orphanet knowledge graphs in Neo4j with a 6-specialist LangGraph debate board, adversarial reviewer, and CMO arbiter.",
    tools: [
      "LangGraph",
      "Neo4j",
      "FastAPI",
      "React",
      "SSE Streaming",
      "Groq / DeepSeek",
      "Lucene",
    ],
    metrics: [
      { label: "Knowledge Graph", value: "12.8k Diseases · 285k HPO" },
      { label: "Debate Panel", value: "6 Specialists + Red Team" },
      { label: "Scoring", value: "IC-Weighted GraphRAG" },
    ],
    bullets: [
      "Grounds unstructured clinical notes and negated findings to standardized HPO IDs via Neo4j Lucene fulltext search.",
      "Traverses 12,880 Disease nodes and 285,334 HAS_PHENOTYPE associations in Neo4j with Information Content (IC) weighted scoring and contradiction penalties.",
      "Orchestrates 6 parallel domain specialists (Neurology, Genetics, Metabolic, Musculoskeletal, Cardiology, Sensory) followed by an Adversarial Reviewer and CMO synthesis.",
      "Streams stage-by-stage updates via FastAPI SSE into an interactive 3-tier knowledge graph (Phenotypes → Diseases → Genes) with pan/zoom inspection.",
    ],
    architecture: {
      steps: [
        { title: "Phenotype Extractor", detail: "Parses positive & absent HPO terms from notes" },
        { title: "Neo4j GraphRAG", detail: "285k+ HPO edges & IC-weighted overlap score" },
        { title: "6-Specialist Panel", detail: "Parallel clinical stances + Red-Team challenge" },
        { title: "CMO Arbiter & UI", detail: "Calibrated differential streamed over FastAPI SSE" },
      ],
    },
    deepDive: {
      challenge:
        "Rare disease patients face years of diagnostic delay because symptoms span multiple organ systems, and generic single-prompt LLMs suffer from premature closure or miss absent/negated clinical findings.",
      solution:
        "Emulated a real Rare Disease Diagnostic Board using LangGraph: grounded clinical notes to HPO terms in Neo4j, scored 285k+ phenotype edges via Information Content, ran 6 parallel specialist agents, and subjected candidates to an Adversarial Red-Team Reviewer before final CMO calibration.",
      decisions: [
        {
          title: "Negated Phenotype Penalty Modeling",
          detail: "Extractor isolates ruled-out findings (e.g., 'No seizures') and penalizes candidates whose hallmark symptoms contradict the chart.",
        },
        {
          title: "IC-Weighted Neo4j Graph Traversal",
          detail: "Rare specific phenotypes carry higher Information Content (IC) weight than common non-specific signs across 285,334 HAS_PHENOTYPE edges.",
        },
        {
          title: "Calibrated Composite CMO Formula",
          detail: "Combines structural ontology evidence with specialist consensus: Score = 0.7 × Graph + 0.3 × Panel − Red-Team Penalty.",
        },
        {
          title: "Interactive 3-Tier Graph Inspector",
          detail: "Renders Phenotypes → Diseases → Causative Genes with pan/drag, manual zoom buttons (no scroll-hijacking), and node metadata drawers.",
        },
      ],
      specs: [
        { label: "Ontology Scale", value: "12,880 Diseases · 285,334 HPO links" },
        { label: "Specialist Panel", value: "Neuro · Genetics · Metabolic · MSK · Cardio · Sensory" },
        { label: "Search Engine", value: "Neo4j Lucene fulltext + Cypher IC queries" },
        { label: "Streaming API", value: "FastAPI SSE (/v1/diagnose/stream)" },
        { label: "Data Sources", value: "Human Phenotype Ontology (hp.obo) + Orphanet XML" },
        { label: "Advisory Scope", value: "Investigational clinical decision support prototype" },
      ],
    },
    liveUrl: "https://claude-group-2.vercel.app",
    githubUrl: "https://github.com/BhanuNama/Claude-Group-2",
  },
  {
    id: "genome-guide",
    fig: "FIG. 03",
    repoName: "BhanuNama/GenomeGuide",
    title: "GenomeGuide",
    subtitle: "Agentic Dual-RAG Clinical Genomics Platform",
    category: "GraphRAG & AI",
    year: "2026",
    tagline: "Deterministic ACMG rule engine + ClinVar, gnomAD v4 & PubMed Dual-RAG.",
    summary:
      "Open-source clinical variant interpretation pipeline combining concurrent live RAG across NCBI ClinVar, Broad gnomAD v4, and PubMed with a deterministic Python ACMG/AMP classifier and reflexive adversarial critic.",
    tools: [
      "LangGraph",
      "LangSmith",
      "FastAPI",
      "React 19",
      "Groq LLaMA",
      "Three.js",
      "ClinVar / gnomAD",
    ],
    metrics: [
      { label: "ClinVar Benchmark", value: "0 / 50 Directional Errors" },
      { label: "Live Databases", value: "ClinVar + gnomAD + PubMed" },
      { label: "Hallucination Rate", value: "0.0% Post-Critic" },
    ],
    bullets: [
      "Executes concurrent multi-source RAG querying NCBI ClinVar E-Utilities, Broad Institute gnomAD v4 GraphQL, and peer-reviewed PubMed abstracts.",
      "Separates verdict computation from LLM text: a deterministic Python ACMG/AMP engine evaluates PVS1, PM2, BA1, and PP5 rules with zero stochastic guessing.",
      "Implements a Reflexive Adversarial Critic node that verifies every cited PMID, allele frequency, and classification before triggering retry loops.",
      "Instrumented with LangSmith v2 run telemetry, FastAPI SSE streaming, and a Three.js 3D DNA canvas.",
    ],
    architecture: {
      steps: [
        { title: "HGVS Parser Agent", detail: "Regex + Groq normalization (gene, c., p.)" },
        { title: "Concurrent Dual-RAG", detail: "ClinVar + gnomAD v4 GraphQL + PubMed E-Utils" },
        { title: "ACMG Rule Engine", detail: "Pure Python 2015 ACMG/AMP verdict logic" },
        { title: "Critic & LangSmith", detail: "Fact verification loop + v2 latency tracing" },
      ],
    },
    deepDive: {
      challenge:
        "General-purpose LLMs hallucinate pathogenicity classifications 15–30% of the time, confuse cDNA (c.) vs protein (p.) HGVS coordinates, and fabricate PubMed IDs—creating severe clinical risk.",
      solution:
        "Decoupled classification from language generation entirely: live ClinVar, gnomAD v4, and PubMed APIs feed a deterministic 2015 ACMG/AMP Python engine (~1 ms), and an adversarial Critic retries any LLM draft that misstates numbers or PMIDs.",
      decisions: [
        {
          title: "Zero-LLM Deterministic ACMG Engine",
          detail: "Evaluates PVS1 (LOF frameshift/nonsense), PS3/PP5 (ClinVar ≥2★ consensus), PM2 (gnomAD AF < 0.01%), BA1 (> 5%), and BP6 in pure Python.",
        },
        {
          title: "Concurrent 3-Source Biomedical RAG",
          detail: "Fetches NCBI ClinVar E-Utilities, Broad gnomAD v4 GraphQL allele counts, and PubMed literature in ~850 ms parallel async calls.",
        },
        {
          title: "Reflexive Critic Retry Loop (max 2)",
          detail: "Audits draft explanations for classification alignment, AF precision, valid PMIDs, and non-prescriptive medical tone.",
        },
        {
          title: "50-Variant Held-Out ClinVar Benchmark",
          detail: "Achieved 0.0% directional errors (0/50 Pathogenic ↔ Benign flips), 100% live API coverage, and 0.0% post-Critic hallucinations.",
        },
      ],
      specs: [
        { label: "Total Pipeline Latency", value: "~3.06 s end-to-end (BRCA1 c.68_69delAG)" },
        { label: "ACMG Classifier Speed", value: "12 ms deterministic Python evaluation" },
        { label: "Structured RAG", value: "NCBI ClinVar E-Utils + Broad gnomAD v4 GraphQL" },
        { label: "Unstructured RAG", value: "NCBI Entrez PubMed (live PMIDs)" },
        { label: "Observability", value: "LangSmith v2 + per-node SSE trace inspector" },
        { label: "Frontend Visuals", value: "React 19 + Three.js 3D Double-Helix" },
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
    id: "show-time",
    fig: "FIG. 07",
    repoName: "BhanuNama/Show-Time-Backend",
    title: "Show Time",
    subtitle: "Full-Stack Movie & Event Booking Platform",
    category: "Full-Stack",
    year: "2025",
    tagline: "JWT + Firebase RBAC booking engine with live seats, QR passes & owner analytics.",
    summary:
      "Production-deployed movie and live event ticket booking platform combining interactive Silver/Gold/VIP seat maps, downloadable QR passes, TMDB live sync, and a role-protected owner analytics dashboard.",
    tools: [
      "React 19",
      "Spring Boot 3.5",
      "Java 17",
      "MySQL 8",
      "Firebase",
      "Spring Security",
      "Tailwind CSS",
      "TMDB API",
    ],
    metrics: [
      { label: "Booking Flows", value: "Movies + Events" },
      { label: "Auth & RBAC", value: "JWT + BCrypt + Firebase" },
      { label: "Ticketing", value: "Live Seat Lock + QR" },
    ],
    bullets: [
      "Built full-stack movie booking app with React, Spring Boot, and MySQL featuring JWT authentication, live seat tracking, and public/downloadable QR tickets.",
      "Developed dual booking flows (movies with A–M tiered seats & events with custom zones), wishlist sync, real-time availability, and an owner analytics dashboard.",
      "Secured REST APIs with Spring Security, BCrypt, and role-based access control alongside TMDB v3 integration for live posters and show search.",
      "Designed responsive UI with Tailwind CSS, Framer Motion transitions, Firebase Auth, and HTML-to-image PNG ticket downloads.",
    ],
    architecture: {
      steps: [
        { title: "React 19 + Framer UI", detail: "Movie/event discovery, A–M seat map & QR pass" },
        { title: "Spring Security + JWT", detail: "Stateless JJWT filter, BCrypt & Firebase Auth" },
        { title: "Spring Boot REST Core", detail: "Seat/zone locks, owner analytics & TMDB sync" },
        { title: "MySQL 8 Persistence", detail: "Spring Data JPA/Hibernate transactional bookings" },
      ],
    },
    deepDive: {
      challenge:
        "Entertainment booking platforms must prevent double-booking seats concurrently, separate customer flows from venue owner scheduling/analytics, and verify QR tickets publicly at doors without requiring login.",
      solution:
        "Engineered a Spring Boot 3.5 REST API + MySQL 8 schema with server-side seat/zone validation, JJWT + Spring Security RBAC, public `/ticket/:id` QR pass endpoints, and a Framer Motion React SPA.",
      decisions: [
        {
          title: "Dual Booking State Machine (Movies & Events)",
          detail: "Supports seat-row matrices (Silver/Gold/VIP) for cinema shows and zone quantity allocation for multi-tier live events.",
        },
        {
          title: "Hybrid Auth (Firebase + Spring JJWT)",
          detail: "Supports email/password, Google sign-in, email link, and Twilio OTP backed by stateless Spring Security JWT verification.",
        },
        {
          title: "Public Door-Scan QR Passes",
          detail: "Generates qrcode.react passes exportable as PNG via html-to-image with unauthenticated verification routes for door scanning.",
        },
        {
          title: "Role-Gated Owner Operations Console",
          detail: "Lets venue owners manage theatres, schedules, event zones, booking lookups, and revenue analytics safely behind RBAC.",
        },
      ],
      specs: [
        { label: "Frontend", value: "React 19 · Vite 7 · Tailwind · Framer Motion" },
        { label: "Backend Core", value: "Java 17 · Spring Boot 3.5 · Spring Security · JJWT" },
        { label: "Database", value: "MySQL 8 + Spring Data JPA / Hibernate 6" },
        { label: "Integrations", value: "TMDB v3 · Firebase Auth · Twilio OTP" },
        { label: "Ticketing", value: "qrcode.react + html-to-image PNG export" },
        { label: "Deployment", value: "Vercel Frontend + Railway Spring Boot & MySQL" },
      ],
    },
    liveUrl: "https://its-show-time.vercel.app",
    githubUrl: "https://github.com/BhanuNama/Show-Time-Backend",
  },
  {
    id: "ai-research-assistant",
    fig: "FIG. 08",
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
  {
    id: "nutri-guide",
    fig: "FIG. 09",
    repoName: "BhanuNama/Nutri-Guide",
    title: "Nutri Guide",
    subtitle: "AI-Powered Nutrition & Macro Analytics Platform",
    category: "Full-Stack AI",
    year: "2024",
    tagline: "Gemini API meal planning, dynamic macro breakdowns & Chart.js telemetry.",
    summary:
      "Full-stack AI nutrition web application that transforms natural language dietary goals via Gemini API into personalized daily meal schedules, macro distribution dashboards, and persisted progress plans.",
    tools: [
      "ReactJS",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini API",
      "Chart.js",
      "Tailwind CSS",
      "JWT",
    ],
    metrics: [
      { label: "AI Planner", value: "Gemini NLU" },
      { label: "Telemetry", value: "Macro Chart.js" },
      { label: "Persistence", value: "JWT + MongoDB" },
    ],
    bullets: [
      "Engineered NutriGuide, a full-stack AI web app generating personalized meal plans using Gemini API for natural language dietary understanding.",
      "Implemented dynamic daily meal scheduling with protein/carb/fat macro breakdowns and interactive visual analytics via Chart.js.",
      "Developed JWT-based authentication and user profile management in Node.js + MongoDB for secure access and persistent nutrition tracking.",
    ],
    architecture: {
      steps: [
        { title: "React + Tailwind UI", detail: "Goal onboarding, meal planner & schedule views" },
        { title: "Gemini NLU Engine", detail: "Goal & preference synthesis into meal schedules" },
        { title: "Node + Express + JWT", detail: "Authenticated profiles & plan CRUD routes" },
        { title: "MongoDB + Chart.js", detail: "Persistent plan storage & macro analytics charts" },
      ],
    },
    deepDive: {
      challenge:
        "Static diet charts ignore regional preferences, caloric targets, and changing schedules, making nutrition consistency hard to track over time.",
      solution:
        "Built a MERN stack planner powered by Gemini API natural language synthesis that outputs structured multi-slot meal schedules paired with visual Chart.js macro breakdowns and saved user history.",
      decisions: [
        {
          title: "Goal-Driven Gemini Meal Synthesis",
          detail: "Translates dietary constraints, calorie targets, and food preferences into structured AM/PM/Evening meal plans.",
        },
        {
          title: "Interactive Chart.js Macro Breakdown",
          detail: "Visualizes calorie adherence and protein/carb/fat ratios cleanly across daily schedules.",
        },
        {
          title: "JWT Auth & MongoDB Persistence",
          detail: "Persists personalized profiles, generated plans, and nutrition targets per user in MongoDB.",
        },
      ],
      specs: [
        { label: "Frontend", value: "ReactJS · Tailwind CSS · Chart.js" },
        { label: "AI Layer", value: "Google Gemini API (Natural Language Planning)" },
        { label: "Backend API", value: "Node.js · Express · JWT Authentication" },
        { label: "Database", value: "MongoDB User Profiles & Meal History" },
        { label: "Hosting", value: "Vercel Web App" },
      ],
    },
    liveUrl: "https://neutri-guide.vercel.app",
    githubUrl: "https://github.com/BhanuNama/Nutri-Guide",
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
        relatedProjects: ["the-orbit", "odyssey-solver", "genome-guide", "fluent-path", "nutri-guide"],
      },
      {
        name: "Python",
        role: "FastAPI SSE backends, LangGraph clinical state machines, CrewAI & deterministic ACMG logic.",
        relatedProjects: ["odyssey-solver", "genome-guide", "ai-research-assistant"],
      },
      {
        name: "Java",
        role: "Strongly-typed Spring Boot 3.5 REST APIs, Spring Security JWT & JPA/Hibernate.",
        relatedProjects: ["show-time"],
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
        role: "Real-time P2P stage UIs, interactive seat matrices, Three.js & Framer Motion.",
        relatedProjects: ["the-orbit", "genome-guide", "contentforge-ai", "odyssey-solver", "fluent-path", "show-time", "ai-research-assistant", "nutri-guide"],
      },
      {
        name: "Spring Boot & Express",
        role: "Spring Boot + Spring Security REST services and FastAPI / Fastify / Express APIs.",
        relatedProjects: ["show-time", "the-orbit", "odyssey-solver", "genome-guide", "fluent-path", "ai-research-assistant", "nutri-guide"],
      },
      {
        name: "WebRTC / LiveKit",
        role: "Binary-tree P2P movie swarms, 2-way P2P / H.264 Simulcast & dual-track audio isolation.",
        relatedProjects: ["the-orbit"],
      },
      {
        name: "Tailwind CSS",
        role: "Zero-runtime utility design systems with responsive dark/light tokens.",
        relatedProjects: ["the-orbit", "meetmind-ai", "contentforge-ai", "fluent-path", "show-time", "ai-research-assistant", "nutri-guide"],
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
        role: "LLaMA 3.3 / Whisper v3 cloud inference, local Ollama LLaMA 3.2 & Gemini NLU planning.",
        relatedProjects: ["fluent-path", "meetmind-ai", "contentforge-ai", "genome-guide", "ai-research-assistant", "nutri-guide"],
      },
      {
        name: "Dual-RAG & GraphRAG",
        role: "IC-weighted Neo4j traversal + ClinVar/gnomAD, pgvector & local ChromaDB top-5 RAG.",
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
        role: "285k+ biomedical ontology graph in Neo4j & persistent local ChromaDB vectors.",
        relatedProjects: ["odyssey-solver", "ai-research-assistant"],
      },
      {
        name: "MySQL & MongoDB",
        role: "Transactional MySQL 8 bookings (Hibernate) & MongoDB registries / test banks.",
        relatedProjects: ["show-time", "the-orbit", "fluent-path", "nutri-guide"],
      },
      {
        name: "Clerk & JWT",
        role: "Svix webhook auth, Next.js user isolation & stateless Spring Security JWT RBAC.",
        relatedProjects: ["show-time", "meetmind-ai", "contentforge-ai", "nutri-guide"],
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
        role: "Production frontend edge deployments paired with Railway Spring Boot & FastAPI services.",
        relatedProjects: ["the-orbit", "odyssey-solver", "genome-guide", "fluent-path", "meetmind-ai", "contentforge-ai", "show-time", "nutri-guide"],
      },
      {
        name: "Docker & HuggingFace",
        role: "Containerized LiveKit SFU, Redis & HuggingFace Spaces FastAPI deployments.",
        relatedProjects: ["the-orbit", "fluent-path", "ai-research-assistant"],
      },
      {
        name: "Git & PostMan",
        role: "Monorepo release workflows, API contract verification & SSE testing.",
        relatedProjects: ["the-orbit", "odyssey-solver", "genome-guide", "fluent-path", "meetmind-ai", "contentforge-ai", "show-time", "ai-research-assistant", "nutri-guide"],
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

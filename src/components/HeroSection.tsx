"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeftRight,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  Terminal,
  RotateCw,
  Shuffle,
} from "lucide-react";
import { PROFILE, PROJECTS, ProjectItem } from "@/data/portfolio";
import { AvatarEmblem } from "./AvatarEmblem";
import { InteractivePaperField } from "./InteractivePaperField";
import { ProjectArtworkSwitch } from "./ProjectArtwork";
import { useAppContext } from "./SmoothScrollProvider";
import { Magnetic } from "./Magnetic";
import { ScrollInkText } from "./ScrollInkText";
import { paperSound } from "@/lib/paperSound";

interface HeroSectionProps {
  onSelectProject: (project: ProjectItem, origin: "hero" | "bento") => void;
}

interface DeckSlot {
  id: string;
  type: "project" | "profile";
  project: ProjectItem | null;
}

const INITIAL_DECK: DeckSlot[] = [
  { id: PROJECTS[0].id, type: "project", project: PROJECTS[0] },
  { id: PROJECTS[1].id, type: "project", project: PROJECTS[1] },
  { id: PROJECTS[2].id, type: "project", project: PROJECTS[2] },
  { id: "profile-center", type: "profile", project: null },
  { id: PROJECTS[3].id, type: "project", project: PROJECTS[3] },
  { id: PROJECTS[4].id, type: "project", project: PROJECTS[4] },
  { id: PROJECTS[5].id, type: "project", project: PROJECTS[5] },
];

const MOBILE_INITIAL_DECK: DeckSlot[] = [
  { id: "profile-center", type: "profile", project: null },
  { id: PROJECTS[0].id, type: "project", project: PROJECTS[0] },
  { id: PROJECTS[1].id, type: "project", project: PROJECTS[1] },
  { id: PROJECTS[2].id, type: "project", project: PROJECTS[2] },
  { id: PROJECTS[3].id, type: "project", project: PROJECTS[3] },
  { id: PROJECTS[4].id, type: "project", project: PROJECTS[4] },
  { id: PROJECTS[5].id, type: "project", project: PROJECTS[5] },
];

const MOBILE_FAN_GEOM = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: 26, y: 8, rotate: 7.5, scale: 0.96, opacity: 1 },
  { x: -24, y: 14, rotate: -7, scale: 0.92, opacity: 1 },
  { x: 34, y: 20, rotate: 11, scale: 0.88, opacity: 0.95 },
  { x: -28, y: 24, rotate: -9.5, scale: 0.85, opacity: 0.85 },
  { x: 16, y: 27, rotate: 5, scale: 0.82, opacity: 0.55 },
  { x: -10, y: 29, rotate: -4, scale: 0.78, opacity: 0.35 },
];

function MobileCardItem({
  slot,
  index,
  total,
  profileFlipped,
  onFlick,
  onFlipProfile,
  onSelectProject,
}: {
  slot: DeckSlot;
  index: number;
  total: number;
  profileFlipped: boolean;
  onFlick: () => void;
  onFlipProfile: () => void;
  onSelectProject: (project: ProjectItem) => void;
}) {
  const isTop = index === 0;
  const isProfileSlot = slot.type === "profile";
  const geom = MOBILE_FAN_GEOM[Math.min(index, MOBILE_FAN_GEOM.length - 1)];

  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-170, 0, 170], [-14, 0, 14]);

  useEffect(() => {
    dragX.set(0);
  }, [index, dragX]);

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 58 || Math.abs(info.velocity.x) > 350) {
          onFlick();
        }
      }}
      onTap={() => {
        if (!isTop) return;
        if (isProfileSlot) {
          onFlipProfile();
        } else if (slot.project) {
          onSelectProject(slot.project);
        }
      }}
      style={isTop ? { x: dragX, rotate: dragRotate } : undefined}
      animate={{
        x: isTop ? 0 : geom.x,
        y: geom.y,
        rotate: isTop ? 0 : geom.rotate,
        scale: geom.scale,
        opacity: geom.opacity,
        zIndex: total - index,
      }}
      whileDrag={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={`absolute inset-0 select-none ${
        isProfileSlot
          ? ""
          : "rounded-[22px] border border-[var(--border-strong)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-float)]"
      } ${isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}`}
    >
      {isProfileSlot ? (
        <ProfileDeckCard flipped={profileFlipped} />
      ) : (
        slot.project && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between font-mono text-[10px] text-[var(--ink-muted)]">
              <span>{slot.project.fig}</span>
              <span className="rounded-full bg-[var(--bg-well)] px-2 py-0.5 text-[9px] text-[var(--ink-secondary)]">
                {slot.project.category}
              </span>
            </div>
            <div className="my-2">
              <ProjectArtworkSwitch projectId={slot.project.id} compact />
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--ink-primary)]">
                {slot.project.title}
              </div>
              <div className="line-clamp-2 text-xs text-[var(--ink-secondary)]">
                {slot.project.tagline}
              </div>
            </div>
          </div>
        )
      )}
    </motion.div>
  );
}

function ProfileDeckCard({ flipped }: { flipped: boolean }) {
  return (
    <div className="h-full w-full" style={{ perspective: 1000 }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* Front Face */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className="absolute inset-0 rounded-[22px] border border-[var(--border-strong)] bg-[var(--bg-card)] p-3 shadow-[var(--shadow-float)]"
        >
          <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2.5 py-1 font-mono text-[10px] text-[var(--ink-primary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                SIDE A
              </span>
              <RotateCw className="h-3.5 w-3.5 text-[var(--ink-muted)] transition-transform duration-300" />
            </div>

            <div className="my-auto flex flex-col items-center text-center">
              <AvatarEmblem size="deck" className="mb-2.5" />
              <div className="text-base font-bold tracking-tight text-[var(--ink-primary)]">
                {PROFILE.name}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-[var(--ink-secondary)]">
                {PROFILE.role}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-dashed border-[var(--border-strong)] pt-2.5 font-mono text-[9px] text-[var(--ink-muted)]">
              <span>HYD, IN</span>
              <span className="font-semibold text-[var(--accent)]">FLIP ↻</span>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 rounded-[22px] border border-[var(--border-strong)] bg-[var(--bg-card)] p-3 shadow-[var(--shadow-float)]"
        >
          <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2.5 py-1 font-mono text-[10px] text-[var(--ink-secondary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                SIDE B
              </span>
              <RotateCw className="h-3.5 w-3.5 text-[var(--ink-muted)]" />
            </div>

            <div className="my-auto px-0.5 text-center">
              <p className="font-serif text-[14.5px] leading-[1.42] italic text-[var(--ink-primary)]">
                You flipped a card expecting lore. Honestly, just building{" "}
                <span className="text-[var(--accent)]">cool stuff</span>.
              </p>
              <p className="mt-3 font-mono text-[10px] text-[var(--ink-muted)]">
                temp = 0.2 · zero panic
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-dashed border-[var(--border-strong)] pt-2.5 font-mono text-[9px] text-[var(--ink-muted)]">
              <span>CHILL MODE</span>
              <span className="font-semibold text-[var(--accent)]">FLIP ↺</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const SLOT_GEOMETRY = [
  { baseRotate: -12, baseX: -294, baseY: 34, z: 10 },
  { baseRotate: -8, baseX: -196, baseY: 18, z: 20 },
  { baseRotate: -4, baseX: -98, baseY: 7, z: 30 },
  { baseRotate: 0, baseX: 0, baseY: 0, z: 40 },
  { baseRotate: 4, baseX: 98, baseY: 7, z: 30 },
  { baseRotate: 8, baseX: 196, baseY: 18, z: 20 },
  { baseRotate: 12, baseX: 294, baseY: 34, z: 10 },
];

const FUNNY_COMMITS = [
  'git commit -m "fixed it, don\'t ask"',
  'git commit -m "works on localhost lol"',
  'git commit -m "deleted 400 lines, feels great"',
  'git commit -m "ship before QA wakes up"',
];

const DUCK_TIPS = [
  "have u checked the logs?",
  "it's probably DNS.",
  "try turning it off & on",
  "missed a semicolon?",
];

export function HeroSection({ onSelectProject }: HeroSectionProps) {
  const { scrollToSection, showToast } = useAppContext();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [deckOrder, setDeckOrder] = useState<DeckSlot[]>(INITIAL_DECK);
  const [mobileStack, setMobileStack] = useState<DeckSlot[]>(MOBILE_INITIAL_DECK);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [profileFlipped, setProfileFlipped] = useState(false);
  const [commitIdx, setCommitIdx] = useState(0);
  const [duckIdx, setDuckIdx] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const deckScrollSpread = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const deckScrollY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  const handleCopyEmail = () => {
    paperSound.playClick();
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    showToast(`Copied ${PROFILE.email}`);
    window.setTimeout(() => setCopiedEmail(false), 2000);
  };

  const shuffleDeck = () => {
    paperSound.playCardFlick();
    setDeckOrder((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const flickMobileCard = () => {
    paperSound.playCardFlick();
    setMobileStack((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* Interactive Tactile Dot-Matrix Canvas */}
      <InteractivePaperField />

      {/* Outer Gutter Stage for Draggable Creative Tech Stickers (Zero Text Overlap) */}
      <div className="pointer-events-none absolute inset-x-0 top-24 z-20 mx-auto hidden max-w-[1380px] px-6 lg:block sm:top-32">
        <div className="relative w-full">
          {/* 1. Top-Left (lg+): Interactive Funny Git Commit Pill */}
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.28}
            onDragStart={() => paperSound.playCardFlick()}
            onTap={() => {
              paperSound.playClick();
              setCommitIdx((i) => (i + 1) % FUNNY_COMMITS.length);
            }}
            whileHover={{ scale: 1.06, rotate: -2 }}
            whileTap={{ scale: 0.96 }}
            whileDrag={{ scale: 1.1, rotate: 2, cursor: "grabbing" }}
            initial={{ opacity: 0, y: 12, rotate: -6 }}
            animate={{ opacity: 1, y: [0, -5, 0], rotate: -4 }}
            transition={{
              opacity: { delay: 0.42, duration: 0.4 },
              y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
            }}
            className="pointer-events-auto absolute left-2 top-0 flex cursor-grab items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-3.5 py-1.5 shadow-[var(--shadow-card)] select-none xl:left-4"
            title="Click to cycle commit · Drag to toss!"
          >
            <Terminal className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span className="font-mono text-[11px] font-semibold text-[var(--ink-primary)]">
              {FUNNY_COMMITS[commitIdx]}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-0.5 inline-block text-[var(--accent)]"
              >
                _
              </motion.span>
            </span>
          </motion.div>

          {/* 2. Top-Right (lg+): Playful Hallucination Meter Pill */}
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.28}
            onDragStart={() => paperSound.playCardFlick()}
            whileHover={{ scale: 1.06, rotate: 2 }}
            whileDrag={{ scale: 1.1, rotate: -2, cursor: "grabbing" }}
            initial={{ opacity: 0, y: 12, rotate: 6 }}
            animate={{ opacity: 1, y: [0, 5, 0], rotate: 4 }}
            transition={{
              opacity: { delay: 0.5, duration: 0.4 },
              y: { duration: 5.1, repeat: Infinity, ease: "easeInOut" },
            }}
            className="pointer-events-auto absolute right-2 top-2 flex cursor-grab items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-3.5 py-1.5 shadow-[var(--shadow-card)] select-none xl:right-4"
            title="RAG calibrated · Drag me!"
          >
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span className="font-mono text-[11px] font-semibold text-[var(--ink-primary)]">
              hallucinations: <span className="text-[var(--accent)]">0%</span>*
            </span>
          </motion.div>

          {/* 3. Mid-Left Wing (xl+ only, well clear of headline): Mechanical ⌘K Keycap */}
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.28}
            onDragStart={() => paperSound.playCardFlick()}
            whileHover={{ scale: 1.12, rotate: -2 }}
            whileTap={{ scale: 0.92, y: 3 }}
            whileDrag={{ scale: 1.16, rotate: 4, cursor: "grabbing" }}
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, y: [0, 5, 0], rotate: -6 }}
            transition={{
              opacity: { delay: 0.58, duration: 0.4 },
              y: { duration: 4.4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="pointer-events-auto absolute left-8 top-[140px] hidden cursor-grab flex-col items-center gap-1 select-none xl:flex"
            title="Mechanical keycap — drag or squish!"
          >
            <svg width="58" height="56" viewBox="0 0 60 58" fill="none" aria-hidden="true">
              <rect
                x="4"
                y="6"
                width="52"
                height="48"
                rx="13"
                fill="var(--bg-well)"
                stroke="var(--border-strong)"
                strokeWidth="1.3"
              />
              <rect
                x="8"
                y="8"
                width="44"
                height="38"
                rx="10"
                fill="var(--bg-card)"
                stroke="var(--ink-primary)"
                strokeWidth="1.25"
              />
              <text
                x="30"
                y="31"
                textAnchor="middle"
                fill="var(--ink-primary)"
                fontFamily="monospace"
                fontWeight="700"
                fontSize="12"
              >
                ⌘K
              </text>
              <circle cx="44" cy="15" r="2.2" fill="var(--accent)" />
            </svg>
            <span className="font-mono text-[9px] text-[var(--ink-muted)]">
              quick jump
            </span>
          </motion.div>

          {/* 4. Mid-Right Wing (xl+ only, zero overlap with headline/statement): Interactive Debug Duck SVG */}
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.28}
            onDragStart={() => paperSound.playCardFlick()}
            onTap={() => {
              paperSound.playToggle();
              setDuckIdx((i) => (i + 1) % DUCK_TIPS.length);
            }}
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.94 }}
            whileDrag={{ scale: 1.12, rotate: -4, cursor: "grabbing" }}
            initial={{ opacity: 0, scale: 0.85, rotate: 7 }}
            animate={{ opacity: 1, scale: 1, y: [0, -5, 0], rotate: 5 }}
            transition={{
              opacity: { delay: 0.65, duration: 0.4 },
              y: { duration: 4.9, repeat: Infinity, ease: "easeInOut" },
            }}
            className="pointer-events-auto absolute right-6 top-[130px] hidden cursor-grab flex-col items-end gap-1 select-none xl:flex"
            title="Tap rubber duck for debugging wisdom!"
          >
            <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2.5 py-0.5 font-mono text-[9px] text-[var(--ink-secondary)] shadow-xs">
              &ldquo;{DUCK_TIPS[duckIdx]}&rdquo;
            </span>
            <svg width="58" height="48" viewBox="0 0 60 50" fill="none" aria-hidden="true">
              {/* Paper-style Debug Duck */}
              <path
                d="M12 30 C12 22, 20 20, 26 22 C28 13, 35 8, 42 10 C47 11, 49 16, 47 20 L54 22 C54 25, 49 26, 46 25 C47 32, 42 40, 30 40 C17 40, 11 35, 12 30 Z"
                fill="var(--bg-card)"
                stroke="var(--ink-primary)"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              {/* Accent Beak */}
              <path
                d="M47 20 L55 21.5 C55 24.5, 50 25.5, 46 24.5 Z"
                fill="var(--accent)"
              />
              {/* Eye */}
              <circle cx="41" cy="15.5" r="1.6" fill="var(--ink-primary)" />
              {/* Wing */}
              <path
                d="M23 28 C27 25, 34 26, 35 31 C32 34, 24 33, 23 28 Z"
                fill="var(--bg-well)"
                stroke="var(--ink-secondary)"
                strokeWidth="1.1"
              />
            </svg>
          </motion.div>

          {/* 5. Lower-Left Wing (lg+ flanking CTAs cleanly): Ctrl+Z Undo Stamp */}
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.28}
            onDragStart={() => paperSound.playCardFlick()}
            whileHover={{ scale: 1.07, rotate: 2 }}
            whileDrag={{ scale: 1.12, rotate: -3, cursor: "grabbing" }}
            initial={{ opacity: 0, y: 12, rotate: 5 }}
            animate={{ opacity: 1, y: [0, -4, 0], rotate: 4 }}
            transition={{
              opacity: { delay: 0.72, duration: 0.4 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="pointer-events-auto absolute left-4 top-[305px] flex cursor-grab items-center gap-2 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-card)] px-3 py-2 shadow-[var(--shadow-card)] select-none xl:left-10"
            title="Developer superpower — drag around!"
          >
            <kbd className="rounded border border-[var(--border-strong)] bg-[var(--bg-paper)] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[var(--accent)]">
              Ctrl+Z
            </kbd>
            <span className="font-mono text-[10px] text-[var(--ink-secondary)]">
              tiny time machine
            </span>
          </motion.div>

          {/* 6. Lower-Right Wing (lg+ flanking CTAs cleanly): // TODO: touch grass */}
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.28}
            onDragStart={() => paperSound.playCardFlick()}
            whileHover={{ scale: 1.07, rotate: -2 }}
            whileDrag={{ scale: 1.12, rotate: 3, cursor: "grabbing" }}
            initial={{ opacity: 0, y: 12, rotate: -5 }}
            animate={{ opacity: 1, y: [0, 4, 0], rotate: -4 }}
            transition={{
              opacity: { delay: 0.78, duration: 0.4 },
              y: { duration: 5.0, repeat: Infinity, ease: "easeInOut" },
            }}
            className="pointer-events-auto absolute right-4 top-[305px] flex cursor-grab items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-paper)] px-3 py-2 shadow-[var(--shadow-card)] select-none xl:right-10"
            title="Current sprint backlog — drag around!"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="font-mono text-[10px]">
              <span className="font-semibold text-[var(--accent)]">&#47;&#47; TODO:</span>{" "}
              <span className="text-[var(--ink-primary)]">touch grass</span>
            </div>
          </motion.div>

          {/* 7. Bottom-Left Deck Flank (xl+): 404 Sleep Stamp */}
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.28}
            onDragStart={() => paperSound.playCardFlick()}
            whileHover={{ scale: 1.07, rotate: -3 }}
            whileDrag={{ scale: 1.12, rotate: 2, cursor: "grabbing" }}
            initial={{ opacity: 0, y: 12, rotate: -6 }}
            animate={{ opacity: 1, y: [0, 4, 0], rotate: -5 }}
            transition={{
              opacity: { delay: 0.85, duration: 0.4 },
              y: { duration: 5.3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="pointer-events-auto absolute left-6 top-[490px] hidden cursor-grab flex-col rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] px-3 py-2 shadow-[var(--shadow-card)] select-none xl:flex"
            title="HTTP 404 — drag around!"
          >
            <span className="font-mono text-[10px] font-bold text-[var(--accent)]">
              ERR 404
            </span>
            <span className="font-mono text-[9px] text-[var(--ink-secondary)]">
              sleep.ts not found
            </span>
          </motion.div>

          {/* 8. Bottom-Right Deck Flank (xl+, completely clear of statement!): Orbital Node + Ping */}
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.28}
            onDragStart={() => paperSound.playCardFlick()}
            whileHover={{ scale: 1.1, rotate: 4 }}
            whileDrag={{ scale: 1.14, rotate: -4, cursor: "grabbing" }}
            initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, y: [0, -5, 0], rotate: 5 }}
            transition={{
              opacity: { delay: 0.9, duration: 0.4 },
              y: { duration: 4.7, repeat: Infinity, ease: "easeInOut" },
            }}
            className="pointer-events-auto absolute right-6 top-[480px] hidden cursor-grab flex-col items-center gap-1 select-none xl:flex"
            title="200 OK — drag orbital node!"
          >
            <svg width="62" height="50" viewBox="0 0 64 52" fill="none" aria-hidden="true">
              <ellipse
                cx="32"
                cy="26"
                rx="26"
                ry="11"
                transform="rotate(-18 32 26)"
                stroke="var(--ink-secondary)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              <ellipse
                cx="32"
                cy="26"
                rx="22"
                ry="9"
                transform="rotate(24 32 26)"
                stroke="var(--border-strong)"
                strokeWidth="1.1"
              />
              <circle cx="32" cy="26" r="5.5" fill="var(--accent)" />
              <motion.circle
                r="3"
                fill="var(--bg-card)"
                stroke="var(--ink-primary)"
                strokeWidth="1.3"
                animate={{
                  cx: [10, 32, 54, 32, 10],
                  cy: [32, 14, 20, 38, 32],
                }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
              />
            </svg>
            <span className="font-mono text-[9px] text-[var(--ink-muted)]">
              200 OK · prod alive
            </span>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">

        {/* Top Editorial Row */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-3.5 py-1.5 shadow-[var(--shadow-card)]"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-mono text-[11px] font-medium tracking-wide text-[var(--ink-secondary)]">
              {PROFILE.availability} · {PROFILE.location}
            </span>
          </motion.div>

          {/* Masked Editorial Headline Reveal */}
          <h1 className="text-4xl font-bold tracking-[-0.035em] text-[var(--ink-primary)] sm:text-6xl lg:text-[4.25rem] lg:leading-[1.06]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
              >
                <span>Hey, I&apos;m</span>
                <span className="inline-flex items-center gap-3">
                  <span>Bhanu</span>
                  <AvatarEmblem
                    size="md"
                    className="-rotate-3 transition-transform duration-300 hover:rotate-3 hover:scale-105"
                  />
                </span>
              </motion.span>
            </span>

            <span className="block overflow-hidden pt-1">
              <motion.span
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.68, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                Turning{" "}
                <span className="font-serif text-[1.12em] font-normal italic text-[var(--accent)]">
                  wild
                </span>{" "}
                ideas into clean software.
              </motion.span>
            </span>
          </h1>

          {/* Scroll-Scrubbed Pencil-to-Ink Objective Statement */}
          <ScrollInkText
            text={PROFILE.objective}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-primary)] sm:text-lg"
          />

          {/* Magnetic CTA Pill Pair */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => {
                  paperSound.playClick();
                  scrollToSection("projects");
                }}
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-card)] transition-all hover:translate-y-[-1px] hover:shadow-[var(--shadow-float)] active:translate-y-0"
              >
                <span>See What I Built</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Magnetic>

            <Magnetic strength={0.18}>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-5 py-3 text-sm font-medium text-[var(--ink-primary)] shadow-[var(--shadow-card)] transition-all hover:border-[var(--ink-primary)] hover:bg-[var(--bg-well)]"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Copied Email</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-[var(--ink-secondary)]" />
                    <span>{PROFILE.email}</span>
                  </>
                )}
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* 5-Card Interactive Fanned Deck with Deal/Shuffle + Shared-Element Morph */}
        <motion.div
          style={{ y: deckScrollY, scale: deckScrollSpread }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 sm:mt-16"
        >
          {/* Desktop 7-Card Fanned Deck (All 6 Projects + Center Profile) */}
          <div className="hidden flex-col items-center md:flex">
            <div className="relative mx-auto flex h-[335px] w-full max-w-5xl items-center justify-center">
              {deckOrder.map((card, index) => {
                const geom = SLOT_GEOMETRY[index];
                const isHovered = hoveredCard === index;
                const spreadOffset =
                  hoveredCard === null
                    ? 0
                    : index < hoveredCard
                      ? -26
                      : index > hoveredCard
                        ? 26
                        : 0;

                const isProfile = card.type === "profile";

                return (
                  <motion.div
                    key={card.id}
                    layoutId={card.project ? `hero-card-${card.project.id}` : undefined}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => {
                      if (card.project) {
                        paperSound.playCardFlick();
                        onSelectProject(card.project, "hero");
                      } else {
                        paperSound.playCardFlick();
                        setProfileFlipped((prev) => !prev);
                      }
                    }}
                    animate={{
                      x: geom.baseX + spreadOffset,
                      y: isHovered ? -26 : geom.baseY,
                      rotate: isHovered ? 0 : geom.baseRotate,
                      scale: isHovered ? 1.07 : 1,
                      zIndex: isHovered ? 50 : geom.z,
                    }}
                    transition={{ type: "spring", stiffness: 290, damping: 23 }}
                    className={
                      isProfile
                        ? "absolute h-[276px] w-[206px] cursor-pointer select-none"
                        : "absolute w-[206px] cursor-pointer rounded-[22px] border border-[var(--border-strong)] bg-[var(--bg-card)] p-3 shadow-[var(--shadow-float)] select-none"
                    }
                  >
                    {isProfile ? (
                      <ProfileDeckCard flipped={profileFlipped} />
                    ) : (
                      card.project && (
                        <div className="flex h-[250px] flex-col justify-between">
                          <div className="flex items-center justify-between px-0.5">
                            <span className="font-mono text-[10px] font-medium text-[var(--ink-muted)]">
                              {card.project.fig}
                            </span>
                            <span className="rounded-full bg-[var(--bg-well)] px-2 py-0.5 font-mono text-[9px] text-[var(--ink-secondary)]">
                              {card.project.category}
                            </span>
                          </div>

                          <div className="my-2">
                            <ProjectArtworkSwitch projectId={card.project.id} compact />
                          </div>

                          <div className="px-0.5">
                            <div className="text-sm font-bold tracking-tight text-[var(--ink-primary)]">
                              {card.project.title}
                            </div>
                            <div className="truncate font-mono text-[10px] text-[var(--ink-secondary)]">
                              {card.project.tools.slice(0, 3).join(" · ")}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </motion.div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={shuffleDeck}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-3.5 py-1.5 font-mono text-[11px] text-[var(--ink-secondary)] shadow-xs transition-all hover:border-[var(--ink-primary)] hover:text-[var(--ink-primary)] active:scale-95"
            >
              <Shuffle className="h-3 w-3 text-[var(--accent)]" />
              <span>Deal / Shuffle Deck</span>
            </button>
          </div>

          {/* Mobile Fanned Curiosity Card Deck (Profile Card First!) */}
          <div className="flex flex-col items-center md:hidden">
            <div className="relative h-[300px] w-[236px]">
              {mobileStack.map((slot, index) => (
                <MobileCardItem
                  key={slot.id}
                  slot={slot}
                  index={index}
                  total={mobileStack.length}
                  profileFlipped={profileFlipped}
                  onFlick={flickMobileCard}
                  onFlipProfile={() => {
                    paperSound.playCardFlick();
                    setProfileFlipped((prev) => !prev);
                  }}
                  onSelectProject={(project) => {
                    paperSound.playCardFlick();
                    onSelectProject(project, "hero");
                  }}
                />
              ))}
            </div>

            {/* Interactive Swipe Cue + Card Progress Dots */}
            <div className="mt-10 flex flex-col items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                {MOBILE_INITIAL_DECK.map((d) => {
                  const active = mobileStack[0]?.id === d.id;
                  return (
                    <span
                      key={d.id}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        active
                          ? "w-5 bg-[var(--accent)]"
                          : "w-1.5 bg-[var(--border-strong)]"
                      }`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={flickMobileCard}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-3.5 py-1.5 font-mono text-[10px] text-[var(--ink-secondary)] shadow-xs active:scale-95"
              >
                <ArrowLeftRight className="h-3 w-3 text-[var(--accent)]" />
                <span>
                  {mobileStack[0]?.type === "profile"
                    ? "SWIPE FOR PROJECTS · TAP TO FLIP"
                    : "SWIPE NEXT · TAP TO OPEN"}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

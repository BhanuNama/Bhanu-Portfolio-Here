"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import { ProjectMediaItem } from "@/data/portfolio";
import { paperSound } from "@/lib/paperSound";

interface ProjectGalleryProps {
  projectTitle: string;
  liveUrl: string;
  gallery?: ProjectMediaItem[];
}

export function ProjectGallery({
  projectTitle,
  liveUrl,
  gallery,
}: ProjectGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const items = gallery ?? [];
  const total = items.length;

  useEffect(() => {
    setActiveIdx(0);
    setLightboxOpen(false);
  }, [projectTitle]);

  useEffect(() => {
    if (!lightboxOpen || total === 0) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        paperSound.playClick();
        setActiveIdx((i) => (i + 1) % total);
      } else if (e.key === "ArrowLeft") {
        paperSound.playClick();
        setActiveIdx((i) => (i - 1 + total) % total);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, total]);

  if (total === 0) return null;

  const active = items[Math.min(activeIdx, total - 1)];
  const displayHost = liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const goPrev = () => {
    paperSound.playClick();
    setActiveIdx((i) => (i - 1 + total) % total);
  };

  const goNext = () => {
    paperSound.playClick();
    setActiveIdx((i) => (i + 1) % total);
  };

  return (
    <section className="mt-14 min-w-0">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
          <Camera className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span>Interface &amp; Build Captures</span>
        </span>
        <span className="font-mono text-[10px] text-[var(--ink-secondary)]">
          {String(activeIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Browser-Framed Gallery Showcase */}
      <div className="mt-4 overflow-hidden rounded-[26px] border border-[var(--border-hairline)] bg-[var(--bg-card)] shadow-[var(--shadow-card)]">
        {/* Top Window Chrome */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] bg-[var(--bg-paper)]/70 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]/80" />
            </div>
            <span className="truncate rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--ink-muted)]">
              {displayHost}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {active.tag && (
              <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--accent)]">
                {active.tag}
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                paperSound.playCardFlick();
                setLightboxOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] px-2.5 py-1 font-mono text-[10px] text-[var(--ink-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Maximize2 className="h-3 w-3" />
              <span className="hidden sm:inline">Expand</span>
            </button>
          </div>
        </div>

        {/* Main Image Viewport */}
        <div className="group relative aspect-video w-full overflow-hidden bg-[var(--bg-well)]">
          <AnimatePresence mode="wait">
            <motion.img
              key={active.src}
              src={active.src}
              alt={`${projectTitle} — ${active.caption}`}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => {
                paperSound.playCardFlick();
                setLightboxOpen(true);
              }}
              className="h-full w-full cursor-zoom-in object-contain p-2 sm:p-4"
            />
          </AnimatePresence>

          {total > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={goPrev}
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)]/90 text-[var(--ink-primary)] shadow-sm backdrop-blur-xs transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={goNext}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)]/90 text-[var(--ink-primary)] shadow-sm backdrop-blur-xs transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Caption & Thumbnail Strip */}
        <div className="border-t border-[var(--border-hairline)] px-4 py-3.5 sm:px-5">
          <p className="text-xs font-medium text-[var(--ink-primary)] sm:text-sm">
            {active.caption}
          </p>

          {total > 1 && (
            <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
              {items.map((item, idx) => {
                const isSelected = idx === activeIdx;
                return (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => {
                      paperSound.playClick();
                      setActiveIdx(idx);
                    }}
                    className={`group/thumb relative h-14 w-24 shrink-0 overflow-hidden rounded-xl border bg-[var(--bg-well)] transition-all sm:h-16 sm:w-28 ${
                      isSelected
                        ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/25"
                        : "border-[var(--border-hairline)] opacity-70 hover:opacity-100"
                    }`}
                    title={item.caption}
                  >
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-2xl"
            >
              <div className="flex items-center justify-between gap-3 border-b border-[var(--border-hairline)] px-4 py-3">
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold text-[var(--ink-primary)] sm:text-sm">
                    {active.caption}
                  </div>
                  <div className="font-mono text-[10px] text-[var(--ink-muted)]">
                    {projectTitle} · {activeIdx + 1} / {total}
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close lightbox"
                  onClick={() => {
                    paperSound.playClick();
                    setLightboxOpen(false);
                  }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[var(--bg-well)] p-3 sm:p-5">
                <img
                  src={active.src}
                  alt={`${projectTitle} — ${active.caption}`}
                  className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
                />
                {total > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)]/90 text-[var(--ink-primary)] shadow-md hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={goNext}
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)]/90 text-[var(--ink-primary)] shadow-md hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

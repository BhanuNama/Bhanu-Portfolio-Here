"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Moon, Sun, ArrowUpRight, Menu, X, Volume2, VolumeX, Search } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { useAppContext } from "./SmoothScrollProvider";
import { AvatarEmblem } from "./AvatarEmblem";
import { Magnetic } from "./Magnetic";
import { paperSound } from "@/lib/paperSound";

const NAV_ITEMS = [
  { id: "hero", label: "Overview" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Stack" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { theme, toggleTheme, soundEnabled, toggleSound, scrollToSection } =
    useAppContext();
  const [activeId, setActiveId] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    paperSound.playClick();
    setMobileOpen(false);
    setActiveId(id);
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        {/* Left Floating Brand + Nav Pill */}
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Primary navigation"
          className="relative flex flex-1 items-center justify-between rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)]/90 px-2.5 py-1.5 backdrop-blur-md shadow-[var(--shadow-card)] sm:flex-initial sm:gap-2"
        >
          <button
            type="button"
            onClick={() => handleNav("hero")}
            className="group flex items-center gap-2.5 rounded-full pr-3 text-left transition-colors"
          >
            <AvatarEmblem size="sm" />
            <span className="text-sm font-semibold tracking-tight text-[var(--ink-primary)]">
              {PROFILE.name}
            </span>
          </button>

          {/* Desktop Dot-Separated Links with Liquid Layout Pill */}
          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeId === item.id;
              return (
                <React.Fragment key={item.id}>
                  {idx > 0 && (
                    <span
                      aria-hidden="true"
                      className="select-none px-0.5 text-xs text-[var(--ink-muted)]"
                    >
                      ·
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleNav(item.id)}
                    className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "text-[var(--ink-primary)]"
                        : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-well)]"
                      />
                    )}
                    {item.label}
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={() => {
                paperSound.playToggle();
                onOpenPalette();
              }}
              aria-label="Open command menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-well)] text-[var(--ink-primary)]"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-well)] text-[var(--ink-primary)]"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.nav>

        {/* Right Utility Pill Group */}
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="hidden items-center gap-2 sm:flex"
        >
          <button
            type="button"
            onClick={() => {
              paperSound.playToggle();
              onOpenPalette();
            }}
            aria-label="Open command palette (Ctrl+K)"
            className="flex items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)]/90 px-3 py-2 font-mono text-[11px] text-[var(--ink-secondary)] backdrop-blur-md shadow-[var(--shadow-card)] transition-colors hover:border-[var(--ink-primary)] hover:text-[var(--ink-primary)]"
          >
            <Search className="h-3 w-3" />
            <span className="hidden lg:inline">Menu</span>
            <kbd className="rounded bg-[var(--bg-well)] px-1.5 py-0.5 text-[10px]">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute tactile SFX" : "Enable tactile SFX"}
            title={soundEnabled ? "Mute Tactile Paper SFX" : "Enable Tactile Paper SFX"}
            className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md shadow-[var(--shadow-card)] transition-transform hover:scale-105 active:scale-95 ${
              soundEnabled
                ? "border-[var(--border-hairline)] bg-[var(--bg-card)]/90 text-[var(--ink-primary)]"
                : "border-[var(--border-hairline)] bg-[var(--bg-well)] text-[var(--ink-muted)]"
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "paper" ? "dark carbon" : "light paper"} mode`}
            title={`Switch to ${theme === "paper" ? "Carbon Dark" : "Paper Light"}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)]/90 text-[var(--ink-primary)] backdrop-blur-md shadow-[var(--shadow-card)] transition-transform hover:scale-105 active:scale-95"
          >
            {theme === "paper" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>

          <Magnetic strength={0.2}>
            <button
              type="button"
              onClick={() => handleNav("contact")}
              className="group flex items-center gap-1.5 rounded-full border border-[var(--ink-primary)] bg-[var(--ink-primary)] px-4 py-2 text-xs font-semibold text-[var(--bg-paper)] shadow-[var(--shadow-card)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
            >
              <span>Let&apos;s chat</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Subtle Drafting Scroll Progress Hairline */}
      <div className="mx-auto mt-1.5 max-w-6xl px-4">
        <div className="h-[1.5px] w-full overflow-hidden rounded-full bg-transparent">
          <motion.div
            style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
            className="h-full w-full bg-[var(--accent)] opacity-75"
          />
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 max-w-6xl rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-float)] md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className="flex items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-[var(--ink-primary)] hover:bg-[var(--bg-well)]"
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                  #{item.id}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-end border-t border-[var(--border-hairline)] pt-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSound}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-well)] text-[var(--ink-primary)]"
                aria-label="Toggle sound"
              >
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-well)] text-[var(--ink-primary)]"
                aria-label="Toggle theme"
              >
                {theme === "paper" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => handleNav("contact")}
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white"
              >
                Let&apos;s chat
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}

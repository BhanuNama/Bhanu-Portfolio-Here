"use client";

import React, { useEffect } from "react";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Layers,
  Copy,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  ArrowUpRight,
  Compass,
  Briefcase,
  GraduationCap,
  Mail,
} from "lucide-react";
import { PROFILE, PROJECTS, ProjectItem } from "@/data/portfolio";
import { useAppContext } from "./SmoothScrollProvider";
import { paperSound } from "@/lib/paperSound";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  onSelectProject,
}: CommandPaletteProps) {
  const {
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    scrollToSection,
    showToast,
  } = useAppContext();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        paperSound.playToggle();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const runAction = (fn: () => void) => {
    paperSound.playClick();
    onOpenChange(false);
    fn();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-[24px] border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-[var(--shadow-float)]"
          >
            <Command
              label="Portfolio Command Palette"
              className="flex flex-col text-[var(--ink-primary)]"
            >
              <div className="flex items-center gap-3 border-b border-[var(--border-hairline)] px-4 py-3.5">
                <Search className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                <Command.Input
                  autoFocus
                  placeholder="Jump to a project, stack, or action..."
                  className="w-full bg-transparent text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus:outline-none"
                />
                <kbd className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-well)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--ink-muted)]">
                  ESC
                </kbd>
              </div>

              <Command.List
                data-lenis-prevent
                className="max-h-[340px] overflow-y-auto overscroll-contain p-2"
              >
                <Command.Empty className="py-8 text-center font-mono text-xs text-[var(--ink-muted)]">
                  Nothing here. Even my RAG couldn&apos;t retrieve that.
                </Command.Empty>

                <Command.Group
                  heading="Projects & Case Studies"
                  className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5"
                >
                  {PROJECTS.map((project) => (
                    <Command.Item
                      key={project.id}
                      value={`${project.title} ${project.subtitle} ${project.tools.join(" ")}`}
                      onSelect={() => runAction(() => onSelectProject(project))}
                      className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors aria-selected:bg-[var(--bg-well)]"
                    >
                      <div className="flex items-center gap-2.5">
                        <Layers className="h-4 w-4 text-[var(--accent)]" />
                        <div>
                          <div className="font-medium text-[var(--ink-primary)]">
                            {project.title}
                          </div>
                          <div className="text-[11px] text-[var(--ink-secondary)]">
                            {project.subtitle}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[var(--ink-muted)]" />
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Navigate Sections"
                  className="mt-1 px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5"
                >
                  {[
                    { id: "hero", label: "Overview & Hero Deck", icon: Compass },
                    { id: "projects", label: "Selected Systems Bento", icon: Layers },
                    { id: "experience", label: "Experience — TCS", icon: Briefcase },
                    { id: "skills", label: "Technical Stack", icon: Search },
                    { id: "github", label: "GitHub & Build Cadence", icon: Layers },
                    { id: "education", label: "Education Record", icon: GraduationCap },
                    { id: "contact", label: "Contact & Dispatch", icon: Mail },
                  ].map((nav) => {
                    const Icon = nav.icon;
                    return (
                      <Command.Item
                        key={nav.id}
                        value={nav.label}
                        onSelect={() => runAction(() => scrollToSection(nav.id))}
                        className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-[var(--ink-primary)] aria-selected:bg-[var(--bg-well)]"
                      >
                        <Icon className="h-3.5 w-3.5 text-[var(--ink-secondary)]" />
                        <span>{nav.label}</span>
                      </Command.Item>
                    );
                  })}
                </Command.Group>

                <Command.Group
                  heading="Actions"
                  className="mt-1 px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5"
                >
                  <Command.Item
                    value="Copy Email Address"
                    onSelect={() =>
                      runAction(() => {
                        navigator.clipboard.writeText(PROFILE.email);
                        showToast(`Copied ${PROFILE.email}`);
                      })
                    }
                    className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-[var(--ink-primary)] aria-selected:bg-[var(--bg-well)]"
                  >
                    <span className="flex items-center gap-2.5">
                      <Copy className="h-3.5 w-3.5 text-[var(--ink-secondary)]" />
                      Copy Email ({PROFILE.email})
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="Copy Phone Number"
                    onSelect={() =>
                      runAction(() => {
                        navigator.clipboard.writeText(PROFILE.phone);
                        showToast(`Copied ${PROFILE.phone}`);
                      })
                    }
                    className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-[var(--ink-primary)] aria-selected:bg-[var(--bg-well)]"
                  >
                    <span className="flex items-center gap-2.5">
                      <Copy className="h-3.5 w-3.5 text-[var(--ink-secondary)]" />
                      Copy Phone ({PROFILE.phone})
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="Toggle Light Paper Dark Carbon Theme"
                    onSelect={() => {
                      onOpenChange(false);
                      toggleTheme();
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-[var(--ink-primary)] aria-selected:bg-[var(--bg-well)]"
                  >
                    <span className="flex items-center gap-2.5">
                      {theme === "paper" ? (
                        <Moon className="h-3.5 w-3.5 text-[var(--ink-secondary)]" />
                      ) : (
                        <Sun className="h-3.5 w-3.5 text-[var(--ink-secondary)]" />
                      )}
                      Switch to {theme === "paper" ? "Dark Carbon" : "Paper Light"} Mode
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="Toggle Tactile Paper Sound Effects"
                    onSelect={() => {
                      onOpenChange(false);
                      toggleSound();
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-[var(--ink-primary)] aria-selected:bg-[var(--bg-well)]"
                  >
                    <span className="flex items-center gap-2.5">
                      {soundEnabled ? (
                        <Volume2 className="h-3.5 w-3.5 text-[var(--ink-secondary)]" />
                      ) : (
                        <VolumeX className="h-3.5 w-3.5 text-[var(--ink-secondary)]" />
                      )}
                      {soundEnabled ? "Mute" : "Enable"} Tactile Paper SFX
                    </span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

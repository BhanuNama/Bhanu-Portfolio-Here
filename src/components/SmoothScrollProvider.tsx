"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { LayoutGroup } from "framer-motion";
import { paperSound } from "@/lib/paperSound";

type ThemeMode = "paper" | "dark";

interface AppContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  scrollToSection: (id: string) => void;
}

const AppContext = createContext<AppContextValue>({
  theme: "dark",
  toggleTheme: () => {},
  soundEnabled: true,
  toggleSound: () => {},
  toastMessage: null,
  showToast: () => {},
  scrollToSection: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

export function SmoothScrollProvider({
  children,
  scrollLocked = false,
  initialScrollBehavior = "top",
}: {
  children: React.ReactNode;
  scrollLocked?: boolean;
  initialScrollBehavior?: "top" | "restore";
}) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("bn-theme") as ThemeMode | null;
    if (saved === "dark" || saved === "paper") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    const savedSound = window.localStorage.getItem("bn-sound");
    if (savedSound === "false") {
      setSoundEnabled(false);
      paperSound.enabled = false;
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    setLenisInstance(lenis);

    if (initialScrollBehavior === "restore") {
      const savedY = window.sessionStorage.getItem("bn-home-scroll");
      if (savedY !== null) {
        const y = Number(savedY);
        window.sessionStorage.removeItem("bn-home-scroll");
        if (!Number.isNaN(y) && y > 0) {
          window.scrollTo(0, y);
          lenis.scrollTo(y, { immediate: true, force: true });
          requestAnimationFrame(() => {
            window.scrollTo(0, y);
            lenis.scrollTo(y, { immediate: true, force: true });
          });
        }
      }
    } else {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true, force: true });
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true, force: true });
      });
    }

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [initialScrollBehavior]);

  useEffect(() => {
    if (scrollLocked) {
      lenisInstance?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenisInstance?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [scrollLocked, lenisInstance]);

  const toggleTheme = () => {
    paperSound.playToggle();
    setTheme((prev) => {
      const next: ThemeMode = prev === "paper" ? "dark" : "paper";
      document.documentElement.setAttribute("data-theme", next);
      window.localStorage.setItem("bn-theme", next);
      return next;
    });
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      paperSound.enabled = next;
      window.localStorage.setItem("bn-sound", String(next));
      if (next) paperSound.playToggle();
      showToast(next ? "Tactile paper SFX: ON" : "Tactile paper SFX: MUTED");
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2600);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisInstance) {
      lenisInstance.scrollTo(el, { offset: -88, duration: 1.15 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        toastMessage,
        showToast,
        scrollToSection,
      }}
    >
      <LayoutGroup>{children}</LayoutGroup>
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 truncate rounded-full border border-[var(--border-strong)] bg-[var(--ink-primary)] px-4 py-2 font-mono text-xs text-[var(--bg-paper)] shadow-[var(--shadow-float)] transition-all"
        >
          {toastMessage}
        </div>
      )}
    </AppContext.Provider>
  );
}

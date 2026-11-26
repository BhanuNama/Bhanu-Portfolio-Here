"use client";

import React from "react";
import { PROFILE } from "@/data/portfolio";

interface AvatarEmblemProps {
  size?: "sm" | "md" | "lg" | "deck";
  className?: string;
}

/**
 * Editorial squircle/circle portrait mark inspired by the uploaded references.
 * Uses smart focal cropping so full-body character illustrations frame neatly
 * as a close-up portrait in small badges and upper-body showcase in the deck card.
 */
export function AvatarEmblem({ size = "md", className = "" }: AvatarEmblemProps) {
  const dims =
    size === "sm"
      ? "h-8 w-8 rounded-full"
      : size === "deck"
        ? "h-28 w-24 rounded-2xl"
        : size === "lg"
          ? "h-16 w-16 sm:h-20 sm:w-20 rounded-2xl"
          : "h-11 w-11 sm:h-14 sm:w-14 rounded-2xl";

  // Zoom & frame cleanly onto full head + hair + glasses for sm/md, and upper-body character for deck/lg
  const imgFraming =
    size === "sm"
      ? "object-cover object-[50%_15%] origin-[50%_22%] scale-[1.72]"
      : size === "md"
        ? "object-cover object-[50%_15%] origin-[50%_22%] scale-[1.68]"
        : size === "deck"
          ? "object-cover object-[50%_26%] scale-[1.45]"
          : "object-cover object-[50%_24%] scale-[1.9]";

  if (PROFILE.avatarUrl) {
    return (
      <span
        className={`relative inline-flex shrink-0 overflow-hidden border border-[var(--border-strong)] bg-[#FCEFD2] shadow-[var(--shadow-card)] ${dims} ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PROFILE.avatarUrl}
          alt={PROFILE.name}
          className={`h-full w-full ${imgFraming}`}
        />
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-[var(--border-strong)] bg-[var(--accent)] text-[var(--accent-ink)] shadow-[var(--shadow-card)] ${dims} ${className}`}
      aria-label={PROFILE.name}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M16 0V64M48 0V64M0 16H64M0 48H64"
          stroke="currentColor"
          strokeOpacity="0.14"
          strokeWidth="0.75"
        />
        <circle cx="32" cy="24" r="9.5" fill="#141413" />
        <path
          d="M15 58C15 46.5 22.4 39.5 32 39.5C41.6 39.5 49 46.5 49 58"
          fill="#141413"
        />
        <rect
          x="24.5"
          y="21.5"
          width="6"
          height="3.5"
          rx="1"
          stroke="#F6F4EF"
          strokeWidth="1.2"
          fill="none"
        />
        <rect
          x="33.5"
          y="21.5"
          width="6"
          height="3.5"
          rx="1"
          stroke="#F6F4EF"
          strokeWidth="1.2"
          fill="none"
        />
        <path d="M30.5 23.2H33.5" stroke="#F6F4EF" strokeWidth="1.1" />
      </svg>
    </span>
  );
}

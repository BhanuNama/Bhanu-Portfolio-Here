"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectItem } from "@/data/portfolio";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { BentoProjects } from "@/components/BentoProjects";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsBento } from "@/components/SkillsBento";
import { GitHubPulse } from "@/components/GitHubPulse";
import { EducationLedger } from "@/components/EducationLedger";
import { ContactSection } from "@/components/ContactSection";
import { CommandPalette } from "@/components/CommandPalette";

export default function HomePage() {
  const router = useRouter();
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openProjectPage = (project: ProjectItem) => {
    window.sessionStorage.setItem("bn-home-scroll", String(window.scrollY));
    router.push(`/projects/${project.id}`);
  };

  return (
    <SmoothScrollProvider scrollLocked={paletteOpen} initialScrollBehavior="restore">
      <div className="relative min-h-screen">
        <Navbar onOpenPalette={() => setPaletteOpen(true)} />
        <main>
          <HeroSection onSelectProject={openProjectPage} />
          <BentoProjects onSelectProject={openProjectPage} />
          <ExperienceSection />
          <SkillsBento onSelectProject={openProjectPage} />
          <GitHubPulse />
          <EducationLedger />
          <ContactSection />
        </main>
        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          onSelectProject={openProjectPage}
        />
      </div>
    </SmoothScrollProvider>
  );
}

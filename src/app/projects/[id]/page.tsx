import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/portfolio";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found — Bhanu Nama" };
  return {
    title: `${project.title} — Bhanu Nama`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}

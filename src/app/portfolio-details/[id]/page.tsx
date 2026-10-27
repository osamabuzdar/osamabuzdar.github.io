import { notFound } from "next/navigation";
import { ProjectDetailClient } from "@/components/ProjectDetailClient";
import { getProject, getProjects } from "@/lib/api";
import { createMetadata } from "@/lib/seo";
import { pickString, slugify } from "@/lib/utils";
import type { ApiRecord, SiteEntity } from "@/types/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/portfolio-details/${project.id}`,
    image: project.image
  });
}

function entityFromRecord(record: Record<string, unknown>): SiteEntity {
  const title = pickString(record, ["title", "name", "PName", "projectName"], "Project");
  const id = pickString(record, ["_id", "id", "slug"], slugify(title));

  return {
    id,
    slug: pickString(record, ["slug"], slugify(`${title}-${id}`)),
    title,
    description: pickString(record, ["description", "PDescription", "shortDescription"], ""),
    image: pickString(record, ["image", "PImage", "featuredImage"]) || undefined,
    category: pickString(record, ["category", "PType", "projectCategory"]) || undefined,
    tags: [],
    raw: record
  };
}

function buildRelatedProjects(project: SiteEntity, allProjects: SiteEntity[]) {
  const raw = project.raw as ApiRecord;
  const relatedRaw = Array.isArray(raw.relatedProjects) ? raw.relatedProjects : [];

  if (relatedRaw.length > 0) {
    const related = relatedRaw
      .map((item) => {
        if (typeof item === "string") {
          return allProjects.find(
            (candidate) => candidate.id === item || candidate.slug === item || candidate.title === item
          );
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;
          const candidateId = pickString(record, ["_id", "id", "slug", "PName", "title"]);
          const found = allProjects.find(
            (candidate) => candidate.id === candidateId || candidate.slug === candidateId || candidate.title === candidateId
          );
          return found || entityFromRecord(record);
        }

        return undefined;
      })
      .filter((item): item is SiteEntity => Boolean(item));

    if (related.length > 0) return related.slice(0, 2);
  }

  const sameCategory = allProjects.filter(
    (candidate) => candidate.id !== project.id && candidate.category && candidate.category === project.category
  );

  const fallback = sameCategory.length > 0 ? sameCategory : allProjects.filter((candidate) => candidate.id !== project.id);
  return fallback.slice(0, 2);
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id).catch(() => undefined);
  if (!project) notFound();

  const relatedProjects = buildRelatedProjects(project, await getProjects());

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} />;
}


import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { getProject, getProjects } from "@/lib/api";
import { createMetadata } from "@/lib/seo";
import { pickString, textFrom } from "@/lib/utils";
import type { ApiRecord } from "@/types/site";

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

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id).catch(() => undefined);
  if (!project) notFound();
  const raw = project.raw;
  const strategyTitle = pickString(raw, ["strategyTitle"]);
  const strategyDescription = pickString(raw, ["strategyDescription"]);
  const challengeTitle = pickString(raw, ["challengeTitle"]);
  const challengeDescription = pickString(raw, ["challengeDescription"]);
  const clientName = pickString(raw, ["clientName"]);
  const projectLink = pickString(raw, ["PLink"]);
  const address = pickString(raw, ["address"]);
  const clientReview = raw.clientReview && typeof raw.clientReview === "object" ? raw.clientReview as ApiRecord : undefined;

  return (
    <>
      <PageHero title={project.title} description={project.description} image={project.image || "/images/pricing-bg.webp"} />
      <section className="section narrow">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/portfolio", label: "Portfolio" }, { href: `/portfolio-details/${project.id}`, label: project.title }]} />
        <SectionHeader eyebrow="Project Information" title={project.title} description={project.description} />
        <div className="rich-panel">
          <p>{project.description}</p>
          <dl className="detail-list">
            {clientName ? <><dt>Client</dt><dd>{clientName}</dd></> : null}
            {project.category ? <><dt>Category</dt><dd>{project.category}</dd></> : null}
            {address ? <><dt>Address</dt><dd>{address}</dd></> : null}
            {projectLink ? <><dt>Project Link</dt><dd><a href={projectLink} rel="noreferrer" target="_blank">{projectLink}</a></dd></> : null}
          </dl>
        </div>
        {strategyTitle || strategyDescription ? (
          <div className="rich-panel">
            <h2>{strategyTitle || "Project Strategy"}</h2>
            {strategyDescription ? <p>{strategyDescription}</p> : null}
          </div>
        ) : null}
        {challengeTitle || challengeDescription ? (
          <div className="rich-panel">
            <h2>{challengeTitle || "Project Challenge"}</h2>
            {challengeDescription ? <p>{challengeDescription}</p> : null}
          </div>
        ) : null}
        {clientReview ? (
          <blockquote className="project-review">
            <p>“{pickString(clientReview, ["reviewDescription"])}”</p>
            <cite>{pickString(clientReview, ["clientName"])} {textFrom(clientReview.designation) ? `- ${textFrom(clientReview.designation)}` : ""}</cite>
          </blockquote>
        ) : null}
      </section>
    </>
  );
}

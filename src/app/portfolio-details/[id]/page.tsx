import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { getProject, getProjects } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

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

  return (
    <>
      <PageHero title={project.title} description={project.description} image={project.image || "/images/pricing-bg.webp"} />
      <section className="section narrow">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/portfolio", label: "Portfolio" }, { href: `/portfolio-details/${project.id}`, label: project.title }]} />
        <SectionHeader eyebrow="Project Information" title={project.title} description={project.description} />
        <div className="rich-panel">
          <p>{project.description}</p>
        </div>
      </section>
    </>
  );
}

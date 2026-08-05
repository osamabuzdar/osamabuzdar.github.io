import { EntityCard } from "@/components/EntityCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { getProjects } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Portfolio",
  description: "Explore Bulk Bytes projects and recognized digital work.",
  path: "/portfolio"
});

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title="Our portfolio of excellence"
        description="Selected work across software, apps, web platforms, and business growth systems."
        image="/images/hero-section-image-others.webp"
      />
      <section className="section">
        <SectionHeader title="Recognized work" />
        <div className="card-grid">
          {projects.map((project) => (
            <EntityCard entity={project} href={`/portfolio-details/${project.id}`} label="View Project" key={project.id} />
          ))}
        </div>
      </section>
    </>
  );
}

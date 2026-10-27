import { createMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/api";
import { PortfolioClient } from "@/components/PortfolioClient";

export const metadata = createMetadata({
  title: "Portfolio",
  description: "Explore Bulk Bytes projects and recognized digital work.",
  path: "/portfolio",
  image: "/images/hero-section-image-others.webp"
});

export default async function PortfolioPage() {
  const projects = await getProjects();

  return <PortfolioClient projects={projects} />;
}

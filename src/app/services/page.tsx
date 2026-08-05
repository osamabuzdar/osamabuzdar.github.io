import { EntityCard } from "@/components/EntityCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { getServices } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Services",
  description: "Explore Bulk Bytes services for web apps, mobile apps, WordPress, digital marketing, and IT modernization.",
  path: "/services"
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Comprehensive IT solutions for modern teams"
        description="From product strategy to secure deployment, Bulk Bytes helps teams ship useful technology."
        image="/images/service-bg.webp"
      />
      <section className="section">
        <SectionHeader title="Key services we provide" />
        <div className="card-grid">
          {services.map((service) => (
            <EntityCard entity={service} href={`/services-detail/${service.id}`} key={service.id} />
          ))}
        </div>
      </section>
    </>
  );
}
